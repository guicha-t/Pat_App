import { observable, action } from 'mobx';

class Store {
  @observable IsLog = false;

  @action setIsLog(param) {
    this.IsLog = param;
  }
}

const singleton = new Store();
export default singleton;
