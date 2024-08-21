import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import { Role } from '../models/person';
import { useEffect, useState } from 'react';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';

interface Data {
    dataPerson: Student[] | Teacher[];
}

export const DataTableSt: React.FC<Data> = ({ dataPerson }) => { 
  const [metaKey, setMetaKey] = useState<boolean>(false);
  const [data, setData] = useState<Student[] | Teacher[]>([]);
  const footer = `In total there are ${data ? data.length : 0} rows.`;



    useEffect(() => {
        if (metaKey){
          setData(dataPerson)
        }else {
          const dataPersonFiltered = dataPerson.filter((row) => row.isActive == true)
          setData(dataPersonFiltered) 

        }

        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, [metaKey]);

  return (
    <>
     <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e: InputSwitchChangeEvent) => setMetaKey(e.value!) } />
        <label htmlFor="input-metakey">Show inactives too</label>
    </div>
    {
    
      <DataTable value={data} footer={footer} tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" sortable header="Name"></Column>
          <Column field="surname" sortable header="Surname"></Column>
          <Column field="mail" header="Mail"></Column>
          <Column field="phone" header="Phone"></Column>
          {dataPerson[0].rol === Role.STUDENT && <Column field="level" sortable header="Level"></Column>}
          <Column field="isActive" header="Active"></Column>
      </DataTable>
    }
    </>
  )
}


