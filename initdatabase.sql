CREATE database instagram_clone;
use instagram_clone;

CREATE TABLE USER_TB(
    user_sq_pk int not null PRIMARY KEY auto_increment,
    user_id VARCHAR(20) null,
    user_pwd VARCHAR(20) null,
    user_profile_image VARCHAR(100) null,
    user_login_type VARCHAR(10) not null,
    followerCount int DEFAULT 0,
    followingCount int DEFAULT 0,
    
    user_create_time TIMESTAMP DEFAULT NOW(),
    user_update_time TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
)DEFAULT CHARACTER SET = utf8;

CREATE TABLE POST_TB(
    post_sq_pk int not null PRIMARY KEY auto_increment,
    
    user_sq_fk int not null,
    post_content VARCHAR(200) not null,
    favoriteCount int DEFAULT 0,
    
    post_create_time TIMESTAMP DEFAULT NOW(),
    post_update_time TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(user_sq_fk) REFERENCES USER_TB(user_sq_pk) on delete cascade
)DEFAULT CHARACTER SET = utf8;

CREATE TABLE POST_IMAGE_TB(
    product_image_sq_pk int not null PRIMARY KEY auto_increment,
    
    post_sq_fk int not null,
    post_image VARCHAR(200) not null,
    post_image_num int DEFAULT 0,

    post_image_create_time TIMESTAMP DEFAULT NOW(),
    post_image_update_time TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(post_sq_fk) REFERENCES POST_TB(post_sq_pk) on delete cascade
)DEFAULT CHARACTER SET = utf8;


