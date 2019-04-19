import { connect } from 'react-redux';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import RootNavigator from './RootNavigator';

const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.navigationReducer);

const AppNavigatorWithState = reduxifyNavigator(RootNavigator, 'root');

function mapStateToProps(state) {
    return {
        state: state.navigationReducer
    }
}

export default connect(mapStateToProps)(AppNavigatorWithState) 