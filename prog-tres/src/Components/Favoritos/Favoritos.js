import React, { Component } from 'react';

class Favoritos extends Component{
    constructor(props) {
        super(props);
        this.state = {
            props: props
        };
    };

    render(){
        return(
            <React.Fragment>
                <h1>Hola 2</h1>
            </React.Fragment>
        )
    }
}

export default Favoritos;