import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'

import SplashScreen from '../screen/splashScreen/SplashScreen'

import CountriesList from '../screen/countriesFinder/CountriesList'
import CountriesPlanisphere from '../screen/countriesFinder/CountriesPlanisphere'
import CountryProfil from '../screen/countriesFinder/CountryProfil'
import LocalCountryProfil from '../screen/countriesFinder/LocalCountryProfil'


import CreateTravel from '../screen/createTravel/CreateTravel'
import DestinationFinder from '../screen/destinationFinder/DestinationFinder'
import DestinationFinderResults from '../screen/destinationFinder/DestinationFinderResults'

import EmergenciesMenu from '../screen/emergencies/EmergenciesMenu'
import ToolsMenu from '../screen/tools/ToolsMenu'
import MainMenu from '../screen/mainMenu/MainMenu'
import Meteo from '../screen/meteo/Meteo'
import SharingGPS from '../screen/tools/SharingGPS'

import UserProfil from '../screen/userProfil/UserProfil'
import UserTrips from '../screen/userProfil/UserTrips'
import ChangePwd from '../screen/userProfil/changePwd'
import Wishlist from '../screen/userProfil/Wishlist'


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
  SharingGPS: {
    screen: SharingGPS
  },
  UserProfil: {
    screen: UserProfil,
  },
  ChangePwd: {
    screen: ChangePwd,
  },
  UserTrips: {
    screen: UserTrips,
  },
  Wishlist: {
    screen: Wishlist,
  },
  CountryProfil: {
    screen: CountryProfil,
  },
  LocalCountryProfil: {
    screen: LocalCountryProfil,
  },
  DestinationFinder: {
    screen: DestinationFinder,
  },
  DestinationFinderResults: {
    screen: DestinationFinderResults,
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
