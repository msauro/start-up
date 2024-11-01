import { Button } from "primereact/button"


export const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="card flex flex-wrap justify-content-end gap-3">
      <Button label="Add" icon="pi pi-plus" onClick={onClick} />
    </div>
  )
}
