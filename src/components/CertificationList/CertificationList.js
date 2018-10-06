import React from 'react';
import { Link } from 'react-router-dom';
import './CertificationList.scss';

class CertificationList extends React.Component {
    render() {
        return (
                <div className="certification-list center">
                    <h1 className="header container is-fluid">Certifications</h1>
                    {
                        this.props.certifications.map((certification,idx) => {
                            return (
                                <div key={`certification-${idx}`} className="certification container is-fluid">
                                    <h5 key={`header-${idx}`}><span className={`fa `+certification.icon}></span>&nbsp;{certification.title}</h5>
                                    <p key={`p-${idx}`} className="certification-description">
                                        {certification.description}
                                    </p>
                                    { certification.link ? <a className="link" key={`link-${idx}`} href={certification.link} aria-label={certification.link_text}>{certification.link_text}</a> : <div><Link className="link" to={'/'+certification.short_name} aria-label={certification.link_text}>{certification.link_text}</Link></div> }
                                    <div className="tags">
                                        {
                                            certification.tags ? (certification.tags.map( (tag,tag_idx) => {
                                                return <span key={tag_idx} className="tag">{tag}</span>
                                            })) : ''
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        )
    }
}

export {CertificationList};
