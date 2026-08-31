// src/useDynamicPlaceholders.js
import { useState, useEffect } from 'react';

const defaultPlaceholders = {
  ar: {
    summary: "اكتب نبذة مختصرة عن خبراتك وإنجازاتك...",
    skills: "JavaScript, HTML, CSS, React...",
    tools: "Git, VS Code, Figma...",
    expTitle: "مطور ويب - شركة التقنية",
    expDesc: "تطوير واجهات المستخدم وتحسين الأداء...",
    projTitle: "نظام إدارة المكتبات",
    projDesc: "منصة ويب متكاملة لإدارة الكتب والمستعيرين..."
  },
  en: {
    summary: "Write a brief summary of your skills and accomplishments...",
    skills: "JavaScript, HTML, CSS, React...",
    tools: "Git, VS Code, Figma...",
    expTitle: "Web Developer - Tech Co",
    expDesc: "Developed UI components and optimized performance...",
    projTitle: "Library Management System",
    projDesc: "A complete web app to manage books and users..."
  }
};

export function useDynamicPlaceholders(role, lang) {
  const [placeholders, setPlaceholders] = useState(defaultPlaceholders[lang]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!role || role.trim().length < 3) {
      setPlaceholders(defaultPlaceholders[lang]);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:3001/api/suggest-placeholders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role, lang })
        });
        const data = await response.json();

        if (data.suggestions) {
          setPlaceholders(data.suggestions);
        } else {
          setPlaceholders(defaultPlaceholders[lang]);
        }
      } catch (err) {
        console.warn('Fallback to static placeholders due to network error');
        setPlaceholders(defaultPlaceholders[lang]);
      } finally {
        setLoading(false);
      }
    }, 1500); // Debouncing delay 1.5s

    return () => clearTimeout(handler);
  }, [role, lang]);

  return { placeholders, loading };
}