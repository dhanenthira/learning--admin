import React, { useState } from 'react';
import { ClipboardCheck, Plus, Calendar, Clock, Award, Users } from 'lucide-react';
import Header from '../components/Header';

export default function Assessments() {
  const [tests, setTests] = useState([
    { id: 'test_nationwide_01', title: 'Grand Nationwide Placement Assessment 2026', duration: '90 mins', questions: 45, marks: 100, enrolled: 1240, status: 'Active Live', avgScore: '74.2%' },
    { id: 'test_dsa_02', title: 'Data Structures & Algorithms Mid-Term Sprint', duration: '60 mins', questions: 30, marks: 75, enrolled: 890, status: 'Upcoming', avgScore: '--' },
    { id: 'test_python_03', title: 'Python Full-Stack & OOP Competency Test', duration: '45 mins', questions: 25, marks: 50, enrolled: 650, status: 'Completed', avgScore: '81.5%' },
  ]);

  return (
    <div className="admin-main">
      <Header
        title="Assessment & Examination Controller"
        subtitle="Schedule formal timed assessments, randomize question distribution, and configure automated grading"
      />

      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Scheduled Assessment Drives ({tests.length})
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Server-enforced timers and anti-tamper submission safeguards
            </p>
          </div>

          <button className="btn btn-primary">
            <Plus size={16} />
            <span>Create Assessment</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tests.map((t) => (
            <div key={t.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--success)'
                }}>
                  <ClipboardCheck size={24} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t.title}
                    </h4>
                    <span className={`badge ${t.status === 'Active Live' ? 'badge-easy' : (t.status === 'Upcoming' ? 'badge-medium' : 'badge-hard')}`}>
                      {t.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {t.duration}
                    </span>
                    <span>•</span>
                    <span>{t.questions} Questions ({t.marks} Marks)</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={14} /> {t.enrolled} Enrolled
                    </span>
                    <span>•</span>
                    <span>Average: <strong style={{ color: 'var(--primary-light)' }}>{t.avgScore}</strong></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary" style={{ height: '36px', fontSize: '13px' }}>
                  Inspect Results
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
