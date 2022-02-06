# Fullstack Closette App

door Jiro Ghianni

![Closette logo](./src/assets/img/logo-toilet-nav.png)

## Inhoud en installatie

⚠️ Let op: wanneer je dit project in 1 keer binnen een IDE importeert van Github, dan moet je er rekening mee houden dat de start scripts in de ***sub directories*** staan, dus 1 map lager dan de ROOT! Open dan _alleen_ de `frontend-closette` map als 'root' in een IDE/Webstorm.

Welkom bij de _Closette ~ genderneutrale toiletten zoek-app_. Deze front-end kun je zelf installeren via de installatie handleiding. Alle toelichtingen en uitleg over hoe deze app inelkaar zit, kun je in de LEESMIJ folder vinden, daarin staan:

* Deze Readme
* Beschrijving waar alle documenten en applicaties te vinden zijn
* Link naar de GIT repository waarnaar het project geüpload
is: [Jiro's Github Fullstack Closette App](https://github.com/JirosWorld/fullstack-closette-app).

* Lees eerst goed de [installatiehandleiding (PDF)](../LEESMIJ/installatiehandleiding-closette.pdf) die in [de LEESMIJ map](../LEESMIJ) staat.

* in de 'LEESMIJ' map staat het [Functioneel ontwerp + het Technisch ontwerp **samen** in 1 PDF](../LEESMIJ/functioneel-technisch-ontwerp-app-jiro.pdf) (7 MB)

* Broncode van beide projecten staat in de complete ZIP en het online Github-project.

* in de 'LEESMIJ' map staat ook het Verantwoordingsdocument: [link naar Verantwoordingsdocument in markdown](../LEESMIJ/verantwoordingsdocument.md)

* link naar de Figma ontwerpen:
  https://www.figma.com/file/yv5hJQVzTMvwTT31oyQBRE/Jiro-Closette-design?node-id=0%3A1

## Front-end opstarten

Zie de installatiehandleiding in de LEESMIJ folder. Belangrijk voor Github gebruikers: download eerst het hele project als ZIP en pak deze uit, daarna kun je de front-end folder als 'root' openen in een IDE met React/NPM/console zoals Webstorm.

## Totale installatie samengevat

1. download de gehele ZIP van Github (dus: _niet_ uitchecken als versioncontrolled project) en pak deze ut op je lokale machine.
2. open de backend-closette map in een Java IDE of console.
3. verander de database gegevens zoals hieronder aangegeven.
4. verander het upload pad naar de `Public/uploads` map in de front-end directory ÉN upload alle foto's uit die map naar de datase om zo nieuwe Byte array cijfers te verkrijgen (zie meer in de uitgebreide [installatiehandleiding.md](../LEESMIJ/installatiehandleiding.md) ).
5. run eventueel Maven vanuit de backend map, en start de Java applicatie `ClosetteApp` in de SRC/main map.
5. open de frontend-closette map in een React IDE of console.
6. run `$ npm install` en `$ npm start` **_vanuit_** de front-end folder zelf.
7. bekijk de front-end in een browser.

Zie voor verdere uitleg de [volledige installatiehandleiding als PDF](../LEESMIJ/installatiehandleiding.md).

Saluti,

Jiro Ghianni
2021 / 2022

~
