INSERT INTO users (username, password, enabled, email)
VALUES ('user', '$2y$10$Asnk2HVhhHTwlOur0beC8.SQSHd.zOCKidUPIJYC4xSKy/CAxToQy', TRUE, 'jiro@jirosworld.com'),
       ('admin', '$2y$10$Asnk2HVhhHTwlOur0beC8.SQSHd.zOCKidUPIJYC4xSKy/CAxToQy', TRUE, 'jiro@jiroghianni.com');

INSERT INTO authorities (username, authority)
VALUES ('user', 'ROLE_USER'),
       ('admin', 'ROLE_USER'),
       ('admin', 'ROLE_ADMIN');

INSERT INTO ratings (name, rating_toilet)
VALUES ('Standaard gebruiker', 2.5),
       ('Moderator', 3.3),
       ('nieuwe user', 4.8);

INSERT INTO photos (id, doc_file, file_name)
VALUES ('10000', '100', 'img-post-amsterdammuseum.jpg'),
       ('20000', '200', 'img-post-artistic-toilet.jpg'),
       ('30000', '300', 'img-post-back-to-wall-toilet.jpg'),
       ('40000', '400', 'img-post-black-white-toilet.jpg'),
       ('50000', '500', 'img-post-deco-toilet.jpg'),
       ('1', '40649', 'img-post-krakers-toilet.jpg'),
       ('2', '40706', 'img-post-urinoirs.jpg'),
       ('4', '40766', 'img-post-French_Squatter_Toilet.jpg'),
       ('5', '40767', 'img-post-Japans-Toilet.jpg'),
       ('7', '40769', 'img-post-victorian-toilet.jpg');

INSERT INTO newsposts (title, description, paragraph, post_time, newsauthor_id)
VALUES ('Nieuwsartikel titel', 'Beschrijving paragraaf met wat dummy tekst.',
        'Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden.',
        '2020-03-04', 'admin'),
       ('Titel van bericht', 'Dummy tekst voor een korte introductie paragraaf die de post beschrijft.',
        'Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar.',
        '2021-02-06', 'admin');

INSERT INTO toilets (title, latitude, longitude, post_time, rating_id, accessible, city, country,
                     cleanliness, free, genderneutral, has_photo, info_text, opening_hours, address, rating_average)
VALUES ('Het Amsterdam Museum', '52.3700', '4.8900', '2019-05-05', 1, TRUE,
        'Amsterdam', 'NL', 'schoon', FALSE, TRUE, FALSE,
        'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '10h tot 17h tijdens de pandemie',
        'Kalverstraat 92- 1012 PH Amsterdam',
        8.8),
       ('NOVI Hogeschool', '52.0905', '5.1478', '2020-03-04', 3, TRUE, 'Utrecht', 'NL',
        'schoon', TRUE, TRUE, FALSE, 'Vergeet je mondkapje niet.', '9h tot 17h', 'Newtonlaan 247- 3584 BH Utrecht',3.1),
       ('Berghain | Panorama Bar | homo bar', '52.5111', '13.4430', '12 2021', 2, FALSE,
        'Berlijn', 'DE', 'vaak extreem vies, maar dat hoort zo', TRUE, FALSE, FALSE,
        'Deze bar heeft een bouncer en VIP deurbeleid, je komt waarschijnlijk nooit binnen.', '23h tot 05h', 'Am Wriezener bhf- 10243 Berlin- Germany' , 5.2),
       ('Gemeente Utrecht | Burgemeester`s hokje', '52.0917', '5.1198', '12 2021', 3, TRUE, 'Utrecht',
        'NL', 'schoon', TRUE, TRUE, FALSE, 'Dit toilet bevindt zich naast een boze bewaker.',
        '9h tot 17h tijdens de pandemie', 'Utrechtsestraat 1, gemeente Utrecht', 5.9),
       ('Universiteit van Amsterdam | UVA', '52.36810', '4.88992', '2022-01-07', 2, TRUE,
        'Amsterdam', 'NL', 'vaak vies', TRUE, TRUE, FALSE,
        'De universiteit heeft bij elk toilet een genderneutraal bordje.', '9h tot 18h tijdens de pandemie', 'Amsterdamsestraat 1, gemeente Amsterdam', 3.1),
       ('WORM BAR Rotterdam | kunstenaars spot', '51.91581', '4.47636', '12 2021', 2, TRUE,
        'Rotterdam', 'NL', 'soms vies', TRUE, TRUE, FALSE,
        'Alleen wanneer je een toegangskaartje voor een concert hebt, kun je naar binnen.',
        '16h tot 20h tijdens de pandemie', 'Rotterdamsestraat 1, gemeente Rotterdam', 7.2),
       ('Buckingham Palace | Queen Elizabeth`s huiskamer', '51.50035', '-0.14415', '12 2021', 3, TRUE,
        'London', 'UK', 'extreem smetvrij', FALSE, TRUE, FALSE, 'De eigenares is een private koningin.', 'op aanvraag', 'London SW1A 1AA- United Kingdom', 2.0),
       ('MOMA New York | Museum', '40.7614', '-73.9776', '12 2021', 2, TRUE, 'New York', 'USA',
        'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum',
        '10h tot 17h tijdens de pandemie', '11 W 53rd St. New York, NY 10019- United States', 7.6),
       ('Grachtentoilet Jiro', '52.35237', '4.85313', '2021-07-02', 1, FALSE, 'Amsterdam',
        'NL', 'schoon', FALSE, TRUE, FALSE, 'Dit toilet kun je alleen bezoeken als je Jiro persoonlijk kent',
        '10h tot 17h tijdens de pandemie', 'Amsterdamsestraat 5, gemeente Amsterdam', 7.9),
       ('The Grand Egyptian Museum | Cairo', '29.9936', '31.1197', '12 2021', 1, TRUE,
        'Caïro', 'Egypt', 'schoon', FALSE, FALSE, FALSE,
        'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum', '11h tot 19h tijdens de pandemie', 'Egyptian pyramid 1, municipality of Gizeh',
         5.5),
       ('Machu Picchu bosjes naast de heuvel | Peru', '-13.16445', '-72.54513',
        '12 2021', 1, FALSE, 'Cuzco', 'Peru', 'zeer onrein', TRUE, TRUE, FALSE,
        'Hier is een zware klimtocht over de berg voor nodig om het toilet (een bossage) te kunnen bereiken.', '24h', 'Abra- paso Llactapata S/N- 08000- Peru',
        1.0);
