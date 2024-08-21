
import { Message } from 'primereact/message';

interface BreadCrumbProps {
    breadCrumbName: string;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadCrumbName }) => {
    const content = (
        <div className="flex align-items-center">
            <img alt="logo" src="https://www.startupenglish.com.ar/wp-content/uploads/2023/03/startup_english_logo.png" width="32" />
            <div className="ml-2">{breadCrumbName}</div>
        </div>
    );

    return (
        <div className="">
            <Message
                style={{
                    border: 'solid #696cff',
                    borderWidth: '0 0 0 6px',
                    color: '#696cff',
                    marginTop: 15
                }}
                className="border-primary w-full justify-content-start"
                severity="info"
                content={content}
            />
        </div>
    )
}
        