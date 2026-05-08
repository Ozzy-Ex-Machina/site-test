// js/auth.js - Configuração do Supabase e Lógica de Autenticação

// ATENÇÃO ADMINISTRADOR: 
// Substitua estas variáveis pelas credenciais do seu projeto Supabase quando for colocar em produção.
const SUPABASE_URL = 'https://bzrbhxwrmpppgtxqqbpl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cmJoeHdybXBwcGd0eHFxYnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNTA2NDIsImV4cCI6MjA5MzgyNjY0Mn0.UDv4uoyw1b4OOF4g_JA5CfR55_X0aeTQXui2MUNR5ow';

let supabase = null;
let isSimulated = true; // Por padrão, inicia em modo simulado para não quebrar o site

// Tenta inicializar o Supabase se a chave foi trocada
try {
  if (SUPABASE_URL !== 'SUA_SUPABASE_URL_AQUI' && typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    isSimulated = false;
  }
} catch(err) {
  console.error("Supabase Init Error:", err);
  isSimulated = true;
}

const btnSubmit = document.getElementById('btnSubmit');
if (btnSubmit) {
  btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (!email || !password) {
      errorMsg.textContent = 'Preencha o e-mail e a senha.';
      errorMsg.style.display = 'block';
      return;
    }

    btnSubmit.textContent = 'Autenticando...';
    btnSubmit.disabled = true;
    errorMsg.style.display = 'none';

    try {
      if (isSimulated) {
        // Modo de Simulação (Enquanto não configuram o Supabase)
        setTimeout(() => {
          if (email === 'admin@pcbram.org' && password === 'admin123') {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
          } else {
            errorMsg.textContent = 'Modo Simulado: Use admin@pcbram.org e admin123';
            errorMsg.style.display = 'block';
            btnSubmit.textContent = 'Autenticar Sistema';
            btnSubmit.disabled = false;
          }
        }, 1000);
      } else {
        // Modo Produção Real com Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          errorMsg.textContent = "Erro: " + error.message;
          errorMsg.style.display = 'block';
          btnSubmit.textContent = 'Autenticar Sistema';
          btnSubmit.disabled = false;
        } else {
          // Login bem sucedido
          window.location.href = 'index.html';
        }
      }
    } catch (err) {
      errorMsg.textContent = "Erro grave no navegador: " + err.message;
      errorMsg.style.display = 'block';
      btnSubmit.textContent = 'Autenticar Sistema';
      btnSubmit.disabled = false;
    }
  });
}

// Proteção de Rotas (Aplicado no index.html)
function checkAuth() {
  if (isSimulated) {
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.replace('login.html');
    } else {
      const overlay = document.getElementById('security-overlay');
      if (overlay) overlay.style.display = 'none';
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.style.display = 'block';
    }
  } else {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        window.location.replace('login.html');
      } else {
        const overlay = document.getElementById('security-overlay');
        if (overlay) overlay.style.display = 'none';
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.style.display = 'block';
      }
    }).catch((err) => {
      window.location.replace('login.html');
    });
  }
}

// Botão de Logout no Header
function setupLogout() {
  const headerDateSpan = document.getElementById('header-date');
  if (headerDateSpan && !document.getElementById('btnLogout')) {
    const logoutBtn = document.createElement('a');
    logoutBtn.id = 'btnLogout';
    logoutBtn.href = '#';
    logoutBtn.textContent = ' [ Sair do Sistema ]';
    logoutBtn.style.color = '#f1c40f';
    logoutBtn.style.textDecoration = 'none';
    logoutBtn.onclick = async (e) => {
      e.preventDefault();
      if (isSimulated) {
        sessionStorage.removeItem('isLoggedIn');
      } else {
        await supabase.auth.signOut();
      }
      window.location.href = 'login.html';
    };
    headerDateSpan.parentNode.appendChild(logoutBtn);
  }
}
