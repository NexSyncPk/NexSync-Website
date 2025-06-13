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
  isArchived?: boolean;
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

// Job Application interfaces based on migration schema
export interface JobPosting {
  id: number;
  title: string;
  position: 'full-time' | 'part-time' | 'intern' | 'contract';
  description: string;
  jobType: 'remote' | 'hybrid' | 'onsite';
  domain: string;
  salary: number;
  requirements?: string[];
  isArchived?: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  lastEducation: 'intermediate' | 'diploma' | 'undergraduate' | 'masters';
  expectedSalary: number;
  yearOfPassing: number;
  address: string;
  resume: string;
  availability: 'remote' | 'hybrid' | 'onsite';
  jobPostingsId: number;
  jobPosting?: JobPosting;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicationSummary {
  totalApplications: number;
  activeApplications: number;
  averageExpectedSalary: number;
  educationBreakdown: {
    intermediate: number;
    diploma: number;
    undergraduate: number;
    masters: number;
  };
  availabilityBreakdown: {
    remote: number;
    hybrid: number;
    onsite: number;
  };
}
