export interface Project {
  id: string;
  title: string;
  tagline: string;
  period: string;
  stack: string;
  description: string;
  tech: string[];
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'sam2',
    title: 'Grounded-SAM2 LVIS Benchmark',
    tagline: "Master's capstone — open-vocabulary segmentation at scale",
    period: 'Jan 2026 — Apr 2026',
    stack: 'PyTorch · Grounding DINO · SAM2 · LVIS · CUDA',
    description:
      'Engineered an open-vocabulary segmentation benchmarking pipeline on the LVIS dataset (1,200+ categories) as my Master’s capstone, creating a balanced 16,000-image subset to evaluate zero-shot object segmentation at scale. Generated and evaluated 140,000+ detections with a hybrid Grounding DINO + SAM2 architecture on an RTX 4090, automating mask generation, RLE encoding, and official LVIS metric computation via custom Python scripts.',
    tech: ['PyTorch', 'Grounding DINO', 'SAM2', 'LVIS', 'CUDA'],
    github: 'https://github.com/BhavyaPatel25/Grounded-SAM2-LVIS-Benchmark',
    featured: true,
  },
  {
    id: 'museum',
    title: 'Museum View Detection',
    tagline: 'End-to-end image classification pipeline — CNN vs tree-based baselines',
    period: 'Dec 2024 — Mar 2025',
    stack: 'PyTorch · CNN · XGBoost · Streamlit · MLflow',
    description:
      'Built and deployed an end-to-end image classification pipeline on Streamlit, training a PyTorch CNN on the MIT Places dataset (10,000 images) with advanced data augmentation and hyperparameter optimization. Compared baseline classifiers (Decision Tree, Random Forest, XGBoost) against the fine-tuned CNN, logging every run via MLflow for reproducibility and systematic model comparison.',
    tech: ['PyTorch', 'CNN', 'XGBoost', 'Streamlit', 'MLflow'],
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
    featured: true,
  },
  {
    id: 'multilingual',
    title: 'Multilingual Video Script Generation',
    tagline: 'AI pipeline transforming PowerPoint decks into narrated videos',
    period: 'Dec 2023 — Jun 2024',
    stack: 'GPT-4 · LangChain · Python · Streamlit',
    description:
      'An end-to-end content automation pipeline that converts presentation decks into multilingual video scripts using LLMs, with auto-sync narration and support for 5+ languages. Benchmarking 4 LLMs lifted script accuracy by 25% and generation speed by 35% with GPT-3.5-Turbo, and 10+ course modules scaled content 3x via Streamlit Cloud.',
    tech: ['GPT-4', 'LangChain', 'Python', 'RAG'],
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
    featured: true,
  },
  {
    id: 'rag',
    title: 'RAG Chatbot',
    tagline: 'Document-aware chatbot with retrieval-augmented generation',
    period: '2024',
    stack: 'LangChain · RAG · FastAPI',
    description:
      'A production-ready RAG pipeline with vector database integration, real-time streaming responses, and custom document ingestion. Answers natural-language questions directly over your uploaded documents with cited retrieval.',
    tech: ['LangChain', 'RAG', 'Python', 'FastAPI'],
    github: 'https://github.com/BhavyaPatel25/rag_chatbot',
    featured: true,
  },
  {
    id: 'palm',
    title: 'Palm Box Cricket',
    tagline: 'Flutter mobile app for real-time cricket facility slot booking',
    period: '2022',
    stack: 'Flutter · Dart · Firebase',
    description:
      'Real-time booking system built with Flutter and Firebase, enabling instant slot reservations and growing user engagement by 40% through an intuitive booking UI.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    id: 'stock',
    title: 'Distributed Stock Market System',
    tagline: 'Fault-tolerant distributed trading platform with replication',
    period: '2023',
    stack: 'Java · Distributed Systems',
    description:
      'Java-based distributed trading platform with leader election, consensus protocols, and automatic failover handling for resilient operation across nodes.',
    tech: ['Java', 'Distributed', 'Backend', 'Systems'],
    github: 'https://github.com/BhavyaPatel25/Distributed-Share-Market',
  },
];

interface ExperienceItem {
  type: 'work' | 'research' | 'leadership';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  details: string[];
}

export const experiences: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Teaching Assistant — Distributed Systems',
    company: 'Concordia University',
    location: 'Montreal, Canada',
    period: 'Sep 2025 — May 2026',
    description: 'Led labs and tutorials on Java RMI, CORBA, and SOAP web services.',
    details: [
      'Directed 10+ lab sessions and weekly tutorials on Distributed Systems for 20+ students.',
      'Authored 10+ tutorials, 5+ labs, 10+ page technical presentations, and programming exercises.',
      'Evaluated 50+ assignments and final projects per term with structured feedback within 5 days.',
    ],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Blue Data Consulting & IT Services Pvt. Ltd.',
    location: 'Surat, India',
    period: 'Dec 2023 — Jun 2024',
    description: 'AI/ML engineering — LLM-powered content automation pipeline.',
    details: [
      'Architected an end-to-end AI pipeline converting 50+ PowerPoint decks into video courses using LLMs, RAG, and Streamlit, lifting automation efficiency 40%.',
      'Benchmarked 4 LLMs on accuracy and speed, achieving 25% higher script accuracy and 35% faster generation with GPT-3.5-Turbo.',
      'Collaborated with a 5-member team on 10+ AI course modules (LangChain, Flowise AI, prompt engineering), scaling content 3x via Streamlit Cloud.',
    ],
  },
  {
    type: 'research',
    title: 'ML Research Student — Vision Transformers',
    company: 'CHARUSAT University',
    location: 'Changa, India',
    period: 'Mar 2022 — Jun 2023',
    description: 'ViT-based sports action recognition on the UCF-101 dataset.',
    details: [
      'Built a deep learning pipeline extracting and curating 13K+ video frames from UCF-101 using NumPy and Pandas.',
      'Fine-tuned a Vision Transformer with TensorFlow and TensorFlow Hub, lifting accuracy from 84% to 94%.',
      'Applied systematic hyperparameter tuning and advanced data augmentation to cut validation loss.',
    ],
  },
  {
    type: 'work',
    title: 'Flutter Development Trainee',
    company: 'Inspire Cyber Security',
    location: 'Surat, India',
    period: 'May — Oct 2022',
    description: 'Mobile app development from Adobe XD to production Flutter UIs.',
    details: [
      'Prototyped 3+ mobile apps in Adobe XD, converting wireframes into responsive Flutter interfaces, cutting iteration cycles 50%.',
      'Delivered the client project "Palm Box Cricket Booking System" with real-time slot reservations, growing user engagement 40%.',
    ],
  },
  {
    type: 'leadership',
    title: 'Professional Service Director — Rotaract Club',
    company: 'CHARUSAT University',
    location: 'Gujarat, India',
    period: 'Sep 2022 — Aug 2023',
    description: 'Led cross-functional teams organizing community and technical events.',
    details: [
      'Led and coordinated 10+ social, technical, and cultural events impacting 500+ students.',
      'Managed cross-functional team operations, improving coordination efficiency by 25%.',
    ],
  },
];

export const publications = [
  {
    title:
      'Vision Transformer in Sport Action: Recognizing Athletic Activities',
    conference: 'ICDSA 2024 · India',
    publisher: 'Springer Book Series',
    year: 'Jun 2024',
    description:
      'Co-authored and spearheaded research on a novel ViT-based deep learning approach for multi-class sports action recognition, overseeing model design, the training pipeline (TensorFlow, TensorFlow Hub), and experimentation on 10,000+ video frames from UCF-101 — achieving significant accuracy improvements over CNN baselines. Presented at ICDSA 2024, India, and published in the Springer Book Series.',
    highlights: [
      'Novel ViT architecture for multi-sport recognition',
      'Validated on 10,000+ frames from UCF-101',
      'Outperformed traditional CNN baselines',
      'Presented at ICDSA 2024 · Published in Springer',
    ],
    doi: 'https://link.springer.com/chapter/10.1007/978-981-96-2179-8_35',
  },
];

export const certifications = [
  {
    title: 'Fundamentals of Digital Image and Video Processing',
    issuer: 'Coursera — Northwestern University',
    description:
      'Core computer vision concepts including signal processing and motion estimation using Python, supporting deep learning research.',
    link: 'https://www.coursera.org/account/accomplishments/verify/M5XESR2N4ZRS',
  },
  {
    title: 'Architecting Smart IoT Devices',
    issuer: 'Coursera — EIT Digital',
    description:
      'IoT system design including edge computing and secure communication protocols, relevant to real-time data pipelines and embedded AI systems.',
    link: 'https://www.coursera.org/account/accomplishments/verify/Z65TH9SXR54Z',
  },
  {
    title: 'Flutter Development with UI/UX',
    issuer: 'Inspire Cyber Security',
    description: 'Cross-platform apps with Firebase backend and intuitive UI/UX design.',
    link: '/Flutter_Certificate.pdf',
  },
  {
    title: 'Complete ML & Data Science Bootcamp 2023',
    issuer: 'Udemy',
    description: 'Comprehensive ML/DS training: algorithms, neural networks, and practical projects.',
    link: 'https://www.udemy.com/certificate/UC-7b5941b7-bd44-479f-af93-406b110adda2/',
  },
  {
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    issuer: 'Udemy',
    description: 'Python from basics to advanced applications and automation.',
    link: 'https://www.udemy.com/certificate/UC-927b7167-6ab5-4dfd-8b1e-ad9f0a7b9e93/',
  },
  {
    title: 'TensorFlow Developer Certificate: Zero to Mastery',
    issuer: 'Udemy',
    description: 'Deep learning with TensorFlow — CNNs, RNNs, and deployment strategies.',
    link: 'https://www.udemy.com/certificate/UC-634f84af-0eb2-4112-8926-0579e6e0c478/',
  },
];


