CREATE TABLE JB_TEAMS (
    TEAM_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TEAM_ID_ADM INT NOT NULL,
    TEAM_NAME VARCHAR(60) NOT NULL,
    TEAM_BIO TEXT,
    TEAM_PRIVATE CHAR(1) DEFAULT 'N',
    TEAM_PASSWORD VARCHAR(255),
    TEAM_SIZE INT,
    TEAM_CITY VARCHAR(100),
    TEAM_STATE VARCHAR(100), 
    TEAM_COUNTRY VARCHAR(100),
    TEAM_IMAGE VARCHAR(255) NOT NULL,
    TEAM_COVER VARCHAR(255),
    TEAM_CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    TEAM_FACEBOOK VARCHAR(255),
    TEAM_WHATSAPP_GROUP VARCHAR(255),
    TEAM_TWITTER VARCHAR(255),
    TEAM_TELEGRAM VARCHAR(255),
    TEAM_INSTAGRAM VARCHAR(255),
    TEAM_TIKTOK VARCHAR(255),
    TEAM_EMAIL VARCHAR(160),

    CONSTRAINT FK_ID_ADM_TEAMS FOREIGN KEY (TEAM_ID_ADM) REFERENCES JB_USERS (US_ID)
);

CREATE TABLE JB_USERS (
    US_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    US_NAME VARCHAR(100) NOT NULL,
    US_LASTNAME VARCHAR(100) NOT NULL,
    US_IMAGE VARCHAR(255) NOT NULL,
    US_AGE INT NOT NULL,
    US_EMAIL VARCHAR(150) NOT NULL,
    US_GENRE CHAR(1) NOT NULL,
    US_ALLOW_SMS_NOTIFY CHAR(1) DEFAULT 'N',
    US_ALLOW_PUSH_NOTIFY CHAR(1) DEFAULT 'N',
    US_PASSWORD VARCHAR(255) NOT NULL,
    US_THEME VARCHAR(10) DEFAULT 'WHITE',
    US_LANGUAGE VARCHAR(10) DEFAULT 'PT-BR',
    US_BIO TEXT,
    US_CITY VARCHAR(100),
    US_STATE VARCHAR(100), 
    US_COUNTRY VARCHAR(100) DEFAULT 'BRAZIL',
    US_COVER VARCHAR(255),
    US_DDD CHAR(2) NOT NULL,
    US_PHONE CHAR(9) NOT NULL
);

CREATE TABLE JB_TEAM_USERS (
    TU_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TU_ID_TEAM INT NOT NULL,
    TU_ID_USER INT NOT NULL,
    TU_ROLE CHAR(3) NOT NULL,
    
    CONSTRAINT FK_TU_ID_TEAM FOREIGN KEY (TU_ID_TEAM) REFERENCES JB_TEAMS (TEAM_ID), 
    CONSTRAINT FK_TU_ID_USER FOREIGN KEY (TU_ID_USER) REFERENCES JB_USERS (US_ID)
);

CREATE TABLE JB_EVENTS(
    EV_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    EV_ID_ADM INT NOT NULL,
    EV_INPUT_VALUE DOUBLE DEFAULT NULL,
    EV_TYPE_PARTICIPANTS CHAR(1) DEFAULT "T",
    EV_DESCRIPTION TEXT DEFAULT NULL,
    EV_LATITUDE VARCHAR(255) NOT NULL,
    EV_LONGITUDE VARCHAR(255) NOT NULL,
    EV_ADDRESS VARCHAR(255) NOT NULL,
    EV_NUMBER VARCHAR(10) NOT NULL,
    EV_COMPLEMENT VARCHAR(100),
    EV_DT_CREATED TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    EV_INITIAL_DATE TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    EV_FINAL_DATE DATETIME,

    CONSTRAINT FK_ID_ADM_EVENT FOREIGN KEY (EV_ID_ADM) REFERENCES JB_USERS (US_ID)
);

CREATE TABLE JB_HISTORIC_EMAIL(
    HE_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    HE_ID_USER INT NOT NULL,
    HE_TYPE_EMAIL VARCHAR(100) NOT NULL DEFAULT "PROMOCIONAL",
    HE_STATUS CHAR(1),
    HE_CODE_RECOVER CHAR(4),
    HE_DT_SEND TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_HE_ID_USER FOREIGN KEY (HE_ID_USER) REFERENCES JB_USERS (US_ID)
);

CREATE TABLE JB_PARTICIPANTS(
     PA_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     PA_ID_EVENT INT NOT NULL,
     PA_ID_USER INT,
     PA_ID_TEAM INT,

     CONSTRAINT FK_PA_ID_USER FOREIGN KEY (PA_ID_USER) REFERENCES JB_USERS (US_ID),
     CONSTRAINT FK_PA_ID_TEAM FOREIGN KEY (PA_ID_TEAM) REFERENCES JB_TEAMS (TEAM_ID),
     CONSTRAINT FK_PA_ID_EVENT FOREIGN KEY (PA_ID_EVENT) REFERENCES JB_EVENTS (EV_ID) 
);

select * from `JB_USERS` where DATE_ADD(HE_DT_SEND, INTERVAL 30 MINUTE) > NOW() order by `HE_ID` desc limit 1