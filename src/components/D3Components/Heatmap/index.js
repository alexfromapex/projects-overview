import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './D3Heatmap.scss';
import fetch from 'isomorphic-fetch';
const d3 = Object.assign({},require('d3'),require('d3-scale'),require('d3-selection-multi'));
import {event as d3Event} from 'd3';

class D3Heatmap extends React.Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.legendRef = React.createRef();
        this.tooltipRef = React.createRef();
    }

    componentWillReceiveProps(props) {
        if(props.title === undefined) {
            this.props.title = 'Chart';
        }
        if(props.description === undefined) {
            this.props.description = 'Description';
        }
        if(props.padding === undefined) {
            this.props.padding = 30;
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

      d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(data => {

        this.dataset = data;

        /* SVG Width / Height */
        this.svgWidth = (document.documentElement.clientWidth*0.8);
        this.svgHeight = (window.innerHeight*0.8);

        /* Padding */
        this.padding = this.props.padding || 30;

        /* Color Scale */
        this.colorScale = d3.scaleThreshold().domain(this.dataset.monthlyVariance.map(d => this.dataset.baseTemperature + d.variance)).range(["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9"].reverse());

        /* X Scale */
        this.xScale = d3.scaleBand()
        .domain(this.dataset.monthlyVariance.map(d => d.year))
        .range([this.padding, this.svgWidth-this.padding]);

        /* Y Scale */
        this.yScale = d3.scaleBand()
        .domain(Array.from(Array(12).keys()).map(x => x+1))
        .range([this.padding, this.svgHeight-this.padding]);

        /* Y Axis */

        d3.select(this.svgRef.current)
          .append('g')
          .attr('id','y-axis')
          .attr('transform','translate('+this.padding+',0)');

        /* X-Axis */

        d3.select(this.svgRef.current)
          .append('g')
          .attr('id','x-axis')
          .attr('transform','translate(0,'+(this.svgHeight-(this.padding))+')');


        this.drawMap();

        /* Window resize handler */
        let debounce = null;
        window.addEventListener('resize',() => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                this.drawMap();
                console.log('window resize');
            },200);
        });
      });

    }

    dateFromData(data) {
        return new Date(data.year,data.month,0);
    }

    drawMap() {

        /* SVG Width / Height */
        this.svgWidth = (document.documentElement.clientWidth*0.8);
        this.svgHeight = (window.innerHeight*0.8);

        /* X Scale */
        this.xScale = d3.scaleBand()
        .domain(this.dataset.monthlyVariance.map(d => d.year))
        .range([this.padding, this.svgWidth-this.padding]);

        // console.log('x range: '+this.xScale.range());

        /* Y Scale */
        this.yScale = d3.scaleBand()
        .domain(Array.from(Array(12).keys()).map(x => x+1))
        .range([this.padding, this.svgHeight-this.padding]);

        // console.log('y range: '+this.yScale.range());

        /* X-Axis ticks rescale */
        this.xAxis = d3
        .axisBottom(this.xScale)
        .tickFormat(year => d3.format('d')(year))
        .tickValues(this.xScale.domain().filter(d => d%10 === 0))
        .tickSizeOuter(0);

        /* Y-Axis ticks rescale */
        this.yAxis = d3
        .axisLeft(this.yScale)
        .ticks(12)
        .tickFormat((month) => d3.timeFormat('%B')(new Date(0,month-1)))
        .tickSizeOuter(0);

        let svg = d3
            .select(this.svgRef.current);

        let xAxisCall = svg
          .select('#x-axis')
          .attr('transform','translate(0,'+(this.svgHeight-(this.padding))+')')
          .call(this.xAxis);

        let yAxisCall = svg
          .select('#y-axis')
          .call(this.yAxis);

        /* Map data */
        let rects = svg
          .selectAll('rect');

          rects
          .data(this.dataset.monthlyVariance)
          .enter()
          .append('rect')
          .attrs({
            x: d => this.xScale(d.year),
            y: d => this.yScale(d.month),
            width: d => this.xScale.bandwidth(),
            height: d => this.yScale.bandwidth(),
            fill: d => this.colorScale(this.dataset.baseTemperature+d.variance),
            class: 'cell'
          })
          .attr('class', 'cell')
          .attr('data-month',function(d){
            return d.month-1;
          })
          .attr('data-year',function(d){
            return d.year;
          })
          .attr('data-temp',function(d){
            return (this.dataset.baseTemperature + d.variance);
          })
          .merge(rects)
          .attrs({
              x: d => this.xScale(d.year),
              y: d => this.yScale(d.month),
              width: d => this.xScale.bandwidth(),
              height: d => this.yScale.bandwidth(),
          })
          .exit()
          .remove()
          // .on('mouseover',tip.show)
          // .on('mouseout',tip.hide);
    }


    render() {

          const width = this.props.width || '80%';
          const height = this.props.height || '800px';


        return (
            <div className="d3-heatmap">
                <div id="tooltip" ref={this.tooltipRef}>
                </div>
                <section>
                    <h1 id="title" className="title" ref={this.titleRef}>{this.props.title}</h1>
                    <h3 id="description">{this.props.description}</h3>
                </section>
                <svg ref={this.svgRef} height={height}>

                </svg>
            </div>
        );
    }
}

export {D3Heatmap};
