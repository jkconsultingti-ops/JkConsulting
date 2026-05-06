"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, Zap, GitMerge, BarChart2, Database, ArrowDown } from "lucide-react";

/* ─── Automation flow visual ─── */
function AutomationFlow() {
  const nodes = [
    { label: "Lead entra", x: 10 },
    { label: "IA qualifica", x: 35 },
    { label: "CRM atualiza", x: 60 },
    { label: "Follow-up", x: 85 },
  ];
  return (
    <div className="relative w-full h-28 select-none">
      <svg viewBox="0 0 400 80" className="w-full h-full">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A1E0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00A1E0" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line x1="40" y1="40" x2="360" y2="40" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 3" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x * 4} cy="40" r="14" fill="#0B1F3B" stroke="#00A1E0" strokeWidth="2" />
            <text x={n.x * 4} y="44" textAnchor="middle" fill="#00A1E0" fontSize="10" fontWeight="bold">{i + 1}</text>
            <text x={n.x * 4} y="66" textAnchor="middle" fill="#94a3b8" fontSize="8">{n.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const services = [
  {
    Icon: Zap,
    title: "Automação com IA",
    desc: "Fluxos que trabalham por você 24/7 — qualificação de leads, follow-up e atendimento no automático.",
  },
  {
    Icon: GitMerge,
    title: "Integrações (n8n, APIs, WhatsApp)",
    desc: "Conectamos todas as ferramentas do seu negócio para que os dados fluam sem trabalho manual.",
  },
  {
    Icon: Database,
    title: "CRM (Salesforce e outros)",
    desc: "Implementamos e otimizamos o CRM certo para o seu negócio, com pipeline rodando sozinho.",
  },
  {
    Icon: BarChart2,
    title: "Fluxos de vendas automatizados",
    desc: "Criamos sequências de vendas que nutrem, convertem e fecham — sem depender da memória do vendedor.",
  },
];

const steps = [
  { n: "01", title: "Diagnóstico gratuito", desc: "Mapeamos seu negócio e identificamos onde está perdendo dinheiro com processos manuais." },
  { n: "02", title: "Mapeamento de processos", desc: "Desenhamos o fluxo ideal com automações, integrações e CRM para o seu contexto." },
  { n: "03", title: "Implementação das automações", desc: "Colocamos tudo no ar em até 15 dias. Sem enrolação, sem teoria." },
  { n: "04", title: "Otimização contínua", desc: "Acompanhamos os resultados e ajustamos para maximizar conversão e eficiência." },
];

const before = ["Trabalho manual todo dia", "Leads esquecidos sem follow-up", "Respostas lentas que perdem clientes", "Pipeline desorganizado", "Perda de oportunidades por falta de processo"];
const after  = ["Follow-up automático com IA", "Leads qualificados e nutridos sozinhos", "Respostas imediatas 24/7", "Pipeline rodando no automático", "Mais conversões com menos esforço"];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#00A1E020,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Automação · IA · CRM
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-3xl">
            Transformamos processos em{" "}
            <span className="text-blue-400">máquinas de receita.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
            Automação com IA, integrações e CRM para empresas que querem crescer com previsibilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contato"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg flex items-center justify-center gap-2 group"
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/servicos"
              className="border border-gray-700 hover:border-blue-600/60 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg text-center"
            >
              Ver como automatizar meu negócio
            </Link>
          </div>

          <div className="mt-16 bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 text-center">Como funciona na prática</p>
            <AutomationFlow />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">O problema</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Seu negócio ainda depende de processos manuais?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Leads esquecidos sem nenhum acompanhamento", "Follow-up que depende da memória do vendedor", "Atendimento lento que perde clientes para o concorrente", "Oportunidades sendo perdidas por falta de processo", "Processos desorganizados que consomem tempo da equipe"].map((item) => (
              <div key={item} className="flex gap-3 items-start bg-red-50 border border-red-100 rounded-xl px-5 py-4">
                <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <ArrowDown size={28} className="text-blue-600 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── SOLUÇÃO ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">A solução</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
            Automação que gera resultado real
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Implementamos sistemas automatizados que trabalham por você <strong className="text-gray-700">24 horas por dia, 7 dias por semana</strong>. Sem depender de planilha, sem depender de memória, sem depender de esforço manual.
          </p>
        </div>
      </section>

      {/* ── ANTES vs DEPOIS ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Antes e depois</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Veja a diferença na prática
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ANTES */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle size={20} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Antes</h3>
              </div>
              <ul className="space-y-4">
                {before.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-gray-500">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* DEPOIS */}
            <div className="bg-gray-900 border border-blue-600/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#00A1E015,transparent_70%)]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Depois da JK Consulting</h3>
                </div>
                <ul className="space-y-4">
                  {after.map((item) => (
                    <li key={item} className="flex gap-3 items-start text-gray-300">
                      <CheckCircle2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">O que fazemos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Serviços que geram resultado
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFERTA ── */}
      <section className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#00A1E012,transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Oferta principal</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Automation Growth Setup</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Implementamos automações no seu negócio em até <strong className="text-white">15 dias</strong> para aumentar conversão e reduzir trabalho manual.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              "Estruturação do pipeline de vendas",
              "Automações essenciais de follow-up",
              "Integrações entre as principais ferramentas",
              "Dashboard de acompanhamento de resultados",
            ].map((item) => (
              <div key={item} className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle2 size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl transition-all text-lg group"
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-gray-500 text-sm mt-3">Sem compromisso. 100% gratuito.</p>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Processo</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">Como funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/20">
                  <span className="text-white font-bold text-lg">{n}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-4 bg-blue-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ffffff15,transparent_60%)]" />
        <div className="max-w-2xl mx-auto relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Pronto para automatizar seu negócio?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Menos trabalho manual. Mais vendas no automático.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-5 rounded-xl transition-all text-lg group shadow-xl"
          >
            Agendar diagnóstico gratuito
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-blue-200 text-sm mt-4">Sem compromisso · Resposta em até 24h</p>
        </div>
      </section>
    </>
  );
}
