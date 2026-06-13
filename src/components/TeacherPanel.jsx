import { useState } from 'react';
import { XIcon, ShuffleIcon } from './Icons';

export function TeacherPanel({ students, count, preselected, onPreselect, onClose }) {
  const [mode, setMode] = useState(preselected !== null ? 'fixed' : 'random');
  const [selected, setSelected] = useState(() => {
    if (!preselected) return [];
    // filter out deleted students
    return preselected.filter(id => students.some(s => s.id === id));
  });

  function toggleStudent(id) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= count) {
        // replace last selection
        return [...prev.slice(0, count - 1), id];
      }
      return [...prev, id];
    });
  }

  function handleConfirm() {
    if (mode === 'random') {
      onPreselect(null);
      onClose();
      return;
    }
    if (selected.length !== count) {
      alert(`발표자 수는 ${count}명인데 ${selected.length}명을 선택했습니다.\n정확히 ${count}명을 선택해주세요.`);
      return;
    }
    onPreselect(selected);
    onClose();
  }

  function handleClear() {
    setSelected([]);
  }

  return (
    <div className="modal-overlay teacher-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal teacher-modal">
        <div className="modal-header teacher-header">
          <h2>교사 모드</h2>
          <button className="close-btn" onClick={onClose}><XIcon /></button>
        </div>

        <div className="teacher-mode-toggle">
          <button
            className={`mode-btn ${mode === 'random' ? 'mode-active-random' : ''}`}
            onClick={() => setMode('random')}
          >
            진짜 랜덤
          </button>
          <button
            className={`mode-btn ${mode === 'fixed' ? 'mode-active-fixed' : ''}`}
            onClick={() => setMode('fixed')}
          >
            몰래 지정
          </button>
        </div>

        <div className="modal-body">
          {mode === 'random' && (
            <div className="random-info">
              <div className="random-info-icon"><ShuffleIcon size={44} /></div>
              <p>완전한 랜덤 추첨 모드입니다.</p>
              <p>이전에 지정한 결과가 있으면 취소됩니다.</p>
            </div>
          )}

          {mode === 'fixed' && (
            <div>
              <p className="teacher-hint">
                추첨 결과로 나올 학생 <strong>{count}명</strong>을 순서대로 선택하세요.
                학생들에게는 랜덤처럼 보입니다.
              </p>
              <div className="selection-status">
                <span className={selected.length === count ? 'status-complete' : 'status-pending'}>
                  {selected.length}/{count}명 선택됨
                </span>
                {selected.length > 0 && (
                  <button className="text-btn" onClick={handleClear}>초기화</button>
                )}
              </div>
              <div className="student-list selectable-list">
                {students.map(s => {
                  const order = selected.indexOf(s.id);
                  const isSelected = order !== -1;
                  return (
                    <div
                      key={s.id}
                      className={`student-item selectable ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleStudent(s.id)}
                    >
                      <span className="student-name">{s.name}</span>
                      {isSelected && (
                        <span className="order-badge">{order + 1}번째</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="teacher-footer">
          <button className="primary-btn confirm-btn" onClick={handleConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
