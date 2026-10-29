import { useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  CloudUpload,
  LayoutDashboard,
  ListFilter,
  Map,
  Menu,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react'
import './App.css'

type Status = 'Needs review' | 'In progress' | 'Resolved'

type Report = {
  id: string
  location: string
  date: string
  confidence: string
  severity: 'High' | 'Medium' | 'Low'
  status: Status
}

const reports: Report[] = [
  { id: 'PH-2048', location: 'Nehru Road, Sector 12', date: 'Today, 10:42 AM', confidence: '96%', severity: 'High', status: 'Needs review' },
  { id: 'PH-2047', location: 'MG Road, Civic Center', date: 'Today, 09:18 AM', confidence: '88%', severity: 'Medium', status: 'In progress' },
  { id: 'PH-2046', location: 'Airport Road, Gate 2', date: 'Yesterday, 04:32 PM', confidence: '91%', severity: 'High', status: 'Resolved' },
  { id: 'PH-2045', location: 'Lake View Avenue', date: 'Yesterday, 01:05 PM', confidence: '74%', severity: 'Low', status: 'Needs review' },
]

const chartValues = [42, 58, 46, 68, 61, 76, 72, 92, 82, 98, 88, 100]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) setSelectedFile(file.name)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={20} /></div>
          <div><strong>RoadWatch</strong><span>Detection platform</span></div>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            { label: 'Overview', icon: LayoutDashboard },
            { label: 'Live map', icon: Map },
            { label: 'Reports', icon: ListFilter, count: '24' },
            { label: 'Analytics', icon: BarChart3 },
          ].map(({ label, icon: Icon, count }) => (
            <button key={label} className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav(label); setSidebarOpen(false) }}>
              <Icon size={18} /><span>{label}</span>{count && <em>{count}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Settings size={18} /><span>Settings</span></button>
          <button className="nav-item"><CircleHelp size={18} /><span>Help center</span></button>
          <div className="profile-card">
            <div className="avatar">AK</div>
            <div><strong>Alex Kumar</strong><span>Administrator</span></div>
            <MoreHorizontal size={18} className="muted-icon" />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Overview</strong></div>
          <div className="topbar-actions">
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><i /></button>
            <div className="top-avatar">AK</div>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">Thursday, October 29, 2026</p>
              <h1>Good morning, Alex <span>👋</span></h1>
              <p className="heading-copy">Here’s what’s happening across your road network today.</p>
            </div>
            <button className="primary-button"><Plus size={18} /> New report</button>
          </section>

          <section className="stat-grid" aria-label="Detection statistics">
            <StatCard icon={<AlertTriangle size={19} />} label="Total detected" value="1,284" trend="+12.8%" tone="blue" note="vs last month" />
            <StatCard icon={<Clock3 size={19} />} label="Needs review" value="24" trend="+4.2%" tone="amber" note="from yesterday" />
            <StatCard icon={<Wrench size={19} />} label="In progress" value="87" trend="+8.4%" tone="purple" note="this week" />
            <StatCard icon={<CheckCircle2 size={19} />} label="Resolved" value="1,173" trend="+18.6%" tone="green" note="this month" />
          </section>

          <section className="main-grid">
            <div className="card upload-card">
              <div className="card-heading">
                <div><h2>Run a new detection</h2><p>Upload a road image to identify damage instantly.</p></div>
                <div className="status-dot"><span /> Model online</div>
              </div>
              <label className="upload-zone">
                <input type="file" accept="image/*" onChange={handleFile} />
                <div className="upload-icon"><CloudUpload size={23} /></div>
                <strong>{selectedFile ?? 'Drop an image here, or browse'}</strong>
                <span>{selectedFile ? 'Ready for analysis' : 'JPG, PNG or WEBP up to 10MB'}</span>
                {!selectedFile && <button type="button" className="outline-button">Choose image</button>}
              </label>
              <div className="upload-footer"><span><ShieldCheck size={15} /> AI confidence scoring enabled</span><button className="text-button">View model details <ChevronDown size={14} /></button></div>
            </div>

            <div className="card chart-card">
              <div className="card-heading">
                <div><h2>Detection activity</h2><p>Reports submitted over the last 30 days.</p></div>
                <button className="select-button">Last 30 days <ChevronDown size={14} /></button>
              </div>
              <div className="chart">
                <div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                <div className="chart-area">
                  <div className="grid-lines"><i /><i /><i /><i /><i /></div>
                  <div className="bars">{chartValues.map((value, index) => <div className="bar-wrap" key={index}><div className="bar" style={{ height: `${value}%` }} /></div>)}</div>
                </div>
              </div>
              <div className="chart-labels"><span>Oct 1</span><span>Oct 8</span><span>Oct 15</span><span>Oct 22</span><span>Today</span></div>
            </div>
          </section>

          <section className="lower-grid">
            <div className="card reports-card">
              <div className="card-heading"><div><h2>Recent reports</h2><p>Latest activity from your team.</p></div><button className="text-button">View all <ChevronDown size={14} /></button></div>
              <div className="table-wrap">
                <table><thead><tr><th>Report</th><th>Location</th><th>Confidence</th><th>Status</th><th /></tr></thead>
                  <tbody>{reports.map((report) => <tr key={report.id}><td><strong>{report.id}</strong><span>{report.date}</span></td><td>{report.location}</td><td><div className="confidence"><span style={{ width: report.confidence }} />{report.confidence}</div></td><td><StatusBadge status={report.status} /></td><td><button className="icon-button"><MoreHorizontal size={18} /></button></td></tr>)}</tbody>
                </table>
              </div>
            </div>
            <div className="card map-card">
              <div className="card-heading"><div><h2>Report locations</h2><p>Active reports across the city.</p></div><button className="icon-button"><MoreHorizontal size={18} /></button></div>
              <div className="map-placeholder">
                <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
                <div className="map-water" />
                <MapPin left="24%" top="40%" color="red" /><MapPin left="63%" top="25%" color="orange" /><MapPin left="72%" top="65%" color="blue" /><MapPin left="40%" top="76%" color="red" />
                <div className="map-overlay"><strong>24</strong><span>active reports</span></div>
              </div>
              <div className="map-footer"><span><i className="pin-dot red" /> High severity</span><span><i className="pin-dot orange" /> Medium</span><span><i className="pin-dot blue" /> Low</span></div>
            </div>
          </section>
          <footer className="page-footer"><span>RoadWatch dashboard <b>•</b> Data refreshed 2 minutes ago</span><span>Powered by computer vision</span></footer>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value, trend, tone, note }: { icon: React.ReactNode; label: string; value: string; trend: string; tone: string; note: string }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-details"><span>{label}</span><strong>{value}</strong><small><b className={tone === 'amber' ? 'negative' : ''}>{trend}</b> {note}</small></div></div>
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}><i />{status}</span>
}

function MapPin({ left, top, color }: { left: string; top: string; color: string }) {
  return <div className={`map-pin ${color}`} style={{ left, top }}><span /></div>
}

export default App
