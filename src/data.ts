import { RecipeItem, FAQItem, BonusItem, DeliverableItem } from "./types";

export const PRODUCT_RECIPES: RecipeItem[] = [
  {
    id: "bolo_milho",
    name: "Bolo de Milho Cremoso na Marmitinha",
    category: "Bolos Caseiros",
    defaultCost: 3.50,
    defaultPrice: 12.00,
    unit: "fatia/marmita",
    popularity: "Estouro",
  },
  {
    id: "pamonha",
    name: "Pamonha Gourmet Recheada (Doce/Salgada)",
    category: "Milho Especial",
    defaultCost: 4.20,
    defaultPrice: 15.00,
    unit: "unidade",
    popularity: "Estouro",
  },
  {
    id: "canjica",
    name: "Canjica cremosa com Canela e Amendoim",
    category: "Doces Quentes",
    defaultCost: 2.80,
    defaultPrice: 10.00,
    unit: "pote 250ml",
    popularity: "Alta",
  },
  {
    id: "pe_moleque",
    name: "Pé de Moleque Artesanal Macio",
    category: "Doces de Amendoim",
    defaultCost: 1.50,
    defaultPrice: 6.00,
    unit: "pacotinho",
    popularity: "Alta",
  },
  {
    id: "cocada",
    name: "Cocada Queimada de Forno Premium",
    category: "Clássicos Juninos",
    defaultCost: 1.90,
    defaultPrice: 7.00,
    unit: "pedaço",
    popularity: "Alta",
  },
  {
    id: "maca_amor",
    name: "Maçã do Amor Decorada e Crocante",
    category: "Infantil & Brindes",
    defaultCost: 2.20,
    defaultPrice: 9.00,
    unit: "unidade",
    popularity: "Estouro",
  },
  {
    id: "churros",
    name: "Churros Junino recheado de Doce de Leite",
    category: "Doces Fritos",
    defaultCost: 3.00,
    defaultPrice: 10.00,
    unit: "porção",
    popularity: "Média",
  },
  {
    id: "caldo_verde",
    name: "Caldo Verde Junino com Defumados",
    category: "Salgados",
    defaultCost: 4.50,
    defaultPrice: 16.00,
    unit: "copo 300ml",
    popularity: "Estouro",
  }
];

export const DELIVERABLES: DeliverableItem[] = [
  {
    id: "del_1",
    title: "São João Lucrativo: 45 Receitas Profissionais",
    description: "O e-book principal completo com o passo a passo de 45 receitas juninas e sazonais mais lucrativas do mercado, pesadas e medidas para você produzir diretamente da cozinha da sua casa com alta margem de lucro e sucesso garantido.",
    tagline: "MATERIAL PRINCIPAL"
  },
  {
    id: "del_2",
    title: "Tabela de Custos Inteligente São João Lucrativo",
    description: "A planilha automatizada inteligente para calcular centavo por centavo de custo, gás, ingredientes, perdas e a sua margem exata de lucro de forma instantânea e simples.",
    tagline: "SUPER BÔNUS INCLUSO"
  }
];

export const BONUSES: BonusItem[] = [
  {
    id: "smart_sheet_bonus",
    title: "Tabela de Custos Inteligente São João Lucrativo (+ Guia Rápido de Utilização)",
    value: 47,
    description: "Essa mesma planilha automática de precificação e custos para calcular seu lucro real de forma instantânea, acompanhada de um guia prático passo a passo de utilização em minutos.",
    badge: "BÔNUS EXCLUSIVO GRÁTIS"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Não tenho nenhuma experiência com cozinha, o método serve para mim?",
    answer: "Sim! Absolutamente. Todas as receitas foram reestruturadas em formato de passo a passo simples focado em produção comercial. Se você sabe ligar o forno e seguir medidas, você vai conseguir fazer pratos deliciosos e perfeitamente padronizados."
  },
  {
    question: "Preciso investir muito dinheiro para começar?",
    answer: "Não! Você pode começar utilizando os utensílios que já possui na sua cozinha. O método ensina como faturar as primeiras centenas de reais com pouquíssimos ingredientes e reinvestir o lucro para escalar a produção."
  },
  {
    question: "O material é enviado pelos correios?",
    answer: "Não, o produto é 100% digital. Você receberá o acesso imediato em seu e-mail logo após a confirmação do pagamento, podendo ler e assistir de qualquer celular, tablet ou computador."
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer: "É simples: compre agora, explore nosso material completo, use as tabelas e receitas. Se por qualquer motivo você sentir que o material não entregou valor, basta nos enviar um único e-mail dentro de 7 dias que devolveremos 100% do seu dinheiro, centavo por centavo."
  },
  {
    question: "As receitas são saudáveis ou gourmet?",
    answer: "As receitas são voltadas a quitutes super tradicionais, que são os mais procurados nas datas festivas. Mas ensinamos variações gourmet sofisticadas para você cobrar até dobro do preço normal."
  },
  {
    question: "Consigo conciliar a produção com meu trabalho atual?",
    answer: "Sim! A maioria das nossas alunas trabalha fora ou cuida de filhos e dedica apenas as noites ou fins de semana para cozinhar sob encomenda. Você dita seu próprio horário de atendimento."
  },
  {
    question: "Quanto posso chegar a ganhar vendendo no São João?",
    answer: "Depende da sua dedicação, mas nossa calculadora e plano de ação são focados em gerar faturamento médio de R$ 1.500,00 a R$ 4.000,00 extras já na temporada junina/julina inicial vendendo sob demanda."
  },
  {
    question: "Quais são as formas de pagamento disponíveis?",
    answer: "Pix, Cartão de Crédito e Boleto Bancário. No Pix e no Cartão de Crédito o acesso é liberado instantaneamente em menos de 2 minutos. No Boleto ele pode levar de 1 a 2 dias úteis para compensação."
  },
  {
    question: "O acesso expira?",
    answer: "Não! O seu acesso ao material e a todas as ferramentas complementares é vitalício. Você poderá usar o guia para faturar alto em todos os anos seguintes de festa junina!"
  },
  {
    question: "Por que o preço é tão barato (apenas R$ 19,90)?",
    answer: "Nosso objetivo é abraçar o espírito junino e viabilizar para que qualquer mãe de família ou trabalhadora autônoma consiga dar o ponto de partida na sua independência sem que o custo de entrada seja um obstáculo."
  }
];
