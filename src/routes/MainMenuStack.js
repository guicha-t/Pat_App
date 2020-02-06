import {createStackNavigator} from 'react-navigation-stack'

import MainMenu from "../screen/mainMenu/MainMenu"

const screens = {
    MainMenu: {
      screen: MainMenu
    }
}

const MainMenuStack = createStackNavigator(screens);

export default MainMenuStack;
