import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { img } from '../utils/assets'

// ─── Types ───────────────────────────────────────────────────────────────────

export type MediaItem = {
  id: string
  type: 'image' | 'video'
  url: string
  caption?: string
}

export type NewsItem = {
  id: string
  title: string
  content: string
  date: string
  emoji: string
  published: boolean
  media: MediaItem[]  // photos/videos in news post
}

export type RoomItem = {
  id: string
  name: string
  desc: string
  area: string
  capacity: string
  bed: string
  floor: string
  img: string
  features: string[]
  category: string
  highlight?: boolean
}

export type ServiceItem = {
  id: string
  name: string
  price: string
}

export type SiteMedia = {
  heroImage: string
  heroVideo: string          // optional video for hero (if set, shows instead of image)
  galleryImages: MediaItem[] // gallery on main page
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultSiteMedia: SiteMedia = {
  heroImage: img('/img/hero.jpg'),
  heroVideo: img('/img/hero.webm'),
  galleryImages: [
    { id: 'g1', type: 'image', url: img('/img/room-standart.jpg'), caption: 'Номера' },
    { id: 'g2', type: 'image', url: img('/img/pool-1.webp'), caption: 'Бассейн' },
    { id: 'g3', type: 'image', url: img('/img/gazebo-big-1.jpg'), caption: 'Беседки' },
    { id: 'g4', type: 'image', url: img('/img/iglu-1.webp'), caption: 'Иглу-беседки' },
    { id: 'g5', type: 'image', url: img('/img/sauna-1.jpg'), caption: 'Сауна' },
    { id: 'g6', type: 'image', url: img('/img/aframe-1.webp'), caption: 'А-Фрейм' },
  ],
}

const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: 'Гуси объявили войну гостям: инцидент у причала',
    emoji: '🪿',
    content: `Дорогие гости! Мы вынуждены сообщить о дипломатическом конфликте между администрацией базы отдыха «Огни Маяка» и стаей диких гусей, самовольно оккупировавших причал с 7 утра.\n\nСитуация вышла из-под контроля, когда гость Андрей В. попытался подкормить птиц круассаном из завтрака — в ответ гуси потребовали весь завтрак целиком и угрожали криком всем, кто откажется.\n\nАдминистрация провела переговоры. По итогам соглашения: гуси получают ежедневную порцию хлебных крошек в 8:00, а гости обязуются не занимать «место вожака» у левого столба причала. Мир восстановлен. Круассан не вернули.\n\nВнимание: просим не кормить гусей после 20:00 — они становятся слишком оживлёнными и мешают романтическим ужинам в иглу-беседках.`,
    date: '2026-03-20',
    published: true,
    media: [
      { id: 'n1m1', type: 'image', url: img('/img/pier.jpg'), caption: 'База отдыха' },
    ],
  },
  {
    id: '2',
    title: 'Рекорд базы: гость прожил в бассейне 4 часа подряд',
    emoji: '🏊',
    content: `Этой зимой «Огни Маяка» стали свидетелями поистине исторического события. Гость из Ростова-на-Дону по имени Михаил К. установил неофициальный рекорд базы, проведя в подогреваемом бассейне под открытым небом 4 часа 17 минут при температуре воздуха −3°C.\n\nПо словам Михаила, он «просто забыл выйти, потому что было очень хорошо». К моменту выхода из воды вокруг него образовалось лёгкое облако пара, а другие гости начали фотографироваться с ним как с достопримечательностью.\n\nАдминистрация торжественно вручила Михаилу сертификат «Самый стойкий гость февраля 2026» и предложила скидку 15% на следующее посещение — при условии, что в этот раз он всё же выйдет до ужина.\n\nP.S. Официально побить рекорд можно в любое время. Приз — бесплатный час в финской сауне.`,
    date: '2026-03-15',
    published: true,
    media: [
      { id: 'n2m1', type: 'image', url: img('/img/pool-1.webp'), caption: 'Тот самый бассейн' },
      { id: 'n2m2', type: 'image', url: img('/img/pool-5.webp'), caption: 'Бассейн зимой' },
    ],
  },
  {
    id: '3',
    title: 'Кот Семён официально назначен главным по встрече гостей',
    emoji: '🐱',
    content: `Рады сообщить, что полосатый кот Семён, три года проживающий на территории базы на правах «вольного резидента», официально повышен до должности Директора по гостеприимству.\n\nСеменa отличает врождённый талант: он встречает каждого гостя у ворот, провожает до номера и ненавязчиво намекает на угощение, укладываясь прямо поперёк дороги. По итогам анкетирования гостей за март 2026 года Семён получил 4.9 звезды из 5 — на 0.1 выше, чем финская сауна.\n\nОдна звезда была снята за инцидент 14 марта, когда Семён съел рыбу из тарелки гостя Олега С., пока тот смотрел на Дон. Олег, впрочем, сказал, что «всё равно не обиделся, потому что кот смотрел очень извиняющимся взглядом».\n\nСемёна можно найти у входа в корпус 2 с 9 до 11 утра и у кухни с 18 до 20 вечера. Должностные обязанности выполняет исключительно по настроению.`,
    date: '2026-03-22',
    published: true,
    media: [],
  },
  {
    id: '4',
    title: 'Сауна vs бассейн: великие дебаты Волгодонска наконец решены',
    emoji: '🔥',
    content: `На прошлой неделе в иглу-беседке №3 состоялось историческое событие: двенадцать гостей провели стихийный философский диспут на тему «Что лучше — сначала в сауну, потом в бассейн, или наоборот?»\n\nДискуссия длилась 2 часа 40 минут. В какой-то момент были нарисованы схемы на салфетках, привлечён независимый эксперт (администратор Наташа), и даже проведено голосование.\n\nРезультат: 7 голосов за «сауна → бассейн → снова сауна», 4 голоса за «бассейн → сауна → бассейн», 1 воздержался, сославшись на то, что «просто пришёл поесть шашлык».\n\nАдминистрация официально признаёт оба варианта верными и обязуется не вмешиваться. Беседка №3 теперь неформально называется «Зал переговоров».`,
    date: '2026-03-18',
    published: true,
    media: [],
  },
  {
    id: '5',
    title: 'Потерянный термос нашёлся. История со счастливым концом',
    emoji: '🫖',
    content: `11 марта в 14:22 к стойке администрации подошёл гость Виктор Р. с сообщением: «Кажется, я оставил термос где-то на базе три дня назад».\n\nНачались поиски. Термос был обнаружен: в беседке №7 (логично), в шкафчике у бассейна (немного странно), рядом с качелями у Дона (совсем неожиданно) — оказалось, это три разных термоса, оставленных тремя разными гостями в разное время.\n\nВикторов термос нашёлся на четвёртый день — на подоконнике в холле корпуса 1. Предположительно, его туда поставил Семён. Прямых доказательств нет, но Семён выглядел слишком довольным.\n\nВсе три бесхозных термоса ждут своих владельцев на стойке администрации. Приходите. Семён встретит.`,
    date: '2026-03-13',
    published: true,
    media: [],
  },
  {
    id: '6',
    title: 'Внимание! Мангальная зона временно переименована',
    emoji: '🍖',
    content: `С 20 по 27 марта мангальная зона «Огней Маяка» носит неофициальное название «Храм Священного Шашлыка» — в честь гостя Артёма Д., который за одни выходные провёл там три отдельных барбекю-сессии для трёх разных компаний.\n\nАртём прибыл в пятницу вечером с семьёй, в субботу к нему приехали друзья, в воскресенье — коллеги. По словам очевидцев, к вечеру воскресенья он уже самостоятельно консультировал других гостей по вопросам розжига и нарезки лука.\n\nАдминистрация выдала Артёму почётную лопатку для мангала с гравировкой «Мастер огня, март 2026» и предложила должность неофициального амбассадора зоны. Артём согласился — при условии, что уголь всегда будет в наличии.\n\nСообщаем: уголь есть. Артём будет в мае.`,
    date: '2026-03-24',
    published: true,
    media: [],
  },
  {
    id: '8',
    title: 'Утка поселилась в беседке №5 и выставила счёт',
    emoji: '🦆',
    content: `Персонал базы зафиксировал прецедент: 24 марта в беседке №5 самовольно обосновалась дикая кряква по имени (предположительно) Клавдия.\n\nКлавдия приходит в 11:00, занимает угловое место у мангала и молчит. Уходит в 14:30, не прощаясь. Счёт не выставляет — но смотрит.\n\nГости в основном рады. Один оставил ей кусок хлеба, другой сделал 47 фотографий. Третий пытался забронировать беседку через сайт «для себя и утки» — администратор уточнила, что утка не числится в системе и бронь оформить не получится.\n\nКлавдия в курсе. Она всё равно придёт.`,
    date: '2026-03-25',
    published: true,
    media: [],
  },
  {
    id: '9',
    title: 'Иглу-беседка стала любимым местом для предложений руки и сердца',
    emoji: '💍',
    content: `За март 2026 года в иглу-беседках у бассейна состоялось уже четыре предложения руки и сердца. Все четыре — успешные.\n\nТрое гостей признались, что выбрали «Огни Маяка» специально под этот момент. Один сказал, что «просто так получилось, но атмосфера сама всё сделала».\n\nАдминистрация ввела негласную традицию: если гость сообщает о помолвке при заселении или выселении — шампанское за счёт базы. Шампанское заканчивается быстро. Заказали ещё.\n\nЕсли вы планируете — знайте: беседка №2 у воды особенно хороша в закат. Семён иногда приходит поздравить лично.`,
    date: '2026-03-26',
    published: true,
    media: [],
  },
  {
    id: '10',
    title: 'Субботник прошёл. Все живы. Семён помог',
    emoji: '🌿',
    content: `26 марта на базе прошёл весенний субботник. Участвовали 11 сотрудников, 3 добровольца из числа гостей (спасибо Ирине, Максиму и маленькому Грише 6 лет) и кот Семён.\n\nСемён лично проверил каждый мешок с мусором — методом залезания внутрь. Признан непригодным для строительных работ, но назначен ответственным за моральный дух коллектива.\n\nПо итогам дня: убрана территория у причала, высажены 12 кустов можжевельника вдоль забора, покрашена беседка №8 и починена калитка у бассейна, которая скрипела с октября.\n\nВесна пришла. База сияет. Приезжайте.`,
    date: '2026-03-27',
    published: true,
    media: [],
  },
  {
    id: '7',
    title: 'Wi-Fi на причале: теперь рыбалка с рабочими созвонами',
    emoji: '📡',
    content: `Свершилось. По многочисленным просьбам гостей (и одному особо настойчивому письму от Дениса Г., который хотел «удалённо работать, но чтоб перед глазами была река»), Wi-Fi расширен до зоны причала.\n\nТеперь можно: сидеть с удочкой, ждать поклёвки и параллельно участвовать в видеозвонке. Коллеги увидят Дон — вы увидите их зависть.\n\nВажные уточнения от технической службы:\n— Рыбу ловить и работать одновременно технически возможно, но морально сложно\n— За упавший ноутбук в реку администрация ответственности не несёт\n— Кот Семён иногда проходит в кадре. Это считается бонусом\n\nСигнал уверенный. Рыба пока не жалуется.`,
    date: '2026-03-10',
    published: true,
    media: [],
  },
]

const defaultRooms: RoomItem[] = [
  { id: 'standart', name: 'Стандарт', desc: 'Двухместный номер с видом на реку. Уютный и функциональный.', area: '15 м²', capacity: '2 гостя', bed: '1 кровать 160×200', floor: '2 этаж', img: img('/img/room-standart.jpg'), features: ['Вид на реку', 'Душ', 'ТВ', 'Сплит-система', 'Холодильник', 'Чайник', 'Фен', 'Wi-Fi'], category: 'Стандарт' },
  { id: 'standart-twin', name: 'Стандарт ТВИН', desc: 'Двухместный номер с двумя раздельными кроватями и видом на реку.', area: '15 м²', capacity: '2 гостя', bed: '2 × 90×200', floor: '2 этаж', img: img('/img/room-standart-twin.webp'), features: ['Вид на реку', 'Душ', 'ТВ', 'Сплит-система', 'Холодильник', 'Wi-Fi'], category: 'Стандарт' },
  { id: 'standart-plus', name: 'Стандарт +', desc: 'Просторный стандарт с видом на реку и собственной террасой.', area: '23 м²', capacity: '2 гостя', bed: '1 кровать 160×200', floor: '2 этаж', img: img('/img/room-standart-plus.jpg'), features: ['Вид на реку', 'Терраса', 'Душ', 'ТВ', 'Сплит-система', 'Холодильник', 'Wi-Fi'], category: 'Стандарт' },
  { id: 'lux', name: 'Люкс', desc: 'Двухкомнатный люкс с видом на реку, собственной террасой и отдельным входом.', area: '45 м²', capacity: '4 гостя', bed: '1 кровать 160×200 + диван', floor: '1 и 2 этаж', img: img('/img/room-lux.jpg'), features: ['Вид на реку', 'Отдельный вход', 'Терраса', 'Душ', 'Smart TV', 'Сплит-система', 'Холодильник', 'Wi-Fi'], category: 'Люкс' },
  { id: 'apartament', name: 'Apartament', desc: 'Апартамент с мини-кухней в корпусе 3.', area: '36 м²', capacity: '4 гостя', bed: '1 кровать 160×200 + угловой диван', floor: 'Корпус 3, 2 этаж, №21', img: img('/img/room-apartament.webp'), features: ['Мини-кухня', 'Smart TV', 'Отдельный вход', 'Сплит-система', 'Набор посуды', 'Сейф', 'Wi-Fi'], category: 'Апартаменты' },
  { id: 'apartament-plus', name: 'Apartament +', desc: 'Улучшенный апартамент с большей площадью.', area: '39 м²', capacity: '4 гостя', bed: '1 кровать 160×200 + диван', floor: 'Корпус 3, 2 этаж, №22', img: img('/img/room-apartament-plus.webp'), features: ['Мини-кухня', 'Smart TV', 'Отдельный вход', 'Сплит-система', 'Набор посуды', 'Сейф', 'Wi-Fi'], category: 'Апартаменты' },
  { id: 'apartament-senior', name: 'Apartament Senior', desc: 'Самый просторный апартамент.', area: '48 м²', capacity: '4 гостя', bed: '1 кровать 160×200 + большой диван', floor: 'Корпус 3, 2 этаж, №23', img: img('/img/room-apartament-senior.webp'), features: ['Мини-кухня', 'Smart TV', 'Отдельный вход', 'Сплит-система', 'Набор посуды', 'Сейф', 'Wi-Fi'], category: 'Апартаменты' },
  { id: 'studio-301', name: 'Studio 301', desc: 'Студия с кухней и террасой. Панорамный вид.', area: '34 м²', capacity: '2 гостя', bed: '1 двуспальная кровать', floor: '3 этаж', img: img('/img/room-studio-301.jpg'), features: ['Кухня', 'Терраса', 'Smart TV', 'Сплит-система', 'Набор посуды', 'Wi-Fi'], category: 'Студии' },
  { id: 'studio-302', name: 'Studio 302', desc: 'Студия с кухней и террасой для романтического отдыха вдвоём.', area: '26 м²', capacity: '2 гостя', bed: '1 двуспальная кровать', floor: '3 этаж', img: img('/img/room-studio-302.jpg'), features: ['Кухня', 'Терраса', 'Smart TV', 'Сплит-система', 'Wi-Fi'], category: 'Студии' },
  { id: 'studio-303', name: 'Studio 303', desc: 'Компактная студия с кухней и выходом на террасу.', area: '20 м²', capacity: '2 гостя', bed: '1 двуспальная кровать', floor: '3 этаж', img: img('/img/room-studio-303.jpg'), features: ['Кухня', 'Терраса', 'Smart TV', 'Сплит-система', 'Wi-Fi'], category: 'Студии' },
  { id: 'aframe', name: 'А-Фрейм 100 м²', desc: 'Двухэтажный дом с панорамным остеклением, 3 спальнями, гостиной, кухней и мангальной зоной.', area: '100 м²', capacity: '8 гостей', bed: '3 спальни + гостиная', floor: 'Отдельный дом', img: img('/img/aframe-1.webp'), features: ['Панорамные окна', 'Мангальная зона', 'Полная кухня', 'Smart TV', 'Сплит-система', 'Терраса', 'Wi-Fi'], category: 'A-Frame', highlight: true },
]

const defaultFreeServices = [
  'Пользование бассейном и финской сауной (10:00–22:00)',
  'Пользование спортивными площадками',
  'Wi-Fi',
  'Заказ доставки цветов и подарков',
  'Прокат бытовых приборов (утюг, фен, гладильная доска, сушилка, чайник)',
  'Зона питания с микроволновой печью и термоподом',
  'Общая мангальная зона',
  'Заказ мест в ресторанах города',
  'Заказ услуг перевозчиков (прогулки по воде)',
  'Пользование причалом для временной стоянки маломерных судов',
  'Пробуждение к определённому времени',
  'Доставка в номер личной корреспонденции',
  'Вызов скорой помощи при необходимости',
  'Использование медицинской аптечки',
  'Один комплект посуды, кипяток, ножницы, иголки с нитками',
  'Парковка на территории',
]

const defaultPaidServices: ServiceItem[] = [
  { id: 's1', name: 'Аренда бадминтонной площадки', price: '500 ₽/час' },
  { id: 's2', name: 'Аренда бадминтонных ракеток (1 пара)', price: '500 ₽' },
  { id: 's3', name: 'Аренда баскетбольного мяча', price: '500 ₽/час' },
  { id: 's4', name: 'Аренда волейбольного мяча', price: '300 ₽/час' },
  { id: 's5', name: 'Аренда волейбольной площадки', price: '500 ₽/час' },
  { id: 's6', name: 'Аренда казана 19 л', price: '1 000 ₽' },
  { id: 's7', name: 'Аренда казана 9 л', price: '500 ₽' },
  { id: 's8', name: 'Аренда многофункциональной площадки', price: '800 ₽/час' },
  { id: 's9', name: 'Аренда решётки', price: '200 ₽' },
  { id: 's10', name: 'Аренда спиннинга/удочки с прикормкой', price: '1 000 ₽/час' },
  { id: 's11', name: 'Аренда теннисных ракеток (1 пара)', price: '750 ₽' },
  { id: 's12', name: 'Аренда удочки/спиннинга', price: '500 ₽/час' },
  { id: 's13', name: 'Аренда шампуров (6 шт.)', price: '200 ₽' },
  { id: 's14', name: 'Аренда шезлонга', price: '500 ₽/день' },
  { id: 's15', name: 'Браслет взрослый — дневное пребывание (Лето)', price: '600 ₽' },
  { id: 's16', name: 'Браслет детский — дневное пребывание (Лето)', price: '300 ₽' },
  { id: 's17', name: 'Стирка и глажка брюк', price: '200 ₽' },
  { id: 's18', name: 'Стирка и глажка сорочки', price: '150 ₽' },
]

// ─── Context ──────────────────────────────────────────────────────────────────

// ─── User & Reviews ──────────────────────────────────────────────────────────

export type User = {
  id: string
  name: string
  email: string
  passwordHash: string  // simple hash for localStorage-based auth
  createdAt: string
}

export type Review = {
  id: string
  userId: string
  userName: string
  rating: number
  text: string
  date: string
  approved: boolean
}

function simpleHash(s: string): string {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return h.toString(36)
}
export { simpleHash }

// ─── Context ──────────────────────────────────────────────────────────────────

type DataCtx = {
  news: NewsItem[]
  setNews: (n: NewsItem[]) => void
  rooms: RoomItem[]
  setRooms: (r: RoomItem[]) => void
  freeServices: string[]
  setFreeServices: (s: string[]) => void
  paidServices: ServiceItem[]
  setPaidServices: (s: ServiceItem[]) => void
  siteMedia: SiteMedia
  setSiteMedia: (m: SiteMedia) => void
  // auth
  users: User[]
  setUsers: (u: User[]) => void
  currentUser: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  // reviews
  reviews: Review[]
  setReviews: (r: Review[]) => void
}

const DataContext = createContext<DataCtx>({} as DataCtx)

function load<T>(key: string, def: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : def
  } catch { return def }
}
function save<T>(key: string, v: T) {
  localStorage.setItem(key, JSON.stringify(v))
}

const defaultReviews: Review[] = [
  { id: 'y1',  userId: 'yandex', userName: 'Александр С.',           rating: 5, date: '2026-03-21', approved: false, text: 'Отдыхали в марте 2026. Отдых понравился! Бассейн подогреваемый — фишка базы в холодные дни. Приятно было лежать в тёплой воде когда вокруг прохладно. Рекомендую!' },
  { id: 'y2',  userId: 'yandex', userName: 'Марина В.',               rating: 5, date: '2026-03-16', approved: false, text: 'Классный горячий бассейн, классные беседки-иглы. Очень атмосферное место!' },
  { id: 'y3',  userId: 'yandex', userName: 'Алла С.',                 rating: 5, date: '2026-02-24', approved: false, text: 'Хороший семейный отдых, чистые номера, вежливый персонал. Единственные минусы — тишина после 22:00 и ограниченное время аренды куполов, но это скорее плюс для спокойного отдыха.' },
  { id: 'y4',  userId: 'yandex', userName: 'Алексей',                 rating: 5, date: '2026-02-11', approved: false, text: 'Чистые номера, хорошее бельё, бассейн 35°C, сауна — идеально для зимнего отдыха. Всё понравилось, будем возвращаться.' },
  { id: 'y5',  userId: 'yandex', userName: 'Марина Скик',             rating: 5, date: '2026-01-27', approved: false, text: 'Очень понравилась база. Подогреваемый бассейн, сауна, красивая территория. Очень хорошо отдохнули, приедем ещё.' },
  { id: 'y6',  userId: 'yandex', userName: 'Оксана Скрынникова',      rating: 5, date: '2026-01-25', approved: false, text: 'Всё соответствует сайту, даже при -10°C на улице остались очень довольны. Тёплый бассейн под открытым небом зимой — это что-то особенное!' },
  { id: 'y7',  userId: 'yandex', userName: 'Расул Завтатзе',          rating: 5, date: '2026-02-25', approved: false, text: 'Кайф для отдыха! Атмосфера, персонал, бассейн — всё на высоте.' },
  { id: 'y8',  userId: 'yandex', userName: 'Мария Гришанова',         rating: 5, date: '2025-12-10', approved: false, text: 'База отдыха очень понравилась! Добродушный персонал! Номер маленький но чистый и современный. Вечером сотрудник Андрей устроил всем греющимся в парной целое спа — с музыкой и веером! Было изумительно!' },
  { id: 'y9',  userId: 'yandex', userName: 'Заяна',                   rating: 5, date: '2025-11-15', approved: false, text: 'Очень приятное место! Отличные комфортные номера — у нас были апартаменты, новая удобная мебель со всем необходимым. Территория уютная, чистая, бассейн шикарный. Дружелюбный и услужливый персонал.' },
  { id: 'y10', userId: 'yandex', userName: 'Иван Нефёдов',            rating: 5, date: '2025-10-20', approved: false, text: 'Ездили с детьми по разным базам отдыха, но больше всего понравилось здесь. Дети сказали, что это самый лучший бассейн!' },
  { id: 'y11', userId: 'yandex', userName: 'МАКСИМ ЮГИН',             rating: 5, date: '2025-09-05', approved: false, text: 'Всё понравилось — и место, и сервис. Мне главное тишина для отдыха. Рядом речка, лес, свежий воздух — просто фантастика.' },
  { id: 'y12', userId: 'yandex', userName: 'Наталья Николаевна',      rating: 1, date: '2026-02-22', approved: false, text: 'К сожалению, разочарована. Вода в бассейне холодная, сауна нестабильно работала, горячая вода в номерах тоже подводила. Раньше было значительно лучше, надеюсь, исправят.' },
  { id: 'y13', userId: 'yandex', userName: 'Виктор Арьков',           rating: 2, date: '2025-08-18', approved: false, text: 'В люксе вместо нормального холодильника оказался минибар 60 см. Подписка на бассейн действует только один день — утром следующего дня приходится платить повторно. Не очень честно.' },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [news, setN] = useState<NewsItem[]>(() => load('om_news', defaultNews))
  const [rooms, setR] = useState<RoomItem[]>(() => load('om_rooms', defaultRooms))
  const [freeServices, setF] = useState<string[]>(() => load('om_free', defaultFreeServices))
  const [paidServices, setP] = useState<ServiceItem[]>(() => load('om_paid', defaultPaidServices))
  const [siteMedia, setM] = useState<SiteMedia>(() => load('om_media', defaultSiteMedia))
  const [users, setUsersState] = useState<User[]>(() => load('om_users', []))
  const [currentUser, setCurrent] = useState<User | null>(() => {
    const id = sessionStorage.getItem('om_uid')
    if (!id) return null
    const all: User[] = load('om_users', [])
    return all.find(u => u.id === id) ?? null
  })
  const [reviews, setReviewsState] = useState<Review[]>(() => load('om_reviews', defaultReviews))

  const setNews = (n: NewsItem[]) => { setN(n); save('om_news', n) }
  const setRooms = (r: RoomItem[]) => { setR(r); save('om_rooms', r) }
  const setFreeServices = (s: string[]) => { setF(s); save('om_free', s) }
  const setPaidServices = (s: ServiceItem[]) => { setP(s); save('om_paid', s) }
  const setSiteMedia = (m: SiteMedia) => { setM(m); save('om_media', m) }
  const setUsers = (u: User[]) => { setUsersState(u); save('om_users', u) }
  const setReviews = (r: Review[]) => { setReviewsState(r); save('om_reviews', r) }

  const register = (name: string, email: string, password: string): boolean => {
    const all: User[] = load('om_users', [])
    if (all.some(u => u.email.toLowerCase() === email.toLowerCase())) return false
    const user: User = { id: Date.now().toString(), name, email, passwordHash: simpleHash(password), createdAt: new Date().toISOString() }
    const next = [...all, user]
    setUsersState(next); save('om_users', next)
    setCurrent(user); sessionStorage.setItem('om_uid', user.id)
    return true
  }

  const login = (email: string, password: string): boolean => {
    const all: User[] = load('om_users', [])
    const user = all.find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === simpleHash(password))
    if (!user) return false
    setCurrent(user); sessionStorage.setItem('om_uid', user.id)
    return true
  }

  const logout = () => { setCurrent(null); sessionStorage.removeItem('om_uid') }

  return (
    <DataContext.Provider value={{ news, setNews, rooms, setRooms, freeServices, setFreeServices, paidServices, setPaidServices, siteMedia, setSiteMedia, users, setUsers, currentUser, login, register, logout, reviews, setReviews }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
