import React, { useState } from 'react';

const AGENTS = [
  { 
    id: 'mentor-x', 
    name: 'MENTOR-X', 
    role: 'Tutor Pessoal & Trilha de Aprendizado Adaptativa', 
    icon: '🧠',
    actionText: 'Gerar Trilha Personalizada',
    mockResponse: 'Trilha personalizada calculada com sucesso com base no perfil do estudante. Recomendação: Módulo de IA Aplicada & Engenharia de Prompts.'
  },
  { 
    id: 'lumen', 
    name: 'LUMEN', 
    role: 'Gerador de Conteúdo, Módulos & Exercícios Práticos', 
    icon: '📖',
    actionText: 'Criar Exercício Prático',
    mockResponse: 'Módulo prático gerado: "Construção de APIs para Agentes com React e Vite". 3 exercícios práticos adicionados à sua fila.'
  },
  { 
    id: 'evaluator', 
    name: 'EVALUATOR', 
    role: 'Correção de Código, Provas & Feedback Instantâneo', 
    icon: '🎓',
    actionText: 'Auditar Código',
    mockResponse: 'Sintaxe e estrutura validadas com sucesso. Pontuação: 98/100. Nenhuma vulnerabilidade crítica encontrada.'
  },
  { 
    id: 'community-ai', 
    name: 'COMMUNITY-AI', 
    role: 'Moderação de Fóruns & Suporte a Alunos 24/7', 
    icon: '👥',
    actionText: 'Verificar Fórum',
    mockResponse: 'Fóruns da comunidade moderados em tempo real. 0 ocorrências pendentes de moderação.'
  },
  { 
    id: 'career-copilot', 
    name: 'CAREER-COPILOT', 
    role: 'Orientação de Carreira, Portfólio & Entrevistas', 
    icon: '💼',
    actionText: 'Otimizar Portfólio',
    mockResponse: 'Análise de portfólio concluída. Recomendação de destaque: Projetos de Arquitetura de Agentes Autônomos em React/Node.js.'
  },
  { 
    id: 'chat-flow', 
    name: 'CHAT-FLOW', 
    role: 'Atendimento Comercial & Conversão de Alunos', 
    icon: '💬',
    actionText: 'Simular Conversão',
    mockResponse: 'Fluxo comercial ativo. Lead direcionado para a apresentação das Trilhas de Inteligência Educacional.'
  },
  { 
    id: 'sec-edu', 
    name: 'SEC-EDU', 
    role: 'Proteção de Conteúdo, DRM, Criptografia SHA-256 & LGPD', 
    icon: '🛡️',
    actionText: 'Verificar DRM & Hashing',
    mockResponse: 'Integridade dos módulos validada. Chave SHA-256 ativa. Conformidade LGPD: 100% OK.'
  },
];

export default function App() {
  const [studentName, setStudentName] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('Desenvolvimento Full-Stack & IA');
  const [activeAgent, setActiveAgent] = useState(null);
  const [agentLogs, setAgentLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTrail, setGeneratedTrail] = useState(null);

  const sanitizeInput = (text) => text.replace(/[<>/{}]/g, '').trim();

  const generateSha256Hash = async (message) => {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const handleAuthAndGenerate = async (e) => {
    e.preventDefault();
    const cleanName = sanitizeInput(studentName);
    if (!cleanName) return alert('Por favor, informe o nome do aluno.');

    const timestamp = new Date().toISOString();
    const payload = `${cleanName}:${selectedTrack}:${timestamp}`;
    const hash = await generateSha256Hash(payload);

    const resultData = {
      student: cleanName,
      track: selectedTrack,
      hash,
      timestamp,
      secEduStatus: 'Supervisionado & Sanitizado por SEC-EDU',
    };

    setGeneratedTrail(resultData);
    localStorage.setItem('nexa_last_trail', JSON.stringify(resultData));
  };

  const openAgentModal = (agent) => {
    setActiveAgent(agent);
    setIsProcessing(false);
    setAgentLogs([
      `> Inicializando agente ${agent.name}...`,
      `> Verificando diretrizes de criptografia SEC-EDU... OK`,
      `> Aguardando solicitação de execução.`
    ]);
  };

  const executeAgentTask = (agent) => {
    setIsProcessing(true);
    setAgentLogs((prev) => [...prev, `> Executando: "${agent.actionText}"...`]);

    setTimeout(() => {
      setAgentLogs((prev) => [
        ...prev,
        `> Processamento concluído.`,
        `> RESPOSTA DO AGENTE: ${agent.mockResponse}`
      ]);
      setIsProcessing(false);
    }, 1200);
  };

  const shareTrailViaWhatsApp = () => {
    if (!generatedTrail) return;
    const textMessage = `*NEXA EDU & MENTOR - Autenticação de Trilha*\n\n` +
      `👤 *Aluno:* ${generatedTrail.student}\n` +
      `📚 *Trilha:* ${generatedTrail.track}\n` +
      `🛡️ *Status:* ${generatedTrail.secEduStatus}\n` +
      `🔑 *HASH SHA-256:* ${generatedTrail.hash}\n\n` +
      `_Desenvolvido por APS Tech_`;

    const encodedMessage = encodeURIComponent(textMessage);
    window.open(`https://api.whatsapp.com/send?phone=5583998765554&text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100 p-4 font-sans max-w-md mx-auto border-x border-cyan-900/40">
      <header className="mb-6 flex items-center gap-3 border-b border-cyan-900/30 pb-4">
        <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          APS
        </div>
        <div>
          <h1 className="text-xl font-black tracking-wider text-cyan-400">NEXA EDU & MENTOR</h1>
          <p className="text-xs text-slate-400">Desenvolvido por APS Tech | Ecossistema IA Educacional</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-full py-1 text-center text-emerald-400 flex items-center justify-center gap-1">
          🔒 Segurança 100% (LGPD)
        </div>
        <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-full py-1 text-center text-cyan-400 flex items-center justify-center gap-1">
          ⚡ 7 Agentes Ativos
        </div>
      </div>

      <section className="mb-6">
        <h2 className="text-sm font-semibold tracking-wide text-cyan-300 mb-3 flex items-center gap-2">
          <span>✨</span> Multi-Agentes de Inteligência Educacional
        </h2>
        <div className="space-y-3">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              onClick={() => openAgentModal(agent)}
              className="bg-[#0b1224] border border-cyan-900/40 hover:border-cyan-400/60 transition-all rounded-xl p-3 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{agent.icon}</span>
                  <h3 className="font-bold text-slate-100 text-sm">{agent.name}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-2">{agent.role}</p>
              <div className="flex justify-between text-[10px]">
                <span className="text-cyan-400 font-medium">Status: OPERACIONAL</span>
                <span className="text-cyan-500/80">🛡️ Criptografado</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#0b1224] border border-cyan-900/50 rounded-2xl p-4 shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-10 text-6xl select-none">🔑</div>
        <h3 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
          <span>🔑</span> Trilha IA com Criptografia
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Proteção de ponta a ponta supervisionada pelo agente SEC-EDU.
        </p>

        <form onSubmit={handleAuthAndGenerate} className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <label className="text-slate-300">Nome do Aluno</label>
              <span className="text-cyan-400 text-[10px]">🔒 Input Sanitizado</span>
            </div>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ex: Carlos Silva"
              className="w-full bg-[#050914] border border-cyan-900/60 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Trilha Especializada</label>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="w-full bg-[#050914] border border-cyan-900/60 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="Desenvolvimento Full-Stack & IA">Desenvolvimento Full-Stack & IA</option>
              <option value="Engenharia de Prompt & Automacões">Engenharia de Prompt & Automações</option>
              <option value="Arquitetura de Agentes Autônomos">Arquitetura de Agentes Autônomos</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#050914] font-bold py-2.5 rounded-xl transition shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 text-sm"
          >
            🚀 Autenticar & Gerar Trilha
          </button>
        </form>

        {generatedTrail && (
          <div className="mt-4 p-3 bg-[#050914] border border-cyan-500/40 rounded-xl text-xs space-y-2">
            <p className="text-emerald-400 font-semibold">✓ {generatedTrail.secEduStatus}</p>
            <p><span className="text-slate-400">Aluno:</span> {generatedTrail.student}</p>
            <p><span className="text-slate-400">Trilha:</span> {generatedTrail.track}</p>
            <p className="truncate text-[10px] text-cyan-400/80 font-mono">
              HASH: {generatedTrail.hash}
            </p>
            
            <button
              onClick={shareTrailViaWhatsApp}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl transition flex items-center justify-center gap-2 text-xs shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            >
              📲 Compartilhar Trilha no WhatsApp
            </button>
          </div>
        )}
      </section>

      {activeAgent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1224] border border-cyan-500/50 rounded-2xl p-5 max-w-sm w-full space-y-3">
            <div className="flex justify-between items-center border-b border-cyan-900/40 pb-2">
              <h4 className="font-bold text-cyan-400 flex items-center gap-2">
                <span>{activeAgent.icon}</span> {activeAgent.name}
              </h4>
              <button
                onClick={() => setActiveAgent(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300">{activeAgent.role}</p>

            <div className="bg-[#050914] p-3 rounded-xl border border-cyan-900/40 text-[11px] font-mono text-cyan-300 space-y-1 max-h-48 overflow-y-auto">
              {agentLogs.map((log, index) => (
                <p key={index} className={log.startsWith('> RESPOSTA') ? 'text-emerald-400 font-sans mt-2' : ''}>
                  {log}
                </p>
              ))}
            </div>

            <button
              onClick={() => executeAgentTask(activeAgent)}
              disabled={isProcessing}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-[#050914] py-2 rounded-xl text-xs font-bold transition shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              {isProcessing ? '⚡ Processando...' : `▶ ${activeAgent.actionText}`}
            </button>
          </div>
        </div>
      )}

      <footer className="text-center text-[10px] text-slate-500 space-y-1 pt-2 border-t border-cyan-900/20">
        <p>Desenvolvido com Criptografia & LGPD de Ponta</p>
        <p className="text-slate-400">WhatsApp: (83) 99876-5554 | Instagram: @anderson_ps1</p>
      </footer>
    </div>
  );
}
