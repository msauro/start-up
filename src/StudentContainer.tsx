import { useState, useEffect } from 'react';
import { DataTableSt } from './components/DataTableSt';
import Person, { Role } from './models/Person';
import { personList } from './data/person';

export const StudentContainer = () => {
    const [students, setStudents] = useState<Person[]>([]);


    useEffect(() => {
        const filteredList = personList.filter((student) => student.rol == Role.STUDENT);
        console.log(filteredList)
        setStudents(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

    const handleUpdateStudent = (studentRow: Person) => {
        console.log(studentRow)
    }

    return (
        <>
            {students.length > 0 &&
                <div className="card">
                    <DataTableSt dataPerson={students} handleUpdateStudent={handleUpdateStudent} />
                </div>
            }

        </>
    )
}
