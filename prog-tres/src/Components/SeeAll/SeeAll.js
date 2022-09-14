import React, { Component } from 'react';
import CardPopular from '../CardPopular/CardPopular';

class SeeAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            page: 1,
            popularMovies: [],
            moreMovies: [],
            mensaje: '',
            resultadosDeBusuqeda: []
            
        };
    };

   buscadorP(event) {
        event.preventDefault()
        fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.valor}&api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    resultadosDeBusuqeda: data.results
                });
                if (data.results.length === 0) {
                    this.setState({
                        mensaje: 'No se enontraron resultados'
                    })

                }

            })
            .catch(error => console.log(error))

    }

    controlarCambios(event) {
        this.setState(
            {
                valor: event.target.value,
                mensaje: ''
            },
            () => console.log(event.target.value))
    }


    verMas() {
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                popularMovies: data.results.concat(this.state.popularMovies),
                moreMovies: data.results.concat(this.state.moreMovies)

            }))
            .catch(error => console.log(error));
        this.setState({ page: this.state.page + 1 })

    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                popularMovies: data.results,
                moreMovies: data.results,
                page: this.state.page + 1

            }))
            .catch(error => console.log(error));


    }

    render() {
        return (


            <React.Fragment>
                <div className="buscador-home">
                    <h2>Busca acá:</h2>
                    <form onSubmit={(event) => this.buscadorP(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />

                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>
                <h1>Popular movies</h1>
                <button onClick={() => this.verMas()}>Load More</button>
                <section>
                    {this.state.popularMovies.map((oneMovie,idx)=><CardPopular key={oneMovie+idx} upcomingData={oneMovie}/>)}
                </section>

            </React.Fragment>
        )
    }
}

export default SeeAll;