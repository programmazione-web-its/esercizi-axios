import { useState, useEffect } from 'react'

import axios from 'axios'

export default function ProductDetail({ id }) {
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`)
        setProduct(data)
      } catch (error) {
        if (error.response) {
          setError(`${error.response.status} - ${error.response.data}`)
        } else if (error.request) {
          setError('Server non risponde')
        } else {
          setError('something went wrong')
        }
      }
    }

    getProduct()
  }, [id])

  if (error) return <p>{error}</p>
  if (!product) return <p>Caricamento...</p>

  return <h2>{product.title}</h2>
}
