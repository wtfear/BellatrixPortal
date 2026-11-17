import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy brand assets
const brandSrc = path.join(__dirname, 'public', 'brand');
const brandDest = path.join(distDir, 'brand');
if (fs.existsSync(brandSrc)) {
  if (!fs.existsSync(brandDest)) {
    fs.mkdirSync(brandDest, { recursive: true });
  }
  const files = fs.readdirSync(brandSrc);
  for (const file of files) {
    fs.copyFileSync(path.join(brandSrc, file), path.join(brandDest, file));
  }
}

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BellatrixPortal — Enterprise Internal Admin & Client Portal OS | WTFear</title>
  <meta name="description" content="Institutional B2B Operations Cockpit, Client Portal Engine & Multi-Tenant Database Manager engineered by WTFear Agency. 100% Sovereign MIT License.">
  <link rel="icon" type="image/svg+xml" href="./brand/bellatrix-logo.svg">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              obsidian: '#0B0F19',
              card: '#111827',
              border: '#1F2937',
              indigo: '#6366F1',
              violet: '#818CF8',
              rose: '#F43F5E',
              emerald: '#10B981',
              amber: '#F59E0B'
            }
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #0B0F19;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #1F2937;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #374151;
    }
  </style>
</head>
<body class="bg-[#0B0F19] text-slate-100 min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white custom-scrollbar">

  <!-- TOP SOVEREIGN STATUS TICKER -->
  <div class="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-4 py-2 text-xs flex justify-between items-center text-slate-400">
    <div class="flex items-center gap-2">
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span class="font-mono text-emerald-400 font-semibold tracking-wider text-[11px]">BELLATRIX CLUSTER: ONLINE</span>
      <span class="text-slate-700 hidden sm:inline">|</span>
      <span class="hidden sm:inline text-slate-400 font-mono text-[11px]">REGION: us-east-prod-04</span>
      <span class="text-slate-700 hidden md:inline">|</span>
      <span class="hidden md:inline text-slate-400 text-[11px]">SOC-2 Type II Validated • Zero Per-Seat SaaS Tax</span>
    </div>
    <div class="flex items-center gap-4">
      <div id="liveClock" class="font-mono text-slate-400 text-[11px] hidden sm:block"></div>
      <a href="https://github.com/wtfear/BellatrixPortal" target="_blank" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-[11px] transition-colors">
        <i data-lucide="github" class="w-3.5 h-3.5"></i>
        <span>wtfear/BellatrixPortal</span>
      </a>
    </div>
  </div>

  <!-- NAVIGATION & TOP BAR -->
  <header class="border-b border-slate-800/60 bg-[#0E1322]/90 sticky top-0 z-40 backdrop-blur-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      <!-- Brand Logo -->
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-800 flex items-center justify-center shadow-lg shadow-indigo-900/30 border border-indigo-400/30 shrink-0">
          <i data-lucide="layers" class="w-5 h-5 text-white"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-lg font-extrabold tracking-tight text-white">
              BELLATRIX<span class="text-indigo-400">PORTAL</span>
            </span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/40">
              v3.8
            </span>
          </div>
          <p class="text-[11px] text-slate-400 hidden sm:block font-medium">Enterprise Operations &amp; Client Portal OS</p>
        </div>
      </div>

      <!-- Center Search & Command Bar -->
      <div class="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div class="relative w-full">
          <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input 
            type="text" 
            id="globalSearchInput" 
            placeholder="Search orders, clients, dispatch hubs, or audit logs..." 
            class="w-full bg-slate-900/80 border border-slate-800 focus:border-indigo-500 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
          />
          <span class="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">⌘K</span>
        </div>
      </div>

      <!-- Right Controls: Role Switcher & User Profile -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- RBAC Role Switcher -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400 font-mono hidden lg:inline">Active Role:</span>
          <select id="roleSelector" class="bg-slate-900 border border-indigo-500/40 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
            <option value="admin">👑 Super Administrator</option>
            <option value="ops">🚛 Logistics &amp; Ops Dispatcher</option>
            <option value="auditor">🛡️ SOC-2 Compliance Auditor</option>
          </select>
        </div>

        <button onclick="triggerNotificationToast()" class="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white relative transition-colors">
          <i data-lucide="bell" class="w-4 h-4"></i>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>

        <div class="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            WT
          </div>
          <div class="hidden xl:block text-left">
            <div class="text-xs font-semibold text-slate-200">WTFear Executive</div>
            <div class="text-[10px] text-emerald-400 font-mono">Verified Sovereign</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- HERO KPI STAT STRIP -->
  <section class="border-b border-slate-800/80 bg-[#0E1322]/40 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- KPI 1 -->
        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Gross Merchandise Volume (GMV)</span>
            <span class="text-emerald-400 font-mono text-[11px] flex items-center gap-0.5">
              <i data-lucide="trending-up" class="w-3 h-3"></i> +28.4%
            </span>
          </div>
          <div class="text-2xl font-extrabold text-white font-mono mt-2">$18,429,800</div>
          <div class="text-[11px] text-slate-500 mt-1">Across 142 B2B enterprise clients</div>
        </div>

        <!-- KPI 2 -->
        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>SaaS Per-Seat Tax Eliminated</span>
            <span class="text-indigo-400 font-mono text-[11px] font-semibold">100% SAVED</span>
          </div>
          <div class="text-2xl font-extrabold text-indigo-400 font-mono mt-2">$289,200 <span class="text-xs font-normal text-slate-400">/ yr</span></div>
          <div class="text-[11px] text-slate-500 mt-1">vs Retool ($50/user) for 4,820 staff</div>
        </div>

        <!-- KPI 3 -->
        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Database Query Latency</span>
            <span class="text-emerald-400 font-mono text-[11px]">p95: 22ms</span>
          </div>
          <div class="text-2xl font-extrabold text-emerald-400 font-mono mt-2">11.8ms</div>
          <div class="text-[11px] text-slate-500 mt-1">PostgreSQL Direct Connection Pool</div>
        </div>

        <!-- KPI 4 -->
        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors">
          <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Active Webhook Endpoints</span>
            <span class="text-slate-400 font-mono text-[11px]">99.99% SLA</span>
          </div>
          <div class="text-2xl font-extrabold text-white font-mono mt-2">48 Nodes</div>
          <div class="text-[11px] text-slate-500 mt-1">Stripe, ERP, Kafka &amp; Custom REST</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN DASHBOARD CONTENT -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">

    <!-- TAB SELECTOR -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
      <div class="flex flex-wrap items-center gap-2">
        <button onclick="switchTab('orders')" id="tab-orders" class="tab-btn px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-900/30 flex items-center gap-2 transition-all">
          <i data-lucide="truck" class="w-4 h-4"></i>
          <span>B2B Logistics &amp; Orders</span>
        </button>
        <button onclick="switchTab('clients')" id="tab-clients" class="tab-btn px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-2 transition-all">
          <i data-lucide="building-2" class="w-4 h-4"></i>
          <span>Enterprise Client Accounts</span>
        </button>
        <button onclick="switchTab('telemetry')" id="tab-telemetry" class="tab-btn px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-2 transition-all">
          <i data-lucide="activity" class="w-4 h-4"></i>
          <span>Cluster Telemetry &amp; Redis</span>
        </button>
        <button onclick="switchTab('audit')" id="tab-audit" class="tab-btn px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-2 transition-all">
          <i data-lucide="shield-check" class="w-4 h-4"></i>
          <span>Cryptographic Audit Trail</span>
        </button>
        <button onclick="switchTab('advantage')" id="tab-advantage" class="tab-btn px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center gap-2 transition-all">
          <i data-lucide="award" class="w-4 h-4 text-amber-400"></i>
          <span class="text-amber-300 font-semibold">The WTFear ROI Pitch</span>
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button onclick="openNewRecordModal()" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-900/20 flex items-center gap-1.5 transition-all">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          <span>New Dispatch Order</span>
        </button>
        <button onclick="exportDataCSV()" class="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors">
          <i data-lucide="download" class="w-3.5 h-3.5"></i>
          <span>Export CSV</span>
        </button>
      </div>
    </div>

    <!-- TAB 1: B2B LOGISTICS & DISPATCH ORDERS -->
    <div id="content-orders" class="tab-content space-y-6">
      <!-- Filter Bar -->
      <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <span class="text-slate-400 font-medium">Filter Status:</span>
          <button onclick="filterStatus('ALL')" class="status-pill px-3 py-1 rounded-lg bg-indigo-600 text-white font-medium text-xs">All (14)</button>
          <button onclick="filterStatus('DELIVERED')" class="status-pill px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium text-xs">Delivered (7)</button>
          <button onclick="filterStatus('IN TRANSIT')" class="status-pill px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium text-xs">In Transit (4)</button>
          <button onclick="filterStatus('PROCESSING')" class="status-pill px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium text-xs">Processing (2)</button>
          <button onclick="filterStatus('FLAGGED')" class="status-pill px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium text-xs">Flagged (1)</button>
        </div>

        <div class="text-xs text-slate-400 font-mono">
          Showing <span id="ordersCount" class="text-white font-bold">14</span> active records
        </div>
      </div>

      <!-- Orders Data Table -->
      <div class="rounded-xl border border-slate-800 bg-[#0E1322]/60 overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-900/90 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 text-[11px]">
              <tr>
                <th class="py-3.5 px-4">Order Ref</th>
                <th class="py-3.5 px-4">Enterprise Account</th>
                <th class="py-3.5 px-4">Cargo / Contract</th>
                <th class="py-3.5 px-4">Destination Hub</th>
                <th class="py-3.5 px-4">Contract Value</th>
                <th class="py-3.5 px-4">Logistics Status</th>
                <th class="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="ordersTableBody" class="divide-y divide-slate-800/80 font-sans">
              <!-- Dynamically populated via JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: ENTERPRISE CLIENT ACCOUNTS -->
    <div id="content-clients" class="tab-content hidden space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Client Card 1 -->
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all">
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">TIER 1 SOVEREIGN</span>
            <span class="text-xs font-mono text-slate-500">ID: ACC-8901</span>
          </div>
          <h3 class="text-lg font-bold text-white">Apex Capital Global</h3>
          <p class="text-xs text-slate-400 mt-1">Multi-Strategy Private Equity &amp; PortCo Operations</p>
          <div class="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-slate-400">Active Staff Seats:</span> <span class="font-mono text-white font-semibold">1,240 Users</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Database Schema:</span> <span class="font-mono text-indigo-400">schema_apex_prod</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Annual Contract:</span> <span class="font-mono text-emerald-400 font-bold">$120,000 / yr</span></div>
          </div>
          <button onclick="inspectAccount('Apex Capital Global', '1,240 Users', '$120,000 / yr')" class="w-full mt-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors">
            Manage Client Portal
          </button>
        </div>

        <!-- Client Card 2 -->
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all">
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 text-[10px] font-mono font-semibold">HIPAA COMPLIANT</span>
            <span class="text-xs font-mono text-slate-500">ID: ACC-8902</span>
          </div>
          <h3 class="text-lg font-bold text-white">Sovereign Health Vault</h3>
          <p class="text-xs text-slate-400 mt-1">Decentralized Clinical Trial &amp; EHR Registry</p>
          <div class="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-slate-400">Active Staff Seats:</span> <span class="font-mono text-white font-semibold">860 Users</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Database Schema:</span> <span class="font-mono text-indigo-400">schema_health_vault</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Annual Contract:</span> <span class="font-mono text-emerald-400 font-bold">$96,000 / yr</span></div>
          </div>
          <button onclick="inspectAccount('Sovereign Health Vault', '860 Users', '$96,000 / yr')" class="w-full mt-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors">
            Manage Client Portal
          </button>
        </div>

        <!-- Client Card 3 -->
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all">
          <div class="flex items-center justify-between mb-4">
            <span class="px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-400 border border-purple-500/30 text-[10px] font-mono font-semibold">AEROSPACE TIER</span>
            <span class="text-xs font-mono text-slate-500">ID: ACC-8903</span>
          </div>
          <h3 class="text-lg font-bold text-white">Kestrel Aerospace &amp; Defense</h3>
          <p class="text-xs text-slate-400 mt-1">Autonomous Drone Fleet &amp; Avionics Maintenance</p>
          <div class="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div class="flex justify-between"><span class="text-slate-400">Active Staff Seats:</span> <span class="font-mono text-white font-semibold">2,150 Users</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Database Schema:</span> <span class="font-mono text-indigo-400">schema_kestrel_avionics</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Annual Contract:</span> <span class="font-mono text-emerald-400 font-bold">$210,000 / yr</span></div>
          </div>
          <button onclick="inspectAccount('Kestrel Aerospace & Defense', '2,150 Users', '$210,000 / yr')" class="w-full mt-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors">
            Manage Client Portal
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 3: CLUSTER TELEMETRY & REDIS CACHE -->
    <div id="content-telemetry" class="tab-content hidden space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Live Chart Card -->
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-bold text-white">PostgreSQL Throughput &amp; Query Latency (24h)</h3>
              <p class="text-xs text-slate-400">Sub-15ms p95 latency across distributed connection pools</p>
            </div>
            <span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
              LIVE SSE STREAM
            </span>
          </div>
          <div class="h-64 w-full">
            <canvas id="telemetryChart"></canvas>
          </div>
        </div>

        <!-- Infrastructure Metrics Grid -->
        <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 class="text-sm font-bold text-white mb-2">Cluster Resource Allocation</h3>
          
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-slate-400">Redis Cache Hit Ratio</span>
                <span class="font-mono text-emerald-400 font-semibold">98.4%</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 98.4%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-slate-400">PostgreSQL Dedicated Connection Pool</span>
                <span class="font-mono text-indigo-400 font-semibold">24 / 50 Active (48%)</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-indigo-500 h-full rounded-full" style="width: 48%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-slate-400">Cluster Memory Utilization</span>
                <span class="font-mono text-sky-400 font-semibold">4.2 GB / 16.0 GB (26%)</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-sky-500 h-full rounded-full" style="width: 26%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="text-slate-400">Webhook Worker Queue Throughput</span>
                <span class="font-mono text-purple-400 font-semibold">1,420 msgs / sec</span>
              </div>
              <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-purple-500 h-full rounded-full" style="width: 82%"></div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
            <div class="text-slate-300 font-semibold">Active Database Node Handshake:</div>
            <div>• Master Node: pg-cluster-us-east-01.sovereign (Primary Read/Write)</div>
            <div>• Replica Node: pg-cluster-eu-central-01.sovereign (Read Replica)</div>
            <div>• SSL Mode: verify-full with TLSv1.3 TLS_AES_256_GCM_SHA384</div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: CRYPTOGRAPHIC AUDIT TRAIL -->
    <div id="content-audit" class="tab-content hidden space-y-4">
      <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="shield" class="w-4 h-4 text-emerald-400"></i>
          <span class="text-xs font-mono font-bold uppercase text-slate-300">Immutable Cryptographic Audit Ledger (SHA-256)</span>
        </div>
        <span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
          <i data-lucide="lock" class="w-3 h-3"></i> Tamper-Proof Trail Active
        </span>
      </div>

      <div class="rounded-xl border border-slate-800 bg-[#0E1322]/80 overflow-hidden">
        <div id="auditLogStream" class="divide-y divide-slate-800/60 font-mono text-xs">
          <!-- Dynamically populated via JavaScript -->
        </div>
      </div>
    </div>

    <!-- TAB 5: THE WTFEAR ROI PITCH -->
    <div id="content-advantage" class="tab-content hidden space-y-8">
      <div class="text-center max-w-3xl mx-auto">
        <span class="px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
          AGENCY COMMERCIAL ARCHITECTURE
        </span>
        <h2 class="text-3xl font-extrabold text-white mt-4">Why Enterprises Pay $40,000+ for BellatrixPortal</h2>
        <p class="text-sm text-slate-400 mt-2">
          Traditional SaaS tools charge per-seat taxes and lock you into closed platforms. BellatrixPortal gives clients 100% code ownership, zero license fees, and infinite customization.
        </p>
      </div>

      <!-- Comparison Matrix -->
      <div class="rounded-2xl border border-slate-800 bg-[#0E1322] overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-900 text-slate-300 uppercase font-mono tracking-wider border-b border-slate-800">
              <tr>
                <th class="py-4 px-6">Capability / Metric</th>
                <th class="py-4 px-6 text-indigo-400 font-bold bg-indigo-950/30">BellatrixPortal (WTFear)</th>
                <th class="py-4 px-6 text-slate-400">Retool</th>
                <th class="py-4 px-6 text-slate-400">Appsmith / ToolJet</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80 font-medium">
              <tr>
                <td class="py-4 px-6 text-white font-semibold">Per-Seat License Cost</td>
                <td class="py-4 px-6 text-emerald-400 font-mono font-bold bg-indigo-950/20">$0.00 / user (Zero Tax)</td>
                <td class="py-4 px-6 text-rose-400 font-mono">$50.00 / user / mo</td>
                <td class="py-4 px-6 text-amber-400 font-mono">$20 - $40 / user / mo</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-white font-semibold">500-User Enterprise Cost</td>
                <td class="py-4 px-6 text-emerald-400 font-mono font-bold bg-indigo-950/20">$0 / year license fee</td>
                <td class="py-4 px-6 text-rose-400 font-mono">$300,000 / year recurring</td>
                <td class="py-4 px-6 text-rose-400 font-mono">$120,000 / year recurring</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-white font-semibold">Source Code Ownership</td>
                <td class="py-4 px-6 text-emerald-400 font-mono bg-indigo-950/20">100% Sovereign (MIT)</td>
                <td class="py-4 px-6 text-slate-400">0% (Vendor Cloud Lock-in)</td>
                <td class="py-4 px-6 text-amber-400">Copyleft / AGPL Restriction</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-white font-semibold">Custom React 19 Frontend</td>
                <td class="py-4 px-6 text-emerald-400 font-mono bg-indigo-950/20">Infinite Flexibility</td>
                <td class="py-4 px-6 text-slate-400">Rigid Drag-and-Drop Canvas</td>
                <td class="py-4 px-6 text-slate-400">Limited Widget Registry</td>
              </tr>
              <tr>
                <td class="py-4 px-6 text-white font-semibold">Deployment Freedom</td>
                <td class="py-4 px-6 text-emerald-400 font-mono bg-indigo-950/20">Vercel, AWS, Cloudflare, On-Prem</td>
                <td class="py-4 px-6 text-slate-400">Retool Cloud or Enterprise Plan</td>
                <td class="py-4 px-6 text-slate-400">Docker Self-Hosted (Restrictions)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

  <!-- RECORD DETAIL MODAL -->
  <div id="recordModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <div class="flex items-center gap-2">
          <i data-lucide="file-text" class="w-5 h-5 text-indigo-400"></i>
          <h3 id="modalTitle" class="text-sm font-bold text-white">Record Details</h3>
        </div>
        <button onclick="closeModal()" class="text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div id="modalBody" class="font-mono text-xs text-slate-300 space-y-2 max-h-96 overflow-y-auto">
        <!-- Content inserted dynamically -->
      </div>
      <div class="flex justify-end gap-2 pt-3 border-t border-slate-800">
        <button onclick="closeModal()" class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">Close</button>
        <button onclick="triggerDispatchAction()" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold">Confirm Action</button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="toastContainer" class="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none"></div>

  <!-- FOOTER -->
  <footer class="border-t border-slate-800/80 bg-[#0B0F19] py-8 text-xs text-slate-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="font-bold text-slate-300">BELLATRIXPORTAL</span>
        <span>— Institutional B2B Operations &amp; Client Portal OS</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="https://github.com/wtfear/BellatrixPortal" target="_blank" class="hover:text-indigo-400 transition-colors">Source Code</a>
        <a href="https://github.com/wtfear" target="_blank" class="hover:text-indigo-400 transition-colors">WTFear Organization</a>
        <span>MIT License</span>
      </div>
    </div>
  </footer>

  <!-- APPLICATION LOGIC SCRIPT -->
  <script>
    // INITIAL DATASETS
    const SAMPLE_ORDERS = [
      { id: "ORD-9401", client: "Apex Capital Global", cargo: "Autonomous Portfolio Analytics Engine", hub: "Frankfurt (FRA-01)", value: "$148,000", status: "DELIVERED", time: "14:12" },
      { id: "ORD-9402", client: "Sovereign Health Vault", cargo: "HIPAA Clinical Trial Ingestion Pipeline", hub: "Zurich (ZUR-03)", value: "$96,000", status: "IN TRANSIT", time: "14:08" },
      { id: "ORD-9403", client: "Kestrel Aerospace & Defense", cargo: "Drone Fleet Avionics Firmware Matrix", hub: "Seattle (SEA-02)", value: "$210,000", status: "DELIVERED", time: "13:54" },
      { id: "ORD-9404", client: "Lumina Autonomous EV", cargo: "Battery Telemetry Cloud Ingestion Hub", hub: "Tokyo (NRT-04)", value: "$84,500", status: "PROCESSING", time: "13:42" },
      { id: "ORD-9405", client: "Hyperion Robotics AG", cargo: "Hydraulic Sensory Edge Controllers", hub: "Munich (MUC-01)", value: "$132,000", status: "IN TRANSIT", time: "13:30" },
      { id: "ORD-9406", client: "Aether Marine Logistics", cargo: "Container Vessel AIS Navigation Node", hub: "Rotterdam (RTM-02)", value: "$165,000", status: "DELIVERED", time: "13:15" },
      { id: "ORD-9407", client: "Vanguard Microelectronics", cargo: "ASIC Wafer Yield Telemetry Pipeline", hub: "Hsinchu (HSZ-01)", value: "$240,000", status: "FLAGGED", time: "12:59" },
      { id: "ORD-9408", client: "Sovereign Health Vault", cargo: "Genomic Sequencing Secure Cold Storage", hub: "Boston (BOS-01)", value: "$115,000", status: "DELIVERED", time: "12:40" },
      { id: "ORD-9409", client: "Apex Capital Global", cargo: "High-Frequency Arbitrage Data Lake", hub: "London (LHR-02)", value: "$195,000", status: "IN TRANSIT", time: "12:22" },
      { id: "ORD-9410", client: "Nordic Energy Systems", cargo: "Wind Turbine Grid Balancing Telemetry", hub: "Oslo (OSL-01)", value: "$78,000", status: "DELIVERED", time: "12:05" },
      { id: "ORD-9411", client: "Kestrel Aerospace & Defense", cargo: "Telemetry Relay Satellite Uplink Module", hub: "Houston (IAH-01)", value: "$320,000", status: "PROCESSING", time: "11:45" },
      { id: "ORD-9412", client: "Helios Solar Dynamics", cargo: "Photovoltaic Array Inverter Telemetry", hub: "Phoenix (PHX-02)", value: "$62,000", status: "DELIVERED", time: "11:20" },
      { id: "ORD-9413", client: "Quantum Dynamics Labs", cargo: "Cryogenic Cooling Telemetry Rig", hub: "Cambridge (BOS-03)", value: "$180,000", status: "IN TRANSIT", time: "10:55" },
      { id: "ORD-9414", client: "Apex Capital Global", cargo: "Executive BI Cockpit Synchronization", hub: "New York (JFK-01)", value: "$95,000", status: "DELIVERED", time: "10:30" }
    ];

    const AUDIT_LOGS = [
      { time: "14:18:22", actor: "SuperAdmin (wtfear)", action: "Provisioned isolated PostgreSQL schema 'schema_apex_prod' for tenant ACC-8901", hash: "sha256:7f4a...890a" },
      { time: "14:16:45", actor: "FleetAgent-04", action: "Dispatched autonomous freight avionics container #ORD-9402 via Zurich hub", hash: "sha256:3c81...e21f" },
      { time: "14:14:10", actor: "SecuritySentinel", action: "Validated JWT RSA-256 token exchange across 4,820 active client sessions", hash: "sha256:b192...45ac" },
      { time: "14:11:05", actor: "WebhookEngine", action: "Successfully delivered 2,400 batch JSON payloads to client endpoint with 100% ACK", hash: "sha256:90ee...77ba" },
      { time: "14:07:30", actor: "OpsDispatcher", action: "Rerouted cargo shipment #ORD-9407 to secure inspection quarantined bay", hash: "sha256:4d65...99ef" },
      { time: "14:01:12", actor: "BillingWorker", action: "Reconciled recurring enterprise retainer payment ($120,000) for Apex Capital", hash: "sha256:1a8b...32cc" }
    ];

    let currentFilter = "ALL";
    let searchQuery = "";

    function renderOrdersTable() {
      const tbody = document.getElementById("ordersTableBody");
      const filtered = SAMPLE_ORDERS.filter(order => {
        const matchesStatus = currentFilter === "ALL" || order.status === currentFilter;
        const matchesSearch = searchQuery === "" || 
          order.id.toLowerCase().includes(searchQuery) ||
          order.client.toLowerCase().includes(searchQuery) ||
          order.cargo.toLowerCase().includes(searchQuery) ||
          order.hub.toLowerCase().includes(searchQuery);
        return matchesStatus && matchesSearch;
      });

      document.getElementById("ordersCount").innerText = filtered.length;

      tbody.innerHTML = filtered.map(order => {
        let badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
        if (order.status === "DELIVERED") badgeColor = "bg-emerald-950/80 text-emerald-400 border-emerald-500/30";
        if (order.status === "IN TRANSIT") badgeColor = "bg-sky-950/80 text-sky-400 border-sky-500/30";
        if (order.status === "PROCESSING") badgeColor = "bg-indigo-950/80 text-indigo-400 border-indigo-500/30";
        if (order.status === "FLAGGED") badgeColor = "bg-rose-950/80 text-rose-400 border-rose-500/30";

        return \`
          <tr class="hover:bg-slate-900/60 transition-colors">
            <td class="py-3.5 px-4 font-mono font-bold text-indigo-400">\${order.id}</td>
            <td class="py-3.5 px-4 font-semibold text-white">\${order.client}</td>
            <td class="py-3.5 px-4 text-slate-300">\${order.cargo}</td>
            <td class="py-3.5 px-4 font-mono text-slate-400 text-[11px]">\${order.hub}</td>
            <td class="py-3.5 px-4 font-mono text-emerald-400 font-semibold">\${order.value}</td>
            <td class="py-3.5 px-4">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border \${badgeColor}">
                \${order.status}
              </span>
            </td>
            <td class="py-3.5 px-4 text-right">
              <button onclick="inspectOrder('\${order.id}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors">
                Inspect
              </button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function renderAuditLogs() {
      const container = document.getElementById("auditLogStream");
      container.innerHTML = AUDIT_LOGS.map(log => \`
        <div class="p-3.5 hover:bg-slate-900/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <span class="text-slate-500 text-[11px]">\${log.time}</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 text-[10px] font-bold">\${log.actor}</span>
            <span class="text-slate-200 text-xs">\${log.action}</span>
          </div>
          <span class="text-slate-500 text-[10px] shrink-0">\${log.hash}</span>
        </div>
      \`).join('');
    }

    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-900/80', 'text-slate-400');
      });

      const activeContent = document.getElementById('content-' + tabId);
      const activeBtn = document.getElementById('tab-' + tabId);
      if (activeContent) activeContent.classList.remove('hidden');
      if (activeBtn) {
        activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
        activeBtn.classList.remove('bg-slate-900/80', 'text-slate-400');
      }

      if (tabId === 'telemetry') {
        initTelemetryChart();
      }
    }

    function filterStatus(status) {
      currentFilter = status;
      document.querySelectorAll('.status-pill').forEach(btn => {
        if (btn.innerText.toUpperCase().includes(status)) {
          btn.classList.add('bg-indigo-600', 'text-white');
          btn.classList.remove('bg-slate-800', 'text-slate-300');
        } else {
          btn.classList.remove('bg-indigo-600', 'text-white');
          btn.classList.add('bg-slate-800', 'text-slate-300');
        }
      });
      renderOrdersTable();
    }

    // SEARCH INPUT LISTENER
    document.getElementById("globalSearchInput").addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderOrdersTable();
    });

    // MODALS & ACTIONS
    function inspectOrder(orderId) {
      const order = SAMPLE_ORDERS.find(o => o.id === orderId);
      if (!order) return;
      document.getElementById("modalTitle").innerText = "Order Telemetry & Audit: " + order.id;
      document.getElementById("modalBody").innerHTML = \`
        <div class="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
          <div><strong class="text-slate-400">Client:</strong> <span class="text-white">\${order.client}</span></div>
          <div><strong class="text-slate-400">Cargo:</strong> <span class="text-white">\${order.cargo}</span></div>
          <div><strong class="text-slate-400">Destination Hub:</strong> <span class="text-indigo-400">\${order.hub}</span></div>
          <div><strong class="text-slate-400">Contract Value:</strong> <span class="text-emerald-400 font-bold">\${order.value}</span></div>
          <div><strong class="text-slate-400">Status:</strong> <span class="text-slate-200">\${order.status}</span></div>
          <div><strong class="text-slate-400">Blockchain Stamp:</strong> <span class="text-slate-500">0x7d8a94bc12e8736...a10f</span></div>
        </div>
        <div class="text-[11px] text-slate-400 pt-2">
          This record is cryptographically verified and anchored to WTFear Sovereign Cluster us-east-prod-04.
        </div>
      \`;
      document.getElementById("recordModal").classList.remove("hidden");
    }

    function inspectAccount(client, seats, contract) {
      document.getElementById("modalTitle").innerText = "Client Portal Account: " + client;
      document.getElementById("modalBody").innerHTML = \`
        <div class="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
          <div><strong class="text-slate-400">Organization:</strong> <span class="text-white font-bold">\${client}</span></div>
          <div><strong class="text-slate-400">Active Staff Seats:</strong> <span class="text-indigo-400">\${seats}</span></div>
          <div><strong class="text-slate-400">Annual Retainer:</strong> <span class="text-emerald-400 font-bold">\${contract}</span></div>
          <div><strong class="text-slate-400">RLS Boundary:</strong> <span class="text-emerald-400">STRICT_ISOLATION_ENFORCED</span></div>
        </div>
      \`;
      document.getElementById("recordModal").classList.remove("hidden");
    }

    function openNewRecordModal() {
      document.getElementById("modalTitle").innerText = "Create New B2B Dispatch Order";
      document.getElementById("modalBody").innerHTML = \`
        <div class="space-y-3 font-sans text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Select Client Organization:</label>
            <select class="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white">
              <option>Apex Capital Global</option>
              <option>Sovereign Health Vault</option>
              <option>Kestrel Aerospace & Defense</option>
              <option>Hyperion Robotics AG</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Cargo Description:</label>
            <input type="text" placeholder="e.g. Avionics sensory payload..." class="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Contract Value ($ USD):</label>
            <input type="text" placeholder="$125,000" class="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white" />
          </div>
        </div>
      \`;
      document.getElementById("recordModal").classList.remove("hidden");
    }

    function closeModal() {
      document.getElementById("recordModal").classList.add("hidden");
    }

    function triggerDispatchAction() {
      closeModal();
      showToast("✅ Dispatch Action Executed & Webhook Delivered (200 OK)");
    }

    function exportDataCSV() {
      showToast("📥 Exporting 14 records to CSV with SHA-256 integrity hash...");
    }

    function triggerNotificationToast() {
      showToast("🔔 3 unread operations events from us-east-prod-04");
    }

    function showToast(message) {
      const container = document.getElementById("toastContainer");
      const toast = document.createElement("div");
      toast.className = "pointer-events-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/40 shadow-2xl text-xs text-white flex items-center gap-2 transform translate-y-2 transition-all";
      toast.innerHTML = \`<span>\${message}</span>\`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 4000);
    }

    // CHART INITIALIZATION
    let chartInstance = null;
    function initTelemetryChart() {
      if (chartInstance) return;
      const ctx = document.getElementById('telemetryChart');
      if (!ctx) return;
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
          datasets: [{
            label: 'Avg Query Latency (ms)',
            data: [14.2, 12.8, 11.4, 15.6, 11.8, 10.9, 13.5, 11.8],
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4
          }, {
            label: 'Throughput (queries / sec)',
            data: [420, 380, 510, 890, 1420, 1150, 980, 840],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            fill: true,
            tension: 0.4,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } },
            y1: { position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#64748B' } }
          },
          plugins: {
            legend: { labels: { color: '#94A3B8', font: { family: 'Plus Jakarta Sans', size: 11 } } }
          }
        }
      });
    }

    // LIVE CLOCK & SETUP
    function updateClock() {
      const clockEl = document.getElementById("liveClock");
      if (clockEl) {
        const now = new Date();
        clockEl.innerText = now.toUTCString().replace("GMT", "UTC");
      }
    }

    window.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();
      renderOrdersTable();
      renderAuditLogs();
      updateClock();
      setInterval(updateClock, 1000);
    });
  </script>
</body>
</html>`;

// Write to dist/index.html and root index.html
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf-8');
fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf-8');

console.log('✅ BellatrixPortal distribution successfully built into dist/index.html AND root index.html');
