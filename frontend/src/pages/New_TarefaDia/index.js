import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

export default function NewTarefaDia(){
    const [status, setStatus] = useState('');
    const history = useHistory();
    const id_usuario = "1e54cc5b";
    const id_tarefa = "1";

    async function handleNewTarefaDia(e){
        e.preventDefault();

        const data = {
            id_usuario,
            id_tarefa,
            status
        };

        try{
            await api.post('tarefa_dia', data, {
                headers: {
                    authorization: id_usuario,
                }
            })
              history.push('/tarefa_dias')
        }catch(err){
            alert("Erro ao cadastrar caso, tente novamente.")
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói 
                        para resolver isso.
                    </p>
                    
                    <Link className="back-link" to="/tarefa_dias">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar Tarefa Dia
                    </Link>
                </section>

                <form onSubmit={handleNewTarefaDia}>
                    <input 
                        placeholder="status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}