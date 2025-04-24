
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "00:00", latency: 120 },
  { time: "03:00", latency: 132 },
  { time: "06:00", latency: 125 },
  { time: "09:00", latency: 130 },
  { time: "12:00", latency: 128 },
  { time: "15:00", latency: 122 },
  { time: "18:00", latency: 129 },
  { time: "21:00", latency: 123 },
];

const PerformanceChart = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Performance nas Últimas 24 Horas</h2>
      <Card className="p-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="latency"
                stroke="#9b87f5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceChart;
