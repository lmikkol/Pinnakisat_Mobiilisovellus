# Sovelluksesta/About the application

## Sovelluksen käyttötarkoitus 

Verkkopalvelu on tarkoitettu lintuharrastajille. Palvelua käyttävät harrastajat voivat osallistua kilpailuihin, lisätä havaintojaan määrittäen havainnolle myös päivämäärän.
 Harrastajat voivat näin ollen siis kilpailla toisiaan vastaan lintuhavainnoilla, hyvässä mielessä tietenkin.
 Sovellus on luotu Pirkanmaan Lintuyhdistyksen pyynnöstä, lintuyhdistyksen käyttöön ja jatkokehitykseen oppilastyöksi.

 ## || Käyttäjät ||

 Sovelluksessa voi olla vain yksi käyttäjä kirjautuneena sisään selaimessa. Sovelluksella on ns. peruskäyttäjiä, rekisteröityjä käyttäjiä sekä Admin/ylläpitäjä.
  Ylläpitäjällä on muista käyttäjistä poikkeavat näkymät ja oikeudet.

  ## || Sovelluksen rakenne ||

  Pinnakisapalvelulla on useita erilaisia päänäkymiä, jotka toimintojen mukaan avaavat muita näkymiä

  - Etusivu, jossa tervetulo toivotukset, lintuyhdistyksen logo, navigointipalkki sekä alapalkki eli footer. => navigointipalkki ja footer näkyvät jokaisessa näkymässä!
  - Rekisteröinti, josta käyttäjä voi luoda itselleen käyttäjätunnuksen.
  - Kirjaudu sisään sivulta käyttäjä voi kirjautua sisään, jos on rekisteröitynyt. Kirjautumalla sisään käyttäjä avaa uusia näkymiä!
  - Kilpailut näkymä, jossa käyttäjät voivat nähdä kilpailut katergorioittain, navigoida itsensä tarkastelemaan kilpailutuloksia, osallistua kilpailuihin (kirjautuneet käyttäjät) sekä poistua kilpailuista.
  - Omat Kilpailut näkymä näkyy vain kirjautuneille käyttäjille. Jos käyttäjä on osallistuneena kilpailuun, voi hän lisätä havaintoja, tarkastella tuloksia tai vaihtoehtoisesti poistua kilpailusta.
  - Tulokset sivu, jossa käyttäjä näkee kilpailuun osallistuneiden tuloksia

## || Toiminnallisuudet ||

### Käyttäjän luominen

Käyttäjää luodessa on tietynlaisia rajoituksia, joita ovat :
- Sähköpostin on oltava oikeassa muodossa eli esim. Nimi@email.com => EI Nimi@.com || nimi.com || nimi@email
- Käyttäjän tulee vahvistaa salasana => virhe, jos salasanat eivät ole samat.
- Kaikki kentät ovat pakollisia täyttää.

### Kirjautuminen sisään

Kirjautuminen on yksiselitteinen eli kirjautuminen tapahtuu sähköpostilla, joka toimii ns. käyttäjätunnuksena.
Jos käyttäjätunnusta/salasanaa ei löydy tietokannasta => Virheilmoitus

### Kilpailut

Kilpailut sivu muuttaa ulkomuotoaan riippuen kuka käyttäjä on kyseessä. 
Kaikille samat ovat: 
- Kilpailut näkyvät kategorioittain statuksen mukaan => Käynnissä olevat kilpailut, Menneet kilpailut
- Katso tulokset nappi, joka ohjaa käyttäjän tulokset sivulle

Vieraileva käyttäjä näkee ainoastaan:
- Kilpailut katergorioittain
- Katso tulokset -painikkeen

Kirjautunut käyttäjä näkee myös: 
- Osallistu kilpailuun/poistu kilpailusta -painikkeen
 
Admin on ainoa käyttäjä joka näkee tulevat kilpailut ja näkee myös lisää kilpailu- painikkeen sekä painaessa sitä sen avaaman kilpailun lisäyslomakkeen.

### Omat kilpailut

Näkymä jonka vain kirjautuneet käyttäjät sekä Admin voivat nähdä.
Jos käyttäjä on osallistunut kilpailuun, käyttäjä voi lisätä uusia havaintoja painikkeesta, joka vuorostaan avaa havainnon lisäys lomakkeen
=> sisältää lintulistan, päivämäärän, kilometrit, tunnit, spondet ja paikkakunnan

Näkymässä on myös katso tulokset -painike sekä poistu kilpailusta -painike, jota painaessa avaa vahvistusikkunan.

### Tulokset

Jokaiselle käyttäjälle avoin tulosnäkymä, jossa käyttäjät voivat tarkastella tarkasteltavan kilpailun tuloksia. Sivulla näkyy lista, josta voi tarkastella osallistujan havaintoja painamalla osallistujan nimeä.
 Jos kukaan ei ole lisännyt havaintojaan kilpailuun, antaa näkymä tekstin 'Kukaan ei ole vielä osallistunut kilpailuun'

### Kirjaudu ulos

Yksiselitteisin näkymä, joka avautuu painaessa kirjaudu ulos -painiketta. Painike ilmestyy navigointipalkkiin ainoastaan, jos käyttäjä on kirjautunut sisään. 
 Kirjautuessa ulos näkymään ilmestyy teksti vahvistamaan käyttäjän onnistunut uloskirjautuminen.

 
