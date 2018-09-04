import React from 'react';
import PropTypes from 'prop-types';

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
            <div>
                <ul>
                    <li>{blocksCount.all}</li>
                    <li>{blocksCount.selected}</li>
                    <li>{blocksCount.selectedRed}</li>
                    <li>{blocksCount.selectedGreen}</li>
                </ul>
            </div>
        )
    }
}