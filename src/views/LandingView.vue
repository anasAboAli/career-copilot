<template>
  <main class="landing-page">
    <LangSwitch />

    <section class="landing-hero">
      <div class="landing-hero-ink">
        <div class="eyebrow">
          career-copilot / ai resume builder
        </div>

        <h1 class="landing-headline">
          {{ lang === 'ar' ? 'أنشئ سيرة ذاتية أفضل' : 'Build a better resume.' }}
        </h1>

        <p class="landing-sub">
          {{
            lang === 'ar'
              ? 'أنشئ سيرة ذاتية احترافية باستخدام الذكاء الاصطناعي، مع معاينة مباشرة، ودعم العربية والإنجليزية، وتصدير PDF.'
              : 'Create a professional resume with AI-powered writing, live preview, bilingual support, and instant PDF export.'
          }}
        </p>

        <div class="landing-actions">
          <RouterLink class="cta" to="/register">
            {{ lang === 'ar' ? 'ابدأ الآن ←' : 'Get started →' }}
          </RouterLink>

          <RouterLink class="landing-login-link" to="/login">
            {{
              lang === 'ar'
                ? 'لديك حساب بالفعل؟'
                : 'Already have an account?'
            }}
          </RouterLink>
        </div>
      </div>

      <div class="landing-hero-paper">
        <div class="landing-preview">
          <div class="landing-preview-name">
            Anas Alherthani
          </div>

          <div class="landing-preview-role">
            Web Developer
          </div>

          <div class="landing-preview-rule"></div>

          <div class="landing-preview-section">
            <span>SUMMARY</span>
          </div>

          <div class="landing-preview-lines">
            <span></span>
            <span></span>
            <span class="short"></span>
          </div>

          <div class="landing-preview-section">
            <span>EXPERIENCE</span>
          </div>

          <div class="landing-preview-item">
            <strong>Senior Web Developer</strong>
            <small>2021 — Present</small>
          </div>

          <div class="landing-preview-lines">
            <span></span>
            <span class="medium"></span>
          </div>

          <div class="landing-preview-item">
            <strong>Frontend Developer</strong>
            <small>2019 — 2021</small>
          </div>

          <div class="landing-preview-lines">
            <span></span>
            <span class="short"></span>
          </div>
        </div>
      </div>

      <div class="seam"></div>
    </section>

    <section class="landing-features">
      <div class="landing-section-intro">
        <div class="eyebrow">
          {{ lang === 'ar' ? 'لماذا Career Copilot' : 'Why Career Copilot' }}
        </div>

        <h2>
          {{
            lang === 'ar'
              ? 'كل ما تحتاجه لبناء سيرة أقوى.'
              : 'Everything you need to build a stronger resume.'
          }}
        </h2>
      </div>

      <div class="landing-feature-grid">
        <article class="landing-feature-card">
          <span class="landing-feature-number">01</span>

          <h3>
            {{
              lang === 'ar'
                ? 'كتابة مدعومة بالذكاء الاصطناعي'
                : 'AI-Powered Writing'
            }}
          </h3>

          <p>
            {{
              lang === 'ar'
                ? 'حسّن الملخص والخبرات المهنية بصياغة أكثر احترافية.'
                : 'Polish your summary and experience with stronger professional wording.'
            }}
          </p>
        </article>

        <article class="landing-feature-card">
          <span class="landing-feature-number">02</span>

          <h3>
            {{ lang === 'ar' ? 'معاينة مباشرة' : 'Live Preview' }}
          </h3>

          <p>
            {{
              lang === 'ar'
                ? 'شاهد شكل سيرتك الذاتية يتغير مباشرة أثناء الكتابة.'
                : 'See your resume update instantly while you write.'
            }}
          </p>
        </article>

        <article class="landing-feature-card">
          <span class="landing-feature-number">03</span>

          <h3>
            {{
              lang === 'ar'
                ? 'العربية والإنجليزية'
                : 'Bilingual & RTL'
            }}
          </h3>

          <p>
            {{
              lang === 'ar'
                ? 'دعم حقيقي للعربية والإنجليزية مع اتجاه RTL وLTR.'
                : 'True Arabic and English support with RTL and LTR layouts.'
            }}
          </p>
        </article>

        <article class="landing-feature-card">
          <span class="landing-feature-number">04</span>

          <h3>
            {{ lang === 'ar' ? 'تصدير PDF' : 'Instant PDF Export' }}
          </h3>

          <p>
            {{
              lang === 'ar'
                ? 'صدّر سيرتك الذاتية كملف PDF جاهز للمشاركة والتقديم.'
                : 'Export a polished PDF ready to share and apply with.'
            }}
          </p>
        </article>
      </div>
    </section>

    <section class="landing-how">
  <div class="landing-section-intro">
    <div class="eyebrow">
      {{ lang === 'ar' ? 'كيف يعمل' : 'How it works' }}
    </div>

    <h2>
      {{
        lang === 'ar'
          ? 'أنشئ سيرتك في ثلاث خطوات.'
          : 'Build your resume in three steps.'
      }}
    </h2>
  </div>

  <div class="landing-how-grid">
    <article class="landing-how-item">
      <span class="landing-feature-number">01</span>

      <h3>
        {{ lang === 'ar' ? 'أدخل معلوماتك' : 'Add your information' }}
      </h3>

      <p>
        {{
          lang === 'ar'
            ? 'أدخل معلوماتك الشخصية وخبراتك ومهاراتك ومشاريعك.'
            : 'Add your personal information, experience, skills, and projects.'
        }}
      </p>
    </article>

    <article class="landing-how-item">
      <span class="landing-feature-number">02</span>

      <h3>
        {{ lang === 'ar' ? 'حسّنها بالذكاء الاصطناعي' : 'Polish with AI' }}
      </h3>

      <p>
        {{
          lang === 'ar'
            ? 'حوّل النصوص الخام إلى صياغة مهنية أقوى باستخدام الذكاء الاصطناعي.'
            : 'Turn your raw content into stronger professional wording with AI.'
        }}
      </p>
    </article>

    <article class="landing-how-item">
      <span class="landing-feature-number">03</span>

      <h3>
        {{ lang === 'ar' ? 'صدّر سيرتك' : 'Export your resume' }}
      </h3>

      <p>
        {{
          lang === 'ar'
            ? 'راجع النتيجة مباشرة ثم صدّر سيرتك الذاتية كملف PDF.'
            : 'Review the result live, then export your resume as a PDF.'
        }}
      </p>
    </article>
  </div>
</section>

<section class="landing-final-cta">
  <div class="landing-final-cta-inner">
    <div class="eyebrow">
      {{ lang === 'ar' ? 'جاهز للبدء؟' : 'READY TO BUILD?' }}
    </div>

    <h2>
      {{
        lang === 'ar'
          ? 'أنشئ سيرتك الذاتية الآن.'
          : 'Build your resume today.'
      }}
    </h2>

    <p>
      {{
        lang === 'ar'
          ? 'أنشئ سيرة احترافية، حسّنها بالذكاء الاصطناعي، ثم صدّرها كملف PDF.'
          : 'Create a professional resume, polish it with AI, and export it as a PDF.'
      }}
    </p>

    <RouterLink class="cta" to="/register">
      {{ lang === 'ar' ? 'إنشاء حساب ←' : 'Create your account →' }}
    </RouterLink>
  </div>
</section>

  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import LangSwitch from '../components/LangSwitch.vue'
import { useResumeStore } from '../stores/resume.js'

const resume = useResumeStore()
const lang = computed(() => resume.lang)
</script>