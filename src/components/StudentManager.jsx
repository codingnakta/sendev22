import { useState, useRef } from 'react';

export function StudentManager({ students, picked, onAdd, onAddMany, onRemove, onResetPicked, onClose }) {
  const [tab, setTab] = useState('list');
  const [singleInput, setSingleInput] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const fileRef = useRef();

  function showFeedback(msg) {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  }

  function handleSingleAdd() {
    const name = singleInput.trim();
    if (!name) return;
    const ok = onAdd(name);
    if (ok) {
      setSingleInput('');
      showFeedback(`"${name}" 추가됨`);
    } else {
      showFeedback(`"${name}" 은(는) 이미 있는 이름입니다`);
    }
  }

  function handleBulkAdd() {
    const names = bulkInput.split('\n').filter(n => n.trim());
    if (names.length === 0) return;
    const count = onAddMany(names);
    setBulkInput('');
    showFeedback(count > 0 ? `${count}명 추가됨` : '모두 중복된 이름입니다');
  }

  function handleCSV(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target.result;
      const names = text.split(/[\n,\r]/).map(n => n.trim()).filter(Boolean);
      const count = onAddMany(names);
      showFeedback(count > 0 ? `CSV에서 ${count}명 추가됨` : '모두 중복된 이름입니다');
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  }

  const remainCount = students.length - picked.length;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>학생 명단 관리</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-tabs">
          {[
            { id: 'list', label: `명단 (${students.length}명)` },
            { id: 'single', label: '개별 추가' },
            { id: 'bulk', label: '일괄 추가' },
            { id: 'csv', label: 'CSV' },
          ].map(t => (
            <button
              key={t.id}
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {feedback && <div className="feedback-bar">{feedback}</div>}

        <div className="modal-body">
          {tab === 'list' && (
            <div>
              <div className="list-actions">
                <span className="remain-count">남은 학생 {remainCount}명 / 전체 {students.length}명</span>
                {picked.length > 0 && (
                  <button className="reset-btn" onClick={onResetPicked}>발표 기록 초기화</button>
                )}
              </div>
              {students.length === 0 ? (
                <div className="empty-state">학생을 추가해주세요</div>
              ) : (
                <div className="student-list">
                  {students.map(s => (
                    <div key={s.id} className={`student-item ${picked.includes(s.id) ? 'picked' : ''}`}>
                      <span className="student-name">
                        {picked.includes(s.id) && <span className="picked-badge">발표완료</span>}
                        {s.name}
                      </span>
                      <button className="remove-btn" onClick={() => onRemove(s.id)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'single' && (
            <div className="add-form">
              <input
                type="text"
                value={singleInput}
                onChange={e => setSingleInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSingleAdd()}
                placeholder="학생 이름 입력 후 Enter"
                className="text-input"
                autoFocus
              />
              <button className="primary-btn" onClick={handleSingleAdd}>추가</button>
            </div>
          )}

          {tab === 'bulk' && (
            <div className="bulk-form">
              <p className="hint">한 줄에 한 명씩 입력하세요</p>
              <textarea
                value={bulkInput}
                onChange={e => setBulkInput(e.target.value)}
                placeholder={'김민준\n이서연\n박지호\n최예린\n...'}
                className="bulk-textarea"
                rows={10}
                autoFocus
              />
              <button className="primary-btn" onClick={handleBulkAdd}>일괄 추가</button>
            </div>
          )}

          {tab === 'csv' && (
            <div className="csv-form">
              <p className="hint">이름이 담긴 CSV 또는 텍스트 파일을 선택하세요.</p>
              <p className="hint">쉼표(,) 또는 줄바꿈으로 구분된 이름을 인식합니다.</p>
              <button className="primary-btn csv-btn" onClick={() => fileRef.current.click()}>
                파일 선택
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.txt"
                style={{ display: 'none' }}
                onChange={handleCSV}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
