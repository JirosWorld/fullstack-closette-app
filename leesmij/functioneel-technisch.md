# Closette App: Functioneel- en Technisch ontwerp

_Markdown text-only versie_

Deze 'text only' versie is alleen bedoeld om in een browser op Github makkelijk snel te kunnen lezen hoe het ontwerp inelkaar steekt. Het échte ontwerp document staat hier: [PDF ontwerp document met afbeeldingen](functioneel-technisch.md)

door Jiro Ghianni

## Text Only inhoud

### = Zonder afbeeldingen =



FUNCTIONEEL EN TECHNISCH ONTWERP ‘CLOSETTE’





INHOUD


    1. Inleiding .   .   .   .   .   .   .   .   .  
    2. Probleembeschrijving .   .   .   .   .   .  
    3. Functionele- en niet-functionele eisen .   .  
    4. Inspiratiebronnen: visuele voorbeelden .   .   
    5. Use case tabellen: de gebruikershandelingen .   .
    6. Wireframes .   .   .   .   .   .   .   .   .   . 
    8. Sequentie diagrammen  .   .   .   .   .   .   .  
    9. Schermontwerpen: (Figma) screenshots) .   .   . 
    10. Oplevering links (Figma,Github) .   .   .   .  


lees verder >>

    1 Inleiding
In dit document vind je de oplossing voor al je levensvragen. Maar dat is een kwinkslag, zodat je nu verder zult lezen met volle aandacht. Wat je hier zult vinden is een volledig afgeronde ontwerpfase voor een webapplicatie, genaamd ‘Closette’, die ook op mobiel werkt, en een oplossing moet gaan bieden voor iedereen die op zoek is naar veilige genderneutrale toiletten. Het eerste deel van deze zoektocht, bevat vooral de visuele en functionele eisen, die eeuwig uit te breiden zijn, en worden daarna een getrechterd naar een werkbare hoeveelheid code. Want: beperken tot iets kleins, blijkt het moeilijkste te zijn van dit proces.





    2 Probleembeschrijving
Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden. Er is behoefte aan een systeem dat gendervariabele mensen in staat stelt om makkelijk het adres van een genderneutraal toilet te zoeken, of, als je er zelf 1 hebt gevonden, deze te posten via een browser portal. Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar.
De 5 belangrijkste functionaliteiten zijn:
1. Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
2. De zoekresultaten kunnen getrechterd worden via de verschillende filtereigenschappen van toiletten (stad, land, gratis/niet-gratis, wel/niet genderneutraal, toegankelijk voor minder validen, half-openbaar, vies of schoon, heeft wel/geen foto, openingstijden, waardering).
3. Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
4. Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres, een beschrijving en kunnen eventueel een foto uploaden.
5. Speciale gebruikers (community managers) hebben meerdere rechten: moderators hebben de mogelijkheid om posts te censureren of verwijderen.










    3 Functionele- en niet-functionele eisen
Systeemeisen: Hierbij beschrijven functionele eisen wat het systeem doet, en niet-functionele eisen voornamelijk hoe het systeem dit doet.

FUNCTIONELE EISEN
1. Gebruikers kunnen in- en uitloggen.
2. Alle ingelogde gebruikers kunnen zoeken naar toiletten d.m.v. een zoekformulier.
3. De zoekresultaten kunnen gefilterd worden via de tenminste 4 verplichte filtereigenschappen van toiletten (=entries): Stad, Land, Straat, en wel/niet genderneutraal.
4. Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
5. Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres (straat, stad, land) en een beschrijving en kunnen eventueel een foto uploaden d.m.v. 1 formulier.
6. Speciale gebruikers (community managers) hebben meerdere rechten: moderators hebben de mogelijkheid om posts te censureren (PUT of PATCH requests) of verwijderen (DELETE request).
7. Alle gebruikers kunnen een gebruikersaccount aanmaken via hun e-mailadres en een zelfgekozen wachtwoord.
8. De gebruiker die een nieuwe account heeft aangemaakt dient automatisch een bevestigingsmelding te ontvangen.
9. Het systeem checkt direct of het ingevoerde mailadres geldig is. Zo niet, dan wordt een foutmelding getoond en kan het account-aanmaak formulier niet worden verstuurd.
10. Niet verplichte velden mogen worden leeggelaten.
11. Alle ‘wel/niet’ eigenschappen van een toilet kunnen via checkboxes ingevoerd worden (=gratis/niet-gratis, wel/niet genderneutraal, we/niet toegankelijk voor minder validen, wel/niet openbaar, vies of schoon, ‘heeft’ foto, ‘heeft’ kaart, ‘heeft’ sterwaardering).
12. De checkboxes zijn gestyled als toggle switches.
13. Wanneer er dingen mis gaan tussen de front-end en de back-end dan toont de app foutmeldingen in begrijpelijke mensentaal.
14. Als een post-formulier verkeerd is ingevuld, dan geeft het systeem aan welke velden verkeerd zijn ingevuld.
15. Interactie via zoekbalk met knoppen en drop-down filters.
16. Alle wijzigingen worden geregistreerd in een database.
17. De community manager (moderator) kan data aanmaken/ bewerken/ verwijderen.
18. Er is een blog of nieuws pagina met daarin informatie en belangrijke updates.
19. Ingelogde gebruikers kunnen een gebruikersnaam aanmaken die bestaat uit 1 woord van maximaal 15 letters.
20. De applicatie bevat 7 te bezoeken pagina’s: 1. de Home=Zoek pagina, 2. de nieuws pagina, 3. het gebruikers dashboard,  de contactformulier pagina, en de login pagina (=lijkt op register pagina). Ook is er nog een 6e pagina: de blog post, voor elk nieuwsartikel. De 7e pagina is de zoekresultaten pagina maar die verschijnt pas na een zoek query.
21. ALS er een latitude/longitude is ingevuld bij een toilet, dan wordt dit automatisch een OpenStreetMap URL (= externe link).
22. In de backend zijn meerdere verschillende GET, PUT, POST en DELETE requests.nodig om toilet locaties te kunnen zoeken/plaatsen/corrigeren.
23. De app resultaten hebben een hiërarchisch kruimelpad waarover genavigeerd kan worden. De hiërarchische volgorde is, in volgorde van belangrijkheid: Land >> Stad >> straat.
24. Toiletten (entries) en gebruikers hebben een aggregatie relatie: als een gebruiker wordt verwijderd, moeten de door die gebruiker geplaatste toiletlocaties nog blijven bestaan. Rating hebben een compositie relatie: als een gebruiker verdwijnt, verdwijnen ook hun sterrenwaarderingen.








NIET-FUNCTIONELE EISEN

    1. Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
    2. De belangrijkste eis aan deze app is dat gebruikers zowel zéér gedetailleerd kunnen zoeken alsmede zéér gedetailleerd kunnen filteren.
    3. De zoekresultaten kunnen getrechterd worden via 9 ‘extra’ (=niet-verplichte) filtereigenschappen van toiletten (1. gratis/niet-gratis, 2. toegankelijk voor minder validen, 3. half-openbaar, 4. vies of schoon, 5. heeft wel/geen foto, 6. openingstijden, 7.waardering, 8. heeft wel/geen beschrijving, 9. heeft wel/geen locatie op kaart (longitude en latitude).
    4. Er kan ‘snel zoeken’ gedaan worden door een uitgebreide zoekopdracht, met zoveel mogelijk parameters te sturen die maar 1 of weinig resultaten geven. Hoe verfijnder het resultaat, hoe sneller dit kan worden weergegeven op de pagina.
    5. Het filteren van zoekresultaten gebeurt aan de front-end. Dat wil zeggen; er wordt zoveel mogelijk uit de database getoond (bijvoorbeeld alle gevonden entries uit 1 stad) en die kunnen dan d.m.v. filterknoppen binnen 1 window verfijnd worden zonder dat er een verzoek naar de database nodig is en dus zonder een reload van het scherm. Dit heet ‘langzaam zoeken’.
    6. Ingelogde gebruikers kunnen nieuwe toiletten plaatsen (PUT request) en kunnen eventueel een foto uploaden.
    7. Alle gebruikers kunnen een sterrenwaardering per toilet geven, ook op toiletten die ze niet zelf geplaatst hebben.
    8. Op mobiel vindt de hoofd navigatie via een ‘hamburger-menu’ plaats.
    9. Zowel op mobiel als desktop kan er op de Home page gekozen worden tussen 2 grote knoppen: Zoeken (loupe icon) en Plaatsen (plus icon). Deze 2 knoppen zijn altijd zichtbaar, op elke pagina.
    10. Ingelogde gebruikers kunnen posts rapporteren aan moderators.
    11. Moderators mogen alle members zien; members niet.
    12. Op mobiel kunnen gebruikers altijd terug navigeren, d.m.v back-buttons die extar in de interface verrschijnen op kleine schemen.
    13. Tijdens het wachten op de zoekresultaten, verschijnt er een wacht-animatie (loading spinner) in beeld.
    14. Als gebruikers de geolocatie van een toilet weten, dan kunnen zij deze erbij zetten (=latitude & longitude); dit resulteert in een externe link naar OpenStreetMap.
    15. Verplichte velden worden duidelijk aangeduid met een sterretje.
    16. De gebruiker die een nieuw toilet heeft gepost dient automatisch een bevestigingsmelding te ontvangen na het inzenden van zijn entry.
    17. Een nieuw toilet kan alléén geplaatst worden als het adres nog niet bestaat.
    18. Als een toilet al bestaat dan geeft het systeem feedback: “In deze straat is al 1 toilet gemeld, weet je zeker dat je deze dubbel wilt toevoegen?”
    19. Als een toilet succesvol aan de database is toegevoegd, krijgt de gebruiker visuele feedback.
    20. Een ingelogde gebruiker kan een reactie plaatsen bij elk toilet.
    21. Elke eigenschap waarop een toilet te filteren is, heeft een eigen visueel icoontje (icoontjes zijn zichtbaar bij zoekresultaten, zowel als filter, als als in het zoekresultaat zelf)..
    22. De app beantwoord aan de Accessibility eisen niveau 1 (WCAG AA) met minimale keyboard toegang en toegankelijk kleurencontrast. Kleurencontrasten van de teksten zijn gecheckt via: 
https://webaim.org/resources/contrastchecker/ – daar waar normale tekst niet beantwoordt aan de kleureneis, wordt de tekst groter of dikker gemaakt.
23. Er is documentatie/handleiding beschikbaar voor zowel het installeren van de App als het gebruik ervan (o.a. met de HTTP requests).
24.  Op de Home pagina, van desktops, is een “TOILET VAN DE WEEK” post te zien, die gevoed wordt door de blog/nieuws sectie. Deze is niet te zien op mobiel.
25. Extra eigenschappen waarop gefilterd kan worden, die niet verplicht zijn:  sneaky gratis (dus: eigenlijk een toilet van een horeca gelegenheid maar niet gecontroleerd), design/artsy toilet, grappige of artistieke bathroom graffiti.
26. De lijst van zoekresultaten toont meteen 1 foto per toilet als thumbnail, of een placeholder thumbnail.
27. Het eerste zoekresultaat neem meer ruimte in en toont ook meteen de beschrijving, als die er is,
28. Alle genderneutrale toiletten hebben een icoontje dat over de foto van de zoekreultaten heen ligt.
29. De resultaten laden snel.
30. Als een toilet nog geen waarderingen heeft, dan verschijnt er een ‘not yet rated’ label.
31. Bij de sterrenwaardering staat op hoeveel waarderingen het gemiddelde gebaseerd is.
32. Als er 24 uur zijn verstreken sinds de laatste database back-up, wordt er automatisch een nieuwe back-up gemaakt door de server.
33. De gebruikersnaam van de ingelogde bezoeker verschijnt boven in beeld.
34. Er wordt gebruik gemaakt van JSON Web Tokens voor authenticatie (veiligheid)
35. Als de vinder een grote foto uploadt dan moet deze automatisch worden omgezet naar een 72ppi foto van maximaal 1000px breed en 1000px hoog.
36. Gebruikers kunnen hun Geolocatie ingeven door de lengtegraad en breedtegraad in te vullen, zodat ze kunnen aangeven in welke radius van hun locatie zij willen kunnen zoeken.
37. Gebruikers kunnen reacties plaatsen bij entries, en zo publiek meldingen doen of de locatie veilig is. Wanneer een entry/toilet reacties heeft, dan staat het aantal reacties vermeld als getal in de zoekresultaten.
38. Prominent op de homepage staat een oproep tot vrijwilligerswerk: weet je de latitude en longitude van een toilet dat iemand anders geplaatst heeft? Vul die dan zelf aan zodat iedereen deze voortaan kan vinden op een externe kaart.
39. Ingelogde gebruikers zien een notifications icoontje met een nummer als een reactie is geplaatst op hun post of als een moderator er een verandering in heeft gemaakt.
40. Ingelogde gebruikers hebben een dashboard waarin ze in 1 oogopslag alle door henzelf toegevoegde toilet-locaties in een lijst zien staan.
41. Ingelogde gebruikers kunnen correcties doen op de door henzelf geplaatste toiletten (PUT of PATCH request).
42. Een gebruiker kan niet meer dan 2 toiletten per minuut plaatsen (anti-robot veiligheids check).
43. De zoek- en post-formulieren worden gevalideerd terwijl de gebruiker aan het typen is, dus op ieder onBlur- en/of onChange-event.









    4 Inspiratiebronnen: visuele voorbeelden

Deze applicatie is primair bedoeld voor een gendervariante/feministische doelgroep, dus er moet vooral géén rolbevestigend binair ‘boy blue pastel/girl pink pastel’ kleurenschema gebruikt worden. Een voorbeeld van een zoek-website met genderneutrale kleuren is https://omaweetraad.nl














Het visuele zoekconcept in de front-end van de app is vergelijkbaar met: https://www.refugerestrooms.org/about – deze biedt in de zoekresultaten filtering via aanklikbare icoontjes. Die wil ik grotendeels ook, maar dan met een beter design en vriendelijkere huisstijl:.




Er bestaat ook nog een andere genderneutrale toiletten zoeker app, maar deze heeft ongeveer dezelfde criteria, en een lelijk design:





Een minimalistische stijl is het meest duidelijk, maar visueel erg saai; dus zal ik speelse elementen toevoegen in de thumbnails en icoontjes, door deze handgetekend in doodle-stijl te maken, zoals bij  https://toogoodtogo.org








Gezkozen stijlkleuren: genderneutraal groen en hard-roze.
Groen: #0da89d, hard-roze: #ed237c
Ten behoeve van accessibitlity zijn er 2 vervangende kleuren die voor Body tekst kunnen worden gebruikt:
AccessibleGroen: #0A857D, AccessibleRoze: #E2126D
Gekozen fonts:
-kopjes font: FredokaOne uit google web font,
-body font: "Tenso" uit bijgevoegd asset.



    5 Use case tabellen: de gebruikershandelingen

Happy flow 1 (main success scenario): een veel voorkomend scenario zal zijn: een ingelogde gebruiker die een nieuwe toilet-locatie wil plaatsen, en eerst zal moeten zoeken of die al bestaat.

USE CASE: HAPPY FLOW  1
PLAATSEN  NIEUW  TOILET
Actor
Moderator = admin, Gebruiker = user.
Trigger
Gebruiker komt op de Home pagina en wil een nieuwe toilet-locatie maken
Preconditie
– Gebruiker heeft account
– Er staat data in de database
Main success scenario


1. de gebruiker is ingelogd.
2. gebruiker klikt op de link ‘plaats een nieuw toilet’.
3. het systeem toont de pagina met het post formulier.
4. gebruiker vult alle verplichte velden in.
5. gebruiker uploadt een foto (niet verplicht).
6. gebruiker vult een lengtegraad en breedtegraad van de locatie in
7. gebruiker klikt op de ‘Verzenden’ knop
8. het systeem slaat alles op in de database, én checkt of de invoer klopt (en niet dubbel is).
9. Als de invoer klopt, toont het systeem een nieuwe pagina met de tekst “Gelukt! Dit is wat jij geplaatst hebt:…”
10. het systeem toont een veld met daarin alles wat de gebruiker ingevoerd heeft, en toont een ‘wijzigen’ knop.
11. als de gebruiker nu iets wil wijzigen, dan klikt deze op de ‘wijzigen’ knop en krijgt exact hetzelfde ‘post formulier’ te zien, maar dan met alle waarden al ingevuld die de gebruiker zelf had ingevoerd.
12. als de gebruiker deze nieuwe invoer op wil zoeken dan, klikt zij/hij/hen op de ‘zoeken’ knop en vult dan de stad/het land in van waar dit toilet zich bevindt.
13. het zoekresultaat toont alle toiletten die in één stad/land gevonden/geplaatst zijn.
    Postconditie
    De nieuwe locatie is geplaatst en kan worden opgezocht door alle andere gebruikers.


Als het mis gaat 1:

ALTERNATIEF SCENARIO 4A: missend veld.
Verplicht veld mist

1. Het systeem laat de melding “Je invoer kan niet verwerkt worden: vul alle verplichte velden in!”
   – NB: dit scenario treedt óók in werking als er alleén maar een lengtegraad wordt ingevuld: lengtegraad en breedtegraad zijn niet verplicht, maar ALS je ze invult, dan moeten ze allebei samen worden ingevuld.
2. Het verplichte veld dat leeg is gelaten is roodomrand.
4. De gebruiker vult alle verplichte velden in.
   Postconditie
   Gebruiker vervolgt main success scenario bij stap 7.


Als het mis gaat 2:

ALTERNATIEF SCENARIO 8A:  dubbele invoer.
Locatie bestaat al

1. Het systeem laat de melding “Dit toilet bestaat waarschijnlijk al! In deze straat is al eerder een locatie geplaatst. Weet je zeker dat je verder wilt gaan?” – sommige straten zijn heel lang en kunnen wel meer locaties bevatten, maar een dubbelcheck is gewenst.
2. Het systeem toont weer hetzelfde post-formulier maar dan met alle waarden al ingevuld en de ‘wijzigen’ knop + de ‘verzenden’ knop.
3. De gebruiker mag een wijziging intypen óf de eerder ingevoerde straatnaam laten staan en weer op ‘verzenden’ klikken.
   Postconditie
   Gebruiker vervolgt main success scenario bij stap 9.



Tweede belangrijkste handeling, in happy flow:


USE CASE: HAPPY FLOW  2
ZOEKEN NAAR  TOILET
Actor
Gebruiker = user.
Trigger
Gebruiker komt op de Home pagina en wil een toilet zoeken en een waardering geven.
Preconditie
– Er staat data in de database
Main success scenario


1. De gebruiker klikt op de link ‘zoek een  toilet’.
2. het systeem toont de pagina met het zoek formulier.
   3 gebruiker vult  een plaatsnaam in, of een land, of een straatnaam.
4. gebruiker klikt op de ‘Zoeken’ knop
5. het systeem zoekt met wildcards date op in de database.
6. Als er 1 of meer resultaten zijn gevonden, dan, toont het systeem een nieuwe pagina met een lijst zoekresultaten.
7. Als er geen resultaten zijn gevonden, dan, toont het systeem een nieuwe pagina met de tekst “geen resultaten – zoek opnieuw” + het zoek-formulier waarmee breed op stad/land gezocht kan worden, zonder filtering.
8. het zoekresultaat toont alle toiletten die in één stad gevonden/geplaatst zijn als er gezocht is naar een stad.
9. de gebruiker filtert op 1 van de filteropties (genderneutraal, gratis, invalidentoilet, schoon, sterrenwaardering, land) en kiest voor de filter ‘genderneutraal’ gecombineerd met de filter ‘locatie op kaart’.
10. het systeem toont nu alléén alle genderneutrale toiletten die een bekende longitude en latitude hebben.
11. gebruiker kiest 1 individueel toilet door op de naam van het resultaat te klikken.
12. het systeem toont een nieuwe pagina met alle informatie over 1 toilet-post; de gebruiker kan hier een sterrenwaardering geven.
13. de gebruiker klikt op 6 sterren.
14. het systeem berekent het gemiddelde van alle gegeven waarderingen en toont deze op de pagina.
    Postconditie
    De locatie is gevonden en bevat een externe link naar Open Street Maps


    6 Wireframes

Handgetekende wireframes van 5 pagina’s.




    7 Klassendiagram
een klassendiagram van alle entiteiten. het klasse-diagram en de sequentiediagram zijn twee aparte diagrammen. Bij het klasse-diagram staat inderdaad de Klasse en attributen in het diagram. En in de sequentie diagram klasse en methodes
8 Sequentie diagrammen
het klasse-diagram en de sequentiediagram zijn twee aparte diagrammen. Bij het klasse-diagram staat inderdaad de Klasse en attributen in het diagram. En in de sequentie diagram klasse en methodes.

Mogelijke sequenties; Zoeken, Posten, Post censureren, Admin verwijdert gebruiker.




    9 Schermontwerpen: (Figma) screenshots)
Bekijk mijn schermontwerpen via deze Figmalink

    10    Oplevering links


Dit project blijft op Github staan, inclusief documentatie – want ik ben voor open source;
https://github.com/JirosWorld/fullstack-closette-app

Leuke extra’s
Ik hoop dat nieuwe programmeurs gevoeliger gaan zijn voor diversiteit en nooit meer databases ontwerpen waarin gender slechts binair of een boolean is. We leven in 2021 dus het zou mooi zijn als sekse en gender nooit meer een verplicht invoerveld is, óf heel gemakkelijk gewijzigd kan worden. Het zou ook mooi zijn als docenten hierin een voortrekkersrol vervullen (op dezelfde wijze als Github die alle Master branches naar Main laat hernoemen) en minder vaak voorbeeldjes in de les geven over mensen die alleen hetero-relaties hebben of alleen maar ‘Jan’ of ‘Piet’ heten. 😬
Lees mijn stuk over diversiteit in code hier:
https://codepen.io/jirosworld/post/how-to-build-diversity-into-your-code


Veel plezier met nakijken!

Saluut,

Jiro Ghianni
2021 / 2022
















FUNCTIONEEL EN TECHNISCH ONTWERP ‘CLOSETTE’





INHOUD


    1. Inleiding .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   pag.  2
    2. Probleembeschrijving .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .     pag.  2
    3. Functionele- en niet-functionele eisen .   .   .   .   .   .   .   .   .   .   .   .   .   .     pag.  3
    4. Inspiratiebronnen: visuele voorbeelden .   .   .   .   .   .   .   .   .   .   .   .   .   .    pag.  
    5. Use case tabellen: de gebruikershandelingen .   .   .   .   .   .   .   .   .   .   .   .   .  
    6. Wireframes .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   
    7. Klassendiagram
    8. Sequentie diagrammen
    9. Schermontwerpen: (Figma) screenshots) .   .   .   .   .   .   .   .   .   .   .   .   .   .   
    10. Oplevering links (Figma,Github) .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .   .




    1 Inleiding
In dit document vind je de oplossing voor al je levensvragen. Maar dat is een kwinkslag, zodat je nu verder zult lezen met volle aandacht. Wat je hier zult vinden is een volledig afgeronde ontwerpfase voor een webapplicatie, genaamd ‘Closette’, die ook op mobiel werkt, en een oplossing moet gaan bieden voor iedereen die op zoek is naar veilige genderneutrale toiletten. Het eerste deel van deze zoektocht, bevat vooral de visuele en functionele eisen, die eeuwig uit te breiden zijn, en worden daarna een getrechterd naar een werkbare hoeveelheid code. Want: beperken tot iets kleins, blijkt het moeilijkste te zijn van dit proces.





    2 Probleembeschrijving
Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden. Er is behoefte aan een systeem dat gendervariabele mensen in staat stelt om makkelijk het adres van een genderneutraal toilet te zoeken, of, als je er zelf 1 hebt gevonden, deze te posten via een browser portal. Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar.
De 5 belangrijkste functionaliteiten zijn:
1. Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
2. De zoekresultaten kunnen getrechterd worden via de verschillende filtereigenschappen van toiletten (stad, land, gratis/niet-gratis, wel/niet genderneutraal, toegankelijk voor minder validen, half-openbaar, vies of schoon, heeft wel/geen foto, openingstijden, waardering).
3. Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
4. Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres, een beschrijving en kunnen eventueel een foto uploaden.
5. Speciale gebruikers (community managers) hebben meerdere rechten: moderators hebben de mogelijkheid om posts te censureren of verwijderen.










    3 Functionele- en niet-functionele eisen
Systeemeisen: Hierbij beschrijven functionele eisen wat het systeem doet, en niet-functionele eisen voornamelijk hoe het systeem dit doet.

FUNCTIONELE EISEN
1. Gebruikers kunnen in- en uitloggen.
2. Alle ingelogde gebruikers kunnen zoeken naar toiletten d.m.v. een zoekformulier.
3. De zoekresultaten kunnen gefilterd worden via de tenminste 4 verplichte filtereigenschappen van toiletten (=entries): Stad, Land, Straat, en wel/niet genderneutraal.
4. Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
5. Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres (straat, stad, land) en een beschrijving en kunnen eventueel een foto uploaden d.m.v. 1 formulier.
6. Speciale gebruikers (community managers) hebben meerdere rechten: moderators hebben de mogelijkheid om posts te censureren (PUT of PATCH requests) of verwijderen (DELETE request).
7. Alle gebruikers kunnen een gebruikersaccount aanmaken via hun e-mailadres en een zelfgekozen wachtwoord.
8. De gebruiker die een nieuwe account heeft aangemaakt dient automatisch een bevestigingsmelding te ontvangen.
9. Het systeem checkt direct of het ingevoerde mailadres geldig is. Zo niet, dan wordt een foutmelding getoond en kan het account-aanmaak formulier niet worden verstuurd.
10. Niet verplichte velden mogen worden leeggelaten.
11. Alle ‘wel/niet’ eigenschappen van een toilet kunnen via checkboxes ingevoerd worden (=gratis/niet-gratis, wel/niet genderneutraal, we/niet toegankelijk voor minder validen, wel/niet openbaar, vies of schoon, ‘heeft’ foto, ‘heeft’ kaart, ‘heeft’ sterwaardering).
12. De checkboxes zijn gestyled als toggle switches.
13. Wanneer er dingen mis gaan tussen de front-end en de back-end dan toont de app foutmeldingen in begrijpelijke mensentaal.
14. Als een post-formulier verkeerd is ingevuld, dan geeft het systeem aan welke velden verkeerd zijn ingevuld.
15. Interactie via zoekbalk met knoppen en drop-down filters.
16. Alle wijzigingen worden geregistreerd in een database.
17. De community manager (moderator) kan data aanmaken/ bewerken/ verwijderen.
18. Er is een blog of nieuws pagina met daarin informatie en belangrijke updates.
19. Ingelogde gebruikers kunnen een gebruikersnaam aanmaken die bestaat uit 1 woord van maximaal 15 letters.
20. De applicatie bevat 7 te bezoeken pagina’s: 1. de Home=Zoek pagina, 2. de nieuws pagina, 3. het gebruikers dashboard,  de contactformulier pagina, en de login pagina (=lijkt op register pagina). Ook is er nog een 6e pagina: de blog post, voor elk nieuwsartikel. De 7e pagina is de zoekresultaten pagina maar die verschijnt pas na een zoek query.
21. ALS er een latitude/longitude is ingevuld bij een toilet, dan wordt dit automatisch een OpenStreetMap URL (= externe link).
22. In de backend zijn meerdere verschillende GET, PUT, POST en DELETE requests.nodig om toilet locaties te kunnen zoeken/plaatsen/corrigeren.
23. De app resultaten hebben een hiërarchisch kruimelpad waarover genavigeerd kan worden. De hiërarchische volgorde is, in volgorde van belangrijkheid: Land >> Stad >> straat.
24. Toiletten (entries) en gebruikers hebben een aggregatie relatie: als een gebruiker wordt verwijderd, moeten de door die gebruiker geplaatste toiletlocaties nog blijven bestaan. Rating hebben een compositie relatie: als een gebruiker verdwijnt, verdwijnen ook hun sterrenwaarderingen.








NIET-FUNCTIONELE EISEN

    1. Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
    2. De belangrijkste eis aan deze app is dat gebruikers zowel zéér gedetailleerd kunnen zoeken alsmede zéér gedetailleerd kunnen filteren.
    3. De zoekresultaten kunnen getrechterd worden via 9 ‘extra’ (=niet-verplichte) filtereigenschappen van toiletten (1. gratis/niet-gratis, 2. toegankelijk voor minder validen, 3. half-openbaar, 4. vies of schoon, 5. heeft wel/geen foto, 6. openingstijden, 7.waardering, 8. heeft wel/geen beschrijving, 9. heeft wel/geen locatie op kaart (longitude en latitude).
    4. Er kan ‘snel zoeken’ gedaan worden door een uitgebreide zoekopdracht, met zoveel mogelijk parameters te sturen die maar 1 of weinig resultaten geven. Hoe verfijnder het resultaat, hoe sneller dit kan worden weergegeven op de pagina.
    5. Het filteren van zoekresultaten gebeurt aan de front-end. Dat wil zeggen; er wordt zoveel mogelijk uit de database getoond (bijvoorbeeld alle gevonden entries uit 1 stad) en die kunnen dan d.m.v. filterknoppen binnen 1 window verfijnd worden zonder dat er een verzoek naar de database nodig is en dus zonder een reload van het scherm. Dit heet ‘langzaam zoeken’.
    6. Ingelogde gebruikers kunnen nieuwe toiletten plaatsen (PUT request) en kunnen eventueel een foto uploaden.
    7. Alle gebruikers kunnen een sterrenwaardering per toilet geven, ook op toiletten die ze niet zelf geplaatst hebben.
    8. Op mobiel vindt de hoofd navigatie via een ‘hamburger-menu’ plaats.
    9. Zowel op mobiel als desktop kan er op de Home page gekozen worden tussen 2 grote knoppen: Zoeken (loupe icon) en Plaatsen (plus icon). Deze 2 knoppen zijn altijd zichtbaar, op elke pagina.
    10. Ingelogde gebruikers kunnen posts rapporteren aan moderators.
    11. Moderators mogen alle members zien; members niet.
    12. Op mobiel kunnen gebruikers altijd terug navigeren, d.m.v back-buttons die extar in de interface verrschijnen op kleine schemen.
    13. Tijdens het wachten op de zoekresultaten, verschijnt er een wacht-animatie (loading spinner) in beeld.
    14. Als gebruikers de geolocatie van een toilet weten, dan kunnen zij deze erbij zetten (=latitude & longitude); dit resulteert in een externe link naar OpenStreetMap.
    15. Verplichte velden worden duidelijk aangeduid met een sterretje.
    16. De gebruiker die een nieuw toilet heeft gepost dient automatisch een bevestigingsmelding te ontvangen na het inzenden van zijn entry.
    17. Een nieuw toilet kan alléén geplaatst worden als het adres nog niet bestaat.
    18. Als een toilet al bestaat dan geeft het systeem feedback: “In deze straat is al 1 toilet gemeld, weet je zeker dat je deze dubbel wilt toevoegen?”
    19. Als een toilet succesvol aan de database is toegevoegd, krijgt de gebruiker visuele feedback.
    20. Een ingelogde gebruiker kan een reactie plaatsen bij elk toilet.
    21. Elke eigenschap waarop een toilet te filteren is, heeft een eigen visueel icoontje (icoontjes zijn zichtbaar bij zoekresultaten, zowel als filter, als als in het zoekresultaat zelf)..
    22. De app beantwoord aan de Accessibility eisen niveau 1 (WCAG AA) met minimale keyboard toegang en toegankelijk kleurencontrast. Kleurencontrasten van de teksten zijn gecheckt via: 
https://webaim.org/resources/contrastchecker/ – daar waar normale tekst niet beantwoordt aan de kleureneis, wordt de tekst groter of dikker gemaakt.
23. Er is documentatie/handleiding beschikbaar voor zowel het installeren van de App als het gebruik ervan (o.a. met de HTTP requests).
24.  Op de Home pagina, van desktops, is een “TOILET VAN DE WEEK” post te zien, die gevoed wordt door de blog/nieuws sectie. Deze is niet te zien op mobiel.
25. Extra eigenschappen waarop gefilterd kan worden, die niet verplicht zijn:  sneaky gratis (dus: eigenlijk een toilet van een horeca gelegenheid maar niet gecontroleerd), design/artsy toilet, grappige of artistieke bathroom graffiti.
26. De lijst van zoekresultaten toont meteen 1 foto per toilet als thumbnail, of een placeholder thumbnail.
27. Het eerste zoekresultaat neem meer ruimte in en toont ook meteen de beschrijving, als die er is,
28. Alle genderneutrale toiletten hebben een icoontje dat over de foto van de zoekreultaten heen ligt.
29. De resultaten laden snel.
30. Als een toilet nog geen waarderingen heeft, dan verschijnt er een ‘not yet rated’ label.
31. Bij de sterrenwaardering staat op hoeveel waarderingen het gemiddelde gebaseerd is.
32. Als er 24 uur zijn verstreken sinds de laatste database back-up, wordt er automatisch een nieuwe back-up gemaakt door de server.
33. De gebruikersnaam van de ingelogde bezoeker verschijnt boven in beeld.
34. Er wordt gebruik gemaakt van JSON Web Tokens voor authenticatie (veiligheid)
35. Als de vinder een grote foto uploadt dan moet deze automatisch worden omgezet naar een 72ppi foto van maximaal 1000px breed en 1000px hoog.
36. Gebruikers kunnen hun Geolocatie ingeven door de lengtegraad en breedtegraad in te vullen, zodat ze kunnen aangeven in welke radius van hun locatie zij willen kunnen zoeken.
37. Gebruikers kunnen reacties plaatsen bij entries, en zo publiek meldingen doen of de locatie veilig is. Wanneer een entry/toilet reacties heeft, dan staat het aantal reacties vermeld als getal in de zoekresultaten.
38. Prominent op de homepage staat een oproep tot vrijwilligerswerk: weet je de latitude en longitude van een toilet dat iemand anders geplaatst heeft? Vul die dan zelf aan zodat iedereen deze voortaan kan vinden op een externe kaart.
39. Ingelogde gebruikers zien een notifications icoontje met een nummer als een reactie is geplaatst op hun post of als een moderator er een verandering in heeft gemaakt.
40. Ingelogde gebruikers hebben een dashboard waarin ze in 1 oogopslag alle door henzelf toegevoegde toilet-locaties in een lijst zien staan.
41. Ingelogde gebruikers kunnen correcties doen op de door henzelf geplaatste toiletten (PUT of PATCH request).
42. Een gebruiker kan niet meer dan 2 toiletten per minuut plaatsen (anti-robot veiligheids check).
43. De zoek- en post-formulieren worden gevalideerd terwijl de gebruiker aan het typen is, dus op ieder onBlur- en/of onChange-event.









    4 Inspiratiebronnen: visuele voorbeelden

Deze applicatie is primair bedoeld voor een gendervariante/feministische doelgroep, dus er moet vooral géén rolbevestigend binair ‘boy blue pastel/girl pink pastel’ kleurenschema gebruikt worden. Een voorbeeld van een zoek-website met genderneutrale kleuren is https://omaweetraad.nl














Het visuele zoekconcept in de front-end van de app is vergelijkbaar met: https://www.refugerestrooms.org/about – deze biedt in de zoekresultaten filtering via aanklikbare icoontjes. Die wil ik grotendeels ook, maar dan met een beter design en vriendelijkere huisstijl:.




Er bestaat ook nog een andere genderneutrale toiletten zoeker app, maar deze heeft ongeveer dezelfde criteria, en een lelijk design:





Een minimalistische stijl is het meest duidelijk, maar visueel erg saai; dus zal ik speelse elementen toevoegen in de thumbnails en icoontjes, door deze handgetekend in doodle-stijl te maken, zoals bij  https://toogoodtogo.org








Gezkozen stijlkleuren: genderneutraal groen en hard-roze.
Groen: #0da89d, hard-roze: #ed237c
Ten behoeve van accessibitlity zijn er 2 vervangende kleuren die voor Body tekst kunnen worden gebruikt:
AccessibleGroen: #0A857D, AccessibleRoze: #E2126D
Gekozen fonts:
-kopjes font: FredokaOne uit google web font,
-body font: "Tenso" uit bijgevoegd asset.



    5 Use case tabellen: de gebruikershandelingen

Happy flow 1 (main success scenario): een veel voorkomend scenario zal zijn: een ingelogde gebruiker die een nieuwe toilet-locatie wil plaatsen, en eerst zal moeten zoeken of die al bestaat.

USE CASE: HAPPY FLOW  1
PLAATSEN  NIEUW  TOILET
Actor
Moderator = admin, Gebruiker = user.
Trigger
Gebruiker komt op de Home pagina en wil een nieuwe toilet-locatie maken
Preconditie
– Gebruiker heeft account
– Er staat data in de database
Main success scenario


1. de gebruiker is ingelogd.
2. gebruiker klikt op de link ‘plaats een nieuw toilet’.
3. het systeem toont de pagina met het post formulier.
4. gebruiker vult alle verplichte velden in.
5. gebruiker uploadt een foto (niet verplicht).
6. gebruiker vult een lengtegraad en breedtegraad van de locatie in
7. gebruiker klikt op de ‘Verzenden’ knop
8. het systeem slaat alles op in de database, én checkt of de invoer klopt (en niet dubbel is).
9. Als de invoer klopt, toont het systeem een nieuwe pagina met de tekst “Gelukt! Dit is wat jij geplaatst hebt:…”
10. het systeem toont een veld met daarin alles wat de gebruiker ingevoerd heeft, en toont een ‘wijzigen’ knop.
11. als de gebruiker nu iets wil wijzigen, dan klikt deze op de ‘wijzigen’ knop en krijgt exact hetzelfde ‘post formulier’ te zien, maar dan met alle waarden al ingevuld die de gebruiker zelf had ingevoerd.
12. als de gebruiker deze nieuwe invoer op wil zoeken dan, klikt zij/hij/hen op de ‘zoeken’ knop en vult dan de stad/het land in van waar dit toilet zich bevindt.
13. het zoekresultaat toont alle toiletten die in één stad/land gevonden/geplaatst zijn.
    Postconditie
    De nieuwe locatie is geplaatst en kan worden opgezocht door alle andere gebruikers.


Als het mis gaat 1:

ALTERNATIEF SCENARIO 4A: missend veld.
Verplicht veld mist

1. Het systeem laat de melding “Je invoer kan niet verwerkt worden: vul alle verplichte velden in!”
   – NB: dit scenario treedt óók in werking als er alleén maar een lengtegraad wordt ingevuld: lengtegraad en breedtegraad zijn niet verplicht, maar ALS je ze invult, dan moeten ze allebei samen worden ingevuld.
2. Het verplichte veld dat leeg is gelaten is roodomrand.
4. De gebruiker vult alle verplichte velden in.
   Postconditie
   Gebruiker vervolgt main success scenario bij stap 7.


Als het mis gaat 2:

ALTERNATIEF SCENARIO 8A:  dubbele invoer.
Locatie bestaat al

1. Het systeem laat de melding “Dit toilet bestaat waarschijnlijk al! In deze straat is al eerder een locatie geplaatst. Weet je zeker dat je verder wilt gaan?” – sommige straten zijn heel lang en kunnen wel meer locaties bevatten, maar een dubbelcheck is gewenst.
2. Het systeem toont weer hetzelfde post-formulier maar dan met alle waarden al ingevuld en de ‘wijzigen’ knop + de ‘verzenden’ knop.
3. De gebruiker mag een wijziging intypen óf de eerder ingevoerde straatnaam laten staan en weer op ‘verzenden’ klikken.
   Postconditie
   Gebruiker vervolgt main success scenario bij stap 9.



Tweede belangrijkste handeling, in happy flow:


USE CASE: HAPPY FLOW  2
ZOEKEN NAAR  TOILET
Actor
Gebruiker = user.
Trigger
Gebruiker komt op de Home pagina en wil een toilet zoeken en een waardering geven.
Preconditie
– Er staat data in de database
Main success scenario


1. De gebruiker klikt op de link ‘zoek een  toilet’.
2. het systeem toont de pagina met het zoek formulier.
   3 gebruiker vult  een plaatsnaam in, of een land, of een straatnaam.
4. gebruiker klikt op de ‘Zoeken’ knop
5. het systeem zoekt met wildcards date op in de database.
6. Als er 1 of meer resultaten zijn gevonden, dan, toont het systeem een nieuwe pagina met een lijst zoekresultaten.
7. Als er geen resultaten zijn gevonden, dan, toont het systeem een nieuwe pagina met de tekst “geen resultaten – zoek opnieuw” + het zoek-formulier waarmee breed op stad/land gezocht kan worden, zonder filtering.
8. het zoekresultaat toont alle toiletten die in één stad gevonden/geplaatst zijn als er gezocht is naar een stad.
9. de gebruiker filtert op 1 van de filteropties (genderneutraal, gratis, invalidentoilet, schoon, sterrenwaardering, land) en kiest voor de filter ‘genderneutraal’ gecombineerd met de filter ‘locatie op kaart’.
10. het systeem toont nu alléén alle genderneutrale toiletten die een bekende longitude en latitude hebben.
11. gebruiker kiest 1 individueel toilet door op de naam van het resultaat te klikken.
12. het systeem toont een nieuwe pagina met alle informatie over 1 toilet-post; de gebruiker kan hier een sterrenwaardering geven.
13. de gebruiker klikt op 6 sterren.
14. het systeem berekent het gemiddelde van alle gegeven waarderingen en toont deze op de pagina.
    Postconditie
    De locatie is gevonden en bevat een externe link naar Open Street Maps


    6 Wireframes

Handgetekende wireframes van 5 pagina’s.




    7 Klassendiagram
een klassendiagram van alle entiteiten. het klasse-diagram en de sequentiediagram zijn twee aparte diagrammen. Bij het klasse-diagram staat inderdaad de Klasse en attributen in het diagram. En in de sequentie diagram klasse en methodes
8 Sequentie diagrammen
het klasse-diagram en de sequentiediagram zijn twee aparte diagrammen. Bij het klasse-diagram staat inderdaad de Klasse en attributen in het diagram. En in de sequentie diagram klasse en methodes.

Mogelijke sequenties; Zoeken, Posten, Post censureren, Admin verwijdert gebruiker.




    9 Schermontwerpen: (Figma) screenshots)
Bekijk mijn schermontwerpen via deze Figmalink

    10    Oplevering links


Dit project blijft op Github staan, inclusief documentatie – want ik ben voor open source;
https://github.com/JirosWorld/fullstack-closette-app

Leuke extra’s
Ik hoop dat nieuwe programmeurs gevoeliger gaan zijn voor diversiteit en nooit meer databases ontwerpen waarin gender slechts binair of een boolean is. We leven in 2021 dus het zou mooi zijn als sekse en gender nooit meer een verplicht invoerveld is, óf heel gemakkelijk gewijzigd kan worden. Het zou ook mooi zijn als docenten hierin een voortrekkersrol vervullen (op dezelfde wijze als Github die alle Master branches naar Main laat hernoemen) en minder vaak voorbeeldjes in de les geven over mensen die alleen hetero-relaties hebben of alleen maar ‘Jan’ of ‘Piet’ heten. 😬
Lees mijn stuk over diversiteit in code hier:
https://codepen.io/jirosworld/post/how-to-build-diversity-into-your-code


Veel plezier met nakijken!

Saluut,

Jiro Ghianni
2021 / 2022


