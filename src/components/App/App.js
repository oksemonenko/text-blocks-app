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
import Block from "../Block/Block";
import StatePanel from "../StatePanel/StatePanel";

class AppComponent extends Component {

    getSelectedColorBlocks = (blocks, color) => {
        return blocks.filter(block => {
            if (block.color) {
                return block.color === color;
            }
        });
    };

    render() {
        const {blocks} = this.props;

        let block = new Block();

        const selectedBlocks = blocks.filter(block => block.selected);

        const blocksCount = {
            all: blocks.length,
            selected: selectedBlocks.length,
            selectedRed: this.getSelectedColorBlocks(selectedBlocks, BlockColorEnum.RED).length,
            selectedGreen: this.getSelectedColorBlocks(selectedBlocks, BlockColorEnum.GREEN).length,
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
