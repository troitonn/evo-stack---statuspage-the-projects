
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Service {
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: number;
}

const services: Service[] = [
  { name: "API", status: "operational", uptime: 99.99 },
  { name: "Dashboard", status: "operational", uptime: 99.95 },
  { name: "Database", status: "operational", uptime: 99.99 },
  { name: "Authentication", status: "operational", uptime: 99.98 }
];

const ServiceStatus = () => {
  const getStatusIcon = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "down":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Status dos Serviços</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.name} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(service.status)}
                <span className="font-medium">{service.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                Uptime: {service.uptime}%
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceStatus;
