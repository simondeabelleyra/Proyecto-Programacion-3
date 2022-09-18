import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './card.css'

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            more: false,
            iconoFav: 'fa-regular fa-heart'
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
                iconoFav: 'fa-solid fa-heart'
            });
        } 
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
                iconoFav: 'fa-regular fa-heart'
            });
        } else {
            favoritos.push(id);
            this.setState({
                iconoFav: 'fa-solid fa-heart'
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
                <Link to={`/detallePelicula/id/${this.props.datosPelicula.id}`}>
                    <img alt={`Foto de ${this.props.datosPelicula.title}`} src={`https://image.tmdb.org/t/p/w500/${this.props.datosPelicula.poster_path}`} />
                </Link>
                <div className='card-favdiv'>
                <h2>{this.props.datosPelicula.title}</h2> {/* Nombre */}
                <i className={this.state.iconoFav} onClick={() => this.modificarFavoritos(this.props.datosPelicula.id)}></i>
                </div>
                    <Link to={`/detallePelicula/id/${this.props.datosPelicula.id}`}>
                        <p> Ir a detalles </p>
                    </Link>
                    
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