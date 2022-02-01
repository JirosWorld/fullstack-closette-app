# Closette App installatiehandleiding

door Jiro Ghianni

## Introductie

Houd deze repository bijelkaar binnen 1 directory. Dat wil zeggen: sleep de front-end map _niet_ naar een andere plek ten opzichte van de back-end. Dit in verband met de relatieve paden van een aantal standaard-afbeeldingen die als voorbeeld zijn gebruikt om de database te vullen.

⚠️ :warning: Let op: wanneer je dit project in 1 keer binnen een IDE importeert van Github, dan moet je er rekening mee houden dat de start scripts in de ***sub directories*** staan, dus 1 map lager dan de ROOT! Dit heeft invloed op het opstarten van zowel de back- als de front-end. Het is daarom eenvoudiger om dit project te DOWNLOADEN als ZIP, deze uit te pakken, en daarna de individuele mappen als 'root' te openen in een IDE naar keuze. 

## Complete installatie kort samengevat

1. download de gehele ZIP van Github (dus: _niet_ uitchecken als versioncontrolled project) en pak deze uit op je lokale machine.
2. open de backend-closette map in een Java IDE of console.
3. verander de database gegevens zoals hieronder aangegeven.
4. verander het upload pad naar een map op je lokale machine.
5. run eventueel Maven vanuit de backend map, en start de Java applicatie `ClosetteApp` in de SRC/main map.
5. open de frontend-closette map in een React IDE of console.
6. run `$ npm install` en `$ npm start` **_vanuit_** de front-end folder zelf.
7. bekijk de front-end in een browser.

Zie voor verdere uitleg hieronder.

## Back-end Applicatie starten ~ uitgebreid

1. Lijst van benodigdheden Back-End
2. Stappenplan 
3. Lijst van alle rest endpoints


## 1. Lijst van benodigdheden Back-End

Voor de installatie is een werkende internet verbinding vereist.

## 2. Stappenplan

## 3. Lijst van alle rest endpoints


Als je het project gedownload hebt naar jouw locale machine, installeer je eerst de back-end. Liefst via een Java-ready/Maven-ready IDE zoals IntelliJ maar het kan ook door de `backend-closette` folder te openen in elke terminal van jouw keuze.

Je IDE kan als notificatie de vraag stellen of Maven dit project mag vertrouwen, zeg dan 'yes' op de trust vraag. En installeer JPA buddy en de andere plugins wanneer daar akkoord op wordt gevraagd. Indien IntelliJ vraagt om een DataSource of SQL dialect te kiezen, doen dit dan NIET, laat het zoals het is. En klik OK op de JPA Buddy default configuratie.

In de meeste gevallen volstaat het om de _backend-closette_ map te openen in een IDE, die Java kan complieren, en het pom-bestand van Maven te laten installeren, waarna de Main klasse `ClosetteApplicatie` gedraaid (run) kan worden. (Het back-end startscript staat in `bckend-closette/pom.xml`). Maar installatie en runnen vanuit de `backend-closette` directory kan ook in 1 keer via een terminal naar keuze met het commando:

`$ mvn spring-boot:run`.

In de terminal kan de back-end app gestopt worden met de toetscombinatie `ctrl` + `'C'`.

### JAVA versie

Dit project werkt alleen wanneer je JDK versie 17 of hoger hebt geïnstalleerd op je computer. Wanneer je deze niet hebt, kun je deze downloaden via https://jdk.java.net


### Back-end aanpassingen database

Belangrijk: verander eerst deze lokale instellingen!

De database settings, in (bijvoorbeeld) pgAdmin:
* postgresql database op localhost:5432 (port 5432)
* databasenaam: closette
* user/owner: springboot
* password: springboot 

Maak dus eerst een user aan met naam/wachtwoord `springboot`. En daarna een lege database met de naam `closette`, gekoppeld aan deze user.

### Standaard users

* admin - password
* user - password
* tester - password

### Back-end aanpassingen voor uploads

Pas ook in de `main/resources/application.properties` het Upload-pad voor afbeeldingen aan: voor Mac gebruikers zal dit vlekkeloos verlopen omdat daar nooit Backslashes gebruikt worden, maar Windowsgebruikers moeten opletten dat er soms een Backslash in hun code nodig is daar waar een Slash moet staan. Het lokale pad hier dien je aan te passen vanaf het 'Users' path naar de locatie op jouw eigen machine:

`my.upload_location= /Users/jolarti/IdeaProjects/NOVI/Springboot-huiswerk/uploads`


#### Server requests

De back-end wordt aangesproken door de front-end, maar als je alleen via Postman requests wil doen, dan kan dat ook: Open http://localhost:8080 voor requests.

Een Postman export staat ook in de ['back-end documentation'](../backend-closette/documentation/Jiro_Closette_data.postman_collection.json) map: deze kun je importeren in Postman en daarin uitvoeren.

Bij back-end problemen:
* reload `pom.xml`
* of type `./mvnw verify` (mac/linux) of `mvnw.cmd verify` (windows) uit in de terminal van de project directory/folder.


---

## Front-end Applicatie starten

1. Lijst van benodigdheden Front-End
2. Stappenplan
3. Lijst van alle functies


## 1. Lijst van benodigdheden Front-End

## 2. Stappenplan

## 3. Lijst van alle functies


Lijst van benodigdheden

Stappenplan

Lijst van alle functies

Als je het project gedownload hebt naar jouw locale machine, en je de back-end hebt opgestart, installeer je (vanuit de `frontend-closette` map) eerst de node_modules door het volgende commando in een terminal te runnen:

`$ npm install`

NB: Het opstart script voor de front-end staat dus 1 directory lager dan deze readme. Dit betekent dat je, wanneer je dit project importeert vanuit Github (version control) je het start-script dan niet meteen kunt runnen (het front-end startscript staat in `frontend-closette/package.json`). Wanneer je een IDE als Webstorm wilt gebruiken, open het project dan _niet_ als 'version-control' project maar: ga in een browser naar Github, download de repository als ZIP, pak dit uit waar je maar wilt, en open dan alleen de `frontend-closette` map in een IDE naar keuze (bijvoorbeeld Webstorm, of Visual Studio met een React plug-in). 

Wanneer dit klaar is, kun je (wederom vanuit de `frontend-closette` map) de applicatie starten met behulp van:

`$ npm start`

Als je dit project opent in Webstorm kun je hiervoor ook het NPM START afspeelknopje gebruiken.

Je IDE kan als notificatie de vraag stellen of je browser (bijvoorbeeld Chrome) deze app mag vertrouwen; beantwoordt bevestigend op elke trust vraag. Open http://localhost:3000 om de web-app in een browser te bekijken en te bedienen. 

Axios, React Router 5.2, React-Hook-Form, JWT-decoder,emailJS etc. zijn reeds gesaved in JSON builder en worden automatisch mee geïnstalleerd.

In de terminal kan de front-end app gestopt worden met `ctrl` + `'C'`.

### Nodejs / npm versie

Dit project werkt alleen wanneer je Nodejs versie Node.js 15.4.0 of hoger hebt geïnstalleerd op je computer. Wanneer je deze niet hebt, kun je deze downloaden via https://nodejs.org/en/download/releases/

### Voorkeur browsers

NB: Gebruik bij voorkeur **Chrome**, **Edge** of **Opera**. Natuurlijk werkt alles ook in Firefox en Safari maar sommige fonts worden daarin niet mooi 'bold' gerendered. Ook wordt op sommige afbeeldingen het 'filter' CSS attribuut gebruikt, deze werkt momenteel nog niet altijd goed in Edge (en al helemaal niet in Explorer).
