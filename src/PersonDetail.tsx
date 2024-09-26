import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useState } from "react";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import Person, { Role } from "./models/Person";
import { Calendar } from "primereact/calendar";
import { companiesList } from "./data/company";

interface PersonDetailProps {
  selectedPerson: Person;
  rol: string; // Aquí definimos el tipo de la prop que se va a recibir
  onBack: () => void;
}

type FormValues = {
  id: number;
  rol: string;
  name: string;
  surname: string;
  alias?: string;
  email: string;
  phone: number;
  city: string;
  dob: Date;
  isActive: boolean;
  level?: string;
  companyId?: number;
};

export const PersonDetail: React.FC<PersonDetailProps> = ({
  rol,
  selectedPerson,
  onBack,
}) => {

  const [initialValues, setInitialValues] = useState(selectedPerson);

  const [formValues, setFormValues] = useState<FormValues>({
    id: selectedPerson.id,
    rol: selectedPerson.rol,
    name: selectedPerson.name,
    surname: selectedPerson.surname,
    alias: selectedPerson.alias,
    email: selectedPerson.email,
    phone: selectedPerson.phone,
    city: selectedPerson.city ?? '',
    dob: selectedPerson.dob,
    isActive: selectedPerson.isActive,
    ...('companyId' in selectedPerson && 'level' in selectedPerson
      ? {
        level: selectedPerson.level,
        companyId: selectedPerson.companyId,
      }
      : {}),
  });

  const handleDateChange = (date: Date | null) => {
    setFormValues({ ...formValues, dob: date ?? undefined });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSwitchChange = (e: InputSwitchChangeEvent) => {
    setFormValues(({
      ...formValues,
      [e.target.id]: e.value // Actualiza el valor basado en el id del input
    }));
  };

  const handleErrorMessage = (id: string) => {
    //ACA DEBERIA GENERAR EL HTML Y ENVIAR EL ERROR DESDE ACA
    return <Message severity="error" text={`${id} is required`} />;
  };

  const updatePerson = () => {
    const updatedFields: Partial<Person> = {};

    Object.keys(formValues).forEach((key) => {
      const typedKey = key as keyof FormValues;
      if (formValues[typedKey] !== selectedPerson[typedKey] && formValues[typedKey] !== undefined) {
        updatedFields[typedKey] = formValues[typedKey];
      }

      return updatedFields;
    });
    console.log('updatedFields');
    console.log(updatedFields);
  };

  const handleInvalidField = (field: string) => {
    return (
      field.length < 2
    )
  }

  const searchCompany = (companyId: number) => {
    const matchedCompany = companiesList.find(company => company.id === companyId)
    console.log('matchedCompany')
    console.log({ matchedCompany })
  }

  return (
    <>
      <Button onClick={onBack} label="Back" icon="pi pi-chevron-left" />
      <h1>
        Edit {rol.toUpperCase()} {formValues.name} {formValues.surname}
      </h1>

      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputText
          invalid={handleInvalidField(formValues.name)}
          id="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleInputChange}
          className="mr-2"
        />
      </div>
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputText
          invalid={handleInvalidField(formValues.surname)}

          id="surname"
          placeholder="Surname"
          value={formValues.surname}
          onChange={handleInputChange}
          className="mr-2"
        />

        {!formValues.surname && handleErrorMessage("surname")}
      </div>
      {rol === Role.STUDENT && (
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <InputText
            invalid={handleInvalidField(formValues.level || '')}
            id="level"
            placeholder="Level"
            value={formValues.level}
            onChange={handleInputChange}
            className="mr-2"
          />

          {!formValues.level && (
            <Message severity="error" text="Level is required" />
          )}
        </div>
      )}
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputText
          invalid={handleInvalidField(formValues.email)}

          id="email"
          type="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleInputChange}
          className="mr-2"
        />

        {!formValues.email && (
          <Message severity="error" text="Email is required" />
        )}
      </div>
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputText
          invalid={handleInvalidField(formValues.phone.toString())}

          id="phone"
          type="number"
          placeholder="Phone"
          value={formValues.phone.toString()}
          onChange={handleInputChange}
          className="mr-2"
        />

        {!formValues.phone && (
          <Message severity="error" text="Phone is required" />
        )}
      </div>
      {selectedPerson.dob}
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <Calendar
          //invalid={handleInvalidField(formValues.dob)}

          id="dob"
          placeholder="Dob"
          value={formValues.dob ?? undefined}
          onChange={(e) => handleDateChange(e.value as Date)}
          className="mr-2"
        />
        {!formValues.dob && (
          <Message severity="error" text="Date of Birthday is required" />
        )}
      </div>
      {selectedPerson.rol === Role.STUDENT && (
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <InputText
            //invalid={handleInvalidField(formValues.companyId)}
            id="companyId"
            type="number"
            placeholder="companyId"
            value={(formValues.companyId ?? '').toString()}
            onChange={handleInputChange}
            className="mr-2"
          />

          {!formValues.companyId && (
            <Message severity="error" text="companyId is required" />
          )}
        </div>
      )}
      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputText
          invalid={handleInvalidField(formValues.city)}
          id="city"
          placeholder="City"
          value={formValues.city}
          onChange={handleInputChange}
          className="mr-2"
        />

        {!formValues.city && (
          <Message severity="error" text="city is required" />
        )}
      </div>

      <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputSwitch
          id="isActive"
          placeholder="IsActive"
          checked={formValues.isActive}
          onChange={handleSwitchChange}
          className="mr-2"
        />
        <Message
          severity={formValues.isActive ? "success" : "error"}
          text={formValues.isActive ? "Active" : "Inactive"}
        />
      </div>

      <div className="card flex justify-content-center">
        <Button label="Submit" disabled />
        <Button onClick={updatePerson} label="Update" icon="pi pi-sync" />
      </div>
    </>
  );
};
