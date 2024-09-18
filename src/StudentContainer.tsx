import { useState, useEffect } from 'react';
import { studentsList } from './data/students';
import { DataTableSt } from './components/DataTableSt';
import { AddButton } from './components/AddButton';
import Person from './models/Person';
import { personList } from './data/person';

//repite con teacher
export const StudentContainer = () => {
    const [students, setStudents] = useState<Person[]>([]);


    useEffect(() => {
        const filteredList = personList.filter((student) => student.isActive == true);
        setStudents(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

    return (
        <>
            <AddButton />
            {students.length > 0 &&
                <div className="card">
                    <DataTableSt dataPerson={studentsList} />
                </div>
            }

        </>
    )
}
