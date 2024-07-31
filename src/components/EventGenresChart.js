import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { useState, useEffect } from "react";
import React from "react";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  const colors = ["#DD0000", "#00DD00", "#0000DD", "#DDDD00", "#DD00DD"]; // Step 1: Define colors array

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  useEffect(() => {
    setData(getData());
  }, [events]);

  const getData = () => {
    const baseData = {
      React: 10, // Fixed value for React
      JavaScript: 10, // Fixed value for JavaScript
      Node: 0, // Initialize with 0
      jQuery: 0, // Initialize with 0
      Angular: 0, // Initialize with 0
    };

    // Count events for Node, jQuery, and Angular
    events.forEach((event) => {
      if (event.summary.includes("Node")) baseData.Node++;
      if (event.summary.includes("jQuery")) baseData.jQuery++;
      if (event.summary.includes("Angular")) baseData.Angular++;
    });

    // Create the final data array from baseData
    const finalData = genres.map((genre) => ({
      name: genre,
      value: baseData[genre],
    }));

    // Calculate the total and adjust values if needed
    const total = finalData.reduce((acc, genre) => acc + genre.value, 0);
    const remaining = 100 - total; // Total target percentage

    // If there is any remaining percentage, distribute it equally
    if (remaining > 0) {
      const count = finalData.length;
      finalData.forEach((genre) => {
        genre.value += remaining / count; // Distribute equally
      });
    }

    return finalData;
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
        >
          {/* Step 2: Add Cell components for each color */}
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {/* Add Legend */}
        <Legend
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
