import React from 'react';
import PropTypes from 'prop-types';

import './StatePanel.css'

export default class StatePanel extends React.Component {

    static propTypes = {
        blocksCount: PropTypes.shape({
            All: PropTypes.number.isRequired,
            Selected: PropTypes.number.isRequired,
            Selected_Red: PropTypes.number.isRequired,
            Selected_Green: PropTypes.number.isRequired,
        })
    };

    render() {
        const {blocksCount} = this.props;

        return (
            <ul className='state-panel'>
                {Object.keys(blocksCount).map((blocksCountItem, index) =>
                    <li key={index}
                        className='state-panel__item'>
                        <div className='state-panel__item-content'>{blocksCountItem.split('_').join(' ')}</div>
                        <div className='state-panel__item-content'>{blocksCount[blocksCountItem]}</div>
                    </li>)}
            </ul>
        )
    }
}