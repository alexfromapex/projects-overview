const read_more = "Read More \u00BB";
import illuminate_screen from '../img/illuminate-screenshot.png';
export default [
    {
        short_name: 'hue_controller',
        title: `Philips Hue Python Controller App`,
        image: 'https://user-images.githubusercontent.com/1907805/37810114-d257962c-2e28-11e8-97fa-80094a8a6b74.png',
        description: `A desktop application I created with wxPython that automatically detects and offers the ability to control multiple Phillips Hue smart lights.  The UI functionality includes the ability to set the brightness and colors for all lights or individual lights.  I have used a modular folder structure to keep it organized and it's still an ongoing work-in-progress.`,
        icon: 'fa-plug',
        link: `https://github.com/alexfromapex/hue-controller`,
        link_text: `${read_more}`,
        tags: ['Python','wx']
    },
    {
        short_name: 'd3/chloropleth',
        title: `D3.js Chloropleth`,
        image: '',
        description: `Using D3.js, as one of the five projects for obtaining my data visualization certification from FreeCodeCamp, I created a chloropleth map of US education level by county.  The map is created by converting map data in TopoJSON format to GeoJSON (http://geojson.org/) data.  The data is fetched from an API endpoint and rendered onto a responsive SVG that updates scale programmatically.`,
        icon: 'fa-map',
        link_text: `${read_more}`,
        tags: ['D3.js','ReactJS']
    },
    {
        short_name: 'd3/heatmap',
        title: `D3.js Heatmap`,
        image: '',
        description: `Using D3.js, I created a heatmap using variance from the mean to show a warming trend over a period of approximately 200 years.`,
        icon: 'fa-chart-bar',
        link_text: `${read_more}`,
        tags: ['D3.js','ReactJS']
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
