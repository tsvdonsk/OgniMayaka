import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useData } from '../../context/DataContext'
import ReviewsSection from '../../components/ReviewsSection'
import HeroNewsPanel from './HeroNewsPanel'
import Lightbox from '../../components/Lightbox'
import type { LightboxItem } from '../../components/Lightbox'
import { useLanguage } from '../../i18n'
import styles from './Home.module.scss'
import { img } from '../../utils/assets'

const accomItems: LightboxItem[] = [
  { url: img('/img/room-standart.jpg'), type: 'image' },
  { url: img('/img/room-standart-twin.webp'), type: 'image' },
  { url: img('/img/room-lux.jpg'), type: 'image' },
  { url: img('/img/room-studio-301.jpg'), type: 'image' },
  { url: img('/img/room-apartament.webp'), type: 'image' },
  { url: img('/img/aframe-1.webp'), type: 'image' },
]

export default function Home() {
  const { isDark } = useTheme()
  const { siteMedia } = useData()
  const { t } = useLanguage()
  const [lightbox, setLightbox] = useState<{ items: LightboxItem[]; index: number } | null>(null)

  const galleryItems: LightboxItem[] = siteMedia.galleryImages.map(item => ({
    url: item.url,
    type: item.type,
    caption: item.caption,
  }))

  const serviceCards = [
    { img: img('/img/pool-1.webp'), badge: t('svc_badgeSpa'), title: t('svc_poolTitle'), desc: t('svc_poolDesc'), href: '/bassejn', label: t('svc_poolLabel') },
    { img: img('/img/sauna-1.jpg'), badge: t('svc_badgeSauna'), title: t('svc_saunaTitle'), desc: t('svc_saunaDesc'), href: '/sauna', label: t('svc_saunaLabel') },
    { img: img('/img/gazebo-big-1.jpg'), badge: t('svc_badgeRelax'), title: t('svc_gazeboTitle'), desc: t('svc_gazeboDesc'), href: '/malye-besedki', label: t('svc_gazeboLabel') },
    { img: img('/img/iglu-1.webp'), badge: t('svc_badgeAtmo'), title: t('svc_igluTitle'), desc: t('svc_igluDesc'), href: '/iglu-besedki-u-bassejna', label: t('svc_igluLabel') },
  ]

  const [accomLine1, accomLine2] = t('home_accomTitle').split('\n')
  const [aboutLine1, aboutLine2] = t('home_aboutTitle').split('\n')

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        {siteMedia.heroVideo ? (
          <video autoPlay muted loop playsInline className={styles.heroVideo}>
            <source src={siteMedia.heroVideo} />
          </video>
        ) : (
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${siteMedia.heroImage})` }}
          />
        )}
        <div className={styles.heroOverlay} />

        <div className={styles.heroRow}>
          <div className={styles.heroText}>
            <span className={styles.badge}>{t('home_heroBadge')}</span>
            <h1 className={styles.heroTitle}>
              {t('home_heroTitle')}<br /><span className={styles.heroAccent}>{t('home_heroAccent')}</span>
            </h1>
            <p className={styles.heroDesc}>
              {t('home_heroDesc')}
            </p>
            <p className={styles.heroSub}>
              {t('home_heroSub')}
            </p>
            <div className={styles.heroBtns}>
              <a href="https://xn----8sbajzomfh0p.xn--p1ai" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                {t('home_heroBook')}
              </a>
              <Link to="/gostinichnye-nomera" className={styles.btnOutline}>
                {t('home_heroRooms')}
              </Link>
            </div>
          </div>
          <HeroNewsPanel />
        </div>

        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          Scroll
        </div>
      </section>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          {[
            { value: '16', label: t('stat_rooms') },
            { value: '12', label: t('stat_gazebos') },
            { value: '400 м³', label: t('stat_pool') },
            { value: '+32°C', label: t('stat_winter') },
            { value: '24/7', label: t('stat_service') },
          ].map(stat => (
            <div key={stat.label} className={styles.statItem}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACCOMMODATION */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div>
            <span className={styles.badge}>{t('home_accomBadge')}</span>
            <h2 className={styles.sectionTitle}>
              {accomLine1}<br />{accomLine2}
            </h2>
            <div className={styles.accentBox}>
              <p className={styles.accentBoxTitle}>{t('home_accomPromo')}</p>
              <p className={styles.accentBoxText}>{t('home_accomPromoDesc')}</p>
            </div>
            <p className={styles.bodyText}>
              {t('home_accomText1')}
            </p>
            <p className={styles.bodyText}>
              {t('home_accomText2')}
            </p>
            <Link to="/gostinichnye-nomera" className={styles.ctaLink}>
              {t('home_accomLink')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className={styles.accomPhotos}>
            {[
              { src: img('/img/room-standart.jpg'), style: { aspectRatio: '4/5', gridRow: 'span 2' } },
              { src: img('/img/room-studio-301.jpg'), style: { aspectRatio: '1/1' } },
              { src: img('/img/room-lux.jpg'), style: { aspectRatio: '1/1' } },
            ].map(({ src, style }, i) => (
              <div
                key={i}
                className={styles.accomPhotoWrap}
                style={{ ...style, cursor: 'pointer' }}
                onClick={() => setLightbox({ items: accomItems, index: i })}
              >
                <img src={src} alt="" className={styles.accomPhoto} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      {siteMedia.galleryImages.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryHeader}>
            <span className={styles.badge}>{t('home_galleryBadge')}</span>
          </div>
          <div className={styles.galleryScroll}>
            {siteMedia.galleryImages.map((item, i) => (
              <div
                key={item.id}
                className={styles.galleryItem}
                style={{ cursor: 'pointer' }}
                onClick={() => setLightbox({ items: galleryItems, index: i })}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.url}
                    muted
                    loop
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                    onMouseLeave={e => (e.currentTarget as HTMLVideoElement).pause()}
                  />
                ) : (
                  <img src={item.url} alt={item.caption || ''} className={styles.galleryImg} loading="lazy" />
                )}
                {item.caption && (
                  <div className={styles.galleryCaption}>
                    <p>{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LOCATION */}
      <section className={styles.locationSection}>
        <div className={styles.locationInner}>
          <span className={styles.badge}>{t('home_locationBadge')}</span>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>{t('home_locationTitle')}</h2>
          <p className={styles.locationDesc}>
            {t('home_locationDesc')}
          </p>
          <div className={styles.mapWrap}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=42.068915%2C47.569752&z=16&pt=42.068915,47.569752,pm2rdm"
              width="100%"
              className={styles.mapIframe}
              style={{ filter: isDark ? 'grayscale(30%) brightness(0.65)' : 'grayscale(10%) brightness(0.9)' }}
              title="Карта"
              loading="lazy"
            />
          </div>
          <p className={styles.mapAddress}>{t('home_locationAddress')}</p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className={styles.svcSection}>
        <div className={styles.svcHeader}>
          <span className={styles.badge}>{t('home_svcBadge')}</span>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>{t('home_svcTitle')}</h2>
        </div>
        <div className={styles.svcGrid}>
          {serviceCards.map(item => (
            <Link key={item.href} to={item.href} className={styles.svcCard}>
              <img src={item.img} alt={item.title} className={styles.svcImg} loading="lazy" />
              <div className={styles.svcOverlay} />
              <div className={styles.svcContent}>
                <span className={styles.svcBadge}>{item.badge}</span>
                <h3 className={styles.svcTitle}>{item.title}</h3>
                <p className={styles.svcDesc}>{item.desc}</p>
                <span className={styles.svcLink}>
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* ABOUT */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.aboutImgWrap}>
            <img src={img('/img/about.webp')} alt="О базе" className={styles.aboutImg} loading="lazy" />
          </div>
          <div>
            <span className={styles.badge}>{t('home_aboutBadge')}</span>
            <h2 className={styles.sectionTitle}>
              {aboutLine1}<br />{aboutLine2}
            </h2>
            <p className={styles.bodyText}>
              {t('home_aboutText1')}
            </p>
            <div className={styles.aboutList}>
              {[
                { icon: '▲', title: t('home_aboutAframe'), desc: t('home_aboutAframeDesc') },
                { icon: '□', title: t('home_aboutStudios'), desc: t('home_aboutStudiosDesc') },
                { icon: '○', title: t('home_aboutHotel'), desc: t('home_aboutHotelDesc') },
                { icon: '◈', title: t('home_aboutSpa'), desc: t('home_aboutSpaDesc') },
              ].map(item => (
                <div key={item.icon} className={styles.aboutItem}>
                  <span className={styles.aboutIcon}>{item.icon}</span>
                  <div>
                    <p className={styles.aboutItemTitle}>{item.title}</p>
                    <p className={styles.aboutItemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <span className={styles.badge}>{t('home_ctaBadge')}</span>
          <h2 className={styles.ctaTitle}>{t('home_ctaTitle')}</h2>
          <p className={styles.ctaDesc}>{t('home_ctaDesc')}</p>
          <div className={styles.ctaBtns}>
            <a href="tel:+79287733550" className={styles.ctaBtnPrimary}>{t('home_ctaCall')}</a>
            <a href="https://wa.me/79287733550" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnOutline}>WhatsApp</a>
            <a href="https://t.me/ogni_mayaka" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnOutline}>Telegram</a>
            <a href="https://vk.me/ogni_mayaka" target="_blank" rel="noopener noreferrer" className={styles.ctaBtnOutline}>MAX</a>
          </div>
          <div className={styles.ctaContacts}>
            {[
              { label: t('home_ctaAccomLabel'), phone: '+7 (928) 77-33-550', hours: t('home_ctaAccomHours'), tel: 'tel:+79287733550' },
              { label: t('home_ctaPoolLabel'), phone: '+7 (988) 259-88-05', hours: t('home_ctaPoolHours'), tel: 'tel:+79882598805' },
              { label: t('home_ctaFoodLabel'), phone: '+7 (929) 551-43-91', hours: t('home_ctaFoodHours'), tel: 'tel:+79295514391' },
            ].map(c => (
              <div key={c.label} className={styles.ctaContactItem}>
                <p className={styles.ctaContactLabel}>{c.label}</p>
                <a href={c.tel} className={styles.ctaContactPhone}>{c.phone}</a>
                <p className={styles.ctaContactHours}>{c.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          items={lightbox.items}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNav={i => setLightbox(lb => lb ? { ...lb, index: i } : null)}
        />
      )}
    </div>
  )
}
