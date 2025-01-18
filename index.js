

const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_formlogin = document.getElementById("Login");
const bottone_admin = document.getElementById("buttonadmin");
const paginaPosto = document.getElementById("pagina_posto");
document.body.focus();
bottone_admin.classList.add("d-none");

import {tableComponent} from './componenti/table.js';
import {createForm} from './componenti/form.js';
import {createFormLogin} from './componenti/form_login.js';
import { createLogin } from './componenti/login.js';
import {generateFetchComponent} from './componenti/fetch_component.js';
import {createMap} from './componenti/mappa.js';
import {ricerca} from './componenti/barra_ricerca.js';
import {createNavigator} from "./componenti/navigator.js";
import {createDetail} from "./componenti/detail.js"

let dati_fetch;

fetch("conf.json").then(r => r.json()).then(conf => {
    const fetch = generateFetchComponent();
    const Map=createMap()
    const table1 = tableComponent();
    const detailComp = createDetail(paginaPosto);
    const navigator = createNavigator(document.querySelector("#container"));
    const form_login=createFormLogin(formLogin)
    const Login = createLogin()
    const form = createForm(formElement);

    fetch.caricaDati(conf)
    fetch.getData().then(p => {
        console.log(p)
        dati_fetch=p
        table1.setParentElement(tabella);
        table1.setData(p);
        table1.render();
        detailComp.setData(p);
        //detailComp.render();
        Map.setData(p)
        Map.render()
    });
    form.render(table1, Map, conf,fetch);
    form_login.render(Login,bottone_admin)
    //BARRA DI RICERCA
    //let filtro = document.querySelectorAll("filtro");
    //filtro.addEventListener('input', function() {
        //let dati = table1.exportData()
        //let new_data=ricerca(filtro.value,dati);
        //table1.reset_inizio()
        //table1.dati_filtro(new_data)
        //table1.render()
    //});
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    console.log(risposta)
    if (risposta==="true"){
        bottone_admin.classList.remove("d-none")
    }
});