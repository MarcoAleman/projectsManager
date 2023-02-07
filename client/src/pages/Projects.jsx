import { useEffect } from "react";
import { Alert } from "../components/Alert";
import { ProjectPreview } from "../components/ProjectPreview"
import { useProjects } from "../hooks/useProjects"

export const Projects = () => {

    const { loading, alert, projects, getProjects } = useProjects();

    useEffect(() => {
        getProjects()
    }, [])


    if (alert.msg) {
        return <Alert {...alert} />
    }

    return (
        <>
            <h1
                className='text-4xl font-black'
            >
                Proyectos
            </h1>
            <div
                className='bg-white p-5 shadow mt-10 rounded-md'
            >
                {
                    loading ?
                        <p>Cargando ...</p> : (
                            projects.length
                                ?
                                projects.map(project => <ProjectPreview key={project} {...project} />)
                                :
                                <p>No hay proyectos agregados</p>)
                }
            </div>
        </>
    )
}

