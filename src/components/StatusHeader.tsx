import { CheckCircle, AlertTriangle } from "lucide-react";

type SystemStatus = "operational" | "in_progress" | "completed";

const StatusHeader = () => {
  const systemStatus: SystemStatus = "operational";

  const getStatusInfo = () => {
    if (systemStatus === "operational") {
      return {
        icon: <CheckCircle className="w-8 h-8 text-[#5050ff]" />,
        text: "Projeto em Andamento",
        bgColor: "bg-gradient-to-r from-[#5050ff]/10 to-[#6060ff]/5",
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
    <div className="w-full bg-white/50 backdrop-blur-sm shadow-lg">
      <div className="flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent opacity-70" />
        <div className="relative z-10 space-y-8">
          <img
            src="/lovable-uploads/db40c2bd-6c39-4d5e-bcdf-05646ae13cd1.png"
            alt="Evostack Logo"
            className="h-16 transform hover:scale-105 transition-all duration-300 hover:drop-shadow-xl"
          />
          <div 
            className={`flex items-center gap-4 p-6 rounded-xl ${statusInfo.bgColor}
                       transform hover:scale-102 transition-all duration-300
                       hover:shadow-lg backdrop-blur-sm`}
          >
            <div className="animate-pulse">
              {statusInfo.icon}
            </div>
            <h1 className={`text-2xl font-bold ${statusInfo.textColor} tracking-tight`}>
              {statusInfo.text}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusHeader;
