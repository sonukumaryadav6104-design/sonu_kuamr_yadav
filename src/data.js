// All content comes from your resume. Edit anything here.
export const profile = {
  name: "Sonu Kumar Yadav",
  logo: "Sonu Kumar Yadav",
  photo: "/Sonu.jpeg", 
  role: "Full-Stack & AI Developer",
  roles: ["Software Developer", "AI Engineer", "Analytical Problem Solver", "Builder of Reliable Products"],
  status: "Open to SDE and AI/ML internships",
  resumes: [
    { label: "SDE / Full-stack resume", href: "/resume-sde.pdf" },
    { label: "AI / ML resume", href: "/resume-ai.pdf" },
  ],
  location: "Bhopal, India",
  tagline:
    "Computer science student who builds full-stack apps with the MERN stack and AI systems with PyTorch and transformers, from REST APIs to fine-tuned models.",
  about:
    "I’m a computer science student with a solid foundation in data structures and algorithms. I build full-stack products with React, Node.js, Express and MongoDB, including an AI mock-interview platform that uses the OpenAI API, and I build AI systems in Python: multimodal biometrics, transformer-based NLP and reinforcement learning. I’m looking for an SDE or AI/ML internship where I can contribute to scalable backend systems, REST APIs and modern web apps.",
  email: "sonukumaryadav6104@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/sonukumaryadav6104-design" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sonu-kumar-32a09a2ba" },
  ],
};

export const stats = [
  { label: "Projects built", value: 5 },
  { label: "Certifications", value: 4 },
];

export const lookingFor = [
  "SDE internships (backend, REST APIs, MERN)",
  "AI/ML internships (NLP, deep learning, applied AI)",
  "Teams that value problem solving and shipping",
];

export const coreSubjects = [
  "JavaScript / TypeScript",
  "React & Next.js",
  "Node.js & Express",
  "MongoDB",
  "Python",
  "Java",
  "PyTorch",
  "Docker",
  "Git & GitHub",
];

export const skillGroups = [
  { group: "Full-Stack", items: ["React.js", "Next.js", "Node.js", "Express.js", "REST APIs", "JWT authentication", "Tailwind CSS", "Bootstrap", "EJS"] },
  { group: "AI / ML", items: ["OpenAI API", "Deep Learning", "NLP", "Reinforcement Learning (DQN)", "Speaker verification", "Face recognition"] },
  { group: "Languages", items: ["Java", "JavaScript", "TypeScript", "Python", "SQL"] },
  { group: "Libraries", items: ["PyTorch", "scikit-learn", "Transformers", "Librosa", "dlib", "Streamlit"] },
  { group: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"] },
  { group: "Tools & core", items: ["Git", "GitHub", "Docker", "VS Code", "Jupyter", "Google Colab", "DSA", "OOP"] },
  { group: "Soft skills", items: ["Communication", "Leadership", "Problem solving", "Adaptability"] },
];

const GH = "https://github.com/sonukumaryadav6104-design";
export const projects = [
  {
    title: "Intervex AI",
    category: "fullstack",
    desc: "AI mock-interview platform. Generates interviews from your resume and projects, evaluates answers with the OpenAI API, tracks history and exports PDF reports.",
    tags: ["React.js", "Tailwind", "Node.js", "Express", "MongoDB", "JWT", "OpenAI API"],
    gradient: "from-[#6d4aff] to-[#ff5c8a]",
    github: "https://github.com/sonukumaryadav6104-design/Intervex", 
    live: "", // TODO: add the live website link
  },
  {
    title: "StaySphere",
    category: "fullstack",
    desc: "Accommodation listing app with full CRUD, scalable backend routing, responsive pages and Cloudinary image uploads.",
    tags: ["Node.js", "Express", "MongoDB", "EJS", "Cloudinary", "Tailwind"],
    gradient: "from-[#00c2a8] to-[#3a7bff]",
    github: "https://github.com/sonukumaryadav6104-design/StaySphere", // TODO: replace with the StaySphere repo link
    live: "",
  },
  {
    title: "BioMark",
    category: "ai",
    desc: "Multimodal biometric authentication. Face recognition plus voice speaker verification (Resemblyzer, Librosa, WebRTC VAD) to reduce spoofing risk.",
    tags: ["Python", "dlib", "Resemblyzer", "Librosa", "Supabase"],
    gradient: "from-[#ffb347] to-[#ff5c5c]",
    github: "https://github.com/sonukumaryadav6104-design/BioMark",
    live: "",
  },
  {
    title: "Nuclai",
    category: "ai",
    desc: "NLP text summarization. A transformer fine-tuned on the SAMSum dataset to summarise conversations and long text.",
    tags: ["Python", "Transformers", "NLP", "HTML/CSS/JS"],
    gradient: "from-[#a855f7] to-[#3b82f6]",
    github: "https://github.com/sonukumaryadav6104-design/NUCLAI",
    live: "",
  },
  {
    title: "Flappy Bird AI Agent",
    category: "ai",
    desc: "Deep Q-Network agent that learns to play Flappy Bird using experience replay, target networks and ε-greedy exploration.",
    tags: ["Python", "PyTorch", "Reinforcement Learning"],
    gradient: "from-[#22c55e] to-[#14b8a6]",
    github: "",
    live: "",
  },
];

export const experience = [
  {
    title: "B.Tech, Computer Science — IES College of Technology, Bhopal",
    period: "Jun 2024 – Aug 2028 · CGPA 7.99",
    desc: "Core computer science with a focus on AI, machine learning and data structures.",
  },
  {
    title: "NPTEL certifications",
    period: "Certified",
    desc: "Data Structures and Algorithms Using Java, and Introduction to Machine Learning.",
  },
  
];

export const testimonials = [];

export const hire = {
  heading: "Hire me",
  pitch:
    "I build full-stack products and the AI that powers them: React and Node front to back, REST APIs with JWT auth, OpenAI-powered features, and models I train myself in PyTorch. I’m looking for an internship where I can contribute from the first week.",
  reasons: [
    { title: "Full-stack products", desc: "Intervex AI: a MERN app with JWT auth, REST APIs and OpenAI-based interview evaluation." },
    { title: "Solid backend basics", desc: "StaySphere: CRUD, routing and Cloudinary uploads, plus DSA and OOP in Java." },
    { title: "Real AI depth", desc: "Multimodal biometrics, a fine-tuned NLP summarizer and a DQN agent in PyTorch." },
  ],
  availability: [
    { label: "Looking for", value: "SDE or AI/ML internship" },
    { label: "Stack", value: "MERN, TypeScript, Next.js, Python, PyTorch" },
    { label: "Location", value: "Bhopal, India" },
    { label: "Contact", value: "sonukumaryadav6104@gmail.com" },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#experience" },
  { label: "Hire me", href: "#hire" },
  { label: "Contact", href: "#contact" },
];