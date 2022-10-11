import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';

interface ProductsProps {
  category?: string;
  filters?: object; 
  sort?: string;
}

const Products = (props: ProductsProps) => {
  
  const [products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
     const a = await fetch(`http://localhost:5000/api/products?category=${props.category}`);
     const at = await a.json();
     console.log(at); 
     setProducts(at)
    } 

    fetchData()
  }, [props.category])

  return (
    <Container>
      {products.map((item: any, key) => (
        <Product {...item} key={key} />
      ))}
    </Container>
  );
};

export default Products;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
