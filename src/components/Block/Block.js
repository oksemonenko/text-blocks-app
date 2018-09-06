import React from 'react';
import PropTypes from 'prop-types';

import './Block.css';
import {BlockTypeEnum} from "../../enums/BlockType.enum";
import {BlockColorEnum} from "../../enums/BlockColor.enum";
import {MessagesEnum} from "../../enums/Messages.enum";

export default class Block extends React.Component {

    constructor(props) {
        super(props);
        this.text = this.generateBlockText();

        this.type = this.generateBlockType();
        this.selected = false;

        if (this.type === BlockTypeEnum.COMPLICATED) {
            this.color = this.generateBlockColor();
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

    generateBlockText = () => {
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < 100; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    generateBlockType = () => {
        const blockTypes = [BlockTypeEnum.SIMPLE, BlockTypeEnum.COMPLICATED];
        return blockTypes[Math.floor(Math.random() * blockTypes.length)];
    };

    generateBlockColor = () => {
        const blockColors = [BlockColorEnum.GREEN, BlockColorEnum.RED];

        return blockColors[Math.floor(Math.random() * blockColors.length)]
    };

    removeBlock = (e, index) => {
        const blockType = this.props.block.type;
        if (blockType === BlockTypeEnum.COMPLICATED) {
            const remove = window.confirm(MessagesEnum.CONFIRM_REMOVE_BLOCK_MESSAGE);
            if (remove) {
                this.props.removeBlock(index);
                e.stopPropagation();
                return;
            }
            else {
                e.stopPropagation();
                return;
            }
        }
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
                <p className='block__text'>{block.text}</p>
                <button
                    className='remove-btn'
                    onClick={(e) => this.removeBlock(e, index)}>x</button>
            </li>
        )
    }
}
