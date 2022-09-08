import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './detail.css'

class Detalle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            props: props,
            id: props.match.params.id,
            datosPelicula: [],
            genres: '',
            companies: {},
            country: {}
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
            .then(res => res.json())
            .then(data => this.setState({
                datosPelicula: data,
                genres: data.genres[0].name,
                companies: data.production_companies[0],
                country: data.production_countries[0]
            }))
    }

    render() {
        return (
            
            <article className='detail-card'>

                <img src={`https://image.tmdb.org/t/p/w500/${this.state.datosPelicula.poster_path}`} alt="" />
                <div>
                <h2 className="title-detail">{this.state.datosPelicula.title}</h2> {/* Nombre */}
                <p>{this.state.datosPelicula.overview}</p>
                <p>Fecha de estreno (AA-MM-DD): {this.state.datosPelicula.release_date}</p>
                <p>Califiación: {Math.round(this.state.datosPelicula.vote_average * 100)/100}</p>
                <p>Duración: {this.state.datosPelicula.runtime} minutos</p>
                <p>Generos: {this.state.genres}</p>
                <p>Producción: {this.state.companies.name}</p>
                <p>País de producción: {this.state.country.name}</p>
                
                </div>

            </article>

        )
    }
    
}

export default Detalle;