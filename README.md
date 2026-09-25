# il fisioterapista libero — sito web

Sito statico (HTML + CSS + JS vanilla, nessuna build) per "il fisioterapista libero" — Dott. Alessandro Ottaviani.

## Struttura
```
/index.html        pagina principale
/grazie.html        pagina di ringraziamento dopo l'invio del form
/privacy.html        informativa privacy
/assets/style.css    stili
/assets/script.js     script
/assets/logo.jpg      logo
/assets/favicon.jpg    favicon
/assets/og-image.jpg   immagine per anteprime social
```

## Prima di pubblicare: form di contatto
Il form usa **FormSubmit** (nessun backend necessario), configurato per inviare le richieste a `Ilfisioterapistalibero@gmail.com`.

- **Al primissimo invio del form** (fallo tu stesso una volta, come test), FormSubmit manderà una mail di conferma a quell'indirizzo: apri quella mail e clicca sul link di attivazione. Da quel momento tutte le richieste successive arriveranno regolarmente via email.
- Il campo `_next` nel form punta a `https://ilfisioterapistalibero.pages.dev/grazie.html`. **Se il tuo sito finirà su un altro indirizzo** (dominio diverso o nome progetto diverso su Cloudflare Pages), apri `index.html`, cerca la riga con `name="_next"` e sostituisci l'URL con quello reale del tuo sito + `/grazie.html`.

## Deploy su Cloudflare Pages (tramite GitHub)

Questo README riprende i passi già seguiti/da seguire con Claude Code in sessione — utile come promemoria futuro.

1. **Git**: nella cartella del progetto è stato eseguito `git init`, `git add .`, `git commit -m "primo sito"`.
2. **GitHub**: crea un nuovo repository (es. `fisioterapista-libero`) su github.com, poi collega il repo locale:
   ```
   git remote add origin <URL-DEL-TUO-REPO>
   git push -u origin main
   ```
3. **Cloudflare Pages**:
   - Vai su [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
   - Autorizza l'accesso a GitHub e seleziona il repository appena creato.
   - Impostazioni build:
     - **Framework preset**: None
     - **Build command**: (lascia vuoto)
     - **Output directory**: `/`
   - Clicca **Save and Deploy**.
4. Otterrai un URL tipo `nomeprogetto.pages.dev`. Puoi rinominarlo in **ilfisioterapistalibero.pages.dev** dalle impostazioni del progetto Pages (Settings → rinomina progetto, oppure ricrealo con quel nome).
5. Metti l'URL definitivo nel bottone del link in bio su Beacons.
6. Da qui in poi, ogni volta che fai `git push`, il sito si ripubblica automaticamente.
7. **Cloudflare Web Analytics** (gratis, senza cookie): dal pannello Cloudflare vai su Analytics → Web Analytics → aggiungi il sito, copia lo snippet JS fornito e incollalo in `index.html` (e idealmente anche nelle altre pagine) prima di `</body>`, dove è già indicato il commento `<!-- Cloudflare Web Analytics: incolla qui... -->`. Poi fai un nuovo `git push`.

## Verifica finale
- Apri il sito online e prova a inviare il form di test (una volta, per attivare FormSubmit).
- Controlla che il bottone WhatsApp apra una chat precompilata.
- Controlla su smartphone che la barra "Consulenza gratuita" resti visibile in basso durante lo scroll.
