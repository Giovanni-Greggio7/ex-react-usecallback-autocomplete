import { useState, useMemo, useCallback, useEffect } from 'react'

function App() {

  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

  function debounce(callback, delay){
    let timer
    return ((value) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback(value)
      }, delay)
    })
  }

  const fetchProducts = useCallback(debounce((query) => {
    fetch(`http://localhost:5001/products?search=${query}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
      console.log(query)
  }, 300), [])

  console.log(query)

  useEffect(() => {
    if(query.trim() == ''){
      setProducts([])
      return
    }
    fetchProducts(query)
  }, [query])

  return (
    <>
      <div>
        <h3>Ricerca</h3>
        <input type="text"
          placeholder='Che prodotto stai cercando?'
          value={query}
          onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div>
        <h3>Lista prodotti</h3>
        <ul>
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

export default App
