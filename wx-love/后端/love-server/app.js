const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

// 连接mysql
const conn = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'love-user'
})

// 创建连接
conn.connect(err => {
    if (!err) {
        console.log('连接成功');
    }
})

// 将post请求的参数转为json格式
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())


// 注册接口
app.post("/register", (req, res) => {
    let userName = req.body.username
    let passWord = req.body.password
    let code = String(Date.now()).slice(-5)
    if (userName && passWord) {
        const result = `SELECT * FROM user WHERE userName = '${userName}'`
        conn.query(result, [userName], (err, results) => {
            if (err) throw err
            if (results.length >= 1) {
                res.send({ code: 0, msg: "注册失败，用户名重复" })
            } else {
                const sqlStr = "insert into user(username, password, code) values(?, ?, ?)"
                conn.query(sqlStr, [userName, passWord, code], (err, results) => {
                    if (err) throw err
                    if (results.affectedRows === 1) {
                        res.send({ code: 1, msg: "注册成功" })
                    } else {
                        res.send({ code: 0, msg: "注册失败" })
                    }
                })
            }
        })
    }
})

// 登录接口
app.post('/login', (req, res) => {
    let sql = 'SELECT * FROM user where username = ? and password = ?'
    conn.query(sql, [req.body.username, req.body.password], (err, results) => {
        if (err) throw err
        if (results.length > 0) {
            res.send({ code: 1, msg: "登录成功", love_id: results[0].love_id, love_code: results[0].code })
        } else {
            res.send({ code: 0, msg: "登录失败" })
        }
    })
})

// 绑定恋爱码接口
app.post('/bindCode', (req, res) => {
    let username = req.body.username
    let code = req.body.code
    let love_code = req.body.love_code

    let select = 'select * from user where code = ?'
    conn.query(select, [code], (err, result) => {
        if (err) throw err
        if (result.length == 1) {
            // 当被绑定人也没绑定恋爱码时
            if (result[0].love_id == null) {
                // 修改自己的恋爱码
                let sql = 'update user set love_id = ? where username = ?'
                conn.query(sql, [code, username], (err, result) => {
                    if (err) throw err
                    if (result.affectedRows == 0) {
                        res.send({ code: 0, msg: '输入的恋爱码无效！' })
                    }
                })

                // 修改被绑定人的恋爱码
                let sqlStr = 'update user set love_id = ? where code = ?'
                conn.query(sqlStr, [love_code, code], (err, result) => {
                    if (err) throw err
                    if (result.affectedRows == 1) {
                        res.send({ code: 1, msg: '绑定成功！', love_id: code, love_code: love_code })
                    } else {
                        res.send({ code: 0, msg: '输入的恋爱码无效！' })
                    }
                })

            } else {
                res.send({ code: 0, msg: '该用户已名花有主~~~' })
            }
        }
    })

})

// 获取恋爱事件接口
app.post('/getLove', (req, res) => {
    let love_id = req.body.love_id
    let selectMy = 'select * from love where user_id = ? or love_id = ?'
    conn.query(selectMy, [love_id, love_id], (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            res.send({ code: 1, msg: '查找成功！', data: result })
        }
    })
})

// 添加恋爱事件接口
app.post('/addEvent', (req, res) => {
    let user_id = req.body.love_id
    let love_id = req.body.love_code
    let title = req.body.title
    let content = req.body.content
    let score = req.body.score
    let created_date = req.body.created_date
    let sql = 'insert into love(user_id, love_id, title, content, score, created_date) values(?, ?, ?, ?, ?, ?)'
    conn.query(sql, [user_id, love_id, title, content, score, created_date], (err, result) => {
        if (err) throw err
        if (result.affectedRows == 1) {
            res.send({ code: 1, msg: '记录成功！' })
        }
    })
})

// 查找对应恋爱事件接口
app.post('/selectEvent', (req, res) => {
    let id = req.body.id
    let sql = 'select * from love where id = ?'
    conn.query(sql, [id], (err, result) => {
        if (err) throw err
        if (result.length == 1) {
            res.send({ code: 1, msg: '查找成功！', data: result })
        }
    })
})

// 修改对应恋爱事件接口
app.put('/changeEvent', (req, res) => {
    let id = req.body.id
    let title = req.body.title
    let content = req.body.content
    let sql = 'update love set title = ?, content = ? where id = ?'
    conn.query(sql, [title, content, id], (err, result) => {
        if (err) throw err
        if (result.affectedRows == 1) {
            res.send({ code: 1, msg: '修改成功！' })
        }
    })
})



// 监听端口3000
app.listen(3000, () => {
    console.log('服务器开启');
})  