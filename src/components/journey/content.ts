export interface Project {
  id: string;
  title: string;
  tagline: string;
  period: string;
  stack: string;
  description: string;
  tech: string[];
  github?: string;
  publication?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'sam2',
    title: 'Grounded-SAM2 LVIS Benchmark',
    tagline: "How far can zero-shot object segmentation go on LVIS?",
    period: 'Jan 2026 — Apr 2026',
    stack: 'PyTorch · Grounding DINO · SAM2 · LVIS · CUDA',
    description:
      "For my Master’s capstone, I paired Grounding DINO with SAM2 in a PyTorch pipeline to benchmark open-vocabulary object segmentation. A balanced 16,000-image LVIS subset covered 1,200+ categories. Python scripts automated GPU detection, mask generation, RLE encoding, and official metric evaluation, producing 140,000+ detections on an RTX 4090 with CUDA. The Docker-containerized workflow reached 18.6% rare-category mAP in zero-shot evaluation; the fine-tuned Mask R-CNN baseline scored 0.0%.",
    tech: ['PyTorch', 'Grounding DINO', 'SAM2', 'LVIS', 'CUDA'],
    github: 'https://github.com/BhavyaPatel25/Grounded-SAM2-LVIS-Benchmark',
    featured: true,
  },
  {
    id: 'vit',
    title: 'Vision Transformer Activity Recognition',
    tagline: "Recognizing athletic activities with Vision Transformers (ViT)",
    period: 'Mar 2022 — Jun 2023 · Published 2024',
    stack: 'Python · TensorFlow · TensorFlow Hub · NumPy · Pandas · UCF-101',
    description: "This research explored how Vision Transformers (ViT) compare with CNNs when recognizing athletic activities. I used Python, NumPy, and Pandas to prepare 13,000+ UCF-101 frames, then built configurable training and evaluation workflows with TensorFlow and TensorFlow Hub. Augmentation experiments and hyperparameter tuning brought classification accuracy to 94%, a gain of 12 percentage points over CNN-based workflows. I co-authored the resulting peer-reviewed research in the Springer Book Series, covering the methodology, dataset preparation, and comparative results.",
    tech: ['Python', 'TensorFlow', 'TensorFlow Hub', 'NumPy', 'Pandas', 'UCF-101'],
    publication: 'https://link.springer.com/chapter/10.1007/978-981-96-2179-8_35',
  },
  {
    id: 'museum',
    title: 'Museum View Detection',
    tagline: "Comparing CNN and tree-based approaches to image classification",
    period: 'Dec 2024 — Mar 2025',
    stack: 'PyTorch · CNN · XGBoost · Streamlit · MLflow',
    description:
      "I trained a PyTorch CNN on 10,000 images from MIT Places and compared it with Decision Tree, Random Forest, and XGBoost baselines. Data augmentation and hyperparameter optimization shaped the experiments, while MLflow kept each run available for reproducible model comparisons. The finished image classification pipeline runs on Streamlit.",
    tech: ['PyTorch', 'CNN', 'XGBoost', 'Streamlit', 'MLflow'],
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
    featured: true,
  },
  {
    id: 'multilingual',
    title: 'Multilingual Video Script Generation',
    tagline: "From PowerPoint presentations to multilingual video learning",
    period: 'Dec 2023 — Jun 2024',
    stack: 'GPT-4 · LangChain · Python · Streamlit',
    description:
      "I worked on a pipeline that turns PowerPoint decks into video scripts in 5+ languages, with narration that stays in sync. The work combined Python, LangChain, RAG, FastAPI, and Streamlit with LLM workflows. Prompt evaluation improved selected model-response accuracy by 18%, while GPT-3.5-Turbo workflow changes reduced manual content transformation by 35%. Pinecone and ChromaDB retrieval improvements cut latency by 29%. Across 10+ course modules, Streamlit Cloud helped scale content output 3x.",
    tech: ['GPT-4', 'LangChain', 'Python', 'RAG'],
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
    featured: true,
  },
  {
    id: 'rag',
    title: 'RAG Chatbot',
    tagline: "Using RAG to answer questions from uploaded documents",
    period: '2024',
    stack: 'LangChain · RAG · FastAPI',
    description:
      "This chatbot connects LangChain, RAG, Python, and FastAPI so users can ask questions about their own documents. Custom document ingestion and vector database integration supply the context, while real-time streaming delivers answers with cited retrieval. The result brings document search and conversation into one workflow.",
    tech: ['LangChain', 'RAG', 'Python', 'FastAPI'],
    github: 'https://github.com/BhavyaPatel25/rag_chatbot',
    featured: true,
  },
  {
    id: 'palm',
    title: 'Palm Box Cricket',
    tagline: "A Flutter and Dart booking flow for cricket facilities",
    period: '2022',
    stack: 'Flutter · Dart · Firebase',
    description:
      "I built the Palm Box Cricket Booking System with Flutter, Dart, and Firebase to support real-time slot reservations. A simpler booking UI helped increase user engagement by 40%, while changes to application-state workflows reduced booking interaction steps by 30%.",
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    id: 'stock',
    title: 'Distributed Stock Market System',
    tagline: "Keeping a Java trading platform running across nodes",
    period: '2023',
    stack: 'Java · Distributed Systems',
    description:
      "I built a Java distributed trading platform with replication, leader election, consensus protocols, and automatic failover. The project focused on maintaining resilient operation across nodes in a Distributed Systems environment.",
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
    title: 'AI/ML Engineer',
    company: 'State Street',
    location: 'Canada · Remote',
    period: 'Jun 2026 — Present',
    description: "I work on Generative AI and Agentic AI workflows that make financial-document review more efficient and auditable.",
    details: [
      "I use LangGraph and LangChain to build multi-stage RAG workflows over secure financial repositories. Better retrieval sequencing and context selection lowered compliance-document retrieval latency by 31%.",
      "Semantic caching and dynamic token routing help avoid repeated model work. Across AWS Bedrock and Azure ML inference workflows, redundant processing fell by 27% while the required compliance context was retained.",
      "I turned manual compliance-document review steps into auditable Agentic AI workflows, increasing document-processing throughput by 34%.",
      "My work on LLM prompt evaluation and inference reduced average token consumption per audited document by 22% across production evaluation runs.",
      "Working with a 6-person Toronto–Boston engineering team, I connected MLflow monitoring and GitHub Actions CI/CD to Docker-containerized AI services, with repeatable evaluation and deployment gates.",
    ],
  },
  {
    type: 'work',
    title: 'Teaching Assistant — Distributed Systems',
    company: 'Concordia University',
    location: 'Montreal, Canada',
    period: 'Sep 2025 — May 2026',
    description: "I helped graduate students turn Distributed Systems concepts into working Java RMI, CORBA, and SOAP-based Web Service implementations.",
    details: [
      "Across 10+ lab sessions and weekly tutorials, I guided 20+ students through Distributed Systems exercises and technical troubleshooting.",
      "I created 10+ tutorials, 5+ labs, technical presentations of 10+ pages, and programming exercises to support the coursework.",
      "Each term, I reviewed 50+ assignments and final projects, returning structured feedback within 5 days.",
      "Reusable Java RMI and CORBA service and debugging templates helped reduce repeated student runtime failures by 28%.",
      "Clearer service invocation and error-handling patterns in SOAP-based Web Service examples improved average lab execution time by 24%.",
      "Shell Scripting reduced repetitive grading effort by 32%. Structured debugging procedures and reusable documentation also reduced recurring troubleshooting cases by 26%.",
    ],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Blue Data Consulting & IT Services Pvt. Ltd.',
    location: 'Surat, India',
    period: 'Dec 2023 — Jun 2024',
    description: "I helped turn existing enterprise content into learning assets through Python, LLM workflows, and semantic search.",
    details: [
      "I developed an AI pipeline that converted 50+ PowerPoint decks into video courses using LLMs, RAG, and Streamlit, improving automation efficiency by 40%.",
      "Comparing Hugging Face and commercial LLM configurations across latency and output quality helped improve selected model-response accuracy by 18% through prompt evaluation.",
      "The workflow brought together Python, FastAPI, Streamlit, Pinecone, and ChromaDB. Changes to vectorization, indexing, and retrieval reduced average content retrieval latency by 29%.",
      "I refined GPT-3.5-Turbo prompts and workflows to generate structured video-learning content with 35% less manual transformation effort.",
      "In a 5-member team, I contributed to 10+ AI course modules covering LangChain, Flowise AI, and prompt engineering. Streamlit Cloud helped scale content output 3x.",
    ],
  },
  {
    type: 'research',
    title: 'Machine Learning Research Student',
    company: 'CHARUSAT University',
    location: 'Changa, India',
    period: 'Mar 2022 — Jun 2023',
    description: "My research examined how Vision Transformers recognize sports activities in UCF-101 video data.",
    details: [
      "I prepared 13,000+ UCF-101 video frames through automated preprocessing with NumPy and Pandas, making the dataset easier to use across experiments.",
      "With TensorFlow and TensorFlow Hub, Vision Transformer training reached 94% classification accuracy, improving on CNN-based workflows by 12 percentage points.",
      "I used hyperparameter tuning and image-augmentation experiments to improve training, reduce validation loss, and evaluate results with TensorFlow and scikit-learn.",
      "Alongside 2 peer researchers and a Principal Research Investigator, I organized datasets, ran experiments, and validated model performance. We documented the findings for publication in the Springer Book Series.",
    ],
  },
  {
    type: 'work',
    title: 'Flutter Development Trainee',
    company: 'Inspire Cyber Security',
    location: 'Surat, India',
    period: 'May — Oct 2022',
    description: "I translated Adobe XD designs into responsive Flutter interfaces and connected them to application data.",
    details: [
      "I prototyped 3+ mobile apps in Adobe XD and developed reusable Flutter interfaces from the wireframes, reducing iteration cycles by 50%.",
      "For the Palm Box Cricket Booking System, I used Flutter and Dart to support real-time slot reservations. The booking experience helped grow user engagement by 40%.",
      "Changes to asynchronous REST APIs and local database operations reduced average screen data-loading time by 21%.",
      "I simplified application-state workflows to reduce booking interaction steps by 30%; improvements to mobile data structures and asynchronous APIs increased core responsiveness by 19%.",
      "Working with the Lead Mobile Architect, I delivered consistent responsive behavior across 8+ screens. Systematic debugging of rendering, state-management, and API Integration issues reduced recurring development defects by 24%.",
    ],
  },
  {
    type: 'leadership',
    title: 'Professional Service Director — Rotaract Club',
    company: 'CHARUSAT University',
    location: 'Gujarat, India',
    period: 'Sep 2022 — Aug 2023',
    description: "I coordinated teams and events that brought students together beyond the classroom.",
    details: [
      "I helped lead 10+ social, technical, and cultural events that reached 500+ students.",
      "Improving how cross-functional teams coordinated their work increased coordination efficiency by 25%.",
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
      "Our research compared Vision Transformers (ViT) with CNNs for multi-sport activity recognition. I contributed to model design, TensorFlow and TensorFlow Hub training workflows, and experiments using 13,000+ UCF-101 frames. The model reached 94% classification accuracy, a 12 percentage-point gain over CNN baselines. We presented the work at ICDSA 2024 in India and published it in the Springer Book Series.",
    highlights: [
      'Novel ViT architecture for multi-sport recognition',
      'Validated on 13,000+ frames from UCF-101',
      '94% accuracy · +12 percentage points over CNNs',
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


