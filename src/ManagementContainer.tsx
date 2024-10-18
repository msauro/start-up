import { useEffect, useState } from "react";
import { AddButton } from "./components/AddButton";
import Person from "./models/Person";
import { personList } from "./data/person";

export const ManagementContainer = () => {
    const [students, setStudents] = useState<Person[]>([]);


    useEffect(() => {
        const filteredList = personList.filter((student) => student.isActive == true);
        setStudents(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

    return (
        <>
            <p>Pondria una columna "debe" o algo que indique que debe, poder registrar pagos, descuentos/promociones y calcular monto que pagan por mes</p>
            <p>cuota = $precio por clase x cantidad de clases al mes (hay q contar por ej cuantos jueves hay (sin contar feriados)) alto viaje</p>
            <AddButton />
            {students.length > 0 &&
                <div className="card">
                    {/* <DataTableSt dataPerson={studentsList} /> */}
                </div>
            }

        </>
    )
}
