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