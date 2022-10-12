import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';

interface ProductsProps {
  category?: string;
  filters?: object;
  sort?: string;
}

const Products = (props: ProductsProps) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          props.category 
          ? `http://localhost:5000/api/products?category=${props.category}`
          : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props.category]);

  console.log(products)

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
