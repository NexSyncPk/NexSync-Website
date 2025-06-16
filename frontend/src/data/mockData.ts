import type { Testimonial, JobOpening, Service, CompanyValue, Benefit } from '../types/index';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Senior Developer',
    company: 'TechCorp',
    quote: 'Working with NexSync transformed our development process. Their innovative solutions and dedicated team made all the difference.',
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'CTO',
    company: 'StartupXYZ',
    quote: 'NexSync delivered beyond our expectations. Their expertise in modern technologies helped us scale rapidly.',
    avatar: '/avatars/michael.jpg'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'Product Manager',
    company: 'InnovateInc',
    quote: 'The collaboration with NexSync was seamless. They understood our vision and brought it to life perfectly.',
    avatar: '/avatars/emily.jpg'
  }
];

export const jobOpenings: JobOpening[] = [
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
    salary: '$80,000 - $120,000'
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
    salary: '$2,000 - $3,000/month'
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
    salary: '$50 - $75/hour'
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
  }
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
