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

        this.timer = 0;
        this.prevent = false;
        this.savedEvent = '';
        this.savedTarget = '';
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
        e.stopPropagation();
    };

    handleClick = (e, index) => {
        this.savedEvent = e;
        this.savedTarget = e.currentTarget;
        const delay = 200;
        let me = this;
        this.timer = setTimeout(() => {
            if (!this.prevent) {
                me.toggleSelectBlock(e, index);
            }
            this.prevent = false;
        }, delay);
    };

    handleDoubleClick = (e, index) => {
        clearTimeout(this.timer);
        this.prevent = true;
        this.props.changeColor(index);
    };

    toggleSelectBlock = (e, index) => {
        const target = this.savedTarget;
        if (target.classList.contains('remove-btn')) {
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
                onClick={(e) => this.handleClick(e, index)}
                onDoubleClick={(e) => this.handleDoubleClick(e, index)}>
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
