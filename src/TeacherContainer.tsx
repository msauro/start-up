import { useState, useEffect } from 'react';
import Person, { Role } from './models/Person';
import { personList } from './data/person';
import { DataTablePerson } from './components/DataTablePerson';


export const TeacherContainer = () => {
    const [teachers, setTeachers] = useState<Person[]>([]);
    const dataPersonFiltered = personList.filter((teacher) => teacher.rol == Role.TEACHER);

    useEffect(() => {
        setTeachers(dataPersonFiltered)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, [dataPersonFiltered]);
    const handleUpdatePerson = (teacherRow: Person) => {
        //deberia hacer un util tanto para students como para teachers

        //AGREGAR TOAST DE EXITO O NO DE ACTUALIZACION***************************************
        setTeachers(teachers => {
            const updatedTeachers = [...teachers];
            const index = updatedTeachers.findIndex(teacher => teacher.id === teacherRow.id);
            if (index !== -1) {
                updatedTeachers[index] = teacherRow; // Actualiza el objeto
            }
            return updatedTeachers; // Retorna el nuevo array

        });

    }
    //handleUpdatePerson tengo que sacarlo de studentContainer y dejarlo fuera de todo en un componente aparte
    return (
        <>
            {teachers.length > 0 &&
                <div className="card">
                    {/*                     <DataTableSt dataPerson={teachersList} role={Role.TEACHER} handleUpdatePerson={handleUpdatePerson} />
                    */} <DataTablePerson dataPerson={teachers} dataPersonFiltered={dataPersonFiltered} role={Role.TEACHER} handleUpdatePerson={handleUpdatePerson} />

                </div>
            }
        </>
    )
}
