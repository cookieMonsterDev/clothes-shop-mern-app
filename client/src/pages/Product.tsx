import { Add, Remove } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Announcements from '../components/Announcements';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import NewsLetter from '../components/NewsLetter';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods'

interface FilterProps {
  theColor?: string;
}

interface ProductProps {
  id?: string;
  title?: string;
  disc?: string; 
  img?: string;
  categories?: string[];
  size?: string;
  color?: string;
  price?: number;
}

const Product = () => {
  const [product, setProduct] = useState<ProductProps>({});
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (dir: string) => {
    if (dir === 'dec' && quantity !== 1) {
      setQuantity(quantity => quantity - 1)
    }

    if(dir === 'inc') {
      setQuantity(quantity => quantity + 1)
    }
  }


  const productId = location.pathname.split('/')[2];

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await publicRequest.get(
          `products/${productId}`
        );
      setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProductData();
  }, [productId]);

  console.log(product);

  return (
    <Container>
      <Announcements />
      <NavBar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.disc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor theColor={product.color} />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')}/>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')}/>
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div<FilterProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ theColor }) => theColor};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 20px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
