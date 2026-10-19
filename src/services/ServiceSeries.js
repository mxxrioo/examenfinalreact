import axios from 'axios';
import Global from '../Global';

export default class ServiceSeries {
    getSeries() {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiSeries;
            let request = "api/Series";

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    findSerie(idSerie) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiSeries;
            let request = "api/Series/" + idSerie;

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    getPersonajesSerie(idSerie) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiSeries;
            let request = "api/Series/PersonajesSerie/" + idSerie;

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    getPersonajes() {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiSeries;
            let request = "api/Personajes";

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    insertPersonaje(personaje) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiSeries;
            let request = "api/Personajes";

            axios.post(url + request, personaje).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    updatePersonaje(idPersonaje, idSerie) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiSeries;
            let request = "api/Personajes/"
                + idPersonaje + "/" + idSerie;

            axios.put(url + request).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}