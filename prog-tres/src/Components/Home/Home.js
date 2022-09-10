import React, { Component } from 'react';
import Card from '../Card/Card';
import './home.css'
import Buscador from '../Buscador/Buscador';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            peliculas: [],
            peliculasIniciales: []
        };
    };

    componentDidMount() {
        //BUscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: data.results,
                peliculasIniciales: data.results,

            }))
            .catch()
    }

    buscarPeliculas(peliculaBuscada) {
        let peliculasFiltradas = this.state.peliculasIniciales.filter(pelicula => pelicula.title.toLowerCase().includes(peliculaBuscada.toLowerCase()));
        this.setState({
            peliculas: peliculasFiltradas,
        })
    }


    render() {

        return (
            <React.Fragment>

                <Buscador buscarPeliculas={(peliculaBuscada) => this.buscarPeliculas(peliculaBuscada)} />

                <h2 className="title-home">Más populares</h2>
                <section className='cardContainer'>
                    {
                        this.state.peliculas.map((unaPelicula, idx) => <Card key={unaPelicula.name + idx} datosPelicula={unaPelicula} />)
                    }
                </section>
            </React.Fragment>
        )
    }

}

export default Home;