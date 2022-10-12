import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Announcements from '../components/Announcements';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

interface FilterProps {
  color: string;
  size: string;
}

const ProductList = () => {
  const location = useLocation();

  const category = location.pathname.split('/')[2];

  const [filters, setFilters] = useState<FilterProps>({
    color: '',
    size: '',
  });

  const [sort, setSort] = useState('newest');

  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <Container>
      <Announcements />
      <NavBar />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select defaultValue={'Color'} onChange={handleFilters} name="color">
            <Oprtion>White</Oprtion>
            <Oprtion>Black</Oprtion>
            <Oprtion>Red</Oprtion>
            <Oprtion>Blue</Oprtion>
            <Oprtion>Yellow</Oprtion>
            <Oprtion>Green</Oprtion>
          </Select>
          <Select defaultValue={'Size'} onChange={handleFilters} name="size">
            <Oprtion disabled>Size</Oprtion>
            <Oprtion>XS</Oprtion>
            <Oprtion>S</Oprtion>
            <Oprtion>M</Oprtion>
            <Oprtion>L</Oprtion>
            <Oprtion>XL</Oprtion>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select defaultValue={'Newest'} onChange={handleSort} name="sort">
            <Oprtion value={'newest'}>Newest</Oprtion>
            <Oprtion value={'asc'}>Price (asc)</Oprtion>
            <Oprtion value={'dece'}>Price (dece)</Oprtion>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort}/>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductList;

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  text-transform: capitalize;
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
