import React, { Component } from "react";

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = { valor: "" };
    };

    evitarSubmit(event){
        event.preventDefault()
    }
    controlarCambio(event){
        this.setState({
            valor: event.target.value
        }, ()=>this.props.buscarPeliculas(this.state.valor))
    }

    render() {
        return (
            <form action="" onSubmit={(event) => this.evitarSubmit(event)}>
                <input className="buscador" type="text" onChange={(event) => this.controlarCambio(event)} value={this.state.valor} />
            </form>
        )
    }


}

export default Buscador;