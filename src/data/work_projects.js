import illuminate_screen from '../img/illuminate-screenshot.png';
import amex_card_shop from '../img/amex-card-shop.png';
import inivata_report_gen from '../img/inivata-patient-report.png';
import salesforce_picklist from '../img/salesforce-country-picklist.jpg';

const read_more = "Read More \u00BB";

export default [
    {
      short_name: 'inivata-salesforce-address',
      title: `State & Country Picklist Salesforce Conversion`,
      image: salesforce_picklist,
      description: `Working with Inivata's Salesforce Administrator and Salesforce Architect to build a Python script which connects to the Salesforce Lightning API and retroactively converts address field values to be compliant with ISO 3166.  The Python script uses the Levenshtein Algorithm to fuzzy match strings with a threshold of 85% or above and normalizes the values to be ISO-compliant.  There are several unit tests and the script generates a report to ensure accuracy and assist with verification.`,
      icon: 'fa-address-book',
      link_text: read_more,
      tags: ['Python','Salesforce','Unittest']
    },
    {
      short_name: 'inivata-patient-report',
      title: `Patient PDF Report Generator`,
      image: inivata_report_gen,
      description: `The first project I was tasked with at Inivata was fixing the patient PDF report generator microservice.  I fixed an SSL configuration issue with the Java Key Store.  After familiarizing myself with the codebase, I then modified the Java code and forked the Jasper template into two separate templates: one for the Commercial and one for the Research side of the business.  Finally, I did a case study to ensure the licensing was compliant for commercialization and wrote integration tests using the Spock framework to mock the API endpoints for testing.`,
      icon: 'fa-file-pdf',
      link_text: read_more,
      tags: ['Java','Spring Boot','Jasper','Gradle','Groovy','Spock','Tomcat']
    },
    {
      short_name: 'amex-card-shop',
      title: `American Express Card Shop`,
      image: amex_card_shop,
      description: `For 2 years I had daily conference calls and ongoing Slack conversations with American Express Marketing Team members in Manhattan, NYC.  I was fully-dedicated to strategizing, planning, and developing end-to-end A/B tests on the American Express Card Shop using AngularJS and React.  The Card Shop is the landing place for all web traffic seeking a new credit card.  The daily traffic was approximately 60,000 unique visitors per day.  One test I built tested 8 new layouts for the card details page.  Of the 8 layouts, the version in the screenshot was the winner and is still the layout on all American Express card details pages today.`,
      icon: 'fa-credit-card',
      link_text: read_more,
      tags: ['A/B Testing','Optimization']
    },
    {
        short_name: 'ab_testing',
        title: `Hundreds of A/B Tests`,
        image: 'https://user-images.githubusercontent.com/1907805/46575302-2d228000-c981-11e8-9c75-95f8405c3f9b.png',
        description: `During my time at Brooks Bell, I've used JavaScript (ES5/6), AngularJS 1.5, HTML(4/5), CSS/SCSS, Babel, Gulp, Node, and Webpack to create A/B split tests for a large number of Fortune 500 clients.  The clients I've built A/B tests for include American Express, Comcast, Time Warner, Barnes & Noble, Levi's, American Eagle, Consumer Reports, Clinique, and AOL.`,
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
        title: `Click Summit Website`,
        image: 'https://user-images.githubusercontent.com/1907805/44010053-1d49fa4c-9e7e-11e8-96c2-f45ba11956b8.png',
        description: `Serving as Brooks Bell's dedicated internal marketing developer, I was commissioned in 2014 to develop the company's first in-house conference website for the annual Click Summit. The marketing team's requirements included building the front-end portion of the site, making it fully-responsive, integrating it with the BrooksBell.com WordPress and PHP back-end, and making all content, including the schedules and speakers, dynamic and easily updateable for team members lacking coding knowledge via the WordPress UI.  The back-end architecture is still used today, while the front-end styling has been slightly tweaked since 2017 by a third-party development company called Walk West.`,
        icon: 'fa-globe',
        link: `https://web.archive.org/web/20150415042643/http://brooksbell.com/click-2015/`,
        link_text: read_more,
        tags: ['PHP','WordPress']
    }
];
