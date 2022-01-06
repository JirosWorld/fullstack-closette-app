INSERT INTO users (username, password, enabled, email)
VALUES
('user', '$2y$10$Asnk2HVhhHTwlOur0beC8.SQSHd.zOCKidUPIJYC4xSKy/CAxToQy', TRUE, 'jiro@jiroghianni.com'),
('admin', '$2y$10$Asnk2HVhhHTwlOur0beC8.SQSHd.zOCKidUPIJYC4xSKy/CAxToQy', TRUE, 'jiro@jirosworld.com');

INSERT INTO authorities (username, authority)
VALUES
('user', 'ROLE_USER'),
('admin', 'ROLE_USER'),
('admin', 'ROLE_ADMIN');

INSERT INTO persons (name)
VALUES
('Quentin Crisp'),
('Barbarella'),
('Nelson Mandela');

INSERT INTO toilets (title, venue, author, latitude, longitude, person_id, accessible, city, country,cleanliness, free, genderneutral, has_photo, info_text, opening_hours, rating)
VALUES
('Het Amsterdam Museum', 'Het Amsterdam Museum', 'Directeur', '52.3700', '52.3700', 1, TRUE, 'Amsterdam', 'NL', 'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '10h tot 17h tijdens de pandemie', '4'),
('Universiteit van Amsterdam', 'Universiteit van Amsterdam', 'UVA', '52.3558', '52.3700', 2, TRUE, 'Amsterdam', 'NL',  'vaak vies' , TRUE, TRUE, FALSE, 'De universiteit heeft bij elk toilt een genderneutraal bordje.', '9h tot 18h tijdens de pandemie', '3'),
('Gemeente Utrecht', 'Gemeente Utrecht', 'Burgemeester', '52.0907', '52.3700', 3, TRUE, 'Utrecht', 'NL',  'schoon', TRUE , TRUE, FALSE, 'Dit toilet bevindt zich naast een boze bewaker.', '9h tot 17h tijdens de pandemie', '3'),
('Buckingham Palace', 'Buckingham Palace', 'Queen Elizabeth', '51.5014', '52.3700', 3, TRUE, 'London', 'UK',  'extreem smetvrij', FALSE, TRUE, FALSE, 'De eigenares is een private koningin.', 'op aanvraag', '2'),
('MOMA New York', 'MOMA New York', 'Museumstaff', '40.7614', '52.3700', 2, TRUE, 'New York', 'USA',  'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '10h tot 17h tijdens de pandemie', '4'),
('The Grand Egyptian Museum', 'The Grand Egyptian Museum', 'Cairo', '29.9936', '52.3700', 1, TRUE, 'Caïro', 'Egypt',  'schoon', FALSE, FALSE , FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '11h tot 19h tijdens de pandemie', '4'),
('Machu Picchu bosjes naast de heuvel', 'Machu Picchu bosjes naast de heuvel', 'Peru', '13.1631', '52.3700', 1, FALSE , 'Cuzco', 'Peru',  'zeer onrein' , TRUE , TRUE, FALSE, 'Hier is een zware klimtocht over de berg voor nodig om het toilet (een bossage) te kunnen bereiken.', '24h', '1');
