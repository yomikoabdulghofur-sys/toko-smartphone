// Konfigurasi Supabase (Project Settings > API)
const SUPABASE_URL = 'https://otnbufzyjoizdjsheztt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_q6f7MaICu-7VtuEQnj3vBg_4DrDxj4E';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const rp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

async function me() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
  return { ...session.user, ...(data || {}) };
}

async function guard(role) {
  const u = await me();
  if (!u) { location.replace('login.html'); return null; }
  if (role && u.role !== role) { location.replace('index.html'); return null; }
  return u;
}

function nav(u, on) {
  const l = (h, t, k) => '<a href="' + h + '" class="' + (on === k ? 'on' : '') + '">' + t + '</a>';
  let html = '<b><a href="index.html">Toko Seluler</a></b><div>';
  html += l('index.html', 'Toko', 's');
  if (u) html += l('orders.html', 'Pesanan', 'o');
  if (u && u.role === 'admin') html += l('admin.html', 'Admin', 'a');
  html += u ? '<a href="#" id="out">Keluar</a>' : l('login.html', 'Masuk', 'l');
  html += '</div>';
  document.getElementById('nav').innerHTML = html;

  const out = document.getElementById('out');
  if (out) {
    out.addEventListener('click', async (e) => {
      e.preventDefault();
      await sb.auth.signOut();
      location.href = 'login.html';
    });
  }
}
