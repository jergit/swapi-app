import React, { Component } from "react";
import {ListGroup, Row, Col, Form, FormGroup, Checkbox} from "react-bootstrap";
import logo from './static/images/star_wars_logo.jpeg';
import LoadingModal from './LoadingModal'

const axios = require('axios');


class NameList extends Component {
  constructor(){
    super();
    this.state = {
      allCharacterList : [],
      searchValue: '',
      filteredCharacterList: [],
      movieCharacters: [],
      loading: true
    }
  }
  componentDidMount(){
     this.getCharacters('https://swapi.co/api/people/');
     this.getMovieCharactersForMovie('https://swapi.co/api/films/3/')
  }

  getMovieCharacterName = async (apiURL) => {
    let movieCharacterNames = this.state.movieCharacters
    try {
      await axios.get(apiURL).then((response) => {
        movieCharacterNames.push(response.data.name)  
        this.setState({movieCharacters:movieCharacterNames})
        console.log(this.state.movieCharacters)
      });
    } catch (error) {
      console.error(error);
    }

  }

  getMovieCharactersForMovie = async (apiURL) => {
    try {
      await axios.get(apiURL).then((response) => {
        for (let i = 0; i < response.data.characters.length; i++) {
          this.getMovieCharacterName(response.data.characters[i])
        }
      });
    } catch (error) {
      console.error(error);
    }

  }

  filterForMovie = (event) => {
    if(event.target.checked){
      this.setState({filteredCharacterList: this.state.movieCharacters});
    }
    else{
      this.setState({filteredCharacterList: this.state.allCharacterList});
    }
  }


  getAllCharacters = (data) => {
    let characterNames = [...this.state.allCharacterList]
      for (let i = 0; i < data.results.length; i++) {
       characterNames.push(data.results[i].name)  
       let sortedNames = characterNames.sort();
       this.setState({allCharacterList: sortedNames, filteredCharacterList: sortedNames}) 
        }
      if (data.next) {
        this.getCharacters(data.next);
      } else {
        this.setState({loading: false})
      }
  }

  getCharacters = async (apiURL) => {
    try {
      await axios.get(apiURL).then((response) => {
         this.getAllCharacters(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }

  filterList = (event) => {
      const search = event.target.value.toLowerCase();
      this.setState({
          searchValue: search,
          filteredCharacterList: this.state.allCharacterList.filter((item) => item.toLowerCase().includes(search)
          )
      });
  }
  
  render() {
    if (this.state.loading) return <LoadingModal></LoadingModal>;
    return (
        <div>
          <Row>
            <Col xs={{offset:2, span:8}} sm={{offset:2, span:8}} md={{offset:4, span:4}} lg={{offset:5, span:4}} >
              <img src={logo} className="App-logo" alt="Star Wars Logo"></img>
            </Col>
          </Row>
            <Row>
                <Col xs={{offset:2, span:8}} sm={{offset:2, span:8}} md={{offset:4, span:4}} lg={{offset:4, span:4}}>
                    <Form>
                        <Form.Group controlId="formSearch">
                          <Form.Control type="text" placeholder="Search" onChange={this.filterList} />
                        </Form.Group>
                        <Form.Group controlId="formFilterESB">
                          <Form.Label style={styles.label}>Filter By Movie</Form.Label>
                            <Form.Check type="checkbox" onChange={this.filterForMovie} style={styles.label} label="Return of the Jedi"></Form.Check>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={{offset:2, span:8}} sm={{offset:2, span:8}} md={{offset:4, span:4}} lg={{offset:4, span: 4}}>
                    <ListGroup>
                    {this.state.filteredCharacterList.map(person => {
                        return (<ListGroup.Item key={person} style={styles.list}>{person}</ListGroup.Item>);
                    })}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
            }
}


const styles = {
  list:{
    color:'#808080'
  },
  label:{
    color:'#FFE81F'
  }
}

export default NameList;