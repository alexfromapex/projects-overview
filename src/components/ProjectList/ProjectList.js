import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.scss';

class ProjectList extends React.Component {
    render() {
        return (<div className="project-list center">
            {
                this.props.projects.map((project,idx) => {
                    return (
                        <div key={`project-${idx}`} className="project container is-fluid">
                            <h5 key={`header-${idx}`}><span className={`fa `+project.icon}></span>&nbsp;{project.title}</h5>
                            <p key={`p-${idx}`} className="project-description">
                                {project.description}
                            </p>
                            { project.link ? <a key={`link-${idx}`} href={project.link} aria-label={project.link_text}>{project.link_text}</a> : <div><Link to={'/'+project.short_name} aria-label={project.link_text}>{project.link_text}</Link></div> }
                            <div className="tags">
                                {
                                    project.tags ? (project.tags.map( (tag,tag_idx) => {
                                        return <span key={tag_idx} className="tag">{tag}</span>
                                    })) : ''
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>)
    }
}

export {ProjectList};
