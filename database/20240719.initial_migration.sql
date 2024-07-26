create table brands(
	id int auto_increment primary key,
	name varchar(50) not null, 
	active boolean null,
	create_at datetime not null default(current_timestamp),
	update_at datetime null,
	delete_at datetime null
)

create table products(
	id int auto_increment primary key,
	sku varchar(50) not null,
	name varchar(50) not null,
	brand_id int not null,
	active boolean null,
	create_at datetime not null default(CURRENT_TIMESTAMP),
	update_at datetime null,
	delete_at datetime null,
	foreign key(brand_id) references brands(id)
);

create table users(
	id  int auto_increment primary key,
	name varchar(50) not null,
	email varchar(50) not null, 
	password varchar(255) not null,
	active bit,
	user_id int,
	create_at datetime not null default current_timestamp,
	update_at datetime null, 
	delete_at datetime null
)

alter table users 
	add unique key email(email);
	
CREATE VIEW users_view AS
SELECT id, name, email, password,active, user_id, create_at, update_at, delete_at
FROM users
WHERE delete_at is not null;

create table photos(
	id int auto_increment not null primary key,
	type_name varchar(50) not null,
	path varchar(255) not null
)

CREATE INDEX photos_index
ON photos (id, type_name);


create table user_profile(
	id int auto_increment not null primary key,
	user_id int not null,
	photo_id int not null,
	
	foreign key(user_id) references users(id),
	foreign key(photo_id) references photos(id)
)

CREATE INDEX user_photo_index
ON user_profile (id, user_id);

create table products_profile(
	id int auto_increment not null primary key,
	product_id int not null, 
	photo_id int not null, 
	
	foreign key(product_id) references products(id),
	foreign key(photo_id) references photos(id)
)

CREATE INDEX product_photo_index
ON products_profile (id, product_id);

CREATE VIEW brands_view AS 
SELECT id, name, active, create_at, update_at, delete_at 
FROM brands
WHERE delete_at IS NULL


ALTER VIEW users_view AS
SELECT id, name, email, password,active, user_id, create_at, update_at, delete_at
FROM users
WHERE delete_at is null;


CREATE VIEW products_view AS 
SELECT id, sku, name, brand_id, active, create_at, update_at
FROM products
WHERE delete_at is null;

ALTER TABLE products 
ADD user_id int 

ALTER VIEW products_view AS 
SELECT id, sku, name, brand_id, active, user_id, create_at, update_at
FROM products
WHERE delete_at is null;

-- +20240724.update.relation.brand.product
ALTER VIEW products_view AS 
SELECT p.id, p.sku, p.name, p.brand_id, b.name AS brand_name, p.active,p. user_id, p.create_at, p.update_at, p.delete_at
FROM products AS p
INNER JOIN brands AS b ON (b.id = p.brand_id)
WHERE p.delete_at is null;

-- +20240724.update.datatypes_int.to.bigint
ALTER TABLE products DROP FOREIGN KEY products_ibfk_1;

ALTER TABLE brands 
MODIFY COLUMN id BIGINT AUTO_INCREMENT 

ALTER TABLE products MODIFY COLUMN brand_id BIGINT;

ALTER TABLE products
ADD CONSTRAINT produts_brands_fk
FOREIGN KEY (brand_id) REFERENCES brands(id)


DROP TABLE products_profile;
DROP TABLE user_profile;
DROP TABLE photos;

ALTER TABLE products
MODIFY COLUMN id BIGINT AUTO_INCREMENT

ALTER TABLE users
MODIFY COLUMN id BIGINT AUTO_INCREMENT

ALTER TABLE user_id
MODIFY COLUMN name VARCHAR(255) NOT NULL
ADD photo_path VARCHAR(255) NOT NULL


ALTER TABLE users 
MODIFY COLUMN name VARCHAR(255) NOT NULL, 
ADD photo_path VARCHAR(255) NOT NULL;


ALTER TABLE users
MODIFY COLUMN user_id BIGINT 

DELETE FROM users; 

ALTER TABLE users
ADD CONSTRAINT users_users_fk
FOREIGN KEY (user_id) REFERENCES users(id)

DELETE FROM brands 
ALTER TABLE brands 
ADD user_id BIGINT NOT NULL


ALTER TABLE brands 
ADD CONSTRAINT brands_user_fk
FOREIGN KEY (user_id) REFERENCES users(id)

ALTER TABLE products
MODIFY COLUMN user_id BIGINT NOT NULL

ALTER TABLE products 
ADD CONSTRAINT products_user_fk
FOREIGN KEY (user_id) REFERENCES users(id)

ALTER TABLE brands 
MODIFY COLUMN active BIT

ALTER TABLE products 
MODIFY COLUMN active BIT

ALTER DATABASE nodedb
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

ALTER TABLE brands
CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE products
CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE users
CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE product_photos (
	id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	product_id BIGINT NOT NULL,
	photo_path VARCHAR(255) NOT NULL,
	create_at DATETIME NOT NULL DEFAULT(CURRENT_TIMESTAMP),
	update_at DATETIME NULL,
	delete_at DATETIME NULL,
	user_id BIGINT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
)

--structure log table
CREATE TABLE user_event_log(
	id int AUTO_INCREMENT primary key,
	module VARCHAR(50) NOT NULL,
	user_action VARCHAR(50) NOT NULL,
	user_id BIGINT NOT NULL,
	create_at DATETIME DEFAULT (CURRENT_TIMESTAMP),
	event_content JSON not null,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

--creates index 
CREATE INDEX idx_user_event_log_id ON user_event_log (id);
CREATE INDEX idx_user_event_log_module ON user_event_log (module, user_action);
CREATE INDEX idx_user_event_log_user_id ON user_event_log (user_id);

--indice para optimizar las busquedas por identificador
CREATE INDEX idx_brands_id ON brands(id);
--indice para optimizar las busquedas por nombre
CREATE INDEX idx_brands_name ON brands(name, active, create_at,  update_at, delete_at);

--products 
CREATE INDEX idx_products_id ON products(id);
CREATE INDEX idx_products_name ON products(sku, name, active, create_at, update_at, delete_at);
CREATE INDEX idx_products_brand_id ON products(brand_id);

CREATE INDEX idx_product_photos_id ON product_photos(id)
CREATE INDEX idx_product_photos_product_id ON product_photos(product_id);

CREATE INDEX idx_users_id ON users(id);
CREATE INDEX idx_users_name ON users(name, active, create_at, update_at, delete_at);
CREATE INDEX idx_users_email ON users(email, active, create_at, update_at, delete_at);


ALTER TABLE user_event_log
MODIFY COLUMN Id BIGINT AUTO_INCREMENT 


ALTER VIEW users_view AS
SELECT id, name, email, password,active, user_id, create_at, update_at, delete_at, photo_path
FROM users
WHERE delete_at is not null;

alter table brands
add photo_path varchar(255)

ALTER VIEW brands_view
SELECT id, name, active, create_at, update_at, delete_at, photo_path
FROM brands
WHERE delete_at IS NULL

ALTER TABLE brands 
MODIFY COLUMN NAME  VARCHAR(255) NOT NULL 

ALTER TABLE products 
MODIFY COLUMN sku VARCHAR(255) NOT NULL ,
MODIFY COLUMN name VARCHAR(255) NOT NULL 

ALTER TABLE users 
MODIFY COLUMN email VARCHAR(255) NOT NULL 

ALTER TABLE user_event_log 
MODIFY COLUMN module VARCHAR(255) NOT NULL ,
MODIFY COLUMN user_action VARCHAR(255) NOT NULL 