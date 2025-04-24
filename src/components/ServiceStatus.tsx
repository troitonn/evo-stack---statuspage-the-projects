
import { CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface Stage {
  name: string;
  status: "completed" | "in_progress" | "pending";
  category: string;
}

const initialStages: Stage[] = [
  { category: "Início", name: "Início do Onboarding", status: "completed" },
  { category: "Início", name: "Contrato assinado", status: "completed" },
  { category: "Financeiro", name: "Aguardando Entrada", status: "completed" },
  { category: "Alinhamento", name: "Envio de Briefing", status: "in_progress" },
  { category: "Alinhamento", name: "Briefing", status: "pending" },
  { category: "Alinhamento", name: "Expectativas", status: "pending" },
  { category: "Tecnologia", name: "Apontamento de Domínio", status: "pending" },
  { category: "Tecnologia", name: "Customização", status: "pending" },
  { category: "Tecnologia", name: "UPProd(Concluido)", status: "pending" },
  { category: "Treinamento", name: "1º Reunião - Contas e Aberturas", status: "pending" },
  { category: "Treinamento", name: "2º Reunião - Sistemas e módulos", status: "pending" },
  { category: "Treinamento", name: "3º Reunião - Painel de admin e status", status: "pending" },
  { category: "Treinamento", name: "4º Reunião - Explicação de todos os serviços", status: "pending" },
  { category: "Treinamento", name: "Como entrar em contato com o suporte", status: "pending" },
  { category: "Sucesso", name: "1° Reunião", status: "pending" },
  { category: "Sucesso", name: "Reunião de correções e melhorias", status: "pending" },
  { category: "Sucesso", name: "Criação de Diário de bordo", status: "pending" }
];

const ServiceStatus = () => {
  const [stages, setStages] = useState<Stage[]>(initialStages);

  const getStatusIcon = (status: Stage["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-[#5050ff]" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-[#5050ff]" />;
      case "pending":
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const calculateProgress = () => {
    const completed = stages.filter(stage => stage.status === "completed").length;
    return (completed / stages.length) * 100;
  };

  const toggleStageStatus = (index: number) => {
    const newStages = [...stages];
    const currentStatus = newStages[index].status;
    
    // Cycle through statuses: pending -> in_progress -> completed -> pending
    if (currentStatus === "pending") {
      newStages[index].status = "in_progress";
    } else if (currentStatus === "in_progress") {
      newStages[index].status = "completed";
    } else {
      newStages[index].status = "pending";
    }
    
    setStages(newStages);
  };

  const currentCategory = stages.find(stage => stage.status === "in_progress")?.category || "";

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#060a23]">Progresso do Projeto</h2>
        <Progress value={calculateProgress()} className="h-2" />
      </div>
      
      {Array.from(new Set(stages.map(stage => stage.category))).map(category => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-[#060a23]">{category}</h3>
          <div className="grid gap-4">
            {stages
              .filter(stage => stage.category === category)
              .map((stage, index) => (
                <Card key={stage.name} 
                      className={`p-4 transition-all duration-300 hover:shadow-lg ${
                        stage.status === "in_progress" ? "border-[#5050ff] shadow-lg" : ""
                      }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleStageStatus(
                          stages.findIndex(s => s.name === stage.name)
                        )}
                        className="flex items-center justify-center focus:outline-none"
                      >
                        {getStatusIcon(stage.status)}
                      </button>
                      <span className={`font-medium ${
                        stage.status === "completed" ? "text-[#5050ff]" :
                        stage.status === "in_progress" ? "text-[#5050ff]" :
                        "text-gray-500"
                      }`}>
                        {stage.name}
                      </span>
                    </div>
                  </div>
                </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceStatus;
