# Closette App verantwoordingsdocument

door Jiro Ghianni

## Inleiding

Hier een antwoord op de vragen:
* Welke technieken, producten en bibliotheken zijn er gebruikt en waarom?
* Is aan alle voorwaarden uit de opdracht voldaan?

Conclusie: aan alle voorwaarden gesteld in de opdracht, `Integrale eindopdracht Backend 1.02.pdf` is voldaan. Er zijn alleen ingredienten gebruikt, die werden gevraagd.

## Functioneel Ontwerp

Zie `funct.pdf` in deze directory.

## Technisch Ontwerp

Zie `funct.pdf` in deze directory.

## Servers

Er wordt gebruik gemaakt van Apache Tomcat, onder de motorkap van Spring Boot.

De front-end server draait op http://localhost:3000

De back-end server draait op http://localhost:8080

## Database

De database is PostgreSQL.

Door de ingebouwde ondersteuning van Spring Boot voor vele database producten via JDBC drivers, is het niet moeilijk om aan criterium
"De backend en de database zijn gescheiden en kunnen los van elkaar op verschillende systemen draaien" te voldoen.
Daarom zijn er in de directory/folder `src/main/resources` verschillende `application.properties` meegeleverd:

* JPA
* Hibernate
* Tables droppen bij elke Run.

In principe zou ieder Relationele Database Management System (RDBMS) gebruikt kunnen worden, maar er is alleen met PostgreSQL getest.

Deze alternatieve configuratie bestanden kunnen geactiveerd worden door de applicatie als volgt te starten:

`./mvnw spring-boot:run -Dspring-boot.run.profiles=local`.

of

`./mvnw spring-boot:run -Dspring-boot.run.profiles=postgresql`.



## Java en Spring Boot

Alle source code is standaard Java 14, omdat dit waarschijnlijk ded volgendde "long term supported" versie gaat worden, met gebruik van de laatste versie van Spring Boot en Maven.

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

## Git versiebeheer en Github

Zie https://github.com/jirosworld en de `.git` directory/folder van het project.

Let op: d.m.v. van de gitignore file zijn onnodige NPM bestanden en IDE bestanden niet bijgevoegd in deze projectfolder. Deze dien je zelf te installeren via NPM install.

## Unit-testen

Zie de directories/folders onder `src/test/java`.

## Beveiliging

Middels de door NOVI aangeleverde code voor het implementeren van authenticatie met JSON Web Token (JWT) was het mogelijk om de endpoints te beveiligen met authenticate en authorisaties. Het verwijderen van een bestaande gebruiker en het promoveren van een gewone gebruiker (met alleen USER rol) naar een admin (met ook ADMIN rol) zijn beveiligd, zodat alleen gebruikers met de ADMIN rol deze acties kunnen uitvoeren.

## Wat is er niet gedaan

• geen https SSL certificaat omdat dit bij nakeijken efrificati probleemen kan geven maar in het het echte bedrijfs leven moet dit wel

• geen CORS URL gekozne dus in plaats van port 3000 heb ik een * operator gekozen zodat alle veerzoeke naar de  back-end door kunnen komen; 

• Geen performance tests. Het is dus niet zeker wat er gebeurt als er grotere aantallen gebruikers grote hoeveelheden data gaan invoeren. Meer data heeft impact op het schijfruimtegebruik van de database en op de snelheid waarmee tabellen bevraagd worden.

• Niet veel @MockBean gebruikt. Tijdens het ontwikkelen merkte ik dat ik een mock database, H2 in-memory, genoeg mock vindt en dat tests, met name complexe, met @MockBean er niet overzichtelijker op worden.

• De gestelde kwaliteitseis van een test-coverage van 80% is ... gehaald.


## Opmerkingen

• Deze app is het begin van een idealistisch idee voor de toekomst. Ik heb nog plannen voor het koppelen van een Map API die toont op welke locatie op de kaart de gebruiker daadwerkelijk staat.
