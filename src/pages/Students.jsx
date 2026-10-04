import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserCheck, UserX, Shield, Award, Filter, Mail } from 'lucide-react';
import Header from '../components/Header';

export default function Students() {
  const [students, setStudents] = useState([
    { id: 'user_student_01', student_id: 'CA-2026-9042', name: 'Alex Mercer', email: 'alex@codearena.com', college: 'National Institute of Tech', department: 'Computer Science', accuracy: 88.2, solved: 380, status: 'Active', points: 4850 },
    { id: 'user_student_02', student_id: 'CA-2026-8190', name: 'Sophia Chen', email: 'sophia@mit.edu', college: 'MIT Institute of Technology', department: 'AI & Data Science', accuracy: 94.5, solved: 490, status: 'Active', points: 5620 },
    { id: 'user_student_03', student_id: 'CA-2026-7412', name: 'Marcus Vance', email: 'marcus@stanford.edu', college: 'Stanford University', department: 'Software Engineering', accuracy: 82.1, solved: 310, status: 'Active', points: 4310 },
    { id: 'user_student_04', student_id: 'CA-2026-9530', name: 'Elena Rostova', email: 'elena@cambridge.ac.uk', college: 'Cambridge University', department: 'Mathematics & Computing', accuracy: 91.0, solved: 295, status: 'Active', points: 3980 },
    { id: 'user_student_05', student_id: 'CA-2026-6119', name: 'David Kim', email: 'david.kim@seoul.ac.kr', college: 'Seoul National University', department: 'Computer Science', accuracy: 79.4, solved: 240, status: 'Suspended', points: 3200 },
  ]);

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  useEffect(() => {
    axios.get('/api/v1/admin/students').then(res => {
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setStudents(res.data);
      }
    }).catch(() => {});
  }, []);

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.student_id.toLowerCase().includes(search.toLowerCase()) ||
                          s.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || s.department.includes(deptFilter);
    return matchesSearch && matchesDept;
  });

  const toggleStatus = (id) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Suspended' : 'Active';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <div className="admin-main">
      <Header
        title="Student Directory & Management"
        subtitle="Search, inspect, and manage enrolled learners, accuracy metrics, and permissions"
      />

      <div className="admin-content">
        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="form-input"
              style={{ width: '100%', paddingLeft: '40px', height: '46px' }}
              placeholder="Search by student name, Student ID (e.g. CA-2026-9042), or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              className="form-select"
              style={{ height: '46px' }}
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="AI">AI & Data Science</option>
              <option value="Software">Software Engineering</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>
        </div>

        {/* Student Table */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ border: 'none' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Info</th>
                  <th>Institution / Department</th>
                  <th>Accuracy</th>
                  <th>Questions Solved</th>
                  <th>Points</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          color: '#ffffff'
                        }}>
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.student_id} • {s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{s.college}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.department}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--success)' }}>
                        {s.accuracy}%
                      </span>
                    </td>
                    <td>{s.solved}</td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--primary-light)' }}>
                        {s.points} XP
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${s.status === 'Active' ? 'badge-easy' : 'badge-hard'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        style={{ height: '32px', fontSize: '12px', padding: '0 10px' }}
                        onClick={() => toggleStatus(s.id)}
                      >
                        {s.status === 'Active' ? (
                          <>
                            <UserX size={13} color="var(--error)" />
                            <span>Suspend</span>
                          </>
                        ) : (
                          <>
                            <UserCheck size={13} color="var(--success)" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
