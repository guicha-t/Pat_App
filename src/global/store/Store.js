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
  @observable PicCountry = []
  @observable KeyReturn = ''

//FinderDestinations
  @observable Continent_selected = ""
  @observable Climat_selected = ""
  @observable ResultsFinder = []

//wishlist
  @observable Wishlist = []

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

  @action setResultsFinder(param) {
    this.ResultsFinder = param;
  }

  @action setWishlist(param) {
    this.Wishlist = param;
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
