import React, { useState, useEffect, useRef } from "react";

// ---------- Data ----------
const PROGRAMS = [
  { no: "01", cat: "Kesehatan", title: "Optimalisasi Posyandu",
    desc: "Pemeriksaan kesehatan gratis bagi lansia meliputi pengukuran tekanan darah, gula darah, berat badan, tinggi badan, dan pemeriksaan dasar."},
  { no: "02", cat: "Lingkungan", title: "Pengendalian Hama Tanaman",
    desc: "Pengajuan bantuan dan penyerahan obat pengendali hama untuk penanganan tanaman di greenhouse agar produktivitas tanaman tetap terjaga."},
  { no: "03", cat: "Ekonomi", title: "Pengadaan Bibit Tanaman Pangan",
    desc: "Pengajuan bantuan bibit tanaman kepada Dinas Pertanian serta penanaman bibit pada lahan yang tersedia sebagai upaya mendukung program Kampung ProKlim dan ketahanan pangan."},
  { no: "04", cat: "Edukasi", title: "Pendampingan Belajar Mengaji dan Bimbingan Belajar",
    desc: "Membantu proses pembelajaran Al-Quran, pendidikan karakter, serta kegiatan keagamaan bagi anak-anak."},
  { no: "05", cat: "Informasi", title: "Pembuatan Peta Wilayah",
    desc: "Menyediakan peta administrasi dan potensi wilayah (batas administratif, sebaran fasilitas publik, dan pusat ekonomi) sebagai basis data perencanaan pembangunan kelurahan."}
];

const TEAM = [
  { role: "Ketua", name: "Muhammad Naufal Rohid", fac: "Fakultas Ilmu Keperawatan", nim: "30902300262", photo: "/naufal.png" },
  { role: "Sekretaris", name: "Mutia Kamila", fac: "Fakultas Kedokteran Gigi", nim: "31102300056", photo: "/mutia.png" },
  { role: "Bendahara", name: "Prischa Puspita Aureliana", fac: "Fakultas Ilmu Keperawatan", nim: "30902300142", photo: "/prischa.png" },
  { role: "Divisi Acara", name: "Shafa Amelia Widiasputri", fac: "Fakultas Ekonomi dan Bisnis", nim: "31402300069", photo: "/shafa.png" },
  { role: "Divisi Acara", name: "Muhammad Raffie Arrasyid", fac: "Fakultas Kedokteran", nim: "30102300030", photo: "/raffie.png" },
  { role: "Divisi Humas", name: "Berliana Nur Afifah", fac: "Fakultas Farmasi", nim: "33102300101", photo: "/berliana.png" },
  { role: "Divisi PDD", name: "Aditya Amelia", fac: "Fakultas Ekonomi dan Bisnis", nim: "30402300041", photo: "/amel.png" },
  { role: "Divisi PDD", name: "Rifda Safa Argyanti", fac: "Fakultas Kedokteran", nim: "30102300106", photo: "/rifda.png" },
  { role: "Divisi Perlengkapan", name: "Ilham Rizqi Akbar", fac: "Fakultas Teknik", nim: "30202300119", photo: "/ilham.png" },
  { role: "Divisi Perlengkapan", name: "Muhammad Faizin", fac: "Fakultas Teknologi Industri", nim: "32602300094", photo: "/faizin.png" }
];

const DPL_PHOTO_SRC = "/dpl.png";

const LOCATION_IMAGE = {src: "/peta.png", title: "", caption: ""};

// ---------- Data Galeri Kegiatan KKN (17 Hari) ----------
// Isi array photos dengan 1 - 3 URL foto untuk masing-masing hari
const GALLERY_DAYS = [
  {
    day: 1,
    date: "28 Juli 2026",
    title: "Kegiatan Hari ke-1",
    photos: [
      { id: 1, src: "/galeri/day1-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA mengikuti Pembukaan di Kecamatan Pedurungan serta Kelurahan Tlogosari Wetan" },
      { id: 2, src: "/galeri/day1-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan kegiatan mengajar TPQ dan bimbingan belajar." },
      { id: 3, src: "/galeri/day1-3.png", caption: "Kelompok 105 KKN tematik UNISSULA melakukan silaturahmi ke RT 3 dan RT 10." }
    ]
  },
  {
    day: 2,
    date: "29 Juli 2026",
    title: "Kegiatan Hari ke-2",
    photos: [
      { id: 1, src: "/galeri/day2-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan survei bibit tanaman sebagai persiapan program penghijauan di Kelurahan Tlogosari Wetan" },
      { id: 2, src: "/galeri/day2-2.png", caption: "Saat Kelompok 105 KKN Tematik UNISSULA melakukan kegiatan mengajar di TPQ dan Bimbingan Belajar." },
      { id: 3, src: "/galeri/day2-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA berkoordinasi bersama Kelompok 9 dan Kelompok 73 dalam membahas penyusunan peta wilayah serta sinkronisasi data hasil observasi lapangan." }
    ]
  },
  {
    day: 3,
    date: "30 Juli 2026",
    title: "Kegiatan Hari ke-3",
    photos: [
      { id: 1, src: "/galeri/day3-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan kunjungan ke RT 10 untuk bersilaturahmi, berkoordinasi dengan Ketua RT, serta mengidentifikasi kondisi lingkungan sebagai dasar penyusunan program kerja." },
      { id: 2, src: "/galeri/day3-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan kegiatan mengajar di TPQ dan Bimbingan Belajar." },
      { id: 3, src: "/galeri/day3-3.png", caption: "" }
    ]
  },
  {
    day: 4,
    date: "31 Juli 2026",
    title: "Kegiatan Hari ke-4",
    photos: [
      { id: 1, src: "/galeri/day4-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan kegiatan PJN (Pemantauan Jentik Nyamuk) bersama Ibu-Ibu RW 01 dan melakukan koordinasi untuk mempersiapkan lomba ibu-ibu." },
      { id: 2, src: "/galeri/day4-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA membantu dalam pendistribusian MBG." },
      { id: 3, src: "/galeri/day4-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA mempersiapkan alat alat untuk lomba  ibu-ibu." }
    ]
  },
  {
    day: 5,
    date: "1 Agustus 2026",
    title: "Kegiatan Hari ke-5",
    photos: [
      { id: 1, src: "/galeri/day5-1.png", caption: "SKelompok 105 KKN Tematik UNISSULA melakukan kerja bakti membersihkan green house dan mempersiapkan media tanam untuk menanam tanaman." },
      { id: 2, src: "/galeri/day5-2.jpg", caption: "Kelompok 105 KKN Tematik UNISSULA berpartisipasi dalam pelaksanaan lomba ibu-ibu RT 10 dalam rangka memeriahkan peringatan Hari Kemerdekaan Republik Indonesia." },
      { id: 3, src: "/galeri/day5-3.png", caption: "" }
    ]
  },
  {
    day: 6,
    date: "2 Agustus 2026",
    title: "Kegiatan Hari ke-6",
    photos: [
      { id: 1, src: "/galeri/day6-1.jpg", caption: "Kelompok 105 KKN Tematik UNISSULA berpartisipasi dalam pelaksanaan lomba anak-anak RT 10." },
      { id: 2, src: "/galeri/day6-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA menghadiri kegiatan PKK RW sebagai bentuk silaturahmi dan dukungan terhadap kegiatan pemberdayaan masyarakat." },
      { id: 3, src: "/galeri/day6-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA turut membantu pelaksanaan lomba ibu-ibu tingkat RW." }
    ]
  },
  {
    day: 7,
    date: "3 Agustus 2026",
    title: "Kegiatan Hari ke-7",
    photos: [
      { id: 1, src: "/galeri/day7-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan kunjungan ke Dinas Pertanian untuk berkoordinasi terkait kebutuhan bibit tanaman dalam mendukung program penghijauan." },
      { id: 2, src: "/galeri/day7-2.jpg", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan kunjungan dan koordinasi dengan Ketua RT 2 guna mengidentifikasi kondisi lingkungan serta kebutuhan masyarakat." },
      { id: 3, src: "/galeri/day7-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan mengajar di TPQ sebagai bentuk pengabdian kepada masyarakat melalui pendampingan pembelajaran agama." }
    ]
  },
  {
    day: 8,
    date: "4 Agustus 2026",
    title: "Kegiatan Hari ke-8",
    photos: [
      { id: 1, src: "/galeri/day8-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan penanaman benih di greenhouse." },
      { id: 2, src: "/galeri/day8-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan piket dalam membantu administrasi Kelurahan Tlogosari Wetan." },
      { id: 3, src: "/galeri/day8-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan mengajar di TPQ sebagai bentuk pengabdian dan pendampingan pembelajaran." }
    ]
  },
  {
    day: 9,
    date: "5 Agustus 2026",
    title: "Kegiatan Hari ke-9",
    photos: [
      { id: 1, src: "/galeri/day9-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan kerja bakti di greenhouse." },
      { id: 2, src: "/galeri/day9-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan piket dalam membantu administrasi Kelurahan Tlogosari Wetan." },
      { id: 3, src: "/galeri/day9-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan mengajar di TPQ sebagai bentuk pengabdian dan pendampingan pembelajaran." }
    ]
  },
  {
    day: 10,
    date: "6 Agustus 2026",
    title: "Kegiatan Hari ke-10",
    photos: [
      { id: 1, src: "/galeri/day10-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan mengajar di TPQ sebagai bentuk pengabdian dan pendampingan pembelajaran." },
      { id: 2, src: "/galeri/day10-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan piket dalam membantu administrasi Kelurahan Tlogosari Wetan." },
      { id: 3, src: "/galeri/day10-3.png", caption: "" }
    ]
  },
  {
    day: 11,
    date: "7 Agustus 2026",
    title: "Kegiatan Hari ke-11",
    photos: [
      { id: 1, src: "/galeri/day11-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan kegiatan bersih-bersih area TOGA Kelurahan untuk menjaga kebersihan dan kerapian lingkungan." },
      { id: 2, src: "/galeri/day11-2.jpg", caption: "Kelompok 105 KKN Tematik UNISSULA berpartisipasi dalam kegiatan lomba TOGA RW 1 sebagai bentuk dukungan terhadap kegiatan pemberdayaan dan pemanfaatan tanaman obat di lingkungan masyarakat." },
      { id: 3, src: "/galeri/day11-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan pencatatan dan inventarisasi seluruh tanaman yang terdapat di TOGA RT 8 sebagai bagian dari pendataan tanaman." }
    ]
  },
  {
    day: 12,
    date: "8 Agustus 2026",
    title: "Kegiatan Hari ke-12",
    photos: [
      { id: 1, src: "/galeri/day12-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA membantu pelaksanaan pelayanan Posyandu." },
      { id: 2, src: "/galeri/day12-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA membantu pelaksanaan pelayanan Poswindu." },
      { id: 3, src: "/galeri/day12-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA berpartisipasi dalam kegiatan lomba masak RW 1 sebagai bentuk dukungan dan kebersamaan bersama masyarakat." }
    ]
  },
  {
    day: 13,
    date: "9 Agustus 2026",
    title: "Kegiatan Hari ke-13",
    photos: [
      { id: 1, src: "/galeri/day13-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA mengikuti dan berpartisipasi dalam kegiatan perayaan HUT RI RW 1 bersama masyarakat sebagai bentuk kebersamaan dan pengabdian kepada masyarakat." },
      { id: 2, src: "/galeri/day13-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan koordinasi dalam pembuatan peta wilayah." },
      { id: 3, src: "/galeri/day13-3.png", caption: "" }
    ]
  },
  {
    day: 14,
    date: "10 Agustus 2026",
    title: "Kegiatan Hari ke-14",
    photos: [
      { id: 1, src: "/galeri/day14-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan pembelian bibit tanaman yang akan dibagikan kepada setiap RT." },
      { id: 2, src: "/galeri/day14-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA membagikan bibit tanaman kepada setiap RT." },
      { id: 3, src: "/galeri/day14-3.png", caption: "Kelompok 105 KKN Tematik UNISSULA melaksanakan hari terakhir pembelajaran TPQ dan les bersama." }
    ]
  },
  {
    day: 15,
    date: "11 Agustus 2026",
    title: "Kegiatan Hari ke-15",
    photos: [
      { id: 1, src: "/galeri/day15-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA bersama Kelompok 9 dan Kelompok 73 melaksanakan pembuatan dan penyusunan peta wilayah." },
      { id: 2, src: "/galeri/day15-2.png", caption: "" },
      { id: 3, src: "/galeri/day15-3.png", caption: "" }
    ]
  },
  {
    day: 16,
    date: "12 Agustus 2026",
    title: "Kegiatan Hari ke-16",
    photos: [
      { id: 1, src: "/galeri/day16-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA mengikuti kegiatan peresmian peta wilayah oleh Ibu Lurah Tlogosari Wetan." },
      { id: 2, src: "/galeri/day16-2.png", caption: "" },
      { id: 3, src: "/galeri/day16-3.png", caption: "" }
    ]
  },
  {
    day: 17,
    date: "13 Agustus 2026",
    title: "Kegiatan Hari ke-17",
    photos: [
      { id: 1, src: "/galeri/day17-1.png", caption: "Kelompok 105 KKN Tematik UNISSULA mengikuti kegiatan pelepasan KKN oleh pihak Kelurahan Tlogosari Wetan sebagai tanda berakhirnya rangkaian kegiatan KKN Tematik Periode XXII." },
      { id: 2, src: "/galeri/day17-2.png", caption: "Kelompok 105 KKN Tematik UNISSULA melakukan pamitan dengan Ibu RW sekaligus menyerahkan kenang-kenangan sebagai bentuk ucapan terima kasih atas dukungan dan kerja sama selama pelaksanaan KKN." },
      { id: 3, src: "/galeri/day17-3.png", caption: "" }
    ]
  },
];

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "program", label: "Program Kerja" },
  { id: "tim", label: "Anggota" },
  { id: "lokasi", label: "Lokasi" },
  { id: "galeri", label: "Galeri" }
];

// ---------- PENGATURAN ASSET / GAMBAR ----------
const LOGO_SRC = "/Logo_KKN.png";
const HERO_BG_SRC = "/bg_kkn.jpg";

function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("");
}

// ---------- Small reusable bits ----------
function Stamp({ children, gold, sm }) {
  return (
    <div className={`stamp${gold ? " gold" : ""}${sm ? " sm" : ""}`}>
      <span>{children}</span>
    </div>
  );
}

// ---------- Sub-komponen Card Slider per Hari ----------
function GalleryDayCard({ item }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prevPhoto = () => {
    setActiveIdx((prev) => (prev === 0 ? item.photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setActiveIdx((prev) => (prev === item.photos.length - 1 ? 0 : prev + 1));
  };

  const currentPhoto = item.photos[activeIdx];

  return (
    <div className="day-card">
      <div className="day-card-header">
        <div className="day-badge">HARI {item.day}</div>
        <div className="day-date">🗓️ {item.date}</div>
      </div>

      {/* CONTAINER SINGLE FOTO DENGAN NAVIGASI GESER */}
      <div className="slider-container">
        <button className="slider-btn prev" onClick={prevPhoto} aria-label="Foto Sebelumnya">
          ‹
        </button>

        <div className="slider-photo-wrapper">
          <div className="slider-photo-slot">
            {currentPhoto.src ? (
              <img src={currentPhoto.src} alt={`${item.title} - ${activeIdx + 1}`} />
            ) : (
              <div className="photo-placeholder">
                <span>📷 Foto {activeIdx + 1} / {item.photos.length}</span>
              </div>
            )}
          </div>
          <div className="slider-caption">
            <span>{currentPhoto.caption}</span>
            <span className="slider-counter">{activeIdx + 1} dari {item.photos.length}</span>
          </div>
        </div>

        <button className="slider-btn next" onClick={nextPhoto} aria-label="Foto Selanjutnya">
          ›
        </button>
      </div>

      {/* INDIKATOR TITIK (DOTS) */}
      <div className="slider-dots">
        {item.photos.map((_, idx) => (
          <button
            key={idx}
            className={`dot-btn ${idx === activeIdx ? "active" : ""}`}
            onClick={() => setActiveIdx(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");
  const sectionRefs = useRef({});
  const headerRef = useRef(null);
  const [headerH, setHeaderH] = useState(84);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderH(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && headerRef.current) ro.observe(headerRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      if (ro) ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      let current = NAV_ITEMS[0].id;
      NAV_ITEMS.forEach(({ id }) => {
        const el = sectionRefs.current[id];
        if (el && window.scrollY >= el.offsetTop - 96) current = id;
      });
      setActiveNav(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    const el = sectionRefs.current[id];
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <div className="kkn-root">
      <style>{CSS}</style>

      <header ref={headerRef} className={scrolled ? "scrolled" : ""}>
        <div className="wrap nav">
          <div className="brand">
            <div className="logo-slot">
              {!logoError ? (
                <img src={LOGO_SRC} alt="Logo KKN 105 Tlogosari Wetan" className="logo-img"
                     onError={() => setLogoError(true)} />
              ) : (
                <Stamp>105</Stamp>
              )}
            </div>
            <div className="brand-text">
              <div className="t1">KKN 105 <em>Tlogosari Wetan</em></div>
              <div className="t2">KKN Tematik XXII Unissula 2026</div>
            </div>
          </div>

          <nav className="links">
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`}
                 className={activeNav === item.id ? "active" : ""}
                 onClick={(e) => { e.preventDefault(); goTo(item.id); }}>
                {item.label}
              </a>
            ))}
          </nav>

          <button className="navtoggle mono" aria-label="Buka menu" aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? "TUTUP ✕" : "MENU ☰"}
          </button>
        </div>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV_ITEMS.map(item => (
            <a key={item.id} href={`#${item.id}`}
               className={activeNav === item.id ? "active" : ""}
               onClick={(e) => { e.preventDefault(); goTo(item.id); }}>
              {item.label}
            </a>
          ))}
        </div>
      </header>
      <div style={{ height: headerH }} aria-hidden="true" />

      {/* ===================== HERO / BERANDA ===================== */}
      <section 
        id="beranda" 
        ref={el => (sectionRefs.current.beranda = el)} 
        className="hero"
        style={HERO_BG_SRC ? { backgroundImage: `url(${HERO_BG_SRC})` } : {}}
      >
        <div className="hero-overlay" />

        <div className="wrap hero-content">
          <div className="hero-simple-title">
            <div>
              <h1>KKN Tematik UNISSULA</h1>
              <p style={{color: "#ffffff"}}>Menggali potensi dan memberdayakan masyarakat Kelurahan Tlogosari Wetan</p>
              <p style={{color: "#ffffff"}}>melalui pengabdian mahasiswa UNISSULA 2026</p>
            </div>
          </div>

          {/* ================= BARIS CONTAINER KARTU DI BAGIAN BAWAH HERO ================= */}
          <div className="hero-stat-cards">
            <div className="stat-card">
              <div className="card-num">10</div>
              <div className="card-lbl">Mahasiswa</div>
            </div>

            <div className="stat-card">
              <div className="card-num">5</div>
              <div className="card-lbl">Program Kerja</div>
            </div>

            <div className="stat-card">
              <div className="card-num">17 Hari</div>
              <div className="card-lbl">Pelaksanaan KKN</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROGRAM KERJA ===================== */}
      <section id="program" ref={el => (sectionRefs.current.program = el)} className="tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="badge" style={{ fontSize: 11, padding: "5px 10px", borderRadius: "7%", display: "inline-block", background: "#234A30",  }}><b>Program Kerja KKN Kelompok 105</b></span>
            <h2 style={{fontSize: 40}}>5 Program Kerja<br />KKN Tematik XXII Tlogosari Wetan</h2>
          </div>

          <div className="prog-grid">
            {PROGRAMS.map(p => (
              <div className="prog-card" key={p.no}>
                <div className="prog-top">
                  <Stamp sm>{p.no}</Stamp>
                  <span className="prog-tag">{p.cat}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ANGGOTA ===================== */}
      <section id="tim" ref={el => (sectionRefs.current.tim = el)}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge" style={{ fontSize: 11, padding: "5px 10px", borderRadius: "7%", display: "inline-block", background: "#234A30",  }}><b>Struktur Keanggotaan KKN</b></span>
            <h2 style={{fontSize: 40}}>Anggota KKN Kelompok 105</h2>
          </div>

          <div className="team-grid">
            {TEAM.map(m => (
              <div className="team-card" key={m.name}>
                <span className={`team-role${m.role === "Ketua" ? "" : " sec"}`}>{m.role}</span>
                
                {/* TEMPLATE FOTO ANGGOTA */}
                <div className="member-photo-slot">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="member-photo" />
                  ) : (
                    <Stamp sm>{initials(m.name)}</Stamp>
                  )}
                </div>

                <div className="nm">{m.name}</div>
                <div className="fac">{m.fac}</div>
                <div className="nim">NIM: {m.nim}</div>
              </div>
            ))}
          </div>

          {/* TEMPLATE DPL */}
          <div className="dpl-grid">
            <div className="dpl-card">
              <div className="dpl-photo">
                {DPL_PHOTO_SRC ? (
                  <img src={DPL_PHOTO_SRC} alt="Abdurrohim" />
                ) : (
                  <img src="https://placehold.co/140x140/DCE6D6/234A30?text=DPL" alt="Dr. Dedy Kurniadi" />
                )}
              </div>
              <div>
                <span className="badge" style={{ fontSize: 9.5, padding: "3px 10px", background: "#317a49" }}>Dosen Pembimbing Lapangan</span>
                <h3 style={{ fontSize: 19, marginTop: 20 }}>Abdurrohim, S.Psi., M.Si.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LOKASI ===================== */}
      <section id="lokasi" ref={el => (sectionRefs.current.lokasi = el)} className="tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="badge" style={{ fontSize: 11, padding: "5px 10px", borderRadius: "7%", display: "inline-block", background: "#234A30",  }}><b>Lokasi KKN</b></span>
            <h2>Kelurahan Tlogosari Wetan, Pedurungan<br />Kota Semarang, Jawa Tengah</h2>
          </div>

          <div className="loc">
            <div>
              <div className="map-frame" style={{ background: "#fff"}}>
                <iframe title="Peta Kelurahan Tlogosari Wetan"
                        src="https://maps.google.com/maps?q=Tlogosari%20Wetan%2C%20Pedurungan%2C%20Semarang&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        loading="lazy" />
              <a href="https://maps.google.com/?q=Tlogosari+Wetan,Pedurungan,Semarang" target="_blank" rel="noreferrer"
                 className="btn btn-primary maps-btn">Buka Google Maps →</a>
              </div>
            </div>
          </div>
          {/* TEMPLATE CONTAINER 1 GAMBAR LOKASI */}
          <div className="card-plain" style={{ background: "#fff", display: "flex", flexDirection: "column", marginTop: 27 }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17, marginBottom: 4 }}>
              Peta Administrasi KKN Tlogosari Wetan
            </h3>

            <div className="single-img-card">
              <div className="single-img-slot">
                {LOCATION_IMAGE.src ? (
                  <img src={LOCATION_IMAGE.src} alt={LOCATION_IMAGE.title} />
                ) : (
                  <div className="single-img-placeholder">
                    <span>📷 Tambahkan Gambar Lokasi Utama</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GALERI KEGIATAN ===================== */}
      <section id="galeri" ref={el => (sectionRefs.current.galeri = el)}>
        <div className="wrap">
          <div className="section-head">
            <span className="badge" style={{ fontSize: 11, padding: "5px 10px", borderRadius: "7%", display: "inline-block", background: "#234A30",  }}><b>Dokumentasi Lapangan</b></span>
            <h2 style={{fontSize: 40}}>Galeri Kegiatan</h2>
          </div>

          <div className="gallery-timeline">
            {GALLERY_DAYS.map((item) => (
              <GalleryDayCard item={item} key={item.day} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">
                <div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: 16 }}>
                    KKN 105 <em style={{ color: "#E7C77A", fontStyle: "italic" }}>Tlogosari Wetan</em>
                  </div>
                  <div className="mono" style={{ fontSize: 9.5, color: "#C9D6C3" }}>Unissula Semarang · 2026</div>
                </div>
              </div>
              <p className="desc">KKN Tematik XXII Universitas Islam Sultan Agung Kelompok 105. Mengabdi di Kelurahan Tlogosari Wetan, Pedurungan, Semarang. Berdedikasi untuk pembangunan berkelanjutan melalui pendidikan, kesehatan, dan lingkungan.</p>
              <div className="foot-btns">
                <span className="foot-pill">📷 IG: @kkn105.tlogosariwetan</span>
                <span className="foot-pill">🎵 TikTok: @kkntlogosariwetan_105</span>
              </div>
            </div>

            <div className="foot-col">
              <div className="flbl">Navigasi</div>
              {NAV_ITEMS.map(item => (
                <a key={item.id} href={`#${item.id}`} onClick={(e) => { e.preventDefault(); goTo(item.id); }}>
                  {item.id === "beranda" ? "Beranda"
                    : item.id === "program" ? "Program Kerja"
                    : item.id === "tim" ? "Anggota"
                    : item.id === "lokasi" ? "Lokasi"
                    : "Galeri"}
                </a>
              ))}
            </div>

            <div className="foot-col">
              <div className="foot-box">
                <span style={{ fontSize: 10, color: "#E7C77A", letterSpacing: ".05em" }}>Dosen Pembimbing Lapangan (DPL)</span>
                <b>Abdurrohim, S.Psi., M.Si.</b>
              </div>
              <div className="foot-box">
                <span style={{ fontSize: 10, color: "#E7C77A", letterSpacing: ".05em" }}>Penyelenggara Utama</span>
                <b>LPPM Universitas Islam Sultan Agung</b>
                <div className="sub2">Kota Semarang, Provinsi Jawa Tengah</div>
              </div>
            </div>
          </div>

          <div className="foot-bottom">
            <span>© 2026 KKN Tematik XXII UNISSULA Kelompok 105. Kelurahan Tlogosari Wetan, Pedurungan, Semarang.</span>
            <a href="#beranda" className="top-btn" onClick={(e) => { e.preventDefault(); goTo("beranda"); }}>↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

html, body, #root{ margin:0; padding:0; width:100%; }
.kkn-root{
  --paper: #FAF6EC; --paper-deep: #F2ECDA; --ink: #16301F;
  --pine: #234A30; --pine-deep: #16301F; --sage: #DCE6D6; --sage-line: #B9C9AF;
  --ochre: #B07C25; --ochre-deep: #8C6018; --khaki-line: #C7BC9C; --clay-red: #9C4B3A;
  background:var(--paper); color:var(--ink); font-family:'Inter',sans-serif;
  font-size:16px; line-height:1.55; overflow-x:hidden;
  width:100%; min-width:100%;
}
.kkn-root *{box-sizing:border-box;}
.kkn-root section, .kkn-root header, .kkn-root footer{width:100%;}
.kkn-root h1,.kkn-root h2,.kkn-root h3{font-family:'Fraunces',serif;font-weight:500;color:var(--pine-deep);margin:0;}
.kkn-root .mono{font-family:'IBM Plex Mono',monospace;letter-spacing:.04em;}
.kkn-root .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ochre-deep);font-weight:600;}
.kkn-root a{color:inherit;text-decoration:none;}
.kkn-root img{max-width:100%;display:block;}
.kkn-root .wrap{max-width:1180px;margin:0 auto;padding:0 20px;}
.kkn-root ::selection{background:var(--ochre);color:var(--paper);}

.kkn-root .stamp{position:relative;width:58px;height:58px;border-radius:50%;border:1.5px dashed var(--pine);display:flex;align-items:center;justify-content:center;flex-shrink:0;transform:rotate(-6deg);transition:width .25s ease, height .25s ease;}
.kkn-root .stamp::before{content:"";position:absolute;inset:5px;border-radius:50%;border:1px solid var(--pine);opacity:.55;}
.kkn-root .stamp span{font-family:'Fraunces',serif;font-weight:600;font-size:20px;color:var(--pine-deep);}
.kkn-root .stamp.gold{border-color:var(--ochre);}
.kkn-root .stamp.gold::before{border-color:var(--ochre);}
.kkn-root .stamp.gold span{color:var(--ochre-deep);}
.kkn-root .stamp.sm{width:40px;height:40px;}
.kkn-root .stamp.sm span{font-size:14px;}

header{position:fixed;top:0;left:0;right:0;width:100%;z-index:1000;background:rgba(250,246,236,0.92);backdrop-filter:blur(8px);border-bottom:1px solid;transition:background .25s ease, border-color .25s ease, box-shadow .25s ease;}
header.scrolled{background:rgba(250,246,236,0.98);border-bottom-color:var(--khaki-line);box-shadow:0 4px 14px rgba(22,48,31,0.08);}
.kkn-root .nav{display:flex;align-items:center;justify-content:space-between;padding:12px 0;gap:10px;transition:padding .25s ease;}
header.scrolled .nav{padding:8px 0;}
header.scrolled .stamp{width:44px;height:44px;}
header.scrolled .stamp span{font-size:15px;}
header.scrolled .logo-slot{width:38px;height:38px;}
header.scrolled .brand-text .t2{opacity:0;max-height:0;}
.kkn-root .brand{display:flex;align-items:center;gap:12px;min-width:0;}
.kkn-root .logo-slot{width:48px;height:48px;flex-shrink:0;transition:width .25s ease, height .25s ease;}
.kkn-root .logo-img{width:100%;height:100%;object-fit:contain;display:block;}
.kkn-root .brand-text .t1{font-family:'Fraunces',serif;font-weight:600;font-size:16px;color:var(--pine-deep);line-height:1.1;white-space:nowrap;}
.kkn-root .brand-text .t1 em{font-style:italic;color:var(--ochre-deep);}
.kkn-root .brand-text .t2{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;color:#6b7a6c;text-transform:uppercase;transition:opacity .2s ease;overflow:hidden;}
.kkn-root nav.links{display:flex;gap:22px;}
.kkn-root nav.links a{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);padding-bottom:4px;border-bottom:1px solid transparent;transition:.2s;}
.kkn-root nav.links a:hover, .kkn-root nav.links a.active{border-bottom-color:var(--ochre);color:var(--ochre-deep);}
.kkn-root .navtoggle{display:none;background:none;border:1px solid var(--khaki-line);border-radius:6px;padding:8px 12px;font-family:'IBM Plex Mono',monospace;font-size:11px;cursor:pointer;flex-shrink:0;}
.kkn-root .mobile-menu{display:none;flex-direction:column;background:var(--paper);border-bottom:1px solid var(--khaki-line);overflow-y:auto;max-height:0;transition:max-height .25s ease;box-shadow:0 8px 14px rgba(22,48,31,0.08);}
.kkn-root .mobile-menu.open{max-height:400px;}
.kkn-root .mobile-menu a{font-family:'IBM Plex Mono',monospace;font-size:13px;letter-spacing:.05em;text-transform:uppercase;padding:14px 20px;border-top:1px dashed var(--khaki-line);color:var(--ink);}
.kkn-root .mobile-menu a.active{color:var(--ochre-deep);background:var(--sage);}
.kkn-root section{padding:56px 0;}
.kkn-root section.tinted{background:var(--sage);}
.kkn-root .section-head{text-align:center;max-width:720px;margin:0 auto 36px;}
.kkn-root .section-head h2{font-size:30px;line-height:1.2;margin-top:10px;}
.kkn-root .section-head p{margin-top:12px;color:#5c6b5e;font-size:14.5px;}

/* ---------- HERO / BERANDA STYLES DENGAN DARK GLASS OVERLAY ---------- */
.kkn-root .hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px 0 0px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: var(--pine-deep);
}

.kkn-root .hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg, 
    rgba(22, 48, 31, 0.5) 0%, 
    rgba(16, 35, 23, 0.64) 60%, 
    rgba(12, 26, 17, 0.79) 100%
  );
  z-index: 1;
}

.kkn-root .hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(85vh - 60px);
}

.kkn-root .badges{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px;}
.kkn-root .badge{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border:1px solid var(--sage);color:var(--sage);padding:5px 12px;border-radius:20px;}
.kkn-root .hero-simple-title{text-align: center;padding: 60px 0 40px;}
.kkn-root .hero-simple-title h1{font-size:48px;line-height:1.2;font-weight:500;color:#FFFFFF;}
/* ---------- KARTU CONTAINER PERSAGI DI BAWAH HERO ---------- */
.kkn-root .hero-stat-cards {
  display: grid;
  opacity: 90%;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 48px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.kkn-root .stat-card {
  background: rgba(30, 42, 34, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px 20px 0 0;
  padding: 32px 20px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.kkn-root .stat-card:hover {
  transform: translateY(-4px);
  background: rgba(40, 56, 45, 0.85);
  border-color: rgba(231, 199, 122, 0.4);
}

.kkn-root .stat-card .card-icon {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kkn-root .stat-card .card-num {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 38px;
  line-height: 1;
  color: #FFFFFF;
  letter-spacing: -0.02em;
}

.kkn-root .stat-card .card-lbl {
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  margin-top: 10px;
  line-height: 1.35;
}

.kkn-root .card-plain{background:#fff;border:1px solid var(--khaki-line);border-radius:4px;padding:24px;}
.kkn-root .card-plain h3{font-size:18px;margin-bottom:10px;}

.kkn-root .filters{display:flex;gap:10px;margin-top:32px;flex-wrap:wrap;align-items:center;justify-content:space-between;}
.kkn-root .filter-tabs{display:flex;gap:8px;flex-wrap:wrap;}
.kkn-root .filter-tabs button{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.04em;text-transform:uppercase;padding:8px 14px;border-radius:20px;border:1px solid var(--khaki-line);background:#fff;color:#5c6b5e;cursor:pointer;transition:.2s;}
.kkn-root .filter-tabs button.active{background:var(--pine-deep);color:var(--paper);border-color:var(--pine-deep);}
.kkn-root .search-box{font-family:'Inter';font-size:13px;padding:9px 14px;border-radius:20px;border:1px solid var(--khaki-line);background:#fff;min-width:200px;flex:1;max-width:280px;}
.kkn-root .prog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px;}
.kkn-root .prog-card{background:#fff;border:1px solid var(--khaki-line);border-radius:4px;padding:20px;display:flex;flex-direction:column;}
.kkn-root .prog-top{display:flex;justify-content:space-between;align-items:center;}
.kkn-root .prog-tag{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;background:var(--sage);color:var(--pine-deep);padding:4px 10px;border-radius:20px;}
.kkn-root .prog-card h3{font-size:17px;margin-top:14px;}
.kkn-root .prog-card .target{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#6b7a6c;margin-top:6px;}
.kkn-root .prog-card p.desc{font-size:13px;color:#3c4a3e;margin-top:12px;flex-grow:1;}
.kkn-root .prog-card .flbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--ochre-deep);margin-top:14px;margin-bottom:6px;}
.kkn-root .prog-card ul{margin:0;padding-left:16px;font-size:12px;color:#3c4a3e;}
.kkn-root .prog-card ul li{margin-bottom:4px;}
.kkn-root .prog-foot{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:14px;border-top:1px dashed var(--khaki-line);font-family:'IBM Plex Mono',monospace;font-size:11px;}
.kkn-root .prog-foot .det{color:var(--ochre-deep);font-weight:600;}

.kkn-root .team-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px;margin-top:28px;}
.kkn-root .team-card{background:var(--paper-deep);border:1px solid var(--khaki-line);border-radius:4px;padding:18px 14px;text-align:center;}
.kkn-root .team-role{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.06em;text-transform:uppercase;background:var(--pine);color:var(--paper);padding:3px 10px;border-radius:20px;display:inline-block;}
.kkn-root .team-role.sec{background:var(--pine);}
.kkn-root .team-card .stamp{margin:14px auto 10px;}
.kkn-root .team-card .nm{font-family:'Fraunces',serif;font-weight:600;font-size:14px;}
.kkn-root .team-card .fac{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:#6b7a6c;margin-top:4px;}
.kkn-root .team-card .nim{font-family:'IBM Plex Mono',monospace;font-size:9px;color:#8a9488;margin-top:6px;}
.kkn-root .team-card .det{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--ochre-deep);margin-top:12px;font-weight:600;cursor:pointer;}

/* Styling slot foto anggota */
.kkn-root .member-photo-slot {
  width: 120px;
  height: 120px;
  margin: 14px auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kkn-root .member-photo {
  width: 100%;
  height: 100%;
  border-radius: 5%;
  object-fit: cover;
  border: 2px solid var(--sage);
}

/* Styling Container Gambar Lokasi */
.kkn-root .single-img-card {
  border: 1px solid var(--khaki-line);
  border-radius: 3px;
  overflow: hidden;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.kkn-root .single-img-slot {
  width: 100%;
  height: 100%;
  background: var(--sage);
  overflow: hidden;
  position: relative;
}

.kkn-root .single-img-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kkn-root .single-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c6b5e;
  font-size: 13px;
  font-family: 'IBM Plex Mono', monospace;
  background: rgba(220, 230, 214, 0.5);
  border: 1.5px dashed var(--khaki-line);
}

.kkn-root .single-img-info {
  padding: 12px 14px;
  background: #fff;
}

.kkn-root .single-img-info b {
  display: block;
  font-size: 14px;
  color: var(--pine-deep);
}

.kkn-root .single-img-info p {
  font-size: 12px;
  color: #5c6b5e;
  margin: 4px 0 0;
  line-height: 1.4;
}

.kkn-root .dpl-grid{display:grid;grid-template-columns:0.6fr 1fr;gap:20px;margin-top:32px;}
.kkn-root .dpl-card{background:#fff;border:1px solid var(--khaki-line);border-radius:4px;padding:22px;display:flex;gap:16px;align-items:flex-start;}
.kkn-root .dpl-photo{width:120px;height:120px;border-radius:5%;overflow:hidden;flex-shrink:0;border:2px solid var(--sage);background:var(--sage);}
.kkn-root .dpl-photo img{width:100%;height:100%;object-fit:cover;}
.kkn-root .side-info{display:flex;flex-direction:column;gap:12px;}
.kkn-root .info-mini{background:#fff;border:1px solid var(--khaki-line);border-radius:4px;padding:14px;display:flex;gap:12px;align-items:flex-start;}
.kkn-root .info-mini .ic{width:26px;height:26px;border-radius:6px;background:var(--sage);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
.kkn-root .info-mini b{font-size:13px;display:block;}
.kkn-root .info-mini p{font-size:11.5px;color:#5c6b5e;margin:4px 0 0;}

.kkn-root .loc{display:flex;gap:15px;margin-top:32px;justify-content: center;}
.kkn-root .map-frame{border:1px solid var(--khaki-line);margin: 0 auto;border-radius:4px;overflow:hidden;height:500px;width:700px;}
.kkn-root .map-frame iframe{width:95%;height:87%;padding-top:18px;padding-bottom:18px;border:0;filter:grayscale(15%) sepia(8%);}
.kkn-root .loc-cards{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px;}
.kkn-root .loc-card{background:#fff;border:1px solid var(--khaki-line);border-radius:4px;padding:12px;font-size:11.5px;}
.kkn-root .loc-card b{display:block;font-size:12.5px;color:var(--pine-deep);margin-bottom:2px;}
.kkn-root .maps-btn{margin-top:16px;width:100%;justify-content:center;}

/* Styling Slider 1 Container per Hari */
.kkn-root .gallery-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 28px;
}

.kkn-root .day-card {
  background: #fff;
  border: 1px solid var(--khaki-line);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.kkn-root .day-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--khaki-line);
  margin-bottom: 16px;
}

.kkn-root .day-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  background: var(--pine-deep);
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: .05em;
}

.kkn-root .day-date {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  color: var(--ochre-deep);
  font-weight: 500;
}

/* Slider Layout */
.kkn-root .slider-container {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.kkn-root .slider-photo-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kkn-root .slider-photo-slot {
  width: 100%;
  height: flex;
  background: var(--sage);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--khaki-line);
}

.kkn-root .slider-photo-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.kkn-root .photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c6b5e;
  font-size: 13px;
  font-family: 'IBM Plex Mono', monospace;
  background: rgba(220, 230, 214, 0.4);
}

.kkn-root .slider-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #4d554e;
  margin-top: 14px;
  padding: 0 4px;
}

.kkn-root .slider-counter {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--ochre-deep);
  font-weight: 600;
}

/* Tombol Geser Panah */
.kkn-root .slider-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--khaki-line);
  background: #fff;
  color: var(--pine-deep);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.kkn-root .slider-btn:hover {
  background: var(--pine-deep);
  color: #fff;
  border-color: var(--pine-deep);
}

/* Indikator Dots */
.kkn-root .slider-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.kkn-root .dot-btn {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--sage-line);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease, transform 0.2s ease;
}

.kkn-root .dot-btn.active {
  background: var(--ochre-deep);
  transform: scale(1.25);
}

@media (max-width: 640px) {
  .kkn-root .slider-photo-slot {
    height: 200px;
  }
  .kkn-root .slider-btn {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .kkn-root .day-photos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .kkn-root .day-photos-grid {
    grid-template-columns: 1fr;
  }
}

footer{background:var(--pine-deep);color:var(--paper);padding:48px 0 22px;}
.kkn-root .foot-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:30px;}
.kkn-root .foot-brand{display:flex;gap:12px;align-items:center;margin-bottom:14px;}
footer p.desc{color:#C9D6C3;font-size:12.5px;line-height:1.7;}
.kkn-root .foot-btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}
.kkn-root .foot-pill{border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:6px 12px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;}
footer blockquote{color:#E7C77A;border:none;padding:0;margin-top:16px;font-size:13px;}
.kkn-root .foot-col .flbl{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#E7C77A;margin-bottom:14px;}
.kkn-root .foot-col a{display:block;font-size:12.5px;color:#D9E3D4;padding:6px 0;border-top:1px dashed rgba(255,255,255,.15);}
.kkn-root .foot-col a:hover{color:var(--paper);}
.kkn-root .foot-box{background:rgba(255,255,255,.06);border-radius:4px;padding:14px;margin-bottom:12px;}
.kkn-root .foot-box b{display:block;font-size:12.5px;}
.kkn-root .foot-box .sub2{font-size:11px;color:#C9D6C3;margin-top:3px;}
.kkn-root .foot-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,.15);font-size:11.5px;color:#C9D6C3;flex-wrap:wrap;gap:12px;}
.kkn-root .top-btn{background:var(--ochre);color:var(--paper);width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

/* ---------- Responsive breakpoints ---------- */
@media(max-width:980px){
  .kkn-root nav.links{display:none;}
  .kkn-root .navtoggle{display:block;}
  .kkn-root .mobile-menu{display:flex;}
  .kkn-root .hero-grid{grid-template-columns:1fr;}
  .kkn-root .hero-stat-cards{grid-template-columns:repeat(2, 1fr);}
  .kkn-root .prog-grid{grid-template-columns:repeat(2,1fr);}
  .kkn-root .team-grid{grid-template-columns:repeat(3,1fr);}
  .kkn-root .dpl-grid{grid-template-columns:1fr;}
  .kkn-root .loc-grid{grid-template-columns:1fr;}
  .kkn-root .contact-grid{grid-template-columns:1fr;}
  .kkn-root .foot-grid{grid-template-columns:1fr;gap:26px;}
}
@media(max-width:640px){
  .kkn-root .wrap{padding:0 16px;}
  .kkn-root section{padding:40px 0;}
  .kkn-root .hero{padding:36px 0 0px;}
  .kkn-root .hero h1{font-size:28px;}
  .kkn-root .hero-stat-cards{grid-template-columns:repeat(2, 1fr); gap: 10px; margin-top: 32px;}
  .kkn-root .stat-card{padding: 20px 12px; border-radius: 14px 14px 0 0;}
  .kkn-root .stat-card .card-num{font-size: 28px;}
  .kkn-root .stat-card .card-lbl{font-size: 11px;}
  .kkn-root .section-head h2{font-size:23px;}
  .kkn-root blockquote{font-size:14px;}
  .kkn-root .cta-row .btn{flex:1;justify-content:center;}
  .kkn-root .prog-grid{grid-template-columns:1fr;}
  .kkn-root .team-grid{grid-template-columns:repeat(2,1fr);gap:12px;}
  .kkn-root .loc-cards{grid-template-columns:1fr;}
  .kkn-root .form-row{grid-template-columns:1fr;}
  .kkn-root .filters{flex-direction:column;align-items:stretch;}
  .kkn-root .search-box{max-width:none;}
  .kkn-root .brand-text .t1{font-size:14px;}
  .kkn-root .stamp{width:46px;height:46px;}
  .kkn-root .stamp span{font-size:16px;}
}
@media(max-width:400px){
  .kkn-root .team-grid{grid-template-columns:1fr 1fr;}
  .kkn-root .hero-stat-cards{grid-template-columns: 1fr;}
}
@media(prefers-reduced-motion: reduce){
  .kkn-root *{transition:none !important;}
}
`;
