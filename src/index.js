/* React & ReactDOM */
import React from 'react';
import ReactDOM from 'react-dom';
/* React ProjectList component */
import {ProjectList} from './components/ProjectList/ProjectList';
/* Project data file */
import projects from './data/projects';
/* Bulma CSS framework */
import './css/bulma.min.css';

/* Render React */
ReactDOM.render(<ProjectList projects={projects} />,document.getElementById('projects-app'));
