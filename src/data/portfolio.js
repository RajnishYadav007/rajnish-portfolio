// ==========================================
// PORTFOLIO DATA - RAJNISH YADAV
// React Developer Portfolio
// ==========================================

export const portfolioData = {
  // ==========================================
  // PERSONAL INFORMATION
  // ==========================================
  personal: {
    name: "Rajnish Yadav",
    role: "React Developer",
    location: "Faridabad, Haryana",
    email: "yadavrajnish181@gmail.com",
    github: "https://github.com/RajnishYadav007",
    linkedin: "https://www.linkedin.com/in/rajnish-1a274320b",
    
    // Hero Section
    tagline: "Building scalable, user-centric web applications with React.js",
    
    // About Section
    bio: "Frontend developer specializing in React.js with hands-on experience building production-ready applications. Proven track record in developing hotel management systems and e-commerce platforms. Skilled in creating responsive UIs, integrating REST APIs, and delivering clean, maintainable code.",
    
    // Additional Info (Optional - can be used later)
    yearsOfExperience: "2+",
    projectsCompleted: "2+",
    technologiesCount: "12+",
  },

  // ==========================================
  // SKILLS & TECHNOLOGIES
  // ==========================================
  skills: [
    "React.js",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "REST APIs",
    "Node.js",
    "MySQL",
    "Supabase",
    "Git",
    "GitHub",
    "Vercel",
  ],

  // ==========================================
  // WORK EXPERIENCE
  // ==========================================
  experience: [
    {
      id: 1,
      title: "React Developer Intern",
      company: "Genkaix",
      type: "Remote",
      duration: "2025 (3 Months)",
      location: "Remote",
      responsibilities: [
        "Developed Hotel Management POS system frontend with React.js, handling order management, billing UI, and admin dashboards",
        "Enhanced e-commerce platform by implementing new features and improving UI responsiveness",
        "Integrated REST APIs and managed database operations with Supabase",
        "Deployed applications on Vercel with optimized build configurations",
      ],
      technologies: ["React.js", "Tailwind CSS", "REST APIs", "Supabase", "Vercel"],
    },
    {
      id: 2,
      title: "Web Developer Intern",
      company: "Null Class Pvt Ltd",
      type: "Remote",
      duration: "Oct 2022 – Mar 2023",
      location: "Remote",
      responsibilities: [
        "Built reusable React UI components following best practices",
        "Integrated REST APIs for dynamic data rendering",
        "Collaborated with team using GitHub for version control",
        "Implemented responsive designs for cross-device compatibility",
      ],
      technologies: ["React.js", "REST APIs", "GitHub", "HTML5", "CSS3"],
    },
  ],

  // ==========================================
  // FEATURED PROJECTS
  // ==========================================
  projects: [
    {
      id: 1,
      title: "Tasty Station",
      subtitle: "Hotel Management POS System",
      category: "Full-Stack Application",
      
      description: "Company-level Hotel Management POS frontend built with React.js. Features include order management, billing interface, table handling, and comprehensive admin dashboards. Focused on reusable component architecture, API integration, and responsive design patterns.",
      
      longDescription: "A comprehensive Hotel Management Point of Sale system designed for restaurant operations. The application handles real-time order processing, dynamic billing calculations, table management with live status updates, and role-based admin dashboards for inventory and staff management.",
      
      techStack: ["React.js", "Tailwind CSS", "REST APIs", "Supabase", "Vercel"],
      
      liveUrl: "https://tasty-station-pos.vercel.app/",
      githubUrl: "https://github.com/RajnishYadav007",
      
      highlights: [
        "Real-time order management system",
        "Dynamic billing interface with tax calculations",
        "Role-based admin dashboards",
        "Mobile-responsive design for tablets and phones",
      ],
      
      features: [
        "Order Management: Real-time order creation, modification, and tracking",
        "Billing System: Automated invoice generation with tax and discount handling",
        "Table Handling: Live table status updates and reservation management",
        "Admin Dashboard: Comprehensive analytics and inventory tracking",
        "User Authentication: Role-based access control for staff and admins",
      ],
      
      challenges: [
        "Implemented real-time updates without page refresh",
        "Optimized performance for handling multiple concurrent orders",
        "Created intuitive UI for non-technical restaurant staff",
      ],
      
      learnings: [
        "Advanced state management in complex React applications",
        "API integration and error handling best practices",
        "Building production-ready, scalable frontend architecture",
      ],
      
      featured: true,
      status: "Live",
      year: "2025",
    },
    
    {
      id: 2,
      title: "SHREEJEE",
      subtitle: "E-Commerce Website",
      category: "E-Commerce Platform",
      
      description: "Modern e-commerce frontend UI built with React and Tailwind CSS. Implemented improved design system, added new features including product filtering, cart management, and checkout flow. Focus on responsive layouts and optimal user experience.",
      
      longDescription: "A full-featured e-commerce platform with modern UI/UX design. The application provides seamless product browsing, advanced filtering options, shopping cart functionality, and a streamlined checkout process. Built with performance and user experience as top priorities.",
      
      techStack: ["React.js", "Tailwind CSS", "REST APIs", "Vercel"],
      
      liveUrl: "https://shreejeegavya.vercel.app/",
      githubUrl: "https://github.com/RajnishYadav007",
      
      highlights: [
        "Product catalog with advanced filtering",
        "Shopping cart with quantity management",
        "Responsive design system across all devices",
        "Optimized performance with lazy loading",
      ],
      
      features: [
        "Product Catalog: Dynamic product listings with search and filters",
        "Shopping Cart: Add, remove, and update product quantities",
        "User Interface: Clean, modern design with smooth animations",
        "Mobile Optimization: Fully responsive across all screen sizes",
        "Performance: Fast page loads with code splitting and optimization",
      ],
      
      challenges: [
        "Implemented complex filtering logic with multiple parameters",
        "Optimized images and assets for faster load times",
        "Created seamless user experience across different devices",
      ],
      
      learnings: [
        "Advanced Tailwind CSS techniques for responsive design",
        "E-commerce UI/UX best practices",
        "Performance optimization strategies",
      ],
      
      featured: true,
      status: "Live",
      year: "2025",
    },
  ],

  // ==========================================
  // EDUCATION (Optional - Add if needed)
  // ==========================================
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology / Computer Science",
      institution: "Your University Name",
      duration: "2020 - 2024",
      location: "India",
      // Uncomment aur update karo agar chahiye
    },
  ],

  // ==========================================
  // CERTIFICATIONS (Optional - Add if needed)
  // ==========================================
  certifications: [
    // {
    //   id: 1,
    //   title: "React - The Complete Guide",
    //   issuer: "Udemy",
    //   date: "2023",
    //   credentialUrl: "#",
    // },
  ],

  // ==========================================
  // SOCIAL MEDIA LINKS
  // ==========================================
  social: {
    github: "https://github.com/RajnishYadav007",
    linkedin: "https://www.linkedin.com/in/rajnish-1a274320b",
    twitter: "", // Add if available
    portfolio: "", // Add personal website if available
    stackoverflow: "", // Add if available
    medium: "", // Add if available
  },

  // ==========================================
  // CONTACT INFORMATION
  // ==========================================
  contact: {
    email: "yadavrajnish181@gmail.com",
    phone: "", // Add if you want to display
    location: "Faridabad, Haryana, India",
    availability: "Open to opportunities",
    preferredContactMethod: "Email",
  },

  // ==========================================
  // SEO & META DATA
  // ==========================================
  seo: {
    title: "Rajnish Yadav | React Developer",
    description: "Frontend developer specializing in React.js with experience in building hotel management systems and e-commerce platforms. Skilled in REST APIs, Tailwind CSS, and modern web development.",
    keywords: "React Developer, Frontend Developer, JavaScript Developer, Rajnish Yadav, Web Developer Faridabad",
    author: "Rajnish Yadav",
    ogImage: "/og-image.jpg", // Add image in public folder
  },

  // ==========================================
  // TESTIMONIALS (Optional - Add if available)
  // ==========================================
  testimonials: [
    // {
    //   id: 1,
    //   name: "Client/Manager Name",
    //   role: "Position",
    //   company: "Company Name",
    //   message: "Rajnish is an excellent developer...",
    //   avatar: "/path-to-image.jpg",
    // },
  ],

  // ==========================================
  // ACHIEVEMENTS (Optional - Add if needed)
  // ==========================================
  achievements: [
    // {
    //   id: 1,
    //   title: "Successfully delivered 2+ production-ready projects",
    //   date: "2025",
    // },
    // {
    //   id: 2,
    //   title: "Contributed to open-source React projects",
    //   date: "2024",
    // },
  ],

  // ==========================================
  // SERVICES (Optional - For Freelancing)
  // ==========================================
  services: [
    // {
    //   id: 1,
    //   title: "Frontend Development",
    //   description: "Building responsive and performant web applications using React.js",
    //   icon: "💻",
    // },
    // {
    //   id: 2,
    //   title: "UI/UX Implementation",
    //   description: "Converting designs to pixel-perfect, interactive interfaces",
    //   icon: "🎨",
    // },
    // {
    //   id: 3,
    //   title: "API Integration",
    //   description: "Seamlessly connecting frontend with backend services",
    //   icon: "🔌",
    // },
  ],
};

// ==========================================
// HELPER FUNCTIONS (Optional)
// ==========================================

// Get featured projects only
export const getFeaturedProjects = () => {
  return portfolioData.projects.filter(project => project.featured);
};

// Get projects by category
export const getProjectsByCategory = (category) => {
  return portfolioData.projects.filter(project => project.category === category);
};

// Get latest experience
export const getLatestExperience = () => {
  return portfolioData.experience[0];
};

// Export default
export default portfolioData;
