import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Sacha Choumiloff",
  initials: "SC",
  url: "https://dataelevation.dev",
  location: "Dijon, France",
  description_classic:
    "Cofondateur et Directeur Technique chez Gencior, je conçois des solutions d'IA sobres et souveraines pour l'industrie française. Polyvalent, j'interviens du développement algorithmique au déploiement opérationnel chez nos clients industriels.",
  description_automate_consult:
    "Cofondateur et Directeur Technique chez Gencior, je développe des solutions d'intelligence artificielle dédiées aux PME et ETI industrielles. Spécialisé dans la maintenance prédictive, l'optimisation des flux et le contrôle qualité, je conçois des algorithmes sur-mesure, déployés localement, qui transforment les données industrielles en leviers de compétitivité.",
  summary_classic:
    "Cofondateur et Directeur Technique de [Gencior](https://gencior.ai), je dirige le développement de solutions d'IA industrielle sobres et souveraines. Diplômé du [master en base de données et intelligence artificielle de l'université de Bourgogne](/#education), je conçois des algorithmes ciblés pour la maintenance prédictive et l'optimisation industrielle.",
  summary_automate_consult:
    "Cofondateur de Gencior, je développe des solutions d'intelligence artificielle pour les industriels français. Nos algorithmes sur-mesure, déployés localement, permettent aux PME et ETI de valoriser leurs données sans compromettre leur souveraineté. Titulaire du [master en base de données et intelligence artificielle de l'université de Bourgogne](/#education), j'interviens de la conception à la formation des équipes terrain.",
  avatarUrl: "https://asset.gencior.ai/landing/sacha_choumiloff.png",
  skills: [
    "Python",
    "FastAPI",
    "Airflow",
    "Typescript",
    "React",
    "Next.js",
    "TurboRepo",
    "Java",
    "Spring Boot",
    "Docker",
    "Kubernetes",
    "GCP",
    "VPS",
    "Triton"
  ],
  keywords: [
    "Sacha Choumiloff",
    "Développeur freelance",
    "Développeur fullstack",
    "Développeur freelance fullstack",
    "Python freelance",
    "Développeur backend freelance",
    "Développeur Next.js",
    "Développeur React",
    "Développeur Typescript",
    "Data engineer freelance",
    "Data scientist freelance",
    "Développeur SaaS freelance",
    "Développement API",
    "Développeur Web Dijon",
    "Freelance Bourgogne",
    "Freelance France",
    "Analyzeurbiz",
    "Développeur IA freelance",
    "Docker freelance",
    "Kubernetes freelance",
    "PostgreSQL freelance",
    "GCP freelance",
    "TailwindCSS freelance",
    "Airflow freelance",
    "FastAPI freelance",
    "Entrepreneur tech",
    "Développement SaaS",
    "Développeur remote",
    "Architecture scalable",
    "Machine learning freelance",
    "Mission freelance",
    "Développeur logiciel freelance",
    "Freelance en Bourgogne",
    "Clean code freelance",
    "Création SaaS",
    "MLops",
    "Ingénieur IA",
    "AI engineer",
    ""
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "schoumiloff@icloud.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/SChoumiloff",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sachachoumiloff/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Gencior",
      badges: [],
      href: "https://gencior.ai",
      location: "Bourgogne-Franche-Comté, France",
      title: "Cofondateur & Directeur Technique",
      logoUrl: "https://asset.gencior.ai/branding/Logo.png",
      start: "Novembre 2025",
      end: "Actuel",
      description: "En tant que Directeur Technique, je dirige le développement de solutions d'intelligence artificielle sobres et souveraines pour l'industrie. Je conçois des algorithmes sur-mesure pour la maintenance prédictive, l'optimisation des flux et le contrôle qualité, déployés localement chez nos clients industriels. J'interviens de la R&D à la formation des équipes terrain."
    },
    {
      company: "HolbertonSchool",
      badges: [],
      href: "https://www.holbertonschool.fr/",
      location: "France",
      title: "Ingénieur logiciel et formateur",
      logoUrl: "https://cdn.prod.website-files.com/64107f65f30b69371e3d6bfa/65c6179aa44b63fa4f31e7ad_Holberton-Logo-Cherry.svg",
      start: "Mars 2025",
      end: "Actuel",
      description: "En tant que Software Engineer, je conçois des applications internes et encadre la formation des étudiants sur le campus de Dijon. Je suis également référent national IA / Deep Learning, rôle dans lequel j’accompagne les étudiants au quotidien sur leurs projets."
    },
    {
      company: "Analyzeurbiz",
      href: "https://analyzeurbiz.com",
      badges: [],
      location: "Remote",
      title: "CEO",
      logoUrl: "/analyzeurbiz.png",
      start: "Septembre 2024",
      end: "Mars 2025",
      description:
        "Analyzeurbiz est un SaaS qui permet aux gestionnaires d'établissement d'avoir une plateforme qui aggrège l'ensemble des avis clients en fournissant des alertes et des recommandations pour améliorer leurs services.",
    },
    {
      company: "La Forge",
      badges: [],
      href: "https://la-forge.ai",
      location: "Remote",
      title: "Data Engineer",
      logoUrl: "/lf.png",
      start: "Septembre 2022",
      end: "Aout 2024",
      description:
        "Au sein de La forge, j'ai participé au développement de plusieurs produits data et intelligence artificielle dans les domaines de la santé, de l'environnement et de la finance. ",
    },
    {
      company: "Enedis",
      href: "https://enedis.fr/",
      badges: [],
      location: "Dijon, France",
      title: "Ingénieur IA",
      logoUrl: "/enedis.png",
      start: "Septembre 2020",
      end: "Septembre 2022",
      description:
        "J'ai développé avec les agents d'Enedis la solution Tracer, une IA qui permet de géoréférencer, classifier et segmenter les ouvrages enterrés (cables, tuyeaux, conduites de gaz, etc.).",
    },
  ],
  education: [
    {
      school: "Université de Bourgogne",
      href: "https://www.u-bourgogne.fr/",
      degree: "Master en base de données et intelligence artificielle",
      logoUrl: "/ub.png",
      start: "2020",
      end: "2022",
    },
    {
      school: "Université de Bourgogne",
      href: "https://www.u-bourgogne.fr/",
      degree: "Licence mathématiques et informatique",
      logoUrl: "/ub.png",
      start: "2018",
      end: "2020",
    }
  ],
  projects: [
    {
      title: "Smart Talk - Storiz",
      href: "https://www.groupe-bizness.com/lcms/",
      dates: "Juillet 2025 - Actuel",
      active: true,
      description: "Smart Talks est une solution d’entraînement conversationnel de l'application Storiz, permettant aux équipes commerciales de simuler des échanges client réalistes et d’obtenir un feedback orienté compétences. Je conçois et déploie l’ensemble de la brique IA : design des prompts, modélisation des scénarios métier, orchestration des dialogues et infrastructure (LLM, analyse, évaluation).",
      technologies: [
        "TritonServer",
        "Typescript",
        "NestJS",
        "Prompt engineering",
        "Python"
      ],
      links: [
        {
          type: "Website",
          href: "https://www.groupe-bizness.com/lcms/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: '/smart-talk-storiz.png',
      video: ''
    },
    {
      title: "Analyzeurbiz",
      href: "https://analyzeurbiz.com",
      dates: "Septembre 2024 - Mars 2025",
      active: true,
      description:
        "Analyzeurbiz est un SaaS qui permet aux gestionnaires d'établissement d'avoir une plateforme qui aggrège l'ensemble des avis clients en fournissant des alertes et des recommandations pour amélirorer leurs services.",
      technologies: [
        "Next.js",
        "Typescript",
        "TurboRepo",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "python",
        "Shadcn UI",
        "Magic UI",
        "RapidApi"
      ],
      links: [
        {
          type: "Website",
          href: "https://analyzeurbiz.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "/analyzeurbiz.mp4",
    },
    {
      title: "Mieux",
      href: "https://mieux.health",
      dates: "Septembre 2022 - Aout 2024",
      active: true,
      description:
        "Mieux est une plateforme de santé qui permet à des bénéficiaires de réaliser un bilan de santé augmenté. ",
      technologies: [
        "Java",
        "Spring Boot",
        "Typescript",
        "NestJs",
        "PostgreSQL",
        "Docker",
      ],
      links: [
        {
          type: "Website",
          href: "https://mieux.health",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "mieux.mp4",
    },
    {
      title: "RTI Exploration",
      href: "https://www.rtiexploration.com/",
      dates: "Septembre 2022 - Aout 2024",
      active: true,
      description:
        "Développement d'une solution algorithmique complexe ayant pour but de détecter les sources d'eaux souterraines à partir d'image satellites de la NASA.",
      technologies: [
        "Python",
        "Airflow",
        "Pytorch",
        "Faiss",
        "Streamlit"
      ],
      links: [
        {
          type: "Website",
          href: "https://www.rtiexploration.com/",
          icon: <Icons.globe className="size-3" />,
        }
      ],
      image: "/rti.png",
      video: "",
    },
    {
      title: "Vertigo Lab",
      href: "https://vertigolab.eu",
      dates: "Septembre 2022 - Mars 2024",
      active: true,
      description:
        "Développement d'un pipeline de données allant de la collecte en passant par le traitement et la visualisation de données publiques.",
      technologies: [
        "Next.js",
        "Typescript",
        "Python",
        "FastAPI",
        "Postgresql"
      ],
      links: [
        {
          type: "Website",
          href: "https://vertigolab.eu",
          icon: <Icons.globe className="size-3" />,
        }
      ],
      image: "/vertigo.png",
      video: "",
    },
    {
      title: "BAT (Binance automatic trading)",
      dates: "Septembre 2020 - Aout 2022",
      description: "Développement d'un bot de trading automatique en utilisant l'API de Binance avec plus de 300 indicateurs techniques disponibles et configurables. BAT permet de générer des stratégies de trading AI en se basant sur des données historiques. BAT permet de créer ses propres stratégies au travers d'une simple configuration json, enfin il permet d'évaluer la performance des stratégies grace à une solution de backtesting.",
      technologies: [
        "Java",
        "SpringBoot",
        "Binance API"
      ],
      active: false,
      video: "",
      image: "/bat.jpg",
      links: [],
      href: "",
    }
  ],

} as const;
