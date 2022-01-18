## Back-End Datasource settings in application.properties

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

### Endpoints

#### toilets
* {GET [/toilets]}
* {GET [/toilets/{id}]}
* {PATCH [/toilets/{id}]}
* {POST [/toilets]}
* {PUT [/toilets/{id}]}
* {POST [/users/{username}/authorities]}
* {DELETE [/toilets/{id}]}


#### users
* {POST [/authenticate]}
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

* {POST [/multiple/upload]}
* {POST [/single/uploadDb]}
* {GET [/zipDownload/db]}
* {GET [/zipDownload]}
* {GET [/download/{fileName}]}
* {GET [/downloadFromDB/{fileName}]}
* {POST [/multiple/upload/db]}

#### overige

{ [/error]}

{ [/error], produces [text/html]}


#### Een Postman export staat hier ook in de 'documentation' map: deze kun je importeren in Postman en daarin uitvoeren.

