import { observable, action } from 'mobx';

class Store {
  @observable IsLog = 0
  @observable UserEmail = ''
  @observable UserToken = ''
  @observable UserUsername = ''
  @observable UserDescription = ''

  @observable InfoCountry = '1'
  @observable DataCountry = []


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

  @action setUserDescription(param) {
    this.UserDescription = param;
  }

  @action setUserToken(param) {
    this.UserToken = param;
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
