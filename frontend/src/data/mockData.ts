import type { Testimonial, JobOpening, Service, CompanyValue, Benefit, TeamMemberAttributes, Job, JobApplication } from '../types/index';

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    designation: "Software Engineer",
    company: "TechNova Pvt Ltd",
    feedback: "Working with this team has been a truly transformative experience. Their professionalism and creativity are unmatched.",
    isDeleted: false,
    createdAt: new Date("2024-12-10T10:15:00Z"),
    updatedAt: new Date("2025-01-20T14:30:00Z"),
    pageId: 1,
  },
  {
    id: 2,
    name: "Ali Raza",
    designation: "Product Manager",
    company: "InnovateX Solutions",
    feedback: "Excellent service and great communication. They delivered the project before the deadline with top quality.",
    isDeleted: false,
    createdAt: new Date("2025-02-01T09:00:00Z"),
    updatedAt: new Date("2025-03-01T11:45:00Z"),
    pageId: 1,
  },
  {
    id: 3,
    name: "Fatima Sheikh",
    designation: "UX Designer",
    company: "DesignHive",
    feedback: "Their attention to detail and understanding of user experience is exceptional. I highly recommend them.",
    isDeleted: false,
    createdAt: new Date("2025-01-05T08:20:00Z"),
    updatedAt: new Date("2025-04-10T13:10:00Z"),
    pageId: 2,
  }
];

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    position: "full-time",
    description: "Develop responsive UIs using React and Tailwind CSS.",
    jobType: "remote",
    domain: "Web Development",
    salary: 85000,
    requirements: ["React", "Tailwind", "REST APIs"],
    isArchived: false,
    isDeleted: false,
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-01T10:00:00Z"),
  },
  {
    id: 2,
    title: "Backend Engineer",
    position: "full-time",
    description: "Maintain and build scalable RESTful APIs with Node.js.",
    jobType: "onsite",
    domain: "Backend",
    salary: 95000,
    requirements: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    isArchived: false,
    isDeleted: false,
    createdAt: new Date("2025-01-10T12:30:00Z"),
    updatedAt: new Date("2025-01-10T12:30:00Z"),
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    position: "intern",
    description: "Support the design team with mockups and wireframes.",
    jobType: "hybrid",
    domain: "Design",
    salary: 15000,
    requirements: ["Figma", "Adobe XD", "Basic HTML/CSS"],
    isArchived: false,
    isDeleted: false,
    createdAt: new Date("2025-02-05T09:00:00Z"),
    updatedAt: new Date("2025-02-05T09:00:00Z"),
  },
  {
    id: 4,
    title: "Data Analyst",
    position: "contract",
    description: "Analyze customer trends and provide business insights.",
    jobType: "remote",
    domain: "Data Analytics",
    salary: 60000,
    requirements: ["SQL", "PowerBI", "Excel"],
    isArchived: false,
    isDeleted: false,
    createdAt: new Date("2025-03-15T11:45:00Z"),
    updatedAt: new Date("2025-03-15T11:45:00Z"),
  },
  {
    id: 5,
    title: "Mobile App Developer",
    position: "part-time",
    description: "Build and maintain React Native applications.",
    jobType: "remote",
    domain: "Mobile Development",
    salary: 45000,
    requirements: ["React Native", "Firebase", "Redux"],
    isArchived: true,
    isDeleted: false,
    createdAt: new Date("2025-04-01T14:00:00Z"),
    updatedAt: new Date("2025-04-01T14:00:00Z"),
  }
];

export const jobOpenings : JobOpening[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    type: 'full-time',
    department: 'development',
    description: 'Join our development team to build cutting-edge web applications using modern technologies.',
    requirements: [
      '5+ years of experience with React and Node.js',
      'Experience with TypeScript and cloud platforms',
      'Strong problem-solving skills',
      'Excellent communication abilities'
    ],
    location: 'Remote / Hybrid',
    salary: '$80,000 - $120,000',
    isArchived: true
  },
];


export const archivedJobs: JobOpening[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    type: 'full-time',
    department: 'development',
    description: 'Join our development team to build cutting-edge web applications using modern technologies.',
    requirements: [
      '5+ years of experience with React and Node.js',
      'Experience with TypeScript and cloud platforms',
      'Strong problem-solving skills',
      'Excellent communication abilities'
    ],
    location: 'Remote / Hybrid',
    salary: '$80,000 - $120,000',
    isArchived: true
  },
  {
    id: '2',
    title: 'UI/UX Design Intern',
    type: 'internship',
    department: 'design',
    description: 'Learn and contribute to user interface design for innovative digital products.',
    requirements: [
      'Currently pursuing design or related degree',
      'Proficiency in Figma or similar design tools',
      'Portfolio showcasing design projects',
      'Passion for user-centered design'
    ],
    location: 'On-site',
    salary: '$2,000 - $3,000/month',
    isArchived: true

  },
  {
    id: '3',
    title: 'Digital Marketing Specialist',
    type: 'contract',
    department: 'marketing',
    description: 'Drive our digital marketing initiatives and help grow our brand presence.',
    requirements: [
      '3+ years in digital marketing',
      'Experience with SEO, SEM, and social media',
      'Analytics and data-driven mindset',
      'Creative content creation skills'
    ],
    location: 'Remote',
    salary: '$50 - $75/hour',
    isArchived: true
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    icon: 'Code',
    features: ['React & Next.js', 'TypeScript', 'Responsive Design', 'Performance Optimization']
  },
  {
    id: '2',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
    icon: 'Smartphone',
    features: ['React Native', 'iOS & Android', 'App Store Optimization', 'Push Notifications']
  },
  {
    id: '3',
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment solutions for modern applications.',
    icon: 'Cloud',
    features: ['AWS & Azure', 'DevOps', 'Auto Scaling', 'Security Best Practices']
  },
  {
    id: '4',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that combine aesthetics with functionality.',
    icon: 'Palette',
    features: ['User Research', 'Prototyping', 'Design Systems', 'Accessibility']
  },
  
];

export const companyValues: CompanyValue[] = [
  {
    id: '1',
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies and creative solutions.',
    icon: 'Lightbulb'
  },
  {
    id: '2',
    title: 'Quality',
    description: 'We deliver excellence in every project and interaction.',
    icon: 'Award'
  },
  {
    id: '3',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and open communication.',
    icon: 'Users'
  },
  {
    id: '4',
    title: 'Growth',
    description: 'We foster continuous learning and professional development.',
    icon: 'TrendingUp'
  },
  {
    id: '5',
    title: 'Integrity',
    description: 'We maintain the highest standards of honesty and transparency.',
    icon: 'Shield'
  }
];

export const benefits: Benefit[] = [
  {
    id: '1',
    title: 'Flexible Work',
    description: 'Remote-first culture with flexible hours and work-life balance.',
    icon: 'Home'
  },
  {
    id: '2',
    title: 'Learning & Development',
    description: 'Continuous learning opportunities and professional growth support.',
    icon: 'BookOpen'
  },
  {
    id: '3',
    title: 'Competitive Benefits',
    description: 'Comprehensive health insurance, retirement plans, and perks.',
    icon: 'Star'
  }
];


export const fallbackTeamMembers: TeamMemberAttributes[] = [
  {
    id: 1,
    name: "Team Member 1",
    email: "member1@example.com",
    position: "Developer",
    picture: "https://avatar.iran.liara.run/public/27", // Placeholder image
    description: "This is a fallback description for Team Member 1.",
    isDeleted: false,
    pageId: 1,
    createdAt: new Date("2025-01-01T00:00:00Z"),
    updatedAt: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: 2,
    name: "Team Member 2",
    email: "member2@example.com",
    position: "Designer",
    picture: "https://avatar.iran.liara.run/public/29",
    description: "This is a fallback description for Team Member 2.",
    isDeleted: false,
    pageId: 1,
    createdAt: new Date("2025-01-01T00:00:00Z"),
    updatedAt: new Date("2025-01-01T00:00:00Z"),
  },
  {
    id: 3,
    name: "Team Member 3",
    email: "member3@example.com",
    position: "Project Manager",
    picture: "https://avatar.iran.liara.run/public/",
    description: "This is a fallback description for Team Member 3.",
    isDeleted: false,
    pageId: 1,
    createdAt: new Date("2025-01-01T00:00:00Z"),
    updatedAt: new Date("2025-01-01T00:00:00Z"),
  }
];


export const mockJobApplications: JobApplication[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phoneNumber: "+1-234-567-8900",
    lastEducation: "undergraduate",
    expectedSalary: 75000,
    yearOfPassing: 2023,
    address: "123 Main St, New York, NY 10001",
    resume: "john_doe_resume.pdf",
    availability: "hybrid",
    jobPostingsId: 1,
    jobPosting: {
      id: 1,
      title: "Frontend Developer",
      position: "full-time",
      description: "Develop modern web applications using React and TypeScript",
      jobType: "hybrid",
      domain: "Web Development",
      salary: 80000,
    },
    isDeleted: false,
    createdAt: "2025-06-10T10:30:00Z",
    updatedAt: "2025-06-10T10:30:00Z",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phoneNumber: "+1-555-123-4567",
    lastEducation: "masters",
    expectedSalary: 95000,
    yearOfPassing: 2022,
    address: "456 Oak Ave, San Francisco, CA 94102",
    resume: "sarah_johnson_resume.pdf",
    availability: "remote",
    jobPostingsId: 2,
    jobPosting: {
      id: 2,
      title: "UX/UI Designer",
      position: "full-time",
      description: "Design intuitive user interfaces and experiences",
      jobType: "remote",
      domain: "Design",
      salary: 85000,
    },
    isDeleted: false,
    createdAt: "2025-06-09T14:20:00Z",
    updatedAt: "2025-06-09T14:20:00Z",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phoneNumber: "+1-777-888-9999",
    lastEducation: "undergraduate",
    expectedSalary: 60000,
    yearOfPassing: 2024,
    address: "789 Pine St, Seattle, WA 98101",
    resume: "michael_chen_resume.pdf",
    availability: "onsite",
    jobPostingsId: 3,
    jobPosting: {
      id: 3,
      title: "Backend Developer Intern",
      position: "intern",
      description: "Learn and contribute to backend systems using Node.js",
      jobType: "onsite",
      domain: "Backend Development",
      salary: 45000,
    },
    isDeleted: false,
    createdAt: "2025-06-08T09:15:00Z",
    updatedAt: "2025-06-08T09:15:00Z",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phoneNumber: "+1-333-444-5555",
    lastEducation: "diploma",
    expectedSalary: 55000,
    yearOfPassing: 2023,
    address: "321 Elm St, Austin, TX 73301",
    resume: "emily_rodriguez_resume.pdf",
    availability: "hybrid",
    jobPostingsId: 4,
    jobPosting: {
      id: 4,
      title: "Digital Marketing Specialist",
      position: "part-time",
      description: "Manage digital marketing campaigns and social media",
      jobType: "hybrid",
      domain: "Marketing",
      salary: 50000,
    },
    isDeleted: false,
    createdAt: "2025-06-07T16:45:00Z",
    updatedAt: "2025-06-07T16:45:00Z",
  },
];

 export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    designation: "Software Engineer",
    company: "TechNova Solutions",
    feedback: "Working with this team has been a game-changer for our productivity!",
    isDeleted: false,
    createdAt: new Date("2024-11-10T09:15:00Z"),
    updatedAt: new Date("2025-01-05T14:45:00Z"),
    pageId: 1,
  },
  {
    id: 2,
    name: "Ali Raza",
    designation: "Product Manager",
    company: "InnoWare Pvt Ltd",
    feedback: "Highly professional and responsive service. Exceeded expectations.",
    isDeleted: false,
    createdAt: new Date("2025-02-12T11:30:00Z"),
    updatedAt: new Date("2025-03-01T17:20:00Z"),
    pageId: 2,
  },
  {
    id: 3,
    name: "Zainab Tariq",
    designation: "UI/UX Designer",
    company: "PixelCraft",
    feedback: "Beautiful design and user experience. Would definitely recommend!",
    isDeleted: false,
    createdAt: new Date("2025-04-01T08:00:00Z"),
    updatedAt: new Date("2025-04-15T10:10:00Z"),
    pageId: 3,
  },
];
