import React from 'react';
import { Link } from 'react-router-dom';
import './List.scss';

class List extends React.PureComponent {
    render() {
        return (
                <div className={`${this.props.list_type}-list center`}>
                    <h1 className="header container is-fluid">s</h1>
                    {
                        this.props.list_elements.map((element,idx) => {
                            return (
                                <div key={`${this.props.list_type}-${idx}`} className=" container is-fluid">
                                    <h5 key={`header-${idx}`}><span className={`fa `+.icon}></span>&nbsp;{element.title}</h5>
                                    <p key={`p-${idx}`} className={`${this.props.list_type}-description`}>
                                        {element.description}
                                    </p>
                                    { element.link ? <a className="link" key={`link-${idx}`} href={element.link} aria-label={element.link_text}>{element.link_text}</a> : <div><Link className="link" to={'/'+element.short_name} aria-label={element.link_text}>{element.link_text}</Link></div> }
                                    <div className="tags">
                                        {
                                            element.tags ? (element.tags.map( (tag,tag_idx) => {
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

export {List};
