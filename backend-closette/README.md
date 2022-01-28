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

Accepteer installatie van de JPA Buddy plug-in. Verdere installatiehandleidingen staan [in de LEESMIJ map](../LEESMIJ).

#### Standaard users

* admin - password
* user - password
* tester - password

### Endpoints

#### toilets
* {GET [/toilets]}
* {GET [/toilets/{id}]}
* {PATCH [/toilets/{id}]}
* {PATCH [/toiletsdto/{id}]}
* {POST [/toilets]}
* {PUT [/toilets/{id}]}
* {POST [/users/{username}/authorities]}
* {DELETE [/toilets/{id}]}


#### users
* {POST [/authenticate]}
* {POST [/users/register]}
* {DELETE [/users/{username}/authorities/{authority}]}
* {GET [/users/{username}/authorities]}
* {GET [/users/{username}]}
* {GET [/users/id/{id}]}
* {PATCH [/users/{username}/password]}
* {GET [/users]}
* {PUT [/users/{username}]}
* {DELETE [/users/{username}]}


#### ratings (sterrenwaarderingen)

* {GET [/ratings]}
* {POST [/ratings]}
* {POST [/ratings/{id}/toilets]}
* {GET [/ratings/{id}/toilets]}
* {DELETE [/ratings/{id}]} 
* {GET [/ratings/{id}]}


#### newsposts (blog)

* {POST [/news]}
* {PATCH [/news/{id}]}
* {GET [/news]}
* {GET [/news/{id}]}
* {PUT [/news/{id}]}
* {DELETE [/news/{id}]}

#### photo

* {GET [/photos]}
* {GET [/photos/{id}]}
* {POST [/multiple/upload]}
* {POST [/single/uploadDb]}
* {PATCH [/single/uploadDb/{id}]}
* {GET [/zipDownload/db]}
* {GET [/zipDownload]}
* {GET [/download/{fileName}]}
* {GET [/downloadFromDB/{fileName}]}
* {POST [/multiple/upload/db]}

#### overige

{ [/error]}

{ [/error], produces [text/html]}


#### Een Postman export staat hier ook in de 'documentation' map: deze kun je importeren in Postman en daarin uitvoeren.

