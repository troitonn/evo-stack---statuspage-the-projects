
import StatusHeader from "@/components/StatusHeader";
import ServiceStatus from "@/components/ServiceStatus";
import PerformanceChart from "@/components/PerformanceChart";
import { useState } from "react";

const Index = () => {
  const [projectProgress, setProjectProgress] = useState(0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <StatusHeader progress={projectProgress} />
        <ServiceStatus onProgressChange={setProjectProgress} />
        <PerformanceChart />
      </div>
    </div>
  );
};

export default Index;
