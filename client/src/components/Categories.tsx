import React from 'react';
import styled from 'styled-components';
import { categories } from '../data';
import CategoriesItem from './CategoriesItem';

const Categories = () => {
  return (
    <Container>
      {categories.map((item, key) => (
        <CategoriesItem {...item} key={key}/>
      ))}
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;
