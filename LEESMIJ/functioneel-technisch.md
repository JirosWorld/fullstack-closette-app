# Closette App: Functioneel- en Technisch ontwerp

_Markdown text-only versie_

Deze '**text only**' versie **_zónder_ afbeeldingen** is alleen bedoeld om in een browser op Github e.d. makkelijk snel te kunnen lezen hoe het ontwerp inelkaar steekt. Het échte ontwerp document staat hier: [PDF ontwerp document met afbeeldingen](funtioneel-technisch-ontwerp-app-jiro.pdf) (7 MB)

~ door Jiro Ghianni.

## Text Only inhoud


FUNCTIONEEL EN TECHNISCH ONTWERP ‘CLOSETTE’


INHOUD


    1. Inleiding .   .   .   .   .   .   .   .   . 
    2. Probleembeschrijving .   .   .   .   .   . 
    3. Functionele- en niet-functionele eisen .   . 
    4. Inspiratiebronnen: visuele voorbeelden .   .  
    5. Use case tabellen: de gebruikershandelingen . 
    6. Wireframes .   .   .   .   .   .   .   .   .  
    8. Sequentie diagrammen  .   .   .   .   .   .   .
    9. Schermontwerpen: (Figma) screenshots) .   .   .
    10. Oplevering links (Figma,Github) .   .   .   .


lees verder >>



    1 Inleiding
In dit document vind je de oplossing voor al je levensvragen. Maar dat is een kwinkslag, zodat je nu verder zult lezen met volle aandacht. Wat je hier zult vinden is een volledig afgeronde ontwerpfase voor een webapplicatie, genaamd ‘Closette’, die ook op mobiel werkt, en een oplossing moet gaan bieden voor iedereen die op zoek is naar veilige genderneutrale toiletten.





    2 Probleembeschrijving
Voor iedereen, die niet achter een boom kan plassen, is  het vaak erg lastig om een gratis openbaar toilet te vinden. Daarnaast is het voor non-binaire en transgender personen nog veel lastiger om een (veilig) genderneutraal toilet te vinden. Er is behoefte aan een systeem dat gendervariabele mensen in staat stelt om makkelijk het adres van een genderneutraal toilet te zoeken, of, als je er zelf 1 hebt gevonden, deze te delen via een openbare site. Een extra bij-effect van deze ‘Closette’ app is dat ook niet-trans personen zo makkelijker een veilig of toegankelijk toilet kunnen vinden. Voor vrouwen zijn er immers ook al jaren veel te weinig gratis toiletten beschikbaar.
De 5 belangrijkste functionaliteiten zijn:
1 Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten.
2 De zoekresultaten kunnen getrechterd worden via de verschillende filtereigenschappen van toiletten (stad, land, gratis/niet-gratis, wel/niet genderneutraal, toegankelijk voor minder validen, vies of schoon, heeft wel/geen foto, beoordelingen).
3 Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
4 Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres, een beschrijving en kunnen eventueel een foto uploaden.
5 Speciale gebruikers (community managers) hebben meer rechten: moderators hebben de mogelijkheid om posts te censureren of verwijderen.



    3 Functionele- en niet-functionele eisen
Systeemeisen: Hierbij beschrijven functionele eisen wat het systeem doet, en niet-functionele eisen voornamelijk hoe het systeem dit doet + de app werkt nog steeds, zonder de niet-functionele eisen.

FUNCTIONELE EISEN
Groen = gereed / Oranje = halverwege
Rood = nog niet af

    1 Gebruikers kunnen in- en uitloggen.
    2 Alle niet-ingelogde gebruikers kunnen zoeken naar toiletten.
    3 Er kan in aparte ‘snel zoeken’ zoekvelden worden gezocht op Stad, land, of naam.
    4 Ingelogde gebruikers kunnen nieuwe toiletten plaatsen met daarbij het adres (straat, stad, land) en een beschrijving + extra beschikbare opties aanvinken. 
    5 Ingelogde gebruikers kunnen meerdere foto’s per toilet uploaden d.m.v. een formulier.
    6 Speciale gebruikers/admins (community managers) hebben meer rechten: admins hebben de mogelijkheid om posts te censureren (PUT of PATCH requests) of verwijderen (DELETE request).  De admin kan data (Toiletten, users, nieuwsberichten) aanmaken/ bewerken/ verwijderen. En alleen admins kunnen nieuwsberichten plaatsen.
    7 Alle bezoekers kunnen een gebruikersaccount aanmaken met hun e-mailadres + een gebruikersnaam en een zelfgekozen wachtwoord.
    8 Ingelogde gebruikers blijven ingelogd, ook wanneer zij hun browser een harde refresh geven (JWT token).
    9 Niet verplichte velden mogen worden leeggelaten.
    10 Alle ingelogde gebruikers kunnen de details van elk toilet aanpassen/ cq. verbeteren, dus niet alleen die van zichzelf.
    11 Alle ‘wel/niet’ eigenschappen van een toilet kunnen via checkboxes ingevoerd worden (=gratis/niet-gratis, wel/niet genderneutraal, we/niet toegankelijk voor minder validen, wel/niet vies of schoon, ‘heeft’ foto, ‘heeft’ kaart, ‘heeft’ sterwaardering).
    12 Alle wijzigingen worden geregistreerd in een database.
    13 Er is een blog of nieuws pagina, gevoed vanuit de database, met daarin informatie/handleidingen en belangrijke updates.
    14 Ingelogde gebruikers kunnen hun eigen wachtwoord veranderen.
    15 De applicatie bevat tenminste 7 te bezoeken pagina’s: 1. de Zoek pagina, 2. de Nieuws pagina, 3. het gebruikers Dashboard,  de Registreer  pagina, en de Login pagina. Ook is er nog een sub-pagina voor elk individueel nieuwsartikel, en een sub-pagina voor elke individuele toilet-entry. De 7e pagina is de zoekresultaten pagina maar die verschijnt pas na een zoek query.
    16 ALS er een latitude/longitude is ingevuld bij een toilet, dan wordt dit automatisch een aanklikbaar OpenStreetMap URL (= externe link) op de site.
    17 In de backend zijn meerdere verschillende GET, PUT, POST en DELETE requests. om toilet locaties te kunnen zoeken/plaatsen/corrigeren.
    18 Toiletten (entries) en gebruikers hebben een losse ‘relatie’: als een gebruiker wordt verwijderd, moeten de door die gebruiker geplaatste toiletlocaties nog blijven bestaan in de database. 
    19 Er vindt zowel aan de backend als aan de frontend validatie plaats op de meest essentiële data die gepost wordt door gebruikers: zo mag een gebruikersnaam niet uit 1 letter bestaan en moet een wachtwoord uit minstens 4 tekens bestaan met daarin minstens 1 cijfer.
    20 Foto’s kunnen worden geupload via de frontend.
    21 Als de back-end server niet runt of crasht, blijft de front-end nog werken en zinvolle foutmeldingen tonen.


NIET-FUNCTIONELE EISEN: zonder deze features, werkt de app nog steeds.
Groen = gereed / Oranje = halverwege
Rood = nog niet af

    1 Alle gebruikers, ook die niet ingelogd zijn, kunnen zoeken naar toiletten  d.m.v. een zoekformulier.
    2 De site heeft een eigen Favicon en elke pagina heeft een eigen individuele titel waardoor deze in de browser-navigatie gezien kan worden met de back-button etc.
    3 Bezoekers kunnen zowel zéér gedetailleerd zoeken alsmede lange lijsten met veel zoekresultaten gedetailleerd  filteren.
    4 De zoekresultaten kunnen getrechterd worden d.m.v. checkboxes  via 9 ‘extra’ (=niet-verplichte) filtereigenschappen van toiletten (1. gratis/niet-gratis, 2. toegankelijk voor minder validen, 3. vies of schoon, 4. heeft wel/geen foto, 5.waarderings-score, 6. heeft wel/geen beschrijving, 7. heeft wel/geen locatie op kaart (longitude en latitude). De zoekresultaten kunnen gefilterd worden via de tenminste 4 verplichte filtereigenschappen van toiletten (=entries): Stad, Land, Naam, en wel/niet genderneutraal.
    5 De checkboxes zijn gestyled als toggle switches voor een vriendelijke uitstraling.
    6 Alle ingelogde gebruikers kunnen een sterrenwaardering per toilet geven.
    7 Elke ingelogde gebruiker (member) mag meerdere toiletten (posts) 1X waarderen, inclusief die van zichzelf.
    8 Als een formulier, waarmee een nieuw toilet kan worden toegevoegd, verkeerd is ingevuld, dan geeft het systeem aan welke velden verkeerd zijn ingevuld.
    9 Wanneer er dingen mis gaan tussen de front-end en de back-end dan toont de app foutmeldingen in begrijpelijke mensentaal.
    10 Gebruikers moeten binnen maximaal 1 klik naar 1 van de 2 hoofdfuncties van de app (zoeken/toevoegen) kunnen komen, ongeacht op welke pagina zij zich bevinden.
    11 Alle gebruikers kunnen een sterrenwaardering per toilet geven, ook op toiletten die ze niet zelf geplaatst hebben.
    12 Op mobiele/kleine schermen vindt de hoofd navigatie via een ‘hamburger-menu’ plaats.
    13 Op mobiel kan er steeds gekozen worden tussen de 2 belangrijkste functies: Zoeken (loupe icon) en Plaatsen (plus icon). Deze 2 knoppen zijn op mobiel altijd zichtbaar, op elke pagina.
    14 Ingelogde gebruikers moeten zelf hun eigen wachtwoord kunnen veranderen, zonder tussenkomst van een moderator.
    15 Ingelogde gebruikers kunnen posts rapporteren aan moderators d.m.v. een werkend contactformulier op de Contact pagina.
    16 Moderators/admins mogen alle members zien (in het dashboard); gewone members mogen dit niet.
    17 Tijdens het wachten op de zoekresultaten, verschijnt er een wacht-animatie (loading spinner) in beeld.
    18 De gebruiker die een nieuw toilet heeft gepost dient automatisch een bevestigingsmelding te ontvangen na het inzenden van zijn entry.
    19 Een nieuw toilet kan alléén geplaatst worden als de naam nog niet bestaat; ook de GPS locatie moet uniek zijn.
    20 Als een toilet succesvol aan de database is toegevoegd, krijgt de gebruiker visuele feedback.
    21 Een ingelogde gebruiker kan een reactie plaatsen bij elk toilet.
    22 Elke eigenschap waarop een toilet te filteren is, heeft een eigen visueel icoontje (icoontjes zijn zichtbaar bij zoekresultaten, zowel als filter, als als in het zoekresultaat zelf).
    23 De app beantwoordt aan de Accessibility eisen niveau 1 (WCAG AA) met minimale keyboard toegang en toegankelijk kleurencontrast. Kleurencontrasten van de teksten zijn gecheckt via: 
https://webaim.org/resources/contrastchecker – daar waar normale tekst niet beantwoordt aan de kleureneis, wordt de tekst groter/contrastrijker of dikker gemaakt.
24 Toegankelijkheid (accessibility) worden ook verbeterd door adblockerrs toe te staan en de mogelijkheid te geven tussen darkmode en lightmode te switchen.
25 Er is een handleiding/F.A.Q pagina in de App over het gebruik ervan.
26 Op de Home pagina, voor desktops, is een “TOILET VAN DE WEEK” post te zien, die gevoed wordt door de toiletten database. Deze is niet te zien op mobiel.
27 Extra eigenschappen waarop gefilterd kan worden, die niet verplicht zijn:  ‘sneaky’ gratis (dus: eigenlijk een toilet van een horeca gelegenheid maar niet gecontroleerd en makkelijk gratis te gebruiken), design/artsy toilet, grappige of artistieke bathroom graffiti.
28 De lijst van zoekresultaten toont meteen 1 foto per toilet als thumbnail, of een placeholder thumbnail: ’no photo’ wanneer er geen foto is.
29 Alle genderneutrale toiletten hebben een icoontje dat over de foto van de zoekresultaten heen zweeft waardoor deze meteen herkend kunnen worden.
30 De resultaten laden snel.
31 Als een toilet nog geen waarderingen heeft, dan verschijnt er een ‘not yet rated’ label.
32 Bij de sterrenwaardering staat op hoeveel waarderingen het gemiddelde gebaseerd is.
33 De gebruikersnaam van de ingelogde bezoeker verschijnt steeds boven in beeld (in ieder geval in het gebruikers dashboard) onder het avatar icoontje.
34 Er wordt gebruik gemaakt van JSON Web Tokens voor authenticatie (veiligheid)
35 Als de vinder een grote foto uploadt dan moet deze automatisch worden omgezet naar een 72ppi foto van maximaal 1000px breed en 1000px hoog.
36 Gebruikers kunnen reacties plaatsen bij entries, en zo publiek meldingen doen of de locatie veilig is. Wanneer een entry/toilet reacties heeft, dan staat het aantal reacties vermeld als getal in de zoekresultaten.
37 Ingelogde gebruikers zien een notifications icoontje met een nummer als een reactie is geplaatst op hun post of als een moderator er een verandering in heeft gemaakt.
38 Ingelogde gebruikers hebben een dashboard waarin ze in 1 oogopslag alle door henzelf toegevoegde toilet-locaties in een lijst zien staan.
39 Het systeem checkt direct of het ingevoerde mailadres geldig is. Zo niet, dan wordt een foutmelding getoond en kan het account-aanmaak formulier niet worden verstuurd (via standaard browser-afhankelijke check).
40 Een gebruiker kan niet meer dan 2 toiletten per minuut plaatsen (anti-robot veiligheids check).
41 De zoek- en post-formulieren worden gevalideerd terwijl de gebruiker aan het typen is, dus op ieder onBlur- en/of onChange-event.
42 Als er naar een andere pagina wordt genavigeerd, en wanneer het browserwindow wordt verversd, dan scrollt de pagina automatisch naar boven.
43 De gebruiker die een nieuwe account heeft aangemaakt dient automatisch een bevestigingsmelding te ontvangen.
44 De app resultaten hebben (SEO) een hiërarchisch kruimelpad waarover genavigeerd kan worden. De hiërarchische volgorde is, in volgorde van belangrijkheid: Land >> Stad >> straat.



    4 Inspiratiebronnen: visuele voorbeelden



Deze applicatie is primair bedoeld voor een gendervariante/feministische doelgroep, dus er moet vooral géén rolbevestigend binair ‘boy=blue/girl=pink ’ kleurenschema gebruikt worden, maar het moet wel een vriendelijke uitstraling krijgen.
Een voorbeeld van een zoek-website waarvan ik de uitstraling vriendelijk en toch neutraal vind, is https://omaweetraad.nl – hun kopjes font vind ik erg vriendelijk en modern en heb ik gebruikt als Heading font (via Google webfonts).










Het visuele zoekconcept in de front-end van de app is vergelijkbaar met: https://www.refugerestrooms.org/about – deze biedt in de zoekresultaten filtering via aanklikbare icoontjes. Die wil ik grotendeels ook, maar dan met een beter design en vriendelijkere huisstijl dan dit:







Er bestaat ook nog een andere genderneutrale-toiletten zoeker app, maar deze heeft ongeveer dezelfde criteria, en een zeer lelijk design: ook de functionaliteit is niet geweldig. We verdienen een betere app dan dit.





Een minimalistische stijl is het meest duidelijk, maar visueel erg saai; dus zal ik speelse elementen toevoegen in de thumbnails en icoontjes, door deze handgetekend in doodle-stijl te maken, zoals bij  https://toogoodtogo.org
Voor deze opdracht heb ik zelf de lachende toiletrol als logo getekend en de lachende toiletpot + het zoeken-icoontje en en het plus/toevoegen icoontje + deze allen naar SVG omgezet.






Ik koos eerst als stijlkleuren: genderneutraal groen en hard-roze.
Groen: #0da89d – hard-roze: #ed237c
Ten behoeve van accessibitlity-contrast voor mensen met een visuele beperking, moest ik 2 vervangende kleuren kiezen die o.a. voor tekst kunnen worden gebruikt:
AccessibleGroen: #0A857D –  AccessibleRoze: #E2126D

Voor de meeste vormen van kleurenblindheid, zien mijn kleuren er zó uit: het groen en roze wordt niet modderig bruin, en blijft goed te onderscheiden:


Op de gehele website wordt géén gewoon zwart (#000) gebruikt, omdat dit teveel contrast geeft en te onrustig voor de ogen kan zijn. Om de toegankelijkheid te verhogen wordt daarom #1F132A gebruikt.

Gekozen fonts:
-kopjes font: FredokaOne uit google web font,
-body font: "Tenso" uit bijgevoegd asset.

    5 Use case tabellen: de gebruikersacties
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
6. gebruiker vult een lengtegraad en breedtegraad van de locatie in(niet verplicht).
7. gebruiker klikt op de ‘Verzenden’ knop
8. het systeem slaat alles op in de database, én checkt of de invoer klopt (en niet dubbel is).
9. Als de invoer klopt, toont het systeem een nieuwe pagina met de tekst “Gelukt! Je toevoging is nu op te zoeken in de app.”
11. de browser redirect automatisch naar de Zoek pagina.
12. als de gebruiker deze nieuwe invoer op wil zoeken dan, klikt zij/hij/hen op de ‘zoeken’ knop en vult dan de stad/het land in van waar dit toilet zich bevindt.
13. het zoekresultaat toont alle toiletten die in één stad/land gevonden/geplaatst zijn.
    Postconditie
    De nieuwe locatie is geplaatst en kan worden opgezocht door alle andere gebruikers.


Als het mis gaat 1:

ALTERNATIEF SCENARIO 4A: missend veld.
Verplicht veld mist

1. Het systeem laat de melding “Je invoer kan niet verwerkt worden: vul alle verplichte velden in!”
   – NB: de validatie vindt nu zowel op de back-end als op de front-end plaats: Naam, Stad, Land zijn verplicht.
2. Het verplichte veld dat leeg is gelaten is roodomrand.
4. De gebruiker vult alle verplichte velden in.
   Postconditie
   Gebruiker vervolgt main success scenario bij stap 7.


Als het mis gaat 2:

ALTERNATIEF SCENARIO 8A:  dubbele invoer.
Locatie bestaat al

1. Het systeem laat de melding “Dit toilet bestaat waarschijnlijk al! Op deze GPS coördinaten is al eerder een locatie geplaatst. Wees nauwkeuriger met de getallen” – GPS is op 6 meter nauwkeurig, dus het zou bijna onmogelijk moeten zijn om twee dezelfde punten te plaatsen tenzij er twee verschillende genderneutrale toilet-locaties bestaan op minder dan 6 meter afstand.
2. Het systeem toont nog steeds hetzelfde post-formulier, dat gewijzigd kan worden.
3. De gebruiker mag een wijziging intypen óf de eerder ingevoerde GPS cijfers leeglaten en weer op ‘verzenden’ klikken.
   Postconditie
   Gebruiker vervolgt het main success scenario bij stap 9.



Tweede belangrijkste handeling, in happy flow:
– Zoeken en een beoordeling geven.


USE CASE: HAPPY FLOW  2
ZOEKEN NAAR  TOILET
Actor
Gebruiker = user.
Trigger
Gebruiker komt op de Home pagina en wil een toilet zoeken om een waardering te geven.
Preconditie
– Er staat data in de database
Main success scenario


1. De gebruiker klikt op de link ‘zoek een  toilet’.
2. het systeem toont de pagina met het zoek formulier.
   3 gebruiker vult  een plaatsnaam in, of een land, of een straatnaam.
4. gebruiker klikt op de ‘Zoeken’ knop
5. het systeem zoekt met wildcards date op in de database.
6. Als er 1 of meer resultaten zijn gevonden, dan, toont het systeem onderin de pagina  een lijst met zoekresultaten.
7. Als er geen resultaten zijn gevonden, dan, toont het systeem onderin de pagina de tekst “geen resultaten – zoek opnieuw” + het zoek-formulier waarmee breed op stad/land gezocht kan worden, zonder filtering.
8. het zoekresultaat toont alle toiletten die in één stad gevonden/geplaatst zijn als er gezocht is naar een stad.
9. de gebruiker filtert op 1 van de filteropties (stad, land, naam) en kiest voor de filter ‘genderneutraal’ gecombineerd met de filter ‘locatie op kaart’.
10. het systeem toont nu alléén alle genderneutrale toiletten die een ingevulde longitude en latitude hebben.
11. gebruiker kiest 1 individueel toilet door op de naam van het resultaat te klikken.
12. het systeem toont een nieuwe pagina met alle informatie over 1 toilet-post; de gebruiker kan hier een sterrenwaardering geven.
13. de gebruiker klikt op 6 sterren.
14. het systeem berekent het gemiddelde van alle gegeven waarderingen en toont deze op de pagina.
    Postconditie
    De locatie is gevonden en heeft een nieuw beoordelingsgemiddelde

Als het mis gaat 2:

ALTERNATIEF SCENARIO 10A:  dubbele invoer.
Geen zoekresultaten

1. Het systeem laat de melding “Geen resultaten gevonden, zoek opnieuw”
2. Het systeem laat een duidelijke foutmelding zien onder hetzelfde zoekformulier.
3. De gebruiker kan opnieuw filteren totdat er een combinatie verschijnt met resultaten. EN: als de zoekvelden worden leeg gelaten dan verschijnen ALLE entries uit de database.
   Postconditie
   Gebruiker vervolgt main success scenario bij stap 11.









    6 Wireframes
In deze wireframes concentreer ik me puur op de minimale functionaliteit en indeling. De vierhoeken met een kruis erdoor symboliseren afbeeldingen.




1. de Home page: Desktopversie.

Met linksboven een logo image dat altijd naar Home leidt, rechtsboven staat het navigatiemenu, en in de Main content staan 2 grote images die linken naar de 2 hoofdfuncties.
Deze 2 grote images zijn andere wanneer men is uitgelogd: dan ziet men ‘Zoeken/Inloggen’ – na inloggen staat er ‘Zoeken/Toevoegen’.
De Header bovenin, met navigatie, is voor álle pagina’s steeds hetzelfde en is extra breed en redelijk hoog (veel witruimte / ademruimte).
Alle main content onder de Header is smaller op alle pagina's, tenzij de content breed moet zijn, zoals bij nieuwsberichten en de F.A.Q pagina.




2. Invulformulier.
   Dit ontwerp sjabloon geldt voor:
   – registreren nieuwe gebruikers
   – inloggen voor bestaande gebruikers
   – contactformulier
   – submit pagina voor het maken van nieuwe toilet-entries (maar dan met veel meer invulvelden)
   – submit pop-up voor het aanpassen/veranderen van toilet-entries (maar dan met veel meer invulvelden)
   – submit pop-up voor het wijzigen van het wachtwoord.







3. Zoekpagina.
   Sjabloon voor zoekpagina waarop op 3 eigenschappen gezocht kan worden; de zoekresultaten verschijnen, na de zoekopdracht, onderin in een ‘feed’ lijst.
   Navigatiemenu bovenin is hetzelfde voor alle pagina’s.



4. Standaard content pagina
   Sjabloon voor individuele content pagina’s, zoals:
   – nieuws post-formulier
   – f.a.q. pagina's
   – gebruiker’s dashboard
   Ontwerp bestaat uit 2 kolommen: een smalle linkerkolom met daarin een vierkante foto, en een bredere rechterkolom met alle andere content onder elkaar (zoals de introductie-paragraaf). Later, in de uitvoering, heb ik besloten om de main content voor gewone pagina’s paginabreed te maken, anders werd het te smal.


5. Toilet entry post pagina.
   Is eigenlijk precies hetzelfde als de vorige (= 4. content post) maar dan met meer velden met informatie en icoontjes die soms aanklikbaar zijn (zoals externe link naar locatie op kaart).Onder de grote foto staat een knop: met deze kan een accordeon worde geopend waarin een formulier verschijnt met de optie om een nieuwe foto te uploaden (knop verschijnt alleen voor ingelogde gebruikers).
   Nieuwe foto’s verschijnen in een thumbnail/miniatuur verzamelstrip onder de grote foto, maar boven de informatie tekst.
   De main tekst verschijnt in de smalle kolom, rechts uitgelijnd.
   Onderin de toilet-pagina verschijnt voor ingelogde gebruikers een knop waarmee zij de teksten etc. kunnen aanpassen.



6. Feed pagina.
   Template voor alle pagina’s met een ‘feed’ zoals:
   – het nieuwsoverzicht
   – de zoekresultaten
   In het feed overzicht zijn 2 kolommen te zien, met links de thumbnails per bericht en rechts de titel en een samenvatting van de belangrijkste content.
   Het zoekresultaten overzicht bevat ook nog kleine icoontjes die in 1 oogopslag tonen welke eigenschappen een toilet entry wel of niet heeft.




7. Mobiel ontwerp
   Op kleine schermen komt alle content, die op desktop naast elkaar staat, eenvoudigweg onder elkaar te staan. Maar op Post pagina’s gebeurt er ook nog dit: de foto wordt, qua volgorde, omgewisseld met de samenvatting (dit om ervoor te zorgen dat er bovenin niet alleen maar een foto is te zien zonder titel, maar de bezoeker als eerste de titel met samenvatting ziet, dan daaronder pas de foto, en daar dan weer onder de rest van de inhoud).
   Het navigatiemenu verandert automatisch in een narbinnen vliegend hamburger menu met daarnaast de 2 meest gebruikte functies: zoeken en toevoegen.



    7 Klassendiagram
Het UML klassendiagram van alle entiteiten. Het klassendiagram is taal- en platform-onafhankelijk, maar ik wil wel de kanttekening maken dat bij gebruik van Spring Boot de hier getoonde overerfde member- en admin-klassen niet nodig zijn; in Spring Boot wordt elke gebruiker simpelweg 1 ‘User’ met verschillende rollen (d.m.v. een Authorityklasse).






    8 Sequentie diagrammen
Hier enige sequentie diagrammen met algemeen beschrijvende klassen en ‘real life’  methodes/gebeurtenissen.


Als eerste het proces dat het posten van een nieuwe toilet entry toont; dit mag alleen gebeuren wanneer een user is ingelogd. Andere gebruikers mogen niets posten, die mogen alleen maar zoeken.



Diagram 8.1: Toevoegen nieuw toilet door geregistreerde gebruiker.






Hier het scenario waarbij wordt gezocht, met als varianten wel/niet gevonden. Het zoeken vindt plaats in de zogenaamde DTO tussenlaag.
De referentie waarbij er niets is gevonden verwijst naar dit zelfde sequentie diagram waarbij opnieuw gezocht kan worden, maar dan met andere of bredere criteria.




Diagram 8.2: Zoeken naar toilet door ongeregistreerde bezoeker.







    9 Schermontwerpen: (Figma) screenshots)
Bekijk mijn schermontwerpen in detail via deze Figmalink:
https://www.figma.com/file/yv5hJQVzTMvwTT31oyQBRE/Jiro-Closette-design?node-id=0%3A1
Je kunt inzoomen met Command + Scroll (Mac).
Hieronder volgen de belangrijkste schermen: alle schermen volgen ongeveer hetzelfde stramien. In de praktijk bleek dit wit wel héél erg fel helder wit allemaal, dus heb ik een ‘slategrey’ achtergrond gemaakt. En sommige schermen bleken te vol (zoals het Toilet Detail scherm) dus daar heb ik de checkboxes uit verwijderd.

Mobiel design: Menu Open + Menu gesloten & Responsive breedte.













    10    Oplevering links


• Dit project is ook op Github te vinden:
https://github.com/JirosWorld/fullstack-closette-app
• De Postman requests heb ik ook gepubliceerd op deze Postman documentatie site (inclusief beschrijvingen van de endpoints):
https://documenter.getpostman.com/view/17991980/UVeCR95T
• Figma ontwerpen link:
https://www.figma.com/file/yv5hJQVzTMvwTT31oyQBRE/Jiro-Closette-design?node-id=0%3A1



NAWOORD

Ik hoop dat nieuwe programmeurs gevoeliger gaan zijn voor diversiteit en nooit meer databases ontwerpen waarin gender slechts binair of een boolean is. We leven in 2021 dus het zou mooi zijn als sekse en gender nooit meer verplichte invoervelden zijn, óf heel gemakkelijk gewijzigd kunnen worden door gebruikers zelf. Het zou ook mooi zijn als docenten hierin een voortrekkersrol vervullen (op dezelfde wijze als Github die alle Master branches naar Main laat hernoemen) en minder vaak voorbeelden in de les geven over mensen die alleen hetero-relaties hebben of alleen maar ‘Jan’ of ‘Piet’ heten. 😬  Dat voelt in het begin misschien geforceerd, maar je moet érgens beginnen… Het kan i.e.g. blindheid verminderen bij programmeurs die voor echte mensen programmeren.
Lees mijn stuk over diversiteit in code hier:
https://codepen.io/jirosworld/post/how-to-build-diversity-into-your-code


Veel plezier met nakijken!

Saluti,

Jiro Ghianni
2021 / 2022


