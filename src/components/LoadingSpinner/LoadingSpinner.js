import React from 'react';
import './LoadingSpinner.scss';

class LoadingSpinner extends React.PureComponent {
    render() {
        if (this.props && this.props.error) {
            return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
        }

        return (
            <div className="loading-wrapper">
                <div className="loading"></div>
            </div>
        )
    }

}

export {LoadingSpinner};
export default LoadingSpinner;
