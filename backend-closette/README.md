## Back-End Datasource settings in application.properties

#### Belangrijk: verander eerst deze lokale instellingen!

De database settings, in (bijvoorbeeld) pgAdmin:
* postgresql database op //localhost:5432
* databasenaam: closette
* user/owner: springboot
* password: springboot

Maak dus eerst een user aan met naam/wachtwoord springboot. En daarna een lege database met de naam closette, gekoppeld aan deze user.

#### Standaard users

* admin - password
* user - password

### Endpoints

#### toilets
* GET /api/v1/toilets
* POST /api/v1/toilets
* DELETE /api/v1/toilets/{id}
* GET /api/v1/toilets/{id}
* GET /api/v1/toilets/{id}/copies
* PATCH /api/v1/toilets/{id}/copies
* PATCH /api/v1/toilets/{id}/description

#### users
* GET /api/v1/users
* POST /api/v1/users
* DELETE /api/v1/users/{username}
* GET /api/v1/users/{username}
* PUT /api/v1/users/{username}
* GET /api/v1/users/{username}/authorities
* POST /api/v1/users/{username}/authorities
* DELETE /api/v1/users/{username}/authorities/{authority}
* PATCH /api/v1/users/{username}/password

#### Een Postman export staat hier ook in de 'documentation' map: deze kun je importeren in Postman en daarin uitvoeren.

