import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import TelaTeste from './pages/TelaTeste';
import Logon from './pages/Logon';

import ListUsuario from './pages/List_Usuario';
import NewUsuario from './pages/New_Usuario';

import ListMes from './pages/List_Mes';
import NewMes from './pages/New_Mes';

import ListDia from './pages/List_Dia';

import ListTarefa from './pages/List_Tarefa';

import ListTarefaDia from './pages/List_TarefaDia';

import ListResultadoDia from './pages/List_ResultadoDia';

import ListResultadoMes from './pages/List_ResultadoMes';

export default function Rooutes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TelaTeste}/>

                <Route path="/usuarios" component={ListUsuario}/>
                <Route path="/usuarios/new" component={NewUsuario}/>

                <Route path="/meses" component={ListMes}/>
                <Route path="/meses/new" component={NewMes}/>

                <Route path="/dias" component={ListDia}/>

                <Route path="/tarefas" component={ListTarefa}/>

                <Route path="/tarefa_dias" component={ListTarefaDia}/>

                <Route path="/resultado_dias" component={ListResultadoDia}/>

                <Route path="/resultado_meses" component={ListResultadoMes}/>

            </Switch>
        </BrowserRouter>
    );
}