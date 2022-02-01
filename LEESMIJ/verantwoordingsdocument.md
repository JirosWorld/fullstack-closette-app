# Closette App verantwoordingsdocument

door Jiro Ghianni

## Inleiding

Hier een antwoord op de vragen:
* Welke technische ontwerpbeslissingen heb ik gemaakt en waarom?
* Is aan alle voorwaarden uit de opdracht voldaan?

Conclusie: Zelfs al is niet álle functionaliteit, die ik in de back-end heb gebouwd, zichtbaar te gebruiken in de front-end: aan alle voorwaarden gesteld in de opdracht, `Integrale eindopdracht Bootcamp v3.0.pdf` is voldaan.

## Functioneel Ontwerp

Zie het gecombineerde [Functioneel-Technisch ontwerp](funtioneel-technisch-ontwerp-app-jiro.pdf) in de PDF (7 MB) in deze directory.

## Technisch Ontwerp

Zie wederom het gecombineerde [Functioneel-Technisch ontwerp](funtioneel-technisch-ontwerp-app-jiro.pdf) in de PDF in dezelfde directory.

## Technische ontwerpbeslissingen

Als exameneis wordt er gevraagd om minstens 10 technische ontwerpbeslissingen. Deze volgen hieronder in de kopjes: Servers, database, Java en Springboot, software, Git, testen, beveiliging en 'Technische functionaliteits beslissingen'.

## Servers

Op de achtergrond van Spring Boot wordt er gebruik gemaakt van Apache Tomcat.

De front-end server draait op http://localhost:3000

De back-end server draait op http://localhost:8080

## Database

De database is PostgreSQL.

Door de het gebruik van Spring Boot met haar database produkten, kunnen de backend en de database waarschijnlijk niet zomaar op alle systemen draaien.
Daarom zijn er in de directory/folder `src/main/resources` verschillende `application.properties` meegeleverd:

* JPA
* Hibernate (de ORM)
* Tables droppen bij elke Run
* een uniek niet-realief pad naar de Uploads directory
* postgres profiel en dialect

## Java en Spring Boot

Alle back-end code is Java 11 of hoger t/m 17. Op dit moment lijkt JDK 17 de nieuwste long-term support (LTS) versie, maar die was op het moment dat ik begon, nog niet in release fase.

### Spring Boot

Er is van het Spring Boot Framework gebruik gemaakt, en daarvan zijn de volgende plug-ins/produkten gebruikt:

* Spring Web
* JPA
* Security
* Validation
* JUnit Test
* Jackson
* Hibernate

Door middel van een listener heb ik alle `Rest endpoints` verzameld in een lijst die in de documentatie van de back-end map staat, daarin staan ook alle Postman request als importeerbaar `JSON file Collection v2.1` bestand (inclusief JSON-voorbeelden). In de IDE heb ik ook de JPA Buddy plug-in gebruikt.

## Gebruikte hulpmiddelen (software)

Voor het ontwikkelen is gebruik gemaakt van

* IntelliJ IDEA Mac 2021.2.3 (Ultimate Edition) met plug-ins
* online Visual Paradigm Online (voor sequence, use case en class diagrams)
* Maven 3.6.3
* Postman Mac 9.3.1
* pgAdmin 4 Mac v.6.1
* Webstorm Mac 2021.2.3
* React, Axios, React Router 5.2, en React-Hook-Form zijn reeds gesaved in de projectmap.
* Figma Mac applicatie + Figma online
* Adobe Photoshop voor optimaliseren van web images
* Adobe Illustrator en Adobe Animate voor converteren naar SVG van mijn handgetekende icoontjes
* ..._koffie_ (= geen software maar een drank)

## Git versiebeheer en Github

Zie https://github.com/jirosworld en de `.git` directory/folder van het project.

Ik heb tenminste 2X een feature branch gemaakt voor het maken van database relaties en foto testen - die pull requests zijn allemaal gemerged met Main en nu niet meer zichtbaar. Alle commits vanaf de aanvang van de bouw zijn hier zichtbaar: https://github.com/JirosWorld/fullstack-closette-app/commits/main 

Let op: door de gitignore file zijn onnodige NPM node bestanden voor de front-end en IDE bestanden niet bijgevoegd in deze projectfolder. Deze dient men zelf te installeren via NPM install. Zie de [installatiehandleiding](installatiehandleiding.md).

## Unit-testen

Zie de directories/folders onder `src/test/java`.

## Beveiliging

* De beveiliging is niet production-ready doordat er  natuurlijk te eenvoudige wachtwoorden ('password') en een te simpele secret key is gebruikt ('secret'). In de werkelijkheid kan er beter worden gewerkt met cookies i.p.v. alleen een JWT token. 
* Via authenticatie met JSON Web Token (JWT) was het mogelijk om de endpoints te beveiligen met authenticate en authorisaties. Het verwijderen van een bestaande gebruiker is beveiligd, zodat alleen gebruikers met de ADMIN rol deze acties kunnen uitvoeren.
* De CORS beveiligingscode heb ik rechtstreeks gekopiëerd van wat we in de les te zien kregen.


## Technische functionaliteits beslissingen

* Java is een geheel nieuwe taal voor mij. Tot nu toe had ik alleen ervaring met HTML, CSS, basis PHP, basis SQL en zeer basale Javascript; ik heb grote vorderingen gemaakt, maar toch was ik beperkt in wat ik aankon om binnen een realistisch tijdsbestek te kunnen bouwen. Hierondeer volgen de zaken die ik niet of gedeeltelijk heb kunnen bouwen of waar ik andere beslissingen heb gemaakt dan in mijn klassendiagram en/of ontwerpen.
* In de eindexamenopdracht wordt als eis gesteld dat er een "bestands-up- en download" functionaliteit in de app zit. Op de front-end is alleen de upload functie expliciet te zien: dit omdat een 'download' niet nodig is als functionaliteit binnen het concept van mijn toiletten-app idee. Natuurlijk vindt er _eigenlijk_ wél een soort 'download' plaats op de front-end omdat de geüploade afbeeldingen op de front-end in HTML worden afgebeeld/gerendered.
* Dit is een 'stateless webserver' - daardoor kon ik geen 'prefilled' foto's afleveren in een nette database, die ook nog gekoppeld zouden zijn aan een statische uploads map. Dus heb ik verschillende functies en endpoints gebruikt en deze verschillend getoond op de frontend. Kort samengevat: alle foto's die op de backend in de 'uploads' map staan, zijn de 'prefilled' data die op de frontend alleen getoond worden bij alle toiletten die reeds meegegeven worden bij het opstarten van de backend. Dus zodra je een NIEUWE foto uploadt voor NIEUWE toilet entries, dan komt die foto-download URL ergens anders vandaan: de stateless server. Na opnieuw opstarten van de backend, verdwijnen alle nieuw geplaatste toiletten en ook alle nieuw geuploade foto's.
* Ik heb gebruik gemaakt van standaard CSS en bij slechts 1 component heb ik een CSS-module gebruikt; dit omdat ik al bekend ben met CSS en dit tijd scheelde bij ontwikkelen. Wel heb ik hier en daar de BEM notatie gebruikt om ermee te oefenen.
* Dit project gebruikt de verouderde versie 5 van React Router-Dom, omdat deze in de lessen is behandeld.
* In mijn klassendiagram had ik besloten dat de relate van foto-tot-toilet een OneToOne moest zijn, maar in de werkelijkehid wilde ik er eigenlijk een ManyToMany van maken - sommige foto's worden meerdere malen herhaald/gebruikt, én eigenlijk wil je ook meerdere foto's per toilet kunnen plaatsen; dus heb ik er als compromis een ManyToOne relatie van gemaakt; dit ook omdat mijn basis Java kennis me nog parten speelt. In ieder geval zijn in de huidige constructie de foto ID's en toiletten ID's als foreign keys te gebruiken endaardoor ook aanspreekbaar als object voor de front-end.

## Wat is er niet gedaan + disclaimers

_(limitaties van de applicatie en beargumentatie van mogelijke doorontwikkelingen)_

• Deze opdracht levert géén deployment-ready product op en zal niet werken op de gemiddelde FTP server, maar dat was ook geen eis.

• Niet-functionele eisen: bij aanvang was niet duidelijk hoeveel ik qua User Experience binnen een kort Bootcamp tijdsbestek daadwerkelijk af zou krijgen. Ik heb een flink aantal niet-functionele eisen (_meer eisen dan voor de eindopdracht nodig waren_) opgesteld waarvan een deel niet is uitgevoerd: deze eisen zijn vooral vanwege tijdsgebrek achterwege gelaten en hebben geen effect op de functionele werking en minimale eisen van de app/examenopdracht. In het Functioneel/Technisch ontwerp staat duidelijk aangegeven welke niet-functionele eisen niet zijn uitgevoerd door tijdsgebrek.

• Het filteren van zoekresultaten gebeurt, op het moment van schrijven, vooral aan de front-end. Dat wil zeggen; er wordt zoveel mogelijk uit de database getoond (bijvoorbeeld alle gevonden entries uit 1 stad) en die kunnen dan d.m.v. filterknoppen binnen 1 window verfijnd worden zonder dat er een verzoek naar de database nodig is - voor aantal functies kun je KIEZEN of je die aan de frontend of aan de backend wilt afhandelen. Door tijdgebrek vond ik het makkelijker om de filtering vooral aan de frontend af te handelen.

• Het diep indelen in React componenten heb ik niet gedetailleerd kunnen doen door tijdgebrek - in principe zou het beter zijn om van elk type Axios request of Async functie een eigen component te maken, maar ik heb nu vaak voor de individuele pagina's een flinke lap code gemaakt. Op zich is dat nu nog niet zo'n probleem in dit project omdat er nog niet veel pagina-soorten zijn, en dus ook nog niet veel templates dus de code wordt niet echt herhaald.

• Omdat ik veel funcionaliteit wilde bouwen en de app echt op een volledige website, gevoed door een database, wilde laten lijken, heb ik veel logica ingebouwd waarbij ik veel `comments` en `console.logs` nodig had - door tijdgebrek heb ik deze niet allemaal kunnen verwijderen maar in een real life werksituatie zou ik dat wel opschonen - bovendien zou ik ze dan 100% in het Engels doen. Ik denk dat 20% van mijn comments in het Nederlands zijn en dat is niet de bedoeling, maar i.e.g. niet schadelijk.

• Geen https SSL certificaat omdat dit bij nakijken problemen kan geven maar in het het echte bedrijfsleven moet dit wel.

• Geen CORS URL gekozen dus in plaats van port 3000 heb ik een * operator gekozen zodat **alle** verzoeken naar de back-end door kunnen komen.

• Geen performance tests. Het is dus niet zeker wat er gebeurt als er enorm grote aantallen gebruikers grote hoeveelheden data gaan invoeren. Meer data heeft impact op het schijfruimtegebruik van de database en op de snelheid waarmee tabellen bevraagd kunnen worden.

• Geen uitgebreide splitsing van de DTO's naar input en output, wat wel netter zou zijn, maar dit is geen exameneis.

• De gestelde kwaliteitseis van een totale test-coverage van 50% is behaald.

• Aan de front-end zijn geen Dev dependencies gebruikt (dit  zou netter zijn bij gebruik van SASS bijvoorbeeld). 

• Het ontwerp in Figma komt niet 100% overeen met wat ik uiteindelijk in React heb gebouwd; in CSS kan ik heus wel 'pixel perfect' bouwen maar Figma doet niet wat ik wil. Een aantal elementen in Figma hadden afgeronde hoeken en meer consequente tussenruimtes moeten hebben, maar dat lukt niet overal. Deze manier van werken is niet 'industry standard' weet ik - ik moet het design van een UX designer natuurlijk tot op de pixel nauwkeurig kunnen nabouwen. In deze oplevering lijkt het nu alsof ik me niet aan mijn eigen ontwerp heb gehouden - maar eigenlijk is het omgekeerd: Figma houdt zich niet aan mij.

• Ik had paginering in kunnen bouwen voor de front-end, of een "never-ending scroll" want nu komen alle resultaten op 1 pagina (zowel bij de toiletten als bij Nieuws). De paginering zou kunnen via de back-end met een CRUD repositiry, of aan de front-end met een javascript dat steeds een vast aantal posts toont op basis van scroll positie.

• Het 2e 'main succes' scenario uit het functioneel ontwerp heb ik niet kunnen bouwen: het zou wel mooi zijn als ik een functionaliteit had kunnen bouwen waarbij meerdere eigenschappen van een toilet elkaar kunnen uitsluiten of aanvullen in een zoekopdracht - maar dat betekent eigenlijk dat ik voor alle combinaties een beslisboom moet maken; heel leuk maar ook tijdrovend. Ook had ik geen tijd om een functie te bouwen waarmee latitude en longitude aan elkaar gekoppeld blijven.

• De front-end website is niet geoptimaliseerd voor Explorer en heb ik niet kunnen testen op touch-screens (waar bijvoorbeeld Hovers niet werken). Bij meer tijd zou ik echt wel ook zeer verouderde browsers willen supporten, vooral omwille van de toegankelijkheid.

• Voor de end-points heb ik makkelijk leesbare woorden gebruikt, en niet de "api/v1/..." notatie, omdat deze niet behandeld is in de les en ik er geen voordeel in zag om dit te doen voor een App die niet klaar is voor release en waarin ik geen toekomstige versies zie, met een transitie periode naar versie 1.

• Ik heb aan de back-end zijde geen mailserver functie gebouwd (geen vereiste), dus heb ik het contactformulier functioneel gemaakt via de EmailJS cloudfunctie. Dit is vast niet zoals het bij een professioneel bedrijf er aan toe zou gaan, maar het heeft goed bruikbare templates.

## Leerpunten

• De visuele en functionele eisen zijn echt eeuwig uit te breiden, en waren lastig voor mij om te trechteren naar een werkbare hoeveelheid code. Want: beperken tot iets kleins, blijkt het moeilijkste te zijn van dit proces. Het was ook niet van tevoren in te schatten hoeveel van de belangrijkste functionele eisen ik eigenlijk kon verwezenlijken.

• ik ben altijd goed geweest in minieme details; ik ben geen project-manager met helicoptervisie, dus het was niet onverwacht dat ik moeite had met het vastleggen/structureren van de ontwerpfase, maar dat ik minder moeite had met het uitpuzzelen van code details.

• ik heb meer dan de benodigde tijd besteed aan de Bootcamp stof, maar kwam uiteindelijk toch tijd te kort om álles dat ik in de back-end heb gebouwd ook daadwerkelijk functioneel te construeren in de front-end. In real life zou ik voor een CMS kiezen, met open-source database die runt op FTP servers.

• deze Bootcamp is slechts een eerste begin; als ik 4 jaar de tijd had gehad dan zou ik heel blij geworden zijn van meer SASS of LESS aan de front-end en een 'env' folder e.a. intelligente manieren voor centraal management.

• ik heb ervaring als front-end developer en dat ga ik blijven doen; ik denk dat ik nu een betere front-ender ben dan voorheen. Mijn volgende leerwens is Vue.js

• het leren van back-end is echt enorm verhelderend, dat zouden alle front-enders eens moeten proberen.

• Ik hoop dat nieuwe programmeurs gevoeliger gaan zijn voor diversiteit en nooit meer databases ontwerpen waarin gender slechts binair of een boolean is. We leven in 2021 dus het zou mooi zijn als sekse en gender nooit meer verplichte invoervelden zijn, óf heel gemakkelijk gewijzigd kunnen worden door gebruikers zelf. Het zou ook mooi zijn als docenten hierin een voortrekkersrol vervullen (op dezelfde wijze als Github die alle Master branches naar Main laat hernoemen) en minder vaak voorbeelden in de les geven over mensen die alleen hetero-relaties hebben of alleen maar ‘Jan’ of ‘Piet’ heten. 😬  Dat voelt in het begin misschien geforceerd, maar je moet érgens beginnen… Het kan i.e.g. blindheid verminderen bij programmeurs die voor echte mensen programmeren.
Lees mijn stuk over diversiteit in code hier:
https://codepen.io/jirosworld/post/how-to-build-diversity-into-your-code

• Deze app is het begin van een idealistisch idee voor de toekomst. Ik heb nog plannen voor het koppelen van een Map API die toont op welke locatie op de kaart de gebruiker daadwerkelijk staat.
