import React from 'react';
import './App.css';
import NameList from './NameList';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


function App() {

  const styles = {
    container: {
      maxWidth: 'none',
      marginLeft: '0px',
      paddingLeft: '0px',
    },

}
  return (
    <Container style={styles.container} fluid={true}>
          <NameList></NameList>
    </Container>
  );
}

export default App;
