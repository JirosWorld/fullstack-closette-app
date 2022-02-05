## Back-End Datasource settings in application.properties

⚠️ Let op: wanneer je dit project in 1 keer binnen een IDE importeert van Github, dan moet je er rekening mee houden dat de start scripts in de ***sub directories*** staan, dus 1 map lager dan de ROOT! Open dan _alleen_ de `backend-closette` map als 'root' in een IDE/Intellij.


#### Belangrijk: verander eerst deze lokale instellingen!

De database settings, in (bijvoorbeeld) pgAdmin:
* postgresql database op //localhost:5432
* databasenaam: closette
* user/owner: springboot
* password: springboot

Maak dus eerst een user aan met naam/wachtwoord springboot. En daarna een lege database met de naam `closette`, gekoppeld aan deze user.

Zodra de upload-functie wekt: pas het upload-pad aan naar joiw eigen lokale pad.

Accepteer installatie van de JPA Buddy plug-in. 

Lees eerst goed de [installatiehandleiding (PDF)](../LEESMIJ/installatiehandleiding-closette.pdf) die in [de LEESMIJ map](../LEESMIJ) staat.

#### Standaard users

* admin - password
* user - password
* tester - password

### Endpoints

Onderstaande endpoints heb ik tevens gepubliceerd op de Postman documentatie site (inclusief beschrijvingen):
https://documenter.getpostman.com/view/17991980/UVeCR95T

* link naar de Figma ontwerpen:
  https://www.figma.com/file/yv5hJQVzTMvwTT31oyQBRE/Jiro-Closette-design?node-id=0%3A1

* {PUT [/users/{username}]}
* {PUT [/toilets/{id}]}
* {PUT [/news/{id}]}
* {POST [/users/register]}
* {POST [/users/{username}/ratings]}
* {POST [/users/{username}/authorities]}
* {POST [/toilets/{id}/ratings]}
* {POST [/toilets]}
* {POST [/single/uploadDb]}
* {POST [/single/upload]}
* {POST [/ratings]}
* {POST [/news]}
* {POST [/authenticate]}
* {PATCH [/users/{username}/password]}
* {PATCH [/toiletsdto/{id}]}
* {PATCH [/toilets/{id}]}
* {PATCH [/toilets/{id}/ratings]
* {PATCH [/single/uploadDb/{id}]}
* {PATCH [/news/{id}]}
* {GET [/users/{username}/authorities]}
* {GET [/users/{username}]}
* {GET [/users]}
* {GET [/toilets/{id}/ratings]}
* {GET [/toilets/{id}/photos]}
* {GET [/toilets/{id}]}
* {GET [/toilets]}
* {GET [/ratings/{id}]}
* {GET [/ratings]}
* {GET [/photos/{id}]}
* {GET [/photos]}
* {GET [/news/{id}]}
* {GET [/news]}
* {GET [/downloadFromDB/{fileName}]}
* {GET [/download/{fileName}]}
* {GET [/alluploads]}
* {DELETE [/users/{username}/authorities/{authority}]}
* {DELETE [/users/{username}]}
* {DELETE [/toilets/{id}]}
* {DELETE [/news/{id}]}
* { [/error]}
* { [/error], produces [text/html]}


#### Een Postman export staat in deze back-end directory ook in de 'documentation' map: deze kun je importeren in Postman en daarin uitvoeren.

