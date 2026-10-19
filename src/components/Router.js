import React, { Component } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useParams
} from 'react-router-dom';

import MenuComponent from './MenuComponent';
import HomeComponent from './HomeComponent';
import Serie from './Serie';
import Personajes from './Personajes';
import CreatePersonaje from './CreatePersonaje';
import UpdatePersonaje from './UpdatePersonaje';

export default class Router extends Component {
    render() {
        function SerieElement() {
            let { idserie } = useParams();

            return (
                <Serie
                    key={idserie}
                    idserie={idserie}
                />
            )
        }

        function PersonajesElement() {
            let { idserie } = useParams();

            return (
                <Personajes
                    key={idserie}
                    idserie={idserie}
                />
            )
        }

        return (
            <BrowserRouter>
                <MenuComponent/>

                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeComponent/>}
                        />

                        <Route
                            path="/serie/:idserie"
                            element={<SerieElement/>}
                        />

                        <Route
                            path="/personajes/:idserie"
                            element={<PersonajesElement/>}
                        />

                        <Route
                            path="/createpersonaje"
                            element={<CreatePersonaje/>}
                        />

                        <Route
                            path="/updatepersonaje"
                            element={<UpdatePersonaje/>}
                        />
                    </Routes>
                </main>
            </BrowserRouter>
        )
    }
}