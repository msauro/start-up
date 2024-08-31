import { useState, useEffect } from 'react';
import { teachersList } from './data/teachers';
import { DataTableSt } from './components/DataTableSt';
import Teacher from './models/Teacher';
import { AddButton } from './components/AddButton';

// interface Teacher {
//     id: string;
//     name: string,
//     surname: string,	
//     mail: string,
//     phone: number,
//     isActive: boolean,
// }

export const TeacherContainer = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);


    useEffect(() => {

        const filteredList = teachersList.filter((teacher) => teacher.isActive == true);
        setTeachers(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

    return (
        <>
        {console.log(teachers)}
            <AddButton />
            {teachers.length >0 &&
            
                <div className="card">
                    <DataTableSt dataPerson={teachersList} />
                </div>
            }
        </>
    )
}
