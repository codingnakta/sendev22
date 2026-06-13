import { useState, useEffect } from 'react';

export function useStudents() {
  const [students, setStudents] = useState(() => {
    try {
      const s = localStorage.getItem('rp_students');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const [picked, setPicked] = useState(() => {
    try {
      const p = localStorage.getItem('rp_picked');
      return p ? JSON.parse(p) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('rp_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('rp_picked', JSON.stringify(picked));
  }, [picked]);

  function addStudent(name) {
    const n = name.trim();
    if (!n || students.some(s => s.name === n)) return false;
    setStudents(prev => [...prev, { id: crypto.randomUUID(), name: n }]);
    return true;
  }

  function addStudents(names) {
    const existing = new Set(students.map(s => s.name));
    const toAdd = [];
    for (const name of names) {
      const n = name.trim();
      if (n && !existing.has(n)) {
        existing.add(n);
        toAdd.push({ id: crypto.randomUUID(), name: n });
      }
    }
    if (toAdd.length > 0) setStudents(prev => [...prev, ...toAdd]);
    return toAdd.length;
  }

  function removeStudent(id) {
    setStudents(prev => prev.filter(s => s.id !== id));
    setPicked(prev => prev.filter(pid => pid !== id));
  }

  function markPicked(ids) {
    setPicked(prev => [...new Set([...prev, ...ids])]);
  }

  function resetPicked() {
    setPicked([]);
  }

  function getAvailable(allowRepeat) {
    if (allowRepeat) return students;
    return students.filter(s => !picked.includes(s.id));
  }

  return {
    students,
    picked,
    addStudent,
    addStudents,
    removeStudent,
    markPicked,
    resetPicked,
    getAvailable,
  };
}
