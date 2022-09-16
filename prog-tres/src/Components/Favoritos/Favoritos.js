import React, { Component } from 'react';
import Card from '../Card/Card';
import './favoritos.css';
import { Link } from 'react-router-dom';

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            peliculas: [],
            borrar: [],
            loader: true
        };
    };


    componentDidMount() {
        let recuperoStorage = localStorage.getItem('favoritos');
        let favoritosToArray;

        if (recuperoStorage !== null) {
            favoritosToArray = JSON.parse(recuperoStorage);
            let peliculas = []
            
            for(let i = 0; i < favoritosToArray.length; i++){
                if(favoritosToArray[i] !== null){
                    fetch(`https://api.themoviedb.org/3/movie/${favoritosToArray[i]}?api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
                    .then(res => res.json())
                    .then(data => {
                        peliculas.push(data)
                        this.setState({
                            peliculas: peliculas,
                            loader: false
                        });
                    })
                    .catch(err => console.log(err))
                }
            }
            

        };
        
    }

    borrar(id){
        let recuperoStorage = localStorage.getItem('favoritos');
        let favoritosToArray = JSON.parse(recuperoStorage);

        let sacarFav = favoritosToArray.indexOf(id);
        favoritosToArray.splice(sacarFav, 1);

        let favoritosToString = JSON.stringify(favoritosToArray);
        localStorage.setItem('favoritos', favoritosToString);
    }

    render() {
        console.log(this.state.peliculas)
        return (
            <main>
                {this.state.loader === true ? 
                <img  src='../../images/loader.gif' /> :
                <React.Fragment>
                <h2 className="titulos">Favoritos</h2>
                <section className='cardContainer'>

                    {this.state.peliculas.length > 0 ?
                        this.state.peliculas.map((unaPelicula, idx) =>
                            <article className='movie-card' key={idx}>

                                <img src={`https://image.tmdb.org/t/p/w500/${unaPelicula.poster_path}`} alt="" />
                                <h2>{unaPelicula.title}</h2> {/* Nombre */}
                                <Link to={`/detallePelicula/id/${unaPelicula.id}`}>
                                    <a> Ir a detalles </a>
                                </Link>
                                <p className="delete" onClick={() => {
                                    this.state.borrar.push(unaPelicula.id);
                                    this.setState({
                                        peliculas: this.state.peliculas.filter(pelicula =>
                                            !this.state.borrar.includes(pelicula.id)
                                        )
                                    });
                                    this.borrar(unaPelicula.id)
                                }}
                                >Quitar de favoritos</p>
                                <p className='more'>Ver más</p>

                            </article>

                        )
                        :
                        <h3>Todavía no elegiste ningún favorito!</h3>

                    }
                </section>
                </React.Fragment>}
            </main>
        )
    }
}

export default Favoritos;