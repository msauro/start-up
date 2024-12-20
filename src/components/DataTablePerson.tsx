import React, { useState, useEffect } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Person, { Role } from '../models/Person';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';
import { PersonDetail } from '../PersonDetail';
import { AddButton } from './AddButton';
import { getCompany, getLevel } from '../utils/utils';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

enum ActionType {
    DETAIL = 'detail',
    DELETE = 'delete',
    NEW = 'new'
}

interface ColumnMeta {
    field?: string;
    header: string;
    body?: (rowData: Person) => React.ReactNode;
}
interface DataTableProps {
    dataPerson: Person[];
    dataPersonActive: Person[];
    role: Role;
    handleUpdatePerson: (person: Person) => void;
}

export const DataTablePerson: React.FC<DataTableProps> = ({ dataPerson, dataPersonActive, role, handleUpdatePerson }) => {
    const [switchIsActive, setSwitchIsActive] = useState<boolean>(false);
    const [data, setData] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person>();
    const [action, setAction] = useState<string | null>();
    const footer = `In total there are ${data ? data.length : 0} rows.`;
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'company.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [showPersonDetail, setShowPersonDetail] = useState<boolean>();

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
    /* const statusBodyTemplate = (rowData: Person) => {
        return <Tag value={rowData.isActive.toString()} severity={getSeverity(rowData.isActive)} />;
    }; */

    const levelBodyTemplate = (rowData: Person) => {
        return <span>{getLevel(rowData.levelId)?.name}</span>
    };

    const companyBodyTemplate = (rowData: Person) => {
        return <span>{getCompany(rowData.companyId)?.name}</span>
    };

    //HACER FUNCION PARA DETERMINAR SI DEBE O NO EL ALUMNO!!!!!!!!
    const quoteBodyTemplate = (rowData: Person) => {
        const companyName = getCompany(rowData.companyId)?.name
        const deuda = companyName ? <Tag value={companyName} severity='danger' /> :
            <span></span>;
        return deuda

    };

    const columnsPerson: ColumnMeta[] = [
        { field: 'name', header: 'Name' },
        { field: 'surname', header: 'Surname' },
        { field: 'email', header: 'Mail' },
        { field: 'phone', header: 'Phone' },
        { field: 'alias', header: 'alias' },
        { header: 'Actions', body: iconBodyTemplate },

    ];

    const [columns, setColumns] = useState<ColumnMeta[]>(columnsPerson)

    //setData(switchIsActive ? dataPerson : dataPersonActive)

    useEffect(() => {
        setData(switchIsActive ? dataPerson : dataPersonActive);
    }, [switchIsActive, dataPerson, dataPersonActive]);

    useEffect(() => {
        if (role === Role.STUDENT) {
            handleColumnType(Role.STUDENT)
        } else {
            setColumns(columnsPerson)
            handleColumnType(Role.TEACHER)
        }
        //     TeachersService.getTeachers().then(data => setTeachers(data));
    }, [role]);

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
        console.log('selectedPerson')
        console.log(selectedPerson)
        return (
            <PersonDetail
                selectedPerson={selectedPerson}
                handleUpdatePerson={handleUpdatePerson}
                handleBackClick={handleBackClick}
            />
        );
    } else if (action === ActionType.DELETE && selectedPerson) {
        console.log('ELIMINAR')
        selectedPerson.isActive = false;
        console.log(selectedPerson);
        handleUpdatePerson(selectedPerson)
        setAction(null);

    } else if (action === ActionType.NEW) {
        console.log('HOLA PERDIDAD')
        return (
            <PersonDetail
                handleBackClick={handleBackClick}
                handleUpdatePerson={handleUpdatePerson}
            />
        )
    }

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const _filters = { ...filters };

        // // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const handleColumnType = (rol: string) => {

        const rolColumns: ColumnMeta[] = rol === Role.STUDENT ? [
            { field: 'companyId', header: 'Company', body: companyBodyTemplate },
            { field: 'levelId', header: 'Level', body: levelBodyTemplate },
            { header: 'Debe', body: quoteBodyTemplate },
        ] : [
            { header: 'CBU/ALIAS', body: (rowData: Person) => <span>{rowData.cbu}</span> },


        ]
        const newColumns = [
            ...columnsPerson.slice(0, -1), // Todos menos la última columna (Actions)
            ...rolColumns, // Nuevas columnas de estudiantes
            columnsPerson[columnsPerson.length - 1] // Añade la columna de Actions al final
        ];
        setColumns(newColumns)
    }

    const header = renderHeader();

    const handleAddPerson = () => {
        setAction(ActionType.NEW)
        setShowPersonDetail(true); // Cambia el estado para mostrar PersonDetail

    }



    return (
        <>
            <AddButton onClick={handleAddPerson} />
            {showPersonDetail && <PersonDetail handleBackClick={handleBackClick} />}
            <Button label="Add1" icon="pi pi-plus" onClick={handleAddPerson} />

            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-metakey" checked={switchIsActive} onChange={(e: InputSwitchChangeEvent) => setSwitchIsActive(e.value!)} />
                <label htmlFor="input-metakey">{switchIsActive ? "All" : "Actives"}</label>
            </div>
            <DataTable value={data} footer={footer} tableStyle={{ minWidth: '50rem' }} filters={filters} filterDisplay="row"
                globalFilterFields={['name', 'surname', 'email', 'phone', 'alias', 'company', 'debe', 'level']} header={header} emptyMessage="No results found.">
                {columns.map((col, i) => (
                    <Column key={i} field={col.field} header={col.header} body={col.body} sortable />
                ))}

            </DataTable>
        </>
    );
}


