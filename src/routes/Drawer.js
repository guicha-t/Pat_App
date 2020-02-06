import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'

import AuthenticationStack from './AuthenticationStack'
import MainMenuStack from './MainMenuStack'

const RootDrawerNavigator = createDrawerNavigator({
    Authentication: {
      screen: AuthenticationStack,
    },
    MainMenu: {
      screen: MainMenuStack,
    }
})

export default createAppContainer(RootDrawerNavigator);
