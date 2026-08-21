# 50/50 Catering

Nettside for 50/50 Catering. Enkel statisk side (HTML/CSS/JS), ingen byggeverktøy nødvendig.

## Struktur

```
index.html      Selve siden (om oss, meny, bestilling, kontakt)
css/style.css   Design og fargepalett (hentet fra logoen)
js/script.js    Meny-valg, totalsum og innsending av bestilling
```

## Kom i gang lokalt

Åpne `index.html` direkte i nettleseren, eller kjør en enkel lokal server, f.eks.:

```
npx serve .
```

## Viktig: koble på e-post (Formspree)

Bestillingsknappen sender skjemaet til [Formspree](https://formspree.io), en gratis tjeneste
som videresender skjemainnsendinger til en e-postadresse.

1. Gå til [formspree.io](https://formspree.io) og opprett en gratis konto med e-postadressen
   bestillinger skal sendes til.
2. Opprett et nytt skjema ("New Form") og kopier skjema-ID-en du får (ser ut som `xxxxxxx`).
3. Åpne `index.html` og finn linjen:

   ```html
   <form id="order-form" action="https://formspree.io/f/DITT_SKJEMA_ID" method="POST">
   ```

   Bytt ut `DITT_SKJEMA_ID` med ID-en fra Formspree.
4. Første gang noen sender inn skjemaet, sender Formspree en bekreftelses-e-post — den må
   bekreftes for at videre innsendinger skal komme fram.

## Innhold som må fylles ut

Følgende steder i `index.html` har plassholderteksten **"Skriv noe om dere"** og bør
oppdateres med ekte innhold:

- Om oss-seksjonen
- Adresse (kontakt-seksjonen)
- Åpningstider (kontakt-seksjonen)

Menypunktene under "Meny" er **eksempelretter** med eksempelpriser — bytt ut med den ekte
menyen når den er klar.

## Logo

Den fargerike logoen (ku/gris-kokk-maskot) er foreløpig ikke lagt inn som bilde — siden bruker
en tekstbasert variant i samme fargepalett. Legg til den ekte logofilen (f.eks. `logo.png`) i
en `assets/`-mappe og bytt ut tekst-logoen i `index.html` når filen er tilgjengelig.
