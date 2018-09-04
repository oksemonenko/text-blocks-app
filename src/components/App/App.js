import React, {Component} from 'react';

import connect from '../../connect/index';
import './App.css';
import {
    addBlock,
    changeColor,
    removeBlock,
    toggleSelectBlock
} from "../../actions";
import {BlockColorEnum} from "../../enums/BlockColor.enum";
import {BlockTypeEnum} from "../../enums/BlockType.enum";
import Block from "../Block/Block";
import StatePanel from "../StatePanel/StatePanel";

class AppComponent extends Component {

    render() {
        const blocks = this.props.blocks;

        const block = {
            text: 'привет',
            type: BlockTypeEnum.SIMPLE,
            color: BlockColorEnum.GREEN,
            selected: false
        };

        const selectedBlocks = blocks.filter(block => block.selected);

        const blocksCount = {
            all: blocks.length,
            selected: selectedBlocks.length,
            selectedRed: 0,
            selectedGreen: 0,
        };

        return (
            <div className='app'>
                <StatePanel blocksCount={blocksCount}/>
                <button onClick={() => this.props.addBlock(block)}>Add block</button>
                <ul>
                    {blocks.map((block, index) =>
                        <Block
                            key={index}
                            block={block}
                            index={index}
                            removeBlock={this.props.removeBlock}
                            toggleSelectBlock={this.props.toggleSelectBlock}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

const App = connect(
    state =>({ blocks: state}),
    dispatch => ({
        addBlock: block => dispatch(addBlock(block)),
        removeBlock: index => dispatch(removeBlock(index)),
        toggleSelectBlock: index => dispatch(toggleSelectBlock(index)),
        changeColor: index => dispatch(changeColor(index))
    })
)(AppComponent);

export default App;
