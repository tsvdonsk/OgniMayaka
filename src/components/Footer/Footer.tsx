import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../i18n'
import styles from './Footer.module.scss'

const LOGO_URL = '/img/logo.webp'

export default function Footer() {
  const { isDark } = useTheme()
  const { t } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* Brand */}
          <div>
            <img
              src={LOGO_URL}
              alt="Огни Маяка"
              className={styles.logo}
              style={{ filter: isDark ? 'brightness(1.1)' : 'brightness(0.8) sepia(0.15)' }}
            />
            <p className={styles.tagline}>
              {t('footer_tagline').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
            <div className={styles.socials}>
              {[
                { href: 'https://t.me/ognimayakavgd', label: 'TG' },
                { href: 'https://vk.com/baza_volgodonsk', label: 'VK' },
                { href: 'https://wa.me/79287733550', label: 'WA' },
                { href: 'http://www.instagram.com/ogni_mayaka_baza_vgd/', label: 'IG' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className={styles.colTitle}>{t('footer_nav')}</h4>
            <nav className={styles.navList}>
              {[
                { label: t('footer_about'), href: '/' },
                { label: t('footer_rooms'), href: '/gostinichnye-nomera' },
                { label: t('footer_pool'), href: '/bassejn' },
                { label: t('footer_sauna'), href: '/sauna' },
                { label: t('footer_gazebos'), href: '/malye-besedki' },
                { label: t('footer_services'), href: '/uslugi' },
                { label: t('footer_contactsLink'), href: '/kontakty' },
              ].map(link => (
                <Link key={link.href} to={link.href} className={styles.link}>{link.label}</Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className={styles.colTitle}>{t('footer_contacts')}</h4>
            <div className={styles.contactsList}>
              {[
                { label: t('contacts_address'), value: 'г. Волгодонск, ул. Отдыха, 61', href: undefined },
                { label: t('footer_accom'), value: '+7 (928) 77-33-550', href: 'tel:+79287733550' },
                { label: t('footer_poolContact'), value: '+7 (988) 259-88-05', href: 'tel:+79882598805' },
                { label: t('footer_foodContact'), value: '+7 (929) 551-43-91', href: 'tel:+79295514391' },
                { label: 'Email', value: 'ognimayaka@bk.ru', href: 'mailto:ognimayaka@bk.ru' },
              ].map(c => (
                <div key={c.label}>
                  <p className={styles.contactLabel}>{c.label}</p>
                  {c.href
                    ? <a href={c.href} className={styles.contactValue}>{c.value}</a>
                    : <p className={styles.contactValue}>{c.value}</p>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Docs */}
          <div>
            <h4 className={styles.colTitle}>{t('footer_docs')}</h4>
            <div className={styles.docsList}>
              {[
                { label: t('doc_visitRules'), href: '/pravila-poseshheniya' },
                { label: t('doc_poolRules'), href: '/pravila-bassejna-doc' },
                { label: t('doc_privacy'), href: '/politika-konfidencialnosti' },
                { label: t('doc_terms'), href: '/polzovatelskoe-soglashenie' },
                { label: t('doc_requisites'), href: '/rekvizity' },
              ].map(item => (
                <Link key={item.href} to={item.href} className={styles.docLink}>{item.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.copyText}>{t('footer_copy')}</p>
          <p className={styles.copyText}>{t('footer_city')}</p>
        </div>
      </div>
    </footer>
  )
}
