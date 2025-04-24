
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "Início", progress: 0 },
  { time: "Alinhamento", progress: 25 },
  { time: "Tecnologia", progress: 50 },
  { time: "Treinamento", progress: 75 },
  { time: "Sucesso", progress: 100 },
];

const PerformanceChart = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#060a23]">Progresso por Etapa</h2>
      <Card className="p-4 bg-white">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#5050ff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceChart;
