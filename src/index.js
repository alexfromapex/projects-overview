import React from 'react';
import ReactDOM from 'react-dom';
import {ProjectList} from './components/ProjectList/ProjectList';
import projects from './data/projects';

ReactDOM.render(<ProjectList projects={projects} />,document.getElementById('projects-app'));
