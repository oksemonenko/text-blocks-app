import React from 'react';
import PropTypes from 'prop-types';

import './Block.css';
import {BlockTypeEnum} from "../../enums/BlockType.enum";
import {BlockColorEnum} from "../../enums/BlockColor.enum";

export default class Block extends React.Component {

    constructor(props) {
        super(props);
        this.text = 'hello';

        const blockTypes = [BlockTypeEnum.SIMPLE, BlockTypeEnum.COMPLICATED];
        const type = blockTypes[Math.floor(Math.random() * blockTypes.length)];

        this.type = type;
        this.selected = false;

        if (type === BlockTypeEnum.COMPLICATED) {
            const blockColors = [BlockColorEnum.GREEN, BlockColorEnum.RED];

            this.color = blockColors[Math.floor(Math.random() * blockColors.length)]
        }
    }

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
        let className = block.selected ? 'block block--selected' : 'block';

        className = block.color ? className +' block--' + block.color : className;

        return (
            <li className={className}
                onClick={(e) => this.toggleSelectBlock(e, index)}>
                <p>{block.text}</p>
                <p>{block.type}</p>
                <div>{index}</div>
                <div>{block.selected}</div>
                <button
                    className='remove-btn'
                    onClick={(e) => this.removeBlock(e, index)}>x</button>
            </li>
        )
    }
}
