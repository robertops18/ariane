import { createNavigationReducer } from 'react-navigation-redux-helpers';
import RootNavigator from '../navigators/RootNavigator';


const navigationReducer = createNavigationReducer(RootNavigator, {});

export default navigationReducer;
