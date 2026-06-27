import { useState } from 'react';
import { DocModal } from './DocModal';

export function Footer() {
  const [openDoc, setOpenDoc] = useState(null); // 'terms' | 'privacy' | null

  return (
    <>
      <footer className="app-footer">
        <div className="footer-links">
          <button className="footer-link" onClick={() => setOpenDoc('terms')}>이용약관</button>
          <span className="footer-divider" aria-hidden>|</span>
          <button className="footer-link" onClick={() => setOpenDoc('privacy')}>개인정보처리방침</button>
        </div>
        <p className="footer-manager">
          정보관리책임자: 윤다연 (미림마이스터고등학교 마이스터기획부 교사)
        </p>
        <p className="footer-copy">
          Copyright © 2026 윤다연. All rights reserved.
        </p>
      </footer>

      {openDoc && (
        <DocModal type={openDoc} onClose={() => setOpenDoc(null)} />
      )}
    </>
  );
}
