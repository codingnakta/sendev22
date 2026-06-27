const GUIDES = [
  {
    id: 1,
    label: '활용 목적',
    badges: [
      { text: '주도성', color: 'badge-orange' },
      { text: '합목적성', color: 'badge-green' },
    ],
    title: '생성형 AI 활용의 목적과 범위를 스스로 설정하고 책임져요.',
    body: '생성형 AI를 어떤 목적으로, 어느 범위까지 활용할지 스스로 기준을 세워요. 그 기준이 상황마다 흔들린다면, 생성형 AI를 활용하는 게 아니라 끌려다니는 거에요. 활용한 결과에 대한 책임은 언제나 나에게 있어요.',
  },
  {
    id: 2,
    label: '주도적 학습',
    badges: [{ text: '주도성', color: 'badge-orange' }],
    title: '내가 먼저 시도하고, 생성형 AI의 결과물에 나만의 통찰을 담아 완성해요.',
    body: '생성형 AI는 훌륭한 도구일 뿐, 나를 대신할 수는 없어요. 생성형 AI에게 묻기 전, 주제에 대해 나의 가설이나 논리 구조를 먼저 세워요. 생성형 AI의 결과물이 나오면, 그대로 복사하지 말고 나의 경험, 비판적 시각, 독창적인 해석을 덧입혀 나만의 색깔을 담아 최종 결과물을 만들어요.',
  },
  {
    id: 3,
    label: '비판적 검증',
    badges: [{ text: '주도성', color: 'badge-orange' }],
    title: '생성형 AI의 한계를 분석하고, 자료를 찾아 결과물을 비판적으로 검증해요.',
    body: '생성형 AI는 확률적으로 그럴싸한 답변을 내놓을 뿐, 항상 진실만을 말하지는 않아요. 생성형 AI가 제시한 수치, 인물, 사건이 사실인지 반드시 교과서, 원본, 공신력 있는 기관의 자료를 통해 교차 검증해요. 생성형 AI의 답변 속 숨겨진 편향성을 찾아내고, 중립적인 시각에서 정보를 재구성해요.',
  },
  {
    id: 4,
    label: '사고의 확장',
    badges: [
      { text: '주도성', color: 'badge-orange' },
      { text: '합목적성', color: 'badge-green' },
    ],
    title: '생성형 AI를 보조 도구로 삼아 사고의 범위와 깊이를 확장해요.',
    body: "생성형 AI를 '내 사고를 확장하는 지적 대화 파트너'로 활용해요. '나의 생각에 대한 반론을 제시해줘', '다른 관점에서 나의 생각을 분석해줘'와 같은 심화 질문을 통해 생각의 범위를 넓혀요. 혼자 해결하기 어려운 복잡한 데이터나 추상적인 개념을 이해할 때는 생성형 AI를 보조도구로 활용하여 깊이를 더해요.",
  },
  {
    id: 5,
    label: '안전과 관계',
    badges: [{ text: '안전성', color: 'badge-blue' }],
    title: '데이터 보안과 정서적 자립을 통해 디지털 시민성을 완성해요.',
    body: '나 또는 타인의 민감한 정보를 생성형 AI에 입력하지 않으며, 공용기기 로그아웃 등 기본 보안 수칙을 잘 지켜요. 생성형 AI가 주는 편리함이 인위적 공간에 매몰되지 않도록 정서 주체성을 잃지 않도록 주의해요. 선생님 또는 친구와의 실제적인 교류와 토론을 통해 건강한 자아를 확립하고 정서적 독립을 유지해요.',
  },
  {
    id: 6,
    label: '투명성·윤리',
    badges: [{ text: '투명성', color: 'badge-yellow' }],
    title: '생성형 AI 활용 사실을 투명하게 공개하며 학술적 정직성을 실천해요.',
    body: '어떤 단계에서 어떤 생성형 AI를 사용했는지, 프롬프트는 무엇이었는지 명확히 기록해요. 생성형 AI의 도움을 받은 부분을 투명하게 밝힘으로써 자신의 노력이 들어간 부분과 생성형 AI의 기여를 구분하고, 표절 시비로부터 나의 학문적 정당성을 보호해요.',
  },
];

export function EthicsGate({ onComplete }) {
  return (
    <div className="ethics-gate">
      <div className="ethics-gate-inner">
        <header className="ethics-header">
          <p className="ethics-subtitle">본 활동을 시작하기 전, 아래 핵심 가이드를 읽어주세요.</p>
          <h1 className="ethics-title">생성형 AI 윤리 핵심 가이드</h1>
        </header>

        <div className="ethics-grid">
          {GUIDES.map(guide => (
            <div key={guide.id} className="ethics-card">
              <div className="ethics-card-top">
                <span className="ethics-guide-num">가이드 {guide.id}</span>
                <span className="ethics-guide-label">{guide.label}</span>
                <div className="ethics-badges">
                  {guide.badges.map(b => (
                    <span key={b.text} className={`ethics-badge ${b.color}`}>{b.text}</span>
                  ))}
                </div>
              </div>
              <p className="ethics-card-title">{guide.title}</p>
              <p className="ethics-card-body">{guide.body}</p>
            </div>
          ))}
        </div>

        <div className="ethics-footer">
          <button className="ethics-pledge-btn" onClick={onComplete}>
            나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
          </button>
        </div>
      </div>
    </div>
  );
}
