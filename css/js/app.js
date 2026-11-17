// ISI DENGAN DATA PROYEK SUPABASE ANDA (Project Settings > API)
const SUPABASE_URL = 'https://otnbufzyjoizdjsheztt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_q6f7MaICu-7VtuEQnj3vBg_4DrDxj4E';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const rp = n => 'Rp ' + Number(n).toLocaleString('id-ID');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function me() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return null;
  const { data } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
  return { ...session.user, ...data };
}
async function guard(role) {
  const u = await me();
  if (!u) return location.replace('login.html');
  if (role && u.role !== role) return location.replace('index.html');
  return u;
}
function nav(u, on) {
  const l = (h, t, k) => `<a href="${h}" class="${on === k ? 'on' : ''}">${t}</a>`;
  document.getElementById('nav').innerHTML = `<b><a href="index.html">Toko Seluler</a></b><div>` +
    l('index.html', 'Toko', 's') + (u ? l('orders.html', 'Pesanan', 'o') : '') +
    (u?.role === 'admin' ? l('admin.html', 'Admin', 'a') : '') +
    (u ? `<a href="#" id="out">Keluar</a>` : l('login.html', 'Masuk', 'l')) + `</div>`;
  document.getElementById('out')?.addEventListener('click', async e => { e.preventDefault(); await sb.auth.signOut(); location.href = 'login.html'; });
}
