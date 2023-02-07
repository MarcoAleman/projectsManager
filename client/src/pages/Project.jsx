import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";
import { Task } from "../components/Task";
import { useProjects } from "../hooks/useProjects";

export const Project = () => {

    const { id } = useParams();
    const { loading, alert, getProject, project } = useProjects();

    const { name, description, dateExpire, client } = project;

    useEffect(() => {
        getProject(id);
    }, [id]);

    if (alert.msg) return <Alert {...alert} />

    return (
        <>
            {
                loading ?
                    (<p>Cargando ...</p>)
                    :
                    (<div>
                        <div>
                            <h1>{name}</h1>
                            <Link to={`/projects/edit-project/:${id}`}>
                                Aca va un svg
                                <p>Editar</p>
                            </Link>
                        </div>
                        <div>
                            <p>Tareas del proyecto</p>
                            <div /* onClick={} */>
                                <p>Nueva tarea falta logo</p>
                            </div>
                        </div>
                        Aca de mostraran las tareas
                        <div>
                            <p>Colaboradores</p>
                            <button>Agregar colaborador</button>
                        </div>
                    </div>)
            }
        </>
    )
}