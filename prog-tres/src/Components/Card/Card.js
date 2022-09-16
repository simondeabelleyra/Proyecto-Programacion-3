import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mensaje: 'Agregar a favoritos',
            more: false
        }
    }

    componentDidMount(){
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray;
        };

        if(favoritos.includes(this.props.datosPelicula.id)){
            this.setState({
                mensaje: 'Quitar de favoritos'
            });
        };
    }

    modificarFavoritos(id){
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if(recuperoStorage !== null){
            favoritos = JSON.parse(recuperoStorage);
        };

        if(favoritos.includes(id)){
            let sacarFav = favoritos.indexOf(id);
            favoritos.splice(sacarFav, 1);

            this.setState({
                mensaje: 'Agregar a favoritos'
            });
        } else {
            favoritos.push(id);
            this.setState({
                mensaje: 'Quitar de favoritos'
            })
        }

        let favoritosToString = JSON.stringify(favoritos);
        localStorage.setItem('favoritos', favoritosToString);

        console.log(localStorage);
    }

    toggleMas(){
        this.state.more === false ?
        this.setState({
            more: true
        })
        :
        this.setState({
            more: false
        })
    }

    render() {
        return (
            <article className='movie-card'>

                <img src={`https://image.tmdb.org/t/p/w500/${this.props.datosPelicula.poster_path}`} alt="" />
                <h2>{this.props.datosPelicula.title}</h2> {/* Nombre */}
                <Link to={`/detallePelicula/id/${this.props.datosPelicula.id}`}>
                    <a> Ir a detalles </a>  
                </Link>
                <p className="boton" onClick={() => this.modificarFavoritos(this.props.datosPelicula.id)}>{this.state.mensaje}</p>
                {this.state.more === true ?
                <React.Fragment>
                    <p>{this.props.datosPelicula.overview}</p>
                    <p className='more' onClick={() => this.toggleMas()}>Ver menos</p>
                    </React.Fragment>
                :
                <p className='more' onClick={() => this.toggleMas()}>Ver más</p>
                }

            </article>

        )
    }

}

export default Card