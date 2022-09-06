import React, { Component } from 'react';
import Card from '../Card/Card';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            personajes:[]
        };
    };

    componentDidMount(){
        //BUscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then( res => res.json())
            .then( data => this.setState({
                personajes: data.results,
                
            }))
            .catch()
    }

    render(){
        
        return(
            <React.Fragment>
                
                <section className='cardContainer'>
                    { 
                        this.state.personajes.map( (unaPelicula, idx) => <Card key={unaPelicula.name+idx} datosPelicula={unaPelicula} />)
                    }
                </section>
            </React.Fragment>
        )
    }

}

export default Home;