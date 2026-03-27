import styles from './IgluGazebos.module.scss'
import { img } from '../../utils/assets'

const imgs = [
  img('/img/iglu.webp'),
  img('/img/evening1.webp'),
  img('/img/evening2.webp'),
]

export default function IgluGazebos() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={imgs[0]} alt="Иглу" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Атмосфера</span>
          <h1 className={styles.title}>Иглу-беседки у бассейна</h1>
          <p className={styles.subtitle}>Купольные беседки с панорамным видом. Уют и приватность в любую погоду.</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.twoCol}>
          <div>
            <h2 className={styles.descTitle}>Особая атмосфера</h2>
            <p className={styles.bodyText}>Купольные конструкции позволяют наслаждаться природой в любую погоду. Внутри — тёплый свет, комфорт и ощущение собственного маленького мира.</p>
            <p className={styles.bodyText}>Вечером пространство наполняется мягким светом — атмосфера, в которой хочется остаться подольше.</p>
            <h3 className={styles.subTitle}>Идеально для:</h3>
            <div className={styles.featureList}>
              {['Камерных посиделок с друзьями', 'Романтических ужинов', 'Праздников в узком кругу', 'Фото- и видео-съёмок'].map(item => (
                <div key={item} className={styles.featureItem}>
                  <span className={styles.featureIcon}>◈</span>
                  <span className={styles.featureText}>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBox}>
              <p className={styles.infoLine}>
                Тел. бассейна: <a href="tel:+79882598805" className={styles.infoLink}>+7 (988) 259-88-05</a>
              </p>
              <p className={styles.infoHours}>10:00 – 22:00</p>
            </div>
          </div>

          <div className={styles.photoGrid}>
            {imgs.map((src, i) => (
              <div key={i} className={i === 0 ? `${styles.photoWrap} ${styles.photoWrapWide}` : `${styles.photoWrap} ${styles.photoWrapSquare}`}>
                <img src={src} alt="" className={styles.photo} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.priceBox}>
          <h2 className={styles.priceTitle}>Стоимость аренды</h2>
          <p className={styles.priceNote}>Малая иглу-беседка · до 8 человек · мин. 3 часа · 10:00–22:00</p>
          <div className={styles.priceGrid}>
            {[{ l: 'Будни', p: '800 ₽/час', n: 'Пн–Чт' }, { l: 'Выходные', p: '1 000 ₽/час', n: 'Пт–Вс' }, { l: 'Праздники', p: '1 200 ₽/час', n: '' }, { l: 'Доп. гость (>8)', p: '200 ₽/час', n: 'за каждого' }].map(p => (
              <div key={p.l} className={styles.priceCard}>
                <p className={styles.priceCardLabel}>{p.l}</p>
                <p className={styles.priceCardValue}>{p.p}</p>
                {p.n && <p className={styles.priceCardNote}>{p.n}</p>}
              </div>
            ))}
          </div>
          <p className={styles.priceFootnote}>* Зимний тариф (01.10–31.03). Большая иглу-беседка — только для пользователей бассейна.</p>
        </div>
      </div>
    </div>
  )
}
