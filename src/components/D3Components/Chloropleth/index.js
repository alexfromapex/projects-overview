import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './D3Chloropleth.scss';
import fetch from 'isomorphic-fetch';
import * as topojson from 'topojson-client';
const d3 = Object.assign({},require('d3'),require('d3-geo'));
import {event as d3Event} from 'd3';

class D3Chloropleth extends React.Component {

    constructor(props) {
        super(props);

        /* Initialize values */
        // this.width = document.documentElement.clientWidth*0.5;
        // this.height = this.width/0.8;
        this.baseWidth = document.documentElement.clientWidth;
        this.width = document.documentElement.clientWidth;
        this.geojson = {features: []};
        // const scaleX = d3.scaleLinear().domain([0,document.documentElement.clientWidth]).range([0,this.width/2]);
        // const scaleY = d3.scaleLinear().domain([0,document.documentElement.clientHeight]).range([0,this.width]);
        // this.projection = d3.geoTransform({
        //     point: function(x, y) {
        //         this.stream.point(scaleX(x), scaleY(y));
        //     }
        // });
        this.projection = d3.geoMercator();
        this.path = d3.geoPath().fitWidth(this.baseWidth);

        this.state = {
            tooltip: {
                show: false,
                x: 0,
                y: 0,
                text: ''
            },
            map: {
                loading: true
            }
        };

        /* Color scale */
        this.colorScale = d3.scaleThreshold()
            .domain(d3.range(2.6, 75.1, (75.1-2.6)/10))
            .range(d3.schemeBlues[9]);

        /* Initialize API URLs */
        this.education_data_url = '//raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
        this.county_data_url = '//raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

        /* Bind this */
        this.render = this.render.bind(this);
        this.fillColor = this.fillColor.bind(this);
        this.resize = this.resize.bind(this);
        this.tooltipShow = this.tooltipShow.bind(this);
        this.tooltipHide = this.tooltipHide.bind(this);
    }

    componentDidMount() {

        this.fetchCountyData().then(county_data => {
            this.fetchEducationData().then(education_data => {
                this.geojson = topojson.feature(county_data,county_data.objects.counties);
                // this.drawMap(education_data);
                this.setState({
                    ...this.state,
                    map: {
                        loading: false
                    }
                });
                this.forceUpdate();
            })
        });

        let debounce = null;
        window.addEventListener('resize',() => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                this.resize()
            },100);
        });
    }

    fetchCountyData() {
        if(this.county_data)
            return new Promise((res,rej) => res(this.county_data));

        return new Promise((res,rej) => {
            fetch(this.county_data_url)
                .then(county_res => county_res.json())
                .then(county_data => {
                      this.county_data = county_data;
                          if(county_data)
                            res(county_data);
                });
        })
    }

    fetchEducationData() {
        if(this.education_data)
            return new Promise((res,rej) => res(this.education_data));

        return new Promise((res,rej) => {
            fetch(this.education_data_url)
                .then(res => res.json())
                .then(education_data => {
                    this.education_data = education_data;
                        if(education_data)
                            res(education_data);
                })
        });
    }

    // drawMap(education) {
    //   // const path = this.path;
    //   // const color = d3.scaleThreshold()
    //   //     .domain(d3.range(2.6, 75.1, (75.1-2.6)/10))
    //   //     .range(d3.schemeBlues[9]);
    //   //
    //   // const geojson = this.geojson;
    //   //
    //   // const tooltip = d3.select(this.tooltipRef.current);
    //
    //   // d3.select(this.svgRef.current)
    //   //   .append('g')
    //   //   .selectAll("path")
    //   //   .data(geojson.features)
    //   //   .enter()
    //   //   .append("path")
    //   //   .attr("d",path)
    //   //   .attr('class','county')
    //   //   .attr('data-fips',d => d.id)
    //   //   .attr("data-education", function(d) {
    //   //       let result = education.filter(obj => obj.fips == d.id);
    //   //       if(result[0]){
    //   //         return result[0].bachelorsOrHigher
    //   //       }
    //   //       return 0
    //   //      })
    //   //   .attr("fill", function(d) {
    //   //       let result = education.filter(obj => obj.fips == d.id);
    //   //       if(result[0]){
    //   //         return color(result[0].bachelorsOrHigher)
    //   //       }
    //   //
    //   //     return color(0)
    //   //   })
    // // .on("mouseover", function(d) {
    // //         tooltip.style("opacity", 0.9);
    // //         tooltip.html(function() {
    // //           let result = education.filter(function( obj ) {
    // //             return obj.fips == d.id;
    // //           });
    // //           if(result[0]){
    // //               tooltip.attr('data-education',result[0].bachelorsOrHigher)
    // //               return result[0]['area_name'] + ', ' + result[0]['state'] + ': ' + result[0].bachelorsOrHigher + '%';
    // //           }
    // //           //could not find a matching fips id in the data
    // //           tooltip.attr('data-education',0)
    // //           return 0
    // //         })
    // //             tooltip.style("left", (d3Event.pageX + 10) + "px")
    // //             tooltip.style("top", (d3Event.pageY - 28) + "px")
    // // })
    // // .on('mouseout',() => tooltip.attr('style','opacity:0'))
    // // .attr("fill-opacity", 1)
    // // .attr("stroke", "#222")
    // }

    tooltipShow(event) {
        this.setState({
            ...this.state,
            tooltip:{
                show:true,
                x:event.pageX,
                y:event.pageY,
                id:event.target.dataset.id
            }
        });
    }
    tooltipHide(event) {
        this.setState({
            ...this.state,
            tooltip:{
                show:false,
                x:0,
                y:0
            }
        });
    }

    resize() {
        // this.path = d3.geoPath().translate([document.documentElement.clientWidth / 2,document.documentElement.clientHeight/2]);
        // const scaleX = d3.scaleLinear().domain([0,document.documentElement.clientWidth]).range([0,this.width]);
        // const scaleY = d3.scaleLinear().domain([0,document.documentElement.clientHeight]).range([0,this.height]);
        // this.projection = d3.geoTransform({
        //     point: function(x, y) {
        //         this.stream.point(scaleX(x), scaleY(y));
        //     }
        // });
        this.width = document.documentElement.clientWidth;
        this.projection = d3.geoMercator().fitWidth(this.width);
        // const scaleX = d3.scaleLinear().domain([0,document.documentElement.clientWidth]).range([0,this.width/2]);
        // const scaleY = d3.scaleLinear().domain([0,document.documentElement.clientHeight]).range([0,this.width/2]);
        // this.projection = d3.geoTransform({
        //     point: function(x, y) {
        //         this.stream.point(scaleX(x), scaleY(y));
        //     }
        // });
        // this.path = d3.geoPath().projection(this.projection);
        this.forceUpdate();
    }

    fillColor(d) {
        let result = this.education_data.filter(obj => obj.fips == d.id);

        if(result[0]){
            return this.colorScale(result[0].bachelorsOrHigher)
        }

        return this.colorScale(0)
    }

    render() {
        return this.state.map.loading ? (<React.Fragment>Loading...</React.Fragment>) : (
            <div className="d3-chloropleth open-sans-font">
                <h1 id="title">United States Education Level by County</h1>
                <h2 id="description">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h2>
                <svg width={this.width*0.8} height={(this.width*0.8)*0.6} onMouseEnter={this.tooltipShow} onMouseLeave={this.tooltipHide}>
                    <g>
                        {
                            this.geojson.features ? this.geojson.features.map((pathEl, i) => {
                                let result = this.education_data.filter(function( obj ) {
                                    return obj.fips == pathEl.id;
                                });
                                const county_name = result[0]['area_name'];
                                return (
                                    // <React.Fragment key={i+'-'+pathEl.id}>
                                        <path className="county" data-county={county_name} data-id={pathEl.id} key={pathEl.id} d={this.path(pathEl)} fill={this.fillColor(pathEl)} stroke="#222" />
                                        // {this.state.tooltip.show && <Tooltip x={this.state.tooltip.x} y={this.state.tooltip.y} county={county_name} show={pathEl.id === this.state.tooltip.id}></Tooltip>}
                                    // </React.Fragment>
                                )
                            }) : null
                        }
                    </g>
                </svg>
                <div id="legend" ref={this.legendRef}>
                    <h1>Level of Education</h1>
                    <svg>
                        <g>
                            {
                                this.colorScale.range().map((color_name,i) => {
                                    return <rect key={i} x={i*20} y={0} width="20" height="10" fill={color_name}></rect>
                                })
                            }
                        </g>
                    </svg>
                </div>
            </div>
        );
    }
}

class Tooltip extends React.PureComponent {
    constructor(props) {
        super(props);
        this.container = document.createElement('div');
        this.container.classList.add('tooltip');
    }
    componentDidMount() {
        document.body.appendChild(this.container);
    }
    componentWillUnmount() {
        document.body.removeChild(this.container);
    }
    render() {
            return this.props.show && ReactDOM.createPortal(
                (<div style={{left:this.props.x,top:this.props.y,backgroundColor:'black',color:'white'}}>{this.props.county}</div>)
            , this.container)
    }
}

export {D3Chloropleth};
