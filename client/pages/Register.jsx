import React from "react";

function Register () {
    <>
        <h1>Creá tu cuenta</h1>

        <form action="">

            <div>
                <label htmlFor="name">Nombre</label>
                <input type="name" id="name" placeholder="Ingrese su nombre" autoComplete="off" />
            </div>

            <div>
                <label htmlFor="email">Correo electronico</label>
                <input type="email" id="email" placeholder="Ingrese su email" />
            </div>
            
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Ingrese su contraseña" />
            </div>
            
            <div>
                <label htmlFor="password2">Confirme su contraseña</label>
                <input type="password" id="password2" placeholder="Ingrese su contraseña" />
            </div>
            <button type="submit">Crear Cuenta</button>
        </form>

        <nav>
            <Link to={'/'}>¿Estás registrado? Iniciá sesión</Link>
        </nav>
    </>
}

export default Register;