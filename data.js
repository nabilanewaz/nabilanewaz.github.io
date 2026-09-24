// ============================================================
//  EDIT THIS FILE — all of your portfolio content lives here.
// ============================================================

const PORTFOLIO = {
  name: "Nabila Newaz",
  role: "AI/ML Engineer & Full-Stack Developer",
  // Driver-card details for the F1 theme
  driverCode: "NEW", // 3-letter timing-screen code
  raceNumber: "16", // pick any number you like
  team: "IUT · Computer Science & Engineering",
  focus: "AI/ML · Full-Stack · Mobile",
  status: "Open to offers",
  // Wanted-poster details for the One Piece theme (one-piece/index.html)
  pirate: {
    epithet: "Helmsman of Latent Space",
    crewRole: "Navigator & Shipwright", // steers models, builds apps
    bounty: "1,500,000,000",
    dream: "To build AI that people actually rely on, and ship it to every sea.",
    photo: "", // optional: path to your photo for the wanted poster, e.g. "../photo.jpg"
  },
  // Words cycled in the hero headline
  taglines: ["LLM-powered apps", "RAG pipelines", "full-stack web apps", "cross-platform mobile apps"],
  intro:
    "Computer Science & Engineering undergraduate at IUT working across applied AI/ML research and full-stack engineering, from activation steering for LLM reasoning to shipping production web and mobile apps.",
  location: "Dhaka, Bangladesh",
  email: "nabilanewaz@iut-dhaka.edu",
  resumeUrl: "resume.pdf", // save your CV as resume.pdf in this folder, or set to "" to hide the button

  socials: [
    { label: "GitHub", url: "https://github.com/nabilanewaz" },
    { label: "LinkedIn", url: "https://linkedin.com/in/nabilanewaz" },
    { label: "Email", url: "mailto:nabilanewaz@iut-dhaka.edu" },
  ],

  about: [
    "I'm a Computer Science & Engineering undergraduate at the Islamic University of Technology (IUT) with hands-on experience in both applied AI/ML research and full-stack software engineering.",
    "I've done research on activation steering for LLM reasoning, built RAG pipelines and LLM-driven applications with Gemini, Llama, LangChain and FAISS, and shipped production web and mobile apps across React/Next.js, Node.js/FastAPI and PostgreSQL/MongoDB.",
    "I'm comfortable across the whole ML lifecycle and the full engineering stack, and I take a structured, detail-oriented approach to validating both model outputs and shipped features.",
  ],

  stats: [
    // "delta" is optional and shows as a green timing gap next to the value
    { value: "8", label: "Projects across AI, web & mobile" },
    { value: "3", label: "Internships in AI/ML, mobile & data" },
    { value: "50+", label: "Languages, frameworks & tools" },
  ],

  research: {
    title: "Latent-Space Steering in Compressed & Continuous Chain-of-Thought Reasoning",
    venue: "Undergraduate Thesis · Islamic University of Technology (IUT)",
    points: [
      "Built and ran a four-phase research pipeline with the test set kept separate throughout, covering three Qwen2.5 backbones and two reasoning architectures (LoRA-based compressed-text CoT and COCONUT-style continuous latent CoT). Verified zero data leakage across the train, steering, validation and locked test splits.",
      "Recovered accuracy lost to reasoning compression on the official 1,319-example GSM8K test set, raising Qwen2.5-Math-1.5B from 69.0% to 72.0% with multi-layer difference-of-means activation-steering directions extracted from labeled hidden states. The gains held across all three backbones and both architectures.",
      "Diagnosed a null result from the first single-layer protocol and redesigned extraction and injection. The new protocol corrected 15.2% of baseline-wrong examples with no increase in reasoning token budget, held up against random-noise, shuffled-label and head-level Inference-Time-Intervention controls, and transferred from GSM8K to SVAMP without retuning.",
    ],
    tags: ["Python", "PyTorch", "HuggingFace", "LoRA", "Qwen2.5", "LLMLingua-2", "GSM8K", "SVAMP"],
    github: "https://github.com/nabilanewaz/CCOT-Steering",
  },

  skills: {
    Programming: ["Python", "JavaScript", "TypeScript", "C", "C++", "Java", "Dart", "HTML", "CSS"],
    "AI / ML": ["LLMs (Gemini, Llama, Groq, Qwen)", "LangChain", "Prompt Design", "RAG Pipelines", "Activation Steering", "LoRA", "FAISS", "PyTorch", "TensorFlow", "Keras", "HuggingFace"],
    "Computer Vision": ["CNNs", "OpenCV"],
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter", "Responsive UI", "Component-Based Design", "Client-Side State", "REST API Integration"],
    "Backend & APIs": ["FastAPI", "Flask", "Node.js", "Express.js", "REST APIs", "JWT Auth"],
    Databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Firestore", "SQL"],
    "DevOps & Cloud": ["Vercel CI/CD", "Docker", "Supabase", "Git", "GitHub"],
    "AI-Assisted Development": ["Claude Code", "OpenAI Codex", "Cursor", "GitHub Copilot", "Lovable", "Code Review", "Testing & Validation"],
    Tools: ["VS Code", "Postman", "Jupyter Notebook", "Kaggle", "Colab", "Figma", "Excel", "Cloudinary"],
  },

  // Add a repo URL to "github" or a deployed URL to "live" and an icon link appears on the card.
  projects: [
    {
      title: "PaperVault",
      subtitle: "AI-Powered Research Paper Management Platform",
      description:
        "A live research platform that uses prompt chains to a Groq-hosted LLM for automated summaries, flashcards and semantic paper recommendations. It deploys on every push through Vercel CI/CD with a Supabase backend, and secures user data with Supabase Auth (JWT) and Postgres Row-Level Security.",
      tags: ["Groq API", "React", "TypeScript", "Vite", "Supabase", "Vercel CI/CD"],
      github: "",
      live: "",
      featured: true,
    },
    {
      title: "Personalized Study Planner",
      subtitle: "AI-Powered Application",
      description:
        "A RAG pipeline for personalized academic planning, with prompts and workflows tuned across Gemini and Llama against defined test scenarios. I led end-to-end development of the live app, architected across FastAPI, React and a FAISS retrieval layer.",
      tags: ["FastAPI", "Python", "React", "Tailwind CSS", "Gemini", "Llama", "FAISS"],
      github: "https://github.com/nabilanewaz/Personalized-Study-Planner",
      live: "",
    },
    {
      title: "BizAssist",
      subtitle: "AI-Powered Business Strategy Platform",
      description:
        "A multi-step Gemini evaluation pipeline that chains prompts to score business ideas on market potential, feasibility, scalability and profitability.",
      tags: ["Gemini AI", "Next.js", "TypeScript", "Node.js", "Express", "Firebase", "Cloudinary"],
      github: "https://github.com/nabilanewaz/BizAssist",
      live: "",
    },
    {
      title: "Shondhan",
      subtitle: "AR-Assisted Property Discovery App",
      description:
        "A cross-platform mobile app with real-time map-based property search and AR visualization, built with Flutter, Firebase and ARCore.",
      tags: ["Flutter", "Firebase", "Google Maps API", "ARCore"],
      github: "https://github.com/sakibahmedshanto/shondhan",
      live: "https://youtu.be/HSKvZhBZuLE",
    },
    {
      title: "LyRicA",
      subtitle: "Music Streaming Platform",
      description:
        "A Django music streaming platform with user and admin sides. I built user profiles and profile editing, song requests and uploads for users, artists and admins, admin song management, artist following, artist/album/genre browsing, and search.",
      tags: ["Python", "Django", "PostgreSQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/Meftahul-Anu13/LyRicA",
      live: "",
    },
    {
      title: "TechHive",
      subtitle: "Full-Stack E-Commerce Platform",
      description:
        "A MERN e-commerce store for tech gear with separate user and admin sides. I built the admin panel UI (layout, header, sidebar, orders view), the Express routes and controllers behind admin order management, and the product review and star-rating system from model to API.",
      tags: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT"],
      github: "https://github.com/mnc13/techHive-web",
      live: "",
    },
    {
      title: "LesionNet++",
      subtitle: "Skin Lesion Classification",
      description:
        "Transfer-learning models that classify dermatoscopic images from the HAM10000 dataset into 7 lesion types. I compared MobileNetV2 with DenseNet201, which reached 84% accuracy on a 2,003-image test set, used stratified 5-fold cross-validation, and compressed the dataset to WebP for faster training.",
      tags: ["Python", "TensorFlow", "Keras", "DenseNet201", "MobileNetV2", "HAM10000"],
      github: "https://github.com/nabilanewaz/LesionNetpp",
      live: "",
    },
    {
      title: "SpectraFix",
      subtitle: "Audio Restoration Pipeline for Video",
      description:
        "A signal-processing pipeline that pulls the audio track from a video and cleans it up. It removes noise with spectral gating or noisereduce, filters out mains hum and normalizes loudness. Presets for speech, podcasts and music sit in an interactive notebook UI, and it produces before/after spectrograms and a spectral-stats report.",
      tags: ["Python", "librosa", "SciPy", "noisereduce", "pyloudnorm", "MoviePy"],
      github: "https://github.com/nabilanewaz/SpectraFix",
      live: "",
    },
  ],

  experience: [
    {
      role: "AI / ML Intern",
      company: "EATL",
      period: "",
      points: [
        "Designed and built the core planning logic of an AI study planning system end to end. It shipped to real student users with no critical post-launch defects.",
        "Turned technical implementation and validation results into clear, non-technical status reports, which led to clean stakeholder sign-off.",
      ],
    },
    {
      role: "Mobile App Development Intern",
      company: "Excelerate",
      period: "Virtual · International Team",
      points: [
        "Delivered Flutter features on time across structured sprint cycles, self-testing and debugging cross-platform features before handing them off.",
        "Found and fixed bugs across development and review cycles spread over several time zones, so fewer issues surfaced after merge.",
      ],
    },
    {
      role: "Data Visualization Associate Intern",
      company: "Excelerate",
      period: "Virtual · International Team",
      points: [
        "Built dashboards from structured datasets and checked them against the source data until no discrepancies remained.",
      ],
    },
  ],

  education: [
    {
      degree: "B.Sc. in Computer Science and Engineering",
      school: "Islamic University of Technology (IUT), Gazipur",
      detail:
        "Coursework: Artificial Intelligence, Machine Learning, Data Mining, Digital Image Processing, Pattern Recognition, Data Structures, Algorithms, DBMS, Probability & Statistics, Linear Algebra, Operating Systems, Computer Networks, Theory of Computing, Algorithm Engineering",
    },
    { degree: "Higher Secondary Certificate (HSC)", school: "Rajuk Uttara Model College, Dhaka", detail: "" },
    { degree: "Secondary School Certificate (SSC)", school: "Rajuk Uttara Model College, Dhaka", detail: "" },
  ],

  achievements: [
    { title: "Top 12", text: "KUET BitFest Datathon" },
    { title: "4th Place", text: "CalorieQuest Machine Learning Competition" },
    { title: "Participant", text: "SOLVIO AI Hackathon (Sheba Platform)" },
    { title: "Participant", text: "UIU CSE Fest 2025 Project Show" },
    { title: "Member", text: "IUT Computer Society" },
    { title: "Mentee", text: "SheSTEM Mentorship Program" },
  ],
};
