import { useLanguage } from '../../i18n'
import styles from './Gazebos.module.scss'
import { img } from '../../utils/assets'

interface Props { type: 'small' | 'big' }

export default function Gazebos({ type }: Props) {
  const { t } = useLanguage()
  const isSmall = type === 'small'
  const imgs = isSmall
    ? [
        img('/img/gazebo-small-1.webp'),
        img('/img/gazebo-small-2.webp'),
        img('/img/gazebo-small-3.webp'),
        img('/img/gazebo-small-4.webp'),
        img('/img/gazebo-small-5.webp'),
        img('/img/gazebo-small-6.webp'),
        img('/img/gazebo-small-7.webp'),
        img('/img/gazebo-small-8.webp'),
        img('/img/gazebo-small-9.webp'),
        img('/img/gazebo-small-10.webp'),
        img('/img/gazebo-small-11.webp'),
        img('/img/gazebo-small-12.webp'),
        img('/img/gazebo-small-13.webp'),
        img('/img/gazebo-small-14.webp'),
        img('/img/gazebo-small-15.jpg'),
        img('/img/gazebo-small-16.jpg'),
        img('/img/gazebo-small-17.jpg'),
      ]
    : [
        img('/img/gazebo-big-1.jpg'),
        img('/img/gazebo-big-2.jpg'),
        img('/img/gazebo-big-3.jpg'),
        img('/img/gazebo-big-4.jpg'),
        img('/img/gazebo-big-5.jpg'),
        img('/img/gazebo-big-6.jpg'),
        img('/img/gazebo-big-7.jpg'),
        img('/img/gazebo-big-8.jpg'),
      ]

  const pp = t('gazebo_perPerson')
  const min = t('gazebo_min')
  const g6 = t('gazebo_guests6')
  const g15 = t('gazebo_guests15')

  const summerRows = isSmall
    ? [
        { p: t('gazebo_sumWeekdays'), a: `500 ₽${pp}`, c: `250 ₽${pp}`, m: `${min} 4 000 ₽` },
        { p: t('gazebo_sumWeekends'), a: `600 ₽${pp}`, c: `300 ₽${pp}`, m: `${min} 4 800 ₽` },
        { p: t('gazebo_holidays'), a: `600 ₽${pp}`, c: `300 ₽${pp}`, m: '—' },
      ]
    : [
        { p: t('gazebo_sumWeekdays'), a: `500 ₽${pp}`, c: `250 ₽${pp}`, m: `${min} 7 500 ₽` },
        { p: t('gazebo_sumWeekends'), a: `600 ₽${pp}`, c: '—', m: `${min} 9 000 ₽` },
        { p: t('gazebo_holidays'), a: `600 ₽${pp}`, c: `300 ₽${pp}`, m: '—' },
      ]

  const winterRows = isSmall
    ? [
        { p: t('gazebo_winWeekdays'), a: `300 ₽${pp}`, c: `150 ₽${pp}`, m: '—' },
        { p: t('gazebo_winWeekends'), a: '—', c: '—', m: `2 400 ₽ (${g6})` },
        { p: t('gazebo_holidays'), a: '—', c: '—', m: `3 000 ₽ (${g6})` },
      ]
    : [
        { p: t('gazebo_winWeekdays'), a: `300 ₽${pp}`, c: `150 ₽${pp}`, m: '—' },
        { p: t('gazebo_winWeekends'), a: '—', c: '—', m: `6 000 ₽ (${g15})` },
        { p: t('gazebo_holidays'), a: '—', c: '—', m: `7 500 ₽ (${g15})` },
      ]

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={imgs[1]} alt="" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t('gazebo_badge')}</span>
          <h1 className={styles.title}>{isSmall ? t('gazebo_smallTitle') : t('gazebo_bigTitle')}</h1>
          <p className={styles.subtitle}>{isSmall ? t('gazebo_smallSubtitle') : t('gazebo_bigSubtitle')}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.twoCol}>
          <div className={styles.photoGrid}>
            <div className={styles.photoWide}>
              <img src={imgs[2]} alt="" className={styles.photo} loading="lazy" />
            </div>
            {imgs.slice(0, 2).map((src, i) => (
              <div key={i} className={styles.photoWrap}>
                <img src={src} alt="" className={styles.photo} loading="lazy" />
              </div>
            ))}
          </div>
          <div>
            <h2 className={styles.descTitle}>{t('gazebo_equipTitle')}</h2>
            <p className={styles.bodyText}>{isSmall ? t('gazebo_smallDesc') : t('gazebo_bigDesc')}</p>
            <div className={styles.featureList}>
              {[
                t('gazebo_feat1'),
                t('gazebo_feat2'),
                t('gazebo_feat3'),
                t('gazebo_feat4'),
                t('gazebo_feat5'),
                t('gazebo_feat6'),
              ].map(item => (
                <div key={item} className={styles.featureItem}>
                  <span className={styles.featureIcon}>◈</span>
                  <span className={styles.featureText}>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLine}><strong>{t('gazebo_hoursLabel')}</strong> 11:00 – 22:00</p>
              <p className={styles.infoLineSecondary}><strong className={styles.infoLineText}>{t('gazebo_capacityLabel')}</strong> {isSmall ? t('gazebo_smallCapacity') : t('gazebo_bigCapacity')}</p>
            </div>
            <a href="tel:+79287733550" className={styles.bookBtn}>
              +7 (928) 77-33-550
            </a>
          </div>
        </div>

        <div className={styles.seasonsGrid}>
          {[
            { title: t('gazebo_summerSeason'), rows: summerRows },
            { title: t('gazebo_winterSeason'), rows: winterRows },
          ].map(season => (
            <div key={season.title} className={styles.seasonCard}>
              <h3 className={styles.seasonTitle}>{season.title}</h3>
              {season.rows.map((row, i) => (
                <div key={i} className={styles.priceRow}>
                  <span className={styles.priceRowPeriod}>{row.p}</span>
                  <span className={styles.priceRowAdult}>{row.a}</span>
                  <span className={styles.priceRowChild}>{row.c}</span>
                  <span className={styles.priceRowMin}>{row.m}</span>
                </div>
              ))}
              <p className={styles.seasonFootnote}>{t('gazebo_kidsNote')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
