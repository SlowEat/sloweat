DROP DATABASE IF EXISTS sloweat;
CREATE DATABASE sloweat DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE sloweat;


-- 제약조건 무시를 위해 외래 키 검사 끄기
SET FOREIGN_KEY_CHECKS = 0;

-- drop database 가 실행되는 경우에는 drop table 부분 주석 처리하세요!
DROP TABLE sample;
DROP TABLE recipe_tag;
DROP TABLE tag;
DROP TABLE recipe_report;
DROP TABLE recipe_like;
DROP TABLE recipe_image;
DROP TABLE recipe;
DROP TABLE payment;
DROP TABLE subscription;
DROP TABLE follow;
DROP TABLE comment_report;
DROP TABLE comment_like;
DROP TABLE comment;
DROP TABLE bookmark;
DROP TABLE bookmark_collection;
DROP TABLE user;
-- drop database 가 실행되는 경우에는 drop table 부분 주석 처리하세요!


-- 외래 키 검사 다시 켜기
SET FOREIGN_KEY_CHECKS = 1;


-- sloweat.sample definition

CREATE TABLE `sample` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- sloweat.`user` definition

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `join_type` enum('LOCAL','KAKAO') NOT NULL COMMENT '카카오/로컬',
  `local_email` varchar(100) DEFAULT NULL COMMENT '로그인 이메일',
  `local_password` varchar(255) DEFAULT NULL COMMENT '해시된 로컬 비밀번호',
  `kakao_id` varchar(255) DEFAULT NULL COMMENT '카카오 식별 고유 ID',
  `kakao_email` varchar(100) DEFAULT NULL COMMENT '카카오 이메일',
  `nickname` varchar(20) NOT NULL,
  `profile_img_path` varchar(255) DEFAULT NULL,
  `introduce` varchar(30) DEFAULT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `status` enum('ACTIVE', 'BANNED', 'WITHDRAWN') NOT NULL DEFAULT 'ACTIVE',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='사용자';


-- sloweat.recipe definition

CREATE TABLE `recipe` (
  `recipe_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL COMMENT '작성자',
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `cooking_time` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `views` int NOT NULL DEFAULT '0',
  `likes` int NOT NULL DEFAULT '0',
  `is_subscribed` tinyint(1) NOT NULL DEFAULT '0' COMMENT '구독자 전용 컨텐츠 여부, FALSE=무료',
  `status` enum('NONE', 'REQUEST', 'APPROVE', 'REJECT') NOT NULL DEFAULT 'NONE' COMMENT '레시피 상태',
  PRIMARY KEY (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipe_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시물(레시피)';


-- sloweat.recipe_image definition

CREATE TABLE `recipe_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL COMMENT '게시글',
  `file_path` varchar(255) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `recipe_image_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글-이미지';


-- sloweat.recipe_like definition

CREATE TABLE `recipe_like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL COMMENT '게시글',
  `user_id` int NOT NULL COMMENT '사용자',
  `is_like` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRUE 좋아요',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `user_id` (`user_id`,`recipe_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `recipe_like_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글(레시피) 좋아요';


-- sloweat.recipe_report definition

CREATE TABLE `recipe_report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL COMMENT '신고자',
  `recipe_id` int NOT NULL COMMENT '신고 대상 게시글',
  `reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  UNIQUE KEY `user_id` (`user_id`,`recipe_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `recipe_report_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `recipe_report_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시글 신고';


-- sloweat.comment definition

CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL COMMENT '부모댓글',
  `user_id` int DEFAULT NULL COMMENT '작성자',
  `recipe_id` int NOT NULL COMMENT '댓글을 단 게시글',
  `content` text NOT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '소프트 딜리트(삭제여부)',
  `status` enum('NONE', 'REQUEST', 'APPROVE', 'REJECT') NOT NULL DEFAULT 'NONE' COMMENT '댓글 상태',
  PRIMARY KEY (`comment_id`),
  KEY `parent_id` (`parent_id`),
  KEY `user_id` (`user_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글';


-- sloweat.comment_like definition

CREATE TABLE `comment_like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL COMMENT '댓글',
  `user_id` int NOT NULL COMMENT '사용자',
  `is_like` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'TRUE=좋아요',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `user_id` (`user_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_like_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_like_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글 좋아요';


-- sloweat.comment_report definition

CREATE TABLE `comment_report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL COMMENT '댓글',
  `user_id` int DEFAULT NULL COMMENT '신고자',
  `reason` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  UNIQUE KEY `user_id` (`user_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_report_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_report_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글 신고';


-- sloweat.subscription definition

CREATE TABLE `subscription` (
  `subscription_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL COMMENT '구독자',
  `customer_uid` VARCHAR(100) NOT NULL COMMENT '아임포트 결제 고유 ID',
  `status` enum('ACTIVE','CANCEL','EXPIRE') NOT NULL DEFAULT 'ACTIVE',
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`subscription_id`),
  KEY `user_id` (`user_id`),
  UNIQUE KEY `customer_uid` (`customer_uid`),
  CONSTRAINT `subscription_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='구독';

-- sloweat.bookmark_collection definition

CREATE TABLE `bookmark_collection` (
  `collection_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '사용자',
  `collection_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookmark_collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='북마크 컬렉션';


-- sloweat.bookmark definition

CREATE TABLE `bookmark` (
  `bookmark_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL COMMENT '게시글(레시피)',
  `user_id` int NOT NULL COMMENT '사용자',
  `collection_id` int NOT NULL COMMENT '포함된 컬렉션',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookmark_id`),
  UNIQUE KEY `user_id` (`user_id`,`recipe_id`,`collection_id`),
  KEY `collection_id` (`collection_id`),
  KEY `bookmark_ibfk_1` (`recipe_id`),
  CONSTRAINT `bookmark_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmark_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmark_ibfk_3` FOREIGN KEY (`collection_id`) REFERENCES `bookmark_collection` (`collection_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='북마크';


-- sloweat.follow definition

CREATE TABLE `follow` (
  `follower_id` int NOT NULL COMMENT '팔로우 신청자',
  `following_id` int NOT NULL COMMENT '팔로우 대상',
  `follow_id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='팔로우';


-- sloweat.payment definition

CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `subscription_id` int DEFAULT NULL COMMENT '구독 정보',
  `imp_uid` VARCHAR(100) NOT NULL COMMENT '아임포트 결제 고유 ID',
  `merchant_uid` VARCHAR(100) NOT NULL COMMENT '가맹점 주문 고유 ID',
  `amount` int NOT NULL COMMENT '결제금액',
  `status` enum('PAID','CANCEL','REFUND') NOT NULL,
  `method` enum('CARD','CASH') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pay_date` timestamp NOT NULL,
  `refund_status` enum('REQUEST','APPROVE','REJECT') DEFAULT NULL,
  `refund_reason` text,
  `refund_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `imp_uid` (`imp_uid`),
  UNIQUE KEY `merchant_uid` (`merchant_uid`),
  KEY `subscription_id` (`subscription_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`subscription_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='결제정보';


-- sloweat.tag definition

CREATE TABLE `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) NOT NULL,
  `tag_type` enum('TYPE','SITUATION','INGREDIENT','METHOD') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='태그';


-- sloweat.recipe_tag definition

CREATE TABLE `recipe_tag` (
  `recipe_id` int NOT NULL COMMENT '게시글',
  `tag_id` int NOT NULL COMMENT '태그',
  `recipe_tag_id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipe_tag_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `recipe_tag_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='레시피-태그';


-- 기존 값 'ROLE_USER' → 'USER'
UPDATE user
SET role = 'USER'
WHERE role = 'ROLE_USER';

-- 기존 값 'ROLE_ADMIN' → 'ADMIN'
UPDATE user
SET role = 'ADMIN'
WHERE role = 'ROLE_ADMIN';

-- 컬럼 enum 정의 및 DEFAULT 값 수정
ALTER TABLE user
MODIFY COLUMN role ENUM('ROLE_USER', 'ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_USER';

-- refresh 토큰 저장 용 테이블
CREATE TABLE refresh (
    refresh_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    refresh_token TEXT NOT NULL,
    expiration VARCHAR(255) NOT NULL
);

