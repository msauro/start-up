import { useState, useEffect } from 'react';
import { studentsList } from './data/students';
import { DataTableSt } from './components/DataTableSt';
import Student from './models/Student';
import { AddButton } from './components/AddButton';

//repite con teacher
export const StudentContainer = () => {
    const [students, setStudents] = useState<Student[]>([]);


    useEffect(() => {
        const filteredList = studentsList.filter((student) => student.isActive == true);
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
