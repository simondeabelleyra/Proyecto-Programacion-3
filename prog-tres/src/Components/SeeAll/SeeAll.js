import React, { Component } from 'react';

class SeeAll extends Component{
    constructor(props) {
        super(props);
        this.state = {
            props: props
        };
    };

    render(){
        return(
            <React.Fragment>
                <h1>Hola 4</h1>
            </React.Fragment>
        )
    }
}

export default SeeAll;