import { BarChartData } from "@/data/mockData";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Chart data

// Functional Component
const BarChartExample: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={BarChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={140}
            className="max-md:text-xs md:text-xs lg:text-[15px]"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="jobsApplied"
            fill="#8884d8"
            name="Jobs Applied"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="openings"
            fill="#82ca9d"
            name="Openings"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartExample;
