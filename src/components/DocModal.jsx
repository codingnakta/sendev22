const TERMS = {
  title: '이용약관',
  sections: [
    {
      heading: '제1조 목적',
      body: '본 약관은 랜덤 발표자 추출기(이하 "서비스")의 이용 조건 및 운영자와 이용자의 권리·의무를 규정합니다.',
    },
    {
      heading: '제2조 서비스 내용',
      body: '학생 명단 등록·관리, 발표자 무작위 추출, 추첨 이력 관리, 교사 지정 모드, 생성형 AI 윤리 가이드 확인 기능을 제공합니다. 별도 회원가입 없이 브라우저에서 즉시 이용 가능합니다.',
    },
    {
      heading: '제3조 이용자 의무',
      body: '① 교육 목적 이외의 용도로 서비스를 사용하지 않습니다.\n② 입력한 학생 이름 등 개인정보의 관리 책임은 이용자에게 있습니다.\n③ 공용 기기 사용 후 브라우저 데이터를 삭제하여 학생 정보가 노출되지 않도록 합니다.\n④ 진입 시 확인한 생성형 AI 윤리 핵심 가이드를 학습 활동에서 실천합니다.',
    },
    {
      heading: '제4조 데이터 책임',
      body: '모든 데이터는 이용자 기기의 브라우저 로컬 스토리지에만 저장됩니다. 운영자는 데이터에 접근하거나 백업·복구할 수 없으며, 브라우저 초기화·기기 분실·시크릿 창 사용 등으로 인한 데이터 손실에 책임을 지지 않습니다.',
    },
    {
      heading: '제5조 면책사항',
      body: '서비스는 현 상태(as-is)로 제공되며, 특정 목적 적합성 또는 오류 없음을 보증하지 않습니다. 최종 교육적 판단과 책임은 교사(이용자)에게 있습니다.',
    },
    {
      heading: '제6조 준거법',
      body: '본 약관의 해석 및 분쟁 해결에는 대한민국 법률을 적용합니다.',
    },
  ],
};

const PRIVACY = {
  title: '개인정보처리방침',
  sections: [
    {
      heading: '수집하는 정보',
      body: '학생 이름(교사가 직접 입력), 발표 기록(추첨 결과 자동 생성), 윤리 가이드 동의 여부를 수집합니다. 실명 외 추가 개인정보(연락처·사진 등)는 수집하지 않습니다.',
    },
    {
      heading: '저장 방식 및 보존',
      body: '모든 데이터는 이용자 기기의 브라우저 로컬 스토리지에만 저장되며, 외부 서버로 전송되지 않습니다. 데이터는 앱 내 삭제 기능 또는 브라우저 데이터 초기화로 언제든 삭제할 수 있습니다.',
    },
    {
      heading: '이용 목적',
      body: '발표자 무작위 추출 기능 제공, 추첨 이력 관리 및 중복 방지, 윤리 가이드 동의 상태 유지 목적으로만 사용됩니다.',
    },
    {
      heading: '제3자 제공',
      body: '수집된 정보는 어떠한 제3자에게도 제공되지 않습니다. 외부 분석 도구, 광고 플랫폼, 클라우드 동기화 기능을 사용하지 않습니다. 쿠키도 사용하지 않습니다.',
    },
    {
      heading: '아동 개인정보 보호',
      body: '학교 현장 특성상 학생 이름이 입력될 수 있습니다. 입력된 정보는 외부로 전송되지 않으며, 가능한 경우 실명 대신 번호나 별칭 사용을 권장합니다. 학생 정보 관리 책임은 교사(이용자)에게 있습니다.',
    },
    {
      heading: '이용자 권리',
      body: '앱 내 삭제 기능을 통해 언제든지 저장된 학생 정보를 열람·수정·삭제할 수 있습니다.',
    },
    {
      heading: '정보관리책임자',
      body: '윤다연 | 미림마이스터고등학교 마이스터기획부 교사',
    },
  ],
};

export function DocModal({ type, onClose }) {
  const doc = type === 'terms' ? TERMS : PRIVACY;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay doc-modal-overlay" onClick={handleBackdropClick}>
      <div className="modal doc-modal" role="dialog" aria-modal="true" aria-label={doc.title}>
        <div className="modal-header">
          <h2>{doc.title}</h2>
          <button className="close-btn" onClick={onClose} aria-label="닫기">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="modal-body doc-modal-body">
          {doc.sections.map((s, i) => (
            <div key={i} className="doc-section">
              <h3 className="doc-section-heading">{s.heading}</h3>
              <p className="doc-section-body">{s.body}</p>
            </div>
          ))}
          <p className="doc-updated">최종 수정일: 2026년 6월 27일</p>
        </div>
      </div>
    </div>
  );
}
