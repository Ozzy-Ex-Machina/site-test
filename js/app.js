// Controlador Principal da Aplicação Integrado ao Supabase

const App = {
  currentRoute: 'inicio',
  
  init: async () => {
    // Adiciona listener nos itens do menu principal
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const routeId = e.currentTarget.getAttribute('data-route');
        App.navigateTo(routeId);
      });
    });

    // Puxa os dados iniciais do banco
    await fetchDataFromSupabase();
    App.navigateTo('inicio');
  },

  navigateTo: async (routeId) => {
    const appView = document.getElementById('app-view');
    App.currentRoute = routeId;

    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-route') === routeId) {
        item.classList.add('active');
      }
    });

    appView.innerHTML = '<div style="padding: 20px; color: #aaa;">Carregando dados da nuvem...</div>';

    // Atualiza os dados do banco toda vez que muda de aba para garantir sincronia
    await fetchDataFromSupabase();

    // Renderiza a view
    switch (routeId) {
      case 'inicio': appView.innerHTML = Components.viewInicio(); break;
      case 'filiados': appView.innerHTML = Components.viewFiliados(); break;
      case 'financas': appView.innerHTML = Components.viewFinancas(); break;
      case 'atividades': appView.innerHTML = Components.viewAtividades(); break;
      case 'nucleos': appView.innerHTML = Components.viewGenerica('🏘 Gestão de Núcleos', 'Área de administração dos núcleos regionais.'); break;
      case 'comunicacao': appView.innerHTML = Components.viewGenerica('📣 Comunicação e Imprensa', 'Registro de materiais distribuídos e postagens.'); break;
      case 'formacao': appView.innerHTML = Components.viewGenerica('📚 Formação Política', 'Acompanhamento dos ciclos de estudos marxistas.'); break;
      case 'perfis': appView.innerHTML = Components.viewGenerica('🪪 Perfis Militantes', 'Fichas detalhadas dos quadros da organização.'); break;
      case 'relatorios': appView.innerHTML = Components.viewGenerica('📊 Relatórios Gerenciais', 'Exportação de dados e consolidados estatísticos.'); break;
      default: appView.innerHTML = Components.viewInicio();
    }
  },

  // ---- Modal ----
  openModal: (type) => {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    if (type === 'filiado') modalContent.innerHTML = Components.modalFiliado();
    if (type === 'financa') modalContent.innerHTML = Components.modalFinanca();
    if (type === 'atividade') modalContent.innerHTML = Components.modalAtividade();
    modalOverlay.classList.add('active');
  },

  closeModal: () => {
    document.getElementById('modal-overlay').classList.remove('active');
  },

  // ---- CRUD Supabase ----
  saveFiliado: async () => {
    if(isSimulated) { alert("Configure o Supabase primeiro no auth.js!"); return; }
    
    const nome = document.getElementById('fil_nome').value;
    const municipio = document.getElementById('fil_mun').value;
    const ocupacao = document.getElementById('fil_ocu').value;
    const status = document.getElementById('fil_status').value;

    if (!nome || !municipio || !ocupacao) { alert("Preencha todos os campos."); return; }

    const dataFormatada = new Date().toLocaleDateString('pt-BR');
    
    // Inserir no Supabase (coluna ID é auto-gerada)
    const { error } = await supabase.from('filiados').insert([{
      nome: nome, municipio: municipio, ocupacao: ocupacao, status: status, entrada: dataFormatada
    }]);

    if (error) alert("Erro ao salvar no banco: " + error.message);
    else { App.closeModal(); App.navigateTo('filiados'); }
  },

  deleteFiliado: async (id) => {
    if(isSimulated) return;
    if(confirm('Remover do banco de dados?')) {
      await supabase.from('filiados').delete().eq('id', id);
      App.navigateTo('filiados');
    }
  },

  saveFinanca: async () => {
    if(isSimulated) return;
    const label = document.getElementById('fin_desc').value;
    const valInput = parseFloat(document.getElementById('fin_val').value);
    const tipo = document.getElementById('fin_tipo').value;

    if (!label || isNaN(valInput)) { alert("Preencha descrição e valor."); return; }
    const isPositive = (tipo === 'Receita');
    const valueStr = (isPositive ? 'R$ ' : '-R$ ') + valInput.toFixed(2).replace('.', ',');

    const { error } = await supabase.from('finanças').insert([{ label, value: valueStr, isPositive }]);
    if (error) alert("Erro: " + error.message);
    else { App.closeModal(); App.navigateTo('financas'); }
  },

  deleteFinanca: async (id) => {
    if(isSimulated) return;
    if(confirm('Excluir este registro financeiro?')) {
      await supabase.from('finanças').delete().eq('id', id);
      App.navigateTo('financas');
    }
  },

  saveAtividade: async () => {
    if(isSimulated) return;
    const day = document.getElementById('ati_dia').value;
    const month = document.getElementById('ati_mes').value;
    const title = document.getElementById('ati_tit').value;
    const sub = document.getElementById('ati_det').value;

    if (!day || !month || !title) return;

    const { error } = await supabase.from('atividade').insert([{ day, month, title, sub }]);
    if (error) alert("Erro: " + error.message);
    else { App.closeModal(); App.navigateTo('atividades'); }
  },

  deleteAtividade: async (id) => {
    if(isSimulated) return;
    if(confirm('Cancelar atividade no banco?')) {
      await supabase.from('atividade').delete().eq('id', id);
      App.navigateTo('atividades');
    }
  }
};

// Iniciar apenas se já estivermos no index.html e após checar auth
document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('app-view')) {
    App.init();
  }
});
