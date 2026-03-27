import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../i18n'
import styles from './Contacts.module.scss'

export default function Contacts() {
  const { isDark } = useTheme()
  const { t } = useLanguage()
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.badge}>{t('contacts_badge')}</span>
        <h1 className={styles.title}>{t('contacts_title')}</h1>

        <div className={styles.twoCol}>
          <div className={styles.infoList}>
            <div>
              <p className={styles.contactLabel}>{t('contacts_address')}</p>
              <p className={styles.addressLine}>г. Волгодонск, Ростовская обл.</p>
              <p className={styles.addressLine}>ул. Отдыха, 61</p>
            </div>
            {[
              { title: t('contacts_accom'), phone: '+7 (928) 77-33-550', hours: t('contacts_247'), tel: 'tel:+79287733550' },
              { title: t('contacts_pool'), phone: '+7 (988) 259-88-05', hours: '10:00 – 22:00', tel: 'tel:+79882598805' },
              { title: t('contacts_food'), phone: '+7 (929) 551-43-91', hours: '10:00 – 22:00', tel: 'tel:+79295514391' },
            ].map(c => (
              <div key={c.title}>
                <p className={styles.contactLabel}>{c.title}</p>
                <a href={c.tel} className={styles.phone}>{c.phone}</a>
                <p className={styles.hours}>{c.hours}</p>
              </div>
            ))}
            <div>
              <p className={styles.contactLabel}>{t('contacts_email')}</p>
              <a href="mailto:ognimayaka@bk.ru" className={styles.email}>ognimayaka@bk.ru</a>
            </div>
            <div>
              <p className={styles.contactLabel}>{t('contacts_messengers')}</p>
              <div className={styles.socials}>
                {[
                  { label: 'Telegram', href: 'https://t.me/ognimayakavgd' },
                  { label: 'WhatsApp', href: 'https://wa.me/79287733550' },
                  { label: 'VK', href: 'https://vk.com/baza_volgodonsk' },
                  { label: 'Instagram', href: 'http://www.instagram.com/ogni_mayaka_baza_vgd/' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className={styles.mapWrap}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=42.068915%2C47.569752&z=16&pt=42.068915,47.569752,pm2rdm"
                width="100%"
                height="400"
                className={styles.mapIframe}
                style={{ filter: isDark ? 'grayscale(20%) brightness(0.65)' : 'grayscale(10%) brightness(0.9)' }}
                title="Карта"
                loading="lazy"
              />
            </div>
            <div className={styles.bookBox}>
              <p className={styles.bookBoxBadge}>{t('contacts_bookBadge')}</p>
              <p className={styles.bookBoxDesc}>{t('contacts_bookDesc')}</p>
              <a
                href="https://xn----8sbajzomfh0p.xn--p1ai"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookBtn}
              >
                {t('contacts_bookBtn')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
