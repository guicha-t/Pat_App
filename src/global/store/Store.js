import { observable, action } from 'mobx';

class Store {
//Auth
  @observable IsLog = 0
  @observable UserEmail = ''
  @observable UserToken = ''
  @observable UserUsername = ''

//UserTrips
  @observable UserTrips = []

//Select Country
  @observable InfoCountry = '1'
  @observable DataCountry = []
  @observable KeyReturn = ''

//GPS MainMenu
  @observable CurrentCity = ''
  @observable CurrentCountry = ''
  @observable CurrentCountryCode = ''
  @observable CurrentLattitude = ''
  @observable CurrentLongitute = ''

  @action setIsLog(param) {
    this.IsLog = param;
  }

  @action setUserEmail(param) {
    this.UserEmail = param;
  }

  @action setUserUsername(param) {
    this.UserUsername = param;
  }

  @action setUserToken(param) {
    this.UserToken = param;
  }

  @action setUserTrips(param) {
    this.UserTrips = param;
  }

  @action setCurrentLocation(city, country, countryCode, lattitude, longitute) {
    this.CurrentCity = city;
    this.CurrentCountry = country;
    this.CurrentCountryCode = countryCode;
    this.CurrentLattitude = lattitude;
    this.CurrentLongitute = longitute;
  }
}

const singleton = new Store();
export default singleton;
