import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './detail.css'

class Detalle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            props: props,
            id: Number(props.match.params.id),
            datosPelicula: [],
            genres: '',
            companies: {},
            country: {},
            mensaje: 'Agregar a favoritos',
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
            .then(res => res.json())
            .then(data => this.setState({
                datosPelicula: data,
                genres: data.genres[0].name,
                companies: data.production_companies[0],
                country: data.production_countries[0]
            }))

        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if (recuperoStorage !== null) {
            favoritos = JSON.parse(recuperoStorage);
        };

        if (favoritos.includes(this.state.id)) {
            this.setState({
                mensaje: 'Quitar de favoritos'
            });
        };
    }

    modificarFavoritos(id){
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray;
        }
        if(favoritos.includes(id)){
            let sacarFav = favoritos.indexOf(id);
            favoritos.splice(sacarFav, 1);
            this.setState({
                mensaje: 'Agregar a favoritos'
            })
        } else {
            favoritos.push(id);
            this.setState({
                mensaje: 'Quitar de favoritos'
            })
        }

        let favoritosToString = JSON.stringify(favoritos);
        localStorage.setItem('favoritos', favoritosToString);

        console.log(localStorage)
    }


    render() {
        return (
            
            <article className='detail-card'>

                <img src={`https://image.tmdb.org/t/p/w500/${this.state.datosPelicula.poster_path}`} alt="" />
                <div>
                    <h2 className="title-detail">{this.state.datosPelicula.title}</h2>
                    <p>{this.state.datosPelicula.overview}</p>
                    <p>Fecha de estreno (AA-MM-DD): {this.state.datosPelicula.release_date}</p>
                    <p>Califiación: {Math.round(this.state.datosPelicula.vote_average * 100) / 100}</p>
                    <p>Duración: {this.state.datosPelicula.runtime} minutos</p>
                    <p>Generos: {this.state.genres}</p>
                    <p>Producción: {this.state.companies.name}</p>
                    <p>País de producción: {this.state.country.name}</p>
                    <p className="boton" onClick={()=>this.modificarFavoritos(this.state.id)}>{this.state.mensaje}</p>
                </div>

            </article>

        )
    }
    
}

export default Detalle;