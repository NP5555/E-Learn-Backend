const data = [
    {
      id: 1,
      name: "Introduction to Programming with Python",
      category: "Programming",
      provider: "Coursera",
      duration: "4 weeks",
      description: "Learn the basics of Python programming, including variables, control structures, and data structures.",
      image: "https://www.coursera.org/learn/python/home/welcome",
      rating: 4.8
    },
    {
      id: 2,
      name: "HTML & CSS for Beginners",
      category: "Web Development",
      provider: "Udemy",
      duration: "6 hours",
      description: "A beginner-friendly course to understand HTML and CSS, essential for creating and styling web pages.",
      image: "https://img.udemy.com/course/cover.jpg",
      rating: 4.7
    },
    {
      id: 3,
      name: "JavaScript Basics",
      category: "Programming",
      provider: "Codecademy",
      duration: "4 weeks",
      description: "An introductory course to JavaScript, covering basic syntax, variables, and functions.",
      image: "https://www.codecademy.com/assets/images/academy/course/javascript.png",
      rating: 4.6
    },
    {
      id: 4,
      name: "Introduction to SQL",
      category: "Database Management",
      provider: "DataCamp",
      duration: "4 weeks",
      description: "Learn the basics of SQL for querying and managing relational databases, including SELECT statements and joins.",
      image: "https://www.datacamp.com/assets/images/learn/sql.png",
      rating: 4.5
    },
    {
      id: 5,
      name: "Git & GitHub Crash Course",
      category: "Version Control",
      provider: "Udemy",
      duration: "3 hours",
      description: "A quick introduction to Git and GitHub, including basic commands and version control workflows.",
      image: "https://img.udemy.com/course/git-and-github.jpg",
      rating: 4.4
    },
    {
      id: 6,
      name: "Introduction to Cloud Computing",
      category: "Cloud Computing",
      provider: "edX",
      duration: "4 weeks",
      description: "Understand the basics of cloud computing, including key concepts and cloud service models.",
      image: "https://www.edx.org/course/introduction-to-cloud-computing",
      rating: 4.3
    },
    {
      id: 7,
      name: "Basic Cybersecurity",
      category: "Cybersecurity",
      provider: "Coursera",
      duration: "4 weeks",
      description: "An overview of fundamental cybersecurity concepts, including risk management and basic security practices.",
      image: "https://www.coursera.org/learn/cyber-security",
      rating: 4.2
    },
    {
      id: 8,
      name: "Introduction to Data Science",
      category: "Data Science",
      provider: "Coursera",
      duration: "4 weeks",
      description: "Learn the basics of data science, including data exploration, visualization, and simple statistical analysis.",
      image: "https://www.coursera.org/learn/data-science",
      rating: 4.6
    },
    {
      id: 9,
      name: "Responsive Web Design Basics",
      category: "Web Development",
      provider: "freeCodeCamp",
      duration: "6 hours",
      description: "Understand the principles of responsive web design and learn how to create web pages that adapt to different screen sizes.",
      image: "https://www.freecodecamp.org/news/content/images/size/w2000/2022/06/responsive-web-design.png",
      rating: 4.8
    },
    {
      id: 10,
      name: "Beginner’s Guide to Python Programming",
      category: "Programming",
      provider: "Udemy",
      duration: "2 hours",
      description: "A quick guide to Python programming for beginners, covering basic syntax and simple programming tasks.",
      image: "https://img.udemy.com/course/python-beginners.jpg",
      rating: 4.7
    },
    {
      id: 11,
      name: "Introduction to JavaScript",
      category: "Programming",
      provider: "Codecademy",
      duration: "6 hours",
      description: "A beginner’s course in JavaScript, including essential programming concepts and basic script writing.",
      image: "https://www.codecademy.com/assets/images/academy/course/javascript.png",
      rating: 4.5
    },
    {
      id: 12,
      name: "Basic HTML & CSS",
      category: "Web Development",
      provider: "Khan Academy",
      duration: "4 hours",
      description: "Learn how to create and style web pages using HTML and CSS in this beginner-friendly course.",
      image: "https://www.khanacademy.org/assets/images/learn-web-development.png",
      rating: 4.6
    },
    {
      id: 13,
      name: "Introduction to Version Control with Git",
      category: "Version Control",
      provider: "GitHub Learning Lab",
      duration: "1 week",
      description: "Get started with Git and GitHub, learning basic version control concepts and workflows.",
      image: "https://githublearninglab.com/images/git-github.png",
      rating: 4.7
    },
    {
      id: 14,
      name: "Basic Data Analysis with Excel",
      category: "Data Science",
      provider: "Udemy",
      duration: "3 hours",
      description: "Learn basic data analysis techniques using Excel, including formulas, charts, and pivot tables.",
      image: "https://img.udemy.com/course/excel-data-analysis.jpg",
      rating: 4.4
    },
    {
      id: 15,
      name: "Introduction to Web Development",
      category: "Web Development",
      provider: "Coursera",
      duration: "4 weeks",
      description: "An introductory course on web development, covering HTML, CSS, and JavaScript basics.",
      image: "https://www.coursera.org/learn/web-development",
      rating: 4.5
    },
    {
      id: 16,
      name: "Fundamentals of SQL",
      category: "Database Management",
      provider: "DataCamp",
      duration: "3 weeks",
      description: "Learn fundamental SQL queries and database management techniques, including data retrieval and manipulation.",
      image: "https://www.datacamp.com/assets/images/learn/sql.png",
      rating: 4.3
    },
    {
      id: 17,
      name: "Introduction to Mobile App Development",
      category: "Mobile Development",
      provider: "Udemy",
      duration: "6 weeks",
      description: "An introduction to mobile app development, covering basic principles and getting started with mobile development platforms.",
      image: "https://img.udemy.com/course/mobile-app-development.jpg",
      rating: 4.6
    },
    {
      id: 18,
      name: "Getting Started with Docker",
      category: "DevOps",
      provider: "Udemy",
      duration: "2 hours",
      description: "A beginner-friendly course on Docker, including basic containerization concepts and commands.",
      image: "https://img.udemy.com/course/docker-getting-started.jpg",
      rating: 4.5
    },
    {
      id: 19,
      name: "Intro to Data Visualization",
      category: "Data Science",
      provider: "Coursera",
      duration: "4 weeks",
      description: "Learn the basics of data visualization, including principles and tools for creating effective visual representations of data.",
      image: "https://www.coursera.org/learn/data-visualization",
      rating: 4.7
    },
    {
      id: 20,
      name: "Blockchain Basics for Beginners",
      category: "Blockchain",
      provider: "Coursera",
      duration: "4 weeks",
      description: "An introductory course on blockchain technology, covering basic concepts and applications in an easy-to-understand format.",
      image: "https://www.coursera.org/learn/blockchain",
      rating: 4.4
    }
  ]
  
    
  module.exports = data;