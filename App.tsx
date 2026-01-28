
import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Star, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  MessageCircle, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Minus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Smartphone,
  Info,
  ExternalLink
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- Constants & Types ---

const ROI_DATA = [
  { month: 'Setup', value: 0 },
  { month: 'Mês 1', value: 120 },
  { month: 'Mês 2', value: 240 },
  { month: 'Mês 3', value: 359 },
];

// --- Components ---

const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string, key?: React.Key }) => (
  <section id={id} className={`py-24 px-[5%] md:px-[8%] lg:px-[12%] ${className}`}>
    {children}
  </section>
);

const Card = ({ children, className = "", delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => (
  <div 
    className={`glass p-8 rounded-[24px] border border-[#CCAE34]/20 shadow-xl fade-up ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  onClick 
}: { 
  children?: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline', 
  className?: string,
  onClick?: () => void
}) => {
  const base = "px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider text-sm cursor-pointer";
  const styles = {
    primary: "gold-gradient text-white pulse-glow shine-sweep",
    secondary: "bg-black text-white hover:bg-gray-800",
    outline: "border-2 border-[#CCAE34] text-[#CCAE34] hover:bg-[#CCAE34] hover:text-white"
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#CCAE34]/20">
      <button 
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg">{question}</span>
        {isOpen ? <Minus className="gold-text" /> : <Plus className="gold-text" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// Componente de Logo centralizado com fundo branco
const LuxoBrasilLogo = ({ className = "h-16" }: { className?: string }) => (
  <div className={`bg-white px-8 py-4 rounded-2xl shadow-xl inline-flex items-center justify-center gap-4 border border-[#CCAE34]/20 ${className}`}>
    <div className="border-4 border-black p-2 flex items-center justify-center">
      <span className="text-3xl font-black text-black leading-none">LB</span>
    </div>
    <span className="text-3xl md:text-4xl font-bold tracking-tighter text-black uppercase font-sans">
      LuxoBrasil
    </span>
  </div>
);

// --- Sections ---

const KorbelTicker = () => {
  const tickerText = "Korbel AI • ";
  const repeatedText = Array(20).fill(tickerText).join("");

  return (
    <a 
      href="https://korbel.xpyrian.com/" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="ticker-container absolute bottom-0 left-0 hover:bg-black/50 transition-colors z-20"
    >
      <div className="ticker-content">
        {repeatedText} {repeatedText}
      </div>
    </a>
  );
};

const Hero = () => {
  return (
    <div className="relative h-[90vh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-home-with-pool-and-beach-view-1249-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mb-12">
        <div className="mb-10 fade-up" style={{ animationDelay: '0.2s' }}>
          <LuxoBrasilLogo />
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 fade-up" style={{ animationDelay: '0.4s' }}>
          Automatize seu comercial hoje
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-light tracking-wide fade-up" style={{ animationDelay: '0.6s' }}>
          Qualificação 24/7 • Integrações Rápidas • ROI 360%
        </p>
        <p className="text-lg md:text-xl gold-text font-semibold italic mb-10 fade-up" style={{ animationDelay: '0.8s' }}>
          Seus vendedores focados em vender
        </p>
        <Button 
          className="mx-auto md:scale-125" 
          onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explorar Soluções Luxo <ArrowRight size={18} className="ml-1" />
        </Button>
      </div>

      <KorbelTicker />
    </div>
  );
};

const Stats = () => {
  const stats = [
    { label: "DESDE 2012", sub: "200+ imóveis premium", icon: <Home className="gold-text" /> },
    { label: "9.8/10 HÓSPEDES", sub: "150 leads/semana Perception", icon: <Star className="gold-text" /> },
    { label: "4 CORRETORES", sub: "30h/semana manual", icon: <Clock className="gold-text" /> },
  ];

  return (
    <Section className="bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl mb-4 uppercase">Credibilidade LuxoBrasil</h2>
        <div className="w-24 h-1 gold-gradient mx-auto mb-8" />
        <p className="text-xl italic text-gray-700 max-w-3xl mx-auto">
          "Vocês conectam sonhos a refúgios exclusivos. Nós conectamos leads a locações fechadas."
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <Card key={i} delay={0.2 * i} className="text-center">
            <div className="flex justify-center mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{stat.label}</h3>
            <p className="text-gray-600">{stat.sub}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const Diagnosis = () => {
  const points = [
    { text: "150 LEADS/SEMANA ➜ APENAS 10% QUALIFICADOS", highlight: true },
    { text: "SDR hoje → +30h/semana tarefas manuais", highlight: false },
    { text: "STAYS.NET API ➜ POTENCIAL NÃO TOTALMENTE APROVEITADO", highlight: true },
    { text: "BASE ANTIGA ➜ REATIVAÇÃO MANUAL", highlight: true }
  ];
  return (
    <Section className="bg-gradient-to-br from-[#CCAE34]/10 to-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl mb-8 uppercase">Diagnóstico de Operação Premium</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Identificamos gargalos na conversão que impedem o crescimento da LuxoBrasil. 
            Nossa IA remove a fricção operacional, permitindo que sua equipe foque no que realmente importa: o fechamento.
          </p>
          <Button variant="outline" onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}>
            Ver Soluções <ChevronRight />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {points.map((point, i) => (
            <Card key={i} delay={0.1 * i} className={`p-6 ${point.highlight ? 'border-l-4 gold-border' : ''}`}>
              <Zap className="gold-text mb-2" size={24} />
              <p className="font-bold leading-tight uppercase text-sm md:text-base">{point.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

const WhyUs = () => {
  const points = [
    { title: "Atendimento 24/7", desc: "Nunca deixe um lead de luxo esperando. Resposta instantânea a qualquer hora.", icon: <Clock className="gold-text" /> },
    { title: "Qualificação Inteligente", desc: "Sua IA filtra curiosos e entrega apenas leads prontos para o fechamento.", icon: <ShieldCheck className="gold-text" /> },
    { title: "Escalabilidade", desc: "Aumente seu volume de leads sem precisar contratar novos SDRs.", icon: <TrendingUp className="gold-text" /> },
    { title: "Integração Stays.net", desc: "Dados de disponibilidade e preços sincronizados em tempo real.", icon: <Home className="gold-text" /> }
  ];

  return (
    <Section className="bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 uppercase">A Vantagem LuxoBrasil</h2>
        <div className="w-24 h-1 gold-gradient mx-auto mb-8" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {points.map((p, i) => (
          <div key={i} className="p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition-all duration-300">
            <div className="mb-6">{p.icon}</div>
            <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{p.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Pricing = () => {
  const [isOfficial, setIsOfficial] = useState(false);

  // Prices
  const prices = {
    essencial: {
      uazapi: { initial: 'R$ 2.497', recurring: 'R$ 497/mês' },
      official: { initial: 'R$ 2.700', recurring: '~R$ 1.947/mês' }
    },
    completo: {
      uazapi: { initial: 'R$ 4.997', recurring: 'R$ 797/mês' },
      official: { initial: 'R$ 5.200', recurring: '~R$ 2.147/mês' }
    }
  };

  const currentPrices = isOfficial ? 
    { essencial: prices.essencial.official, completo: prices.completo.official } : 
    { essencial: prices.essencial.uazapi, completo: prices.completo.uazapi };

  return (
    <Section id="ofertas" className="bg-[#f9f9f9]">
      <div className="text-center mb-16">
        <h2 className="text-5xl mb-6 uppercase">Ofertas Luxo</h2>
        <div className="inline-flex glass p-2 rounded-full border border-[#CCAE34]/20 shadow-md">
          <button 
            onClick={() => setIsOfficial(false)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${!isOfficial ? 'gold-gradient text-white shine-sweep shadow-lg' : 'text-gray-500 hover:text-[#CCAE34]'}`}
          >
            API UAZAPI
          </button>
          <button 
            onClick={() => setIsOfficial(true)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isOfficial ? 'gold-gradient text-white shine-sweep shadow-lg' : 'text-gray-500 hover:text-[#CCAE34]'}`}
          >
            <span>API Oficial WhatsApp</span>
            <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Recomendado</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Essencial */}
        <Card className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 bg-[#CCAE34]/10 rounded-bl-3xl">
            <Zap className="gold-text" />
          </div>
          <h3 className="text-3xl gold-text mb-2 uppercase font-bold">Essencial</h3>
          <p className="text-xl mb-8 font-semibold italic">"IA atende 24h e ENTREGA LEADS QUENTES pros corretores"</p>
          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> Resposta em &lt;2min (nunca perde lead)</li>
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> Imóveis do Stays.net ou planilha Excel</li>
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> Follow-ups automáticos até fechar 150/dia</li>
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> Lead quente no WhatsApp do corretor</li>
          </ul>
          <div className="mb-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-inner">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Mês 1 (Setup + Licença)</p>
            <p className="text-4xl font-bold text-black">{currentPrices.essencial.initial}</p>
            <p className="text-sm gold-text font-bold mt-2">Recorrência: {currentPrices.essencial.recurring}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => window.open('http://wa.me/5511988955329?text=Quero o Plano Essencial')}>Selecionar Essencial</Button>
        </Card>

        {/* Completo */}
        <Card className="relative overflow-hidden group border-2 border-[#CCAE34]">
          <div className="absolute top-0 right-0 px-6 py-2 gold-gradient text-white text-xs font-bold uppercase tracking-widest rounded-bl-3xl">
            Top Performance
          </div>
          <h3 className="text-3xl gold-text mb-2 uppercase font-bold">Completo ⭐</h3>
          <p className="text-xl mb-8 font-semibold italic">Tudo Essencial + OPERAÇÃO PROFISSIONAL</p>
          <ul className="space-y-4 mb-12">
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> + Relatórios diários performance IA</li>
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> + Reativação automática leads frios</li>
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> + Dashboard visual (métricas e leads)</li>
            <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500 shrink-0" /> + Agenda visitas direto com cliente</li>
          </ul>
          <div className="mb-8 p-6 gold-gradient/5 rounded-2xl border border-[#CCAE34]/20 shadow-inner">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Mês 1 (Setup + Licença)</p>
            <p className="text-4xl font-bold text-black">{currentPrices.completo.initial}</p>
            <p className="text-sm gold-text font-bold mt-2">Recorrência: {currentPrices.completo.recurring}</p>
          </div>
          <Button className="w-full" onClick={() => window.open('http://wa.me/5511988955329?text=Quero o Plano Completo')}>Fechar Completo Agora</Button>
        </Card>
      </div>

      {/* Comparison Section */}
      <div className="mt-24 max-w-4xl mx-auto p-8 glass rounded-[32px] border border-[#CCAE34]/20 shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <Info className="gold-text" size={32} />
          <h3 className="text-2xl font-bold uppercase">Por que escolher a API Oficial?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle className="text-green-500" size={18} /> API Oficial (Cloud API)</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Selo de verificação verde (opcional)</li>
              <li>• Risco de banimento zero</li>
              <li>• Mensagens ilimitadas por segundo</li>
              <li>• Cobrança por conversa (Meta)</li>
              <li>• Estabilidade total do servidor</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle className="gold-text" size={18} /> API UAZAPI (Alternativa)</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Custo fixo mensal extremamente baixo</li>
              <li>• Sem taxas por mensagem da Meta</li>
              <li>• Ideal para base de leads média</li>
              <li>• Setup instantâneo via QR Code</li>
              <li>• Funciona com qualquer número de telefone</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const ROISection = () => {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ROI_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                formatter={(value) => [`${value}% ROI`, 'Retorno']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#CCAE34" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#CCAE34', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, fill: '#CCAE34' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h2 className="text-4xl mb-6 uppercase tracking-tight">Recupere R$ 4.583/mês em vendas perdidas</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#CCAE34]/10 p-3 rounded-2xl">
                <TrendingUp className="gold-text" />
              </div>
              <div>
                <p className="font-bold text-xl uppercase tracking-tighter">ROI de 359%</p>
                <p className="text-gray-600">Considerando 5 temporadas (R$2.500) + 1 venda/ano.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#CCAE34]/10 p-3 rounded-2xl">
                <Clock className="gold-text" />
              </div>
              <div>
                <p className="font-bold text-xl uppercase tracking-tighter">Payback Expresso</p>
                <p className="text-gray-600">Investimento recuperado em média em 17 dias de operação ativa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const WhatsAppPreview = () => {
  return (
    <Section className="bg-[#f2f2f2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl mb-6 uppercase">Stays.net na Prática</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed italic">
            "Sua IA enviando fotos de Angra, disponibilidade em tempo real e links diretos para pagamento. O corretor só entra para o 'toque de ouro'."
          </p>
          <div className="space-y-4">
            <p className="flex items-center gap-2"><CheckCircle size={18} className="gold-text" /> API Stays direta</p>
            <p className="flex items-center gap-2"><CheckCircle size={18} className="gold-text" /> Google Sheets Auto-Sync</p>
            <p className="flex items-center gap-2"><CheckCircle size={18} className="gold-text" /> Scraping inteligente de catálogo</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-full max-w-[400px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" 
              alt="Mansão Angra" 
              className="w-full h-[500px] object-cover" 
            />
            <div className="absolute bottom-8 left-4 right-4 glass p-6 rounded-2xl border border-white/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-[10px] text-white font-bold">IA</div>
                <p className="text-xs font-bold uppercase gold-text">Consultora Virtual</p>
              </div>
              <p className="text-sm font-medium mb-3">
                Olá! Encontrei esta mansão beachfront em Angra. 
                Disponível 15-22/02. Valor: R$ 8.500/diária.
              </p>
              <div className="bg-green-500 text-white text-center py-2 rounded-lg text-xs font-bold shadow-md cursor-pointer hover:bg-green-600 transition-colors">
                Agendar com Corretor Agora
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const FAQTimeline = () => {
  const faqs = [
    { q: "O que muda na prática com a IA?", a: "Sua equipe para de responder perguntas repetitivas como 'tem piscina?' ou 'qual o valor da faxina?' e foca na etapa final do lead e fechar a reserva ou visita." },
    { q: "Funciona com meu CRM atual?", a: "Totalmente. Integramos com Kommo, RD Station, HubSpot ou qualquer sistema que receba Webhooks." },
    { q: "Qual o prazo de ativação?", a: "Nosso setup leva de 3 a 5 dias úteis para estar em produção com os primeiros leads sendo qualificados." },
    { q: "Complementa a Perception360?", a: "Sim! Seremos o braço direito da Perception. Eles trazem o volume, nós garantimos que sua equipe não perca tempo com leads desqualificados." }
  ];

  const steps = [
    { label: "PASSO 1", desc: "Reunião Estratégica 30min (hoje)" },
    { label: "PASSO 2", desc: "Setup & Integração 3-5 dias" },
    { label: "PASSO 3", desc: "Vídeo QR Code & Treinamento 5min" },
    { label: "PASSO 4", desc: "Leads Quentes DIA 1" }
  ];

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-4xl mb-12 uppercase">Confiança & Transparência</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <FAQItem key={i} question={f.q} answer={f.a} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-4xl mb-12 uppercase">Sua Jornada</h2>
          <div className="space-y-12">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-[-48px] w-0.5 bg-gradient-to-b from-[#CCAE34] to-transparent" />
                )}
                <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <p className="gold-text text-sm font-bold uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-xl font-bold">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const FooterCTA = () => {
  return (
    <div className="fixed bottom-12 left-0 right-0 z-50 px-[5%] flex justify-center pointer-events-none">
      <div className="glass p-4 md:p-6 rounded-[32px] border-2 border-[#CCAE34]/40 shadow-2xl flex flex-col md:flex-row items-center gap-6 max-w-4xl w-full pointer-events-auto">
        <div className="text-center md:text-left hidden md:block">
          <p className="font-bold text-lg leading-tight uppercase tracking-tighter">Pronto para a Automação Luxo?</p>
          <p className="text-xs gold-text uppercase font-bold tracking-widest">Ativação em até 5 dias úteis</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <a 
            href="http://wa.me/5511988955329" 
            target="_blank" 
            className="flex-1 md:flex-none gold-gradient text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl pulse-glow shine-sweep group no-underline"
          >
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold opacity-80 leading-none">Falar com Kaio agora</p>
              <p className="text-sm font-bold uppercase tracking-tighter">WhatsApp Prioritário</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrolled((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative antialiased selection:bg-[#CCAE34] selection:text-white">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 gold-gradient z-[100] transition-all duration-300" 
        style={{ width: `${scrolled}%` }} 
      />

      <Hero />
      <Stats />
      <Diagnosis />
      <WhyUs />
      <Pricing />
      <ROISection />
      <WhatsAppPreview />
      
      <Section className="bg-black text-white text-center">
        <ShieldCheck className="gold-text mx-auto mb-6" size={64} />
        <h2 className="text-4xl md:text-6xl mb-8 uppercase">Confiança Total LuxoBrasil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/10 text-white border-white/20">
            <h3 className="gold-text font-bold mb-4 uppercase">Transparência</h3>
            <p className="text-sm opacity-80">50% Entrada + 50% Go-Live. Pagamento por PIX ou Cartão em até 12x.</p>
          </Card>
          <Card className="bg-white/10 text-white border-white/20">
            <h3 className="gold-text font-bold mb-4 uppercase">Sem Fidelidade</h3>
            <p className="text-sm opacity-80">Nossa retenção é baseada em resultados. Cancele sua recorrência a qualquer momento sem multas.</p>
          </Card>
        </div>
      </Section>

      <FAQTimeline />

      {/* Footer Branding */}
      <footer className="py-24 px-[12%] bg-white text-center border-t border-gray-100 mb-32">
        <div className="flex flex-col items-center gap-8 mb-12">
          <LuxoBrasilLogo className="scale-75 opacity-80" />
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm italic max-w-lg">
              "Experiências fluidas 24/7. Vocês entregam luxo aos hóspedes, nós entregamos leads aos corretores. Simples assim."
            </p>
            
            <div className="h-px w-24 bg-gray-200" />
            
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-bold tracking-widest text-gray-500 uppercase font-[Bricolage Grotesque]">Desenvolvido por Korbel AI</p>
              <a 
                href="https://korbel.xpyrian.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl hover:bg-[#C9A961]/10 transition-all border border-transparent hover:border-[#C9A961]/20 no-underline"
              >
                <span className="text-sm font-bold text-gray-700 group-hover:text-[#C9A961] transition-colors uppercase tracking-tight">Visitar site da Korbel</span>
                <ExternalLink size={14} className="text-gray-400 group-hover:text-[#C9A961]" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <FooterCTA />
    </div>
  );
}
