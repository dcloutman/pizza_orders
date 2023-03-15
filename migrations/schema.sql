CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

CREATE TABLE crusts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE sauces (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE cheese_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE toppings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE sizes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  is_pizza TINYINT(1) NOT NULL DEFAULT 0
);

CREATE TABLE pizza_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  menu_item_id INT NOT NULL,
  crust_id INT NOT NULL,
  sauce_id INT NOT NULL,
  cheese_type_id INT NOT NULL,
  size_id INT NOT NULL,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id),
  FOREIGN KEY (crust_id) REFERENCES crusts(id),
  FOREIGN KEY (sauce_id) REFERENCES sauces(id),
  FOREIGN KEY (cheese_type_id) REFERENCES cheese_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id)
);

CREATE TABLE pizza_toppings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pizza_option_id INT NOT NULL,
  topping_id INT NOT NULL,
  FOREIGN KEY (pizza_option_id) REFERENCES pizza_options(id),
  FOREIGN KEY (topping_id) REFERENCES toppings(id)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  status VARCHAR(255) NOT NULL DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  item_type ENUM('pizza', 'non_pizza') NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  pizza_option_id INT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
  FOREIGN KEY (pizza_option_id) REFERENCES pizza_options(id) ON DELETE SET NULL
);
