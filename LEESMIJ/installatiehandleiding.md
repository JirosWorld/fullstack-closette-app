# Closette App installatiehandleiding Markdown versie

door Jiro Ghianni

## ~ Tekst-only versie

### Deze installatiehandleiding bestaat ook als mooiere PDF

Zie de PDF in deze zelfde LEESMIJ directory:

[installatiehandleiding-closette.pdf](installatiehandleiding-closette.pdf)

Dit tekstdocument is als basis gebruikt voor de PDF.

## Inhoud




INSTALLATIEHANDLEIDING
‘CLOSETTE’


_4 februari 2022
door Jiro Ghianni_



    1 Lijst van benodigdheden back-end    .     .     .     .     
    2 Stappenplan back-end     .     .      .     .     .     .    
    3 Lijst van alle rest endpoints     .     .      .     .     .
    4 Lijst van benodigdheden front-end     .     .     .     .   
    5 Stappenplan front-end     .     .      .     .     .     .    
    6 Aandachtspunten front-end     .     .      .     .     .     . 



Introductie

Deze app maakt een database aan van genderneutrale toilet-locaties. Een admin kan nieuwe users toevoegen en locaties en ratings verwijderen. Niet-ingelogde bezoekers kunnen de toiletten-database doorzoeken. Ingelogde gebruikers kunnen foto's uploaden en nieuwe toiletten toevoegen, nieuw geplaatste locaties verwijderen, en hun eigen wachtwoord veranderen.

⚠️ Let op: wanneer je dit project in 1 keer binnen een zogenaamde ‘IDE’ importeert van Github, dan moet je er rekening mee houden dat de start scripts in de sub directories staan, dus 1 map lager dan de ROOT! Dit heeft invloed op het opstarten van de front-end. Het is daarom eenvoudiger om dit project te DOWNLOADEN als ZIP, deze uit te pakken, en daarna de individuele mappen als ‘root’ te openen in een IDE naar keuze.
De app kan worden gedownload via https://github.com/JirosWorld/fullstack-closette-app

Complete installatie kort samengevat

    1 Download de gehele ZIP van Github (dus: niet uitchecken als versioncontrolled project) en pak deze uit op je lokale machine.
    2 Open de backend-closette map in een Java-ready IDE of console.
    3 Verander de database gegevens zoals hieronder aangegeven.
    4 Verander het upload pad naar de Public/uploads map in de front-end directory én vul de database met uploads via Postman.
    5 Run eventueel Maven vanuit de backend map, en start de Java applicatie ‘ClosetteApp’ in de SRC/main map.
    6 Open de frontend-closette map in een React-ready IDE of console.
    7 Run $ npm install en $ npm start vanuit de front-end folder zelf.
    8 Bekijk de front-end in een browser.
    9 zie voor verdere uitleg hieronder.


Back-end Applicatie starten ~ uitgebreid

    1 Lijst van benodigdheden Back-End
    2 Stappenplan back-end
    3 Lijst van alle rest endpoints



## 1. Lijst van benodigdheden Back-End

Voor de installatie is een werkende internet verbinding vereist.
Wanneer we een brief of essay schrijven doen we dit meestal in de editor Microsoft Word. Wanneer we programmeren, gebruiken we ook editors om onze code te schrijven. Code editors noemen we IDE's: een Integrated Development Environment.

Voor de Closette back-end is een IDE nodig die Java code kan uitvoeren en om kan gaan met Spring Boot en Maven en een Tomcat server op kan starten, bij voorkeur IntelliJ Idea. Er moet tevens een PostgreSQL database omgeving zijn, waarmee database tabellen kunnen worden gemaakt, die eventueel beheerd kunnen worden via een ‘visueel’ programma zoals PgAdmin. Tevens is er voor het uploaden van de vooraf-in-te-laden foto’s het programma Postman nodig.

Het is essentieel dat de machine, waarop de Closette app draait, Java als taal aankan. Dit wordt mogelijk wanneer je een zogenaamde JDK installeert. Dit kan o.a. door op de Mac het ‘console’ programma ‘Terminal’ te gebruiken, dat zich in de Applications/Utilities map bevindt. In deze Terminal kun je commando’s typen zoals bijvoorbeeld:

$ /usr/libexec/java_home -V

Hiermee kun je alvast bekijken welke Java versie je hebt.
Eenvoudiger: Via het nog te installeren programma IntelliJ kun je nieuwere versies van Java downloaden.


Alle onderstaande, benodigde programma’s kunnen op een Mac in de Applicatie map worden  geïnstalleerd, en zullen meteen ‘out of the box’ werken. Installeer deze eerst:

Download links (gratis)
• PostgreSQL https://www.postgresql.org
• pgAdmin https://www.pgadmin.org
• IntelliJ https://www.jetbrains.com/idea/
• Postman https://www.postman.com/downloads/

Wanneer je al deze applicaties hebt geïnstalleerd, kun je IntelliJ openen, en via
->> ‘File’ >> new >> Project – een nieuw project maken.
Kijk bovenin het pop-up scherm dat verschijnt wanneer je een nieuw project probeert aan te maken: daar staat een drop-down menu met de tekst “….JDK…” of misschien met een nummer zoals “...14…” of “...17...” of misschien staat er helemaal niets.
Klik in ieder geval op het dropdown menu en kies de optie “Download JDK” en kies voor versie 17 – van OpenJDK.
Het maakt niet uit welke ‘open’ versie je kiest. Deze zijn allemaal opensource en dus gratis te gebruiken. Wanneer je alles geïnstalleerd hebt, en dit nieuwe project afgesloten hebt, ben je klaar voor de installatie van de Closette app zelf.




## 2. Stappenplan back-end

Back-end aanpassingen database
1. Open PgAdmin en maak een nieuwe database user aan.

Belangrijk: verander  deze lokale instellingen!
De database settings, in (bijvoorbeeld) pgAdmin:
* postgresql database op localhost: 5432 (port 5432)
* databasenaam: closette
* user/owner: springboot
* password: springboot

Maak dus eerst een user aan met naam/wachtwoord springboot.
En daarna een lege database met de naam closette, gekoppeld aan deze user.

   ###  Standaard users voor het gebruik van de app zelf

(dit zijn de users die kunnen inloggen en nieuwe toiletten kunnen toevoegen etc.)
• admin - password
• user - password
• tester - password


Back-end pad voor uploads
Belangrijk: Pas in de main/resources/application.properties het Upload-pad voor afbeeldingen aan: voor Mac gebruikers zal dit vlekkeloos verlopen omdat daar nooit Backslashes gebruikt worden, maar Windowsgebruikers moeten opletten dat er wellicht een Backslash in hun code nodig is daar waar nu een Slash staat. Het lokale pad hier dienen alle gebruikers in ieder geval aan te passen vanaf het ‘Users’ path naar de locatie van de front-end public/uploads directory op jouw eigen machine:
app.uploads= /Users/jolarti/webdevelopment/closette/frontend-closette/public/uploads
Let op: dit lokale pad MOET verwijzen naar de  uploads  directory die in de public Directory staat van de Frontend-closette map:

### upload pad directory

Het mag dus niet een willekeurige map zijn, maar moet specifiek naar deze map verwijzen. Dit in verband met een aantal ‘prefilled’ images = vooraf gevulde afbeeldingen die in die upload staan en door de database worden ingelezen waardoor de app er representatief uitziet.
Deze app is gebouwd op een Mac, dus het is mogelijk dat Windows/Linux gebruikers in de code nog 1 extra aanpassing moeten doen; zie het commentaar in het bestand in de backend-closette directory in regel 61 in het bestand in /main … /service/FileStorageService
Windows users moeten hier mogelijk een BACKSLASH invoeren in plaats van de SLASH die daar staat, resultaat:
Path filePath = Paths.get(fileStoragePath + "\\" + fileName);

### De vooraf ingeladen foto’s

De database heeft 15 foto’s die vooraf ingeladen moeten worden, omdat deze gekoppeld zijn aan de id’s van de toilet- entries. Helaas is het niet voldoende om alléén de data.sql in te laden, omdat de foto’s zijn omgezet naar een zogenaamde ‘byte array’ die voor elke lokale machine een uniek cijfer geeft. Dit unieke lokale gedrag schijnt iets met de data access object (DAO) te maken te hebben.

Gelukkig is er een oplossing: via Postman – of zelfs via de front-end – kunnen de foto’s die reeds in de Uploads map staan, allemaal opnieuw naar jouw lokale database geüpload worden, zodat deze lokaal op jouw eigen machine een nieuw uniek cijfer krijgen. Dit cijfer heet ‘doc_file’ en dient veranderd te worden in het data.sql bestand dat in de Resources map staat, op deze manier:

Open in Postman het request dat een POST doet naar het pad
http://localhost:8080/single/uploadDb
en upload daar 1-voor-1 alle images uit de Public/Uploads directory die in de frontend-closette map staan:




Bekijk daarna welke cijfers er nu zijn meegegeven in jouw eigen  PostGreSQL database:



Nu kun je het data.sql bestand aanpassen en bewaren, vóórdat je de server start (of herstart):





### JAVA versie

Zoals eerder genoemd: dit project werkt alleen wanneer je JDK versie 17 of hoger hebt geïnstalleerd op je computer. Wanneer je deze niet hebt, kun je deze downloaden via https://jdk.java.net
Installatie en opstarten back-end
Als je het project gedownload hebt naar jouw locale machine, en de aanpassingen hierboven hebt gedaan, installeer je eerst de back-end. Liefst via een Java-ready/Maven-ready IDE zoals IntelliJ maar het kan ook door de backend-closette folder te openen in elke terminal van jouw keuze.
Je IDE kan als notificatie de vraag stellen of Maven dit project mag vertrouwen, zeg dan ‘yes’ op de trust vraag. En accepteer JPA buddy en de andere plugins wanneer daar akkoord op wordt gevraagd. Indien IntelliJ vraagt om een DataSource of SQL dialect te kiezen, doe dit dan NIET, laat het zoals het is. En klik OK op de JPA Buddy default configuratie.
In de meeste gevallen volstaat het om de backend-closette map te openen in een IDE, die Java kan complieren, en het pom-bestand van Maven te laten installeren, waarna de Main klasse ClosetteApp gedraaid (run) kan worden. (Het back-end startscript staat in bckend-closette/pom.xml). Maar installatie en runnen vanuit de backend-closette directory kan ook in 1 keer via een terminal naar keuze met het commando:
$ mvn spring-boot:run.
In de terminal kan de back-end app gestopt worden met de toetscombinatie ctrl + 'C'.
Bij back-end problemen: * install pom.xml * of type ./mvnw verify (mac/linux) of mvnw.cmd verify (windows) uit in de terminal van de project directory/folder.
Laatste stap voor de back-end:
Start de Main klasse ClosetteApp op (= run).
3. Lijst van alle rest endpoints
Onderstaande endpoints heb ik tevens gepubliceerd op deze documentatie site (inclusief beschrijvingen) die het veel geakkelijker maakt om al deze endpoints te kopiëren en zelf te gebruiken: https://documenter.getpostman.com/view/17991980/UVeCR95T - en in de ‘LEESMIJ’ map staat een makkelijk te importeren verzameling van alle Postman requests (met JSON).
Hieronder volgt de volledige lijst met endpoints vanaf  http://localhost:8080
– alléén wanneer een endpoint JSON bevat, dan staat dit er bij, als het geen JSON bevat dan staat er niets naast.
Ook wanneer het punt openbaar is, staat dit (meestal) niet vermeld.




`AUTHORIZATION
Bearer Token
Token
<token>
POSTauthorisatie
http://localhost:8080/authenticate
Haal nieuwe JWT token op.`

`BODYraw
{ "username": "admin", "password": "password" }`


`Example Request
authorisatie
curl --location --request POST 'http://localhost:8080/authenticate' \
--data-raw '{ "username": "admin", "password": "password" }'
POSTPOST een nieuwe user
http://localhost:8080/users/register
Haal de data op over 1 entry, met id = 2.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"username": "gebruikerette",
"password": "12345",
"email": "mail@mail.com"
}`


`Example Request
POST een nieuwe user
curl --location --request POST 'http://localhost:8080/users/register' \
--data-raw '{
"username": "gebruikerette",
"password": "12345",
"email": "mail@mail.com"
}'
POSTPOST een authority naar user
http://localhost:8080/users/authorities
Haal de data op over 1 entry, met id = 2.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"authority": "ROLE_ADMIN"
}`


`Example Request
POST een authority naar user
curl --location --request POST 'http://localhost:8080/users/authorities' \
--data-raw '{
"authority": "ROLE_ADMIN"
}'
POSTPOST nóg een nieuwe user
http://localhost:8080/users/register
Registreer 1 nieuwe gebruiker.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"username": "priscilla",
"password": "queenofthedesert",
"email": "emaille@maille.com"
}`


`Example Request
POST nóg een nieuwe user
curl --location --request POST 'http://localhost:8080/users/register' \
--data-raw '{
"username": "priscilla",
"password": "queenofthedesert",
"email": "emaille@maille.com"
}'
POSTPOST 1 relation toilet/photo Copy
http://localhost:8080/toilets/7/photos
Upload 1 foto behorend bij toilet met id = 7.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"id": 333,
"fileName": "img-RELATION.jpg",
"docFile": null
}`


`Example Request
POST 1 relation toilet/photo Copy
curl --location --request POST 'http://localhost:8080/toilets/7/photos' \
--data-raw '{
"id": 333,
"fileName": "img-RELATION.jpg",
"docFile": null
}'
POSTPOST add 1 toilet
http://localhost:8080/toilets
Post/voeg 1 nieuwe entry toe, in de body staat al ingevuld wat er in de database gaat komen.`

AUTHORIZATION
`Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
View More
{
"title": "Toilet venue locatie naam Addis",
"address": "Locatie voor testen",
"latitude": "11.1111",
"longitude": "11.1111",
"cleanliness": "best schoon",
"free": true,
"genderneutral": true,
"opening_hours": "8h - 20h",
"info_text": "random random random random random random random random",
"city": "Addis",`


Example Request
`POST add 1 toilet
View More
curl --location --request POST 'http://localhost:8080/toilets' \
--data-raw '{
"title": "Toilet venue locatie naam Addis",
"address": "Locatie voor testen",
"latitude": "11.1111",
"longitude": "11.1111",
"cleanliness": "best schoon",
"free": true,
"genderneutral": true,
"opening_hours": "8h - 20h",
"info_text": "random random random random random random random random",
POSTPOST add nog 1 toilet
http://localhost:8080/toilets
Voeg nog een nieuw toilet toe, met andere naam en unieke GPS locatie.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
View More
{
"title": "Toiletje gebouw locatie naam",
"address": "test adres 1234",
"latitude": "48.8566",
"longitude": "2.3522",
"cleanliness": "schoon",
"openingHours": "8-20",
"infoText": "Hebban olla vogala nestas hagunnan, hinase hic enda tu.",
"city": "Parijs",
"country": "FR Frankrijk",
"genderneutral": true,`


`Example Request
POST add nog 1 toilet
View More
curl --location --request POST 'http://localhost:8080/toilets' \
--data-raw '{
"title": "Toiletje gebouw locatie naam",
"address": "test adres 1234",
"latitude": "48.8566",
"longitude": "2.3522",
"cleanliness": "schoon",
"openingHours": "8-20",
"infoText": "Hebban olla vogala nestas hagunnan, hinase hic enda tu.",
"city": "Parijs",
"country": "FR Frankrijk",
POSTPOST add 1 newspost
http://localhost:8080/news
Post/voeg 1 nieuwe entry toe, in de body staat al ingevuld wat er in de database gaat komen.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title": "Nieuwe nieuwe nieuw nieuws nieuws",
"description": "Beschrijving samenvatting intro beschrjvingstekst Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores dolodis, quaerat qatem!",
"username": "admin",
"paragraph": "Hebban olla vogala nestas hagunnan, hinase hic enda tu. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati qui temporibus. Error explicabo harum labore mollitia neque provident quod sapiente sunt temporibus totam! Accusamus accusantium alias aspernatur, cupiditate deleniti deserunt distinctio dolorem est expedita fugit itaque magnam natus nemo nihil nobis non nulla, odio officia officiis, perferendis porro provident quaerat quas ratione recusandae sed tempore temporibus veritatis voluptate voluptatem! Aliquid animi asperiores aspernatur atque autem consequatur corporis cum dolore dolores ducimus earum harum illo incidunt ipsa ipsam magni maxime minus molestiae nemo neque nisi nulla, odit officiis optio perspiciatis possimus provident quam qui recusandae rem repellendus sequi sint soluta temporibus velit veniam vero. Architecto aspernatur doloremque dolorum, eum itaque magni, maxime minus nemo quia quidem reiciendis soluta? Alias aliquid commodi consequatur culpa cum debitis delectus deserunt dicta dolor earum error est eveniet ex fugit in ipsam itaque magnam magni molestias nam natus nihil officiis perferendis, quis quo quos reiciendis sed similique soluta veniam veritatis vitae voluptas voluptatem! Aut ducimus, enim rerum sapiente similique temporibus! Aliquid architecto aspernatur consectetur consequuntur culpa cupiditate deleniti dicta dignissimos earum enim esse eum harum id libero maiores maxime minus molestias mollitia nesciunt nostrum odit porro quae quaerat quam quasi quidem quisquam quos rem repellendus sint suscipit, tempore vel voluptatem. Animi autem consectetur deleniti, distinctio dolores ducimus, error facilis fuga harum id iure laudantium maxime molestiae molestias natus necessitatibus non omnis perferendis, quaerat quisquam quo reiciendis repellat reprehenderit sed tenetur ullam vel. Beatae ipsum iste itaque optio voluptatem!"
}`


`Example Request
POST add 1 newspost
curl --location --request POST 'http://localhost:8080/news' \
--data-raw '{
"title": "Nieuwe nieuwe nieuw nieuws nieuws",
"description": "Beschrijving samenvatting intro beschrjvingstekst Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores dolodis, quaerat qatem!",
"username": "admin",
"paragraph": "Hebban olla vogala nestas hagunnan, hinase hic enda tu. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium blanditiis, dolore, dolores doloribus dolorum, earum esse ex iure molestias necessitatibus obcaecati qui temporibus. Error explicabo harum labore mollitia neque provident quod sapiente sunt temporibus totam! Accusamus accusantium alias aspernatur, cupiditate deleniti deserunt distinctio dolorem est expedita fugit itaque magnam natus nemo nihil nobis non nulla, odio officia officiis, perferendis porro provident quaerat quas ratione recusandae sed tempore temporibus veritatis voluptate voluptatem! Aliquid animi asperiores aspernatur atque autem consequatur corporis cum dolore dolores ducimus earum harum illo incidunt ipsa ipsam magni maxime minus molestiae nemo neque nisi nulla, odit officiis optio perspiciatis possimus provident quam qui recusandae rem repellendus sequi sint soluta temporibus velit veniam vero. Architecto aspernatur doloremque dolorum, eum itaque magni, maxime minus nemo quia quidem reiciendis soluta? Alias aliquid commodi consequatur culpa cum debitis delectus deserunt dicta dolor earum error est eveniet ex fugit in ipsam itaque magnam magni molestias nam natus nihil officiis perferendis, quis quo quos reiciendis sed similique soluta veniam veritatis vitae voluptas voluptatem! Aut ducimus, enim rerum sapiente similique temporibus! Aliquid architecto aspernatur consectetur consequuntur culpa cupiditate deleniti dicta dignissimos earum enim esse eum harum id libero maiores maxime minus molestias mollitia nesciunt nostrum odit porro quae quaerat quam quasi quidem quisquam quos rem repellendus sint suscipit, tempore vel voluptatem. Animi autem consectetur deleniti, distinctio dolores ducimus, error facilis fuga harum id iure laudantium maxime molestiae molestias natus necessitatibus non omnis perferendis, quaerat quisquam quo reiciendis repellat reprehenderit sed tenetur ullam vel. Beatae ipsum iste itaque optio voluptatem!"
}'`

`POSTPOST /ratings/{id}/toilets
http://localhost:8080/toilets/1/ratings
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 5,
"toilet": {
"id": 1
},
"user": {
"username": "tester"
}
}`


`Example Request
POST /ratings/{id}/toilets
View More
curl --location --request POST 'http://localhost:8080/toilets/1/ratings' \
--data-raw '{
"rating": 5,
"toilet": {
"id": 1
},
"user": {
"username": "tester"
}
}'
POSTPOST /ratings/{id}/toilets again
http://localhost:8080/toilets/1/ratings
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 5,
"toilet": {
"id": 1
},
"user": {
"username": "admin"
}
}`


`Example Request
POST /ratings/{id}/toilets again
View More
curl --location --request POST 'http://localhost:8080/toilets/1/ratings' \
--data-raw '{
"rating": 5,
"toilet": {
"id": 1
},
"user": {
"username": "admin"
}
}'
POSTPOST /ratings/{id}/toilets without a user
http://localhost:8080/toilets/1/ratings
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 10,
"toilet": {
"id": 1
}
}`


`Example Request
POST /ratings/{id}/toilets without a user
curl --location --request POST 'http://localhost:8080/toilets/1/ratings' \
--data-raw '{
"rating": 10,
"toilet": {
"id": 1
}
}'
POSTpost 1 new Rating
http://localhost:8080/ratings/
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 10
}`


`Example Request
post 1 new Rating
curl --location --request POST 'http://localhost:8080/ratings/' \
--data-raw '{
"rating": 10
}'
POSTPOST new rating for 1 toilet
http://localhost:8080/toilets/1/ratings
Haal alle ratings op die door user met id=1 zijn gegeven.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
rating: 4
}`


`Example Request
POST new rating for 1 toilet
curl --location --request POST 'http://localhost:8080/toilets/1/ratings' \
--data-raw '{
rating: 4
}'
POSTPost 1 Rating
http://localhost:8080/ratings/
Toon welke rating is en door wie ze geplaatst is.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 10
}`


`Example Request
Post 1 Rating
curl --location --request POST 'http://localhost:8080/ratings/' \
--data-raw '{
"rating": 10
}'
POSTPost nóg 1 Rating
http://localhost:8080/ratings/
Vervang welke rating is en door wie ze geplaatst is.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 8.0
}`


`Example Request
Post nóg 1 Rating
curl --location --request POST 'http://localhost:8080/ratings/' \
--data-raw '{
"rating": 8.0
}'
POSTPhoto upload-single Database
http://localhost:8080/single/uploadDb
Upload 1 foto naar naar de database, waardoor de foto een ID krijgt.`

Foto: 

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYformdata
file`


`Example Request
Photo upload-single Database
curl --location --request POST 'http://localhost:8080/single/uploadDb' \
--form 'file=@"/path/to/file"'
POSTPhoto upload-Multiple photos to Database
http://localhost:8080/multiple/upload/db
Upload 1 foto naar naar de database, waardoor de foto een ID krijgt.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYformdata
file`


`Example Request
Photo upload-single Database
curl --location --request POST 'http://localhost:8080/single/uploadDb' \
--form 'file=@"/path/to/file"'
POSTPhoto upload1 NO db
http://localhost:8080/single/upload
Upload 1 foto naar de Uploads directory, zonder database ID.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYformdata
file
`

`Example Request
Photo upload1 NO db
curl --location --request POST 'http://localhost:8080/single/upload' \
--form 'file=@"/path/to/file"'
PATCHPATCH 1 user's password
http://localhost:8080/users/admin/password
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"password":"newpasswordy123"
}`


`Example Request
PATCH 1 user's password
curl --location --request PATCH 'http://localhost:8080/users/admin/password' \
--data-raw '{
"password":"newpasswordy123"
}'
PATCHPATCH a wrong password
http://localhost:8080/users/admin/password
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"password":"PASS"
}`


`Example Request
PATCH a wrong password
curl --location --request PATCH 'http://localhost:8080/users/admin/password' \
--data-raw '{
"password":"PASS"
}'
PATCHPATCH 1 deeltje toilet
http://localhost:8080/toilets/1
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"genderneutral": false
}`


`Example Request
PATCH 1 deeltje toilet
curl --location --request PATCH 'http://localhost:8080/toilets/1' \
--data-raw '{
"genderneutral": false
}'
PATCHPATCH 1 deeltje toilet via DTO
http://localhost:8080/toiletsdto/7
Vervang/bewerk een klein deel van een entry via tussenkomst van de DTO.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"longitude": "2.222222"
}`


`Example Request
PATCH 1 deeltje toilet via DTO
curl --location --request PATCH 'http://localhost:8080/toiletsdto/7' \
--data-raw '{
"longitude": "2.222222"
}'
PATCHPATCH 1 deel toilet id=10
http://localhost:8080/toilets/10
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
View More
{
"title": "Patch Put verander Patch",
"address": "Patch patch 123",
"latitude": "48.8500",
"longitude": "2.3511",
"cleanliness": "schoon en gepatched",
"openingHours": "8:00 - 20:00",
"infoText": "Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch.",
"city": "Patch city",
"country": "Patched Countryside",
"genderneutral": true,`


`Example Request
PATCH 1 deel toilet id=10
View More
curl --location --request PATCH 'http://localhost:8080/toilets/10' \
--data-raw '{
"title": "Patch Put verander Patch",
"address": "Patch patch 123",
"latitude": "48.8500",
"longitude": "2.3511",
"cleanliness": "schoon en gepatched",
"openingHours": "8:00 - 20:00",
"infoText": "Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch.",
"city": "Patch city",
"country": "Patched Countryside",
PATCHPATCH 1 deel toilet via DTO id=9 Copy
http://localhost:8080/toiletsdto/9
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
View More
{
"title": "Patch Put verander Patch",
"address": "Patch patch 123",
"latitude": "48.8500",
"longitude": "2.3511",
"cleanliness": "schoon en gepatched",
"openingHours": "8:00 - 20:00",
"infoText": "Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch.",
"city": "Patch city",
"country": "Patched Countryside",
"genderneutral": true,
`

`Example Request
PATCH 1 deel toilet via DTO id=9 Copy
View More
curl --location --request PATCH 'http://localhost:8080/toiletsdto/9' \
--data-raw '{
"title": "Patch Put verander Patch",
"address": "Patch patch 123",
"latitude": "48.8500",
"longitude": "2.3511",
"cleanliness": "schoon en gepatched",
"openingHours": "8:00 - 20:00",
"infoText": "Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch. Hebban olla vogala nestas hagunnan, hinase hic enda tu. Patch tekst. Put. Patch.",
"city": "Patch city",
"country": "Patched Countryside",
PATCHPATCH 1 deeltje titel toilet
http://localhost:8080/toilets/1
Vervang/bewerk een klein deel van een entry via tussenkomst van de DTO.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title": "Deel Patch Put verander Patch"
}`


`Example Request
PATCH 1 deeltje titel toilet
curl --location --request PATCH 'http://localhost:8080/toilets/1' \
--data-raw '{
"title": "Deel Patch Put verander Patch"
}'
PATCHtest PATCH 1 foreignkey toilet
http://localhost:8080/toilets/1
Vervang/bewerk een klein deel van een entry relatie.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
View More
{"ratings": [
{
"id": 7,
"ratingToilet": 1
},
{
"id": 22,
"ratingToilet": 1
},
{
"id": 30,`


`Example Request
test PATCH 1 foreignkey toilet
View More
curl --location --request PATCH 'http://localhost:8080/toilets/1' \
--data-raw '{"ratings": [
{
"id": 7,
"ratingToilet": 1
},
{
"id": 22,
"ratingToilet": 1
},
{
PATCHPATCH /ratings/{id}/toilets added
http://localhost:8080/toilets/1/ratings
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"rating": 10,
"toilet": {
"id": 1
},
"user": {
"username": "admin"
}
}`


`Example Request
PATCH /ratings/{id}/toilets added
View More
curl --location --request PATCH 'http://localhost:8080/toilets/1/ratings' \
--data-raw '{
"rating": 10,
"toilet": {
"id": 1
},
"user": {
"username": "admin"
}
}'
PATCHPhoto upload-single PATCH db
http://localhost:8080/single/uploadDb/200
AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYformdata
file
beschrijving`



`Example Request
Photo upload-single PATCH db
curl --location --request PATCH 'http://localhost:8080/single/uploadDb/200' \
--form 'file=@"/Users/jolarti/Pictures/fractile_dk.jpg"'
PATCHPATCH 1 deel nieuwsartikel
http://localhost:8080/news/1
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title":"Titeltje"
}`


`Example Request
PATCH 1 deel nieuwsartikel
curl --location --request PATCH 'http://localhost:8080/news/1' \
--data-raw '{
"title":"Titeltje"
}'
PATCHPATCH 1 deel nieuwsartikel 2
http://localhost:8080/news/1
Vervang/bewerk een klein deel van een entry.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title":"Titeltje",
"description":"Vervang door deze nieuwe tekst",
"paragraph":"Bijwerken met deze nieuwe tekst vervang door deze nieuwe tekst vervang door deze nieuwe tekst"
}`


`Example Request
PATCH 1 deel nieuwsartikel 2
curl --location --request PATCH 'http://localhost:8080/news/1' \
--data-raw '{
"title":"Titeltje",
"description":"Vervang door deze nieuwe tekst",
"paragraph":"Bijwerken met deze nieuwe tekst vervang door deze nieuwe tekst vervang door deze nieuwe tekst"
}'
PUTPUT bestaande user
http://localhost:8080/users/tester
Haal de data op over 1 entry, met id = 2.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"username": "gebruikerette",
"password": "12345",
"email": "mail@mail.com"
}`


`Example Request
PUT bestaande user
curl --location --request PUT 'http://localhost:8080/users/tester' \
--data-raw '{
"username": "gebruikerette",
"password": "12345",
"email": "mail@mail.com"
}'
PUTPUT 1 deel nieuwsartikel
http://localhost:8080/news/1
Vervang/bewerk een klein deel van een entry.

AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title":"Titeltje"
}
`

`Example Request
PUT 1 deel nieuwsartikel
curl --location --request PUT 'http://localhost:8080/news/1' \
--data-raw '{
"title":"Titeltje"
}'
PUTPUT 1 deel nieuwsartikel 2
http://localhost:8080/news/1
Vervang de inhoud van het gehele nieuwsbericht.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title":"Titeltje",
"description":"Vervang door deze nieuwe tekst",
"paragraph":"Bijwerken met deze nieuwe tekst vervang door deze nieuwe tekst vervang door deze nieuwe tekst"
}`


`Example Request
PUT 1 deel nieuwsartikel 2
curl --location --request PUT 'http://localhost:8080/news/1' \
--data-raw '{
"title":"Titeltje",
"description":"Vervang door deze nieuwe tekst",
"paragraph":"Bijwerken met deze nieuwe tekst vervang door deze nieuwe tekst vervang door deze nieuwe tekst"
}'
PUTPUT 1 new toilet
http://localhost:8080/toilets/2
Vervang 1 entry in zijn/haar/hun geheel.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
BODYraw
{
"title": "Saaie locatie",
"latitude": "212121211321"
}`


`Example Request
PUT 1 new toilet
curl --location --request PUT 'http://localhost:8080/toilets/2' \
--data-raw ' {
"title": "Saaie locatie",
"latitude": "212121211321"
}'
GETGET all users
http://localhost:8080/users
Haal alle users op.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET all users
curl --location --request GET 'http://localhost:8080/users'
GETGET 1 user
http://localhost:8080/users/tester
Haal de data op over 1 entry, met id = 2.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 user
curl --location --request GET 'http://localhost:8080/users/tester'
GETGET 1 user's authority
http://localhost:8080/users/admin/authorities
Haal de data op over user met id = admin.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 user's authority
curl --location --request GET 'http://localhost:8080/users/admin/authorities'
GETGET ALL Toilets ** Zoeken **
http://localhost:8080/toilets
Haal in een keer de totale Toiletten database binnen.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET ALL Toilets ** Zoeken **
curl --location --request GET 'http://localhost:8080/toilets'
GETGET 1 toilet
http://localhost:8080/toilets/7
Haal de data op over 1 toilet entry, met id = 7.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 toilet
curl --location --request GET 'http://localhost:8080/toilets/7'
GETGET 1 relation toilet/photo
http://localhost:8080/toilets/7/photos
Haal de data op over 1 entry, met id = 2.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 relation toilet/photo
curl --location --request GET 'http://localhost:8080/toilets/7/photos'
GETQuerie zoeker op Titel/Venue
http://localhost:8080/toilets?title=palace
Zoek op naam.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
PARAMS
title
palace`


`Example Request
Querie zoeker op Titel/Venue
curl --location --request GET 'http://localhost:8080/toilets?title=palace'
GETQuerie zoeker op City
http://localhost:8080/toilets?city=ber
Zoek op stad.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
PARAMS
city
ber`


`Example Request
Querie zoeker op City met in ded titel "ber..."
curl --location --request GET 'http://localhost:8080/toilets?city=ber'
GETQuerie zoeker op Country
http://localhost:8080/toilets?country=usa
Zoek op land.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
PARAMS
country
usa`


`Example Request
Querie zoeker op Country
curl --location --request GET 'http://localhost:8080/toilets?country=usa'
GETQuerie zoeker op Genderneutral
http://localhost:8080/toilets?genderneutral=true
Zoek op land.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
PARAMS
genderneutral
true`


`Example Request
Querie zoeker op Genderneutral
curl --location --request GET 'http://localhost:8080/toilets?genderneutral=true'
GETQuerie (defunct) op Titel&City?
http://localhost:8080/toilets?title=pal&city=lon
AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests
PARAMS
title
pal
city
lon`


`Example Request
Querie (defunct) op Titel&City?
curl --location --request GET 'http://localhost:8080/toilets?title=pal&city=lon'
GETGET all Ratings
http://localhost:8080/ratings
Laat zien welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET all Ratings
curl --location --request GET 'http://localhost:8080/ratings'
GETGET 1 Rating with index 4
http://localhost:8080/ratings/3/
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 Rating with index 4
curl --location --request GET 'http://localhost:8080/ratings/3/'
GETGET /toilets/{id}/ratings nr.1
http://localhost:8080/toilets/1/ratings
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET /toilets/{id}/ratings nr.1
curl --location --request GET 'http://localhost:8080/toilets/1/ratings'
GETGET /toilets/{id}/ratings 11
http://localhost:8080/toilets/11/ratings
Vervang welke rating is er door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET /toilets/{id}/ratings 11
curl --location --request GET 'http://localhost:8080/toilets/11/ratings'
GETGET 1 Rating
http://localhost:8080/ratings/2
Laat zien welke rating is en door wie ze geplaatst zijn.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 Rating
curl --location --request GET 'http://localhost:8080/ratings/2'
GETGET all ratings from 1 toilet
http://localhost:8080/toilets/1/ratings
Haal alle ratings op die door user met id=1 zijn gegeven.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET all ratings from 1 toilet
curl --location --request GET 'http://localhost:8080/toilets/1/ratings'
GETGET all photos
http://localhost:8080/photos
Haal alle foto's op.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET all photos
curl --location --request GET 'http://localhost:8080/photos'
GETGET 1 photo by ID
http://localhost:8080/photos/200
Haal 1 foto op, met id = 200.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 photo by ID
curl --location --request GET 'http://localhost:8080/photos/200'
GETGET all uploads in directory
http://localhost:8080/alluploads
Zoek foto op bestandsnaam.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET all uploads in directory
curl --location --request GET 'http://localhost:8080/alluploads'
GETGET all news posts
http://localhost:8080/news
Haal in een keer alle nieuwsberichten binnen.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET all news posts
curl --location --request GET 'http://localhost:8080/news'
GETGET 1 newspost
http://localhost:8080/news/1
Haal nieuwsbericht op met ID = 1.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
GET 1 newspost
curl --location --request GET 'http://localhost:8080/news/1'
DELDELete 1 user by name
http://localhost:8080/users/user
Verwijder 1 gebruiker met id = user.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
DELete 1 user by name
curl --location --request DELETE 'http://localhost:8080/users/user'
DELDELete 1 toilet
http://localhost:8080/toilets/11
AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
DELete 1 toilet
curl --location --request DELETE 'http://localhost:8080/toilets/11' \
--data-raw ''
DELDELete 1 Rating
http://localhost:8080/ratings/4
Verwijder een specifieke beoordeling.`

`AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
DELete 1 Rating
curl --location --request DELETE 'http://localhost:8080/ratings/4'
DELDELete 1 news post
http://localhost:8080/news/2
AUTHORIZATION
Bearer Token
This request is using Bearer Token from folderClosette requests`


`Example Request
DELete 1 news post
curl --location --request DELETE 'http://localhost:8080/news/2' \
--data-raw ''`


### Server requests

De back-end wordt aangesproken door de front-end, maar als je alleen via Postman requests wil doen, dan kan dat ook: Open http://localhost:8080  voor requests.
De Postman export staat ook nog eens dubbelop in de ‘back-end documentation’ map: deze kun je ook importeren in Postman en daarin gemakkelijk meteen uitvoeren.



  #  Front-end Applicatie starten ~ uitgebreid

    4 Lijst van benodigdheden front-End
    5 Stappenplan front-end
    6 Aandachtspunten front-end


## 4. Lijst van benodigdheden front-end

Voor de installatie is een werkende internet verbinding vereist.
Wanneer we programmeren, gebruiken we speciale editors om onze code te schrijven. Code editors noemen we IDE's: een Integrated Development Environment. Bij deze Closette app raad ik aan te werken met WebStorm. WebStorm is een betaald product, in tegenstelling tot andere bekende gratis IDE's (zoals Visual Studio Code met React plug-ins, Atom of Sublime Text).  Voor de front-end is een IDE nodig die javascript en JSX/React code kan uitvoeren. Ook dient Nodejs en NPM (15.4.0 of hoger) geinstalleerd te zijn.

Download links:
• Webstorm (betaald) https://www.jetbrains.com/webstorm/
• Nodejs https://nodejs.org/en/download/
• (NPM zit al in NodeJs)
• een moderne browser https://www.google.com/chrome/

Al deze applicaties werken direct ‘out of the box’.

## 5. Stappenplan front-end

Als je het project gedownload hebt naar jouw locale machine, en je de back-end hebt opgestart, is het tijd om de front-end te installeren. De front-end zorgt ervoor dat je de Closette App daadwerkelijk kunt gaan gebruiken, in een webbrowser.
Om deze app te kunnen laten ‘afspelen’ heb je de zogenaamde ‘NPM node bestanden’ nodig. Deze dient je zelf te installeren. Je kunt dit doen door je IDE programma (Webstorm) te openen en vandaar uit de  frontend-closette map te openen! Die front-end map wordt dan automatisch de ‘hoogste’ directory die je binnen je IDE programma kunt zien. De allerhoogste stap in een hiërarchie noemen we de ‘root’ = het startpunt. Dit startpunt is essentieel om de front-end te kunnen installeren en te kunnen afspelen.
Dus: installeer nu eerst de node_modules door het volgende commando in de terminal van Webstorm te runnen:
$ npm install

Dit betekent dat je, wanneer je dit project importeert vanuit Github (version control) je het start-script dan niet meteen kunt runnen (het front-end startscript staat namelijk 1 map lager, in frontend-closette/package.json). Wanneer je een IDE als Webstorm wilt gebruiken, open het project dan niet als ‘version-control’ project maar: ga in een browser naar Github, download de repository als ZIP, pak dit uit waar je maar wilt, en open dan alleen de frontend-closette map als ‘root’ in een IDE naar keuze (bijvoorbeeld Webstorm, of Visual Studio met een React plug-in).
Daar kun je wederom je ‘  npm install  ‘ commando tikken en wachten tot de NPM installatie klaar is.
Wanneer dit klaar is, kun je (wederom vanuit de terminal bij de frontend-closette map) de applicatie starten met behulp van:

$ npm start

Als je dit project opent in Webstorm kun je hiervoor ook het NPM START afspeelknopje gebruiken.
Je IDE kan als notificatie de vraag stellen of je browser (bijvoorbeeld Chrome) deze app mag vertrouwen; beantwoordt bevestigend op elke trust vraag. Open http://localhost:3000 om de web-app in een browser te bekijken en te bedienen.

Axios, ESLint, React Router 5.2, React-Hook-Form, JWT-decoder, emailJS etc. zijn reeds gesaved in JSON builder en worden automatisch mee geïnstalleerd.

In de terminal kan de front-end app gestopt worden met ctrl + 'C'.


## 6. Aandachtspunten front-end

Nodejs / npm versie
Dit project werkt alleen wanneer je Nodejs versie Node.js 15.4.0 of hoger hebt geïnstalleerd op je computer. Wanneer je deze niet hebt, kun je deze downloaden via https://nodejs.org/en/download/releases/

### Voorkeur browsers

NB: Gebruik bij voorkeur Chrome, Edge of Opera. Natuurlijk werkt alles ook in Firefox en Safari maar sommige fonts worden daarin niet mooi ‘bold’ gerendered. Ook wordt op sommige afbeeldingen het ‘filter’ CSS attribuut gebruikt, deze werkt momenteel nog niet altijd goed in Edge (en al helemaal niet in Explorer).

_~ Jiro Ghianni
2021 / 2022_