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

        this.calculateRects = this.calculateRects.bind(this);
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


        this.calculateRects();


        /* Window resize handler */
        let debounce = null;
        window.addEventListener('resize',() => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                this.calculateRects();
                console.log('window resize');
            },200);
        });
      });

    }

    dateFromData(data) {
        return new Date(data.year,data.month,0);
    }

    calculateRects() {

        let self = this;

        /* SVG Width / Height */
        self.svgWidth = (document.documentElement.clientWidth*0.8);
        self.svgHeight = (window.innerHeight*0.8);

        /* X Scale */
        self.xScale = d3.scaleBand()
            .domain(self.dataset.monthlyVariance.map(d => d.year))
            .range([self.padding, self.svgWidth-self.padding]);

        // console.log('x range: '+this.xScale.range());

        /* Y Scale */
        self.yScale = d3.scaleBand()
            .domain(Array.from(Array(12).keys()).map(x => x+1))
            .range([self.padding, self.svgHeight-self.padding]);

        // console.log('y range: '+this.yScale.range());

        /* X-Axis ticks rescale */
        self.xAxis = d3
            .axisBottom(self.xScale)
            .tickFormat(year => d3.format('d')(year))
            .tickValues(self.xScale.domain().filter(d => d%10 === 0))
            .tickSizeOuter(0);

        /* Y-Axis ticks rescale */
        self.yAxis = d3
            .axisLeft(self.yScale)
            .ticks(12)
            .tickFormat((month) => d3.timeFormat('%B')(new Date(0,month-1)))
            .tickSizeOuter(0);

        let svg = d3
            .select(self.svgRef.current);

        /* Draw X-Axis */
        svg
            .select('#x-axis')
            .attr('transform','translate(0,'+(self.svgHeight-(self.padding))+')')
            .call(self.xAxis);

        /* Draw Y-Axis */
        svg
            .select('#y-axis')
            .call(self.yAxis);

        /* Map data */
        self.setState({
            rects: self.dataset.monthlyVariance.map((d) => {
              return {
                x: self.xScale(d.year),
                y: self.yScale(d.month),
                width: self.xScale.bandwidth(),
                height: self.yScale.bandwidth(),
                fill: self.colorScale(self.dataset.baseTemperature+d.variance),
                class: 'cell',
                dataMonth: d.month-1,
                dataYear: d.year,
                dataTemp: self.dataset.baseTemperature + d.variance
              }
          }),
          tooltip: {...this.state.tooltip}
        });

    }

    tooltipShowData(event) {
        if(event.target.dataset.temp) {
            this.setState({rects:...this.state.rects,tooltip:{x:event.pageX,y:event.pageY,show:true}});
        } else {
            this.setState({rects:...this.state.rects,tooltip:{show:false}});
        }
    }


    render() {
        const height = document.documentElement.clientHeight*0.8;
        const rects = this.state ? this.state.rects : [];
        const tooltipX = this.state ? this.state.tooltip ? this.state.tooltip.x : 0 : 0;
        const tooltipY = this.state ? this.state.tooltip ? this.state.tooltip.y : 0 : 0;
        const tooltipShow = this.state ? this.state.tooltip ? this.state.tooltip.show ? 0.9 : 0 : 0 : 0;
        console.log(rects.length);

        return (
            <div className="d3-heatmap">
                <div id="tooltip" ref={this.tooltipRef} style={{left:tooltipX,top:tooltipY,opacity:tooltipShow}}>
                </div>
                <section>
                    <h1 id="title" className="title" ref={this.titleRef}>{this.props.title}</h1>
                    <h3 id="description">{this.props.description}</h3>
                </section>
                <svg ref={this.svgRef} height={height}>
                    <g id="rects" onMouseOver={this.tooltipShowData}>
                        {rects.map((d,i) => <rect key={i} x={d.x} y={d.y} fill={d.fill} width={d.width} height={d.height} data-month={d.dataMonth} data-year={d.dataYear} data-temp={d.dataTemp} />)}
                    </g>
                </svg>
            </div>
        );
    }
}

export {D3Heatmap};
