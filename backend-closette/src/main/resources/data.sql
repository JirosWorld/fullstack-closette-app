INSERT INTO users (username, password, enabled, email)
VALUES
('user', '$2y$10$Asnk2HVhhHTwlOur0beC8.SQSHd.zOCKidUPIJYC4xSKy/CAxToQy', TRUE, 'jiro@jirosworld.com'),
('admin', '$2y$10$Asnk2HVhhHTwlOur0beC8.SQSHd.zOCKidUPIJYC4xSKy/CAxToQy', TRUE, 'jiro@jiroghianni.com');

INSERT INTO authorities (username, authority)
VALUES
('user', 'ROLE_USER'),
('admin', 'ROLE_USER'),
('admin', 'ROLE_ADMIN');

INSERT INTO ratings (name)
VALUES
('Standaard gebruiker'),
('Moderator'),
('nieuwe user');

INSERT INTO newsposts (title, description, paragraph, post_time, newsauthor_id)
VALUES
    ('Nieuwsartikel titel', 'Beschrijving paragraaf met wat dummy tekst.', 'Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden.', '2020-03-04', 'user'),
    ('Titel van bericht', 'Dummy tekst voor een korte introductie paragraaf die de post beschrijft.', 'Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar.', '2021-02-06', 'user');

INSERT INTO toilets (title, venue, author, latitude, longitude, post_time,rating_id, accessible, city, country,cleanliness, free, genderneutral, has_photo, info_text, opening_hours, rating_average)
VALUES
('Het Amsterdam Museum', 'Het Amsterdam Museum', 'de stadsbewoners', '52.3700', '4.8900', '2019-05-05', 1, TRUE, 'Amsterdam', 'NL', 'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '10h tot 17h tijdens de pandemie', '4'),
('NOVI Hogeschool', 'NOVI Hogeschool', 'studenten', '52.0905', '5.1478', '2020-03-04', 3, TRUE, 'Utrecht', 'NL',  'schoon', TRUE , TRUE, FALSE, 'Vergeet je mondkapje niet.', '9h tot 17h', '3'),
('Berghain | Panorama Bar', 'Berghain | Panorama Bar', 'homo bar', '52.5111', '13.4430', '12 2021', 2, TRUE, 'Berlijn', 'DE',  'vaak extreem vies' , TRUE, TRUE, FALSE, 'Deze bar heeft een bouncer en VIP deurbeleid, je komt waarschijnlijk nooit binnen.', '23h tot 05h', '3'),
('Gemeente Utrecht', 'Gemeente Utrecht', 'Burgemeester', '52.0917', '5.1198', '12 2021', 3, TRUE, 'Utrecht', 'NL',  'schoon', TRUE , TRUE, FALSE, 'Dit toilet bevindt zich naast een boze bewaker.', '9h tot 17h tijdens de pandemie', '3'),
('Universiteit van Amsterdam', 'Universiteit van Amsterdam', 'UVA', '52.36810', '4.88992', '2022-01-07', 2, TRUE, 'Amsterdam', 'NL',  'vaak vies' , TRUE, TRUE, FALSE, 'De universiteit heeft bij elk toilet een genderneutraal bordje.', '9h tot 18h tijdens de pandemie', '3'),
('WORM BAR Rotterdam', 'WORM BAR Rotterdam', 'kunstenaars', '51.91581', '4.47636', '12 2021', 2, TRUE, 'Rotterdam', 'NL',  'soms vies' , TRUE, TRUE, FALSE, 'Alleen wanneer je een toegangskaartje voor een concert hebt, kun je naar binnen.', '16h tot 20h tijdens de pandemie', '3'),
('Buckingham Palace', 'Buckingham Palace', 'Queen Elizabeth', '51.50035', '-0.14415', '12 2021', 3, TRUE, 'London', 'UK',  'extreem smetvrij', FALSE, TRUE, FALSE, 'De eigenares is een private koningin.', 'op aanvraag', '2'),
('MOMA New York', 'MOMA New York', 'Museumstaff', '40.7614', '-73.9776', '12 2021', 2, TRUE, 'New York', 'USA',  'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '10h tot 17h tijdens de pandemie', '4'),
('Grachtentoilet Jiro', 'Grachtentoilet Jiro', 'Jiro', '52.35237', '4.85313', '2021-07-02', 1, TRUE, 'Amsterdam', 'NL', 'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken als je Jiro persoonlijk kent', '10h tot 17h tijdens de pandemie', '4'),
('The Grand Egyptian Museum', 'The Grand Egyptian Museum', 'Cairo', '29.9936', '31.1197', '12 2021', 1, TRUE, 'Caïro', 'Egypt',  'schoon', FALSE, FALSE , FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '11h tot 19h tijdens de pandemie', '4'),
('Machu Picchu bosjes naast de heuvel', 'Machu Picchu bosjes naast de heuvel', 'Peru', '13.1631', '72.5450', '12 2021', 1, FALSE , 'Cuzco', 'Peru',  'zeer onrein' , TRUE , TRUE, FALSE, 'Hier is een zware klimtocht over de berg voor nodig om het toilet (een bossage) te kunnen bereiken.', '24h', '1');
