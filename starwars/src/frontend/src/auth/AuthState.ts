import { action, makeObservable, observable } from 'mobx';
import { AuthStore } from './AuthStore';

export class AuthState {
  @observable errors: string[] = [];
  @observable status: string = 'initial';

  constructor(authStore: AuthStore) {
    makeObservable(this);
    authStore.signal.add(this.handleMsg);
  }

  @action handleMsg = (msg: any) => {
    this.errors = msg.details || [];
    this.status = msg.topic;
  };
}
