export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  type: 'internship' | 'full-time' | 'contract';
  department: 'development' | 'design' | 'marketing';
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  external?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}
