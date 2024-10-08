import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Person, { Role } from '../models/Person';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { PersonDetail } from '../PersonDetail';
import { AddButton } from './AddButton';
import { getCompany, getLevel } from '../utils/utils';

enum ActionType {
    DETAIL = 'detail',
    DELETE = 'delete'
}


interface ColumnMeta {
    field?: string;
    header: string;
    body?: (rowData: Person) => React.ReactNode;
}
interface DataTableProps {
    dataPerson: Person[];
    role: Role;
    handleUpdatePerson: (person: Person) => void;
}

export const DataTablePerson: React.FC<DataTableProps> = ({ dataPerson, role, handleUpdatePerson }) => {
    const [switchIsActive, setSwitchIsActive] = useState<boolean>(false);
    const [data, setData] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person>();
    const [action, setAction] = useState<string | null>();
    const footer = `In total there are ${data ? data.length : 0} rows.`;
    const dataPersonFiltered = dataPerson.filter((row) => row.isActive == true)

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
    const statusBodyTemplate = (rowData: Person) => {
        return <Tag value={rowData.isActive.toString()} severity={getSeverity(rowData.isActive)} />;
    };

    const levelBodyTemplate = (rowData: Person) => {
        return <Tag value={getLevel(rowData.levelId)?.name} severity={getSeverity(rowData.isActive)} />;
    };
    const companyBodyTemplate = (rowData: Person) => {
        return <Tag value={getCompany(rowData.companyId)?.name} severity={getSeverity(rowData.isActive)} />;
    };

    //HACER FUNCION PARA DETERMINAR SI DEBE O NO EL ALUMNO!!!!!!!!
    const quoteBodyTemplate = (rowData: Person) => {
        return <Tag value={getCompany(rowData.companyId)?.name} severity={getSeverity(rowData.isActive)} />;
    };


    const columnsPerson: ColumnMeta[] = [
        { field: 'name', header: 'Name' },
        { field: 'surname', header: 'Surname' },
        { field: 'email', header: 'Mail' },
        { field: 'phone', header: 'Phone' },
        { field: 'alias', header: 'alias' },
        { header: 'Active', body: statusBodyTemplate },
        { header: 'Actions', body: iconBodyTemplate },

    ];

    const [columns, setColumns] = useState<ColumnMeta[]>(columnsPerson)


    useEffect(() => {

        if (switchIsActive) {
            setData(dataPerson)

        } else {
            setData(dataPersonFiltered)
        }
        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, [switchIsActive]);

    useEffect(() => {

        if (role === Role.STUDENT) {
            handleColumnsStudents()

        } else {
            setColumns(columnsPerson)
        }
        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, [role]);

    const getSeverity = (isActive: boolean) => {
        return isActive ? 'success' : 'danger'
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



    if (action === ActionType.DETAIL && selectedPerson) {
        return (
            <PersonDetail
                selectedPerson={selectedPerson}
                handleUpdatePerson={handleUpdatePerson}
                handleBackClick={handleBackClick}
            />
        );
    }

    const handleColumnsStudents = () => {
        const studentColumns: ColumnMeta[] = [
            { header: 'Company', body: companyBodyTemplate },
            { header: 'Level', body: levelBodyTemplate },
            { header: 'Debe?', body: quoteBodyTemplate },

        ];

        //PARA DEJAR LA COLUMNA ACTIONS SIEMPRE AL FINAL
        const newColumns = [
            ...columnsPerson.slice(0, -1), // Todos menos la última columna (Actions)
            ...studentColumns, // Nuevas columnas de estudiantes
            columnsPerson[columnsPerson.length - 1] // Añade la columna de Actions al final
        ];

        setColumns(newColumns);
    }

    return (
        <>
            <AddButton />

            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-metakey" checked={switchIsActive} onChange={(e: InputSwitchChangeEvent) => setSwitchIsActive(e.value!)} />
                <label htmlFor="input-metakey">Show all</label>
            </div>
            <DataTable value={data} footer={footer} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={i} field={col.field} header={col.header} body={col.body} />
                ))}
            </DataTable>
        </>
    );
}


