import React from 'react';
import { Link } from 'react-router-dom';
import './D3Chloropleth.scss';
import fetch from 'isomorphic-fetch';
import * as topojson from 'topojson-client';
const d3 = Object.assign({},require('d3'),require('d3-geo'));

class D3Chloropleth extends React.Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.legendRef = React.createRef();
        this.education_data_url = '//raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
        this.county_data_url = '//raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';
    }

    componentDidMount() {

        this.path = d3.geoPath();

        this.fetchCountyData().then(county_data => {
            this.fetchEducationData().then(education_data => {
                this.drawMap(topojson.feature(county_data,county_data.objects.counties),education_data);
            })
        })
    }

    fetchCountyData() {
        if(this.county_data)
            return new Promise((res,rej) => res(this.county_data));

        return new Promise((res,rej) => {
            fetch(this.county_data_url).then(county_res => county_res.json()).then(county_data => {
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
            fetch(this.education_data_url).then(res => res.json()).then(education_data => {
                this.education_data = education_data;
                    if(education_data)
                        res(education_data);
            })
        });
    }

    drawMap(geojson,education) {
      const path = this.path;
      const color = d3.scaleThreshold()
          .domain(d3.range(2.6, 75.1, (75.1-2.6)/10))
          .range(d3.schemeBlues[9]);

      d3.select(this.svgRef.current)
        .append('g')
        .selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d",path)
        .attr('class','county')
        .attr('data-fips',d => d.id)
        .attr("data-education", function(d) {
            let result = education.filter(obj => obj.fips == d.id);
            if(result[0]){
              return result[0].bachelorsOrHigher
            }
            return 0
           })
        .attr("fill", function(d) {
            let result = education.filter(obj => obj.fips == d.id);
            if(result[0]){
              return color(result[0].bachelorsOrHigher)
            }

          return color(0)
        })
    .on("mouseover", function(d) {
            tooltip.style("opacity", .9);
            tooltip.html(function() {
              let result = education.filter(function( obj ) {
                return obj.fips == d.id;
              });
              if(result[0]){
      tooltip.attr('data-education',result[0].bachelorsOrHigher)
                return result[0]['area_name'] + ', ' + result[0]['state'] + ': ' + result[0].bachelorsOrHigher + '%';
              }
              //could not find a matching fips id in the data
              tooltip.attr('data-education',0)
              return 0
            })
            tooltip.style("left", (d3.event.pageX + 10) + "px")
            tooltip.style("top", (d3.event.pageY - 28) + "px")
            })
        .on('mouseout',() => tooltip.attr('style','opacity:0'))
        .attr("fill-opacity", 1)
        .attr("stroke", "#222")
    }


    render() {


    const width = '1000';
    const height = '700';

// /* Tooltip */
// let tooltip = d3.select('body').append("div")
//   .attr("class", "tooltip")
//   .attr("id", "tooltip")
//   .style("opacity", 0);

    let svg = d3
      .select('body')
      .append('svg')
      .attr('width',1000)
      .attr('height',700);

    /* Color scale */
    const color = d3.scaleThreshold()
        .domain(d3.range(2.6, 75.1, (75.1-2.6)/10))
        .range(d3.schemeBlues[9]);


    d3.select(this.legendRef.current)
      .append('svg')
      .attr('width','80%')
      .attr('height','50%')
      .append('g')
      .selectAll('rect')
      .data(color.range())
      .enter()
      .append('rect')
      .attr('x',(d,i) => {console.log(i); return i*20})
      .attr('y',0)
      .attr('width', 20)
      .attr('height', 10)
      .attr('fill',d => d)


        return (
            <div>
                <div id="tooltip" style={{display:'none'}}></div>
                <h1 id="title">United States Education Level by County</h1>
                <h2 id="description">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h2>
                <svg width={width} height={height} ref={this.svgRef}></svg>
                <div id="legend" ref={this.legendRef}>
                    <h1>Level of Education</h1>
                    <svg>
                        <g>
                            {
                                color.range().map((color_name,i) => {
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

export {D3Chloropleth};
