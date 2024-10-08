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
        setStudents(students => {
            const updatedStudents = [...students];
            const index = updatedStudents.findIndex(student => student.id === studentRow.id);

            if (index !== -1) {
                updatedStudents[index] = studentRow; // Actualiza el objeto
            }
            console.log('updatedStudents')
            console.log(updatedStudents)
            return updatedStudents; // Retorna el nuevo array

        });

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
