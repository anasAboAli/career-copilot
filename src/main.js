
const { createApp, reactive, ref, computed, onMounted, watch } = Vue;

const I18N = {
  en:{
    eyebrowInput:'career-copilot / input',
    eyebrowWorkbench:'the workbench',
    workbenchTitle:'Build on one side. Read it on the other.',
    workbenchDesc:'Every field updates the document live — there\'s no hidden "generate" step. Use Polish on any text field to let AI tighten your wording into resume-ready phrasing, whatever your field.',
    headline:'Stop writing your resume from a <em>blank page.</em>',
    sub:'Works for any profession. Feed in your raw experience — nursing, teaching, sales, engineering, anything — and watch it compile into a document that reads like you belong in the role.',
    ctaStart:'Start compiling',
    heroPlaceholderName:'Your Name Here',
    steps:['Personal','Summary','Experience','Skills','Projects'],
    fullName:'Full name', fullNamePh:'Jordan Rivera',
    targetRole:'Target role', targetRolePh:'e.g. Registered Nurse, Marketing Manager, Civil Engineer',
    email:'Email', location:'Location', locationPh:'City, Country',
    links:'Links (optional, comma separated)', linksPh:'linkedin.com/in/you, portfolio.com',
    summaryLabel:'Rough summary — write it however it comes out',
    summaryPh:'e.g. I\'ve been in customer support for 3 years, good at de-escalating angry callers, recently started training new hires...',
    polish:'✦ Polish with AI', compiling:'Compiling…', polishedLabel:'Polished',
    suggesting:'✦ Tailoring examples to this role…', suggestedFor:'✦ Examples tailored for',
    remove:'remove',
    expTitle:'Title & organization', expTitlePh:'e.g. Shift Supervisor, Riverside Cafe',
    period:'Period', periodPh:'Jan 2023 — Present',
    expDesc:'What you did (rough is fine)', expDescPh:'e.g. ran the morning shift, trained 4 new staff, cut wait times somehow',
    addExperience:'+ Add experience',
    coreSkills:'Core skills', coreSkillsPh:'e.g. Patient care, conflict resolution, budgeting',
    toolsSkills:'Tools & certifications', toolsSkillsPh:'e.g. Excel, Epic EMR, PMP certified',
    projName:'Project / achievement name', projNamePh:'e.g. Community outreach program',
    projDesc:'One-line description', projDescPh:'e.g. Organized a fundraiser that reached 500 families',
    addProject:'+ Add project',
    back:'← Back', next:'Next →', exportPdf:'Export PDF',
    livePreview:'live preview',
    summarySection:'Summary', experienceSection:'Experience', skillsSection:'Skills', projectsSection:'Projects',
    contactPh:'email · location · links',
    emptyState:'Start typing on the left — this page compiles as you go.',
    footer:'career-copilot · MVP prototype · built with Vue 3'
  },
  ar:{
    eyebrowInput:'كاريير كوبايلوت / الإدخال',
    eyebrowWorkbench:'مساحة العمل',
    workbenchTitle:'ابنِ من جهة، واقرأ النتيجة من الجهة التانية',
    workbenchDesc:'كل حقل بتعبيه بيحدّث المستند فورًا — بدون أي خطوة "توليد" مخفية. استخدم زر "صياغة بالذكاء الاصطناعي" بأي حقل نصي لتحسين صياغتك، أيًا كان مجال عملك.',
    headline:'بلاش تبلش سيرتك الذاتية من <em>صفحة فاضية</em>',
    sub:'يناسب أي مهنة. حط خبرتك الحقيقية — تمريض، تعليم، مبيعات، هندسة، أي مجال — وشوفها تتحول لمستند احترافي يعكس فعلاً إنك تستاهل الفرصة.',
    ctaStart:'ابدأ الآن',
    heroPlaceholderName:'اسمك هون',
    steps:['بيانات شخصية','ملخص','خبرات','مهارات','مشاريع'],
    fullName:'الاسم الكامل', fullNamePh:'مثال: سارة أحمد',
    targetRole:'المسمى الوظيفي المستهدف', targetRolePh:'مثال: ممرضة، مدير تسويق، مهندس مدني',
    email:'البريد الإلكتروني', location:'الموقع', locationPh:'المدينة، الدولة',
    links:'روابط (اختياري، مفصولة بفاصلة)', linksPh:'linkedin.com/in/you, portfolio.com',
    summaryLabel:'ملخص مبدئي — اكتبه بأي شكل يجيك',
    summaryPh:'مثال: بشتغل بخدمة العملاء من 3 سنين، منيح بالتعامل مع الزبائن الغاضبين، وهلق بدرّب الموظفين الجداد...',
    polish:'✦ صياغة بالذكاء الاصطناعي', compiling:'جاري التحسين…', polishedLabel:'النسخة المحسّنة',
    suggesting:'✦ جاري تخصيص الأمثلة لهاي الوظيفة…', suggestedFor:'✦ أمثلة مخصصة لـ',
    remove:'حذف',
    expTitle:'المسمى الوظيفي والجهة', expTitlePh:'مثال: مشرف وردية، مقهى النهر',
    period:'الفترة', periodPh:'يناير 2023 — الآن',
    expDesc:'شو كنت تعمل (مسودة، ولا يهمك بالصياغة)', expDescPh:'مثال: كنت مسؤول عن وردية الصباح، درّبت 4 موظفين جداد، قللت وقت الانتظار',
    addExperience:'+ إضافة خبرة',
    coreSkills:'المهارات الأساسية', coreSkillsPh:'مثال: رعاية المرضى، حل النزاعات، إدارة الميزانية',
    toolsSkills:'الأدوات والشهادات', toolsSkillsPh:'مثال: Excel، Epic EMR، شهادة PMP',
    projName:'اسم المشروع / الإنجاز', projNamePh:'مثال: برنامج توعية مجتمعي',
    projDesc:'وصف بسطر واحد', projDescPh:'مثال: نظّمت حملة تبرعات وصلت لـ 500 عائلة',
    addProject:'+ إضافة مشروع',
    back:'→ رجوع', next:'التالي ←', exportPdf:'تصدير PDF',
    livePreview:'معاينة مباشرة',
    summarySection:'الملخص', experienceSection:'الخبرات', skillsSection:'المهارات', projectsSection:'المشاريع',
    contactPh:'البريد · الموقع · الروابط',
    emptyState:'ابدأ الكتابة على الجهة التانية — هاي الصفحة بتتحدث معك أول بأول.',
    footer:'career-copilot · نموذج أولي (MVP) · مبني بـ Vue 3'
  }
};

const ROLE_SAMPLES_EN = ['Frontend Developer','Registered Nurse','Marketing Manager','Civil Engineer','High School Teacher'];
const ROLE_SAMPLES_AR = ['مطور واجهات أمامية','ممرضة مسجلة','مدير تسويق','مهندس مدني','معلم ثانوي'];

createApp({
  setup(){
    const lang = ref('ar');
    const dir = computed(()=> lang.value==='ar' ? 'rtl' : 'ltr');
    const t = computed(()=> I18N[lang.value]);
    watch(lang, ()=>{
      document.documentElement.setAttribute('data-lang', lang.value);
      document.documentElement.setAttribute('lang', lang.value);
      document.documentElement.setAttribute('dir', dir.value);
      document.documentElement.classList.toggle('rtl', lang.value==='ar');
    }, {immediate:true});

    const stepIndex = ref(0);
    const polishing = ref(null);
    const appSection = ref(null);

    const data = reactive({
      name:'', role:'', email:'', location:'', links:'',
      summaryRaw:'', summaryPolished:'',
      experience:[{title:'',period:'',raw:'',polished:''}],
      skillsCore:'', skillsTools:'',
      projects:[{name:'',desc:''}]
    });

    const allSkills = computed(() =>
      (data.skillsCore + ',' + data.skillsTools).split(',').map(s=>s.trim()).filter(Boolean)
    );
    const hasExperience = computed(()=> data.experience.some(e=>e.title||e.raw));
    const hasProjects = computed(()=> data.projects.some(p=>p.name));

    // ---- role-aware dynamic placeholders ----
    const PH_KEYS = ['summaryPh','coreSkillsPh','toolsSkillsPh','expTitlePh','expDescPh','projNamePh','projDescPh'];
    const dynamicPh = ref(null);      // suggestions for the current data.role + lang
    const suggested = ref(false);
    const suggesting = ref(false);
    const phCache = {};               // key: "lang|role" -> suggestion object
    let roleDebounce = null;

    const ph = computed(()=>{
      const base = {};
      PH_KEYS.forEach(k => base[k] = t.value[k]);
      return dynamicPh.value ? { ...base, ...dynamicPh.value } : base;
    });

    async function fetchRoleSuggestions(role, langCode){
      const key = langCode + '|' + role.trim().toLowerCase();
      if(phCache[key]){ dynamicPh.value = phCache[key]; suggested.value = true; return; }
      suggesting.value = true;
      try{
        const langNote = langCode==='ar' ? 'Write every value in Arabic.' : 'Write every value in English.';
        const prompt = `You are generating short EXAMPLE placeholder text for a resume-builder form, tailored to a specific job role. ${langNote}
Role: "${role}"

Return ONLY raw JSON (no markdown fences, no commentary) with exactly these keys, each a short realistic example string a real person in this role might write:
{
  "summaryPh": "a 1-sentence rough self-summary a person in this role might type",
  "coreSkillsPh": "3-5 comma-separated core skills typical for this role",
  "toolsSkillsPh": "3-5 comma-separated tools/software/certifications typical for this role",
  "expTitlePh": "an example job title + organization for this role",
  "expDescPh": "a short rough description (not polished) of daily duties in this role",
  "projNamePh": "an example project or achievement name relevant to this role",
  "projDescPh": "a one-line description of that example project"
}`;
        const text = await callClaude(prompt);
        const cleaned = text.replace(/^```json/i,'').replace(/```$/,'').trim();
        const parsed = JSON.parse(cleaned);
        const result = {};
        PH_KEYS.forEach(k => { if(parsed[k]) result[k] = parsed[k]; });
        phCache[key] = result;
        dynamicPh.value = result;
        suggested.value = true;
      } catch(e){
        // silently fall back to static placeholders on any parse/network failure
      } finally{
        suggesting.value = false;
      }
    }

    watch(() => data.role, (role) => {
      clearTimeout(roleDebounce);
      suggested.value = false;
      if(!role || role.trim().length < 3){ dynamicPh.value = null; return; }
      roleDebounce = setTimeout(()=> fetchRoleSuggestions(role, lang.value), 700);
    });
    watch(lang, () => { if(data.role && data.role.trim().length >= 3) fetchRoleSuggestions(data.role, lang.value); });

    // rotating role sample in hero paper side
    const roleSampleIdx = ref(0);
    const heroRoleSample = computed(()=> lang.value==='ar' ? ROLE_SAMPLES_AR[roleSampleIdx.value] : ROLE_SAMPLES_EN[roleSampleIdx.value]);
    setInterval(()=>{ roleSampleIdx.value = (roleSampleIdx.value+1) % ROLE_SAMPLES_EN.length; }, 2600);

    // typing animation in hero terminal — rotates through professions
    const typedHtml = ref('');
    function buildScript(){
      const role = heroRoleSample.value;
      if(lang.value==='ar'){
        return `<span class="k">بيانات</span> = {\n  الدور: <span class="s">"${role}"</span>,\n  الحالة: <span class="s">"جاهز للتقديم"</span>\n}`;
      }
      return `<span class="k">const</span> profile = {\n  role: <span class="s">"${role}"</span>,\n  status: <span class="s">"ready to apply"</span>\n}`;
    }
    function revealSlice(html, count){
      let out=''; let visible=0; let inTag=false;
      for(let ch of html){
        if(ch==='<') inTag=true;
        if(!inTag){ if(visible>=count) break; visible++; }
        out+=ch;
        if(ch==='>') inTag=false;
      }
      return out;
    }
    function runTyping(){
      const raw = buildScript();
      const plain = raw.replace(/<[^>]*>/g,'');
      let i=0; typedHtml.value='';
      const timer = setInterval(()=>{
        i++;
        typedHtml.value = revealSlice(raw,i) + '<span class="cursor"></span>';
        if(i>=plain.length) clearInterval(timer);
      }, 26);
    }
    onMounted(runTyping);
    watch([lang, roleSampleIdx], runTyping);

    function scrollToApp(){ document.querySelector('.app').scrollIntoView({behavior:'smooth'}); }
    function printDoc(){ window.print(); }

    async function callClaude(prompt){
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:400, messages:[{role:"user", content: prompt}] })
      });
      const json = await res.json();
      const block = (json.content||[]).find(b=>b.type==='text');
      return block ? block.text.trim() : '';
    }

    async function polish(field){
      if(field==='summary'){
        if(!data.summaryRaw.trim()) return;
        polishing.value='summary';
        const langNote = lang.value==='ar' ? 'Respond in Arabic.' : 'Respond in English.';
        try{
          data.summaryPolished = await callClaude(
            `Rewrite this into a crisp, first-person professional resume summary (2-3 sentences, no fluff, no markdown, plain text only). This could be for any profession, so keep it natural to the field described. ${langNote}\n\n${data.summaryRaw}`
          );
        } catch(e){ data.summaryPolished = data.summaryRaw; }
        polishing.value=null;
      }
    }
    async function polishExp(i){
      const exp = data.experience[i];
      if(!exp.raw.trim()) return;
      polishing.value='exp'+i;
      const langNote = lang.value==='ar' ? 'Respond in Arabic.' : 'Respond in English.';
      try{
        exp.polished = await callClaude(
          `Rewrite this into 2-3 crisp resume bullet points as plain text (one per line, start each with a strong verb, no markdown symbols, no asterisks). This could be any profession — match the tone to the role described. ${langNote}\n\nRole: ${exp.title}\n${exp.raw}`
        );
      } catch(e){ exp.polished = exp.raw; }
      polishing.value=null;
    }

    return { lang, dir, t, steps: computed(()=>t.value.steps), stepIndex, data, allSkills,
             hasExperience, hasProjects, heroRoleSample, typedHtml, ph, suggesting, suggested,
             scrollToApp, printDoc, polish, polishExp, polishing, appSection };
  }
}).mount('#app');
