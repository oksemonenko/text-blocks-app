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
import Block from "../../components/Block/Block";
import StatePanel from "../../components/StatePanel/StatePanel";

class AppComponent extends Component {

    getBlocksCountObject = (blocks) => {
        const selectedBlocks = blocks.filter(block => block.selected);

        return {
            All: blocks.length,
            Selected: selectedBlocks.length,
            Selected_Red: this.getSelectedColorBlocks(selectedBlocks, BlockColorEnum.RED).length,
            Selected_Green: this.getSelectedColorBlocks(selectedBlocks, BlockColorEnum.GREEN).length,
        };
    };

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

        return (
            <div className='app'>
                <StatePanel blocksCount={this.getBlocksCountObject(blocks)}/>
                <button className='add-btn' onClick={() => this.props.addBlock(block)}>Add block</button>
                <ul className='blocks-container'>
                    {blocks.map((block, index) =>
                        <Block
                            key={index}
                            block={block}
                            index={index}
                            removeBlock={this.props.removeBlock}
                            toggleSelectBlock={this.props.toggleSelectBlock}
                            changeColor={this.props.changeColor}
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
