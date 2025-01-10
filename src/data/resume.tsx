import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Sacha Choumiloff",
  initials: "SC",
  url: "https://dataelevation.dev",
  location: "Dijon, France",
  description_classic:
    "Ingénieur logiciel, entrepreneur, j'aime construire et déployer des solutions innovantes. Polyvalent, j'aime intervenir dans toutes les phases du développement de produit.",
  description_automate_consult:
    "Ingénieur logiciel et entrepreneur passionné, je conçois et déploie des solutions innovantes pour automatiser les processus métiers. Polyvalent, j’interviens à chaque étape du développement produit, aidant les PME à optimiser leurs opérations et à accroître leur chiffre d’affaires.",
  summary_classic:
    "Mi-2024, j'ai quitté mon job d'ingénieur data à la forge, pour développer mon premier SaaS [Analyzeurbiz](https://analyzeurbiz.com). J'ai réalisé un [master en base de données et intelligence artificielle à l'université de Bourgogne](/#education). Je suis également disponible pour des missions freelance à courte et moyenne durée.",
  summary_automate_consult:
  "En 2024, j’ai quitté mon poste d’ingénieur data chez La Forge pour me consacrer à l’automatisation des processus métiers. Notamment, avec RTI Exploration, nous avons réduit certaines tâches de plusieurs semaines à moins de 40 minutes. Titulaire du master [base de données et intelligence artificielle de l'université de Bourgogne](/#education), je propose désormais des services d’accompagnement pour optimiser vos processus et améliorer votre performance opérationnelle et financière.",
  avatarUrl: "https://cdn.analyzeurbiz.com/me.png",
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
      company: "Analyzeurbiz",
      href: "https://analyzeurbiz.com",
      badges: [],
      location: "Remote",
      title: "CEO",
      logoUrl: "/analyzeurbiz.png",
      start: "Septembre 2024",
      end: "Actuel",
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
      title: "Analyzeurbiz",
      href: "https://analyzeurbiz.com",
      dates: "Septembre 2024 - Actuel",
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
  ],

} as const;
