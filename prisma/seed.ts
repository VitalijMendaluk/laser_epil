import { PrismaClient, type ServiceCategory } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SETTING_FIELDS, TEXT_FIELDS } from "../src/lib/content-schema";

const prisma = new PrismaClient();
const unsplash = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;
const own = (name: string) => `/images/vizuali/${name}.jpg`;

/**
 * Bump this when the demo content is rewritten. On the next deploy the seed replaces
 * texts, settings (except tracking IDs), services, reviews, portfolio and FAQ ONCE;
 * after that it never overwrites admin edits again. Bookings and admins are kept.
 */
const CONTENT_VERSION = "vizuali-1";

type SeedService = {
  slug: string;
  nameKa: string;
  nameRu: string;
  nameEn: string;
  descriptionKa: string;
  descriptionRu: string;
  descriptionEn: string;
  category: ServiceCategory;
  price: number;
  durationMin: number;
  image: string;
};

const services: SeedService[] = [
  // Hair
  { slug: "haircut", category: "HAIR", price: 35, durationMin: 60, image: own("bob-color"),
    nameKa: "ქალის შეჭრა", nameRu: "Женская стрижка", nameEn: "Women's haircut",
    descriptionKa: "შეჭრა დაბანით და სტაილინგით — ფორმას ვარჩევთ სახის ტიპისა და თმის სტრუქტურის მიხედვით.",
    descriptionRu: "Стрижка с мытьём и укладкой — форму подбираем под тип лица и структуру волос.",
    descriptionEn: "Haircut with wash and styling — the shape is tailored to your face and hair type." },
  { slug: "hair-colouring", category: "HAIR", price: 90, durationMin: 120, image: unsplash("1707979577466-2d6109c68a45"),
    nameKa: "თმის შეღებვა", nameRu: "Окрашивание волос", nameEn: "Hair colouring",
    descriptionKa: "ერთტონიანი შეღებვა პროფესიონალური საღებავებით, ფესვების ან მთელი სიგრძის.",
    descriptionRu: "Окрашивание в один тон профессиональными красителями — корни или вся длина.",
    descriptionEn: "Single-tone colouring with professional dyes — roots or full length." },
  { slug: "balayage", category: "HAIR", price: 220, durationMin: 210, image: own("balayage"),
    nameKa: "ბალაიაჟი / აირთაჩი", nameRu: "Балаяж / Airtouch", nameEn: "Balayage / Airtouch",
    descriptionKa: "რთული შეღებვა ბუნებრივი ნათელი გადასვლებით — თმა ცოცხალი და მოცულობითი ჩანს.",
    descriptionRu: "Сложное окрашивание с естественными светлыми переходами — волосы выглядят живыми и объёмными.",
    descriptionEn: "Advanced colouring with soft, natural blonde transitions for lively, voluminous hair." },
  { slug: "blow-dry", category: "HAIR", price: 30, durationMin: 45, image: unsplash("1580618672591-eb180b1a973f"),
    nameKa: "დაბანა და სტაილინგი", nameRu: "Укладка", nameEn: "Wash & blow-dry",
    descriptionKa: "დაბანა, მოვლა და სტაილინგი — მოცულობითი ან გლუვი, თქვენი სურვილისამებრ.",
    descriptionRu: "Мытьё, уход и укладка — объёмная или гладкая, как вам нравится.",
    descriptionEn: "Wash, care and styling — voluminous or sleek, just as you like." },
  { slug: "evening-hairstyle", category: "HAIR", price: 70, durationMin: 60, image: own("updo"),
    nameKa: "საღამოს ვარცხნილობა", nameRu: "Вечерняя причёска", nameEn: "Evening hairstyle",
    descriptionKa: "კონები, ნაწნავები და დახვეული თმა ღონისძიებებისა და ფოტოსესიებისთვის.",
    descriptionRu: "Пучки, косы и локоны для торжеств и фотосессий.",
    descriptionEn: "Updos, braids and curls for celebrations and photo shoots." },
  { slug: "keratin", category: "HAIR", price: 150, durationMin: 150, image: own("blonde-long"),
    nameKa: "კერატინით გასწორება", nameRu: "Кератиновое выпрямление", nameEn: "Keratin treatment",
    descriptionKa: "გლუვი, ბზინვარე და მორჩილი თმა რამდენიმე თვის განმავლობაში.",
    descriptionRu: "Гладкие, блестящие и послушные волосы на несколько месяцев.",
    descriptionEn: "Smooth, glossy, manageable hair for several months." },
  // Nails
  { slug: "gel-manicure", category: "NAILS", price: 40, durationMin: 75, image: own("nails-green"),
    nameKa: "მანიკური გელ-ლაქით", nameRu: "Маникюр с гель-лаком", nameEn: "Gel manicure",
    descriptionKa: "აპარატული მანიკური, ფრჩხილის ფორმა და გელ-ლაქი — 3 კვირამდე მდგრადობით.",
    descriptionRu: "Аппаратный маникюр, форма и покрытие гель-лаком — носится до 3 недель.",
    descriptionEn: "Hardware manicure, shaping and gel polish that lasts up to 3 weeks." },
  { slug: "nail-extensions", category: "NAILS", price: 70, durationMin: 120, image: own("nails-pink"),
    nameKa: "ფრჩხილების დაგრძელება", nameRu: "Наращивание ногтей", nameEn: "Nail extensions",
    descriptionKa: "დაგრძელება გელით ნებისმიერი ფორმითა და დიზაინით.",
    descriptionRu: "Наращивание гелем любой формы и с любым дизайном.",
    descriptionEn: "Gel extensions in any shape, with the design of your choice." },
  { slug: "gel-pedicure", category: "NAILS", price: 55, durationMin: 90, image: unsplash("1787651344170-c2f81514934d"),
    nameKa: "პედიკური გელ-ლაქით", nameRu: "Педикюр с гель-лаком", nameEn: "Gel pedicure",
    descriptionKa: "ტერფებისა და ფრჩხილების სრული მოვლა გელ-ლაქით.",
    descriptionRu: "Полный уход за стопами и ногтями с покрытием гель-лаком.",
    descriptionEn: "Complete foot and nail care finished with gel polish." },
  // Makeup
  { slug: "evening-makeup", category: "MAKEUP", price: 70, durationMin: 60, image: own("makeup-mirror"),
    nameKa: "საღამოს მაკიაჟი", nameRu: "Вечерний макияж", nameEn: "Evening makeup",
    descriptionKa: "მდგრადი მაკიაჟი ღონისძიებისთვის, ფოტოსესიისა თუ განსაკუთრებული საღამოსთვის.",
    descriptionRu: "Стойкий макияж для праздника, фотосессии или особенного вечера.",
    descriptionEn: "Long-lasting makeup for a party, photo shoot or special evening." },
  { slug: "bridal-look", category: "MAKEUP", price: 250, durationMin: 180, image: own("bride"),
    nameKa: "საქორწილო იმიჯი", nameRu: "Свадебный образ", nameEn: "Bridal look",
    descriptionKa: "საქორწილო მაკიაჟი და ვარცხნილობა საცდელი ვიზიტით — თქვენი დღე იდეალური უნდა იყოს.",
    descriptionRu: "Свадебный макияж и причёска с пробным визитом — ваш день должен быть идеальным.",
    descriptionEn: "Bridal makeup and hairstyle with a trial session — your day deserves perfection." },
  // Brows & lashes
  { slug: "brows", category: "BROWS_LASHES", price: 30, durationMin: 45, image: unsplash("1709477542149-f4e0e21d590b"),
    nameKa: "წარბების კორექცია და შეღებვა", nameRu: "Коррекция и окрашивание бровей", nameEn: "Brow shaping & tint",
    descriptionKa: "წარბების ფორმა თანამედროვე ტექნიკით და შეღებვა საღებავით ან ჰენით.",
    descriptionRu: "Форма бровей по современным техникам и окрашивание краской или хной.",
    descriptionEn: "Modern brow shaping plus tint or henna." },
  { slug: "lash-lift", category: "BROWS_LASHES", price: 60, durationMin: 60, image: unsplash("1718720410649-7524fcb0f0a5"),
    nameKa: "წამწამების ლამინირება", nameRu: "Ламинирование ресниц", nameEn: "Lash lift",
    descriptionKa: "ბუნებრივი წამწამების აწევა და შეღებვა — ღია მზერა 6–8 კვირით.",
    descriptionRu: "Подъём и окрашивание натуральных ресниц — открытый взгляд на 6–8 недель.",
    descriptionEn: "Lift and tint of your natural lashes — an open look for 6–8 weeks." },
  { slug: "lash-extensions", category: "BROWS_LASHES", price: 80, durationMin: 120, image: unsplash("1589710751893-f9a6770ad71b"),
    nameKa: "წამწამების დაგრძელება", nameRu: "Наращивание ресниц", nameEn: "Lash extensions",
    descriptionKa: "კლასიკური ან მოცულობითი დაგრძელება — ეფექტს ერთად ვარჩევთ.",
    descriptionRu: "Классическое или объёмное наращивание — эффект подбираем вместе.",
    descriptionEn: "Classic or volume extensions — we choose the effect together." },
  // Skin & body care
  { slug: "facial-cleansing", category: "CARE", price: 80, durationMin: 75, image: unsplash("1570172619644-dfd03ed5d881"),
    nameKa: "სახის წმენდა", nameRu: "Чистка лица", nameEn: "Facial cleansing",
    descriptionKa: "სახის ღრმა წმენდა, ნიღაბი და მოვლა თქვენი კანის ტიპის მიხედვით.",
    descriptionRu: "Глубокое очищение, маска и уход по вашему типу кожи.",
    descriptionEn: "Deep cleansing, mask and care tailored to your skin type." },
  { slug: "relax-massage", category: "CARE", price: 70, durationMin: 60, image: unsplash("1639162906614-0603b0ae95fd"),
    nameKa: "რელაქს-მასაჟი", nameRu: "Релакс-массаж", nameEn: "Relaxing massage",
    descriptionKa: "მასაჟი, რომელიც ხსნის დაძაბულობას და აღადგენს ენერგიას.",
    descriptionRu: "Массаж, который снимает напряжение и возвращает энергию.",
    descriptionEn: "A massage that melts away tension and restores your energy." },
];

/** Real Google Maps reviews of the salon (translated). */
const testimonials = [
  { name: "Gurami E.", photo: "", rating: 5,
    textKa: "წლებია დავდივარ ვიზუალში და დარწმუნებით შემიძლია ვთქვა, რომ ეს ქალაქის ერთ-ერთი საუკეთესო სილამაზის სალონია. ყველაზე მეტად მომწონს, რომ სალონი არასდროს რჩება უცვლელი.",
    textRu: "Я уже много лет хожу в Vizuali и могу уверенно сказать, что это один из лучших салонов красоты в городе. Больше всего мне нравится, что салон никогда не стоит на месте.",
    textEn: "I've been coming to Vizuali in Kutaisi for years, and I can confidently say it's one of the best beauty salons in the city. What I love most is that the salon never stays the same." },
  { name: "A. J.", photo: "", rating: 5,
    textKa: "პროფესიონალური თმის შეღებვა, გირჩევთ!", textRu: "Профессиональное окрашивание волос, очень рекомендую!", textEn: "Professional hair colouring, highly recommend." },
  { name: "Anna O.", photo: "", rating: 5,
    textKa: "მაღალი სტანდარტები, ძალიან პროფესიონალურად.", textRu: "Высокие стандарты, очень профессионально.", textEn: "High standards, very professional." },
  { name: "Viki Ts.", photo: "", rating: 5, textKa: "საუკეთესოა!", textRu: "Лучшие!", textEn: "The best!" },
];

const results = [
  { afterImage: own("balayage"), captionKa: "ბალაიაჟი", captionRu: "Балаяж", captionEn: "Balayage" },
  { afterImage: own("updo"), captionKa: "საღამოს ვარცხნილობა", captionRu: "Вечерняя причёска", captionEn: "Evening hairstyle" },
  { afterImage: own("bride"), captionKa: "საქორწილო იმიჯი", captionRu: "Свадебный образ", captionEn: "Bridal look" },
  { afterImage: own("bob-color"), captionKa: "შეჭრა და შეღებვა", captionRu: "Стрижка и окрашивание", captionEn: "Cut & colour" },
  { afterImage: own("makeup-mirror"), captionKa: "მაკიაჟი და დახვეული თმა", captionRu: "Макияж и локоны", captionEn: "Makeup & curls" },
  { afterImage: own("nails-green"), captionKa: "მანიკური", captionRu: "Маникюр", captionEn: "Manicure" },
];

const faq = [
  {
    questionKa: "როგორ ჩავეწერო?", questionRu: "Как записаться?", questionEn: "How can I book?",
    answerKa: "დააჭირეთ ღილაკს „ჩაწერა“ საიტზე, დაგვირეკეთ ან მოგვწერეთ WhatsApp-ზე. ჩვენ დაგიკავშირდებით და დაგიდასტურებთ დროს.",
    answerRu: "Нажмите «Записаться» на сайте, позвоните нам или напишите в WhatsApp. Мы свяжемся с вами и подтвердим время.",
    answerEn: "Press “Book” on the website, call us or message us on WhatsApp. We will get back to you and confirm the time.",
  },
  {
    questionKa: "როდის მუშაობთ?", questionRu: "Когда вы работаете?", questionEn: "What are your opening hours?",
    answerKa: "ყოველდღე 09:30-დან 19:00-მდე, გარდა ოთხშაბათისა — ოთხშაბათი დასვენების დღეა.",
    answerRu: "Каждый день с 09:30 до 19:00, кроме среды — среда у нас выходной.",
    answerEn: "Every day from 09:30 to 19:00 except Wednesday, which is our day off.",
  },
  {
    questionKa: "შემიძლია კონკრეტული ოსტატის არჩევა?", questionRu: "Можно выбрать конкретного мастера?", questionEn: "Can I choose a specific master?",
    answerKa: "რა თქმა უნდა. მიუთითეთ ოსტატის სახელი ჩაწერის ფორმის კომენტარში ან გვითხარით ზარის დროს.",
    answerRu: "Конечно. Укажите имя мастера в комментарии к заявке или скажите нам по телефону.",
    answerEn: "Of course. Mention the master's name in the booking comment or tell us on the phone.",
  },
  {
    questionKa: "აკეთებთ საქორწილო ვარცხნილობასა და მაკიაჟს?", questionRu: "Делаете свадебные причёски и макияж?", questionEn: "Do you do bridal hair and makeup?",
    answerKa: "დიახ. გირჩევთ წინასწარ ჩაწერას და საცდელ ვიზიტს, რომ ქორწილის დღეს ყველაფერი იდეალური იყოს.",
    answerRu: "Да. Рекомендуем записаться заранее и прийти на пробный образ, чтобы в день свадьбы всё было идеально.",
    answerEn: "Yes. We recommend booking early and coming for a trial so everything is perfect on your wedding day.",
  },
  {
    questionKa: "რამდენ ხანს გრძელდება პროცედურა?", questionRu: "Сколько длится процедура?", questionEn: "How long does a visit take?",
    answerKa: "სავარაუდო ხანგრძლივობა მითითებულია თითოეულ სერვისთან ფასების გვერდზე. ზუსტ დროს ოსტატი დაგიზუსტებთ.",
    answerRu: "Примерная длительность указана у каждой услуги на странице цен. Точное время уточнит мастер.",
    answerEn: "The approximate duration is listed next to every service on the prices page. Your master will confirm the exact time.",
  },
];

async function main() {
  // Admin
  // Defaults: login "admin", password "1" — change it in production (npm run admin:create).
  const email = (process.env.ADMIN_EMAIL || "admin").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "1";
  if (email && password) {
    if (password.length < 8) console.warn("! ADMIN_PASSWORD is shorter than 8 characters — use a strong password in production");
    const exists = await prisma.admin.findUnique({ where: { email } });
    if (!exists) {
      await prisma.admin.create({ data: { email, passwordHash: await bcrypt.hash(password, 12), name: "Administrator" } });
      console.log(`✔ Admin created: ${email}`);
    } else {
      console.log(`• Admin ${email} already exists (password unchanged)`);
    }
  } else {
    console.warn("! ADMIN_EMAIL / ADMIN_PASSWORD not set — no admin created");
  }

  const version = await prisma.setting.findUnique({ where: { key: "contentVersion" } });
  const reset = version?.value !== CONTENT_VERSION;
  const KEEP_SETTINGS = new Set(["metaPixelId", "gaId"]);

  // CMS texts & settings: create missing keys; on a content reset also overwrite existing ones.
  for (const f of TEXT_FIELDS) {
    const row = { ka: f.ka, ru: f.ru, en: f.en };
    await prisma.siteText.upsert({ where: { key: f.key }, create: { key: f.key, ...row }, update: reset ? row : {} });
  }
  for (const f of SETTING_FIELDS) {
    const overwrite = reset && !KEEP_SETTINGS.has(f.key);
    await prisma.setting.upsert({ where: { key: f.key }, create: { key: f.key, value: f.default }, update: overwrite ? { value: f.default } : {} });
  }
  console.log(reset ? `✔ Site texts & settings replaced (content ${CONTENT_VERSION})` : "✔ Site texts & settings");

  if (reset) {
    // Old services are removed; their bookings keep the service name snapshot.
    await prisma.$transaction([prisma.service.deleteMany(), prisma.testimonial.deleteMany(), prisma.beforeAfter.deleteMany(), prisma.faqItem.deleteMany()]);
  }

  // Demo content — each collection is seeded only while it is empty.
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: services.map((s, i) => ({ ...s, sortOrder: i * 10 })) });
    console.log(`✔ ${services.length} services`);
  }
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials.map((t, i) => ({ ...t, sortOrder: i * 10 })) });
    console.log(`✔ ${testimonials.length} testimonials`);
  }
  if ((await prisma.beforeAfter.count()) === 0) {
    await prisma.beforeAfter.createMany({ data: results.map((r, i) => ({ ...r, sortOrder: i * 10 })) });
    console.log(`✔ ${results.length} portfolio items`);
  }
  if ((await prisma.faqItem.count()) === 0) {
    await prisma.faqItem.createMany({ data: faq.map((f, i) => ({ ...f, sortOrder: i * 10 })) });
    console.log(`✔ ${faq.length} FAQ items`);
  }

  await prisma.setting.upsert({ where: { key: "contentVersion" }, create: { key: "contentVersion", value: CONTENT_VERSION }, update: { value: CONTENT_VERSION } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
