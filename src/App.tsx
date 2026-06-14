/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  Lock, 
  User, 
  X,
  XCircle, 
  Plus, 
  Minus, 
  DollarSign, 
  AlertCircle, 
  ThumbsUp, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Coffee, 
  Share2, 
  UserCheck, 
  UtensilsCrossed, 
  Coins,
  Star,
  MessageCircle,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ProfitCalculator from "./components/ProfitCalculator";
import CheckoutModal from "./components/CheckoutModal";
import WhatsAppTestimonials from "./components/WhatsAppTestimonials";
import { DELIVERABLES, BONUSES, FAQS } from "./data";

// Imagem gastronômica premium rica de comidas juninas
import comidasJuninasPremium from "./assets/images/comidas_juninas_premium_1780515434849.png";
import saoJoaoMockup from "./assets/images/sao_joao_mockup_v2_1780515338548.png";
import saoJoaoBannerPremium from "./assets/images/sao_joao_banner_premium_1781051537037-2.png";
import newBanner from "./assets/images/newbanner.png";

// ==========================================
// CONFIGURAÇÕES DE LANÇAMENTO (HOTMART)
// Mude para "true" para redirecionar os botões de compra direto para seu link oficial da Hotmart!
// Se estiver como "false", a página exibe uma maravilhosa simulação de checkout nativa com Order Bump e Upsell.
const USAR_LINK_DIRETO_HOTMART = true;
const LINK_CHECKOUT_HOTMART = "https://pay.hotmart.com/A106118711S?checkoutMode=10";

// CONFIGURAÇÃO DO WHATSAPP REAL DE SUPORTE
// Substitua pelo seu número para receber dúvidas diretamente!
const WHATSAPP_SUPORTE_NUMERO = "5519991206109"; // Substitua pelo seu WhatsApp real
const WHATSAPP_SUPORTE_MENSAGEM = "Olá! Vim do site receitasquevendem.com.br e gostaria de tirar uma dúvida sobre o material de São João Lucrativo.";
// ==========================================

export default function App() {
  // Modal Trigger States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [floatingNotification, setFloatingNotification] = useState<{name: string, location: string, action: string} | null>(null);

  // Interactive Support Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessageCount, setChatMessageCount] = useState(1);
  const [customMessage, setCustomMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "support" | "user", text: string, time: string }>>([
    { 
      sender: "support", 
      text: "Olá, quer faturar nas festividades de Junho e Julho? Sou a Cláudia, do time de suporte ao aluno. Ficou com alguma dúvida sobre o Guia São João Lucrativo ou quer saber como funciona a garantia?", 
      time: "Agora" 
    }
  ]);

  // Scarcity simulation: countdown timer target
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 53 });
  const [copiesLeft, setCopiesLeft] = useState(14);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Sticky CTA bar visible after scrolling past hero
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Timer countdown hook
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 0, seconds: 0 }; // Loop for demo consistency
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sticky footer trigger on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Notifications simulator (creates a lively high converting marketplace vibe)
  const notificationQueue = [
    { name: "Luciana Santos", location: "Caruaru - PE", action: "concluiu a compra via PIX" },
    { name: "Aline Fonseca", location: "Campina Grande - PB", action: "concluiu a compra via PIX" },
    { name: "Maria das Dores", location: "Salvador - BA", action: "concluiu a compra via PIX" },
    { name: "Sônia Regina", location: "Fortaleza - CE", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Juliana Mendes", location: "Belo Horizonte - MG", action: "concluiu a compra via PIX" },
    { name: "Maria Silva", location: "Caruaru - PE", action: "concluiu a compra via PIX" },
    { name: "Ana Beatriz", location: "Campina Grande - PB", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Cláudia Oliveira", location: "Recife - PE", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Amanda Costa", location: "Maceió - AL", action: "concluiu a compra via PIX" },
    { name: "Roberta Lima", location: "São Luís - MA", action: "concluiu a compra via PIX" },
    { name: "Camila Souza", location: "Natal - RN", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Fernanda Rocha", location: "Aracaju - SE", action: "concluiu a compra via PIX" },
    { name: "Patrícia Alves", location: "Juazeiro do Norte - CE", action: "concluiu a compra via PIX" },
    { name: "Letícia Barbosa", location: "Feira de Santana - BA", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Bruna Vieira", location: "Vitória da Conquista - BA", action: "concluiu a compra via PIX" },
    { name: "Débora Martins", location: "Mossoró - RN", action: "concluiu a compra via PIX" },
    { name: "Mariana Dias", location: "Teresina - PI", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Carolina Nunes", location: "São Paulo - SP", action: "concluiu a compra via PIX" },
    { name: "Gabriela Pereira", location: "Rio de Janeiro - RJ", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Rebeca Carvalho", location: "Campinas - SP", action: "concluiu a compra via PIX" },
    { name: "Tatiana Morais", location: "Goiânia - GO", action: "concluiu a compra via PIX" },
    { name: "Priscila Fernandes", location: "Vitória - ES", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Vanessa Cardoso", location: "Curitiba - PR", action: "concluiu a compra via PIX" },
    { name: "Jaqueline Ramos", location: "Porto Alegre - RS", action: "concluiu a compra no Cartão de Crédito" },
    { name: "Elizete Correia", location: "Petrolina - PE", action: "concluiu a compra via PIX" },
    { name: "Simone Pinheiro", location: "Imperatriz - MA", action: "concluiu a compra via PIX" },
  ];

  useEffect(() => {
    let activeTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;

    const triggerNotification = (delay: number) => {
      activeTimeout = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * notificationQueue.length);
        setFloatingNotification(notificationQueue[randomIndex]);

        // Hide notification after 5 seconds
        hideTimeout = setTimeout(() => {
          setFloatingNotification(null);
        }, 5000);

        // Slow decrease in simulated remaining spots
        setCopiesLeft((prev) => (prev > 4 ? prev - 1 : 4));
        
        // Schedule next notification with a random delay of 10s to 18s
        triggerNotification(Math.random() * 8000 + 10000);
      }, delay);
    };

    // First notification triggers after 4 seconds to immediately capture attention
    triggerNotification(4000);

    return () => {
      clearTimeout(activeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    
    const userMsg = { sender: "user" as const, text: customMessage, time: "Agora" };
    setChatMessages(prev => [...prev, userMsg]);
    setCustomMessage("");
    
    // Simulate auto-reply from Claudia
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: "support", 
          text: "Que ótimo! Nosso material é focado justamente nisso. Toda a compra é 100% segura e você tem 7 dias de garantia incondicional para testar. O acesso chega em menos de 2 minutos no seu e-mail. Quer aproveitar a oferta de R$ 19,90 agora?", 
          time: "Agora" 
        }
      ]);
    }, 1500);
  };

  const openCheckout = () => {
    if (USAR_LINK_DIRETO_HOTMART) {
      window.location.href = LINK_CHECKOUT_HOTMART;
    } else {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream text-brand-dark sm:px-0 selection:bg-primary selection:text-brand-dark">
      
      {/* SECTION 00 - HEADER BAR & TOP TICKER */}
      <div className="bg-secondary text-white text-xs py-2 px-4 font-bold text-center flex items-center justify-center gap-2 relative z-20">
        <Flame className="w-4 h-4 text-primary fill-primary animate-bounce" />
        <span>PROMOÇÃO EXCLUSIVA DE SÃO JOÃO 2026: APENAS HOJE POR R$ 19,90!</span>
        <Flame className="w-4 h-4 text-primary fill-primary animate-bounce hidden sm:inline" />
      </div>

      {/* HEADER LOGO CONTAINER */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-bg-cream/90 backdrop-blur border-b border-primary/10 sticky top-0 z-30">
        <div className="flex flex-col items-start">
          <div className="bg-primary px-3.5 py-2 rounded-xl font-black text-brand-dark text-lg md:text-xl border-2 border-brand-dark transform -rotate-1 flex items-center gap-1.5 shadow-md">
            <span>🔥</span> SÃO JOÃO LUCRATIVO
          </div>
          <span className="text-[9px] text-[#6D4C41] font-black uppercase tracking-widest pl-1 mt-1.5 flex items-center gap-1.5 opacity-90 font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            RECEITASQUEVENDEM.COM.BR
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs uppercase font-extrabold tracking-wider">
          <a href="#dores-principais" className="hover:text-secondary hover:underline transition">O Problema</a>
          <a href="#solucao-metodo" className="hover:text-secondary hover:underline transition">O Método</a>
          <a href="#conteudo-completo" className="hover:text-secondary hover:underline transition">O que recebe</a>
          <a href="#calculadora-lucros" className="hover:text-secondary hover:underline transition text-secondary flex items-center gap-1">
            Simulador <Calculator className="w-3.5 h-3.5" />
          </a>
          <a href="#perguntas-frequentes" className="hover:text-secondary hover:underline transition">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openCheckout}
            id="header-cta-btn"
            className="bg-secondary hover:bg-secondary-dark text-white font-black text-xs uppercase px-4 py-2.5 rounded-xl shadow-md border-b-4 border-secondary-dark transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            Aproveitar Promoção
          </button>
        </div>
      </header>

      {/* SECTION 01 — HERO */}
      <section className="relative pt-12 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Dynamic Festive Flags elements background decoration (subtle and high quality) */}
        <div className="absolute top-0 inset-x-0 h-4 flex justify-between overflow-hidden opacity-30 select-none pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className={`w-5 h-5 transform rotate-45 shrink-0 -translate-y-2.5 border border-brand-dark/20 ${
                i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-secondary" : "bg-teal-600"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-primary/30 rounded-full px-3.5 py-1 text-secondary-dark font-extrabold text-xs sm:text-sm tracking-wider uppercase mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-primary fill-primary animate-pulse" />
              Sua oportunidade de renda extra em 2026 chegou!
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-black text-brand-dark leading-tight tracking-tight">
              Fature alto nos 60 dias de{" "}
              <span className="relative inline-block text-secondary-dark">
                Festas Juninas e Julinas
                <span className="absolute left-0 bottom-1 w-full h-2 bg-primary/45 -z-10 transform -rotate-1 rounded" />
              </span>{" "}
              com quitutes e doces típicos!
            </h1>

            <p className="text-gray-700 text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Receba receitas prontas, testadas e fáceis de produzir para começar a faturar ainda nesta temporada. Não precisa de experiência anterior!
            </p>

            {/* Simulated Live FOMO Panel */}
            <div className="bg-[#2A1711] text-[#FFF8E7] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/30 max-w-xl mx-auto lg:mx-0 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-primary text-brand-dark text-[8px] font-bold uppercase tracking-widest leading-none rounded-bl-lg">
                Urgente
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary animate-pulse" />
                <div className="text-left">
                  <p className="text-xs text-gray-300 font-bold">A oferta com desconto expira em:</p>
                  <p className="font-mono text-base font-black text-white">
                    {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                  </p>
                </div>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-accent/30 w-full sm:w-auto pt-3 sm:pt-0 sm:pl-4 text-left">
                <p className="text-xs text-gray-300">Vagas com esse preço:</p>
                <p id="remaining-copies" className="text-sm font-extrabold text-primary flex items-center gap-1.5">
                  Apenas <span className="text-yellow-400 text-base underline font-black">{copiesLeft} cópias</span> restantes!
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1 justify-center lg:justify-start">
              <button
                onClick={openCheckout}
                id="hero-main-cta"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-brand-dark font-black text-lg uppercase px-8 py-5 rounded-2xl flex items-center justify-center gap-3.5 transition-all duration-300 animate-pulse-gold inline-block tracking-wide shadow-xl shadow-primary/20 hover:scale-[1.03] cursor-pointer"
              >
                QUERO COMEÇAR AGORA
                <ArrowRight className="w-5 h-5 text-brand-dark stroke-[3]" />
              </button>
              <div className="text-center sm:text-left text-xs font-bold text-gray-500 space-y-1">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Selo de acesso imediato via E-mail e WhatsApp
                </div>
                <p className="text-[10px] text-gray-400">Entrega do PDF e planilhas em menos de 2 minutos!</p>
              </div>
            </div>

            {/* Guaranteed Trust badge icons */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-[11px] text-gray-500 font-bold border-t border-primary/10">
              <span className="flex items-center gap-1">✓ Acesso Vitalício</span>
              <span className="flex items-center gap-1">✓ Pagamento Protegido</span>
              <span className="flex items-center gap-1">✓ Testado e Comprovado</span>
            </div>
          </div>

          {/* Hero Right Visuals: Comidas Juninas Espetaculares */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Elegant glowing background circle behind the visual */}
            <div className="absolute w-72 h-72 bg-gradient-to-tr from-primary to-secondary opacity-30 rounded-full filter blur-3xl -z-10" />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              id="hero-mockup-wrapper"
              className="w-full max-w-[500px] relative bg-[#2A1711] p-3 sm:p-4 rounded-[2rem] shadow-2xl border-4 border-[#FFA000] hover:shadow-[0_20px_50px_rgba(198,40,40,0.35)] transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Top Banner Ribbon */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C62828] text-white text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-md border border-yellow-400/30 z-10 whitespace-nowrap animate-bounce leading-none">
                🔥 OFERTA DE LANÇAMENTO ATIVA
              </div>

              {/* Inner picture frame */}
              <div className="relative rounded-[1.2rem] overflow-hidden border-2 border-[#FFA000]/60 bg-[#120705] shadow-inner mt-4">
                <img 
                  src={`${saoJoaoBannerPremium}?v=10`} 
                  alt="Apostila Digital São João Lucrativo Método Prático e 3 Super Bônus" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>

              {/* Pricing section inside the frame (TUDO ISSO POR 19,90) */}
              <div className="mt-3.5 bg-[#FFFDF9] rounded-xl p-3.5 sm:p-4 border border-[#FFA000]/30 shadow-inner text-center">
                <p className="text-[10px] sm:text-xs text-[#2A1711] font-extrabold uppercase tracking-widest leading-none">
                  Método Prático + 3 Bônus Exclusivos
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-xs text-gray-400 line-through font-mono">De R$ 238,00</span>
                  <span className="bg-[#C62828] text-white text-[8px] font-black px-2 py-0.5 rounded uppercase leading-none">
                    91% DE DESCONTO
                  </span>
                </div>
                
                <div className="mt-2 text-center border-t border-dashed border-amber-200/50 pt-2.5">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">LEVE TUDO ISSO HOJE POR APENAS</p>
                  <div className="inline-flex items-baseline gap-1.5 text-center">
                    <span className="text-lg font-extrabold text-[#C62828] font-mono leading-none">R$</span>
                    <span className="text-4xl sm:text-5xl font-black text-[#C62828] tracking-tight leading-none drop-shadow-sm">19,90</span>
                    <span className="text-xs font-extrabold text-[#2A1711] uppercase tracking-wide leading-none">Único</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-amber-200/50 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-[#5D4037] font-bold">
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Acesso Vitalício Imediato</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Sem Mensalidades</span>
                </div>

                {/* Highly clickable micro button inside the frame */}
                <button 
                  onClick={openCheckout}
                  className="mt-3.5 w-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs sm:text-sm font-black uppercase py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  GARANTIR TODOS OS BENEFÍCIOS JÁ
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEASONAL DURATION HIGHLIGHT STRIP (JUNHO + JULHO) */}
      <section className="bg-gradient-to-r from-[#FFF8E7] to-[#FFF0D4] border-y border-amber-200 py-4 px-6 text-center shadow-inner">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
          <span className="bg-secondary text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1.5 shadow-md">
            <Flame className="w-4 h-4 text-yellow-300 animate-pulse fill-yellow-300" />
            60 DIAS DE TEMPORADA
          </span>
          <p className="text-xs sm:text-sm text-brand-dark font-extrabold leading-tight">
            A época mais lucrativa do ano se estende por <strong className="text-secondary">JUNHO & JULHO</strong>! Com as Festas Juninas e Julinas consecutivas, você garante encomendas de faturamento sem pausas por 2 meses inteiros!
          </p>
        </div>
      </section>

      {/* TESTIMONIAL / TRUST BANNER BAR */}
      <section className="bg-brand-dark/10 py-5 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-black text-secondary">1.250+</p>
            <p className="text-xs font-bold text-gray-600">Alunas Faturando</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-secondary">R$ 19,90</p>
            <p className="text-xs font-bold text-gray-600">Investimento Único</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-secondary">150%+</p>
            <p className="text-xs font-bold text-gray-600">Margem Média de Lucro</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-secondary">7 Dias</p>
            <p className="text-xs font-bold text-gray-600">Garantia Absoluta</p>
          </div>
        </div>
      </section>

      {/* SECTION 02 — IDENTIFICAÇÃO DA DOR */}
      <section id="dores-principais" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-secondary block mb-2">Identificação</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark leading-tight">
            Você sente que está deixando dinheiro na mesa nesta temporada?
          </h2>
          <p className="text-sm text-gray-600 mt-3 font-medium">
            Junho e Julho são conhecidos como o "Dezembro da confeitaria". As pessoas clamam por doces e quitutes típicos por 60 dias seguidos, mas você pode acabar se perdendo nas seguintes barreiras:
          </p>
        </div>

        {/* Dores interactive accordion style listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 border-l-8 border-secondary shadow-md hover:shadow-lg transition">
            <h4 className="font-extrabold text-lg text-brand-dark flex items-center gap-2">
              <span className="text-secondary">✕</span> Não sabe o que vender
            </h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Fica dividida entre dezenas de bolos, caldos e canjicas, sem saber quais pratos têm o menor custo de produção e o maior giro nas encomendas.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-l-8 border-secondary shadow-md hover:shadow-lg transition">
            <h4 className="font-extrabold text-lg text-brand-dark flex items-center gap-2">
              <span className="text-secondary">✕</span> Tem medo de investir errado
            </h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              O orçamento já está apertado e você não quer de forma alguma perder ingrediente caro estragando na geladeira ou errando o ponto do bolo de milho.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-l-8 border-secondary shadow-md hover:shadow-lg transition">
            <h4 className="font-extrabold text-lg text-brand-dark flex items-center gap-2">
              <span className="text-secondary">✕</span> Não sabe quanto cobrar
            </h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Tem medo de cobrar caro e assustar parentes e vizinhos, ou de cobrar muito barato e trabalhar feito louca na cozinha sem ver a cor do dinheiro.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-l-8 border-secondary shadow-md hover:shadow-lg transition">
            <h4 className="font-extrabold text-lg text-brand-dark flex items-center gap-2">
              <span className="text-secondary">✕</span> Nunca vendeu comida antes
            </h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Acha que necessita de uma marca chique, CNPJ de pizzaria, ou maquinários industriais complexos para começar a tirar seus primeiros pedidos.
            </p>
          </div>
        </div>

        <div className="bg-primary/10 border-2 border-[#F4B400] rounded-2xl p-5 mt-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-extrabold text-sm text-brand-dark">Quer dar um basta nessa insegurança?</p>
            <p className="text-xs text-gray-600 font-medium">Nosso treinamento resolve cada um desses pontos detalhadamente.</p>
          </div>
          <a
            href="#solucao-metodo"
            className="text-xs uppercase bg-[#2A1711] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-black transition shrink-0"
          >
            Quero Ver a Solução
          </a>
        </div>
      </section>

      {/* SECTION 03 — OPORTUNIDADE (Storytelling + Graphics) */}
      <section className="bg-[#FFFDF9] py-20 px-6 border-y border-primary/20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Narrative Storytelling */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#6D4C41]">Apenas uma vez ao ano</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-dark leading-tight">
                O São João é a época em que as pessoas mais clamam por doces típicos.
              </h2>
              
              {/* Added Bundle Banner Asset */}
              <div className="w-full relative rounded-2xl overflow-hidden border border-[#FFA100]/30 shadow-md">
                <img 
                  src={`${newBanner}?v=5`} 
                  alt="Apostila São João Lucrativo Banner Oficial" 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block hover:scale-[1.01] transition-transform duration-300"
                />
              </div>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-medium">
                <p>
                  Pense comigo: enquanto tantas pessoas estão gastando muito comprando comidas caras de última hora nas barraquinhas, você pode se posicionar de forma inteligente.
                </p>
                <p className="bg-yellow-400/10 p-4 border-l-4 border-primary rounded-r-xl italic text-brand-dark/90 font-semibold font-sans">
                  "As pessoas imploram pelo conforto de um Curau cremoso, de uma fatia alta de Bolo de Fubá quentinho ou de um delicioso Caldo Verde para aquecer as noites frias após o pôr do sol."
                </p>
                <p>
                  Como os ingredientes básicos da época de colheita (como milho, coco e leite) são extremamente baratos em abundância, a margem de lucro de cada quitute passa facilmente dos <strong className="text-secondary">200% a 300%</strong> de retorno livre no bolso.
                </p>
              </div>
            </div>

            {/* Right Column: Comparative Interactive Graphics Visualizer (Ingredients cost vs sale price) */}
            <div className="lg:col-span-6 bg-brand-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl relative border border-accent">
              <div className="absolute top-2 right-2 text-white/5 font-black text-6xl pointer-events-none select-none">
                LUCRO
              </div>
              
              <h4 className="font-extrabold text-base text-yellow-400 uppercase tracking-widest flex items-center gap-1.5 mb-6">
                Exemplos Reais de Margem de Lucro <Coins className="w-4 h-4 text-yellow-300" />
              </h4>

              <div className="space-y-6">
                {/* Product example 1 */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-primary text-[10px] font-black uppercase tracking-wider block">Bolos Caseiros</span>
                    <h5 className="font-extrabold text-sm text-white mt-0.5">Bolo de Milho Cremoso na Marmitinha</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">Assado direto na marmita retangular descartável, pronto para entrega.</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 sm:pl-4">
                    <div className="text-xs text-gray-400">Custo Ingredientes: <span className="text-red-400 font-mono font-bold">R$ 3,50</span></div>
                    <div className="text-xs text-gray-400 mt-0.5">Venda Sugerida: <span className="text-yellow-400 font-mono font-bold">R$ 12,00</span></div>
                    <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded mt-1.5 inline-block sm:block text-center uppercase">
                      + R$ 8,50 Livre!
                    </div>
                  </div>
                </div>

                {/* Product example 2 */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-primary text-[10px] font-black uppercase tracking-wider block">Copos Juninos</span>
                    <h5 className="font-extrabold text-sm text-white mt-0.5">Canjica Cremosa com Canela e Amendoim</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">Rendimento altíssimo, servido em potinhos individuais de 250ml.</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 sm:pl-4">
                    <div className="text-xs text-gray-400">Custo Ingredientes: <span className="text-red-400 font-mono font-bold">R$ 2,80</span></div>
                    <div className="text-xs text-gray-400 mt-0.5">Venda Sugerida: <span className="text-yellow-400 font-mono font-bold">R$ 10,00</span></div>
                    <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded mt-1.5 inline-block sm:block text-center uppercase">
                      + R$ 7,20 Livre!
                    </div>
                  </div>
                </div>

                {/* Product example 3 */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-primary text-[10px] font-black uppercase tracking-wider block">Caldos de Inverno</span>
                    <h5 className="font-extrabold text-sm text-white mt-0.5">Copão de Caldo Verde Cremoso</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">O queridinho das noites frias de junho, feito com batatas e couve fresca.</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 sm:pl-4">
                    <div className="text-xs text-gray-400">Custo Ingredientes: <span className="text-red-400 font-mono font-bold">R$ 4,50</span></div>
                    <div className="text-xs text-gray-400 mt-0.5">Venda Sugerida: <span className="text-yellow-400 font-mono font-bold">R$ 16,00</span></div>
                    <div className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded mt-1.5 inline-block sm:block text-center uppercase">
                      + R$ 11,50 Livre!
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion trigger link to slider section */}
              <div className="mt-6 text-center border-t border-accent/20 pt-4">
                <a
                  href="#calculadora-lucros"
                  className="text-xs text-primary hover:underline font-bold inline-flex items-center gap-1.5"
                >
                  Ver simulações de ganhos realistas para o mês <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 04 — APRESENTAÇÃO DA SOLUÇÃO */}
      <section id="solucao-metodo" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#6D4C41] block mb-2">A Solução Definitiva</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
            Conheça o São João Lucrativo
          </h2>
          <p className="text-sm text-gray-600 mt-3 font-medium">
            O material prático estruturado no consolidado <strong>Método 3P</strong> desenvolvido por especialistas em lucro sazonal.
          </p>
        </div>

        {/* The 3P framework elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border-t-8 border-primary shadow-lg text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 text-brand-dark rounded-2xl flex items-center justify-center mx-auto text-2xl font-black border-2 border-primary/40">
              1P
            </div>
            <h3 className="font-extrabold text-xl text-brand-dark">PRODUZIR</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Você dominará o preparo comercial dos bolos tradicionais na marmita, curau, cocadas de corte, canjica cremosa e caldos que vendem rápido. Tudo adaptado para a cozinha simples da sua casa.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border-t-8 border-secondary shadow-lg text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/20 text-secondary-dark rounded-2xl flex items-center justify-center mx-auto text-2xl font-black border-2 border-secondary/40">
              2P
            </div>
            <h3 className="font-extrabold text-xl text-brand-dark">PRECIFICAR</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Planilhas automatizadas prontas estruturadas para você nunca perder centavos para o custo flutuante do gás e do coco. Descubra a margem perfeita para pagar insumos e embolsar lucro intocado.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border-t-8 border-[#6D4C41] shadow-lg text-center space-y-4">
            <div className="w-16 h-16 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mx-auto text-2xl font-black border-2 border-accent/40">
              3P
            </div>
            <h3 className="font-extrabold text-xl text-brand-dark">PROMOVER</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Chega de timidez! Roteiros exatos e mensagens prontas para você copiar e disparar no WhatsApp para vizinhos, condomínios e grupos locais. Encha sua agenda de encomendas rápidas sem complicação!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 05 — O KIT COMPLETO INTEGRADO (PRINCIPAL + BÔNUS JUNTOS) */}
      <section id="conteudo-completo" className="bg-[#FFF8E7] py-20 px-6 border-t border-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C62828] block mb-2">Engrenagem de Alto Faturamento</span>
            <span className="bg-[#C62828] text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest inline-block mb-3 animate-pulse">
              🔥 SUPER KIT COMPLETO INTEGRADO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
              Tudo o que Você Recebe em Seu Acesso Único
            </h2>
            <p className="text-sm text-gray-600 mt-2 font-medium">
              Não é apenas um PDF de receitas. É um kit comercial inteligente desenvolvido para estruturar seu negócio de forma descomplicada!
            </p>
          </div>

          {/* O SUPER BOX PREMIUM DESTACADO (PRODUTO + BÔNUS UNIFICADOS EM UM CAMPO SÓ DE ALTO IMPACTO) */}
          <div className="max-w-4xl mx-auto bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border-4 border-[#FFA000] shadow-2xl relative overflow-hidden group hover:border-[#C62828] transition-all duration-300">
            {/* Efeito de brilho de fundo decorativo */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-yellow-400 via-[#C62828] to-amber-500" />
            
            {/* Crachá premium de alto contraste no canto superior direito */}
            <div className="absolute top-4 right-4 bg-[#C2185B] text-white font-black text-[9px] uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow">
              ✓ KIT COMPLETO: 88% DE DESCONTO
            </div>

            <div className="mt-8 space-y-8">
              {/* O PRODUTO PRINCIPAL (com destaque luxuoso no topo) */}
              <div className="bg-amber-50/50 p-6 rounded-2xl border-2 border-[#FFA000]/30 hover:border-[#FFA000]/60 transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-14 h-14 bg-[#FFA000]/10 text-[#FFA000] rounded-2xl flex items-center justify-center shrink-0 text-3xl font-black">
                     📚
                  </div>
                  <div className="grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="bg-amber-600/10 text-amber-800 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        MÉTODO PRINCIPAL
                      </span>
                      <span className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Disponível Imediatamente
                      </span>
                    </div>
                    <h3 className="font-extrabold text-xl text-brand-dark leading-tight group-hover:text-secondary duration-300">
                      {DELIVERABLES[0].title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {DELIVERABLES[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção dos Bônus, integrada no mesmo Box */}
              <div className="pt-2 border-t border-dashed border-amber-200">
                <h4 className="text-xs font-black text-[#6D4C41] uppercase tracking-wider mb-5 flex items-center gap-1.5 justify-center sm:justify-start">
                  <span>🎁 MATERIAL DE APOIO DE GRAÇA INCLUSO:</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BONUSES.map((bonus) => (
                    <div 
                      key={bonus.id} 
                      className="bg-white border border-gray-100 hover:border-[#FFA000]/50 rounded-xl p-4 flex flex-col justify-between space-y-3 transition hover:shadow-md"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-extrabold text-secondary uppercase tracking-wide">
                            {bonus.badge}
                          </span>
                          <span className="bg-emerald-50 text-emerald-800 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                            Grátis
                          </span>
                        </div>
                        <h5 className="font-extrabold text-xs text-brand-dark leading-snug">{bonus.title}</h5>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{bonus.description}</p>
                      </div>

                      <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-[8px] text-gray-400 block line-through">De R$ {bonus.value},00</span>
                          <span className="font-bold text-emerald-600">Por R$ 0,00</span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">
                          Incluso
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BARRA DE FECHAMENTO PREMIUM NO MESMO BOX */}
              <div className="mt-8 pt-6 border-t border-amber-200/60 bg-[#2A1711] text-[#FFF8E7] rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="absolute inset-0 bg-[#C62828]/5 pointer-events-none" />
                
                <div className="text-center md:text-left space-y-1 relative z-10">
                  <p className="text-[10px] text-primary uppercase font-extrabold tracking-widest">SOMA DE TODO SEU KIT COMPLETO:</p>
                  <p className="text-sm text-gray-400 line-through font-mono font-bold leading-none">R$ 238,00</p>
                  <p className="text-base font-black text-white leading-tight">
                    Leve Tudo Hoje por Apenas <span className="text-primary font-bold">R$ 19,90</span>!
                  </p>
                  <p className="text-[10px] text-emerald-400 font-black">✓ Economia imediata de R$ 218,10</p>
                </div>

                <div className="w-full md:w-auto relative z-10 text-center">
                  <a 
                    href="#oferta-uncondicional" 
                    className="w-full md:w-auto inline-block bg-primary hover:bg-white text-[#2A1711] hover:text-brand-dark text-xs font-black uppercase px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:scale-105"
                  >
                    Garantir Kit Completo →
                  </a>
                  <span className="text-[9px] text-gray-400 block mt-2">Acesso imediato e vitalício</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION DYNAMIC SECTION CENTERED */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        {/* Render our interactive profit calculator widget */}
        <ProfitCalculator />
      </section>

      {/* SECTION 07 — TRANSFORMAÇÃO (Antes vs Depois) */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center max-w-md mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#6D4C41] block mb-2">Qual Escolher?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">A decisão é simples:</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* ANTES card */}
          <div className="bg-red-500/5 border-2 border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-red-500/10 pb-3">
              <div className="bg-red-500 p-1.5 rounded text-white shrink-0">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-extrabold text-lg text-red-900 uppercase tracking-wide">Como é a sua vida sem o método:</h4>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-red-500 stroke-[3] font-black">•</span>
                <span>Não sabe o que vender e vive insegura escolhendo qualquer receita na internet de qualidade duvidosa.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-red-500 stroke-[3] font-black">•</span>
                <span>Não sabe quanto cobrar e acaba pagando para trabalhar sem de fato pagar as despesas básicas da sua cozinha.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-red-500 stroke-[3] font-black">•</span>
                <span>Perde noites de sono ansiosa na cozinha sem ter clareza de como agilizar e escalonar a produção de bolos ou curaus.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-red-500 stroke-[3] font-black">•</span>
                <span>Fica travada esperando os clientes descobrirem sozinhos que você está aceitando encomendas.</span>
              </li>
            </ul>
          </div>

          {/* DEPOIS card */}
          <div className="bg-emerald-500/5 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3 border-b border-emerald-500/10 pb-3">
              <div className="bg-emerald-500 p-1.5 rounded text-white shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-extrabold text-lg text-emerald-900 uppercase tracking-wide">Sua vida com o São João Lucrativo:</h4>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-emerald-600 stroke-[3] font-black">✓</span>
                <span>Produtos de alto giro e validação comercial, comprando matérias-primas nos locais corretos mais em conta.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-emerald-600 stroke-[3] font-black">✓</span>
                <span>Precificação rápida automatizada para você ter 100% de clareza nas receitas e no lucro puro que sobra na conta.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-emerald-600 stroke-[3] font-black">✓</span>
                <span>Autoconfiança inabalável sabendo que está servindo pratos dignos de elogios seguidos de novas compras periódicas.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                <span className="text-emerald-600 stroke-[3] font-black">✓</span>
                <span>Primeiras encomendas e faturamento robusto logo nos primeiros dias de divulgação do catálogo no WhatsApp.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* NEW PROVA SOCIAL - HISTÓRIAS DE SUCESSO (High-converting CRO section with simulated WhatsApp chats) */}
      <WhatsAppTestimonials />

      {/* SECTION 08 — OFERTA IMPERDÍVEL (Value Stacking) */}
      <section id="oferta-uncondicional" className="py-20 px-6 bg-gradient-to-b from-[#FFFDF9] to-[#FFF8E7] border-t border-primary/20 relative">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border-4 border-secondary overflow-hidden relative">
          
          <div className="absolute top-0 right-0 bg-secondary text-white font-extrabold text-[10px] uppercase px-4 py-1.5 rounded-bl-2xl tracking-widest">
            Apenas R$ 19,90
          </div>
          
          {/* Header offer */}
          <div className="bg-[#2A1711] p-6 sm:p-8 text-[#FFF8E7] text-center space-y-2 relative">
            <div className="absolute inset-0 bg-flags pointer-events-none opacity-10" />
            <span className="text-xs font-black uppercase text-primary tracking-widest block">O Empilhamento de Valor Irresistível</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Pronta para Tomar o Controle da Sua Renda?</h2>
            <p className="text-xs text-gray-300">Confira tudo o que está levando no carrinho neste segundo:</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Banner do Pitch de Vendas */}
            <div className="w-full relative rounded-2xl overflow-hidden border border-[#FFA100]/30 shadow-md">
              <img 
                src={`${newBanner}?v=5`} 
                alt="Apostila São João Lucrativo Banner Oficial" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* List items values stacked */}
            <div className="space-y-3 divide-y divide-gray-100">
              <div className="flex justify-between items-center text-xs text-gray-600 font-bold py-1">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Método Prático São João Lucrativo</span>
                <span className="font-mono text-gray-400">R$ 97,00</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 font-bold pt-2.5 py-1">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Bônus: Planilha Inteligente de Custos</span>
                <span className="font-mono text-gray-400">R$ 47,00</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 font-bold pt-2.5 py-1">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Bônus: Kit de Artes para Vendas</span>
                <span className="font-mono text-gray-400">R$ 57,00</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 font-bold pt-2.5 py-1">
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Bônus: Guia de Combos Lucrativos de São João</span>
                <span className="font-mono text-gray-400">R$ 37,00</span>
              </div>
            </div>

            {/* Total Math show */}
            <div className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">SOMA DE TODO O MATERIAL:</p>
              <p className="text-lg text-gray-400 line-through font-mono font-bold leading-none">R$ 238,00</p>
              <p className="text-xs text-emerald-700 font-extrabold uppercase">DESCONTO EXCLUSIVO APLICADO: - R$ 218,10</p>
              
              <div className="pt-2">
                <p className="text-xs text-gray-400 uppercase font-black">HOJE, APENAS:</p>
                <div className="text-4xl sm:text-5xl font-black text-secondary font-mono tracking-tight animate-bounce-slow mt-1">
                  R$ 19,90
                </div>
                <p className="text-xs text-gray-500 font-medium">À Vista no Pix (ou até 4x de R$ 5,20 no Cartão de Crédito)</p>
              </div>
            </div>

            {/* Checkout launcher CTA button */}
            <div className="text-center pt-2">
              <button
                onClick={openCheckout}
                id="cta-anchor-offer"
                className="w-full bg-[#C62828] hover:bg-secondary-dark text-white font-extrabold text-base uppercase py-5 rounded-2xl shadow-xl shadow-secondary/30 flex items-center justify-center gap-3.5 hover:scale-[1.02] duration-300 animate-pulse-red cursor-pointer"
              >
                QUERO COMEÇAR A FATURAR AGORA
                <ArrowRight className="w-5 h-5 text-white shrink-0" />
              </button>
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-bold mt-3">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Site Seguro Protegido</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-600" /> Download imediato pós compra</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 09 — GARANTIA */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-primary/40 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-left">
          {/* Warranty Badge visual overlay */}
          <div className="shrink-0 mx-auto md:mx-0 relative">
            <div className="w-28 h-28 bg-yellow-400 rounded-full flex flex-col items-center justify-center border-4 border-brand-dark transform -rotate-6 shadow-md shadow-primary/20">
              <span className="text-stone-900 font-black text-xs uppercase tracking-widest leading-none">RISCO</span>
              <span className="text-stone-900 font-black text-3xl font-mono leading-none">ZERO</span>
              <span className="text-stone-900 font-black text-[10px] uppercase leading-none mt-1">GARANTIDO</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-extrabold text-xl md:text-2xl text-brand-dark flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-secondary shrink-0" /> Compromisso & Garantia Incondicional de 7 Dias
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              Não se preocupe! Ao adquirir o material hoje, você tem o direito garantido de testá-lo em sua cozinha por 7 dias inteiros. Dobre no WhatsApp as mensagens, faça a primeira receita de Canjica ou Pamonha e confira o retorno comercial. Se por algum motivo não ficar maravilhada com a facilidade de venda, basta pedir reembolso que devolveremos seu dinheiro sem perguntas cansativas!
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase">✓ O RISCO CONVERSOR FICA INTEIRO SOBRE NOSSAS COSTAS.</p>
          </div>
        </div>
      </section>

      {/* SECTION 10 — FAQ (Perguntas Frequentes) */}
      <section id="perguntas-frequentes" className="bg-[#FFFDF9] py-20 px-6 border-y border-primary/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-md mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#6D4C41] block mb-2">Restou dúvida?</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">Perguntas Frequentes:</h2>
            <p className="text-xs text-gray-500 mt-2">Clique em cada uma para ver a resposta profissional detalhada.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-primary/20 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    id={`faq-btn-${index}`}
                    className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-gray-50 font-bold text-sm md:text-base text-brand-dark gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-secondary shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-50"
                      >
                        <div className="p-5 text-xs md:text-sm text-gray-600 leading-relaxed bg-amber-50/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11 — CTA FINAL */}
      <section className="py-20 px-6 bg-brand-dark text-white text-center relative overflow-hidden">
        {/* Neon warm visual gradient behind CTA */}
        <div className="absolute inset-0 bg-flags pointer-events-none opacity-5" />
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-primary/15 to-transparent pointer-events-none filter blur-2xl" />

        <div className="max-w-2xl mx-auto relative z-10 space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary font-mono block">Última Chamada Sazonal</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            O São João vai acontecer de qualquer forma.
          </h2>
          <p className="text-sm text-gray-300 max-w-lg mx-auto font-semibold leading-relaxed">
            Você pode apenas participar da festa gastando seu dinheiro suado, ou aproveitar as próximas semanas para recuperar o orçamento doméstico faturando de casa com ela. A decisão é sua.
          </p>

          <div className="pt-4">
            <button
              onClick={openCheckout}
              id="cta-final-direct"
              className="w-full bg-[#F4B400] hover:bg-primary-dark text-brand-dark font-black text-base md:text-lg uppercase px-8 py-5 rounded-2xl shadow-2xl shadow-primary/20 inline-flex items-center justify-center gap-3 w-full sm:w-auto hover:scale-[1.02] transition-all duration-300 animate-pulse-gold cursor-pointer"
            >
              QUERO MEU ACESSO AGORA
              <ArrowRight className="w-5 h-5 text-brand-dark stroke-[3]" />
            </button>
            <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-wider">
              VALOR PROMOCIONAL DISPARADO DE R$ 19,90 SEM ASSINATURA MENSUAL.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="bg-[#160b08] py-16 px-6 text-center text-xs text-gray-500 border-t border-accent/25 space-y-6">
        <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
          {/* Logo Brand Stamp */}
          <div className="inline-flex items-center gap-2 bg-[#FFF8E7] px-4 py-2 rounded-full border border-amber-200/20 shadow-sm text-[#3E271F] font-black tracking-tight text-xs uppercase shadow-inner">
            <span className="text-secondary text-sm">🍳</span>
            <span>RECEITAS <span className="text-[#A80000] font-serif italic lowercase font-bold">que</span> VENDEM</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            Este treinamento é parte integrante da comunidade <span className="font-bold text-gray-200">receitasquevendem.com.br</span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto leading-relaxed space-y-3">
          <p className="font-bold text-gray-300">© 2026 São João Lucrativo &amp; Receitas que Vendem - Todos os direitos reservados.</p>
          <p>
            Contato e Suporte Oficial: <span className="text-gray-300 font-semibold underline">suporte@receitasquevendem.com.br</span> | Comunidade Oficial: <span className="text-gray-300 font-semibold">receitasquevendem.com.br</span>
          </p>
          <p className="text-[10px] opacity-75 text-gray-400 leading-relaxed">
            Ao se inscrever, você declara aceitar os termos de serviço e cookies de navegação de <strong>receitasquevendem.com.br</strong>. "São João Lucrativo" é um manual independente focado no empreendedorismo culinário doméstico e receitas típicas lucrativas para festas juninas. Os lucros simulados no site representam estimativas com base em dados de mercado para metas realistas de produção, dependendo unicamente do empenho e aplicação de cada aluna.
          </p>
          <p className="text-[9px] text-[#F4B400] font-mono leading-none mt-4 select-none">
            Orgulhosamente publicado por receitasquevendem.com.br 🇧🇷
          </p>
        </div>
      </footer>

      {/* INTERACTIVE STICKY CTA MOBILE FOOTER BAR (Appears on scroll for maximized conversions) */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            id="sticky-mobile-cta"
            className="fixed bottom-0 inset-x-0 z-40 bg-[#2A1711] text-[#FFF8E7] px-4 py-3 border-t-2 border-primary/50 shadow-2xl flex items-center justify-between gap-3 md:hidden"
          >
            <div>
              <p className="text-[9px] text-primary/80 uppercase font-black tracking-normal leading-none">Oferta Especial de São João</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-mono font-black text-white text-sm">R$ 19,90</span>
                <span className="text-[9px] line-through text-gray-400 font-mono">278</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              id="sticky-cta-action"
              className="bg-[#C62828] hover:bg-[#A51D1D] text-white font-extrabold text-xs uppercase px-4 py-3 rounded-lg flex items-center gap-1 cursor-pointer select-none"
            >
              <span>ADQUIRIR AGORA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REAL-TIME NOTIFICATION SIMULATION FEEDS */}
      <AnimatePresence>
        {floatingNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -10 }}
            className="fixed bottom-16 sm:bottom-6 left-4 z-40 bg-white text-brand-dark p-3.5 rounded-2xl shadow-2xl border-2 border-yellow-400 flex items-center gap-3 max-w-xs font-sans text-xs"
          >
            <div className="bg-primary text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              👑
            </div>
            <div>
              <p className="font-bold">{floatingNotification.name}</p>
              <p className="text-[10px] text-gray-400">{floatingNotification.location}</p>
              <p className="text-secondary font-semibold mt-0.5">{floatingNotification.action}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE HIGH-CONVERTING WHATSAPP CHAT WIDGET */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 z-40 font-sans">
        <AnimatePresence>
          {isChatOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="w-80 sm:w-85 bg-white rounded-3xl shadow-2xl border-2 border-primary overflow-hidden flex flex-col mb-4"
            >
              {/* Chat Header */}
              <div className="bg-[#2A1711] text-white p-4 flex items-center justify-between border-b border-primary">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-primary text-brand-dark rounded-full flex flex-center items-center justify-center font-black text-base">
                      👩‍🍳
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[11px] text-white">Cláudia - Suporte Oficial</h5>
                    <p className="text-[9px] text-emerald-400 font-bold flex items-center gap-1">
                      <span className="animate-ping w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Respondendo agora
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-300 hover:text-white p-1 rounded-full cursor-pointer hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Body messages list */}
              <div className="p-4 h-64 overflow-y-auto bg-amber-50/15 space-y-3 flex flex-col">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === "support"
                        ? "bg-white border text-gray-700 self-start rounded-tl-none shadow-sm"
                        : "bg-secondary text-white self-end rounded-tr-none shadow-sm"
                    }`}
                  >
                    <p className="font-medium whitespace-pre-line">{msg.text}</p>
                    <span className="text-[8px] text-gray-400 font-bold block text-right mt-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Suggestion buttons */}
              <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5 justify-start">
                <button
                  type="button"
                  onClick={() => {
                    const text = "Como faço para receber o método prático e as planilhas?";
                    setChatMessages(prev => [...prev, { sender: "user", text, time: "Agora" }]);
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, {
                        sender: "support",
                        text: "O envio é 100% automático! Assim que o pagamento (do Pix ou cartão) for detectado, o sistema envia o PDF imediatamente para o seu e-mail e emite o aviso no seu WhatsApp. Leva menos de 2 minutos!",
                        time: "Agora"
                      }]);
                    }, 1200);
                  }}
                  className="text-[10px] font-bold text-secondary bg-white hover:bg-amber-50 border border-secondary/20 px-2.5 py-1 rounded-full transition cursor-pointer"
                >
                  Como recebo o acesso?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text = "O pagamento de R$ 19,90 é único ou tem mensalidade?";
                    setChatMessages(prev => [...prev, { sender: "user", text, time: "Agora" }]);
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, {
                        sender: "support",
                        text: "O pagamento é ÚNICO! Você paga apenas os R$ 19,90 uma vez e ganha acesso vitalício ao material, atualizações gratuitas e planilhas de precificação sem nenhuma cobrança surpresa no futuro.",
                        time: "Agora"
                      }]);
                    }, 1200);
                  }}
                  className="text-[10px] font-bold text-secondary bg-white hover:bg-amber-50 border border-secondary/20 px-2.5 py-1 rounded-full transition cursor-pointer"
                >
                  Tem mensalidade?
                </button>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Escreva sua dúvida aqui..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-secondary"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white p-2 rounded-xl transition shadow cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsChatOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-2xl cursor-pointer flex items-center justify-center border-2 border-white select-none gap-2 pr-5"
            >
              <div className="relative shrink-0">
                <MessageCircle className="w-6 h-6 stroke-[2.5]" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C62828] border-2 border-white rounded-full flex items-center justify-center text-[8px] font-extrabold text-white">
                  1
                </span>
              </div>
              <div className="text-left leading-none">
                <span className="text-[9px] font-extrabold opacity-75 uppercase tracking-wider block">Suporte</span>
                <span className="text-[11px] font-black block mt-0.5">Dúvidas?</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PREMIUM CHECKOUT SIMULATION MODAL */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        userEmail="robarros1910@gmail.com"
      />

    </div>
  );
}
