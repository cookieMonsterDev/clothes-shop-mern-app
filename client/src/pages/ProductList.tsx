import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcements from '../components/Announcements';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';

const ProductList = () => {
  return (
    <Container>
      <Announcements />
      <NavBar />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select>
            <Oprtion disabled selected>
              Color
            </Oprtion>
            <Oprtion>White</Oprtion>
            <Oprtion>Black</Oprtion>
            <Oprtion>Red</Oprtion>
            <Oprtion>Blue</Oprtion>
            <Oprtion>Yellow</Oprtion>
            <Oprtion>Green</Oprtion>
          </Select>
          <Select>
            <Oprtion disabled selected>
              Size
            </Oprtion>
            <Oprtion>XS</Oprtion>
            <Oprtion>S</Oprtion>
            <Oprtion>M</Oprtion>
            <Oprtion>L</Oprtion>
            <Oprtion>XL</Oprtion>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select>
            <Oprtion selected>Newest</Oprtion>
            <Oprtion>Price (asc)</Oprtion>
            <Oprtion>Price (dece)</Oprtion>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-weight: 600;
  font-size: 20px;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Oprtion = styled.option``;
