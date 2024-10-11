import { useState, useEffect } from 'react';
import Person, { Role } from './models/Person';
import { personList } from './data/person';
import { DataTablePerson } from './components/DataTablePerson';


export const TeacherContainer = () => {
    const [teachers, setTeachers] = useState<Person[]>([]);

    useEffect(() => {
        const filteredList = personList.filter((teacher) => teacher.isActive == true);
        setTeachers(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);
    const handleUpdatePerson = (teacherRow: Person) => {
        //AGREGAR TOAST DE EXITO O NO DE ACTUALIZACION***************************************
        setTeachers(teachers => {
            const updatedTeachers = [...teachers];
            const index = updatedTeachers.findIndex(student => student.id === teacherRow.id);
            console.log('index')
            console.log(index)
            if (index !== -1) {
                updatedTeachers[index] = teacherRow; // Actualiza el objeto
            }
            return updatedTeachers; // Retorna el nuevo array

        });
        console.log('teachers')
        console.log(teachers)

    }
    //handleUpdatePerson tengo que sacarlo de studentContainer y dejarlo fuera de todo en un componente aparte
    return (
        <>
            {teachers.length > 0 &&
                <div className="card">
                    {/*                     <DataTableSt dataPerson={teachersList} role={Role.TEACHER} handleUpdatePerson={handleUpdatePerson} />
                    */} <DataTablePerson dataPerson={teachers} role={Role.TEACHER} handleUpdatePerson={handleUpdatePerson} />

                </div>
            }
        </>
    )
}
