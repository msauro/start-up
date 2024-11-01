import { useState } from 'react';
import Person, { Role } from './models/Person';
import { personList } from './data/person';
import { DataTablePerson } from './components/DataTablePerson';

export const StudentContainer = () => {
    const [students, setStudents] = useState<Person[]>(personList.filter((student) => student.rol == Role.STUDENT));
    const studentsActive = students.filter((person) => person.isActive == true);

    /* useEffect(() => {
        const filteredList = personList.filter((student) => student.rol == Role.STUDENT);
        setStudents(filteredList);
    }, []); */

    const handleUpdatePerson = (person: Person) => {
        //deberia hacer un util tanto para students como para teachers
        //AGREGAR TOAST DE EXITO O de NO  ACTUALIZACION***************************************
        // renderizar de nuevo la tabla
        console.log('person')
        console.log(person)
        if (person.id !== 0) {
            const studentsUpdated = students.map((student) => {
                if (student.id === person.id) {
                    return person
                } else {
                    return student
                }
            })
            setStudents(studentsUpdated);
        } else {
            console.log('NUEVO :)')
            const maxId = students.reduce((max, person) => (person.id > max ? person.id : max), students[0].id);
            person.id = maxId + 1;
            console.log(person)
            setStudents([...students, person])
        }
    }

    return (
        <>
            {students.length > 0 &&
                <div className="card">
                    <DataTablePerson
                        dataPerson={students}
                        dataPersonActive={studentsActive}
                        role={Role.STUDENT}
                        handleUpdatePerson={handleUpdatePerson}
                    />
                </div>
            }
        </>
    )
}
