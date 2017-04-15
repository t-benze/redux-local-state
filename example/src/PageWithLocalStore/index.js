import React, { PureComponent } from 'react';
import {connectLocal} from 'redux-local-store';

import {incrementCounter} from '../actions';
import {incrementLocalCounter} from './localActions';


class PageWithLocalStore extends PureComponent {
    
    render() {
        return (
            <div>
                <h1>Page With Local Store</h1>
                <div>
                    <p>Props:</p>
                <p>
                    {this.props.toString()}
                </p>
                </div>
                <div>
                    <button>dispatch global action</button>
                    <button>dispatch local action</button>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    globalCounter: state.counter
});

export default connectLocal(mapStateToProps, {incrementCounter}, undefined, {
    mapStateToProps: (state) => {
        return {
            localCounter: state.counter
        }
    },
    mapDispatchToProps: {
        incrementLocalCounter
    }
})(PageWithLocalStore);