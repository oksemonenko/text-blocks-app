import React from 'react';

import createStore from "../store/createStore";
import reducer from '../reducers';

const store = createStore(reducer, []);

const connect = (mapStateToProps, mapDispatchToProps) =>
    Component => {
        return class Connect extends React.Component {

            componentDidMount() {
                store.subscribe(this.handleChange);
            }

            handleChange = () => {
                this.forceUpdate();
            };

            render() {
                return (
                    <Component
                        {...mapStateToProps(store.getState(), this.props)}
                        {...mapDispatchToProps(store.dispatch, this.props)}
                    />
                )
            }
        }
};

export default connect;
