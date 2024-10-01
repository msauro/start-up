import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { useState } from 'react';
import { StudentContainer } from './StudentContainer';
import { TeacherContainer } from './TeacherContainer';
import { BreadCrumb } from './components/Breadcrumb';
import { ScheduleContainer } from './ScheduleContainer';
import { ContactContainer } from './ContactContainer';
import { HomeContainer } from './HomeContainer';
import { ManagementContainer } from './ManagementContainer';

enum menubar {
    HOME,
    TEACHER,
    STUDENT,
    SCHEDULE,
    MANAGEMENT,
    CONTACT
}

export const StartUpContainer = () => {

    const [selectedMenu, setSelectedMenu] = useState<menubar>(menubar.HOME)

    const onClickMenu = (e: menubar) => {
        setSelectedMenu(e)
    }

    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => onClickMenu(menubar.HOME)
        },
        {
            label: 'Teachers',
            icon: 'pi pi-user-edit',
            command: () => onClickMenu(menubar.TEACHER)

        },
        {
            label: 'Students',
            icon: 'pi pi-users',
            command: () => onClickMenu(menubar.STUDENT)

        },
        {
            label: 'Schedule',
            icon: 'pi pi-calendar',
            command: () => onClickMenu(menubar.SCHEDULE),
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
                            icon: 'pi pi-palette',
                            url: '/theming'
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
            label: 'Management',
            icon: 'pi pi-wallet',
            command: () => onClickMenu(menubar.MANAGEMENT),
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            command: () => onClickMenu(menubar.CONTACT),

        }
    ];

    return (
        <>
            <Menubar model={items} />

            <BreadCrumb breadCrumbName={menubar[selectedMenu]} />

            {selectedMenu === menubar.HOME && (
                <>
                    <HomeContainer />
                </>
            )}
            {selectedMenu === menubar.STUDENT && (
                <>
                    <StudentContainer />
                </>
            )}
            {selectedMenu === menubar.TEACHER && (
                <TeacherContainer />
            )}
            {selectedMenu === menubar.SCHEDULE && (
                <ScheduleContainer />
            )}
            {selectedMenu === menubar.MANAGEMENT && (
                <ManagementContainer />
            )}
            {selectedMenu === menubar.CONTACT && (
                <ContactContainer />
            )}


        </>
    )
}
