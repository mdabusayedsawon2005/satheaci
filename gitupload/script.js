/* ==========================================================================
   সাথে আছি (Sathe Achi) - Main Application JavaScript
   Comprehensive client-side store logic, animations and features
   ========================================================================== */

// ══════════════════════════════════════════════════
// SUPABASE INITIALIZATION & STORE STATE
// ══════════════════════════════════════════════════
const SUPABASE_URL = 'https://biteosolyhaoxwnzxdxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpdGVvc29seWhhb3h3bnp4ZHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTA3OTcsImV4cCI6MjA5NzQ2Njc5N30.jHjbpWxqqH83dLhGZ4MwYfk1pbnlov5jvP2x9Z0-S2g';

const supabaseClient = window.supabase && typeof window.supabase.createClient === 'function'
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : (window.supabaseClient || null);

// Expose client instance globally
window.supabaseClient = supabaseClient;
if (supabaseClient) {
    window.supabase = supabaseClient;
}

// ── COMPREHENSIVE BANGLADESH GEOGRAPHY (All 8 Divisions, 64 Districts) ──
const BD_GEOGRAPHY = {
  "Dhaka": {
    "Dhaka": ["Adabor","Badda","Bangshal","Cantonment","Chakbazar","Dhanmondi","Demra","Dohar","Gulshan","Hazaribagh","Jatrabari","Kadamtali","Kafrul","Kalabagan","Kamrangirchar","Keraniganj","Khilgaon","Khilkhet","Kotwali","Lalbagh","Mirpur","Mohammadpur","Motijheel","Nawabganj","Pallabi","Paltan","Ramna","Rayer Bazar","Sabujbagh","Shah Ali","Shahbag","Sher-e-Bangla Nagar","Shyampur","Sutrapur","Tejgaon","Tejgaon I/A","Turag","Uttara","Vatara","Wari"],
    "Gazipur": ["Gazipur Sadar","Kaliakair","Kaliganj","Sreepur","Kapasia","Tongi"],
    "Narsingdi": ["Narsingdi Sadar","Belabo","Monohardi","Palash","Raipura","Shibpur"],
    "Manikganj": ["Manikganj Sadar","Daulatpur","Ghior","Harirampur","Saturia","Shibalaya","Singair"],
    "Munshiganj": ["Munshiganj Sadar","Gazaria","Lohajang","Sirajdikhan","Sreenagar","Tongibari"],
    "Narayanganj": ["Narayanganj Sadar","Araihazar","Bandar","Rupganj","Sonargaon"],
    "Tangail": ["Tangail Sadar","Bhuapur","Basail","Delduar","Dhanbari","Ghatail","Gopalpur","Kalihati","Madhupur","Mirzapur","Nagarpur","Sakhipur"],
    "Kishoreganj": ["Kishoreganj Sadar","Austagram","Bajitpur","Bhairab","Hossainpur","Itna","Karimganj","Katiadi","Kuliarchar","Mithamain","Nikli","Pakundia","Tarail"],
    "Rajbari": ["Rajbari Sadar","Baliakandi","Goalanda","Kalukhali","Pangsha"],
    "Faridpur": ["Faridpur Sadar","Alfadanga","Bhanga","Boalmari","Charbhadrasan","Madhukhali","Nagarkanda","Sadarpur","Saltha"],
    "Gopalganj": ["Gopalganj Sadar","Kashiani","Kotalipara","Muksudpur","Tungipara"],
    "Madaripur": ["Madaripur Sadar","Kalkini","Rajoir","Shibchar"],
    "Shariatpur": ["Shariatpur Sadar","Bhedarganj","Damudya","Gosairhat","Naria","Zanjira"]
  },
  "Chattogram": {
    "Chattogram": ["Anwara","Banshkhali","Boalkhali","Chandgaon","Chandanaish","Double Mooring","Fatikchhari","Halishahar","Hathazari","Kotwali","Lohagara","Mirsharai","Panchlaish","Patiya","Patenga","Rangunia","Raozan","Sandwip","Satkania","Sitakunda"],
    "Cox's Bazar": ["Cox's Bazar Sadar","Chakaria","Kutubdia","Maheshkhali","Pekua","Ramu","Teknaf","Ukhiya"],
    "Cumilla": ["Cumilla Sadar","Barura","Brahmanpara","Burichang","Chandina","Chauddagram","Daudkandi","Debidwar","Homna","Laksam","Meghna","Muradnagar","Nangalkot","Titas"],
    "Brahmanbaria": ["Brahmanbaria Sadar","Akhaura","Ashuganj","Bancharampur","Bijoynagar","Kasba","Nabinagar","Nasirnagar","Sarail"],
    "Chandpur": ["Chandpur Sadar","Faridganj","Haimchar","Haziganj","Kachua","Matlab Uttar","Matlab Dakshin","Shahrasti"],
    "Lakshmipur": ["Lakshmipur Sadar","Kamalnagar","Ramganj","Ramgati","Raipur"],
    "Noakhali": ["Noakhali Sadar","Begumganj","Chatkhil","Companiganj","Hatiya","Kabirhat","Senbagh","Sonaimuri","Subarnachar"],
    "Feni": ["Feni Sadar","Chhagalnaiya","Daganbhuiyan","Fulgazi","Parshuram","Sonagazi"],
    "Khagrachari": ["Khagrachari Sadar","Dighinala","Lakshmichhari","Mahalchhari","Manikchhari","Matiranga","Panchhari","Ramgarh"],
    "Rangamati": ["Rangamati Sadar","Bagaichhari","Barkal","Belaichhari","Juraichhari","Kaptai","Kawkhali","Langadu","Naniarchar","Rajasthali"],
    "Bandarban": ["Bandarban Sadar","Alikadam","Lama","Naikhongchhari","Rowangchhari","Ruma","Thanchi"]
  },
  "Rajshahi": {
    "Rajshahi": ["Rajshahi Sadar","Bagha","Bagmara","Charghat","Durgapur","Godagari","Mohanpur","Paba","Puthia","Tanore"],
    "Bogura": ["Bogura Sadar","Adamdighi","Dhunat","Dhupchanchia","Gabtali","Kahaloo","Nandigram","Sariakandi","Shajahanpur","Sherpur","Shibganj","Sonatala"],
    "Naogaon": ["Naogaon Sadar","Atrai","Badalgachhi","Dhamoirhat","Manda","Mahadebpur","Mohadevpur","Niamatpur","Patnitala","Porsha","Raninagar","Sapahar"],
    "Natore": ["Natore Sadar","Bagatipara","Baraigram","Gurudaspur","Lalpur","Singra"],
    "Pabna": ["Pabna Sadar","Atgharia","Bera","Bhangura","Chatmohar","Faridpur","Ishwardi","Santhia","Sujanagar"],
    "Sirajganj": ["Sirajganj Sadar","Belkuchi","Chauhali","Kamarkhanda","Kazipur","Raiganj","Shahjadpur","Tarash","Ullahpara"],
    "Joypurhat": ["Joypurhat Sadar","Akkelpur","Kalai","Khetlal","Panchbibi"],
    "Chapai Nawabganj": ["Chapai Nawabganj Sadar","Bholahat","Gomastapur","Nachole","Shibganj"]
  },
  "Khulna": {
    "Khulna": ["Khulna Sadar","Batiaghata","Dacope","Daulatpur","Dighalia","Dumuria","Khalishpur","Khan Jahan Ali","Koyra","Paikgachha","Phultala","Rupsha","Sonadanga","Terokhada"],
    "Bagerhat": ["Bagerhat Sadar","Chitalmari","Fakirhat","Kachua","Mollahat","Mongla","Morrelganj","Rampal","Sarankhola"],
    "Chuadanga": ["Chuadanga Sadar","Alamdanga","Damurhuda","Jibannagar"],
    "Jashore": ["Jashore Sadar","Abhaynagar","Bagherpara","Chaugachha","Jhikargachha","Keshabpur","Manirampur","Sharsha"],
    "Jhenaidah": ["Jhenaidah Sadar","Harinakunda","Kaliganj","Kotchandpur","Maheshpur","Shailkupa"],
    "Kushtia": ["Kushtia Sadar","Bheramara","Daulatpur","Khoksa","Kumarkhali","Mirpur"],
    "Magura": ["Magura Sadar","Mohammadpur","Shalikha","Sreepur"],
    "Meherpur": ["Meherpur Sadar","Gangni","Mujibnagar"],
    "Narail": ["Narail Sadar","Kalia","Lohagara"],
    "Satkhira": ["Satkhira Sadar","Assasuni","Debhata","Kalaroa","Kaliganj","Shyamnagar","Tala"]
  },
  "Barishal": {
    "Barishal": ["Barishal Sadar","Agailjhara","Babuganj","Bakerganj","Banaripara","Gournadi","Hijla","Mehendiganj","Muladi","Wazirpur"],
    "Barguna": ["Barguna Sadar","Amtali","Bamna","Betagi","Patharghata","Taltali"],
    "Bhola": ["Bhola Sadar","Borhanuddin","Char Fasson","Daulatkhan","Lalmohan","Manpura","Tazumuddin"],
    "Jhalokati": ["Jhalokati Sadar","Kathalia","Nalchity","Rajapur"],
    "Patuakhali": ["Patuakhali Sadar","Bauphal","Dashmina","Dumki","Galachipa","Kalapara","Mirzaganj","Rangabali"],
    "Pirojpur": ["Pirojpur Sadar","Bhandaria","Kawkhali","Mathbaria","Nazirpur","Nesarabad","Zianagar"]
  },
  "Sylhet": {
    "Sylhet": ["Sylhet Sadar","Balaganj","Beanibazar","Bishwanath","Companiganj","Fenchuganj","Golapganj","Gowainghat","Jaintiapur","Kanaighat","Osmani Nagar","South Surma","Zakiganj"],
    "Moulvibazar": ["Moulvibazar Sadar","Barlekha","Juri","Kamalganj","Kulaura","Rajnagar","Sreemangal"],
    "Habiganj": ["Habiganj Sadar","Ajmiriganj","Bahubal","Baniyachang","Chunarughat","Lakhai","Madhabpur","Nabiganj","Shayestaganj"],
    "Sunamganj": ["Sunamganj Sadar","Bishwamvarpur","Chhatak","Derai","Dharampasha","Dowarabazar","Jagannathpur","Jamalganj","Sulla","Tahirpur"]
  },
  "Rangpur": {
    "Rangpur": ["Rangpur Sadar","Badarganj","Gangachara","Kaunia","Mithapukur","Pirgachha","Pirganj","Taraganj"],
    "Dinajpur": ["Dinajpur Sadar","Birampur","Birganj","Birol","Bochaganj","Chirirbandar","Fulbari","Ghoraghat","Hakimpur","Kaharole","Khansama","Nawabganj","Parbatipur"],
    "Gaibandha": ["Gaibandha Sadar","Fulchhari","Gobindaganj","Palashbari","Sadullapur","Saghata","Sundarganj"],
    "Kurigram": ["Kurigram Sadar","Bhurungamari","Char Rajibpur","Chilmari","Nageshwari","Phulbari","Rajibpur","Rajarhat","Rowmari","Ulipur"],
    "Lalmonirhat": ["Lalmonirhat Sadar","Aditmari","Hatibandha","Kaliganj","Patgram"],
    "Nilphamari": ["Nilphamari Sadar","Dimla","Domar","Jaldhaka","Kishoreganj","Saidpur"],
    "Panchagarh": ["Panchagarh Sadar","Atwari","Boda","Debiganj","Tetulia"],
    "Thakurgaon": ["Thakurgaon Sadar","Baliadangi","Haripur","Pirganj","Ranisankail"]
  },
  "Mymensingh": {
    "Mymensingh": ["Mymensingh Sadar","Bhaluka","Fulbaria","Gaffargaon","Gauripur","Haluaghat","Ishwarganj","Muktagachha","Nandail","Phulpur","Trishal"],
    "Jamalpur": ["Jamalpur Sadar","Bakshiganj","Dewanganj","Islampur","Madarganj","Melandaha","Sarishabari"],
    "Netrokona": ["Netrokona Sadar","Atpara","Barhatta","Durgapur","Kalmakanda","Kendua","Khaliajuri","Madan","Mohanganj","Purbadhala"],
    "Sherpur": ["Sherpur Sadar","Jhenaigati","Nakla","Nalitabari","Sreebardi"]
  }
};
window.BD_GEOGRAPHY = BD_GEOGRAPHY;


function populateAddressDistricts(division) {
    const districtSelect = document.getElementById('addrDistrictSelect');
    const thanaSelect = document.getElementById('addrThanaSelect');
    const thanaManual = document.getElementById('addrThanaManual');
    
    if (!districtSelect) return;
    districtSelect.innerHTML = '<option value="">Select District</option>';
    if (thanaSelect) thanaSelect.innerHTML = '<option value="">Select Area / Thana</option>';
    if (thanaManual) { thanaManual.style.display = 'none'; thanaManual.value = ''; }

    if (!division || !BD_GEOGRAPHY[division]) return;

    const districts = Object.keys(BD_GEOGRAPHY[division]);
    districts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        districtSelect.appendChild(opt);
    });
}

function populateAddressThanas(division, district) {
    const thanaSelect = document.getElementById('addrThanaSelect');
    const thanaManual = document.getElementById('addrThanaManual');
    
    if (!thanaSelect) return;
    thanaSelect.innerHTML = '<option value="">Select Area / Thana</option>';
    if (thanaManual) { thanaManual.style.display = 'none'; thanaManual.value = ''; }

    if (!division || !district || !BD_GEOGRAPHY[division] || !BD_GEOGRAPHY[division][district]) return;

    const thanas = BD_GEOGRAPHY[division][district];
    thanas.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        thanaSelect.appendChild(opt);
    });

    // Add manual typing option
    const otherOpt = document.createElement('option');
    otherOpt.value = 'Other';
    otherOpt.textContent = 'Other / Type manually';
    thanaSelect.appendChild(otherOpt);
}

function hasLocalAuthToken() {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
                const v = localStorage.getItem(k);
                if (v && v !== 'null') return true;
            }
        }
    } catch(e) {}
    return false;
}
window.hasLocalAuthToken = hasLocalAuthToken;

let cachedProfile = null;
try {
    const rawP = localStorage.getItem('sathe_achi_user_profile');
    if (rawP) cachedProfile = JSON.parse(rawP);
} catch(e) {}

let USER_STATE = {
    profile: cachedProfile || null,
    addresses: [],
    notifications: [],
    coupons: []
};
window.USER_STATE = USER_STATE;

// Instant Auth State Syncer (Zero millisecond flicker-free UI)
function updateHeaderProfileUI(profile) {
    const p = (profile !== undefined) ? profile : USER_STATE.profile;
    const btn = document.getElementById('saProfileBtn');
    const dropdown = document.getElementById('saProfileDropdown');
    
    if (p && (p.id || p.email || p.name)) {
        if (document.documentElement) {
            document.documentElement.classList.add('user-logged-in');
            document.documentElement.classList.remove('user-logged-out');
        }
        if (dropdown) {
            const nameEl = dropdown.querySelector('.sa-user-name');
            const emailEl = dropdown.querySelector('.sa-user-email');
            const loggedIn = dropdown.querySelector('.sa-dropdown-logged-in');
            const guest = dropdown.querySelector('.sa-dropdown-guest');
            if (nameEl) nameEl.textContent = p.name || 'User';
            if (emailEl) emailEl.textContent = p.email || '';
            if (loggedIn) loggedIn.style.display = 'block';
            if (guest) guest.style.display = 'none';
        }
        if (btn) {
            if (p.avatar && typeof p.avatar === 'string' && p.avatar.includes('<img')) {
                btn.innerHTML = p.avatar;
            } else if (p.name) {
                const initial = p.name.charAt(0).toUpperCase();
                btn.innerHTML = `<span class="sa-avatar-initial">${initial}</span>`;
            }
        }
    } else {
        if (document.documentElement) {
            document.documentElement.classList.add('user-logged-out');
            document.documentElement.classList.remove('user-logged-in');
        }
        if (dropdown) {
            const loggedIn = dropdown.querySelector('.sa-dropdown-logged-in');
            const guest = dropdown.querySelector('.sa-dropdown-guest');
            if (loggedIn) loggedIn.style.display = 'none';
            if (guest) guest.style.display = 'block';
        }
        if (btn) {
            btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        }
    }
}
window.updateHeaderProfileUI = updateHeaderProfileUI;

// Instantly apply class on <html> on script load
if (cachedProfile || hasLocalAuthToken()) {
    if (document.documentElement) {
        document.documentElement.classList.add('user-logged-in');
        document.documentElement.classList.remove('user-logged-out');
    }
} else {
    if (document.documentElement) {
        document.documentElement.classList.add('user-logged-out');
        document.documentElement.classList.remove('user-logged-in');
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateHeaderProfileUI());
} else {
    updateHeaderProfileUI();
}

window.authChecking = true;

// ══════════════════════════════════════════════════
// PERSISTENT SWR (Stale-While-Revalidate) CACHE ENGINE
// ══════════════════════════════════════════════════
function getLocalCache(key) {
    try {
        const raw = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return (parsed && parsed.data !== undefined) ? parsed.data : parsed;
    } catch (e) {
        return null;
    }
}
function setLocalCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
    } catch (e) {
        try {
            sessionStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }));
        } catch(err) {}
    }
}

// 5 Dedicated Luxury Category Hero Banners for Desktop & Mobile
const LUXURY_HERO_BANNERS = [
    {
        id: "banner-sale-90",
        title: "Celestial Grand Sale",
        highlight: "Up to 90% OFF",
        subtitle: "এক্সক্লুসিভ লাক্সারি কালেকশনে উপভোগ করুন সর্বোচ্চ ৯০% পর্যন্ত আকর্ষণীয় ছাড়। সীমিত সময়ের মেগা সেল!",
        image_url: "hero_sale_90.jpg",
        badge: "✨ MEGA CLEARANCE SALE",
        button_text: "অফার দেখুন",
        target_section: "flash_sale",
        link_url: "category.html?flash_sale=true",
        theme_gradient: "linear-gradient(135deg, #060b17 0%, #0c1a32 50%, #15243f 100%)",
        accent_color: "#d4af37"
    },
    {
        id: "banner-haute-fashion",
        title: "Royal Haute Couture",
        highlight: "Signature Fashion",
        subtitle: "রাজকীয় সিল্ক, প্রিমিয়াম ডিজাইনার পোশাক এবং ট্রেন্ডি ফ্যাশন কালেকশন আপনার ব্যক্তিত্বকে করবে অনন্য।",
        image_url: "hero_fashion.jpg",
        badge: "👑 ROYAL FASHION",
        button_text: "ফ্যাশন কালেকশন",
        target_section: "fashion",
        link_url: "category.html?slug=Fashion",
        theme_gradient: "linear-gradient(135deg, #0a0a1a 0%, #131230 50%, #201b44 100%)",
        accent_color: "#e0b0ff"
    },
    {
        id: "banner-smart-electronics",
        title: "Next-Gen Smart Tech",
        highlight: "Smart Showcase",
        subtitle: "স্লিক আল্ট্রাবুক, এএনসি হেডফোন ও লেটেস্ট স্মার্ট গ্যাজেটসের সেরা কালেকশন এখন হাতের নাগালে।",
        image_url: "hero_electronics.jpg",
        badge: "⚡ SMART ELECTRONICS",
        button_text: "স্মার্ট গ্যাজেট",
        target_section: "electronics",
        link_url: "category.html?slug=Electronics",
        theme_gradient: "linear-gradient(135deg, #050d18 0%, #0a1b2e 50%, #0e2b46 100%)",
        accent_color: "#38bdf8"
    },
    {
        id: "banner-flagship-mobiles",
        title: "Flagship Smartphones",
        highlight: "Titanium Edition",
        subtitle: "কার্ভড অ্যামোলেড ডিসপ্লে, স্টুডিও-গ্রেড ক্যামেরা ও টাইটানিয়াম ফ্ল্যাগশিপ স্মার্টফোনের চমৎকার সম্ভার।",
        image_url: "hero_mobiles.jpg",
        badge: "📱 FLAGSHIP MOBILES",
        button_text: "স্মার্টফোন দেখুন",
        target_section: "mobiles",
        link_url: "category.html?slug=Mobiles",
        theme_gradient: "linear-gradient(135deg, #06101e 0%, #0b1f3b 50%, #122f5a 100%)",
        accent_color: "#60a5fa"
    },
    {
        id: "banner-luxury-watches",
        title: "Celestial Chronographs",
        highlight: "Swiss Horology",
        subtitle: "প্রিসিশন সুইস মুভমেন্ট, স্যাফায়ার ক্রিস্টাল গ্লাস ও ১৮ ক্যারেট গোল্ড অ্যাকসেন্টের রয়্যাল হাতঘড়ি।",
        image_url: "hero_watches.jpg",
        badge: "⌚ TIMELESS LUXURY",
        button_text: "লাক্সারি ঘড়ি",
        target_section: "watches",
        link_url: "category.html?slug=Watches",
        theme_gradient: "linear-gradient(135deg, #100b08 0%, #22170f 50%, #302115 100%)",
        accent_color: "#cca24a"
    }
];
window.LUXURY_HERO_BANNERS = LUXURY_HERO_BANNERS;

// Immediately initialize in-memory state from persistent local cache (0ms instant render)
let PRODUCTS = getLocalCache('sa_products_cache') || [];
window.PRODUCTS = PRODUCTS;
let CATEGORIES = getLocalCache('sa_categories_cache') || [];
window.CATEGORIES = CATEGORIES;
let BANNERS = getLocalCache('sa_banners_cache') || [];
window.BANNERS = BANNERS;
window.siteSettings = {};
const _initCachedSettings = getLocalCache('sa_settings_cache');
if (_initCachedSettings && Array.isArray(_initCachedSettings)) {
    _initCachedSettings.forEach(s => { window.siteSettings[s.key] = s.value; });
}

// App State Management
let cart = [];
try { cart = JSON.parse(localStorage.getItem('sathe_achi_cart')) || []; } catch(e) { cart = []; }
let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem('sathe_achi_wishlist')) || []; } catch(e) { wishlist = []; }
let currentTheme = 'light';
try { currentTheme = localStorage.getItem('sathe_achi_theme') || 'light'; } catch(e) {}

// Async Data Fetching - High Speed Parallel Pipeline
async function fetchStoreData() {
    if (!supabaseClient) return;
    
    // Helper function to sync authenticated session cleanly
    async function syncUserSession(session) {
        if (!session || !session.user) return;
        try {
            const [profileRes, dbWishlistRes, dbCartRes] = await Promise.all([
                supabaseClient.from('profiles').select('*').eq('id', session.user.id).single().catch(e => ({ data: null })),
                supabaseClient.from('wishlist_items').select('product_id').eq('user_id', session.user.id).catch(e => ({ data: null })),
                supabaseClient.from('cart_items').select('*').eq('user_id', session.user.id).catch(e => ({ data: null }))
            ]);

            const profile = profileRes?.data || null;
            const googleAvatar = session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture;
            const googleName = profile?.full_name || session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email.split('@')[0] || 'User';

            USER_STATE.profile = {
                id: session.user.id,
                name: googleName,
                email: session.user.email,
                phone: profile?.phone || session.user.user_metadata?.phone || '',
                avatar: (profile?.avatar_url || googleAvatar) 
                    ? `<img src="${profile?.avatar_url || googleAvatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` 
                    : (googleName ? googleName.charAt(0).toUpperCase() : 'U')
            };

            localStorage.setItem('sathe_achi_user_profile', JSON.stringify(USER_STATE.profile));
            updateHeaderProfileUI();

            if (dbWishlistRes?.data) {
                wishlist = dbWishlistRes.data.map(w => w.product_id);
                updateWishlistUI();
            }

            // Clean OAuth hash from address bar smoothly
            if (window.location.hash && (window.location.hash.includes('access_token') || window.location.hash.includes('error'))) {
                try { window.history.replaceState(null, null, window.location.pathname + window.location.search); } catch(e){}
            }

            // Sync profile to DB if needed
            if (!profile) {
                supabaseClient.from('profiles').upsert({
                    id: session.user.id,
                    full_name: googleName,
                    avatar_url: googleAvatar || null
                }).catch(e => {});
            }
        } catch (err) {
            console.error("Session sync error:", err);
        }
    }
    window.syncUserSession = syncUserSession;

    // Register persistent auth state change listener (catches Google OAuth redirects seamlessly)
    if (!window._saAuthListenerAttached) {
        window._saAuthListenerAttached = true;
        supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
                await syncUserSession(session);
            } else if (event === 'SIGNED_OUT') {
                USER_STATE.profile = null;
                localStorage.removeItem('sathe_achi_user_profile');
                updateHeaderProfileUI(null);
            }
        });
    }

    // 1. Auth Pipeline
    const authPromise = (async () => {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                await syncUserSession(session);
            } else {
                // If OAuth redirect is actively completing, NEVER wipe cached profile
                const isOAuthRedirect = (window.location.hash && window.location.hash.includes('access_token')) || (window.location.search && window.location.search.includes('code='));
                if (!isOAuthRedirect && !hasLocalAuthToken()) {
                    USER_STATE.profile = null;
                    localStorage.removeItem('sathe_achi_user_profile');
                    updateHeaderProfileUI(null);
                }
            }
        } catch(err) {
            console.error("Auth init failed, proceeding as guest:", err);
        } finally {
            window.authChecking = false;
            updateHeaderProfileUI();
            document.dispatchEvent(new Event('authChecked'));
        }
    })();

    // 2. Main Store Catalog Parallel Pipeline (Point 2 & Point 4)
    const storePromise = (async () => {
        try {
            // Background revalidation: always fetch fresh updates quietly from Supabase
            const [catRes, banRes, setRes, prodRes, pmtRes] = await Promise.all([
                supabaseClient.from('categories').select('*').eq('is_active', true),
                supabaseClient.from('banners').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
                supabaseClient.from('site_settings').select('*'),
                supabaseClient.from('products').select('*').eq('status', 'active'),
                supabaseClient.from('payment_settings').select('*').order('sort_order', { ascending: true })
            ]);

            // Handle Categories
            if (catRes?.data) {
                CATEGORIES = catRes.data;
                window.CATEGORIES = CATEGORIES;
                setLocalCache('sa_categories_cache', CATEGORIES);
            }
            const catMap = {};
            (CATEGORIES || []).forEach(c => { catMap[c.id] = c; });

            // Handle Banners
            if (banRes?.data) {
                BANNERS = banRes.data;
                window.BANNERS = BANNERS;
                setLocalCache('sa_banners_cache', BANNERS);
            }

            // Handle Site Settings
            if (setRes?.data) {
                window.siteSettings = {};
                setRes.data.forEach(s => {
                    window.siteSettings[s.key] = s.value;
                });
                setLocalCache('sa_settings_cache', setRes.data);
            }

            // Handle Payment Settings
            if (pmtRes?.data) {
                window.paymentSettings = pmtRes.data;
                setLocalCache('sa_payment_settings_cache', pmtRes.data);
            }

            // Handle Products & Images
            const prodData = prodRes?.data || [];
            if (prodRes && prodRes.data !== undefined && prodRes.data !== null) {
                const productIds = prodData.map(p => p.id);
                let imgMap = {};
                if (productIds.length > 0) {
                    const { data: imgData } = await supabaseClient.from('product_images').select('product_id, image_url, sort_order').in('product_id', productIds);
                    (imgData || []).forEach(img => {
                        if (!imgMap[img.product_id]) imgMap[img.product_id] = [];
                        imgMap[img.product_id].push(img);
                    });
                }

                PRODUCTS = prodData.map(p => {
                    const imgs = (imgMap[p.id] || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
                    const cat = catMap[p.category_id];
                    return {
                        id: p.id,
                        title: p.name,
                        category: cat ? cat.name : 'General',
                        category_id: p.category_id,
                        originalPrice: p.price,
                        discountPrice: p.sale_price || p.price,
                        rating: p.rating || 5.0,
                        reviewsCount: p.reviews_count || 0,
                        image: imgs.length > 0 ? imgs[0].image_url : 'https://placehold.co/600x600?text=No+Image',
                        images: imgs.map(i => i.image_url),
                        isFlashSale: p.is_flash_sale,
                        isTrending: p.is_trending,
                        isNewArrival: p.is_new_arrival,
                        isBestSeller: p.is_best_seller,
                        featured: p.featured,
                        description: p.description,
                        brand: p.brand,
                        stock: p.stock,
                        sku: p.sku,
                        product_type: p.product_type
                    };
                });
                window.PRODUCTS = PRODUCTS;
                setLocalCache('sa_products_cache', PRODUCTS);
            }

            // Populate cart item details
            if (cart.length > 0 && PRODUCTS.length > 0) {
                cart.forEach(item => {
                    const prod = PRODUCTS.find(p => p.id === item.id);
                    if (prod) {
                        item.title = prod.title;
                        item.price = prod.discountPrice;
                        item.image = prod.image;
                        item.category = prod.category;
                    }
                });
                cart = cart.filter(item => item.title !== undefined);
                localStorage.setItem('sathe_achi_cart', JSON.stringify(cart));
                updateBadges();
            }
        } catch (err) {
            console.error("Error fetching store data:", err);
        }
    })();

    // Run Auth and Store pipelines concurrently
    await Promise.all([authPromise, storePromise]);
}

// Apply site settings dynamically to header, favicon, title, meta tag and events
function applyGlobalSiteSettings() {
    if (!window.siteSettings) return;

    // 1. Update Website Title
    const defaultTitle = window.siteSettings['seo_title'] || 'Sathe Achi | Premium Online Shopping';
    if (defaultTitle && document.title.includes('Premium Online Shopping')) {
        document.title = defaultTitle;
    } else if (defaultTitle && (document.title === 'Sathe Achi' || document.title === 'Shopping Cart' || document.title === 'Checkout')) {
        document.title = document.title + ' | ' + (window.siteSettings['site_name'] || 'Sathe Achi');
    }

    // 2. Update Website Logo (Only updates mobile app icon, sidebar and footer; keeps luxury desktop brand wordmark intact)
    const logoImgs = document.querySelectorAll('.sa-logo .sa-logo-mobile, .sa-sidebar-logo img, .pd-header img, .sa-footer-logo-img');
    if (window.siteSettings['site_logo_url']) {
        logoImgs.forEach(img => {
            img.src = window.siteSettings['site_logo_url'];
            img.style.filter = 'none';
        });
    }

    const logoTexts = document.querySelectorAll('.sa-logo-text');
    if (window.siteSettings['site_name']) {
        logoTexts.forEach(el => { el.textContent = window.siteSettings['site_name']; });
    }

    // 3. Update Favicon link
    let faviconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    if (window.siteSettings['site_favicon_url']) {
        if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            faviconLink.type = 'image/png';
            document.head.appendChild(faviconLink);
        }
        faviconLink.href = window.siteSettings['site_favicon_url'];
    }

    // 4. Update SEO Description and Keywords
    if (window.siteSettings['seo_desc']) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = window.siteSettings['seo_desc'];
    }
    if (window.siteSettings['seo_keywords']) {
        let metaKeys = document.querySelector('meta[name="keywords"]');
        if (!metaKeys) {
            metaKeys = document.createElement('meta');
            metaKeys.name = 'keywords';
            document.head.appendChild(metaKeys);
        }
        metaKeys.content = window.siteSettings['seo_keywords'];
    }

    // 5. Update Trust badges delivery thresholds
    const trustFreeDel = document.querySelector('.sa-trust-item .sa-ti-sub');
    if (trustFreeDel && window.siteSettings['shipping_free_threshold']) {
        const threshold = parseFloat(window.siteSettings['shipping_free_threshold']);
        if (threshold > 0) {
            trustFreeDel.textContent = `On orders over ৳${threshold.toLocaleString()}`;
        } else {
            trustFreeDel.textContent = `On all orders (No minimum)`;
        }
    }

    // 6. Hook Live Chat to WhatsApp
    const liveChatBtn = document.querySelector('.sa-live-chat');
    if (liveChatBtn) {
        liveChatBtn.onclick = () => {
            const wa = window.siteSettings['whatsapp'] || '';
            if (wa) {
                let waUrl = wa;
                if (!wa.startsWith('http')) {
                    const phone = wa.replace(/[^\d+]/g, '');
                    waUrl = `https://wa.me/${phone}`;
                }
                window.open(waUrl, '_blank');
            } else {
                const phone = window.siteSettings['contact_phone'] || window.siteSettings['support_phone'] || '';
                if (phone) window.open(`tel:${phone}`);
            }
        };
    }

    // Hook settings item Live Chat in account.html (if any)
    const settingsLiveChat = document.querySelector('.sa-settings-item[onclick*="Live Chat is offline"]');
    if (settingsLiveChat) {
        settingsLiveChat.setAttribute('onclick', 'event.preventDefault(); window.openWhatsAppSupport();');
    }

    // 7. Update Footer Dynamic Contact Info (Phone, Email, WhatsApp, Facebook, Address, Hours)
    const footerContact = document.getElementById('saFooterContact');
    if (footerContact) {
        const phone = window.siteSettings['contact_phone'] || window.siteSettings['support_phone'] || '';
        const email = window.siteSettings['contact_email'] || window.siteSettings['support_email'] || '';
        const wa = window.siteSettings['whatsapp'] || '';
        const fb = window.siteSettings['social_fb'] || '';
        const address = window.siteSettings['contact_address'] || '';
        const hours = window.siteSettings['business_hours'] || '';

        let contactHtml = '';
        if (phone) {
            contactHtml += `<div><a href="tel:${phone}" style="color:inherit; text-decoration:none; display:inline-flex; align-items:center; gap:8px;"><i class="fa-solid fa-phone" style="color:#d4af37; font-size:14px;"></i> ${phone}</a></div>`;
        }
        if (email) {
            contactHtml += `<div><a href="mailto:${email}" style="color:inherit; text-decoration:none; display:inline-flex; align-items:center; gap:8px;"><i class="fa-solid fa-envelope" style="color:#d4af37; font-size:14px;"></i> ${email}</a></div>`;
        }
        if (wa) {
            let waClean = wa.replace(/[^\d+]/g, '');
            let waNum = waClean.startsWith('88') ? waClean : (waClean.startsWith('0') ? `88${waClean}` : `880${waClean}`);
            let waUrl = wa.startsWith('http') ? wa : `https://wa.me/${waNum}`;
            contactHtml += `<div><a href="${waUrl}" target="_blank" rel="noopener" style="color:inherit; text-decoration:none; display:inline-flex; align-items:center; gap:8px;"><i class="fa-brands fa-whatsapp" style="color:#25D366; font-size:14px;"></i> WhatsApp: ${wa}</a></div>`;
        }
        if (fb) {
            contactHtml += `<div><a href="${fb}" target="_blank" rel="noopener" style="color:inherit; text-decoration:none; display:inline-flex; align-items:center; gap:8px;"><i class="fa-brands fa-facebook" style="color:#1877F2; font-size:14px;"></i> Facebook Page</a></div>`;
        }
        if (address) {
            contactHtml += `<div style="display:inline-flex; align-items:center; gap:8px; color:rgba(255,255,255,0.75); font-size:13px;"><i class="fa-solid fa-location-dot" style="color:#d4af37; font-size:14px;"></i> ${address}</div>`;
        }
        if (hours) {
            contactHtml += `<div style="display:inline-flex; align-items:center; gap:8px; color:rgba(255,255,255,0.75); font-size:13px;"><i class="fa-regular fa-clock" style="color:#d4af37; font-size:14px;"></i> ${hours}</div>`;
        }
        contactHtml += `
          <div style="margin-top:6px;">
            <a href="developer.html" class="sa-dev-badge-btn" style="display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.06)); border:1px solid rgba(212,175,55,0.45); padding:7px 14px; border-radius:99px; color:var(--sa-gold, #d4af37); text-decoration:none; font-size:12.5px; font-weight:600; transition:all 0.25s ease;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              Developer Profile: <span style="color:#fff; font-weight:700; letter-spacing:0.3px;">EX YOUSUF HUZAIFA</span>
            </a>
          </div>
        `;
        footerContact.innerHTML = contactHtml;
    }

    // 8. Update Footer Dynamic Social Links (Facebook, Instagram, YouTube, TikTok, WhatsApp, Telegram, Messenger)
    const footerSocial = document.getElementById('saFooterSocial');
    if (footerSocial) {
        let socialHtml = '';
        const fb = window.siteSettings['social_fb'];
        const wa = window.siteSettings['whatsapp'];
        const ig = window.siteSettings['social_ig'];
        const yt = window.siteSettings['social_yt'];
        const tiktok = window.siteSettings['social_tiktok'];
        const msg = window.siteSettings['social_messenger'];
        const tg = window.siteSettings['social_telegram'];

        if (fb) {
            socialHtml += `<a href="${fb}" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>`;
        }
        if (wa) {
            let waClean = wa.replace(/[^\d+]/g, '');
            let waNum = waClean.startsWith('88') ? waClean : (waClean.startsWith('0') ? `88${waClean}` : `880${waClean}`);
            let waUrl = wa.startsWith('http') ? wa : `https://wa.me/${waNum}`;
            socialHtml += `<a href="${waUrl}" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;
        }
        if (ig) {
            socialHtml += `<a href="${ig}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram"><i class="fa-brands fa-instagram"></i></a>`;
        }
        if (yt) {
            socialHtml += `<a href="${yt}" target="_blank" rel="noopener" aria-label="YouTube" title="YouTube"><i class="fa-brands fa-youtube"></i></a>`;
        }
        if (tiktok) {
            socialHtml += `<a href="${tiktok}" target="_blank" rel="noopener" aria-label="TikTok" title="TikTok"><i class="fa-brands fa-tiktok"></i></a>`;
        }
        if (msg) {
            socialHtml += `<a href="${msg}" target="_blank" rel="noopener" aria-label="Messenger" title="Messenger"><i class="fa-brands fa-facebook-messenger"></i></a>`;
        }
        if (tg) {
            socialHtml += `<a href="${tg}" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram"><i class="fa-brands fa-telegram"></i></a>`;
        }

        if (socialHtml) {
            footerSocial.innerHTML = socialHtml;
        }
    }

    // 9. Update Footer Payment Badges
    const footerPayBadges = document.getElementById('saFooterPayBadges');
    if (footerPayBadges) {
        const pmtCache = getLocalCache('sa_payment_settings_cache');
        if (pmtCache && pmtCache.length > 0) {
            footerPayBadges.innerHTML = pmtCache.filter(m => m.is_enabled !== false).map(m => `<span class="sa-pay-badge">${m.name}</span>`).join('');
        }
    }
}

// Global WhatsApp redirect helper
window.openWhatsAppSupport = function() {
    const wa = window.siteSettings?.['whatsapp'] || '';
    if (wa) {
        let waUrl = wa;
        if (!wa.startsWith('http')) {
            const phone = wa.replace(/[^\d+]/g, '');
            waUrl = `https://wa.me/${phone}`;
        }
        window.open(waUrl, '_blank');
    } else {
        const phone = window.siteSettings?.['contact_phone'] || '';
        if (phone) {
            window.open(`tel:${phone}`);
        } else {
            showToast('Support is currently unavailable.', 'error');
        }
    }
};

// Document Loaded Handler
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Enforce page auth guard immediately (synchronously shows the loader if restricted!)
    enforcePageAuthGuard();

    // 2. IMMEDIATE OPTIMISTIC RENDER (0ms from cache) - Prevents data disappearing on refresh!
    applyGlobalSiteSettings();
    setTheme(currentTheme);
    updateBadges();
    initCountdown();
    renderHeroBanners();
    if (typeof initRoyalButlerMascot === 'function') {
        initRoyalButlerMascot();
    }
    syncActiveCategoryNav();
    if (CATEGORIES.length > 0 || PRODUCTS.length > 0) {
        loadHomepageProducts();
    }
    initProductDetailsPage();
    initCartPage();
    initCheckoutPage();
    if (PRODUCTS.length > 0) {
        window.storeAlreadyLoaded = true;
        document.dispatchEvent(new Event('storeDataLoaded'));
    }

    // Initialize Header Scroll Effect
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
    }

    // Back to top indicator
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Register general event listeners
    registerGlobalEvents();

    // 3. Fetch fresh data in background/parallel from database
    await fetchStoreData();
    applyGlobalSiteSettings();
    updateBadges();

    // Hide Loader
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
    }

    // 4. Update UI seamlessly with latest fresh data
    loadHomepageProducts();
    renderHeroBanners();
    initProductDetailsPage();
    initCartPage();
    initCheckoutPage();
    
    // Dispatch event to notify inline scripts that fresh data is ready
    window.storeAlreadyLoaded = true;
    document.dispatchEvent(new Event('storeDataLoaded'));

    // Scroll to section if hash is in URL (from banner redirect)
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 400);
    }
});

// Premium Apple Glass Modal System Global Object
window.saGlassModal = {
    activeModal: null,

    show: function({
        type = 'info', // 'success' | 'error' | 'confirm' | 'info'
        title = '',
        message = '',
        confirmText = 'OK',
        cancelText = 'Cancel',
        onConfirm = null,
        onCancel = null,
        autoClose = false,
        autoCloseDuration = 3000,
        buttons = null // array of { text, className, onClick }
    }) {
        const selfModal = this;

        // Remove any existing active modal
        this.closeActive();

        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'sa-glass-modal-overlay';
        
        // Define Icon Class
        let iconClass = 'fa-solid ';
        if (type === 'success') iconClass += 'fa-circle-check';
        else if (type === 'error') iconClass += 'fa-circle-exclamation';
        else if (type === 'confirm') iconClass += 'fa-circle-question';
        else if (type === 'auth') iconClass += 'fa-lock';
        else iconClass += 'fa-circle-info';

        // Set Cancel Button visibility
        const showCancel = (type === 'confirm');
        const confirmBtnClass = (type === 'error' || (type === 'confirm' && (title.toLowerCase().includes('delete') || message.toLowerCase().includes('delete') || message.toLowerCase().includes('remove') || message.toLowerCase().includes('logout')))) ? 'danger' : 'primary';

        overlay.innerHTML = `
            <div class="sa-glass-modal-box">
                <button class="sa-glass-modal-close-btn" aria-label="Close modal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="sa-glass-modal-icon ${type}">
                    <i class="${iconClass}"></i>
                </div>
                <h3 class="sa-glass-modal-title">${title || (type === 'success' ? 'Success' : (type === 'error' ? 'Error' : 'Notification'))}</h3>
                <p class="sa-glass-modal-desc">${message}</p>
                <div class="sa-glass-modal-buttons">
                    ${buttons && buttons.length > 0 ? 
                        buttons.map((b, i) => `<button class="sa-glass-modal-btn ${b.className || 'primary'} sa-custom-btn-${i}">${b.text}</button>`).join('')
                        : `
                            ${showCancel ? `<button class="sa-glass-modal-btn secondary sa-cancel-btn">${cancelText}</button>` : ''}
                            <button class="sa-glass-modal-btn ${confirmBtnClass} sa-confirm-btn">${confirmText}</button>
                        `
                    }
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.activeModal = overlay;

        // Force reflow
        overlay.offsetWidth;

        // Show modal with animation
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        const closeBtn = overlay.querySelector('.sa-glass-modal-close-btn');
        const confirmBtn = overlay.querySelector('.sa-confirm-btn');
        const cancelBtn = overlay.querySelector('.sa-cancel-btn');

        const escListener = (e) => {
            if (e.key === 'Escape') {
                close();
                if (onCancel) onCancel();
            }
        };
        window.addEventListener('keydown', escListener);

        overlay._cleanup = () => {
            window.removeEventListener('keydown', escListener);
        };

        function close() {
            if (overlay._cleanup) overlay._cleanup();
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                overlay.remove();
                if (selfModal.activeModal === overlay) {
                    selfModal.activeModal = null;
                }
            }, 350);
        }

        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                close();
                if (onCancel) onCancel();
            };
        }

        if (confirmBtn) {
            confirmBtn.onclick = (e) => {
                e.stopPropagation();
                close();
                if (onConfirm) onConfirm();
            };
        }

        if (cancelBtn) {
            cancelBtn.onclick = (e) => {
                e.stopPropagation();
                close();
                if (onCancel) onCancel();
            };
        }

        if (buttons && buttons.length > 0) {
            buttons.forEach((b, i) => {
                const btnEl = overlay.querySelector(`.sa-custom-btn-${i}`);
                if (btnEl) {
                    btnEl.onclick = (e) => {
                        e.stopPropagation();
                        close();
                        if (b.onClick) b.onClick();
                    };
                }
            });
        }

        overlay.onclick = (e) => {
            if (e.target === overlay) {
                close();
                if (onCancel) onCancel();
            }
        };

        if (autoClose) {
            setTimeout(() => {
                if (document.body.contains(overlay) && overlay.classList.contains('active')) {
                    close();
                }
            }, autoCloseDuration);
        }
    },

    closeActive: function() {
        if (this.activeModal) {
            if (this.activeModal._cleanup) {
                this.activeModal._cleanup();
            }
            this.activeModal.classList.remove('active');
            const target = this.activeModal;
            setTimeout(() => {
                if (target && target.parentNode) target.parentNode.removeChild(target);
            }, 350);
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }
};

window.showLoginRequiredModal = function(onCancelCallback = null) {
    window.saGlassModal.show({
        type: 'auth',
        title: 'Login Required',
        message: 'Please login or create an account to continue.',
        buttons: [
            {
                text: 'Register',
                className: 'secondary',
                onClick: () => {
                    window.location.href = 'signup.html';
                }
            },
            {
                text: 'Login',
                className: 'primary',
                onClick: () => {
                    window.location.href = 'login.html';
                }
            }
        ],
        onCancel: onCancelCallback
    });
};

function enforcePageAuthGuard() {
    const pathname = window.location.pathname.toLowerCase();
    const filename = pathname.split('/').pop().split('?').shift() || 'index.html';
    // Only account.html and orders.html are strictly protected
    const restrictedPages = ['account.html', 'orders.html'];
    
    if (restrictedPages.includes(filename)) {
        if (window.location.search.includes('preview=1')) {
            USER_STATE.profile = {
                id: 'demo-user',
                name: 'Rahim Uddin',
                email: 'rahim@satheachi.com',
                phone: '01712345678',
                avatar: 'R'
            };
            return;
        }

        // If profile is already cached or user has an active token, don't block
        if (USER_STATE.profile || hasLocalAuthToken()) {
            return;
        }

        showAuthLoader();
        
        const check = async () => {
            if (!USER_STATE.profile) {
                // Direct session check fallback before triggering login modal
                try {
                    const { data: { session } } = await supabaseClient.auth.getSession();
                    if (session) {
                        USER_STATE.profile = {
                            id: session.user.id,
                            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0] || 'User',
                            email: session.user.email,
                            phone: session.user.user_metadata?.phone || '',
                            avatar: 'U'
                        };
                        localStorage.setItem('sathe_achi_user_profile', JSON.stringify(USER_STATE.profile));
                        hideAuthLoader();
                        return;
                    }
                } catch (e) {
                    console.error("Direct session check in guard failed:", e);
                }

                hideAuthLoader();
                window.showLoginRequiredModal(() => {
                    window.location.href = 'index.html';
                });
            } else {
                hideAuthLoader();
            }
        };
        
        if (window.authChecking) {
            document.addEventListener('authChecked', check, { once: true });
        } else {
            check();
        }
    }
}

window.signOutUser = async function() {
    try {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
    } catch (err) {
        console.error("Supabase signOut error:", err);
    }
    localStorage.removeItem('sathe_achi_user_profile');
    localStorage.removeItem('sathe_achi_cart');
    localStorage.removeItem('sathe_achi_wishlist');
    localStorage.removeItem('sathe_achi_coupon_code');
    localStorage.removeItem('sathe_achi_coupon_discount');
    localStorage.removeItem('sathe_achi_coupon_type');
    localStorage.removeItem('sathe_achi_coupon_value');
    localStorage.removeItem('sathe_achi_coupon_min_order');
    
    // Remove merge key flags
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sathe_achi_cart_merged_')) {
            localStorage.removeItem(key);
        }
    });
    
    // Clear in-memory cart and wishlist states
    cart = [];
    wishlist = [];
    USER_STATE.profile = null;
    USER_STATE.addresses = [];
    USER_STATE.notifications = [];
    USER_STATE.coupons = [];
    updateHeaderProfileUI(null);
    
    showToast('Logging out...', 'info');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
};

window.saConfirm = function(message, onConfirm, onCancel) {
    window.saGlassModal.show({
        type: 'confirm',
        title: 'Confirm Action',
        message: message,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        onConfirm: onConfirm,
        onCancel: onCancel
    });
};

window.saAlert = function(message, type = 'info', onConfirm = null) {
    window.saGlassModal.show({
        type: type,
        title: type === 'success' ? 'Success' : (type === 'error' ? 'Error' : 'Notification'),
        message: message,
        confirmText: 'OK',
        onConfirm: onConfirm
    });
};

// Override native alert API
window.alert = function(message) {
    window.saAlert(message);
};

// Toast Notification Manager (Sleek non-blocking floating toast notifications)
function showToast(message, type = 'success') {
    if (!message) return;

    let container = document.querySelector('.toast-container') || document.querySelector('.sa-toasts');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconClass = type === 'success' 
        ? 'fa-solid fa-circle-check' 
        : (type === 'error' ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-circle-info');

    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Smooth entry animation
    requestAnimationFrame(() => {
        toast.classList.add('active');
    });

    // Auto-dismiss smoothly after 2.8s
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 350);
    }, 2800);
}

// Set Dark/Light Mode Theme
function setTheme(theme) {
    const isDark = (theme === 'dark');
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('sathe_achi_theme', isDark ? 'dark' : 'light'); } catch(e) {}
    currentTheme = isDark ? 'dark' : 'light';
    
    // Update FontAwesome icons
    const themeIcons = document.querySelectorAll('.theme-toggle i, #saTheme i');
    themeIcons.forEach(icon => {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-regular fa-moon';
    });

    // Update SVG icons (index.html / main header)
    const moons = document.querySelectorAll('#saTheme .theme-icon-moon, .theme-toggle .theme-icon-moon');
    const suns = document.querySelectorAll('#saTheme .theme-icon-sun, .theme-toggle .theme-icon-sun');
    moons.forEach(m => m.style.display = isDark ? 'none' : 'block');
    suns.forEach(s => s.style.display = isDark ? 'block' : 'none');

    // Update titles
    const btns = document.querySelectorAll('#saTheme, .theme-toggle');
    btns.forEach(b => b.setAttribute('title', isDark ? 'Light Mode' : 'Dark Mode'));
}

// Update badges across pages (Navbar, Bottom Bar)
function updateBadges() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalCartItems);
}

// Global Event Handlers
function registerGlobalEvents() {
    // Intercept clicks on links targeting restricted pages for guests
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (anchor) {
            const href = anchor.getAttribute('href');
            if (href) {
                const url = href.split('/').pop().split('?').shift();
                // ONLY account.html and orders.html are strictly restricted for guests
                const restrictedPages = ['account.html', 'orders.html'];
                
                if (restrictedPages.includes(url)) {
                    if (!USER_STATE.profile && !hasLocalAuthToken()) {
                        e.preventDefault();
                        window.showLoginRequiredModal();
                    }
                }
            }
        }
    });

    // Unified 1-Tap Theme Toggler Click
    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('#saTheme, .theme-toggle');
        if (!toggle) return;
        e.preventDefault();
        e.stopPropagation();
        const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark' || currentTheme === 'dark';
        const nextTheme = isCurrentlyDark ? 'light' : 'dark';
        setTheme(nextTheme);
    });

    // Mobile Hamburger Menu Trigger
    const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');

    if (hamburgerBtn && mobileSidebar && mobileBackdrop) {
        const toggleSidebar = () => {
            mobileSidebar.classList.toggle('active');
            mobileBackdrop.classList.toggle('active');
        };

        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar();
        });

        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
        mobileBackdrop.addEventListener('click', toggleSidebar);
    }

    // =========================================================================
    // SATHEACHI INTELLIGENT PREDICTIVE SEARCH ENGINE
    // =========================================================================
    (function initPredictiveSearchEngine() {
        const searchInputs = document.querySelectorAll('.sa-search-box input, .search-box input');
        if (!searchInputs || searchInputs.length === 0) return;

        const TRENDING = ['Smartphone', 'Headphones', 'Sneakers', 'Smart Watch', 'Laptop', 'T-Shirt', 'Backpack'];
        const POPULAR_CATS = ['Mobiles', 'Electronics', 'Fashion', 'Watches', 'Beauty', 'Home'];

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function highlightMatch(text, query) {
            if (!text) return '';
            if (!query) return escapeHtml(text);
            const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${safeQuery})`, 'gi');
            return escapeHtml(text).replace(regex, '<mark class="sa-sugg-hl">$1</mark>');
        }

        searchInputs.forEach(input => {
            const box = input.closest('.sa-search-box, .search-box');
            const wrap = input.closest('.sa-search-wrap') || (box ? box.parentElement : null);
            const headerInner = input.closest('.sa-header-inner');
            
            // Locate suggestions dropdown (handles both wrap sibling and ID fallback)
            let suggestionsBox = wrap ? wrap.querySelector('.sa-search-suggestions') : null;
            if (!suggestionsBox) {
                suggestionsBox = document.getElementById('saSearchSuggestions') || (box ? box.querySelector('.suggestions') : null);
            }

            // Locate or inject Close/Clear 'X' button inside search box
            let clearBtn = box ? box.querySelector('.sa-search-clear') : null;
            let searchBtn = box ? box.querySelector('.sa-search-btn, button[type="submit"]') : null;
            if (box && !clearBtn) {
                clearBtn = document.createElement('button');
                clearBtn.type = 'button';
                clearBtn.className = 'sa-search-clear';
                clearBtn.setAttribute('aria-label', 'Clear search');
                clearBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                if (searchBtn) {
                    box.insertBefore(clearBtn, searchBtn);
                } else {
                    box.appendChild(clearBtn);
                }
            }

            let activeKeyboardIndex = -1;

            function syncClearBtn() {
                if (!clearBtn) return;
                if (input.value && input.value.trim().length > 0) {
                    clearBtn.classList.add('visible');
                } else {
                    clearBtn.classList.remove('visible');
                }
            }

            function renderDefaultSuggestions() {
                if (!suggestionsBox) return;
                activeKeyboardIndex = -1;
                suggestionsBox.innerHTML = `
                    <div class="sa-suggestions-section">
                        <div class="sa-suggestions-title"><i class="fa-solid fa-fire-flame-curved" style="color:#cca24a;"></i> ট্রেন্ডিং সার্চ</div>
                        <div class="sa-suggestions-tags">
                            ${TRENDING.map(t => `<span class="sa-tag" data-trend="${escapeHtml(t)}">${escapeHtml(t)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="sa-dropdown-divider" style="margin:4px 0; border-top: 1px solid rgba(0,0,0,0.05);"></div>
                    <div class="sa-suggestions-section">
                        <div class="sa-suggestions-title"><i class="fa-solid fa-layer-group" style="color:#6366f1;"></i> জনপ্রিয় ক্যাটাগরি</div>
                        <div class="sa-suggestions-tags">
                            ${POPULAR_CATS.map(c => `<span class="sa-tag" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</span>`).join('')}
                        </div>
                    </div>
                `;

                suggestionsBox.querySelectorAll('.sa-tag[data-trend]').forEach(tag => {
                    tag.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const trend = tag.getAttribute('data-trend');
                        if (trend) {
                            input.value = trend;
                            syncClearBtn();
                            window.location.href = `category.html?search=${encodeURIComponent(trend)}`;
                        }
                    });
                });

                suggestionsBox.querySelectorAll('.sa-tag[data-cat]').forEach(tag => {
                    tag.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const cat = tag.getAttribute('data-cat');
                        if (cat) {
                            window.location.href = `category.html?slug=${encodeURIComponent(cat)}`;
                        }
                    });
                });

                suggestionsBox.classList.add('active');
            }

            function performSearchFilter() {
                syncClearBtn();
                if (!suggestionsBox) return;

                const rawQuery = input.value;
                const query = rawQuery.trim().toLowerCase();

                if (query.length === 0) {
                    renderDefaultSuggestions();
                    return;
                }

                const catalog = (window.PRODUCTS && window.PRODUCTS.length > 0) ? window.PRODUCTS : (PRODUCTS || []);
                
                const startsWithMatches = [];
                const containsMatches = [];
                const otherMatches = [];

                catalog.forEach(p => {
                    const titleLower = (p.title || '').toLowerCase();
                    const catLower = (p.category || '').toLowerCase();
                    const brandLower = (p.brand || '').toLowerCase();

                    if (titleLower.startsWith(query)) {
                        startsWithMatches.push(p);
                    } else if (titleLower.includes(query)) {
                        containsMatches.push(p);
                    } else if (catLower.includes(query) || brandLower.includes(query)) {
                        otherMatches.push(p);
                    }
                });

                const matched = [...startsWithMatches, ...containsMatches, ...otherMatches].slice(0, 6);
                activeKeyboardIndex = -1;

                if (matched.length > 0) {
                    suggestionsBox.innerHTML = `
                        <div class="sa-sugg-header">
                            <i class="fa-solid fa-magnifying-glass" style="color:#cca24a;"></i>
                            <span>পণ্য সাজেশন্স (${matched.length})</span>
                        </div>
                        ${matched.map(p => {
                            const price = Number(p.discountPrice || p.originalPrice || 0).toLocaleString();
                            const img = p.image || 'https://placehold.co/80x80?text=Item';
                            return `
                                <div class="sa-sugg-item" data-id="${p.id}" tabindex="-1">
                                    <img src="${img}" alt="${escapeHtml(p.title)}" class="sa-sugg-thumb" onerror="this.src='https://placehold.co/80x80?text=Item'">
                                    <div class="sa-sugg-meta">
                                        <div class="sa-sugg-title">${highlightMatch(p.title, rawQuery.trim())}</div>
                                        <div class="sa-sugg-sub">
                                            <span class="sa-sugg-cat">${escapeHtml(p.category || 'General')}</span>
                                            <span class="sa-sugg-price">৳${price}</span>
                                        </div>
                                    </div>
                                    <i class="fa-solid fa-chevron-right sa-sugg-arrow"></i>
                                </div>
                            `;
                        }).join('')}
                        <div class="sa-sugg-view-all" data-query="${encodeURIComponent(rawQuery.trim())}">
                            <span>"<strong>${escapeHtml(rawQuery.trim())}</strong>" এর সব ফলাফল দেখুন</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    `;

                    suggestionsBox.querySelectorAll('.sa-sugg-item').forEach(item => {
                        item.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.location.href = `product.html?id=${encodeURIComponent(item.dataset.id)}`;
                        });
                    });

                    const viewAllBtn = suggestionsBox.querySelector('.sa-sugg-view-all');
                    if (viewAllBtn) {
                        viewAllBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.location.href = `category.html?search=${encodeURIComponent(rawQuery.trim())}`;
                        });
                    }

                    suggestionsBox.classList.add('active');
                } else {
                    suggestionsBox.innerHTML = `
                        <div class="sa-sugg-empty">
                            <div class="sa-sugg-empty-icon"><i class="fa-solid fa-magnifying-glass-minus"></i></div>
                            <div class="sa-sugg-empty-text">"<strong>${escapeHtml(rawQuery.trim())}</strong>" এর জন্য কিছু পাওয়া যায়নি</div>
                            <div class="sa-sugg-empty-hint">সঠিক বানান চেক করুন অথবা নিচের ক্যাটাগরিগুলো দেখুন</div>
                        </div>
                        <div class="sa-dropdown-divider" style="margin:4px 0; border-top: 1px solid rgba(0,0,0,0.05);"></div>
                        <div class="sa-suggestions-section">
                            <div class="sa-suggestions-title"><i class="fa-solid fa-fire-flame-curved" style="color:#cca24a;"></i> ট্রেন্ডিং পণ্যসমূহ</div>
                            <div class="sa-suggestions-tags">
                                ${TRENDING.map(t => `<span class="sa-tag" data-trend="${escapeHtml(t)}">${escapeHtml(t)}</span>`).join('')}
                            </div>
                        </div>
                    `;

                    suggestionsBox.querySelectorAll('.sa-tag[data-trend]').forEach(tag => {
                        tag.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const trend = tag.getAttribute('data-trend');
                            if (trend) {
                                input.value = trend;
                                syncClearBtn();
                                window.location.href = `category.html?search=${encodeURIComponent(trend)}`;
                            }
                        });
                    });

                    suggestionsBox.classList.add('active');
                }
            }

            function updateKeyboardSelection(items, newIndex) {
                items.forEach((it, idx) => {
                    if (idx === newIndex) {
                        it.classList.add('keyboard-selected');
                        it.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    } else {
                        it.classList.remove('keyboard-selected');
                    }
                });
            }

            input.addEventListener('focus', () => {
                openScrollY = window.scrollY;
                document.body.classList.add('sa-search-open');
                if (headerInner) headerInner.classList.add('island-active');
                syncClearBtn();
                if (!input.value.trim()) {
                    renderDefaultSuggestions();
                } else {
                    performSearchFilter();
                }
            });

            input.addEventListener('input', () => {
                performSearchFilter();
            });

            let openScrollY = 0;

            if (clearBtn) {
                clearBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                    syncClearBtn();
                    if (suggestionsBox) suggestionsBox.classList.remove('active');
                    if (headerInner) headerInner.classList.remove('island-active');
                    document.body.classList.remove('sa-search-open');
                    input.blur();
                });
            }

            const submitSearch = () => {
                const query = input.value.trim();
                if (query.length > 0) {
                    window.location.href = `category.html?search=${encodeURIComponent(query)}`;
                }
            };

            if (searchBtn) {
                searchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    submitSearch();
                });
            }

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (suggestionsBox) suggestionsBox.classList.remove('active');
                    if (headerInner) headerInner.classList.remove('island-active');
                    document.body.classList.remove('sa-search-open');
                    input.blur();
                    return;
                }

                if (suggestionsBox && suggestionsBox.classList.contains('active')) {
                    const items = Array.from(suggestionsBox.querySelectorAll('.sa-sugg-item'));
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        if (items.length > 0) {
                            activeKeyboardIndex = (activeKeyboardIndex + 1) % items.length;
                            updateKeyboardSelection(items, activeKeyboardIndex);
                        }
                        return;
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        if (items.length > 0) {
                            activeKeyboardIndex = (activeKeyboardIndex - 1 + items.length) % items.length;
                            updateKeyboardSelection(items, activeKeyboardIndex);
                        }
                        return;
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        if (activeKeyboardIndex >= 0 && items[activeKeyboardIndex]) {
                            items[activeKeyboardIndex].click();
                        } else {
                            submitSearch();
                        }
                        return;
                    }
                }

                if (e.key === 'Enter') {
                    e.preventDefault();
                    submitSearch();
                }
            });

            if (suggestionsBox) {
                suggestionsBox.addEventListener('mousedown', (e) => {
                    // Prevent mousedown in suggestions dropdown from blurring input prematurely
                    e.stopPropagation();
                });
            }

            document.addEventListener('click', (e) => {
                const path = e.composedPath ? e.composedPath() : [];
                const insideSearch = (box && box.contains(e.target)) || 
                                     (suggestionsBox && suggestionsBox.contains(e.target)) ||
                                     path.includes(box) ||
                                     path.includes(suggestionsBox) ||
                                     (e.target.closest && (e.target.closest('.sa-search-box') || e.target.closest('.sa-search-suggestions') || e.target.closest('.sa-search-wrap')));
                if (!insideSearch) {
                    if (suggestionsBox) suggestionsBox.classList.remove('active');
                    if (headerInner) headerInner.classList.remove('island-active');
                    document.body.classList.remove('sa-search-open');
                }
            });

            window.addEventListener('scroll', () => {
                if (suggestionsBox && suggestionsBox.classList.contains('active')) {
                    if (Math.abs(window.scrollY - openScrollY) > 80) {
                        suggestionsBox.classList.remove('active');
                        if (headerInner) headerInner.classList.remove('island-active');
                        document.body.classList.remove('sa-search-open');
                        input.blur();
                    }
                }
            }, { passive: true });
        });
    })();

    // Newsletter submission handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input && input.value) {
                showToast("Thank you for subscribing to সাথে আছি!", "success");
                input.value = "";
            }
        });
    }
}

// Global Handler for Banner Clicks (smooth scroll or redirect)
window.handleBannerClick = function(targetSection, event, linkUrl) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (linkUrl && linkUrl !== '#' && linkUrl !== '') {
        window.location.href = linkUrl;
        return;
    }

    const sectionMappings = {
        flash_sale: { type: 'redirect', url: 'category.html?flash_sale=true' },
        trending: { type: 'scroll', target: 'saTrendingSection' },
        hot_deals: { type: 'scroll', target: 'saRecommendedSection' },
        featured_products: { type: 'scroll', target: 'saFeaturedSection' },
        new_arrivals: { type: 'redirect', url: 'category.html?sort=newest' },
        categories: { type: 'redirect', url: 'categories.html' },
        mobiles: { type: 'redirect', url: 'category.html?slug=Mobiles' },
        fashion: { type: 'redirect', url: 'category.html?slug=Fashion' },
        beauty: { type: 'redirect', url: 'category.html?slug=Beauty' },
        electronics: { type: 'redirect', url: 'category.html?slug=Electronics' },
        watches: { type: 'redirect', url: 'category.html?slug=Watches' },
        home: { type: 'redirect', url: 'category.html?slug=Home' }
    };

    const mapping = sectionMappings[targetSection] || { type: 'scroll', target: 'saFeaturedSection' };

    if (mapping.type === 'redirect') {
        window.location.href = mapping.url;
    } else if (mapping.type === 'scroll') {
        const el = document.getElementById(mapping.target);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.href = `index.html#${mapping.target}`;
        }
    }
};

// Render Dynamic Hero Banners (Mobile Preserved + 5 Dedicated Luxury PC & Mobile Banners)
function renderHeroBanners() {
    const slider = document.getElementById('saHeroSlider');
    const dotsContainer = document.getElementById('saHeroDots');
    if (!slider || !dotsContainer) return;

    const isMobile = window.innerWidth <= 768;

    // For phone: preserve original clean mobile design layout with new 5 category banners
    if (isMobile) {
        const mobileBanners = (BANNERS && BANNERS.length > 0)
            ? BANNERS.filter(b => (b.position === 'hero' || !b.position) && b.is_active !== false)
            : (window.LUXURY_HERO_BANNERS || []);

        const gradients = [
            'linear-gradient(135deg, #060b17 0%, #0c1a32 50%, #15243f 100%)',
            'linear-gradient(135deg, #0a0a1a 0%, #131230 50%, #201b44 100%)',
            'linear-gradient(135deg, #050d18 0%, #0a1b2e 50%, #0e2b46 100%)',
            'linear-gradient(135deg, #06101e 0%, #0b1f3b 50%, #122f5a 100%)',
            'linear-gradient(135deg, #100b08 0%, #22170f 50%, #302115 100%)'
        ];

        const renderMobileSlide = (b, i) => {
            const grad = b.theme_gradient || gradients[i % gradients.length];
            const btnText = b.button_text || 'অফার দেখুন';
            const subtitleText = b.subtitle || 'এক্সক্লুসিভ কালেকশন অন্বেষণ করুন।';
            const badgeText = b.badge || '✨ FEATURED COLLECTION';
            const link = b.link_url || (b.target_section ? `category.html?slug=${b.target_section}` : '#');
            return `
              <div class="sa-slide" data-slide-index="${i}">
                <div class="sa-slide-inner" style="background: ${grad};">
                  <div class="sa-slide-content">
                    <span class="sa-slide-badge">${badgeText}</span>
                    <h1 class="sa-slide-h1">${b.title}</h1>
                    <p class="sa-slide-p">${subtitleText}</p>
                    <a href="${link}" onclick="handleBannerClick('${b.target_section || 'featured_products'}', event, '${link}')" class="sa-btn-primary sa-hero-cta"><span>${btnText}</span> <i class="fa-solid fa-arrow-right"></i></a>
                  </div>
                  <div class="sa-slide-img"><img src="${b.image_url}" alt="${b.title}" onerror="if(!this._r){this._r=true; this.src=this.src.replace('images/','');}"></div>
                </div>
              </div>
            `;
        };

        const slidesHtml = mobileBanners.map((b, i) => renderMobileSlide(b, i)).join('');
        const cloneHtml = mobileBanners.length > 1 ? renderMobileSlide(mobileBanners[0], mobileBanners.length) : '';
        slider.innerHTML = slidesHtml + cloneHtml;

        dotsContainer.innerHTML = mobileBanners.map((_, i) => `
            <div class="sa-dot ${i===0?'active':''}" data-index="${i}"></div>
        `).join('');

        initHeroSlider();
        return;
    }

    // For desktop: if DB has active hero banners, display them! Otherwise fall back to luxury presets.
    const activeDbBanners = (BANNERS && BANNERS.length > 0)
        ? BANNERS.filter(b => (b.position === 'hero' || !b.position) && b.is_active !== false)
        : [];
    const bannersToRender = (activeDbBanners.length > 0)
        ? activeDbBanners
        : ((window.LUXURY_HERO_BANNERS && window.LUXURY_HERO_BANNERS.length > 0) ? window.LUXURY_HERO_BANNERS : []);

    const bannersKey = 'desktop_' + JSON.stringify(bannersToRender.map(b => b.id || b.title || b.image_url));
    if (window._saCurrentRenderedBannersKey === bannersKey) {
        return;
    }
    window._saCurrentRenderedBannersKey = bannersKey;

    if (bannersToRender.length > 0) {
        const renderDesktopSlide = (b, i) => {
            const grad = b.theme_gradient || 'linear-gradient(135deg, #060b17 0%, #0c1a32 50%, #15243f 100%)';
            const badgeText = b.badge || '✨ FEATURED COLLECTION';
            const btnText = b.button_text || 'অফার দেখুন';
            const subtitleText = b.subtitle || 'এক্সক্লুসিভ কালেকশন অন্বেষণ করুন।';
            const highlightHtml = b.highlight ? `<span class="sa-slide-highlight">${b.highlight}</span>` : '';
            const link = b.link_url || (b.target_section ? `category.html?slug=${b.target_section}` : '#');

            return `
              <div class="sa-slide" data-slide-index="${i}">
                <div class="sa-slide-inner" style="background: ${grad};">
                  <div class="sa-slide-ambient"></div>
                  <div class="sa-slide-content">
                    <span class="sa-slide-badge">${badgeText}</span>
                    <h1 class="sa-slide-h1">${b.title} ${highlightHtml}</h1>
                    <p class="sa-slide-p">${subtitleText}</p>
                    <a href="${link}" onclick="handleBannerClick('${b.target_section || 'featured_products'}', event, '${link}')" class="sa-btn-primary sa-hero-cta">
                      <span>${btnText}</span>
                      <i class="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                  <div class="sa-slide-img">
                    <img src="${b.image_url}" alt="${b.title}" loading="${i === 0 ? 'eager' : 'lazy'}" onerror="if(!this._r){this._r=true; this.src=this.src.replace('images/','');}">
                  </div>
                </div>
              </div>
            `;
        };

        const slidesHtml = bannersToRender.map((b, i) => renderDesktopSlide(b, i)).join('');
        const cloneHtml = bannersToRender.length > 1 ? renderDesktopSlide(bannersToRender[0], bannersToRender.length) : '';
        slider.innerHTML = slidesHtml + cloneHtml;

        dotsContainer.innerHTML = bannersToRender.map((_, i) => `
            <div class="sa-dot ${i===0?'active':''}" data-index="${i}"></div>
        `).join('');
    }
    
    // Initialize smooth hardware-accelerated transform slider
    initHeroSlider();
}

// Re-render hero banners on screen width threshold change
let _saLastIsMobile = window.innerWidth <= 768;
window.addEventListener('resize', () => {
    const isMobileNow = window.innerWidth <= 768;
    if (isMobileNow !== _saLastIsMobile) {
        _saLastIsMobile = isMobileNow;
        renderHeroBanners();
    }
    if (window.innerWidth >= 992) {
        if (typeof window.saStartContinuousButler === 'function') {
            window.saStartContinuousButler();
        }
    } else {
        if (typeof window.saPauseContinuousButler === 'function') {
            window.saPauseContinuousButler();
        }
    }
});

// Silky Smooth & Calm Hero Slider (Infinite Smooth Gliding)
function initHeroSlider() {
    const slider = document.getElementById('saHeroSlider');
    const wrapper = slider ? slider.closest('.sa-premium-slider-wrapper') : null;
    const dots = document.querySelectorAll('#saHeroDots .sa-dot');
    const prevBtn = document.getElementById('saHeroPrev');
    const nextBtn = document.getElementById('saHeroNext');
    if (!slider || dots.length === 0) return;

    if (window._saHeroTimer) {
        clearInterval(window._saHeroTimer);
        window._saHeroTimer = null;
    }

    const totalRealSlides = dots.length;
    let currentIndex = 0;
    let isTransitioning = false;
    const SLIDE_DURATION = 1300; // 1.3s silky smooth glide matching the 1.33s pushing stroke
    const AUTOPLAY_INTERVAL = 6800; // 6.8s luxury cycle (5.0s calm display + 1.8s push)

    // Set initial position
    slider.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    slider.style.transform = 'translateX(0%)';

    function updateDots(activeIdx) {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === (activeIdx % totalRealSlides));
        });
    }

    function goToSlide(targetIndex, animate = true) {
        if (animate) {
            slider.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`;
        } else {
            slider.style.transition = 'none';
        }
        currentIndex = targetIndex;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots(currentIndex % totalRealSlides);
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        setTimeout(() => { isTransitioning = false; }, SLIDE_DURATION + 100);
        currentIndex++;
        goToSlide(currentIndex, true);
    }

    // Expose butler push slide (pushing to the right triggers prevSlide)
    window._saButlerPushSlide = function() {
        prevSlide();
    };
    window._saNextHeroSlide = function() {
        prevSlide();
    };

    function triggerNextCycle() {
        if (window.innerWidth >= 992 && typeof window.saTriggerButlerSlide === 'function') {
            window.saTriggerButlerSlide();
        } else {
            prevSlide();
        }
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        setTimeout(() => { isTransitioning = false; }, SLIDE_DURATION + 100);
        if (currentIndex === 0) {
            // Jump to clone at end without animation, then smoothly animate to last real slide
            slider.style.transition = 'none';
            currentIndex = totalRealSlides;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            void slider.offsetWidth; // Force reflow
            slider.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(0.25, 1, 0.35, 1)`;
            currentIndex = totalRealSlides - 1;
            goToSlide(currentIndex, true);
        } else {
            currentIndex--;
            goToSlide(currentIndex, true);
        }
    }

    // When slide animation finishes, check if we reached the cloned slide to reset seamlessly
    slider.ontransitionend = (e) => {
        if (e.target !== slider || e.propertyName !== 'transform') return;
        isTransitioning = false;
        if (currentIndex >= totalRealSlides) {
            // Silently reset back to slide 0 without reverse animation
            slider.style.transition = 'none';
            currentIndex = 0;
            slider.style.transform = 'translateX(0%)';
            void slider.offsetWidth; // Force reflow
            slider.style.transition = `transform ${SLIDE_DURATION}ms cubic-bezier(0.25, 1, 0.35, 1)`;
        }
    };

    function startAuto() {
        stopAuto();
        if (window.innerWidth >= 992) {
            if (typeof window.saStartContinuousButler === 'function') {
                window.saStartContinuousButler();
            }
        } else {
            window._saHeroTimer = setInterval(prevSlide, AUTOPLAY_INTERVAL);
        }
    }
    function stopAuto() {
        if (window._saHeroTimer) {
            clearInterval(window._saHeroTimer);
            window._saHeroTimer = null;
        }
        if (typeof window.saPauseContinuousButler === 'function') {
            window.saPauseContinuousButler();
        }
    }
    startAuto();

    // Desktop: pause on mouse hover
    if (wrapper) {
        wrapper.onmouseenter = stopAuto;
        wrapper.onmouseleave = startAuto;
    }

    // Arrows
    if (nextBtn) {
        nextBtn.onclick = (e) => {
            e.preventDefault();
            triggerNextCycle();
            startAuto();
        };
    }
    if (prevBtn) {
        prevBtn.onclick = (e) => {
            e.preventDefault();
            prevSlide();
            startAuto();
        };
    }

    // Click dots
    dots.forEach(dot => {
        dot.onclick = () => {
            const idx = parseInt(dot.getAttribute('data-index'), 10);
            if (!isNaN(idx) && idx !== currentIndex && !isTransitioning) {
                goToSlide(idx, true);
                startAuto();
            }
        };
    });

    // Touch & Swipe gesture handling for mobile / tablet
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    slider.ontouchstart = (e) => {
        stopAuto();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    };

    slider.ontouchend = (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const diffY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAuto();
    };
}

// ══════════════════════════════════════════════════════════
// ROYAL BUTLER LIVE MASCOT (Continuous 100% Pre-rendered 121 Transparent Frames Loop)
// ══════════════════════════════════════════════════════════
function initRoyalButlerMascot() {
    if (window._saButlerInitialized) {
        if (window.innerWidth >= 992 && typeof window.saStartContinuousButler === 'function') {
            window.saStartContinuousButler();
        }
        return;
    }

    const stage = document.getElementById('saButlerStage');
    const butlerImg = document.getElementById('saButlerImg');
    const canvas = document.getElementById('saButlerCanvas');
    if (!stage || !butlerImg || !canvas) return;

    if (window.innerWidth < 992) {
        return;
    }

    window._saButlerInitialized = true;

    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 121;
    const COLS = 11;
    const FRAME_W = 260;
    const FRAME_H = 440;
    let isRunning = false;
    let isPaused = false;
    let currentFrame = 0;
    let pushFired = false;
    const fps = 24;
    const frameInterval = 1000 / fps;
    let lastTime = performance.now();

    // Single ultra-optimized 707KB transparent spritesheet with auto-fallback
    const spritesheet = new Image();
    spritesheet.onerror = function() {
        if (!this._r) {
            this._r = true;
            this.src = 'butler_spritesheet.webp';
        }
    };
    spritesheet.src = 'images/butler_spritesheet.webp';

    function playLoop(now) {
        if (!isRunning) return;

        if (!isPaused && (now - lastTime >= frameInterval)) {
            lastTime = now;
            if (spritesheet.complete && spritesheet.naturalWidth > 0) {
                const col = currentFrame % COLS;
                const row = Math.floor(currentFrame / COLS);
                const sx = col * FRAME_W;
                const sy = row * FRAME_H;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(spritesheet, sx, sy, FRAME_W, FRAME_H, 0, 0, canvas.width, canvas.height);
            }

            // Synchronization: Exactly at frame 42, his hands contact the card and push forward!
            // Only fires ONCE per 121-frame cycle!
            if (!pushFired && currentFrame >= 42) {
                pushFired = true;
                if (typeof window._saButlerPushSlide === 'function') {
                    window._saButlerPushSlide();
                }
            }

            currentFrame++;

            // Continuous loop: when video reaches end, seamlessly restart from frame 0!
            if (currentFrame >= TOTAL_FRAMES) {
                currentFrame = 0;
                pushFired = false;
            }
        }

        window._saButlerAnimId = requestAnimationFrame(playLoop);
    }

    window.saStartContinuousButler = function() {
        if (window.innerWidth < 992) return;
        isPaused = false;
        if (!isRunning) {
            isRunning = true;
            butlerImg.style.display = 'none';
            canvas.style.display = 'block';
            lastTime = performance.now();
            if (window._saButlerAnimId) {
                cancelAnimationFrame(window._saButlerAnimId);
                window._saButlerAnimId = null;
            }
            window._saButlerAnimId = requestAnimationFrame(playLoop);
        }
    };

    window.saPauseContinuousButler = function() {
        isPaused = true;
    };

    window.saStopContinuousButler = function() {
        isRunning = false;
        isPaused = false;
        if (window._saButlerAnimId) {
            cancelAnimationFrame(window._saButlerAnimId);
            window._saButlerAnimId = null;
        }
    };

    window.saTriggerButlerSlide = function() {
        if (window.innerWidth < 992) {
            if (typeof window._saButlerPushSlide === 'function') window._saButlerPushSlide();
            return;
        }
        currentFrame = 40;
        pushFired = false;
        window.saStartContinuousButler();
    };

    // Auto-start continuous butler loop on desktop!
    window.saStartContinuousButler();

    stage.onclick = (e) => {
        e.stopPropagation();
        window.saTriggerButlerSlide();
    };
}

// Flash Sale Countdown Timer
function initCountdown() {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 18); // set 18 hours count down from first visit

    const updateTimer = () => {
        const now = new Date().getTime();
        const diff = targetDate.getTime() - now;

        const hoursElement = document.getElementById('hours') || document.getElementById('cdH');
        const minutesElement = document.getElementById('minutes') || document.getElementById('cdM');
        const secondsElement = document.getElementById('seconds') || document.getElementById('cdS');

        if (!hoursElement) return;

        if (diff <= 0) {
            // reset timer to keep live shop alive
            targetDate.setHours(targetDate.getHours() + 18);
            return;
        }

        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    };

    if (document.getElementById('hours') || document.getElementById('cdH')) {
        updateTimer();
        setInterval(updateTimer, 1000);
    }
}

// Cart Operation Helpers
function addToCart(productId, quantity = 1, silent = false) {
    // Auth guard: must be logged in to add to cart
    if (!USER_STATE.profile) {
        window.showLoginRequiredModal();
        return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            price: product.discountPrice,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    localStorage.setItem('sathe_achi_cart', JSON.stringify(cart));
    updateBadges();

    // Sync to Supabase DB
    const finalQty = existing ? existing.quantity : quantity;
    syncCartItemToDB(productId, finalQty);

    // Cart icon bounce animation — Apple haptic-style feedback
    const cartIcons = document.querySelectorAll('a[href="cart.html"].sa-icon-btn, a[title="Cart"].sa-icon-btn, a[href="cart.html"].sa-bn-item');
    cartIcons.forEach(icon => {
        icon.classList.remove('cart-bounce-anim');
        void icon.offsetWidth; // force reflow to restart animation
        icon.classList.add('cart-bounce-anim');
        setTimeout(() => icon.classList.remove('cart-bounce-anim'), 700);
    });
    
    if (!silent) {
        showToast(`Added "${product.title}" to cart successfully!`, 'success');
    }
}

function triggerAtcFeedback(btn, productId) {
    addToCart(productId);
    if (USER_STATE.profile && btn) {
        const origContent = btn.innerHTML;
        btn.classList.add('added');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = origContent;
        }, 1200);
    }
}
window.triggerAtcFeedback = triggerAtcFeedback;

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('sathe_achi_cart', JSON.stringify(cart));
    updateBadges();
    initCartPage(); // Re-render if on cart page
    showToast("Product removed from shopping cart.", "success");

    // Sync to Supabase DB
    syncCartItemToDB(productId, 0, true);
}

function updateCartQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    localStorage.setItem('sathe_achi_cart', JSON.stringify(cart));
    updateBadges();
    initCartPage(); // Re-render

    // Sync to Supabase DB
    syncCartItemToDB(productId, item.quantity);
}

// Sync cart item to Supabase database
async function syncCartItemToDB(productId, quantity, isDelete = false) {
    if (!supabaseClient || !USER_STATE.profile) return;
    try {
        const userId = USER_STATE.profile.id;
        if (isDelete) {
            await supabaseClient.from('cart_items').delete().eq('user_id', userId).eq('product_id', productId);
        } else {
            const { data: existing, error: fetchErr } = await supabaseClient
                .from('cart_items')
                .select('id')
                .eq('user_id', userId)
                .eq('product_id', productId)
                .maybeSingle();
            
            if (fetchErr) throw fetchErr;

            if (existing) {
                const { error: updateErr } = await supabaseClient
                    .from('cart_items')
                    .update({ quantity })
                    .eq('id', existing.id);
                if (updateErr) throw updateErr;
            } else {
                const { error: insertErr } = await supabaseClient
                    .from('cart_items')
                    .insert({ user_id: userId, product_id: productId, quantity });
                if (insertErr) throw insertErr;
            }
        }
    } catch (err) {
        console.error("Failed to sync cart item to DB:", err);
    }
}

// Add/Remove from Wishlist
async function toggleWishlist(productId, btnElement) {
    if (!supabaseClient) return;

    if (!USER_STATE.profile) {
        window.showLoginRequiredModal();
        return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (USER_STATE.profile) {
        const userId = USER_STATE.profile.id;
        try {
            const { data: existing } = await supabaseClient.from('wishlist_items').select('id').eq('user_id', userId).eq('product_id', productId).maybeSingle();
            if (existing) {
                const { error } = await supabaseClient.from('wishlist_items').delete().eq('id', existing.id);
                if (error) throw error;
                if (btnElement) {
                    btnElement.classList.remove('active');
                    btnElement.innerHTML = `<i class="fa-regular fa-heart"></i>`;
                }
                showToast(`Removed "${product.title}" from your wishlist.`, 'success');
            } else {
                const { error } = await supabaseClient.from('wishlist_items').insert([{ user_id: userId, product_id: productId }]);
                if (error) throw error;
                if (btnElement) {
                    btnElement.classList.add('active');
                    btnElement.innerHTML = `<i class="fa-solid fa-heart" style="color: #ef4444;"></i>`;
                }
                showToast(`Added "${product.title}" to your wishlist!`, 'success');
            }
        } catch(err) {
            console.error(err);
            showToast("Failed to update wishlist", "error");
        }
    } else {
        const idx = wishlist.indexOf(productId);
        if (idx > -1) {
            wishlist.splice(idx, 1);
            if (btnElement) {
                btnElement.classList.remove('active');
                btnElement.innerHTML = `<i class="fa-regular fa-heart"></i>`;
            }
            showToast(`Removed from your wishlist.`, 'success');
        } else {
            wishlist.push(productId);
            if (btnElement) {
                btnElement.classList.add('active');
                btnElement.innerHTML = `<i class="fa-solid fa-heart" style="color: #ef4444;"></i>`;
            }
            showToast(`Added to your wishlist!`, 'success');
        }
        localStorage.setItem('sathe_achi_wishlist', JSON.stringify(wishlist));
    }
}

// Star rating HTML helper
function starsHtml(r) {
    const f = Math.floor(r);
    const h = r % 1 >= 0.5 ? 1 : 0;
    let s = '';
    for (let i = 0; i < f; i++) s += '<i class="fa-solid fa-star"></i>';
    if (h) s += '<i class="fa-solid fa-star-half-stroke"></i>';
    const remaining = 5 - f - h;
    for (let i = 0; i < remaining; i++) s += '<i class="fa-regular fa-star"></i>';
    return s;
}

// Create product card element standard template
function createProductCardHTML(p) {
    const isWishlisted = wishlist.includes(p.id);
    const wishlistIcon = isWishlisted 
        ? `<i class="fa-solid fa-heart" style="color: #ef4444;"></i>` 
        : `<i class="fa-regular fa-heart"></i>`;
    const wishlistClass = isWishlisted ? 'active' : '';
    
    const origPrice = parseFloat(p.originalPrice) || 0;
    const discPrice = parseFloat(p.discountPrice) || origPrice;
    const discPercentage = origPrice > discPrice ? Math.round(((origPrice - discPrice) / origPrice) * 100) : 0;

    let cleanTitle = (p.title || '').trim();
    if (cleanTitle.includes('\n')) cleanTitle = cleanTitle.split('\n')[0].trim();
    if (cleanTitle.length > 70 && cleanTitle.includes('।')) {
        cleanTitle = cleanTitle.split('।')[0].trim();
    }

    const fallbackImg = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop';
    const prodImg = (p.image && !p.image.includes('text=Item')) ? p.image : fallbackImg;
    const revCount = (p.reviewsCount !== undefined && p.reviewsCount !== null) 
        ? p.reviewsCount 
        : ((p.reviews_count !== undefined && p.reviews_count !== null) ? p.reviews_count : 0);

    return `
        <div class="sa-prod-card" onclick="location.href='product.html?id=${p.id}'">
          <div class="sa-pc-top">
            ${discPercentage > 0 ? `<span class="sa-disc-tag">-${discPercentage}%</span>` : ''}
            <button class="sa-wish-tag ${wishlistClass}" onclick="event.stopPropagation(); toggleWishlist('${p.id}', this)">${wishlistIcon}</button>
            <div class="sa-pc-img"><img src="${prodImg}" alt="${cleanTitle.replace(/"/g, '&quot;')}" loading="lazy"></div>
          </div>
          <div class="sa-pc-title" title="${cleanTitle.replace(/"/g, '&quot;')}">${cleanTitle}</div>
          <div class="sa-pc-stars">
            ${starsHtml(p.rating || 5.0)}
            <span>(${revCount})</span>
          </div>
          <div class="sa-pc-price">
            <span class="sa-pc-now">৳${discPrice.toLocaleString()}</span>
            ${origPrice > discPrice ? `<span class="sa-pc-was">৳${origPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="sa-atc-btn" style="width:100%;padding:9px;border:none;border-radius:10px;background:rgba(255,107,0,0.09);color:var(--primary);font-weight:700;font-size:12px;cursor:pointer;margin-top:8px;transition:all 0.25s;" onclick="event.stopPropagation();triggerAtcFeedback(this, '${p.id}')">
            <i class="fa-solid fa-plus"></i> Add to Cart
          </button>
        </div>
    `;
}

// Global Active Category Nav Auto-Syncer (Rich Golden Highlight)
function syncActiveCategoryNav() {
    const navItems = document.querySelectorAll('.sa-cnav-item, .sa-dn-item');
    if (!navItems.length) return;

    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const slug = (params.get('slug') || params.get('category') || '').toLowerCase().trim();

    navItems.forEach(item => item.classList.remove('active'));

    let matched = false;
    if (slug) {
        navItems.forEach(item => {
            const href = (item.getAttribute('href') || '').toLowerCase();
            const text = item.textContent.trim().toLowerCase();
            if (href.includes(`slug=${slug}`) || href.includes(`category=${slug}`) || text === slug) {
                item.classList.add('active');
                matched = true;
            }
        });
    }

    if (!matched) {
        if (path.endsWith('index.html') || path === '/' || path.endsWith('/daraj/') || path.endsWith('/daraj') || path.endsWith('daraj/index.html')) {
            navItems.forEach(item => {
                const href = (item.getAttribute('href') || '').toLowerCase();
                const text = item.textContent.trim().toLowerCase();
                if (href === 'index.html' || href === '/' || text === 'home') {
                    item.classList.add('active');
                }
            });
        }
    }
}
window.syncActiveCategoryNav = syncActiveCategoryNav;

// Helper: Modern Category Vector SVGs with dynamic gradients
function getCategoryIconSVG(catName, slug) {
    const key = (catName || slug || '').toLowerCase();
    if (key.includes('fash') || key.includes('cloth')) {
        return {
            bg: 'linear-gradient(135deg, #ff7675 0%, #e84393 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.5a2 2 0 001.32 1.57L6 11.5V20a2 2 0 002 2h8a2 2 0 002-2v-8.5l1.82-.74a2 2 0 001.32-1.57l.58-3.5a2 2 0 00-1.34-2.23z"></path></svg>`
        };
    }
    if (key.includes('elec') || key.includes('gadg')) {
        return {
            bg: 'linear-gradient(135deg, #0984e3 0%, #00cec9 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
        };
    }
    if (key.includes('mob') || key.includes('phone')) {
        return {
            bg: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
        };
    }
    if (key.includes('watch') || key.includes('clock')) {
        return {
            bg: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.85 4.65h-7.32l-.85-4.65"></path><path d="M7.49 6.65l.85-4.65h7.32l.85 4.65"></path></svg>`
        };
    }
    if (key.includes('beaut') || key.includes('cosm')) {
        return {
            bg: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`
        };
    }
    if (key.includes('groc') || key.includes('food')) {
        return {
            bg: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`
        };
    }
    if (key.includes('shoe') || key.includes('foot')) {
        return {
            bg: 'linear-gradient(135deg, #e17055 0%, #d63031 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"></path><rect x="2" y="16" width="20" height="5" rx="2"></rect><circle cx="8" cy="13" r="1"></circle><circle cx="12" cy="13" r="1"></circle></svg>`
        };
    }
    if (key.includes('home') || key.includes('furn')) {
        return {
            bg: 'linear-gradient(135deg, #d35400 0%, #e67e22 100%)',
            svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"></path><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path><line x1="4" y1="18" x2="4" y2="21"></line><line x1="20" y1="18" x2="20" y2="21"></line></svg>`
        };
    }
    return {
        bg: 'linear-gradient(135deg, #ff6b00 0%, #ff8800 100%)',
        svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`
    };
}

function loadHomepageProducts() {
    // 1. Render Categories (Stationary Dual-Side Wings: 4 Left, 4 Right around Center Bridge)
    const sideCatsLeft = document.getElementById('saCatsSideLeft');
    const sideCatsRight = document.getElementById('saCatsSideRight');
    const catsGrid = document.getElementById('saCatsGrid');

    if (CATEGORIES.length > 0) {
        const activeCats = [...CATEGORIES].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

        const renderCatCard = (c) => {
            const iconMeta = getCategoryIconSVG(c.name, c.slug);
            return `
              <a href="category.html?slug=${encodeURIComponent(c.slug)}" class="sa-cat-card" title="${c.name}">
                <div class="sa-cat-circle" style="background: ${iconMeta.bg};">
                  ${iconMeta.svg}
                </div>
                <span>${c.name}</span>
              </a>
            `;
        };

        if (sideCatsLeft) {
            const leftCats = activeCats.slice(0, 4);
            sideCatsLeft.innerHTML = leftCats.map(renderCatCard).join('');
        }
        if (sideCatsRight) {
            const rightCats = activeCats.slice(4, 8);
            sideCatsRight.innerHTML = rightCats.map(renderCatCard).join('');
        }
        if (catsGrid) {
            catsGrid.innerHTML = activeCats.map(renderCatCard).join('');
        }
    }

    // 2. Render Flash Sale (with PC 3D Downward Curve Auto-Slider)
    const flashSlider = document.getElementById('saFlashSlider');
    if (flashSlider) {
        let flashProducts = PRODUCTS.filter(p => p.isFlashSale);
        if (flashProducts.length === 0 && PRODUCTS.length > 0) {
            flashProducts = PRODUCTS.slice(0, 8);
        }

        if (flashProducts.length === 0) {
            flashSlider.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);width:100%;"><p>No flash sale items available.</p></div>';
        } else {
            // Repeat list on desktop so it seamlessly loops without any gap
            const repeatedProducts = flashProducts.length < 12 
                ? [...flashProducts, ...flashProducts, ...flashProducts] 
                : [...flashProducts, ...flashProducts];

            flashSlider.innerHTML = repeatedProducts.map(p => {
                const isWishlisted = wishlist.includes(p.id);
                const wishlistIcon = isWishlisted 
                    ? `<i class="fa-solid fa-heart" style="color: #ef4444;"></i>` 
                    : `<i class="fa-regular fa-heart"></i>`;
                const wishlistClass = isWishlisted ? 'active' : '';
                const origP = parseFloat(p.originalPrice) || 0;
                const discP = parseFloat(p.discountPrice) || origP;
                const discPercentage = origP > discP ? Math.round(((origP - discP) / origP) * 100) : 0;
                return `
                  <div class="sa-prod-card" onclick="location.href='product.html?id=${p.id}'">
                    <div class="sa-pc-top">
                      ${discPercentage > 0 ? `<span class="sa-disc-tag">-${discPercentage}%</span>` : ''}
                      <button class="sa-wish-tag ${wishlistClass}" onclick="event.stopPropagation(); toggleWishlist('${p.id}', this)">${wishlistIcon}</button>
                      <div class="sa-pc-img"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
                    </div>
                    <div class="sa-pc-title">${p.title}</div>
                    <div class="sa-pc-stars">${starsHtml(p.rating)}<span>(${p.reviewsCount})</span></div>
                    <div class="sa-pc-price" style="margin-bottom:8px;">
                      <span class="sa-pc-now" style="color:#ff3b30;">৳${discP.toLocaleString()}</span>
                      ${origP > discP ? `<span class="sa-pc-was">৳${origP.toLocaleString()}</span>` : ''}
                    </div>
                    <button style="width:100%;padding:9px;border:none;border-radius:10px;background:rgba(255,107,0,0.09);color:var(--primary);font-weight:700;font-size:12px;cursor:pointer;" onclick="event.stopPropagation();addToCart('${p.id}')">
                      <i class="fa-solid fa-plus"></i> Add
                    </button>
                  </div>
                `;
            }).join('');

            // Initialize 3D Downward Curved Auto-Slider Engine
            initFlashSale3DCarousel(flashSlider);
        }
    }

    function initFlashSale3DCarousel(slider) {
        if (!slider) return;
        const container = slider.closest('.sa-flash-slider-container') || slider.parentElement;
        if (!container) return;

        const prevBtn = container.querySelector('.sa-flash-prev') || document.getElementById('saFlashPrev');
        const nextBtn = container.querySelector('.sa-flash-next') || document.getElementById('saFlashNext');

        let currentScroll = slider._lastScroll || 0;
        let baseSpeed = 3.2; // Fast, lively, ultra-silky auto-glide
        let currentSpeed = baseSpeed;
        let isHovered = false;
        let isDragging = false;
        let startX = 0;
        let lastDragX = 0;
        let dragDistance = 0;
        let dragHistory = [];

        // Precalculated geometry - ZERO getBoundingClientRect() inside animation frame loop!
        let cardWidth = 228;
        let gap = 24;
        let stride = 252;
        let containerWidth = container.offsetWidth || 1240;
        let halfContainerW = containerWidth / 2;
        let totalCards = slider.children.length;
        let totalTrackWidth = totalCards * stride;
        let halfWidth = totalTrackWidth / 2;

        const updateMeasurements = () => {
            containerWidth = container.offsetWidth || 1240;
            halfContainerW = containerWidth / 2;
            if (slider.children.length > 0) {
                const first = slider.children[0];
                cardWidth = first.offsetWidth || 228;
                const style = window.getComputedStyle(slider);
                gap = parseFloat(style.gap) || 24;
                stride = cardWidth + gap;
                totalCards = slider.children.length;
                totalTrackWidth = totalCards * stride;
                halfWidth = totalTrackWidth / 2;
            }
        };
        updateMeasurements();

        const update3DTransforms = () => {
            if (window.innerWidth < 992) {
                slider.style.transform = '';
                Array.from(slider.children).forEach(c => c.style.transform = '');
                return;
            }

            slider.style.transform = `translate3d(${-currentScroll}px, 0, 0)`;

            const cards = slider.children;
            for (let i = 0; i < totalCards; i++) {
                const card = cards[i];
                // Pure Math Projection - 0 forced reflows, 0 DOM reads!
                let dist = (i * stride + cardWidth / 2 - currentScroll) - halfContainerW;
                
                // Wrap dist smoothly across infinite loop boundary
                if (halfWidth > 0) {
                    while (dist > halfWidth) dist -= totalTrackWidth;
                    while (dist < -halfWidth) dist += totalTrackWidth;
                }

                const ratio = Math.max(-1.5, Math.min(1.5, dist / halfContainerW));
                const absRatio = Math.abs(ratio);

                // Smooth 3D Downward Curve without clipping:
                const dipY = (1 - Math.pow(absRatio, 1.55)) * 34 - 6;

                // Pure GPU Translation - No 3D rotation shimmering or subpixel quantization jitter
                card.style.transform = `translate3d(0, ${dipY}px, 0)`;
            }
        };

        let lastTime = performance.now();
        const animateLoop = (now) => {
            if (window.innerWidth >= 992) {
                if (!lastTime) lastTime = now;
                const dt = Math.min(32, Math.max(8, now - lastTime));
                lastTime = now;
                const timeScale = dt / 16.667; // Normalized to 60fps standard

                if (!isDragging) {
                    const flickThreshold = Math.max(3.2, baseSpeed * 1.4);
                    if (Math.abs(currentSpeed) > flickThreshold) {
                        currentSpeed *= Math.pow(0.94, timeScale);
                        currentScroll += currentSpeed * timeScale;
                    } else {
                        const targetSpeed = isHovered ? 0 : baseSpeed;
                        currentSpeed += (targetSpeed - currentSpeed) * Math.min(1, 0.08 * timeScale);
                        currentScroll += currentSpeed * timeScale;
                    }

                    slider._lastScroll = currentScroll;

                    if (halfWidth > 0) {
                        while (currentScroll >= halfWidth) currentScroll -= halfWidth;
                        while (currentScroll < 0) currentScroll += halfWidth;
                    }
                }
                update3DTransforms();
            } else {
                lastTime = now;
            }
            slider._saFlashRaf = requestAnimationFrame(animateLoop);
        };

        // Hover pause only on actual product cards, not empty container areas
        container.addEventListener('mousemove', (e) => {
            if (e.target.closest('.sa-prod-card')) {
                isHovered = true;
            } else {
                isHovered = false;
            }
        });
        container.addEventListener('mouseleave', () => { 
            isHovered = false; 
            if (isDragging) finishDrag(lastDragX);
        });

        // Mouse Drag / Grab with Flick Momentum
        const finishDrag = (endX) => {
            if (!isDragging) return;
            isDragging = false;
            const now = performance.now();
            if (dragHistory.length >= 2) {
                const oldest = dragHistory[0];
                const timeDelta = Math.max(16, now - oldest.time);
                const distDelta = oldest.x - endX;
                // Compute momentum velocity (normalized to 60fps)
                let flickVelocity = (distDelta / timeDelta) * 16.6;
                // Cap max flick speed
                flickVelocity = Math.max(-42, Math.min(42, flickVelocity));
                if (Math.abs(flickVelocity) > 1.2) {
                    currentSpeed = flickVelocity;
                }
            }
            dragHistory = [];
        };

        slider.addEventListener('mousedown', (e) => {
            if (window.innerWidth < 992) return;
            isDragging = true;
            startX = e.clientX;
            lastDragX = e.clientX;
            dragDistance = 0;
            currentSpeed = 0;
            dragHistory = [{ x: e.clientX, time: performance.now() }];
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const now = performance.now();
            const deltaX = e.clientX - lastDragX;
            lastDragX = e.clientX;
            dragDistance += Math.abs(deltaX);
            currentScroll -= deltaX;

            dragHistory.push({ x: e.clientX, time: now });
            while (dragHistory.length > 1 && now - dragHistory[0].time > 120) {
                dragHistory.shift();
            }

            if (halfWidth > 0) {
                while (currentScroll >= halfWidth) currentScroll -= halfWidth;
                while (currentScroll < 0) currentScroll += halfWidth;
            }
        });

        window.addEventListener('mouseup', (e) => {
            finishDrag(e.clientX);
        });

        // Suppress accidental link click if user was dragging
        slider.addEventListener('click', (e) => {
            if (dragDistance > 8) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        // Navigation Chevron Clicks with smooth physics impulse
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSpeed = -22;
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSpeed = 22;
            });
        }

        // Keyboard Arrow Navigation (Desktop Only)
        window.addEventListener('keydown', (e) => {
            if (window.innerWidth < 992) return;
            const rect = container.getBoundingClientRect();
            if (rect.bottom > 50 && rect.top < window.innerHeight - 50) {
                if (e.key === 'ArrowRight') {
                    currentSpeed = 18;
                } else if (e.key === 'ArrowLeft') {
                    currentSpeed = -18;
                }
            }
        });

        // Interactive 3D Card Tilt & Holographic Specular Flare
        Array.from(slider.children).forEach(card => {
            if (card._tiltAttached) return;
            card._tiltAttached = true;
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 992) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--sheen-x', `${(x / rect.width * 100).toFixed(1)}%`);
                card.style.setProperty('--sheen-y', `${(y / rect.height * 100).toFixed(1)}%`);

                // Subtle 3D tilt
                const tiltX = ((rect.height / 2 - y) / (rect.height / 2)) * 4.5;
                const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 4.5;
                card._microTiltX = tiltX;
                card._microTiltY = tiltY;
            });
            card.addEventListener('mouseleave', () => {
                card._microTiltX = 0;
                card._microTiltY = 0;
                card.style.removeProperty('--sheen-x');
                card.style.removeProperty('--sheen-y');
            });
        });

        window.addEventListener('resize', () => {
            updateMeasurements();
            if (window.innerWidth < 992) {
                slider.style.transform = '';
                Array.from(slider.children).forEach(c => c.style.transform = '');
            }
        });

        if (slider._saFlashRaf) cancelAnimationFrame(slider._saFlashRaf);
        if (window._saFlashRaf) cancelAnimationFrame(window._saFlashRaf);
        setTimeout(updateMeasurements, 400);
        slider._saFlashRaf = requestAnimationFrame(animateLoop);
    }

    // Helper: render a homepage grid section with Load More
    function renderHomepageSection(gridId, products, totalFilter) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        if (products.length === 0) {
            grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);grid-column:1/-1;"><p>No items available.</p></div>';
            return;
        }
        grid.innerHTML = products.map(p => createProductCardHTML(p)).join('');

        // Add Load More button if there are more products
        const wrap = grid.closest('section');
        if (!wrap) return;
        const existingBtn = wrap.querySelector('.sa-load-more-btn');
        if (existingBtn) existingBtn.remove();

        if (products.length < totalFilter.length) {
            const btn = document.createElement('div');
            btn.style.cssText = 'text-align:center;margin-top:24px;';
            btn.innerHTML = `<button class="sa-load-more-btn" style="padding:12px 32px;background:var(--primary);color:#fff;border:none;border-radius:999px;font-weight:700;font-size:14px;cursor:pointer;transition:opacity 0.2s;" onclick="this.disabled=true;this.textContent='Loading...';loadMoreSection('${gridId}')">
              Load More <i class="fa-solid fa-chevron-down"></i>
            </button>`;
            wrap.querySelector('.sa-wrap').appendChild(btn);
        }
    }

    // 3. Render Trending (with smart fallback so section is never empty)
    let trendingAll = PRODUCTS.filter(p => p.isTrending);
    if (trendingAll.length === 0 && PRODUCTS.length > 0) {
        trendingAll = [...PRODUCTS].sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }
    renderHomepageSection('saTrendingGrid', trendingAll.slice(0, 8), trendingAll);

    // 4. Render Recommended (with smart fallback so section is never empty)
    let recommendedAll = PRODUCTS.filter(p => p.rating >= 4.5 || p.isBestSeller);
    if (recommendedAll.length === 0 && PRODUCTS.length > 0) {
        recommendedAll = [...PRODUCTS].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    renderHomepageSection('saRecommendedGrid', recommendedAll.slice(0, 8), recommendedAll);

    // 5. Render Featured (with smart fallback so section is never empty)
    let featuredAll = PRODUCTS.filter(p => p.featured);
    if (featuredAll.length === 0 && PRODUCTS.length > 0) {
        featuredAll = PRODUCTS.slice(0, 8);
    }
    renderHomepageSection('saFeaturedGrid', featuredAll.slice(0, 8), featuredAll);
}

// Load More for homepage sections
window._homepageOffsets = { saTrendingGrid: 8, saRecommendedGrid: 8, saFeaturedGrid: 8 };
window.loadMoreSection = function(gridId) {
    const offset = window._homepageOffsets[gridId] || 8;
    const grid = document.getElementById(gridId);
    if (!grid) return;

    let pool = [];
    if (gridId === 'saTrendingGrid') {
        pool = PRODUCTS.filter(p => p.isTrending);
        if (pool.length === 0) pool = [...PRODUCTS].sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (gridId === 'saRecommendedGrid') {
        pool = PRODUCTS.filter(p => p.rating >= 4.5 || p.isBestSeller);
        if (pool.length === 0) pool = [...PRODUCTS].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (gridId === 'saFeaturedGrid') {
        pool = PRODUCTS.filter(p => p.featured);
        if (pool.length === 0) pool = PRODUCTS;
    }

    const nextBatch = pool.slice(offset, offset + 8);
    if (nextBatch.length === 0) return;

    nextBatch.forEach(p => {
        grid.insertAdjacentHTML('beforeend', createProductCardHTML(p));
    });

    window._homepageOffsets[gridId] = offset + 8;

    // Remove Load More if exhausted
    const wrap = grid.closest('section');
    if (wrap) {
        const btn = wrap.querySelector('.sa-load-more-btn');
        if (btn) {
            if (offset + 8 >= pool.length) {
                btn.closest('div').remove();
            } else {
                btn.disabled = false;
                btn.innerHTML = 'Load More <i class="fa-solid fa-chevron-down"></i>';
            }
        }
    }
};


// Product Details dynamic rendering
function initProductDetailsPage() {
    const detailsWrap = document.getElementById('productDetailsWrap');
    if (!detailsWrap) return;

    // Extract product ID from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('id'); // Using string for UUID
    const p = PRODUCTS.find(prod => prod.id == pid) || PRODUCTS[0];
    
    if (!p) {
        detailsWrap.innerHTML = `<h2>Product not found</h2>`;
        return;
    }

    // Render details
    const discPercentage = Math.round(((p.originalPrice - p.discountPrice) / p.originalPrice) * 100);

    detailsWrap.innerHTML = `
        <div class="product-detail-wrapper" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; margin-top: 20px;">
            <!-- Gallery & Zoom Area -->
            <div class="product-detail-gallery">
                <div class="main-image-container" style="position: relative; border-radius: var(--radius-lg); overflow: hidden; background-color: var(--bg-white); border: 1px solid var(--border-color); height: 420px; display: flex; align-items: center; justify-content: center;">
                    <img id="mainProductImage" src="${p.image}" alt="${p.title}" style="max-height: 100%; object-fit: contain; width: 100%; transition: transform 0.3s ease;">
                    <span class="badge badge-sale" style="position: absolute; top: 15px; left: 15px; font-size: 0.85rem; padding: 6px 12px;">-${discPercentage}% OFF</span>
                </div>
                <div class="thumbnail-list" style="display: flex; gap: 10px; margin-top: 15px; overflow-x: auto;">
                    <div class="thumb-item active" style="width: 70px; height: 70px; border: 2px solid var(--primary); border-radius: var(--radius-sm); overflow: hidden; cursor: pointer;">
                        <img src="${p.image}" alt="thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="thumb-item" style="width: 70px; height: 70px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden; cursor: pointer;">
                        <img src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop" alt="thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="thumb-item" style="width: 70px; height: 70px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden; cursor: pointer;">
                        <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop" alt="thumbnail" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>
            </div>

            <!-- Details Options Panel -->
            <div class="product-detail-options" style="display: flex; flex-direction: column; gap: 15px;">
                <span class="badge badge-new" style="align-self: flex-start;">Verified Seller</span>
                <h1 style="font-size: 2.2rem; font-weight: 800;">${p.title}</h1>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="product-rating" style="margin-bottom: 0;">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <span>(${p.reviewsCount} Customer Reviews)</span>
                    </div>
                    <span style="color: var(--text-light);">|</span>
                    <span style="font-size: 0.9rem; font-weight: 600; color: #10b981;">In Stock</span>
                </div>

                <div style="background-color: var(--bg-white); border: 1px solid var(--border-color); padding: 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
                    <div style="display: flex; align-items: baseline; gap: 15px;">
                        <span style="font-size: 2rem; font-weight: 800; color: var(--primary);">৳${p.discountPrice.toLocaleString()}</span>
                        <span style="font-size: 1.2rem; text-decoration: line-through; color: var(--text-muted);">৳${p.originalPrice.toLocaleString()}</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Exclusive online price from authorized সাথে আছি supplier.</p>
                </div>

                <div>
                    <h3 style="font-size: 1.1rem; margin-bottom: 8px;">Product Description:</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${p.description}</p>
                </div>

                <div style="display: flex; gap: 15px; align-items: center; margin-top: 15px;">
                    <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-md); background-color: var(--bg-white); height: 46px;">
                        <button id="qtyDecrease" style="padding: 10px 15px; font-weight: 700;">-</button>
                        <input id="qtyInput" type="number" value="1" min="1" style="width: 50px; text-align: center; border: none; font-weight: 700; height: 100%; pointer-events: none;">
                        <button id="qtyIncrease" style="padding: 10px 15px; font-weight: 700;">+</button>
                    </div>
                    
                    <button id="buyNowBtn" class="btn btn-primary" style="flex: 1; height: 46px;">Buy Now</button>
                    <button id="addToCartDetailBtn" class="btn btn-outline" style="height: 46px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                </div>

                <!-- Trusted Badges Info -->
                <div style="display: flex; gap: 20px; border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted);">
                        <i class="fa-solid fa-truck" style="color: var(--primary); font-size: 1.1rem;"></i>
                        <span>Fast delivery all over BD</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted);">
                        <i class="fa-solid fa-rotate-left" style="color: var(--primary); font-size: 1.1rem;"></i>
                        <span>7 Days Return Policy</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-muted);">
                        <i class="fa-solid fa-shield" style="color: var(--primary); font-size: 1.1rem;"></i>
                        <span>100% Genuine Brand</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Hook Gallery zoom and Thumbnail switching
    const mainImg = document.getElementById('mainProductImage');
    const mainImgContainer = document.querySelector('.main-image-container');
    const thumbnails = document.querySelectorAll('.thumb-item');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => {
                t.classList.remove('active');
                t.style.borderColor = 'var(--border-color)';
            });
            thumb.classList.add('active');
            thumb.style.borderColor = 'var(--primary)';
            mainImg.src = thumb.querySelector('img').src;
        });
    });

    // Zoom Effect on hover
    if (mainImgContainer && mainImg) {
        mainImgContainer.addEventListener('mousemove', (e) => {
            const rect = mainImgContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            mainImg.style.transformOrigin = `${x}px ${y}px`;
            mainImg.style.transform = 'scale(1.5)';
        });

        mainImgContainer.addEventListener('mouseleave', () => {
            mainImg.style.transform = 'scale(1)';
        });
    }

    // Bind Detail Quantity Buttons
    const qtyInput = document.getElementById('qtyInput');
    const qtyDecrease = document.getElementById('qtyDecrease');
    const qtyIncrease = document.getElementById('qtyIncrease');

    qtyDecrease.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });

    qtyIncrease.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        qtyInput.value = val + 1;
    });

    // Add To Cart Details action
    const addToCartDetailBtn = document.getElementById('addToCartDetailBtn');
    addToCartDetailBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value) || 1;
        addToCart(p.id, qty);
    });

    // Buy Now Details action
    const buyNowBtn = document.getElementById('buyNowBtn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            if (!USER_STATE.profile) {
                window.showLoginRequiredModal();
                return;
            }
            const qty = parseInt(qtyInput.value) || 1;
            addToCart(p.id, qty, true); // add silently
            window.location.href = 'checkout.html';
        });
    }

    // Load Related Products Slider below detail page
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid) {
        const related = PRODUCTS.filter(prod => prod.category === p.category && prod.id !== p.id);
        const displays = related.length > 0 ? related : PRODUCTS.slice(0, 4);
        relatedGrid.innerHTML = displays.map(prod => createProductCardHTML(prod)).join('');
    }
}

// Shopping Cart Page Operations
function initCartPage() {
    const cartItemsWrap = document.getElementById('cartItemsWrap');
    const cartSummaryWrap = document.getElementById('cartSummaryWrap');
    if (!cartItemsWrap) return;

    if (cart.length === 0) {
        cartItemsWrap.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; background-color: var(--bg-white); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <i class="fa-solid fa-cart-flatbed" style="font-size: 4rem; color: var(--text-light); margin-bottom: 20px;"></i>
                <h2 style="font-size: 1.8rem; margin-bottom: 10px;">Your shopping cart is empty!</h2>
                <p style="color: var(--text-muted); margin-bottom: 25px;">Browse thousands of authentic products at amazing prices.</p>
                <a href="index.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        if (cartSummaryWrap) {
            cartSummaryWrap.style.display = 'none';
        }
        return;
    }

    if (cartSummaryWrap) {
        cartSummaryWrap.style.display = 'block';
    }

    // Render cart items lists
    cartItemsWrap.innerHTML = cart.map(item => `
        <div style="display: flex; gap: 20px; align-items: center; background-color: var(--bg-white); border: 1px solid var(--border-color); padding: 15px; border-radius: var(--radius-md); margin-bottom: 15px; position: relative;">
            <div style="width: 80px; height: 80px; border-radius: var(--radius-sm); overflow: hidden; background-color: #f1f5f9; flex-shrink: 0;">
                <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="flex-grow: 1;">
                <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">${item.category}</span>
                <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px;"><a href="product.html?id=${item.id}">${item.title}</a></h4>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                        <button onclick="updateCartQuantity(${item.id}, 'decrease')" style="padding: 5px 12px; font-weight: 700;">-</button>
                        <span style="padding: 5px 12px; font-weight: 700; font-size: 0.9rem;">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 'increase')" style="padding: 5px 12px; font-weight: 700;">+</button>
                    </div>
                    <div style="font-weight: 800; color: var(--primary); font-size: 1.1rem;">
                        ৳${(item.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="position: absolute; top: 15px; right: 15px; color: var(--text-light); font-size: 1.1rem;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='var(--text-light)'">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    // Render Summaries calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeThreshold = parseFloat(window.siteSettings?.['shipping_free_threshold']) || 15000;
    const baseShipping = parseFloat(window.siteSettings?.['shipping_inside_dhaka']) || 120;
    const couponType = localStorage.getItem('sathe_achi_coupon_type');
    const shipping = (couponType === 'free_shipping' || (freeThreshold > 0 && subtotal >= freeThreshold)) ? 0 : baseShipping;
    const discount = parseFloat(localStorage.getItem('sathe_achi_coupon_discount')) || 0;
    const finalTotal = subtotal + shipping - discount;

    const summaryContainer = document.getElementById('cartSummaryContent');
    if (summaryContainer) {
        summaryContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 12px;">
                <span>Subtotal</span>
                <span>৳${subtotal.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 12px;">
                <span>Shipping Fee</span>
                <span>${shipping === 0 ? '<span style="color:#10b981; font-weight:700;">FREE</span>' : `৳${shipping}`}</span>
            </div>
            ${discount > 0 ? `
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 12px; color: #10b981; font-weight:700;">
                <span>Coupon Applied</span>
                <span>-৳${discount.toLocaleString()}</span>
            </div>
            ` : ''}
            <div style="border-top: 1px solid var(--border-color); margin-top: 15px; padding-top: 15px; display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800;">
                <span>Total Amount</span>
                <span style="color: var(--primary);">৳${finalTotal.toLocaleString()}</span>
            </div>
        `;
    }

    // Coupon Apply Event Bindings
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponInput');
    if (applyCouponBtn && couponInput) {
        applyCouponBtn.onclick = () => {
            const val = couponInput.value.trim().toUpperCase();
            if (val === 'SATHE20') {
                const discAmt = Math.round(subtotal * 0.20);
                localStorage.setItem('sathe_achi_coupon_discount', discAmt);
                showToast("20% Discount Coupon applied successfully!", "success");
                initCartPage(); // update display
            } else if (val === 'FREE') {
                localStorage.setItem('sathe_achi_coupon_discount', 100);
                showToast("Coupon applied: Free bonus ৳100 off!", "success");
                initCartPage();
            } else {
                showToast("Invalid Promo Code! Try 'SATHE20' for 20% off.", "error");
            }
        };
    }
}

// Checkout Page details rendering and placing order
function initCheckoutPage() {
    const checkoutSummaryWrap = document.getElementById('checkoutSummaryWrap');
    if (!checkoutSummaryWrap) return;

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Display summary inside checkout sidebar
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeThreshold = parseFloat(window.siteSettings?.['shipping_free_threshold']) || 15000;
    const baseShipping = parseFloat(window.siteSettings?.['shipping_inside_dhaka']) || 120;
    const couponType = localStorage.getItem('sathe_achi_coupon_type');
    const shipping = (couponType === 'free_shipping' || (freeThreshold > 0 && subtotal >= freeThreshold)) ? 0 : baseShipping;
    const discount = parseFloat(localStorage.getItem('sathe_achi_coupon_discount')) || 0;
    const finalTotal = subtotal + shipping - discount;

    const listHtml = cart.map(item => `
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:10px; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
            <span>${item.title} <strong style="color:var(--primary);">x ${item.quantity}</strong></span>
            <span>৳${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    checkoutSummaryWrap.innerHTML = `
        <div style="background-color: var(--bg-white); border:1px solid var(--border-color); padding:20px; border-radius:var(--radius-md); box-shadow:var(--shadow-sm);">
            <h3 style="margin-bottom:15px; font-size:1.15rem;">Order Items Summary</h3>
            ${listHtml}
            <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-top:15px; margin-bottom:8px;">
                <span>Subtotal</span>
                <span>৳${subtotal.toLocaleString()}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:8px;">
                <span>Shipping Fee</span>
                <span>৳${shipping.toLocaleString()}</span>
            </div>
            ${discount > 0 ? `
            <div style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:8px; color:#10b981; font-weight:700;">
                <span>Discount Promo</span>
                <span>-৳${discount.toLocaleString()}</span>
            </div>
            ` : ''}
            <div style="border-top:1px solid var(--border-color); margin-top:12px; padding-top:12px; display:flex; justify-content:space-between; font-size:1.15rem; font-weight:800;">
                <span>Subtotal Price</span>
                <span style="color:var(--primary);">৳${finalTotal.toLocaleString()}</span>
            </div>
            
            <button id="placeOrderBtn" class="btn btn-primary" style="width:100%; margin-top:20px; padding:12px;">
                <i class="fa-solid fa-circle-check"></i> Complete & Place Order
            </button>
        </div>
    `;

    // Register checkout order submit trigger
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const checkoutForm = document.getElementById('checkoutForm');
    if (placeOrderBtn && checkoutForm) {
        placeOrderBtn.onclick = async (e) => {
            e.preventDefault();
            
            if (!USER_STATE.profile && !window.location.href.includes('login.html')) {
                showToast("You must log in to place an order.", "error");
                setTimeout(() => window.location.href = 'login.html', 1500);
                return;
            }

            // Basic form check
            const inputs = checkoutForm.querySelectorAll('input[required], select[required]');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });

            if (!valid) {
                showToast("Please fill in all the required billing/shipping details fields.", "error");
                return;
            }

            const oldText = placeOrderBtn.innerHTML;
            placeOrderBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            placeOrderBtn.disabled = true;

            try {
                const order_number = 'SA-' + Math.floor(100000 + Math.random() * 900000);
                const payment_method = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
                
                // Collect form data
                const shipping_name = document.getElementById('bName').value;
                const shipping_phone = document.getElementById('bPhone').value;
                const shipping_address = document.getElementById('bAddress').value;
                const shipping_district = document.getElementById('bDistrict').value;
                
                const appliedCoupon = localStorage.getItem('sathe_achi_coupon_code') || null;

                // 1. Create Order
                const { data: orderData, error: orderError } = await supabaseClient.from('orders').insert([{
                    user_id: USER_STATE.profile.id,
                    order_number,
                    subtotal,
                    shipping_fee: shipping,
                    discount,
                    total: finalTotal,
                    shipping_name,
                    shipping_phone,
                    shipping_address,
                    shipping_district,
                    payment_method,
                    payment_status: 'pending',
                    order_status: 'pending',
                    coupon_code: appliedCoupon
                }]).select().single();

                if (orderError) throw orderError;

                // 2. Create Order Items
                const orderItems = cart.map(item => ({
                    order_id: orderData.id,
                    product_id: item.id,
                    name: item.title,
                    price: item.price,
                    quantity: item.quantity
                }));

                const { error: itemsError } = await supabaseClient.from('order_items').insert(orderItems);
                if (itemsError) throw itemsError;

                // Increment used_count for coupon if applied
                if (appliedCoupon) {
                    try {
                        await supabaseClient.rpc('increment_coupon_used_count', { coupon_code: appliedCoupon });
                    } catch (cpErr) {
                        console.error("Failed to increment coupon used_count:", cpErr);
                    }
                }

                // Success animation
                showToast(`Order ${order_number} placed successfully!`, "success");
                cart = [];
                localStorage.setItem('sathe_achi_cart', JSON.stringify(cart));
                if (USER_STATE.profile) {
                    await supabaseClient.from('cart_items').delete().eq('user_id', USER_STATE.profile.id);
                }
                localStorage.removeItem('sathe_achi_coupon_code');
                localStorage.removeItem('sathe_achi_coupon_discount');
                localStorage.removeItem('sathe_achi_coupon_type');
                localStorage.removeItem('sathe_achi_coupon_value');
                localStorage.removeItem('sathe_achi_coupon_min_order');
                updateBadges();

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

            } catch (error) {
                console.error(error);
                showToast(error.message || "Failed to place order.", "error");
                placeOrderBtn.innerHTML = oldText;
                placeOrderBtn.disabled = false;
            }
        };
    }
}

// Global Header Scroll Animation — Smart Hide on Scroll Down, Show on Scroll Up
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('saHeader');
    if (header) {
        // Header stays 100% stationary at top with zero layout shift or hide on scroll
        header.style.transform = 'none';
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            header.classList.toggle('scrolled', currentScroll > 20);
            const headerInner = header.querySelector('.sa-header-inner');
            if (headerInner && headerInner.classList.contains('island-active')) {
                headerInner.classList.remove('island-active');
            }
        }, { passive: true });
    }

    // Toggle Profile Dropdown
    const userBtn = document.getElementById('userMenuTrigger');
    const userDropdown = document.getElementById('userDropdown');
    if (userBtn && userDropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
        document.addEventListener('click', () => userDropdown.classList.remove('active'));
    }

    // Update sa-cart-count badges
    const saCartCounts = document.querySelectorAll('.sa-cart-count');
    const cartData = JSON.parse(localStorage.getItem('sathe_achi_cart') || '[]');
    const totalItems = cartData.reduce((s, i) => s + (i.qty || i.quantity || 1), 0);
    saCartCounts.forEach(el => { el.textContent = totalItems; if (totalItems === 0) el.style.display = 'none'; });

    // Sync theme on page load cleanly
    try {
        const savedTheme = localStorage.getItem('sathe_achi_theme') || 'light';
        setTheme(savedTheme);
    } catch(e) {}

    // ── Profile Dropdown (saProfileBtn / saProfileDropdown) ──
    (function() {
        const btn = document.getElementById('saProfileBtn');
        const dropdown = document.getElementById('saProfileDropdown');
        if (!btn || !dropdown) return;

        // Apply immediately from cache without delay
        updateHeaderProfileUI();

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== btn) {
                dropdown.classList.remove('active');
            }
        });

        // Global Header Logout Handler
        const logoutBtn = document.getElementById('saHeaderLogout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.saConfirm('Are you sure you want to log out of your account?', async () => {
                    await window.signOutUser();
                });
            });
        }

        // Re-sync on auth & store load events
        document.addEventListener('storeDataLoaded', () => updateHeaderProfileUI());
        document.addEventListener('authChecked', () => updateHeaderProfileUI());
        window.addEventListener('storage', (e) => {
            if (e.key === 'sathe_achi_user_profile') {
                try {
                    USER_STATE.profile = JSON.parse(e.newValue);
                } catch(err) {
                    USER_STATE.profile = null;
                }
                updateHeaderProfileUI();
            }
        });
    })();



    // Initialize Account Dashboard if on account.html
    initAccountDashboard();
});

// ══════════════════════════════════════════════════
// GLOBAL MODAL SYSTEM (iOS Style)
// ══════════════════════════════════════════════════
window.openModal = function(modalId) {
    if (modalId === 'logoutModal') {
        window.saConfirm('Are you sure you want to log out of your account?', async () => {
            await window.signOutUser();
        });
        return;
    }
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close modal on click outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('sa-modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ══════════════════════════════════════════════════
// ACCOUNT DASHBOARD LOGIC
// ══════════════════════════════════════════════════
function showAuthLoader() {
    if (document.getElementById('sa-auth-loader')) return;
    const loader = document.createElement('div');
    loader.id = 'sa-auth-loader';
    loader.innerHTML = `
        <div class="sa-mo-ring"></div>
        <p style="margin-top: 15px; font-weight: 600; font-family: 'Inter', sans-serif;">Verifying session...</p>
    `;
    document.body.appendChild(loader);
    loader.offsetWidth; // Force reflow
    loader.classList.add('active');
}

function hideAuthLoader() {
    const loader = document.getElementById('sa-auth-loader');
    if (loader) {
        loader.classList.remove('active');
        setTimeout(() => {
            if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 300);
    }
}

// --- NEW REALTIME SUBSCRIPTIONS ENGINE ---
let realtimeChannels = [];

function setupRealtimeSubscriptions(userId) {
    if (!supabaseClient || !userId) return;

    // Clean up existing subscriptions if any
    realtimeChannels.forEach(ch => supabaseClient.removeChannel(ch));
    realtimeChannels = [];

    // Subscribe to public:orders
    const ordersChan = supabaseClient.channel('realtime:orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${userId}` }, async (payload) => {
            console.log('Realtime Order change:', payload);
            await syncDashboardData();
        })
        .subscribe();
    realtimeChannels.push(ordersChan);

    // Subscribe to public:wishlist_items
    const wishlistChan = supabaseClient.channel('realtime:wishlist')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'wishlist_items', filter: `user_id=eq.${userId}` }, async (payload) => {
            console.log('Realtime Wishlist change:', payload);
            await syncDashboardData();
        })
        .subscribe();
    realtimeChannels.push(wishlistChan);

    // Subscribe to public:profiles
    const profilesChan = supabaseClient.channel('realtime:profiles')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, async (payload) => {
            console.log('Realtime Profile change:', payload);
            if (payload.new) {
                USER_STATE.profile.name = payload.new.full_name || 'User';
                USER_STATE.profile.phone = payload.new.phone || '';
                USER_STATE.profile.avatar = payload.new.avatar_url 
                    ? `<img src="${payload.new.avatar_url}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` 
                    : (payload.new.full_name ? payload.new.full_name.charAt(0).toUpperCase() : 'U');
                updateProfileDOM();
            }
        })
        .subscribe();
    realtimeChannels.push(profilesChan);

    // Subscribe to public:addresses
    const addressesChan = supabaseClient.channel('realtime:addresses')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'addresses', filter: `user_id=eq.${userId}` }, async (payload) => {
            console.log('Realtime Address change:', payload);
            await loadAddresses();
        })
        .subscribe();
    realtimeChannels.push(addressesChan);

    // Subscribe to public:notifications
    const notificationsChan = supabaseClient.channel('realtime:notifications')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, async (payload) => {
            console.log('Realtime Notification change:', payload);
            await loadNotifications();
        })
        .subscribe();
    realtimeChannels.push(notificationsChan);
}

// --- NEW SYNC ENGINE ---
async function syncDashboardData() {
    if (!USER_STATE.profile) return;
    const userId = USER_STATE.profile.id;

    try {
        const [ordersRes, wishlistRes] = await Promise.all([
            supabaseClient.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
            supabaseClient.from('wishlist_items').select('product_id').eq('user_id', userId)
        ]);

        const orders = ordersRes.data || [];
        const wishlistItems = wishlistRes.data || [];

        // Update counts
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(o => ['pending', 'confirmed', 'processing', 'shipped'].includes(o.order_status)).length;
        const completedOrders = orders.filter(o => ['delivered', 'completed'].includes(o.order_status)).length;
        const wishlistCount = wishlistItems.length;

        const statTotal = document.getElementById('statTotalOrders');
        const statPending = document.getElementById('statPendingOrders');
        const statCompleted = document.getElementById('statCompletedOrders');
        const statWishlist = document.getElementById('statWishlistCount');

        if (statTotal) statTotal.textContent = totalOrders;
        if (statPending) statPending.textContent = pendingOrders;
        if (statCompleted) statCompleted.textContent = completedOrders;
        if (statWishlist) statWishlist.textContent = wishlistCount;

        const sideOrderCount = document.getElementById('sideNavOrderCount');
        if (sideOrderCount) sideOrderCount.textContent = totalOrders;
        const sideWishlistCount = document.getElementById('sideNavWishlistCount');
        if (sideWishlistCount) sideWishlistCount.textContent = wishlistCount;

        // Render Recent Orders List
        renderOrdersListDashboard(orders);

        // Render Wishlist Scroll Rail
        await renderWishlistRailDashboard(wishlistItems);

    } catch (err) {
        console.error("Error syncing dashboard data:", err);
    }
}

function renderOrdersListDashboard(orders) {
    window._dashboardOrders = orders || [];
    const sideOrderCount = document.getElementById('sideNavOrderCount');
    if (sideOrderCount) sideOrderCount.textContent = (orders || []).length;

    const container = document.getElementById('saRecentOrdersList');
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="sa-empty-state" style="padding:30px 20px; text-align:center; background:rgba(255,255,255,0.7); backdrop-filter:blur(20px); border-radius:16px; border:1px solid rgba(255,255,255,0.5);">
                <div class="sa-empty-icon" style="font-size:32px; margin-bottom:12px; color:var(--primary);"><i class="fa-solid fa-box-open"></i></div>
                <h4 class="sa-empty-title" style="font-size:15px; margin-bottom:6px; font-weight:700; color:#1c1c1e;">No Orders Yet</h4>
                <p class="sa-empty-p" style="font-size:13px; color:#8e8e93; margin-bottom:15px;">Your recent orders will appear here.</p>
                <a href="index.html" class="sa-btn-primary" style="padding:8px 20px; font-size:13px; display:inline-block; width:auto; border-radius:20px; text-decoration:none;">Start Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map(o => {
        const date = new Date(o.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        return `
            <div class="sa-wallet-card" onclick="openOrderDetails('${o.id}')">
                <div class="sa-wallet-left">
                    <div class="sa-wallet-icon" style="background:rgba(255,107,0,0.1); color:var(--primary); width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center;">
                        <i class="fa-solid fa-receipt"></i>
                    </div>
                    <div class="sa-wallet-text">
                        <h3 style="font-size:15px; font-weight:700; margin:0; color:#1c1c1e;">Order #${o.order_number}</h3>
                        <p style="font-size:12px; color:#8e8e93; margin:2px 0 0;">${date} • Total: ৳${o.total.toLocaleString()}</p>
                    </div>
                </div>
                <div style="text-align:right; display:flex; flex-direction:column; gap:4px; align-items:flex-end;">
                    <span class="sa-status-badge status-${o.order_status}" style="font-size:10px; font-weight:800; text-transform:uppercase; padding:4px 8px; border-radius:20px;">${o.order_status}</span>
                    <span style="font-size:11px; font-weight:600; color:${o.payment_status === 'paid' ? '#10b981' : '#f59e0b'};">${o.payment_status === 'paid' ? 'Paid' : 'Unpaid'}</span>
                </div>
            </div>
        `;
    }).join('');
}

async function renderWishlistRailDashboard(wishlistItems) {
    const rail = document.getElementById('saWishlistRail');
    if (!rail) return;

    if (wishlistItems.length === 0) {
        rail.innerHTML = `
            <div class="sa-empty-state" style="padding:20px 10px; text-align:center; width:100%; background:rgba(255,255,255,0.7); backdrop-filter:blur(20px); border-radius:16px; border:1px solid rgba(255,255,255,0.5);">
                <div class="sa-empty-icon" style="font-size:24px; margin-bottom:8px; color:var(--primary);"><i class="fa-regular fa-heart"></i></div>
                <h4 class="sa-empty-title" style="font-size:14px; margin-bottom:4px; font-weight:700; color:#1c1c1e;">Wishlist is Empty</h4>
                <p class="sa-empty-p" style="font-size:12px; color:#8e8e93; margin-bottom:10px;">Save items you love here!</p>
                <a href="index.html" class="sa-btn-primary" style="padding:6px 16px; font-size:12px; display:inline-block; width:auto; border-radius:20px; text-decoration:none;">Shop Now</a>
            </div>
        `;
        return;
    }

    // Fetch product details directly from DB (PRODUCTS cache is not loaded on account page)
    try {
        const productIds = wishlistItems.map(item => item.product_id);
        const { data: products, error } = await supabaseClient
            .from('products')
            .select('id, name, price, sale_price')
            .in('id', productIds);

        if (error) throw error;

        // Fetch one image per product
        const { data: images } = await supabaseClient
            .from('product_images')
            .select('product_id, image_url')
            .in('product_id', productIds)
            .order('sort_order', { ascending: true });

        // Map images by product_id (first image only)
        const imgMap = {};
        if (images) {
            images.forEach(img => {
                if (!imgMap[img.product_id]) imgMap[img.product_id] = img.image_url;
            });
        }

        if (!products || products.length === 0) {
            rail.innerHTML = `<p style="text-align:center;color:#8e8e93;font-size:13px;">Could not load wishlist items.</p>`;
            return;
        }

        const itemsHtml = wishlistItems.map(item => {
            const p = products.find(prod => prod.id === item.product_id);
            if (!p) return '';
            const displayPrice = p.sale_price || p.price;
            const imgSrc = imgMap[p.id] || 'logo.png';
            return `
                <div class="sa-wishlist-item-card" onclick="window.location.href='product.html?id=${p.id}'">
                    <button class="sa-wishlist-item-remove" onclick="event.stopPropagation(); toggleWishlist('${p.id}', null).then(()=>{ syncDashboardData(); })">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <img class="sa-wishlist-item-img" src="${imgSrc}" alt="${p.name}" loading="lazy">
                    <div class="sa-wishlist-item-title">${p.name}</div>
                    <div class="sa-wishlist-item-price">৳${Number(displayPrice).toLocaleString()}</div>
                </div>
            `;
        }).join('');

        rail.innerHTML = itemsHtml;
    } catch (err) {
        console.error('Failed to render wishlist rail:', err);
        rail.innerHTML = `<p style="text-align:center;color:#8e8e93;font-size:13px;">Failed to load wishlist.</p>`;
    }
}

// --- NEW ORDER DETAILS VIEWER ---
async function openOrderDetails(orderId) {
    if (!supabaseClient) return;

    try {
        const [orderRes, itemsRes] = await Promise.all([
            supabaseClient.from('orders').select('*').eq('id', orderId).single(),
            supabaseClient.from('order_items').select('*').eq('order_id', orderId)
        ]);

        const order = orderRes.data;
        const items = itemsRes.data || [];

        if (!order) {
            showToast("Order not found", "error");
            return;
        }

        const date = new Date(order.created_at).toLocaleString();
        const itemsHtml = items.map(item => `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:8px; margin-bottom:8px;">
                <div>
                    <div style="font-weight:700; font-size:14px; color:#1c1c1e;">${item.name}</div>
                    <div style="font-size:12px; color:#8e8e93; margin-top:2px;">Qty: ${item.quantity} x ৳${item.price.toLocaleString()}</div>
                </div>
                <div style="font-weight:800; color:var(--primary);">৳${(item.price * item.quantity).toLocaleString()}</div>
            </div>
        `).join('');

        const odContent = document.getElementById('odContent');
        if (odContent) {
            odContent.innerHTML = `
                <div style="background:rgba(255,107,0,0.05); border:1px solid rgba(255,107,0,0.1); border-radius:12px; padding:15px; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div>
                        <span style="font-size:12px; color:#8e8e93;">Order Status</span>
                        <div style="font-weight:800; text-transform:uppercase; color:var(--primary); font-size:15px; margin-top:2px;">${order.order_status}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:#8e8e93;">Payment Status</span>
                        <div style="font-weight:800; text-transform:uppercase; color:${order.payment_status === 'paid' ? '#10b981' : '#f59e0b'}; font-size:15px; margin-top:2px;">${order.payment_status}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:#8e8e93;">Payment Method</span>
                        <div style="font-weight:700; text-transform:uppercase; font-size:14px; margin-top:2px; color:#1c1c1e;">${order.payment_method}</div>
                    </div>
                    <div>
                        <span style="font-size:12px; color:#8e8e93;">Date & Time</span>
                        <div style="font-weight:700; font-size:13px; margin-top:2px; color:#1c1c1e;">${date}</div>
                    </div>
                </div>

                <div>
                    <h4 style="font-size:15px; font-weight:700; margin:0 0 10px; color:#1c1c1e;">Items Ordered</h4>
                    <div style="background:#fff; border-radius:12px; padding:12px; border:1px solid rgba(0,0,0,0.05);">
                        ${itemsHtml}
                        <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:13px; color:#3a3a3c;">
                            <span>Subtotal</span>
                            <span>৳${order.subtotal.toLocaleString()}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:6px; font-size:13px; color:#3a3a3c;">
                            <span>Shipping</span>
                            <span>৳${order.shipping_fee.toLocaleString()}</span>
                        </div>
                        ${order.discount > 0 ? `
                        <div style="display:flex; justify-content:space-between; margin-top:6px; font-size:13px; color:#10b981; font-weight:700;">
                            <span>Discount</span>
                            <span>-৳${order.discount.toLocaleString()}</span>
                        </div>
                        ` : ''}
                        <div style="display:flex; justify-content:space-between; margin-top:12px; padding-top:12px; border-top:1.5px solid rgba(0,0,0,0.05); font-weight:800; font-size:16px;">
                            <span style="color:#1c1c1e;">Total Amount</span>
                            <span style="color:var(--primary);">৳${order.total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 style="font-size:15px; font-weight:700; margin:0 0 10px; color:#1c1c1e;">Shipping Details</h4>
                    <div style="background:#fff; border-radius:12px; padding:12px; border:1px solid rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:4px; font-size:13px; color:#3a3a3c;">
                        <div><strong>Name:</strong> ${order.shipping_name}</div>
                        <div><strong>Phone:</strong> ${order.shipping_phone}</div>
                        <div><strong>Address:</strong> ${order.shipping_address}</div>
                        <div><strong>District:</strong> ${order.shipping_district}</div>
                    </div>
                </div>
            `;
            openModal('orderDetailsModal');
        }
    } catch (err) {
        console.error(err);
        showToast("Error loading order details", "error");
    }
}

// --- NEW SAVED ADDRESSES CRUD ---
async function loadAddresses() {
    if (!USER_STATE.profile || !supabaseClient) return;

    try {
        const { data: list } = await supabaseClient
            .from('addresses')
            .select('*')
            .eq('user_id', USER_STATE.profile.id)
            .order('is_default', { ascending: false })
            .order('created_at', { ascending: false });

        const container = document.getElementById('addressListContainer');
        if (!container) return;

        if (!list || list.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:30px 10px; color:#8e8e93;">
                    <i class="fa-solid fa-location-dot" style="font-size:32px; margin-bottom:10px; color:#c7c7cc;"></i>
                    <p style="margin:0; font-size:14px;">No addresses saved yet.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(addr => `
            <div style="background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.05); border-radius:12px; padding:14px; position:relative; display:flex; flex-direction:column; gap:4px; font-size:13px; text-align:left;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <strong style="font-size:14px; color:#1c1c1e;">${addr.full_name}</strong>
                    ${addr.is_default ? `<span style="background:rgba(52,199,89,0.15); color:#34C759; font-size:10px; font-weight:800; padding:2px 8px; border-radius:20px;">DEFAULT</span>` : ''}
                </div>
                <div style="color:#3a3a3c;">Phone: ${addr.phone}</div>
                <div style="color:#8e8e93; line-height:1.3; margin-top:2px;">${addr.address}, ${addr.area || ''}, ${addr.district}</div>
                
                <div style="display:flex; gap:16px; margin-top:10px; border-top:1px solid rgba(0,0,0,0.05); padding-top:8px;">
                    <button onclick="openAddressForm('${addr.id}')" style="background:none; border:none; color:var(--primary); font-weight:700; font-size:12px; cursor:pointer; padding:0;">Edit</button>
                    <button onclick="deleteAddress('${addr.id}')" style="background:none; border:none; color:#ff3b30; font-weight:700; font-size:12px; cursor:pointer; padding:0;">Delete</button>
                    ${!addr.is_default ? `<button onclick="setDefaultAddress('${addr.id}')" style="background:none; border:none; color:#007aff; font-weight:700; font-size:12px; cursor:pointer; padding:0; margin-left:auto;">Set Default</button>` : ''}
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error("Error loading addresses:", err);
    }
}

async function openAddressForm(addressId = '') {
    const title = document.getElementById('addrModalTitle');
    
    // Clear form
    document.getElementById('addrId').value = '';
    document.getElementById('addrFullName').value = '';
    document.getElementById('addrPhone').value = '';
    document.getElementById('addrIsDefault').checked = false;

    // Reset selects
    const divisionSelect = document.getElementById('addrDivision');
    const districtSelect = document.getElementById('addrDistrictSelect');
    const thanaSelect = document.getElementById('addrThanaSelect');
    const thanaManual = document.getElementById('addrThanaManual');
    
    if (divisionSelect) divisionSelect.value = '';
    if (districtSelect) { districtSelect.innerHTML = '<option value="">Select District</option>'; districtSelect.value = ''; }
    if (thanaSelect) { thanaSelect.innerHTML = '<option value="">Select Area / Thana</option>'; thanaSelect.value = ''; }
    if (thanaManual) { thanaManual.style.display = 'none'; thanaManual.value = ''; }

    document.getElementById('addrHouse').value = '';
    document.getElementById('addrRoad').value = '';
    document.getElementById('addrVillage').value = '';
    document.getElementById('addrLandmark').value = '';

    if (addressId) {
        title.textContent = 'Edit Address';
        try {
            const { data: addr } = await supabaseClient.from('addresses').select('*').eq('id', addressId).single();
            if (addr) {
                document.getElementById('addrId').value = addr.id;
                document.getElementById('addrFullName').value = addr.full_name;
                document.getElementById('addrPhone').value = addr.phone;
                document.getElementById('addrIsDefault').checked = addr.is_default;

                // Prefill division
                if (divisionSelect && addr.district) {
                    divisionSelect.value = addr.district;
                    populateAddressDistricts(addr.district);
                }

                // Prefill district and thana from addr.area (Format: "District, Thana")
                let districtVal = '';
                let thanaVal = '';
                if (addr.area) {
                    const areaParts = addr.area.split(', ');
                    if (areaParts.length >= 2) {
                        districtVal = areaParts[0];
                        thanaVal = areaParts.slice(1).join(', ');
                    } else {
                        districtVal = addr.area;
                    }
                }

                if (districtSelect && districtVal) {
                    districtSelect.value = districtVal;
                    populateAddressThanas(divisionSelect.value, districtVal);
                }

                if (thanaSelect && thanaVal) {
                    const optionExists = Array.from(thanaSelect.options).some(o => o.value === thanaVal);
                    if (optionExists) {
                        thanaSelect.value = thanaVal;
                    } else {
                        thanaSelect.value = 'Other';
                        if (thanaManual) {
                            thanaManual.style.display = 'block';
                            thanaManual.value = thanaVal;
                        }
                    }
                }

                // Parse address format: House: X, Road: Y, Village: Z, Landmark: L
                let house = '', road = '', village = '', landmark = '';
                if (addr.address) {
                    const parts = addr.address.split(', ');
                    parts.forEach(p => {
                        const clean = p.trim();
                        if (clean.startsWith('House:')) house = clean.replace('House:', '').trim();
                        else if (clean.startsWith('Road:')) road = clean.replace('Road:', '').trim();
                        else if (clean.startsWith('Village:')) village = clean.replace('Village:', '').trim();
                        else if (clean.startsWith('Landmark:')) landmark = clean.replace('Landmark:', '').trim();
                        else {
                            if (!house) house = clean;
                        }
                    });
                }
                document.getElementById('addrHouse').value = house;
                document.getElementById('addrRoad').value = road;
                document.getElementById('addrVillage').value = village;
                document.getElementById('addrLandmark').value = landmark;
            }
        } catch(e) {
            console.error(e);
        }
    } else {
        title.textContent = 'Add New Address';
    }

    openModal('addressFormModal');
}

async function handleAddressSubmit(e) {
    e.preventDefault();
    if (!USER_STATE.profile || !supabaseClient) return;

    const id = document.getElementById('addrId').value;
    const fullName = document.getElementById('addrFullName').value.trim();
    const phone = document.getElementById('addrPhone').value.trim();
    const isDefault = document.getElementById('addrIsDefault').checked;

    // Mobile validation
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
        showToast("Please enter a valid 11-digit Bangladeshi mobile number starting with 01", "error");
        return;
    }

    const division = document.getElementById('addrDivision').value;
    const district = document.getElementById('addrDistrictSelect').value;
    const thanaSelect = document.getElementById('addrThanaSelect').value;
    const thanaManual = document.getElementById('addrThanaManual').value.trim();
    const thana = thanaSelect === 'Other' ? thanaManual : thanaSelect;

    const house = document.getElementById('addrHouse').value.trim();
    const road = document.getElementById('addrRoad').value.trim();
    const village = document.getElementById('addrVillage').value.trim();
    const landmark = document.getElementById('addrLandmark').value.trim();

    if (!division || !district || !thana || !house || !road || !village) {
        showToast("Please fill in all required address fields", "error");
        return;
    }

    const combinedAddress = `House: ${house}, Road: ${road}, Village: ${village}` + (landmark ? `, Landmark: ${landmark}` : '');
    const combinedArea = `${district}, ${thana}`;
    const combinedDistrict = division;

    const btn = document.getElementById('addrSubmitBtn');
    const oldText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Saving...';

    try {
        const payload = {
            user_id: USER_STATE.profile.id,
            full_name: fullName,
            phone: phone,
            division: division,       // new dedicated division column
            district: combinedDistrict, // kept for backward-compat (stores division)
            area: combinedArea,
            address: combinedAddress,
            is_default: isDefault
        };


        if (isDefault) {
            // Unset all other defaults first
            await supabaseClient.from('addresses').update({ is_default: false }).eq('user_id', USER_STATE.profile.id);
        }

        if (id) {
            // Update
            const { error } = await supabaseClient.from('addresses').update(payload).eq('id', id);
            if (error) throw error;
            showToast('Address updated successfully!', 'success');
        } else {
            // Insert
            const { error } = await supabaseClient.from('addresses').insert([payload]);
            if (error) throw error;
            showToast('Address added successfully!', 'success');
        }

        closeModal('addressFormModal');
        await loadAddresses();
    } catch(err) {
        console.error(err);
        showToast(err.message || 'Error saving address', 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = oldText;
    }
}

async function deleteAddress(id) {
    if (!supabaseClient) return;
    window.saConfirm("Are you sure you want to delete this saved address?", async () => {
        try {
            const { error } = await supabaseClient.from('addresses').delete().eq('id', id);
            if (error) throw error;
            showToast("Address deleted successfully", "success");
            await loadAddresses();
        } catch(err) {
            console.error(err);
            showToast("Failed to delete address", "error");
        }
    });
}

async function setDefaultAddress(id) {
    if (!USER_STATE.profile || !supabaseClient) return;
    try {
        await supabaseClient.from('addresses').update({ is_default: false }).eq('user_id', USER_STATE.profile.id);
        const { error } = await supabaseClient.from('addresses').update({ is_default: true }).eq('id', id);
        if (error) throw error;
        showToast("Default address updated", "success");
        await loadAddresses();
    } catch(err) {
        console.error(err);
        showToast("Failed to set default address", "error");
    }
}

// Expose CRUD actions globally for onclick triggers
window.openAddressForm = openAddressForm;
window.deleteAddress = deleteAddress;
window.setDefaultAddress = setDefaultAddress;
window.openOrderDetails = openOrderDetails;

async function initAccountDashboard() {
    const isAccountPage = document.querySelector('.sa-acc-profile-card');
    if (!isAccountPage) return;

    if (window.location.search.includes('preview=1')) {
        hideAuthLoader();
        if (!USER_STATE.profile) {
            USER_STATE.profile = {
                id: 'demo-user',
                name: 'Rahim Uddin',
                email: 'rahim@satheachi.com',
                phone: '01712345678',
                avatar: 'R'
            };
        }
    } else {
        if (window.authChecking) {
            showAuthLoader();
            document.addEventListener('authChecked', () => {
                initAccountDashboard();
            }, { once: true });
            return;
        }

        hideAuthLoader();

        if (!USER_STATE.profile) {
            // enforcePageAuthGuard handles the modal, but show it here as a fallback
            window.showLoginRequiredModal(() => {
                window.location.href = 'index.html';
            });
            return;
        }
    }

    // 1. Populate Profile Data
    updateProfileDOM();

    // 2. Load Addresses list
    await loadAddresses();

    // 3. Sync Dashboard Data (Stats, Orders list, Wishlist Rail)
    await syncDashboardData();

    // 4. Setup Real-time subscriptions
    setupRealtimeSubscriptions(USER_STATE.profile.id);

    // Load Notifications
    await loadNotifications();

    // Load Payment Methods
    await loadPaymentMethods();

    // 5. Pre-fill Edit Profile Form & bind submission
    const epForm = document.getElementById('editProfileForm');
    if (epForm && !epForm.dataset.bound) {
        epForm.dataset.bound = "true";
        document.getElementById('epName').value = USER_STATE.profile.name;
        document.getElementById('epEmail').value = USER_STATE.profile.email;
        document.getElementById('epPhone').value = USER_STATE.profile.phone;

        // File upload & crop listener
        const fileInput = document.getElementById('epAvatarFile');
        let cropperInstance = null;

        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > 2 * 1024 * 1024) {
                    showToast("Image size must be less than 2MB", "error");
                    fileInput.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(event) {
                    const cropImage = document.getElementById('cropImage');
                    cropImage.src = event.target.result;
                    openModal('cropModal');

                    if (cropperInstance) {
                        cropperInstance.destroy();
                    }

                    setTimeout(() => {
                        cropperInstance = new Cropper(cropImage, {
                            aspectRatio: 1,
                            viewMode: 1,
                            dragMode: 'move',
                            autoCropArea: 1,
                            restore: false,
                            guides: false,
                            center: false,
                            highlight: false,
                            cropBoxMovable: false,
                            cropBoxResizable: false,
                            toggleDragModeOnDblclick: false,
                            minContainerWidth: 280,
                            minContainerHeight: 280
                        });
                    }, 300);
                };
                reader.readAsDataURL(file);
            });
        }

        const cropApplyBtn = document.getElementById('cropApplyBtn');
        if (cropApplyBtn) {
            cropApplyBtn.addEventListener('click', async () => {
                if (!cropperInstance) return;

                const canvas = cropperInstance.getCroppedCanvas({
                    width: 256,
                    height: 256
                });

                closeModal('cropModal');

                if (!canvas) {
                    showToast("Failed to crop image", "error");
                    return;
                }

                canvas.toBlob(async (blob) => {
                    if (!blob) return;
                    await uploadAvatarBlob(blob);
                }, 'image/jpeg', 0.9);
            });
        }

        async function uploadAvatarBlob(blob) {
            const progress = document.getElementById('epUploadProgress');
            const status = document.getElementById('epAvatarStatus');
            if (progress) progress.style.display = 'block';
            if (status) {
                status.textContent = 'Uploading...';
                status.style.color = 'var(--primary)';
            }

            try {
                const userId = USER_STATE.profile.id;
                const fileName = `avatar_${Date.now()}.jpg`;
                const filePath = `${userId}/${fileName}`;

                // 1. Upload to Supabase Storage
                const { data, error: uploadErr } = await supabaseClient.storage
                    .from('avatars')
                    .upload(filePath, blob, {
                        contentType: 'image/jpeg',
                        upsert: true
                    });

                if (uploadErr) throw uploadErr;

                // 2. Get Public URL
                const { data: urlData } = supabaseClient.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                const newPublicUrl = urlData.publicUrl;

                // 3. Update profiles table
                const { error: dbErr } = await supabaseClient
                    .from('profiles')
                    .update({ avatar_url: newPublicUrl })
                    .eq('id', userId);

                if (dbErr) throw dbErr;

                // 4. Update local state
                USER_STATE.profile.avatar = `<img src="${newPublicUrl}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
                updateProfileDOM();

                if (status) {
                    status.textContent = 'Upload complete!';
                    status.style.color = '#34C759';
                }

                // Clean up old files in folder
                try {
                    const { data: files } = await supabaseClient.storage
                        .from('avatars')
                        .list(userId);
                    if (files && files.length > 0) {
                        const filesToDelete = files
                            .filter(f => f.name !== fileName)
                            .map(f => `${userId}/${f.name}`);
                        if (filesToDelete.length > 0) {
                            await supabaseClient.storage.from('avatars').remove(filesToDelete);
                        }
                    }
                } catch (cleanupErr) {
                    console.warn("Cleanup of old avatars failed:", cleanupErr);
                }

                showToast('Profile photo updated successfully!', 'success');
            } catch (err) {
                console.error("Upload avatar failed:", err);
                if (status) {
                    status.textContent = 'Upload failed.';
                    status.style.color = '#FF3B30';
                }
                showToast(err.message || 'Failed to upload image', 'error');
            } finally {
                setTimeout(() => {
                    if (progress) progress.style.display = 'none';
                    if (status) status.textContent = '';
                }, 3000);
            }
        }

        epForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newName = document.getElementById('epName').value.trim();
            const newPhone = document.getElementById('epPhone').value.trim();

            if (!newName) {
                showToast("Name is required", "error");
                return;
            }
            if (!newPhone) {
                showToast("Phone number is required", "error");
                return;
            }

            const btn = document.getElementById('epSaveBtn');
            const oldText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Saving...';

            try {
                const { error } = await supabaseClient.from('profiles').update({
                    full_name: newName,
                    phone: newPhone
                }).eq('id', USER_STATE.profile.id);

                if (error) throw error;

                USER_STATE.profile.name = newName;
                USER_STATE.profile.phone = newPhone;

                if (typeof USER_STATE.profile.avatar === 'string' && !USER_STATE.profile.avatar.includes('<img')) {
                    USER_STATE.profile.avatar = newName.charAt(0).toUpperCase();
                }

                updateProfileDOM();
                closeModal('editProfileModal');
                showToast('Profile updated successfully!', 'success');
            } catch(err) {
                console.error(err);
                showToast(err.message || 'Failed to update profile', 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = oldText;
            }
        });
    }

    // 6. Bind Address Form Submit
    const addrForm = document.getElementById('addressForm');
    if (addrForm && !addrForm.dataset.bound) {
        addrForm.dataset.bound = "true";
        addrForm.addEventListener('submit', handleAddressSubmit);

        // Bind geography select dynamic changes
        const divisionSelect = document.getElementById('addrDivision');
        const districtSelect = document.getElementById('addrDistrictSelect');
        const thanaSelect = document.getElementById('addrThanaSelect');
        const thanaManual = document.getElementById('addrThanaManual');

        if (divisionSelect) {
            divisionSelect.addEventListener('change', (e) => {
                populateAddressDistricts(e.target.value);
            });
        }
        if (districtSelect) {
            districtSelect.addEventListener('change', (e) => {
                populateAddressThanas(divisionSelect.value, e.target.value);
            });
        }
        if (thanaSelect) {
            thanaSelect.addEventListener('change', (e) => {
                if (e.target.value === 'Other') {
                    if (thanaManual) { thanaManual.style.display = 'block'; thanaManual.required = true; thanaManual.focus(); }
                } else {
                    if (thanaManual) { thanaManual.style.display = 'none'; thanaManual.required = false; thanaManual.value = ''; }
                }
            });
        }
    }

    // 7. Bind Change Password Form Submit
    const cpForm = document.getElementById('changePasswordForm');
    if (cpForm && !cpForm.dataset.bound) {
        cpForm.dataset.bound = "true";
        cpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (newPassword !== confirmPassword) {
                showToast("Passwords do not match!", "error");
                return;
            }

            const btn = document.getElementById('changePasswordSubmitBtn');
            const oldText = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Updating...';

            try {
                // Verify current password by logging in again
                const { error: verifyError } = await supabaseClient.auth.signInWithPassword({
                    email: USER_STATE.profile.email,
                    password: currentPassword
                });
                if (verifyError) {
                    throw new Error("Incorrect current password.");
                }

                const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
                if (error) throw error;
                showToast("Password updated successfully!", "success");
                closeModal('changePasswordModal');
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
            } catch(err) {
                console.error(err);
                showToast(err.message || "Failed to update password", "error");
            } finally {
                btn.disabled = false;
                btn.textContent = oldText;
            }
        });
    }

    // 8. Confirm Logout logic
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');
    if (confirmLogoutBtn && !confirmLogoutBtn.dataset.bound) {
        confirmLogoutBtn.dataset.bound = "true";
        confirmLogoutBtn.addEventListener('click', async () => {
            await window.signOutUser();
        });
    }
}

function updateProfileDOM() {
    if (!USER_STATE.profile) return;
    const accName = document.querySelector('.sa-acc-name');
    const accAvatar = document.querySelector('.sa-acc-avatar');
    const epAvatarText = document.getElementById('epAvatarText');
    const headerProfileBtn = document.getElementById('saProfileBtn');

    if (accName) accName.textContent = USER_STATE.profile.name;
    if (accAvatar) accAvatar.innerHTML = USER_STATE.profile.avatar;

    const accEmail = document.getElementById('accEmailDisplay');
    if (accEmail && USER_STATE.profile.email) accEmail.textContent = USER_STATE.profile.email;
    
    if (epAvatarText) {
        if (typeof USER_STATE.profile.avatar === 'string' && USER_STATE.profile.avatar.includes('<img')) {
            epAvatarText.innerHTML = USER_STATE.profile.avatar;
        } else {
            epAvatarText.textContent = USER_STATE.profile.avatar || 'U';
        }
    }

    if (headerProfileBtn) {
        if (typeof USER_STATE.profile.avatar === 'string' && USER_STATE.profile.avatar.includes('<img')) {
            headerProfileBtn.innerHTML = USER_STATE.profile.avatar;
        } else if (USER_STATE.profile.name) {
            const initial = USER_STATE.profile.name.charAt(0).toUpperCase();
            headerProfileBtn.innerHTML = `<span class="sa-avatar-initial">${initial}</span>`;
        }
    }
}

// Global Navigate Back Behavior
function navigateBack() {
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Fetch and display customer notifications
async function loadNotifications() {
    const notificationsModal = document.getElementById('notificationsModal');
    if (!notificationsModal) return;

    if (!supabaseClient || !USER_STATE.profile) return;

    try {
        const userId = USER_STATE.profile.id;
        const { data: notifications, error } = await supabaseClient
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const contentDiv = notificationsModal.querySelector('#notificationsContent');
        const controlsDiv = notificationsModal.querySelector('#notifControls');
        const countText = notificationsModal.querySelector('#notifCountText');
        const emptyState = notificationsModal.querySelector('.sa-empty-state');

        if (!notifications || notifications.length === 0) {
            if (emptyState) emptyState.style.display = 'flex';
            if (contentDiv) {
                contentDiv.style.display = 'none';
                contentDiv.innerHTML = '';
            }
            if (controlsDiv) controlsDiv.style.display = 'none';
            updateNotificationBadge(0);
        } else {
            if (emptyState) emptyState.style.display = 'none';
            if (contentDiv) {
                contentDiv.style.display = 'flex';
                contentDiv.innerHTML = notifications.map(n => {
                    const dateString = new Date(n.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    const unreadIndicator = !n.is_read ? '<span class="sa-notif-unread-dot" style="width:8px; height:8px; background:var(--primary); border-radius:50%; display:inline-block; margin-left:6px;"></span>' : '';
                    
                    return `
                        <div class="sa-notif-item ${n.is_read ? 'read' : 'unread'}" data-id="${n.id}" style="background:${n.is_read ? 'var(--surface-2)' : 'rgba(255,107,0,0.05)'}; padding:14px; border-radius:var(--radius-sm); border:1px solid ${n.is_read ? 'var(--border)' : 'rgba(255,107,0,0.15)'}; position:relative; cursor:pointer; transition:var(--trans); display:flex; gap:12px; align-items:flex-start;">
                            <div class="sa-notif-icon-wrap" style="flex-shrink:0; margin-top:2px;">
                                ${getNotifIcon(n.type)}
                            </div>
                            <div style="flex:1;">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                                    <h5 style="font-size:14px; font-weight:700; margin:0; display:flex; align-items:center; color:var(--text-dark);">
                                        ${n.title}
                                        ${unreadIndicator}
                                    </h5>
                                    <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                                        <small style="color:var(--text-muted); font-size:11px;">${dateString}</small>
                                        <button onclick="deleteNotification(event, '${n.id}')" style="background:none; border:none; color:var(--text-muted); cursor:pointer; padding:2px; font-size:12px; transition:color var(--trans);" onmouseover="this.style.color='var(--danger)'" onmouseout="this.style.color='var(--text-muted)'" title="Delete notification">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                                <p style="font-size:13px; color:var(--text-dark); margin:6px 0 0 0; line-height:1.4; opacity:0.95;">${n.message}</p>
                                <div style="display:flex; align-items:center; gap:6px; margin-top:8px;">
                                    <span class="sa-notif-type-badge ${n.type}" style="font-size:10px; font-weight:600; padding:2px 6px; border-radius:10px; text-transform:capitalize; ${getNotifBadgeStyle(n.type)}">
                                        ${n.type.replace('_', ' ')}
                                    </span>
                                    ${n.link_url ? `<a href="${n.link_url}" style="font-size:12px; color:var(--primary); font-weight:600; text-decoration:none; display:inline-block;">View details <i class="fa-solid fa-arrow-right" style="font-size:10px;"></i></a>` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Click listener to mark as read
                contentDiv.querySelectorAll('.sa-notif-item').forEach(item => {
                    item.onclick = async () => {
                        const notifId = item.dataset.id;
                        const notif = notifications.find(n => n.id === notifId);
                        if (notif && !notif.is_read) {
                            try {
                                const { error: readErr } = await supabaseClient.from('notifications').update({ is_read: true }).eq('id', notifId);
                                if (readErr) throw readErr;
                                notif.is_read = true;
                                item.style.background = 'var(--surface-2)';
                                item.style.borderColor = 'var(--border)';
                                const dot = item.querySelector('.sa-notif-unread-dot');
                                if (dot) dot.remove();
                                
                                const newUnread = notifications.filter(n => !n.is_read).length;
                                updateNotificationBadge(newUnread);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    };
                });
            }

            if (controlsDiv) controlsDiv.style.display = 'flex';
            if (countText) countText.textContent = `${notifications.length} notification${notifications.length > 1 ? 's' : ''}`;

            const unreadCount = notifications.filter(n => !n.is_read).length;
            updateNotificationBadge(unreadCount);
        }
    } catch (err) {
        console.error("Failed to load notifications:", err);
    }
}

// Helpers for notification icons and styling
function getNotifIcon(type) {
    switch (type) {
        case 'success':
            return '<i class="fa-solid fa-circle-check" style="color: #2f855a; font-size: 16px;"></i>';
        case 'warning':
            return '<i class="fa-solid fa-triangle-exclamation" style="color: #c05621; font-size: 16px;"></i>';
        case 'error':
            return '<i class="fa-solid fa-circle-xmark" style="color: #9b2c2c; font-size: 16px;"></i>';
        case 'promo':
        case 'promotion':
            return '<i class="fa-solid fa-bullhorn" style="color: #6b46c1; font-size: 16px;"></i>';
        case 'order':
        case 'order_update':
            return '<i class="fa-solid fa-truck" style="color: #319795; font-size: 16px;"></i>';
        case 'info':
        default:
            return '<i class="fa-solid fa-circle-info" style="color: #2b6cb0; font-size: 16px;"></i>';
    }
}

function getNotifBadgeStyle(type) {
    switch (type) {
        case 'success':
            return 'background: #e6fffa; color: #234e52; border: 1px solid #b2f5ea;';
        case 'warning':
            return 'background: #fffaf0; color: #7b341e; border: 1px solid #feebc8;';
        case 'error':
            return 'background: #fff5f5; color: #742a2a; border: 1px solid #fed7d7;';
        case 'promo':
        case 'promotion':
            return 'background: #faf5ff; color: #44337a; border: 1px solid #e9d8fd;';
        case 'order':
        case 'order_update':
            return 'background: #e6fffa; color: #234e52; border: 1px solid #b2f5ea;';
        case 'info':
        default:
            return 'background: #ebf8ff; color: #2b6cb0; border: 1px solid #bee3f8;';
    }
}

window.markAllNotificationsAsRead = async function() {
    if (!supabaseClient || !USER_STATE.profile) return;
    try {
        const userId = USER_STATE.profile.id;
        const { error } = await supabaseClient
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', userId)
            .eq('is_read', false);
        if (error) throw error;
        
        await loadNotifications();
        showToast('All notifications marked as read', 'success');
    } catch (err) {
        console.error("Failed to mark all as read:", err);
        showToast(err.message || 'Failed to update notifications', 'error');
    }
};

window.deleteNotification = async function(event, notifId) {
    if (event) event.stopPropagation();
    if (!supabaseClient) return;
    
    try {
        const { error } = await supabaseClient
            .from('notifications')
            .delete()
            .eq('id', notifId);
        if (error) throw error;
        
        await loadNotifications();
        showToast('Notification deleted', 'success');
    } catch (err) {
        console.error("Failed to delete notification:", err);
        showToast(err.message || 'Failed to delete notification', 'error');
    }
};

// Update notification badge count in account page DOM
function updateNotificationBadge(unreadCount) {
    const badges = document.querySelectorAll('.sa-notif-badge');
    badges.forEach(badge => {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Load and render payment methods from payment_settings table
async function loadPaymentMethods() {
    const container = document.getElementById('paymentMethodsList');
    if (!container || !supabaseClient) return;

    const PAYMENT_ICONS = {
        bkash:  { icon: 'fa-solid fa-mobile-screen-button', color: '#E2136E', bg: 'rgba(226,19,110,0.08)' },
        nagad:  { icon: 'fa-solid fa-mobile-screen-button', color: '#F6821F', bg: 'rgba(246,130,31,0.08)' },
        rocket: { icon: 'fa-solid fa-mobile-screen-button', color: '#8C3494', bg: 'rgba(140,52,148,0.08)' },
        cod:    { icon: 'fa-solid fa-money-bill-wave',      color: '#34C759', bg: 'rgba(52,199,89,0.08)' }
    };

    try {
        const { data: methods, error } = await supabaseClient
            .from('payment_settings')
            .select('*')
            .eq('is_enabled', true)
            .order('created_at', { ascending: true });

        if (error) throw error;

        if (!methods || methods.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:#8e8e93; font-size:13px;">No payment methods configured.</p>`;
            return;
        }

        container.innerHTML = methods.map(m => {
            const style = PAYMENT_ICONS[m.id] || { icon: 'fa-regular fa-credit-card', color: 'var(--primary)', bg: 'rgba(255,107,0,0.08)' };
            const merchantLine = m.merchant_number
                ? `<div style="font-size:12px; color:#8e8e93; margin-top:2px;">Number: <strong style="color:#3a3a3c;">${m.merchant_number}</strong></div>`
                : '';
            return `
                <div style="display:flex; align-items:center; gap:14px; background:${style.bg}; border:1px solid ${style.color}22; border-radius:14px; padding:14px 16px;">
                    <div style="width:42px; height:42px; border-radius:12px; background:${style.bg}; border:1px solid ${style.color}33; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i class="${style.icon}" style="font-size:18px; color:${style.color};"></i>
                    </div>
                    <div style="flex:1;">
                        <div style="font-size:15px; font-weight:700; color:#1c1c1e;">${m.name}</div>
                        ${merchantLine}
                    </div>
                    <span style="font-size:11px; font-weight:800; color:#34C759; background:rgba(52,199,89,0.12); padding:3px 10px; border-radius:20px;">Active</span>
                </div>
            `;
        }).join('');

    } catch (err) {
        console.error('Failed to load payment methods:', err);
        container.innerHTML = `<p style="text-align:center; color:#ff3b30; font-size:13px;">Failed to load payment methods.</p>`;
    }
}
window.loadPaymentMethods = loadPaymentMethods;
window.syncDashboardData = syncDashboardData;

// ════════════════════════════════════════════════════════
//  FLOATING SUPPORT BUTTON — DB-driven, zero hardcoding
// ════════════════════════════════════════════════════════
function injectFloatingSupportButton() {
    // Don't inject on admin pages or specific pages
    if (window.location.pathname.includes('/admin/')) return;
    if (document.getElementById('sa-float-support-btn')) return;

    const style = document.createElement('style');
    style.textContent = `
        #sa-float-support-btn {
            position: fixed;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 80px);
            right: 20px;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: #fff;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(37,211,102,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            z-index: 999;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
            animation: sa-float-pulse 2.5s infinite;
        }
        @keyframes sa-float-pulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }
            50% { box-shadow: 0 4px 32px rgba(37,211,102,0.7); }
        }
        #sa-float-support-btn:hover { transform: scale(1.12); }
        @media (max-width: 768px) {
            #sa-float-support-btn { bottom: calc(env(safe-area-inset-bottom, 0px) + 74px); right: 14px; width: 48px; height: 48px; font-size: 20px; }
        }

        #sa-support-popup {
            position: fixed;
            bottom: calc(env(safe-area-inset-bottom, 0px) + 140px);
            right: 20px;
            width: 300px;
            max-width: calc(100vw - 28px);
            max-height: calc(100vh - 180px);
            background: var(--white, #fff);
            border-radius: 18px;
            box-shadow: 0 16px 48px rgba(0,0,0,0.22);
            border: 1px solid rgba(0,0,0,0.08);
            z-index: 998;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: scale(0.85) translateY(20px);
            transform-origin: bottom right;
            opacity: 0;
            pointer-events: none;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
        }
        #sa-support-popup.open {
            transform: scale(1) translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        @media (max-width: 768px) {
            #sa-support-popup {
                right: 12px;
                width: calc(100vw - 24px);
                max-width: 300px;
                bottom: calc(env(safe-area-inset-bottom, 0px) + 128px);
                max-height: calc(100vh - 145px);
            }
        }
        .sa-sp-header {
            background: linear-gradient(135deg, #1c1c2e, #2d1b5e);
            padding: 12px 16px;
            color: #fff;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .sa-sp-header h4 { font-size: 13.5px; font-weight: 800; margin: 0; }
        .sa-sp-header p { font-size: 11px; opacity: 0.8; margin: 2px 0 0; }
        .sa-sp-body {
            padding: 10px 12px;
            display: flex;
            flex-direction: column;
            gap: 7px;
            overflow-y: auto;
            overscroll-behavior: contain;
            flex: 1 1 auto;
            max-height: 52vh;
        }
        .sa-sp-body::-webkit-scrollbar { width: 4px; }
        .sa-sp-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
        .sa-sp-item {
            display: flex; align-items: center; gap: 10px; padding: 8px 10px;
            border-radius: 10px; text-decoration: none; color: inherit;
            font-weight: 700; font-size: 13px; cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            border: 1px solid transparent;
        }
        .sa-sp-item:hover { transform: translateX(3px); }
        .sa-sp-icon {
            width: 32px; height: 32px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 15px; flex-shrink: 0;
        }
        .sa-sp-social-strip {
            display: flex; gap: 6px; margin-top: 2px;
        }
        .sa-sp-chip {
            flex: 1; display: flex; align-items: center; justify-content: center;
            gap: 5px; padding: 7px 4px; border-radius: 8px;
            text-decoration: none; font-size: 11.5px; font-weight: 700;
            transition: transform 0.15s;
        }
        .sa-sp-chip:hover { transform: translateY(-2px); }
        .sa-sp-item-whatsapp { background: rgba(37,211,102,0.08); border-color: rgba(37,211,102,0.2); }
        .sa-sp-item-whatsapp .sa-sp-icon { background: rgba(37,211,102,0.15); color: #25D366; }
        .sa-sp-item-whatsapp:hover { background: rgba(37,211,102,0.14); }
        .sa-sp-item-phone { background: rgba(0,122,255,0.06); border-color: rgba(0,122,255,0.15); }
        .sa-sp-item-phone .sa-sp-icon { background: rgba(0,122,255,0.12); color: #007AFF; }
        .sa-sp-item-phone:hover { background: rgba(0,122,255,0.12); }
        .sa-sp-item-fb { background: rgba(24,119,242,0.06); border-color: rgba(24,119,242,0.15); }
        .sa-sp-item-fb .sa-sp-icon { background: rgba(24,119,242,0.12); color: #1877F2; }
        .sa-sp-item-fb:hover { background: rgba(24,119,242,0.12); }
        .sa-sp-item-email { background: rgba(255,107,0,0.06); border-color: rgba(255,107,0,0.15); }
        .sa-sp-item-email .sa-sp-icon { background: rgba(255,107,0,0.12); color: #FF6B00; }
        .sa-sp-item-email:hover { background: rgba(255,107,0,0.14); }
        .sa-sp-footer { padding: 9px 12px; border-top: 1px solid rgba(0,0,0,0.06); text-align: center; flex-shrink: 0; }
        .sa-sp-footer a { font-size: 11.5px; color: var(--primary, #FF6B00); font-weight: 600; text-decoration: none; }
        [data-theme="dark"] #sa-support-popup { background: #1c1c2e; border-color: rgba(255,255,255,0.1); }
        [data-theme="dark"] .sa-sp-item { color: #f1f1f5; }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'sa-float-support-btn';
    btn.setAttribute('aria-label', 'Support');
    btn.setAttribute('title', 'Need help? Contact us');
    btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';

    const popup = document.createElement('div');
    popup.id = 'sa-support-popup';
    popup.innerHTML = `
        <div class="sa-sp-header">
            <div>
                <h4>💬 Need Help?</h4>
                <p id="sa-sp-hours">We're here for you</p>
            </div>
            <button type="button" id="sa-sp-close" style="background:rgba(255,255,255,0.15); border:none; color:#fff; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:12px;" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="sa-sp-body" id="sa-sp-body">
            <div style="text-align:center; padding:10px; color:#999; font-size:13px;">Loading...</div>
        </div>
        <div class="sa-sp-footer">
            <a href="help-center.html"><i class="fa-solid fa-circle-question"></i> Help Center &amp; FAQ</a>
        </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(popup);

    // Toggle popup
    let isOpen = false;
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;
        popup.classList.toggle('open', isOpen);
        btn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-brands fa-whatsapp"></i>';
    });

    const closeBtn = document.getElementById('sa-sp-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen = false;
            popup.classList.remove('open');
            btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
        });
    }

    document.addEventListener('click', (e) => {
        if (isOpen && !popup.contains(e.target) && e.target !== btn) {
            isOpen = false;
            popup.classList.remove('open');
            btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
        }
    });

    // Populate with DB settings
    function populateSupportPopup() {
        const s = window.siteSettings || {};
        const wa = s['whatsapp'] || '';
        const phone = s['contact_phone'] || s['support_phone'] || '';
        const fb = s['social_fb'] || s['social_messenger'] || '';
        const email = s['contact_email'] || s['support_email'] || '';
        const yt = s['social_yt'] || '';
        const tiktok = s['social_tiktok'] || '';
        const tg = s['social_telegram'] || '';
        const hours = s['business_hours'] || '২৪/৭ সার্বক্ষণিক সেবা';

        const hoursEl = document.getElementById('sa-sp-hours');
        if (hoursEl && hours) hoursEl.textContent = hours;

        let items = '';

        if (wa) {
            let waUrl = wa;
            if (!wa.startsWith('http')) {
                const cleaned = wa.replace(/[^\d+]/g, '');
                const num = cleaned.startsWith('88') ? cleaned : (cleaned.startsWith('0') ? `88${cleaned}` : `880${cleaned}`);
                waUrl = `https://wa.me/${num}`;
            }
            items += `<a class="sa-sp-item sa-sp-item-whatsapp" href="${waUrl}" target="_blank" rel="noopener">
                <div class="sa-sp-icon"><i class="fa-brands fa-whatsapp"></i></div>
                <div><div>WhatsApp</div><div style="font-size:11px;font-weight:500;opacity:0.6;">Chat with us</div></div>
            </a>`;
        }

        if (phone) {
            items += `<a class="sa-sp-item sa-sp-item-phone" href="tel:${phone}">
                <div class="sa-sp-icon"><i class="fa-solid fa-phone"></i></div>
                <div><div>Call Support</div><div style="font-size:11px;font-weight:500;opacity:0.6;">${phone}</div></div>
            </a>`;
        }

        if (fb) {
            items += `<a class="sa-sp-item sa-sp-item-fb" href="${fb}" target="_blank" rel="noopener">
                <div class="sa-sp-icon"><i class="fa-brands fa-facebook-messenger"></i></div>
                <div><div>Facebook Page</div><div style="font-size:11px;font-weight:500;opacity:0.6;">Message us</div></div>
            </a>`;
        }

        if (email) {
            items += `<a class="sa-sp-item sa-sp-item-email" href="mailto:${email}">
                <div class="sa-sp-icon"><i class="fa-solid fa-envelope"></i></div>
                <div><div>Email Support</div><div style="font-size:11px;font-weight:500;opacity:0.6;">${email}</div></div>
            </a>`;
        }

        // Secondary Social Channels (YouTube, TikTok, Telegram in one compact row!)
        let socialChips = '';
        if (yt) {
            socialChips += `<a class="sa-sp-chip" href="${yt}" target="_blank" rel="noopener" style="background:rgba(255,0,0,0.08); color:#ff0000;">
                <i class="fa-brands fa-youtube"></i> YouTube
            </a>`;
        }
        if (tiktok) {
            socialChips += `<a class="sa-sp-chip" href="${tiktok}" target="_blank" rel="noopener" style="background:rgba(0,0,0,0.06); color:#111;">
                <i class="fa-brands fa-tiktok"></i> TikTok
            </a>`;
        }
        if (tg) {
            socialChips += `<a class="sa-sp-chip" href="${tg}" target="_blank" rel="noopener" style="background:rgba(0,136,204,0.08); color:#0088cc;">
                <i class="fa-brands fa-telegram"></i> Telegram
            </a>`;
        }
        if (socialChips) {
            items += `<div class="sa-sp-social-strip">${socialChips}</div>`;
        }

        // Developer Profile item
        items += `<a class="sa-sp-item sa-sp-item-dev" href="developer.html" style="border: 1px solid rgba(212, 175, 55, 0.35); background: rgba(212, 175, 55, 0.08); text-decoration:none; margin-top:2px;">
            <div class="sa-sp-icon" style="background: linear-gradient(135deg, #d4af37, #aa8010); color:#fff;"><i class="fa-solid fa-code"></i></div>
            <div><div style="font-weight:700; color:var(--text-dark, #1e293b); font-size:12px;">EX YOUSUF HUZAIFA</div><div style="font-size:10.5px;font-weight:600;color:#cca24a;">Developer Profile</div></div>
        </a>`;

        if (!items) {
            items = `<div style="text-align:center;padding:12px;font-size:13px;color:#999;">Visit our <a href="help-center.html" style="color:var(--primary);">Help Center</a></div>`;
        }

        const body = document.getElementById('sa-sp-body');
        if (body) body.innerHTML = items;
    }

    // Populate immediately if settings loaded, else wait for storeDataLoaded
    if (window.siteSettings && Object.keys(window.siteSettings).length > 0) {
        populateSupportPopup();
    } else {
        document.addEventListener('storeDataLoaded', populateSupportPopup);
    }
}

// Inject after DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFloatingSupportButton);
} else {
    injectFloatingSupportButton();
}
