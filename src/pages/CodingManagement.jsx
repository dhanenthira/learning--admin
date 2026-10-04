import React, { useState } from 'react';
import { Code2, Plus, Terminal, CheckCircle2, Clock, Cpu, Trash2 } from 'lucide-react';
import Header from '../components/Header';

export default function CodingManagement() {
  const [problems, setProblems] = useState([
    { id: 'cp_two_sum', title: 'Two Sum Target Indices', difficulty: 'Easy', topic: 'Arrays & Hash Table', acceptance: '82.4%', submissions: 450, timeLimit: '1.0s', memoryLimit: '256MB' },
    { id: 'cp_longest_substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Sliding Window', acceptance: '64.1%', submissions: 320, timeLimit: '1.5s', memoryLimit: '256MB' },
    { id: 'cp_merge_intervals', title: 'Merge Overlapping Intervals', difficulty: 'Medium', topic: 'Sorting & Intervals', acceptance: '58.7%', submissions: 280, timeLimit: '1.0s', memoryLimit: '512MB' },
    { id: 'cp_lru_cache', title: 'Design LRU Cache with O(1) Ops', difficulty: 'Hard', topic: 'Doubly Linked List & Hash Map', acceptance: '41.2%', submissions: 190, timeLimit: '2.0s', memoryLimit: '512MB' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProb, setNewProb] = useState({
    title: '',
    difficulty: 'Medium',
    topic: 'Algorithms',
    description: '',
    timeLimit: '1.0s',
    memoryLimit: '256MB'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProb.title) return;

    setProblems([
      {
        id: `cp_${Date.now()}`,
        title: newProb.title,
        difficulty: newProb.difficulty,
        topic: newProb.topic,
        acceptance: '100%',
        submissions: 0,
        timeLimit: newProb.timeLimit,
        memoryLimit: newProb.memoryLimit
      },
      ...problems
    ]);

    setIsModalOpen(false);
    setNewProb({
      title: '',
      difficulty: 'Medium',
      topic: 'Algorithms',
      description: '',
      timeLimit: '1.0s',
      memoryLimit: '256MB'
    });
  };

  return (
    <div className="admin-main">
      <Header
        title="Coding Arena Problem Manager"
        subtitle="Configure LeetCode/HackerRank coding challenges, test cases, and memory/time sandbox constraints"
      />

      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Active Coding Challenges ({problems.length})
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Supports Python 3, Node.js, C++, and Java execution
            </p>
          </div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            <span>Add New Problem</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {problems.map((p) => (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className={`badge badge-${p.difficulty.toLowerCase()}`}>
                    {p.difficulty}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {p.timeLimit}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Cpu size={12} /> {p.memoryLimit}
                    </span>
                  </div>
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Topic: {p.topic}
                </p>

                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: 'var(--surface-elevated)',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}>
                  <span>Acceptance: <strong style={{ color: 'var(--success)' }}>{p.acceptance}</strong></span>
                  <span>Submissions: <strong style={{ color: 'var(--text-primary)' }}>{p.submissions}</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
                <button
                  className="btn btn-secondary"
                  style={{ height: '34px', fontSize: '12px', color: 'var(--error)' }}
                  onClick={() => setProblems(problems.filter(x => x.id !== p.id))}
                >
                  <Trash2 size={14} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ padding: '24px', borderBottom: '1px solid var(--divider)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Create Coding Arena Challenge
              </h3>
            </div>
            <form onSubmit={handleCreate} style={{ padding: '24px' }}>
              <div className="form-group">
                <label className="form-label">Problem Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Valid Parentheses Matching"
                  value={newProb.title}
                  onChange={(e) => setNewProb({ ...newProb, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select
                    className="form-select"
                    value={newProb.difficulty}
                    onChange={(e) => setNewProb({ ...newProb, difficulty: e.target.value })}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Topic</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Stack & Queues"
                    value={newProb.topic}
                    onChange={(e) => setNewProb({ ...newProb, topic: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Time Limit</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newProb.timeLimit}
                    onChange={(e) => setNewProb({ ...newProb, timeLimit: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Memory Limit</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newProb.memoryLimit}
                    onChange={(e) => setNewProb({ ...newProb, memoryLimit: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Deploy Problem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
