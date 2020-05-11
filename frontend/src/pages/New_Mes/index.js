import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

export default function NewUsuario(){
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [qtdNao, setQtdNao] = useState('');
    const history = useHistory();
    const id_usuario = localStorage.getItem('id_usuario');

    async function handleNewUsuario(e){
        e.preventDefault();

        const data = {
            mes,
            ano,
            qtdNao
        };

        try{
            await api.post('meses', data, {
                headers: {
                    Authorization: id_usuario,
                }
            })
            history.push('/meses/')
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
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewUsuario}>
                    <input 
                        placeholder="mes"
                        value={mes}
                        onChange={e => setMes(e.target.value)}
                    />
                    <textarea 
                        placeholder="ano"
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                    />

                    <input 
                        placeholder="qtdNao"
                        value={qtdNao}
                        onChange={e => setQtdNao(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}