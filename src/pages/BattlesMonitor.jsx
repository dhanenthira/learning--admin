import React, { useState } from 'react';
import { Swords, Radio, Users, Trophy, Play } from 'lucide-react';
import Header from '../components/Header';

export default function BattlesMonitor() {
  const [rooms, setRooms] = useState([
    { code: 'CA-9042', name: 'Speed Algorithms 1v1', host: 'Alex Mercer', rival: 'Sophia Chen', category: 'Aptitude & Speed', status: 'IN_PROGRESS', score: '30 vs 20', timeRemaining: '1:45' },
    { code: 'CA-8819', name: 'DSA Duel Final Sprint', host: 'Marcus Vance', rival: 'Elena Rostova', category: 'Data Structures', status: 'IN_PROGRESS', score: '10 vs 20', timeRemaining: '0:55' },
    { code: 'CA-7102', name: 'Python Battle Arena', host: 'David Kim', rival: 'Waiting for player...', category: 'Python Technical', status: 'WAITING', score: '--', timeRemaining: '3:00' },
  ]);

  return (
    <div className="admin-main">
      <Header
        title="Live 1v1 Battle Rooms Monitor"
        subtitle="Inspect active multiplayer rooms, WebSocket synchronization states, and match outcomes"
      />

      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Live Arena Rooms ({rooms.length})
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Real-time WebSocket socket streaming
            </p>
          </div>

          <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--error)' }}>
            <Radio size={14} className="animate-pulse" />
            LIVE MULTIPLAYER FEED
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {rooms.map((r) => (
            <div key={r.code} className="card" style={{
              backgroundColor: r.status === 'IN_PROGRESS' ? 'rgba(30, 27, 75, 0.6)' : 'var(--surface)',
              borderColor: r.status === 'IN_PROGRESS' ? 'rgba(139, 92, 246, 0.4)' : 'var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary-light)' }}>
                  ROOM #{r.code}
                </span>
                <span className={`badge ${r.status === 'IN_PROGRESS' ? 'badge-easy' : 'badge-medium'}`}>
                  {r.status}
                </span>
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {r.name}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Category: {r.category}
              </p>

              <div style={{
                padding: '12px',
                backgroundColor: 'var(--surface-elevated)',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{r.host}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Host</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--error)', fontSize: '14px' }}>VS</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{r.rival}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Challenger</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <span>Score: <strong style={{ color: 'var(--primary-light)' }}>{r.score}</strong></span>
                <span>Time: <strong style={{ color: 'var(--warning)' }}>{r.timeRemaining}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
