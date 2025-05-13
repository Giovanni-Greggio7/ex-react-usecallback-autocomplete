import { useState, useMemo, useCallback, useEffect } from 'react'

function App() {

  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')


  const fetchProducts = (query) => {
    fetch(`http://localhost:5001/products?search=${query}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  }

  console.log(products)

  useEffect(() => {
    fetchProducts(query)
  }, [query])

  const filterProducts = useMemo(() => {
    const lowerSearch = query.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(lowerSearch) ||
      p.description.toLowerCase().includes(lowerSearch))
  }, [products, query])

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
        {filterProducts.map(p => {
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
