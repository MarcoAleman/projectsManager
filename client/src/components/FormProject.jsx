import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";

export const FormProject = () => {

    const {alert, showAlert, storeProject} = useProjects();

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(formValues);

        if([name, description, dateExpire, client].includes('')){
            handleShowAlert('Todos los campos son obligatorios');
            return null
        }
    }

    const {formValues, handleInputChange, reset, setFormValues} = useForm({
        name : '',
        description : '',
        dateExpire : '',
        client : ''
    })

    const {name, description, dateExpire, client} = formValues;

    storeProject({
        name,
        description,
        dateExpire,
        client
    });

    reset();

    return (
        <form
            className="bg-white py-5 px-5 md:w-4/4 lg:w-3/4 rounded-md border-2"
            onSubmit={onSubmit}
        >
            {
                alert.msg && <Alert {...alert} />
            }

            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre Proyecto
                </label>
                <input
                    id="name"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={name}
                    name='name'
                    onChange={handleInputChange}
                    placeholder="Nombre del proyecto"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="description"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    type="text"
                    style={{ resize: "none" }}
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={description}
                    name='description'
                    onChange={handleInputChange}
                    placeholder="Descripción del proyecto"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="date-expire"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Fecha de entrega
                </label>
                <input
                    id="date-expire"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={dateExpire}
                    name='dateExpire'
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="client"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre Cliente
                </label>
                <input
                    id="client"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={client}
                    name='client'
                    onChange={handleInputChange}
                    placeholder="Nombre del cliente"
                />
            </div>
            <button className={`${false ? "bg-green-600" : "bg-sky-600"} w-full p-3 uppercase font-bold text-white rounded-lg ${false ? "hover:bg-green-500" : "hover:bg-sky-500"}  transition-colors`}>
                {false ? "actualizar cambios" : "guardar proyecto"}
            </button>
        </form>
    );
};