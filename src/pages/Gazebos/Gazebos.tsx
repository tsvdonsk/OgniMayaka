import styles from './Gazebos.module.scss'
import { img } from '../../utils/assets'

interface Props { type: 'small' | 'big' }

export default function Gazebos({ type }: Props) {
  const isSmall = type === 'small'
  const imgs = isSmall
    ? [
        img('/img/gazebo-small-1.png'),
        img('/img/gazebo-small-2.png'),
        img('/img/gazebo-small-3.png'),
        img('/img/gazebo-small-4.png'),
        img('/img/gazebo-small-5.png'),
        img('/img/gazebo-small-6.png'),
        img('/img/gazebo-small-7.png'),
        img('/img/gazebo-small-8.png'),
        img('/img/gazebo-small-9.png'),
        img('/img/gazebo-small-10.png'),
        img('/img/gazebo-small-11.png'),
        img('/img/gazebo-small-12.png'),
        img('/img/gazebo-small-13.png'),
        img('/img/gazebo-small-14.png'),
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

  const summerRows = isSmall
    ? [{ p: 'Будни (Пн–Чт)', a: '500 ₽/чел', c: '250 ₽/чел', m: 'мин. 4 000 ₽' }, { p: 'Выходные (Пт–Вс)', a: '600 ₽/чел', c: '300 ₽/чел', m: 'мин. 4 800 ₽' }, { p: 'Праздники', a: '600 ₽/чел', c: '300 ₽/чел', m: '—' }]
    : [{ p: 'Будни (Пн–Чт)', a: '500 ₽/чел', c: '250 ₽/чел', m: 'мин. 7 500 ₽' }, { p: 'Выходные (Пт–Вс)', a: '600 ₽/чел', c: '—', m: 'мин. 9 000 ₽' }, { p: 'Праздники', a: '600 ₽/чел', c: '300 ₽/чел', m: '—' }]

  const winterRows = isSmall
    ? [{ p: 'Будни', a: '300 ₽/чел', c: '150 ₽/чел', m: '—' }, { p: 'Выходные', a: '—', c: '—', m: '2 400 ₽ (6 гостей)' }, { p: 'Праздники', a: '—', c: '—', m: '3 000 ₽ (6 гостей)' }]
    : [{ p: 'Будни', a: '300 ₽/чел', c: '150 ₽/чел', m: '—' }, { p: 'Выходные', a: '—', c: '—', m: '6 000 ₽ (15 гостей)' }, { p: 'Праздники', a: '—', c: '—', m: '7 500 ₽ (15 гостей)' }]

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={imgs[1]} alt="Беседки" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Отдых</span>
          <h1 className={styles.title}>{isSmall ? 'Малые беседки' : 'Большие беседки'}</h1>
          <p className={styles.subtitle}>{isSmall ? 'Беседки №1, №7–12. Вместимость 6–10 чел. Ежедневно 11:00–22:00.' : 'Беседки №3–6. Вместимость 15–30 чел. Для корпоративов и больших компаний.'}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.twoCol}>
          <div className={styles.photoGrid}>
            <div className={styles.photoWide}>
              <img src={imgs[2]} alt="" className={styles.photo} />
            </div>
            {imgs.slice(0, 2).map((src, i) => (
              <div key={i} className={styles.photoWrap}>
                <img src={src} alt="" className={styles.photo} />
              </div>
            ))}
          </div>
          <div>
            <h2 className={styles.descTitle}>Оснащение</h2>
            <p className={styles.bodyText}>{isSmall ? 'Беседки защищены от ветра, оснащены всем необходимым для комфортного отдыха на природе.' : 'Идеально для корпоративных мероприятий, дней рождения и крупных семейных праздников.'}</p>
            <div className={styles.featureList}>
              {['Стол и скамьи', 'Раковина с проточной водой', 'Холодильник', 'Мангал', 'Мусорный бак', 'Розетки'].map(item => (
                <div key={item} className={styles.featureItem}>
                  <span className={styles.featureIcon}>◈</span>
                  <span className={styles.featureText}>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLine}><strong>Время работы:</strong> 11:00 – 22:00</p>
              <p className={styles.infoLineSecondary}><strong className={styles.infoLineText}>Вместимость:</strong> {isSmall ? '6–10 человек' : '15–30 человек'}</p>
            </div>
            <a href="tel:+79287733550" className={styles.bookBtn}>
              +7 (928) 77-33-550
            </a>
          </div>
        </div>

        <div className={styles.seasonsGrid}>
          {[{ title: 'Лето (01.04 – 30.09)', rows: summerRows }, { title: 'Зима (01.10 – 31.03)', rows: winterRows }].map(season => (
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
              <p className={styles.seasonFootnote}>Дети 0–4 лет — бесплатно</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
