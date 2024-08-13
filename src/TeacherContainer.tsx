import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { teachersList } from './data/teachers';

interface Teacher {
    id: string;
    name: string,
    surname: string,	
    mail: string,
    phone: number,
    isActive: boolean,
}

export const TeacherContainer = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);


   useEffect(() => {
    setTeachers(teachersList)

   //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

  return (
    <>
        <h2>TeacherContainer</h2>
        <div className="card">
            
            <DataTable value={teachers} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="surname" header="Surname"></Column>
                <Column field="mail" header="Mail"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="isActive" header="Active"></Column>
            </DataTable>
        </div>
    </>
  )
}
