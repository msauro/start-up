import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';


    export const StartUpContainer = () => {
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Teachers',
            icon: 'pi pi-user-edit'
        },
        {
            label: 'Students',
            icon: 'pi pi-users'
        },
        {
            label: 'Schedule',
            icon: 'pi pi-calendar',
            items: [
                {
                    label: 'Elementary',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Pre-Intermediate',
                    icon: 'pi pi-server'
                },
                {
                    label: 'Intermediate',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Upper',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];
    
    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}
