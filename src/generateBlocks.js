import Block from "./components/Block/Block";

export default function generateBlocks () {
    let blocks = [];
    for (let i = 0; i < 7; i++) {
        blocks.push(new Block());
    }
    return blocks;
}
