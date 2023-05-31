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
-- Table structure for table `goods_list`
--

DROP TABLE IF EXISTS `goods_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `num` varchar(255) DEFAULT NULL,
  `imgURL` varchar(255) DEFAULT NULL,
  `common` varchar(45) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_list`
--

LOCK TABLES `goods_list` WRITE;
/*!40000 ALTER TABLE `goods_list` DISABLE KEYS */;
INSERT INTO `goods_list` VALUES (1,'鸭屎香  500g','花香高扬、浓郁持久、回甘力强、口感顺滑，香气和口感之强居凤凰单丛茶之冠，','300','1','/images/ysxgood1.jpg',NULL,'斤'),(2,'蜜兰香 500g','滋味有蜂蜜的甜醇，口感易喝，价格偏低，深受本地居民的喜爱','200','1','/images/mlxgood1.jpg',NULL,'斤'),(3,'锯朵仔 500g','茶叶似锯，其丛香味当属杏仁香，干茶具有明显的杏仁香气','1000','1','/images/jdzgood1.jpg',NULL,'斤'),(4,'凹富后 500g','茶底漂亮，味香甘甜，让茶友称“凹富后甜过初恋”','600','1','/images/afhgood1.jpg',NULL,'斤'),(5,'茶多酚面膜','抗辐射、抗衰老、清除过剩自由基及保湿、美白、增效防晒','78','1','/images/cdfmmgood1.jpg',NULL,'片'),(6,'壹杯茶明目眼霜 ','美化、修复眼周肌肤，以达到获得紧致、细腻、富有弹性的眼部肌肤状态','75','1','/images/ybcmmysgood1.jpg',NULL,'支/25g'),(7,'鸭屎香萃取茶原液 1L','只取茶叶第一泡的精华，综合滋味、香气最优组合，优质、有机无害的高品质鸭屎香单品','88','1','/images/ysxcqcyygood1.jpg',NULL,'升'),(8,'蜜兰香茶口含片','优雅柔和的芝兰香味，蜜兰香茶饮用口感的持久回甘，与爽口醇厚','25','1','/images/mlxckhpgood1.jpg',NULL,'盒'),(9,'壹杯茶茶叶小罐','小罐茶，大师作','88','1','/images/ybcxgcgood1.jpg',NULL,'罐'),(10,'壹杯茶礼盒','送礼，送的不仅仅是心意，也是内心回甘的传递','588','1','/images/ybclhgood1.jpg',NULL,'盒'),(11,'茶杯',NULL,NULL,NULL,'/images/jzcjgood1.jpg',NULL,NULL);
/*!40000 ALTER TABLE `goods_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-31 11:22:48
