import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { studentsList } from './data/students';

interface Student {
    id: string;
    name: string,
    surname: string,	
    mail: string,
    phone: number,
    isActive: boolean,
}

export const StudentContainer = () => {
    const [students, setStudents] = useState<Student[]>([]);


   useEffect(() => {
    setStudents(studentsList)

   //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, []);

  return (
    <>
        <h2>StudentContainer</h2>
        <div className="card">
            
            <DataTable value={students} tableStyle={{ minWidth: '50rem' }}>
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
