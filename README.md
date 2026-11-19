# EX - React useCallback Autocomplete

<img src="public/favicon.svg" alt="React Context API icon" width="48" />

Esercizio di React su useCallback, dal mio corso web dev (specializzazione Frontend).

## Sviluppo locale

Per avviare l'applicazione in locale, clonare il repository ed eseguire i seguenti comandi:

```bash
npm install
npm run dev
```

## Consegna

Crea un campo di ricerca intelligente, simile a quello di Amazon, che mostri i prodotti corrispondenti al testo digitato in una tendina di suggerimenti. Ottimizza poi la ricerca con il debounce per evitare richieste API eccessive.

Per le chiamate API, usa il server locale con URL base `http://localhost:3333` al posto di `https://freetestapi.com/api/v1`.

### Milestone 1 — Creare un campo di ricerca e mostrare i suggerimenti

Crea un campo di ricerca (`<input type="text">`) in cui l’utente può digitare.

Effettua una chiamata API a `http://localhost:3333/products?search=[query]`, sostituendo `[query]` con il testo digitato. Mostra i risultati sotto l’input in una tendina di suggerimenti.

Se l’utente cancella il testo, la tendina deve scomparire.

### Milestone 2 — Ottimizzare la ricerca con il debounce

Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo, ad esempio 300 ms.

Verifica che la ricerca venga eseguita solo dopo una breve pausa e non immediatamente a ogni tasto premuto.

### Bonus — Caricare i dettagli del prodotto selezionato

Quando l’utente clicca su un prodotto nella tendina, nascondi i suggerimenti ed effettua una chiamata API a `http://localhost:3333/products/{id}` per recuperare i dettagli completi del prodotto selezionato.

Mostra i dettagli sotto il campo di ricerca, includendo ad esempio immagine (`image`), nome (`name`), descrizione (`description`) e prezzo (`price`).

## License

- [MIT](LICENSE.md)
