import { getAllJobApplications } from "@/api/services";
import React, { useEffect, useState } from "react";
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
import { summarizeJobApplications } from "./helpers";
import { BarChartData as mockBarChartData } from "@/data/mockData";
// Chart data

// Functional Component
const BarChartExample: React.FC = () => {
  const [barChartData, setBarChartData] = useState<any[]>(
    mockBarChartData || []
  );
  const fetchJobDetails = async () => {
    const response = await getAllJobApplications();
    if (response && response.data) {
      console.log("Job Details:", response.data);
      setBarChartData(
        summarizeJobApplications(response.data) || mockBarChartData
      );
    } else {
      console.error("Failed to fetch job details");
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);
  return (
    <div style={{ width: "100%", height: 400, marginTop: "20px" }}>
      <ResponsiveContainer>
        <BarChart
          data={barChartData}
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
          <Legend />{" "}
          <Bar
            dataKey="jobsApplied"
            fill="#8884d8"
            name="Jobs Applied"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartExample;
