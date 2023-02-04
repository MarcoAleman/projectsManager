import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2';
import { clientAxios } from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

function Login () {
    
    const [alert, setAlert] = useState({});
    const [tokenChecked, setTokenChecked] = useState(false);
    const [sending, setSending] = useState(false);
    const {setAuth} = useAuth();

    const exRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg
        })

        if(time) {
            setTimeout(() => {
                setAlert({});
            }, 2000)
        }
    };

    const { formValues, handleInputChange, reset } = useForm({
        email : '',
        password : ''
    });

    const { email, password } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')){
            handleShowAlert('Todos los campos son obligatorios');
            return null
        }

        if(!exRegexEmail.test(email)){
            handleShowAlert('El email tiene un fomato inválido');
            return null
        }

        try {
            setSending(true)
            const { data } = await clientAxios.post(`/auth/login`, {
                email,
                password
            });
            setSending(false)

            //console.log(data);

            setAuth(data.user);
            sessionStorage.setItem('token', data.token)
    
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesion exitoso!',
                text: data.msg,
                allowOutsideClick: false,
                timer: 2000
            })/* .then(result => {
                if(result.isConfirmed){
                    setPassword('')
                    navigate('/')
                }
            }) */
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            reset()
        }
    };

    return (
        <>
            <h1>Iniciá Sesión</h1>
            {
                alert.msg && <Alert {...alert} />
            }
            <form onSubmit={handleSubmit} noValidate>

                <div>
                    <label htmlFor="email">Correo electronico</label>
                    <input type="email" id="email" placeholder="Ingrese su email" value={email} name='email' onChange={handleInputChange} />
                </div>
                
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingrese su contraseña" value={password} name='password' onChange={handleInputChange} />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>

            <nav>
                <Link to={'/register'}>¿No tenés cuenta? Registrate</Link>
                <Link to={'/forget-password'}>Olvidé mi contraseña</Link>
            </nav>
        </>
    )
}

export default Login;