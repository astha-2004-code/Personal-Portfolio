
export interface LinkSet {
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  links: string[];
  skills: string[];
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
}

export interface Profile {
  name: string;
  email: string;
  education: string;
  skills: string[];
  projects: Project[];
  work: WorkExperience[];
  links: LinkSet;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
