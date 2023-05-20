CREATE SEQUENCE city_seq;
CREATE TABLE cities (
                        city_id INT DEFAULT NEXTVAL ('city_seq') PRIMARY KEY,
                        city VARCHAR(255) NOT NULL
);

CREATE SEQUENCE states_seq;
CREATE TABLE states (
                        state_id INT DEFAULT NEXTVAL ('states_seq') PRIMARY KEY,
                        state VARCHAR(255) NOT NULL,
                        uf VARCHAR(2) NOT NULL
);

CREATE SEQUENCE address_seq;
CREATE TABLE address(
                        address_id INT DEFAULT NEXTVAL ('address_seq') PRIMARY KEY,
                        street VARCHAR(255) NOT NULL,
                        number INT NOT NULL,
                        district VARCHAR(100) NOT NULL,
                        zip_code VARCHAR(100),
                        city_id INT NOT NULL,
                        state_id INT NOT NULL,

                        CONSTRAINT FK_city_id FOREIGN KEY (city_id) REFERENCES cities(city_id),
                        CONSTRAINT FK_state_id FOREIGN KEY (state_id) REFERENCES states(state_id)
);
CREATE SEQUENCE institution_seq;
CREATE TABLE institution (
                             institution_id INT DEFAULT NEXTVAL ('institution_seq') PRIMARY KEY,
                             institution_name VARCHAR (50),
                             address_id INT NOT NULL,
                             phone1 VARCHAR(100) NOT NULL,
                             phone2 VARCHAR(100) NOT NULL,
                             legal_document VARCHAR(40) NOT NULL,
                             email VARCHAR(100) NOT NULL unique,

                             created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                             deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                             CONSTRAINT FK_address_id FOREIGN KEY (address_id) REFERENCES address(address_id)


);

CREATE SEQUENCE third_party_seq;
CREATE TABLE third_party (
                             third_party_id INT DEFAULT NEXTVAL ('third_party_seq') PRIMARY KEY,
                             third_party_name VARCHAR (50),
                             address_id INT NOT NULL,
                             phone1 VARCHAR(100) NOT NULL,
                             phone2 VARCHAR(100) NOT NULL,
                             legal_document VARCHAR(40) NOT NULL,
                             email VARCHAR(100) NOT NULL ,
                             area_of_operation VARCHAR(100) NOT NULL,

                             created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                             deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                             CONSTRAINT FK_address_id FOREIGN KEY (address_id) REFERENCES address(address_id)
);


CREATE SEQUENCE users_seq;
CREATE TABLE users (
                       user_id INT DEFAULT NEXTVAL ('users_seq') PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(100) NOT NULL unique,
                       password VARCHAR(255) NOT NULL,
                       sex VARCHAR(1) NOT NULL,
                       legal_document VARCHAR(11) NOT NULL,
                       address_id INT NOT NULL,
                       birth_date TIMESTAMP(0) NULL DEFAULT NULL,
                       phone1 VARCHAR(100) NOT NULL,
                       phone2 VARCHAR(100) NOT NULL,
                       wallet NUMERIC,



                       created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                       deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                       CONSTRAINT FK_address_id FOREIGN KEY (address_id) REFERENCES address(address_id)

);

CREATE SEQUENCE users_relatedEntity_seq;
CREATE TABLE users_related_entity (

                                     users_relatedEntity_id INT DEFAULT NEXTVAL ('users_relatedEntity_seq') PRIMARY KEY,
                                     user_id INT CHECK (user_id > 0) NOT NULL,
                                     institution_id INT,
                                     third_party_id INT,

                                     created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                                     deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                                     CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
                                     CONSTRAINT FK_institution_id FOREIGN KEY (institution_id) REFERENCES institution(institution_id),
                                     CONSTRAINT FK_third_party_id FOREIGN KEY (third_party_id) REFERENCES third_party(third_party_id)

);

CREATE SEQUENCE country_code_seq;
CREATE TABLE country_code(
                             country_code_id INT DEFAULT NEXTVAL('country_code_seq') PRIMARY KEY,
                             country_code INT NOT NULL UNIQUE
);

CREATE SEQUENCE phones_seq;
CREATE TABLE phones(
                       phones_id INT DEFAULT NEXTVAL ('phones_seq') PRIMARY KEY,
                       phone VARCHAR(12) NOT NULL,
                       country_code_id INT NOT NULL,
                       user_id int not null,

                       CONSTRAINT FK_users_id FOREIGN KEY (user_id) REFERENCES users(user_id),
                       CONSTRAINT FK_country_code FOREIGN KEY (country_code_id) REFERENCES country_code(country_code_id)
);


CREATE SEQUENCE roles_seq;
CREATE TABLE roles (
                       roles_id INT DEFAULT NEXTVAL ('roles_seq') PRIMARY KEY,
                       name varchar(45) NOT NULL UNIQUE,

                       created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                       deleted_at TIMESTAMP(0) NULL DEFAULT NULL
);

CREATE SEQUENCE department_roles_seq;
CREATE TABLE department_roles (
                       department_roles_id INT DEFAULT NEXTVAL ('department_roles_seq') PRIMARY KEY,
                       name varchar(45) NOT NULL UNIQUE,

                       created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                       deleted_at TIMESTAMP(0) NULL DEFAULT NULL
);


CREATE SEQUENCE user_roles_seq;
CREATE TABLE user_roles (
                    user_roles_id INT DEFAULT NEXTVAL ('user_roles_seq') PRIMARY KEY,
                    user_id INT CHECK (user_id > 0) NOT NULL,
                    role_id INT CHECK (role_id > 0) NOT NULL,

                    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                    deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                    CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
                    CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES roles(roles_id)
);

CREATE SEQUENCE department_seq;
CREATE TABLE department (
                            department_id INT DEFAULT NEXTVAL ('department_seq') PRIMARY KEY,
                            institution_id INT CHECK (institution_id > 0) NOT NULL,
                            department_name VARCHAR (50),


                            created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                            deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                            CONSTRAINT FK_institution_id FOREIGN KEY (institution_id) REFERENCES institution(institution_id)

);

CREATE SEQUENCE user_department_seq;
CREATE TABLE user_department (

                        user_department_id INT DEFAULT NEXTVAL ('user_department_seq') PRIMARY KEY,
                        department_roles_id INT CHECK (department_roles_id > 0) NOT NULL,
                        user_id INT CHECK (user_id > 0) NOT NULL,
                        department_id INT CHECK (department_id > 0) NOT NULL,

                        created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                        deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                        CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
                        CONSTRAINT FK_department_id FOREIGN KEY (department_id) REFERENCES department(department_id),
                        CONSTRAINT FK_department_roles_id FOREIGN KEY (department_roles_id) REFERENCES department_roles(department_roles_id)

);
CREATE SEQUENCE advantages_seq;
CREATE TABLE advantages (
                            advantages_id INT DEFAULT NEXTVAL ('advantages_seq') PRIMARY KEY,
                            advantage_name VARCHAR (50),
                            advantage_description VARCHAR(100) NOT NULL,
                            price MONEY,
                            advantage_category VARCHAR (50),
                            coupon_code varchar(50),
                            status varchar(50),
                            amount varchar(50),
                            validation_date TIMESTAMP,
                            third_party_id INT CHECK (third_party_id > 0) NOT NULL,

                            created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                            deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                            CONSTRAINT FK_third_party_id FOREIGN KEY (third_party_id) REFERENCES third_party(third_party_id)

);

CREATE SEQUENCE transactions_seq;
CREATE TABLE transactions (
                            transaction_id INT DEFAULT NEXTVAL ('transactions_seq') PRIMARY KEY,
                            origin_account_id INT CHECK (origin_account_id > 0) NOT NULL,
                            destination_account_id INT CHECK (destination_account_id > 0) NOT NULL,
                            transaction_type VARCHAR (50),
                            description VARCHAR (250),
                            transaction_date TIMESTAMP(0) NULL DEFAULT NULL,
                            advantages_id INT CHECK (advantages_id > 0),
                            amount Money,

                            created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                            deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                            CONSTRAINT FK_origin_account_id FOREIGN KEY (origin_account_id) REFERENCES users(user_id),
                            CONSTRAINT FK_destination_account_id FOREIGN KEY (destination_account_id) REFERENCES users(user_id),
                            CONSTRAINT FK_advantages_id  FOREIGN KEY (advantages_id) REFERENCES advantages(advantages_id)
);



CREATE SEQUENCE advantages_images_seq;
CREATE TABLE advantages_images (
                            advantages_images_id INT DEFAULT NEXTVAL ('advantages_images_seq') PRIMARY KEY,
                            advantages_id INT CHECK (advantages_id > 0) NOT NULL,
                            advantage_image_name VARCHAR (50),
                            advantage_image_description VARCHAR(100) NOT NULL,
                            advantage_image_path VARCHAR(100) NOT NULL,

                            created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
                            deleted_at TIMESTAMP(0) NULL DEFAULT NULL,

                            CONSTRAINT FK_advantages_id  FOREIGN KEY (advantages_id) REFERENCES advantages(advantages_id)
);