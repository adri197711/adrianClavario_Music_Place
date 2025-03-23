
USE music_place_db;

-- Insertar los productos en la tabla products
INSERT INTO products (id,name, price, discount, description, createdAt, updatedAt) VALUES
(1,"Guitarra Ibanez", 3000000,0,"Guitarra eléctrica Ibanez RG",NOW(), NOW()),
(2,"Guitarra Les Paul 1", 6000000,0,"Guitarra eléctrica Gibson Les Paul", NOW(), NOW()),
(3,"Amplificador Marshall",8000000,10, "Amplificador Marshall clásico", NOW(), NOW()),
(4,"Guitarra Clasica", 3000000,10, "Excelente oportunidad para principiantes.", NOW(), NOW()),
(5,"Teclado",4000000,15, "Teclado con efectos", NOW(), NOW()),
(6,"guitarra", 2000000,5,"Excelente oportunidad", NOW(), NOW()),
(7,"Marshall",5000000, 0, "Amplificador para guitarra eléctrica", NOW(), NOW()),
(8,"Guitarra Les Paul 2", 3600000, 5,"Otra versión de Gibson Les Paul", NOW(), NOW());

-- Insertar los productos en la tabla users
INSERT INTO users (id,name,surname,username,email,password,avatar,validated,locked,token, createdAt, updatedAt) VALUES 
(1,"Alina", "Clavario","Ali","ali@gmail","123",null,1,0,null,NOW(), NOW()),
(2,"Ada", "Clavario","Adita","ada@gmail","123",null,1,0,null,NOW(), NOW()), 
(3,"Victoria", "Clavario","Viki","viki@gmail","123",null,1,0,null,NOW(), NOW()), 
(4,"Antonella", "Alarcon","Anto","anto@gmail","123",null,1,0,null,NOW(), NOW()), 
(5,"Jeremias", "Alarcon","Jere","jere@gmail","123",null,1,0,null,NOW(), NOW());

commit;
SELECT * FROM users;
SELECT * FROM products;



