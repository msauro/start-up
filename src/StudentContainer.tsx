import { useState, useEffect } from 'react';
import Person, { Role } from './models/Person';
import { personList } from './data/person';
import { DataTablePerson } from './components/DataTablePerson';

export const StudentContainer = () => {
    const [students, setStudents] = useState<Person[]>([]);


    useEffect(() => {
        const filteredList = personList.filter((student) => student.rol == Role.STUDENT);
        setStudents(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

    const handleUpdatePerson = (studentRow: Person) => {
        //AGREGAR TOAST DE EXITO O de NO  ACTUALIZACION***************************************
        // renderizar de nuevo la tabla
        const studentsUpdated = students.map((student) => {
            if (student.id === studentRow.id) {
                return studentRow
            } else {
                return student
            }
        })

        setStudents(studentsUpdated)

    }

    return (
        <>
            {students.length > 0 &&
                <div className="card">
                    {/* <DataTableSt dataPerson={students} role={Role.STUDENT} handleUpdatePerson={handleUpdatePerson} />
                     */}
                    <DataTablePerson dataPerson={students} role={Role.STUDENT} handleUpdatePerson={handleUpdatePerson} />
                </div>
            }

        </>
    )
}
