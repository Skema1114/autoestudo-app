import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

const id_usuario = localStorage.getItem('id_usuario');

export default function Tarefa(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleNewUsuario(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            fone,
            senha
        };

        try{
            await api.post('usuarios', data, {
            })

            history.push('/profile')
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
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewUsuario}>
                    <input 
                        placeholder="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <textarea 
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="fone"
                        value={fone}
                        onChange={e => setFone(e.target.value)}
                    />

                    <input 
                        placeholder="senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}