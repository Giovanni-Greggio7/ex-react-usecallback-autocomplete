// Importiamo gli hook necessari da React
import { useState, useCallback, useEffect } from 'react'

// Definizione della funzione debounce
function debounce(callback, delay){
  // Variabile timer per gestire il timeout
  let timer

  // Ritorna una funzione che può essere usata per eseguire il debounce
  return ((value) => {
    // Cancella il timeout precedente (se esiste)
    clearTimeout(timer)
    // Imposta un nuovo timeout che esegue la callback dopo il delay
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  })
}

// Funzione principale del componente
function App() {

  // Stato che contiene i prodotti ottenuti dalla fetch
  const [products, setProducts] = useState([])

  // Stato per gestire il valore dell'input di ricerca
  const [query, setQuery] = useState('')

  // Funzione per fare fetch dei prodotti dal backend, filtrando per query
  const fetchProducts = (query) => {
    // Se la query è vuota o solo spazi, svuota i prodotti e ritorna
    if(query.trim() == ''){
      setProducts([])
      return
    }

    // Effettua una fetch all'API locale con il parametro di ricerca
    fetch(`http://localhost:5001/products?search=${query}`)
      .then(response => response.json())      // Converte la risposta in JSON
      .then(data => setProducts(data))        // Aggiorna lo stato dei prodotti
      .catch(error => console.error(error))   // Stampa eventuali errori
    console.log('API')                        // Log per debug: mostra quando viene fatta la richiesta
  }

  // Crea una versione "debounced" della fetchProducts
  // Questo significa che fetchProducts verrà chiamata solo dopo 500ms senza nuove digitazioni
  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500), // Applichiamo debounce con 500ms
    [] // Usiamo useCallback per memorizzare la funzione una sola volta
  )

  // Effetto che reagisce ogni volta che `query` cambia
  useEffect(() => {
    // Chiama la funzione "debounced", evitando chiamate API troppo frequenti
    debouncedFetchProducts(query)
  }, [query]) // Dipendenza: ogni volta che `query` cambia, viene richiamata la funzione

  // JSX che rappresenta l’interfaccia
  return (
    <>
      <div>
        <h3>Ricerca</h3>
        {/* Input per digitare la ricerca. Il valore è collegato allo stato `query`. */}
        <input type="text"
          placeholder='Che prodotto stai cercando?'
          value={query}
          // Ogni cambiamento aggiorna lo stato `query`, causando il trigger dell'useEffect
          onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div>
        <h3>Lista prodotti</h3>
        <ul>
          {/* Cicla sull’array dei prodotti e crea un <li> per ognuno */}
          {products.map(p => {
            return (
              <li key={p.id}>
                <p><strong>{p.name}</strong></p>
                <img src={p.image} alt={p.name} />
                <p>{p.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

// Esportiamo il componente App per poterlo usare altrove
export default App
