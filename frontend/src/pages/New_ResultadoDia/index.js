import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

export default function NewResultadoDia(){
    const [resultado, setResultado] = useState('');
    const [qtdNao, setQtdNao] = useState('');
    const history = useHistory();
    const id_usuario = "1e54cc5b";
    const id_dia = "1";

    async function handleNewResultadoDia(e){
        e.preventDefault();

        const data = {
            id_dia,
            id_usuario,
            resultado,
            qtdNao
        };

        try{
            await api.post('resultado_dia', data, {
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
                    
                    <Link className="back-link" to="/resultado_dias">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar resultados dias
                    </Link>
                </section>

                <form onSubmit={handleNewResultadoDia}>
                    <input 
                        placeholder="resultado"
                        value={resultado}
                        onChange={e => setResultado(e.target.value)}
                    />

                    <input 
                        placeholder="status"
                        value={qtdNao}
                        onChange={e => setQtdNao(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}