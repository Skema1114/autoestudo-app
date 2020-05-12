import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function ListUsuario(){
    const [usuarios, setUsuarios] = useState([]);
    const id_usuario = localStorage.getItem('id_usuario');
    const history = useHistory();

    useEffect(() => {
        api.get('usuarios', {
            headers: {
                Authorization: id_usuario,
            }
        }).then(response => {
            setUsuarios(response.data);
        })
    }, [id_usuario]);

    async function handleDeleteUsuario(id){
        try{
            await api.delete(`usuarios/${id}`, {});
            
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, TESTE</span>

                <Link className="button" to="/usuario/novo">
                    NOVO usuario
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Usuarios Cadastrados</h1>

            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        <strong>ID:</strong>
                        <p>{usuario.id}</p>

                        <strong>NOME:</strong>
                        <p>{usuario.nome}</p>

                        <strong>EMAIL:</strong>
                        <p>{usuario.email}</p>

                        <strong>SENHA:</strong>
                        <p>{usuario.senha}</p>

                        <button 
                            type="button" 
                            onClick={() => handleDeleteUsuario(usuario.id)
                        }>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

//CUIDAR NOS PARAMETROS DESSE BUTTON, POIS SE É PASSADO SEM A AERO FUNCTION, ELE
//DELETA FiThumbsDown, EX: handleDeleteIncident(incident.id)
//TEM QUE TER A AERO PARA ELE PASSAR A FUNÇÃO COMO PARAMETRO
//() => handleDeleteIncident(incident.id)
//SEM ELE EXECUTA A FUNÇÃO E MANDA OS PARAMETROS