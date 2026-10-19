import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceSeries from '../services/ServiceSeries';

export default class Serie extends Component {
    service = new ServiceSeries();

    state = {
        serie: null,
        status: false,
        mensaje: null
    }

    componentDidMount() {
        this.service.findSerie(this.props.idserie).then((result) => {
            this.setState({
                serie: result,
                status: true
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se ha podido cargar la serie",
                status: true
            })
        })
    }

    render() {
        if (this.state.status === false) {
            return <h2>Cargando serie...</h2>;
        }

        if (this.state.mensaje) {
            return (
                <p className="text-red-600">
                    {this.state.mensaje}
                </p>
            );
        }

        if (!this.state.serie) {
            return <p>No se ha encontrado la serie.</p>;
        }

        return (
            <div className="mx-auto max-w-md ">
                <img
                    src={this.state.serie.imagen}
                    alt={this.state.serie.nombre}
                    className="h-64 w-full object-cover"
                />

                <div className="p-6">
                    <h1 className="text-2xl font-bold">
                        {this.state.serie.nombre}
                    </h1>

                    <p className="mt-5 text-slate-600">
                        IMDB: {this.state.serie.puntuacion}
                    </p>
                </div>

                <NavLink
                    to={"/personajes/" + this.state.serie.idSerie}
                    className="block bg-green-600 px-4 py-3 text-center font-semibold text-white"
                >
                    Personajes
                </NavLink>
            </div>
        )
    }
}
