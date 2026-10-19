import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceSeries from '../services/ServiceSeries';

export default class MenuComponent extends Component {
    service = new ServiceSeries();

    state = {
        series: [],
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

    render() {
        return (
            <header className="">
                <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-5 py-4">
                    <NavLink
                        to="/"
                        className="text-sm text-slate-700"
                    >
                        Series
                    </NavLink>

                    <NavLink
                        to="/"
                        className="text-sm text-slate-700"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/createpersonaje"
                        className="text-sm text-slate-700"
                    >
                        Nuevo personaje
                    </NavLink>

                    <NavLink
                        to="/updatepersonaje"
                        className="text-sm text-slate-700"
                    >
                        Modificar personajes
                    </NavLink>

                    <details className="relative">
                        <summary className="cursor-pointer text-sm text-slate-700">
                            Series
                        </summary>

                        <ul className="absolute overflow-y-auto rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                            {
                                this.state.series.map((serie) => {
                                    return (
                                        <li key={serie.idSerie}>
                                            <NavLink
                                                to={"/serie/" + serie.idSerie}
                                                className="block px-4 py-2 text-sm hover:bg-sky-50"
                                            >
                                                {serie.nombre}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }

                            {
                                this.state.mensaje &&
                                <li className="px-4 py-2 text-sm text-red-600">
                                    {this.state.mensaje}
                                </li>
                            }
                        </ul>
                    </details>
                </nav>
            </header>
        )
    }
}