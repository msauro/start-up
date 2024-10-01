import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Person, { Role } from '../models/Person';
import { useEffect, useState } from 'react';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { PersonDetail } from '../PersonDetail';
import { AddButton } from './AddButton';

interface Data {
  dataPerson: Person[];
  handleUpdateStudent: (studentRow: Person) => void;
}

enum ActionType {
  DETAIL = 'detail',
  DELETE = 'delete'
}

export const DataTableSt: React.FC<Data> = ({ dataPerson, handleUpdateStudent }) => {
  const [switchIsActive, setSwitchIsActive] = useState<boolean>(false);
  const [data, setData] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person>();
  const [action, setAction] = useState<string | null>();
  const footer = `In total there are ${data ? data.length : 0} rows.`;
  const dataPersonFiltered = dataPerson.filter((row) => row.isActive == true)

  /*  COMO PUEDO MOSTRAR EL NOMBRE DE LA COMPAÑIA, DEBERUA HACER UN FIND DENTRO DE DATA PERSON
   PARA VER SI TIENE COMPANYID? */

  /*  if (selectedPerson.rol === Role.STUDENT && selectedPerson.companyId){
     searchCompany(selectedPerson.companyId) //mando el id y recupero el nombre de la empresa, con un find o alguna funcion de arrays
   } */

  useEffect(() => { //seberia agregar al set data la compañia? o solo la muestro en la tabla?

    if (switchIsActive) {
      setData(dataPerson)

    } else {
      setData(dataPersonFiltered)
    }
    //     TeachersService.getTeachers().then(data => setTeachers(data));
  }, [switchIsActive]);


  const getSeverity = (isActive: boolean) => {
    return isActive ? 'success' : 'danger'
  };


  const statusBodyTemplate = (rowData: Person) => {
    return <Tag value={rowData.isActive.toString()} severity={getSeverity(rowData.isActive)} />;
  };

  const handleIconClick = (personRow: Person, action: string) => {
    setSelectedPerson(personRow)
    setAction(action)

    //return <PersonDetail selectedPerson={selectedPerson} action={action}/>
  }

  const handleBackClick = () => {
    setSelectedPerson(undefined);
    setAction(null);
  };

  const iconBodyTemplate = (personRow: Person) => {
    return (
      <>
        <Button
          icon='pi pi-eye'
          value='detail'
          className='primary'
          onClick={() => handleIconClick(personRow, ActionType.DETAIL)}
        />
        <Button
          icon='pi pi-trash'
          value='trash'
          className='primary'
          severity='danger'
          style={{ marginLeft: '5px' }}
          onClick={() => handleIconClick(personRow, ActionType.DELETE)} />
      </>
    )
  };

  if (action === ActionType.DETAIL && selectedPerson) {
    return (
      <PersonDetail
        selectedPerson={selectedPerson}
        handleUpdateStudent={handleUpdateStudent}
        handleBackClick={handleBackClick}
      />
    );
  }

  return (
    <>
      <AddButton />

      <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch inputId="input-metakey" checked={switchIsActive} onChange={(e: InputSwitchChangeEvent) => setSwitchIsActive(e.value!)} />
        <label htmlFor="input-metakey">Show all</label>
      </div>
      {
        data &&
        <DataTable value={data} footer={footer} stripedRows tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" sortable header="Name"></Column>
          <Column field="surname" sortable header="Surname"></Column>
          <Column field="email" header="Mail"></Column>
          <Column field="phone" header="Phone"></Column>
          {dataPerson[0].rol === Role.STUDENT &&
            <>
              <Column field="level" sortable header="Level"></Column>
              <Column field="companyId" sortable header="Company"></Column>
            </>

          }
          <Column field="alias" sortable header="Alias"></Column>
          <Column field="isActive" header="Active" body={statusBodyTemplate} />
          <Column field="actions" header="Actions" body={iconBodyTemplate} />
        </DataTable>
      }

    </>
  )
}