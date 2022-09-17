import React, { Component } from 'react';
import Card from '../Card/Card';
import './seeAll.css'

class SeeAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            page: 1,
            popularMovies: [],
            mensaje: '',
            resultadosDeBusuqeda: [],
            valor: '',
            loader: true
        };
    };

    filter(event) {
        event.preventDefault();

        let peliculasFiltradas = this.state.resultadosDeBusuqeda.filter(pelicula => pelicula.title.toLowerCase().includes(this.state.valor.toLowerCase()));
        this.setState({
            peliculas: peliculasFiltradas,
        })
        
    }

    controlarCambios(event) {


        this.setState({
            valor: event.target.value
        },
            () => console.log(event.target.value))
        let peliculasFiltradas = this.state.resultadosDeBusuqeda.filter(pelicula => pelicula.title.toLowerCase().includes(this.state.valor.toLowerCase()));
        this.setState({
            peliculas: peliculasFiltradas,
        })
    }

    verMas() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                popularMovies: this.state.popularMovies.concat(data.results)

            }))
            .catch(error => console.log(error));
        this.setState({ page: this.state.page + 1 })

    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                popularMovies: data.results,
                moreMovies: data.results,
                page: this.state.page + 1,
                loader: false
            }))
            .catch(error => console.log(error));


    }

    render() {
        return (
            <main>
                <div className="buscador-home">
                    <h2>Filtro:</h2>
                    <form onSubmit={(event) => this.filter(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        <button type='submit'><i className="fa-solid fa-filter"></i></button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>
                {this.state.loader === true ?
                    <img src='../../images/loader.gif' /> :
                    <React.Fragment>
                        <h2 className='title-home'>Popular movies</h2>

                        <section className='cardContainer'>
                            {this.state.popularMovies.map((oneMovie, idx) => <Card key={oneMovie + idx} datosPelicula={oneMovie} />)}
                        </section>
                        <div className='div-vermas'>
                            <button className='load-more' onClick={() => this.verMas()}>Load More</button>
                        </div>
                    </React.Fragment>
                }
            </main>
        )
    }
}

export default SeeAll;