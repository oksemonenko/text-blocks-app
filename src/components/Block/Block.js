import React from 'react';
import PropTypes from 'prop-types';

import './Block.css';

export default class Block extends React.Component {

    static propTypes = {
        block: PropTypes.shape({
            text: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            selected: PropTypes.bool.isRequired
        }),
        index: PropTypes.number.isRequired,
        removeBlock: PropTypes.func.isRequired,
        toggleSelectBlock: PropTypes.func.isRequired
    };

    removeBlock = (e, index) => {
        this.props.removeBlock(index);
    };

    toggleSelectBlock = (e,index) => {
        if (e.target.classList.contains('remove-btn')) {
            return;
        }
        this.props.toggleSelectBlock(index);
    };

    render() {
        const {block, index} = this.props;
        const className = block.selected ? 'block block--selected' : 'block';

        return (
            <li className={className}
                onClick={(e) => this.toggleSelectBlock(e, index)}>
                <p>{block.text}</p>
                <div>{index}</div>
                <div>{block.selected}</div>
                <button
                    className='remove-btn'
                    onClick={(e) => this.removeBlock(e, index)}>x</button>
            </li>
        )
    }
}