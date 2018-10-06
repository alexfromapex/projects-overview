/** Style Resources **/
/* App-level CSS modules */
import './css/index.css';
/* Bulma CSS framework */
import './css/bulma.min.css';
/* FontAwesome 5 */
import './css/fontawesome-all.min.css';

/** React & ReactDOM **/
import React from 'react';
import ReactDOM from 'react-dom';
/* React Router */
import { Switch, HashRouter, Route, Link } from 'react-router-dom';

/** Components **/
/* CertificationList component */
import {CertificationList} from './components/CertificationList/CertificationList';
/* ProjectList component */
import {ProjectList} from './components/ProjectList/ProjectList';
/* ProjectModal component */
import {ProjectModal} from './components/ProjectModal/ProjectModal';
/* D3 Components */
import {D3Chloropleth} from './components/D3Components/Chloropleth';
import {D3Heatmap} from './components/D3Components/Heatmap';

/** Data files **/
/* Project data file */
import projects from './data/projects';
/* Certification data file */
import certifications from './data/certifications';

/* Render React */
ReactDOM.render(
    (
    <div>
    <HashRouter>
        <Switch>
            <Route exact path='/'>
                <React.Fragment>
                    <ProjectList projects={projects} />
                    <CertificationList certifications={certifications} />
                </React.Fragment>
            </Route>
            <Route exact path='/d3/chloropleth'>
                <D3Chloropleth />
            </Route>
            <Route exact path='/d3/heatmap'>
                <D3Heatmap title="Monthly Global Land-Surface Temperature" description="1753 - 2015: base temperature 8.66℃" />
            </Route>
            <Route path='/:project_id' render={(props) => <ProjectModal {...props} projects={projects} />} />
        </Switch>
    </HashRouter>
    </div>),document.getElementById('projects-app'));
