import React from 'react';
import styled from 'styled-components';

const Announcements = () => {
  return <Container>Some sales for 50% discont</Container>;
};

export default Announcements;

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;
