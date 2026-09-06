const ROLE_SAMPLES_EN = [
  'Frontend Developer',
  'Registered Nurse',
  'Marketing Manager',
  'Civil Engineer',
  'High School Teacher'
]

const ROLE_SAMPLES_AR = [
  'مطور واجهات أمامية',
  'ممرض مسجل',
  'مدير تسويق',
  'مهندس مدني',
  'معلم مدرسة ثانوية'
]

const translations = {
  en: {
    eyebrowInput: 'career-copilot / input',
    eyebrowWorkbench: 'the workbench',
    workbenchTitle: 'Build on one side. Read it on the other.',
    workbenchDesc:
      "Every field updates the document live — there's no hidden \"generate\" step. Use Polish on any text field to let AI tighten your wording into resume-ready phrasing, whatever your field.",
    headline:
      'Stop writing your resume from a <em>blank page.</em>',
    sub:
      'Works for any profession. Feed in your raw experience — nursing, teaching, sales, engineering, anything — and watch it compile into a document that reads like you belong in the role.',
    ctaStart: 'Start compiling',
    heroPlaceholderName: 'Your Name Here',

    steps: [
      'Personal',
      'Summary',
      'Experience',
      'Skills',
      'Projects'
    ],

    fullName: 'Full name',
    fullNamePh: 'Jordan Rivera',

    targetRole: 'Target role',
    targetRolePh:
      'e.g. Registered Nurse, Marketing Manager, Civil Engineer',

    email: 'Email',

    location: 'Location',
    locationPh: 'City, Country',

    links: 'Links (optional, comma separated)',
    linksPh:
      'linkedin.com/in/you, portfolio.com',

    summaryLabel:
      'Rough summary — write it however it comes out',

    summaryPh:
      "e.g. I've been in customer support for 3 years, good at de-escalating angry callers, recently started training new hires...",

    polish: '✦ Polish with AI',
    compiling: 'Compiling…',
    polishedLabel: 'Polished',

    suggesting:
      '✦ Tailoring examples to this role…',

    suggestedFor:
      '✦ Examples tailored for',

    remove: 'remove',

    expTitle: 'Title & organization',
    expTitlePh:
      'e.g. Shift Supervisor, Riverside Cafe',

    period: 'Period',
    periodPh: 'Jan 2023 — Present',

    expDesc: 'What you did (rough is fine)',
    expDescPh:
      'e.g. ran the morning shift, trained 4 new staff, cut wait times somehow',

    addExperience: '+ Add experience',

    coreSkills: 'Core skills',
    coreSkillsPh:
      'e.g. Patient care, conflict resolution, budgeting',

    toolsSkills: 'Tools & certifications',
    toolsSkillsPh:
      'e.g. Excel, Epic EMR, PMP certified',

    projName: 'Project / achievement name',
    projNamePh:
      'e.g. Community outreach program',

    projDesc: 'One-line description',
    projDescPh:
      'e.g. Organized a fundraiser that reached 500 families',

    projLink: 'Project link',
    projLinkPh: 'https://example.com',

    addProject: '+ Add project',

    back: '← Back',
    next: 'Next →',
    exportPdf: 'Export PDF',

    livePreview: 'live preview',

    summarySection: 'Summary',
    experienceSection: 'Experience',
    skillsSection: 'Skills',
    projectsSection: 'Projects',

    contactPh: 'email · location · links',

    emptyState:
      'Start typing on the left — this page compiles as you go.',

    footer:
      'career-copilot · MVP prototype · built with Vue 3',

    reset: 'Reset',
    resetConfirm: 'Are you sure you want to clear your resume and start over?',
  
    loginTitle: 'Welcome to Career Copilot',
    authEmail: 'Email',
    authPassword: 'Password',
    authLogin: 'Login',
    authRegister: 'Register',
    authLoading: 'Loading...',
    authLoginSuccess: 'Login successful.',
    authRegisterSuccess: 'Registration successful.',

    registerTitle: 'Create your Career Copilot account',
registerSubtitle:
  'Save your resume securely and access it from anywhere.',

  loginSubtitle:
  'Sign in to access your saved resume.',

  authNoAccount: "Don't have an account?",
authCreateAccount: 'Create an account',

authHaveAccount: 'Already have an account?',
authLoginLink: 'Log in',
authLogout: 'Logout',

  },

  ar: {
    eyebrowInput: 'career-copilot / الإدخال',
    eyebrowWorkbench: 'مساحة العمل',

    workbenchTitle:
      'اكتب من جهة، واقرأ النتيجة من الجهة الأخرى.',

    workbenchDesc:
      'كل حقل يحدّث المستند مباشرة — لا توجد خطوة "توليد" مخفية. استخدم "صياغة بالذكاء الاصطناعي" على أي حقل نصي لتحسين صياغتك وتحويلها إلى نص مناسب للسيرة الذاتية، مهما كان مجالك.',

    headline:
      'توقف عن كتابة سيرتك الذاتية من <em>صفحة فارغة.</em>',

    sub:
      'يعمل مع أي مهنة. أدخل خبرتك الأولية — التمريض، التعليم، المبيعات، الهندسة، أي مجال — وشاهدها تتحول إلى مستند يعكس ملاءمتك للوظيفة.',

    ctaStart: 'ابدأ البناء',

    heroPlaceholderName: 'اسمك هنا',

    steps: [
      'البيانات الشخصية',
      'الملخص',
      'الخبرات',
      'المهارات',
      'المشاريع'
    ],

    fullName: 'الاسم الكامل',
    fullNamePh: 'مثال: ياسر أحمد',

    targetRole: 'المسمى الوظيفي المستهدف',
    targetRolePh:
      'مثال: ممرض، مدير تسويق، مهندس مدني',

    email: 'البريد الإلكتروني',

    location: 'الموقع',
    locationPh: 'المدينة، الدولة',

    links: 'الروابط (اختياري، مفصولة بفواصل)',
    linksPh:
      'linkedin.com/in/you, portfolio.com',

    summaryLabel:
      'الملخص الأولي — اكتبه بالطريقة التي تأتيك',

    summaryPh:
      'مثال: لدي 3 سنوات من الخبرة في خدمة العملاء، أجيد التعامل مع العملاء الغاضبين، وبدأت مؤخرًا بتدريب الموظفين الجدد...',

    polish: '✦ صياغة بالذكاء الاصطناعي',
    compiling: 'جاري الصياغة…',
    polishedLabel: 'الصياغة المحسّنة',

    suggesting:
      '✦ جارٍ تخصيص الأمثلة لهذه الوظيفة…',

    suggestedFor:
      '✦ أمثلة مخصصة لـ',

    remove: 'حذف',

    expTitle: 'المسمى الوظيفي والمؤسسة',
    expTitlePh:
      'مثال: مشرف مناوبة، مقهى ريفرسايد',

    period: 'الفترة',
    periodPh: 'يناير 2023 — حتى الآن',

    expDesc: 'ماذا فعلت؟ (الصياغة الأولية تكفي)',
    expDescPh:
      'مثال: أدرت المناوبة الصباحية، دربت 4 موظفين جدد، وخفضت وقت الانتظار',

    addExperience: '+ إضافة خبرة',

    coreSkills: 'المهارات الأساسية',
    coreSkillsPh:
      'مثال: رعاية المرضى، حل النزاعات، إعداد الميزانيات',

    toolsSkills: 'الأدوات والشهادات',
    toolsSkillsPh:
      'مثال: Excel، Epic EMR، شهادة PMP',

    projName: 'اسم المشروع / الإنجاز',
    projNamePh:
      'مثال: برنامج للتواصل المجتمعي',

    projDesc: 'وصف في سطر واحد',
    projDescPh:
      'مثال: نظمت حملة تبرعات وصلت إلى 500 عائلة',

    projLink: 'رابط المشروع',
projLinkPh: 'https://example.com',

    addProject: '+ إضافة مشروع',

    back: '← رجوع',
    next: 'التالي →',
    exportPdf: 'تصدير PDF',

    livePreview: 'المعاينة المباشرة',

    summarySection: 'الملخص',
    experienceSection: 'الخبرات',
    skillsSection: 'المهارات',
    projectsSection: 'المشاريع',

    contactPh:
      'البريد الإلكتروني · الموقع · الروابط',

    emptyState:
      'ابدأ بالكتابة على اليسار — ستُبنى الصفحة أمامك مباشرة.',

    footer:
      'career-copilot · نموذج MVP · مبني باستخدام Vue 3',

    reset: 'إعادة ضبط',
    resetConfirm: 'هل أنت متأكد أنك تريد مسح بيانات السيرة الذاتية والبدء من جديد؟',
  
    loginTitle: 'مرحبًا بك في Career Copilot',
    authEmail: 'البريد الإلكتروني',
    authPassword: 'كلمة المرور',
    authLogin: 'تسجيل الدخول',
    authRegister: 'إنشاء حساب',
    authLoading: 'جارٍ التحميل...',
    authLoginSuccess: 'تم تسجيل الدخول بنجاح.',
    authRegisterSuccess: 'تم إنشاء الحساب بنجاح.',

    registerTitle: 'أنشئ حسابك في Career Copilot',
registerSubtitle:
  'احفظ سيرتك الذاتية بأمان واصل إليها من أي مكان.',

    loginSubtitle:
  'سجّل الدخول للوصول إلى سيرتك الذاتية المحفوظة.',

  authNoAccount: 'ليس لديك حساب؟',
authCreateAccount: 'إنشاء حساب',

authHaveAccount: 'لديك حساب بالفعل؟',
authLoginLink: 'تسجيل الدخول',

authLogout: 'تسجيل الخروج',

  }
}

function setLanguage(lang) {
  const config =
    translations[lang] ||
    translations.ar

  document.documentElement.lang =
    lang

  document.documentElement.dir =
    lang === 'ar'
      ? 'rtl'
      : 'ltr'

  return config
}

export {
  translations as I18N,
  ROLE_SAMPLES_EN,
  ROLE_SAMPLES_AR,
  setLanguage
}