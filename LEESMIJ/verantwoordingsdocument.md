# Closette App verantwoordingsdocument

door Jiro Ghianni

## Inleiding

Hier een antwoord op de vragen:
* Welke technieken, producten en bibliotheken zijn er gebruikt en waarom?
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

Alle source code is standaard Java 14. Op dit moment lijkt JDK 17 de nieuwste long-term support (LTS) release versie, maar die was op het moment dat ik begon, nog niet in release fase.

### Spring Boot

Er is van het Spring Boot Framework gebruik gemaakt, en daarvan zijn de volgende modulen gebruikt:

* Web
* JPA
* Security
* Validation
* JUnit Test
* Jackson
* Hibernate

### Gebruikte hulpmiddelen

Voor het ontwikkelen is gebruik gemaakt van

* IntelliJ IDEA 2021.2.3 (Ultimate Edition) met plugins
* online Visual Paradigm Online (voor sequence, use case en class diagrams)
* Maven 3.6.3
* Postman 9.3.1
* Webstorm
* React, Axios, React Router 5.2, en React-Hook-Form zijn reeds gesaved in de projectmap.
* Figma Mac applicatie
* Adobe Photoshop voor optimaliseren van web images
* Adobe Illustrator en Adobe Animate voor converteren naar SVG voor icoontjes
* koffie

## Git versiebeheer en Github

Zie https://github.com/jirosworld en de `.git` directory/folder van het project.

Let op: door de gitignore file zijn onnodige NPM node bestanden voor de front-end en IDE bestanden niet bijgevoegd in deze projectfolder. Deze dien je zelf te installeren via NPM install.

## Unit-testen

Zie de directories/folders onder `src/test/java`.

## Beveiliging

Middels de door NOVI aangeleverde code voor het implementeren van authenticatie met JSON Web Token (JWT) was het mogelijk om de endpoints te beveiligen met authenticate en authorisaties. Het verwijderen van een bestaande gebruiker en het promoveren van een gewone gebruiker (met alleen USER rol) naar een admin (met ook ADMIN rol) zijn beveiligd, zodat alleen gebruikers met de ADMIN rol deze acties kunnen uitvoeren.

## Wat is er niet gedaan

• geen https SSL certificaat omdat dit bij nakijken probleemen kan geven maar in het het echte bedrijfsleven moet dit wel.

• geen CORS URL gekozen dus in plaats van port 3000 heb ik een * operator gekozen zodat alle veerzoeke naar de back-end door kunnen komen.

• Geen performance tests. Het is dus niet zeker wat er gebeurt als er enorm grote aantallen gebruikers grote hoeveelheden data gaan invoeren. Meer data heeft impact op het schijfruimtegebruik van de database en op de snelheid waarmee tabellen bevraagd worden.

• De gestelde kwaliteitseis van een totale test-coverage van 50% is behaald.

• Niet-functionele eisen: bij aanvang was niet duidelijk hoeveel ik qua User Experience binnen een kort Bootcamp tijdsbestek daadwerkelik af zou krijgen. Ik heb een groot aantal niet-functionele eisen (meer eise ndan voor de eindopdracht nodig waren) opgesteld waarvan een deel niet is uitgevoerd: deze eisen zijn vooral vanwege tijdsgebrek achterwege gelaten en hebben geen effect op de functionele werking en minimale eisen van de app. In het Functioneel/Technisch ontwerp staat duidelijk aangegeven welke niet-functionele eisen niet zijn uitgevoerd door tijdsgebrek.


## Opmerkingen

* Deze app is het begin van een idealistisch idee voor de toekomst. Ik heb nog plannen voor het koppelen van een Map API die toont op welke locatie op de kaart de gebruiker daadwerkelijk staat.
