import React from "react";

function RecoverPassword() {
    <>
        <h1>Restablecé tu Contraseña</h1>

        <form action="">
            <div>
                <label htmlFor="password">Nueva contraseña</label>
                <input type="password" id="password" placeholder="Escribi tu nueva contraseña" />
            </div>
            <button type="submit">Guardar Contraseña</button>
        </form>

    </>
}

export default RecoverPassword;