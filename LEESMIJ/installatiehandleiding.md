# Closette App installatiehandleiding

door Jiro Ghianni

## Opstarten

Houd deze repository binnen 1 directory. Dat wil zeggen: sleep de front-end map _niet_ naar een andere plek ten opzichte van de back-end. Dit in verband met de relatieve paden van een aantal standaard-afbeeldingen die als voorbeeld zijn gebruikt om de database te vullen.

## Back-end Applicatie starten

Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de back-end. Liefst via een IDE zoals IntelliJ maar het kan ook door de _backend-closette_ folder te openen in elke terminal van jouw keuze.

In de meeste gevallen volstaat het om de _backend-closette_ map te openen in een IDE en het pom-bestand van Maven te laten installeren, waarna de Main klasse `ClosetteApplicatie` gedraaid (run) kan worden. Maar instalatie en runnen vanuit de back-end directory kan ook in 1 keer via een terminal naar keuze met:

`$ mvn spring-boot:run`.

In de terminal kan de back-end app gestopt worden met de toetscombinatie `ctrl` + `'C'`.

De back-end wordt aangesproken door de front-end, maar als je alleen via Postman requests wil doen, dan kan dat ook: Open http://localhost:8080 voor requests.

### Extra Back-end aanpassingen

Back-End Datasource settings in `application.properties`

### BELAMGRIJK: verander eerst deze lokale instellingen!

De database settings, in (bijvoorbeeld) pgAdmin:
* postgresql database op localhost:5432 (port 5432)
* databasenaam: closette
* user/owner: springboot
* password: springboot

Maak dus eerst een user aan met naam/wachtwoord `springboot`. En daarna een lege database met de naam `closette`, gekoppeld aan deze user.

**BELANGRIJK**: 

Pas ook in de `application.properties` het Upload-pad voor afbeeldingen aan: voor Mac gebruikers zal dit vlekkeloos verlopen omdat daar nooit Backslashes gebruikt orden, maar Windowsgebruikers moeten opletten dat er soms een Backslash in hun code nodig is waar een Slash moet staan:

`my.upload_location= /Users/jolarti/IdeaProjects/NOVI/Springboot-huiswerk/uploads`

#### Standaard users

* admin - password
* user - password

#### Een Postman export staat ook in de ['back-end documentation'](../backend-closette/documentation/Jiro_Closette_data.postman_collection.json) map: deze kun je importeren in Postman en daarin uitvoeren.

Bij back-end problemen:
* reload `pom.xml`
* of type `./mvnw verify` (mac/linux) of `mvnw.cmd verify` (windows) uit in de terminal van de project directory/folder.


---

## Front-end Applicatie starten

Als je het project gecloned hebt naar jouw locale machine, installeer je (binnen in de front-end folder) eerst de node_modules door, vanuit de front-end map, het volgende commando in een terminal te runnen:

`$ npm install`

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

`$ npm start`

Als je dit project opent in Webstorm kun je hiervoor ook het NPM START afspeelknopje gebruiken.

Open http://localhost:3000 om de pagina in een browser te bekijken. 

NB: Gebruik bij voorkeur **Firefox** of **Chrome**. Natuurlijk werkt alles ook in Safari en Edge maar sommige fonts worden niet mooi 'bold' gerendered.

Axios, React Router 5.2, React-Hook-Form, JWT-decoder,emailJS etc. zijn reeds gesaved in JSON builder en worden automatisch geïnstalleerd.

In de terminal kan de front-end app gestopt worden met `ctrl` + `'C'`.


