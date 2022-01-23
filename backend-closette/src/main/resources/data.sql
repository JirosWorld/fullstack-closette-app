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

INSERT INTO photos (id, file_name)
VALUES ('100', 'img-post-amsterdammuseum.jpg'),
       ('200', 'img-post-artistic-toilet.jpg'),
       ('300', 'img-post-back-to-wall-toilet.jpg'),
       ('400', 'img-post-black-white-toilet.jpg'),
       ('500', 'img-post-deco-toilet.jpg'),
       ('600', 'img-post-krakers-toilet.jpg'),
       ('700', 'img-post-urinoirs.jpg'),
       ('800', 'img-post-French_Squatter_Toilet.jpg'),
       ('900', 'img-post-Japans-Toilet.jpg'),
       ('1000', 'img-post-victorian-toilet.jpg'),
       ('1100', 'img-news-UNISEX.jpg');

INSERT INTO newsposts (title, description, paragraph, post_time, newsauthor_id)
VALUES ('Handleiding en f.a.q.',
        'Wil je weten hoe deze app werkt? Lees dan meer hier, of op de FAQ pagina of in je dashboard (alleen voor bezoekers met een account)',
        ' Op deze site kun je naar veilige genderneutrale toiletten zoeken. Niet-ingelogde gebruikers kunnen toiletten zoeken en alle data bekijken. Ook het Nieuws en de onderliggende artikelen zijn openbaar. Bij het plaatsen van een nieuwe toilet-locatie kun je allerlei opties per toilet aangeven. Alles wat je invult, wordt zichtbaar in de toilettenlijst. De enige opties die écht verplicht zijn om in te vullen, zijn: naam, stad en land. Alleen ingelogde gebruikers kunnen nieuwe locaties toevoegen of bestaande inhoud aanpassen/verbeteren. Er is ook maar maximaal 1 foto per locatie te zien; dus als je toevallig een mooiere foto hebt, dan mag je deze toevoegen. Maak wel eerst een account aan. Áls de volledige GPS locatie is ingevuld dan wordt de "Link naar locatie" automatisch aanklikbaar! Wanneer je daarop klikt dan word je naar een externe website gestuurd: die van Open Streetmap - deze optie zorgt ervoor dat je de locaties ook kunt vinden wanneer je de weg niet weet van de stad waar je bent.',
        '2020-03-04', 'admin'),
       ('Over deze App',
        'Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden.',
        'Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar. Er is behoefte aan een systeem dat gendervariabele mensen in staat stelt om makkelijk het adres van een genderneutraal toilet te zoeken, of, als je er zelf 1 hebt gevonden, deze te delen via een openbare site. Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar. De 5 belangrijkste functionaliteiten zijn: -1 Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
    -2 De zoekresultaten kunnen getrechterd worden via de verschillende filtereigenschappen van toiletten (stad, land, gratis/niet-gratis, wel/niet genderneutraal, toegankelijk voor minder validen, vies of schoon, heeft wel/geen foto, beoordelingen).
    -3 Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
    -4 Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres, een beschrijving en kunnen eventueel een foto uploaden.
    -5 Speciale gebruikers (community managers) hebben meer rechten: moderators hebben de mogelijkheid om posts te censureren of verwijderen.',
        '2021-02-06', 'admin');

INSERT INTO toilets (title, latitude, longitude, post_time, rating_id, accessible, city, country,
                     cleanliness, free, genderneutral, has_photo, info_text, opening_hours, address, rating_average,
                     photo_id)
VALUES ('Het Amsterdam Museum', '52.3700', '4.8900', '2019-05-05', 1, TRUE,
        'Amsterdam', 'NL Nederland Holland Netherlands', 'redelijk schoon', FALSE, TRUE, FALSE,
        'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati qui temporibus.',
        '10h tot 17h tijdens de pandemie',
        'Kalverstraat 92- 1012 PH Amsterdam',
        8.8, 100),
       ('NOVI Hogeschool', '52.0905', '5.1478', '2020-03-04', 3, TRUE, 'Utrecht', 'NL Nederland Holland Netherlands',
        'schoon', TRUE, TRUE, FALSE,
        'Vergeet je mondkapje niet. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati.',
        '9h tot 17h', 'Newtonlaan 247- 3584 BH Utrecht', 3.1, 200),
       ('Berghain | Panorama Bar | homo bar', '52.5111', '13.4430', '12 2021', 2, FALSE,
        'Berlijn Berlin', 'DE Duitsland Germany', 'vaak extreem vies, maar dat hoort zo', TRUE, FALSE, FALSE,
        'Deze bar heeft een bouncer en VIP deurbeleid, je komt waarschijnlijk nooit binnen. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati quinn.',
        '23h tot 05h', 'Am Wriezener bhf- 10243 Berlin- Germany', 5.2, 300),
       ('Gemeente Utrecht | Burgemeester`s hokje', '52.0917', '5.1198', '12 2021', 3, TRUE, 'Utrecht',
        'NL Nederland Holland Netherlands', 'schoon', TRUE, TRUE, FALSE,
        'Dit toilet bevindt zich naast een boze bewaker. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore.',
        '9h tot 17h tijdens de pandemie', 'Utrechtsestraat 1, gemeente Utrecht', 5.9, 400),
       ('Universiteit van Amsterdam | UVA', '52.36810', '4.88992', '2022-01-07', 2, TRUE,
        'Amsterdam', 'NL Nederland Holland Netherlands', 'vaak vies', TRUE, TRUE, FALSE,
        'De universiteit heeft bij elk toilet een genderneutraal bordje. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati.',
        '9h tot 18h tijdens de pandemie', 'Amsterdamsestraat 1, gemeente Amsterdam', 3.1, 500),
       ('WORM BAR Rotterdam | kunstenaars spot', '51.91581', '4.47636', '12 2021', 2, TRUE,
        'Rotterdam', 'NL Nederland Holland Netherlands', 'soms vies', TRUE, TRUE, FALSE,
        'Alleen wanneer je een toegangskaartje voor een concert hebt, kun je naar binnen. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias.',
        '16h tot 20h tijdens de pandemie', 'Rotterdamsestraat 1, gemeente Rotterdam', 7.2, 600),
       ('Buckingham Palace | Queen Elizabeth`s huiskamer', '51.50035', '-0.14415', '12 2021', 3, TRUE,
        'London Londen', 'UK England', 'extreem smetvrij', FALSE, TRUE, FALSE,
        'De eigenares is een private koningin. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati qui roi.',
        'op aanvraag', 'London SW1A 1AA- United Kingdom', 2.0, 1000),
       ('MOMA New York | Museum', '40.7614', '-73.9776', '12 2021', 2, TRUE, 'New York', 'USA Amerika America U.S.A.',
        'schoon', FALSE, TRUE, FALSE,
        'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, obcaecati qui temporibus.',
        '10h tot 17h tijdens de pandemie', '11 W 53rd St. New York, NY 10019- United States', 7.6, 700),
       ('Grachtentoilet Jiro', '52.35237', '4.85313', '2021-07-02', 1, FALSE, 'Amsterdam',
        'NL Nederland Holland Netherlands', 'schoon', FALSE, TRUE, FALSE,
        'Dit toilet kun je alleen bezoeken als je Jiro persoonlijk kent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati qui temporibus.',
        '10h tot 17h tijdens de pandemie', 'Amsterdamsestraat 5, gemeente Amsterdam', 7.9, 1100),
       ('The Grand Egyptian Museum | Cairo', '29.9936', '31.1197', '12 2021', 1, TRUE,
        'Caïro Cairo', 'Egypte Egypt', 'schoon', FALSE, FALSE, FALSE,
        'Dit toilet kun je alleen bezoeken na toegang te betalen tot het museum. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus hieroglyphy.',
        '11h tot 19h tijdens de pandemie', 'Egyptian pyramid 1, municipality of Gizeh',
        5.5, 900),
       ('Machu Picchu bosjes naast de heuvel | Peru', '-13.16445', '-72.54513',
        '12 2021', 1, FALSE, 'Cuzco', 'Peru', 'zeer onrein', TRUE, TRUE, FALSE,
        'Hier is een zware klimtocht over de berg voor nodig om het toilet (een bossage) te kunnen bereiken. Een beschrijving van o.a. hoe het toilet te bereiken is e.a. bijzonderheden, met veel gedetailleerde informatie. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, qui popocatepetl.',
        '24h', 'Abra- paso Llactapata S/N- 08000- Peru',
        1.0, 800);
