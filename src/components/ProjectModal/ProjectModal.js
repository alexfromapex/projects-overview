import React from 'react';
import { Link } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';
import './ProjectModal.scss';

class ProjectModal extends React.Component {
    render() {
        let project = this.props.projects.filter((proj) => {
            return proj.short_name === this.props.match.params.project_id
        });
        project = project[0] || {title: '', description: ''};
        return (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-content">
                <div className="box">
                    <Link className="modal-close" to="/" aria-label="close" />
                        <h1 className="is-size-4">{project.title}</h1>
                        <figure>
                            <img src={project.image} alt={project.title + ' screenshot'} />
                        </figure>
                        <figcaption>{project.description}</figcaption>
                    </div>
                </div>
            </div>
        );
    }
}

export { ProjectModal };
