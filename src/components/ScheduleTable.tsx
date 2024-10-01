import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { ProductService } from './service/ProductService';

export const ScheduleTable = () => {
    const [courses, setCourses] = useState<Product[]>([]);

    /* useEffect(() => {
        CourseService.getProductsSmall().then((data) => setProducts(data));
    }, []); */

    const rowClass = (data: Courses) => {
        return {
            'bg-primary': data.category === 'Fitness'
        };
    };

    const stockBodyTemplate = (rowData: Courses) => {
        const stockClassName = classNames('border-circle w-2rem h-2rem inline-flex font-bold justify-content-center align-items-center text-sm', {
            'bg-red-100 text-red-900': rowData.students.length === 0,
            'bg-blue-100 text-blue-900': rowData.students.length > 0 && rowData.students.length < 4,
            'bg-teal-100 text-teal-900': rowData.students.length > 4
        });

        return <div className={stockClassName}>{rowData.quantity}</div>;
    };

    return (
        <div>
            <div>ScheduleTable</div>
            <DataTable value={courses} rowClassName={rowClass} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="day" header="Day"></Column>
                <Column field="hour" header="Hour"></Column>
                <Column field="teacher" header="Teacher"></Column>
                <Column field="quantity" header="Quantity" body={stockBodyTemplate}></Column>
                <Column field="isActive" header="Is Active" body={stockBodyTemplate}></Column>
            </DataTable>
        </div>
    )
}