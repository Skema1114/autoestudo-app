import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api';

export default function NewDia(){
    const [datas, setData] = useState('');
    const history = useHistory();
    const id_usuario = "1e54cc5b";
    const id_mes = "1";

    async function handleNewDia(e){
        e.preventDefault();

        const data = {
            id_usuario,
            id_mes,
            datas
        };

        try{
            await api.post('dia', data, {
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
                    
                    <Link className="back-link" to="/dias">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para meses
                    </Link>
                </section>

                <form onSubmit={handleNewDia}>
                    <input 
                        placeholder="data"
                        value={datas}
                        onChange={e => setData(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}