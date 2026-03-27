import { useLanguage } from '../../i18n'
import styles from './Pool.module.scss'
import { img } from '../../utils/assets'

const imgs = [
  img('/img/pool-1.webp'),
  img('/img/pool-2.webp'),
  img('/img/pool-3.webp'),
  img('/img/pool-4.webp'),
  img('/img/pool-5.webp'),
  img('/img/pool-6.webp'),
  img('/img/pool-7.webp'),
  img('/img/pool-8.webp'),
  img('/img/pool-9.jpg'),
  img('/img/pool-10.jpg'),
  img('/img/pool-11.jpg'),
  img('/img/pool-12.jpg'),
  img('/img/pool-13.jpg'),
  img('/img/pool-14.webp'),
  img('/img/pool-15.webp'),
]

export default function Pool() {
  const { t } = useLanguage()
  const [titleLine1, titleLine2] = t('pool_title').split('\n')

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={imgs[0]} alt="Бассейн" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('pool_badge')}</span>
          <h1 className={styles.title}>{titleLine1}<br />{titleLine2}</h1>
          <p className={styles.subtitle}>{t('pool_subtitle')}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.twoCol}>
          <div>
            {[t('pool_text1'), t('pool_text2'), t('pool_text3')].map((p, i) => <p key={i} className={styles.bodyText}>{p}</p>)}
          </div>
          <div className={styles.photoGrid}>
            {imgs.slice(1).map((src, i) => (
              <div key={i} className={styles.photoWrap}>
                <img src={src} alt="" className={styles.photo} loading="lazy" />
              </div>
            ))}
            <div className={styles.accentCard}>
              <div>
                <p className={styles.accentCardValue}>400</p>
                <p className={styles.accentCardLabel}>{t('pool_volume')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {[
            { title: t('pool_winterTitle'), sub: t('pool_winterSub'), desc: t('pool_winterDesc') },
            { title: t('pool_summerTitle'), sub: t('pool_summerSub'), desc: t('pool_summerDesc') },
            { title: t('pool_hoursTitle'), sub: t('pool_hoursSub'), desc: t('pool_hoursDesc') },
            { title: t('pool_freeTitle'), sub: t('pool_freeSub'), desc: t('pool_freeDesc') },
          ].map(item => (
            <div key={item.title} className={styles.statCard}>
              <p className={styles.statValue}>{item.title}</p>
              <p className={styles.statLabel}>{item.sub}</p>
              <p className={styles.statNote}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.priceBox}>
          <h2 className={styles.priceTitle}>{t('pool_priceTitle')}</h2>
          <p className={styles.priceNote}>{t('pool_priceNote')}</p>
          <div className={styles.priceGrid}>
            {[
              { label: t('pool_adult'), price: '1 400 ₽', note: 'Пн–Вс' },
              { label: t('pool_child16'), price: '700 ₽', note: 'Пн–Вс' },
              { label: t('pool_child0'), price: t('pool_free'), note: '' },
            ].map(p => (
              <div key={p.label} className={styles.priceCard}>
                <p className={styles.priceCardLabel}>{p.label}</p>
                <p className={styles.priceCardValue}>{p.price}</p>
                {p.note && <p className={styles.priceCardNote}>{p.note}</p>}
              </div>
            ))}
          </div>
          <p className={styles.priceFootnote}>
            {t('pool_footnote')} Тел: <a href="tel:+79882598805" className={styles.priceLink}>+7 (988) 259-88-05</a>
          </p>
        </div>
      </div>
    </div>
  )
}
