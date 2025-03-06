import { Spin } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBaseInfoQuery } from "./api/api";
import HeaderBase from "./HeaderBase";
import { WeekData } from "./interface";

const BaseInfo = () => {
  const { name } = useParams();
  const { data, error, isLoading } = useGetBaseInfoQuery(name);

  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (weekIndex: number, orderIndex: number) => {
    setExpandedOrders(prev => ({
      ...prev,
      [`${weekIndex}-${orderIndex}`]: !prev[`${weekIndex}-${orderIndex}`],
    }));
  };

  if (isLoading) {
    return (
      <div className="center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="center">
        Ошибка при загрузке данных
      </div>
    );
  }

  if (!data || !data.site_info) {
    return <div className="center">Данные отсутствуют</div>;
  }


  if (!data || data.length === 0) {
    return <h2>Выберите базовую станцию</h2>;
  }



  return (
    <main className="container">
      {name ? (
        <HeaderBase name={name} dataObj={data.site_info} />
      ) : (
        <div className="center">Имя не указано</div>
      )}
      <div className="Table-wrapper">
        <div className="tableContainer">
          <div className="grid">
            <div className="headerCell">Неделя</div>
            <div className="headerCell">Change of Battery</div>
            <div className="headerCell">Count of Alarms</div>
            <div className="headerCell">Time of Alarms</div>
            <div className="headerCell">Cell Availability</div>
            <div className="headerCell">Combine</div>
  
            {data?.site_info.map((week: WeekData, index: number) => (
              Number(week.CA_2G) < 100 && week.CA_2G !== '' && (
                <React.Fragment key={week.weak || index}>
                  <div className="dataCell">{week.weak}</div>
                  <div className="dataCell">{week.change_of_battery}</div>
                  <div className="dataCell">{week.count_of_alarms}</div>
                  <div className="dataCell">
                    {typeof week.time_of_alarms === 'string' && week.time_of_alarms.length > 0
                      ? (week.time_of_alarms.includes('1900')
                        ? week.time_of_alarms.split('T')[1]?.split('.')[0]
                        : week.time_of_alarms.split('.')[0])
                      : ''}
                  </div>
                  <div className="dataCell">{week.CA_2G} %</div>
                  <div className="dataCell dataCellLarge" dangerouslySetInnerHTML={{
                    __html: week.combined_text ? week.combined_text.replace(/\/n/g, '<br />') : ''
                  }}>
                  </div>
                </React.Fragment>
              )
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BaseInfo;