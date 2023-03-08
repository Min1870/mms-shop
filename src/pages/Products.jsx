import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import Spinner from '../components/Spinner/Spinner';
import { useStateContext } from '../context/StateContext'

const Products = () => {

    const {state: {products}} = useStateContext();
    
    

  return (
    <div className='flex flex-wrap gap-10 justify-center my-10'>
        {products.length > 0 ?  products?.map(product => <Card key={product.id} product={product}/>) : <Spinner/>}
    </div>
  )
}

export default Products;
