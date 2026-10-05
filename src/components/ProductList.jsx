import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductList() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getProducs() {
      try {
        const { data } = await axios.get('https://dummyjson.com/products', {
          params: {
            limit: 10,
          },
        })

        console.log(data.products)
        setProducts(data.products)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    getProducs()
  }, [])

  if (loading) return <p>Please wait...</p>

  if (error) {
    return <p>{error}</p>
  }

  return (
    <ul className='md:grid grid-cols-2 lg:grid-cols-4 gap-6'>
      {products.map((product) => (
        <li
          key={product.id}
          className='bg-slate-300 px-3 py-4 rounded-lg text-center'
        >
          <img src={product.thumbnail} alt={product.title} />
          {product.title} - {product.price} €
        </li>
      ))}
    </ul>
  )
}

export default ProductList
