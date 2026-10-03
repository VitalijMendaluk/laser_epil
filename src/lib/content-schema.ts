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
  uk: string;
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
      { key: "hero.eyebrow", label: "Eyebrow (small line above title)", ka: "ლაზერული ესთეტიკის სტუდია · ქუთაისი", uk: "Студія лазерної естетики · Кутаїсі", en: "Laser aesthetics studio · Kutaisi" },
      { key: "hero.title", label: "Title", ka: "ლაზერული ეპილაცია ქუთაისში", uk: "Лазерна епіляція в Кутаїсі", en: "Laser Hair Removal in Kutaisi" },
      {
        key: "hero.subtitle",
        label: "Subtitle",
        multiline: true,
        ka: "გლუვი კანი თანამედროვე ლაზერული ტექნოლოგიით — უსაფრთხოდ, კომფორტულად და ხანგრძლივი შედეგით.",
        uk: "Гладенька шкіра завдяки сучасним лазерним технологіям — безпечно, комфортно та з тривалим результатом.",
        en: "Smooth skin with modern laser technology — safe, comfortable and long-lasting.",
      },
      { key: "hero.feature1", label: "Feature 1", ka: "დიოდური ლაზერი", uk: "Діодний лазер", en: "Diode laser" },
      { key: "hero.feature2", label: "Feature 2", ka: "კომფორტული გაგრილება", uk: "Комфортне охолодження", en: "Comfort cooling" },
      { key: "hero.feature3", label: "Feature 3", ka: "სერტიფიცირებული სპეციალისტები", uk: "Сертифіковані спеціалісти", en: "Certified specialists" },
      { key: "hero.badge.value", label: "Badge — value", ka: "2 000+", uk: "2 000+", en: "2 000+" },
      { key: "hero.badge.label", label: "Badge — label", ka: "კმაყოფილი კლიენტი", uk: "задоволених клієнток", en: "happy clients" },
    ],
  },
  {
    id: "about",
    title: "About us",
    fields: [
      { key: "about.eyebrow", label: "Eyebrow", ka: "ჩვენ შესახებ", uk: "Про студію", en: "About us" },
      { key: "about.title", label: "Title", ka: "სილამაზე, რომელიც ზრუნვით იწყება", uk: "Краса, що починається з турботи", en: "Beauty that begins with care" },
      {
        key: "about.text",
        label: "Text",
        multiline: true,
        ka: "ჩვენ ვართ ლაზერული ეპილაციის სტუდია ქუთაისის ცენტრში. ჩვენი გუნდი 7 წელზე მეტია მუშაობს ესთეტიკურ კოსმეტოლოგიაში და ასობით კლიენტს დაეხმარა სამუდამოდ დაემშვიდობოს სამართებელს.\n\nვმუშაობთ სამედიცინო კლასის დიოდურ ლაზერზე გაგრილების სისტემით, რომელიც უსაფრთხოა ყველა ფოტოტიპის კანისთვის. ყოველი პროცედურა იწყება კონსულტაციით, ხოლო პარამეტრები ინდივიდუალურად შეირჩევა თქვენი კანისა და თმის მიხედვით.",
        uk: "Ми — студія лазерної епіляції в центрі Кутаїсі. Наша команда понад 7 років працює в естетичній косметології та допомогла сотням клієнток назавжди попрощатися з бритвою.\n\nМи працюємо на медичному діодному лазері із системою охолодження, безпечному для всіх фототипів шкіри. Кожна процедура починається з консультації, а параметри підбираються індивідуально під вашу шкіру та тип волосся.",
        en: "We are a laser hair removal studio in the heart of Kutaisi. Our team has worked in aesthetic cosmetology for over 7 years and has helped hundreds of clients say goodbye to the razor for good.\n\nWe use a medical-grade diode laser with a built-in cooling system that is safe for all skin phototypes. Every treatment starts with a consultation, and the settings are tailored to your skin and hair type.",
      },
      { key: "about.stat1.value", label: "Stat 1 — value", ka: "7+", uk: "7+", en: "7+" },
      { key: "about.stat1.label", label: "Stat 1 — label", ka: "წელი გამოცდილება", uk: "років досвіду", en: "Years of experience" },
      { key: "about.stat2.value", label: "Stat 2 — value", ka: "15 000+", uk: "15 000+", en: "15 000+" },
      { key: "about.stat2.label", label: "Stat 2 — label", ka: "ჩატარებული პროცედურა", uk: "проведених процедур", en: "Treatments performed" },
      { key: "about.stat3.value", label: "Stat 3 — value", ka: "100%", uk: "100%", en: "100%" },
      { key: "about.stat3.label", label: "Stat 3 — label", ka: "სერტიფიცირებული აპარატურა", uk: "сертифіковане обладнання", en: "Certified equipment" },
    ],
  },
  {
    id: "services",
    title: "Services section",
    description: "Heading of the services block. The services themselves are edited in Admin → Services.",
    fields: [
      { key: "services.eyebrow", label: "Eyebrow", ka: "სერვისები", uk: "Послуги", en: "Services" },
      { key: "services.title", label: "Title", ka: "ლაზერული ეპილაციის ზონები", uk: "Зони лазерної епіляції", en: "Treatment areas" },
      {
        key: "services.subtitle",
        label: "Subtitle",
        multiline: true,
        ka: "აირჩიეთ ზონა — ფასი მითითებულია ერთ პროცედურაზე. კომპლექსებზე მოქმედებს სპეციალური ფასები.",
        uk: "Оберіть зону — ціна вказана за одну процедуру. На комплекси діють спеціальні ціни.",
        en: "Choose an area — prices are per session. Special prices apply to packages.",
      },
    ],
  },
  {
    id: "prices",
    title: "Prices page",
    fields: [
      { key: "prices.eyebrow", label: "Eyebrow", ka: "ფასები", uk: "Ціни", en: "Prices" },
      { key: "prices.title", label: "Title", ka: "ფასები და ხანგრძლივობა", uk: "Ціни та тривалість", en: "Prices & duration" },
      {
        key: "prices.subtitle",
        label: "Subtitle",
        multiline: true,
        ka: "გამჭვირვალე ფასები ფარული გადასახადების გარეშე. პირველი კონსულტაცია უფასოა.",
        uk: "Прозорі ціни без прихованих доплат. Перша консультація — безкоштовна.",
        en: "Transparent prices with no hidden fees. Your first consultation is free.",
      },
      {
        key: "prices.note",
        label: "Note under the table",
        multiline: true,
        ka: "კურსი, როგორც წესი, 6–8 პროცედურისგან შედგება. 5 პროცედურის ერთდროულად შეძენისას — 15% ფასდაკლება.",
        uk: "Курс зазвичай складається з 6–8 процедур. При оплаті 5 процедур одразу — знижка 15%.",
        en: "A course usually consists of 6–8 sessions. Book 5 sessions at once and get 15% off.",
      },
    ],
  },
  {
    id: "advantages",
    title: "Why choose us (advantages)",
    fields: [
      { key: "advantages.eyebrow", label: "Eyebrow", ka: "რატომ ჩვენ", uk: "Чому обирають нас", en: "Why choose us" },
      { key: "advantages.title", label: "Title", ka: "ზრუნვა ყოველ დეტალში", uk: "Турбота в кожній деталі", en: "Care in every detail" },
      { key: "advantages.1.title", label: "Advantage 1 — title", ka: "თანამედროვე ლაზერული აპარატი", uk: "Сучасне лазерне обладнання", en: "Modern laser equipment" },
      { key: "advantages.1.text", label: "Advantage 1 — text", multiline: true, ka: "სამედიცინო კლასის დიოდური ლაზერი სამი ტალღის სიგრძით — ეფექტურია ღია და მუქი თმისთვის.", uk: "Медичний діодний лазер із трьома довжинами хвиль — ефективний для світлого й темного волосся.", en: "A medical-grade diode laser with three wavelengths — effective on both light and dark hair." },
      { key: "advantages.2.title", label: "Advantage 2 — title", ka: "უსაფრთხო პროცედურა", uk: "Безпечна процедура", en: "Safe procedure" },
      { key: "advantages.2.text", label: "Advantage 2 — text", multiline: true, ka: "სერტიფიცირებული აპარატურა, ერთჯერადი მასალები და სტერილობის მკაცრი სტანდარტები.", uk: "Сертифіковане обладнання, одноразові матеріали та суворі стандарти стерильності.", en: "Certified equipment, single-use materials and strict hygiene standards." },
      { key: "advantages.3.title", label: "Advantage 3 — title", ka: "გამოცდილი სპეციალისტები", uk: "Досвідчені спеціалісти", en: "Experienced specialists" },
      { key: "advantages.3.text", label: "Advantage 3 — text", multiline: true, ka: "ჩვენი სპეციალისტები სერტიფიცირებულნი არიან და რეგულარულად გადიან ტრენინგებს.", uk: "Наші майстри мають сертифікати та регулярно проходять навчання.", en: "Our specialists are certified and regularly complete advanced training." },
      { key: "advantages.4.title", label: "Advantage 4 — title", ka: "ინდივიდუალური მიდგომა", uk: "Індивідуальний підхід", en: "Individual approach" },
      { key: "advantages.4.text", label: "Advantage 4 — text", multiline: true, ka: "პარამეტრებს ვარჩევთ თქვენი კანის ფოტოტიპისა და თმის სტრუქტურის მიხედვით.", uk: "Підбираємо параметри під ваш фототип шкіри та структуру волосся.", en: "Settings are tailored to your skin phototype and hair structure." },
      { key: "advantages.5.title", label: "Advantage 5 — title", ka: "კომფორტული ატმოსფერო", uk: "Комфортна атмосфера", en: "Comfortable atmosphere" },
      { key: "advantages.5.text", label: "Advantage 5 — text", multiline: true, ka: "მყუდრო, სუფთა სივრცე, სადაც შეგიძლიათ მოდუნდეთ და თავი დაცულად იგრძნოთ.", uk: "Затишний, чистий простір, де можна розслабитися та почуватися в безпеці.", en: "A calm, spotless space where you can relax and feel at ease." },
    ],
  },
  {
    id: "process",
    title: "How the procedure works",
    fields: [
      { key: "process.eyebrow", label: "Eyebrow", ka: "პროცესი", uk: "Процес", en: "The process" },
      { key: "process.title", label: "Title", ka: "როგორ მიმდინარეობს პროცედურა", uk: "Як проходить процедура", en: "How the procedure works" },
      { key: "process.1.title", label: "Step 1 — title", ka: "კონსულტაცია", uk: "Консультація", en: "Consultation" },
      { key: "process.1.text", label: "Step 1 — text", multiline: true, ka: "ვაფასებთ კანის ფოტოტიპს, ვსაუბრობთ უკუჩვენებებზე და ვადგენთ კურსის გეგმას.", uk: "Визначаємо фототип шкіри, обговорюємо протипоказання та складаємо план курсу.", en: "We assess your skin phototype, discuss contraindications and plan your course." },
      { key: "process.2.title", label: "Step 2 — title", ka: "მომზადება", uk: "Підготовка", en: "Preparation" },
      { key: "process.2.text", label: "Step 2 — text", multiline: true, ka: "ზონა წინასწარ უნდა გაიპარსოს. ვასუფთავებთ კანს და ვარჩევთ ლაზერის პარამეტრებს.", uk: "Зону потрібно попередньо поголити. Ми очищаємо шкіру та налаштовуємо параметри лазера.", en: "The area should be shaved beforehand. We cleanse the skin and set up the laser." },
      { key: "process.3.title", label: "Step 3 — title", ka: "ლაზერული პროცედურა", uk: "Лазерна процедура", en: "Laser procedure" },
      { key: "process.3.text", label: "Step 3 — text", multiline: true, ka: "სწრაფი და კომფორტული — გაგრილების სისტემის წყალობით შეგრძნებები მინიმალურია.", uk: "Швидко й комфортно — завдяки охолодженню відчуття мінімальні.", en: "Quick and comfortable — the cooling system keeps sensations to a minimum." },
      { key: "process.4.title", label: "Step 4 — title", ka: "კანის მოვლის რეკომენდაციები", uk: "Рекомендації з догляду", en: "Skin care recommendations" },
      { key: "process.4.text", label: "Step 4 — text", multiline: true, ka: "გაძლევთ რჩევებს მოვლაზე და ვგეგმავთ შემდეგ ვიზიტს საუკეთესო შედეგისთვის.", uk: "Даємо поради з догляду та плануємо наступний візит для найкращого результату.", en: "We share aftercare tips and schedule your next visit for the best result." },
    ],
  },
  {
    id: "results",
    title: "Before / After section",
    description: "Heading of the gallery. Photos are managed in Admin → Before / After.",
    fields: [
      { key: "results.eyebrow", label: "Eyebrow", ka: "შედეგები", uk: "Результати", en: "Results" },
      { key: "results.title", label: "Title", ka: "მანამდე / შემდეგ", uk: "До / Після", en: "Before / After" },
      { key: "results.subtitle", label: "Subtitle", multiline: true, ka: "ჩვენი კლიენტების რეალური შედეგები კურსის შემდეგ.", uk: "Реальні результати наших клієнток після курсу процедур.", en: "Real results of our clients after a course of treatments." },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials section",
    description: "Heading of the reviews block. Reviews are managed in Admin → Testimonials.",
    fields: [
      { key: "testimonials.eyebrow", label: "Eyebrow", ka: "შეფასებები", uk: "Відгуки", en: "Testimonials" },
      { key: "testimonials.title", label: "Title", ka: "რას ამბობენ ჩვენი კლიენტები", uk: "Що кажуть наші клієнтки", en: "What our clients say" },
    ],
  },
  {
    id: "faq",
    title: "FAQ section",
    description: "Heading of the FAQ block. Questions are managed in Admin → FAQ.",
    fields: [
      { key: "faq.eyebrow", label: "Eyebrow", ka: "FAQ", uk: "FAQ", en: "FAQ" },
      { key: "faq.title", label: "Title", ka: "ხშირად დასმული კითხვები", uk: "Часті запитання", en: "Frequently asked questions" },
      { key: "faq.subtitle", label: "Subtitle", multiline: true, ka: "ვერ იპოვეთ პასუხი? მოგვწერეთ WhatsApp-ზე — სიამოვნებით გიპასუხებთ.", uk: "Не знайшли відповіді? Напишіть нам у WhatsApp — із радістю відповімо.", en: "Didn't find your answer? Message us on WhatsApp — we're happy to help." },
    ],
  },
  {
    id: "contact",
    title: "Contacts section",
    fields: [
      { key: "contact.eyebrow", label: "Eyebrow", ka: "კონტაქტი", uk: "Контакти", en: "Contact" },
      { key: "contact.title", label: "Title", ka: "გელოდებით სტუდიაში", uk: "Чекаємо вас у студії", en: "We look forward to seeing you" },
      { key: "contact.subtitle", label: "Subtitle", multiline: true, ka: "დაგვირეკეთ, მოგვწერეთ WhatsApp-ზე ან ჩაეწერეთ ონლაინ — ერთ წუთში.", uk: "Телефонуйте, пишіть у WhatsApp або запишіться онлайн — за хвилину.", en: "Call us, message us on WhatsApp or book online in under a minute." },
      { key: "contact.address", label: "Address", ka: "რუსთაველის გამზირი 25, ქუთაისი, საქართველო", uk: "просп. Руставелі 25, Кутаїсі, Грузія", en: "25 Rustaveli Avenue, Kutaisi, Georgia" },
      { key: "contact.hours", label: "Working hours", ka: "ორშ–შაბ, 10:00–20:00", uk: "Пн–Сб, 10:00–20:00", en: "Mon–Sat, 10:00–20:00" },
    ],
  },
  {
    id: "cta",
    title: "Booking call-to-action",
    description: "Banner that invites visitors to book (above the contacts).",
    fields: [
      { key: "cta.title", label: "Title", ka: "მზად ხართ გლუვი კანისთვის?", uk: "Готові до гладенької шкіри?", en: "Ready for smooth skin?" },
      { key: "cta.text", label: "Text", multiline: true, ka: "ჩაეწერეთ უფასო კონსულტაციაზე — შევარჩევთ თქვენთვის იდეალურ კურსს.", uk: "Запишіться на безкоштовну консультацію — підберемо ідеальний курс саме для вас.", en: "Book a free consultation — we'll design the perfect course for you." },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    fields: [
      { key: "footer.tagline", label: "Tagline", multiline: true, ka: "პრემიუმ ლაზერული ეპილაცია ქუთაისში. უსაფრთხოდ, კომფორტულად, ხანგრძლივად.", uk: "Преміальна лазерна епіляція в Кутаїсі. Безпечно, комфортно, надовго.", en: "Premium laser hair removal in Kutaisi. Safe, comfortable, long-lasting." },
      { key: "footer.copyright", label: "Copyright", ka: "ყველა უფლება დაცულია.", uk: "Усі права захищено.", en: "All rights reserved." },
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description: "Meta title, description and keywords for search engines and social sharing (Open Graph).",
    fields: [
      { key: "seo.home.title", label: "Home — meta title", ka: "ლაზერული ეპილაცია ქუთაისში — პრემიუმ სტუდია", uk: "Лазерна епіляція Кутаїсі — преміум студія", en: "Laser Hair Removal Kutaisi — Premium Studio" },
      {
        key: "seo.home.description",
        label: "Home — meta description",
        multiline: true,
        ka: "ლაზერული ეპილაცია ქუთაისში თანამედროვე დიოდური ლაზერით. უსაფრთხო, კომფორტული პროცედურა, გამოცდილი სპეციალისტები. ჩაეწერეთ ონლაინ.",
        uk: "Лазерна епіляція в Кутаїсі на сучасному діодному лазері. Безпечно та комфортно, досвідчені спеціалісти. Запис онлайн за хвилину.",
        en: "Laser hair removal in Kutaisi with a modern diode laser. Safe, comfortable treatments by experienced specialists. Book online in one minute.",
      },
      {
        key: "seo.home.keywords",
        label: "Home — keywords (comma separated)",
        multiline: true,
        ka: "ლაზერული ეპილაცია ქუთაისში, ლაზერული ეპილაცია, ეპილაცია ქუთაისი, დიოდური ლაზერი, ბიკინის ეპილაცია",
        uk: "Лазерна епіляція Кутаїсі, лазерна епіляція, епіляція Кутаїсі, діодний лазер, епіляція бікіні",
        en: "Laser hair removal Kutaisi, laser hair removal Georgia, diode laser Kutaisi, bikini laser, beauty studio Kutaisi",
      },
      { key: "seo.prices.title", label: "Prices page — meta title", ka: "ფასები — ლაზერული ეპილაცია ქუთაისში", uk: "Ціни — лазерна епіляція в Кутаїсі", en: "Prices — Laser Hair Removal in Kutaisi" },
      {
        key: "seo.prices.description",
        label: "Prices page — meta description",
        multiline: true,
        ka: "ლაზერული ეპილაციის ფასები ქუთაისში: ფეხები, ბიკინი, იღლიები, სახე და სხვა ზონები. პროცედურის ხანგრძლივობა და კომპლექსები.",
        uk: "Ціни на лазерну епіляцію в Кутаїсі: ноги, бікіні, пахви, обличчя та інші зони. Тривалість процедур і комплекси.",
        en: "Laser hair removal prices in Kutaisi: legs, bikini, underarms, face and more. Treatment duration and package deals.",
      },
      {
        key: "seo.prices.keywords",
        label: "Prices page — keywords (comma separated)",
        multiline: true,
        ka: "ლაზერული ეპილაციის ფასი, ეპილაცია ფასი ქუთაისი",
        uk: "ціна лазерної епіляції Кутаїсі, вартість епіляції",
        en: "laser hair removal price Kutaisi, laser hair removal cost Georgia",
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
      { key: "phone", label: "Phone number", kind: "text", hint: "Shown on the site and used for the Call button.", default: "+995 555 12 34 56" },
      { key: "whatsapp", label: "WhatsApp number", kind: "text", hint: "International format, digits only, e.g. 995555123456", default: "995555123456" },
      { key: "email", label: "Email", kind: "email", default: "hello@lumiere-laser.ge" },
    ],
  },
  {
    id: "social",
    title: "Social networks",
    fields: [
      { key: "instagram", label: "Instagram URL", kind: "url", default: "https://www.instagram.com/" },
      { key: "facebook", label: "Facebook URL", kind: "url", default: "https://www.facebook.com/" },
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
        default: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sRustaveli+Avenue+25,+Kutaisi!6i16",
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
        default: "10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00",
      },
    ],
  },
  {
    id: "brand",
    title: "Brand & images",
    fields: [
      { key: "brandName", label: "Studio name", kind: "text", default: "Lumière Laser Studio" },
      { key: "currency", label: "Currency", kind: "text", hint: "Shown after prices, e.g. GEL or ₾", default: "GEL" },
      { key: "heroImage", label: "Hero image", kind: "image", default: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=1600&q=80" },
      { key: "aboutImage", label: "About section image", kind: "image", default: "https://images.unsplash.com/photo-1763873993447-1d0be71a96d9?w=1600&q=80" },
      { key: "processImage", label: "Procedure section image", kind: "image", default: "https://images.unsplash.com/photo-1746806942799-b4db209e9a6b?w=1400&q=80" },
      { key: "ogImage", label: "Social sharing image (Open Graph, 1200×630)", kind: "image", default: "https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?w=1200&h=630&fit=crop&crop=top&q=80" },
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
