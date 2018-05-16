import React from 'react';
import './ProjectList.scss';

class ProjectList extends React.Component {
    render() {
        return (<div className="project-list center">
            {
                this.props.projects.map((project,idx) => {
                    return (<div key={`project-${idx}`} className="project container is-fluid">
                        <h5 key={`header-${idx}`}>{project.title}</h5>
                        <p key={`p-${idx}`} className={"fa "+project.icon}>{project.description}</p>
                        <a key={`link-${idx}`} href="{project.link}">{project.link_text}</a>
                    </div>)
                })
            }
        </div>)
    }
}

export {ProjectList};
