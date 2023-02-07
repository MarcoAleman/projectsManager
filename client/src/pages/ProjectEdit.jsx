import { FormProject } from "../components/FormProject";

export const ProjectEdit = () => {
    return (
        <>
            <div>
                <h1>Editar proyecto: Nombreproyec</h1>
                <div>
                    logo
                    <button>Eliminar</button>
                </div>
            </div>
            <div>
                <FormProject />
            </div>
        </>
    )
}