# mock-server

Questo progetto fornisce un server mock per simulare API RESTful utilizzando dati JSON. È utile per testare applicazioni frontend senza la necessità di un backend reale.

## Struttura del progetto

- `index.js`: Punto di ingresso principale dell'applicazione. Avvia un server Express configurato con CORS, logging e gestione degli errori.
- `database/`: Contiene file JSON con dati di esempio (attori, attrici, aeroporti, animali, libri, destinazioni, politici, prodotti, condizioni meteo).
- `src/routes/resource.js`: Gestisce le rotte per accedere alle risorse. Permette di ottenere tutti gli elementi di una risorsa, filtrare per nome/titolo o ottenere un elemento tramite ID.
- `src/lib/utilies.js`: Gestore degli errori centralizzato.

## Installazione

1. Assicurati di avere Node.js installato.
2. Installa le dipendenze:
   ```
   npm install
   ```

## Utilizzo

Per avviare il server:
```
npm start
```
Il server sarà disponibile sulla porta specificata nella variabile d'ambiente `PORT` (default: 5000).

## API

- `GET /:resourceName`: Restituisce tutti gli elementi della risorsa (es. `/actors`). Supporta il filtro tramite query string `search`.
- `GET /:resourceName/:id`: Restituisce un singolo elemento della risorsa tramite ID.

## Esempio

Per ottenere tutti i libri:
```
GET http://localhost:5000/books
```
Per cercare un libro per titolo:
```
GET http://localhost:5000/books?search=harry
```
Per ottenere un attore tramite ID:
```
GET http://localhost:5000/actors/1
```