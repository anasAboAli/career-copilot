export function buildResumeHTML(data, lang) {
  const isArabic = lang === 'ar'

  const name = escapeHTML(
    data.name || ''
  )

  const role = escapeHTML(
    data.role || ''
  )

  const contact = [
    data.email,
    data.location,
    data.links
  ]
    .filter(Boolean)
    .map(escapeHTML)
    .join(' · ')

  return `
<!DOCTYPE html>
<html
  lang="${isArabic ? 'ar' : 'en'}"
  dir="${isArabic ? 'rtl' : 'ltr'}"
>
<head>
  <meta charset="UTF-8" />

  <title>
    ${escapeHTML(data.name || 'Resume')}
  </title>

  <style>
@page {
  size: A4;
  margin: 25mm 20mm 12mm 20mm;
}

@page :first {
  margin-top: 15mm;
}

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #14171f;
    }

    body {
      font-family: ${
        isArabic
          ? '"Noto Kufi Arabic", Arial, sans-serif'
          : 'Inter, Arial, sans-serif'
      };

      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .resume {
  width: 100%;
  min-height: 0;
  padding: 0;
  background: #ffffff;
}

.continuation-name {
  color: #14171f;
  font-weight: 700;
}

.continuation-label {
  color: #7c6ff0;
  font-size: 7pt;
  font-weight: 600;
}

.header {
  position: relative;
  z-index: 2;

  background: #ffffff;

  border-bottom: 1.5px solid #14171f;

  padding-bottom: 6mm;

  margin-bottom: 6mm;

  transform: translateY(-15mm);
  margin-top: 15mm;
}

.name {
  margin: 0;
  font-size: 26pt;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.role {
  margin-top: 3mm;
  color: #7c6ff0;
  font-size: 11pt;
  line-height: 1.4;
  font-weight: 700;
}

.contact {
  margin-top: 3.5mm;
  color: #565d6d;
  font-size: 8pt;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.accent-line {
  width: 24mm;
  height: 2.5px;
  margin-top: 4mm;
  background: #7c6ff0;
}

.section {
  margin-top: 6mm;
  break-inside: auto;
}

.section-title {
  margin: 0 0 3.5mm;
  color: #14171f;
  font-size: 9pt;
  line-height: 1.3;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  break-after: avoid;
}

.section-title::after {
  content: '';
  display: block;
  width: 12mm;
  height: 1.5px;
  margin-top: 2mm;
  background: #7c6ff0;
}

.summary {
  color: #343a46;
  font-size: 9.5pt;
  line-height: 1.8;
}

.experience-item {
  margin-top: 3.5mm;
  padding-inline-start: 4mm;
  border-inline-start: 2px solid #e6e3fb;
  break-inside: avoid;
}

.experience-head {
  display: flex;
  justify-content: space-between;
  gap: 8mm;
  align-items: baseline;
}

.experience-title {
  font-size: 10.5pt;
  font-weight: 800;
  line-height: 1.45;
}

.experience-period {
  flex-shrink: 0;
  color: #7c6ff0;
  font-size: 8pt;
  font-weight: 700;
  white-space: nowrap;
}

.experience-body {
  margin-top: 2mm;
  color: #343a46;
  font-size: 9pt;
  line-height: 1.7;
  white-space: pre-line;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2mm;
  margin-top: 4mm;
}

.skill-tag {
  display: inline-block;
  padding: 1.5mm 3mm;
  border: 1px solid #d9dbe2;
  border-radius: 4mm;
  color: #343a46;
  background: #f7f7f9;
  font-size: 8pt;
  line-height: 1.4;
}

.project-item {
  margin-top: 3.5mm;
  break-inside: avoid;
}

.project-name {
  font-size: 9.5pt;
  font-weight: 800;
  line-height: 1.4;
}

.project-description {
  margin-top: 2mm;
  color: #343a46;
  font-size: 9pt;
  line-height: 1.7;
}

@media print {
  .experience-item,
  .project-item {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .section-title {
    break-after: avoid;
    page-break-after: avoid;
  }
}

.project-link {
  margin-top: 6px;
  font-size: 11px;
}

.project-link a {
  color: #5b5bd6;
  text-decoration: none;
  word-break: break-all;
}
  
  </style>
</head>

<body>

  <main class="resume">

    <header class="header">

      <h1 class="name">
        ${name}
      </h1>

      ${
        role
          ? `
            <div class="role">
              ${role}
            </div>
          `
          : ''
      }

      ${
        contact
          ? `
            <div class="contact">
              ${contact}
            </div>
          `
          : ''
      }

      <div class="accent-line"></div>

    </header>

    ${
  data.summaryPolished || data.summaryRaw
    ? `
      <section class="section">
        <h2 class="section-title">
          ${isArabic ? 'الملخص' : 'Summary'}
        </h2>

        <div class="summary">
          ${escapeHTML(
            data.summaryPolished ||
            data.summaryRaw
          )}
        </div>
      </section>
    `
    : ''
}

${
  data.experience?.some(
    exp => exp.title || exp.raw
  )
    ? `
      <section class="section">
        <h2 class="section-title">
          ${isArabic ? 'الخبرات' : 'Experience'}
        </h2>

        ${data.experience
          .filter(exp => exp.title || exp.raw)
          .map(exp => {
            const title = escapeHTML(
              exp.title || ''
            )

            const period = escapeHTML(
              exp.period || ''
            )

            const body = escapeHTML(
              exp.polished || exp.raw || ''
            )

            return `
              <article class="experience-item">
                <div class="experience-head">

                  <div class="experience-title">
                    ${title}
                  </div>

                  ${
                    period
                      ? `
                        <div class="experience-period">
                          ${period}
                        </div>
                      `
                      : ''
                  }

                </div>

                ${
                  body
                    ? `
                      <div class="experience-body">
                        ${body}
                      </div>
                    `
                    : ''
                }
              </article>
            `
          })
          .join('')}
      </section>
    `
    : ''
}

${
  data.skillsCore || data.skillsTools
    ? `
      <section class="section">
        <h2 class="section-title">
          ${isArabic ? 'المهارات' : 'Skills'}
        </h2>

        <div class="skills-list">
          ${[
            data.skillsCore,
            data.skillsTools
          ]
            .join(',')
            .split(',')
            .map(skill => skill.trim())
            .filter(Boolean)
            .map(skill => `
              <span class="skill-tag">
                ${escapeHTML(skill)}
              </span>
            `)
            .join('')}
        </div>
      </section>
    `
    : ''
}

${
  data.projects?.some(
    project => project.name
  )
    ? `
      <section class="section">
        <h2 class="section-title">
          ${isArabic ? 'المشاريع' : 'Projects'}
        </h2>

        ${data.projects
          .filter(project => project.name)
          .map(project => {
            const name = escapeHTML(
              project.name
            )

            const description = escapeHTML(
              project.desc || ''
            )

            return `
              <article class="project-item">
                <div class="project-name">
                  ${name}
                </div>

                ${
                  description
                    ? `
                      <div class="project-description">
                        ${description}
                      </div>
                    `
                    : ''
                }

                ${
  project.link
    ? `
      <div class="project-link">
        <a href="${escapeHTML(project.link)}">
          ${escapeHTML(project.link)}
        </a>
      </div>
    `
    : ''
}

              </article>
            `
          })
          .join('')}
      </section>
    `
    : ''
}

  </main>

</body>
</html>
`
}

function escapeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}