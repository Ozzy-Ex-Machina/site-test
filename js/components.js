// Componentes e Views que espelham o design original do Dashboard HTML

const Components = {
  viewInicio: () => {
    return `
      <div class="date-bar">
        <span>🗓 Semana de referência: 05–09 Mai 2026 &nbsp;|&nbsp; Responsável: Secretaria Regional – AM</span>
        <div class="badge">▲ SITUAÇÃO OPERACIONAL: NORMAL</div>
      </div>

      <!-- KPIs -->
      <div class="kpi-grid">
        <div class="kpi">
          <div class="kpi-label">Filiados Ativos</div>
          <div class="kpi-value" id="kpi-filiados">${dashboardData.filiadosList.filter(f => f.status === 'Ativo').length || dashboardData.kpis.filiadosAtivos.value}</div>
          <div class="kpi-delta up">▲ ${dashboardData.kpis.filiadosAtivos.delta}</div>
          <div class="kpi-sub">${dashboardData.kpis.filiadosAtivos.sub}</div>
        </div>
        <div class="kpi green">
          <div class="kpi-label">Células/Núcleos Ativos</div>
          <div class="kpi-value">${dashboardData.kpis.celulasAtivas.value}</div>
          <div class="kpi-delta up">▲ ${dashboardData.kpis.celulasAtivas.delta}</div>
          <div class="kpi-sub">${dashboardData.kpis.celulasAtivas.sub}</div>
        </div>
        <div class="kpi yellow">
          <div class="kpi-label">Arrecadação Mensal</div>
          <div class="kpi-value">${dashboardData.kpis.arrecadacao.value}</div>
          <div class="kpi-delta up">▲ ${dashboardData.kpis.arrecadacao.delta}</div>
          <div class="kpi-sub">${dashboardData.kpis.arrecadacao.sub}</div>
        </div>
        <div class="kpi blue">
          <div class="kpi-label">Atividades no Mês</div>
          <div class="kpi-value">${dashboardData.agenda.length}</div>
          <div class="kpi-delta up">▲ 3 realizadas esta semana</div>
          <div class="kpi-sub">${dashboardData.kpis.atividades.sub}</div>
        </div>
      </div>

      <!-- Linha 2 -->
      <div class="grid-2">
        <div class="panel">
          <div class="section-title">📍 Núcleos por Região do Amazonas</div>
          ${dashboardData.nucleosRegiao.map(n => `
            <div class="bar-row"><div class="bar-label">${n.label}</div><div class="bar-bg"><div class="bar-fill" style="width:${n.percent}%; background:#${n.color}"></div></div><div class="bar-val">${n.value}</div></div>
          `).join('')}
        </div>
        <div class="panel">
          <div class="section-title">💰 Resumo Financeiro – Mai/2026</div>
          ${dashboardData.financasResumo.map(f => `
            <div class="finance-row"><div class="fl">${f.label}</div><div class="fv ${f.isPositive ? 'pos' : 'neg'}">${f.value}</div></div>
          `).join('')}
          <div style="margin-top:6px" class="finance-row"><div class="fl" style="font-weight:700;color:#fff">SALDO DISPONÍVEL</div><div class="fv pos" style="font-size:13px">R$ 4.170</div></div>
        </div>
      </div>

      <!-- Linha 3 -->
      <div class="grid-3">
        <div class="panel">
          <div class="section-title">👥 Perfil dos Filiados</div>
          <div class="mini-donut">
            <svg class="donut-svg" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#c0392b" stroke-width="14" stroke-dasharray="85 109" stroke-dashoffset="0"/>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#27ae60" stroke-width="14" stroke-dasharray="45 149" stroke-dashoffset="-85"/>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#f1c40f" stroke-width="14" stroke-dasharray="30 164" stroke-dashoffset="-130"/>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#2980b9" stroke-width="14" stroke-dasharray="29 165" stroke-dashoffset="-160"/>
              <text x="40" y="44" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">${dashboardData.filiadosList.length}</text>
            </svg>
            <div class="donut-legend">
              <div><div class="dot" style="background:#c0392b"></div>Trabalhadores: 45%</div>
              <div><div class="dot" style="background:#27ae60"></div>Estudantes: 26%</div>
              <div><div class="dot" style="background:#f1c40f"></div>Camponeses: 18%</div>
              <div><div class="dot" style="background:#2980b9"></div>Outros: 11%</div>
            </div>
          </div>
          <div style="margin-top:8px">
            <div class="progress-box"><div class="progress-label"><span>Mulheres</span><span>38%</span></div><div class="progress-bg"><div class="progress-fill" style="width:38%;background:#e91e8c"></div></div></div>
            <div class="progress-box"><div class="progress-label"><span>Jovens (até 30)</span><span>52%</span></div><div class="progress-bg"><div class="progress-fill" style="width:52%;background:#f1c40f"></div></div></div>
            <div class="progress-box"><div class="progress-label"><span>Indígenas / Ribeirinhos</span><span>14%</span></div><div class="progress-bg"><div class="progress-fill" style="width:14%;background:#27ae60"></div></div></div>
          </div>
        </div>

        <div class="panel">
          <div class="section-title">📅 Próximas Atividades</div>
          ${dashboardData.agenda.map(a => `
            <div class="agenda-item">
              <div class="agenda-date"><div class="day">${a.day}</div><div class="month">${a.month}</div></div>
              <div class="agenda-info"><div class="title">${a.title}</div><div class="sub">${a.sub}</div></div>
            </div>
          `).join('')}
        </div>

        <div class="panel">
          <div class="section-title">⚠ Alertas e Pendências</div>
          ${dashboardData.alertas.map(a => `
            <div class="alert-box ${a.type}"><div class="icon">${a.icon}</div><div class="msg">${a.msg}</div></div>
          `).join('')}
        </div>
      </div>

      <!-- Tabela de Municípios -->
      <div class="panel" style="margin-bottom:14px">
        <div class="section-title">🗺 Situação por Município – Principais Pólos</div>
        <table class="table">
          <tr><th>Município</th><th>Núcleo</th><th>Filiados</th><th>Último Evento</th><th>Formação</th><th>Status</th></tr>
          ${dashboardData.municipios.map(m => `
            <tr><td>${m.nome}</td><td>${m.nucleo}</td><td>${m.filiados}</td><td>${m.evento}</td><td>${m.formacao}</td><td><span class="badge-status ${m.status}">${m.status.toUpperCase()}</span></td></tr>
          `).join('')}
        </table>
      </div>
    `;
  },

  viewFiliados: () => {
    return `
      <div class="panel" style="margin-bottom: 14px;">
        <div class="section-title">
          <span>👥 Lista de Filiados</span>
          <button class="btn" onclick="App.openModal('filiado')">+ Adicionar Filiado</button>
        </div>
        <table class="table">
          <tr><th>ID</th><th>Nome</th><th>Município</th><th>Ocupação</th><th>Data Entrada</th><th>Status</th><th>Ações</th></tr>
          ${dashboardData.filiadosList.map((f, i) => `
            <tr>
              <td>#${f.id}</td>
              <td style="font-weight:600; color:#fff">${f.nome}</td>
              <td>${f.municipio}</td>
              <td>${f.ocupacao}</td>
              <td>${f.entrada}</td>
              <td><span class="badge-status ${f.status === 'Ativo' ? 'ativo' : 'inativo'}">${f.status.toUpperCase()}</span></td>
              <td><button class="btn btn-small btn-danger" onclick="App.deleteFiliado(${f.id})">Excluir</button></td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;
  },

  viewFinancas: () => {
    return `
      <div class="panel" style="margin-bottom: 14px;">
        <div class="section-title">
          <span>💰 Controle de Finanças</span>
          <button class="btn" onclick="App.openModal('financa')">+ Novo Lançamento</button>
        </div>
        <table class="table">
          <tr><th>Categoria</th><th>Valor</th><th>Ações</th></tr>
          ${dashboardData.financasResumo.map(f => `
            <tr>
              <td>${f.label}</td>
              <td class="${f.isPositive ? 'pos' : 'neg'}" style="font-weight:600">${f.value}</td>
              <td><button class="btn btn-small btn-danger" onclick="App.deleteFinanca(${f.id})">Excluir</button></td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;
  },

  viewAtividades: () => {
    return `
      <div class="panel" style="margin-bottom: 14px;">
        <div class="section-title">
          <span>📅 Agenda de Atividades</span>
          <button class="btn" onclick="App.openModal('atividade')">+ Agendar Atividade</button>
        </div>
        <table class="table">
          <tr><th>Dia</th><th>Mês</th><th>Título</th><th>Detalhes</th><th>Ações</th></tr>
          ${dashboardData.agenda.map(a => `
            <tr>
              <td style="font-weight:700; color:#fff">${a.day}</td>
              <td>${a.month}</td>
              <td style="font-weight:600; color:#f1c40f">${a.title}</td>
              <td>${a.sub}</td>
              <td><button class="btn btn-small btn-danger" onclick="App.deleteAtividade(${a.id})">Excluir</button></td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;
  },

  viewGenerica: (title, desc) => {
    return `
      <div class="panel">
        <div class="section-title">${title}</div>
        <p style="font-size: 11px; color: #ccc; margin-top: 10px;">${desc}</p>
        <p style="font-size: 11px; color: #888; margin-top: 10px;">Em desenvolvimento. O painel Início, Filiados, Finanças e Atividades estão 100% funcionais para demonstração do CRUD.</p>
      </div>
    `;
  },

  // Modais Forms
  modalFiliado: () => {
    return `
      <div class="modal-header">
        <h3>Adicionar Novo Filiado</h3>
        <span class="modal-close" onclick="App.closeModal()">&times;</span>
      </div>
      <div class="modal-body">
        <form id="formFiliado">
          <div class="form-group"><label>Nome Completo</label><input type="text" id="fil_nome" class="form-control" required></div>
          <div class="form-group"><label>Município</label><input type="text" id="fil_mun" class="form-control" required></div>
          <div class="form-group"><label>Ocupação</label><input type="text" id="fil_ocu" class="form-control" required></div>
          <div class="form-group"><label>Status</label>
            <select id="fil_status" class="form-control">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" style="background:#555" onclick="App.closeModal()">Cancelar</button>
        <button class="btn" onclick="App.saveFiliado()">Salvar Registro</button>
      </div>
    `;
  },

  modalFinanca: () => {
    return `
      <div class="modal-header">
        <h3>Adicionar Movimentação Financeira</h3>
        <span class="modal-close" onclick="App.closeModal()">&times;</span>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group"><label>Descrição / Categoria</label><input type="text" id="fin_desc" class="form-control" placeholder="Ex: Mensalidades Novas" required></div>
          <div class="form-group"><label>Valor (R$)</label><input type="number" id="fin_val" class="form-control" placeholder="100.00" required></div>
          <div class="form-group"><label>Tipo de Movimentação</label>
            <select id="fin_tipo" class="form-control">
              <option value="Receita">Receita (Entrada)</option>
              <option value="Despesa">Despesa (Saída)</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" style="background:#555" onclick="App.closeModal()">Cancelar</button>
        <button class="btn" onclick="App.saveFinanca()">Salvar Registro</button>
      </div>
    `;
  },

  modalAtividade: () => {
    return `
      <div class="modal-header">
        <h3>Agendar Nova Atividade</h3>
        <span class="modal-close" onclick="App.closeModal()">&times;</span>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group"><label>Dia (Ex: 15)</label><input type="text" id="ati_dia" class="form-control" required></div>
          <div class="form-group"><label>Mês (Ex: Jun)</label><input type="text" id="ati_mes" class="form-control" required></div>
          <div class="form-group"><label>Título</label><input type="text" id="ati_tit" class="form-control" required></div>
          <div class="form-group"><label>Local/Detalhes</label><input type="text" id="ati_det" class="form-control" required></div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" style="background:#555" onclick="App.closeModal()">Cancelar</button>
        <button class="btn" onclick="App.saveAtividade()">Salvar Atividade</button>
      </div>
    `;
  }
};
