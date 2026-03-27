import { useLanguage } from '../../i18n'
import styles from './DocumentPage.module.scss'

interface Section {
  title?: string
  content: string | string[]
  type?: 'text' | 'list'
}

interface DocumentPageProps {
  title: string
  subtitle?: string
  updatedAt?: string
  sections: Section[]
}

export default function DocumentPage({ title, subtitle, updatedAt, sections }: DocumentPageProps) {
  const { t } = useLanguage()
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.badge}>{t('doc_badge')}</span>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {updatedAt && <p className={styles.updated}>{t('doc_updated')} {updatedAt}</p>}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {sections.map((section, i) => (
            <div key={i} className={styles.section}>
              {section.title && <h2 className={styles.sectionTitle}>{section.title}</h2>}
              {section.type === 'list' && Array.isArray(section.content) ? (
                <ul className={styles.list}>
                  {section.content.map((item, j) => (
                    <li key={j} className={styles.listItem}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.text}>{Array.isArray(section.content) ? section.content.join(' ') : section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
