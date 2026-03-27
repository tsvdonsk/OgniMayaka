import { useLanguage } from '../../i18n'
import styles from './IgluGazebos.module.scss'
import { img } from '../../utils/assets'

const imgs = [
  img('/img/iglu-1.webp'),
  img('/img/iglu-2.webp'),
  img('/img/iglu-3.webp'),
  img('/img/iglu-4.webp'),
]

export default function IgluGazebos() {
  const { t } = useLanguage()

  const ph = t('iglu_perHour')

  const priceCards = [
    { l: t('iglu_weekdays'), p: `800 ₽${ph}`, n: t('iglu_monThu') },
    { l: t('iglu_weekends'), p: `1 000 ₽${ph}`, n: t('iglu_friSun') },
    { l: t('iglu_holidays'), p: `1 200 ₽${ph}`, n: '' },
    { l: t('iglu_extraGuest'), p: `200 ₽${ph}`, n: t('iglu_each') },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={imgs[0]} alt="" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('iglu_badge')}</span>
          <h1 className={styles.title}>{t('iglu_title')}</h1>
          <p className={styles.subtitle}>{t('iglu_subtitle')}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.twoCol}>
          <div>
            <h2 className={styles.descTitle}>{t('iglu_descTitle')}</h2>
            <p className={styles.bodyText}>{t('iglu_text1')}</p>
            <p className={styles.bodyText}>{t('iglu_text2')}</p>
            <h3 className={styles.subTitle}>{t('iglu_idealTitle')}</h3>
            <div className={styles.featureList}>
              {[
                t('iglu_ideal1'),
                t('iglu_ideal2'),
                t('iglu_ideal3'),
                t('iglu_ideal4'),
              ].map(item => (
                <div key={item} className={styles.featureItem}>
                  <span className={styles.featureIcon}>◈</span>
                  <span className={styles.featureText}>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLine}>
                {t('iglu_phoneLabel')} <a href="tel:+79882598805" className={styles.infoLink}>+7 (988) 259-88-05</a>
              </p>
              <p className={styles.infoHours}>10:00 – 22:00</p>
            </div>
          </div>

          <div className={styles.photoGrid}>
            {imgs.map((src, i) => (
              <div key={i} className={i === 0 ? `${styles.photoWrap} ${styles.photoWrapWide}` : `${styles.photoWrap} ${styles.photoWrapSquare}`}>
                <img src={src} alt="" className={styles.photo} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.priceBox}>
          <h2 className={styles.priceTitle}>{t('iglu_priceTitle')}</h2>
          <p className={styles.priceNote}>{t('iglu_priceNote')}</p>
          <div className={styles.priceGrid}>
            {priceCards.map(p => (
              <div key={p.l} className={styles.priceCard}>
                <p className={styles.priceCardLabel}>{p.l}</p>
                <p className={styles.priceCardValue}>{p.p}</p>
                {p.n && <p className={styles.priceCardNote}>{p.n}</p>}
              </div>
            ))}
          </div>
          <p className={styles.priceFootnote}>{t('iglu_footnote')}</p>
        </div>
      </div>
    </div>
  )
}
