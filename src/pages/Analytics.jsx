import React from 'react';
import { BarChart3, TrendingUp, Award, Users, BookOpen, Code2, Download } from 'lucide-react';
import Header from '../components/Header';

export default function Analytics() {
  const categoryMastery = [
    { name: 'Aptitude & Quantitative', solved: 18450, accuracy: 89.4, color: 'var(--primary)' },
    { name: 'Data Structures & Algorithms', solved: 14200, accuracy: 78.6, color: 'var(--secondary)' },
    { name: 'Python Programming', solved: 9800, accuracy: 92.1, color: 'var(--success)' },
    { name: 'Web Dev & JavaScript', solved: 6470, accuracy: 85.0, color: 'var(--accent)' },
  ];

  return (
    <div className="admin-main">
      <Header
        title="Curriculum & Student Analytics"
        subtitle="Performance distribution, topic mastery rates, and engagement growth reports"
      />

      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Overall Platform Performance Metrics
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Calculated across 48,920 total problem attempts
            </p>
          </div>

          <button className="btn btn-secondary">
            <Download size={16} />
            <span>Download CSV Audit Report</span>
          </button>
        </div>

        {/* Category Mastery Progress Bars */}
        <div className="card" style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
            Domain-Wise Accuracy & Completion
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {categoryMastery.map((c) => (
              <div key={c.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {c.solved.toLocaleString()} solved • <strong style={{ color: 'var(--success)' }}>{c.accuracy}% avg accuracy</strong>
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--surface-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${c.accuracy}%`,
                    backgroundColor: c.color,
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Summary Insights Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)' }}>
                <Users size={20} />
              </div>
              <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Student Retention</h5>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>91.8%</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>7-day active daily streak retention across cohorts</p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                <Code2 size={20} />
              </div>
              <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Average Code Runtime</h5>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>42ms</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Fast sandbox execution throughput across all test suites</p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(251, 146, 60, 0.15)', color: 'var(--streak)' }}>
                <Award size={20} />
              </div>
              <h5 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Badges Unlocked</h5>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>3,410</div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Achievement milestones achieved by enrolled students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
