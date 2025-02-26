import { Spin } from "antd"
import { useGetBaseInfoQuery } from "./api/api"
import { useParams } from "react-router-dom"

const BaseInfo = () => {
  const { name } = useParams()
  const { data, error, isLoading } = useGetBaseInfoQuery(name)

  if (isLoading) return <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spin /></div>
  if (error) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red'}}>Ошибка при загрузке данных</div>

  return (
    <main style={{ padding: "10px", flex: 1 }}>
      {data ? (
        <>
          <h2>{name}</h2>
          <div>
            <p>Приоритет: {data.priority}</p>
            <p>Кол-во аварий: {data.alarmCount}</p>
            <p>Продолжительность аварий: {data.duration}</p>
            <p>Дата запуска: {data.startDate}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Неделя</th>
                <th>Change of Battery</th>
                <th>Count of Alarms</th>
                <th>Time of Alarms</th>
                <th>Cell Availability Combine</th>
              </tr>
            </thead>
            <tbody>
              {data?.site_info.data?.map((week, index) => (
                <tr key={index}>
                  <td>{week.index}</td>
                  <td>{week.Change_of_battery}</td>
                  <td>{week.Count_of_alarms}</td>
                  <td>
                    {typeof week.Time_of_alarms === 'string' && week.Time_of_alarms.length > 0 
                      ? (week.Time_of_alarms.includes('1900') 
                          ? week.Time_of_alarms.split('T')[1]?.split('.')[0] 
                          : week.Time_of_alarms.split('.')[0]) 
                      : ''}
                  </td>
                  <td>{week.CA_2G} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>Выберите базовую станцию</h2>
      )}
    </main>
  )
}

export default BaseInfo
