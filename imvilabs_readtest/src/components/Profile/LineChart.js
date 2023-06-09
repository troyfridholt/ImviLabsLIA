import React from "react";
import './Profile.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const MyLineChart = ({ results }) => {
  const data = results.sort((a, b) => a.wpm - b.wpm)
    .filter((doc) => doc.wpm > 0 && doc.wpm < 300)
    .slice(0, 10)
    .map((doc, index) => {
      const { level, wpm, amountOfRightQuestions } = doc;
      return {
        level,
        wpm,
        amountOfRightQuestions,
        testNumber: index + 1,
      };
    });



    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis
              label={{ value: 'Testnummer', position: 'insideBottomRight', dy: 20, dx: -485, fontSize: 16, fill: '#000000' }}
              tick={{ fontSize: 14 }}
              tickLine={{ stroke: "#555" }}
            />
            <YAxis
              dataKey="wpm"
              domain={[50, 300]}
              tickCount={10}
              label={{
                value: 'Läshastighet',
                position: 'insideLeft',
                angle: -90,
                dx: 0,
                dy: 50,
                fontSize: 16,
                fill: '#000000'
              }}
              tick={{ fontSize: 10}}
              
            />
            <Tooltip
            animationDuration={1}
            labelStyle={{ fontSize: 14 }}
            itemStyle={{ fontSize: 14 }}
            content={({ active, payload }) => {
                if (active && payload) {
                return (
                    <div style={{ backgroundColor: "#fff", padding: "10px" }}>
                    <p style={{ margin: 0, color: "#BC4679"}}>{`WPM: ${payload[0].payload.wpm}`}</p>
                    <p style={{ margin: 0, color: "#4679BC"}}>{`Läsförståelse: ${payload[0].payload.amountOfRightQuestions}%`}</p>
                    </div>
                );
                }
                return null;
            }}
            />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#4679BC"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      );
};

export default MyLineChart;
