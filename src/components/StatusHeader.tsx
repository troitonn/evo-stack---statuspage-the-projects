
import { CheckCircle, AlertTriangle } from "lucide-react";

type SystemStatus = "operational" | "in_progress" | "completed";

const StatusHeader = () => {
  const systemStatus: SystemStatus = "operational";

  const getStatusInfo = () => {
    if (systemStatus === "operational") {
      return {
        icon: <CheckCircle className="w-8 h-8 text-[#5050ff]" />,
        text: "Projeto em Andamento",
        bgColor: "bg-[#5050ff]/10",
        textColor: "text-[#5050ff]"
      };
    }
    if (systemStatus === "in_progress") {
      return {
        icon: <AlertTriangle className="w-8 h-8 text-[#5050ff]" />,
        text: "Projeto em Progresso",
        bgColor: "bg-[#5050ff]/10",
        textColor: "text-[#5050ff]"
      };
    }
    return {
      icon: <CheckCircle className="w-8 h-8 text-[#5050ff]" />,
      text: "Projeto Concluído",
      bgColor: "bg-[#5050ff]/10",
      textColor: "text-[#5050ff]"
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <img
          src="/evostack-logo.png"
          alt="Evostack Logo"
          className="h-12 mb-8"
        />
        <div className={`flex items-center gap-4 p-4 rounded-lg ${statusInfo.bgColor}`}>
          {statusInfo.icon}
          <h1 className={`text-2xl font-semibold ${statusInfo.textColor}`}>
            {statusInfo.text}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;
