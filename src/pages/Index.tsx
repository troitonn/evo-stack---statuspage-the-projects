
import StatusHeader from "@/components/StatusHeader";
import ServiceStatus from "@/components/ServiceStatus";
import PerformanceChart from "@/components/PerformanceChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6">
        <StatusHeader />
        <ServiceStatus />
        <PerformanceChart />
      </div>
    </div>
  );
};

export default Index;
