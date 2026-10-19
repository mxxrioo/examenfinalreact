import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import ServiceSeries from '../services/ServiceSeries';

export default class UpdatePersonaje extends Component {
    service = new ServiceSeries();

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    state = {
        series: [],
        personajes: [],
        serie: null,
        personaje: null,
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

        this.service.getPersonajes().then((result) => {
            this.setState({
                personajes: result
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se han podido cargar los personajes"
            })
        })
    }

    cambiarSerie = () => {
        let idSerie = parseInt(this.selectSerie.current.value);

        let serie = this.state.series.find((serie) => {
            return serie.idSerie === idSerie;
        });

        this.setState({
            serie: serie
        })
    }

    cambiarPersonaje = () => {
        let idPersonaje = parseInt(this.selectPersonaje.current.value);

        let personaje = this.state.personajes.find((personaje) => {
            return personaje.idPersonaje === idPersonaje;
        });

        this.setState({
            personaje: personaje
        })
    }

    updatePersonaje = (event) => {
        event.preventDefault();

        let idSerie = parseInt(this.selectSerie.current.value);
        let idPersonaje = parseInt(this.selectPersonaje.current.value);

        this.service.updatePersonaje(idPersonaje, idSerie)
            .then(() => {
                this.setState({
                    status: true,
                    idserie: idSerie
                })
            }).catch(() => {
                this.setState({
                    mensaje: "No se ha podido cambiar el personaje de serie"
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
                    Personajes y series
                </h1>

                {
                    this.state.mensaje &&
                    <p className="mb-4 text-red-600">
                        {this.state.mensaje}
                    </p>
                }

                <form onSubmit={this.updatePersonaje}>
                    <label
                        htmlFor="serie"
                        className="mb-2 block font-semibold"
                    >
                        Seleccione una serie:
                    </label>

                    <select
                        id="serie"
                        ref={this.selectSerie}
                        onChange={this.cambiarSerie}
                        defaultValue=""
                        className="mb-5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
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

                    <label
                        htmlFor="personaje"
                        className="mb-2 block font-semibold"
                    >
                        Seleccione un personaje:
                    </label>

                    <select
                        id="personaje"
                        ref={this.selectPersonaje}
                        onChange={this.cambiarPersonaje}
                        defaultValue=""
                        className="mb-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
                        required
                    >
                        <option value="" disabled>
                            Selecciona un personaje
                        </option>

                        {
                            this.state.personajes.map((personaje) => {
                                return (
                                    <option
                                        key={personaje.idPersonaje}
                                        value={personaje.idPersonaje}
                                    >
                                        {personaje.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <button
                        type="submit"
                        className="block bg-green-600 px-4 py-3 text-center font-semibold text-white"
                    >
                        Guardar cambios
                    </button>
                </form>

                {
                    this.state.serie &&
                    <div className="mt-6">
                        <h2 className="mb-3 text-2xl font-bold text-red-600">
                            {this.state.serie.nombre}
                        </h2>

                        <img
                            src={this.state.serie.imagen}
                            alt={this.state.serie.nombre}
                            className="w-64 rounded-lg"
                        />
                    </div>
                }

                {
                    this.state.personaje &&
                    <div className="mt-6">
                        <h2 className="mb-3 text-2xl font-bold text-blue-700">
                            {this.state.personaje.nombre}
                        </h2>

                        <img
                            src={this.state.personaje.imagen}
                            alt={this.state.personaje.nombre}
                            className="w-64 rounded-lg"
                        />
                    </div>
                }
            </div>
        )
    }
}