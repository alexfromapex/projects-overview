const read_more = "Read More \u00BB";
import illuminate_screen from '../img/illuminate-screenshot.png';
export default [
    {
        short_name: 'ab_testing',
        title: `Hundreds of A/B Tests`,
        image: 'https://user-images.githubusercontent.com/1907805/46575302-2d228000-c981-11e8-9c75-95f8405c3f9b.png',
        description: `During my time at Brooks Bell, I've used JavaScript (ES5/6), AngularJS 1.5, HTML(4/5), CSS/SCSS, Babel, Gulp, Node, and Webpack to create A/B split tests for a large number of Fortune 500 clients.  The clients I've built A/B tests for include American Express, Comcast, Barnes & Noble, Consumer Reports, Clinique, and AOL.`,
        photo_credit: '(Photo belongs to Optimizely.com, https://www.optimizely.com/optimization-glossary/ab-testing/)',
        icon: 'fa-flask',
        link_text: read_more,
        tags: ['A/B Testing','Optimization']
    },
    {
        short_name: 'illuminate',
        title: `Illuminate`,
        image: illuminate_screen,
        description: 'I was one of two database architects that designed the MySQL database schema for Illuminate, Brooks Bell\'s first public product.  I have also helped support the Illuminate team with ad hoc front-end development requests, using React, Redux, Bulma for CSS, interfacing with back-end Redis APIs, and collaborating through various BitBucket repositories.',
        icon: 'fa-lightbulb',
        link_text: read_more,
        tags: ['React','Redux','MySQL','Bulma','Bitbucket']
    },
    {
        short_name: 'target_api',
        title: `Adobe Target API NodeJS Server`,
        image: 'https://user-images.githubusercontent.com/1907805/44010112-740738ae-9e7e-11e8-93cc-c3533ebf8a62.png',
        description: `As part of Brooks Bell's internal initiative to increase efficiency, I created a piece of Node software to interface with the Adobe Marketing Cloud API that allows easy communication, automation, and interaction with Adobe Target, one of the primary tools in the day-to-day business. I used Node and Express to create a web application that authenticates via JSON Web Tokens. The authentication mechanism is handled by the web application, allowing Brooks Bell to quickly and easily utilize the API via numerous pieces of software.`,
        icon:'fa-server',
        link_text: read_more,
        tags: ['Node','JWT','OAuth']
    },
    {
        short_name: 'click_wordpress',
        title: `Click Summit WordPress Template`,
        image: 'https://user-images.githubusercontent.com/1907805/44010053-1d49fa4c-9e7e-11e8-96c2-f45ba11956b8.png',
        description: `Serving as Brooks Bell's dedicated internal marketing developer, I was commissioned to develop a modern conference website for Click Summit in WordPress. The marketing team's requirements included building the front-end site, making it fully-responsive, integrating it with WordPress and PHP, and making all content, including the schedules and speakers, dyanmic and easily updateable for team members without coding experience.  Using Advanced Custom Fields, I was able to make the content easily editable for marketing team members without coding expertise.`,
        icon: 'fa-globe',
        link: `https://www.brooksbell.com/click`,
        link_text: read_more,
        tags: ['PHP','WordPress']
    }
];
