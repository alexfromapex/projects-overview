const read_more = "Read More \u00BB";
export default [
    {
        short_name: 'target_api',
        title: `Adobe Target API NodeJS Server`,
        image: 'https://user-images.githubusercontent.com/1907805/44010112-740738ae-9e7e-11e8-93cc-c3533ebf8a62.png',
        description: `As part of Brooks Bell's internal initiative to increase efficiency, I saw great value in creating a piece of software and API interface that would allow easy communication, automation, and interaction with Adobe Target, one of the primary tools in the day-to-day business. I used NodeJS and ExpressJS to create a web application that would authenticate via JSON Web Tokens. The authentication mechanism is handled by the web application, allowing Brooks Bell to quickly and easily utilize the API via numerous pieces of software.`,
        icon:'fa-server',
        link_text: `${read_more}`
    },
    {
        short_name: 'hue_controller',
        title: `Philips Hue Python Controller App`,
        image: 'https://user-images.githubusercontent.com/1907805/37810114-d257962c-2e28-11e8-97fa-80094a8a6b74.png',
        description: `A desktop application created with wxPython that detects and controls multiple Phillips Hue smart lights.`,
        icon: 'fa-lightbulb',
        link: `http://localhost`,
        link_text: `${read_more}`,
        tags: ['Python']
    },
    {
        short_name: 'opencv',
        title: `Computer Vision Experiments`,
        image: 'https://cloud.githubusercontent.com/assets/1907805/18296880/d59532a4-747a-11e6-9baa-ada2a5475e22.PNG',
        description: `I've previously held a fellowship in image processing/computer vision at NIEHS. I found a keen interest in image processing algorithms. In my spare time, I have been experimenting the with OpenCV library's Python bindings.`,
        icon: 'fa-eye',
        link: `https://github.com/alexfromapex/opencv_experiments`,
        link_text: `${read_more}`,
        tags: ['Python','OpenCV']
    },
    {
        short_name: 'socrata',
        title: `D3.js Socrata Experiments`,
        image: '',
        description: `Using D3.js with open data APIs provided by Socrata`,
        icon: 'fa-chart-bar',
        link_text: `${read_more}`,
        tags: ['D3.js','JS']
    },
    {
        short_name: 'click_wordpress',
        title: `Click Summit WordPress Template`,
        image: 'https://user-images.githubusercontent.com/1907805/44010053-1d49fa4c-9e7e-11e8-96c2-f45ba11956b8.png',
        description: `Serving as Brooks Bell's dedicated internal marketing developer, I was commissioned by the marketing team to coordinate with designers to develop a modern website, in order to better reflect the cutting-edge, revolutionary nature of Brooks Bell's annual Click Summit conference. The marketing team's requirements included building the front-end site, making it fully-responsive, integrating it with WordPress and PHP, and making all content, including the schedules and speakers, easily updateable for team members without coding experience, via the built-in WordPress widgets and user interfaces.`,
        icon: 'fa-globe',
        link: `https://www.brooksbell.com/click`,
        link_text: `${read_more}`,
        tags: ['PHP','WordPress']
    },
    {
        short_name: 'webstats',
        title: `WebStats Chart Library`,
        image: 'https://cloud.githubusercontent.com/assets/1907805/15491247/8e0a716a-213c-11e6-9fc2-000ef08fd442.png',
        description: `As a hobby project, I have developed a JavaScript library that supports drawing different types of charts using the HTML canvas element. The library is capabale of generating responsive bar charts, pie charts, etc.`,
        icon: 'fa-chart-pie',
        link: `https://github.com/alexfromapex/WebStats`,
        link_text: `${read_more}`,
        tags: ['Vanilla JS']
    },
    {
        short_name: 'react_resume',
        title: `Resume in ReactJS`,
        image: '',
        description: `I recreated my resume in ReactJS for fun and added the ability to add keywords which trick Applicant Tracking Systems by hiding text in the generated PDF metadata.`,
        icon: 'fa-file',
        link: `https://alex-fromapex.github.io/resume/`,
        link_text: `${read_more}`,
        tags: ['ReactJS','Webpack','ES6']
    }
];
