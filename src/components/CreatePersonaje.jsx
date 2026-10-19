import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import ServiceSeries from '../services/ServiceSeries';

export default class CreatePersonaje extends Component {
    service = new ServiceSeries();

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSerie = React.createRef();

    state = {
        series: [],
        status: false,
        idserie: null,
        mensaje: null
    }

    componentDidMount() {
        this.service.getSeries().then((result) => {
            this.setState({
                series: result
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se han podido cargar las series"
            })
        })
    }

    insertPersonaje = (event) => {
        event.preventDefault();

        let personaje = {
            idPersonaje: 0,
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value)
        };

        this.service.insertPersonaje(personaje).then(() => {
            this.setState({
                status: true,
                idserie: personaje.idSerie
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se ha podido insertar el personaje"
            })
        })
    }

    render() {
        if (this.state.status === true) {
            return (
                <Navigate
                    to={"/personajes/" + this.state.idserie}
                />
            );
        }

        return (
            <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-md">
                <h1 className="mb-6 text-3xl font-bold text-blue-700">
                    Nuevo personaje
                </h1>

                {
                    this.state.mensaje &&
                    <p className="mb-4 text-red-600">
                        {this.state.mensaje}
                    </p>
                }

                <form onSubmit={this.insertPersonaje}>
                    <label
                        htmlFor="nombre"
                        className="mb-2 block font-semibold"
                    >
                        Nombre:
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        ref={this.cajaNombre}
                        className="mb-5 w-full rounded-lg border border-slate-300 px-3 py-2"
                        required
                    />

                    <label
                        htmlFor="imagen"
                        className="mb-2 block font-semibold"
                    >
                        Imagen:
                    </label>

                    <input
                        id="imagen"
                        type="url"
                        ref={this.cajaImagen}
                        className="mb-5 w-full rounded-lg border border-slate-300 px-3 py-2"
                        required
                    />

                    <label
                        htmlFor="serie"
                        className="mb-2 block font-semibold"
                    >
                        Serie:
                    </label>

                    <select
                        id="serie"
                        ref={this.selectSerie}
                        defaultValue=""
                        className="mb-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                        required
                    >
                        <option value="" disabled>
                            Selecciona una serie
                        </option>

                        {
                            this.state.series.map((serie) => {
                                return (
                                    <option
                                        key={serie.idSerie}
                                        value={serie.idSerie}
                                    >
                                        {serie.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <button
                        type="submit"
                        className="block bg-green-600 px-4 py-3 text-center font-semibold text-white"
                    >
                        Insertar personaje
                    </button>
                </form>
            </div>
        )
    }
}