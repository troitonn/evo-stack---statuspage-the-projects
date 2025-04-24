
import { CheckCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  const progress = calculateProgress();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#060a23]">Progresso do Projeto</h2>
          <span className="text-lg font-medium text-[#5050ff]">
            {progress.toFixed(0)}%
          </span>
        </div>
        <Progress value={progress} className="h-3 rounded-full" />
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>Início</span>
          <span>Em Andamento</span>
          <span>Conclusão</span>
        </div>
      </div>
      
      {Array.from(new Set(stages.map(stage => stage.category))).map(category => (
        <div key={category} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-medium text-[#060a23]">{category}</h3>
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">
              {stages.filter(s => s.category === category && s.status === "completed").length}/
              {stages.filter(s => s.category === category).length}
            </span>
          </div>
          <div className="grid gap-4">
            {stages
              .filter(stage => stage.category === category)
              .map((stage, index) => (
                <Card key={stage.name} 
                      className={`p-4 transition-all duration-300 hover:shadow-lg ${
                        stage.status === "in_progress" 
                          ? "border-[#5050ff] shadow-lg bg-[#5050ff]/5" 
                          : "hover:border-[#5050ff]/30"
                      }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleStageStatus(
                          stages.findIndex(s => s.name === stage.name)
                        )}
                        className="flex items-center justify-center focus:outline-none hover:scale-110 transition-transform"
                      >
                        {getStatusIcon(stage.status)}
                      </button>
                      <span className={`font-medium transition-colors ${
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
