import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'

import SplashScreen from '../screen/splashScreen/SplashScreen'

import CountriesMenu from '../screen/countriesFinder/CountriesMenu'
import CountriesList from '../screen/countriesFinder/CountriesList'
import CountriesPlanisphere from '../screen/countriesFinder/CountriesPlanisphere'
import CountryProfil from '../screen/countriesFinder/CountryProfil'

import CreateTravel from '../screen/createTravel/CreateTravel'
import DestinationFinder from '../screen/destinationFinder/DestinationFinder'

import EmergenciesMenu from '../screen/emergencies/EmergenciesMenu'
import ToolsMenu from '../screen/tools/ToolsMenu'
import MainMenu from '../screen/mainMenu/MainMenu'
import Meteo from '../screen/meteo/Meteo'
import Light from '../screen/tools/Light'

import UserProfil from '../screen/userProfil/UserProfil'

import CustomDrawerContentComponent from './CustomDrawerContentComponent';


const RootDrawerNavigator = createDrawerNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  MainMenu: {
    screen: MainMenu,
  },
  CreateTravel: {
    screen: CreateTravel,
  },
  CountriesPlanisphere: {
    screen: CountriesPlanisphere,
  },
  CountriesList: {
    screen: CountriesList,
  },
  Light: {
    screen: Light
  },
  UserProfil: {
    screen: UserProfil,
  },
  CountriesMenu: {
    screen: CountriesMenu,
  },
  CountryProfil: {
    screen: CountryProfil,
  },
  DestinationFinder: {
    screen: DestinationFinder,
  },
  EmergenciesMenu: {
    screen: EmergenciesMenu,
  },
  Meteo: {
    screen: Meteo,
  },
  ToolsMenu: {
    screen: ToolsMenu
  },
},{
  initialRouteName: 'MainMenu',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#FFFFFF',
    activeBackgroundColor: '#428B9D',
  }
})

export default createAppContainer(RootDrawerNavigator);
