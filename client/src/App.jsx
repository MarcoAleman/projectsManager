import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import {AuthLayout} from './layouts/AuthLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgetPassword from './pages/ForgetPassword';
import Login from './pages/Login';
import { Projects } from './pages/Projects';
import RecoverPassword from './pages/RecoverdPassword';
import { Register } from './pages/Register';

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* RUTAS PUBLICAS */}
                    <Route path='/' element={<AuthLayout />} >
                        {<Route index element={<Login />} />}
                        {<Route path='register' element={<Register />} />}
                        {<Route path='forget-password' element={<ForgetPassword />} />}
                        {<Route path='recover-password/:token' element={<RecoverPassword />} />}
                        {<Route path='confirm/:token' element={<ConfirmAccount />} />}
                        {<Route path='*' element={<h1>404 Not Found</h1>} />}
                    </Route>
                    {/* RUTAS PRIVADAS */}
                    <Route path='/projects' element={<ProtectedLayout />} >
                        {<Route index element={<Projects />} />}
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;