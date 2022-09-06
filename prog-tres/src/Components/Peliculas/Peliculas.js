import React, { Component } from 'react';

class Peliculas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            props: props
        };
    };

    render(){
        return(
            <React.Fragment>
                <h1>Hola 3</h1>
            </React.Fragment>
        )
    }
}

export default Peliculas;