// Local Storage Key
const STORAGE_KEY = 'invitationFamilies';

// --- PERSISTENCE AND ID MANAGEMENT ---

// Function to generate a new unique ID
function getNextId(familiesArray) {
    if (familiesArray.length === 0) return 1;
    // Find the highest existing ID and add 1
    const maxId = familiesArray.reduce((max, family) => Math.max(max, family.id || 0), 0);
    return maxId + 1;
}

// Function to assign IDs to families that don't have one (useful for default data)
function ensureIds(familiesArray) {
    familiesArray.forEach(family => {
        if (family.id === undefined) {
            // Assign a new ID only if it doesn't already have one
            family.id = getNextId(familiesArray);
        }
    });
    return familiesArray;
}

// Function to load families data from Local Storage
function loadFamilies() {
    const savedFamilies = localStorage.getItem(STORAGE_KEY);
    if (savedFamilies) {
        try {
            const loadedData = JSON.parse(savedFamilies);
            // Ensure loaded data has IDs
            return ensureIds(loadedData);
        } catch (e) {
            console.error("Error parsing saved families data:", e);
            return null;
        }
    }
    return null;
}

// Function to save the current families array to Local Storage
function saveFamilies() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(families));
}

// --- INITIALIZATION ---

// Define HTML elements
const areaFilter = document.getElementById('area-filter');
const nameFilter = document.getElementById('name-filter');
const familyTable = document.getElementById('family-table');
const totalHaldiInvitedSpan = document.getElementById('total-haldi-invited');
const totalWalimaInvitedSpan = document.getElementById('total-walima-invited');
const totalMoneyRupeesSpan = document.getElementById('total-money-rupees');
const clearAllBtn = document.getElementById('clear-all-btn');
const addFamilyBtn = document.getElementById('add-family-btn');
const summaryContent = document.getElementById('summary-content');


// Define family data for "Gothda" and "Ranpur" areas with default values for tracking
// NOTE: IDs will be assigned on initialization
const defaultFamilies = [
    // Data for Saiyed Wada
    { name: 'Saiyed Shamimhaider Jalaluddin Bukhari (Sajjadanashin)', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Akilabbas Sirajuddin Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Azharabbas Sirajuddin Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammad Raza Nasiruddin Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Mustufahusain Fajlehusain Bukhari', area: 'SaiyedWada', members: 10 },
    { name: 'Saiyed Mohammad Munaf Kammarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Husainmiya Kammarhusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Badamiya Husainmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Kararhusain Husainmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Aaftabahusain Husainmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Mehtabhusain Husainmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Rajumiya Husainmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Ibnehasan Khursidhusain Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Aliabbas Altafusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Aabedabanu Samasuddin Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Mohammad Sakil (Hajibhai) Ikramhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mustufahusain Akhtarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Sarfarazhusain Gulamhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Abbashusen Gulamhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Jaminali Irsadali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mehboobali Gulamhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Kamarali Gulamhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Vasimraza Abbasali Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Karamatali Irsadali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Mujahidhusain Mehamudhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Haiderali Najarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammad Taqi Wajidhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Sakirhusain Abidhusain a Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Aamirabbas Akbarali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Mohammad Sadik Akbarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyeda Sajiabanu Zaheerabbas', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed MohammadFaazil Liyaqatali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammad Rizvan Riyazali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Mohammad Ashfaq Razahusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammad MunafRazahusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed MohammadMubin Munavvarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammadmubaseer Munavvarhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed mohammad Zaid Munavvarhusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Nasirhusain Khilafathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Shaukatali Ikramhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Najarali Kararhusain Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Bandeali Kararhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Gulam Mohammad Kararhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Pathan Firozkhan Basirkhan', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Sarfarazhusain Makhdumaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Saiyedhusain Makhdumaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyeda Badiapa Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyeda Nasimbanu Iftekharhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Ahmedali Mumtajali Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Akbarhusain Barqatali Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Asifali Sabbirali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Basaratali Altafusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammad Jafar Karamathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Sarfunnisha Asifusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Munavvarhusain Kammarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohsinhusain Mustaqali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Shaikh Imtyaz Jafarbhai', area: 'SaiyedWada', members: 8 },
    { name: 'Pathan Aabid Liyakarkhan', area: 'SaiyedWada', members: 8 },
    { name: 'Pathan Aarifan Anwarkan (Anu Raja)', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Aasifali Sabbirali', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Imtyazhusain Iftekharhusain', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammadkazim Sakhawathusain Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Irfanhaider Bandeali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Saiyedmohammad Gulamhaider Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Moammadibegum Murtuzahusain Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Mohammad Mazhar Alinaqi Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyeda Masumabanu alinaki', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Jafarali Gulamhaider Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Mohsinhaider Murtuzahusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Siqandarhusain Gulamabbas Bukhari', area: 'SaiyedWada', members: 11 },
    { name: 'Saiyed Tajammulhusain Tasavvurhusain Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Imdadhusain Tasavvurhusain Bukhari', area: 'SaiyedWada', members: 10 },
    { name: 'Saiyed Maksudali Gazanfrali Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Imdadali Jegamali Bukhari', area: 'SaiyedWada', members: 9 },
    { name: 'Shaikh Raziyabanu Bahadurmiya', area: 'SaiyedWada', members: 5 },
    { name: 'Maulana Aza e Zehra', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Hasanabbas Makhdumaali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Jalal Haider Makhdumaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Askarali Kasamaali Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Hafizali Kasamaali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Abidali Kasamaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Ikhtyarali Kasamaali Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Akbarali Kasamaali Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Afrozhusain Husainmiya Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Gulamali Kazamali Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Saberabanu Gulamraza Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Ajazhusain Gulamhaider Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Saiyedmehmud Gulamhaider Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Yusufali Ahmedhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Sahsahebmiya Mustaqhusain Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Anavarali Mohammadali Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Azazhusain Mohammadhafiz Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Istyaqhusain Gulammehdi Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Sarafathusain Gulammehdi Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Virasathusain Haidermiya Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Naved Yusufali Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Mazharabbas Khursidabbas Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyeda Nusaratjahan Sarafatali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Jakirabanu Mohammad Javid Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Niyamatali Miyasahebmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Inayathusain Amirmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Aasikhusain Inayahusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Sakirhusain Inayathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Munavvarali Abbasali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Saiyedali Imdadali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Mudassarhusain Makhdumahusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Maqbulhusain Manzurhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Yaqubhusain Amirmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Irfanhaider Mohammadhaider Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammadabbas Askarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Jafarabbas Bupumiya Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Nisarhusain Haiderhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Irfanhaider Haiderhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Moinhaider Haiderhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Gulamhusain Alihusain Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Fajlehusain Alihusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Kanizeabbas Abbashusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Safaqathusain Inayathusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Vajirali Najarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Nasirhusain Ahmedhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Dolatali Niyamatali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Zaqirhusain Ahmedhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Munafahmed Nazimhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Ahmedhusain Alihusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyeda Saiyedakhatun Iqbalhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Akbarhusain Gulammurtuza Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Sarfarazhusain Inayathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Sirajali Manzurali Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Abrarhusain Sakilbhai Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Munavvarhusain Khilafathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Nasirhusain Samasuddin Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Aliraza Nisarhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Javedahmed Ikhtyarali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Hasanabbas Nisarhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Baqarali Gulamsaahmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammadasfaq Istyaqhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Fajlehusain Masumali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Kaniz e husain d/o Alihusain Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Jalali Babubhai', area: 'SaiyedWada', members: 5 },

    // Roza Aage area data
    { name: 'Saiyed Azizhusain Mehmudhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Sadiqali Ahmedali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Haiderali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Asagarali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Sirajali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Mohammadali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Azazali Ahmedali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Zahirabbas Abulqasim Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyeda Naazfatema Abidali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Najarabbas Mirsabmiya Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mohammadabbas Gulammurtuza Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Munavvarhusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Murtuzahusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Musarafusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mukhhtyarhusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Meharhusain Mumtajhusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Mumtajhusain Mustaqhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mehtabhusain Mustaqhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mohammadhusain Vilayathusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed ZaheerabbasSajjadhusain Bukhari', area: 'Roza Aage', members: 8 },
    { name: 'Saiyed Mehdihasan Khilafathusain Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Musahidali Barqatali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Gulamali Raju Barqatali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Mohammadtaqi Jafarali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyeda Sabihaider Khadimhusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyeda Farzanabanu Jakirhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Javedahmed Jakarabbas Bukhari', area: 'Roza Aage', members: 9 },
    { name: 'Saiyed Sibtehasan Jakarabbas Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Nasirabbas Jakarabbas Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Mohammadhusain Saiyedali Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Mustufahusain Saiyedali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Alihaider Saiyedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Zahidali Gazanfrali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Mohammad Mehdi Tofiqhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Tafakkarhusain Alihusain Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyed Jisanhusain Akhtarhusain Bukhari', area: 'Roza Aage', members: 8 },
    { name: 'Saiyed Hasanabbas Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed ################ Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed ################ Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed ################ Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Sabbirhusain Husainmiya Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Mukhhtyarhusain Fajleali Bukhari', area: 'Roza Aage', members: 10 },
    { name: 'Saiyed Fajleabbas Gulamhusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Fajlemohammad Gulamhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Firozhaider Istyaqhusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Jisaanali Aabidali Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Shahidali Azazhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mohammadsalim Fajlehusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyeda Saiyedakhatun D/o Husainmiya Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyed Liyaqatali Sabirali Bukhari', area: 'Roza Aage', members: 10 },
    { name: 'Saiyed Arifahmed Abidali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Mukimahmed Abidali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Asifusain Imdadhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Atfusain Altafusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mohammad Irfan Murtuzahusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Sohebmohammad Murtuzahusain Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Intekhabahmed Makhdumaali Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Masumrazaa Abidali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Imtyazali Gulamhusain Bukhari', area: 'Roza Aage', members: 10 },
    { name: 'Saiyed Zamirabbas Saukathusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Fazlehusain Ziyauddin Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyeda ############ Jafarhusain Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyed Amirabbas Bukhari Kodinarwala', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Anavarali Mohammadali Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Gulamhusain Haiderhusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Musarafusain Khadimhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Anavarunnisha Rahemathusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed MohammedSohel Zulfiqarli Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Mrs. Saiyeda Kanuaapa Bupumiya Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyed Kasimaali Sabbirali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Safatali Gulamali Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Sarafatali Gulamali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Sababhaider Tahirali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Arifali Gulamali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Jafarhusain Gulamali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Amjadali Gazanfrali Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Vilayathusain Gulamsaahmiya Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyeda Rizwanabanu V. (Judge Saheb)', area: 'Roza Aage', members: 3 },
    { name: 'Saiyeda Fajle Abbas Gulamabbas Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyeda Vajirbibi Haidermiya Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyed Manubhai Sagirabbas', area: 'Roza Aage', members: 4 },
    // DholkiWada area data
    { name: 'Nanuumiya shaikh (metro cycle)', area: 'DholkiWada', members: 15 },
    { name: 'Shaikh Husainmiya Noormiya', area: 'DholkiWada', members: 3 },
    { name: 'Dr. Yusufhai Amirmiya', area: 'DholkiWada', members: 4 },
    { name: 'Babumiya Lalumiya', area: 'DholkiWada', members: 4 },
    { name: 'Perumiya lalumiya', area: 'DholkiWada', members: 5 },
    { name: 'Anumiya Lalumiya', area: 'DholkiWada', members: 8 },
    { name: 'Rasulmiya Lalumiya', area: 'DholkiWada', members: 6 },
    { name: 'Mehmoodmiya Garagewale', area: 'DholkiWada', members: 2 },
    { name: 'Umarbhai Tractorwale', area: 'DholkiWada', members: 4 },
    { name: 'Mehboobhai Nizamoddin Pinjara', area: 'DholkiWada', members: 4 },
    { name: 'Alubhai badarbhai', area: 'DholkiWada', members: 5 },
    { name: 'Saiyed Saidumiya Nabumiya', area: 'Sipai Wada', members: 4 },
    { name: 'Saiyed Inayatali Nabumiya', area: 'Sipai Wada', members: 5 },
    { name: 'Saiyed Imdadali Nabumiya', area: 'Sipai Wada', members: 4 },
    { name: 'Saiyed Akbarali Amumiya', area: 'Sipai Wada', members: 5 },
    { name: 'Saiyed Afzal Jalalmiya', area: 'Sipai Wada', members: 3 },
    { name: 'Saiyed Sadik Jalalmiya', area: 'Sipai Wada', members: 3 },
    { name: 'Saiyed Miramiya Ahmedmiya', area: 'Sipai Wada', members: 7 },
    { name: 'Saiyed Sadiqmiya Yasinmiya', area: 'Sipai Wada', members: 4 },
    { name: 'Malek Mohammadmiya Najumiya', area: 'Sipai Wada', members: 5 },
    { name: 'Malek Bachumiya Najumiya', area: 'Sipai Wada', members: 4 },
    { name: 'Malek Salimmiya Babarmiya', area: 'Sipai Wada', members: 2 },
    { name: 'Malek Usmaanamiya Allahrakhamiya', area: 'Sipai Wada', members: 4 },
    { name: 'Malek Rahimmiya Allahrakhamiya', area: 'Sipai Wada', members: 5 },
    { name: 'Malek Rasulmiya Allahrakhamiya', area: 'Sipai Wada', members: 4 },
    { name: 'Pathan Sabirkhan Sujaatkhan', area: 'Sipai Wada', members: 4 },
    { name: 'Pathan Abdullaakhan Usmaanakhan', area: 'Sipai Wada', members: 3 },
    { name: 'Pathan Yusufhan Usmaanakhan', area: 'Sipai Wada', members: 4 },
    { name: 'Pathan Eyyaubakhan Usmaanakhan', area: 'Sipai Wada', members: 4 },
    { name: 'Pathan Sultanakhan Usmaanakhan', area: 'Sipai Wada', members: 4 },
    { name: 'Pathan Asadkhan Joravarkhan', area: 'Sipai Wada', members: 5 },
    { name: 'Pathan Jafarkhan Joravarkhan', area: 'Sipai Wada', members: 2 },
    { name: 'Pathan Kalekhan Sadakhan', area: 'Sipai Wada', members: 4 },
    { name: 'Shaikh Rahimmiya Aalammiya', area: 'Sipai Wada', members: 5 },
    { name: 'Hasan Bawa (Badepir Ki Gadiwale)', area: 'Sipai Wada', members: 4 },
    { name: 'Amjadbhai Babu Bhai & Family', area: 'Sipai Wada', members: 8 },
    { name: 'Saiyed Bhai (Pirana Wale)', area: 'Sipai Wada', members: 4 },
    { name: 'Siddiqui Samabanu', area: 'Sipai Wada', members: 3 },
    
    // Vhorvad area data
    { name: 'Saiyed Vasimhaider Nizamali Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Mohammadraza Khilafathusain Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Mohammadanish Maqbulhusain Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Maqbulhusain Barqatali Bukhari', area: 'Vhorvad', members: 1 },
    { name: 'Saiyed Vajirali Baqarali Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed SalimAltaf Maqbulhusain Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Nisarhusain Amaanathusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Mohsinali Istyaqahmed Bukhari', area: 'Vhorvad', members: 2 },
    { name: 'Saiyed Khursidabbas Anavarali Bukhari', area: 'Vhorvad', members: 2 },
    { name: 'Saiyed Khursidhusain Shaukatali Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Hasanabbas Abbashusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Kanize Zehra Mohammad Sakil (Daryapurwala)', area: 'Vhorvad', members: 6 },
    { name: 'Saiyed Ikhlaqhusain Iqbalhusain Bukhari', area: 'Vhorvad', members: 6 },
    { name: 'Saiyed Hasanali Ahmedali Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Munavvarali Zaqirali Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Hasan Akhtar Tafakkarhusain Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Rathod Sabirmiya Amirmiya', area: 'Vhorvad', members: 2 },
    { name: 'Rathod Munirbhai Amirmiya', area: 'Vhorvad', members: 8 },
    { name: 'Pathan Ajabkhan Abbaskhan', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Burhanauddin Mustufahusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Mohammadakil Maqbulhusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Kadri Afzal Kausarali', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Bakarali Saiyedmohammad Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Ruknoddin Nazirhusain Bukhari', area: 'Vhorvad', members: 4 },
    // Kutbi Mohalla area data
    { name: 'Saiyed Mukhhtyahusain Khilafathusain Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Iftekharahmed Gulamhusain Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Mujahidhusain Muzafarhusain Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Mirali Kadumiya Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Murtuzahusain Mirali Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Fazlehusain Mirali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Mohammed Tahir Mirali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Zakirhusain Mirali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Aliahmed Mirali Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Samir Mohammadamin Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Kazi Usmanabhai', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Dr.M.M. Saiyed', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Kaniz e Butul Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 1 },
    { name: 'Saiyeda Khursidabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Amirabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Zaheerabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Akeelabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Mohammadrazak Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 6 },
    { name: 'Saiyed Nahidhusain Maustufahusain', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Karamatali Miyasahebmiya Bukhari', area: 'Kutbi Mohalla', members: 7 },
    { name: 'Saiyed Ahmedali Babarali Bukhari', area: 'Kutbi Mohalla', members: 6 },
    { name: 'Saiyed Rashidali Babarali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Ashiqhusain Gulammehdi Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Mustaqhusain Yaqubhusain Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Nazirhusain Yaqubhusain Bukhari', area: 'Kutbi Mohalla', members: 6 },
    { name: 'Saiyed Samimhaidar Sajjadhusain Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Noorali Sajjadhusain Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Aliraza Sajjadhusain Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Shaikh Abdulakadar', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Kadri Aslam Kausarali', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Riyazali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Nisarali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Naushadali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Vikarali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Saiyedabbas Gulamabbas Bukhari', area: 'Kutbi Mohalla', members: 6 },
    { name: 'Saiyed Jalaluddin Muzafarhusain Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Munavvarhusain Kasamaali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Pinjara Sarfuddinbhai Nizamuddin', area: 'Kutbi Mohalla', members: 7 },
    { name: 'Saiyed Rajahusain (police-Gothdawale)', area: 'Kutbi Mohalla', members: 6 },
    //Data for Mustaq Society
    { name: 'Saiyed Nasirhusain Gulamhusain Bukhari', area: 'Mustaq Society', members: 5 },
    { name: 'Saiyed Azazhusain Pyaaresab Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Ahmedhusain Razahusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Haiderhusain Razahusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Mehmudhusain Razahusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Nizamali Naazirhusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Karamathusain Kambarhusain Bukhari', area: 'Mustaq Society', members: 8 },
    { name: 'Saiyed Manzurhusain Altafusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Asrafusain Gulamhusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Khatbhaider Mohammadhusain Bukhari', area: 'Mustaq Society', members: 2 },
    { name: 'Saiyed Zulfikarali Altafusain Bukhari', area: 'Mustaq Society', members: 7 },
    { name: 'Saiyed Ahmedhusain Mustaqhusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Mustaqhusain Yusufali Bukhari', area: 'Mustaq Society', members: 2 },
    { name: 'Saiyed Iftekharhusain Makhdumaali Bukhari', area: 'Mustaq Society', members: 2 },
    { name: 'Saiyed Sajjadhusain Saiyedmohammad', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Mohammad Mohsin Saahasaahmiya Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Parvezahmed Imtyazali Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Jalali Kurbaanaali', area: 'Mustaq Society', members: 5 },
    { name: 'Saiyed Sajjadhusain Saiyedmohammad Bukhari', area: 'Mustaq Society', members: 4 },

    //Data for Saibaba And Noor Nagar B/H Golden
    { name: 'Saiyed Afzalhusain Husainmiya Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 8 },
    { name: 'Saiyeda Saiyedakhatun Asadali', area: 'Saibaba And Noor Nagar B/H Golden', members: 2 },
    { name: 'Saiyed Mustakali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Riyazali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Mukhatyarali Saukarali', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Aabidali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Ahmedali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Mohsinhusain Maqbulhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Abbashusain Maqbulhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Javidbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Zahirbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Sadikbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Firozbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 2 },
    { name: 'Saiyed Munavvarhusain Yaqubhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyed Meharali Abbasali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 6 },
    { name: 'Saiyed Mohammad Ilyas Gulamali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyed Sakhawathusain Manzurhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 6 },
    { name: 'Saiyed Misamraza Tafakkarhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyeda Afzalunnissah Mohammadfazil Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Mo.Amir Hafizhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Kutbuddin Gulamali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 2 },
    { name: 'Saiyed Gulamaraza Shabbirali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyed Murtuzaali Shabbirali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Munazirhusain Mohammadhusain', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Abidali Shabbirali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Firozhaider Hamidabbas Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Haiderabbas Fajleali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 8 },
    { name: 'Saiyed Hasanabbas Fajleali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Hasanabbas Amirabbas Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed SarjilAhmed Mehboobali', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed MirleshAhmed Mehboobali', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    //Data for Bibi Talav
    { name: 'Saiyed Nasirhusain Mirsabmiya Bukhari', area: 'Bibi Talav', members: 2 },
    { name: 'Saiyed Ziyauddin Mirsabmiya Bukhari', area: 'Bibi Talav', members: 4 },
    { name: 'Saiyed Raufahmed Mehmudhusain Bukhari', area: 'Bibi Talav', members: 5 },
    { name: 'Saiyed Imtyazali Makhdumaali Bukhari', area: 'Bibi Talav', members: 6 },
    { name: 'Saiyed Burhanauddin Zahidali Bukhari', area: 'Bibi Talav', members: 6 },
    { name: 'Saiyed Kanize Zehra Navajisali Bukhari', area: 'Bibi Talav', members: 2 },
    { name: 'Saiyed Maksudali Asadali Bukhari', area: 'Bibi Talav', members: 7 },
    { name: 'Saiyed Nasirahmed Sadiqali Bukhari', area: 'Bibi Talav', members: 5 },
    { name: 'Saiyed Istyaqhusain Yaqubhusain Bukhari (Mayur Park)', area: 'Bibi Talav', members: 2 },
    { name: 'Saiyed Imtyazhusain Istyaqhusain Bukhari', area: 'Bibi Talav', members: 4 },
    { name: 'Saiyed Nazarabbas Istyaqhusain Bukhari', area: 'Bibi Talav', members: 4 },
    //Data for Silicon

    { name: 'Saiyed Sartajhusain Amadumiya Bukhari', area: 'Silicon', members: 3 },
    { name: 'Saiyed Mohammadali Kamarali Bukhari', area: 'Silicon', members: 5 },
    { name: 'Pinjara Sirajuuddin Nizamuddin', area: 'Silicon', members: 4 },
    { name: 'Pathan Hebatkhan Jafarkhan', area: 'Silicon', members: 4 },
    { name: 'Dr. Ziauddin Kazi', area: 'Silicon', members: 4 },

    //Data for Taslim So., Saiyedwadi And Gulmohar
    { name: 'Saiyed Imdadhusain Mohammadali Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 2 },
    { name: 'Saiyed Mirsabmiya Mohammadali Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Saiyed Najarali Maustafahusain Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Kamarali Riyazatali Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 8 },
    { name: 'Masaddi Husnoddin Dadamiya', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Masaddi Rasikali Dadamiya', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Klbe Abbas Sagirabbas', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 8 },
    { name: 'Saiyed Alamadarhusain Bupumiya', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Haiderabbas Irsadali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Mohammadhaider Gulamabbas', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Ikhtyarali Ahmedali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 9 },
    { name: 'Saiyed Saukatali Fazlubhai', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 10 },
    { name: 'Saiyed Mohammadkazim Gulamabbas', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 10 },
    { name: 'Saiyed Abbasali Baqarali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Azazhusain Varishusain', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 3 },
    { name: 'Saiyed Kammarabbas Gulamali (Mirsabnagar)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 7 },
    { name: 'Saiyed Saiyedali Razaali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Saiyed Liyaqatali Ghinuchacha', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 8 },
    { name: 'Saiyed Inayatali Saiyedmohammad Bukhari (Mirsabnagar)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    
    //Data for Jahidshah Dargah
    { name: 'Sakinapa Kalekhan', area: 'Jahidshah Dargah', members: 1 },
    { name: 'Mohabatkhan Kalekhan', area: 'Jahidshah Dargah', members: 2 },
    { name: 'Bismillahkhan Kalekhan', area: 'Jahidshah Dargah', members: 2 },
    { name: 'Aiyubkhan Kalekhan', area: 'Jahidshah Dargah', members: 2 },
    { name: 'Gulabkhan Kalekhan', area: 'Jahidshah Dargah', members: 2 },
    //data for Jain Ashram / Navapura
    { name: 'Salimkhan Ashrafhan', area: 'Jain Ashram / Navapura', members: 2 },
    { name: 'Bhgakhan Umraokhan', area: 'Jain Ashram / Navapura', members: 4 },
    { name: 'Sikandarkhan', area: 'Jain Ashram / Navapura', members: 1 },
    { name: 'Noorbai Abbasbhai', area: 'Jain Ashram / Navapura', members: 2 },
    { name: 'Aiybkhan Badekhan', area: 'Jain Ashram / Navapura', members: 4 },
    { name: 'Sabirkhan Badekhan', area: 'Jain Ashram / Navapura', members: 3 },
    { name: 'Kalekhan Badekhan', area: 'Jain Ashram / Navapura', members: 4 },
    { name: 'Jummakhan Mohammadkhan', area: 'Jain Ashram / Navapura', members: 2 },
    { name: 'Abbasmiya Hajimiya', area: 'Jain Ashram / Navapura', members: 3 },
    { name: 'Nizamkhan Gulabkhan', area: 'Jain Ashram / Navapura', members: 4 },
    //Data for Astodia 
    { name: 'Saiyeda Raziabanu Musamiya Saheb Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyed Musharafusain Nizamali Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Akhalaqahmed Nizamali Bukhari', area: 'Astodia', members: 5 },
    { name: 'Saiyed Musirabbas Mazharabbas Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyed Azazhusain Amirmiya Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Makhdoomali Razakali Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Mohammed Shakeel Karamatali Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Mohammed Fazal Karamatali Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Mohammed Naki Karamatali Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Haiderali Gulamali Bukhari', area: 'Astodia', members: 1 },
    { name: 'Saiyed Mirhasan Saiyedmohammad Bukhari', area: 'Astodia', members: 6 },
    { name: 'Saiyed Mohammadishaq Banaamiya Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Nazimhusain Banaamiya Bukhari', area: 'Astodia', members: 5 },
    { name: 'Saiyed Vahedjalal Baqarali Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Mohammadhusain Juhurhusain Bukhari', area: 'Astodia', members: 7 },
    { name: 'Saiyed Mirali Mo.Mazharuddin Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Mohammadsaeed Mo.Mazharuddin Bukhari', area: 'Astodia', members: 6 },
    { name: 'Saiyed Imtyazbhai Mohammadkazim Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyeda Aabedakhatun Nazirahmed Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Saiyedmohammad Vajahathusain Bukhari', area: 'Astodia', members: 6 },
    { name: 'Saiyed Saiyeda Sugarabibi Vajahthusain Bukhari', area: 'Astodia', members: 1 },
    { name: 'Saiyed Mukhhtyarahmed Ikhtyarali Bukhari', area: 'Astodia', members: 6 },
    { name: 'Saiyed Sirajuuddin Ikhtyarali Bukhari', area: 'Astodia', members: 7 },
    { name: 'Saiyed Sahidali Ikhtyarali Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Saleemaltaf Mohammad Sajjad Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Masumali Gulamjafar Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Khurshidabbas Pirsahabmiya Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Zahirabbas Pirsahabmiya Bukhari', area: 'Astodia', members: 4 },
    { name: 'Alvi Altafusan N', area: 'Astodia', members: 6 },
    { name: 'Alvi Zahidhusain N', area: 'Astodia', members: 4 },
    { name: 'Gazamfaruddin Madni', area: 'Astodia', members: 4 },
    { name: 'Soheb Kazee', area: 'Astodia', members: 4 },
    { name: 'Irfan Kazee', area: 'Astodia', members: 4 },
    { name: 'Alvi Imtyazbhai', area: 'Astodia', members: 2 },
    { name: 'Imranbhai Kedawala', area: 'Astodia', members: 4 },
    //Data for Shah E Alam 
    { name: 'Saiyed Tanveerahmed Pirshahabmiya Bukhari', area: 'Shah E Aalam', members: 3 },
    { name: 'Saiyed Parvezahmed Pirshahabmiya Bukhari', area: 'Shah E Aalam', members: 2 },
    { name: 'Saiyed Barqatali Karamatali Bukhari', area: 'Shah E Aalam', members: 4 },
    { name: 'Saiyed Mohammadjafar Karamatali Bukhari', area: 'Shah E Aalam', members: 3 },
    { name: 'Saiyed Firozhaidar Karamatali Bukhari', area: 'Shah E Aalam', members: 4 },
    { name: 'Saiyed Anishabbas Abulqasim Bukhari', area: 'Shah E Aalam', members: 6 },
    { name: 'Saiyed Mohammad Naqi Mohammadtaqi Bukhari', area: 'Shah E Aalam', members: 6 },
    { name: 'Saiyed Alamadarhusain', area: 'Shah E Aalam', members: 4 },
    { name: 'Sarifhan Nawabkhan Pathan', area: 'Shah E Aalam', members: 4 },
    { name: 'Mehboobkhan Nawabkhan Pathan', area: 'Shah E Aalam', members: 4 },
    { name: 'Nasirkhan Nawabkan Pathan', area: 'Shah E Aalam', members: 4 },
    { name: 'Sehzadkhan Nasirkhan Pathan', area: 'Shah E Aalam', members: 4 },
    { name: 'Memon Yunusbhai', area: 'Shah E Aalam', members: 4 },
    { name: 'Memon Sajidbhai', area: 'Shah E Aalam', members: 4 },
    { name: 'Memon Imranbhai', area: 'Shah E Aalam', members: 4 },
    { name: 'Tirmizi Tasleemaalam Bawasaheb', area: 'Shah E Aalam', members: 4 },
    { name: 'Naseemkhan Pathan', area: 'Shah E Aalam', members: 4 },
    //Data for Juhapura 
    { name: 'Saiyed Azazhusain Kmaalauddin Bukhari', area: 'Juhapura', members: 6 },
    { name: 'Saiyed Tajammulhusain Asrafusain Bukhari', area: 'Juhapura', members: 6 },
    { name: 'Saiyeda Amirunnisha Aliraza Bukhari', area: 'Juhapura', members: 5 },
    { name: 'Saiyed Arsadali Alihasan Bukhari', area: 'Juhapura', members: 5 },
    { name: 'Saiyed Naeemahmed Mo.Bakir Bukhari', area: 'Juhapura', members: 5 },
    { name: 'Saiyed Khursidhusain Asgarhusain Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Mehbubali Sajjadhusain Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Baurhanauddin Vajahthusain Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Aehasan Pirshabmiya Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Fatehali Gulamjafar Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyeda Aakelabanu Sarafatali Bukhari', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Mo.Haider Istyaqhusain Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Iftekharahmed Fazalmiya Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Mohsinhusain Haiderali Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Riyazahmed Mukhtyarahmed Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Mohammed Rizwan Mohammed Bakir Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Vajahathusain Saiyedmohammad Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Jenumiya Sakhawathusain Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Sufi Anwerbhai', area: 'Juhapura', members: 4 },
    { name: 'A J Memon Sahab', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Badreaalam', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Aarifusain Gulamhusain Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saeedbhai (Goodluck Garment)', area: 'Juhapura', members: 4 },
    // Jamalpur and Raikhad
    { name: 'Sattarbhai Didahbhai', area: 'Jamalpur and Raikhad', members: 3 },
    { name: 'Advocate Inayarkhan Pathan', area: 'Jamalpur and Raikhad', members: 4 },
    { name: 'Saiyed Haiderabbas Khursidabbas Bukhari', area: 'Jamalpur and Raikhad', members: 4 },
    { name: 'Saiyed Liyaqatali Najarali Bukhari', area: 'Jamalpur and Raikhad', members: 5 },

    // Khanpur
    { name: 'Saiyed Haiderabbas Najarabbas Bukhari', area: 'Khanpur', members: 2 },
    { name: 'Saiyed Mohammad Raza Haiderali Bukhari', area: 'Khanpur', members: 4 },
    { name: 'Saiyed Alinaqi Siraji', area: 'Khanpur', members: 3 },
    { name: 'Ajimbhai Panjabi', area: 'Khanpur', members: 4 },
    { name: 'Chauhan Abdulkader', area: 'Khanpur', members: 4 },
    { name: 'Gyasoddin Shaikh', area: 'Khanpur', members: 4 },
    { name: 'Sajjadanaseen Saiyed Arsadali A', area: 'Khanpur', members: 4 },
    { name: 'Isaaji Thakor', area: 'Khanpur', members: 4 },

    // Dhandhuka/Padana
    { name: 'Saiyed Chotumiya Bikhumiya Bukhari', area: 'Dhandhuka/Padana', members: 5 },
    { name: 'Saiyeda Dolatunnisa Gulamabbas Bukhari', area: 'Dhandhuka/Padana', members: 1 },
    { name: 'Saiyed Akramraza Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 4 },
    { name: 'Saiyed Daulatali Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 5 },
    { name: 'Saiyed Haidarabbas Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 4 },
    { name: 'Saiyed Imtyazali Ikramhusain Bukhari', area: 'Dhandhuka/Padana', members: 4 },
    { name: 'Saiyed Samimahmed Ikramhusain Bukhari', area: 'Dhandhuka/Padana', members: 4 },
    { name: 'Saiyed Baqarali Saiyedali Bukhari', area: 'Dhandhuka/Padana', members: 6 },

    // Data for Ranpur
    { name: 'Saiyeda Asrafunnisha Mo.Husain Bukhari', area: 'Ranpur', members: 2 },
    { name: 'Saiyed Mehtabhusain Iqbalhusain Bukhari', area: 'Ranpur', members: 5 },
    { name: 'Saiyed Saiyedmohammad Sabbirhusain Bukhari', area: 'Ranpur', members: 2 },
    { name: 'Saiyed AhmedHusain Abidhusain Bukhari', area: 'Ranpur', members: 2 },
    { name: 'Saiyed Maksudali Abidhusain Bukhari', area: 'Ranpur', members: 1 },
    { name: 'Saiyed Mehboobhusain Sakhavathusain Bukhari', area: 'Ranpur', members: 4 },
    
    // Data for Gothda
    { name: 'Saiyed Nazimhusain Liyaqatali Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Ahmedali Makhdumaali Bukhari', area: 'Gothda', members: 4 },
    { name: 'Saiyed Mazharali Kamarali Bukhari', area: 'Gothda', members: 3 },
    { name: 'Saiyed Ashiqhusain Khilafathusain Bukhari', area: 'Gothda', members: 4 },
    { name: 'Saiyed Mo. Iqbal Sgarali Bukhari', area: 'Gothda', members: 4 },
    { name: 'Saiyed Mo. Bakir Asgarali Bukhari', area: 'Gothda', members: 4 },
    { name: 'Saiyed Maksoodali Sadatali Bukhari', area: 'Gothda', members: 3 },
    { name: 'Saiyed Arifali Sadatali Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Liyakatali Inayatali Baroda', area: 'Gothda', members: 2 },
    { name: 'Saiyed Mohsinhusain Jalalludin Bukhari', area: 'Gothda', members: 4 },
    { name: 'Saiyed Zakirhusain Gulamhusain Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Liyakatali Kamarali Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Mehboob Jafarali Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Yasinali Hasanali Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Istyakhusain Pyaresahab Bukhari', area: 'Gothda', members: 3 },
    { name: 'Saiyed Kazamali Pyaresahab Bukhari', area: 'Gothda', members: 2 },
];


// Initialize the families array: Load saved data first, or use the default list with IDs
let families = loadFamilies() || ensureIds(defaultFamilies);

// Function to render the table rows based on filters
// Function to render the table rows based on filters
function renderTable() {
    const tableBody = familyTable.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    // Area filter now uses the value from the text input
    const areaValue = areaFilter.value.toLowerCase(); 
    const nameValue = nameFilter.value.toLowerCase();

    // Filter the families array
    const filteredFamilies = families.filter(family => {
        // Area match check: Check if the family area INCLUDES the search text (partial match)
        const areaMatch = family.area.toLowerCase().includes(areaValue);
        // Name match check
        const nameMatch = family.name.toLowerCase().includes(nameValue);
        
        return areaMatch && nameMatch;
    });

    filteredFamilies.forEach((family) => {
        // Use family.id instead of index for onchange and onclick
        // Main.js के renderTable() फंक्शन के अंदर, इसे बदलें
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${family.area}</td>
            <td>${family.name}</td>
            <td>${family.members}</td>
            <td><input type="number" min="0" value="${family.haldiInvite || 0}" onchange="updateFamilyData(${family.id}, 'haldiInvite', this.value)"></td>
            <td><input type="number" min="0" value="${family.walimaInvite || 0}" onchange="updateFamilyData(${family.id}, 'walimaInvite', this.value)"></td>
            <td><input type="number" min="0" value="${family.moneyGiven || 0}" onchange="updateFamilyData(${family.id}, 'moneyGiven', this.value)"></td>
            <td>
                <button class="clear-family-btn" onclick="clearFamilyEntry(${family.id})">Clear</button>
                <button class="delete-family-btn" onclick="deleteFamily(${family.id})">Delete</button>
            </td>
        `;
    });

    renderTotals();
    renderSummary();
    // populateAreaFilter() call is removed here.
}

// Function to update data when input fields change (Uses ID)
function updateFamilyData(familyId, key, value) {
    // Find the correct family object using its unique ID
    const familyToUpdate = families.find(f => f.id === familyId);

    if (familyToUpdate) {
        // Ensure the value is a number and update the family object
        familyToUpdate[key] = parseInt(value) || 0; 
        
        // Save the entire list to Local Storage every time data is updated
        saveFamilies(); 
        
        // Re-render totals and summary
        renderTotals();
        renderSummary();
    } else {
        console.error(`Family with ID ${familyId} not found.`);
    }
}

// Function to clear a single family's invite/money data (Uses ID)
function clearFamilyEntry(familyId) {
    const familyToClear = families.find(f => f.id === familyId);

    if (familyToClear) {
        familyToClear.haldiInvite = 0;
        familyToClear.walimaInvite = 0;
        familyToClear.moneyGiven = 0;
        
        // Save the cleared data
        saveFamilies();
        
        // Re-render the table to reflect the changes
        renderTable(); 
    }
}

// Function to permanently delete a family from the list (Uses ID)
function deleteFamily(familyId) {
    if (confirm(`Are you sure you want to permanently delete this family (ID: ${familyId})? This action cannot be undone.`)) {
        
        // Find the index of the family to delete
        const familyIndex = families.findIndex(f => f.id === familyId);

        if (familyIndex !== -1) {
            // Remove the family from the array
            families.splice(familyIndex, 1);
            
            // Save the updated list to Local Storage
            saveFamilies(); 
            
            // Re-render the table to reflect the changes
            renderTable();
            alert(`Family has been deleted.`);
        } else {
            console.error(`Family with ID ${familyId} not found for deletion.`);
        }
    }
}

// Function to calculate and render totals
function renderTotals() {
    let totalHaldi = 0;
    let totalWalima = 0;
    let totalMoney = 0;

    families.forEach(family => {
        totalHaldi += family.haldiInvite || 0;
        totalWalima += family.walimaInvite || 0;
        totalMoney += family.moneyGiven || 0;
    });

    totalHaldiInvitedSpan.textContent = totalHaldi;
    totalWalimaInvitedSpan.textContent = totalWalima;
    totalMoneyRupeesSpan.textContent = totalMoney.toLocaleString('en-IN'); // Format with Indian locale for commas
}

// Function to handle adding a new family
// Function to handle adding a new family
function addNewFamily() {
    const newArea = document.getElementById('new-area').value.trim();
    const newName = document.getElementById('new-name').value.trim();
    const newMembers = parseInt(document.getElementById('new-members').value);
    const newHaldi = parseInt(document.getElementById('new-haldi').value) || 0;
    const newWalima = parseInt(document.getElementById('new-walima').value) || 0;
    const newMoney = parseInt(document.getElementById('new-money').value) || 0;

    if (newName && newArea && newMembers > 0) {
        const newFamily = {
            // Assign a new unique ID
            id: getNextId(families),
            name: newName,
            area: newArea,
            members: newMembers,
            haldiInvite: newHaldi,
            walimaInvite: newWalima,
            moneyGiven: newMoney
        };
        
        // Add the new family
        families.push(newFamily);
        
        // Save the updated list to Local Storage
        saveFamilies(); 
        
        renderTable();

        // Clear the form fields
        document.getElementById('new-area').value = '';
        document.getElementById('new-name').value = '';
        document.getElementById('new-members').value = '';
        document.getElementById('new-haldi').value = '0';
        document.getElementById('new-walima').value = '0';
        document.getElementById('new-money').value = '0';

        // --- NEW LINE: Success Message ---
        alert(`✅ Family '${newName}' (Area: ${newArea}) successfully added and saved.`);
        // ----------------------------------

    } else {
        alert('Please fill in Family Name, Area, and ensure Total Members is greater than 0.');
    }
}

// --- IMPROVED clearAllData (Keeps all families, resets counts) ---
function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This will reset all Haldi/Walima invites and Money Contributions to zero, but will keep all family names in the list.')) {
        
        // Reset counts for ALL families, including newly added ones
        families.forEach(family => {
            family.haldiInvite = 0;
            family.walimaInvite = 0;
            family.moneyGiven = 0;
        });

        // Save the reset data to Local Storage
        saveFamilies(); 
        
        renderTable();
        alert('All invite and money data has been reset to zero.');
    }
}

// --- NEW FUNCTION: Export Data to CSV ---
function exportToCSV() {
    if (families.length === 0) {
        alert("There is no data to export.");
        return;
    }

    // 1. Define the CSV Header (Columns requested by the user)
    const headers = [
        "Family Name",
        "Area",
        "Haldi Invite",
        "Walima Invite",
        "Money Given"
    ];
    
    // 2. Map the data to the CSV rows
    const csvRows = families.map(family => {
        return [
            `"${family.name.replace(/"/g, '""')}"`, // Handle names with commas/quotes by wrapping in quotes
            `"${family.area.replace(/"/g, '""')}"`,
            family.haldiInvite || 0,
            family.walimaInvite || 0,
            family.moneyGiven || 0
        ].join(','); // Join the values with commas
    });

    // 3. Combine header and rows
    const csvContent = [
        headers.join(','), // First row is the header
        ...csvRows        // Rest are the data rows
    ].join('\n'); // Join all rows with a newline character

    // 4. Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    
    // Create a timestamped filename (e.g., Invitation_Data_20251027.csv)
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10).replace(/-/g, '');
    link.setAttribute('download', `Invitation_Data_${dateString}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Data for ${families.length} families exported successfully to CSV!`);
}
// ------------------------------------------
// Function to render the area-wise summary
function renderSummary() {
    let totalMembersCount = 0;
    const areaSummary = {};
    const moneyGivers = [];

    families.forEach(family => {
        totalMembersCount += family.members;
        
        // Initialize area summary if it doesn't exist
        if (!areaSummary[family.area]) {
            areaSummary[family.area] = { members: 0, haldi: 0, walima: 0, money: 0 };
        }

        const haldi = family.haldiInvite || 0;
        const walima = family.walimaInvite || 0;
        const money = family.moneyGiven || 0;

        areaSummary[family.area].members += family.members;
        areaSummary[family.area].haldi += haldi;
        areaSummary[family.area].walima += walima;
        areaSummary[family.area].money += money;

        if (money > 0) {
            moneyGivers.push({ name: family.name, amount: money });
        }
    });

    let summaryHtml = `<div><strong>Total Members (All Areas): ${totalMembersCount}</strong></div>`;

    for (const area in areaSummary) {
        summaryHtml += `
            <div><strong>${area}</strong>: Total Members: ${areaSummary[area].members}, 
            Haldi: ${areaSummary[area].haldi}, Walima: ${areaSummary[area].walima}, Money: ${areaSummary[area].money.toLocaleString('en-IN')}</div>
        `;
    }

    if (moneyGivers.length > 0) {
        summaryHtml += `<h2>Money Contributions:</h2>`;
        moneyGivers.sort((a, b) => a.name.localeCompare(b.name));
        moneyGivers.forEach(giver => {
            summaryHtml += `<div><strong>${giver.name}</strong>: ${giver.amount.toLocaleString('en-IN')} Rupees</div>`;
        });
    }

    summaryContent.innerHTML = summaryHtml;
}

// Event listeners
// Area filter now triggers renderTable on 'input' event (typing)
areaFilter.addEventListener('input', renderTable);
nameFilter.addEventListener('input', renderTable);

// Button Event Listeners
const exportCsvBtn = document.getElementById('export-csv-btn'); // Get the new button
clearAllBtn.addEventListener('click', clearAllData);
addFamilyBtn.addEventListener('click', addNewFamily);
exportCsvBtn.addEventListener('click', exportToCSV); // NEW LISTENER

// Initial rendering of the table when the page loads
renderTable();
