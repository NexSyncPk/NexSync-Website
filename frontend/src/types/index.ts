export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  feedback: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  pageId: number;
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
  pageId: number;
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

export interface IObjectProps {
  [key: string]: any;
}

export interface TeamMemberAttributes {
  id: number;
  name: string;
  email: string;
  position: string;
  picture: string;
  description?: string;
  isDeleted: boolean;
  pageId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroSectionAttributes {
  pageId: number;
  heroImage: string;
  noOfProjects: number;
  noOfClients: number;
  satisfactionPercentage: number; // must be between 0 and 100
  isDeleted: boolean;
}

export interface FindUs {
  pageId: number;
  address: string;
  startDay: string;
  endDay: string;
  startTime: Date;
  endTime: Date;
  isDeleted: boolean;
    createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: number;
  title: string;
  position: "full-time" | "part-time" | "intern" | "contract";
  description: string;
  jobType?: "remote" | "hybrid" | "onsite";
  domain: string;
  salary?: number;
  requirements?: string[]; // Since Sequelize.JSON will store array or object
  isArchived?: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
