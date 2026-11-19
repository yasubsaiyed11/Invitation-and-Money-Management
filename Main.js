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


// Define family data with default values for tracking (sorted by Area, then Family Name)
// NOTE: IDs will be assigned on initialization
const defaultFamilies = [

    // Ajmer
    { name: 'Kamar Bhai', area: 'Ajmer', members: 0 },

    // AS & F&F Engineers
    { name: 'Aarif Bhai', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Aftab Sacha', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Arif Drill', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Aslam', area: 'AS & F&F Engineers', members: 1 },
    { name: 'BN Bhai', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Faisal Khatri', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Imran', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Rauf', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Rizwan', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Saddam', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Sajid Pathan', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Siddik & Sadik', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Soheb', area: 'AS & F&F Engineers', members: 1 },
    { name: 'Yakub', area: 'AS & F&F Engineers', members: 1 },

    // Astodia
    { name: 'Alvi Altafusan N', area: 'Astodia', members: 2 },
    { name: 'Alvi Imtyazbhai', area: 'Astodia', members: 0 },
    { name: 'Alvi Zahidhusain N', area: 'Astodia', members: 2 },
    { name: 'Gazamfaruddin Madni', area: 'Astodia', members: 0 },
    { name: 'Imranbhai Kedawala', area: 'Astodia', members: 0 },
    { name: 'Irfan Kazee', area: 'Astodia', members: 0 },
    { name: 'Saiyed Azazhusain Amirmiya Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Makhdoomali Razakali Bukhari', area: 'Astodia', members: 1 },
    { name: 'Saiyed Masumali Gulamjafar Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyed Mirhasan Saiyedmohammad Bukhari', area: 'Astodia', members: 7 },
    { name: 'Saiyed Mohammadishaq Banaamiya Bukhari', area: 'Astodia', members: 1 },
    { name: 'Saiyed Mohammadsaeed Mo.Mazharuddin Bukhari', area: 'Astodia', members: 6 },
    { name: 'Saiyed Mohammed Fazal Karamatali Bukhari', area: 'Astodia', members: 5 },
    { name: 'Saiyed Mohammed Fazil Saiyed Mohammed', area: 'Astodia', members: 5 },
    { name: 'Saiyed Mohammed Imtyaz Mohammadkazim Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyed Mohammed Naki Karamatali Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyed Mohammed Raza Haider Ali', area: 'Astodia', members: 3 },
    { name: 'Saiyed Mohammed Shakeel Karamatali Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyed Mohsin Haider Ali', area: 'Astodia', members: 3 },
    { name: 'Saiyed Mukhhtyarahmed Ikhtyarali Bukhari', area: 'Astodia', members: 6 },
    { name: 'Saiyed Mushavir Haider Ali', area: 'Astodia', members: 4 },
    { name: 'Saiyed Musirabbas Mazharabbas Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyed Nazimhusain Banaamiya Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyed Sahidali Ikhtyarali Bukhari', area: 'Astodia', members: 5 },
    { name: 'Saiyed Saiyeda Sugarabibi Vajahthusain Bukhari', area: 'Astodia', members: 1 },
    { name: 'Saiyed Sirajuuddin Ikhtyarali Bukhari', area: 'Astodia', members: 10 },
    { name: 'Saiyed Vahedjalal Baqarali Bukhari', area: 'Astodia', members: 3 },
    { name: 'Saiyeda Aabedakhatun Nazirahmed Bukhari', area: 'Astodia', members: 4 },
    { name: 'Saiyeda Kaniz e Zehra Hamid Abbas', area: 'Astodia', members: 2 },
    { name: 'Saiyeda Raziabanu Musamiya Saheb Bukhari', area: 'Astodia', members: 2 },
    { name: 'Saiyeda Zaheda Banu Mohammed Sajjad', area: 'Astodia', members: 2 },
    { name: 'Saiyeda Zeenatunnisa Haider Hussain', area: 'Astodia', members: 1 },
    { name: 'Soheb Kazee', area: 'Astodia', members: 0 },

    // Astodiya / Chippawad
    { name: 'Aabid Momin', area: 'Astodiya / Chippawad', members: 2 },
    { name: 'Aarif Keruwala - Aiyyub Iqbal', area: 'Astodiya / Chippawad', members: 10 },
    { name: 'Faiyaz Shaikh', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Hanif Ajmeri', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Ifthekhar Shaikh - Rafik Shaikh', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Irfan Dhepa', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Jaitun Bhabi', area: 'Astodiya / Chippawad', members: 2 },
    { name: 'Lala Fulwala', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Mariyam Bhabi', area: 'Astodiya / Chippawad', members: 2 },
    { name: 'Mehmood Keruwala', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Mulla Kasai', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Nagarsheth', area: 'Astodiya / Chippawad', members: 6 },
    { name: 'Nagorwala Mustaq', area: 'Astodiya / Chippawad', members: 3 },
    { name: 'Razzaq', area: 'Astodiya / Chippawad', members: 4 },
    { name: 'Sahana Pathan', area: 'Astodiya / Chippawad', members: 2 },
    { name: 'Sajid Lalu Bhai', area: 'Astodiya / Chippawad', members: 4 },
    { name: 'Salim Keruwala', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Shakil Nagori - Yunus', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Shaukat Kasai', area: 'Astodiya / Chippawad', members: 4 },
    { name: 'Waris Saiyed', area: 'Astodiya / Chippawad', members: 2 },
    { name: 'Yasin Anda', area: 'Astodiya / Chippawad', members: 1 },
    { name: 'Zainab Bhabi', area: 'Astodiya / Chippawad', members: 5 },

    // Bhavnagar
    { name: 'Merchant Mohammed Zain', area: 'Bhavnagar', members: 1 },

    // Bibi Talav
    { name: 'Aasif Bhai Tempo', area: 'Bibi Talav', members: 0 },
    { name: 'Arif Barber Star', area: 'Bibi Talav', members: 1 },
    { name: 'Babul Bhai', area: 'Bibi Talav', members: 0 },
    { name: 'Irfan Ajmeri', area: 'Bibi Talav', members: 1 },
    { name: 'Maa Banu Jamanat Hussain Naqvi (Shabana Heights)', area: 'Bibi Talav', members: 4 },
    { name: 'Nasir Ahmed Sadik Ali (Green Park)', area: 'Bibi Talav', members: 0 },
    { name: 'Sadik Sultan Mohammed Khan (Bachu Bhai)', area: 'Bibi Talav', members: 4 },
    { name: 'Saiyed Aasif Ali', area: 'Bibi Talav', members: 0 },
    { name: 'Saiyed Ajaz Hussain Ishtiyaq Hussain', area: 'Bibi Talav', members: 0 },
    { name: 'Saiyed Burhanauddin Zahidali Bukhari', area: 'Bibi Talav', members: 6 },
    { name: 'Saiyed Imtyazali Makhdumaali Bukhari', area: 'Bibi Talav', members: 5 },
    { name: 'Saiyed Imtyazhusain Istyaqhusain Bukhari', area: 'Bibi Talav', members: 0 },
    { name: 'Saiyed Istyaqhusain Yaqubhusain Bukhari (Mayur Park)', area: 'Bibi Talav', members: 0 },
    { name: 'Saiyed Javed Abbas Mohammed Kazim (Silver Bunglows)', area: 'Bibi Talav', members: 5 },
    { name: 'Saiyed Kanize Zehra Navajisali Bukhari', area: 'Bibi Talav', members: 2 },
    { name: 'Saiyed Khalidahmed Mehmudhusain Bukhari', area: 'Bibi Talav', members: 0 },
    { name: 'Saiyed Maksudali Asadali Bukhari', area: 'Bibi Talav', members: 7 },
    { name: 'Saiyed Mehboobali Mohammed Sajjad Bukhari', area: 'Bibi Talav', members: 4 },
    { name: 'Saiyed Mohammad Naqi Mohammadtaqi Bukhari (Shabana)', area: 'Bibi Talav', members: 4 },
    { name: 'Saiyed Musharafusain Nizamali Bukhari', area: 'Bibi Talav', members: 2 },
    { name: 'Saiyed Nasirahmed Sadiqali Bukhari', area: 'Bibi Talav', members: 5 },
    { name: 'Saiyed Nasirhusain Mirsabmiya Bukhari', area: 'Bibi Talav', members: 2 },
    { name: 'Saiyed Nazarabbas Istyaqhusain Bukhari', area: 'Bibi Talav', members: 0 },
    { name: 'Saiyed Raufahmed Mehmudhusain Bukhari', area: 'Bibi Talav', members: 5 },
    { name: 'Saiyed Zahirabbas Pirsahabmiya Bukhari (Shabana)', area: 'Bibi Talav', members: 4 },
    { name: 'Saiyed Zeeshan Haider Mohammed Sajjad', area: 'Bibi Talav', members: 3 },
    { name: 'Saiyed Ziyauddin Mirsabmiya Bukhari', area: 'Bibi Talav', members: 4 },
    { name: 'Sajju Bhai Mirza (Silver)', area: 'Bibi Talav', members: 4 },
    { name: 'Sajju Bhai Naseeb Traders', area: 'Bibi Talav', members: 0 },
    { name: 'Salim Bhai (Aman) (Bade Bhai)', area: 'Bibi Talav', members: 0 },
    { name: 'Salim Bhai (Silicon)', area: 'Bibi Talav', members: 0 },
    { name: 'Zakir Hussain Sultan Mohammed (Bachu Bhai)', area: 'Bibi Talav', members: 4 },

    // Dhandhuka/Padana
    { name: 'Saiyed Akram Raza Daood Ali', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Anwar Hussain BhikuMiya', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Daulatali Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Gulam Abbas Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Haider Abbas Chotumiya', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Imtyazali Ikramhusain Bukhari', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Mohammed Raza Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Mohsin Raza Zulfiqarali Bukhari', area: 'Dhandhuka/Padana', members: 0 },
    { name: 'Saiyed Samimahmed Ikramhusain Bukhari', area: 'Dhandhuka/Padana', members: 0 },

    // Gothda
    { name: 'Saiyed Ahmedali Makhdumaali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Arifali Sadatali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Ashiqhusain Khilafathusain Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Istyakhusain Pyaresahab Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Kazamali Pyaresahab Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Liyakatali Inayatali Baroda', area: 'Gothda', members: 0 },
    { name: 'Saiyed Liyakatali Kamarali Bukhari', area: 'Gothda', members: 1 },
    { name: 'Saiyed Maksoodali Sadatali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Mazharali Kamarali Bukhari', area: 'Gothda', members: 3 },
    { name: 'Saiyed Mehboob Jafarali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Mo. Bakir Asgarali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Mo. Iqbal Sgarali Bukhari', area: 'Gothda', members: 2 },
    { name: 'Saiyed Mo.Ali Kamarali Bukhari', area: 'Gothda', members: 1 },
    { name: 'Saiyed Mohsinhusain Jalalludin Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Nazimhusain Liyaqatali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Yasinali Hasanali Bukhari', area: 'Gothda', members: 0 },
    { name: 'Saiyed Zakirhusain Gulamhusain Bukhari', area: 'Gothda', members: 0 },

    // Hawa Engineers Account
    { name: 'Aasif Vohra', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Ayan', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Irfan Asopwala', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Naseer Mendajiwala', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Patel Bhai', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Raees Chitti', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Riyaz Bhai', area: 'Hawa Engineers Account', members: 1 },
    { name: 'Safwan', area: 'Hawa Engineers Account', members: 1 },

    // Hawa Engineers CNC 786
    { name: 'Adnan', area: 'Hawa Engineers CNC 786', members: 1 },
    { name: 'Mohsin Bhai', area: 'Hawa Engineers CNC 786', members: 1 },
    { name: 'Tofik', area: 'Hawa Engineers CNC 786', members: 1 },

    // Hawa Engineers Design
    { name: 'Dhanga', area: 'Hawa Engineers Design', members: 1 },
    { name: 'Raish Agra', area: 'Hawa Engineers Design', members: 1 },
    { name: 'Rizwan', area: 'Hawa Engineers Design', members: 1 },
    { name: 'Sabi', area: 'Hawa Engineers Design', members: 1 },

    // Hawa Engineers Ex QC Person
    { name: 'Aamir Bhai', area: 'Hawa Engineers Ex QC Person', members: 1 },
    { name: 'Gavali', area: 'Hawa Engineers Ex QC Person', members: 1 },
    { name: 'Imran Orbit', area: 'Hawa Engineers Ex QC Person', members: 1 },
    { name: 'Kaiyyum Bhai', area: 'Hawa Engineers Ex QC Person', members: 1 },
    { name: 'Kamlesh', area: 'Hawa Engineers Ex QC Person', members: 1 },
    { name: 'Mustaq Bhai Chipa', area: 'Hawa Engineers Ex QC Person', members: 1 },
    { name: 'Salim Bhai', area: 'Hawa Engineers Ex QC Person', members: 1 },

    // Hawa Engineers Marketing
    { name: 'Ali', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Ali', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Anik', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Faizan Bhai', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Faujjudin', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Raees', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Rasid Ali', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Rasid Ali', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Sajid Memon', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Sakib', area: 'Hawa Engineers Marketing', members: 1 },
    { name: 'Vakkas', area: 'Hawa Engineers Marketing', members: 1 },

    // Hawa Engineers Marketing Other Branches
    { name: 'Aabid Rajpura', area: 'Hawa Engineers Marketing Other Branches', members: 1 },
    { name: 'Afnan', area: 'Hawa Engineers Marketing Other Branches', members: 1 },
    { name: 'Anas Puthawala', area: 'Hawa Engineers Marketing Other Branches', members: 1 },
    { name: 'Faiyyaz Marvel', area: 'Hawa Engineers Marketing Other Branches', members: 1 },
    { name: 'Haris', area: 'Hawa Engineers Marketing Other Branches', members: 1 },

    // Hawa Engineers Old
    { name: 'Abdul Sattar', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Ajaz Luft Capital', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Asif Luft Capital', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Atiq Dhattiwala', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Mehboob Flang', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Moin Shaikh', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Mujeeb Luft Capital', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Rahat Hussain', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Sajid Sacha', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Salim Modan', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Zuber Qureshi', area: 'Hawa Engineers Old', members: 1 },
    { name: 'Zuber Shaikh', area: 'Hawa Engineers Old', members: 4 },

    // Hawa Engineers Others
    { name: 'Abdullah Kagdi', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Asad Kagdi', area: 'Hawa Engineers Others', members: 9 },
    { name: 'Aslam Kagdi', area: 'Hawa Engineers Others', members: 2 },
    { name: 'MN Pathan', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Mohammed Kagdi (MD)', area: 'Hawa Engineers Others', members: 4 },
    { name: 'Nasir Bhai', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Rahil Bhai', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Safi Bhai', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Vahid Bhai', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Zafar Hawa', area: 'Hawa Engineers Others', members: 1 },
    { name: 'Zakariya', area: 'Hawa Engineers Others', members: 1 },

    // Hawa Engineers Purchase
    { name: 'Aarif Bhai', area: 'Hawa Engineers Purchase', members: 1 },
    { name: 'Aasif Bhai', area: 'Hawa Engineers Purchase', members: 1 },
    { name: 'Aiyyub Bhai', area: 'Hawa Engineers Purchase', members: 1 },
    { name: 'Hasan Bhai', area: 'Hawa Engineers Purchase', members: 1 },
    { name: 'Riyaz Bhai', area: 'Hawa Engineers Purchase', members: 1 },
    { name: 'Sebaz', area: 'Hawa Engineers Purchase', members: 1 },

    // Hawa Engineers QC Person Office Staff
    { name: 'Aakib Bhai', area: 'Hawa Engineers QC Person Office Staff', members: 1 },
    { name: 'Abid', area: 'Hawa Engineers QC Person Office Staff', members: 1 },
    { name: 'Haider', area: 'Hawa Engineers QC Person Office Staff', members: 1 },
    { name: 'Nabil Bhai', area: 'Hawa Engineers QC Person Office Staff', members: 1 },
    { name: 'Vakkas Bhai', area: 'Hawa Engineers QC Person Office Staff', members: 1 },
    { name: 'Yunus Bhai', area: 'Hawa Engineers QC Person Office Staff', members: 1 },

    // Hawa Engineers QC Person Unit 1
    { name: 'Imran Bhai', area: 'Hawa Engineers QC Person Unit 1', members: 1 },
    { name: 'Mustakim', area: 'Hawa Engineers QC Person Unit 1', members: 1 },
    { name: 'Rafiq Chacha', area: 'Hawa Engineers QC Person Unit 1', members: 1 },
    { name: 'Sarfaraz', area: 'Hawa Engineers QC Person Unit 1', members: 1 },

    // Hawa Engineers Tempo Person
    { name: 'Altaf', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Faruk', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Mohammed Chacha', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Mustaq', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Nabi Bhai Ansari', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Nabi Bhai Saiyed', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Nawab', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Saukat Patel', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Shabaz', area: 'Hawa Engineers Tempo Person', members: 1 },
    { name: 'Sharif', area: 'Hawa Engineers Tempo Person', members: 1 },

    // Hawa Engineers TPI
    { name: 'Saif Aalam', area: 'Hawa Engineers TPI', members: 1 },

    // Hawa Engineers Veg
    { name: 'Sagar Maal', area: 'Hawa Engineers Veg', members: 1 },

    // Hawa Engineers Workshop Dispatch 786
    { name: 'Lambu', area: 'Hawa Engineers Workshop Dispatch 786', members: 1 },
    { name: 'Safi', area: 'Hawa Engineers Workshop Dispatch 786', members: 1 },

    // Jamalpur and Raikhad
    { name: 'Ashraf Khan Pathan', area: 'Jamalpur and Raikhad', members: 2 },
    { name: 'Qazi Shakeel', area: 'Jamalpur and Raikhad', members: 2 },
    { name: 'Raees Momin', area: 'Jamalpur and Raikhad', members: 1 },
    { name: 'Saieyd Liyakat Ali Najar Ali', area: 'Jamalpur and Raikhad', members: 0 },
    { name: 'Saiyed Ifhtekhar Hussain (Saleha)', area: 'Jamalpur and Raikhad', members: 4 },
    { name: 'Saiyed Naeemahmed Mo.Bakir Bukhari', area: 'Jamalpur and Raikhad', members: 3 },
    { name: 'Shaiq Momin Hasmat Ali', area: 'Jamalpur and Raikhad', members: 3 },
    { name: 'Zafar Shaikh Khambat', area: 'Jamalpur and Raikhad', members: 3 },

    // Juhapura
    { name: 'Adil Abbas Mohammed Abbas', area: 'Juhapura', members: 4 },
    { name: 'Afsar Jahan Ashfaq Hussain (Haider Sister)', area: 'Juhapura', members: 2 },
    { name: 'Charaniya Mohammed Abbas (Rajula)', area: 'Juhapura', members: 2 },
    { name: 'Huda Mohammed Haider', area: 'Juhapura', members: 2 },
    { name: 'Kaba Ali Bhai (Amreli)', area: 'Juhapura', members: 2 },
    { name: 'Marhum Mohammed Hussain Surangiwala', area: 'Juhapura', members: 2 },
    { name: 'Nazir Shirazi', area: 'Juhapura', members: 3 },
    { name: 'Nida Mir Ali', area: 'Juhapura', members: 2 },
    { name: 'Nida Mohammed Haider', area: 'Juhapura', members: 2 },
    { name: 'Noorani Dr. Mohammed Abbas', area: 'Juhapura', members: 1 },
    { name: 'Noorani Tufel Sir', area: 'Juhapura', members: 1 },
    { name: 'Saiyed Aehtesham Ali Gulam Ali', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Ahmed Nadeem Mohammed Hussain', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Akhalaqahmed Nizamali Bukhari', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Akil Abbas Saiyed Abbas', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Arsadali Alihasan Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Burhanauddin Vajahthusain Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Fatehali Gulamjafar Bukhari', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Haider Hussain Iqbal Hussain', area: 'Juhapura', members: 6 },
    { name: 'Saiyed Iftekharahmed Fazalmiya Bukhari', area: 'Juhapura', members: 0 },
    { name: 'Saiyed Jenumiya Sakhawathusain Bukhari', area: 'Juhapura', members: 7 },
    { name: 'Saiyed Kamaluddin Ajaz Hussain', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Mirali Mo.Mazharuddin Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Mo.Haider Istyaq Ahmed Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Mohammed Aaqil Ajaz Hussain', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Mohammed Aehasan Pirshabmiya Bukhari', area: 'Juhapura', members: 0 },
    { name: 'Saiyed Mohammed Ashraf Fazal Miya', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Mohammed Illyas Ajaz Hussain', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Mohammed Tariq Khurshid Abbas', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Riyazahmed Mukhtyarahmed Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Rizwan Asgar Mohammed Bakir Bukhari', area: 'Juhapura', members: 3 },
    { name: 'Saiyed Sajid Haider Mohammed Amin', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Tajammulhusain Asrafusain Bukhari', area: 'Juhapura', members: 6 },
    { name: 'Saiyed Vajahathusain Saiyedmohammad Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Zafar Hussain Iqbal Hussain', area: 'Juhapura', members: 4 },
    { name: 'Saiyed Zaffar Abbas Mohammed Hussain', area: 'Juhapura', members: 2 },
    { name: 'Saiyed Zahur Hussain Mohammed Hussain', area: 'Juhapura', members: 4 },
    { name: 'Saiyeda Aakelabanu Sarafatali Bukhari', area: 'Juhapura', members: 2 },
    { name: 'Saiyeda Amirunnisha Aliraza Bukhari', area: 'Juhapura', members: 4 },
    { name: 'Saiyeda Zaheda khatoon Iftekharahmed', area: 'Juhapura', members: 1 },
    { name: 'Zainul Surangiwala', area: 'Juhapura', members: 2 },

    // Kalupur
    { name: 'Dawal Zuber', area: 'Kalupur', members: 1 },
    { name: 'Irshad Saiyed', area: 'Kalupur', members: 1 },
    { name: 'Saiyed Farnaz Ali Hussain', area: 'Kalupur', members: 4 },
    { name: 'Sajid Ansari', area: 'Kalupur', members: 1 },

    // Khamasa
    { name: 'Saiyed Inayat Ali Hader Hussain', area: 'Khamasa', members: 0 },

    // Khambat
    { name: 'Aga Sibten Fatema', area: 'Khambat', members: 3 },
    { name: 'Ehsan Ali', area: 'Khambat', members: 2 },
    { name: 'Jabir Hussain Ali Hussain (Kalu)', area: 'Khambat', members: 2 },
    { name: 'Kalu Ali Hussain', area: 'Khambat', members: 3 },
    { name: 'Mehzabin Arab', area: 'Khambat', members: 1 },
    { name: 'Mirza Faiyaz Hussain Navroz Ali', area: 'Khambat', members: 5 },
    { name: 'Mirza Waris Ali Navroz Ali', area: 'Khambat', members: 1 },
    { name: 'Nadeem Nijabat Ali (Munawar Aapa - Juhapura)', area: 'Khambat', members: 4 },
    { name: 'Rashid Ali Saiyed', area: 'Khambat', members: 2 },
    { name: 'Saeed Saiyed (Nakrat ki Pole)', area: 'Khambat', members: 2 },
    { name: 'Saiyed Ashfaq Hussain', area: 'Khambat', members: 1 },
    { name: 'Saiyed Hasan Ali (Khamkha)', area: 'Khambat', members: 2 },
    { name: 'Sameer Saiyed (Nakrat ki Pole)', area: 'Khambat', members: 2 },
    { name: 'Shabana', area: 'Khambat', members: 2 },
    { name: 'Shahid Yamani', area: 'Khambat', members: 2 },
    { name: 'Shakil Abbas Mohammed Abbas', area: 'Khambat', members: 2 },
    { name: 'Tahir Ali', area: 'Khambat', members: 2 },
    { name: 'Zaheda Aapa', area: 'Khambat', members: 2 },
    { name: 'Zakera Aapa', area: 'Khambat', members: 2 },

    // Khanpur
    { name: 'Saiyed Alinaqi Siraji', area: 'Khanpur', members: 0 },
    { name: 'Saiyed Haiderabbas Najarabbas Bukhari', area: 'Khanpur', members: 0 },
    { name: 'Saiyed Mohammad Raza Haiderali Bukhari', area: 'Khanpur', members: 0 },
    { name: 'Shirazi Mohammed Murad (Rifat Fatema)', area: 'Khanpur', members: 3 },
    { name: 'Shirazi Rukayya Khatun Mohammed Naqi', area: 'Khanpur', members: 3 },

    // Kutbi Mohalla
    { name: 'Dr.M.M. Saiyed', area: 'Kutbi Mohalla', members: 0 },
    { name: 'Kadri Aslam Kausarali', area: 'Kutbi Mohalla', members: 0 },
    { name: 'Kazi Usmanabhai', area: 'Kutbi Mohalla', members: 0 },
    { name: 'Pinjara Sarfuddinbhai Nizamuddin', area: 'Kutbi Mohalla', members: 0 },
    { name: 'Saiyed Ahmedali Babarali Bukhari', area: 'Kutbi Mohalla', members: 6 },
    { name: 'Saiyed Aliahmed Mirali Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Aliraza Sajjadhusain Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Ashiqhusain Gulammehdi Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Fazlehusain Mirali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Iftekharahmed Gulamhusain Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Jalaluddin Muzafarhusain Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Karamatali Miyasahebmiya Bukhari', area: 'Kutbi Mohalla', members: 7 },
    { name: 'Saiyed Mirali Kadumiya Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Mohammadrazak Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Mohammed Tahir Mirali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Mujahidhusain Muzafarhusain Bukhari', area: 'Kutbi Mohalla', members: 6 },
    { name: 'Saiyed Mukhhtyahusain Khilafathusain Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Munavvarhusain Kasamaali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Murtuzahusain Mirali Bukhari', area: 'Kutbi Mohalla', members: 3 },
    { name: 'Saiyed Mustaqhusain Yaqubhusain Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Nahidhusain Maustufahusain', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Naushadali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Nazirhusain Yaqubhusain Bukhari', area: 'Kutbi Mohalla', members: 8 },
    { name: 'Saiyed Nisarali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Noorali Sajjadhusain Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Rajahusain (police-Gothdawale)', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Rashidali Babarali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Riyazali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Saiyedabbas Gulamabbas Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Samimhaidar Sajjadhusain Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyed Samir Mohammadamin Bukhari', area: 'Kutbi Mohalla', members: 2 },
    { name: 'Saiyed Vikarali Dolatali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyed Zakirhusain Mirali Bukhari', area: 'Kutbi Mohalla', members: 5 },
    { name: 'Saiyeda Akeelabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Amirabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Kaniz e Butul Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 1 },
    { name: 'Saiyeda Khursidabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Saiyeda Nishat Zehra Maksud Ali', area: 'Kutbi Mohalla', members: 1 },
    { name: 'Saiyeda Zaheerabbas Gulammurtuza Bukhari', area: 'Kutbi Mohalla', members: 4 },
    { name: 'Shaikh Abdulakadar', area: 'Kutbi Mohalla', members: 0 },

    // Mayur Park
    { name: 'Jamil Bhai (Vahida Ben)', area: 'Mayur Park', members: 4 },
    { name: 'Mayur Park', area: 'Mayur Park', members: 200 },

    // Mirzapur / Shahpur
    { name: 'Altaf', area: 'Mirzapur / Shahpur', members: 5 },
    { name: 'Anis', area: 'Mirzapur / Shahpur', members: 5 },
    { name: 'Arif', area: 'Mirzapur / Shahpur', members: 4 },
    { name: 'Asif Khan', area: 'Mirzapur / Shahpur', members: 5 },
    { name: 'Aslam', area: 'Mirzapur / Shahpur', members: 4 },
    { name: 'Iqbal', area: 'Mirzapur / Shahpur', members: 7 },
    { name: 'Kaiyyum', area: 'Mirzapur / Shahpur', members: 5 },
    { name: 'Khalid', area: 'Mirzapur / Shahpur', members: 4 },
    { name: 'Majid', area: 'Mirzapur / Shahpur', members: 3 },
    { name: 'Mohsin', area: 'Mirzapur / Shahpur', members: 2 },
    { name: 'Rizwan', area: 'Mirzapur / Shahpur', members: 5 },
    { name: 'Sajjad', area: 'Mirzapur / Shahpur', members: 6 },
    { name: 'Sarfaraz', area: 'Mirzapur / Shahpur', members: 6 },
    { name: 'Ziya', area: 'Mirzapur / Shahpur', members: 4 },

    // Mumbai
    { name: 'Badshah Bhai', area: 'Mumbai', members: 0 },
    { name: 'Maulana Rooh e Zafar', area: 'Mumbai', members: 0 },

    // Mustaq Society
    { name: 'Altaf Mohammed Sajjad', area: 'Mustaq Society', members: 2 },
    { name: 'Jalali Kurbaanaali', area: 'Mustaq Society', members: 5 },
    { name: 'Saiyed Ahmedhusain Mustaqhusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Ahmedhusain Razahusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Asrafusain Gulamhusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Azazhusain Pyaaresab Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Haiderhusain Razahusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Iftekharhusain Makhdumaali Bukhari', area: 'Mustaq Society', members: 2 },
    { name: 'Saiyed Karamathusain Kambarhusain Bukhari', area: 'Mustaq Society', members: 8 },
    { name: 'Saiyed Khatbhaider Mohammadhusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Manzurhusain Altafusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Mehmudhusain Razahusain Bukhari', area: 'Mustaq Society', members: 3 },
    { name: 'Saiyed Mohammad Mohsin Saahasaahmiya Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Mustaqhusain Yusufali Bukhari', area: 'Mustaq Society', members: 2 },
    { name: 'Saiyed Nasirhusain Gulamhusain Bukhari', area: 'Mustaq Society', members: 5 },
    { name: 'Saiyed Nizamali Naazirhusain Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Parvezahmed Imtyazali Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Sajjadhusain Saiyedmohammad', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Sajjadhusain Saiyedmohammad Bukhari', area: 'Mustaq Society', members: 4 },
    { name: 'Saiyed Saleemaltaf Mohammad Sajjad Bukhari', area: 'Mustaq Society', members: 2 },
    { name: 'Saiyed Zulfikarali Altafusain Bukhari', area: 'Mustaq Society', members: 7 },

    // Others
    { name: 'Ali Bhai Kaaba', area: 'Others', members: 2 },
    { name: 'Josef Uncle', area: 'Others', members: 1 },
    { name: 'Maulana Ali Naqi', area: 'Others', members: 0 },
    { name: 'Maulana Haider Mehndi', area: 'Others', members: 0 },
    { name: 'Maulana Mohammed Raza Gadhvi', area: 'Others', members: 0 },
    { name: 'Maulana Rafat Abbas', area: 'Others', members: 0 },
    { name: 'Maulana Mohammedsaab Rizvi', area: 'Others', members: 0 },
    { name: 'Maulana Zaer Naqvi (Astodiya)', area: 'Others', members: 0 },
    { name: 'Maulana Zafarul Hasan', area: 'Others', members: 0 },
    { name: 'Sanju Colour', area: 'Others', members: 1 },

    // Ranpur
    { name: 'Saiyed AhmedHusain Abidhusain Bukhari', area: 'Ranpur', members: 0 },
    { name: 'Saiyed Maksudali Abidhusain Bukhari', area: 'Ranpur', members: 0 },
    { name: 'Saiyed Mehboobhusain Sakhavathusain Bukhari', area: 'Ranpur', members: 0 },
    { name: 'Saiyed Mehtabhusain Iqbalhusain Bukhari', area: 'Ranpur', members: 0 },
    { name: 'Saiyed Saiyedmohammad Sabbirhusain Bukhari', area: 'Ranpur', members: 0 },
    { name: 'Saiyeda Asrafunnisha Mo.Husain Bukhari', area: 'Ranpur', members: 0 },

    // Roza Aage
    { name: 'Mohammed Aun Haider Abbas (Kodinar)', area: 'Roza Aage', members: 4 },
    { name: 'Mrs. Saiyeda Kanuaapa Bupumiya Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyed Aashik Abbas Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Ali Abbas', area: 'Roza Aage', members: 0 },
    { name: 'Saiyed Ali Abbas Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Ali Muzammil Nawajish Ali', area: 'Roza Aage', members: 0 },
    { name: 'Saiyed Alihaider Saiyedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Amirabbas Bukhari Kodinarwala', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Amjadali Gazanfrali Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Anavarali Mohammadali Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Anavarunnisha Rahemathusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Arifahmed Abidali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Arifali Gulamali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Asagarali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Asifusain Imdadhusain Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Atfusain Altafusain Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Azazali Ahmedali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Azizhusain Mehmudhusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Fajleabbas Gulamhusain Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Fajlemohammad Gulamhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Fazlehusain Ziyauddin Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Firozhaider Istyaqhusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Gulamali Raju Barqatali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Gulamhusain Haiderhusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Haiderali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Hasanabbas Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Hussain Miya Abbashusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Imtyazali Gulamhusain Bukhari', area: 'Roza Aage', members: 10 },
    { name: 'Saiyed Intekhabahmed Makhdumaali Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Jafarhusain Gulamali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Javedahmed Jakarabbas Bukhari', area: 'Roza Aage', members: 9 },
    { name: 'Saiyed Jisaanali Aabidali Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Jisanhusain Akhtarhusain Bukhari', area: 'Roza Aage', members: 8 },
    { name: 'Saiyed Kasimaali Sabbirali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Liyaqatali Sabirali Bukhari', area: 'Roza Aage', members: 10 },
    { name: 'Saiyed Manubhai Sagirabbas', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Masumrazaa Abidali Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Meharhusain Mumtajhusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Mehboob Ali Mustaq Hussain', area: 'Roza Aage', members: 0 },
    { name: 'Saiyed Mehdihasan Khilafathusain Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Mehtabhusain Mustaqhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mohammad Irfan Murtuzahusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Mohammad Mehdi Tofiqhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Mohammadabbas Gulammurtuza Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Mohammadali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Mohammadhusain Saiyedali Bukhari', area: 'Roza Aage', members: 7 },
    { name: 'Saiyed Mohammadhusain Vilayathusain Bukhari', area: 'Roza Aage', members: 11 },
    { name: 'Saiyed Mohammadsalim Fajlehusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Mohammadtaqi Jafarali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed MohammedSohel Zulfiqarli Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Mufiz Hussain Hussain Miya', area: 'Roza Aage', members: 0 },
    { name: 'Saiyed Mukhhtyarhusain Fajleali Bukhari', area: 'Roza Aage', members: 10 },
    { name: 'Saiyed Mukhhtyarhusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Mukimahmed Abidali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Mumtajhusain Mustaqhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Munavvarhusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Murtuzahusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Musahidali Barqatali Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Musarafusain Khadimhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Musarafusain Muzafarhusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Mustufahusain Saiyedali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Najarabbas Mirsabmiya Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Nasirabbas Jakarabbas Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Sababhaider Tahirali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Sabbirhusain Husainmiya Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Sadiqali Ahmedali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Safatali Gulamali Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Sarafatali Gulamali Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Shahidali Azazhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyed Sibtehasan Jakarabbas Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Sirajali Ahmedali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Sohebmohammad Murtuzahusain Bukhari', area: 'Roza Aage', members: 2 },
    { name: 'Saiyed Tafakkarhusain Alihusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyed Vilayathusain Gulamsaahmiya Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed ZaheerabbasSajjadhusain Bukhari', area: 'Roza Aage', members: 8 },
    { name: 'Saiyed Zahidali Gazanfrali Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyed Zahirabbas Abulqasim Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyed Zamirabbas Saukathusain Bukhari', area: 'Roza Aage', members: 5 },
    { name: 'Saiyeda ############ Jafarhusain Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyeda Fajle Abbas Gulamabbas Bukhari', area: 'Roza Aage', members: 3 },
    { name: 'Saiyeda Farzanabanu Jakirhusain Bukhari', area: 'Roza Aage', members: 4 },
    { name: 'Saiyeda Naazfatema Abidali Bukhari', area: 'Roza Aage', members: 0 },
    { name: 'Saiyeda Rizwanabanu V. (Judge Saheb)', area: 'Roza Aage', members: 0 },
    { name: 'Saiyeda Sabihaider Khadimhusain Bukhari', area: 'Roza Aage', members: 6 },
    { name: 'Saiyeda Saiyedakhatun D/o Husainmiya Bukhari', area: 'Roza Aage', members: 1 },
    { name: 'Saiyeda Vajirbibi Haidermiya Bukhari', area: 'Roza Aage', members: 0 },

    // Saibaba And Noor Nagar B/H Golden
    { name: 'Ashfaq Bhai (Torrent)', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Aabidali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Abbashusain Maqbulhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Abidali Shabbirali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyed Afzalhusain Husainmiya Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 8 },
    { name: 'Saiyed Ahmedali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Firozbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Firozhaider Hamidabbas Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Gulamaraza Shabbirali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Haiderabbas Fajleali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 6 },
    { name: 'Saiyed Hasanabbas Fajleali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Javidbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Kutbuddin Gulamali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 2 },
    { name: 'Saiyed Meharali Abbasali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 6 },
    { name: 'Saiyed MirleshAhmed Mehboobali', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Misamraza Tafakkarhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Mo.Amir Hafizhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Mohammad Ilyas Gulamali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyed Mohammed Hasan Amirabbas Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 2 },
    { name: 'Saiyed Mohsinhusain Maqbulhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Mukhatyarali Saukarali', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Munavvarhusain Yaqubhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyed Munazirhusain Mohammadhusain', area: 'Saibaba And Noor Nagar B/H Golden', members: 3 },
    { name: 'Saiyed Murtuzaali Shabbirali Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Mustakali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Riyazali Saukatali', area: 'Saibaba And Noor Nagar B/H Golden', members: 0 },
    { name: 'Saiyed Sadikbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Sakhawathusain Manzurhusain Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 6 },
    { name: 'Saiyed SarjilAhmed Mehboobali', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyed Zahirbhai Abulhasan Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 4 },
    { name: 'Saiyeda Afzalunnissah Mohammadfazil Bukhari', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },
    { name: 'Saiyeda Zahid Ali (Saiyeda Aapa)', area: 'Saibaba And Noor Nagar B/H Golden', members: 5 },

    // SaiyedWada
    { name: 'Bukhari Inayat Hussain Shabbir Hussain', area: 'SaiyedWada', members: 5 },
    { name: 'Jalali Babubhai', area: 'SaiyedWada', members: 5 },
    { name: 'Javed Ali Fazle Ali', area: 'SaiyedWada', members: 2 },
    { name: 'Maulana Saiyed Ali Hasan Rizvi', area: 'SaiyedWada', members: 3 },
    { name: 'Pathan Aabid Liyakarkhan', area: 'SaiyedWada', members: 0 },
    { name: 'Pathan Aarifan Anwarkan (Anu Raja)', area: 'SaiyedWada', members: 0 },
    { name: 'Pathan Firozkhan Basirkhan', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Aabedabanu Samasuddin Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Aaftabahusain Husainmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Aamirabbas Akbarali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Aasifali Sabbirali', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Aasikhusain Inayahusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Abbashusen Gulamhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Abidali Kasamaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Abrarhusain Sakilbhai Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Afrozhusain Husainmiya Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Ahmedali Mumtajali Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Ahmedhusain Alihusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Ajazhusain Gulamhaider Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Akbarali Kasamaali Bukhari', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Akbarhusain Barqatali Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Akbarhusain Gulammurtuza Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Akilabbas Sirajuddin Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Ali Raza Hasan Ali (Advocate)', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Aliabbas Altafusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Aliraza Nisarhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Anavarali Mohammadali Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Ashfaq Hussain Askar Ali', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Asifali Sabbirali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Askarali Kasamaali Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Azazhusain Mohammadhafiz Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Azharabbas Sirajuddin Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Badamiya Husainmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Bandeali Kararhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Baqarali Gulamsaahmiya Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Basaratali Altafusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Dolatali Niyamatali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Fajlehusain Alihusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Fajlehusain Masumali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Gulam Mohammad Kararhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Gulamali Kazamali Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Gulamhusain Alihusain Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Hafizali Kasamaali Bukhari', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Haiderali Najarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Hasanabbas Makhdumaali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Hasanabbas Nisarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Hasnain Raza Irshad Hussain', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Husainmiya Kammarhusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Ibnehasan Khursidhusain Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Ikhtyarali Kasamaali Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Imdadali Jegamali Bukhari', area: 'SaiyedWada', members: 9 },
    { name: 'Saiyed Imdadhusain Tasavvurhusain Bukhari', area: 'SaiyedWada', members: 10 },
    { name: 'Saiyed Imtyazhusain Iftekharhusain', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Inayathusain Amirmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Irfan Haider Inayathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Irfanhaider Bandeali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Irfanhaider Haiderhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Irfanhaider Mohammadhaider Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Istyaqhusain Gulammehdi Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Jafarabbas Bupumiya Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Jafarali Gulamhaider Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Jakirabanu Mohammad Javid Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Jalal Haider Makhdumaali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Jaminali Irsadali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Kamarali Gulamhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Kaniz e husain d/o Alihusain Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Kanizeabbas Abbashusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Karamatali Irsadali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Kararhusain Husainmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Karrar Hussain Gulam Abbas', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Maksudali Gazanfrali Bukhari', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Maqbulhusain Manzurhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mazharabbas Khursidabbas Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mehboobali Gulamhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mehndi Abbas Irshad Hussain', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mehtabhusain Husainmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Moammadibegum Murtuzahusain Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Mohammad Ashfaq Razahusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammad Jafar Karamathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammad Mazhar Alinaqi Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Mohammad Munaf Kammarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammad MunafRazahusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Mohammad Raza Nasiruddin Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Mohammad Rizvan Riyazali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Mohammad Sadik Akbarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammad Sakil (Hajibhai) Ikramhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammad Taqi Wajidhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed mohammad Zaid Munavvarhusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Mohammadabbas Askarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohammadasfaq Istyaqhusain Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed MohammadFaazil Liyaqatali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mohammadkazim Sakhawathusain Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Mohammadmubaseer Munavvarhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed MohammadMubin Munavvarhusain Bukhari', area: 'SaiyedWada', members: 4 },

    // Saiyedwada
    { name: 'Saiyed Mohammed Khurshid Pirsahabmiya Bukhari', area: 'Saiyedwada', members: 4 },

    // SaiyedWada
    { name: 'Saiyed Mohsinhaider Murtuzahusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mohsinhusain Mustaqali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Moinhaider Haiderhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mudassarhusain Makhdumahusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mujahidhusain Mehamudhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Munafahmed Nazimhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Munavvarali Abbasali Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Munavvarhusain Kammarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Munavvarhusain Khilafathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Mustufahusain Akhtarhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Mustufahusain Fajlehusain Bukhari', area: 'SaiyedWada', members: 10 },
    { name: 'Saiyed Najarali Kararhusain Bukhari', area: 'SaiyedWada', members: 8 },
    { name: 'Saiyed Nasirhusain Ahmedhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Nasirhusain Khilafathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Nasirhusain Samasuddin Bukhari', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Naved Yusufali Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Nazim Ali Liyakat Ali', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Nisarhusain Haiderhusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Niyamatali Miyasahebmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Parvez Ali Imdad Ali', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Rajumiya Husainmiya Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Saberabanu Gulamraza Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Safaqathusain Inayathusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Sahsahebmiya Mustaqhusain Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Saiyedali Imdadali Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Saiyedhusain Makhdumaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Saiyedmehmud Gulamhaider Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Saiyedmohammad Gulamhaider Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Sajid Ali Gulam Ali', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Sakirhusain Abidhusain a Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Sakirhusain Inayathusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Saqlain Haider Inayat Hussain', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Sarafathusain Gulammehdi Bukhari', area: 'SaiyedWada', members: 7 },
    { name: 'Saiyed Sarfarazhusain Gulamhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Sarfarazhusain Inayathusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Sarfarazhusain Makhdumaali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Sarfunnisha Asifusain Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Shakil Abbas Ikhtyarali Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyed Shamimhaider Jalaluddin Bukhari (Sajjadanashin)', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Shaukatali Ikramhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyed Siqandarhusain Gulamabbas Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Sirajali Manzurali Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Tajammulhusain Tasavvurhusain Bukhari', area: 'SaiyedWada', members: 6 },
    { name: 'Saiyed Vajirali Najarali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Vasim Mohammed Irshad Hussain', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Vasimraza Abbasali Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Virasathusain Haidermiya Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyed Yaqubhusain Amirmiya Bukhari', area: 'SaiyedWada', members: 2 },
    { name: 'Saiyed Yusufali Ahmedhusain Bukhari', area: 'SaiyedWada', members: 0 },
    { name: 'Saiyed Zainul Abedin Mohammed Shakil', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyed Zaqirhusain Ahmedhusain Bukhari', area: 'SaiyedWada', members: 5 },
    { name: 'Saiyeda Badiapa Bukhari', area: 'SaiyedWada', members: 1 },
    { name: 'Saiyeda Masumabanu alinaki', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyeda Nasimbanu Iftekharhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyeda Nusaratjahan Sarafatali Bukhari', area: 'SaiyedWada', members: 4 },
    { name: 'Saiyeda Saiyedakhatun Iqbalhusain Bukhari', area: 'SaiyedWada', members: 3 },
    { name: 'Saiyeda Sajiabanu Zaheerabbas', area: 'SaiyedWada', members: 3 },
    { name: 'Sarafat Hussain Gulam Abbas Saiyed', area: 'SaiyedWada', members: 0 },
    { name: 'Shaikh Imtyaz Jafarbhai', area: 'SaiyedWada', members: 0 },
    { name: 'Shaikh Raziyabanu Bahadurmiya', area: 'SaiyedWada', members: 5 },
    { name: 'Zulfikar Ali Fazle Ali', area: 'SaiyedWada', members: 3 },

    // Shah E Aalam
    { name: 'Saiyed Alamadarhusain', area: 'Shah E Aalam', members: 5 },
    { name: 'Saiyed Haiderali Gulamali Bukhari (Javed)', area: 'Shah E Aalam', members: 4 },
    { name: 'Saiyed Parvezahmed Pirshahabmiya Bukhari', area: 'Shah E Aalam', members: 2 },
    { name: 'Saiyed Tanveerahmed Pirshahabmiya Bukhari', area: 'Shah E Aalam', members: 3 },
    { name: 'Saiyeda Nahid Zehra Mohammed Taqi', area: 'Shah E Aalam', members: 1 },
    { name: 'Shamim Abedi', area: 'Shah E Aalam', members: 0 },
    { name: 'Zahir Vadgama', area: 'Shah E Aalam', members: 4 },

    // Silicon
    { name: 'Dr. Ziauddin Kazi', area: 'Silicon', members: 0 },
    { name: 'Pathan Hebatkhan Jafarkhan', area: 'Silicon', members: 0 },
    { name: 'Pinjara Sirajuuddin Nizamuddin', area: 'Silicon', members: 0 },
    { name: 'Saiyed Mohammadali Kamarali Bukhari', area: 'Silicon', members: 0 },
    { name: 'Saiyed Sartajhusain Amadumiya Bukhari', area: 'Silicon', members: 0 },

    // Taslim So., Saiyedwadi And Gulmohar
    { name: 'Aehsan Abbas Liyakat Ali (Pappu Bhai)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Haider Abbas Liyakat Ali (Munnu Bhai)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 7 },
    { name: 'Masaddi Husnoddin Dadamiya', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Masaddi Rasikali Dadamiya', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Mohammed Abbas (Munna)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Mubarak Hussain', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Mujjaffar Hussain', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Munira Teacher', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Musa Bhai Press', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 1 },
    { name: 'Rubab Ali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 2 },
    { name: 'Saiyed Abbasali Baqarali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Alamadarhusain Bupumiya', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Azazhusain Varishusain', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 3 },
    { name: 'Saiyed Haiderabbas Irsadali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Ikhtyarali Ahmedali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 9 },
    { name: 'Saiyed Imdadhusain Mohammadali Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 2 },
    { name: 'Saiyed Inayatali Saiyedmohammad Bukhari (Mirsabnagar)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Kamarali Riyazatali Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 8 },
    { name: 'Saiyed Kammarabbas Gulamali (Gokul)', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 9 },
    { name: 'Saiyed Klbe Abbas Sagirabbas', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 8 },
    { name: 'Saiyed Liyaqatali Ghinuchacha', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Saiyed Mirsabmiya Mohammadali Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 5 },
    { name: 'Saiyed Mohammadhaider Gulamabbas', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Mohammadkazim Gulamabbas', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 11 },
    { name: 'Saiyed Najarali Maustafahusain Bukhari', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 4 },
    { name: 'Saiyed Nazim Ali Gulam Ali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 0 },
    { name: 'Saiyed Saiyedali Razaali', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 0 },
    { name: 'Saiyed Saukatali Fazlubhai', area: 'Taslim So., Saiyedwadi And Gulmohar', members: 10 },

    // Unassigned
    { name: 'Saiyed Haider Abbas Khurshid', area: 'Unassigned', members: 0 },
    { name: 'Saiyed Saiyed Mohammed Shabbir Hussain', area: 'Unassigned', members: 0 },
    { name: 'Saiyed Shan e Haider Mohammed Haider', area: 'Unassigned', members: 0 },

    // Vatva (Outside)
    { name: 'Aabeda Aunty', area: 'Vatva (Outside)', members: 4 },
    { name: 'Aqil Bhai Rustompura', area: 'Vatva (Outside)', members: 2 },
    { name: 'Guddi (Mayur Park)', area: 'Vatva (Outside)', members: 2 },
    { name: 'Nazir Bhai Patang Waale', area: 'Vatva (Outside)', members: 4 },
    { name: 'Salma Aapa Police', area: 'Vatva (Outside)', members: 3 },
    { name: 'Vaida Ben Jamil Bhai', area: 'Vatva (Outside)', members: 4 },
    { name: 'Yasin Gadiya (Mayur Park)', area: 'Vatva (Outside)', members: 4 },

    // Vatva Urdu 2
    { name: 'Akram Ali Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Arma Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Asma JodhpurWala', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Azra Aapa', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Bilkis Aapa Bukhari', area: 'Vatva Urdu 2', members: 0 },
    { name: 'Bilkis Aapajaan', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Farhana MangaljiWala', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Farid Bhai Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Farida Mansuri', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Fehmida Shahpur', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Foziya Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Gulnaz Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Hasina Master', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Helpers', area: 'Vatva Urdu 2', members: 8 },
    { name: 'Irfan MandosarWala', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Jyoti Ben', area: 'Vatva Urdu 2', members: 1 },
    { name: 'Khaleda Banu Shaikh', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Makhduma Ben', area: 'Vatva Urdu 2', members: 0 },
    { name: 'Marhum Mehboob Khan Awwa', area: 'Vatva Urdu 2', members: 4 },
    { name: 'Masihuddin Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Mehboob Khan', area: 'Vatva Urdu 2', members: 4 },
    { name: 'Mehmuda Aapa', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Mumtaz Aapa', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Mumtaz Pathan', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Musira Shaikh', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Nasim Aapa', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Rabiya Aapa', area: 'Vatva Urdu 2', members: 24 },
    { name: 'Raziya Ben', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Rehana Aapa Ajmeri', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Rizwana Qureshi', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Rubina Mansuri', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Sadeka Shaikh', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Saeda Ajmeri', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Samina Shaikh', area: 'Vatva Urdu 2', members: 3 },
    { name: 'School Staff', area: 'Vatva Urdu 2', members: 17 },
    { name: 'Shabnam Qureshi', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Shaheda Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Shahin Aapa', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Shakila Aapa', area: 'Vatva Urdu 2', members: 7 },
    { name: 'Shamim Ahmed Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Shebaz Shaikh', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Shehnaz Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Sugra Aapa', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Swaleha Ansari', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Zahurunnissa Pathan', area: 'Vatva Urdu 2', members: 2 },
    { name: 'Zohra Ben', area: 'Vatva Urdu 2', members: 2 },

    // Vhorvad
    { name: 'Amanat Hussain Saiyed', area: 'Vhorvad', members: 3 },
    { name: 'Halu Aapa (Jamai)', area: 'Vhorvad', members: 4 },
    { name: 'Kadri Afzal Kausarali', area: 'Vhorvad', members: 0 },
    { name: 'Mirza John Bakshe Ali', area: 'Vhorvad', members: 0 },
    { name: 'Pathan Ajabkhan Abbaskhan', area: 'Vhorvad', members: 0 },
    { name: 'Rathod Munirbhai Amirmiya', area: 'Vhorvad', members: 0 },
    { name: 'Rathod Sabirmiya Amirmiya', area: 'Vhorvad', members: 0 },
    { name: 'Saiyed Anishabbas Abulqasim Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Bakarali Saiyedmohammad Bukhari', area: 'Vhorvad', members: 0 },
    { name: 'Saiyed Barqatali Karamatali Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Burhanauddin Mustufahusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Firozhaidar Karamatali Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Hasan Akhtar Tafakkarhusain Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Hasanabbas Abbashusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Hasanali Ahmedali Bukhari', area: 'Vhorvad', members: 6 },
    { name: 'Saiyed Ikhlaqhusain Iqbalhusain Bukhari', area: 'Vhorvad', members: 6 },
    { name: 'Saiyed Kanize Zehra Mohammad Sakil (Daryapurwala)', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Khursidabbas Anavarali Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Khursidhusain Shaukatali Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Maqbulhusain Barqatali Bukhari', area: 'Vhorvad', members: 1 },
    { name: 'Saiyed Mohammadakil Maqbulhusain Bukhari', area: 'Vhorvad', members: 6 },
    { name: 'Saiyed Mohammadanish Maqbulhusain Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Mohammadjafar Karamatali Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Mohammadraza Khilafathusain Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Mohammed Raza Masum Ali', area: 'Vhorvad', members: 0 },
    { name: 'Saiyed Mohsinali Istyaqahmed Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Munavvarali Zaqirali Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Mustaq Ahmed', area: 'Vhorvad', members: 0 },
    { name: 'Saiyed Mustaq Mohammed Imtiyaz Ali', area: 'Vhorvad', members: 0 },
    { name: 'Saiyed Nisarhusain Amaanathusain Bukhari', area: 'Vhorvad', members: 4 },
    { name: 'Saiyed Ruknoddin Nazirhusain Bukhari', area: 'Vhorvad', members: 0 },
    { name: 'Saiyed SalimAltaf Maqbulhusain Bukhari', area: 'Vhorvad', members: 3 },
    { name: 'Saiyed Vajirali Baqarali Bukhari', area: 'Vhorvad', members: 5 },
    { name: 'Saiyed Vasimhaider Nizamali Bukhari', area: 'Vhorvad', members: 7 },
];


// Initialize the families array: Load saved data first, or use the default list with IDs
let families = loadFamilies() || ensureIds(defaultFamilies);

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

// Function to download data as a file
function exportData() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family_backup.json';
    a.click();
}

// Function to upload a file and save it to storage
function importData(event) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        Object.keys(data).forEach(k => localStorage.setItem(k, data[k]));
        alert("Data Imported! Refreshing...");
        location.reload();
    };
    reader.readAsText(event.target.files[0]);
}
