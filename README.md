# SelfVix🤌 Addon

Addon leggero e standalone per Stremio che estrae e riproduce contenuti da VixSrc e VixCloud con proxy HLS integrato e logica "Synthetic FHD".

## Funzionalità
- **Branding Personalizzato**: Nome `SelfVix🤌` e logo personalizzato.
- **Proxy HLS Automatico**: Tutti i flussi passano attraverso il server dell'addon per bypassare restrizioni di IP e geolocalizzazione (ideale per Render/HuggingFace).
- **Synthetic FHD**: Il proxy riscrive il manifest per servire solo la qualità video migliore (1080p), mantenendo tutte le tracce audio e i sottotitoli.
- **Supporto Anime (Kitsu)**: Integrazione completa con **AnimeMapping** (`animemapping.stremio.dpdns.org`) per risolvere correttamente i Kitsu ID su AnimeUnity (VixCloud).
- **ID Agnostico**: Funziona correttamente con ID TMDB (`786892`), IMDB (`tt30144839`) e Kitsu (`kitsu:12:1`).

## Naming degli Stream
- **Film/Serie**: Provider `SC 🤌`, Titolo `VIX 1080 🤌`.
- **Anime**: Provider `AU 🤌`, Titolo `VIX 1080 🤌`.

---

## Istruzioni per il Deploy

### 1. Deploy su Render (Scelta Consigliata)
Render è la piattaforma più stabile per questo addon.

1.  Carica tutti i file di questa cartella (`vix-simple-addon-workspace`) su un nuovo repository privato/pubblico su GitHub.
2.  Accedi a [Render](https://render.com/) e crea un nuovo **Web Service**.
3.  Collega il repository GitHub.
4.  Nelle impostazioni di configurazione:
    -   **Runtime**: Scegli `Docker`.
    -   **Dockerfile Path**: Inserisci `Dockerfile.render`. (Se hai rinominato il file in `Dockerfile`, lascialo predefinito).
5.  Il deploy inizierà automaticamente. Una volta completato, l'addon sarà accessibile all'URL fornito da Render.

### 2. Deploy su Hugging Face Spaces (Gratuito)
Ottimo come backup gratuito.

1.  Crea un nuovo **Space** su [Hugging Face](https://huggingface.co/spaces).
2.  Scegli **Docker** come SDK e il template **Blank**.
3.  Carica i file del progetto (tramite interfaccia web o Git).
4.  **Importante**: Hugging Face cerca un file chiamato esattamente `Dockerfile`.
    -   Rinomina `Dockerfile.hf` in `Dockerfile` durante il caricamento o copia il suo contenuto in un nuovo file `Dockerfile` nella root dello Space.
5.  Lo Space si avvierà automaticamente sulla porta `7860`.

---

## Sviluppo Locale

Se vuoi testare l'addon in locale sul tuo PC o Raspberry Pi:

```bash
# Installa le dipendenze
npm install

# Compila e avvia
npm run build
npm start

# Oppure via dev (ts-node)
npm run dev
```

L'addon sarà accessibile su `http://localhost:7000`.

---

## Note Tecniche
L'addon utilizza **AnimeMapping** per convertire gli ID di Kitsu nei percorsi corrispondenti di AnimeUnity, garantendo che anche gli anime siano sempre aggiornati e riproducibili via VixCloud.
