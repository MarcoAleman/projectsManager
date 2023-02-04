import { useState } from 'react';
import { Link } from "react-router-dom";
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2';

function ForgetPassword () {

    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!email){
            handleShowAlert('El email es requerido')
            return null
        };

        try {
            setSending(true)

            const { data } = await clientAxios.post(`/auth/send-token`, {
                email
            });
            setSending(false)

            Swal.fire({
                icon: 'success',
                title: 'Revisa tu casilla de correo',
                text: data.msg,
                confirmButtonText: 'Entendido',
                allowOutsideClick: false
            });

            setEmail('')

        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)

            setEmail('')
        }
    }
    

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({});
        }, 2000)
    };

    return (

        <>
            <h1>Recupera tu acceso</h1>
            {
                alert.msg && <Alert {...alert} />
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo electronico</label>
                    <input type="email" id="email" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={sending} >Recuperar Contraseña</button>
            </form>

            <nav>
                <Link to={'/register'}>¿No tenés cuenta? Registrate</Link>
                <Link to={'/'}>¿Estás registrado? Iniciá sesión</Link>
            </nav>
        </>
    )
}

export default ForgetPassword;