import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios';

function ConfirmAccount() {

    const params = useParams();
    const {token} = params;

    const navigate = useNavigate(); //esto es como un redirect del router dom

    const [alert, setAlert] = useState({});

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })
    }

    useEffect(() => {

        const confirmAccount = async () => {
            try {
                const { data } = await clientAxios.get(`/auth/checked?token=${token}`);

                Swal.fire({
                    icon: 'info',
                    title: 'Felicitaciones',
                    text: data.msg,
                    confirmButtonText: 'Iniciá Sesión',
                    allowOutsideClick: false
                }).then(result => {
                    if(result.isConfirmed){
                        navigate('/')
                    }
                })

            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg)
            }
        }

        confirmAccount()

    }, []);



    return (

        <>
            <h1>Confirma tu cuenta</h1>
            <div>
                {
                    alert.msg && (
                        <>
                            <Alert {...alert} />
                            <nav>
                                <Link to={'/register'}>¿No tenes cuenta? Registrate</Link>
                                <Link to={'/'}>¿Estas registrado? Iniciá sesión</Link>
                            </nav>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default ConfirmAccount;