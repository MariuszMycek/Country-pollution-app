import React from 'react';

import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import MainApp from '../components/MainApp';

const Home = () => (
  <div>
    <Container fixed>
      <Header />
      <MainApp />
    </Container>
  </div>
);

export default Home;
