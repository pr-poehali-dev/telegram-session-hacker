import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/20e35d09-9677-4d91-b7fb-c85cddc2fabd/bucket/d993df36-c218-4739-9aa8-f187510ece1e.jpg";
const FISHERMAN_IMG = "https://cdn.poehali.dev/projects/20e35d09-9677-4d91-b7fb-c85cddc2fabd/files/ab134450-9532-491e-a7e3-cdb9c3de89bd.jpg";
const ICE_IMG = "https://cdn.poehali.dev/projects/20e35d09-9677-4d91-b7fb-c85cddc2fabd/files/3d7f525e-d319-4052-96fa-407ef8691aa8.jpg";

const PRODUCTS = [
  { id: 1, name: "VAR Classic 5см", weight: "7г", color: "Серебро/Красный", price: 490, oldPrice: 620, inStock: true, tag: "Хит" },
  { id: 2, name: "VAR Deep 7см", weight: "14г", color: "Золото/Синий", price: 650, oldPrice: null, inStock: true, tag: null },
  { id: 3, name: "VAR Micro 3.5см", weight: "4г", color: "Перламутр", price: 380, oldPrice: 450, inStock: true, tag: "Новинка" },
  { id: 4, name: "VAR Pro 6см", weight: "10г", color: "Медь/Зелёный", price: 720, oldPrice: null, inStock: false, tag: null },
  { id: 5, name: "VAR Ice 5см", weight: "8г", color: "Белый/Синий", price: 540, oldPrice: 610, inStock: true, tag: null },
  { id: 6, name: "VAR Pike 8см", weight: "18г", color: "Жёлтый/Чёрный", price: 890, oldPrice: null, inStock: true, tag: "Новинка" },
];

const REVIEWS = [
  { name: "Алексей М.", city: "Москва", rating: 5, text: "Заказываю балансиры VAR уже третий год. Качество отменное — краска не слезает, хвостовик прочный. Щука берёт хорошо!", date: "Январь 2025" },
  { name: "Сергей К.", city: "Тюмень", rating: 5, text: "Доставка пришла за 4 дня в Тюмень. Упаковка надёжная, все балансиры целые. VAR Classic — мой фаворит на окуня.", date: "Февраль 2025" },
  { name: "Дмитрий Л.", city: "Красноярск", rating: 5, text: "VAR Deep — просто бомба на глубине! Поймал судака на 3.2 кг. Однозначно рекомендую всем зимним рыбакам.", date: "Декабрь 2024" },
  { name: "Иван П.", city: "Екатеринбург", rating: 4, text: "Хорошие балансиры за свои деньги. VAR Micro на мелководье работает лучше всего. Буду заказывать ещё.", date: "Январь 2025" },
];

type Section = "home" | "catalog" | "reviews" | "delivery" | "about" | "contacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Привет! 👋 Я помогу с выбором и оформлением заказа балансиров VAR. Напишите ваш вопрос!" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [orderProduct, setOrderProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", city: "", qty: "1" });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput("");
    setChatMessages((p) => [...p, { from: "user", text }]);
    setTimeout(() => {
      setChatMessages((p) => [
        ...p,
        { from: "bot", text: "Спасибо! Наш менеджер ответит в течение нескольких минут. Также можно позвонить: +7 (900) 000-00-00" },
      ]);
    }, 900);
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  const navItems: { label: string; section: Section }[] = [
    { label: "Главная", section: "home" },
    { label: "Каталог", section: "catalog" },
    { label: "Отзывы", section: "reviews" },
    { label: "Доставка", section: "delivery" },
    { label: "О нас", section: "about" },
    { label: "Контакты", section: "contacts" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0d1b2e]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-2.5">
            <span className="text-xl">🎣</span>
            <span className="text-white font-black text-xl tracking-tight">VAR</span>
            <span className="hidden sm:block text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">Балансиры</span>
          </button>
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((n) => (
              <button
                key={n.section}
                onClick={() => setActiveSection(n.section)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === n.section
                    ? "bg-[#e87b20] text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen((v) => !v)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d1b2e] px-4 pb-3 flex flex-col gap-1 border-t border-white/10">
            {navItems.map((n) => (
              <button
                key={n.section}
                onClick={() => { setActiveSection(n.section); setMobileMenuOpen(false); }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === n.section ? "bg-[#e87b20] text-white" : "text-white/70"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">

        {/* ══════════════ ГЛАВНАЯ ══════════════ */}
        {activeSection === "home" && (
          <div>

            {/* HERO — фото балансиров */}
            <section className="relative overflow-hidden min-h-[92vh] flex items-center">
              {/* Фоновое изображение */}
              <div className="absolute inset-0">
                <img
                  src={HERO_IMG}
                  alt="Балансиры VAR"
                  className="w-full h-full object-cover object-center"
                />
                {/* Тёмный градиент поверх */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2e]/90 via-[#0d1b2e]/60 to-[#0d1b2e]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/80 via-transparent to-transparent" />
              </div>

              {/* Контент */}
              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 bg-[#e87b20]/20 border border-[#e87b20]/40 rounded-full px-4 py-1.5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#e87b20] animate-pulse" />
                    <span className="text-[#e87b20] text-xs font-semibold uppercase tracking-widest">Сезон 2025 открыт</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-2 tracking-tight">
                    БАЛАНСИРЫ
                  </h1>
                  <h2 className="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight"
                    style={{ WebkitTextStroke: "2px #e87b20", color: "transparent" }}>
                    VAR
                  </h2>

                  <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-md">
                    Профессиональные приманки для зимней рыбалки. Щука, судак, окунь — берёт с первой проводки.
                    Доставка по всей России.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveSection("catalog")}
                      className="px-8 py-3.5 bg-[#e87b20] hover:bg-[#d06a15] text-white font-bold rounded-xl text-base transition-all hover:scale-105 shadow-lg shadow-[#e87b20]/30"
                    >
                      Перейти в каталог
                    </button>
                    <button
                      onClick={() => setChatOpen(true)}
                      className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-base border border-white/25 backdrop-blur transition-all"
                    >
                      Написать нам
                    </button>
                  </div>

                  {/* Мини-статистика */}
                  <div className="flex gap-8 mt-10">
                    {[["50к+", "покупателей"], ["10 лет", "на рынке"], ["85+", "регионов"]].map(([val, label]) => (
                      <div key={label}>
                        <p className="text-white font-black text-xl">{val}</p>
                        <p className="text-white/50 text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Скролл-хинт */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
                <span className="text-white/40 text-xs">листайте</span>
                <Icon name="ChevronDown" size={18} className="text-white/40" />
              </div>
            </section>

            {/* ПРЕИМУЩЕСТВА */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: "Shield", title: "Проверенное качество", desc: "Краска держится несколько сезонов. Каждый балансир проходит контроль." },
                  { icon: "Truck", title: "Доставка по России", desc: "СДЭК и Почта России в любой регион. Бесплатно от 2000 ₽." },
                  { icon: "Bell", title: "Уведомления о ценах", desc: "Подписывайтесь на уведомления о поступлении и снижении цен." },
                ].map((f, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform border border-gray-100">
                    <div className="w-11 h-11 rounded-xl bg-[#0d1b2e] flex items-center justify-center mb-4">
                      <Icon name={f.icon} size={20} className="text-[#e87b20]" />
                    </div>
                    <h3 className="font-bold text-[#0d1b2e] text-base mb-1.5">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ПОПУЛЯРНЫЕ ТОВАРЫ */}
            <section className="py-8 px-4 max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-7">
                <div>
                  <h2 className="text-3xl font-black text-[#0d1b2e]">Популярные модели</h2>
                  <p className="text-gray-500 text-sm mt-1">Самые востребованные балансиры сезона</p>
                </div>
                <button
                  onClick={() => setActiveSection("catalog")}
                  className="text-[#e87b20] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Все товары <Icon name="ArrowRight" size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PRODUCTS.filter((p) => p.inStock).slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} onOrder={setOrderProduct} />
                ))}
              </div>
            </section>

            {/* CTA БАННЕР */}
            <section className="px-4 py-12 max-w-7xl mx-auto">
              <div
                className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-center"
                style={{ background: "linear-gradient(135deg, #0d1b2e 0%, #1a3a5c 100%)" }}
              >
                <img src={FISHERMAN_IMG} alt="" className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-25 hidden md:block" />
                <div className="relative z-10 px-8 md:px-14 py-10 max-w-md">
                  <p className="text-[#e87b20] text-xs font-bold uppercase tracking-widest mb-2">Новый сезон</p>
                  <h2 className="text-3xl font-black text-white mb-3 leading-tight">Новые расцветки 2025 уже в наличии</h2>
                  <p className="text-white/65 text-sm mb-6 leading-relaxed">Пополнили ассортимент специально к зимнему сезону. Уникальные цвета, которых нет у конкурентов.</p>
                  <button
                    onClick={() => setActiveSection("catalog")}
                    className="px-6 py-3 bg-[#e87b20] text-white font-bold rounded-xl hover:bg-[#d06a15] transition-colors"
                  >
                    Смотреть каталог
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ══════════════ КАТАЛОГ ══════════════ */}
        {activeSection === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-black text-[#0d1b2e] mb-1">Каталог балансиров VAR</h1>
            <p className="text-gray-500 mb-7">Профессиональные приманки для зимней рыбалки</p>

            {/* Подписка на уведомления */}
            <div className="bg-white rounded-2xl p-5 mb-8 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
              <div className="flex-1">
                <p className="font-semibold text-[#0d1b2e] flex items-center gap-2 mb-0.5">
                  <Icon name="Bell" size={16} className="text-[#e87b20]" /> Уведомления о товарах
                </p>
                <p className="text-sm text-gray-500">Оповещение о поступлении и снижении цен на ваш email</p>
              </div>
              {!notifySubmitted ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); setNotifySubmitted(true); }}
                  className="flex gap-2 w-full sm:w-auto"
                >
                  <input
                    type="email" required placeholder="ваш@email.ru"
                    value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm flex-1 sm:w-44 focus:outline-none focus:ring-2 focus:ring-[#0d1b2e]"
                  />
                  <button type="submit" className="px-4 py-2 bg-[#0d1b2e] text-white rounded-xl text-sm font-semibold hover:bg-[#1a3a5c] transition-colors whitespace-nowrap">
                    Подписаться
                  </button>
                </form>
              ) : (
                <p className="text-green-600 font-semibold text-sm flex items-center gap-1.5">
                  <Icon name="CheckCircle" size={16} /> Вы подписаны!
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} onOrder={setOrderProduct} />
              ))}
            </div>
          </div>
        )}

        {/* ══════════════ ОТЗЫВЫ ══════════════ */}
        {activeSection === "reviews" && (
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-[#0d1b2e] mb-2">Отзывы покупателей</h1>
              <p className="text-gray-500">Реальные отзывы рыбаков по всей России</p>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[1,2,3,4,5].map(i => <span key={i} className="text-[#e87b20] text-2xl">★</span>)}
                <span className="font-bold text-lg ml-2">5.0</span>
                <span className="text-gray-400 text-sm ml-1">· 47 отзывов</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-[#0d1b2e]">{r.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Icon name="MapPin" size={10} />{r.city} · {r.date}
                      </p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <span key={j} className="text-[#e87b20]">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
                </div>
              ))}
            </div>
            <div className="bg-[#0d1b2e] rounded-2xl p-8 text-center text-white">
              <h3 className="text-xl font-bold mb-2">Поделитесь своим уловом!</h3>
              <p className="text-white/60 text-sm mb-4">Напишите нам в чат — разместим ваш отзыв</p>
              <button onClick={() => setChatOpen(true)} className="px-6 py-2.5 bg-[#e87b20] text-white font-bold rounded-xl hover:bg-[#d06a15] transition-colors">
                Написать отзыв
              </button>
            </div>
          </div>
        )}

        {/* ══════════════ ДОСТАВКА ══════════════ */}
        {activeSection === "delivery" && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-black text-[#0d1b2e] mb-1">Доставка по России</h1>
            <p className="text-gray-500 mb-8">Отправляем балансиры в любой регион страны</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {[
                { icon: "Package", title: "СДЭК", desc: "В пункт выдачи или курьером. Срок 3–7 рабочих дней.", price: "от 250 ₽" },
                { icon: "Mail", title: "Почта России", desc: "В любое отделение страны. Срок 5–14 рабочих дней.", price: "от 150 ₽" },
                { icon: "Zap", title: "Экспресс", desc: "Срочно курьером по Москве и области в день заказа.", price: "от 500 ₽" },
                { icon: "ShoppingBag", title: "Самовывоз", desc: "Бесплатно. Адрес в Москве уточняется при заказе.", price: "Бесплатно" },
              ].map((d, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#0d1b2e] flex items-center justify-center">
                      <Icon name={d.icon} size={18} className="text-[#e87b20]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0d1b2e]">{d.title}</p>
                      <p className="text-xs text-[#e87b20] font-semibold">{d.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#0d1b2e] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="Info" size={18} className="text-[#e87b20]" /> Условия
              </h3>
              <ul className="space-y-2 text-sm text-white/75">
                {[
                  "Бесплатная доставка при заказе от 2000 ₽",
                  "Упаковка — пузырчатая плёнка, балансиры доходят целыми",
                  "Отправка на следующий рабочий день после оплаты",
                  "Трек-номер отправляется на email или WhatsApp",
                  "Оплата: банковская карта, СБП, наложенный платёж",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <Icon name="Check" size={13} className="mt-0.5 text-[#e87b20] flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ══════════════ О НАС ══════════════ */}
        {activeSection === "about" && (
          <div>
            <div className="relative min-h-[45vh] flex items-end overflow-hidden">
              <img src={ICE_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e] via-[#0d1b2e]/50 to-transparent" />
              <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12 w-full">
                <h1 className="text-5xl font-black text-white mb-2">О компании VAR</h1>
                <p className="text-white/60 text-lg">Делаем рыбалку результативной с 2015 года</p>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#0d1b2e] mb-4">Наша история</h2>
                  <p className="text-gray-500 leading-relaxed mb-4">VAR начался как небольшое производство рыболовных приманок в Подмосковье. Основатель — заядлый рыбак с 20-летним стажем.</p>
                  <p className="text-gray-500 leading-relaxed">За 10 лет выросли в полноценный бренд. Наши балансиры используют рыбаки от Калининграда до Владивостока.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-[#0d1b2e] mb-4">В цифрах</h3>
                  {[["10+", "лет на рынке"], ["50 000+", "покупателей"], ["25+", "моделей"], ["85+", "регионов доставки"]].map(([n, l]) => (
                    <div key={l} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="font-black text-2xl text-[#0d1b2e]">{n}</span>
                      <span className="text-gray-400 text-sm">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#0d1b2e] rounded-2xl p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-3">Наша миссия</h3>
                <p className="text-white/65 leading-relaxed max-w-xl mx-auto text-lg italic">
                  "Делаем балансиры, которые работают в самых сложных условиях — когда рыба капризная, лёд толстый, а мороз жмёт."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ КОНТАКТЫ ══════════════ */}
        {activeSection === "contacts" && (
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-black text-[#0d1b2e] mb-1">Контакты</h1>
            <p className="text-gray-500 mb-8">Всегда рады помочь с выбором балансира</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00", sub: "Пн–Пт 9:00–18:00 МСК" },
                { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (900) 000-00-00", sub: "Отвечаем быстро" },
                { icon: "Mail", label: "Email", value: "info@var-fishing.ru", sub: "Ответ в течение 24 часов" },
                { icon: "MapPin", label: "Адрес", value: "г. Москва", sub: "Самовывоз по договорённости" },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                  <div className="w-11 h-11 rounded-xl bg-[#0d1b2e] flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={19} className="text-[#e87b20]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{c.label}</p>
                    <p className="font-semibold text-[#0d1b2e]">{c.value}</p>
                    <p className="text-xs text-gray-400">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <p className="font-semibold text-[#0d1b2e] mb-1">Чат поддержки</p>
              <p className="text-sm text-gray-500 mb-4">Ответим на любой вопрос о продукте и доставке</p>
              <button
                onClick={() => setChatOpen(true)}
                className="w-full py-3 bg-[#0d1b2e] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1a3a5c] transition-colors"
              >
                <Icon name="MessageCircle" size={18} /> Открыть чат
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0d1b2e] text-white/50 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🎣</span>
            <span className="font-black text-white">VAR</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest">Балансиры</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm justify-center">
            {navItems.map((n) => (
              <button key={n.section} onClick={() => setActiveSection(n.section)} className="hover:text-white transition-colors">
                {n.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/30">© 2025 VAR. Доставка по всей России</p>
        </div>
      </footer>

      {/* CHAT TOGGLE */}
      <button
        onClick={() => setChatOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#e87b20] text-white rounded-full shadow-xl shadow-[#e87b20]/30 flex items-center justify-center hover:bg-[#d06a15] transition-all hover:scale-110"
      >
        <Icon name={chatOpen ? "X" : "MessageCircle"} size={24} />
      </button>

      {/* CHAT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-80 rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white" style={{ maxHeight: "68vh" }}>
          <div className="bg-[#0d1b2e] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e87b20] flex items-center justify-center text-sm font-bold text-white">V</div>
            <div>
              <p className="text-white font-semibold text-sm">Поддержка VAR</p>
              <p className="text-white/40 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />Онлайн</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-[#0d1b2e] text-white rounded-br-sm"
                    : "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-2 flex gap-2 border-t border-gray-100 bg-white">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ваш вопрос..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d1b2e]"
            />
            <button onClick={sendMessage} className="w-9 h-9 bg-[#0d1b2e] text-white rounded-xl flex items-center justify-center hover:bg-[#1a3a5c] transition-colors">
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ORDER MODAL */}
      {orderProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#0d1b2e] p-5 text-white flex items-start justify-between">
              <div>
                <p className="text-white/50 text-xs mb-0.5">Оформление заказа</p>
                <h3 className="font-bold text-lg">{orderProduct.name}</h3>
                <p className="text-[#e87b20] font-black text-xl">{orderProduct.price} ₽</p>
              </div>
              <button onClick={() => setOrderProduct(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="p-5">
              {!orderSubmitted ? (
                <form onSubmit={submitOrder} className="space-y-3">
                  {[
                    { label: "Ваше имя *", field: "name" as const, placeholder: "Иван Иванов" },
                    { label: "Телефон *", field: "phone" as const, placeholder: "+7 (___) ___-__-__" },
                    { label: "Город доставки *", field: "city" as const, placeholder: "Москва" },
                  ].map(({ label, field, placeholder }) => (
                    <div key={field}>
                      <label className="text-xs text-gray-400 block mb-1">{label}</label>
                      <input
                        required placeholder={placeholder}
                        value={orderForm[field]}
                        onChange={(e) => setOrderForm((f) => ({ ...f, [field]: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d1b2e]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Количество</label>
                    <select
                      value={orderForm.qty}
                      onChange={(e) => setOrderForm((f) => ({ ...f, qty: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d1b2e]"
                    >
                      {[1,2,3,4,5,10].map(n => <option key={n} value={n}>{n} шт.</option>)}
                    </select>
                  </div>
                  <p className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3">
                    💳 Менеджер свяжется с вами для уточнения оплаты (карта, СБП)
                  </p>
                  <button type="submit" className="w-full py-3 bg-[#e87b20] text-white font-bold rounded-xl hover:bg-[#d06a15] transition-colors">
                    Отправить заявку
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0d1b2e] mb-2">Заявка принята!</h3>
                  <p className="text-sm text-gray-500 mb-4">Наш менеджер свяжется с вами по телефону для подтверждения и оплаты.</p>
                  <button onClick={() => setOrderProduct(null)} className="px-6 py-2.5 bg-[#0d1b2e] text-white rounded-xl font-semibold hover:bg-[#1a3a5c] transition-colors">
                    Закрыть
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onOrder }: {
  product: typeof PRODUCTS[0];
  onOrder: (p: typeof PRODUCTS[0]) => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform flex flex-col">
      <div className="relative bg-gradient-to-br from-[#e8f0f8] to-[#d0e0f0] h-44 flex items-center justify-center">
        <span className="text-6xl">🎣</span>
        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
            product.tag === "Хит" ? "bg-[#e87b20] text-white" : "bg-[#0d1b2e] text-white"
          }`}>
            {product.tag}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-400">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#0d1b2e] text-base mb-0.5">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{product.color} · {product.weight}</p>
        <div className="flex items-center gap-2 mt-auto mb-3">
          <span className="font-black text-xl text-[#0d1b2e]">{product.price} ₽</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{product.oldPrice} ₽</span>
          )}
        </div>
        {product.inStock ? (
          <button
            onClick={() => onOrder(product)}
            className="w-full py-2.5 bg-[#0d1b2e] hover:bg-[#1a3a5c] text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Заказать
          </button>
        ) : (
          <button className="w-full py-2.5 bg-gray-100 text-gray-400 font-semibold rounded-xl text-sm flex items-center justify-center gap-1.5">
            <Icon name="Bell" size={13} /> Уведомить о поступлении
          </button>
        )}
      </div>
    </div>
  );
}
