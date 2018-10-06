const read_more = "Read More \u00BB";
import illuminate_screen from '../img/illuminate-screenshot.png';
export default [
    {
        short_name: 'illuminate',
        title: `Illuminate`,
        image: illuminate_screen,
        description: 'I was one of two database architects that designed the MySQL database schema for Illuminate, Brooks Bell\'s first public product.  I have also helped support the Illuminate team with ad hoc front-end development requests, using React, Redux, Bulma for CSS, interfacing with back-end Redis APIs, and collaborating through various BitBucket repositories.',
        icon: 'fa-lightbulb',
        link_text: `${read_more}`,
        tags: ['React','Redux','HOCs','MySQL','Bulma','APIs','Bitbucket']
    },
    {
        short_name: 'hue_controller',
        title: `Philips Hue Python Controller App`,
        image: 'https://user-images.githubusercontent.com/1907805/37810114-d257962c-2e28-11e8-97fa-80094a8a6b74.png',
        description: `A desktop application created with wxPython that detects and controls multiple Phillips Hue smart lights.`,
        icon: 'fa-plug',
        link: `https://github.com/alexfromapex/hue-controller`,
        link_text: `${read_more}`,
        tags: ['Python','wx']
    },
    {
        short_name: 'd3/chloropleth',
        title: `D3.js Chloropleth`,
        image: '',
        description: `Using D3.js, as one of the five projects for obtaining my data visualization certification from FreeCodeCamp, I created a chloropleth map.`,
        icon: 'fa-map',
        link_text: `${read_more}`,
        tags: ['D3.js','API','ReactJS','Lifecycle Methods','JSX','CSS Modules']
    },
    {
        short_name: 'd3/heatmap',
        title: `D3.js Heatmap`,
        image: '',
        description: `Using D3.js, I created a heatmap using variance from the mean to show a warming trend over a period of approximately 200 years.`,
        icon: 'fa-chart-bar',
        link_text: `${read_more}`,
        tags: ['D3.js','API','ReactJS','Lifecycle Methods','JSX','CSS Modules']
    },
    {
        short_name: 'target_api',
        title: `Adobe Target API NodeJS Server`,
        image: 'https://user-images.githubusercontent.com/1907805/44010112-740738ae-9e7e-11e8-93cc-c3533ebf8a62.png',
        description: `As part of Brooks Bell's internal initiative to increase efficiency, I created a piece of Node software to interface with the Adobe Marketing Cloud API that allows easy communication, automation, and interaction with Adobe Target, one of the primary tools in the day-to-day business. I used Node and Express to create a web application that authenticates via JSON Web Tokens. The authentication mechanism is handled by the web application, allowing Brooks Bell to quickly and easily utilize the API via numerous pieces of software.`,
        icon:'fa-server',
        link_text: `${read_more}`,
        tags: ['Node','APIs','JWT','OAuth']
    },
    {
        short_name: 'click_wordpress',
        title: `Click Summit WordPress Template`,
        image: 'https://user-images.githubusercontent.com/1907805/44010053-1d49fa4c-9e7e-11e8-96c2-f45ba11956b8.png',
        description: `Serving as Brooks Bell's dedicated internal marketing developer, I was commissioned to develop a modern conference website for Click Summit in WordPress. The marketing team's requirements included building the front-end site, making it fully-responsive, integrating it with WordPress and PHP, and making all content, including the schedules and speakers, dyanmic and easily updateable for team members without coding experience.  Using Advanced Custom Fields, I was able to make the content easily editable for marketing team members without coding expertise.`,
        icon: 'fa-globe',
        link: `https://www.brooksbell.com/click`,
        link_text: `${read_more}`,
        tags: ['PHP','WordPress']
    },
    {
        short_name: 'react_resume',
        title: `Resume in ReactJS`,
        image: '',
        description: `I recreated my resume in ReactJS for fun and added the ability to add keywords which trick Applicant Tracking Systems by hiding text in the generated PDF metadata.`,
        icon: 'fa-file',
        link: `https://alex-fromapex.github.io/resume/`,
        link_text: `${read_more}`,
        tags: ['ReactJS','Redux','Webpack','ES6','Git','GitHub']
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
    }
];
