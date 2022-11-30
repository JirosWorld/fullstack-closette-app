## Back-End Datasource settings in application.properties

⚠️ Let op: wanneer je dit project in 1 keer binnen een IDE importeert van Github, dan moet je er rekening mee houden dat de start scripts in de **_sub directories_** staan, dus 1 map lager dan de ROOT! Open dan _alleen_ de `backend-closette` map als 'root' in een IDE/Intellij.

#### Belangrijk: verander eerst deze lokale instellingen!

De database settings, in (bijvoorbeeld) pgAdmin:

- postgresql database op //localhost:5432
- databasenaam: closette
- user/owner: springboot
- password: springboot

Maak dus eerst een user aan met naam/wachtwoord springboot. En daarna een lege database met de naam `closette`, gekoppeld aan deze user.

Zodra de upload-functie werkt: pas het upload-pad aan naar jouw eigen lokale pad.

RUN:

`$ mvn --version`

(versie gelijk of hoger dan 3.8.3)

$ mvn package

$ brew services restart postgresql (als je postgres via Homebrew gebruikt)

`$ ./mvnw clean install`

$ ./mvnw verify (mac/linux)

$ `mvn spring-boot:run.` or `./mvnw spring-boot:run`

In de terminal kan de back-end app gestopt worden met de toetscombinatie ctrl + 'C'.

$ install pom.xml

Accepteer installatie van de JPA Buddy plug-in.

Lees eerst goed de [installatiehandleiding (PDF)](../LEESMIJ/installatiehandleiding-closette.pdf) die in [de LEESMIJ map](../LEESMIJ) staat.

#### Standaard users

- admin - password
- user - password
- tester - password

### Endpoints

Onderstaande endpoints heb ik tevens gepubliceerd op de Postman documentatie site (inclusief beschrijvingen):
https://documenter.getpostman.com/view/17991980/UVeCR95T

#### Een [Postman export](documentation/Jiro_Closette_data.postman_collection.json) staat in deze back-end directory ook in de 'documentation' map: deze kun je importeren in Postman en daarin uitvoeren.

- {PUT [/users/{username}]}
- {PUT [/toilets/{id}]}
- {PUT [/news/{id}]}
- {POST [/users/register]}
- {POST [/users/{username}/ratings]}
- {POST [/users/{username}/authorities]}
- {POST [/toilets/{id}/ratings]}
- {POST [/toilets]}
- {POST [/single/uploadDb]}
- {POST [/single/upload]}
- {POST [/ratings]}
- {POST [/news]}
- {POST [/authenticate]}
- {PATCH [/users/{username}/password]}
- {PATCH [/toiletsdto/{id}]}
- {PATCH [/toilets/{id}]}
- {GET [/users/{username}/authorities]}
- {GET [/users/{username}]}
- {GET [/users]}
- {GET [/toilets/{id}/ratings]}
- {GET [/toilets/{id}/photos]}
- {GET [/toilets/{id}]}
- {GET [/toilets]}
- {GET [/ratings/{id}]}
- {GET [/ratings]}
- {GET [/photos/{id}]}
- {GET [/photos]}
- {GET [/news/{id}]}
- {GET [/news]}
- {GET [/downloadFromDB/{fileName}]}
- {GET [/download/{fileName}]}
- {GET [/alluploads]}
- {DELETE [/users/{username}/authorities/{authority}]}
- {DELETE [/users/{username}]}
- {DELETE [/toilets/{id}]}
- {DELETE [/news/{id}]}
- { [/error]}
- { [/error], produces [text/html]}

## Totale installatie samengevat

1. download de gehele ZIP van Github (dus: _niet_ uitchecken als versioncontrolled project) en pak deze uit op je lokale machine.
2. open de backend-closette map in een Java IDE of console.
3. verander de database gegevens zoals hieronder aangegeven.
4. verander het upload pad naar de `Public/uploads` map in de front-end directory ÉN upload alle foto's uit die map naar de datase om zo nieuwe Byte array cijfers te verkrijgen (zie meer in de uitgebreide [installatiehandleiding](../LEESMIJ/installatiehandleiding-closette.pdf) ).
5. run eventueel Maven vanuit de backend map, en start de Java applicatie `ClosetteApp` in de SRC/main map.
6. open de frontend-closette map in een React IDE of console.
7. run `$ npm install` en `$ npm start` **_vanuit_** de front-end folder zelf.
8. bekijk de front-end in een browser.

Zie voor verdere uitleg de [volledige installatiehandleiding als PDF](../LEESMIJ/installatiehandleiding-closette.pdf).

Saluti,

Jiro Ghianni
2021 / 2022

~
