import React, { useState } from "react";
import { DollarSign, Flame, Sparkles, TrendingUp, Calendar, ShoppingBag, ArrowRight, CheckCircle2, User, Home, Building } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GoalScenario {
  id: string;
  badge: string;
  title: string;
  icon: React.ReactNode;
  audience: string;
  volume: string;
  ingredientsCost: string;
  grossRevenue: string;
  netProfit: string;
  effort: string;
  realisticOutcome: string;
  colorClass: string;
  borderColor: string;
}

export default function ProfitCalculator() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("bronze");

  const scenarios: GoalScenario[] = [
    {
      id: "bronze",
      badge: "META INICIAL BRONZE",
      title: "Arraiá entre Amigos & Vizinhos",
      icon: <Home className="w-5 h-5" />,
      audience: "Esposa, maridos, parentes mais próximos, vizinhos de porta e amigos do WhatsApp.",
      volume: "Apenas 10 bolos simples inteiros + 20 canjicas cremosas em potinhos.",
      ingredientsCost: "R$ 110,00",
      grossRevenue: "R$ 490,00",
      netProfit: "R$ 380,00",
      effort: "Estimado em apenas um único fim de semana (cerca de 4 a 6 horas na cozinha).",
      realisticOutcome: "Você recupera o investimento desta apostila no mesmo dia e ainda garante um lucro limpo para pagar contas básicas e gás de cozinha.",
      colorClass: "bg-amber-600/10 text-amber-500",
      borderColor: "border-amber-600/30",
    },
    {
      id: "prata",
      badge: "META MÉDIA PRATA",
      title: "Encomendas de Condomínio e Bairro",
      icon: <Building className="w-5 h-5" />,
      audience: "Divulgação estratégica no grupo do condomínio, escola dos filhos e vizinhança ampla.",
      volume: "25 fatias de bolo na marmita + 35 potinhos de doce + 20 caldos quentinhos.",
      ingredientsCost: "R$ 210,00",
      grossRevenue: "R$ 1.150,00",
      netProfit: "R$ 940,00",
      effort: "Feito sob encomenda (vende primeiro, compra depois) em 2 fins de semana.",
      realisticOutcome: "Garante faturamento excelente para cobrir as compras do supermercado do mês inteiro ou fazer uma viagem curta agradável em família.",
      colorClass: "bg-[#718096]/20 text-[#E2E8F0]",
      borderColor: "border-[#718096]/40",
    },
    {
      id: "ouro",
      badge: "META PROFISSIONAL OURO",
      title: "Festa Junina Corporativa / Foco Junho",
      icon: <Sparkles className="w-5 h-5" />,
      audience: "Atendimento de mini-kits juninos para aniversários, empresas locais e escolas no mês todo.",
      volume: "60 bolos na marmita + 80 potinhos de canjica/curau + 40 caldos de inverno.",
      ingredientsCost: "R$ 440,00",
      grossRevenue: "R$ 2.620,00",
      netProfit: "R$ 2.180,00",
      effort: "Rotina organizada de 2 a 3 dias por semana durante a temporada de alta demanda junina/julina.",
      realisticOutcome: "Um verdadeiro 13º salário extra para o seu orçamento, ideal para quitar dívidas pesadas, reformar a casa ou formar uma reserva de segurança.",
      colorClass: "bg-yellow-400/20 text-yellow-400",
      borderColor: "border-yellow-400/50",
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div id="calculadora-lucros" className="bg-[#2A1711] text-[#FFF8E7] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border-2 border-primary/40">
      {/* Dynamic festive background wrapper */}
      <div className="absolute inset-0 bg-flags pointer-events-none opacity-5" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="bg-primary/20 text-primary border border-primary/30 text-xs uppercase font-extrabold px-3 py-1 rounded-full tracking-widest inline-block mb-3">
            Planejamento Realista & Alcançável
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Veja como o seu investimento de R$ 19,90 se multiplica rapidamente
          </h3>
          <p className="text-gray-300 text-sm mt-2 max-w-2xl mx-auto">
            Sem cálculos confusos ou planilhas milagrosas. Escolha abaixo a sua meta de vendas para o mês de Junho/Julho e veja a matemática real de custo e lucro:
          </p>
        </div>

        {/* Level Toggles with custom layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {scenarios.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;
            return (
              <button
                key={scen.id}
                id={`scenario-btn-${scen.id}`}
                onClick={() => setSelectedScenarioId(scen.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-primary border-primary text-brand-dark shadow-xl scale-[1.02]"
                    : "bg-brand-dark/40 border-accent/20 text-gray-300 hover:border-primary/40 hover:bg-[#341E16]"
                }`}
              >
                <div>
                  <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${
                    isSelected ? "bg-brand-dark text-primary" : scen.colorClass
                  }`}>
                    {scen.badge}
                  </span>
                  <h4 className="font-extrabold text-base leading-tight mt-2.5 flex items-center gap-2">
                    {scen.icon}
                    {scen.title}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-dashed border-current/20 flex justify-between items-center w-full">
                  <span className="text-xs font-semibold opacity-80">Lucro Estimado</span>
                  <span className="text-base font-black font-mono">{scen.netProfit}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Visualization and metrics summary */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedScenarioId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#1C0F0B] rounded-2xl border border-accent/30 p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Left columns breakdown parameters */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Como atingir essa meta:</span>
                <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                  {currentScenario.audience}
                </p>
              </div>

              <div className="border-t border-accent/15 pt-3">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Combos e Quitutes para produzir:</span>
                <p className="text-xs text-gray-200 font-semibold mt-0.5">
                  {currentScenario.volume}
                </p>
              </div>

              <div className="border-t border-accent/15 pt-3">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Dedicação na cozinha necessária:</span>
                <p className="text-xs text-gray-300 mt-0.5 font-medium">
                  {currentScenario.effort}
                </p>
              </div>

              <div className="border-t border-accent/15 pt-3 bg-primary/5 p-3 rounded-lg border-l-4 border-primary">
                <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider block">O impacto real na sua vida:</span>
                <p className="text-xs text-[#FFF8E7] leading-relaxed mt-0.5">
                  "{currentScenario.realisticOutcome}"
                </p>
              </div>
            </div>

            {/* Right column beautiful financial metrics */}
            <div className="lg:col-span-5 bg-[#2A1711] p-5 sm:p-6 rounded-2xl border border-[#FFF8E7]/10 flex flex-col justify-between h-full space-y-4">
              <div className="text-center pb-3 border-b border-[#FFF8E7]/10">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Resultados da meta</span>
                <div className="text-[#FFF8E7] font-semibold text-sm mt-1">{currentScenario.title}</div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Faturamento Bruto Encomendado:</span>
                  <span className="font-extrabold text-[#FFF8E7] font-mono">{currentScenario.grossRevenue}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Ingredientes necessários aprox:</span>
                  <span className="font-bold text-red-400 font-mono">- {currentScenario.ingredientsCost}</span>
                </div>
              </div>

              <div className="bg-emerald-950/45 border-2 border-emerald-500/40 p-4 rounded-xl text-center">
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block mb-0.5">LUCRO LÍQUIDO EXTRA:</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">{currentScenario.netProfit}</span>
                <span className="text-[10px] text-gray-300 block mt-1 font-medium">Livre de despesas de insumos!</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Highlight KPI Shield */}
        <div className="mt-8 bg-gradient-to-r from-secondary/90 to-accent-dark border-2 border-secondary/90 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 text-white/5 font-black text-8xl pointer-events-none select-none">
            LUCRO
          </div>
          
          <div className="text-center sm:text-left relative z-10">
            <span className="bg-yellow-400 text-black text-[10px] uppercase font-black px-2 py-0.5 rounded-md inline-block mb-1 tracking-wider">
              PRONTO PARA COMEÇAR?
            </span>
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 tracking-tight drop-shadow">
              Seu Sucesso no São João Lucrativo
            </div>
            <p className="text-gray-100 text-xs sm:text-sm font-medium mt-1.5 ml-0.5 max-w-md">
              Aprenda a fazer, precificar e vender no WhatsApp o passo a passo exato para garantir esses resultados.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0 z-10 text-center">
            <a
              id="cta-calc-action"
              href="#oferta-uncondicional"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-brand-dark font-black text-sm uppercase px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 animate-pulse-gold inline-block text-center hover:scale-[1.03] cursor-pointer"
            >
              Começar Meu Lucro Junino
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-[10px] text-yellow-300/80 block text-center mt-2 font-medium">
              Garantia incondicional de 7 dias inclusa!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
