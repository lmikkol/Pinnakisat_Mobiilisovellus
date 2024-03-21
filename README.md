# Pinnakisa Sovellus

FI: Verkkopalvelu, johon voi perustaa pistekilpailuja lintuhavainnoille (pinnakisoja). Käyttäjät voivat rekisteröityä, osallistua kisoihin ja tallentaa lintuhavaintojaan, joiden mukaan pisteitä (pinnoja) kerrytetään. Käyttäjät voivat näin ollen tarkastella omia liityttyjen sekä muiden kilpailuiden tuloksia.
 Verkkopalvelu on toteutettu Sasky ohjelmistokehittäjänä toimimisen näyttötyönä jääden jatkokehitettäväksi tuleville kyseistä näyttöä suorittaville opiskelijoille. 

 Palvelu on toteutettu Javascriptillä käyttäen seuraavia teknologioita: React-vite kirjastoja(frontend) ja Node.Js. Sovelluksen tietokantana on toiminut MongoDB.

EN: Web application for managing, publishing and participating to contests created for bird sightings (tick contests). Users can register, take part to the contests, save their bird sightings, and examine their results of the contests they've participated as well as other contest scores.
 The online service has been implemented as a demonstration project for Sasky 'working as a software developer', remaining to be further developed for future students performing this particular demonstration.

The service is implemented with Javascript using the following technologies: React-vite libraries(frontend) and Node.Js(backend). MongoDB has served as the application's database.

## Linkit

- [Infoa Sovelluksesta](https://github.com/lmikkol/Pinnakisat_Mobiilisovellus/blob/main/Dokumentaatio/Infoa%20Sovelluksesta.md)
- [Kuvakkeita](https://github.com/lmikkol/Pinnakisat_Mobiilisovellus/blob/main/Kuvakkeita.md)


## | Tekniset vaatimukset/Technical requirements |

- **Node.Js**
- **React-Vite**
- **MongoDB**



## Asentaminen && käynnistäminen/Install && How to run

Palvelun käynnistämiseksi kloonaa ensin sovelluksen Git -repositorio, jonka jälkeen navigoi itsesi hakemistosijaintiin, jossa pinnakisat ja pinnakisa_backend hakemisto ovat.

Avaa konsoli molempiin hakemistoihin.


Ensimmäisellä komennolla asennetaan sovelluksen riippuvuudet:

```
npm install
```

Kun tämä on tehty, avaa pinnakisa_backend editorissa, jossa lisää tiedosto '**.env**' hakemiston juureen.

**.env** tiedostoon määritetään **MongoDB** tietokannan osoite, portti, admin sähköposti sekä secret (tarvitaan Admin-käyttäjän tokenia varten).
  Eli **.env** tulisi näyttää seuraavanlaiselta
  
```
MONGODB_URI=mongodb+srv://{MongoDB:käyttäjänimi}:{Salasana}@cluster0.34ejghd3.mongodb.net/{database.nimi}?retryWrites=true&w=majority
PORT=3001
ADMIN_EMAIL={Admin.Email}
SECRET={Salaisuutesi}
```

Kun nämä on määritetty syötä komento hakemistoissa avattuihin konsoleihin

  ```
  npm run dev
  ```

Näin olet avannut itsellesi pääsyn localhost:5173 ja localhost:{Port}
**localhost:5173** on käyttöliittymän sivu, kun taas localhost{Port} käsittelee backendin toimintaa. Sitä tarvitaan kuitenkin, jotta sivusto toimii.


# || Ominaisuudet/Features ||



| Toiminnot                               | Admin                                        | Kirjautunut käyttäjä                         | Vierailija                                          |
| --------------------------------------- |----------------------------------------------|----------------------------------------------|-----------------------------------------------------|
| Rekisteröityminen                       | Ei näe rekisteröitymistä                     | Ei näe rekisteröitymistä                     | Näkee rekisteröitymisen, voi rekisteröityä          |
| Kirjaudu sisään                         | Ei näe kirjautumista                         | Ei näe kirjautumista                         | Näkee kirjautumisen ja voi kirjautua sisään         |  
| Kilpailut                               | Näkee kilpailut linkin + sivun               | Näkee kilpailut linkin + sivun               | Näkee kilpailut linkin + sivun                      |
| Omat Kilpailut                          | Näkee linkin, sivun + osallistutut kilpailut | Näkee linkin, sivun + osallistutut kilpailut | Näkee vain linkin & sivun                           |
| Osallistu kisaan                        | Voi osallistua kilpailuihin                  | Voi osallistua kilpailuihin                  | Ei voi osallistua, vaatii käyttäjätiedot            |
| Tarkastele tuloksia                     | Voi tarkastella tuloksia                     | Voi tarkastella tuloksia                     | Voi tarkastella tuloksia                            |
| Lisää kilpailu                          | Ainoa joka voi lisätä kilpailuja             | Ei voi lisätä                                | Ei voi lisätä                                       |
| Lisää Havainto                          | OK jos osallistunut                          | OK jos osallistunut                          | Ei voi lisätä, vaatii  käyttäjätiedot               |
| Kirjaudu ulos                           | Voi kirjautua ulos                           | Voi kirjautua ulos                           | Ei näe kirjaudu ulos, vaatii kirjautumisen sisään   |


### Muita ominaisuuksia/Other features

- Osallistutusta kilpailusta voi poistua kilpailut/omat kilpailut sivulta (vain kirjautuneet käyttäjät).
- Kilpailut sivulta voi nähdä 'Menneet kilpailut' ja 'Käynnissä olevat kilpailut', mutta vain Admin voi nähdä 'Tulevat Kilpailut'.
- Menneisiin/tuleviin kilpailuihin ei voi osallistua + **(Admin)** tulevien kilpailujen tuloksia ei voi tarkastella.
- Tulostaulukossa näkyvät osallistujan etunimi ja sukunimi sekä pisteet, jotka tulevat havaintojen mukaan. 
- Painamalla osallistujan nimeä voi nähdä osallistujan havainnot.
- Jokaiseen toimintoon lisätyt ilmoitukset voi nähdä navigation-palkin yläpuolella.
- Kilpailusta poistuessa käyttäjä saa vahvistus-ikkunan, jossa kilpailusta poistuminen vahvistetaan.



# || Jatkokehitys Ehdotuksia/Further development suggestions ||

**SHOULD:**

- Palvelun buildin tekeminen
- Käyttäjien poistamisen mahdollisuus
- Käyttäjät voivat vaihtaa salasanaa
- Käyttäjän uloskirjaamisen jälkeen, palauttaa käyttäjän takaisin etusivulle
- Mahdollisuus käyttäjälle muokata omia tietojaan
- Vaihtaessa sivua palautus takaisin sivun yläkulmaan

**NICE:**

- Navigointi uloskirjaamisen jälkeen etusivulle
- Vahvistus sähköpostiin, kun tunnus on luotu
- Tulosnäkymän tyylitys



