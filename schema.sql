DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Europa Universalis IV", "Video Games", 30.00, 150),
  ("Gary Grigsby's War in the East", "Video Games", 80.00, 200),
  ("Bacon-Flavored Spam", "Food and Drink", 5.75, 50),
  ("UV-Protected Sunglasses", "Tactical Gear", 45.00, 7),
  ("8-Inch Tactical Blade", "Tactical Gear", 54.25, 35),
  ("REI Backpacking Tent", "Tactical Gear", 285.00, 4),
  ("Debbie Does Dallas Digital Download", "Movies", 25.00, 900),
  ("Blade Runner", "Movies", 25.50, 300),
  ("Axis & Allies", "Board Games", 30.50, 15),
  ("Settlers of Catan", "Board Games", 35.00, 4);
