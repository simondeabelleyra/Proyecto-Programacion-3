import React, { Component } from 'react';
import Card from '../../Components/Card/Card';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            peliculas: [],
            valor: '',
            resultadosDeBusqueda: [],
            peliculasEnCartel: [],
            mensaje: '',
            loader: true
        };
    };

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: data.results,
                loader: false
            }))
            .catch(err => console.log(err))

        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then(response => response.json())
            .then(data => this.setState({
                peliculasEnCartel: data.results,
                loader: false

            }))
            .catch(error => console.log(error));
    }



    buscadorP(event) {
        event.preventDefault();
        if (this.state.valor === '') {
            this.setState({
                mensaje: 'No has escrito nada'
            })
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.valor}&api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        resultadosDeBusqueda: data.results
                    });
                    if (data.results.length === 0) {
                        this.setState({
                            mensaje: 'No se enontraron resultados'
                        })

                    }

                })
                .catch(error => console.log(error))

        }
    }

    controlarCambios(event) {
        this.setState(
            {
                valor: event.target.value,
                mensaje: '',
                resultadosDeBusqueda: []
            },
            () => console.log(event.target.value));
    }


    render() {
        console.log(localStorage)
        return (
            <main>
                <div className="buscador-home">
                    <h2>Busca acá:</h2>
                    <form onSubmit={(event) => this.buscadorP(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>

                {this.state.loader === true ?
                    <img src='../../images/loader.gif' alt="Loader"/>  :
                    <React.Fragment>
                        <section className='cardContainer'>
                            {this.state.resultadosDeBusqueda.map((peliculaBuscada, idx) => <Card key={peliculaBuscada.title + idx} datosPelicula={peliculaBuscada} />)}
                        </section>

                        <div className='title-seeall'>
                            <h2 className="title-condiv">Más populares</h2>
                            <Link to='/populares'>
                                <i className='fa-solid fa-plus'></i> ver todas
                            </Link>
                        </div>
                        <section className='cardContainer'>
                            {
                                this.state.peliculas.map((unaPelicula, idx) => <Card key={unaPelicula.title + idx} datosPelicula={unaPelicula} />)
                            }
                        </section >
                        
                        <div className='title-seeall'>
                            <h2 className="title-home">Estrenos</h2>
                            <Link to='/estrenos'>
                                <i className='fa-solid fa-plus'></i> ver todas
                            </Link>
                        </div>
                        <section className='cardContainer'>
                            {this.state.peliculasEnCartel.map((unaPeliculaC, idx) => <Card key={unaPeliculaC.title + idx} datosPelicula={unaPeliculaC} />)}
                        </section>
                    </React.Fragment>
                }

            </main>
        )
    }

}

export default Home;