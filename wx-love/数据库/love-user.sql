/*
 Navicat Premium Data Transfer

 Source Server         : love
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : love-user

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 14/05/2023 19:15:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for love
-- ----------------------------
DROP TABLE IF EXISTS `love`;
CREATE TABLE `love`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `love_id` int(0) NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `score` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_date` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of love
-- ----------------------------
INSERT INTO `love` VALUES (1, 19604, 20230101, '烧烤撸串', '吃了个烧烤吃了个串串香', '+5', '2021-07-04 上午');
INSERT INTO `love` VALUES (2, 19604, 20230101, '约会吃到', '今天跟我约会居然迟到', '-1', '2021-06-27 下午');
INSERT INTO `love` VALUES (3, 19604, 20230101, '送了朵鲜花', '还行  今天来接我送了朵鲜花', '+5', '2021-06-10 上午');
INSERT INTO `love` VALUES (4, 20230101, 19604, '陪看球赛', '今天陪我看了一通宵的球赛', '+5', '2021-07-04 上午');
INSERT INTO `love` VALUES (5, 20230101, 19604, '手工甜点', '下班回来吃到他给我做的手工甜点123', '+5', '2021-07-06  下午');
INSERT INTO `love` VALUES (6, 20230101, 19604, '亲自下厨', '今天下班他亲自下厨 给我做了热乎的饭菜', '+5', '2021-07-09 下午');
INSERT INTO `love` VALUES (7, 20230101, 19604, '333', '444', '-1', '2023-05-10上午');
INSERT INTO `love` VALUES (8, 20230101, 19604, '2222', '33333', '+5', '2023-05-10上午');
INSERT INTO `love` VALUES (9, 20230101, 19604, '11111111', '22222222', '+5', '2023-05-10上午');
INSERT INTO `love` VALUES (10, 20230101, 19604, '23123', '123123', '+5', '2023-05-10上午');
INSERT INTO `love` VALUES (11, 20230101, 19604, '777', '88888', '+5', '2023-05-10上午');
INSERT INTO `love` VALUES (12, 20230101, 19604, '456', '456456', '-1', '2023-05-10上午');
INSERT INTO `love` VALUES (13, 20230101, 19604, '1234444', '1235555', '+5', '2023-05-14上午');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `love_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '0627', '123123', '张三', '20230101', '19604');
INSERT INTO `user` VALUES (7, '111', '111', NULL, '19604', '20230101');
INSERT INTO `user` VALUES (8, '777', '777', NULL, '30226', NULL);

SET FOREIGN_KEY_CHECKS = 1;
