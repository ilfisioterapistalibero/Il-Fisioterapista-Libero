# BRIEF PER CLAUDE CODE — Sito "il fisioterapista libero"
Incolla questo file a Claude Code (o aprilo nella cartella del progetto e di': «Costruisci il sito seguendo questo brief»). Metti i file `logo.png`, `favicon.png`, `og-image.jpg` (forniti) nella cartella `assets/`.

---

## 1. OBIETTIVO
Sito vetrina **one-page** che converte i visitatori (arrivano dal link in bio Instagram → Beacons → questo sito) in **richieste di consulenza telefonica gratuita**. Ogni sezione termina con una CTA di richiesta consulenza. Due modalità di contatto: **(A)** un form "lasciami nome + telefono, ti richiamo" che arriva via email; **(B)** un bottone "scrivimi su WhatsApp".

## 2. STACK E VINCOLI
- Sito **statico**: solo HTML + CSS + JS vanilla. Nessun framework, nessuna build, nessuna dipendenza npm. Deve funzionare aprendo `index.html`.
- Un'unica pagina `index.html` + una pagina `privacy.html`. CSS in `assets/style.css`, JS in `assets/script.js`.
- Ottimizzato per **mobile-first** (la maggior parte del traffico è da smartphone), veloce, accessibile (contrasti AA, tag semantici, alt text), Lighthouse verde.
- Deploy su **Cloudflare Pages** via **GitHub** (guida in fondo).

## 3. DESIGN SYSTEM (rispettalo esattamente)
**Colori**
- Sfondo: `#F3E7D5` (avorio caldo) · Superfici/card: `#EFE2CE`
- Testo titoli: `#3C3026` (cacao) · Testo corpo: `#4A3D31` · Testo tenue: `#8B7A68`
- Accento primario (bottoni, link, dettagli): `#C67850` (terracotta) · Accento secondario: `#BE8A4A` (ambra)
- Sezioni scure (es. footer o una fascia CTA): sfondo `#3C3026`, testo `#F3E7D5`, accenti ambra/terracotta.

**Tipografia** (usa Google Fonts)
- Titoli: **Fraunces**. IMPORTANTE: imposta `font-optical-sizing:none;` e `font-variation-settings:"opsz" 32;` sui titoli, altrimenti la "f" esce con la coda tipo corsivo. Peso titoli ~500-600.
- Corpo: **Inter**, pesi 400/500/600.
- Accento elegante: una sola parola chiave dei titoli può essere in **Fraunces italic** color terracotta (come "libero").

**Stile**
- Generoso spazio bianco, angoli arrotondati morbidi (12-16px), ombre leggerissime.
- Bottone primario: fondo terracotta, testo avorio, arrotondato, con stato hover/active.
- Un piccolo dettaglio botanico/curva ambra può decorare gli angoli delle sezioni (facoltativo, discreto).
- Header semplice con logo a sinistra e, su desktop, ancore alle sezioni. Su mobile: **CTA sticky** sempre visibile in basso ("Consulenza gratuita").

## 4. STRUTTURA DELLA PAGINA (in quest'ordine)

### Header (sticky, sottile)
Logo (`assets/logo.png`) + nome "il fisioterapista libero". A destra su desktop: link ancora "Chi sono · Trattamenti · Contatti" + bottone "Consulenza gratuita".

### Sezione 1 — HERO
- Logo centrale o a lato.
- Titolo (H1): **Il tuo benessere, a casa tua.**
- Sottotitolo: *Fisioterapia e benessere psico-fisico a domicilio — a Roma, con empatia e metodo.*
- Due bottoni affiancati: **[Richiedi una consulenza gratuita]** (scorre al form) e **[Scrivimi su WhatsApp]** (link WhatsApp).
- Riga piccola: *Dott. Alessandro Ottaviani · esclusivamente a domicilio · Pigneto, San Giovanni e limitrofi.*

### Sezione 2 — LA MIA MISSIONE (breve, sopra "Chi sono")
Testo:
> Credo in una fisioterapia fatta di ascolto reale ed empatia, dove competenza e passione lavorano insieme. Vengo da te, nel tuo ambiente, per prendermi cura del tuo corpo e del tuo benessere psico-fisico — con metodo, e con il tempo che meriti.

CTA a fine sezione: **[Richiedi una consulenza gratuita]**

### Sezione 3 — CHI SONO (la storia)
Titolo: **Chi sono**. Testo (usa questo, puoi solo sistemare la punteggiatura, NON cambiare i fatti):
> Dietro "il fisioterapista libero" c'è Alessandro Ottaviani, nato a Roma nel dicembre del 1991. Fin da piccolo ho avuto una propensione naturale ad aiutare gli altri: correvo a soccorrere i bambini che cadevano, che si sbucciavano le ginocchia. Far star bene le persone mi riempiva l'anima.
>
> A tredici anni mia zia, operatrice shiatsu, mi insegnò qualche piccola tecnica; quando mi disse che avevo un bellissimo tocco, non smisi più di fantasticare sulla professione che avrei fatto. Al liceo non perdevo occasione di fare un massaggio a chi aveva dolore, e ogni volta era una soddisfazione.
>
> A diciotto anni, dopo un'estate di sacrificio sui libri, fui ammesso all'Università di Tor Vergata, dove in tre anni conseguii il titolo di Dottore in Fisioterapia. Feci un solo colloquio, al Don Gnocchi di Roma: ci sono rimasto oltre otto anni.
>
> Durante il Covid ho capito che essere dipendente non era la mia strada, e che la fisioterapia in struttura aveva un grande limite: non permetteva di vedere il paziente nel suo ambiente reale. L'esperienza al Don Gnocchi e i tanti corsi seguiti negli anni mi hanno dato la spinta per mettermi in proprio. Oggi seguo esclusivamente pazienti privati a domicilio, e posso così dedicarmi al mio lavoro in modo sereno ed efficace.
>
> Nel 2025 sono diventato padre di una splendida bambina, Ambra. Questa esperienza — e l'aver accompagnato mia moglie in tutti i cambiamenti della gravidanza — mi ha fatto capire quanto la fisioterapia possa essere preziosa in questi momenti delicati per il corpo e la mente della donna. È un ambito dove purtroppo circolano molta improvvisazione e abusivismo: tecniche apparentemente semplici come il massaggio o il linfodrenaggio possono fare danni se eseguite da mani inesperte. Per questo, pur restando la riabilitazione un cardine della mia professione, ho scelto di mettere la mia esperienza e la mia tecnica anche al servizio di chi è in dolce attesa e di chi vuole concedersi un momento di benessere, in sicurezza.

Sotto, box **"La mia formazione"** (elenco):
- Laurea in Fisioterapia 110/110 — Università di Roma Tor Vergata
- Oltre 8 anni di esperienza clinica (Fondazione Don Gnocchi, Roma)
- Linfodrenaggio manuale e decongestione del linfedema
- Neurodinamica, metodo Maitland – livello 1
- Applicazione del neurotaping · Riflessologia plantare · Massaggio connettivale · BLSD
- Iscritto all'Ordine dei Fisioterapisti del Lazio — n° 10009

CTA a fine sezione: **[Richiedi una consulenza gratuita]**

### Sezione 4 — TRATTAMENTI
Titolo: **I trattamenti**. Intro breve: *Ogni trattamento si svolge comodamente a casa tua. Tutti al costo di 90 € a seduta, con fattura detraibile.* Griglia di card:
1. **Linfodrenaggio manuale in gravidanza** — tecnica dolce e sicura per alleggerire gambe e caviglie e favorire il drenaggio dei liquidi.
2. **Massaggio decontratturante / rilassante** — scioglie nodi e tensioni muscolari e restituisce mobilità e leggerezza.
3. **Trattamento antistress completo** — un percorso pensato per allentare la tensione accumulata da corpo e mente.
4. **Digitopressione palmare** — lavoro sui punti della mano per un profondo rilassamento.
5. **Digitopressione plantare** — stimolazione dei punti del piede per benessere e distensione.
6. **Trattamento personalizzato** — costruito su misura dopo una valutazione delle tue esigenze.

Ogni card mostra il nome, la descrizione e "90 € · fattura detraibile". CTA a fine sezione: **[Richiedi una consulenza gratuita]**

### Sezione 5 — CONTATTI + FORM
Titolo: **Prenota la tua consulenza telefonica gratuita**. Testo: *Lasciami il tuo recapito: ti richiamo io, appena possibile. Nessun impegno.*

**Form (A)** — invio via email con **Formsubmit** (nessun backend):
```html
<form action="https://formsubmit.co/Ilfisioterapistalibero@gmail.com" method="POST">
  <input type="hidden" name="_subject" value="Nuova richiesta di consulenza gratuita">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_next" value="https://SOSTITUISCI-CON-URL-SITO/grazie.html">
  <input type="text"  name="Nome"     required placeholder="Il tuo nome">
  <input type="tel"   name="Telefono" required placeholder="Il tuo numero di telefono">
  <label><input type="checkbox" required> Ho letto e accetto la <a href="privacy.html">privacy policy</a>.</label>
  <button type="submit">Richiama-mi</button>
</form>
```
Nota per l'utente: al **primo** invio Formsubmit manda un'email di conferma a Ilfisioterapistalibero@gmail.com — vai a cliccare il link una volta sola per attivare la ricezione. Crea anche una pagina `grazie.html` semplice ("Grazie! Ti ricontatto al più presto.") e usane l'URL in `_next`.

**Contatto (B)** — bottone WhatsApp:
`https://wa.me/393284611118?text=Ciao%20Alessandro%2C%20vorrei%20prenotare%20una%20consulenza%20telefonica%20gratuita.`

Mostra anche, in chiaro: Telefono **328 461 1118** · Email **Ilfisioterapistalibero@gmail.com** · Instagram **@ilfisioterapistalibero** · *Solo a domicilio — Roma, Pigneto e San Giovanni.*

### Footer
- "il fisioterapista libero" + logo piccolo
- **Dott. Alessandro Ottaviani — Dottore in Fisioterapia · Iscritto all'Ordine dei Fisioterapisti del Lazio n° 10009**
- Link: Privacy policy
- © anno corrente

## 5. SEO / SOCIAL / DATI STRUTTURATI
- `<title>`: Il fisioterapista libero — Fisioterapia a domicilio a Roma | Alessandro Ottaviani
- `<meta name="description">`: Fisioterapia e benessere psico-fisico a domicilio a Roma (Pigneto, San Giovanni). Linfodrenaggio in gravidanza, massaggi, trattamenti antistress. Consulenza telefonica gratuita.
- Lang `it`. Favicon: `assets/favicon.png`. Open Graph + Twitter card con `assets/og-image.jpg`, og:title, og:description, og:type=website.
- JSON-LD schema **MedicalBusiness** (o `Physiotherapy`): nome, descrizione, telefono +393284611118, email, areaServed "Roma, Pigneto, San Giovanni", founder "Alessandro Ottaviani", priceRange "€€", sameAs Instagram.
- Smooth scroll sulle ancore; `prefers-reduced-motion` rispettato.

## 6. ANALYTICS
Predisponi il punto dove incollare lo snippet di **Cloudflare Web Analytics** (gratis, senza cookie). Lo attivo dopo il deploy dal pannello Cloudflare e incollo lo script prima di `</body>`. Non serve altro.

## 7. STRUTTURA FILE
```
/index.html
/grazie.html
/privacy.html
/assets/style.css
/assets/script.js
/assets/logo.png
/assets/favicon.png
/assets/og-image.jpg
/README.md   (istruzioni deploy)
```

## 8. TESTO PRIVACY (metti in privacy.html — è una base, fallo controllare a un consulente)
**Privacy Policy** — Ai sensi del Regolamento UE 2016/679 (GDPR).
Titolare del trattamento: Alessandro Ottaviani, Dottore in Fisioterapia, iscritto all'Ordine dei Fisioterapisti del Lazio n° 10009 — email Ilfisioterapistalibero@gmail.com.
Dati raccolti: nome e numero di telefono forniti tramite il modulo di contatto.
Finalità: ricontattare l'utente per fornire informazioni e prenotare la consulenza richiesta.
Base giuridica: consenso dell'interessato, prestato tramite l'invio del modulo.
Modalità: i dati inviati dal modulo sono trasmessi tramite il servizio FormSubmit (formsubmit.co), che li inoltra via email al titolare. I dati non sono diffusi né ceduti a terzi per finalità diverse.
Conservazione: i dati sono conservati per il tempo necessario a gestire la richiesta e successivamente cancellati, salvo obblighi di legge.
Diritti: l'interessato può richiedere accesso, rettifica, cancellazione, limitazione e opposizione scrivendo a Ilfisioterapistalibero@gmail.com.
Il sito utilizza Cloudflare Web Analytics, che raccoglie statistiche aggregate e anonime senza cookie di profilazione.

## 9. GUIDA AL DEPLOY (GitHub + Cloudflare Pages, deploy automatico)
Prerequisiti sul PC: **Git** installato (`git --version`; se manca, installalo) e **Node** (già presente con Claude Code). Account **GitHub** e **Cloudflare** già creati con Google.
1. Claude Code inizializza il repository nella cartella del progetto: `git init`, `git add .`, `git commit -m "primo sito"`.
2. Crea un nuovo repository su GitHub (es. `fisioterapista-libero`) e collega: `git remote add origin <url>` → `git push -u origin main`.
3. Su **Cloudflare** → dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → autorizza GitHub → seleziona il repo.
4. Impostazioni build: **Framework preset = None**, **Build command = (vuoto)**, **Output directory = /** (è un sito statico). → **Save and Deploy**.
5. Ottieni l'URL `nomeprogetto.pages.dev` — rinominabile in **ilfisioterapistalibero.pages.dev** dalle impostazioni del progetto Pages. Metti questo URL nel bottone di Beacons.
6. Da qui in poi: ogni `git push` ripubblica il sito da solo.
7. Attiva **Cloudflare Web Analytics** (menu Analytics) per questo dominio e incolla lo snippet fornito prima di `</body>`, poi fai un push.

## 10. CHECKLIST QUALITÀ (Claude Code verifichi prima di consegnare)
- [ ] Le "f" dei titoli sono dritte (opsz 32 applicato)
- [ ] CTA "consulenza gratuita" presente in Hero, Missione, Chi sono, Trattamenti, Contatti + sticky su mobile
- [ ] Form Formsubmit funzionante con consenso privacy obbligatorio + pagina grazie.html
- [ ] Bottone WhatsApp con messaggio precompilato
- [ ] Prezzo 90 € · fattura detraibile su tutti i trattamenti
- [ ] Footer con albo n° 10009 + Dott. in Fisioterapia + link privacy
- [ ] Meta title/description, favicon, OG image, JSON-LD presenti
- [ ] Responsive perfetto su mobile, contrasti AA, immagini con alt
- [ ] Nessun errore in console; il sito si apre anche con doppio clic su index.html
