-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: vue_store
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_order`
--

DROP TABLE IF EXISTS `user_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `goods_list` text,
  `goods_price` varchar(255) DEFAULT NULL,
  `goods_num` varchar(255) DEFAULT NULL,
  `order_status` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_order`
--

LOCK TABLES `user_order` WRITE;
/*!40000 ALTER TABLE `user_order` DISABLE KEYS */;
INSERT INTO `user_order` VALUES (340,6,'20230528182036865989','[{\"id\":147,\"uid\":6,\"goods_id\":1,\"goods_name\":\"赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g\",\"goods_price\":\"238\",\"goods_num\":\"1\",\"goods_imgURL\":\"/images/goods1.jpg\",\"checked\":true}]','238','1',3),(341,6,'2023052818233746947','[{\"id\":148,\"uid\":6,\"goods_id\":1,\"goods_name\":\"赛事茶-第三届武夷山茶叶交易会暨仙店杯-优质奖肉桂160g\",\"goods_price\":\"238\",\"goods_num\":\"1\",\"goods_imgURL\":\"/images/goods1.jpg\",\"checked\":true}]','238','1',3),(342,6,'2023052822331222205','[{\"id\":149,\"uid\":6,\"goods_id\":2,\"goods_name\":\"茶具-中国陶瓷茶叶罐220ml\",\"goods_price\":\"26\",\"goods_num\":\"1\",\"goods_imgURL\":\"/images/goods2.jpg\",\"checked\":true},{\"id\":150,\"uid\":6,\"goods_id\":4,\"goods_name\":\"明前春茶 绿茶 龙井\",\"goods_price\":\"98\",\"goods_num\":3,\"goods_imgURL\":\"/images/goods4.jpg\",\"checked\":true}]','320','4',3);
/*!40000 ALTER TABLE `user_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-31 11:22:49
