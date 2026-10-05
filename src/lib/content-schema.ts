/**
 * Single source of truth for every CMS-editable value.
 * Defaults are used until an admin saves a value in the database,
 * so the site renders correctly on a fresh install.
 * Adding an entry here makes it editable in /admin automatically.
 */

export type TextField = {
  key: string;
  label: string;
  multiline?: boolean;
  ka: string;
  ru: string;
  en: string;
};

export type TextSection = {
  id: string;
  title: string;
  description?: string;
  fields: TextField[];
};

export const TEXT_SECTIONS: TextSection[] = [
  {
    id: "hero",
    title: "Hero",
    description: "Main banner at the top of the home page.",
    fields: [
      { key: "hero.eyebrow", label: "Eyebrow (small line above title)", ka: "ვიზუალი · ქუთაისი", ru: "Vizuali · Кутаиси", en: "Vizuali · Kutaisi" },
      { key: "hero.title", label: "Title", ka: "სილამაზის სალონი ქუთაისში", ru: "Салон красоты в Кутаиси", en: "Beauty Salon in Kutaisi" },
      {
        key: "hero.subtitle",
        label: "Subtitle",
        multiline: true,
        ka: "თმა, ფრჩხილები, მაკიაჟი, წარბები და წამწამები — ყველაფერი ერთ სივრცეში. პროფესიონალი ოსტატები და ინდივიდუალური მიდგომა თითოეული კლიენტისადმი.",
        ru: "Волосы, ногти, макияж, брови и ресницы — всё в одном месте. Профессиональные мастера и индивидуальный подход к каждой гостье.",
        en: "Hair, nails, makeup, brows and lashes — all in one place. Professional masters and an individual approach to every guest.",
      },
      { key: "hero.feature1", label: "Feature 1", ka: "თმის შეღებვა და ვარცხნილობები", ru: "Окрашивание и укладки", en: "Colouring & styling" },
      { key: "hero.feature2", label: "Feature 2", ka: "მანიკური და პედიკური", ru: "Маникюр и педикюр", en: "Manicure & pedicure" },
      { key: "hero.feature3", label: "Feature 3", ka: "საქორწილო მაკიაჟი", ru: "Свадебный образ", en: "Bridal looks" },
      { key: "hero.badge.value", label: "Badge — value", ka: "4.7", ru: "4.7", en: "4.7" },
      { key: "hero.badge.label", label: "Badge — label", ka: "Google-ის შეფასება", ru: "рейтинг в Google", en: "Google rating" },
    ],
  },
  {
    id: "about",
    title: "About us",
    fields: [
      { key: "about.eyebrow", label: "Eyebrow", ka: "ჩვენ შესახებ", ru: "О салоне", en: "About us" },
      { key: "about.title", label: "Title", ka: "ადგილი, სადაც სილამაზე ხელოვნებაა", ru: "Место, где красота становится искусством", en: "Where beauty becomes an art" },
      {
        key: "about.text",
        label: "Text",
        multiline: true,
        ka: "ვიზუალი — სტილური სილამაზის სალონი ქუთაისის ცენტრში, ვარლამიშვილის ქუჩაზე. ჩვენი პროფესიონალი ოსტატები გთავაზობენ მომსახურების მაღალ დონეს და ინდივიდუალურ მიდგომას თითოეული სტუმრისადმი.\n\nთმის შეღებვა და შეჭრა, ვარცხნილობები, მაკიაჟი, მანიკური, წარბები, წამწამები და სახის მოვლა — ყველაფერი ერთ ნათელ, თანამედროვე სივრცეში. ჩვენ მუდმივად ვვითარდებით: ვნერგავთ ახალ ტექნიკებს და ვიყენებთ პროფესიონალურ კოსმეტიკას.",
        ru: "Vizuali — стильный салон красоты в центре Кутаиси, на улице Варламишвили. Наши профессиональные мастера обеспечивают высокий уровень сервиса и индивидуальный подход к каждой гостье.\n\nОкрашивание и стрижки, причёски, макияж, маникюр, брови, ресницы и уход за лицом — всё в одном светлом современном пространстве. Мы постоянно развиваемся: осваиваем новые техники и работаем на профессиональной косметике.",
        en: "Vizuali is a stylish beauty salon in the centre of Kutaisi, on Varlamishvili Street. Our professional masters offer a high level of service and an individual approach to every guest.\n\nColouring and haircuts, hairstyles, makeup, manicure, brows, lashes and skin care — all in one bright, modern space. We never stand still: we keep learning new techniques and work only with professional cosmetics.",
      },
      { key: "about.stat1.value", label: "Stat 1 — value", ka: "4.7 ★", ru: "4.7 ★", en: "4.7 ★" },
      { key: "about.stat1.label", label: "Stat 1 — label", ka: "შეფასება Google-ზე", ru: "рейтинг в Google", en: "Google rating" },
      { key: "about.stat2.value", label: "Stat 2 — value", ka: "60+", ru: "60+", en: "60+" },
      { key: "about.stat2.label", label: "Stat 2 — label", ka: "შეფასება კლიენტებისგან", ru: "отзывов клиентов", en: "Client reviews" },
      { key: "about.stat3.value", label: "Stat 3 — value", ka: "6", ru: "6", en: "6" },
      { key: "about.stat3.label", label: "Stat 3 — label", ka: "სამუშაო დღე კვირაში", ru: "рабочих дней в неделю", en: "Days a week" },
    ],
  },
  {
    id: "services",
    title: "Services section",
    description: "Heading of the services block. The services themselves are edited in Admin → Services.",
    fields: [
      { key: "services.eyebrow", label: "Eyebrow", ka: "სერვისები", ru: "Услуги", en: "Services" },
      { key: "services.title", label: "Title", ka: "ჩვენი მომსახურება", ru: "Наши услуги", en: "Our services" },
      {
        key: "services.subtitle",
        label: "Subtitle",
        multiline: true,
        ka: "აირჩიეთ სერვისი და ჩაეწერეთ ონლაინ — ჩვენ დაგიკავშირდებით დროის დასადასტურებლად.",
        ru: "Выберите услугу и запишитесь онлайн — мы свяжемся с вами, чтобы подтвердить время.",
        en: "Choose a service and book online — we will contact you to confirm the time.",
      },
    ],
  },
  {
    id: "prices",
    title: "Prices page",
    fields: [
      { key: "prices.eyebrow", label: "Eyebrow", ka: "ფასები", ru: "Цены", en: "Prices" },
      { key: "prices.title", label: "Title", ka: "ფასები და ხანგრძლივობა", ru: "Цены и длительность", en: "Prices & duration" },
      {
        key: "prices.subtitle",
        label: "Subtitle",
        multiline: true,
        ka: "საბოლოო ფასი დამოკიდებულია თმის სიგრძეზე, მასალებსა და სამუშაოს მოცულობაზე — ოსტატი დაგიზუსტებთ კონსულტაციისას.",
        ru: "Итоговая цена зависит от длины волос, материалов и объёма работы — мастер уточнит её на консультации.",
        en: "The final price depends on hair length, materials and the amount of work — your master will confirm it at the consultation.",
      },
      {
        key: "prices.note",
        label: "Note under the table",
        multiline: true,
        ka: "ფასები მითითებულია ლარში. საქორწილო პაკეტებისა და ჯგუფური ჩაწერისთვის დაგვიკავშირდით — შემოგთავაზებთ სპეციალურ პირობებს.",
        ru: "Цены указаны в лари. Для свадебных пакетов и групповой записи свяжитесь с нами — предложим специальные условия.",
        en: "Prices are in GEL. For bridal packages and group bookings, contact us — we will offer special terms.",
      },
    ],
  },
  {
    id: "advantages",
    title: "Why choose us (advantages)",
    fields: [
      { key: "advantages.eyebrow", label: "Eyebrow", ka: "რატომ ჩვენ", ru: "Почему мы", en: "Why choose us" },
      { key: "advantages.title", label: "Title", ka: "ზრუნვა ყოველ დეტალში", ru: "Забота в каждой детали", en: "Care in every detail" },
      { key: "advantages.1.title", label: "Advantage 1 — title", ka: "პროფესიონალი ოსტატები", ru: "Профессиональные мастера", en: "Professional masters" },
      { key: "advantages.1.text", label: "Advantage 1 — text", multiline: true, ka: "გამოცდილი სტილისტები და ოსტატები, რომლებიც რეგულარულად ეუფლებიან ახალ ტექნიკებს.", ru: "Опытные стилисты и мастера, которые регулярно осваивают новые техники.", en: "Experienced stylists and masters who keep mastering new techniques." },
      { key: "advantages.2.title", label: "Advantage 2 — title", ka: "პროფესიონალური კოსმეტიკა", ru: "Профессиональная косметика", en: "Professional cosmetics" },
      { key: "advantages.2.text", label: "Advantage 2 — text", multiline: true, ka: "ვმუშაობთ მხოლოდ სანდო ბრენდების ხარისხიან საღებავებსა და მოვლის საშუალებებზე.", ru: "Работаем только на качественных красителях и уходе от проверенных брендов.", en: "We only use quality colours and care products from trusted brands." },
      { key: "advantages.3.title", label: "Advantage 3 — title", ka: "ყველაფერი ერთ ადგილას", ru: "Всё в одном месте", en: "Everything in one place" },
      { key: "advantages.3.text", label: "Advantage 3 — text", multiline: true, ka: "თმა, ფრჩხილები, მაკიაჟი, წარბები და სახის მოვლა — სრული იმიჯი ერთ ვიზიტში.", ru: "Волосы, ногти, макияж, брови и уход за лицом — полный образ за один визит.", en: "Hair, nails, makeup, brows and skin care — a complete look in one visit." },
      { key: "advantages.4.title", label: "Advantage 4 — title", ka: "ინდივიდუალური მიდგომა", ru: "Индивидуальный подход", en: "Individual approach" },
      { key: "advantages.4.text", label: "Advantage 4 — text", multiline: true, ka: "ვუსმენთ თქვენს სურვილებს და ვარჩევთ სტილს, რომელიც სწორედ თქვენ მოგიხდებათ.", ru: "Слушаем ваши пожелания и подбираем образ, который подойдёт именно вам.", en: "We listen to your wishes and create the look that suits you best." },
      { key: "advantages.5.title", label: "Advantage 5 — title", ka: "მყუდრო სივრცე", ru: "Уютное пространство", en: "Cosy, modern space" },
      { key: "advantages.5.text", label: "Advantage 5 — text", multiline: true, ka: "ნათელი, თანამედროვე ინტერიერი, რომელიც მუდმივად ახლდება — აქ სასიამოვნოა დროის გატარება.", ru: "Светлый современный интерьер, который постоянно обновляется, — здесь приятно проводить время.", en: "A bright, modern interior that is constantly refreshed — a pleasure to spend time in." },
    ],
  },
  {
    id: "process",
    title: "How a visit works",
    fields: [
      { key: "process.eyebrow", label: "Eyebrow", ka: "როგორ ჩავეწეროთ", ru: "Как записаться", en: "How it works" },
      { key: "process.title", label: "Title", ka: "თქვენი ვიზიტი ოთხ ნაბიჯში", ru: "Ваш визит в четыре шага", en: "Your visit in four steps" },
      { key: "process.1.title", label: "Step 1 — title", ka: "აირჩიეთ სერვისი", ru: "Выберите услугу", en: "Choose a service" },
      { key: "process.1.text", label: "Step 1 — text", multiline: true, ka: "გაეცანით სერვისებს და ფასებს საიტზე.", ru: "Посмотрите услуги и цены на сайте.", en: "Browse our services and prices on the website." },
      { key: "process.2.title", label: "Step 2 — title", ka: "ჩაეწერეთ", ru: "Запишитесь", en: "Book" },
      { key: "process.2.text", label: "Step 2 — text", multiline: true, ka: "შეავსეთ ფორმა ან მოგვწერეთ WhatsApp-ზე — დაგიდასტურებთ დროს.", ru: "Заполните форму или напишите в WhatsApp — мы подтвердим время.", en: "Fill in the form or message us on WhatsApp — we will confirm the time." },
      { key: "process.3.title", label: "Step 3 — title", ka: "კონსულტაცია ოსტატთან", ru: "Консультация с мастером", en: "Consultation" },
      { key: "process.3.text", label: "Step 3 — text", multiline: true, ka: "ოსტატი განიხილავს თქვენს სურვილებს და შეგირჩევთ საუკეთესო ვარიანტს.", ru: "Мастер обсудит ваши пожелания и предложит лучший вариант.", en: "Your master discusses your wishes and suggests the best option." },
      { key: "process.4.title", label: "Step 4 — title", ka: "ისიამოვნეთ შედეგით", ru: "Наслаждайтесь результатом", en: "Enjoy the result" },
      { key: "process.4.text", label: "Step 4 — text", multiline: true, ka: "მიიღეთ რჩევები სახლში მოვლაზე, რომ შედეგი დიდხანს შეინარჩუნოთ.", ru: "Получите советы по домашнему уходу, чтобы результат держался дольше.", en: "Get home-care tips so your result lasts longer." },
    ],
  },
  {
    id: "results",
    title: "Portfolio section",
    description: "Heading of the works gallery. Photos are managed in Admin → Portfolio.",
    fields: [
      { key: "results.eyebrow", label: "Eyebrow", ka: "პორტფოლიო", ru: "Портфолио", en: "Portfolio" },
      { key: "results.title", label: "Title", ka: "ჩვენი ნამუშევრები", ru: "Наши работы", en: "Our works" },
      { key: "results.subtitle", label: "Subtitle", multiline: true, ka: "შეღებვა, ვარცხნილობები, მაკიაჟი და მანიკური — ნამუშევრები ჩვენი ოსტატების ხელით.", ru: "Окрашивания, причёски, макияж и маникюр — работы наших мастеров.", en: "Colouring, hairstyles, makeup and nails — created by our masters." },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials section",
    description: "Heading of the reviews block. Reviews are managed in Admin → Testimonials.",
    fields: [
      { key: "testimonials.eyebrow", label: "Eyebrow", ka: "შეფასებები", ru: "Отзывы", en: "Testimonials" },
      { key: "testimonials.title", label: "Title", ka: "რას ამბობენ ჩვენი კლიენტები", ru: "Что говорят наши клиенты", en: "What our clients say" },
    ],
  },
  {
    id: "faq",
    title: "FAQ section",
    description: "Heading of the FAQ block. Questions are managed in Admin → FAQ.",
    fields: [
      { key: "faq.eyebrow", label: "Eyebrow", ka: "FAQ", ru: "FAQ", en: "FAQ" },
      { key: "faq.title", label: "Title", ka: "ხშირად დასმული კითხვები", ru: "Частые вопросы", en: "Frequently asked questions" },
      { key: "faq.subtitle", label: "Subtitle", multiline: true, ka: "ვერ იპოვეთ პასუხი? დაგვირეკეთ ან მოგვწერეთ WhatsApp-ზე.", ru: "Не нашли ответ? Позвоните нам или напишите в WhatsApp.", en: "Didn't find your answer? Call us or message us on WhatsApp." },
    ],
  },
  {
    id: "contact",
    title: "Contacts section",
    fields: [
      { key: "contact.eyebrow", label: "Eyebrow", ka: "კონტაქტი", ru: "Контакты", en: "Contact" },
      { key: "contact.title", label: "Title", ka: "გელოდებით სალონში", ru: "Ждём вас в салоне", en: "We look forward to seeing you" },
      { key: "contact.subtitle", label: "Subtitle", multiline: true, ka: "დაგვირეკეთ, მოგვწერეთ WhatsApp-ზე ან ჩაეწერეთ ონლაინ.", ru: "Позвоните, напишите в WhatsApp или запишитесь онлайн.", en: "Call us, message us on WhatsApp or book online." },
      { key: "contact.address", label: "Address", ka: "ვარლამიშვილის ქ. 9, ქუთაისი", ru: "ул. Варламишвили 9, Кутаиси", en: "9 Varlamishvili Street, Kutaisi" },
      { key: "contact.hours", label: "Working hours", ka: "09:30–19:00 · ოთხშაბათი — დასვენება", ru: "09:30–19:00 · среда — выходной", en: "09:30–19:00 · closed on Wednesdays" },
    ],
  },
  {
    id: "cta",
    title: "Booking call-to-action",
    description: "Banner that invites visitors to book (above the contacts).",
    fields: [
      { key: "cta.title", label: "Title", ka: "მზად ხართ ახალი იმიჯისთვის?", ru: "Готовы к новому образу?", en: "Ready for a new look?" },
      { key: "cta.text", label: "Text", multiline: true, ka: "ჩაეწერეთ ონლაინ ერთ წუთში — ჩვენ დაგიკავშირდებით და შევარჩევთ მოსახერხებელ დროს.", ru: "Запишитесь онлайн за минуту — мы свяжемся с вами и подберём удобное время.", en: "Book online in a minute — we will call you back and find a convenient time." },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline", multiline: true, ka: "სილამაზის სალონი ვიზუალი — თმა, ფრჩხილები, მაკიაჟი და მოვლა ქუთაისის ცენტრში.", ru: "Салон красоты Vizuali — волосы, ногти, макияж и уход в центре Кутаиси.", en: "Vizuali beauty salon — hair, nails, makeup and care in the centre of Kutaisi." },
      { key: "footer.copyright", label: "Copyright", ka: "ყველა უფლება დაცულია.", ru: "Все права защищены.", en: "All rights reserved." },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description: "Meta title, description and keywords for search engines and social sharing (Open Graph).",
    fields: [
      { key: "seo.home.title", label: "Home — meta title", ka: "ვიზუალი — სილამაზის სალონი ქუთაისში", ru: "Vizuali — салон красоты в Кутаиси", en: "Vizuali — Beauty Salon in Kutaisi" },
      {
        key: "seo.home.description",
        label: "Home — meta description",
        multiline: true,
        ka: "სილამაზის სალონი ვიზუალი ქუთაისში: თმის შეღებვა და შეჭრა, ვარცხნილობები, მაკიაჟი, მანიკური, წარბები და წამწამები. ჩაეწერეთ ონლაინ.",
        ru: "Салон красоты Vizuali в Кутаиси: окрашивание и стрижки, причёски, макияж, маникюр, брови и ресницы. Онлайн-запись за минуту.",
        en: "Vizuali beauty salon in Kutaisi: hair colouring and haircuts, hairstyles, makeup, manicure, brows and lashes. Book online in a minute.",
      },
      {
        key: "seo.home.keywords",
        label: "Home — keywords (comma separated)",
        multiline: true,
        ka: "სილამაზის სალონი ქუთაისში, ვიზუალი, თმის შეღებვა ქუთაისი, მანიკური ქუთაისი, საქორწილო მაკიაჟი",
        ru: "салон красоты Кутаиси, Vizuali, окрашивание волос Кутаиси, маникюр Кутаиси, свадебный макияж Кутаиси",
        en: "beauty salon Kutaisi, Vizuali, hair colouring Kutaisi, manicure Kutaisi, bridal makeup Kutaisi",
      },
      { key: "seo.prices.title", label: "Prices page — meta title", ka: "ფასები — სილამაზის სალონი ვიზუალი, ქუთაისი", ru: "Цены — салон красоты Vizuali, Кутаиси", en: "Prices — Vizuali Beauty Salon, Kutaisi" },
      {
        key: "seo.prices.description",
        label: "Prices page — meta description",
        multiline: true,
        ka: "სერვისების ფასები: შეღებვა, შეჭრა, ვარცხნილობები, მაკიაჟი, მანიკური, პედიკური, წარბები, წამწამები და სახის მოვლა ქუთაისში.",
        ru: "Цены на услуги: окрашивание, стрижки, причёски, макияж, маникюр, педикюр, брови, ресницы и уход за лицом в Кутаиси.",
        en: "Service prices: colouring, haircuts, hairstyles, makeup, manicure, pedicure, brows, lashes and facials in Kutaisi.",
      },
      {
        key: "seo.prices.keywords",
        label: "Prices page — keywords (comma separated)",
        multiline: true,
        ka: "სილამაზის სალონის ფასები ქუთაისი, მანიკურის ფასი",
        ru: "цены салон красоты Кутаиси, цена маникюра Кутаиси, цена окрашивания",
        en: "beauty salon prices Kutaisi, manicure price Kutaisi, hair colouring price",
      },
    ],
  },
];

export const TEXT_FIELDS: TextField[] = TEXT_SECTIONS.flatMap((s) => s.fields);
export const TEXT_KEYS = new Set(TEXT_FIELDS.map((f) => f.key));

export type SettingField = {
  key: SettingKey;
  label: string;
  kind: "text" | "url" | "email" | "image" | "map" | "pixel" | "ga" | "times";
  hint?: string;
  default: string;
};

export type SettingKey =
  | "brandName"
  | "currency"
  | "phone"
  | "whatsapp"
  | "email"
  | "instagram"
  | "facebook"
  | "mapEmbedUrl"
  | "timeSlots"
  | "heroImage"
  | "aboutImage"
  | "processImage"
  | "ogImage"
  | "metaPixelId"
  | "gaId";

export const SETTING_GROUPS: { id: string; title: string; description?: string; fields: SettingField[] }[] = [
  {
    id: "contacts",
    title: "Contacts",
    fields: [
      { key: "phone", label: "Phone number", kind: "text", hint: "Shown on the site and used for the Call button.", default: "+995 555 22 20 81" },
      { key: "whatsapp", label: "WhatsApp number", kind: "text", hint: "International format, digits only, e.g. 995555222081. Leave empty to hide WhatsApp buttons.", default: "995555222081" },
      { key: "email", label: "Email", kind: "email", hint: "Leave empty to hide.", default: "" },
    ],
  },
  {
    id: "social",
    title: "Social networks",
    description: "Leave a field empty to hide that button.",
    fields: [
      { key: "instagram", label: "Instagram URL", kind: "url", default: "" },
      { key: "facebook", label: "Facebook URL", kind: "url", default: "https://www.facebook.com/VIZUALI.B.S/" },
    ],
  },
  {
    id: "map",
    title: "Google Maps",
    fields: [
      {
        key: "mapEmbedUrl",
        label: "Google Maps embed URL",
        kind: "map",
        hint: "Google Maps → Share → Embed a map → copy the src=\"…\" link. Must start with https://www.google.com/maps",
        default: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s%E1%83%95%E1%83%98%E1%83%96%E1%83%A3%E1%83%90%E1%83%9A%E1%83%98+9+Varlamishvili+Street+Kutaisi!6i17",
      },
    ],
  },
  {
    id: "booking",
    title: "Booking form",
    fields: [
      {
        key: "timeSlots",
        label: "Available time slots",
        kind: "times",
        hint: "Times offered in the booking form, comma separated (24h), e.g. 10:00, 10:30, 11:00",
        default: "09:30, 10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00",
      },
    ],
  },
  {
    id: "brand",
    title: "Brand & images",
    fields: [
      { key: "brandName", label: "Salon name", kind: "text", default: "Vizuali Beauty Salon" },
      { key: "currency", label: "Currency", kind: "text", hint: "Shown after prices, e.g. GEL or ₾", default: "GEL" },
      { key: "heroImage", label: "Hero image", kind: "image", default: "/images/vizuali/balayage.jpg" },
      { key: "aboutImage", label: "About section image", kind: "image", default: "/images/vizuali/interior.jpg" },
      { key: "processImage", label: "\"How it works\" section image", kind: "image", default: "/images/vizuali/makeup-mirror.jpg" },
      { key: "ogImage", label: "Social sharing image (Open Graph, 1200×630)", kind: "image", default: "/images/vizuali/interior.jpg" },
    ],
  },
  {
    id: "tracking",
    title: "Marketing & analytics",
    description: "Leave empty to disable. Booking requests are tracked as Lead (Meta) and generate_lead (GA4).",
    fields: [
      { key: "metaPixelId", label: "Meta (Facebook) Pixel ID", kind: "pixel", hint: "Digits only, e.g. 1234567890123456", default: "" },
      { key: "gaId", label: "Google Analytics 4 Measurement ID", kind: "ga", hint: "Format G-XXXXXXXXXX", default: "" },
    ],
  },
];

export const SETTING_FIELDS: SettingField[] = SETTING_GROUPS.flatMap((g) => g.fields);
export const SETTING_KEYS = new Set<string>(SETTING_FIELDS.map((f) => f.key));
