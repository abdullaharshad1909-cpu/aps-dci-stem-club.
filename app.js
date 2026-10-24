/**
 * APS DCI STEM DEFENCE PORTAL - CORE APPLICATION ENGINE
 * Features:
 *  - 16-Member Whitelisted Portal with LocalStorage Persistence
 *  - Member Profile Editing Dashboard
 *  - Interactive 3D Flip-Card Roster Grid
 *  - Upcoming Event with Presidential Executive Lock
 *  - Hall of Fame Past Competition Winners
 *  - Interactive Hacker Floating Terminal with Easter Eggs
 *  - Project Showcase with Live Spark/Upvoting Engine
 *  - Live Animated Hero Counters
 *  - Web Audio API Sci-Fi Synthesizer
 *  - Custom Magnetic Cursor Tracker
 */

/* ========================================================
   GLOBAL APPLICATION STATE
   ======================================================== */
window.appState = {
    currentUser: null,       // Logged in member object or null
    sfxMuted: false,
    scanlinesActive: true,
    currentTheme: 'navy',
    activeWingFilter: 'all',
    activeProjectFilter: 'all'
};

/* ========================================================
   16-MEMBER PRE-POPULATED WHITELIST DATA
   ======================================================== */
const DEFAULT_MEMBERS = [
    {
        id: "APS-STEM-01",
        pin: "DCI-PRES-2026",
        name: "Cadet Muhammad Hamza",
        callsign: "VANGUARD",
        role: "Club President & Robotics Lead",
        isPresident: true,
        wing: "Mechatronics & Robotics",
        bio: "National RoboWars 2025 Gold Medalist. Specializes in autonomous LiDAR SLAM navigation, inverted pendulum robotics, and combat chassis fabrication.",
        skills: ["ROS 2", "LiDAR SLAM", "SolidWorks", "Brushless ESC", "C++"],
        projects: ["Project VANGUARD-X", "RoboArm 6-DOF"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://hamza-robotics.dci" },
        avatarGradient: "from-amber-500 via-orange-600 to-emerald-700",
        clearance: "LEVEL-4 PRESIDENTIAL"
    },
    {
        id: "APS-STEM-02",
        pin: "DCI-VP-2026",
        name: "Cadet Zainab Fatima",
        callsign: "CIPHER",
        role: "Vice President & Head of AI",
        isPresident: false,
        wing: "Synthetic Intelligence & AI",
        bio: "Transformer architect and competitive coder. Built the campus offline edge-LLM study assistant and real-time Urdu sign-language interpreter.",
        skills: ["PyTorch", "Transformers", "CUDA", "FastAPI", "Computer Vision"],
        projects: ["APS-Omni Edge AI", "VisionSign 60FPS"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://zainab-ai.dci" },
        avatarGradient: "from-purple-600 via-indigo-600 to-cyan-500",
        clearance: "LEVEL-3 EXECUTIVE"
    },
    {
        id: "APS-STEM-03",
        pin: "DCI-AERO-03",
        name: "Cadet Ali Raza Khan",
        callsign: "AERO-ONE",
        role: "Director of Aerospace & Rocketry",
        isPresident: false,
        wing: "Aerospace & Rocketry",
        bio: "High-power rocketeer and CanSat mission lead. Designed dual-stage model rocket motors and 433MHz LoRa real-time telemetry ground station.",
        skills: ["CanSat Avionics", "LoRa Telemetry", "Aerodynamics", "Solid Motor", "Barometry"],
        projects: ["Stratosphere CanSat MK-II", "Falcon-DCI Rocket"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://ali-aero.dci" },
        avatarGradient: "from-blue-600 via-sky-500 to-cyan-400",
        clearance: "LEVEL-3 EXECUTIVE"
    },
    {
        id: "APS-STEM-04",
        pin: "DCI-SEC-04",
        name: "Cadet Syeda Ayesha Noor",
        callsign: "NEXUS",
        role: "General Secretary & IoT Architect",
        isPresident: false,
        wing: "Embedded Systems & IoT",
        bio: "Hardware systems architect. Developed campus-wide LoRa mesh environmental telemetry and automated RFID security access gates.",
        skills: ["STM32", "ESP32 Mesh", "KiCAD PCB", "MQTT", "Embedded C"],
        projects: ["EcoMesh IoT Station", "Smart Gate RFID"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://ayesha-iot.dci" },
        avatarGradient: "from-emerald-500 via-teal-500 to-cyan-500",
        clearance: "LEVEL-3 EXECUTIVE"
    },
    {
        id: "APS-STEM-05",
        pin: "DCI-BIO-05",
        name: "Cadet Daniyal Tariq",
        callsign: "SOLARIS",
        role: "Director of Bio-Tech & Green Energy",
        isPresident: false,
        wing: "Bio-Tech & Green Energy",
        bio: "Researched graphene-oxide solar water purification filters for humanitarian flood response. National Science Fair 2025 Silver awardee.",
        skills: ["Graphene Filters", "Solar MPPT", "Bio-Chemistry", "Spectroscopy"],
        projects: ["Solar HydroMatrix", "BioVolt Algae Cell"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://daniyal-stem.dci" },
        avatarGradient: "from-green-600 via-emerald-500 to-amber-500",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-06",
        pin: "DCI-CYB-06",
        name: "Cadet Haris Bilal",
        callsign: "SPECTRE",
        role: "Head of Cybersecurity & Cryptography",
        isPresident: false,
        wing: "Cyber Defense & Crypto",
        bio: "Capture The Flag captain and binary reverse engineer. Researches lattice-based post-quantum cryptography algorithms and network hardening.",
        skills: ["Ghidra", "Lattice Crypto", "Wireshark", "Rust", "Zero-Day Analysis"],
        projects: ["VaultZero Crypto Engine", "DCI NetShield IDS"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://haris-cyber.dci" },
        avatarGradient: "from-red-600 via-purple-700 to-indigo-800",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-07",
        pin: "DCI-DEV-07",
        name: "Cadet Fatima Zahra",
        callsign: "MATRIX",
        role: "Lead Systems & Full-Stack Engineer",
        isPresident: false,
        wing: "Software Engineering & Cloud",
        bio: "Architect of the club's interactive command deck, WebSocket telemetry pipelines, and high-frequency real-time data visualization systems.",
        skills: ["React", "TypeScript", "Tailwind CSS", "WebSockets", "Docker"],
        projects: ["Tactical Command Deck", "RoboTelemetry Live"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://fatima-dev.dci" },
        avatarGradient: "from-cyan-500 via-blue-600 to-indigo-700",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-08",
        pin: "DCI-ROBO-08",
        name: "Cadet Saad Abdullah",
        callsign: "TITAN",
        role: "Combat Robotics Mechanical Lead",
        isPresident: false,
        wing: "Mechatronics & Robotics",
        bio: "Heavyweight combat robotics specialist. Designed high-torque pneumatic flipper systems and custom CNC-milled 7075 aluminum chassis.",
        skills: ["Pneumatics", "CNC Milling", "Fusion 360", "Hardened Steel Fab"],
        projects: ["IronClaw 15kg Combat Bot", "QuadraHex Walker"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://saad-mech.dci" },
        avatarGradient: "from-amber-600 via-orange-600 to-red-700",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-09",
        pin: "DCI-MATH-09",
        name: "Cadet Maryam Nawaz",
        callsign: "QUANTA",
        role: "Lead Quantum & Mathematical Computing",
        isPresident: false,
        wing: "Mathematics & Algorithmics",
        bio: "Kangaroo Math Gold Medalist. Implemented graph neural network route optimization for emergency rover navigation and Qiskit quantum circuits.",
        skills: ["Qiskit", "Graph Theory", "Optimization", "Linear Algebra", "Python"],
        projects: ["GraphOpt Route Optimizer", "QuantumGate Simulator"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://maryam-math.dci" },
        avatarGradient: "from-indigo-600 via-purple-600 to-pink-500",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-10",
        pin: "DCI-DRONE-10",
        name: "Cadet Omar Farooq",
        callsign: "RAPTOR",
        role: "Avionics & Autonomous UAV Specialist",
        isPresident: false,
        wing: "Aerospace & Rocketry",
        bio: "Autonomous VTOL drone designer and pilot. Implemented onboard optical-flow positioning, GPS waypoint tracking, and aerial thermal mapping.",
        skills: ["ArduPilot", "PX4", "FPV Aerodynamics", "Thermal Imaging", "PID Tuning"],
        projects: ["SkyHawk VTOL Drone", "ThermalSeeker Payload"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://omar-uav.dci" },
        avatarGradient: "from-sky-500 via-blue-600 to-slate-800",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-11",
        pin: "DCI-NEUR-11",
        name: "Cadet Mahnoor Tariq",
        callsign: "SYNAPSE",
        role: "Computer Vision & Edge Deep Learning",
        isPresident: false,
        wing: "Synthetic Intelligence & AI",
        bio: "Fine-tunes ultralight YOLO models for edge-TPU acceleration. Developed perimeter threat classification and optical character recognition.",
        skills: ["YOLOv10", "TensorRT", "OpenCV", "Edge TPU", "DeepSORT"],
        projects: ["EagleEye Detection 120FPS", "NeuroScribe OCR"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://mahnoor-vision.dci" },
        avatarGradient: "from-violet-500 via-purple-600 to-fuchsia-600",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-12",
        pin: "DCI-GREEN-12",
        name: "Cadet Bilal Siddiqui",
        callsign: "TERRA",
        role: "Renewable Energy & Automated Agritech",
        isPresident: false,
        wing: "Bio-Tech & Green Energy",
        bio: "Designed high-efficiency dual-axis solar tracking arrays and closed-loop vertical aeroponic nutrient delivery systems for arid environments.",
        skills: ["Solar MPPT", "Aeroponics", "Environmental Sensors", "Automation"],
        projects: ["AeroFlora Automated Tower", "Helios Solar Tracker"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://bilal-green.dci" },
        avatarGradient: "from-emerald-600 via-green-500 to-lime-500",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-13",
        pin: "DCI-FIRM-13",
        name: "Cadet Emaan Asad",
        callsign: "SPARK",
        role: "Embedded Firmware & Sensor Fusion",
        isPresident: false,
        wing: "Embedded Systems & IoT",
        bio: "Embedded systems specialist in sensor fusion algorithms (Kalman filter 9-DOF IMU). Built haptic feedback telemetry gloves for robot arm control.",
        skills: ["FreeRTOS", "Kalman Filter", "I2C/SPI", "Haptics", "Bare-metal C"],
        projects: ["MicroTelemetry BlackBox", "AccelGrip Haptic Glove"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://emaan-embedded.dci" },
        avatarGradient: "from-teal-500 via-emerald-600 to-cyan-700",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-14",
        pin: "DCI-CTF-14",
        name: "Cadet Rayan Mustafa",
        callsign: "HUNTER",
        role: "Offensive Security & Network Defense",
        isPresident: false,
        wing: "Cyber Defense & Crypto",
        bio: "Lead security researcher in air-gapped wireless protocol audits, SDR frequency decoding, and defensive intrusion detection rule engineering.",
        skills: ["HackRF SDR", "Snort IDS", "Penetration Testing", "Linux Kernel", "Bash"],
        projects: ["PacketSentry Wi-Fi Audit", "Sentinel Threat Hunter"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://rayan-sec.dci" },
        avatarGradient: "from-red-500 via-rose-600 to-pink-700",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-15",
        pin: "DCI-CAD-15",
        name: "Cadet Minahil Rehman",
        callsign: "PRISM",
        role: "Rapid Prototyping & Generative Design",
        isPresident: false,
        wing: "Mechatronics & Robotics",
        bio: "Computational industrial design lead. Uses topology optimization in generative CAD to reduce CanSat aerospace casing mass by 42% while retaining rigidity.",
        skills: ["Generative Design", "SLA 3D Printing", "CFD Airflow", "Ansys FEA"],
        projects: ["AeroShell CanSat Casing", "Titan Exo-Arm Rig"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://minahil-cad.dci" },
        avatarGradient: "from-fuchsia-500 via-purple-600 to-indigo-700",
        clearance: "LEVEL-2 SPECIALIST"
    },
    {
        id: "APS-STEM-16",
        pin: "DCI-ROBO-16",
        name: "Cadet Zoraiz Hassan",
        callsign: "PHANTOM",
        role: "Micro-Robotics & Swarm Coordination",
        isPresident: false,
        wing: "Mechatronics & Robotics",
        bio: "Builder of ultra-fast micro-mouse maze solver robots and multi-agent decentralized swarm bots communicating over infrared mesh.",
        skills: ["Flood-Fill Algorithms", "Coreless Motors", "Optical Encoders", "Swarm Mesh"],
        projects: ["MicroMouse Cheetah MK-IV", "SwarmSync NanoBots"],
        links: { github: "https://github.com", linkedin: "https://linkedin.com", portfolio: "https://zoraiz-swarm.dci" },
        avatarGradient: "from-yellow-500 via-amber-600 to-orange-700",
        clearance: "LEVEL-2 SPECIALIST"
    }
];

/* ========================================================
   UPCOMING EVENT DATA & PREVIOUS WINNERS
   ======================================================== */
const DEFAULT_UPCOMING_EVENT = {
    title: "INNOVEX 2026: All-Pakistan Inter-Collegiate STEM Hackathon & RoboWars",
    subtitle: "4th Annual National Championship & Science Summit",
    date: "2026-11-20T09:00:00",
    venue: "Jinnah Grand Auditorium & Sector E-10 Complex, APS DCI Islamabad",
    prizePool: "PKR 500,000 + Merit Shield",
    teamsRegistered: 48,
    maxTeams: 64,
    description: "The flagship inter-collegiate defence STEM challenge bringing together 60+ institutions across Pakistan. Featuring heavyweight autonomous RoboWars, 36-hour Generative AI Hackathon, High-Altitude CanSat Drop Test, and the National STEM Bowl.",
    categories: [
        { name: "RoboWars Combat (15kg & 30kg)", icon: "bot", teams: "24 Teams" },
        { name: "AI & Cybersecurity Siege Hackathon", icon: "terminal", teams: "18 Teams" },
        { name: "Margalla Sub-Orbital CanSat Drop", icon: "rocket", teams: "12 Teams" },
        { name: "Green Energy & CleanTech Expo", icon: "leaf", teams: "10 Teams" }
    ],
    registrationOpen: true,
    lastUpdatedBy: "Cadet Muhammad Hamza (President)",
    updatedAt: "2026-10-22"
};

const PAST_WINNERS = [
    {
        competition: "National RoboWars Olympiad 2025",
        edition: "NUST EME Campus",
        year: "2025",
        placement: "1st Place Gold Champions",
        trophy: "National Defence Shield",
        project: "Project VANGUARD-X (Autonomous Combat Rover)",
        cadets: ["Cadet Muhammad Hamza (President)", "Cadet Saad Abdullah (Robotics Lead)"],
        wing: "Mechatronics & Robotics",
        badgeColor: "border-amber-400 text-amber-400 bg-amber-400/10",
        description: "Undefeated across 7 knockout rounds against 32 university and college teams. Featured custom hardened titanium armor and 18,000 RPM brushless drum spinner."
    },
    {
        competition: "All-Pakistan Inter-School Science Bowl 2025",
        edition: "Quaid-e-Azam University",
        year: "2025",
        placement: "Gold Medal & Grand Laureate",
        trophy: "National Innovation Trophy",
        project: "Solar HydroMatrix (Graphene Oxide Purifier)",
        cadets: ["Cadet Daniyal Tariq", "Cadet Bilal Siddiqui"],
        wing: "Bio-Tech & Green Energy",
        badgeColor: "border-emerald-400 text-emerald-400 bg-emerald-400/10",
        description: "Awarded 1st place overall for humanitarian engineering. Purified 1,200 liters of contaminated floodwater per day using purely off-grid solar-thermal capillary action."
    },
    {
        competition: "Cyber Siege National CTF & Crypto 2025",
        edition: "FAST-NUCES Islamabad",
        year: "2025",
        placement: "1st Place Champions",
        trophy: "Crypto Defense Cup",
        project: "VaultZero Post-Quantum Lattice Suite",
        cadets: ["Cadet Haris Bilal", "Cadet Rayan Mustafa"],
        wing: "Cyber Defense & Crypto",
        badgeColor: "border-purple-400 text-purple-400 bg-purple-400/10",
        description: "Solved all 12 reverse engineering and cryptography challenges in record 4 hours and 18 minutes, beating top university senior teams."
    },
    {
        competition: "National CanSat Aerospace Challenge 2024",
        edition: "IST & SUPARCO Space Week",
        year: "2024",
        placement: "Best Aerospace Engineering Award",
        trophy: "Aeronautics Excellence Plaque",
        project: "Stratosphere CanSat MK-I",
        cadets: ["Cadet Ali Raza Khan", "Cadet Omar Farooq"],
        wing: "Aerospace & Rocketry",
        badgeColor: "border-cyan-400 text-cyan-400 bg-cyan-400/10",
        description: "Successful sub-orbital telemetry transmission up to 1,200m altitude. Autonomous dual-stage parachute recovery within 40 meters of designated launch target."
    }
];

/* ========================================================
   PROJECT SHOWCASE WITH LIVE WORKING SPARK/UPVOTES
   ======================================================== */
const DEFAULT_PROJECTS = [
    {
        id: "proj-vanguard",
        name: "Project VANGUARD-X",
        tagline: "Autonomous Combat & SLAM Exploration Rover",
        category: "Robotics",
        wing: "Mechatronics & Robotics",
        sparkCount: 142,
        lead: "Cadet Muhammad Hamza & Saad Abdullah",
        status: "Active Deployment",
        tags: ["ROS 2", "LiDAR", "SolidWorks", "Titanium Frame"],
        specs: "360° RPLiDAR A2, 4-wheel independent torque vectoring, onboard NVIDIA Jetson Nano, 45-minute continuous run-time.",
        github: "https://github.com",
        demo: "https://vanguard.dci.stem"
    },
    {
        id: "proj-omni",
        name: "APS-Omni Edge AI",
        tagline: "Offline Multilingual Edge LLM & STEM Tutor",
        category: "AI",
        wing: "Synthetic Intelligence & AI",
        sparkCount: 128,
        lead: "Cadet Zainab Fatima & Mahnoor Tariq",
        status: "Operational in Labs",
        tags: ["Llama 3 Quantized", "PyTorch", "Urdu NLP", "CUDA"],
        specs: "Runs fully air-gapped on RTX 4070 lab stations. Indexed with complete Cambridge O/A-Levels & FBISE STEM textbooks with 98.4% retrieval accuracy.",
        github: "https://github.com",
        demo: "https://omni.dci.stem"
    },
    {
        id: "proj-cansat",
        name: "Stratosphere CanSat MK-II",
        tagline: "Atmospheric Telemetry & Canister Orbital Probe",
        category: "Aerospace",
        wing: "Aerospace & Rocketry",
        sparkCount: 115,
        lead: "Cadet Ali Raza Khan & Omar Farooq",
        status: "Flight Ready",
        tags: ["LoRa 433MHz", "Barometer BMP280", "IMU 9-DOF", "Parachute"],
        specs: "Soda-can form factor (350g). Transmits temperature, barometric pressure, UV radiation, and 3D gyro angles every 100ms back to ground station.",
        github: "https://github.com",
        demo: "https://cansat.dci.stem"
    },
    {
        id: "proj-hydromatrix",
        name: "Solar HydroMatrix",
        tagline: "Graphene-Oxide Solar Water Purification Array",
        category: "GreenTech",
        wing: "Bio-Tech & Green Energy",
        sparkCount: 96,
        lead: "Cadet Daniyal Tariq & Bilal Siddiqui",
        status: "Patent Pending",
        tags: ["Graphene Membrane", "Solar Thermal", "Nanotech", "MPPT"],
        specs: "Zero electricity required. Solar evaporation with 99.9% bacterial filtration efficiency for rural flood relief zones.",
        github: "https://github.com",
        demo: "https://hydromatrix.dci.stem"
    },
    {
        id: "proj-vaultzero",
        name: "VaultZero Crypto Suite",
        tagline: "Post-Quantum Lattice-Based Encryption Engine",
        category: "Cyber",
        wing: "Cyber Defense & Crypto",
        sparkCount: 89,
        lead: "Cadet Haris Bilal & Rayan Mustafa",
        status: "Beta Testing",
        tags: ["Kyber-768", "Dilithium", "Rust", "Zero-Knowledge"],
        specs: "Quantum-resistant end-to-end messaging and file encryption tool built according to NIST post-quantum standards.",
        github: "https://github.com",
        demo: "https://vaultzero.dci.stem"
    },
    {
        id: "proj-aeroflora",
        name: "AeroFlora Smart Tower",
        tagline: "IoT Automated High-Yield Aeroponic Farm",
        category: "GreenTech",
        wing: "Bio-Tech & Green Energy",
        sparkCount: 77,
        lead: "Cadet Bilal Siddiqui & Emaan Asad",
        status: "Campus Greenhouse",
        tags: ["ESP32", "Ultrasonic Misting", "pH Dosing", "Telemetry"],
        specs: "95% less water consumption than conventional soil farming. Automated electrical conductivity (EC) & pH dosing via micro-pumps.",
        github: "https://github.com",
        demo: "https://aeroflora.dci.stem"
    }
];

/* ========================================================
   STORAGE ACCESSORS (LOCAL STORAGE PERSISTENCE)
   ======================================================== */
function getStoredMembers() {
    try {
        const stored = localStorage.getItem('aps_dci_members_v2');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn("LocalStorage access error:", e);
    }
    return DEFAULT_MEMBERS;
}

function saveStoredMembers(members) {
    try {
        localStorage.setItem('aps_dci_members_v2', JSON.stringify(members));
    } catch (e) {
        console.warn("LocalStorage save error:", e);
    }
}

function getStoredUpcomingEvent() {
    try {
        const stored = localStorage.getItem('aps_dci_upcoming_event_v2');
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_UPCOMING_EVENT;
}

function saveStoredUpcomingEvent(eventData) {
    try {
        localStorage.setItem('aps_dci_upcoming_event_v2', JSON.stringify(eventData));
    } catch (e) {}
}

function getStoredProjects() {
    try {
        const stored = localStorage.getItem('aps_dci_projects_v2');
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_PROJECTS;
}

function saveStoredProjects(projects) {
    try {
        localStorage.setItem('aps_dci_projects_v2', JSON.stringify(projects));
    } catch (e) {}
}

/* ========================================================
   WEB AUDIO API SYNTHESIZER
   ======================================================== */
let audioCtx = null;

function playSciFiSound(type) {
    if (window.appState.sfxMuted) return;
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'tick') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.035);
            osc.start(now);
            osc.stop(now + 0.035);
        } else if (type === 'scan') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(250, now);
            osc.frequency.linearRampToValueAtTime(1100, now + 0.28);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'grant') {
            // Futuristic tri-tone authorization chime
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
            osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            osc.start(now);
            osc.stop(now + 0.45);
        } else if (type === 'denied') {
            // Low alarm buzzer
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.setValueAtTime(130, now + 0.15);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
            osc.start(now);
            osc.stop(now + 0.35);
        } else if (type === 'spark') {
            // High shimmer
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.linearRampToValueAtTime(1600, now + 0.12);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.start(now);
            osc.stop(now + 0.22);
        } else if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(750, now);
            osc.frequency.exponentialRampToValueAtTime(250, now + 0.04);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'alarm') {
            // Red alert siren
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.linearRampToValueAtTime(800, now + 0.2);
            osc.frequency.linearRampToValueAtTime(400, now + 0.4);
            gain.gain.setValueAtTime(0.09, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        }
    } catch (e) {}
}

/* ========================================================
   DOM INITIALIZATION
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check for previously authenticated member in session
    const cachedUser = sessionStorage.getItem('aps_dci_active_user');
    if (cachedUser) {
        try {
            window.appState.currentUser = JSON.parse(cachedUser);
        } catch (e) {}
    }

    // 2. Initialize Lucide Icons
    if (window.lucide) lucide.createIcons();

    // 3. Start Boot Loader
    runBootSequence();

    // 4. Render Core Dynamic Modules
    renderRosterGrid();
    renderUpcomingEvent();
    renderPastWinners();
    renderProjectsGrid();

    // 5. Initialize Live Countdown & Terminal
    initCountdownTimer();
    initHackerTerminal();

    // 6. Initialize Animated Hero Counters
    initHeroCounters();

    // 7. Initialize Custom Magnetic Cursor
    initMagneticCursor();

    // 8. Initialize System Toggles (Canvas, SFX, Scanlines, Theme)
    initSystemControls();
});

/* ========================================================
   BOOT SEQUENCE & LOADING FLOW
   ======================================================== */
function runBootSequence() {
    const loader = document.getElementById('boot-screen');
    const progressEl = document.getElementById('boot-progress-num');
    const barEl = document.getElementById('boot-progress-bar');
    const logEl = document.getElementById('boot-log');
    const gateEl = document.getElementById('clearance-gate');

    const logs = [
        "[BOOT] Sector E-10 Islamabad Defence Node detected.",
        "[BUS] Calibrating 16-Member Whitelisted Matrix...",
        "[SYNC] Loading Mechatronics, AI & CanSat telemetry...",
        "[STATUS] Security Clearance Protocol: STANDBY."
    ];

    let progress = 0;
    let logIdx = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 6;
        if (progress > 100) progress = 100;

        if (progressEl) progressEl.textContent = `${progress}%`;
        if (barEl) barEl.style.width = `${progress}%`;
        playSciFiSound('tick');

        if (logEl && progress > (logIdx + 1) * 22 && logIdx < logs.length) {
            const p = document.createElement('p');
            p.textContent = logs[logIdx];
            p.className = "text-[11px] font-mono text-cyan-400";
            logEl.appendChild(p);
            logEl.scrollTop = logEl.scrollHeight;
            logIdx++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (document.getElementById('boot-loading-panel')) {
                    document.getElementById('boot-loading-panel').classList.add('hidden');
                }
                if (gateEl) {
                    gateEl.classList.remove('hidden');
                    gateEl.classList.add('animate-in', 'fade-in', 'duration-500');
                }
                playSciFiSound('scan');
                if (window.lucide) lucide.createIcons();
            }, 500);
        }
    }, 60);
}

// Enter as Public Guest / Surveillance
window.enterAsSurveillance = function () {
    playSciFiSound('scan');
    const scanOverlay = document.getElementById('biometric-scan-overlay');
    const scanText = document.getElementById('scan-status-text');

    if (scanOverlay) scanOverlay.classList.remove('hidden');
    if (scanText) scanText.textContent = "OPTICAL RETINA SCAN INITIALIZING...";

    setTimeout(() => {
        if (scanText) scanText.textContent = "BIOMETRIC MATCH: SURVEILLANCE GUEST // LEVEL-1 ACCESS";
        playSciFiSound('grant');
        triggerConfetti('cyan');
    }, 900);

    setTimeout(() => {
        unlockMainCommandDeck();
        showToast("Access Granted", "Welcome to APS DCI STEM Division (Surveillance Mode).");
    }, 1800);
};

// Open the 16-Member Whitelist Portal modal
window.openMemberLoginModal = function (prefilledId = '') {
    playSciFiSound('click');
    const modal = document.getElementById('member-login-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    if (prefilledId) {
        const idInput = document.getElementById('login-roll-id');
        if (idInput) idInput.value = prefilledId;
    }
};

window.closeMemberLoginModal = function () {
    playSciFiSound('click');
    const modal = document.getElementById('member-login-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// Handle Member Login
window.handleMemberLogin = function (e) {
    if (e) e.preventDefault();
    const rollIdInput = document.getElementById('login-roll-id');
    const pinInput = document.getElementById('login-pin');

    const rollId = rollIdInput ? rollIdInput.value.trim().toUpperCase() : '';
    const pin = pinInput ? pinInput.value.trim() : '';

    const members = getStoredMembers();
    const matched = members.find(m => m.id.toUpperCase() === rollId && m.pin === pin);

    if (matched) {
        playSciFiSound('grant');
        window.appState.currentUser = matched;
        sessionStorage.setItem('aps_dci_active_user', JSON.stringify(matched));

        triggerConfetti(matched.isPresident ? 'gold' : 'emerald');
        updateUserHUD();
        closeMemberLoginModal();
        renderRosterGrid();
        renderUpcomingEvent();

        showToast(
            matched.isPresident ? "PRESIDENTIAL CLEARANCE GRANTED" : "CADET AUTHENTICATED",
            `Welcome back, ${matched.name} [${matched.callsign}]. Whitelisted credentials active.`
        );

        // If boot screen is still visible, transition smoothly
        unlockMainCommandDeck();

        // Open their Member Dashboard so they can immediately edit profile
        setTimeout(() => {
            openMemberDashboard();
        }, 800);
    } else {
        playSciFiSound('denied');
        const errEl = document.getElementById('login-error-msg');
        if (errEl) {
            errEl.textContent = "AUTHENTICATION FAILED: Roll-Call ID not in whitelist or invalid PIN.";
            errEl.classList.remove('hidden');
        }
        showToast("Clearance Denied", "Roll-Call ID or PIN does not match the 16 Whitelisted Cadets.");
    }
};

// Quick 1-Click Demo Login Helper
window.quickLoginAs = function (memberId) {
    const members = getStoredMembers();
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const idInput = document.getElementById('login-roll-id');
    const pinInput = document.getElementById('login-pin');
    if (idInput) idInput.value = member.id;
    if (pinInput) pinInput.value = member.pin;

    window.handleMemberLogin();
};

// Log out active user
window.logoutActiveUser = function () {
    playSciFiSound('click');
    window.appState.currentUser = null;
    sessionStorage.removeItem('aps_dci_active_user');
    updateUserHUD();
    renderRosterGrid();
    renderUpcomingEvent();
    closeMemberDashboard();
    showToast("Signed Out", "Returned to Guest Surveillance Clearance.");
};

function unlockMainCommandDeck() {
    const bootScreen = document.getElementById('boot-screen');
    const mainDeck = document.getElementById('command-deck');

    if (bootScreen) {
        bootScreen.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            bootScreen.classList.add('hidden');
        }, 500);
    }
    if (mainDeck) {
        mainDeck.classList.remove('opacity-0');
        if (window.lucide) lucide.createIcons();
    }
    updateUserHUD();
}

function updateUserHUD() {
    const badge = document.getElementById('hud-user-badge');
    const roleText = document.getElementById('hud-role-text');
    const icon = document.getElementById('hud-user-icon');
    const user = window.appState.currentUser;

    if (!badge || !roleText) return;

    if (!user) {
        roleText.textContent = "SURVEILLANCE GUEST";
        badge.className = "flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs cursor-pointer hover:bg-amber-500/20 transition-colors";
        badge.onclick = () => openMemberLoginModal();
        if (icon) icon.setAttribute('data-lucide', 'shield');
    } else if (user.isPresident) {
        roleText.textContent = `PRESIDENT: ${user.name.split(' ')[1] || user.callsign} [${user.id}]`;
        badge.className = "flex items-center gap-2 px-3 py-1 rounded bg-amber-400/20 border border-amber-400 text-amber-300 font-mono text-xs cursor-pointer hover:bg-amber-400/30 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)]";
        badge.onclick = () => openMemberDashboard();
        if (icon) icon.setAttribute('data-lucide', 'crown');
    } else {
        roleText.textContent = `CADET: ${user.callsign} [${user.id}]`;
        badge.className = "flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/15 border border-emerald-400 text-emerald-300 font-mono text-xs cursor-pointer hover:bg-emerald-500/25 transition-all shadow-[0_0_15px_rgba(0,255,136,0.3)]";
        badge.onclick = () => openMemberDashboard();
        if (icon) icon.setAttribute('data-lucide', 'user-check');
    }
    if (window.lucide) lucide.createIcons();
}

/* ========================================================
   THE 16-MEMBER WHITELISTED PORTAL: EDIT MY PROFILE
   ======================================================== */
window.openMemberDashboard = function () {
    const user = window.appState.currentUser;
    if (!user) {
        openMemberLoginModal();
        return;
    }
    playSciFiSound('click');

    const modal = document.getElementById('member-dashboard-modal');
    if (!modal) return;

    // Prepopulate dashboard fields
    document.getElementById('dash-roll-id').textContent = user.id;
    document.getElementById('dash-clearance').textContent = user.clearance;
    document.getElementById('dash-name-input').value = user.name;
    document.getElementById('dash-callsign-input').value = user.callsign;
    document.getElementById('dash-wing-select').value = user.wing;
    document.getElementById('dash-bio-input').value = user.bio;
    document.getElementById('dash-skills-input').value = user.skills.join(', ');
    document.getElementById('dash-github-input').value = user.links.github || '';
    document.getElementById('dash-portfolio-input').value = user.links.portfolio || '';

    // Presidential badge visibility
    const presIndicator = document.getElementById('dash-presidential-indicator');
    if (presIndicator) {
        if (user.isPresident) {
            presIndicator.classList.remove('hidden');
        } else {
            presIndicator.classList.add('hidden');
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
};

window.closeMemberDashboard = function () {
    playSciFiSound('click');
    const modal = document.getElementById('member-dashboard-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.saveMemberProfile = function (e) {
    if (e) e.preventDefault();
    const user = window.appState.currentUser;
    if (!user) return;

    const name = document.getElementById('dash-name-input').value.trim();
    const callsign = document.getElementById('dash-callsign-input').value.trim();
    const wing = document.getElementById('dash-wing-select').value;
    const bio = document.getElementById('dash-bio-input').value.trim();
    const skillsRaw = document.getElementById('dash-skills-input').value;
    const github = document.getElementById('dash-github-input').value.trim();
    const portfolio = document.getElementById('dash-portfolio-input').value.trim();

    const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

    // Update in stored members
    const members = getStoredMembers();
    const idx = members.findIndex(m => m.id === user.id);
    if (idx !== -1) {
        members[idx].name = name;
        members[idx].callsign = callsign;
        members[idx].wing = wing;
        members[idx].bio = bio;
        members[idx].skills = skills;
        members[idx].links.github = github;
        members[idx].links.portfolio = portfolio;

        saveStoredMembers(members);
        window.appState.currentUser = members[idx];
        sessionStorage.setItem('aps_dci_active_user', JSON.stringify(members[idx]));

        playSciFiSound('grant');
        triggerConfetti('emerald');
        closeMemberDashboard();
        updateUserHUD();
        renderRosterGrid();

        showToast("Profile Saved & Persisted", `Cadet ${name} dossier updated across public roster.`);
    }
};

/* ========================================================
   PUBLIC INTERACTIVE ROSTER GRID WITH 3D FLIP-CARDS
   ======================================================== */
window.filterRoster = function (wing) {
    playSciFiSound('click');
    window.appState.activeWingFilter = wing;

    // Update filter tab active styles
    const buttons = document.querySelectorAll('.roster-filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-wing') === wing) {
            btn.className = "roster-filter-btn px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-mono text-xs font-bold transition-all shadow-[0_0_12px_#00f0ff]";
        } else {
            btn.className = "roster-filter-btn px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs transition-colors border border-white/10";
        }
    });

    renderRosterGrid();
};

function renderRosterGrid() {
    const container = document.getElementById('roster-grid-container');
    if (!container) return;

    const members = getStoredMembers();
    const filter = window.appState.activeWingFilter;
    const currentUser = window.appState.currentUser;

    const filtered = filter === 'all' 
        ? members 
        : members.filter(m => m.wing.toLowerCase().includes(filter.toLowerCase()));

    container.innerHTML = '';

    filtered.forEach(m => {
        const isActiveUser = currentUser && currentUser.id === m.id;
        const card = document.createElement('div');
        card.className = `roster-card ${isActiveUser ? 'is-active-user' : ''}`;
        card.id = `card-${m.id}`;

        const initials = m.name.split(' ').map(n => n[0]).slice(-2).join('');

        card.innerHTML = `
            <div class="roster-card-inner">
                <!-- FRONT SIDE -->
                <div class="roster-card-front flex flex-col justify-between">
                    <div>
                        <!-- Top Metadata Bar -->
                        <div class="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                            <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                                ${m.id}
                            </span>
                            ${m.isPresident 
                                ? `<span class="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center gap-1 font-bold">
                                     <i data-lucide="crown" class="w-3 h-3 text-amber-400"></i> PRESIDENT
                                   </span>`
                                : `<span class="font-mono text-[10px] text-slate-400">${m.clearance}</span>`
                            }
                        </div>

                        <!-- Cadet Holographic Avatar -->
                        <div class="flex items-center gap-3.5 my-4">
                            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.avatarGradient} flex items-center justify-center text-white font-orbitron font-extrabold text-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] shrink-0 border border-white/20">
                                ${initials}
                            </div>
                            <div>
                                <h3 class="font-orbitron font-bold text-base text-white hover:text-cyan-400 transition-colors">
                                    ${m.name}
                                </h3>
                                <p class="font-mono text-xs text-amber-400 font-semibold tracking-wide">
                                    CALLSIGN: ${m.callsign}
                                </p>
                                <p class="font-mono text-[11px] text-cyan-300/80 mt-0.5">
                                    ${m.role}
                                </p>
                            </div>
                        </div>

                        <!-- Wing Badge -->
                        <div class="mb-3">
                            <span class="inline-block text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                                📡 ${m.wing}
                            </span>
                        </div>

                        <!-- Skills Badges -->
                        <div class="flex flex-wrap gap-1.5 mb-2">
                            ${m.skills.slice(0, 3).map(s => `
                                <span class="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono text-[10px]">
                                    ${s}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Bottom Action Controls -->
                    <div class="pt-3 border-t border-cyan-500/20 flex items-center justify-between gap-2">
                        ${isActiveUser 
                            ? `<button onclick="openMemberDashboard()" class="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-[0_0_12px_#00ff88]">
                                 <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Edit My Profile
                               </button>`
                            : `<button onclick="openMemberLoginModal('${m.id}')" class="text-[11px] font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors">
                                 <i data-lucide="key" class="w-3.5 h-3.5"></i> Verify Access
                               </button>`
                        }
                        
                        <button onclick="toggleCardFlip('${m.id}')" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono text-[11px] flex items-center gap-1.5 transition-all">
                            <span>Flip Dossier</span>
                            <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>

                <!-- BACK SIDE -->
                <div class="roster-card-back flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                            <span class="font-orbitron font-bold text-xs text-emerald-400">RESEARCH DOSSIER</span>
                            <span class="font-mono text-[10px] text-slate-400">${m.id}</span>
                        </div>

                        <!-- Bio Snippet -->
                        <div class="my-3">
                            <span class="text-[10px] font-mono text-slate-400 block mb-1">BIOGRAPHICAL FOCUS:</span>
                            <p class="font-mono text-xs text-slate-200 leading-relaxed bg-black/50 p-2.5 rounded-lg border border-white/5">
                                ${m.bio}
                            </p>
                        </div>

                        <!-- Flagship Projects -->
                        <div class="mb-3">
                            <span class="text-[10px] font-mono text-amber-400 block mb-1">KEY INITIATIVES:</span>
                            <div class="flex flex-wrap gap-1">
                                ${m.projects.map(p => `
                                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                                        • ${p}
                                    </span>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Portfolios & Socials -->
                        <div>
                            <span class="text-[10px] font-mono text-slate-400 block mb-1">EXTERNAL LINKS:</span>
                            <div class="flex items-center gap-2">
                                <a href="${m.links.github}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded bg-black/60 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono text-[10px] flex items-center gap-1 transition-colors">
                                    <i data-lucide="github" class="w-3 h-3"></i> GitHub
                                </a>
                                <a href="${m.links.portfolio}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded bg-black/60 hover:bg-white/10 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 font-mono text-[10px] flex items-center gap-1 transition-colors">
                                    <i data-lucide="external-link" class="w-3 h-3"></i> Portfolio
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Flip Back Button -->
                    <div class="pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                        <span class="font-mono text-[10px] text-slate-500">APS&amp;C DCI CADET</span>
                        <button onclick="toggleCardFlip('${m.id}')" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-mono text-[11px] flex items-center gap-1.5 transition-all">
                            <span>Return to Front</span>
                            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

window.toggleCardFlip = function (memberId) {
    playSciFiSound('click');
    const card = document.getElementById(`card-${memberId}`);
    if (card) {
        card.classList.toggle('is-flipped');
    }
};

/* ========================================================
   UPCOMING EVENTS & PRESIDENTIAL EDITING AUTHORITY
   ======================================================== */
function renderUpcomingEvent() {
    const event = getStoredUpcomingEvent();
    const currentUser = window.appState.currentUser;

    const titleEl = document.getElementById('event-title');
    const subtitleEl = document.getElementById('event-subtitle');
    const descEl = document.getElementById('event-description');
    const venueEl = document.getElementById('event-venue');
    const prizeEl = document.getElementById('event-prize');
    const dateEl = document.getElementById('event-date-display');
    const authorEl = document.getElementById('event-author-tag');
    const editBtn = document.getElementById('event-edit-button');

    if (titleEl) titleEl.textContent = event.title;
    if (subtitleEl) subtitleEl.textContent = event.subtitle;
    if (descEl) descEl.textContent = event.description;
    if (venueEl) venueEl.textContent = event.venue;
    if (prizeEl) prizeEl.textContent = event.prizePool;
    if (authorEl) authorEl.textContent = `DIRECTIVE ISSUED BY: ${event.lastUpdatedBy}`;

    if (dateEl) {
        const d = new Date(event.date);
        dateEl.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    if (editBtn) {
        // Change visual styling based on presidential clearance
        if (currentUser && currentUser.isPresident) {
            editBtn.innerHTML = `<i data-lucide="crown" class="w-4 h-4 text-amber-400"></i><span>PRESIDENTIAL EVENT CONSOLE (UNLOCKED)</span>`;
            editBtn.className = "px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-orbitron font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all";
        } else {
            editBtn.innerHTML = `<i data-lucide="lock" class="w-4 h-4"></i><span>EDIT COMPETITION DIRECTIVE (PRESIDENT ONLY)</span>`;
            editBtn.className = "px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-mono text-xs flex items-center gap-2 transition-all";
        }
    }
    if (window.lucide) lucide.createIcons();
}

// Click Handler: Triggers either Presidential Console or Permission Denied Alert
window.handleUpcomingEventEditClick = function () {
    const currentUser = window.appState.currentUser;

    if (currentUser && currentUser.isPresident) {
        // President is authenticated -> Open Presidential Event Console Modal
        playSciFiSound('grant');
        openPresidentialEventModal();
    } else {
        // Access Denied! Show red tactical security modal
        playSciFiSound('denied');
        openPresidentialLockoutAlert();
    }
};

window.openPresidentialEventModal = function () {
    const modal = document.getElementById('presidential-event-modal');
    if (!modal) return;
    const event = getStoredUpcomingEvent();

    document.getElementById('edit-event-title').value = event.title;
    document.getElementById('edit-event-subtitle').value = event.subtitle;
    document.getElementById('edit-event-date').value = event.date.slice(0, 16);
    document.getElementById('edit-event-venue').value = event.venue;
    document.getElementById('edit-event-prize').value = event.prizePool;
    document.getElementById('edit-event-desc').value = event.description;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();
};

window.closePresidentialEventModal = function () {
    playSciFiSound('click');
    const modal = document.getElementById('presidential-event-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.savePresidentialEvent = function (e) {
    if (e) e.preventDefault();
    const currentUser = window.appState.currentUser;
    if (!currentUser || !currentUser.isPresident) return;

    const event = getStoredUpcomingEvent();
    event.title = document.getElementById('edit-event-title').value.trim();
    event.subtitle = document.getElementById('edit-event-subtitle').value.trim();
    event.date = document.getElementById('edit-event-date').value;
    event.venue = document.getElementById('edit-event-venue').value.trim();
    event.prizePool = document.getElementById('edit-event-prize').value.trim();
    event.description = document.getElementById('edit-event-desc').value.trim();
    event.lastUpdatedBy = `${currentUser.name} (President)`;
    event.updatedAt = new Date().toISOString();

    saveStoredUpcomingEvent(event);
    playSciFiSound('grant');
    triggerConfetti('gold');
    closePresidentialEventModal();
    renderUpcomingEvent();

    showToast("Presidential Order Dispatched", "Competition directives updated & broadcast to all wings.");
};

// Modal for Non-Presidents Attempting to Edit
window.openPresidentialLockoutAlert = function () {
    const modal = document.getElementById('presidential-lockout-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (window.lucide) lucide.createIcons();
    }
};

window.closePresidentialLockoutAlert = function () {
    playSciFiSound('click');
    const modal = document.getElementById('presidential-lockout-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// Past Competition Winners Showcase
function renderPastWinners() {
    const container = document.getElementById('past-winners-grid');
    if (!container) return;
    container.innerHTML = '';

    PAST_WINNERS.forEach(w => {
        const card = document.createElement('div');
        card.className = "hud-box p-6 space-y-4 hover:border-amber-400/50 transition-all";
        card.innerHTML = `
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
                <span class="font-mono text-xs px-2.5 py-1 rounded ${w.badgeColor} border font-bold">
                    ${w.placement}
                </span>
                <span class="font-mono text-xs text-amber-400 flex items-center gap-1 font-semibold">
                    <i data-lucide="trophy" class="w-3.5 h-3.5"></i> ${w.year}
                </span>
            </div>
            <div>
                <h4 class="font-orbitron font-extrabold text-lg text-white">
                    ${w.competition}
                </h4>
                <p class="font-mono text-xs text-cyan-400 mt-0.5">
                    Venue: ${w.edition}
                </p>
            </div>
            <div class="bg-black/60 p-3 rounded-lg border border-white/5 space-y-1.5 font-mono text-xs">
                <div class="text-slate-400">
                    <strong class="text-white">PROJECT:</strong> ${w.project}
                </div>
                <div class="text-slate-400">
                    <strong class="text-white">CADETS:</strong> ${w.cadets.join(' & ')}
                </div>
            </div>
            <p class="text-xs text-slate-300 font-mono leading-relaxed">
                ${w.description}
            </p>
        `;
        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

/* ========================================================
   PROJECT SHOWCASE WITH LIVE SPARK/UPVOTING COUNTER
   ======================================================== */
window.filterProjects = function (category) {
    playSciFiSound('click');
    window.appState.activeProjectFilter = category;

    const buttons = document.querySelectorAll('.project-filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.className = "project-filter-btn px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-mono text-xs font-bold transition-all shadow-[0_0_12px_#00f0ff]";
        } else {
            btn.className = "project-filter-btn px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs transition-colors border border-white/10";
        }
    });

    renderProjectsGrid();
};

function renderProjectsGrid() {
    const container = document.getElementById('projects-grid-container');
    if (!container) return;

    const projects = getStoredProjects();
    const filter = window.appState.activeProjectFilter;

    const filtered = filter === 'all'
        ? projects
        : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = '';

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = "hud-box p-6 flex flex-col justify-between space-y-4";
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="font-mono text-[10px] px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        ${p.wing}
                    </span>
                    <span class="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        ${p.status}
                    </span>
                </div>
                <div>
                    <h3 class="font-orbitron font-extrabold text-xl text-white">
                        ${p.name}
                    </h3>
                    <p class="font-mono text-xs text-amber-400 font-medium">
                        ${p.tagline}
                    </p>
                </div>
                <div class="bg-black/60 p-3 rounded-lg border border-white/5 font-mono text-xs space-y-1">
                    <p class="text-slate-400"><strong class="text-white">LEADS:</strong> ${p.lead}</p>
                    <p class="text-slate-400"><strong class="text-white">SPECS:</strong> ${p.specs}</p>
                </div>
                <div class="flex flex-wrap gap-1.5 pt-1">
                    ${p.tags.map(t => `
                        <span class="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono text-[10px]">
                            ${t}
                        </span>
                    `).join('')}
                </div>
            </div>

            <!-- Bottom Upvote / Spark Counter Bar -->
            <div class="pt-4 border-t border-cyan-500/20 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <button onclick="sparkProject('${p.id}')" id="spark-btn-${p.id}" class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-black font-orbitron font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,170,0,0.4)] group">
                        <i data-lucide="flame" class="w-4 h-4 text-black group-hover:scale-125 transition-transform" id="flame-icon-${p.id}"></i>
                        <span>SPARK</span>
                    </button>
                    <span id="spark-count-${p.id}" class="font-mono text-sm text-amber-400 font-bold px-2 py-0.5 rounded bg-black/60 border border-amber-500/30">
                        ${p.sparkCount}
                    </span>
                </div>

                <div class="flex items-center gap-2">
                    <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors" title="Source Code">
                        <i data-lucide="github" class="w-4 h-4"></i>
                    </a>
                    <a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="p-2 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors" title="Live Telemetry Demo">
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if (window.lucide) lucide.createIcons();
}

// Spark / Upvote Action
window.sparkProject = function (projectId) {
    playSciFiSound('spark');
    const projects = getStoredProjects();
    const proj = projects.find(p => p.id === projectId);
    if (!proj) return;

    proj.sparkCount += 1;
    saveStoredProjects(projects);

    const countEl = document.getElementById(`spark-count-${projectId}`);
    const flameEl = document.getElementById(`flame-icon-${projectId}`);

    if (countEl) countEl.textContent = proj.sparkCount;
    if (flameEl) {
        flameEl.classList.add('spark-active');
        setTimeout(() => flameEl.classList.remove('spark-active'), 400);
    }

    triggerConfetti('amber');
    showToast("Project Sparked!", `+1 Upvote for ${proj.name}. Telemetry score: ${proj.sparkCount}`);
};

/* ========================================================
   CUSTOM INTERACTIVE FLOATING TERMINAL
   ======================================================== */
function initHackerTerminal() {
    const input = document.getElementById('float-term-input');
    const output = document.getElementById('float-term-output');
    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const raw = input.value.trim();
            input.value = '';
            if (raw.length > 0) {
                executeTerminalCommand(raw, output);
                playSciFiSound('click');
            }
        }
    });
}

function executeTerminalCommand(cmdString, outputEl) {
    const parts = cmdString.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg1 = parts[1];
    const arg2 = parts[2];

    const user = window.appState.currentUser;
    const promptTag = user ? `${user.callsign.toLowerCase()}@aps-dci:~$` : `cadet@aps-dci:~$`;

    const line = document.createElement('div');
    line.className = "text-slate-300 font-mono text-xs my-1";

    let resp = "";

    switch (cmd) {
        case 'help':
            resp = `
APS DCI STEM CLUB // TACTICAL TERMINAL DIRECTIVES:
  • roster            - Print full 16-Member Whitelisted Cadet Roster
  • matrix            - Toggle Falling Digital Matrix Code Rain Canvas
  • radar             - Toggle Tactical Radar Telemetry Canvas
  • events            - Telemetry on upcoming INNOVEX 2026 Competition
  • winners           - View historic national awards & championships
  • president         - Access Presidential Dispatch & Directives
  • spark [proj-id]   - Upvote a project (e.g., 'spark proj-vanguard')
  • login [id] [pin]  - Authenticate directly via CLI (e.g. login APS-STEM-01 DCI-PRES-2026)
  • logout            - Clear session and return to Guest Clearance
  • whoami            - Inspect active credentials and clearance tier
  • theme [navy|emerald|gold|crimson] - Switch UI cyber theme
  • sound [on|off]    - Toggle synthesized sound effects
  • sudo unlock       - Classified Skunkworks Protocol (CLASSIFIED)
  • clear             - Wipe terminal screen
            `;
            break;

        case 'roster':
            const members = getStoredMembers();
            let table = `\n================== APS DCI 16-MEMBER WHITELIST ==================\n`;
            table += `ID          CALLSIGN     ROLE                           WING\n`;
            table += `-----------------------------------------------------------------\n`;
            members.forEach(m => {
                const idPad = m.id.padEnd(12, ' ');
                const callPad = m.callsign.padEnd(13, ' ');
                const rolePad = m.role.slice(0, 30).padEnd(31, ' ');
                table += `${idPad}${callPad}${rolePad}${m.wing}\n`;
            });
            table += `=================================================================\n`;
            resp = table;
            break;

        case 'matrix':
            if (window.setCanvasMode) {
                window.setCanvasMode('matrix');
                resp = `[CANVAS] Switched to DIGITAL MATRIX CODE RAIN MODE.`;
                playSciFiSound('scan');
            }
            break;

        case 'radar':
            if (window.setCanvasMode) {
                window.setCanvasMode('radar');
                resp = `[CANVAS] Switched to TACTICAL RADAR TELEMETRY MODE.`;
                playSciFiSound('scan');
            }
            break;

        case 'events':
            const ev = getStoredUpcomingEvent();
            resp = `
NEXT COMPETITION DIRECTIVE:
Title:    ${ev.title}
Subtitle: ${ev.subtitle}
Venue:    ${ev.venue}
Target:   ${ev.date}
Prizes:   ${ev.prizePool}
Rules:    Only Club President (${ev.lastUpdatedBy}) can alter directives.
            `;
            break;

        case 'winners':
            resp = PAST_WINNERS.map(w => `• [${w.year}] ${w.competition} -> ${w.placement} (${w.project})`).join('\n');
            break;

        case 'president':
            resp = `
[PRESIDENTIAL DISPATCH // CADET MUHAMMAD HAMZA]
"To all 16 Cadets and prospective recruits: Sector E-10 is leading Pakistan's youth STEM vanguard. Prepare your rovers, calibrate your LoRa downlinks, and verify your neural models for INNOVEX 2026. 'I Shall Rise and Shine'!"
            `;
            break;

        case 'sudo':
            if (arg1 === 'unlock') {
                playSciFiSound('alarm');
                triggerConfetti('gold');
                resp = `
[CRITICAL ALERT] CLASSIFIED OVERRIDE GRANTED!
================================================================
>>> MARGALLA RADAR ARRAY: ACCESS GRANTED
>>> SKUNKWORKS AUTONOMOUS COMBAT ROVER SCHEMATICS UNLOCKED
>>> CANSAT HIGH-ALTITUDE SATELLITE TELEMETRY DOWNLINK CONNECTED
>>> WELCOME TO APS DCI STEM SPECIAL OPERATIONS DIVISION
================================================================
Directive: Explore the Project Showcase to view unlocked blueprints.
                `;
            } else {
                resp = `sudo: permission denied. Try 'sudo unlock' for classified easter egg.`;
            }
            break;

        case 'whoami':
            if (user) {
                resp = `LOGGED IN CADET:\n  Name: ${user.name}\n  Roll ID: ${user.id}\n  Callsign: ${user.callsign}\n  Wing: ${user.wing}\n  Clearance: ${user.clearance}`;
            } else {
                resp = `CLEARANCE: SURVEILLANCE GUEST (UNAUTHENTICATED).\nType 'help' or login with 'login [id] [pin]' to unlock full privileges.`;
            }
            break;

        case 'login':
            if (arg1 && arg2) {
                const all = getStoredMembers();
                const found = all.find(m => m.id.toUpperCase() === arg1.toUpperCase() && m.pin === arg2);
                if (found) {
                    window.appState.currentUser = found;
                    sessionStorage.setItem('aps_dci_active_user', JSON.stringify(found));
                    updateUserHUD();
                    renderRosterGrid();
                    renderUpcomingEvent();
                    playSciFiSound('grant');
                    triggerConfetti(found.isPresident ? 'gold' : 'emerald');
                    resp = `AUTHENTICATION SUCCESSFUL. Welcome Cadet ${found.name} [${found.callsign}]!`;
                } else {
                    playSciFiSound('denied');
                    resp = `ERROR: Invalid Roll-Call ID or PIN. Use 'roster' to check whitelisted members.`;
                }
            } else {
                resp = `Usage: login <APS-STEM-XX> <PIN>\nExample: login APS-STEM-01 DCI-PRES-2026`;
            }
            break;

        case 'logout':
            window.logoutActiveUser();
            resp = `Logged out. Active clearance reset to Guest Surveillance.`;
            break;

        case 'spark':
            if (arg1) {
                window.sparkProject(arg1);
                resp = `Spark signal transmitted for ${arg1}!`;
            } else {
                resp = `Usage: spark <project-id> (e.g. spark proj-vanguard)`;
            }
            break;

        case 'theme':
            if (['navy', 'emerald', 'gold', 'crimson'].includes(arg1)) {
                setAppTheme(arg1);
                resp = `Active HUD Theme shifted to: ${arg1.toUpperCase()}`;
            } else {
                resp = `Available themes: navy, emerald, gold, crimson`;
            }
            break;

        case 'sound':
            if (arg1 === 'off') {
                window.appState.sfxMuted = true;
                resp = `Synthesizer audio muted.`;
            } else if (arg1 === 'on') {
                window.appState.sfxMuted = false;
                playSciFiSound('grant');
                resp = `Synthesizer audio online.`;
            } else {
                resp = `Usage: sound on | sound off`;
            }
            break;

        case 'clear':
            outputEl.innerHTML = '';
            return;

        default:
            resp = `Directive '${cmd}' not recognized. Type <span class="text-cyan-400 font-bold underline">help</span> for available commands.`;
            break;
    }

    line.innerHTML = `
        <div class="text-cyan-400">${promptTag} <span class="text-white">${cmdString}</span></div>
        <div class="text-cyan-300/90 pl-3 border-l-2 border-cyan-500/40 my-1 whitespace-pre-wrap">${resp}</div>
    `;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
}

// Floating Terminal Toggle
window.toggleFloatingTerminal = function () {
    playSciFiSound('click');
    const term = document.getElementById('floating-terminal');
    if (!term) return;

    if (term.classList.contains('is-hidden')) {
        term.classList.remove('is-hidden');
    } else {
        term.classList.toggle('is-minimized');
    }
};

window.closeFloatingTerminal = function () {
    playSciFiSound('click');
    const term = document.getElementById('floating-terminal');
    if (term) term.classList.add('is-hidden');
};

/* ========================================================
   MEMBERS-ONLY JOIN / CONTACT FORM
   ======================================================== */
window.handleJoinFormSubmit = function (e) {
    if (e) e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const studentId = document.getElementById('contact-student-id').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const wing = document.getElementById('contact-wing').value;
    const skillTier = document.getElementById('contact-skill-tier').value;
    const proposal = document.getElementById('contact-proposal').value.trim();

    // Validation
    if (name.length < 3) {
        showToast("Validation Error", "Full name must be at least 3 characters.");
        playSciFiSound('denied');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        showToast("Validation Error", "Please enter a valid cadet or school email.");
        playSciFiSound('denied');
        return;
    }

    playSciFiSound('scan');
    const btn = document.getElementById('contact-submit-btn');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>ENCRYPTING & TRANSMITTING...</span>`;
        if (window.lucide) lucide.createIcons();
    }

    setTimeout(() => {
        const dispatchId = "DCI-APP-" + Math.floor(Math.random() * 89999 + 10000);
        const submission = {
            dispatchId,
            name,
            studentId,
            email,
            wing,
            skillTier,
            proposal,
            timestamp: new Date().toISOString()
        };

        // Persist to localStorage
        try {
            const existing = JSON.parse(localStorage.getItem('aps_dci_applications') || '[]');
            existing.push(submission);
            localStorage.setItem('aps_dci_applications', JSON.stringify(existing));
        } catch (e) {}

        playSciFiSound('grant');
        triggerConfetti('emerald');

        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-black"></i><span>APPLICATION DISPATCHED</span>`;
            if (window.lucide) lucide.createIcons();
        }

        // Reset form
        document.getElementById('stem-join-form').reset();

        showToast(
            "COMMISSION APPLICATION LOGGED",
            `Reference: ${dispatchId}. Assigned to Head of ${wing}.`
        );
    }, 1200);
};

/* ========================================================
   LIVE HERO ANIMATED COUNTERS
   ======================================================== */
function initHeroCounters() {
    const counters = [
        { id: 'counter-cadets', target: 16, suffix: '' },
        { id: 'counter-projects', target: 48, suffix: '+' },
        { id: 'counter-awards', target: 19, suffix: ' Trophies' },
        { id: 'counter-wings', target: 4, suffix: ' Wings' }
    ];

    counters.forEach(c => {
        const el = document.getElementById(c.id);
        if (!el) return;
        animateCounter(el, 0, c.target, 1400, c.suffix);
    });
}

function animateCounter(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = `${value}${suffix}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = `${end}${suffix}`;
        }
    };
    window.requestAnimationFrame(step);
}

/* ========================================================
   LIVE COUNTDOWN TIMER TO INNOVEX 2026
   ======================================================== */
function initCountdownTimer() {
    function update() {
        const event = getStoredUpcomingEvent();
        const target = new Date(event.date).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        const daysEl = document.getElementById('count-days');
        const hoursEl = document.getElementById('count-hours');
        const minsEl = document.getElementById('count-mins');
        const secsEl = document.getElementById('count-secs');
        const bannerEl = document.getElementById('countdown-timer');

        if (diff <= 0) {
            if (bannerEl) bannerEl.textContent = "INNOVEX IS LIVE!";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
        if (bannerEl) bannerEl.textContent = `${d}D : ${h}H : ${m}M : ${s}S`;
    }

    update();
    setInterval(update, 1000);
}

/* ========================================================
   CUSTOM MAGNETIC CURSOR TRACKER
   ======================================================== */
function initMagneticCursor() {
    const dot = document.getElementById('magnetic-cursor-dot');
    const ring = document.getElementById('magnetic-cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function loop() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    }
    loop();

    // Hover detection over interactive targets
    const interactives = 'button, a, input, select, textarea, .roster-card, .hud-box, .spark-btn';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactives)) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactives)) {
            document.body.classList.remove('cursor-hover');
        }
    });
}

/* ========================================================
   SYSTEM CONTROLS (THEME, AUDIO, SCANLINES, CANVAS)
   ======================================================== */
function initSystemControls() {
    // SFX toggle
    const sfxBtn = document.getElementById('toggle-sfx');
    if (sfxBtn) {
        sfxBtn.addEventListener('click', () => {
            window.appState.sfxMuted = !window.appState.sfxMuted;
            sfxBtn.classList.toggle('text-slate-600');
            sfxBtn.classList.toggle('text-cyan-400');
            if (!window.appState.sfxMuted) playSciFiSound('grant');
            showToast("Synthesizer SFX", window.appState.sfxMuted ? "Sound Muted" : "Sound Enabled");
        });
    }

    // CRT Scanlines toggle
    const scanlineBtn = document.getElementById('toggle-scanlines');
    if (scanlineBtn) {
        scanlineBtn.addEventListener('click', () => {
            window.appState.scanlinesActive = !window.appState.scanlinesActive;
            const el = document.getElementById('scanline-overlay');
            if (el) el.style.display = window.appState.scanlinesActive ? 'block' : 'none';
            scanlineBtn.classList.toggle('text-cyan-400');
            playSciFiSound('click');
        });
    }

    // Canvas Mode Toggle (Radar vs Matrix)
    const canvasToggleBtn = document.getElementById('toggle-canvas-mode');
    if (canvasToggleBtn) {
        canvasToggleBtn.addEventListener('click', () => {
            if (window.toggleCanvasMode) {
                const newMode = window.toggleCanvasMode();
                playSciFiSound('scan');
                showToast("Background Canvas", `Switched to ${newMode.toUpperCase()} Mode.`);
            }
        });
    }
}

function setAppTheme(themeName) {
    document.body.classList.remove('theme-navy', 'theme-emerald', 'theme-gold', 'theme-crimson');
    document.body.classList.add(`theme-${themeName}`);
    window.appState.currentTheme = themeName;
    playSciFiSound('click');
}

/* ========================================================
   TOAST NOTIFICATION SYSTEM & CONFETTI
   ======================================================== */
let toastTimeout = null;

function showToast(title, message) {
    const toast = document.getElementById('tactical-toast');
    if (!toast) return;

    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-message').textContent = message;

    toast.classList.add('toast-visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('toast-visible');
    }, 4500);
}

function triggerConfetti(colorScheme) {
    if (typeof confetti === 'function') {
        const colors = colorScheme === 'gold' 
            ? ['#d4af37', '#f59e0b', '#ffffff', '#00ff88']
            : colorScheme === 'emerald'
            ? ['#00ff88', '#059669', '#00f0ff', '#ffffff']
            : ['#00f0ff', '#0070f3', '#00ff66', '#ffffff'];

        confetti({
            particleCount: 80,
            spread: 85,
            origin: { y: 0.6 },
            colors: colors
        });
    }
}

// Global window attachments
window.executeTerminalCommand = executeTerminalCommand;
window.setAppTheme = setAppTheme;
window.showToast = showToast;
window.playSciFiSound = playSciFiSound;
window.triggerConfetti = triggerConfetti;
