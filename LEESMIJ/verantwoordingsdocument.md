# Closette App verantwoordingsdocument

door Jiro Ghianni

## Inleiding

Hier een antwoord op de vragen:
* Welke technische ontwerpbeslissingen heb ik gemaakt en waarom?
* Is aan alle voorwaarden uit de opdracht voldaan?

Conclusie: aan alle voorwaarden gesteld in de opdracht, `Integrale eindopdracht Bootcamp v3.0.pdf` is voldaan. 

## Functioneel Ontwerp

Zie [Functioneel-Technisch ontwerp](functioneel-technisch.md) in deze directory.

## Technisch Ontwerp

Zie [Functioneel-Technisch ontwerp](functioneel-technisch.md) in deze directory.

## Servers

Er wordt gebruik gemaakt van Apache Tomcat, onder de motorkap van Spring Boot.

De front-end server draait op http://localhost:3000

De back-end server draait op http://localhost:8080

## Database

De database is PostgreSQL.

Door de ingebouwde ondersteuning van Spring Boot voor vele database producten via JDBC drivers, kunnen de backend en de database niet zomaar worden gescheiden en kunnen niet 100% los van elkaar op verschillende systemen draaien.
Daarom zijn er in de directory/folder `src/main/resources` verschillende `application.properties` meegeleverd:

* JPA
* Hibernate
* Tables droppen bij elke Run
* een uniek niet-realief pad naar de Uploads directory
* postgres profiel en dialect

## Java en Spring Boot

Alle back-end code is Java 11 of hoger t/m 17. Op dit moment lijkt JDK 17 de nieuwste long-term support (LTS) release versie, maar die was op het moment dat ik begon, nog niet in release fase.

### Spring Boot

Er is van het Spring Boot Framework gebruik gemaakt, en daarvan zijn de volgende modulen gebruikt:

* Web
* JPA
* Security
* Validation
* JUnit Test
* Jackson
* Hibernate

Door middel van een listener heb ik alle `Rest endpoints` verzameld in een lijst die in de documentatie van de back-end map staat, daari nstaan ook alle Postman request als importeerbaar `JSON file Collection v2.1` bestand (inclusief JSON-voorbeelden).

### Gebruikte hulpmiddelen

Voor het ontwikkelen is gebruik gemaakt van

* IntelliJ IDEA Mac 2021.2.3 (Ultimate Edition) met plugins
* online Visual Paradigm Online (voor sequence, use case en class diagrams)
* Maven 3.6.3
* Postman Mac 9.3.1
* pgAdmin 4 Mac v.6.1
* Webstorm Mac 2021.2.3
* React, Axios, React Router 5.2, en React-Hook-Form zijn reeds gesaved in de projectmap.
* Figma Mac applicatie
* Adobe Photoshop voor optimaliseren van web images
* Adobe Illustrator en Adobe Animate voor converteren naar SVG voor icoontjes
* ...koffie

## Git versiebeheer en Github

Zie https://github.com/jirosworld en de `.git` directory/folder van het project.

Let op: door de gitignore file zijn onnodige NPM node bestanden voor de front-end en IDE bestanden niet bijgevoegd in deze projectfolder. Deze dien je zelf te installeren via NPM install. Zie de [installatiehandleiding](installatiehandleiding.md).

## Unit-testen

Zie de directories/folders onder `src/test/java`.

## Beveiliging

* De beveiliging is niet production-ready doordat er  natuurlijk te eenvoudige wachtwoorden ('password') en een te simpele secret key is gebruikt ('secret'). In de werkelijkheid kan er beter worden gewerkt met cookies i.p.v. alleen een JWT token. 
* Via authenticatie met JSON Web Token (JWT) was het mogelijk om de endpoints te beveiligen met authenticate en authorisaties. Het verwijderen van een bestaande gebruiker is beveiligd, zodat alleen gebruikers met de ADMIN rol deze acties kunnen uitvoeren.

## Wat is er niet gedaan + disclaimers

_(limitaties van de applicatie en beargumentatie van mogelijke doorontwikkelingen)_

• deze opdracht levert géén deployment-ready product op en zal niet werken op de gemiddelde FTP server, maar dat was ook geen eis.

• geen https SSL certificaat omdat dit bij nakijken problemen kan geven maar in het het echte bedrijfsleven moet dit wel.

• geen CORS URL gekozen dus in plaats van port 3000 heb ik een * operator gekozen zodat alle verzoeken naar de back-end door kunnen komen.

• Geen performance tests. Het is dus niet zeker wat er gebeurt als er enorm grote aantallen gebruikers grote hoeveelheden data gaan invoeren. Meer data heeft impact op het schijfruimtegebruik van de database en op de snelheid waarmee tabellen bevraagd kunnen worden.

• De gestelde kwaliteitseis van een totale test-coverage van 50% is behaald.

• Niet-functionele eisen: bij aanvang was niet duidelijk hoeveel ik qua User Experience binnen een kort Bootcamp tijdsbestek daadwerkelik af zou krijgen. Ik heb een groot aantal niet-functionele eisen (meer eisen dan voor de eindopdracht nodig waren) opgesteld waarvan een deel niet is uitgevoerd: deze eisen zijn vooral vanwege tijdsgebrek achterwege gelaten en hebben geen effect op de functionele werking en minimale eisen van de app/examenopdracht. In het Functioneel/Technisch ontwerp staat duidelijk aangegeven welke niet-functionele eisen niet zijn uitgevoerd door tijdsgebrek.

• De front-end website is niet geoptimaliseerd voor Explorer. Bij meer tijd zou ik echt wel ook zeer verouderde browsers willen supporten, vooral omwille van de toegankelijkheid.

• Ik heb aan de back-end zijde geen mailserver functie gebouwd, dus heb ik het contactformulier functioneel gemaakt via de EmailJS cloudfunctie. Dit is vast niet zoals het bij een professioneel beddrijf er aan toe zou gaan, maar het heeft goed bruikbare templates.

## Leerpunten

• ik ben altijd goed geweest in de miniemste details; ik ben geen project-manager met helicoptervisie, dus het was niet onverwacht dat ik moeite had met het vastleggen/structureren van de ontwerpfase, maar daarentegen geen enkele moeite had met het uitpuzzelen van code details

• deze Bootcamp is slechts een eerste begin; als ik 4 jaar de tijd had gehad dan zou ik heel blij geworden zijn van meer SASS of LESS aan de front-end en een 'env' folder e.a. intelligente manieren voor centraal management

• ik heb ervaring als front-end developer en dat ga ik blijven doen

• het leren van back-end is echt enorm verhelderend, dat zouden alle front-enders eens moeten proberen

• Deze app is het begin van een idealistisch idee voor de toekomst. Ik heb nog plannen voor het koppelen van een Map API die toont op welke locatie op de kaart de gebruiker daadwerkelijk staat.
