import { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';

function PieChartCustomers() {
  const data = [
    { name: 'Asia', value: 24, fill: '#70c999' },
    { name: 'Europe', value: 26, fill: '#5db08e' },
    { name: 'Australia', value: 15, fill: '#4a9782' },
    { name: 'Africa', value: 25, fill: '#387d76' },
    { name: 'America', value: 10, fill: '#276367' },
  ];

  const renderCustomizedLabelPercentage = (data, total = 100) => {
    let percentageCalculated = (data.value / total) * 100;
    return percentageCalculated.toFixed(2).replace('.', ',').toString() + '%';
  };

  const renderLabel = useCallback((piePiece) => {
    return piePiece.name;
  }, []);
  // Render the pie chart
  return (
    <ResponsiveContainer minHeight={300} minWidth={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={'75%'}
          label={renderLabel}
        >
          <LabelList
            dy={-3}
            fill="white" // Percentage color
            // dataKey="percentage"
            dataKey={renderCustomizedLabelPercentage}
            position="inside"
            angle={0}
            stroke="none" // Border of letters
            className="label-percentage"
          />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartCustomers;
