import { useState, useEffect } from 'react'
import axios from 'axios'

import ProductDetail from './ProductDetail'

export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!query) return

    const search = async () => {
      const { data } = await axios.get(
        'https://dummyjson.com/products/search',
        {
          params: {
            q: query,
            limit: 5,
            select: 'title, price',
          },
        },
      )

      setResults(data.products)
    }

    search()
  }, [query])

  return (
    <>
      <input
        className='border w-1/2'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className='my-10 list-disc'>
        {results.map((product) => (
          <li key={product.id}>
            <ProductDetail id={product.id} />
          </li>
        ))}
      </ul>
    </>
  )
}
