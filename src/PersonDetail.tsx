
interface PersonDetailProps {
    type: string; // Aquí definimos el tipo de la prop que se va a recibir
  }

export const PersonDetail: React.FC<PersonDetailProps> = ({type},{action}) => {
    {console.log('{type} {action}')
    console.log({type} ,{action})}
  return (
    <>
    <div>PersonDetail {type} {action}</div>
    
    </>
  )
}
