export const translations = {
  ESP: {
    experience: 'Experiencia',
    studies: 'Estudios',
    technologies: 'Tecnologías',
    projects: 'Proyectos',
    certifies: 'Certificaciones',
    repositories: 'Ver repositorio',
    credentials: 'Ver credencial',
  },
  ENG: {
    experience: 'Experience',
    studies: 'Education',
    technologies: 'Technologies',
    projects: 'Projects',
    certifies: 'Certifications',
    repositories: 'See repository',
    credentials: 'See credential',
  },
} as const;

export type LanguageCode = keyof typeof translations;