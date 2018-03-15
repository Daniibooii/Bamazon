DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT(11,4) NULL,
  stock_quantity INT(11) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("", "", "", "");
