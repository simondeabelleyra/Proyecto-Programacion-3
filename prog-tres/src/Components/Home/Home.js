import React, { Component } from 'react';
import Card from '../Card/Card';
import './home.css'
import Buscador from '../Buscador/Buscador';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons' */

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            peliculas: [],
            peliculasIniciales: [],
            valor: '',
            peliculasT: []
        };
    };

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: data.results,
                peliculasIniciales: data.results
            }))
            .catch(err => console.log(err))
    }

    // buscarPeliculas(peliculaBuscada) {
    //     let peliculasFiltradas = this.state.peliculasIniciales.filter(pelicula => pelicula.title.toLowerCase().includes(peliculaBuscada.toLowerCase()));
    //     this.setState({
    //         peliculas: peliculasFiltradas,
    //     })
    // }

    buscadorP(event) {
        event.preventDefault()
        fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.valor}&api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
        .then(response => response.json())
        .then(data => this.setState({
            peliculas: data.results
        }))
        .catch(error => console.log(error))

    }

    controlarCambios(event){
        this.setState(
            {valor: event.target.value}, 
            ()=>console.log(event.target.value))
    }


    render() {
        return (
            <React.Fragment>

                {/* <Buscador buscarPeliculas={(peliculaBuscada) => this.buscarPeliculas(peliculaBuscada)} /> */}
                <div className="buscador-home">
                <h2>Busca acá:</h2>
                    <form onSubmit={(event) => this.buscadorP(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        {/* {<button type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} /> 
                        </button>} */}
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>           

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