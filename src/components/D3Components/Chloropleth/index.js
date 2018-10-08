import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './D3Chloropleth.scss';
import fetch from 'isomorphic-fetch';
import * as topojson from 'topojson-client';
const d3 = Object.assign({},require('d3'),require('d3-geo'));
import {event as d3Event} from 'd3';
import Loading from '../../LoadingSpinner/LoadingSpinner';
import _map from 'lodash/map';

class D3Chloropleth extends React.Component {

    constructor(props) {
        super(props);

        /* Initialize values */
        this.width = document.documentElement.clientWidth;
        this.height = window.innerHeight;
        this.geojson = {features: []};
        this.projection = d3.geoIdentity().fitSize([this.width,this.height],this.geojson);
        this.path = d3.geoPath().projection(this.projection);

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
                this.resize();
                this.setState({
                    ...this.state,
                    map: {
                        loading: false
                    }
                });
            })
        });

        this.debounceSettimeoutId = null;
        this.debounceResize = () => {
            clearTimeout(this.debounceSettimeoutId);
            this.debounceSettimeoutId = setTimeout(() => {
                this.resize();
            },250);
        };
        window.addEventListener('resize',this.debounceResize);
    }

    componentWillUnmount() {
        window.addEventListener('resize',this.debounceResize);
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
        this.width = document.documentElement.clientWidth;
        this.height = window.innerHeight*0.8;

        this.projection = d3.geoIdentity().fitSize([this.width,this.height],this.geojson);
        this.path = d3.geoPath().projection(this.projection);
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
        if(this.state.map.loading)
            return <Loading />;

        return (
            <div className="d3-chloropleth open-sans-font">
                <Link to="/" title="Back to projects list" className="fa fa-arrow-left back-arrow"></Link>
                <h1 id="title">United States Education Level by County</h1>
                <h2 id="description">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</h2>
                <svg width={this.width} height={this.height} onMouseEnter={this.tooltipShow} onMouseLeave={this.tooltipHide}>
                    <g>
                        {
                            _map(this.geojson.features,(pathEl, i) => {
                                let result = this.education_data.filter(function( obj ) {
                                    return obj.fips == pathEl.id;
                                });
                                const county_name = result[0]['area_name'];
                                return (
                                    // <React.Fragment key={i+'-'+pathEl.id}>
                                        <path key={pathEl.id} className="county" data-county={county_name} data-id={pathEl.id} d={this.path(pathEl)} fill={this.fillColor(pathEl)} stroke="#222" />
                                        // {this.state.tooltip.show && <Tooltip x={this.state.tooltip.x} y={this.state.tooltip.y} county={county_name} show={pathEl.id === this.state.tooltip.id}></Tooltip>}
                                    // </React.Fragment>
                                )
                            })
                        }
                    </g>
                </svg>
                <div id="legend" ref={this.legendRef}>
                    <h1>Level of Education</h1>
                    <div className="swatches">
                            {
                                _map(this.colorScale.range(),(color_name,i) => {
                                    return <div key={i} height="10" className="swatch" style={{backgroundColor:color_name}} />
                                })
                            }
                    </div>
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
