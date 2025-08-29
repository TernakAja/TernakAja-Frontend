[![My Skills](https://skillicons.dev/icons?i=vite,react,ts,tailwind,vercel)](https://skillicons.dev)

# TernakAja Frontend

**TernakAja Frontend** adalah aplikasi web berbasis React TypeScript yang berfungsi sebagai dashboard untuk sistem monitoring kesehatan hewan ternak secara real-time. Platform ini memungkinkan peternak untuk memantau kondisi ternak, mendeteksi anomali, dan mengelola data kesehatan hewan.

## Fitur Utama

- Dashboard real-time untuk monitoring kesehatan ternak
- Sistem manajemen profil hewan ternak
- Deteksi anomali berbasis AI dengan visualisasi data
- Sistem notifikasi untuk alert kesehatan
- Role-based access control (Peternak, Dokter Hewan, Admin)
- Marketplace dan forum komunitas peternak
- Knowledge center dengan artikel edukasi
- Responsive design untuk desktop dan mobile

## Struktur Proyek

```
src/
├── components/           // Komponen UI yang dapat digunakan ulang
│   ├── ui/              // Base UI components (ShadcnUI)
│   ├── dashboard/       // Komponen khusus dashboard
│   └── common/          // Komponen umum
├── pages/               // Halaman-halaman aplikasi
│   ├── Dashboard.tsx    // Dashboard utama
│   ├── Livestock.tsx    // Manajemen ternak
│   └── Analytics.tsx    // Analitik dan laporan
├── hooks/               // Custom React hooks
├── services/            // API services dan integrasi
├── types/               // TypeScript type definitions
├── utils/               // Fungsi utilitas
└── styles/              // Global styles dan konfigurasi
```

## Setup & Konfigurasi

### 1. Clone Repositori
```bash
git clone https://github.com/TernakAja/TernakAja-Frontend.git
cd TernakAja-Frontend
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Konfigurasi Environment
Buat file `.env.local` dan isi dengan konfigurasi yang diperlukan:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WEBSOCKET_URL=ws://localhost:3000
VITE_AZURE_IOT_CONNECTION=your-azure-connection-string
```

### 4. Jalankan Development Server
```bash
npm run dev
# atau
yarn dev
```

## Scripts yang Tersedia

```bash
npm run dev          # Jalankan development server
npm run build        # Build untuk production
npm run preview      # Preview build production
npm run lint         # Jalankan ESLint
npm run type-check   # TypeScript type checking
```

## Teknologi yang Digunakan

### Core Technologies
- **Vite** - Build tool dan development server
- **React 18** - Library UI dengan hooks modern
- **TypeScript** - Type safety dan better DX
- **TailwindCSS** - Utility-first CSS framework

### UI Components & Styling
- **ShadcnUI** - Pre-built accessible components
- **Lucide React** - Icon library
- **Recharts** - Data visualization library

### State Management & Data
- **React Query/TanStack Query** - Server state management
- **Zustand** - Client state management
- **Axios** - HTTP client untuk API calls

## Integrasi dengan Backend

Frontend ini terintegrasi dengan:
- **[TernakAja Backend](https://github.com/StyNW7/TernakAja-Backend)** - REST API dengan Express.js
- **[TernakAja AI](https://github.com/StyNW7/TernakAja-AI)** - ML models untuk anomaly detection  
- **[TernakAja IoT](https://github.com/StyNW7/TernakAja-IoT)** - Data sensor dari perangkat ESP32

## Komponen Utama

### Dashboard Components
- **LivestockCard** - Kartu informasi ternak individual
- **HealthChart** - Grafik data kesehatan real-time
- **AlertPanel** - Panel notifikasi dan alert
- **MetricsOverview** - Overview statistik keseluruhan

### Data Visualization
- **TemperatureChart** - Grafik suhu tubuh ternak
- **HeartRateMonitor** - Monitor detak jantung
- **ActivityTracker** - Tracking aktivitas hewan
- **HealthTrends** - Trend kesehatan jangka panjang

## Rencana Pengembangan

- Implementasi Progressive Web App (PWA)
- Integrasi push notifications
- Offline mode dengan service workers
- Implementasi WebRTC untuk video monitoring
- Mobile app dengan React Native
- Advanced data analytics dashboard
- Real-time collaboration features

## Live Demo

[http://ternakaja.my.id/](http://ternakaja.my.id/)
