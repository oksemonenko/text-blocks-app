import React from 'react';
import PropTypes from 'prop-types';

import './StatePanel.css'

export default class StatePanel extends React.Component {

    static propTypes = {
        blocksCount: PropTypes.shape({
            all: PropTypes.number.isRequired,
            selected: PropTypes.number.isRequired,
            selectedRed: PropTypes.number.isRequired,
            selectedGreen: PropTypes.number.isRequired,
        })
    };

    render() {
        const {blocksCount} = this.props;

        return (
            <ul className='state-panel'>
                <li className='state-panel__item'>
                    <div>All</div>
                    <div>{blocksCount.all}</div>
                </li>
                <li className='state-panel__item'>
                    <div>Selected</div>
                    <div>{blocksCount.selected}</div>
                </li>
                <li className='state-panel__item'>
                    <div>Selected red</div>
                    <div>{blocksCount.selectedRed}</div>
                </li>
                <li className='state-panel__item'>
                    <div>Selected green</div>
                    <div>{blocksCount.selectedGreen}</div>
                </li>
            </ul>
        )
    }
}