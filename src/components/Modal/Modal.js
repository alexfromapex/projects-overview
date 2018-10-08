import React from 'react';
import { Link } from 'react-router-dom';
import { ModalContainer } from 'react-router-modal';
import './Modal.scss';

class Modal extends React.Component {
    render() {
        let item = this.props.data_items.filter((itm) => itm.short_name === this.props.match.params.modal_data_id);
        item = item[0] || {title: '', description: ''};
        return (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-content">
                <div className="box">
                    <Link className="modal-close" to="/" aria-label="close" />
                        <h1 className="is-size-4">{item.title}</h1>
                        <figure>
                            <img src={item.image} alt={item.title + ' screenshot'} />
                        </figure>
                        <figcaption>
                            {item.description}
                            {item.photo_credit ? ' '+item.photo_credit : null}
                        </figcaption>
                    </div>
                </div>
            </div>
        );
    }
}

export { Modal };
