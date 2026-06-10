import React, { useState } from "react";
import { Check, ShieldCheck, Zap, X, CreditCard, QrCode, FileText, Sparkles, ShoppingCart, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export default function CheckoutModal({ isOpen, onClose, userEmail = "robarros1910@gmail.com" }: CheckoutModalProps) {
  // Step 1: Form & Options, Step 2: Payment Display, Step 3: Success Screen
  const [step, setStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "boleto">("pix");
  
  // Custom product options matching the spec
  const [hasOrderBump, setHasOrderBump] = useState<boolean>(false);
  const [hasUpsell, setHasUpsell] = useState<boolean>(false);
  
  // Form fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>(userEmail);
  const [phone, setPhone] = useState<string>("");
  
  // Card details mock
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCVV, setCardCVV] = useState<string>("");

  const pricing = {
    base: 19.90,
    orderBump: 9.90,
    upsell: 37.00,
  };

  const totalPrice = pricing.base + (hasOrderBump ? pricing.orderBump : 0) + (hasUpsell ? pricing.upsell : 0);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const simulateSuccess = () => {
    setStep(3);
  };

  const resetState = () => {
    setStep(1);
    setHasOrderBump(false);
    setHasUpsell(false);
    setName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCVV("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        id="modal-checkout-container"
        className="relative w-full max-w-2xl bg-[#FFF8E7] text-brand-dark rounded-3xl shadow-2xl border-4 border-primary/60 overflow-hidden my-8"
      >
        {/* Modal Banner */}
        <div className="bg-[#2A1711] p-5 text-white flex justify-between items-center relative overflow-hidden border-b-2 border-primary">
          <div className="absolute inset-0 bg-flags pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="bg-primary text-brand-dark p-2 rounded-xl">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-base md:text-lg flex items-center gap-2">
                Checkout Seguro - São João Lucrativo <Sparkles className="w-4 h-4 text-primary fill-primary animate-pulse" />
              </h4>
              <p className="text-gray-300 text-xs font-mono">Últimas vagas com desconto especial</p>
            </div>
          </div>
          <button 
            id="close-checkout"
            onClick={resetState}
            className="relative z-10 text-gray-400 hover:text-white p-1 rounded-full cursor-pointer hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic content steps */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 bg-brand-dark/5 p-2 rounded-xl mb-4">
                <span className="text-secondary flex items-center gap-1">● 1. Dados Pessoais</span>
                <span>───</span>
                <span>2. Pagamento Simulado</span>
                <span>───</span>
                <span>3. Sucesso instantâneo</span>
              </div>

              <div className="space-y-4">
                <h5 className="font-bold text-sm uppercase text-[#6D4C41] border-b border-accent/25 pb-1">
                  Qual o seu melhor e-mail para receber o acesso?
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1">Seu Nome Completo:</label>
                    <input 
                      id="checkout-name"
                      type="text"
                      required
                      placeholder="Ex: Maria Auxiliadora da Silva"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border-2 border-accent/20 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-1">Seu E-mail:</label>
                    <input 
                      id="checkout-email"
                      type="email"
                      required
                      placeholder="Ex: maria@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border-2 border-accent/20 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-0 focus:outline-none"
                    />
                    <span className="text-[10px] text-green-700 font-bold block mt-1">
                      ✓ Material enviado direto para este e-mail!
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1">WhatsApp para Contato:</label>
                  <input 
                    id="checkout-phone"
                    type="tel"
                    required
                    placeholder="(81) 98888-7777"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border-2 border-accent/20 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>
              {/* Total calculations */}
              <div className="bg-[#2A1711] text-white p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">Total a investir hoje:</p>
                  <p className="text-2xl font-black text-primary font-mono">
                    R$ {totalPrice.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-gray-400 italic">ou parcelado no cartão de crédito</p>
                </div>
                <button
                  type="submit"
                  id="checkout-step1-btn"
                  className="bg-secondary hover:bg-secondary-dark text-white font-extrabold text-sm uppercase px-5 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-secondary/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  Continuar Pagamento
                  <span>→</span>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 bg-brand-dark/5 p-2 rounded-xl mb-4">
                <span className="text-emerald-700 flex items-center gap-1">✓ 1. Dados Pessoais</span>
                <span>───</span>
                <span className="text-secondary flex items-center gap-1">● 2. Pagamento Simulado</span>
                <span>───</span>
                <span>3. Sucesso instantâneo</span>
              </div>

              <div className="space-y-3">
                <h5 className="font-extrabold text-sm uppercase text-brand-dark">Escolha a Forma de Pagamento Simulado:</h5>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    id="pay-method-pix"
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-3.5 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "pix"
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-800"
                        : "bg-white border-accent/20 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span>Pix Instantâneo</span>
                  </button>
                  <button
                    id="pay-method-card"
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3.5 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-secondary/10 border-secondary text-secondary-dark"
                        : "bg-white border-accent/20 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-secondary" />
                    <span>Cartão de Crédito</span>
                  </button>
                  <button
                    id="pay-method-boleto"
                    type="button"
                    onClick={() => setPaymentMethod("boleto")}
                    className={`p-3.5 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "boleto"
                        ? "bg-amber-500/10 border-amber-600 text-amber-800"
                        : "bg-white border-accent/20 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span>Boleto Bancário</span>
                  </button>
                </div>
              </div>

              {/* Details of corresponding layout */}
              <AnimatePresence mode="wait">
                {paymentMethod === "pix" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-5 bg-white rounded-2xl border-2 border-emerald-500/30 text-center space-y-4"
                  >
                    <div className="mx-auto w-32 h-32 bg-gray-100 p-2 rounded-xl flex items-center justify-center border-2 border-dashed border-emerald-500 relative">
                      {/* Fake QR code representation */}
                      <div className="absolute inset-2 bg-gradient-to-tr from-brand-dark via-gray-300 to-emerald-800 rounded opacity-80 flex flex-col items-center justify-center">
                        <QrCode className="w-16 h-16 text-white" />
                        <span className="text-[7px] text-white uppercase font-black tracking-widest mt-1">PIX SEGURO</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Chave Pix copia-e-cola gerada:</p>
                      <code className="text-[11px] block bg-gray-100 p-2 rounded-lg text-emerald-800 font-mono select-all truncate max-w-sm mx-auto mt-1 border">
                        00020101021226830014br.gov.bcb.pix2561saojoaolucrativo1990extra_bump_upsell
                      </code>
                    </div>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                      Escaneie ou copie a chave acima. O material será disparado para seu e-mail <strong>{email}</strong> logo após a simulação.
                    </p>
                  </motion.div>
                )}

                {paymentMethod === "card" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-5 bg-white rounded-2xl border-2 border-secondary/20 space-y-3"
                  >
                    <div className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                      <CreditCard className="w-3.5 h-3.5" /> Digite dados fictícios para teste rápido:
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Número do Cartão:</label>
                      <input 
                        id="card-number"
                        type="text"
                        placeholder="4444 5555 6666 7777"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-gray-50 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Validade (MM/AA):</label>
                        <input 
                          id="card-expiry"
                          type="text"
                          placeholder="12/30"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-gray-50 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-0.5">Código CVV:</label>
                        <input 
                          id="card-cvv"
                          type="text"
                          placeholder="321"
                          maxLength={4}
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          className="w-full bg-gray-50 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "boleto" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-5 bg-white rounded-2xl border-2 border-amber-500/20 text-center space-y-3"
                  >
                    <FileText className="w-12 h-12 text-amber-600 mx-auto" />
                    <div>
                      <h6 className="font-bold text-sm text-brand-dark">Boleto Bancário</h6>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
                        Compensa em até 2 dias úteis. Escolha Pix para ter acesso imediato às receitas e faturar ainda hoje!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Summary Items Table */}
              <div className="bg-[#2A1711]/5 p-4 rounded-2xl border border-accent/15 space-y-2">
                <h6 className="text-[11px] font-bold uppercase text-gray-500">Resumo do pedido:</h6>
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Método Prático São João Lucrativo</span>
                  <span className="font-bold">R$ 19,90</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-800 font-bold">
                  <span>↳ Planilha Inteligente de Custos</span>
                  <span>GRÁTIS</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-800 font-bold">
                  <span>↳ Kit de Artes para Vendas</span>
                  <span>GRÁTIS</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-800 font-bold">
                  <span>↳ Guia de Combos Lucrativos de São João</span>
                  <span>GRÁTIS</span>
                </div>
                <div className="border-t border-dashed border-accent/20 pt-2 flex justify-between font-bold text-sm text-brand-dark">
                  <span>Valor Total:</span>
                  <span className="font-mono text-base font-black text-secondary">R$ 19,90</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  id="btn-simulate-confirm"
                  onClick={simulateSuccess}
                  className="w-full bg-[#C62828] hover:bg-secondary-dark text-white font-extrabold text-sm uppercase py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/10 transition-all duration-300 hover:scale-[1.01]"
                >
                  <ShieldCheck className="w-5 h-5 text-yellow-300" />
                  Confirmar Pagamento de R$ {totalPrice.toFixed(2)}
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-500 font-medium px-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 
                    Seus dados estão 100% criptografados e protegidos.
                  </span>
                  <button 
                    type="button"
                    onClick={() => setStep(1)} 
                    className="text-[#6D4C41] underline cursor-pointer hover:text-black font-bold"
                  >
                    ← Voltar e alterar dados
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
              </div>
              
              <div className="space-y-2">
                <h5 className="text-2xl font-black text-emerald-800">Parabéns pelo excelente passo!</h5>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  A confirmação de faturamento simulado foi concluída. O espírito empreendedor do São João já está brilhando em sua jornada!
                </p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-emerald-100 p-5 text-left space-y-3.5 max-w-md mx-auto shadow-sm">
                <div className="flex items-center gap-3 border-b pb-2.5">
                  <Zap className="text-yellow-500 fill-yellow-500 w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold text-gray-700 uppercase">Acesso Liberado com sucesso!</span>
                </div>
                
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p><strong>Nome do Cliente:</strong> {name || "Empreendedora de Sucesso"}</p>
                  <p><strong>Acesso Enviado para:</strong> <span className="text-emerald-700 font-bold">{email}</span></p>
                  <p><strong>Status de Envio:</strong> <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">ENVIADO IMEDIATO</span></p>
                </div>
              </div>

              <p className="text-xs text-gray-500 italic max-w-sm mx-auto">
                Na vida real, a nossa integradora dispara os dados de acesso automaticamente para que em 2 minutos você comece a produzir!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  type="button"
                  id="btn-close-and-celebrate"
                  onClick={resetState}
                  className="w-full sm:w-auto bg-[#6D4C41] hover:bg-[#5D3C31] text-white font-extrabold text-xs uppercase px-6 py-3 rounded-xl cursor-pointer transition-all duration-300"
                >
                  Voltar à Página de Vendas
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
