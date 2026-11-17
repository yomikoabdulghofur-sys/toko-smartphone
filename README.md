# Toko Seluler – setup 3 langkah
1. Supabase: buat proyek, buka SQL Editor, jalankan `supabase/schema.sql`. Isi `js/app.js` dengan Project URL dan anon key (Settings > API).
2. Daftar di situs, lalu jalankan baris `update profiles set role='admin' ...` di SQL Editor (ada di akhir schema.sql).
3. GitHub: upload semua isi folder ke repo, Settings > Pages > Deploy from branch `main` / root. Di Supabase: Authentication > URL Configuration, isi Site URL dengan alamat GitHub Pages Anda.
Keamanan: kata sandi di-hash oleh Supabase Auth; akses data dijaga Row Level Security. Anon key memang publik, jangan pernah memakai service_role key di front end.
