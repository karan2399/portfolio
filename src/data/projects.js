export const projects = [
  {
    slug: "inquiry-desk",
    title: "Inquiry Desk",
    description: "An inquiry management web app for business owners.",
    image: "/images/inquiry-desk-dashboard.svg",
    screenshots: [
      {
        src: "/images/inquiry-desk-dashboard.svg",
        alt: "Illustrative Inquiry Desk dashboard preview",
        caption: "Dashboard overview",
      },
      {
        src: "/images/inquiry-desk-inbox.svg",
        alt: "Illustrative Inquiry Desk inbox preview",
        caption: "Inquiry management",
      },
    ],
    tags: ["React", "TypeScript", "Node.js", "Bootstrap"],
    highlights: [
      "Responsive dashboard and inquiry workflows",
      "Reusable React components and TypeScript types",
      "Inquiry status tracking and search",
      "REST API integration",
      "Form validation and accessible interactions",
    ],
    overview:
      "Inquiry Desk helps a small business keep customer requests organized in one place. This sample project detail content demonstrates how the project story, interface previews, and key implementation topics can be presented.",
    role: "Full-stack development",
    demoCredentials: {
      email: "admin",
      password: "admin",
      note: "This is an admin account who can manage inquries, categories and statuses.",
    },
    liveDemoUrl: "https://example.com",
    github: "https://github.com/karan2399/inqiuryDesk",
  },
];
