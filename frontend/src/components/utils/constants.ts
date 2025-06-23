
// import google from "../assets/google.png";
// import github from "../assets/github.png";
// import LoginBackground from "../assets/loginBackground.jpeg";
// import noData from "../assets/noData.png";
// import profileSkeleton from "../assets/profileSkeleton.png";
// import webLogo from "../assets/web-logo.png";
// import solCodersLogo from "../assets/Solcoders-Logo.png";
// import LoginBg from "../assets/LoginBg.png";
// import teamifyRed from "../assets/teamifyRed.png";
// import teamifyWhite from "../assets/teamifyWhite.png";
// import teamify from "../assets/teamifyOne.png";

// export const images = {
//   google,
//   github,
//   LoginBackground,
//   noData,
//   webLogo,
//   profileSkeleton,
//   solCodersLogo,
//   LoginBg,
//   teamifyRed,
//   teamifyWhite,
//   teamify,
// };

export const routes = {
  // Main website routes
  home: "/",
  about: "/about",
  careers: "/careers",
  contact: "/contact",
  login: "/login",
  jobApplication: "/job/:id",
  
  // Admin routes
  adminDashboard: "/admin/dashboard",
  
  // Job Management routes
  jobsApplicationOverview: "/JobsManagement/ApplicationOverview",
  jobsCurrentJobs: "/JobsManagement/CurrentJobs",
  jobsArchivedJobs: "/JobsManagement/ArchivedJobs",
    // Media Management routes
  mediaHomePage: "/MediaManagement/HomePage",
  mediaAboutPage: "/MediaManagement/AboutPage",
  mediaContactPage: "/MediaManagement/ContactPage",
  
  // Fallback route
  noRoute: "/*",
};

export const Sidebar_Data = {
  navMain: [
    {
      title: "Job Management",
      items: [
        {
          title: "Application Overview",
          url: "/JobsManagement/ApplicationOverview",
        },
        { title: "Current Jobs", url: "/JobsManagement/CurrentJobs" },
        { title: "Archived Jobs", url: "/JobsManagement/ArchivedJobs" },
      ],
    },
    {
      title: "Media Management",
      items: [
        { title: "Home Page", url: "/MediaManagement/HomePage" },
        { title: "About Page", url: "/MediaManagement/AboutPage" },        { title: "Contact Page", url: "/MediaManagement/ContactPage" },
      ],
    },
  ],
};
