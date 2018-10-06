import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './D3Heatmap.scss';
import fetch from 'isomorphic-fetch';
const d3 = Object.assign({},require('d3'),require('d3-scale'),require('d3-selection-multi'));
import {event as d3Event} from 'd3';
import Loading from '../../LoadingSpinner/LoadingSpinner';

class D3Heatmap extends React.Component {

    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.legendRef = React.createRef();
        this.tooltipRef = React.createRef();

        this.rects = [];
        this.tooltip = {};

        this.state = {
            loading: true
        };

        this.calculateRects = this.calculateRects.bind(this);
        this.tooltipShowData = this.tooltipShowData.bind(this);
        this.tooltipHide = this.tooltipHide.bind(this);
        this.render = this.render.bind(this);
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

      this.dataAbortController = new AbortController();
      fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',{signal: this.dataAbortController.signal})
      .then(json => json.json())
      .then(data => {

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


        this.setState({...this.state,loading: false});
        this.calculateRects();


        /* Window resize handler */
        let debounce = null;
        window.addEventListener('resize',() => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                this.calculateRects();
                console.log('window resize');
            },50);
        });
      });

    }

    componentWillUnmount() {
        if(this.dataAbortController) {
            this.dataAbortController.abort();
        }
    }

    dateFromData(data) {
        return new Date(data.year,data.month,0);
    }

    calculateRects() {

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

        /* Draw X-Axis */
        svg
            .select('#x-axis')
            .attr('transform','translate(0,'+(this.svgHeight-(this.padding))+')')
            .call(this.xAxis);

        /* Draw Y-Axis */
        svg
            .select('#y-axis')
            .call(this.yAxis);

        /* Map data */
        this.rects = this.dataset.monthlyVariance.map((d) => {
            return {
                x: this.xScale(d.year),
                y: this.yScale(d.month),
                width: this.xScale.bandwidth(),
                height: this.yScale.bandwidth(),
                fill: this.colorScale(this.dataset.baseTemperature+d.variance),
                class: 'cell',
                dataMonth: d.month-1,
                dataYear: d.year,
                dataTemp: this.dataset.baseTemperature + d.variance
            }
        })
        this.tooltip = {...(this && this.tooltip)};

        this.forceUpdate();

    }

    tooltipShowData(event) {
        if(event.target) {
            this.tooltip = {
                x: event.pageX,
                y: event.pageY,
                show: true,
                temp: `Temperature: ${event.target.dataset.temp}`,
                month: `Month: ${parseInt(event.target.dataset.month)+1}`
            };
        } else {
            this.tooltip = {show:false};
        }
        this.forceUpdate();
    }

    tooltipHide() {
        this.tooltip = {show:false};
        this.forceUpdate();
    }


    render() {
        const height = document.documentElement.clientHeight*0.8;
        const tooltipX = this.tooltip ? this.tooltip.x : 0;
        const tooltipY = this.tooltip ? this.tooltip.y : 0;
        const tooltipShow = this.tooltip ? this.tooltip.show ? 0.7 : 0 : 0;

        if(this.state.loading) {
            return <Loading />
        }

        return (
            <div className="d3-heatmap">
                <div id="tooltip" ref={this.tooltipRef} style={{left:tooltipX,top:tooltipY,opacity:tooltipShow}}>
                    {this.tooltip.temp}<br/>{this.tooltip.month}
                </div>
                <section>
                    <h1 id="title" className="title" ref={this.titleRef}>{this.props.title}</h1>
                    <h3 id="description">{this.props.description}</h3>
                </section>
                <svg ref={this.svgRef} height={height}>
                    <g id="rects">
                        {
                            this.rects.map(
                                (d,i) => <rect key={i} x={d.x} y={d.y} fill={d.fill} width={d.width} height={d.height} data-month={d.dataMonth} data-year={d.dataYear} data-temp={d.dataTemp} onMouseOver={this.tooltipShowData} onMouseOut={this.tooltipHide} />
                            )
                        }
                    </g>
                </svg>
            </div>
        );
    }
}

export {D3Heatmap};
