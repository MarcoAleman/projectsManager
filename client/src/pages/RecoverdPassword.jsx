import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

function RecoverPassword() {

    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState('');
    const [tokenChecked, setTokenChecked] = useState(false);
    const [sending, setSending] = useState(false);

    const {token} = useParams();
    const navigate = useNavigate();

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({});
        }, 2000)
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                //setSending(true)
    
                const { data } = await clientAxios.get(`/auth/reset-password?token=${token}`);
                setTokenChecked(true)
    
                
                setPassword('')
    
            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg)
                }
        }

        checkToken()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!password) {
            handleShowAlert('La nueva contraseña es requerida')
            return null
        }

        try {
            setSending(true)
            const { data } = await clientAxios.post(`/auth/reset-password?token=${token}`, {
                password
            });
            setSending(false)
    
            Swal.fire({
                icon: 'info',
                title: 'Contraseña actualizada exitosamente!',
                text: data.msg,
                confirmButtonText: 'Iniciá Sesión',
                allowOutsideClick: false
            }).then(result => {
                if(result.isConfirmed){
                    setPassword('')
                    navigate('/')
                }
            })
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            setPassword('')
        }

    }

    return (

        <>
            <h1>Restablecé tu Contraseña</h1>
            {
                alert.msg && <Alert {...alert} />
            }
            {
                tokenChecked ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password">Nueva contraseña</label>
                            <input type="password" id="password" placeholder="Escribi tu nueva contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" disabled={sending} >Resetear Contraseña</button>
                    </form>
                ) : (
                    <nav>
                        <Link to={'/register'}>¿No tenes cuenta? Registrate</Link>
                        <Link to={'/'}>¿Estas registrado? Iniciá sesión</Link>
                    </nav>
                )
            }

        </>
    )
}

export default RecoverPassword;