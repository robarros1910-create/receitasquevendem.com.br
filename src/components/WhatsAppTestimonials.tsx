import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Video, 
  MoreVertical, 
  ChevronLeft, 
  Smile, 
  Paperclip, 
  Mic, 
  CheckCheck,
  Sparkles,
  Lock,
  Wifi,
  Battery
} from "lucide-react";

// Import real uploaded WhatsApp screenshot assets for compilation and native rendering
import depoimento1 from "../assets/images/depoimento1.png";
import depoimento2 from "../assets/images/depoimento2.png";
import depoimento3 from "../assets/images/depoimento3.png";
import depoimento4 from "../assets/images/depoimento4.png";

interface ChatMessage {
  sender: "incoming" | "outgoing";
  text: string;
  time: string;
}

interface ChatProfile {
  name: string;
  status: string;
  avatarUrl: string;
  avatarText: string;
  timeHeader: string;
  batteryPercent: number;
  batteryLow?: boolean;
  networkType: "4G" | "Wifi" | "5G";
  messages: ChatMessage[];
  imageSrc: string; // Target real screenshot file path
}

const TESTIMONIALS_CHATS: ChatProfile[] = [
  {
    name: "Márcia Silva",
    status: "online",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150", 
    avatarText: "MS",
    timeHeader: "14:54",
    batteryPercent: 90,
    networkType: "Wifi",
    imageSrc: depoimento1,
    messages: [
      {
        sender: "incoming",
        text: "A planilha de precificação e custos valeu cada centavo. Eu descobri que estava lucrando, mas na verdade estava quase pagando para cozinhar. Com as receitas de Canjica Cremosa no copo e o cálculo de combos que o material ensina, consegui reprecificar e faturar R$ 3.200,00 na nossa região. Indico para todo mundo!",
        time: "13:27"
      },
      {
        sender: "incoming",
        text: "to muito felizzzzz",
        time: "13:27"
      },
      {
        sender: "incoming",
        text: "🥰🥰🥰🥰🥰🥰🥰",
        time: "13:27"
      },
      {
        sender: "outgoing",
        text: "Que legal, ficamos muito felizes em ajuda-la em seu crescimento pessoal e profissional",
        time: "14:10"
      },
      {
        sender: "incoming",
        text: "esta me ajudando muito vc nao faz idéiaaa",
        time: "14:11"
      },
      {
        sender: "incoming",
        text: "tenho divulgado mto na minha cidade conheço bastante gente",
        time: "14:11"
      }
    ]
  },
  {
    name: "Nathalia",
    status: "visto por último hoje às 10:04",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    avatarText: "NA",
    timeHeader: "10:04",
    batteryPercent: 50,
    networkType: "4G",
    imageSrc: depoimento2,
    messages: [
      {
        sender: "incoming",
        text: "Oiiiiieee, está começando a caminhar super bem minhas encomendas!!! =)",
        time: "09:27"
      },
      {
        sender: "outgoing",
        text: "Que legal querida, me conteeee tudoooo",
        time: "09:43"
      },
      {
        sender: "incoming",
        text: "Eu trabalho em período integral e não tinha tempo nenhum para divulgar. Usei os roteiros prontos de cópia do WhatsApp que vêm de bônus, modifiquei de leve e enviei para a secretaria de duas escolas onde tenho contato, onde meus priminhos estudam. Fechei encomendas para festa da escola dele. Lucro R$ 2.450,00 a mais trabalhando só no sábado! Um dia de festa, aonde já se viu isso?",
        time: "09:59"
      },
      {
        sender: "outgoing",
        text: "aiii que legal, vá nos mandando as novidades, muito legal acompanharmos o progresso de nossas alunas... 🥰\n\né só o começo!!!",
        time: "10:00"
      }
    ]
  },
  {
    name: "Mica",
    status: "online",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    avatarText: "MI",
    timeHeader: "00:47",
    batteryPercent: 5,
    batteryLow: true,
    networkType: "5G",
    imageSrc: depoimento3,
    messages: [
      {
        sender: "outgoing",
        text: "Oi tudo bem? Passando aqui para saber o que achou do conteúdo, se já começou colocar em prática?",
        time: "16:33"
      },
      {
        sender: "incoming",
        text: "Eai, tudo bem e vc?",
        time: "00:44"
      },
      {
        sender: "incoming",
        text: "Nossa, compramos faz um pouco mais de 15 dias e começamos a divulgar, meu marido está até me ajudando, paramos só agora, fizemos as encomendas de amanhã, está dificil conciliar a rotina do trabalho, de mãe, e agora de confeiteira rs.",
        time: "00:44"
      },
      {
        sender: "incoming",
        text: "Mas estamos amando, cheio de planos.. torcendo mto pra dar certo e se tornar nosso trabalho principal",
        time: "00:44"
      },
      {
        sender: "outgoing",
        text: "Que notícia boa querida, dará certo sim e ficamos muito felizes que o conteúdo tem agregado. Que vcs consigam prosperar e realizar seus sonhos!!",
        time: "00:46"
      }
    ]
  },
  {
    name: "Paulo Ricardo",
    status: "online",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    avatarText: "PR",
    timeHeader: "17:13",
    batteryPercent: 70,
    networkType: "4G",
    imageSrc: depoimento4,
    messages: [
      {
        sender: "outgoing",
        text: "Boa tarde Paulo, tudo bem? Estamos chamando alguns alunos para saber como estão se saindo, o que acharam do nosso produto?",
        time: "17:11"
      },
      {
        sender: "incoming",
        text: "Quem fala",
        time: "17:12"
      },
      {
        sender: "outgoing",
        text: "Meu nome é Bia, eu trabalho no Receitas que Vendem, vc comprou um produto nosso, dia 07/06, o São João Lucrativo.",
        time: "17:13"
      },
      {
        sender: "incoming",
        text: "aa legal",
        time: "17:13"
      },
      {
        sender: "incoming",
        text: "veio em boa hora",
        time: "17:14"
      },
      {
        sender: "incoming",
        text: "perdi o emprego recentemente",
        time: "17:14"
      },
      {
        sender: "incoming",
        text: "só minha esposa trablhando e eu gosto de cozinhar",
        time: "17:14"
      },
      {
        sender: "incoming",
        text: "to divulgando boca a boca, pelo zap fiz ifood esta melhor do que imaginava",
        time: "17:15"
      },
      {
        sender: "incoming",
        text: "as receitas sao bem interssantes",
        time: "17:15"
      }
    ]
  }
];

// Fallback HTML WhatsApp mockup for pixel-perfect visual fidelity before file upload
function WhatsAppFallbackMockup({ chat }: { chat: ChatProfile }) {
  return (
    <div 
      className="w-full max-w-[320px] sm:max-w-[335px] bg-[#0b141a] rounded-[2rem] shadow-2xl border-[6px] border-[#1f2c34] overflow-hidden shrink-0 relative flex flex-col justify-between font-sans text-white select-none scale-95 sm:scale-100 transition-transform duration-300"
      style={{ height: "650px" }}
    >
      {/* Notch overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1f2c34] rounded-b-2xl z-20 flex items-center justify-center">
        <div className="w-8 h-1 bg-gray-600 rounded-full" />
      </div>

      {/* 1. Top System Bar (IPhone Style) */}
      <div className="bg-[#1f2c34] px-5 pt-3.5 pb-1 flex items-center justify-between text-[11px] font-semibold text-gray-200 z-10 shrink-0">
        <span className="font-mono tracking-tight">{chat.timeHeader}</span>
        <div className="flex items-center gap-1.5 grayscale opacity-85">
          <span className="text-[9px] tracking-widest">📶📶📶</span>
          {chat.networkType === "Wifi" ? <Wifi className="w-3 h-3" /> : <span className="font-mono text-[9px] font-black">{chat.networkType}</span>}
          <div className="flex items-center gap-0.5">
            <span className="font-mono text-[9px]">{chat.batteryPercent}%</span>
            <Battery className={`w-4 h-4 ${chat.batteryLow ? "text-red-500 fill-red-500" : "text-gray-200"}`} />
          </div>
        </div>
      </div>

      {/* 2. WhatsApp Header Profile Row */}
      <div className="bg-[#1f2c34] px-3.5 py-2.5 flex items-center justify-between text-white border-b border-[#0b141a]/40 shrink-0 z-10">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-5 h-5 text-emerald-400 shrink-0" />
          
          <div className="relative shrink-0">
            <img 
              src={chat.avatarUrl} 
              alt={chat.name} 
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-white/10"
            />
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#1f2c34] ${chat.status.includes("online") ? "bg-emerald-500" : "bg-gray-400"}`} />
          </div>

          <div className="leading-tight">
            <h4 className="font-black text-[13.5px] leading-none text-gray-100 tracking-tight">
              {chat.name}
            </h4>
            <p className="text-[10px] text-emerald-400 font-bold tracking-tight lowercase">
              {chat.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 text-emerald-400">
          <Video className="w-4 h-4" />
          <Phone className="w-4 h-4" />
          <MoreVertical className="w-4 h-4 text-gray-300" />
        </div>
      </div>

      {/* 3. WhatsApp Messages Canvas */}
      <div className="flex-1 px-3 py-3 space-y-2 relative bg-[#0b141a] flex flex-col justify-end overflow-hidden">
        {/* Subtle repeating vector tile pattern inside the chat background */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-repeat" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200')" }} 
        />

        {/* Golden Secure Lock Message */}
        <div className="self-center bg-[#182229]/95 border border-[#2a3942]/40 rounded-lg px-2 text-center max-w-[270px] mx-auto z-10 shadow-sm shrink-0">
          <p className="text-[8.5px] text-[#ffd279] font-medium leading-normal flex items-center justify-center gap-1 py-1">
            <Lock className="w-2.5 h-2.5 shrink-0" /> Criptografia de ponta a ponta ativa.
          </p>
        </div>

        {/* Chat Date separator */}
        <div className="self-center bg-[#121b22]/90 px-3 py-0.5 rounded-md shadow-sm z-10 text-[9.5px] text-gray-400 font-bold uppercase tracking-wider shrink-0 mb-1">
          Hoje
        </div>

        {/* List of Messages */}
        <div className="space-y-2 z-10 overflow-y-auto pr-0.5 flex flex-col justify-end">
          {chat.messages.map((msg, index) => {
            const isIncoming = msg.sender === "incoming";
            return (
              <div 
                key={index} 
                className={`flex w-full ${isIncoming ? "justify-start" : "justify-end"}`}
              >
                <div 
                  className={`max-w-[88%] rounded-lg px-2.5 py-1.5 text-xs shadow-sm relative ${
                    isIncoming 
                      ? "bg-[#202c33] text-gray-100 rounded-tl-none border-l-2 border-[#ff9d23]/25" 
                      : "bg-[#005c4b] text-gray-100 rounded-tr-none border-r-2 border-[#10b981]/25"
                  }`}
                >
                  {/* Tail bubble triangles style */}
                  {index === 0 && (
                    <div className={`absolute top-0 w-2 h-2 ${
                      isIncoming 
                        ? "-left-1 bg-[#202c33]" 
                        : "-right-1 bg-[#005c4b]"
                    }`} style={{ clipPath: isIncoming ? "polygon(100% 0, 0 0, 100% 100%)" : "polygon(0 0, 100% 0, 0 100%)" }} />
                  )}

                  <p className="whitespace-pre-line leading-relaxed text-[11px] font-medium tracking-wide">
                    {msg.text}
                  </p>
                  
                  <div className="flex items-center justify-end gap-1 mt-1 shrink-0 select-none">
                    <span className="text-[8px] text-gray-400 font-mono">
                      {msg.time}
                    </span>
                    {!isIncoming && (
                      <CheckCheck className="w-3 h-3 text-[#53bdeb] shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom WhatsApp Input mockup */}
      <div className="bg-[#1f2c34] px-2 py-2 flex items-center gap-1.5 select-none border-t border-[#0b141a]/40 shrink-0">
        <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1 flex items-center justify-between text-gray-400 text-xs">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Mensagem</span>
          </div>
          <Paperclip className="w-4 h-4 text-gray-400 shrink-0 rotate-45" />
        </div>
        
        <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center shrink-0 shadow-md">
          <Mic className="w-4 h-4 text-[#111b21] shrink-0" />
        </div>
      </div>
    </div>
  );
}

// Single screenshot responsive wrapper with state-based fallback
function TestimonialItem({ chat }: { chat: ChatProfile; key?: string }) {
  const [useFallback, setUseFallback] = useState(false);

  // We detect if the actual screenshot image raises an error (which happens if they haven't uploaded it)
  // If it does, we show the beautiful pixel-perfect replication in its place
  if (useFallback) {
    return <WhatsAppFallbackMockup chat={chat} />;
  }

  return (
    <div 
      className="w-[280px] sm:w-[320px] shrink-0 transition-transform duration-300 hover:scale-[1.01] flex justify-center py-2 relative"
    >
      <img
        src={chat.imageSrc}
        alt={`Depoimento de ${chat.name}`}
        referrerPolicy="no-referrer"
        onError={() => setUseFallback(true)}
        className="w-full h-auto max-h-[650px] object-contain rounded-2xl shadow-2xl border-4 border-[#1f2c34] bg-neutral-900"
        style={{
          aspectRatio: "340 / 730"
        }}
      />
    </div>
  );
}

export default function WhatsAppTestimonials() {
  return (
    <section id="depoimentos" className="bg-[#FFFDF9] py-20 px-4 sm:px-6 border-y border-amber-200/50 overflow-hidden relative">
      {/* Background decoration flags */}
      <div className="absolute inset-0 bg-flags opacity-[0.03] pointer-events-none animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF0E0] border border-[#FFA100]/30 text-[#A0522D] text-[10px] sm:text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-spin" />
            Prints Reais — Resultados Comprovados
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2A1711] leading-tight font-sans">
            Conversas Reais de Quem Já Está Faturando Alto!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-medium">
            Arraste ou passe o mouse por cima das conversas para pausar a rolagem automática:
          </p>
        </div>

        {/* UNIVERSAL CONTINUOUS AUTO-SCROLLING MARQUEE (Works beautifully on both desktop, tablet, and mobile!) */}
        <div className="relative w-full overflow-hidden py-6">
          {/* Subtle side vignettes to guide attention */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FFFDF9] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FFFDF9] to-transparent z-10 pointer-events-none" />

          {/* Continuous scrolling container */}
          <div className="flex w-full select-none overflow-x-auto scrollbar-none scroll-smooth">
            <div 
              id="testimonials-infinite-marquee"
              className="flex gap-6 sm:gap-8 hover:[animation-play-state:paused] active:scale-[0.99] cursor-grab active:cursor-grabbing py-2"
              style={{
                display: "flex",
                width: "max-content",
                animation: "marquee 35s linear infinite"
              }}
            >
              {/* First Track block */}
              {TESTIMONIALS_CHATS.map((chat, idx) => (
                <TestimonialItem key={`track1-${idx}-${chat.name}`} chat={chat} />
              ))}
              {/* Duplicate Clone track block for seamless looping */}
              {TESTIMONIALS_CHATS.map((chat, idx) => (
                <TestimonialItem key={`track2-${idx}-${chat.name}`} chat={chat} />
              ))}
              {/* Third Clone track block to satisfy wide screens and eliminate gaps completely */}
              {TESTIMONIALS_CHATS.map((chat, idx) => (
                <TestimonialItem key={`track3-${idx}-${chat.name}`} chat={chat} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>💡 Toque ou mantenha o cursor por cima para congelar a imagem e ler</span>
          </div>
        </div>



        {/* Dynamic call to action below testimonials - ultra-high conversion visual card */}
        <div 
          id="testimonials-cta-box"
          className="mt-16 p-6 sm:p-8 lg:p-10 bg-[#2A1711] rounded-[2rem] border-2 border-[#FFA000] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
        >
          {/* Subtle absolute glows */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-white mb-4">
            <span className="bg-[#C62828] text-white text-[10px] sm:text-xs font-black px-3.5 py-1 rounded-full tracking-widest uppercase border border-yellow-400/20 shadow-md animate-pulse">
              RESULTADO IMEDIATO
            </span>
            <p className="text-sm sm:text-base font-extrabold text-amber-100 tracking-wide">
              Quer ver esses mesmos resultados no seu bolso?
            </p>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
            Leve toda a Apostila de São João + 3 Super Bônus por apenas R$ 19,90!
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-300 mb-8 uppercase tracking-widest font-bold leading-normal">
            Sem mensalidades. Sem pegadinhas. Seu negócio começa a lucrar já neste fim de semana!
          </p>
          
          <a
            href="https://pay.hotmart.com/A106118711S?checkoutMode=10"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-sm sm:text-base font-black uppercase py-4.5 px-8 sm:px-14 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center cursor-pointer font-sans"
          >
            Quero Começar a Faturar Agora!
          </a>
        </div>

      </div>

      {/* Inject custom CSS keyframe for marquee directly into document head if needed or compile natively */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
