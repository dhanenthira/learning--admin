import React, { useState } from 'react';
import { PlusCircle, Search, Trash2, Edit3, Filter, HelpCircle, Check, X } from 'lucide-react';
import Header from '../components/Header';

export default function Questions() {
  const [questions, setQuestions] = useState([
    { id: 'q1', title: 'Train Speed & Distance Calculation', category: 'Aptitude', topic: 'Time & Distance', difficulty: 'Easy', answer: '150 metres', options: ['120 metres', '150 metres', '180 metres', '200 metres'] },
    { id: 'q2', title: 'Profit & Loss Margin Evaluation', category: 'Aptitude', topic: 'Profit & Loss', difficulty: 'Easy', answer: '$200', options: ['$150', '$180', '$200', '$250'] },
    { id: 'q3', title: 'Binary Search Worst Case Time Complexity', category: 'Technical', topic: 'Data Structures', difficulty: 'Easy', answer: 'O(log n)', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'] },
    { id: 'q4', title: 'HTTP Authentication Status Code', category: 'Technical', topic: 'Computer Networks', difficulty: 'Easy', answer: '401 Unauthorized', options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'] },
    { id: 'q5', title: 'Dijkstra Shortest Path with Negative Weights', category: 'Technical', topic: 'Algorithms', difficulty: 'Hard', answer: 'Fails with negative cycles', options: ['Works correctly', 'Fails with negative cycles', 'Requires Floyd-Warshall', 'O(V^3)'] },
  ]);

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New question form state
  const [newQ, setNewQ] = useState({
    title: '',
    category: 'Aptitude',
    topic: 'Time & Work',
    difficulty: 'Easy',
    statement: '',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    answer: '',
    explanation: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newQ.title) return;

    setQuestions([
      {
        id: `q_${Date.now()}`,
        title: newQ.title,
        category: newQ.category,
        topic: newQ.topic,
        difficulty: newQ.difficulty,
        answer: newQ.answer || newQ.optA,
        options: [newQ.optA, newQ.optB, newQ.optC, newQ.optD].filter(Boolean)
      },
      ...questions
    ]);

    setIsModalOpen(false);
    setNewQ({
      title: '',
      category: 'Aptitude',
      topic: 'Time & Work',
      difficulty: 'Easy',
      statement: '',
      optA: '',
      optB: '',
      optC: '',
      optD: '',
      answer: '',
      explanation: ''
    });
  };

  const handleDelete = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const filtered = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase());
    const matchesCat = catFilter === 'All' || q.category === catFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-main">
      <Header
        title="Question Bank & Curriculum Editor"
        subtitle="Manage aptitude and technical multiple-choice questions with server-side validation keys"
      />

      <div className="admin-content">
        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <input
                type="text"
                className="form-input"
                style={{ width: '100%', paddingLeft: '40px', height: '44px' }}
                placeholder="Search questions by topic or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={17} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
            </div>

            <select
              className="form-select"
              style={{ height: '44px' }}
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Aptitude">Aptitude</option>
              <option value="Technical">Technical</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={16} />
            <span>Create New Question</span>
          </button>
        </div>

        {/* Question Grid / List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((q) => (
            <div key={q.id} className="card" style={{ padding: '18px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: q.category === 'Aptitude' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(139, 92, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: q.category === 'Aptitude' ? 'var(--primary)' : 'var(--secondary)'
                  }}>
                    <HelpCircle size={22} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {q.title}
                      </h4>
                      <span className={`badge badge-${q.difficulty.toLowerCase()}`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span>Category: <strong style={{ color: 'var(--text-secondary)' }}>{q.category}</strong></span>
                      <span>•</span>
                      <span>Topic: <strong style={{ color: 'var(--text-secondary)' }}>{q.topic}</strong></span>
                      <span>•</span>
                      <span>Correct Answer: <strong style={{ color: 'var(--success)' }}>{q.answer}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ height: '34px', padding: '0 10px', color: 'var(--error)' }}
                    onClick={() => handleDelete(q.id)}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Add New Question to Bank
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ padding: '28px' }}>
              <div className="form-group">
                <label className="form-label">Question Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Work and Time Rates Calculation"
                  value={newQ.title}
                  onChange={(e) => setNewQ({ ...newQ, title: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={newQ.category}
                    onChange={(e) => setNewQ({ ...newQ, category: e.target.value })}
                  >
                    <option value="Aptitude">Aptitude</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select
                    className="form-select"
                    value={newQ.difficulty}
                    onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Topic / Tag</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Data Structures, Profit & Loss"
                  value={newQ.topic}
                  onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Option A</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Option A"
                    value={newQ.optA}
                    onChange={(e) => setNewQ({ ...newQ, optA: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Option B</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Option B"
                    value={newQ.optB}
                    onChange={(e) => setNewQ({ ...newQ, optB: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Option C</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Option C"
                    value={newQ.optC}
                    onChange={(e) => setNewQ({ ...newQ, optC: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Option D</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Option D"
                    value={newQ.optD}
                    onChange={(e) => setNewQ({ ...newQ, optD: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correct Answer (Exact Match with Option)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Option A value"
                  value={newQ.answer}
                  onChange={(e) => setNewQ({ ...newQ, answer: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
