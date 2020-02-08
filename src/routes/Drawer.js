import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'

import Authentication from '../screen/authentication/Authentication'
import CreateAccount from '../screen/authentication/CreateAccount'
import ForgetPassword from '../screen/authentication/ForgetPassword'

import CountriesMenu from '../screen/countriesFinder/CountriesMenu'
import CountriesList from '../screen/countriesFinder/CountriesList'
import CountriesPlanisphere from '../screen/countriesFinder/CountriesPlanisphere'
import CountryProfil from '../screen/countriesFinder/CountryProfil'

import CreateTravel from '../screen/createTravel/CreateTravel'
import DestinationFinder from '../screen/destinationFinder/DestinationFinder'

import EmergenciesMenu from '../screen/emergencies/EmergenciesMenu'
import MainMenu from '../screen/mainMenu/MainMenu'
import Meteo from '../screen/meteo/Meteo'
import UserProfil from '../screen/userProfil/UserProfil'
import UserInformations from '../screen/userProfil/UserInformations'
import UserTravels from '../screen/userProfil/UserTravels'



const RootDrawerNavigator = createDrawerNavigator({
  MainMenu: {
    screen: MainMenu,
  },
  Authentication: {
    screen: Authentication,
  },
  CreateAccount: {
    screen: CreateAccount,
  },
  ForgetPassword: {
    screen: ForgetPassword,
  },
  CountriesMenu: {
    screen: CountriesMenu,
  },
  CountriesList: {
    screen: CountriesList,
  },
  CountriesPlanisphere: {
    screen: CountriesPlanisphere,
  },
  CountryProfil: {
    screen: CountryProfil,
  },
  CreateTravel: {
    screen: CreateTravel,
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
  UserProfil: {
    screen: UserProfil,
  },
  UserInformations: {
    screen: UserInformations,
  },
  UserTravels: {
    screen: UserTravels,
  },
})

export default createAppContainer(RootDrawerNavigator);
