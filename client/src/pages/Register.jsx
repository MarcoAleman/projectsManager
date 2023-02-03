import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components/Alert";
import { useForm } from "../hooks/useForm"

export const Register = () => {

    const [alert, setAlert] = useState({});

    const exRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

    const {formValues, setFormValues, handleInputChange, reset} = useForm({
        name : '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues;

    const handleSubmit = (e) => {
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
                <button type="submit">Crear Cuenta</button>
            </form>

            <nav>
                <Link to={'/'}>¿Estás registrado? Iniciá sesión</Link>
            </nav>
        </>
    )
}