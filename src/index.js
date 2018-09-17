/* React & ReactDOM */
import React from 'react';
import ReactDOM from 'react-dom';
/* React Router */
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
/* ProjectList component */
import {ProjectList} from './components/ProjectList/ProjectList';
/* ProjectModal component */
import {ProjectModal} from './components/ProjectModal/ProjectModal';
/* D3 HOC */
import {D3Chloropleth} from './components/D3Components/Chloropleth';
/* Project data file */
import projects from './data/projects';
/* Bulma CSS framework */
import './css/bulma.min.css';
/* FontAwesome 5 */
import './css/fontawesome-all.min.css';

/* Render React */
ReactDOM.render(
    (
    <div>
    <BrowserRouter>
        <Switch>
            <Route exact path='/'>
                <ProjectList projects={projects} />
            </Route>
            <Route path='/d3/'>
                <Route path='chloropleth'>
                    <D3Chloropleth />
                </Route>
            </Route>
            <Route path='/:project_id' render={(props) => <ProjectModal {...props} projects={projects} />} />
        </Switch>
    </BrowserRouter>
    </div>),document.getElementById('projects-app'));
