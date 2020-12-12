import React from 'react';
import { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'; //desestrutura a importação para utilizar somente o necessário
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory('');

        async function handleLogin(e) {

            e.preventDefault();

            try {

                const response = await api.post('sessions', { id });

                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', response.data.name); //salva no storage do navegador

                history.push('/profile');

            } catch (err) {

                alert('Falha no login, Tente novamente');

            }

        }

    return (<div className="logon-container" >
        <section className="form" >

            <img src={logoImg}
                alt="Be the Hero!" />

            <form onSubmit={handleLogin}>

                <h1> Faça seu Logon </h1>
                <input
                    placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)} />

                <button className="button">Entrar</button>

                <Link to="/register" className="back-link">
                    <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                </Link>
            </form >


        </section>

        <img src={heroesImg}
            alt="Heroes" />
    </div>
    );
}