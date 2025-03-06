import React, { useState, useMemo, useCallback } from 'react';
import { WeekData } from "./interface";

interface Props {
  dataObj: WeekData[];
}

const DataTable: React.FC<Props> = ({ dataObj = [] }) => {
  if (!Array.isArray(dataObj) || dataObj.length === 0) {
    return <div>No data available</div>;
  }

  const limitedData = useMemo(() => dataObj.slice(0, 52), [dataObj]);

  const rowsData = useMemo(() => limitedData.map((item) => ({
    ...item,
    CA_2G: Number(item.CA_2G),
  })), [limitedData]);

  const rows = useMemo(() => 
    Array.from({ length: Math.ceil(rowsData.length / 13) }, (_, i) =>
      rowsData.slice(i * 13, i * 13 + 13)
    ), [rowsData]);

  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const getColor = useCallback((value: number): string => {
    if (value === 100) return '#43a047';
    if (value >= 99.8) return 'orange';
    if (value === 0) return 'gray';
    return '#d32f2f';
  }, []);

  const handleMouseEnter = useCallback((item: WeekData & { CA_2G: string | number }, event: React.MouseEvent) => {
    setTooltip({
      visible: true,
      content: `${item.weak}: ${item.CA_2G}%`,
      x: event.clientX,
      y: event.clientY,
    });
    setHoveredKey(item.weak);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
    setHoveredKey(null);
  }, []);

  return (
    <div className="table-container">
      <div className="table">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((item) => {
              const weakValue = item.weak ? Number(item.weak.slice(-2)) : null;
              return (
                <div
                  key={item.weak}
                  className="cell"
                  style={{
                    backgroundColor: getColor(item.CA_2G),
                    padding: '10px',
                    border: '1px solid #ccc',
                    width: '5px',
                    height: '5px'
                  }}
                  onMouseEnter={(e) => handleMouseEnter(item, e)}
                  onMouseLeave={handleMouseLeave}
                >{weakValue !== null && weakValue > 17 && weakValue < 43 && <span>☀</span>}</div>
              );
            })}
          </div>
        ))}
      </div>

      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            color: 'black',
            position: 'fixed',
            left: tooltip.x + 10, // Смещение от курсора
            top: tooltip.y + 10,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '5px',
            borderRadius: '4px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <div>{tooltip.content}</div>
        </div>
      )}
    </div>
  );
};

export default DataTable;