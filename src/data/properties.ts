export interface Property {
  id: number;
  title: string;
  type: "rumah" | "tanah";
  price: number;
  location: string;
  kecamatan: string;
  landArea: number;
  buildingArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  longDescription: string;
  images: string[];
  seller: {
    name: string;
    phone: string;
    photo: string;
  };
  featured: boolean;
}

const sellers = [
  { name: "Budi Santoso", phone: "6285137387259", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Siti Rahayu", phone: "6285137387259", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Ahmad Wijaya", phone: "6285137387259", photo: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Dewi Lestari", phone: "6285137387259", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const houseImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=800&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
];

const landImages = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
  "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
  "https://images.unsplash.com/photo-1501004318855-cddc8a5d2b3a?w=800&q=80",
  "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800&q=80",
  "https://images.unsplash.com/photo-1461535080748-6de12a7b6821?w=800&q=80",
];

const kecamatanList = ["Ngaglik", "Depok", "Gamping", "Mlati", "Tempel", "Turi", "Seyegan", "Berbah"];

function getImages(type: "rumah" | "tanah", index: number): string[] {
  const imgs = type === "rumah" ? houseImages : landImages;
  const start = index % imgs.length;
  return [imgs[start], imgs[(start + 1) % imgs.length], imgs[(start + 2) % imgs.length], imgs[(start + 3) % imgs.length]];
}

export const properties: Property[] = [
  // 15 Rumah
  {
    id: 1, title: "Rumah Minimalis 2 Lantai Ngaglik", type: "rumah", price: 1250000000,
    location: "Jl. Kaliurang Km 12, Ngaglik", kecamatan: "Ngaglik", landArea: 150, buildingArea: 120,
    bedrooms: 4, bathrooms: 3, description: "Rumah minimalis modern di lokasi strategis dekat kampus UGM",
    longDescription: "Rumah minimalis modern 2 lantai yang terletak di kawasan strategis Kaliurang Km 12, Ngaglik. Dekat dengan kampus UGM, pusat perbelanjaan, dan fasilitas kesehatan. Desain arsitektur modern dengan pencahayaan alami yang optimal. Dilengkapi dengan carport untuk 2 mobil, taman depan dan belakang, serta sistem keamanan 24 jam. Lingkungan asri dan tenang, cocok untuk keluarga muda yang menginginkan hunian nyaman di kawasan Sleman.",
    images: getImages("rumah", 0), seller: sellers[0], featured: true,
  },
  {
    id: 2, title: "Rumah Cluster Premium Depok", type: "rumah", price: 1800000000,
    location: "Jl. Ambarukmo, Depok", kecamatan: "Depok", landArea: 200, buildingArea: 180,
    bedrooms: 5, bathrooms: 4, description: "Cluster premium dengan keamanan 24 jam dan fasilitas lengkap",
    longDescription: "Rumah cluster premium di kawasan elite Depok, Sleman. Hunian mewah dengan desain modern tropical yang menawan. Dilengkapi smart home system, kolam renang pribadi, dan taman landscape yang indah. Keamanan 24 jam dengan CCTV dan security gate. Akses mudah ke pusat kota Yogyakarta, bandara, dan berbagai fasilitas publik. Material bangunan berkualitas tinggi dengan finishing premium.",
    images: getImages("rumah", 1), seller: sellers[1], featured: true,
  },
  {
    id: 3, title: "Rumah Minimalis Gamping", type: "rumah", price: 650000000,
    location: "Jl. Wates Km 5, Gamping", kecamatan: "Gamping", landArea: 100, buildingArea: 72,
    bedrooms: 3, bathrooms: 2, description: "Rumah minimalis harga terjangkau dekat ring road barat",
    longDescription: "Rumah minimalis modern dengan harga terjangkau di kawasan Gamping. Lokasi strategis dekat ring road barat Yogyakarta, akses mudah ke pusat kota. Desain compact namun fungsional dengan 3 kamar tidur dan 2 kamar mandi. Cocok untuk keluarga kecil atau pasangan muda. Lingkungan aman dan nyaman dengan tetangga yang ramah. Dekat dengan sekolah, pasar, dan fasilitas umum lainnya.",
    images: getImages("rumah", 2), seller: sellers[2], featured: true,
  },
  {
    id: 4, title: "Rumah Hook 2 Lantai Mlati", type: "rumah", price: 975000000,
    location: "Jl. Magelang Km 8, Mlati", kecamatan: "Mlati", landArea: 180, buildingArea: 140,
    bedrooms: 4, bathrooms: 3, description: "Rumah hook dengan halaman luas dan garasi 2 mobil",
    longDescription: "Rumah hook 2 lantai yang terletak di posisi strategis kawasan Mlati. Dengan posisi hook, rumah ini mendapat pencahayaan dan sirkulasi udara yang optimal dari dua sisi. Halaman luas cocok untuk taman atau area bermain anak. Garasi mampu menampung 2 mobil. Interior luas dan modern dengan material berkualitas. Dekat dengan berbagai fasilitas seperti sekolah internasional, rumah sakit, dan pusat perbelanjaan.",
    images: getImages("rumah", 3), seller: sellers[3], featured: false,
  },
  {
    id: 5, title: "Rumah Modern Tempel", type: "rumah", price: 520000000,
    location: "Jl. Magelang Km 15, Tempel", kecamatan: "Tempel", landArea: 120, buildingArea: 80,
    bedrooms: 3, bathrooms: 2, description: "Rumah modern dengan view Merapi yang menakjubkan",
    longDescription: "Rumah modern dengan view Gunung Merapi yang spektakuler di kawasan Tempel. Udara sejuk dan lingkungan asri menjadi keunggulan utama properti ini. Desain minimalis modern dengan sentuhan natural. Halaman belakang menghadap langsung ke pemandangan alam yang indah. Cocok untuk Anda yang mencari ketenangan dan kedamaian jauh dari hiruk pikuk kota. Akses jalan sudah aspal dan mudah dijangkau.",
    images: getImages("rumah", 4), seller: sellers[0], featured: false,
  },
  {
    id: 6, title: "Rumah Mewah Turi", type: "rumah", price: 2000000000,
    location: "Jl. Turi-Pakem, Turi", kecamatan: "Turi", landArea: 300, buildingArea: 250,
    bedrooms: 6, bathrooms: 5, description: "Villa mewah dengan kolam renang dan taman tropis",
    longDescription: "Villa mewah bergaya tropical modern di kawasan sejuk Turi, Sleman. Dilengkapi kolam renang infinity, taman tropis seluas 150m2, dan paviliun tamu terpisah. Interior fully furnished dengan furnitur kayu jati premium. Sistem smart home terintegrasi dengan kontrol pencahayaan dan AC. View Gunung Merapi dari balkon utama. Lingkungan privat dan aman dengan pagar keliling dan pos satpam. Ideal untuk keluarga besar atau sebagai investasi properti premium.",
    images: getImages("rumah", 5), seller: sellers[1], featured: true,
  },
  {
    id: 7, title: "Rumah Baru Siap Huni Seyegan", type: "rumah", price: 480000000,
    location: "Jl. Godean Km 10, Seyegan", kecamatan: "Seyegan", landArea: 95, buildingArea: 65,
    bedrooms: 2, bathrooms: 1, description: "Rumah baru ready stock, langsung bisa ditempati",
    longDescription: "Rumah baru siap huni di kawasan berkembang Seyegan. Unit ready stock yang bisa langsung ditempati tanpa perlu menunggu proses pembangunan. Desain minimalis modern dengan layout efisien. Cocok untuk pasangan muda atau investasi properti. Harga terjangkau dengan kualitas bangunan yang tidak murahan. Lingkungan perumahan yang tertata rapi dengan akses jalan lebar. Dekat dengan pasar tradisional dan minimarket.",
    images: getImages("rumah", 6), seller: sellers[2], featured: false,
  },
  {
    id: 8, title: "Rumah Strategis Berbah", type: "rumah", price: 750000000,
    location: "Jl. Wonosari Km 7, Berbah", kecamatan: "Berbah", landArea: 140, buildingArea: 100,
    bedrooms: 3, bathrooms: 2, description: "Lokasi strategis dekat Bandara Adisucipto",
    longDescription: "Rumah strategis di kawasan Berbah, hanya 10 menit dari Bandara Adisucipto. Lokasi ideal untuk profesional yang sering bepergian. Desain modern dengan sentuhan Jawa kontemporer. Halaman cukup luas untuk taman dan carport. Akses jalan utama yang mudah dijangkau dari berbagai arah. Dekat dengan berbagai fasilitas umum termasuk rumah sakit, sekolah, dan pusat perbelanjaan. Lingkungan aman dan nyaman.",
    images: getImages("rumah", 7), seller: sellers[3], featured: false,
  },
  {
    id: 9, title: "Rumah Cantik di Ngaglik", type: "rumah", price: 890000000,
    location: "Jl. Palagan Km 9, Ngaglik", kecamatan: "Ngaglik", landArea: 160, buildingArea: 110,
    bedrooms: 3, bathrooms: 2, description: "Rumah cantik dengan desain scandinavian modern",
    longDescription: "Rumah bergaya scandinavian modern di kawasan premium Palagan, Ngaglik. Desain interior minimalis dengan dominasi warna putih dan aksen kayu natural. Pencahayaan alami melimpah melalui jendela-jendela besar. Taman kecil di belakang rumah untuk relaksasi. Dapur modern dengan kitchen set built-in. Lokasi dekat dengan berbagai kafe dan restoran populer di jalur Palagan. Lingkungan elit dan tenang.",
    images: getImages("rumah", 0), seller: sellers[0], featured: true,
  },
  {
    id: 10, title: "Rumah Type 45 Depok", type: "rumah", price: 425000000,
    location: "Jl. Solo Km 8, Depok", kecamatan: "Depok", landArea: 85, buildingArea: 45,
    bedrooms: 2, bathrooms: 1, description: "Rumah type 45 ideal untuk keluarga baru",
    longDescription: "Rumah type 45 yang ideal untuk pasangan muda atau keluarga baru di kawasan Depok. Harga terjangkau namun kualitas bangunan terjamin. Desain minimalis yang efisien dengan 2 kamar tidur dan 1 kamar mandi. Lokasi dekat dengan jalur utama Solo-Jogja sehingga akses transportasi sangat mudah. Lingkungan perumahan yang aman dengan keamanan lingkungan. Bisa KPR dengan berbagai bank ternama.",
    images: getImages("rumah", 1), seller: sellers[1], featured: false,
  },
  {
    id: 11, title: "Rumah Joglo Modern Gamping", type: "rumah", price: 1500000000,
    location: "Jl. Ring Road Barat, Gamping", kecamatan: "Gamping", landArea: 250, buildingArea: 200,
    bedrooms: 4, bathrooms: 3, description: "Rumah joglo modern perpaduan tradisional dan kontemporer",
    longDescription: "Rumah joglo modern yang memadukan arsitektur tradisional Jawa dengan desain kontemporer. Struktur joglo asli yang telah direstorasi dengan sentuhan modern. Ruang tamu luas dengan ceiling tinggi khas joglo. Taman Jawa dengan gazebo dan kolam ikan. Material kayu jati pilihan untuk seluruh rangka utama. Lokasi strategis di ring road barat dengan akses mudah ke semua penjuru kota. Cocok untuk pecinta budaya yang menginginkan hunian unik dan bernilai seni tinggi.",
    images: getImages("rumah", 2), seller: sellers[2], featured: true,
  },
  {
    id: 12, title: "Rumah Baru Cluster Mlati", type: "rumah", price: 700000000,
    location: "Jl. Sawitsari, Mlati", kecamatan: "Mlati", landArea: 110, buildingArea: 80,
    bedrooms: 3, bathrooms: 2, description: "Cluster baru dengan konsep green living",
    longDescription: "Perumahan cluster baru dengan konsep green living di kawasan Mlati. Setiap unit dilengkapi taman kecil dan area hijau komunal. Desain rumah modern dengan cross ventilation untuk sirkulasi udara alami. Material ramah lingkungan dan hemat energi. Fasilitas cluster meliputi taman bermain anak, jogging track, dan pos keamanan 24 jam. Lokasi strategis dekat UGM dan pusat kota Yogyakarta. Developer terpercaya dengan track record baik.",
    images: getImages("rumah", 3), seller: sellers[3], featured: false,
  },
  {
    id: 13, title: "Rumah Asri Tempel View Merapi", type: "rumah", price: 580000000,
    location: "Jl. Kaliurang Km 18, Tempel", kecamatan: "Tempel", landArea: 130, buildingArea: 85,
    bedrooms: 3, bathrooms: 2, description: "Hunian asri dengan pemandangan Gunung Merapi",
    longDescription: "Rumah asri dengan pemandangan langsung Gunung Merapi yang memukau. Udara pegunungan yang sejuk dan segar menjadi bonus utama tinggal di sini. Desain rumah yang harmonis dengan alam sekitar. Halaman luas dengan pohon buah dan taman bunga. Cocok untuk Anda yang ingin hidup tenang jauh dari polusi kota namun tetap mudah akses ke pusat kota Yogyakarta. Air bersih melimpah dari sumber mata air pegunungan.",
    images: getImages("rumah", 4), seller: sellers[0], featured: false,
  },
  {
    id: 14, title: "Rumah Furnished Depok Baru", type: "rumah", price: 950000000,
    location: "Jl. Laksda Adisucipto, Depok", kecamatan: "Depok", landArea: 145, buildingArea: 115,
    bedrooms: 4, bathrooms: 3, description: "Full furnished siap huni, tinggal bawa koper",
    longDescription: "Rumah fully furnished siap huni di kawasan premium Depok. Tinggal bawa koper dan langsung bisa menempati. Furnitur berkualitas dari brand ternama. Kitchen set lengkap dengan peralatan dapur. AC di setiap ruangan. Water heater untuk kamar mandi utama. Taman minimalis yang sudah tertata rapi. Lokasi sangat strategis di jalan utama Adisucipto. Dekat dengan mall, rumah sakit, dan kampus. Investasi yang sangat menguntungkan.",
    images: getImages("rumah", 5), seller: sellers[1], featured: false,
  },
  {
    id: 15, title: "Rumah Mewah Ngaglik Premium", type: "rumah", price: 1750000000,
    location: "Jl. Palagan Tentara Pelajar, Ngaglik", kecamatan: "Ngaglik", landArea: 220, buildingArea: 190,
    bedrooms: 5, bathrooms: 4, description: "Hunian premium di kawasan elite Palagan",
    longDescription: "Hunian premium di kawasan paling elite di Sleman, jalur Palagan Tentara Pelajar. Arsitektur modern kontemporer dengan finishing mewah. Lobby entrance yang megah, ruang keluarga luas, dan dapur modern. Master bedroom dengan walk-in closet dan ensuite bathroom. Rooftop garden dengan view 360 derajat. Sistem keamanan canggih dengan fingerprint access. Kolam renang semi-olympic. Carport untuk 3 mobil. Lingkungan eksklusif dengan privasi terjaga.",
    images: getImages("rumah", 6), seller: sellers[2], featured: false,
  },
  // 15 Tanah
  {
    id: 16, title: "Tanah Kavling Siap Bangun Ngaglik", type: "tanah", price: 450000000,
    location: "Jl. Kaliurang Km 10, Ngaglik", kecamatan: "Ngaglik", landArea: 200,
    description: "Kavling siap bangun di kawasan strategis Kaliurang",
    longDescription: "Tanah kavling siap bangun di lokasi premium Kaliurang Km 10. Lahan sudah rata dan siap untuk dibangun. Akses jalan cor blok selebar 5 meter. Listrik dan air PDAM sudah tersedia. Sertifikat SHM pecah per kavling. Cocok untuk investasi atau membangun rumah impian. Dekat dengan kampus UGM, rumah sakit, dan pusat perbelanjaan. Harga masih sangat terjangkau untuk kawasan ini yang terus berkembang pesat.",
    images: getImages("tanah", 0), seller: sellers[0], featured: true,
  },
  {
    id: 17, title: "Tanah Pekarangan Luas Depok", type: "tanah", price: 800000000,
    location: "Jl. Affandi, Depok", kecamatan: "Depok", landArea: 350,
    description: "Tanah pekarangan strategis dekat kampus terpadu UGM",
    longDescription: "Tanah pekarangan luas di lokasi sangat strategis kawasan Affandi, Depok. Cocok untuk pembangunan rumah tinggal mewah, kos-kosan premium, atau komersial. Dekat dengan kampus terpadu UGM dan berbagai universitas ternama di Yogyakarta. Akses jalan utama yang ramai namun lingkungan tetap tenang. Sertifikat SHM, lebar muka 15 meter. Kontur tanah datar dan siap bangun. Investasi emas di kawasan yang selalu berkembang.",
    images: getImages("tanah", 1), seller: sellers[1], featured: true,
  },
  {
    id: 18, title: "Kavling Murah Gamping", type: "tanah", price: 250000000,
    location: "Jl. Wates Km 7, Gamping", kecamatan: "Gamping", landArea: 150,
    description: "Kavling murah meriah dekat ring road barat",
    longDescription: "Kavling murah di kawasan Gamping yang berkembang pesat. Lokasi dekat ring road barat dengan akses transportasi yang sangat mudah. Lahan datar dan siap bangun. Sertifikat sudah SHM pecah. Listrik PLN tersedia, air sumur melimpah. Lingkungan perumahan yang sudah ramai dan aman. Harga sangat terjangkau untuk ukuran tanah seluas ini. Cocok untuk membangun rumah tinggal atau investasi jangka panjang. Potensi kenaikan harga yang signifikan.",
    images: getImages("tanah", 2), seller: sellers[2], featured: false,
  },
  {
    id: 19, title: "Tanah Strategis Mlati", type: "tanah", price: 550000000,
    location: "Jl. Magelang Km 6, Mlati", kecamatan: "Mlati", landArea: 250,
    description: "Tanah strategis di jalan utama Magelang",
    longDescription: "Tanah strategis di jalan utama Magelang Km 6, Mlati. Lokasi premium dengan frontage langsung ke jalan raya. Sangat cocok untuk usaha komersial, ruko, atau hunian. Lebar muka 12 meter dengan kedalaman 20 meter. Kontur datar dan sudah dipagar keliling. Sertifikat SHM asli. Dekat dengan berbagai fasilitas umum. Area yang terus berkembang dengan nilai properti yang terus meningkat setiap tahunnya.",
    images: getImages("tanah", 3), seller: sellers[3], featured: false,
  },
  {
    id: 20, title: "Tanah View Merapi Tempel", type: "tanah", price: 300000000,
    location: "Jl. Turi-Tempel, Tempel", kecamatan: "Tempel", landArea: 500,
    description: "Tanah luas dengan view Gunung Merapi spektakuler",
    longDescription: "Tanah luas dengan pemandangan Gunung Merapi yang spektakuler di kawasan Tempel. Lahan seluas 500m2 dengan kontur yang menarik untuk didesain menjadi villa atau rumah impian. Udara sejuk khas pegunungan. Air bersih dari sumber mata air alami. Akses jalan sudah aspal. Sertifikat SHM. Sangat cocok untuk membangun villa peristirahatan atau rumah tinggal bagi pecinta alam. Harga sangat kompetitif untuk luas tanah sebesar ini.",
    images: getImages("tanah", 4), seller: sellers[0], featured: true,
  },
  {
    id: 21, title: "Kavling Premium Turi", type: "tanah", price: 400000000,
    location: "Jl. Turi Km 2, Turi", kecamatan: "Turi", landArea: 300,
    description: "Kavling premium dengan udara sejuk pegunungan",
    longDescription: "Kavling premium di kawasan wisata Turi yang terkenal dengan udara sejuk dan pemandangan alam yang indah. Lahan seluas 300m2 dengan sertifikat SHM. Akses jalan paving block lebar 4 meter. Listrik dan air sudah tersedia. Lingkungan asri dengan kebun salak dan durian di sekitarnya. Cocok untuk villa, rumah tinggal, atau homestay. Potensi wisata yang tinggi menjadikan investasi di sini sangat menjanjikan.",
    images: getImages("tanah", 5), seller: sellers[1], featured: false,
  },
  {
    id: 22, title: "Tanah Kavling Seyegan", type: "tanah", price: 200000000,
    location: "Jl. Godean Km 12, Seyegan", kecamatan: "Seyegan", landArea: 180,
    description: "Kavling terjangkau di kawasan berkembang Seyegan",
    longDescription: "Tanah kavling dengan harga sangat terjangkau di kawasan Seyegan yang sedang berkembang pesat. Luas 180m2 dengan sertifikat SHM. Akses jalan aspal lebar 5 meter. Lingkungan perumahan yang sudah ramai. Dekat dengan pasar, sekolah, dan puskesmas. Air sumur jernih dan melimpah. Listrik PLN 2200 watt tersedia. Cocok untuk membangun rumah tinggal sendiri dengan budget terbatas. Cicilan bisa diatur langsung dengan pemilik.",
    images: getImages("tanah", 0), seller: sellers[2], featured: false,
  },
  {
    id: 23, title: "Tanah Luas Berbah", type: "tanah", price: 600000000,
    location: "Jl. Wonosari Km 5, Berbah", kecamatan: "Berbah", landArea: 400,
    description: "Tanah luas dekat Bandara Adisucipto Yogyakarta",
    longDescription: "Tanah luas 400m2 di kawasan strategis Berbah, hanya 5 menit dari Bandara Adisucipto. Lokasi premium yang sangat potensial untuk investasi jangka panjang. Kontur datar dan siap bangun. Sertifikat SHM asli dan lengkap. Lebar muka 20 meter. Cocok untuk pembangunan guest house, rumah mewah, atau properti komersial. Kawasan ini terus berkembang seiring dengan perkembangan infrastruktur dan fasilitas di sekitarnya.",
    images: getImages("tanah", 1), seller: sellers[3], featured: false,
  },
  {
    id: 24, title: "Kavling Exclusive Ngaglik", type: "tanah", price: 700000000,
    location: "Jl. Palagan Km 7, Ngaglik", kecamatan: "Ngaglik", landArea: 280,
    description: "Kavling exclusive di jalur premium Palagan",
    longDescription: "Kavling exclusive di jalur paling premium di Sleman, Palagan Tentara Pelajar. Lokasi yang sudah dikenal sebagai kawasan elite dengan berbagai properti mewah. Luas 280m2 dengan sertifikat SHM. Kontur tanah datar sempurna. Infrastruktur lengkap: jalan aspal lebar, drainase baik, listrik, dan PDAM. Lingkungan eksklusif dan aman. Sangat cocok untuk membangun hunian premium atau investasi properti high-end.",
    images: getImages("tanah", 2), seller: sellers[0], featured: false,
  },
  {
    id: 25, title: "Tanah Sawah Produktif Tempel", type: "tanah", price: 350000000,
    location: "Jl. Tempel-Pakem, Tempel", kecamatan: "Tempel", landArea: 600,
    description: "Tanah sawah produktif yang bisa dikonversi",
    longDescription: "Tanah sawah produktif seluas 600m2 di kawasan Tempel. Lahan subur yang masih aktif berproduksi. Bisa dikonversi menjadi lahan perumahan atau tetap dipertahankan sebagai lahan pertanian. Sertifikat SHM. Irigasi baik dari saluran irigasi teknis. View Gunung Merapi yang memukau. Akses jalan aspal. Harga per meter sangat terjangkau dibanding kavling siap bangun. Potensi kenaikan nilai yang tinggi seiring perkembangan wilayah.",
    images: getImages("tanah", 3), seller: sellers[1], featured: false,
  },
  {
    id: 26, title: "Kavling Perumahan Depok Baru", type: "tanah", price: 500000000,
    location: "Jl. Ring Road Utara, Depok", kecamatan: "Depok", landArea: 200,
    description: "Kavling di kawasan perumahan baru ring road utara",
    longDescription: "Kavling di kawasan perumahan baru yang sedang dikembangkan di ring road utara Depok. Infrastruktur modern dengan jalan lebar 8 meter, saluran drainase tertutup, dan taman bermain komunal. Sertifikat SHM pecah per kavling. Listrik dan PDAM sudah terpasang. Lokasi sangat strategis dekat dengan kampus, rumah sakit, dan pusat perbelanjaan. Developer terpercaya dengan izin lengkap. Bisa KPT (Kredit Pemilikan Tanah).",
    images: getImages("tanah", 4), seller: sellers[2], featured: false,
  },
  {
    id: 27, title: "Tanah Pinggir Jalan Gamping", type: "tanah", price: 450000000,
    location: "Jl. Wates Km 3, Gamping", kecamatan: "Gamping", landArea: 170,
    description: "Tanah pinggir jalan utama cocok untuk usaha",
    longDescription: "Tanah di pinggir jalan utama Wates Km 3, Gamping. Lokasi sangat strategis untuk usaha komersial seperti toko, ruko, atau tempat usaha lainnya. Frontage langsung ke jalan raya dengan lalu lintas tinggi. Lebar muka 10 meter. Sertifikat SHM. Kontur datar dan siap bangun. Dekat dengan perumahan besar dan pusat keramaian. Potensi bisnis yang sangat besar. Harga masih bisa nego untuk pembeli serius.",
    images: getImages("tanah", 5), seller: sellers[3], featured: false,
  },
  {
    id: 28, title: "Kavling Residensial Mlati", type: "tanah", price: 380000000,
    location: "Jl. Kyai Mojo, Mlati", kecamatan: "Mlati", landArea: 160,
    description: "Kavling residensial di lingkungan tenang Mlati",
    longDescription: "Kavling residensial di lingkungan tenang dan asri kawasan Mlati. Luas 160m2 dengan sertifikat SHM. Kontur datar dan sudah diurug. Akses jalan paving block lebar 5 meter. Listrik dan air sudah tersedia di lokasi. Lingkungan perumahan yang sudah established dengan keamanan lingkungan. Dekat dengan sekolah favorit dan fasilitas kesehatan. Harga sangat kompetitif untuk kawasan Mlati yang semakin berkembang.",
    images: getImages("tanah", 0), seller: sellers[0], featured: false,
  },
  {
    id: 29, title: "Tanah Luas Turi View Sawah", type: "tanah", price: 280000000,
    location: "Jl. Turi-Pakem, Turi", kecamatan: "Turi", landArea: 450,
    description: "Tanah luas dengan view persawahan yang indah",
    longDescription: "Tanah luas 450m2 dengan view persawahan hijau yang menenangkan di kawasan Turi. Udara sejuk pegunungan dan suasana pedesaan yang damai. Cocok untuk membangun villa, rumah peristirahatan, atau tempat retreat. Sertifikat SHM. Akses jalan aspal. Air bersih dari sumber mata air pegunungan. Listrik PLN tersedia. Harga sangat terjangkau untuk keindahan dan luas tanah yang ditawarkan. Potensi wisata dan homestay yang menjanjikan.",
    images: getImages("tanah", 1), seller: sellers[1], featured: false,
  },
  {
    id: 30, title: "Kavling Strategis Seyegan", type: "tanah", price: 320000000,
    location: "Jl. Godean Km 8, Seyegan", kecamatan: "Seyegan", landArea: 220,
    description: "Kavling strategis di poros jalan Godean",
    longDescription: "Kavling strategis di poros jalan utama Godean Km 8, Seyegan. Lokasi yang sangat potensial dengan perkembangan wilayah yang pesat. Luas 220m2 dengan sertifikat SHM. Lebar muka 11 meter. Kontur datar dan siap bangun. Infrastruktur lengkap dengan jalan aspal, drainase, listrik, dan air. Dekat dengan pasar, sekolah, dan puskesmas. Cocok untuk rumah tinggal atau investasi jangka panjang yang menjanjikan.",
    images: getImages("tanah", 2), seller: sellers[2], featured: false,
  },
];

export function formatPrice(price: number): string {
  return "Rp " + price.toLocaleString("id-ID");
}

export function getWhatsAppUrl(phone: string, propertyTitle: string): string {
  const message = encodeURIComponent(`Halo saya tertarik dengan ${propertyTitle} di SLM Properti`);
  return `https://wa.me/${phone}?text=${message}`;
}
