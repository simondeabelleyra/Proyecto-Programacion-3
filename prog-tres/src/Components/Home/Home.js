import React, { Component } from 'react';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            props: props
        };
    };

    render(){
        return(
            <React.Fragment>
                <h1>Hola</h1>
            </React.Fragment>
        )
    }
}

export default Home;