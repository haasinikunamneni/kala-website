import type { Painting, Supplier, Frame, Glass } from "../types";

// ── Artwork images ───────────────────────────────────────────────
import vrindavanRaasLeelaImg         from "../assets/artworks/vrindavan-raas-leela.jpg";
import natyaGanapatiRedImg           from "../assets/artworks/natya-ganapati-red.jpg";
import natyaGanapatiMaroonImg        from "../assets/artworks/natya-ganapati-maroon.jpg";
import natyaGanapatiTealImg          from "../assets/artworks/natya-ganapati-teal.jpg";
import natyaGanapatiRustImg          from "../assets/artworks/natya-ganapati-rust.jpg";
import natyaGanapatiAmberImg         from "../assets/artworks/natya-ganapati-amber.jpg";
import natyaGanapatiPaintedYellowImg from "../assets/artworks/natya-ganapati-painted-yellow.jpg";
import natyaGanapatiPaintedOrangeImg from "../assets/artworks/natya-ganapati-painted-orange.jpg";
import natyaGanapatiPaintedWhiteImg  from "../assets/artworks/natya-ganapati-painted-white.jpg";
import natyaGanapatiMulticolourImg   from "../assets/artworks/natya-ganapati-multicolour.png";
import natyaGanapatiGreenImg         from "../assets/artworks/natya-ganapati-green.jpg";
import radhaMadhavaNaturalImg        from "../assets/artworks/radha-madhava-natural.png";
import radhaMadhavaBlueImg           from "../assets/artworks/radha-madhava-blue-bg.png";
import radhaMadhavaOchreImg          from "../assets/artworks/radha-madhava-ochre.png";
import krishnaViharaImg              from "../assets/artworks/krishna-procession-bw.jpg";
import akruraYatraImg                from "../assets/artworks/akrura-yatra.jpg";
import naukaViharaLeelaImg           from "../assets/artworks/nauka-vihara-leela.jpg";
import dasavataraMandalaImg          from "../assets/artworks/dasavatara-mandala.jpg";
import vrindavanaLilavaliImg         from "../assets/artworks/vrindavana-lilavali.jpg";
import radhaKrishnaPremavaliImg      from "../assets/artworks/radha-krishna-premavali.jpg";
import patraChitraBlackImg           from "../assets/artworks/patra-chitra-black.png";
import patraChitraGreenImg           from "../assets/artworks/patra-chitra-green.png";
import patraChitraBlack2Img          from "../assets/artworks/patra-chitra-black-2.png";
import patraChitraBlueImg            from "../assets/artworks/patra-chitra-blue.png";
import raktaKalpavrikshaImg          from "../assets/artworks/rakta-kalpavriksha.png";
import kusumaVrikshaImg              from "../assets/artworks/kusuma-vriksha.png";
import patraChitraBlack3Img          from "../assets/artworks/patra-chitra-black-3.png";
import patraChitraGreen2Img          from "../assets/artworks/patra-chitra-green-2.png";
import patraChitraCrimsonImg         from "../assets/artworks/patra-chitra-crimson.png";
import krishnaLilavaliImg            from "../assets/artworks/krishna-lilavali-pattachitra.png";
import akruraYatraLilaImg            from "../assets/artworks/akrura-yatra-lila.png";
import kaliyaDamanaLilaImg           from "../assets/artworks/kaliya-damana-lila.jpg";
import shriKrishnaJalViharaImg       from "../assets/artworks/shri-krishna-jal-vihara.jpg";
import arunodayaNaukaViharaImg       from "../assets/artworks/arunodaya-nauka-vihara.jpg";
import abhayaBuddhaImg               from "../assets/artworks/abhaya-buddha.jpg";
import abhayaBuddhaNaturalImg        from "../assets/artworks/abhaya-buddha-natural.jpg";
import venugopalaLilaImg             from "../assets/artworks/venugopala-lila.jpg";
import phalaKalpavrikshaImg          from "../assets/artworks/phala-kalpavriksha.jpg";
import mahishasuramardiniImg         from "../assets/artworks/mahishasuramardini.png";
import mahishasuramardiniTealImg     from "../assets/artworks/mahishasuramardini-teal.png";
import vinapaniSaraswatiImg          from "../assets/artworks/vinapani-saraswati.png";
import shriSaraswatiImg              from "../assets/artworks/shri-saraswati.png";
import garudaImg                     from "../assets/artworks/garuda.png";
import radhaMadhavaSevaImg           from "../assets/artworks/radha-madhava-seva.png";
import ramaBhaktaHanumanImg          from "../assets/artworks/rama-bhakta-hanuman.png";
import ramaBhaktaHanumanCrimsonImg   from "../assets/artworks/rama-bhakta-hanuman-crimson.png";
import ramaBhaktaHanumanGoldenImg    from "../assets/artworks/rama-bhakta-hanuman-golden.png";
import venugopalaVrindavanaImg       from "../assets/artworks/venugopala-vrindavana.png";
import venugopalaVrindavanaCrimsonImg from "../assets/artworks/venugopala-vrindavana-crimson.png";
import natyaGanapatiCrimsonImg       from "../assets/artworks/natya-ganapati-crimson.png";
import natyaGanapatiPinkImg          from "../assets/artworks/natya-ganapati-pink.png";
import shriMahavishnuImg             from "../assets/artworks/shri-mahavishnu.png";
import shriMahavishnuCrimsonImg      from "../assets/artworks/shri-mahavishnu-crimson.png";
import shriMahalakshmiImg            from "../assets/artworks/shri-mahalakshmi.png";
import hamsaNaukaViharaImg           from "../assets/artworks/hamsa-nauka-vihara.png";
import nisaNikunjaVilasaImg          from "../assets/artworks/nisa-nikunja-vilasa.png";
import prabhataNikunjaVilasaImg      from "../assets/artworks/prabhata-nikunja-vilasa.png";
import garudaViharaImg               from "../assets/artworks/garuda-vihara.png";
import mahaRasaLilaImg               from "../assets/artworks/maha-rasa-lila.png";
import patraChitraBlue2Img           from "../assets/artworks/patra-chitra-blue-2.png";
import patraChitraBlue3Img           from "../assets/artworks/patra-chitra-blue-3.png";
import patraChitraMaroonImg          from "../assets/artworks/patra-chitra-maroon.png";
import patraChitraGreen3Img          from "../assets/artworks/patra-chitra-green-3.png";
import patraChitraRedImg             from "../assets/artworks/patra-chitra-red.png";
import balaKrishnaLilavaliImg        from "../assets/artworks/bala-krishna-lilavali.png";
import chandrikaVenugopalaLilaImg    from "../assets/artworks/chandrika-venugopala-lila.png";
import vrindavanaVilasaImg           from "../assets/artworks/vrindavana-vilasa.png";
import shringaraSevaImg              from "../assets/artworks/shringara-seva.png";
import nisaMuraliRasaImg             from "../assets/artworks/nisa-murali-rasa.png";
import anandaTandavaGanapatiImg      from "../assets/artworks/ananda-tandava-ganapati.png";
import anandaTandavaGanapatiMaroonImg from "../assets/artworks/ananda-tandava-ganapati-maroon.jpg";
import nartanaVinayakaMaroonImg      from "../assets/artworks/nartana-vinayaka-maroon.jpg";
import nartanaVinayakaRustImg        from "../assets/artworks/nartana-vinayaka-rust.jpg";
import shriJagannathaTriadImg        from "../assets/artworks/shri-jagannatha-triad.png";
import shriJagannathaTriadCrimsonImg from "../assets/artworks/shri-jagannatha-triad-crimson.png";
import shriJagannathaRatnaSimhasanaImg from "../assets/artworks/shri-jagannatha-ratna-simhasana.jpg";
import jagannathaDarshanaMandalaImg   from "../assets/artworks/jagannatha-darshana-mandala.jpg";
import dolaYatraUtsavaImg            from "../assets/artworks/dola-yatra-utsava.jpg";
import shriJagannathaTrayaImg        from "../assets/artworks/shri-jagannatha-traya.jpg";
import nrsimhaJagannathaImg          from "../assets/artworks/nrsimha-jagannatha-mahaprabhava.jpg";
import vinapaniSarasvatiImg          from "../assets/artworks/vinapani-sarasvati.jpg";
import rasaMandiraVilasaImg          from "../assets/artworks/rasa-mandira-vilasa.png";
import ekakiJagannathaImg            from "../assets/artworks/ekaki-jagannatha.png";
import artisanWorkshop1Img from "../assets/suppliers/artisan-workshop-1.png";
import artisanWorkshop2Img from "../assets/suppliers/artisan-workshop-2.png";
import artisanWorkshop3Img from "../assets/suppliers/artisan-workshop-3.png";
import artisanWorkshop4Img from "../assets/suppliers/artisan-workshop-4.png";
import artisanWorkshop5Img from "../assets/suppliers/artisan-workshop-5.png";
import artisanWorkshop6Img from "../assets/suppliers/artisan-workshop-6.png";
import artisanWorkshop7Img from "../assets/suppliers/artisan-workshop-7.png";
import artisanWorkshop8Img from "../assets/suppliers/artisan-workshop-8.png";
import artisanWorkshop9Img from "../assets/suppliers/artisan-workshop-9.png";

export const suppliers: Supplier[] = [
  {
    slug: "odisha-pattachitra",
    name: "Odisha",
    location: "Raghurajpuram & Puri, Odisha",
    artForm: "Pattachitra",
    history:
      "For over a thousand years, artisans of Odisha have preserved the tradition of hand-painted scrolls on cloth and dried palm leaf, using pigments derived from stone, conch shell, and lampblack. Each painting begins with a carefully prepared cotton canvas, coated with chalk and natural gum, then burnished smooth to create the perfect surface for the first line. The tradition is deeply intertwined with the sacred world of the Jagannath temple at Puri, whose deities, stories, and legends have remained among its most enduring subjects.",
    artisanStory:
      "Our current collection is brought to life by a family of hereditary artisans in Raghurajpuram, Odisha, where the craft has travelled quietly from one generation to the next. Every brushstroke carries the memory of those who came before — a practice shaped by patience, devotion, and years of inherited knowledge. Each work is therefore not merely painted by hand, but carries a lineage of its own. No two works are ever identical. Each pigment is prepared fresh on the day of painting, making every piece a singular expression of a craft that has endured through centuries.",
    comingSoon: false,
    palette: ["#B95D3F", "#B6905A", "#1D1D1B"],
    coverImageUrl: artisanWorkshop3Img,
    galleryImageUrls: [
      artisanWorkshop1Img,
      artisanWorkshop2Img,
      artisanWorkshop3Img,
      artisanWorkshop4Img,
      artisanWorkshop5Img,
      artisanWorkshop6Img,
      artisanWorkshop7Img,
      artisanWorkshop8Img,
      artisanWorkshop9Img,
    ],
  },
];

export const frames: Frame[] = [
  { id: "f1", name: "Black", pricePerSqM: 1200, available: true },
  { id: "f2", name: "Brown", pricePerSqM: 1400, available: true },
];

export const glassOptions: Glass[] = [
  { id: "g0", name: "None",         description: "No glass — artwork only.",                                                              pricePerSqM: 0,   available: true },
  { id: "g1", name: "Normal Glass", description: "Standard clear glass with UV-resistant coating. Suitable for most interiors.",         pricePerSqM: 216, available: true },
  { id: "g2", name: "Flexi Glass",  description: "Lightweight shatter-resistant acrylic — ideal for couriered pieces and large formats.", pricePerSqM: 900, available: true },
];

const seed: Array<Omit<Painting, "palette" | "supplierSlug" | "artForm" | "origin">> = [
  {
    id: "p1",
    theme: "Krishna",
    slug: "vrindavan-raas-leela",
    title: "Vrindavan Raas Leela",
    price: 24999,
    description: "An exquisite depiction of Lord Krishna's Rasalila, celebrating the eternal harmony between the Divine and His devotees through intricate Pattachitra artistry.",
    story: "An exquisite depiction of Lord Krishna's Rasalila, celebrating the eternal harmony between the Divine and His devotees through intricate Pattachitra artistry. Hand-painted on treated cotton cloth using natural pigments, every detail of this piece reflects the devotion and discipline of the Raghurajpuram tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    imageRotation: 180,
    coverImageUrl: vrindavanRaasLeelaImg,
    galleryImageUrls: [vrindavanRaasLeelaImg],
  },
  {
    id: "p2",
    theme: "Ganesha",
    slug: "natya-ganapati-red",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 1599,
    variantGroup: "natya-ganapati",
    variantLabel: "Red",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, in a rich Red colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    imageRotation: 0,
    coverImageUrl: natyaGanapatiRedImg,
    galleryImageUrls: [natyaGanapatiRedImg],
  },
  {
    id: "p2b",
    theme: "Ganesha",
    slug: "natya-ganapati-maroon",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 1599,
    variantGroup: "natya-ganapati",
    variantLabel: "Maroon",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, in a deep Maroon colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    imageRotation: 0,
    coverImageUrl: natyaGanapatiMaroonImg,
    galleryImageUrls: [natyaGanapatiMaroonImg],
  },
  {
    id: "p2c",
    theme: "Ganesha",
    slug: "natya-ganapati-teal",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 1599,
    variantGroup: "natya-ganapati",
    variantLabel: "Teal",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, in a striking Teal colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    imageRotation: 0,
    coverImageUrl: natyaGanapatiTealImg,
    galleryImageUrls: [natyaGanapatiTealImg],
  },
  {
    id: "p2d",
    theme: "Ganesha",
    slug: "natya-ganapati-rust",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 2399,
    variantGroup: "natya-ganapati",
    variantLabel: "Rust",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, seated upon his mouse vahana against a warm Rust colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    imageRotation: 0,
    coverImageUrl: natyaGanapatiRustImg,
    galleryImageUrls: [natyaGanapatiRustImg],
  },
  {
    id: "p2e",
    theme: "Ganesha",
    slug: "natya-ganapati-amber",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 1599,
    variantGroup: "natya-ganapati",
    variantLabel: "Amber",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, in a warm Amber colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    imageRotation: 0,
    coverImageUrl: natyaGanapatiAmberImg,
    galleryImageUrls: [natyaGanapatiAmberImg],
  },
  {
    id: "p2f",
    theme: "Ganesha",
    slug: "natya-ganapati-white",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 1599,
    variantGroup: "natya-ganapati",
    variantLabel: "White",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, framed against a soft White backdrop.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: natyaGanapatiPaintedWhiteImg,
    galleryImageUrls: [natyaGanapatiPaintedWhiteImg],
  },
  {
    id: "p2g",
    theme: "Ganesha",
    slug: "natya-ganapati-multicolour",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 1599,
    variantGroup: "natya-ganapati",
    variantLabel: "Multicolour",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, rendered in a vibrant Multicolour palette of red, green, and blue with his mouse vahana at his feet.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: natyaGanapatiMulticolourImg,
    galleryImageUrls: [natyaGanapatiMulticolourImg],
  },
  {
    id: "p2h",
    theme: "Ganesha",
    slug: "natya-ganapati-green",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 2399,
    variantGroup: "natya-ganapati",
    variantLabel: "Green",
    description: "A finely detailed Pattachitra depicting Natya Ganapati, the graceful dancing form of Lord Ganesha, seated upon his mouse vahana against a vivid Green colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. Revered as the patron of music, dance, and the arts, His graceful posture celebrates the cosmic rhythm of creation while inspiring prosperity, knowledge, and new beginnings. Hand-painted in the traditional Pattachitra style, this artwork beautifully preserves Odisha's rich artistic heritage.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: natyaGanapatiGreenImg,
    galleryImageUrls: [natyaGanapatiGreenImg],
  },
  {
    id: "p3",
    theme: "Ganesha",
    slug: "natya-ganapati-hand-painted-yellow",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati Hand-Painted",
    price: 2199,
    variantGroup: "natya-ganapati-hand-painted",
    variantLabel: "Yellow",
    description: "A hand-painted Pattachitra depicting Natya Ganapati in richer, individually applied natural pigments, in a warm Yellow colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. This hand-painted variation is crafted with individually applied natural pigments, giving each piece a unique depth and warmth that no two artworks share.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: natyaGanapatiPaintedYellowImg,
    galleryImageUrls: [natyaGanapatiPaintedYellowImg],
  },
  {
    id: "p3b",
    theme: "Ganesha",
    slug: "natya-ganapati-hand-painted-orange",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati Hand-Painted",
    price: 2199,
    variantGroup: "natya-ganapati-hand-painted",
    variantLabel: "Orange",
    description: "A hand-painted Pattachitra depicting Natya Ganapati in richer, individually applied natural pigments, in a vivid Orange colourway.",
    story: "Natya Ganapati, the dancing form of Lord Ganesha, symbolizes the harmony of wisdom, creativity, and divine joy. This hand-painted variation is crafted with individually applied natural pigments, giving each piece a unique depth and warmth that no two artworks share.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: natyaGanapatiPaintedOrangeImg,
    galleryImageUrls: [natyaGanapatiPaintedOrangeImg],
  },
  {
    id: "p4",
    theme: "Krishna",
    slug: "radha-madhava",
    title: "Rādhā Mādhava",
    price: 2699,
    variantGroup: "radha-madhava",
    variantLabel: "Natural",
    description: "A handcrafted Odisha Pattachitra portraying Rādhā and Krishna beneath a blossoming tree in Vṛndāvana, where Krishna's flute fills the air with divine melody. The tranquil lotus pond and graceful swans complete a composition that embodies eternal love, devotion, and the timeless elegance of Odisha's Pattachitra tradition.",
    story: "Set in the sacred groves of Vṛndāvana, this artwork portrays Krishna enchanting Rādhā with the timeless melody of his flute beneath a flowering tree. The lotus-filled waters and graceful swans symbolise purity and divine love, while the intimate embrace reflects the eternal union of the soul with the Divine. Hand-painted using Odisha's centuries-old Pattachitra tradition, every delicate line preserves a legacy of devotion, storytelling, and masterful craftsmanship.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: radhaMadhavaNaturalImg,
    galleryImageUrls: [radhaMadhavaNaturalImg],
  },
  {
    id: "p4b",
    theme: "Krishna",
    slug: "radha-madhava-blue",
    title: "Rādhā Mādhava",
    price: 2699,
    variantGroup: "radha-madhava",
    variantLabel: "Blue",
    description: "A handcrafted Odisha Pattachitra portraying Rādhā and Krishna beneath a blossoming tree in Vṛndāvana, where Krishna's flute fills the air with divine melody. Rendered in a refined monochrome palette set against a deep sapphire-blue backdrop, the tranquil lotus pond and graceful swans complete a composition that embodies eternal love, devotion, and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story: "In the sacred forests of Vṛndāvana, Krishna's enchanting flute draws Rādhā into a moment of divine love and spiritual harmony. Beneath a blossoming tree and beside a lotus-filled pond, their gentle companionship reflects the soul's longing for the Divine. Hand-painted using Odisha's centuries-old Pattachitra tradition, every intricate detail preserves a timeless legacy of devotion, artistry, and cultural heritage.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: radhaMadhavaBlueImg,
    galleryImageUrls: [radhaMadhavaBlueImg],
  },
  {
    id: "p58",
    theme: "Krishna",
    slug: "radha-madhava-ochre",
    title: "Rādhā Mādhava",
    price: 2699,
    variantGroup: "radha-madhava",
    variantLabel: "Ochre",
    description: "A handcrafted Odisha Pattachitra portraying Rādhā and Krishna beneath a blossoming tree in Vṛndāvana, where Krishna's flute fills the air with divine melody. Rendered in an elegant monochrome palette accented by a warm ochre backdrop, the tranquil lotus pond and graceful swans complete a composition that embodies eternal love, devotion, and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story: "In the sacred forests of Vṛndāvana, Krishna's enchanting flute draws Rādhā into a moment of divine love and spiritual harmony. Beneath a blossoming tree and beside a lotus-filled pond, their gentle companionship reflects the soul's longing for the Divine. Hand-painted using Odisha's centuries-old Pattachitra tradition, every intricate detail preserves a timeless legacy of devotion, artistry, and cultural heritage.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: radhaMadhavaOchreImg,
    galleryImageUrls: [radhaMadhavaOchreImg],
  },
  {
    id: "p5",
    theme: "Krishna",
    slug: "sri-krishna-vihara",
    title: "Sri Krishna Vihara",
    price: 14999,
    description: "A finely detailed monochrome Pattachitra portraying Lord Krishna with Radha and the Gopis in a graceful procession through the sacred groves of Vrindavan.",
    story: "In the sacred groves of Vrindavan, Lord Krishna's enchanting flute gathered Radha and the Gopis in a joyous procession of devotion and love. Accompanied by attendants bearing royal emblems, the journey symbolizes the soul's longing for the Divine.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: krishnaViharaImg,
    galleryImageUrls: [krishnaViharaImg],
  },
  {
    id: "p6",
    theme: "Krishna",
    slug: "akrura-yatra",
    title: "Akrura Yatra",
    price: 17999,
    description: "A traditional Pattachitra depicting Krishna and Balarama's sacred journey to Mathura, marking the beginning of their divine mission.",
    story: "King Kamsa summoned Krishna and Balarama to Mathura, sending his trusted minister Akrura to escort them. Though the departure filled Vrindavan with sorrow, the journey marked the beginning of Krishna's mission to end Kamsa's tyranny. The chariot symbolizes destiny, courage, and the triumph of dharma over evil.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: akruraYatraImg,
    galleryImageUrls: [akruraYatraImg],
  },
  {
    id: "p7",
    theme: "Krishna",
    slug: "chandrika-nauka-vihara",
    title: "Chandrika Nauka Vihara",
    price: 35999,
    variantGroup: "nauka-vihara",
    variantLabel: "Chandrika Nauka Vihara",
    description: "A handcrafted Odisha Pattachitra depicting Krishna's sacred boat journey with Radha and the Gopikas on the Yamuna. Rich in intricate detailing and traditional natural pigments, it celebrates one of Vrindavan's most beloved divine pastimes.",
    story: "During the Nauka Vihara Leela, Krishna invited Radha and the Gopikas aboard a beautifully adorned boat on the Yamuna. Through playful conversation and divine mischief, he transformed a simple voyage into a lesson of faith and devotion, symbolizing the soul's journey through life's waters under the guidance of the Divine.",
    dimensions: "22in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: naukaViharaLeelaImg,
    galleryImageUrls: [naukaViharaLeelaImg],
  },
  {
    id: "p8",
    theme: "Krishna",
    slug: "dasavatara-mandala",
    title: "Mahā Rāsa Līlā with Daśāvatāra Maṇḍala",
    price: 15000,
    tags: ["Mandala"],
    description: "A handcrafted Odisha Pattachitra featuring Mahā Rāsa Līlā at its center, encircled by the Daśāvatāra Maṇḍala, symbolizing Lord Vishnu's divine incarnations. Intricately painted using traditional techniques, it embodies the spiritual richness and storytelling heritage of Raghurajpuram.",
    story: "At the heart of the composition is the Mahā Rāsa Līlā, where Lord Krishna performs the divine celestial dance with the Gopikas, representing the soul's eternal union with the Divine. Surrounding this sacred scene, the Daśāvatāra Maṇḍala illustrates Lord Vishnu's incarnations, each manifesting to restore dharma across the ages. Together, the painting unites Krishna's supreme expression of divine love with Vishnu's timeless role as the preserver of cosmic order, creating a powerful visual celebration of devotion, protection, and spiritual harmony.",
    dimensions: "22in x 16in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: dasavataraMandalaImg,
    galleryImageUrls: [dasavataraMandalaImg],
  },
  {
    id: "p9",
    theme: "Krishna",
    slug: "vrindavana-lilavali",
    title: "Vṛndāvana Līlāvalī",
    price: 15000,
    tags: ["Mandala"],
    description: "A handcrafted Odisha Pattachitra celebrating Vṛndāvana Līlāvalī—a collection of Krishna's most cherished divine pastimes, centered around Radha and Krishna. The intricate medallion composition reflects the rich narrative tradition of classical Pattachitra.",
    story: "Centered on the eternal presence of Radha and Krishna, the painting is encircled by scenes from Krishna's divine adventures in Vṛndāvana—from playful childhood miracles to moments of compassion and devotion. Together, these episodes form a Līlāvalī, a visual garland of sacred pastimes that celebrates the joy, love, and timeless teachings of Krishna's life.",
    dimensions: "22in x 16in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: vrindavanaLilavaliImg,
    galleryImageUrls: [vrindavanaLilavaliImg],
  },
  {
    id: "p10",
    theme: "Krishna",
    slug: "radha-krishna-premavali",
    title: "Rādhā–Kṛṣṇa Premāvalī",
    price: 15000,
    tags: ["Mandala"],
    description: "A handcrafted Odisha Pattachitra centered on the eternal love of Rādhā and Kṛṣṇa, surrounded by medallions illustrating cherished moments from Krishna's divine life. The composition celebrates devotion through the intricate narrative style of traditional Pattachitra.",
    story: "At its heart, the painting honors the sacred bond between Rādhā and Kṛṣṇa, a timeless symbol of unconditional love and devotion. The surrounding medallions unfold episodes from Krishna's life, weaving together moments of joy, compassion, and divine play into a harmonious visual celebration of prema (divine love).",
    dimensions: "16in x 22in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: radhaKrishnaPremavaliImg,
    galleryImageUrls: [radhaKrishnaPremavaliImg],
  },
  {
    id: "p11",
    theme: "Patra",
    slug: "patra-chitra-black",
    imageRotation: 90 as const,
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Black 1",
    description:
      "An elegant Odisha Patra Chitra featuring a stylised sacred tree composed of meticulously hand-painted leaves and delicate floral accents. Rendered in a timeless monochrome palette with subtle crimson highlights, the artwork celebrates the harmony of nature through the intricate decorative traditions of Pattachitra.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraBlackImg,
    galleryImageUrls: [patraChitraBlackImg],
  },
  {
    id: "p12",
    theme: "Patra",
    slug: "patra-chitra-green",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Green 1",
    description:
      "A handcrafted Patra Chitra depicting a stylised sacred leaf adorned with intricately intertwined vines, delicate foliage, and blooming blue floral accents. The harmonious symmetry and flowing botanical forms embody the elegance of Odisha's traditional decorative Pattachitra, celebrating nature through meticulous craftsmanship and timeless design.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraGreenImg,
    galleryImageUrls: [patraChitraGreenImg],
  },
  {
    id: "p13",
    theme: "Patra",
    slug: "patra-chitra-black-2",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Black 2",
    description:
      "A handcrafted Patra Chitra portraying the sacred Kalpavṛkṣa beneath an ornate temple arch, its layered foliage adorned with delicate birds and crimson floral accents. At the base, scenes of rural life unfold, celebrating the harmony between nature, community, and the enduring traditions of Odisha. Executed in a refined monochrome palette, the composition reflects the elegance and intricate craftsmanship of classical Pattachitra.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraBlack2Img,
    galleryImageUrls: [patraChitraBlack2Img],
  },
  {
    id: "p14",
    theme: "Patra",
    slug: "patra-chitra-blue",
    imageRotation: 90 as const,
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Blue 1",
    description:
      "A handcrafted Patra Chitra portraying the sacred Kalpavṛkṣa, with intricate indigo foliage and golden blossoms. Its graceful symmetry and traditional border reflect the timeless elegance and craftsmanship of Odisha's Pattachitra heritage.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraBlueImg,
    galleryImageUrls: [patraChitraBlueImg],
  },
  {
    id: "p14b",
    theme: "Patra",
    slug: "patra-chitra-blue-2",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Blue 2",
    description:
      "A refined Pattachitra featuring an elegant blue Kalpavallī motif, where flowing vines and delicate blossoms intertwine in perfect symmetry. The graceful composition symbolizes abundance, harmony, and the eternal rhythm of nature.",
    story:
      "Inspired by the sacred Kalpavallī—the celestial wish-fulfilling vine of Indian tradition—this artwork celebrates life's continuous growth and prosperity. Every curling tendril and flourishing leaf reflects the interconnectedness of creation, while the balanced design evokes peace, renewal, and the timeless beauty of nature as envisioned through the intricate artistry of Odisha's Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraBlue2Img,
    galleryImageUrls: [patraChitraBlue2Img],
  },
  {
    id: "p15",
    theme: "Patra",
    slug: "rakta-kalpavriksha",
    giftingCollection: "kalpavriksha",
    title: "Rakta Kalpavṛkṣa (The Crimson Tree of Life)",
    price: 1699,
    variantGroup: "kalpavriksha-tree",
    variantLabel: "Crimson",
    description:
      "A handcrafted PattaChitra depicting the sacred Kalpavṛkṣa with flowing crimson foliage and verdant leaves. Its graceful form and intricate detailing symbolise vitality, prosperity, and the enduring beauty of Odisha's Pattachitra tradition.",
    story:
      "Created using the traditional Pattachitra process, artisans first prepare a smooth canvas from layers of cotton cloth bonded with natural tamarind seed paste and chalk stone. The tree is then meticulously hand-painted using fine brushes and natural pigments, with every leaf and branch drawn individually. The striking crimson palette celebrates the vibrancy of nature while preserving a centuries-old artistic heritage.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: raktaKalpavrikshaImg,
    galleryImageUrls: [raktaKalpavrikshaImg],
  },
  {
    id: "p28",
    theme: "Patra",
    slug: "phala-kalpavriksha",
    giftingCollection: "kalpavriksha",
    title: "Phala Kalpavṛkṣa",
    price: 1699,
    variantGroup: "kalpavriksha-tree",
    variantLabel: "Phala (Golden Fruits)",
    description:
      "A handcrafted Patra Chitra portraying the sacred Phala Kalpavṛkṣa, adorned with flourishing foliage, blossoms, and golden fruits. Its balanced composition symbolises abundance, prosperity, and the life-giving harmony of nature, beautifully expressed through Odisha's timeless Pattachitra tradition.",
    story:
      "Inspired by the sacred Kalpavṛkṣa, the wish-fulfilling tree of Indian tradition, this artwork celebrates nature's abundance through flowering branches and ripened fruits. In Pattachitra, such botanical compositions represent prosperity, nourishment, and the continuous cycle of growth. Every leaf, flower, and fruit is meticulously hand-painted using the centuries-old techniques of Odisha's master artisans, preserving a living heritage of devotion and craftsmanship.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: phalaKalpavrikshaImg,
    galleryImageUrls: [phalaKalpavrikshaImg],
  },
  {
    id: "p16",
    theme: "Patra",
    slug: "kusuma-vriksha",
    title: "Kusuma Vṛkṣa",
    price: 1499,
    description:
      "A handcrafted Patra Chitra depicting a graceful tree adorned with crimson and olive-green leaves, framed by intricate traditional borders. Its balanced composition symbolises growth, harmony, and the timeless elegance of Odisha's Pattachitra tradition.",
    story:
      "Created using the centuries-old Pattachitra technique, artisans prepare a smooth canvas from layers of cotton cloth, natural tamarind seed paste, and chalk stone. Every leaf is painted individually with fine brushes and natural pigments, transforming a simple botanical form into a refined work of heritage art that celebrates patience, precision, and craftsmanship.",
    dimensions: "20in x 16in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: kusumaVrikshaImg,
    galleryImageUrls: [kusumaVrikshaImg],
  },
  {
    id: "p17",
    theme: "Patra",
    slug: "patra-chitra-black-3",
    imageRotation: 90 as const,
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Black 3",
    description:
      "A handcrafted Patra Chitra portraying the sacred Kalpavṛkṣa beneath an ornate temple arch, its layered foliage adorned with delicate birds and crimson floral accents. At the base, scenes of rural life unfold, celebrating the harmony between nature, community, and the enduring traditions of Odisha. Executed in a refined monochrome palette, the composition reflects the elegance and intricate craftsmanship of classical Pattachitra.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraBlack3Img,
    galleryImageUrls: [patraChitraBlack3Img],
  },
  {
    id: "p18",
    theme: "Patra",
    slug: "patra-chitra-green-2",
    imageRotation: 90 as const,
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Green 2",
    description:
      "A handcrafted Patra Chitra depicting a stylised sacred leaf adorned with intricately intertwined vines, delicate foliage, and blooming crimson floral accents. The harmonious symmetry and flowing botanical forms embody the elegance of Odisha's traditional decorative Pattachitra, celebrating nature through meticulous craftsmanship and timeless design.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraGreen2Img,
    galleryImageUrls: [patraChitraGreen2Img],
  },
  {
    id: "p29",
    theme: "Patra",
    slug: "patra-chitra-crimson",
    imageRotation: 270 as const,
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Crimson",
    description:
      "A handcrafted Patra Chitra featuring a stylised sacred leaf formed from intricately intertwined crimson foliage, accented with delicate green highlights. Its graceful symmetry and flowing botanical patterns reflect the timeless elegance of Odisha's traditional Pattachitra.",
    story:
      "Inspired by Odisha's decorative Patra Chitra tradition, this artwork transforms a single leaf into an intricate composition of flowing vines and meticulously painted foliage. The canvas is traditionally prepared from layers of cotton cloth using natural tamarind seed paste and chalk stone before every leaf is painted individually with fine brushes and natural pigments. The result is a timeless celebration of patience, precision, and the enduring craftsmanship of Pattachitra artisans.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraCrimsonImg,
    galleryImageUrls: [patraChitraCrimsonImg],
  },
  {
    id: "p29c",
    theme: "Patra",
    slug: "patra-chitra-red",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Red 1",
    description:
      "A graceful Pattachitra featuring a crimson Kalpapatra motif, where hundreds of finely painted leaves radiate in perfect symmetry. Its flowing form and intricate detailing symbolize vitality, prosperity, and the enduring beauty of nature.",
    story:
      "Inspired by the sacred Kalpapatra—the celestial leaf of abundance in Indian tradition—this artwork reflects nature's quiet perfection through disciplined craftsmanship. The countless interconnected leaves represent life's continuous growth, resilience, and harmony, while the deep crimson palette evokes strength, auspiciousness, and the timeless spirit of Odisha's Pattachitra heritage.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraRedImg,
    galleryImageUrls: [patraChitraRedImg],
  },
  {
    id: "p53",
    theme: "Patra",
    slug: "patra-chitra-blue-3",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Blue 3",
    description:
      "A refined Pattachitra depiction of the Tree of Life, intricately hand-painted with flowing indigo branches and radiant golden fruits. Its balanced form and delicate detailing evoke prosperity, resilience, and the interconnectedness of all living beings, transforming a timeless natural motif into an elegant celebration of India's enduring artistic tradition.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraBlue3Img,
    galleryImageUrls: [patraChitraBlue3Img],
  },
  {
    id: "p54",
    theme: "Patra",
    slug: "patra-chitra-maroon",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Maroon",
    description:
      "An exquisite Pattachitra interpretation of the Tree of Life, where meticulously hand-painted crimson leaves unfold in harmonious tiers, punctuated by delicate blue blossoms and framed within an ornate architectural arch. Rich in symbolism and refined in detail, the composition evokes abundance, resilience, and the eternal interconnectedness of nature, embodying the elegance of India's enduring artistic heritage.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraMaroonImg,
    galleryImageUrls: [patraChitraMaroonImg],
  },
  {
    id: "p55",
    theme: "Patra",
    slug: "patra-chitra-green-3",
    giftingCollection: "patra",
    title: "Patra Chitra",
    price: 1299,
    variantGroup: "patra-chitra",
    variantLabel: "Green 3",
    description:
      "An exquisite Pattachitra interpretation of the Tree of Life, featuring intricate emerald-green branches laden with luminous golden fruits, gracefully framed within a finely ornamented arch. The balanced composition embodies growth, renewal, and the interconnectedness of all living beings, transforming a timeless natural motif into a sophisticated expression of India's rich artistic heritage.",
    story:
      "Each Patra Chitra begins with artisans preparing a traditional canvas by layering cotton cloth with a natural paste of tamarind seed gum and chalk stone. Once burnished to a smooth, leather-like finish, the design is carefully sketched and painted entirely by hand using fine brushes and natural pigments. Every leaf, vine, and floral detail is drawn individually, making each artwork a unique expression of Odisha's centuries-old Pattachitra tradition.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: patraChitraGreen3Img,
    galleryImageUrls: [patraChitraGreen3Img],
  },
  {
    id: "p19",
    theme: "Krishna",
    slug: "krishna-lilavali",
    title: "Kṛṣṇa Līlāvalī",
    variantGroup: "krishna-narrative",
    variantLabel: "Rāsa Līlā",
    price: 34000,
    description:
      "A handcrafted Odisha Pattachitra celebrating Krishna's divine pastimes, with the joyous Rāsa Līlā at its heart and a series of intricately painted medallions portraying cherished episodes from his life. Executed in a refined monochrome palette with rich maroon accents, the composition reflects the storytelling mastery of Odisha's classical Pattachitra tradition.",
    story:
      "Inspired by the devotional traditions of Odisha, this composition presents Krishna's life as a visual journey. At its centre is the eternal Rāsa Līlā, symbolising divine love and spiritual bliss, while the surrounding medallions recount beloved moments from his many līlās. Every figure, border, and motif is painted by hand using traditional Pattachitra techniques, transforming sacred storytelling into an enduring work of art.",
    dimensions: "23in x 17in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: krishnaLilavaliImg,
    galleryImageUrls: [krishnaLilavaliImg],
  },
  {
    id: "p20",
    theme: "Krishna",
    slug: "akrura-yatra-lila",
    title: "Akrūra Yātrā Līlā",
    variantGroup: "krishna-narrative",
    variantLabel: "Akrūra Yātrā",
    price: 34000,
    description:
      "A handcrafted Odisha Pattachitra portraying Akrura escorting Krishna and Balarama to Mathura, surrounded by intricately painted medallions depicting cherished episodes from Krishna's divine life. The monochrome palette with subtle blue highlights reflects the refined storytelling tradition of classical Pattachitra.",
    story:
      "Summoned by King Kaṁsa, Akrura travelled to Gokul to bring Krishna and Balarama to Mathura. Though their departure filled the people of Vṛndāvana with sorrow, the journey marked the beginning of Krishna's mission to confront Kaṁsa and restore righteousness. The surrounding medallions celebrate other beloved moments from Krishna's life, creating a visual chronicle of his divine pastimes.",
    dimensions: "23in x 17in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: akruraYatraLilaImg,
    galleryImageUrls: [akruraYatraLilaImg],
  },
  {
    id: "p21",
    theme: "Krishna",
    slug: "kaliya-damana-lila",
    title: "Kāliya Damana Līlā",
    price: 35999,
    description:
      "A handcrafted Odisha Pattachitra portraying Krishna's triumphant return after subduing the serpent Kāliya, surrounded by the people of Vṛndāvana, sacred cows, and the lotus-filled waters of the Yamunā. Rich colours and intricate detailing celebrate one of Krishna's most beloved divine pastimes.",
    story:
      "When the poisonous serpent Kāliya made the Yamunā unsafe, Krishna leapt into its waters and danced upon its many hoods, defeating the serpent without destroying it. After restoring the river's purity, Krishna returned to the joyful embrace of the people of Vṛndāvana. This painting captures that moment of celebration, symbolising courage, compassion, and the triumph of righteousness over fear.",
    dimensions: "22in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: kaliyaDamanaLilaImg,
    galleryImageUrls: [kaliyaDamanaLilaImg],
  },
  {
    id: "p22",
    theme: "Krishna",
    slug: "shri-krishna-jal-vihara",
    title: "Śrī Kṛṣṇa Jal Vihāra",
    price: 35999,
    description:
      "A handcrafted Odisha Pattachitra depicting Śrī Kṛṣṇa's Jal Vihāra, where Krishna is honoured in a joyful ceremonial procession upon a beautifully adorned floating pavilion. Surrounded by music, dancing Gopīs, lotus-filled waters, and flourishing trees, the composition captures the elegance and devotional spirit of Odisha's living temple traditions.",
    story:
      "Inspired by Odisha's sacred temple festivals, Jal Vihāra celebrates the Lord's ceremonial journey across water during the warm summer months. Accompanied by musicians, devotees, and attendants bearing ceremonial fans and parasols, Krishna is honoured amidst blooming lotuses and tranquil waters. Hand-painted using the centuries-old Pattachitra tradition, the artwork beautifully preserves the festive devotion, artistry, and cultural heritage of this cherished celebration.",
    dimensions: "22in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriKrishnaJalViharaImg,
    galleryImageUrls: [shriKrishnaJalViharaImg],
  },
  {
    id: "p23",
    theme: "Krishna",
    slug: "arunodaya-nauka-vihara",
    title: "Aruṇodaya Naukā Vihāra",
    price: 35999,
    variantGroup: "nauka-vihara",
    variantLabel: "Aruṇodaya Naukā Vihāra",
    description:
      "A handcrafted Odisha Pattachitra portraying Krishna and the Gopīs aboard a magnificent swan-shaped boat, gliding across tranquil waters beneath the crimson glow of dawn. Intricate detailing, vibrant colours, and graceful ornamentation celebrate the serenity and splendour of Krishna's divine boat pastime.",
    story:
      "Inspired by Krishna's Naukā Vihāra Līlā, this composition captures the sacred boat journey as the first light of dawn bathes the sky in shades of crimson and gold. Accompanied by the Gopīs, musicians, and attendants, Krishna's voyage symbolises harmony, joy, and divine companionship. Hand-painted using the centuries-old Pattachitra tradition, every figure and ornamental detail reflects the patience, precision, and enduring craftsmanship of Odisha's master artisans.",
    dimensions: "22in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: arunodayaNaukaViharaImg,
    galleryImageUrls: [arunodayaNaukaViharaImg],
  },
  {
    id: "p24",
    theme: "Buddha",
    slug: "abhaya-buddha",
    title: "Abhaya Buddha",
    price: 2499,
    variantGroup: "abhaya-buddha",
    variantLabel: "Crimson",
    description:
      "A handcrafted Odisha Pattachitra portraying Gautama Buddha in the Abhaya Mudrā, symbolising peace, compassion, and fearlessness. The restrained monochrome palette against a deep crimson background highlights the timeless elegance of Odisha's classical artistic tradition.",
    story:
      "Represented with the Abhaya Mudrā, Buddha offers reassurance, protection, and inner peace to all beings. His calm expression and balanced posture embody the path of wisdom, compassion, and enlightenment. Hand-painted using the centuries-old Pattachitra tradition, the artwork reflects Odisha's rich cultural heritage while celebrating the universal ideals of serenity and mindful living.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: abhayaBuddhaImg,
    galleryImageUrls: [abhayaBuddhaImg],
  },
  {
    id: "p25",
    theme: "Buddha",
    slug: "abhaya-buddha-natural",
    title: "Abhaya Buddha",
    price: 2499,
    variantGroup: "abhaya-buddha",
    variantLabel: "Natural Tones",
    description:
      "A handcrafted Odisha Pattachitra portraying Gautama Buddha in the Abhaya Mudrā, symbolising fearlessness, compassion, and inner peace. Rendered in warm natural tones with delicate ornamental detailing, the composition reflects the timeless elegance of Odisha's classical Pattachitra tradition.",
    story:
      "The Abhaya Mudrā, shown through the raised right hand, is a gesture of reassurance, protection, and freedom from fear. Standing with serene composure, Buddha embodies the ideals of wisdom, compassion, and mindfulness. Hand-painted using the centuries-old Pattachitra tradition, the artwork preserves Odisha's rich artistic heritage while conveying a universal message of peace and enlightenment.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: abhayaBuddhaNaturalImg,
    galleryImageUrls: [abhayaBuddhaNaturalImg],
  },
  {
    id: "p27",
    theme: "Krishna",
    slug: "venugopala-lila",
    title: "Veṇugopāla Līlā",
    price: 15999,
    variantGroup: "venugopala-lila",
    variantLabel: "Classic",
    description:
      "A handcrafted Odisha Pattachitra portraying Veṇugopāla, where Krishna enchants the Gopīs with the melody of his flute beneath a blossoming tree. Framed by lotus-filled waters and graceful swans, the composition embodies the serenity, devotion, and timeless beauty of Vṛndāvana.",
    story:
      "In the forests of Vṛndāvana, the sound of Krishna's flute drew devotees, animals, and nature itself into perfect harmony. The Gopīs, captivated by its divine melody, gathered around him in loving devotion, seeing the flute not merely as music but as a call to the soul. Hand-painted using the centuries-old Pattachitra tradition, this artwork celebrates the eternal bond between Krishna and his devotees through exquisite craftsmanship and sacred storytelling.",
    dimensions: "23in x 17in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: venugopalaLilaImg,
    galleryImageUrls: [venugopalaLilaImg],
  },
  {
    id: "p27b",
    theme: "Krishna",
    slug: "chandrika-venugopala-lila",
    title: "Chandrikā Veṇugopāla Līlā",
    price: 15999,
    variantGroup: "venugopala-lila",
    variantLabel: "Chandrika",
    description:
      "A captivating Pattachitra portraying Veṇugopāla (Krishna, the Divine Flute Player) amidst the tranquil beauty of moonlit Vṛndāvana. Beneath flowering trees and a starlit sky, Radha and the Gopis are drawn to the enchanting melody of his flute, while lotus-filled waters and graceful swans complete this serene nocturnal scene.",
    story:
      "As night descends upon Vṛndāvana, the gentle notes of Krishna's flute fill the fragrant groves with divine melody. Radha and the Gopis gather beneath flowering trees, their hearts captivated by Veṇugopāla's presence. Under the glow of the moon and the quiet stars, the forest transforms into a sacred realm where love, devotion, and eternal harmony become one.",
    dimensions: "23in x 17in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: chandrikaVenugopalaLilaImg,
    galleryImageUrls: [chandrikaVenugopalaLilaImg],
  },
  {
    id: "p30",
    theme: "Durga",
    slug: "mahishasuramardini",
    title: "Mahishāsuramardinī",
    price: 2699,
    variantGroup: "mahishasuramardini",
    variantLabel: "Colour",
    description:
      "A handcrafted Odisha Pattachitra portraying Mahishāsuramardinī Durgā, the fierce embodiment of divine feminine power, triumphing over the buffalo demon Mahishāsura. Adorned with celestial weapons and accompanied by her lion, the composition symbolises courage, righteousness, and the victory of good over evil.",
    story:
      "According to the Devī Māhātmya, the demon Mahishāsura became invincible after receiving a boon that no man or god could defeat him. In response, the combined divine energies of the gods manifested as Goddess Durga, who was armed with their celestial weapons and rode into battle upon her lion. After a fierce struggle, she defeated Mahishāsura, restoring peace and cosmic balance. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours the enduring power of Śakti, celebrating strength, protection, and the ultimate triumph of righteousness.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: mahishasuramardiniImg,
    galleryImageUrls: [mahishasuramardiniImg],
  },
  {
    id: "p29b",
    theme: "Durga",
    slug: "mahishasuramardini-teal",
    title: "Mahishāsuramardinī",
    price: 2699,
    variantGroup: "mahishasuramardini",
    variantLabel: "Teal",
    description:
      "A handcrafted Odisha Pattachitra portraying Mahishāsuramardinī Durgā, the fierce embodiment of divine feminine power, triumphing over the buffalo demon Mahishāsura. Adorned with celestial weapons and accompanied by her lion, the composition symbolises courage, righteousness, and the victory of good over evil.",
    story:
      "According to the Devī Māhātmya, the demon Mahishāsura became invincible after receiving a boon that no man or god could defeat him. In response, the combined divine energies of the gods manifested as Goddess Durga, who was armed with their celestial weapons and rode into battle upon her lion. After a fierce struggle, she defeated Mahishāsura, restoring peace and cosmic balance. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours the enduring power of Śakti, celebrating strength, protection, and the ultimate triumph of righteousness.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: mahishasuramardiniTealImg,
    galleryImageUrls: [mahishasuramardiniTealImg],
  },
  {
    id: "p31",
    theme: "Saraswati",
    slug: "vinapani-saraswati",
    title: "Vīṇāpāṇi Sarasvatī",
    price: 2399,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Sarasvatī, the goddess of wisdom, learning, music, and the arts. Holding the veena, a sacred manuscript, and a rosary, she stands beside her graceful swan, symbolising purity, discernment, and the pursuit of knowledge through Odisha's timeless Pattachitra tradition.",
    story:
      "Revered as the Goddess of Knowledge, Saraswati inspires wisdom, creativity, music, and eloquence. Her veena represents the harmony of knowledge and art, the manuscript signifies learning and sacred wisdom, while the rosary reflects meditation and spiritual insight. Her companion, the Haṃsa (swan), symbolises the ability to distinguish truth from illusion. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork celebrates the eternal pursuit of knowledge and the refinement of mind and spirit.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: vinapaniSaraswatiImg,
    galleryImageUrls: [vinapaniSaraswatiImg],
  },
  {
    id: "p32",
    theme: "Saraswati",
    slug: "shri-saraswati",
    title: "Śrī Sarasvatī",
    price: 2399,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Sarasvatī, the goddess of wisdom, learning, music, and the arts. Holding the veena, rosary, and sacred scriptures, she stands beside her swan, embodying knowledge, creativity, and spiritual enlightenment through the timeless artistry of Odisha's Pattachitra tradition.",
    story:
      "Revered as the eternal source of knowledge and the arts, Śrī Sarasvatī inspires learning, wisdom, music, and eloquence. The veena symbolises the harmony of intellect and creativity, the sacred text represents the pursuit of knowledge, while the rosary reflects meditation and inner wisdom. Her faithful companion, the Haṃsa (swan), signifies purity and the discernment to distinguish truth from illusion. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork celebrates the enduring values of education, artistic expression, and spiritual growth.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriSaraswatiImg,
    galleryImageUrls: [shriSaraswatiImg],
  },
  {
    id: "p33",
    theme: "Garuda",
    slug: "vishnu-vahana-garuda",
    title: "Viṣṇu Vāhana Garuḍa",
    price: 2399,
    description:
      "A handcrafted Odisha Pattachitra portraying Garuḍa, the celestial eagle and devoted mount of Lord Vishnu, shown with folded hands in Anjali Mudrā. His elegant wings and serene posture embody humility, devotion, and the timeless artistry of Odisha's Pattachitra tradition.",
    story:
      "In Hindu tradition, Garuḍa is revered as the mighty king of birds and the eternal companion of Lord Vishnu. Celebrated for his strength, courage, and steadfast devotion, he is often depicted in prayer, ready to serve the Lord with unwavering loyalty. Hand-painted using Odisha's centuries-old Pattachitra technique, this artwork honours Garuḍa as a symbol of faith, protection, and selfless service, preserving one of India's enduring devotional traditions.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: garudaImg,
    galleryImageUrls: [garudaImg],
  },
  {
    id: "p35",
    theme: "Krishna",
    slug: "radha-madhava-seva",
    title: "Rādhā Mādhava Sevā",
    price: 24999,
    description:
      "A handcrafted Odisha Pattachitra portraying Rādhā and Krishna in a secluded Vṛndāvana grove, attended by devoted sakhis bearing ceremonial chāmaras and lotus flowers. Framed by flowering trees, lotus-filled waters, and intricate ornamental borders, the composition radiates intimacy, grace, and the timeless beauty of divine love.",
    story:
      "Set within the sacred kuñjas (flowering groves) of Vṛndāvana, this artwork captures a serene moment as the sakhis lovingly serve Rādhā and Krishna with fans and lotus blossoms. Their attentive service expresses the highest form of bhakti, where every gesture becomes an offering of love and devotion. Hand-painted using Odisha's centuries-old Pattachitra tradition, the composition preserves the elegance of sacred storytelling while celebrating the eternal bond between the Divine Couple and their devoted companions.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: radhaMadhavaSevaImg,
    galleryImageUrls: [radhaMadhavaSevaImg],
  },
  {
    id: "p36",
    theme: "Rama",
    slug: "rama-bhakta-hanuman",
    title: "Rāma Bhakta Hanumān",
    price: 2199,
    variantGroup: "rama-bhakta-hanuman",
    variantLabel: "Sapphire",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Rāma and Sītā, accompanied by the ever-devoted Hanumān. Set within an ornate architectural arch, the composition combines intricate monochrome detailing with a deep sapphire backdrop, capturing the serenity, devotion, and timeless grandeur of the Rāmāyaṇa.",
    story:
      "Following Lord Rāma's triumph over Rāvaṇa and the restoration of righteousness, Hanumān remained forever at the feet of Rāma and Sītā, offering unwavering devotion and selfless service. This composition celebrates the eternal bond between the Divine Couple and their greatest devotee, where love, humility, and faith stand above all else. Hand-painted using Odisha's centuries-old Pattachitra tradition, every intricate line preserves the sacred storytelling and enduring craftsmanship of this revered art form.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: ramaBhaktaHanumanImg,
    galleryImageUrls: [ramaBhaktaHanumanImg],
  },
  {
    id: "p56",
    theme: "Rama",
    slug: "rama-bhakta-hanuman-crimson",
    title: "Rāma Bhakta Hanumān",
    price: 2199,
    variantGroup: "rama-bhakta-hanuman",
    variantLabel: "Crimson",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Rāma and Sītā, accompanied by the ever-devoted Hanumān kneeling at their feet. Set within an ornate architectural arch and a checkered sacred floor, the composition combines intricate monochrome detailing with a striking crimson backdrop, capturing the serenity, devotion, and timeless grandeur of the Rāmāyaṇa.",
    story:
      "Following Lord Rāma's triumph over Rāvaṇa and the restoration of righteousness, Hanumān remained forever at the feet of Rāma and Sītā, offering unwavering devotion and selfless service. This composition celebrates the eternal bond between the Divine Couple and their greatest devotee, where love, humility, and faith stand above all else. Hand-painted using Odisha's centuries-old Pattachitra tradition, every intricate line preserves the sacred storytelling and enduring craftsmanship of this revered art form.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: ramaBhaktaHanumanCrimsonImg,
    galleryImageUrls: [ramaBhaktaHanumanCrimsonImg],
  },
  {
    id: "p69",
    theme: "Rama",
    slug: "rama-bhakta-hanuman-golden",
    title: "Rāma Bhakta Hanumān",
    price: 2199,
    variantGroup: "rama-bhakta-hanuman",
    variantLabel: "Golden",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Rāma and Sītā, accompanied by the ever-devoted Hanumān kneeling at their feet. Set within an ornate architectural arch and a checkered sacred floor, the composition combines intricate linework with warm golden ochre tones, capturing the serenity, devotion, and timeless grandeur of the Rāmāyaṇa.",
    story:
      "Following Lord Rāma's triumph over Rāvaṇa and the restoration of righteousness, Hanumān remained forever at the feet of Rāma and Sītā, offering unwavering devotion and selfless service. This composition celebrates the eternal bond between the Divine Couple and their greatest devotee, where love, humility, and faith stand above all else. Hand-painted using Odisha's centuries-old Pattachitra tradition, every intricate line preserves the sacred storytelling and enduring craftsmanship of this revered art form.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: ramaBhaktaHanumanGoldenImg,
    galleryImageUrls: [ramaBhaktaHanumanGoldenImg],
  },
  {
    id: "p37",
    theme: "Krishna",
    slug: "venugopala-vrindavana",
    title: "Veṇugopāla Vṛndāvana",
    price: 2399,
    variantGroup: "venugopala-vrindavana",
    variantLabel: "Natural",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Krishna playing his divine flute amidst the Gopikās in Vṛndāvana. Surrounded by flowering trees, lotus blossoms, and graceful companions, the composition beautifully captures the enchanting melody, devotion, and timeless charm of Krishna's sacred pastimes.",
    story:
      "The sweet melody of Krishna's veṇu (flute) is said to draw every heart towards the Divine. Hearing its celestial notes, the Gopikās leave behind all worldly distractions to gather in loving devotion around him. This timeless Vṛndāvana pastime symbolises the soul's longing for union with the Divine, where love transcends all boundaries. Hand-painted using Odisha's centuries-old Pattachitra tradition, the artwork preserves this cherished episode with intricate detail, vibrant storytelling, and enduring craftsmanship.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: venugopalaVrindavanaImg,
    galleryImageUrls: [venugopalaVrindavanaImg],
  },
  {
    id: "p37b",
    theme: "Krishna",
    slug: "venugopala-vrindavana-crimson",
    title: "Veṇugopāla Vṛndāvana",
    price: 2399,
    variantGroup: "venugopala-vrindavana",
    variantLabel: "Crimson",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Krishna playing his divine flute amidst the Gopikās in Vṛndāvana, set against a striking crimson backdrop. Surrounded by flowering trees, lotus blossoms, and graceful companions, the composition beautifully captures the enchanting melody, devotion, and timeless charm of Krishna's sacred pastimes.",
    story:
      "The sweet melody of Krishna's veṇu (flute) is said to draw every heart towards the Divine. Hearing its celestial notes, the Gopikās leave behind all worldly distractions to gather in loving devotion around him. This timeless Vṛndāvana pastime symbolises the soul's longing for union with the Divine, where love transcends all boundaries. Hand-painted using Odisha's centuries-old Pattachitra tradition, the artwork preserves this cherished episode with intricate detail, vibrant storytelling, and enduring craftsmanship.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: venugopalaVrindavanaCrimsonImg,
    galleryImageUrls: [venugopalaVrindavanaCrimsonImg],
  },
  {
    id: "p52",
    theme: "Ganesha",
    slug: "natya-ganapati-crimson",
    giftingCollection: "natya-ganapati",
    imageRotation: 90 as const,
    title: "Natya Ganapati",
    price: 2399,
    variantGroup: "natya-ganapati-siddhi",
    variantLabel: "Crimson",
    description:
      "A handcrafted Odisha Pattachitra portraying Natya Gaṇapati, the graceful one-legged dancing form of Lord Gaṇeśa, seated with his faithful mouse companion. Rich monochrome detailing set against a striking crimson backdrop highlights his divine attributes, serene expression, and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "Lord Gaṇeśa is revered as the remover of obstacles, patron of wisdom, and guardian of new beginnings. Depicted holding his sacred attributes while bestowing blessings, he inspires intellect, prosperity, and success in every endeavour. His loyal companion, the mūṣaka (mouse), symbolises humility and the mastery of worldly desires. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours Gaṇeśa as the eternal source of auspiciousness, knowledge, and divine guidance.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: natyaGanapatiCrimsonImg,
    galleryImageUrls: [natyaGanapatiCrimsonImg],
  },
  {
    id: "p51",
    theme: "Ganesha",
    slug: "natya-ganapati-pink",
    giftingCollection: "natya-ganapati",
    title: "Natya Ganapati",
    price: 2399,
    variantGroup: "natya-ganapati-siddhi",
    variantLabel: "Pink",
    description:
      "A handcrafted Odisha Pattachitra portraying Natya Gaṇapati, the graceful one-legged dancing form of Lord Gaṇeśa, seated majestically upon a lotus pedestal with his faithful mouse companion at his feet. Rich monochrome detailing set against a striking pink backdrop highlights his divine attributes, serene expression, and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "Lord Gaṇeśa is revered as the remover of obstacles, patron of wisdom, and guardian of new beginnings. Depicted holding his sacred attributes while bestowing blessings, he inspires intellect, prosperity, and success in every endeavour. His loyal companion, the mūṣaka (mouse), symbolises humility and the mastery of worldly desires. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours Gaṇeśa as the eternal source of auspiciousness, knowledge, and divine guidance.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: natyaGanapatiPinkImg,
    galleryImageUrls: [natyaGanapatiPinkImg],
  },
  {
    id: "p38",
    theme: "Vishnu",
    slug: "shri-mahavishnu",
    title: "Śrī Mahāviṣṇu",
    price: 1999,
    variantGroup: "shri-mahavishnu",
    variantLabel: "Natural",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Mahāviṣṇu, standing gracefully upon a blooming lotus above tranquil waters. Holding the conch, discus, lotus, and mace, the composition is enriched with vibrant natural colours, intricate ornamentation, and delicate lotus motifs, reflecting the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "Lord Viṣṇu, the Preserver of the universe, sustains cosmic balance and descends to Earth whenever righteousness is threatened. His Sudarśana Chakra represents divine justice, the Śaṅkha proclaims the eternal sound of creation, the Padma symbolises purity and spiritual awakening, while the Gadā embodies strength and protection. Standing upon the lotus above the cosmic waters, he signifies stability amidst the ever-changing world. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours the eternal guardian of dharma, preserving both sacred symbolism and exceptional craftsmanship.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriMahavishnuImg,
    galleryImageUrls: [shriMahavishnuImg],
  },
  {
    id: "p57",
    theme: "Vishnu",
    slug: "shri-mahavishnu-crimson",
    title: "Śrī Mahāviṣṇu",
    price: 1999,
    variantGroup: "shri-mahavishnu",
    variantLabel: "Crimson",
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Mahāviṣṇu, standing gracefully upon a blooming lotus above tranquil waters. Holding the conch, discus, lotus, and mace, the composition is rendered in a refined monochrome palette set against a deep crimson backdrop, highlighting intricate ornamentation and delicate lotus motifs. The artwork reflects the timeless elegance and devotional spirit of Odisha's celebrated Pattachitra tradition.",
    story:
      "Lord Viṣṇu, the Preserver of the universe, sustains cosmic balance and descends to Earth whenever righteousness is threatened. His Sudarśana Chakra represents divine justice, the Śaṅkha proclaims the eternal sound of creation, the Padma symbolises purity and spiritual awakening, while the Gadā embodies strength and protection. Standing upon the lotus above the cosmic waters, he signifies stability amidst the ever-changing world. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours the eternal guardian of dharma, preserving both sacred symbolism and exceptional craftsmanship.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriMahavishnuCrimsonImg,
    galleryImageUrls: [shriMahavishnuCrimsonImg],
  },
  {
    id: "p39",
    theme: "Lakshmi",
    slug: "shri-mahalakshmi",
    title: "Śrī Mahālakṣmī",
    price: 2099,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Mahālakṣmī standing upon a radiant lotus, holding sacred lotus blossoms that symbolise purity and prosperity. Set against a rich sapphire backdrop, the intricate monochrome detailing and graceful composition celebrate abundance, harmony, and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "Revered as the Goddess of Prosperity and Fortune, Śrī Mahālakṣmī emerged from the cosmic Samudra Manthana (Churning of the Ocean), seated upon a radiant lotus and blessing the world with abundance and auspiciousness. The lotus she holds signifies purity that rises above worldly attachments, while her serene presence embodies both material prosperity and spiritual fulfilment. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork honours the eternal bestower of wealth, grace, and divine blessings through meticulous craftsmanship and sacred storytelling.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriMahalakshmiImg,
    galleryImageUrls: [shriMahalakshmiImg],
  },
  {
    id: "p40",
    theme: "Krishna",
    slug: "hamsa-nauka-vihara",
    title: "Haṃsa Naukā Vihāra",
    price: 2799,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Krishna aboard an elegant swan-shaped boat with the Gopikās, gliding across tranquil waters. Delicate monochrome detailing against a rich crimson backdrop, together with the beautifully ornamented vessel, captures the serenity, devotion, and timeless charm of Krishna's Vṛndāvana pastimes.",
    story:
      "Among the cherished Vṛndāvana līlās, Krishna's boat excursions celebrate joy, companionship, and divine love. As the swan-shaped vessel drifts across the peaceful waters, Krishna and the Gopikās share music, laughter, and devotion, transforming an ordinary journey into a sacred experience. The haṃsa (swan), a symbol of purity and spiritual wisdom, enriches the scene with deeper meaning. Hand-painted using Odisha's centuries-old Pattachitra tradition, this artwork preserves the elegance of Krishna's playful pastimes through intricate craftsmanship and enduring devotional storytelling.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: hamsaNaukaViharaImg,
    galleryImageUrls: [hamsaNaukaViharaImg],
  },
  {
    id: "p41",
    theme: "Krishna",
    slug: "nisa-nikunja-vilasa",
    title: "Niśā Nikuñja Vilāsa",
    price: 17999,
    variantGroup: "nisa-nikunja-vilasa",
    variantLabel: "Blue",
    description:
      "A serene Pattachitra depicting Radha and Krishna beneath a moonlit forest canopy, where the melody of Krishna's flute, gentle swans, and tranquil wildlife evoke the timeless romance and quiet beauty of Vrindavan's sacred night.",
    story:
      "As night blankets Vrindavan in silence, Krishna enchants the forest with the music of his flute while Radha rests beside him in peaceful devotion. Beneath the glowing moon and sheltering trees, swans glide across the lotus-filled waters and woodland creatures gather in quiet harmony. The scene celebrates the eternal love of Radha and Krishna, where nature itself becomes a witness to their divine union and the stillness of a sacred night.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: nisaNikunjaVilasaImg,
    galleryImageUrls: [nisaNikunjaVilasaImg],
  },
  {
    id: "p42",
    theme: "Krishna",
    slug: "prabhata-nikunja-vilasa",
    title: "Prabhāta Nikuñja Vilāsa",
    price: 17999,
    description:
      "A graceful Pattachitra portraying Radha and Krishna in a tranquil Vrindavan grove at daybreak, where the soft glow of dawn, blooming lotuses, graceful swans, and gentle wildlife celebrate the serenity of divine love.",
    story:
      "As the first light of dawn awakens Vrindavan, Krishna's flute fills the grove with gentle melodies while Radha rests beside him in quiet devotion. Swans glide across the lotus-filled waters, deer graze peacefully nearby, and the forest comes alive beneath the golden glow of a new day. The painting captures a sacred moment where nature and divinity awaken together, celebrating love, harmony, and the eternal bond of Radha and Krishna.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: true, status: "Published",
    coverImageUrl: prabhataNikunjaVilasaImg,
    galleryImageUrls: [prabhataNikunjaVilasaImg],
  },
  {
    id: "p43",
    theme: "Krishna",
    slug: "garuda-vihara",
    title: "Garuḍa Vihāra",
    price: 17999,
    description:
      "An elegant Pattachitra portraying Radha and Krishna enthroned upon Garuḍa, soaring beneath a richly ornamented arch. Intricate monochrome detailing and graceful attendants evoke the majesty, protection, and divine splendor of Vaishnava tradition.",
    story:
      "Garuḍa, the celestial king of birds and eternal vehicle of Lord Vishnu, symbolizes strength, devotion, and the triumph of dharma. In this composition, Krishna appears with Radha upon Garuḍa, accompanied by attendants in a regal procession. The artwork celebrates the Lord's divine sovereignty and reminds devotees that unwavering faith carries one safely through every obstacle, just as Garuḍa bears the Divine across the heavens.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: garudaViharaImg,
    galleryImageUrls: [garudaViharaImg],
  },
  {
    id: "p44",
    theme: "Krishna",
    slug: "maha-rasa-lila",
    title: "Mahā Rāsa Līlā",
    price: 21999,
    description:
      "A vibrant Pattachitra depicting Krishna dancing amidst the Gopis beneath the moonlit groves of Vrindavan. Rich colors, graceful movements, and rhythmic symmetry capture the joy, devotion, and spiritual ecstasy of the sacred Rāsa Līlā.",
    story:
      "On the sacred autumn night of Śarad Pūrṇimā, Krishna enchanted the forests of Vrindavan with the melody of his flute, drawing the Gopis into the divine Rāsa Līlā. Manifesting beside each devotee, he transformed the dance into a celebration of unconditional love and spiritual union, teaching that sincere devotion dissolves all separation between the soul and the Divine.",
    dimensions: "20in x 10in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: mahaRasaLilaImg,
    galleryImageUrls: [mahaRasaLilaImg],
  },
  {
    id: "p45",
    theme: "Krishna",
    slug: "bala-krishna-lilavali",
    title: "Bāla Kṛṣṇa Līlāvalī",
    price: 35999,
    description:
      "An exquisite Pattachitra centered on Mother Yaśodā cradling the infant Krishna, encircled by finely detailed medallions portraying the beloved episodes of his childhood. The intricate narrative composition celebrates maternal love, divine playfulness, and the rich storytelling tradition of Odisha's Pattachitra art.",
    story:
      "From the joyous birth of Krishna in Gokula to his playful miracles and mischievous adventures, each surrounding medallion recounts a cherished episode from his early life. At the heart of the composition, Yaśodā lovingly holds the divine child, reminding devotees that the Supreme chose to experience the warmth of a mother's embrace. Together, the scenes weave a timeless narrative of love, protection, wonder, and the boundless grace of Bāla Krishna.",
    dimensions: "24in x 40in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: balaKrishnaLilavaliImg,
    galleryImageUrls: [balaKrishnaLilavaliImg],
  },
  {
    id: "p46",
    theme: "Krishna",
    slug: "vrindavana-vilasa",
    title: "Vṛndāvana Vilāsa",
    price: 21999,
    description:
      "A graceful Pattachitra portraying Krishna relaxing beneath the flowering trees of Vrindavan, surrounded by devoted Gopis bearing offerings. Rich jewel-toned colors, elegant foliage, and rhythmic composition capture the serenity, joy, and timeless charm of Krishna's pastoral pastimes.",
    story:
      "In the peaceful groves of Vrindavan, Krishna rests beneath a blossoming tree as the Gopis gather around him with music, devotion, and offerings of butter and curd. Drawn by the melody of his flute and the warmth of his presence, they rejoice in simple moments of divine companionship. The painting celebrates Vrindavan as a realm where every gathering becomes an expression of love, devotion, and eternal bliss.",
    dimensions: "20in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: vrindavanaVilasaImg,
    galleryImageUrls: [vrindavanaVilasaImg],
  },
  {
    id: "p47",
    theme: "Krishna",
    slug: "shringara-seva",
    title: "Śṛṅgāra Sevā",
    price: 15999,
    description:
      "A graceful Pattachitra portraying Radha and Krishna seated beneath the sacred Kadamba tree, lovingly attended by devoted Gopis. Framed by lotus-filled waters, flowering foliage, and intricate ornamental borders, the artwork celebrates divine companionship, selfless devotion, and the serene beauty of Vṛndāvana.",
    story:
      "After wandering through the groves of Vṛndāvana, Radha and Krishna pause beneath the shade of the sacred Kadamba tree. The Gopis gather around them with fans, water, and offerings, expressing their devotion through humble acts of loving service. In this quiet moment, every gesture becomes an offering of prema-bhakti, illustrating that the highest form of worship is not grandeur, but sincere love and selfless service to the Divine.",
    dimensions: "22in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shringaraSevaImg,
    galleryImageUrls: [shringaraSevaImg],
  },
  {
    id: "p48",
    theme: "Krishna",
    slug: "nisa-murali-rasa",
    title: "Niśā Muralī Rāsa",
    price: 24999,
    description:
      "A vibrant Pattachitra capturing Krishna dancing amidst the Gopis beneath the flowering groves of moonlit Vṛndāvana. Surrounded by music, graceful movement, and lotus-filled waters, the composition radiates the joy, devotion, and timeless beauty of the divine Rāsa.",
    story:
      "As the moon rises over Vṛndāvana, the enchanting melody of Krishna's flute draws the Gopis into a celebration of divine love. Beneath blossoming trees, music, dance, and devotion merge into the sacred Rāsa Līlā, where every graceful step becomes an expression of bhakti and every heart moves in harmony with the Divine. The lotus-filled waters and tranquil night bear witness to a timeless celebration of joy, unity, and eternal love.",
    dimensions: "22in x 15in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: nisaMuraliRasaImg,
    galleryImageUrls: [nisaMuraliRasaImg],
  },
  {
    id: "p49",
    theme: "Ganesha",
    slug: "ananda-tandava-ganapati",
    giftingCollection: "natya-ganapati",
    title: "Ānanda Tāṇḍava Gaṇapati",
    price: 1799,
    variantGroup: "ananda-tandava-ganapati",
    variantLabel: "Classic",
    description:
      "A captivating Pattachitra portraying Lord Ganesha in a graceful dancing posture, balancing effortlessly upon a lotus pedestal. Adorned with intricate ornaments and holding his divine attributes, the composition symbolizes wisdom in motion, joyous energy, and the harmonious rhythm that sustains the universe.",
    story:
      "Revered as Nṛtyeśvara, the Lord of Dance, Ganesha's rhythmic movement represents the union of wisdom, creativity, and auspicious beginnings. His dance dispels obstacles, awakens inner balance, and celebrates the eternal rhythm of life. Every graceful gesture reminds devotees that true success arises when knowledge, devotion, and joyful action move together in perfect harmony.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: anandaTandavaGanapatiImg,
    galleryImageUrls: [anandaTandavaGanapatiImg],
  },
  {
    id: "p49b",
    theme: "Ganesha",
    slug: "ananda-tandava-ganapati-maroon",
    giftingCollection: "natya-ganapati",
    title: "Ānanda Tāṇḍava Gaṇapati",
    price: 1799,
    variantGroup: "ananda-tandava-ganapati",
    variantLabel: "Maroon",
    description:
      "A captivating Pattachitra portraying Lord Ganesha in a graceful dancing posture, balancing effortlessly upon a lotus pedestal, rendered in fine ink linework against a deep Maroon backdrop.",
    story:
      "Revered as Nṛtyeśvara, the Lord of Dance, Ganesha's rhythmic movement represents the union of wisdom, creativity, and auspicious beginnings. His dance dispels obstacles, awakens inner balance, and celebrates the eternal rhythm of life. Every graceful gesture reminds devotees that true success arises when knowledge, devotion, and joyful action move together in perfect harmony.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: anandaTandavaGanapatiMaroonImg,
    galleryImageUrls: [anandaTandavaGanapatiMaroonImg],
  },
  {
    id: "p50",
    theme: "Ganesha",
    slug: "nartana-vinayaka-maroon",
    giftingCollection: "natya-ganapati",
    title: "Nartana Vināyaka",
    price: 1899,
    variantGroup: "nartana-vinayaka",
    variantLabel: "Maroon",
    description:
      "A beautifully detailed Pattachitra portraying Nartana Vināyaka, Lord Ganesha in an elegant dancing posture upon a lotus pedestal. Adorned with intricate ornaments and sacred symbols, the composition embodies joyous movement, divine wisdom, and the auspicious energy that dispels obstacles while inspiring creativity and inner harmony.",
    story:
      "As Nartana Vināyaka, Lord Ganesha dances with effortless grace, celebrating the rhythm that sustains creation. His raised foot signifies liberation from worldly obstacles, while his axe severs ignorance and attachment, and his blessing hand offers protection and success. More than a dance, this sacred movement reminds devotees that wisdom, courage, and devotion transform every challenge into an opportunity for new beginnings, making Ganesha the eternal harbinger of prosperity and joyful progress.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: nartanaVinayakaMaroonImg,
    galleryImageUrls: [nartanaVinayakaMaroonImg],
  },
  {
    id: "p50b",
    theme: "Ganesha",
    slug: "nartana-vinayaka-rust",
    giftingCollection: "natya-ganapati",
    title: "Nartana Vināyaka",
    price: 1899,
    variantGroup: "nartana-vinayaka",
    variantLabel: "Rust",
    description:
      "A beautifully detailed Pattachitra portraying Nartana Vināyaka, Lord Ganesha in an elegant dancing posture upon a lotus pedestal, set against a warm Rust backdrop. Adorned with intricate ornaments and sacred symbols, the composition embodies joyous movement, divine wisdom, and the auspicious energy that dispels obstacles while inspiring creativity and inner harmony.",
    story:
      "As Nartana Vināyaka, Lord Ganesha dances with effortless grace, celebrating the rhythm that sustains creation. His raised foot signifies liberation from worldly obstacles, while his axe severs ignorance and attachment, and his blessing hand offers protection and success. More than a dance, this sacred movement reminds devotees that wisdom, courage, and devotion transform every challenge into an opportunity for new beginnings, making Ganesha the eternal harbinger of prosperity and joyful progress.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: nartanaVinayakaRustImg,
    galleryImageUrls: [nartanaVinayakaRustImg],
  },
  {
    id: "p59",
    theme: "Jagannath",
    slug: "shri-jagannatha-triad",
    title: "Śrī Jagannātha Triad",
    price: 1599,
    variantGroup: "shri-jagannatha-triad",
    variantLabel: "Natural",
    description:
      "A handcrafted Odisha Pattachitra portraying the sacred triad of Śrī Jagannātha, Balabhadra, and Subhadrā in their iconic traditional form. Adorned with vibrant natural colours, intricate ornamentation, and ceremonial garlands, the composition beautifully reflects the spiritual grandeur of the Jagannātha tradition. The artwork embodies devotion, cultural heritage, and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "The sacred triad of Lord Jagannātha, Balabhadra, and Subhadrā has been worshipped in Puri for centuries as the heart of Odisha's spiritual heritage. Revered as the Lords of the Universe, they embody compassion, strength, and divine grace, drawing millions of devotees during the annual Ratha Yātrā, where the deities journey beyond the temple to bless all without distinction.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriJagannathaTriadImg,
    galleryImageUrls: [shriJagannathaTriadImg],
  },
  {
    id: "p60",
    theme: "Jagannath",
    slug: "shri-jagannatha-triad-crimson",
    title: "Śrī Jagannātha Triad",
    price: 1599,
    variantGroup: "shri-jagannatha-triad",
    variantLabel: "Crimson",
    description:
      "A handcrafted Odisha Pattachitra portraying the sacred triad of Śrī Jagannātha, Balabhadra, and Subhadrā in a refined monochrome palette set against a deep crimson backdrop. Intricate linework, traditional ornamentation, and the deities' iconic forms create a composition of striking simplicity and devotional depth. The artwork reflects the timeless elegance and spiritual heritage of Odisha's celebrated Pattachitra tradition.",
    story:
      "The sacred triad of Lord Jagannātha, Balabhadra, and Subhadrā has been worshipped in Puri for centuries as the heart of Odisha's spiritual heritage. Revered as the Lords of the Universe, they embody compassion, strength, and divine grace, drawing millions of devotees during the annual Ratha Yātrā, where the deities journey beyond the temple to bless all without distinction.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriJagannathaTriadCrimsonImg,
    galleryImageUrls: [shriJagannathaTriadCrimsonImg],
  },
  {
    id: "p61",
    theme: "Jagannath",
    slug: "shri-jagannatha-ratna-simhasana",
    title: "Śrī Jagannātha Ratna Siṁhāsana",
    price: 54000,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Jagannātha, Balabhadra, and Subhadrā within an intricately detailed temple sanctum. Rendered in a refined monochrome palette with selective natural colours set against a vibrant emerald-green backdrop, the composition highlights ornate architectural motifs and devotional elegance.",
    story:
      "Within the sanctum of the revered Jagannātha Temple at Puri, Lord Jagannātha, Lord Balabhadra, and Goddess Subhadrā reside upon the sacred Ratna Siṁhāsana (Jeweled Throne), the spiritual heart of one of India's holiest pilgrimage sites. The surrounding motifs depict celestial attendants and divine guardians, emphasizing that the sanctum is both a royal court and a cosmic abode. For devotees, this sacred vision represents the eternal presence of the Lords, whose compassionate gaze embraces all without distinction.",
    dimensions: "28in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriJagannathaRatnaSimhasanaImg,
    galleryImageUrls: [shriJagannathaRatnaSimhasanaImg],
  },
  {
    id: "p62",
    theme: "Jagannath",
    slug: "jagannatha-darshana-mandala",
    title: "Jagannātha Darśana Maṇḍala",
    price: 54000,
    description:
      "A handcrafted Odisha Pattachitra portraying the sacred manifestations of Lord Jagannātha surrounding the divine triad upon the Ratna Siṃhāsana. Executed in an intricate monochrome palette with selective natural colours against a deep ebony backdrop, the composition showcases exquisite temple architecture and finely detailed ornamental linework, reflecting the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "This composition celebrates the many sacred forms and appearances of Lord Jagannātha worshipped across rituals and festivals in the Jagannath tradition. At its heart, Jagannātha, Balabhadra, and Subhadrā are enthroned upon the Ratna Siṃhāsana, while surrounding panels depict the Lord in diverse devotional manifestations, symbolizing His eternal presence beyond a single form.",
    dimensions: "28in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: jagannathaDarshanaMandalaImg,
    galleryImageUrls: [jagannathaDarshanaMandalaImg],
  },
  {
    id: "p63",
    theme: "Krishna",
    slug: "dola-yatra-utsava",
    title: "Dolā Yātrā Utsava",
    price: 54000,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Kṛṣṇa and Rādhā amidst the vibrant celebrations of Dolā Yātrā. Set against a deep ebony backdrop beneath lush green trees, the composition is enriched with brilliant natural colours, joyous figures, and intricate ornamental detailing, reflecting the festive spirit and timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "Inspired by the sacred Dolā Yātrā (Holi) celebrations of Odisha, this painting depicts Śrī Kṛṣṇa and Rādhā surrounded by joyous gopīs in Vṛndāvana. Music, dance, flower petals, and coloured powders fill the air as devotees celebrate divine love, welcoming the arrival of spring through devotion and festivity.",
    dimensions: "28in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: dolaYatraUtsavaImg,
    galleryImageUrls: [dolaYatraUtsavaImg],
  },
  {
    id: "p64",
    theme: "Jagannath",
    slug: "shri-jagannatha-traya",
    title: "Śrī Jagannātha Traya (The Sacred Divine Triad)",
    price: 25000,
    description:
      "A handcrafted Odisha Pattachitra portraying the sacred triad of Lord Jagannātha, Balabhadra, and Subhadrā. Executed in an intricate monochrome palette against a deep ebony backdrop, the composition showcases exquisite ornamental detailing, celestial motifs, and refined linework, reflecting the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "This artwork depicts the revered triad of Lord Jagannātha, Lord Balabhadra, and Goddess Subhadrā, the principal deities of the Jagannath Temple in Puri. Worshipped together as the embodiment of divine compassion, strength, and auspiciousness, the trio symbolizes unity, protection, and the all-embracing nature of the Supreme.",
    dimensions: "23in x 17in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: shriJagannathaTrayaImg,
    galleryImageUrls: [shriJagannathaTrayaImg],
  },
  {
    id: "p65",
    theme: "Vishnu",
    slug: "nrsimha-jagannatha-mahaprabhava",
    title: "Nṛsiṃha–Jagannātha Mahāprabhāva",
    price: 25000,
    description:
      "A handcrafted Odisha Pattachitra portraying Lord Nṛsiṃha above Lord Jagannātha with Goddess Lakṣmī seated below. Set against a dramatic ebony backdrop encircled by radiant crimson flames, the composition is enriched with selective natural colours, intricate ornamentation, and exquisite linework, reflecting the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "This unique Pattachitra unites two revered manifestations of Lord Viṣṇu—Lord Nṛsiṃha, the fierce protector who destroyed the demon Hiraṇyakaśipu to save Prahlāda, and Lord Jagannātha, the compassionate Lord of the Universe. Seated below is Goddess Lakṣmī, symbolizing prosperity and divine grace. Together, they represent the harmony of power, protection, and benevolence within the Vaishnava tradition.",
    dimensions: "23in x 17in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: nrsimhaJagannathaImg,
    galleryImageUrls: [nrsimhaJagannathaImg],
  },
  {
    id: "p66",
    theme: "Saraswati",
    slug: "vinapani-sarasvati",
    title: "Vīṇāpāṇi Sarasvatī",
    price: 1799,
    description:
      "A handcrafted Odisha Pattachitra portraying Goddess Sarasvatī seated upon her sacred swan above tranquil lotus-filled waters. Rendered in luminous natural colours against a pristine ivory backdrop, the composition is adorned with intricate floral borders, delicate ornamentation, and refined linework, reflecting the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "Goddess Sarasvatī, the Hindu deity of wisdom, learning, music, and the arts, is depicted seated gracefully upon her celestial swan (Haṃsa), a symbol of discernment and purity. Holding the vīṇā, she represents the harmony of knowledge and creativity, while the blooming lotus-filled waters signify spiritual awakening and the flourishing of wisdom.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: vinapaniSarasvatiImg,
    galleryImageUrls: [vinapaniSarasvatiImg],
  },
  {
    id: "p67",
    theme: "Krishna",
    slug: "rasa-mandira-vilasa",
    title: "Rāsa Maṇḍira Vilāsa",
    price: 54000,
    description:
      "A handcrafted Odisha Pattachitra portraying Śrī Kṛṣṇa and Rādhā within an ornate pavilion surrounded by celebrating gopīs and tranquil lotus-filled waters. Rendered in a refined monochrome palette with radiant gold detailing against a deep sapphire-blue backdrop, the composition showcases intricate ornamentation and the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "This artwork portrays Śrī Kṛṣṇa and Rādhā enthroned within a beautifully adorned pavilion as the gopīs gather in music, dance, and devotion. The sacred celebration reflects the eternal joy of Rāsa Līlā, where every movement becomes an expression of divine love in the groves of Vṛndāvana.",
    dimensions: "22in x 44in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: rasaMandiraVilasaImg,
    galleryImageUrls: [rasaMandiraVilasaImg],
  },
  {
    id: "p68",
    theme: "Jagannath",
    slug: "ekaki-jagannatha",
    title: "Ekākī Jagannātha (The Solitary Lord Jagannātha)",
    price: 2199,
    description:
      "A handcrafted Odisha Pattachitra portraying Lord Jagannātha in His iconic standalone form upon an intricately detailed pedestal. Rendered in a refined monochrome palette against a warm ochre backdrop, the composition is enriched with ornate temple borders, delicate ornamentation, and exquisite linework, reflecting the timeless elegance of Odisha's celebrated Pattachitra tradition.",
    story:
      "This artwork portrays Lord Jagannātha in His singular, iconic form, standing upon a sacred pedestal as the compassionate Lord of the Universe. Worshipped for His boundless grace and all-embracing presence, this solitary depiction invites a direct and personal experience of devotion.",
    dimensions: "10in x 20in",
    frameAvailable: true, inStock: true, sold: false, featured: false, status: "Published",
    coverImageUrl: ekakiJagannathaImg,
    galleryImageUrls: [ekakiJagannathaImg],
  },
];

export const paintings: Painting[] = seed.map((p) => ({
  ...p,
  supplierSlug: "odisha-pattachitra",
  artForm:      "Pattachitra",
  origin:       "Raghurajpuram, Odisha",
  palette:      ["#B95D3F", "#B6905A", "#EFE8DD"] as [string, string, string],
}));

export const getPaintingBySlug   = (slug: string) => paintings.find((p) => p.slug === slug);
export const getSupplierBySlug   = (slug: string) => suppliers.find((s) => s.slug === slug);
export const getRelatedPaintings = (current: Painting, count = 3) =>
  paintings.filter((p) => p.id !== current.id && p.artForm === current.artForm).slice(0, count);
export const getVariants = (current: Painting) =>
  current.variantGroup
    ? paintings.filter((p) => p.variantGroup === current.variantGroup).sort((a, b) => a.id.localeCompare(b.id))
    : [];
