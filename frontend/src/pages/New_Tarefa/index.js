import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

export default function NewTarefa(){
    const [nome, setNome] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');
    const history = useHistory();
    const id_usuario = "1e54cc5b";

    async function handleNewTarefa(e){
        e.preventDefault();

        const data = {
            id_usuario,
            nome,
            dataCriacao
        };

        try{
            await api.post('tarefa', data, {
                headers: {
                    Authorization: id_usuario,
                }
            })
            history.push('/')
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
                    
                    <Link className="back-link" to="/tarefas">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para meses
                    </Link>
                </section>

                <form onSubmit={handleNewTarefa}>
                    <input 
                        placeholder="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                     
                    <input 
                        placeholder="data_criacao"
                        value={dataCriacao}
                        onChange={e => setDataCriacao(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}