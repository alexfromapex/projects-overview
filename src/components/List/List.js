import React from 'react';
import { Link } from 'react-router-dom';
import './List.scss';
import _map from 'lodash/map';

class List extends React.PureComponent {
    render() {
        const {
            list_elements,
            list_type,
        } = this.props;

        return (
                <div className="list">
                    <div className={`${list_type}-list center`}>
                        <h1 className="header container is-fluid">{list_type}s</h1>
                        {
                            _map(list_elements,(element,idx) => {
                                return (
                                    <div key={`${list_type}-${idx}`} className={`${list_type} list-item container is-fluid`}>
                                        <h5 key={`header-${idx}`}><span className={`list-icon fa `+element.icon}></span>{element.title}</h5>
                                        <p key={`p-${idx}`} className={`${list_type}-description`}>
                                            {element.description}
                                        </p>
                                        { element.link ? <a className="link" key={`link-${idx}`} href={element.link} aria-label={element.link_text}>{element.link_text}</a> : <div><Link className="link" to={'/'+element.short_name} aria-label={element.link_text}>{element.link_text}</Link></div> }
                                        <div className="tags">
                                            {
                                                _map(element.tags, (tag,tag_idx) => {
                                                    return <span key={tag_idx} className="tag">{tag}</span>
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
            </div>
        )
    }
}

export default List;
export {List};
