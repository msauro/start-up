import { useState, useEffect } from 'react';
import { studentsList } from './data/students';
import { DataTableSt } from './components/DataTableSt';
import Student from './models/Student';

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
            {students.length &&

                <div className="card">
                    <DataTableSt dataPerson={studentsList} />
                </div>
            }

        </>
    )
}
