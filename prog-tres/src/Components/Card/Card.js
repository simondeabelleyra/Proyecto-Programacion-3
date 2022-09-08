import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        // console.log(this.props);
        return (
            <article className='movie-card'>

                <img src={`https://image.tmdb.org/t/p/w500/${this.props.datosPelicula.poster_path}`} alt="" />
                <h2>{this.props.datosPelicula.title}</h2> {/* Nombre */}
                <Link to={`/detallePelicula/id/${this.props.datosPelicula.id}`}>
                    <a> Ir a detalles </a>  
                    </Link>
              

                <p className='more'>Ver más</p>
                

            </article>

        )
    }

}

export default Card