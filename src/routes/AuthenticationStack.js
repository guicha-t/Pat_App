import {createStackNavigator} from 'react-navigation-stack'

import Authentication from "../screen/authentication/Authentication"

const screens = {
    Authentication: {
      screen: Authentication
    }
}

const AuthenticationStack = createStackNavigator(screens);

export default AuthenticationStack;
