import DataTable from "./DataTable";
import { WeekData } from "./interface";


interface Props {
  name: string,
  dataObj: WeekData[]
}


const HeaderBase: React.FC<Props> = ({ name, dataObj }) => {

  return (
    <>
      <h2>{name || 'NS1022'}</h2>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <p>Приоритет: {name}</p>
          <p>Кол-во аварий: {name}</p>
          <p>Продолжительность аварий: {name}</p>
          <p>Дата запуска: {name}</p>
        </div>
        <div>
          <DataTable dataObj={dataObj}/>
        </div>
      </div>
    </>
  )
}

export default HeaderBase
