

interface Props {
  name: string
}

const HeaderBase: React.FC<Props> = ({ name }) => {
  return (
    <>
      <h2>{name}</h2>
      <div>
        <p>Приоритет: {name}</p>
        <p>Кол-во аварий: {name}</p>
        <p>Продолжительность аварий: {name}</p>
        <p>Дата запуска: {name}</p>
      </div>
    </>
  )
}

export default HeaderBase
