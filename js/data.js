// js/data.js - Lógica de Dados via Supabase

// Mantemos kpis e dados fixos para demonstração estrutural (Mock de gráficos)
const dashboardData = {
  kpis: {
    filiadosAtivos: { value: 0, delta: "+0 este mês", isUp: true, sub: "Calculado via Banco" },
    celulasAtivas: { value: 27, delta: "+3 novos núcleos", isUp: true, sub: "4 em implantação" },
    arrecadacao: { value: "R$0", delta: "Calculado via Banco", isUp: true, sub: "Meta: R$ 9.600" },
    atividades: { value: 0, delta: "Calculado via Banco", isUp: true, sub: "Agendadas" }
  },
  
  nucleosRegiao: [
    { label: "Manaus (Centro)", value: 9, percent: 90, color: "c0392b" },
    { label: "Manaus (Zona Leste)", value: 7, percent: 70, color: "c0392b" },
    { label: "Baixo Amazonas", value: 3, percent: 30, color: "27ae60" }
  ],
  
  alertas: [
    { type: "", icon: "🟢", msg: "Sistema conectado ao Banco de Dados na Nuvem" }
  ],
  
  municipios: [
    { nome: "Manaus", nucleo: "Célula Zona Centro", filiados: 198, evento: "05/Mai", formacao: "Em andamento", status: "ativo" }
  ],
  
  formacao: [
    { label: "Módulo 1 – Fundamentos", percent: 87, color: "c0392b" }
  ],

  comunicacao: { posts: 24, boletins: 1200, panfletos: 3500, materias: 6, reunioes: 3 },

  // Listas vazias que serão preenchidas pelo Supabase
  filiadosList: [],
  financasResumo: [],
  agenda: []
};

// Funções para carregar dados do Supabase
async function fetchDataFromSupabase() {
  if (!supabase) return;

  try {
    // 1. Puxar Filiados
    const { data: filiados, error: errFil } = await supabase.from('filiados').select('*').order('id', { ascending: true });
    if (!errFil && filiados) dashboardData.filiadosList = filiados;

    // 2. Puxar Finanças (Atenção ao nome da tabela com cedilha que você criou)
    const { data: financas, error: errFin } = await supabase.from('finanças').select('*').order('id', { ascending: true });
    if (!errFin && financas) dashboardData.financasResumo = financas;

    // 3. Puxar Atividades
    const { data: atividades, error: errAti } = await supabase.from('atividade').select('*').order('id', { ascending: true });
    if (!errAti && atividades) dashboardData.agenda = atividades;

    // Atualizar KPIs dinamicamente com base no banco
    dashboardData.kpis.filiadosAtivos.value = dashboardData.filiadosList.filter(f => f.status === 'Ativo').length;
    
    let totalReceitas = 0;
    dashboardData.financasResumo.forEach(f => {
      // Extrair apenas o valor numérico do "R$ 100.00"
      let valNum = parseFloat(f.value.replace(/[^0-9,-]+/g,"").replace(',', '.'));
      if(f.isPositive && !isNaN(valNum)) totalReceitas += valNum;
    });
    dashboardData.kpis.arrecadacao.value = "R$ " + totalReceitas.toFixed(2).replace('.', ',');
    
    dashboardData.kpis.atividades.value = dashboardData.agenda.length;

  } catch (error) {
    console.error("Erro ao puxar dados do Supabase:", error);
  }
}
