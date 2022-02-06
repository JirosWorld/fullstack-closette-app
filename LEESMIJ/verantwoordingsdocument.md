# Closette App verantwoordingsdocument

door Jiro Ghianni

Studentnummer: 900101067

4 februari 2022

## Inleiding

Hier een antwoord op de vragen:
* Welke technische ontwerpbeslissingen heb ik gemaakt en waarom?
* Is aan alle voorwaarden uit de opdracht voldaan?

Conclusie: Zelfs al is niet álle functionaliteit, die ik in de back-end heb gebouwd, zichtbaar te gebruiken in de front-end: aan bijna alle voorwaarden gesteld in de eindexamenopdracht, `Integrale eindopdracht Bootcamp v3.0.pdf` is voldaan. Alleen de tests heb ik niet tot het vereiste niveau van 50% kunnen brengen.

## Functioneel Ontwerp

Zie het gecombineerde [Functioneel-Technisch ontwerp](functioneel-technisch-ontwerp-app-jiro.pdf) in de PDF (7 MB) in deze directory.

## Technisch Ontwerp

Zie wederom het gecombineerde [Functioneel-Technisch ontwerp](functioneel-technisch-ontwerp-app-jiro.pdf) in de PDF in dezelfde directory.

## Installatiehandleiding

Zie de [Installatiehandleiding](installatiehandleiding-closette.pdf) als PDF in dezelfde directory.

## Technische ontwerpbeslissingen

Als exameneis wordt er gevraagd om minstens 10 technische ontwerpbeslissingen. Deze volgen hieronder in de kopjes: Servers, database, Java en Springboot, software, Git, testen, beveiliging en 'Technische functionaliteits beslissingen'. Waarbij steeds wordt aangegeven of de techniek is gekozen door de Bootcamp, door mijzelf, of een mix is van beide.

Daaronder volgt een verantwooring over alle niet-functionele eisen die niet zijn gebouwd, en beslissing over de veranderingen in uitvoer en en de redenen waarom. 

## Servers

_(Standaard techniek als geleverd door de Bootcamp)_

Op de achtergrond van Spring Boot wordt er gebruik gemaakt van Apache Tomcat.

De front-end server draait op http://localhost:3000

De back-end server draait op http://localhost:8080

## Database

_(Standaard techniek als geleverd door de Bootcamp)_

De database is PostgreSQL.

Door het gebruik van Spring Boot met haar database implementaties, kunnen de backend en de database waarschijnlijk niet zomaar op alle systemen draaien.
Daarom zijn er in de directory/folder `src/main/resources` verschillende `application.properties` meegeleverd:

* JPA
* Hibernate (de ORM)
* Tables droppen bij elke Run
* een uniek niet-realief pad naar de Uploads directory
* PostgreSQL profiel en dialect

## Java en Spring Boot

_(Standaard techniek als geleverd door de Bootcamp)_

Alle back-end code is Java 17 (JDK 17/SDK). Op dit moment lijkt JDK 17 de nieuwste long-term support (LTS) versie voor de toekomst te gaan worden, maar die was op het moment dat ik begon met het bouwen van deze app, nog niet in release fase. Ik hoop wel dat dit betekent dat mijn Closette App hierdoor nog lang bruikbaar zal blijven.

### Spring Boot

_(Standaard techniek als geleverd door de Bootcamp)_

Er is van het Spring Boot Framework gebruik gemaakt, en daarvan zijn de volgende plug-ins/produkten gebruikt:

* Spring Web
* JPA
* Security
* Validation
* JUnit Test
* Jackson
* Hibernate

Er zijn hiernaast nog veel meer plug-ins en frameworks op de achtergrond geïmplementeerd door Spring Boot zelf. Deze zijn niet te zien in het Pom bestand.

Door middel van een listener heb ik alle `Rest endpoints` verzameld in een lijst die in de documentatie van de back-end map staat, daarin staan ook alle Postman request als importeerbaar `JSON file Collection v2.1` bestand (inclusief JSON-voorbeelden). In de IDE heb ik ook de JPA Buddy plug-in gebruikt. En ik heb gebruik gemaakt van de Spring initializer: https://start.spring.io

Ik heb geen gebruik gemaakt van Lombok, vanwege mijn beperkte Java kennis, en het 'mag' volgens mij niet gebruikt worden bij dit examen, maar de voordelen van Lombok klinken alsof het eigenlijk aangemoedigd zou moeten worden omdat het de code verkort en schoon houdt.

## Gebruikte hulpmiddelen (software)

_(= Mix van standaard technieken + mijn eigen industry-standard DTP wensen)_

Voor het ontwikkelen is gebruik gemaakt van

* IntelliJ IDEA Mac 2021.2.3 (Ultimate Edition) met plug-ins
* online Visual Paradigm Online (voor sequence, use case en class diagrams)
* Maven 3.6.3
* Postman Mac 9.12.2
* pgAdmin 4 Mac v.6.1
* Webstorm Mac 2021.2.3
* React, Axios, ESLint, React Router 5.2, en React-Hook-Form (zijn reeds gesaved in de JSON package builder).
* Figma Mac applicatie + Figma online
* Adobe Photoshop voor optimaliseren van web images
* Adobe Illustrator en Adobe Animate voor converteren naar SVG van mijn handgetekende icoontjes
* ..._koffie_ (= geen software maar een drank)

## Git versiebeheer en Github

_(Standaard techniek als geleverd door de Bootcamp)_

Zie https://github.com/jirosworld en de `.git` directory/folder van het project.

Ik heb tenminste 2X feature branches gemaakt voor het maken van database relaties en foto upload functionaliteiten - die pull requests zijn allemaal gemerged met Main en nu niet meer zichtbaar. Alle commits, inclusief merges, vanaf de aanvang van de bouw zijn hier zichtbaar: https://github.com/JirosWorld/fullstack-closette-app/commits/main 

Ook gebruikte ik de online viewer "https://github.githistory.xyz" om door commits heen te bladeren.

NB: door de gitignore file zijn onnodige NPM node bestanden voor de front-end en IDE bestanden niet bijgevoegd in deze projectfolder. Deze dient men zelf te installeren via NPM install. Zie de uitgebreide[installatiehandleiding](installatiehandleiding-closette.pdf).

## Unit-testen

_(Standaard techniek als geleverd door de Bootcamp)_

Zie de directories/folders onder `src/test/java`.

Het testen heb ik getracht te doen met zowel unit-tests en mocks, gebruikmakend van Spring Boot test en WebMvc. Ik vind het testen een erg moeilijk proces, dat pas helemaal aan het eind, in slechts 1 les, van de Bootcamp werd besproken. Mijn tests komen (met coverage) niet verder dan 31%. 

In mijn eigen geval betekent dit dat ik de tests zelf verkeerd geschreven heb - het betekent hier _niet_ dat de app slechts voor 31% werkt, want de architectuur van deze Closette App is relatief eenvoudig, waarin weinig mis kan gaan.

## Beveiliging

_(= Mix van standaard technieken + mijn eigen beslissingen)_

* Het gebruik van een JWT tokens was niet verplicht maar deze heb ik toch graag toegepast omdat het veel inlog/uitlog frustratie wegneemt aan de front-end.
* De beveiliging is niet production-ready doordat er  natuurlijk te eenvoudige wachtwoorden ('password') en een te simpele secret key is gebruikt ('secret'). In de werkelijkheid kan er beter worden gewerkt met cookies i.p.v. alleen een JWT token. 
* Via authenticatie met JSON Web Token (JWT) was het mogelijk om de endpoints te beveiligen met authenticate en authorisaties. Het verwijderen van een bestaande gebruiker is beveiligd, zodat alleen gebruikers met de ADMIN rol deze acties kunnen uitvoeren aan de back-end.
* De CORS beveiligingscode heb ik rechtstreeks gekopiëerd van wat we in de les te zien kregen.


## Technische functionaliteits beslissingen


Java is een geheel nieuwe taal voor mij. Tot nu toe had ik alleen ervaring met HTML, CSS, basis PHP, basis mySQL en zeer basale Javascript en JQuery; ik heb grote vorderingen gemaakt, maar toch was ik beperkt in wat ik aankon om binnen een realistisch tijdsbestek te kunnen bouwen. Ik ben wel trots op wat ik gemaakt heb en ik denk dat het eindprodukt goed toonbaar is. Hier volgen de zaken waar ik andere beslissingen heb gemaakt dan in mijn klassendiagram en/of ontwerpen.


### Wat is er niet gedaan + disclaimers

_(limitaties van mijn applicatie en beargumentatie van mogelijke doorontwikkelingen)_

De minimale exameneisen zijn; "De student implementeert vier belangrijke kern-functionaliteiten op correcte wijze, waaronder (1) het authenticatie-proces van registratie/inloggen, (2) bestands-up- en download en (3 & 4) twee overige zelfbedachte, complete use cases."

Ik heb aan alle 4 de eisen voldaan. De eerste 2 eisen zijn functioneel: er kunnen nieuwe gebruikers worden aangemaakt die zchzelf kunnen registrwren en kunnen inloggen via de front-end, en er kunnen Avatars en foto's worden geupload aan de front-end in de app, waar ook een 'thumbnail'/miniaturen deel te zien in waar de foto's kunnen worden gedownload.

De 2 complexe use cases in mijn app zijn:

1. De database kunnen doorzoeken op 3 verschillende criteria; Stad, Land, bedrijfsnaam.
2. Nieuwe entries kunnen toevoegen met allerlei eigenschappen, inclusief de doorzoekbare data Stad/Land/Naam attributen.

Als _extra complexe functionaliteit_ bevat de app nog de mogelijkheid tot het plaatsen van beoordelingen - dit is een POST request naar een 'relationeel' endpoint. Oftewel: het toevoegen van nieuwe 'Rating' data aan de Rating klasse, resulterend in gekoppelde data naar de OneToMany eigenaarsklasse 'Toilet' - die ook nog eens gekoppeld zijn naar de ManyToOne relatie naar de ingelogde User die de Rating heeft geplaatst.

Niet-functionele eisen: bij aanvang was niet duidelijk hoeveel ik qua User Experience binnen een kort Bootcamp tijdsbestek daadwerkelijk af zou krijgen. Ik heb een flink aantal niet-functionele eisen (_meer eisen dan voor de eindopdracht nodig waren_) opgesteld waarvan een deel niet is uitgevoerd: deze eisen zijn vooral vanwege tijdsgebrek achterwege gelaten en hebben geen effect op de functionele werking en minimale eisen van de app/examenopdracht. In het Functioneel/Technisch ontwerp staat duidelijk aangegeven welke niet-functionele eisen niet zijn uitgevoerd door tijdsgebrek. In het Technisch/Functioneel ontwerp staat zeer gedetailleerd in rood en groen aangegegeven wat ik wel en niet heb kunnen bouwen; ik heb alles kunnen bouwen dat ik strict noodzakelijk achtte voor de zoek-app; alle _niet-functionele_ eisen die ik niet heb kunnen maken, maar die wel wenselijk zijn en voor een veel betere, realistische app zouden zorgen zijn o.a. deze:

* Ik heb een zeer groot deel van de tijd erg geworsteld met het relational database concept, en begreep pas in een zeer laat stadium wat dit zou betekenen voor mijn code. Hierdoor heb ik maar 1 echte 'nested' relatie kunnen bouwen die ook in de front-end functioneel is: die van Ratings/beoordelingen. Eindelijk begrijp ik nu hoe dit ongeveer werkt, en ik zie mogelijkheden tot verbetering van de andere relaties in zowel de front-end als back-end; vooral bij de foto's. Ik had hierdoor nog geen totale beheersing van het bidirectional/unidirectional denken, maar op dit moment functioneren alle relaties in de app zoals ik wil (behalve de relatie van Photo tot Toilet).
* **wenselijk 1**, ik verwacht dat ik dit nu wel zou kunnen bouwen met mijn huidige kennis: een rating systeem waarbij 1 user maar 1 rating kan plaatsen per toilet entry.
* **wenselijk 2**, ook verwacht ik dat ik dit nu wel zou kunnen bouwen met meer tijd: foto's die daadwerkelijk bij 1 toilet horen en niet bij allemaal... Uit tijdgebrek besloot ik om de wonderlijke werking nu te laten voor wat die is, omdat de exameneis alleen om "een upload functionaliteit" vraagt zonder dat er een relatie wordt gespecificeerd.
* **wenselijk 3**, zou ik misschien kunnen bouwen, maar lijkt moeilijk: een veel uitgebreidere filtering op zoekresultaten d.m.v. array-methods aan de front-end OF door middel van nieuwe queries aan de back-end (hier moet ik Spring Boot nog beter voor leren beheersen)
* **wenselijk 4**, moeilijk: er kan nu niet gefilterd worden op het wel of niet genderneutraal zijn van de zoek-eigenschappen. Dit omdat 'genderneutral' een boolean is en ik het aan de backend niet voorelkaar kreeg om een 'false' op dubbel 'false' te checken - hier moet ik nog flink onderzoek naar doen. Wel is er aan de front-end meteen visueel te zien of 1 entry wel of geen genderneutraal icoontje bevat.
* In mijn klassendiagram had ik besloten dat de relatie van foto-tot-toilet een unidirectional OneToOne moest zijn, maar in de werkelijkheid wilde ik er eigenlijk een ManyToMany van maken - sommige foto's zouden meerdere malen herhaald/gebruikt moeten kunnen worden, én eigenlijk wil je ook meerdere foto's per toilet kunnen plaatsen; dus heb ik er als compromis een ManyToOne relatie van gemaakt; dit ook omdat mijn basis Java beheersing me nog parten speelt. Ik ben me er bewust van dat dit een rare beslissing is. In ieder geval zijn in de huidige constructie de foto ID's en toiletten ID's als foreign keys te gebruiken, en daardoor ook aanspreekbaar als nested JSON object voor de front-end. In het vervolg zou ik de relatie omkeren naar een OneToMany; iets waar ik in de laatste fase geen tijd meer voor had.
* De foto's bij de nieuwsberichten zijn nu fake/gemockt en kan ik in het vervolg ook omzetten naar een OneToMany relatie.
* Mijn 2 foto endpoints heb ik verschillend gebruikt in de hoop dat in ieder geval 1 van de 2 zou werken voor een examinator; op mijn lokale machine werken ze allebei, maar toen ik de app liet testen door een medestudent, kreeg hij de database upload versie niet aan de praat, dit komt waarschijnlijk door het large object byte array (@Lob) incombinatie met de unieke getallen die in de DAO gegenereerd moeten worden - in de [istallatiehandleiding](installatiehandleiding.md) heb ik uitgebreid uitgelegd hoe de images, die in de database staan, zichtbaar gemaakt kunnen worden.
* Dit is een 'stateless webserver' - daardoor kon ik niet zo makkelijk veel 'prefilled' foto's afleveren die reeds meegegeven worden bij het opstarten van de backend. Hoe het nu werkt: zodra je een NIEUWE foto uploadt voor NIEUWE toilet entries, dan komt de toiletfoto-download URL uit de `photos` byte-array database. Maar het uploaden van een Avatar (gebruikersafbeelding) gaat via een andere database: de avatars worden NIET opgeslagen in de database maar in de `front-end/public/uploads directory` en ze krijgen een ID mee in de `uploaded_files` database.
* Ik besloot de Upload directory voor foto's uiteindelijk te verplaatsen van de back-end map naar de Public map in de Front-end omdat me dat een logischere plek leek.
* Ik heb gebruik gemaakt van standaard CSS en bij slechts 1 component heb ik een CSS-module gebruikt; dit omdat ik al bekend ben met CSS en dit tijd scheelde bij ontwikkelen. Wel heb ik hier en daar de BEM notatie gebruikt om ermee te kunnen oefenen.
* Dit project gebruikt de verouderde versie 5 van `React Router-Dom`, omdat deze in de lessen is behandeld.
* in React heb ik niet gebruik gemaakt van het Privateroute component omdat ik zelf een eenvoudiger manier heb bedacht om navigatie afhankelijk te maken van een wel/niet ingelogde user, en va de gebruikersnaam.
* **wenselijk 5**: de mogelijkheid voor geregistreerde gebruikers om weer te kunnen inloggen nadat zij hun wachtwoord hebben veranderd... 2 dagen voor de inleverdatum kwam ik erachter dat dit slechts gedeeltelijk werkt: in het Dashboard kunnen users hun eigen wachtwoord goed veranderen - en op de backend kun je ook daadwerkelijk zien dat dit gebeurt - er wordt zelfs een encoder overheen gegooid, maar het lukt niet om weer opnieuw in te loggen, na uitloggen. Niet met het oude wachtwoord en ook niet met het nieuwe, of je die nu decode of niet. Ik denk dat mijn probleem in de front-end zit, maar omdat deze wachtwoordfunctie niet 1 van de functionele eisen was, heb ik deze onderaan de prioriteitenlijst gezet.

### Andere zaken die ik niet heb kunnen bouwen waar ik mij bewust van ben:

* Ik ben me ervan bewust dat mijn React / javascript code veel herhalingen bevat; het DRY principe kan echt beter worden toegepast.
* Mijn Spring Boot applicatie is relatief eenvoudig van opzet. Er zitten eigenlijk geen echte functies in. Het is vooral gericht op het verzamelen en serveren van data uit de database. De enige echt 'functie' die er in zit, is het omzetten van de lokale datum naar de datum voor posts. De enige nog complexere functie, _voor de back-end_, die ik zou kunnen bedenken bij dit app idee is: het omzetten van de ratings-array naar een gemiddelde, misschien via overerving of een interface in de Service laag van klasse Toilet.
* Een andere mogelijkheid voor het bouwen van een complexere app is wellicht het meer verbinden van de latitude en longitude: een situatie waarbij de gebruiker verplicht is om _allebei_ deze GPS velden in te vullen, en niet slechts 1.
* Het filteren van zoekresultaten gebeurt, op het moment van schrijven, vooral aan de front-end. Dat wil zeggen; er wordt zoveel mogelijk uit de database getoond (bijvoorbeeld alle gevonden entries uit 1 stad). Dit is een voorbeeld van een situatie waarbij je, als fullstacker, kunt KIEZEN of je die aan de frontend of aan de backend wilt bouwen. Door tijdgebrek vond ik het makkelijker om de filtering vooral aan de frontend af te handelen.
* Het diep/moleculair indelen in React componenten heb ik niet gedetailleerd kunnen doen door tijdgebrek - in principe zou het beter zijn om van elk type Axios request of Async functie een eigen component te maken, maar ik heb nu vaak voor sommige individuele pagina's een flinke lap code gemaakt. Op zich is dat nu nog niet zo'n probleem in dit project omdat er nog niet veel pagina-soorten zijn, en dus ook nog niet veel templates, dus de code is eigenlijk nog steed uniek per template/sjabloon, maar ik weet dat het netter kan.
* Omdat ik veel functionaliteit wilde bouwen en de app echt op een volledige website, gevoed door een database, wilde laten lijken, heb ik veel logica ingebouwd waarbij ik veel `comments` en `console.logs` nodig had - door tijdgebrek heb ik deze niet allemaal kunnen verwijderen maar in een real life werksituatie zou ik dit wel opschonen - bovendien zou ik ze dan 100% in het Engels doen.
* De gestelde kwaliteitseis van een totale test-coverage van 50% is niet behaald. Ik heb een bereik van 31% met coverage.
* Het ontwerp in Figma komt niet 100% overeen met wat ik uiteindelijk in React heb gebouwd; in CSS kan ik heus wel 'pixel perfect' bouwen maar Figma doet niet wat ik wil. Een aantal elementen in Figma hadden afgeronde hoeken en meer consequente tussenruimtes moeten hebben, maar dat lukt niet overal. Deze manier van werken is niet 'industry standard' weet ik - ik moet het design van een UX designer natuurlijk tot op de pixel nauwkeurig kunnen nabouwen. In deze oplevering lijkt het nu alsof ik me niet aan mijn eigen ontwerp heb gehouden - maar eigenlijk is het omgekeerd: Figma houdt zich niet aan mij.
* De app wijkt niet alleen qua design maar ook qua functionaliteit licht af van het Figma ontwerp omdat ik tijdens de Bootcamp en tijdens het bouwen meer functionaliteiten heb geleerd die ik ook graag wilde tonen aan de front-end; zoals het tonen van alle individuele ratings en de gebruikersnamen van de reviewers, en het meer implementeren van pop-up schermen (modals) en accordeons/uitklap f.a.q. velden en meer Flexbox.
* Het 2e 'main succes' scenario in de Use Case uit het functioneel ontwerp heb ik niet kunnen bouwen: het zou wel mooi zijn als ik een functionaliteit had kunnen bouwen waarbij meerdere eigenschappen van een toilet elkaar kunnen uitsluiten of aanvullen in een zoekopdracht - maar dat betekent eigenlijk dat ik voor alle combinaties een beslisboom moet maken; heel leuk maar ook tijdrovend. Ook had ik geen tijd om een functie te bouwen waarmee latitude en longitude aan elkaar gekoppeld blijven.


## Niet-essentiele niet-functionele eisen

Hieronder volgt een lijst van de **_nice-to-haves_** die ik niet heb kunnen bouwen, maar die een idee zouden kunnen zijn voor hypothetische verbetering.

* Geen performance tests. Het is dus niet zeker wat er gebeurt als er enorm grote aantallen gebruikers grote hoeveelheden data gaan invoeren. Meer data heeft impact op het schijfruimtegebruik van de database en op de snelheid waarmee die bevraagd kan worden.
* Ik heb slechts gedeeltelijk de DTO laag gebruikt; dus deze app is niet beschermd tegen SQL injecties.
* Geen uitgebreide splitsing van de DTO's naar input en output, wat wel netter zou zijn, maar dit is geen exameneis.
* Aan de front-end zijn geen Dev dependencies gebruikt (dit zou netter zijn, bij gebruik van SASS bijvoorbeeld).
* Deze opdracht levert géén deployment-ready product op en zal niet werken op een FTP server, maar dat was ook geen eis.
* Geen specifieke CORS URL gekozen dus in plaats van port 3000 heb ik een * operator gekozen zodat **alle** verzoeken naar de back-end door kunnen komen.
* Geen https SSL certificaat omdat dit bij nakijken problemen kan geven maar in het het echte bedrijfsleven moet dit wel.
* Voor de end-points heb ik makkelijk leesbare woorden gebruikt, en niet de "api/v1/..." notatie, omdat deze niet behandeld is in de les en ik er geen voordeel in zag om dit te doen voor een App die niet klaar is voor release en waarin ik geen toekomstige versies zie, met een transitie periode naar versie 1.
* Het systeem checkt nu niet of het ingevoerde mailadres écht bestaat/werkt. Op dit moment gebruik ik alleen de standaard browser-afhankelijke check. Chrome en Firefox geven zelf een waarschuwing af of het teksutele format van het mailadres klopt, dus of er een apestaartje of land-extensie in zit, maar verder niet. Deze functie werkt niet in alle browsers. Dit was ook geen exameneis.
* De gebruiker die een nieuw toilet heeft gepost zou automatisch een bevestigingsmelding kunnen ontvangen na het inzenden van zijn entry.
* Toegankelijkheid (accessibility) zou kunnen worden verbeterd door adblockers toe te staan (is nu niet mogelijk omdat deze app geen levende website is).
* Toegankelijkheid zou ook kunnen worden verbeterd door de mogelijkheid te geven om tussen darkmode en lightmode te switchen (dit kan ik nu wel bouwen maar kost veel tijd om na te denken over de kleuromkering van ALLE CSS stijlen).
* Extra eigenschappen waarop gefilterd kan worden, zouden kunnen zijn: 1. 'sneaky' gratis (dus: eigenlijk een toilet van een horeca gelegenheid maar niet gecontroleerd en makkelijk gratis te gebruiken), 2. design/artsy toilet, 3. grappige of artistieke bathroom graffiti.
* De gebruikersnaam van de ingelogde bezoeker zou steeds boven in beeld kunnen verschijnen, onder het avatar icoontje. Dit heb ik nu niet gedaan omdat het denk ik te druk wordt qua design.
* Idee: Als de vinder een grote foto uploadt dan moet deze automatisch worden omgezet naar een 72ppi foto van maximaal 1000px breed en 1000px hoog. De maximale uploadgrens is 3 MB. Ik weet niet of ik een dergelijke functie zelf zou kunnen bouwen - het klinkt als een plug-in.
* Helemaal niet gebouwd: De mogelijkheid voor gebruikers om reacties te plaatsen bij entries, en zo publiek meldingen doen of de locatie veilig is. Wanneer een entry/toilet reacties heeft, dan staat het aantal reacties vermeld als getal in de zoekresultaten. Dit is een idee dat ik pas heel laat in de bouwfase kreeg en dat nog makkelijk gemaakt zou kunnen worden omdat ik nu heb leren werken met de OneToMany database functies.
* Als aardigheid zouden ingelogde gebruikers een notifications icoontje kunnen zien met een nummer als een reactie is geplaatst op hun toilet-entry of als een moderator er een verandering in heeft gemaakt - ik denk dat dat iets met React Context te maken zou kunnen hebben, maar dit klinkt complex.
* De mogelijkheid voor ingelogde gebruikers om in hun dashboard in 1 oogopslag alle door henzelf toegevoegde toilet-locaties in een lijst zien staan - dit zou mijn klassendiagram veranderen omdat ik dan een nieuwe relatie tussen User en Toilet moet maken.
* Geen anti-robot veiligheids check: een gebruiker kan niet meer dan 2 toiletten per minuut plaatsen.
* De gebruiker die een nieuwe account heeft aangemaakt zou via e-mail automatisch een bevestigingsmelding kunnen ontvangen.
* De zoekresultaten zouden een hiërarchisch kruimelpad (SEO) kunnen hebben, waarover genavigeerd kan worden. De hiërarchische volgorde zou kunnen zijn, in volgorde van belangrijkheid: Land >> Stad >> straat (is wellicht niet mogelijk met React).
* Ik heb aan de back-end zijde geen mailserver functie gebouwd (geen vereiste), dus heb ik het contactformulier functioneel gemaakt via de EmailJS cloudfunctie. Dit is vast niet zoals het bij een professioneel bedrijf er aan toe zou gaan, maar het heeft goed bruikbare templates.
* Ik heb aan de front-end geen nieuws-beheer toegevoegd, omdat dat teveel voelde alsof ik een compleet CMS aan het bouwen was en omdat dit geen eis was voor de functionaliteit van deze zoek-app. Admins kunnen via Postman nieuwe berichten plaatsen. Ik vind het wel leuk dat ik nu de competenties heb om deze functionaliteit ook echt te gaan maken.
* Ik had paginering in kunnen bouwen voor de front-end, of een "never-ending scroll" want nu komen alle resultaten op 1 pagina (zowel bij de toiletten als bij Nieuws). De paginering zou kunnen via de back-end met een CRUD repositiry, of aan de front-end met een javascript dat steeds een vast aantal posts toont op basis van scroll positie.
* De front-end website is niet geoptimaliseerd voor Explorer en heb ik niet kunnen testen op touch-screens (waar bijvoorbeeld Hovers niet werken). Bij meer tijd zou ik echt wel ook zeer verouderde browsers willen supporten, vooral omwille van de toegankelijkheid.

## Leerpunten

• De visuele en functionele eisen zijn echt eeuwig uit te breiden, en waren lastig voor mij om te trechteren naar een werkbare hoeveelheid code. Want: beperken tot iets kleins, blijkt het moeilijkste te zijn van dit proces. Het was ook niet van tevoren in te schatten hoeveel van de belangrijkste functionele eisen ik daadwerkelijk kon verwezenlijken.

• Ik heb veel meer dan de benodigde tijd besteed aan de Bootcamp stof, maar kwam uiteindelijk toch tijd te kort om álles dat ik in de back-end heb gebouwd ook daadwerkelijk functioneel te construeren in de front-end. In real life zou ik voor een CMS kiezen, met een open-source database die runt op FTP servers. Ik ben wel trots op wat ik gemaakt heb en heb ontzettend veel geleerd.

• Deze Bootcamp is slechts een eerste begin; als ik 4 jaar de tijd had gehad dan zou ik heel blij geworden zijn van meer SASS of LESS aan de front-end en een 'env' folder e.a. intelligente manieren voor centraal management, en veel meer tijd om het relationele end-points deel van de back-end te begrijpen.

• Ik heb ervaring als front-end developer en dat ga ik blijven doen; ik denk dat ik nu een betere front-ender ben dan voorheen. Mijn volgende leerwensen zijn Vue.js en Angular.

• Het leren van back-end is echt enorm verhelderend, dat zouden alle front-enders eens moeten proberen.

• Deze app is het begin van een idealistisch idee voor de toekomst. Ik heb nog plannen voor het koppelen van een Map API die toont op welke locatie op de kaart de gebruiker daadwerkelijk staat.

### Nawoord

Ik hoop dat nieuwe programmeurs gevoeliger gaan zijn voor diversiteit en nooit meer databases ontwerpen waarin gender slechts binair of een boolean is. We leven in 2021 dus het zou mooi zijn als sekse en gender nooit meer verplichte invoervelden zijn, óf heel gemakkelijk gewijzigd kunnen worden door gebruikers zelf. Het zou ook mooi zijn als docenten hierin een voortrekkersrol vervullen (op dezelfde wijze als Github die alle Master branches naar Main laat hernoemen) en minder vaak voorbeelden in de les geven over mensen die alleen hetero-relaties hebben of alleen maar ‘Jan’ of ‘Piet’ heten. 😬  Dat voelt in het begin misschien geforceerd, maar je moet érgens beginnen... Het kan i.e.g. blindheid verminderen bij programmeurs die voor _echte mensen_ moeten programmeren.

Lees mijn stuk over diversiteit in code hier:
https://codepen.io/jirosworld/post/how-to-build-diversity-into-your-code

~ Saluti

Jiro Ghianni

2022