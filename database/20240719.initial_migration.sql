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

CREATE VIEW user_event_log_view AS
SELECT id, module, user_action, user_id, create_at, event_content 
FROM user_event_log;

ALTER TABLE user_event_log 
MODIFY COLUMN create_at DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP) 

ALTER VIEW products_view AS
SELECT p.id, p.sku, p.name, p.brand_id, b.name AS brand_name, p.active,p. user_id, p.create_at, p.update_at
FROM products AS p
INNER JOIN brands AS b ON (b.id = p.brand_id)
WHERE p.delete_at is null 


CREATE TABLE stock_transactions
(
	id BIGINT auto_increment primary key,
	product_id BIGINT not null,
	quantity DECIMAL not null,
	type_move int not null,
	active BIT NOT NULL,
	processed BIT,
	user_id BIGINT NOT NULL, 
	create_at DATETIME DEFAULT(current_timestamp),
	update_at DATETIME,
	delete_at DATETIME,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(user_id) REFERENCES users(id)
)

CREATE INDEX idx_stock_transactions_product_id_type_move ON stock_transactions(product_id, type_move, processed, active, create_at, delete_at )

CREATE INDEX idx_stock_transactions_processed ON stock_transactions(processed, active, create_at, delete_at )

CREATE VIEW stock_transactions_view AS 
SELECT 
	id,
	product_id,
	quantity,
	type_move,
	active
	processed,
	user_id, 
	create_at,
	update_at
FROM stock_transactions
WHERE
	delete_at IS NULL

CREATE TABLE inventory(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	product_id BIGINT NOT NULL,
	quantity DECIMAL NOT NULL,
	allow_negative BIT,
	active BIT,
	user_id BIGINT NOT NULL,
	create_at DATETIME DEFAULT (current_timestamp),
	update_at DATETIME,
	delete_at DATETIME,
	FOREIGN KEY(product_id) REFERENCES products(id),
	FOREIGN KEY(user_id) REFERENCES products(id)
)
CREATE INDEX idx_inventory_product_id ON inventory(product_id )

CREATE INDEX idx_inventory ON inventory(product_id, active, create_at, delete_at )

CREATE INDEX idx_inventory_active ON inventory(active, create_at, delete_at )

CREATE VIEW inventory_view AS 
SELECT 
	id,
	product_id,
	quantity,
	allow_negative,
	active,
	user_id, 
	create_at,
	update_at
FROM inventory
WHERE
	delete_at IS NULL;

ALTER TABLE stock_transactions
MODIFY COLUMN quantity DECIMAL NOT NULL;


--___
ALTER TABLE inventory 
MODIFY COLUMN allow_negative BIT NOT NULL DEFAULT(0)


alter table inventory 
	add unique key product_id(product_id);;
	
ALTER TABLE inventory
DROP FOREIGN KEY inventory_ibfk_2

ALTER TABLE inventory
ADD CONSTRAINT inventory_ibfk_2
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER VIEW products_view AS 
SELECT p.id, p.sku, p.name, p.brand_id, b.name AS brand_name, i.quantity , p.active,p. user_id, p.create_at, p.update_at
FROM products AS p
INNER JOIN brands AS b ON (b.id = p.brand_id)
INNER JOIN inventory AS  i ON (p.id = i.product_id)
WHERE p.delete_at is null 


ALTER TABLE stock_transactions
MODIFY COLUMN type_move varchar(3) NOT NULL;

----

CREATE table customers(
	id bigint auto_increment primary key,
	firstname varchar(255) not null,
	lastname varchar(255) not null,
	active bit, 
	create_at datetime not null default (current_timestamp),
	update_at datetime,
	delete_at datetime
)

CREATE INDEX idx_customer_firstname ON customers(firstname, lastname, active);

CREATE table sales_orders(
	id bigint auto_increment primary key,
	legal_number varchar(255) not null,
	customer_id bigint not null,
	subtotal decimal not null,
	total decimal not null,
	active bit,
	create_at datetime default (current_timestamp),
	update_at datetime,
	delete_at datetime
)
alter table sales_orders add unique key legal_number(legal_number);

CREATE INDEX idx_sales_orders_legal_number ON sales_orders(legal_number);
CREATE INDEX idx_sales_orders_customer ON sales_orders(customer_id, active);

CREATE table sales_order_details(
	id bigint auto_increment primary key,
	legal_number varchar(255) not null,
	product_id bigint not null,
	quantity decimal not null,
	unit_price decimal,
	total decimal,
	create_at datetime not null default(current_timestamp)
)

CREATE INDEX idx_sales_ordes_details_legal_number ON sales_order_details(legal_number);


CREATE table providers(
	id bigint auto_increment primary key,
	firstname varchar(255) not null,
	lastname varchar(255) not null,
	active bit, 
	create_at datetime not null default (current_timestamp),
	update_at datetime,
	delete_at datetime
)

CREATE INDEX idx_providers_firstname ON providers(firstname, lastname, active);

CREATE table purchases_orders(
	id bigint auto_increment primary key,
	legal_number varchar(255) not null,
	provider_id bigint not null,
	subtotal decimal not null,
	total decimal not null,
	active bit,
	create_at DATETIME not null default (current_timestamp),
	update_at datetime,
	delete_at DATETIME,
	foreign KEY(provider_id) references providers(id)
)

alter table purchases_orders add unique key legal_number(legal_number);

CREATE INDEX idx_spurchases_orders_legal_number ON purchases_orders(legal_number);
CREATE INDEX idx_purchases_orders_provider ON purchases_orders(provider_id, active);

CREATE table purchases_orders_details(
	id bigint auto_increment primary key,
	purchases_orders_id bigint  not null,  
	legal_number varchar(255) not null,
	product_id bigint not null,
	quantity decimal not null,
	unit_price decimal,
	total decimal,
	create_at datetime not null default(current_timestamp),
	foreign key(purchases_orders_id) references purchases_orders(id)
)

CREATE INDEX idx_purchases_orders_details ON purchases_orders_details(legal_number);


ALTER  TABLE sales_orders 
ADD CONSTRAINT  sales_orders_fk_customer
FOREIGN  KEY (customer_id) references customers(id)

DROP TABLE sales_order_details

CREATE table sales_orders_details(
	id bigint auto_increment primary key,
 	sales_orders_id BIGINT NOT null,
	legal_number varchar(255) not null,
	product_id bigint not null,
	quantity decimal not null,
	unit_price decimal,
	total decimal,
	create_at datetime not null default(CURRENT_TIMESTAMP),
	FOREIGN KEY  (sales_orders_id) references sales_orders(id)
)
	
CREATE INDEX idx_sales_ordes_details_legal_number ON sales_orders_details(legal_number);

CREATE VIEW customers_view AS
SELECT id, firstname, lastname, active, create_at, update_at FROM customers
WHERE delete_at is null;

CREATE VIEW sales_orders_view AS
SELECT so.id, so.legal_number, c.firstname as customer_firstname, c.lastname as customer_lastname, so.subtotal, so.total, so.active, so.create_at, so.update_at 
FROM sales_orders as so
INNER JOIN customers as c ON (so.customer_id = c.id)
WHERE so.delete_at is null;

CREATE VIEW sales_orders_details_view AS 
SELECT sod.id, sod.legal_number, sod.product_id, p.name AS product_name, sod.quantity, sod.unit_price, sod.total, sod.create_at 
FROM sales_orders_details as sod 
INNER JOIN products AS p

CREATE VIEW providers_view AS
SELECT id, firstname, lastname, active, create_at, update_at FROM providers
WHERE delete_at is null;

CREATE VIEW purchases_orders_view AS
SELECT po.id, po.legal_number, p.firstname as provider_firstname, p.lastname as provider_lastname, po.subtotal, po.total, po.active, po.create_at, po.update_at 
FROM purchases_orders as po
INNER JOIN providers as p ON (po.provider_id = p.id)
WHERE po.delete_at is null;

ALTER TABLE purchases_orders_details
ADD provider_id bigint not null;

alter table purchases_orders_details
ADD CONSTRAINT purchases_orders_details_fk_provider
FOREIGN KEY (provider_id) references providers(id)

CREATE VIEW purchases_orders_details_view AS 
SELECT pod.id, pod.legal_number, pod.product_id, pod.quantity, pod.unit_price, pod.total, pod.create_at,prov.firstname as provider_firstname
FROM purchases_orders_details AS pod
INNER JOIN providers as prov ON (pod.provider_id = prov.id)
INNER JOIN products as prod ON (pod.product_id = prod.id) 

ALTER TABLE customers 
ADD user_id BIGINT NOT NULL;

ALTER TABLE customers
ADD CONSTRAINT customer_user_fk
FOREIGN KEY (user_id) REFERENCES users(id)

ALTER TABLE customers
ADD cust_code VARCHAR(10) NOT NULL;

ALTER TABLE customers 
ADD UNIQUE KEY cust_code(cust_code)

ALTER TABLE sales_orders 
ADD user_id BIGINT NOT NULL;

ALTER TABLE sales_orders
ADD CONSTRAINT sales_orders_customer_fk
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER VIEW customers_view AS 
SELECT id,cust_code, firstname, lastname, user_id, active, create_at, update_at 
FROM customers
WHERE delete_at IS null

ALTER VIEW sales_orders_view AS 
SELECT so.id, so.legal_number, so.customer_id, c.firstname as customer_firstname, c.lastname as customer_lastname, so.subtotal, so.total, so.active, so.create_at, so.update_at
, so.user_id
FROM sales_orders as so
INNER JOIN customers as c ON (so.customer_id = c.id)
WHERE so.delete_at is null;


ALTER TABLE sales_orders DROP CONSTRAINT sales_orders_customer_fk;
ALTER TABLE sales_orders DROP CONSTRAINT sales_orders_fk_customer;

ALTER TABLE sales_orders
ADD CONSTRAINT sales_orders_user_fk
FOREIGN KEY (user_id) REFERENCES users(id)

ALTER TABLE sales_orders
ADD CONSTRAINT sales_orders_customer_fk
FOREIGN KEY (customer_id) REFERENCES customers(id)

ALTER VIEW sales_orders_details_view AS 
SELECT sod.id, sod.legal_number, sod.product_id, p.name AS product_name, sod.quantity, sod.unit_price, sod.total, sod.create_at 
FROM sales_orders_details AS sod 
INNER JOIN products AS p ON (sod.product_id = p.id)
INNER JOIN sales_orders AS so ON ( sod.sales_orders_id = so.id)

ALTER TABLE providers
ADD prov_code VARCHAR(10) NOT NULL;


ALTER TABLE providers
ADD UNIQUE KEY prov_code(prov_code)

ALTER TABLE providers 
ADD user_id BIGINT NOT NULL;

ALTER TABLE providers 
ADD CONSTRAINT providers_user_fk
FOREIGN KEY (user_id) REFERENCES users(id)

ALTER VIEW providers_view AS 
SELECT 
	id, prov_code, firstname, lastname, ACTIVE, create_at, update_at, user_id
 FROM providers 
 WHERE delete_at IS NULL 

 ALTER TABLE purchases_orders
ADD user_id BIGINT NOT NULL;

ALTER TABLE purchases_orders
ADD CONSTRAINT purchases_orders_users_fk 
FOREIGN KEY (user_id) REFERENCES users(id)
--hostorial de transacciones para produtos
ALTER VIEW stock_transactions_view AS 
SELECT 
	st.id,
	st.product_id,
	p.name AS product_name,
	st.quantity,
	st.type_move,
	st.active,
	st.processed,
	st.user_id, 
	st.create_at,
	st.update_at
FROM stock_transactions st  
INNER JOIN products p ON (st.product_id = p.id)
WHERE
	st.delete_at IS NULL;

ALTER VIEW inventory_view AS 
SELECT i.id, i.product_id, i.quantity, i.allow_negative, i.active, i.user_id, i.create_at, i.update_at,
p.sku, p.name as product_name, p.brand_id,
b.name as brand_name, b.photo_path
FROM inventory i
INNER JOIN products p ON (i.product_id = p.id)
INNER JOIN brands b ON (p.brand_id = b.id)


ALTER VIEW stock_transactions_view AS 
SELECT 
	st.id,
	st.product_id,
	p.sku,
	p.`name` AS product_name,
	p.brand_id,
	b.`NAME` AS brand_name,
	st.quantity,
	st.type_move,
	st.active,
	st.processed,
	st.user_id,
	st.create_at,
	st.update_at
	FROM stock_transactions st 
	INNER JOIN products p ON (st.product_id = p.id)
	INNER JOIN brands b ON (p.brand_id = b.id)
WHERE
	st.delete_at IS NULL


ALTER VIEW products_view AS
SELECT 
	p.id, p.sku, 
	p.name, 
	p.brand_id, 
	b.name AS brand_name, 
	IFNULL(i.quantity, 0) AS quantity, 
	p.active,p. 
	user_id, 
	p.create_at, 
	p.update_at
FROM products AS p
INNER JOIN brands AS b ON (b.id = p.brand_id)
LEFT JOIN inventory AS  i ON (p.id = i.product_id)
WHERE p.delete_at is null 

CREATE VIEW stock_transactions_quantity_view AS
SELECT 
    product_id,
    SUM(CASE 
        WHEN type_move = 'IN' THEN quantity
        WHEN type_move = 'OUT' THEN -quantity
        ELSE 0
    END) AS quantity
FROM 
    stock_transactions
GROUP BY 
    product_id;


CREATE VIEW stock_transactions_dates AS
SELECT 
    product_id,
    MIN(create_at) AS create_at,
    MAX(create_at) AS update_at
FROM 
    stock_transactions
GROUP BY 
    product_id;

DROP VIEW stock_transactions_dates

CREATE VIEW stock_transactions_dates_view AS
SELECT 
    product_id,
    MIN(create_at) AS create_at,
    MAX(create_at) AS update_at
FROM 
    stock_transactions
GROUP BY 
    product_id;


ALTER VIEW stock_transactions_quantity_view AS
SELECT 
    st.product_id,
    SUM(CASE 
        WHEN type_move = 'IN' THEN st.quantity
        WHEN type_move = 'OUT' THEN -st.quantity
        ELSE 0
    END) AS quantity
FROM 
    stock_transactions st
INNER JOIN products_view AS pv ON (st.product_id = pv.id)
GROUP BY 
    product_id;


ALTER VIEW stock_transactions_dates_view AS
SELECT 
    st.product_id,
    MIN(st.create_at) AS create_at,
    MAX(st.create_at) AS update_at
FROM 
   stock_transactions AS st
	INNER JOIN products_view AS pv ON (st.product_id = pv.id)
GROUP BY 
    product_id;

ALTER VIEW inventory_view AS
SELECT 
    p.id AS product_id,
    p.sku,
    p.name,
    p.active,
    p.user_id,
    COALESCE(pq.quantity, 0) AS quantity,
    pd.create_at,
    pd.update_at
FROM 
    products AS p
LEFT JOIN 
    stock_transactions_quantity_view AS pq ON p.id = pq.product_id
LEFT JOIN 
    stock_transactions_dates_view AS pd ON p.id = pd.product_id;


DROP TABLE inventory;

ALTER VIEW products_view AS
SELECT 
	p.id, p.sku, 
	p.name, 
	p.brand_id, 
	b.name AS brand_name,  
	p.active,p. 
	user_id, 
	p.create_at, 
	p.update_at
FROM products AS p
INNER JOIN brands AS b ON (b.id = p.brand_id)
WHERE p.delete_at is NULL 


ALTER VIEW inventory_view AS 
SELECT 
    p.id AS product_id,
    p.sku,
    p.name,
    p.active,
    p.user_id,
    COALESCE(pq.quantity, 0) AS quantity,
    pd.create_at,
    pd.update_at
FROM 
    products_view AS p
LEFT JOIN 
    stock_transactions_quantity_view AS pq ON p.id = pq.product_id
LEFT JOIN 
    stock_transactions_dates_view AS pd ON p.id = pd.product_id 

	alter table products
MODIFY COLUMN create_at DATE 

alter table products
MODIFY COLUMN update_at DATE 

alter table brands
MODIFY COLUMN create_at DATE;
    
alter table brands
MODIFY COLUMN update_at DATE;

alter table customers
MODIFY COLUMN create_at DATE;
    
alter table customers
MODIFY COLUMN update_at DATE;

alter table providers
MODIFY COLUMN create_at DATE;
    
alter table providers
MODIFY COLUMN update_at DATE;

alter table purchases_orders
MODIFY COLUMN create_at DATE;
    
alter table purchases_orders
MODIFY COLUMN update_at DATE;

alter table purchases_orders_details
MODIFY COLUMN create_at DATE;
    
-- alter table purchases_orders_details MODIFY COLUMN update_at DATE;

alter table sales_orders
MODIFY COLUMN create_at DATE;
    
alter table sales_orders
MODIFY COLUMN update_at DATE;

alter table sales_orders_details MODIFY COLUMN create_at DATE;
    
-- alter table sales_orders_details MODIFY COLUMN update_at DATE;

alter table stock_transactions
MODIFY COLUMN create_at DATE;
    
alter table stock_transactions
MODIFY COLUMN update_at DATE;

CREATE VIEW products_inventary_view AS 
SELECT pw.id, pw.sku, pw.name, pw.brand_id, pw.brand_name, pw.active, pw.user_id, pw.create_at, pw.update_at,
COALESCE( stqv.quantity, 0 ) AS quantity
FROM products_view pw 
LEFT JOIN stock_transactions_quantity_view stqv ON ( pw.id = stqv.product_id );

DELETE FROM providers 

ALTER TABLE providers 
ADD COLUMN brand_id BIGINT NOT NULL

ALTER TABLE providers 
ADD CONSTRAINT providers_brand_fk
FOREIGN KEY (brand_id) REFERENCES brands(id)

ALTER VIEW providers_view AS 
SELECT 
	id, prov_code, firstname, lastname, brand_id, ACTIVE, create_at, update_at, user_id
 FROM providers 
 WHERE delete_at IS NULL 

 