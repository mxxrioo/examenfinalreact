import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceSeries from '../services/ServiceSeries';

export default class Personajes extends Component {
    service = new ServiceSeries();

    state = {
        personajes: [],
        status: false,
        mensaje: null
    }

    componentDidMount() {
        this.service.getPersonajesSerie(this.props.idserie)
            .then((result) => {
                this.setState({
                    personajes: result,
                    status: true
                })
            }).catch(() => {
                this.setState({
                    mensaje: "No se han podido cargar los personajes",
                    status: true
                })
            })
    }

    render() {
        return (
            <div className="mx-auto max-w-3xl">
                <NavLink
                    to={"/serie/" + this.props.idserie}
                    className="block bg-red-600 px-4 py-3 text-center font-semibold text-white"
                >
                    Volver
                </NavLink>

                {
                    this.state.mensaje &&
                    <p className="mb-4 text-red-600">
                        {this.state.mensaje}
                    </p>
                }

                {
                    this.state.status === false ?
                    <h2>Cargando personajes...</h2> :
                    <div className="overflow-x-auto rounded-lg">
                        <table className="w-full bg-slate-800 text-left text-white">
                            <thead className="bg-slate-900">
                                <tr>
                                    <th className="px-5 py-3">
                                        Personaje
                                    </th>
                                    <th className="px-5 py-3">
                                        Imagen
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.personajes.map((personaje) => {
                                        return (
                                            <tr
                                                key={personaje.idPersonaje}
                                                className="border-t border-slate-600"
                                            >
                                                <td className="px-5 py-4">
                                                    {personaje.nombre}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <img
                                                        src={personaje.imagen}
                                                        alt={personaje.nombre}
                                                        className="h-28 w-40 rounded object-cover"
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        {
                            this.state.personajes.length === 0 &&
                            !this.state.mensaje &&
                            <p className="mt-4">
                                Esta serie no tiene personajes.
                            </p>
                        }
                    </div>
                }
            </div>
        )
    }
}