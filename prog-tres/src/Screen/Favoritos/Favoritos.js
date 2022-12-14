import React, { Component } from 'react';
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

        if (JSON.parse(recuperoStorage).length === 0){
            this.setState({
                loader: false
            })
        }
        
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
                    <img src='../../images/loader.gif' alt="Loader" /> :
                    <React.Fragment>
                        <h2 className="titulos">Favoritos</h2>
                        <section className='cardContainer'>

                            {this.state.peliculas.length > 0 ?
                                this.state.peliculas.map((unaPelicula, idx) =>
                                    <article className='movie-card' key={idx}>
                                        <Link to={`/detallePelicula/id/${unaPelicula.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${unaPelicula.poster_path}`} alt="" />
                                        </Link>
                                        <div className='card-favdiv'>
                                        <h2>{unaPelicula.title}</h2> {/* Nombre */}
                                        <i className="fa-solid fa-heart" onClick={() => {
                                            this.state.borrar.push(unaPelicula.id);
                                            this.setState({
                                                peliculas: this.state.peliculas.filter(pelicula =>
                                                    !this.state.borrar.includes(pelicula.id)
                                                )
                                            });
                                            this.borrar(unaPelicula.id)
                                        }}
                                        ></i>
                                        </div>
                                        <Link to={`/detallePelicula/id/${unaPelicula.id}`}>
                                            <p> Ir a detalles </p>
                                        </Link>
                                        
                                        <p className='more'>Ver m??s</p>

                                    </article>

                                )
                                :
                                <h3>Todav??a no elegiste ning??n favorito!</h3>

                            }
                        </section>
                    </React.Fragment>}
            </main>
        )
    }
}

export default Favoritos;