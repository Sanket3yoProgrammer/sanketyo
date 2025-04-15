const projects = [
  {
    id: 1,
    name: "Phg-web",
    description: "A web app with cool features for friends.",
    link: "https://phg-web.vercel.app/index.html",
    image: "https://img.freepik.com/free-vector/group-friends-sitting-table-talking-drinking-coffee-tea-tiny-people-friends-meeting-cheer-up-friend-friendship-support-concept_335657-623.jpg"
  },
  {
    id: 2,
    name: "Yo-Chat",
    description: "A real-time chat application.",
    link: "https://yo-phg-chat.vercel.app/chat",
    image: "https://herobot.app/wp-content/uploads/2022/11/11-Reasons-Why-A-Chat-Application-Is-Great-For-Business_1.jpg"
  },
  {
    id: 3,
    name: "BMI Calculator",
    description: "A simple BMI calculator.",
    link: "https://sanket3yoprogrammer.github.io/BmiCalculator/",
    image: "https://www.metropolisindia.com/upgrade/blog/upload/24/08/Body_Mass_Index1723205045.webp"
  },
  {
    id: 4,
    name: "Aggressor",
    description: "An advanced web-based platform.",
    link: "https://aggressor-gaming.vercel.app/",
    image: "https://dianapps.com/blog/wp-content/uploads/2024/05/Cloud-Technology-Gaming.png"
  },
  {
    id: 5,
    name: "History Chapter 1 Timeline",
    description: "A timeline for History Chapter 1.",
    link: "https://sanket3yoprogrammer.github.io/History-class-10/",
    image: "https://www.euroschoolindia.com/wp-content/uploads/2023/07/importance-of-history-scaled-1.jpg"
  },
  {
    id: 6,
    name: "History Chapter 2 Timeline",
    description: "A timeline for History Chapter 2.",
    link: "https://sanket3yoprogrammer.github.io/Class10his2/",
    image: "https://lh4.googleusercontent.com/proxy/3vhpIbg-YZGyCft5u3ZFJhqj0yXFOg4EekZr5ENntNPN1vr11g6BnhnB7H-29sd8aXsImGODMJfnf0QpQEYu6SxjqBhaVKhturGR5_CC7THb8JYy81EuO-57iraygzxaquQxx01UlcvApFMW8Nqz"
  },
  {
    id: 7,
    name: "Upload-yoi",
    description: "A media upload platform.",
    link: "https://adminuploadyoi.vercel.app/",
    image: "https://media.istockphoto.com/id/1306687171/vector/system-software-updating-or-loading-process-concept-on-laptop.jpg?s=612x612&w=0&k=20&c=Q-i4WnafVk1yjvXYKc6Rwtjcg3E7p8cydRKaqpVvGIg="
  },
  {
    id: 8,
    name: "Gallery-yoi",
    description: "A media gallery platform.",
    link: "https://uploadyoi.vercel.app/",
    image: "https://lifestyleforreallife.com/wp-content/uploads/2024/02/boopiered_art_gallery_in_the_style_of_flat_design_54c79340-781c-44fd-80f4-a4542c21a329.jpeg"
  },
  {
    id: 9,
    name: "OAV-HK-JSG",
    description: "A web app with unique functionalities.",
    link: "https://oav-hk-jsg.vercel.app/",
    image: "https://img.freepik.com/free-photo/illustration-depicting-corporate-job_23-2151889080.jpg"
  },
  {
    id: 10,
    name: "Speech-to-Text Model",
    description: "An AI-powered speech-to-text converter.",
    link: "https://speech-to-text-model-ten.vercel.app/",
    image: "https://strapiprod.knowlarity.com/uploads/6_m_1_efec69ffb1.png"
  },
  {
    id: 11,
    name: "Face AI Detection",
    description: "A web app for AI-powered face detection.",
    link: "https://face-ai-detection.netlify.app/",
    image: "https://ai.thestempedia.com/wp-content/uploads/2022/02/Face-recog_security-system-1024x576.png"
  },
  {
    id: 12,
    name: "SanketCalc-AI",
    description: "An AI-powered calculator.",
    link: "https://sanketcalc-ai.vercel.app/",
    image: "https://wpvip.edutopia.org/wp-content/uploads/2023/06/hero_blog_math_Technology-Integration_illustration_ikon_00025457_Patrick-George.jpg?w=2880&quality=85"
  },
  {
    id: 13,
    name: "Happy New Year",
    description: "A special New Year greeting web app.",
    link: "https://happy-new-year-sand.vercel.app/",
    image: "https://thumbs.dreamstime.com/b/happy-new-year-message-fireworks-snowman-happy-children-adorable-doodle-drawing-wishing-friend-relative-happy-342729387.jpg" 
  },
  { 
   id: 14,
   name: "Thank You Page",
   description: "A simple thank you webpage.",
   link: "https://sanket3yoprogrammer.github.io/Thanku/",
   image: "https://static.vecteezy.com/system/resources/previews/051/113/679/non_2x/thank-you-text-with-gift-boxes-and-balloons-vector.jpg"
  },
  { id: 15,
   name: "OAV-IMG-DB",
   description: "A digital album of school memories.",
   link: "https://oav-vault.vercel.app/",
   image: "https://st2.depositphotos.com/3600153/6933/v/950/depositphotos_69332667-stock-illustration-school-album-yearbook-and-books.jpg"
  },
  { id: 16,
   name: "Equation Graffiti",
   description: "A Cool equation visualizer",
   link: "https://github.com/equation-graffiti.vercel.app",
   image: "https://media.istockphoto.com/id/1280489827/vector/tiny-students-learning-math-in-college.jpg?s=612x612&w=0&k=20&c=AwbKX5-9gE6YSbxAifAaIeSMwgVHFGMqsppwWtsj7xk="
  },
  { 
   id: 17,
   name: "Xentry Live",
   description: "A cool animated gaming website with gsap animations and transitions with react and nextjs.",
   link: "https://xentry-live.vercel.app/",
   image: "https://assets.awwwards.com/awards/submissions/2024/07/66a09331b2ddf457682537.jpg"
  },
  { 
   id: 18,
   name: "Family Golf",
   description: "A cool animated golf website with gsap animations and transitions",
   link: "https://sanket3yoprogrammer.github.io/Family-Golf/",
   image: "https://www.csslight.com/application/upload/WebsitePhoto/66982-Sidcup-Family-Golf.jpg"
  },
  { 
   id: 19,
   name: "My Repos",
   description: "Check out more projects on GitHub.",
   link: "https://github.com/Sanket3yoProgrammer?tab=repositories",
   image: "https://seahawkmedia.com/wp-content/uploads/2022/06/Github-1.png"
  },
  ];
