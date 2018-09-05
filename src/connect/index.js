import React from 'react';

import createStore from "../store/createStore";
import reducer from '../reducers';

const store = createStore(reducer, []);

const connect = (mapStateToProps, mapDispatchToProps) =>
    Component => {
        return class Connect extends React.Component {
            render() {
                return (
                    <Component
                        {...mapStateToProps(store.getState(), this.props)}
                        {...mapDispatchToProps(store.dispatch, this.props)}
                    />
                )
            }

            componentDidMount() {
                store.subscribe(this.handleChange);
            }

            handleChange = () => {
                this.forceUpdate();
            }
        }
};

export default connect;
