
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const StatusHeader = () => {
  const systemStatus = "operational"; // Simulando status

  const getStatusInfo = () => {
    switch (systemStatus) {
      case "operational":
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          text: "Todos os sistemas operacionais",
          bgColor: "bg-green-50",
          textColor: "text-green-700"
        };
      case "partial":
        return {
          icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
          text: "Degradação parcial",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700"
        };
      case "down":
        return {
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          text: "Sistemas indisponíveis",
          bgColor: "bg-red-50",
          textColor: "text-red-700"
        };
      default:
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          text: "Sistemas operacionais",
          bgColor: "bg-green-50",
          textColor: "text-green-700"
        };
    }
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
