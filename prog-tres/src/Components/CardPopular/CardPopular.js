import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CardPopular extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mensaje: 'Agregar a favoritos'
        }
    }

    componentDidMount(){
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos');

        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray;
        };

        if(favoritos.includes(this.props.upcomingData.id)){
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


    render() {
        // console.log(this.props);
        return (
            <article className='movie-card'>

                <img src={`https://image.tmdb.org/t/p/w500/${this.props.upcomingData.poster_path}`} alt="" />
                <h2>{this.props.upcomingData.title}</h2> {/* Nombre */}
                <Link to={`/detallePelicula/id/${this.props.upcomingData.id}`}>
                    <a> Ir a detalles </a>  
                </Link>
                <p className="boton" onClick={()=>this.modificarFavoritos(this.props.upcomingData.id)}>{this.state.mensaje}</p>
                <p className='more'>Ver más</p>
                

            </article>

        )
    }

}

export default CardPopular