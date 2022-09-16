import React, { Component } from 'react';
import Card from '../Card/Card';
import './estrenos.css';

class Peliculas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            page: 1,
            peliculasEnCartel: [],
            valor: '',
            mensaje: '',
            loader: true,
        };
    };


    filter(event) {
        event.preventDefault();
        this.setState({
            peliculasEnCartel: this.state.peliculasEnCartel.filter(pelicula => 
                    pelicula.title != undefined ?
                    pelicula.title.toLowerCase().includes(this.state.valor):
                    console.log(pelicula.title)
                )
        })
    }

    controlarCambios(event){
        event.target.value === '' ?
        this.componentDidMount() :
        this.setState({
            valor: event.target.value
        },
        () => console.log(event.target.value))
    }


    verMas() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`) 
            .then(response => response.json())
            .then(data => this.setState({
                peliculasEnCartel: this.state.peliculasEnCartel.concat(data.results)

            }))
            .catch(error => console.log(error));
        this.setState({ page: this.state.page + 1 })

    }


    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`)
        .then(response => response.json())
        .then(data => this.setState({
            peliculasEnCartel: data.results,
            moreMovies: data.results,
            page: this.state.page + 1,
            loader: false
        }))
        .catch(error => console.log(error));

}

    render(){
        return(
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
                        <h2 className='title-home'>Peliculas en cartel</h2>

                        <section className='cardContainer'>
                            {this.state.peliculasEnCartel.map((oneMovie, idx) => <Card key={oneMovie + idx} datosPelicula={oneMovie} />)},
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

export default Peliculas;