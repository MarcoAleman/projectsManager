import React from "react";
import { Link } from "react-router-dom";

function ForgetPassword () {
    return (

        <>
            <h1>Recupera tu acceso</h1>

            <form action="">
                <div>
                    <label htmlFor="email">Correo electronico</label>
                    <input type="email" id="email" placeholder="Ingrese su email" />
                </div>
                <button type="submit">Recuperar Contraseña</button>
            </form>

            <nav>
                <Link to={'/register'}>¿No tenés cuenta? Registrate</Link>
                <Link to={'/'}>¿Estás registrado? Iniciá sesión</Link>
            </nav>
        </>
    )
}

export default ForgetPassword;