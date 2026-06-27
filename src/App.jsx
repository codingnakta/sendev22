import { useState, useRef, useMemo } from 'react';
import { useStudents } from './hooks/useStudents';
import { SlotMachine } from './components/SlotMachine';
import { StudentManager } from './components/StudentManager';
import { TeacherPanel } from './components/TeacherPanel';
import { EthicsGate } from './components/EthicsGate';
import { ReelIcon, PeopleIcon, PersonIcon } from './components/Icons';

const ETHICS_KEY = 'ethics_agreed_v1';

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.8,
      duration: 2.5 + Math.random() * 2,
      color: ['#ff6b6b', '#ffd700', '#4ecdc4', '#a29bfe', '#fd79a8', '#00cec9', '#55efc4', '#fdcb6e', '#e17055'][i % 9],
      size: 7 + Math.random() * 9,
      shape: i % 3 === 0 ? '50%' : '2px',
    })), []
  );

  return (
    <div className="confetti-container" aria-hidden>
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.shape,
          }}
        />
      ))}
    </div>
  );
}

function MainApp() {
  const { students, picked, addStudent, addStudents, removeStudent, markPicked, resetPicked, getAvailable } = useStudents();

  const [count, setCount] = useState(1);
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [winners, setWinners] = useState([]);
  const [spinKey, setSpinKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  // null = random, array of ids = teacher-fixed
  const [preselected, setPreselected] = useState(null);

  // Secret: click title 5 times within 2s to open teacher mode
  const titleClickRef = useRef(0);
  const titleTimerRef = useRef(null);

  function handleTitleClick() {
    titleClickRef.current += 1;
    clearTimeout(titleTimerRef.current);
    if (titleClickRef.current >= 5) {
      titleClickRef.current = 0;
      setShowTeacher(true);
      return;
    }
    titleTimerRef.current = setTimeout(() => { titleClickRef.current = 0; }, 2000);
  }

  function handleCountChange(n) {
    setCount(n);
    setPreselected(null);
  }

  function handleSpin() {
    if (spinning) return;

    const available = getAvailable(allowRepeat);

    if (students.length === 0) {
      setShowManager(true);
      return;
    }
    if (available.length === 0) {
      alert('남은 학생이 없습니다. 중복 허용을 켜거나 발표 기록을 초기화해주세요.');
      return;
    }

    const effectiveCount = Math.min(count, available.length);
    let result;

    if (preselected && preselected.length === effectiveCount) {
      const validIds = preselected.filter(id => students.some(s => s.id === id));
      if (validIds.length === effectiveCount) {
        result = validIds.map(id => students.find(s => s.id === id).name);
      } else {
        result = pickRandom(available, effectiveCount).map(s => s.name);
      }
    } else {
      result = pickRandom(available, effectiveCount).map(s => s.name);
    }

    setWinners(result);
    setSpinning(true);
    setSpinKey(k => k + 1);
    setShowConfetti(false);
  }

  function handleAllStopped() {
    setSpinning(false);
    setShowConfetti(true);

    if (!allowRepeat) {
      const winnerIds = winners
        .map(name => students.find(s => s.name === name)?.id)
        .filter(Boolean);
      markPicked(winnerIds);
    }

    setTimeout(() => setShowConfetti(false), 4500);
  }

  const available = getAvailable(allowRepeat);
  const maxCount = Math.min(Math.max(available.length, 1), 10);
  const isTeacherFixed = preselected !== null;

  return (
    <div className="app">
      {showConfetti && <Confetti />}

      <header className="app-header">
        <h1 className="app-title" onClick={handleTitleClick} title="랜덤 발표자 추출기">
          <ReelIcon /> 랜덤 발표자
        </h1>
        <div className="header-right">
          {isTeacherFixed && (
            <div className="teacher-active-badge" title="교사 지정 모드 활성">
              교사 지정
            </div>
          )}
          <button className="icon-btn" onClick={() => setShowManager(true)}>
            <PersonIcon /> 학생 명단 {students.length}명
          </button>
        </div>
      </header>

      <main className="app-main">
        {students.length === 0 ? (
          <div className="empty-screen">
            <div className="empty-icon"><PeopleIcon /></div>
            <p>먼저 학생 명단을 추가해주세요</p>
            <button className="primary-btn large" onClick={() => setShowManager(true)}>
              학생 추가하기
            </button>
          </div>
        ) : (
          <>
            <div className="count-selector">
              <span className="count-label">발표자 수</span>
              <div className="count-buttons">
                {Array.from({ length: maxCount }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    className={`count-btn ${count === n ? 'active' : ''}`}
                    onClick={() => handleCountChange(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="slot-area">
              {winners.length > 0 ? (
                <SlotMachine
                  key={spinKey}
                  spinning={spinning}
                  winners={winners}
                  allNames={students.map(s => s.name)}
                  onAllStopped={handleAllStopped}
                />
              ) : (
                <div className="slot-placeholder-wrap">
                  <div className="machine-frame placeholder-frame">
                    <div className="machine-lights">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="light-dot" style={{ animationDelay: `${i * 0.12}s` }} />
                      ))}
                    </div>
                    <div className="reels-container">
                      {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className="slot-reel idle">
                          <div className="reel-name">?</div>
                        </div>
                      ))}
                    </div>
                    <div className="machine-lights bottom">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="light-dot" style={{ animationDelay: `${i * 0.12 + 0.06}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              className={`spin-btn ${spinning ? 'spinning-state' : ''}`}
              onClick={handleSpin}
              disabled={spinning}
            >
              {spinning ? '추첨 중...' : '추첨 시작!'}
            </button>

            <div className="settings-bar">
              <label className="toggle-label">
                <span className="toggle-track">
                  <input
                    type="checkbox"
                    checked={allowRepeat}
                    onChange={e => setAllowRepeat(e.target.checked)}
                  />
                  <span className="toggle-slider" />
                </span>
                <span>중복 허용</span>
              </label>

              {!allowRepeat && (
                <span className="remain-info">
                  남은 학생 {available.length}명
                  {picked.length > 0 && (
                    <button className="text-btn" onClick={resetPicked}>초기화</button>
                  )}
                </span>
              )}
            </div>
          </>
        )}
      </main>

      {showManager && (
        <StudentManager
          students={students}
          picked={picked}
          onAdd={addStudent}
          onAddMany={addStudents}
          onRemove={removeStudent}
          onResetPicked={resetPicked}
          onClose={() => setShowManager(false)}
        />
      )}

      {showTeacher && (
        <TeacherPanel
          students={students}
          count={count}
          preselected={preselected}
          onPreselect={setPreselected}
          onClose={() => setShowTeacher(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  const [ethicsAgreed, setEthicsAgreed] = useState(
    () => localStorage.getItem(ETHICS_KEY) === 'true'
  );

  function handleEthicsComplete() {
    localStorage.setItem(ETHICS_KEY, 'true');
    setEthicsAgreed(true);
  }

  if (!ethicsAgreed) {
    return <EthicsGate onComplete={handleEthicsComplete} />;
  }

  return <MainApp />;
}
