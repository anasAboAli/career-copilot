// src/i18n.js
export const translations = {
  ar: {
    title: "Career Copilot - منشئ السيرة الذاتية الذكي",
    jobRoleLabel: "المسمى الوظيفي",
    jobRolePlaceholder: "مثال: مطور واجهات أمامية، مدير تسويق...",
    customizingText: "✦ جاري تخصيص الأمثلة عبر الذكاء الاصطناعي...",
    summaryLabel: "الملخص المهني",
    skillsLabel: "المهارات الأساسية",
    toolsLabel: "الأدوات والشهادات",
    experienceLabel: "الخبرة العملية",
    projectLabel: "المشاريع المميزة",
    switchLang: "English",
    dir: "rtl"
  },
  en: {
    title: "Career Copilot - AI Resume Builder",
    jobRoleLabel: "Job Title / Role",
    jobRolePlaceholder: "e.g. Frontend Developer, Marketing Manager...",
    customizingText: "✦ Tailoring dynamic placeholders...",
    summaryLabel: "Professional Summary",
    skillsLabel: "Core Skills",
    toolsLabel: "Tools & Certifications",
    experienceLabel: "Work Experience",
    projectLabel: "Featured Projects",
    switchLang: "العربية",
    dir: "ltr"
  }
};

export function setLanguage(lang) {
  const config = translations[lang] || translations.ar;
  document.documentElement.lang = lang;
  document.documentElement.dir = config.dir; // تطبيق الاتجاه على الكود بالكامل
  return config;
}