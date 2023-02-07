import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import useAuth from '../hooks/useAuth';

export const ProtectedLayout = () => {

    const {auth, loading} = useAuth()
    console.log(auth);

    {
        if(loading) {
            return (
                <p>Cargando...</p>
            )
        }
    }
    return (
        <>
        {
            auth._id ? (
                <div>
                    <Header />
                    <div>
                        <Sidebar />
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) :
            <Navigate to='/' />
        }
        </>
    )
};