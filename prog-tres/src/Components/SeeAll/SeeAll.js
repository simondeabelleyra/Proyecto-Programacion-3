import React, { Component } from 'react';
import CardPopular from '../CardPopular/CardPopular';
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
            valor: ''
        };
    };

    filter(event) {
        event.preventDefault();
        this.setState({
            /* popularMovies: this.state.popularMovies.filter(pelicula =>
                    this.state.valor.toLowerCase().includes(pelicula.title.toLowerCase())
                ) */
            popularMovies: this.state.popularMovies.filter(pelicula => 
                    pelicula.title != undefined ?
                    pelicula.title.toLowerCase().includes(this.state.valor):
                    console.log(pelicula.title)
                )
        })
    }

    controlarCambios(event){
        event.target.value === '' ?
        window.location.reload() :
        this.setState({
            valor: event.target.value
        },
        () => console.log(event.target.value))
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
        /* fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`) */
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                popularMovies: data.results,
                moreMovies: data.results,
                page: this.state.page + 1

            }))
            .catch(error => console.log(error));


    }

    render() {
        console.log(this.state.popularMovies.map(pelicula => pelicula.title))
        return (

            <React.Fragment>
                <div className="buscador-home">
                    <h2>Filtro:</h2>
                    <form onSubmit={(event) => this.filter(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />

                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>
                
                <h2 className='title-home'>Popular movies</h2>
                
                <section className='cardContainer'>
                    {this.state.popularMovies.map((oneMovie,idx)=><CardPopular key={oneMovie+idx} upcomingData={oneMovie}/>)}
                </section>
                <div className='div-vermas'>
                <button className='load-more' onClick={() => this.verMas()}>Load More</button>
                </div>

            </React.Fragment>
        )
    }
}

export default SeeAll;