import { useEffect, useState } from "react"
import axios from 'axios'

import ProductItem from "./ProductItem"

// const fetchProductsWithAPIFetch = async () => {
//   const url = 'https://dummyjson.com/products'

//   const response = await fetch(url)

//   return (await response).json()
// }

const fetchProductsWithAxios = async () => {
  const url = 'https://dummyjson.com/products'

  const response = await axios.get(url)

  return response.data
}

const ProductList = () => {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    // Se ejecuta este useEffect la primera vez

    // fetchProductsWithAPIFetch()
    fetchProductsWithAxios()
      .then(data => setProductList(data.products))
  }, [])

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* TODO: Listar los nombres de los productos desde el estado productList */}

      {productList.map(product => (
        <ProductItem
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          thumbnail={product.thumbnail}
        />
      ))}

      {/* <pre>{JSON.stringify(productList, null, 2)}</pre> */}
    </section>
  )
}

export default ProductList