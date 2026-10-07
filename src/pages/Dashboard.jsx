import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  Code2,
  HelpCircle,
  TrendingUp,
  Activity,
  PlusCircle,
  ClipboardCheck,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowUpRight
} from 'lucide-react';
import Header from '../components/Header';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    publishedQuestions: 0,
    totalSubmissions: 0,
    accuracyRate: 0
  });

  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    // Fetch live dashboard metrics from FastAPI
    axios.get('/api/v1/admin/dashboard').then(res => {
      if (res.data?.analytics) {
        const a = res.data.analytics;
        setStats({
          totalStudents: a.total_students ?? 0,
          activeStudents: a.active_students ?? 0,
          publishedQuestions: a.published_questions ?? 0,
          totalSubmissions: a.total_submissions ?? 0,
          accuracyRate: a.accuracy_rate ?? 0
        });
      }
      if (res.data?.recent_submissions && Array.isArray(res.data.recent_submissions)) {
        setRecentSubmissions(res.data.recent_submissions.map((s, idx) => ({
          id: s.id || idx + 1,
          student: s.student_name || 'Student',
          studentId: s.student_id || `STU-${idx + 1}`,
          problem: s.problem || 'Evaluation',
          status: s.status || 'Submitted',
          time: s.time || 'Recently',
          ok: s.status === 'Accepted' || s.status === 'Correct'
        })));
      } else {
        setRecentSubmissions([]);
      }
    }).catch(err => {
      console.error('Failed to load admin dashboard stats:', err);
    });
  }, []);

  return (
    <div className="admin-main">
      <Header
        title="Admin Control Dashboard"
        subtitle="Real-time monitoring of students, curriculum questions, and coding arena submissions"
      />

      <div className="admin-content">
        {/* Banner */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(17, 24, 39, 0.95))',
          borderColor: 'rgba(139, 92, 246, 0.3)',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: 'var(--secondary)', marginBottom: '12px' }}>
              CODEARENA CORE OPERATIONS
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
              Welcome back to Admin Headquarters
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', maxWidth: '650px' }}>
              Publish verified questions, manage nationwide assessments, track real-time coding execution benchmarks, and view detailed student growth analytics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/questions" className="btn btn-primary">
              <PlusCircle size={16} />
              Add Question
            </Link>
            <Link to="/coding" className="btn btn-secondary">
              <Code2 size={16} />
              Add Problem
            </Link>
          </div>
        </div>

        {/* 4 Top Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Total Registered Students</span>
              <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary)' }}>
                <Users size={22} />
              </div>
            </div>
            <div className="stat-value">{stats.totalStudents.toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)' }}>
              <TrendingUp size={14} />
              <span>+124 new this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Active Learners Today</span>
              <div className="stat-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' }}>
                <Activity size={22} />
              </div>
            </div>
            <div className="stat-value">{stats.activeStudents.toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)' }}>
              <span>73.4% Engagement Ratio</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Published Questions</span>
              <div className="stat-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: 'var(--secondary)' }}>
                <HelpCircle size={22} />
              </div>
            </div>
            <div className="stat-value">{stats.publishedQuestions.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Aptitude + Technical + Coding
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Submissions Evaluated</span>
              <div className="stat-icon" style={{ backgroundColor: 'rgba(251, 146, 60, 0.15)', color: 'var(--streak)' }}>
                <Code2 size={22} />
              </div>
            </div>
            <div className="stat-value">{stats.totalSubmissions.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: 'var(--primary-light)' }}>
              84.6% Server Verified Accuracy
            </div>
          </div>
        </div>

        {/* 2 Column Layout: Submissions Table & Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Recent Submissions */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Live Code & MCQ Submissions
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Real-time sandbox evaluations
                </p>
              </div>
              <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                Live Stream
              </span>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Problem / Task</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
                        No recent submissions found in the database.
                      </td>
                    </tr>
                  ) : (
                    recentSubmissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sub.student}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub.studentId}</div>
                        </td>
                        <td>{sub.problem}</td>
                        <td>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: sub.ok ? 'var(--success)' : 'var(--error)',
                            fontWeight: 600,
                            fontSize: '13px'
                          }}>
                            {sub.ok ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {sub.status}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{sub.time}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Action Center */}
          <div className="card">
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Operational Quick Actions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/questions" className="btn btn-secondary" style={{ justifyContent: 'flex-start', height: '48px' }}>
                <PlusCircle size={18} color="var(--primary)" />
                <span>Create New MCQ Question</span>
              </Link>

              <Link to="/coding" className="btn btn-secondary" style={{ justifyContent: 'flex-start', height: '48px' }}>
                <Code2 size={18} color="var(--secondary)" />
                <span>Add Coding Arena Problem</span>
              </Link>

              <Link to="/assessments" className="btn btn-secondary" style={{ justifyContent: 'flex-start', height: '48px' }}>
                <ClipboardCheck size={18} color="var(--success)" />
                <span>Schedule Assessment Test</span>
              </Link>

              <Link to="/students" className="btn btn-secondary" style={{ justifyContent: 'flex-start', height: '48px' }}>
                <Users size={18} color="var(--accent)" />
                <span>Inspect Student Registry</span>
              </Link>

              <Link to="/analytics" className="btn btn-secondary" style={{ justifyContent: 'flex-start', height: '48px' }}>
                <TrendingUp size={18} color="var(--streak)" />
                <span>Export Performance Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
