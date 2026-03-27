import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { useLanguage } from '../../i18n'
import styles from './Vacancies.module.scss'

export default function Vacancies() {
  const { vacancies } = useData()
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)

  const published = vacancies.filter(v => v.published)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('vac_badge')}</span>
          <h1 className={styles.title}>{t('vac_title')}</h1>
          <p className={styles.subtitle}>{t('vac_subtitle')}</p>
        </div>
      </div>

      <div className={styles.content}>
        {published.length === 0 ? (
          <p className={styles.empty}>{t('vac_empty')}</p>
        ) : (
          <div className={styles.list}>
            {published.map(vac => {
              const isOpen = expanded === vac.id
              return (
                <div key={vac.id} className={styles.card}>
                  <button
                    className={styles.cardHeader}
                    onClick={() => setExpanded(isOpen ? null : vac.id)}
                  >
                    <div className={styles.cardHeaderLeft}>
                      <h2 className={styles.cardTitle}>{vac.title}</h2>
                      <div className={styles.cardMeta}>
                        <span className={styles.metaChip}>{vac.department}</span>
                        <span className={styles.metaDot}>·</span>
                        <span className={styles.metaSalary}>{vac.salary}</span>
                        <span className={styles.metaDot}>·</span>
                        <span className={styles.metaSchedule}>{vac.schedule}</span>
                      </div>
                    </div>
                    <span className={styles.arrow}>{isOpen ? '▴' : '▾'}</span>
                  </button>

                  {isOpen && (
                    <div className={styles.cardBody}>
                      <div className={styles.sections}>
                        {[
                          { label: t('vac_requirements'), text: vac.requirements },
                          { label: t('vac_duties'), text: vac.duties },
                          { label: t('vac_conditions'), text: vac.conditions },
                        ].map(sec => (
                          <div key={sec.label} className={styles.section}>
                            <h3 className={styles.sectionTitle}>{sec.label}</h3>
                            <ul className={styles.sectionList}>
                              {sec.text.split('\n').filter(Boolean).map((line, i) => (
                                <li key={i} className={styles.sectionItem}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className={styles.respond}>
                        <div className={styles.respondContact}>
                          <span className={styles.respondContactLabel}>{t('vac_contact')}:</span>
                          <a href={`tel:${vac.contact.replace(/\D/g, '')}`} className={styles.respondPhone}>
                            {vac.contact}
                          </a>
                        </div>
                        <a
                          href={`tel:${vac.contact.replace(/\D/g, '')}`}
                          className={styles.respondBtn}
                        >
                          {t('vac_respond')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
