import React, { Component } from "react";
import {Row, Col} from "react-bootstrap";
import Loader from 'react-loader-spinner';


class LoadingModal extends Component {
    render(){
        const styles = {
            backgroundColor: '#000',
            position: 'fixed',
            width: '100%',
            height: '100%',
            paddingLeft: '45%',
            paddingTop: '15%'
        }
        return (
            <Row>
                <Col>
                    <Loader 
                    style={styles}
                    type="ThreeDots" 
                    color="#FFE81F"
                    height={100}
                    width={100}
                    />
                </Col>
            </Row>
        );
    }

}
 export default LoadingModal;