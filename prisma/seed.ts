import { PrismaClient, type ServiceCategory } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SETTING_FIELDS, TEXT_FIELDS } from "../src/lib/content-schema";

const prisma = new PrismaClient();
const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

type SeedService = {
  slug: string;
  nameKa: string;
  nameUk: string;
  nameEn: string;
  descriptionKa: string;
  descriptionUk: string;
  descriptionEn: string;
  category: ServiceCategory;
  price: number;
  durationMin: number;
  image: string;
};

const services: SeedService[] = [
  {
    slug: "full-legs",
    nameKa: "ფეხების სრული ეპილაცია", nameUk: "Лазерна епіляція ніг", nameEn: "Full legs",
    descriptionKa: "ფეხების მთლიანი ზონა — ტერფიდან ბარძაყამდე. გლუვი კანი მთელი სეზონის განმავლობაში.",
    descriptionUk: "Повністю ноги — від стоп до стегон. Гладенька шкіра на весь сезон.",
    descriptionEn: "The whole leg — from feet to upper thighs. Smooth skin all season long.",
    category: "WOMEN", price: 120, durationMin: 60, image: img("1587179790059-5f5d937fb87d"),
  },
  {
    slug: "bikini",
    nameKa: "ბიკინის ზონა", nameUk: "Бікіні зона", nameEn: "Bikini line",
    descriptionKa: "კლასიკური ბიკინი — ზონა საცურაო კოსტიუმის ხაზის გასწვრივ.",
    descriptionUk: "Класичне бікіні — зона по лінії купальника.",
    descriptionEn: "Classic bikini — the area along the swimsuit line.",
    category: "WOMEN", price: 60, durationMin: 20, image: img("1606792109910-340f5e672ccd"),
  },
  {
    slug: "deep-bikini",
    nameKa: "ღრმა ბიკინი", nameUk: "Глибоке бікіні", nameEn: "Deep bikini",
    descriptionKa: "სრული ინტიმური ზონა. დელიკატურად, კომფორტულად და სრული კონფიდენციალურობით.",
    descriptionUk: "Повна інтимна зона. Делікатно, комфортно та з повною конфіденційністю.",
    descriptionEn: "The full intimate area. Delicate, comfortable and completely discreet.",
    category: "WOMEN", price: 90, durationMin: 30, image: img("1714682597753-a646ba506cee"),
  },
  {
    slug: "underarms",
    nameKa: "იღლიები", nameUk: "Пахви", nameEn: "Underarms",
    descriptionKa: "ერთ-ერთი ყველაზე სწრაფი და პოპულარული ზონა — შედეგი შესამჩნევია პირველივე პროცედურიდან.",
    descriptionUk: "Одна з найшвидших і найпопулярніших зон — результат помітний після першої процедури.",
    descriptionEn: "One of the quickest and most popular areas — results are visible after the very first session.",
    category: "WOMEN", price: 40, durationMin: 15, image: img("1567013514336-6de53c9e7e63"),
  },
  {
    slug: "arms",
    nameKa: "ხელები", nameUk: "Руки", nameEn: "Arms",
    descriptionKa: "ხელები მთლიანად ან იდაყვამდე — გლუვი და მოვლილი კანი.",
    descriptionUk: "Руки повністю або до ліктя — гладенька та доглянута шкіра.",
    descriptionEn: "Full arms or forearms — smooth, well-groomed skin.",
    category: "WOMEN", price: 70, durationMin: 30, image: img("1598300195951-8667fec6f769"),
  },
  {
    slug: "face",
    nameKa: "სახე", nameUk: "Обличчя", nameEn: "Face",
    descriptionKa: "ზედა ტუჩი, ნიკაპი ან სახის სრული ზონა. ნაზი პარამეტრები მგრძნობიარე კანისთვის.",
    descriptionUk: "Верхня губа, підборіддя або все обличчя. Делікатні налаштування для чутливої шкіри.",
    descriptionEn: "Upper lip, chin or the full face. Gentle settings for sensitive skin.",
    category: "WOMEN", price: 50, durationMin: 20, image: img("1785861775561-c6db7da314a0"),
  },
  {
    slug: "lower-legs",
    nameKa: "წვივები", nameUk: "Гомілки", nameEn: "Lower legs",
    descriptionKa: "ზონა მუხლიდან ტერფამდე — იდეალური არჩევანი პირველი კურსისთვის.",
    descriptionUk: "Зона від коліна до стопи — ідеальний вибір для першого курсу.",
    descriptionEn: "From knee to ankle — a perfect choice for your first course.",
    category: "WOMEN", price: 70, durationMin: 30, image: img("1626623936480-15fd56a295f8"),
  },
  {
    slug: "full-body",
    nameKa: "სრული სხეული — კომპლექსი", nameUk: "Все тіло — комплекс", nameEn: "Full body package",
    descriptionKa: "ფეხები, ღრმა ბიკინი, იღლიები და ხელები ერთ ვიზიტში — ყველაზე მომგებიანი ფასით.",
    descriptionUk: "Ноги, глибоке бікіні, пахви та руки за один візит — за найвигіднішою ціною.",
    descriptionEn: "Legs, deep bikini, underarms and arms in one visit — at the best price.",
    category: "WOMEN", price: 250, durationMin: 120, image: img("1700760933574-9f0f4ea9aa3b"),
  },
  {
    slug: "men",
    nameKa: "მამაკაცის ეპილაცია", nameUk: "Чоловіча епіляція", nameEn: "Men's laser hair removal",
    descriptionKa: "ზურგი, მკერდი, მხრები ან კისერი. სპეციალური პარამეტრები უხეში თმისთვის.",
    descriptionUk: "Спина, груди, плечі або шия. Спеціальні налаштування для жорсткого волосся.",
    descriptionEn: "Back, chest, shoulders or neck. Special settings for coarse hair.",
    category: "MEN", price: 150, durationMin: 60, image: img("1657800187914-682b18440d50"),
  },
];

const testimonials = [
  {
    name: "Nino K.", photo: img("1544005313-94ddf0286df2", 300), rating: 5,
    textKa: "ძალიან კმაყოფილი ვარ! 4 პროცედურის შემდეგ თმა თითქმის აღარ მაქვს. სტუდია სუფთა და მყუდროა, სპეციალისტი ყველაფერს დეტალურად ხსნის.",
    textUk: "Дуже задоволена! Після 4 процедур волосся майже не залишилося. У студії чисто й затишно, майстриня все детально пояснює.",
    textEn: "Absolutely delighted! After 4 sessions there's almost no hair left. The studio is spotless and cosy, and the specialist explains everything in detail.",
  },
  {
    name: "Olena M.", photo: img("1524550158212-33f2ff985344", 300), rating: 5,
    textKa: "ვეძებდი სტუდიას, სადაც ინგლისურად ან უკრაინულად ილაპარაკებენ — აქ ყველაფერი მარტივი იყო. პროცედურა თითქმის უმტკივნეულოა.",
    textUk: "Шукала студію, де можна спілкуватися українською чи англійською — тут усе було просто. Процедура майже безболісна, результат чудовий.",
    textEn: "I was looking for a studio where I could speak Ukrainian or English — everything was easy here. Almost painless, and the results are great.",
  },
  {
    name: "Mariam G.", photo: img("1604072366595-e75dc92d6bdc", 300), rating: 5,
    textKa: "საუკეთესო გადაწყვეტილება ზაფხულის წინ. ფასები გამჭვირვალეა, ჩაწერა — ძალიან მოსახერხებელი WhatsApp-ით.",
    textUk: "Найкраще рішення перед літом. Прозорі ціни, а записуватися через WhatsApp дуже зручно.",
    textEn: "The best decision before summer. Transparent prices and booking via WhatsApp is super convenient.",
  },
  {
    name: "Giorgi T.", photo: "", rating: 5,
    textKa: "ზურგის ეპილაცია გავიკეთე — პროფესიონალური მიდგომა და კომფორტული ატმოსფერო. გირჩევთ!",
    textUk: "Робив епіляцію спини — професійний підхід і комфортна атмосфера. Рекомендую!",
    textEn: "Had my back done — a professional approach and a comfortable atmosphere. Highly recommend!",
  },
];

const results = [
  { beforeImage: img("1710580889701-9fa8f2cd5927", 900), afterImage: img("1626623936480-15fd56a295f8", 900), captionKa: "წვივები — 5 პროცედურის შემდეგ", captionUk: "Гомілки — після 5 процедур", captionEn: "Lower legs — after 5 sessions" },
  { beforeImage: img("1769029270634-693d635260ef", 900), afterImage: img("1587179790059-5f5d937fb87d", 900), captionKa: "ფეხები — 6 პროცედურის შემდეგ", captionUk: "Ноги — після 6 процедур", captionEn: "Legs — after 6 sessions" },
  { beforeImage: img("1605552986371-d78779ebe38b", 900), afterImage: img("1599817878414-43ef36677cf0", 900), captionKa: "იღლიები — 4 პროცედურის შემდეგ", captionUk: "Пахви — після 4 процедур", captionEn: "Underarms — after 4 sessions" },
];

const faq = [
  {
    questionKa: "მტკივნეულია?", questionUk: "Чи боляче?", questionEn: "Does it hurt?",
    answerKa: "ჩვენი ლაზერი აღჭურვილია გაგრილების სისტემით, ამიტომ შეგრძნებები მინიმალურია — მსუბუქი სითბო ან ჩხვლეტა. ტკივილის ზღურბლი ინდივიდუალურია, ამიტომ პარამეტრებს თქვენზე ვარჩევთ.",
    answerUk: "Наш лазер має систему охолодження, тож відчуття мінімальні — легке тепло чи поколювання. Больовий поріг у всіх різний, тому ми підбираємо параметри індивідуально.",
    answerEn: "Our laser has a built-in cooling system, so you'll feel only mild warmth or tingling. Everyone's pain threshold is different, so we adjust the settings to you.",
  },
  {
    questionKa: "რამდენი პროცედურაა საჭირო?", questionUk: "Скільки процедур потрібно?", questionEn: "How many sessions do I need?",
    answerKa: "როგორც წესი, 6–8 პროცედურა 4–8 კვირის ინტერვალით. ზუსტი რაოდენობა დამოკიდებულია ზონაზე, თმის ტიპზე და ჰორმონალურ ფონზე.",
    answerUk: "Зазвичай 6–8 процедур з інтервалом 4–8 тижнів. Точна кількість залежить від зони, типу волосся та гормонального фону.",
    answerEn: "Usually 6–8 sessions, 4–8 weeks apart. The exact number depends on the area, hair type and hormonal background.",
  },
  {
    questionKa: "როდის ჩანს შედეგი?", questionUk: "Коли видно результат?", questionEn: "When will I see results?",
    answerKa: "პირველი შედეგი ჩანს 2–3 კვირაში პირველი პროცედურის შემდეგ — თმა ცვივა და ნელა იზრდება. ყოველი პროცედურის შემდეგ თმა სულ უფრო ნაკლები და თხელია.",
    answerUk: "Перший результат помітний через 2–3 тижні після першої процедури — волосся випадає й росте повільніше. З кожною процедурою його стає менше, і воно тоншає.",
    answerEn: "The first results appear 2–3 weeks after your first session — hair falls out and grows back slower. With every session there is less hair and it becomes finer.",
  },
  {
    questionKa: "შეიძლება ზაფხულში?", questionUk: "Чи можна влітку?", questionEn: "Can I do it in summer?",
    answerKa: "დიახ, თანამედროვე დიოდური ლაზერი საშუალებას იძლევა პროცედურები ზაფხულშიც ჩატარდეს. მთავარია, მზეზე არ გარუჯოთ ზონა პროცედურამდე და შემდეგ 2 კვირის განმავლობაში და გამოიყენოთ SPF 50.",
    answerUk: "Так, сучасний діодний лазер дозволяє робити процедури й улітку. Головне — не засмагати 2 тижні до та після процедури та використовувати SPF 50.",
    answerEn: "Yes — a modern diode laser allows treatments in summer too. Just avoid tanning for 2 weeks before and after each session and use SPF 50.",
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

  // CMS defaults (only missing keys, never overwrite edits)
  for (const f of TEXT_FIELDS) {
    await prisma.siteText.upsert({ where: { key: f.key }, create: { key: f.key, ka: f.ka, uk: f.uk, en: f.en }, update: {} });
  }
  for (const f of SETTING_FIELDS) {
    await prisma.setting.upsert({ where: { key: f.key }, create: { key: f.key, value: f.default }, update: {} });
  }
  console.log("✔ Site texts & settings");

  // Demo content — each collection is seeded only while it is empty.
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({ data: services.map((s, i) => ({ ...s, sortOrder: i * 10 })) });
    console.log(`✔ ${services.length} services`);

    const legs = await prisma.service.findUnique({ where: { slug: "full-legs" } });
    const underarms = await prisma.service.findUnique({ where: { slug: "underarms" } });
    const day = (n: number) => new Date(`${new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10)}T00:00:00Z`);
    await prisma.booking.createMany({
      data: [
        { fullName: "Nino Beridze", phone: "+995 599 11 22 33", serviceId: legs?.id, serviceName: "Full legs", date: day(2), time: "12:00", message: "First visit, I would like a consultation.", locale: "ka" },
        { fullName: "Kateryna Shevchenko", phone: "+380 67 123 45 67", serviceId: underarms?.id, serviceName: "Underarms", date: day(4), time: "17:00", locale: "uk", status: "CONFIRMED" },
      ],
    });
    console.log("✔ Demo bookings");
  }
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials.map((t, i) => ({ ...t, sortOrder: i * 10 })) });
    console.log(`✔ ${testimonials.length} testimonials`);
  }
  if ((await prisma.beforeAfter.count()) === 0) {
    await prisma.beforeAfter.createMany({ data: results.map((r, i) => ({ ...r, sortOrder: i * 10 })) });
    console.log(`✔ ${results.length} before/after pairs (placeholders)`);
  }
  if ((await prisma.faqItem.count()) === 0) {
    await prisma.faqItem.createMany({ data: faq.map((f, i) => ({ ...f, sortOrder: i * 10 })) });
    console.log(`✔ ${faq.length} FAQ items`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
