import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clientAxios } from '../config/clientAxios';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const ProjectsContext = createContext()

const ProjectsProvider = ({ children }) => {

    const navigate = useNavigate();

    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);
    
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});

    const showAlert = (msg, time = true) => {
        setAlert({
            msg
        })

        if(time) {
            setTimeout(() => {
                setAlert({});
            }, 2000)
        }
    };

    const getProjects = async () => {
        setLoading(true);

        try {
            
            const token = sessionStorage.getItem('token');
            if(!token) return null

            const {data} = await clientAxios.get('/projects', {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : token
                }
            })
            //console.log(data)
            setProjects(data.projects)
            //setAlert({})

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
        } finally {
            setLoading(false);
        }
    }

    const getProject = async (id) => {
        setLoading(true);

        try {
            
            const token = sessionStorage.getItem('token');
            if(!token) return null

            const {data} = await clientAxios.get(`/projects/${id}`, {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : token
                }
            })
            //console.log(data)
            setProject(data.project)
            //setAlert({})

        } catch (error) {
            console.error(error)

            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
        } finally {
            setLoading(false);
        }
    }

    const storeProject = async (project) => {
        setLoading(true);

        try {
            
            const token = sessionStorage.getItem('token');
            if(!token) return null

            const {data} = await clientAxios.get(`/projects/${id}`, {
                headers : {
                    "Content-type" : "application/json",
                    Authorization : token
                }
            })
            //console.log(data)
            setProjects([...projects, data.project])

            Toast.fire({
                incon : 'success',
                title : data.msg,
            })

            navigate('/projects');

        } catch (error) {
            console.error(error)

            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
        }
    }

    return (
        <ProjectsContext.Provider
            value={{
                loading,
                alert,
                showAlert,
                projects,
                getProjects,
                project,
                getProject,
                storeProject
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext
