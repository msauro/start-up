import { useState, useEffect } from 'react';
import { teachersList } from './data/teachers';
import { DataTableSt } from './components/DataTableSt';
import { AddButton } from './components/AddButton';
import Person from './models/Person';
import { personList } from './data/person';

// interface Teacher {
//     id: string;
//     name: string,
//     surname: string,	
//     mail: string,
//     phone: number,
//     isActive: boolean,
// }

export const TeacherContainer = () => {
    const [teachers, setTeachers] = useState<Person[]>([]);

    useEffect(() => {
        const filteredList = personList.filter((teacher) => teacher.isActive == true);
        setTeachers(filteredList)

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

    return (
        <>
            <AddButton />
            {teachers.length > 0 &&
                <div className="card">
                    <DataTableSt dataPerson={teachersList} />
                </div>
            }
        </>
    )
}
