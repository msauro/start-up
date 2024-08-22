import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Person, { Role } from '../models/person';
import { useEffect, useState } from 'react';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

interface Data {
    dataPerson: Student[] | Teacher[];
}

export const DataTableSt: React.FC<Data> = ({ dataPerson }) => { 
  const [metaKey, setMetaKey] = useState<boolean>(false);
  const [data, setData] = useState<Student[] | Teacher[]>([]);
  const footer = `In total there are ${data ? data.length : 0} rows.`;
  const dataPersonFiltered = dataPerson.filter((row) => row.isActive == true)

{console.log('data');}
{console.log(data);}
    useEffect(() => {
        if (metaKey){
          setData(dataPerson)
        }else {
          setData(dataPersonFiltered) 
        }
        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, [metaKey]);
   

    const getSeverity = (isActive:string) => {
      const severityMap = {
        false: 'danger',
        true: 'success'
      };
    
      return severityMap[isActive]
  };

 
    const statusBodyTemplate = (rowData: Student | Teacher) => {
      return <Tag value={rowData.isActive.toString()} severity={getSeverity((rowData.isActive).toString())} />;
    };

    const iconBodyTemplate = (rowData: Student | Teacher) => {
      function handleIconClick(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
console.log('event', event)      }

      return(
        <>
        <Button icon='pi pi-eye' className='primary' onClick={handleIconClick} />
        <Button icon='pi pi-trash' className='primary' style={{marginLeft:'5px'}} onClick={handleIconClick} />
       </>
      )
    };

  return (
    <>
     <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e: InputSwitchChangeEvent) => setMetaKey(e.value!) } />
        <label htmlFor="input-metakey">Show inactives too</label>
    </div>
    {
      data &&
      <DataTable value={data} footer={footer} stripedRows tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" sortable header="Name"></Column>
          <Column field="surname" sortable header="Surname"></Column>
          <Column field="mail" header="Mail"></Column>
          <Column field="phone" header="Phone"></Column>
          {dataPerson[0].rol === Role.STUDENT && <Column field="level" sortable header="Level"></Column>}
          <Column field="isActive" header="Active" body={statusBodyTemplate}  />
          <Column field="actions" header="Actions" body={iconBodyTemplate}  />
      </DataTable>
    }
    </>
  )
}