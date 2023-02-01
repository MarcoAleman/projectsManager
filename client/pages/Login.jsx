import React from "react";

function Login () {
    <>
        <h1>Iniciá Sesión</h1>

        <form action="">

            <div>
                <label htmlFor="email">Correo electronico</label>
                <input type="email" id="email" placeholder="Ingrese su email" />
            </div>
            
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Ingrese su contraseña" />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>

        <nav>
            <Link to={'/register'}>¿No tenés cuenta? Registrate</Link>
            <Link to={'/forget-password'}>Olvidé mi contraseña</Link>
        </nav>
    </>
}

export default Login;