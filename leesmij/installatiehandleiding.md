# Closette App installatiehandleiding

door Jiro Ghianni

## Back-end Applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de back-end. Liefst via een IDE zoals IntelliJ maar het kan ook door de SRC folder te openen in een terminal van jouw keuze.

In de meeste gevallen volstaat het om de `src` map te openen in de IDE en de Main klasse `ClosetteApplicatie` te runnen, of via de terminal met `mvn spring-boot:run`.

In de terminal kan de back-end app gestopt worden met `ctrl` + `'C'`.

De back-end wordt aangesproken door de front-end maar als je alleen via Postman requests wil doen, dan kan dat ook: Open http://localhost:8080 voor requests.

Zie ook hier, voor de echte back-enders, [alle mogelijke postman requests](postman-documentatie.rtf).

Bij back-end problemen:
* reload `pom.xml`
* of type `./mvnw verify` (mac/linux) of `mvnw.cmd verify` (windows) uit in de terminal van de project directory/folder.

## Front-end Applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:

`npm install`

Als je dit project opent in Webstorm kun je ook het NPM START afspeelknopje gebruiken.

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

`npm start`

Open http://localhost:3000 om de pagina in een browser te bekijken. 

Axios, React Router 5.2, en React-Hook-Form zijn reeds gesaved in JSON builder.

In de terminal kan de front-end app gestopt worden met `ctrl` + `'C'`.