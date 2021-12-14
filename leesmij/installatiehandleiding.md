# Closette App installatiehandleiding

door Jiro Ghianni

## Back-end Applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de back-end. Liefst via een IDE zoals IntelliJ.

In de meeste gevallen volstaat het om de `src` map te openen in de IDE en de Main klasse `ClosetteApplicatie` af te runnen, of via de terminal met `mvn spring-boot:run`.

In de terminal kan de back-end app gestopt worden met `ctrl` + `'C'`.

Bij back-end problemen:
* reload `pom.xml`
* of type `./mvnw verify` (mac/linux) of `mvnw.cmd verify` (windows) uit in de terminal van de project directory/folder.

## Front-end Applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:

`npm install`

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

`npm start`

of gebruik de WebStorm knop (npm start). Open http://localhost:3000 om de pagina in de browser te bekijken. 

Axios, React Router 5.2, en React-Hook-Form zijn reeds gesaved in de projectmap.

In de terminal kan de front-end app gestopt worden met `ctrl` + `'C'`.