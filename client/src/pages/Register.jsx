import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm"
import Swal from 'sweetalert2';


export const Register = () => {

    const [alert, setAlert] = useState({});
    const [sending, setSending] = useState(false);

    const exRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

    const {formValues, setFormValues, handleInputChange, reset} = useForm({
        name : '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(formValues);

        if([name, email, password, password2].includes('')){
            handleShowAlert('Todos los campos son obligatorios');
            return null
        }

        if(!exRegexEmail.test(email)){
            handleShowAlert('El email tiene un fomato inválido');
            return null
        }

        if(password != password2){
            handleShowAlert('Las contraseñas no coinciden');
            return null
        };

        try {

            setSending(true);

            const {data} = await clientAxios.post('/auth/register', {
                name,
                email,
                password
            })

            setSending(false);

            console.log(data.msg);

            Swal.fire({
                icon: 'info',
                title: 'Gracias por registrarte!',
                text: data.msg
            })

            reset();

        } catch (error) {
            console.error(error);

            handleShowAlert(error.response?.data.msg);
            reset()
        }
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({});
        }, 2000)
    }

    return (

        <>
            <h1>Creá tu cuenta</h1>
            {
                alert.msg && <Alert {...alert} />
            }

            <form action="" onSubmit={handleSubmit} noValidate >

                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="name" id="name" placeholder="Ingrese su nombre" value={name} name='name' autoComplete="off" onChange={handleInputChange} />
                </div>

                <div>
                    <label htmlFor="email">Correo electronico</label>
                    <input type="email" id="email" placeholder="Ingrese su email" value={email} name='email' onChange={handleInputChange} />
                </div>
                
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingrese su contraseña"  value={password} name='password' onChange={handleInputChange} />
                </div>
                
                <div>
                    <label htmlFor="password2">Confirme su contraseña</label>
                    <input type="password" id="password2" placeholder="Ingrese su contraseña"  value={password2} name='password2' onChange={handleInputChange} />
                </div>
                <button type="submit" disabled={sending}>Crear Cuenta</button>
            </form>

            <nav>
                <Link to={'/'}>¿Estás registrado? Iniciá sesión</Link>
            </nav>
        </>
    )
}