import { makeObservable, observable, action } from 'mobx';
import { Signal } from 'micro-signals';
import * as authApi from './authApi';

export class AuthStore {
  signal: Signal<any> = new Signal();
  @observable signedInUserId?: string;

  constructor() {
    makeObservable(this);
  }

  @action signIn(userId: string, password: string, rememberMe: boolean) {
    this.signal.dispatch({
      topic: 'SignIn.Requested',
    });
    authApi.signIn(userId, password, rememberMe).then((response: any) => {
      if (response.errors) {
        this.signal.dispatch({
          topic: 'SignIn.Failed',
          details: response.errors,
        });
      } else {
        this.signedInUserId = response.userId;
        this.signal.dispatch({
          topic: 'SignIn.Succeeded',
          details: response.errors,
        });
      }
    });
  }

  @action signUp(email: string, password: string) {
    this.signal.dispatch({
      topic: 'SignUp.Requested',
    });
    authApi.signUp(email, password).then((response: any) => {
      if (response.errors) {
        this.signal.dispatch({
          topic: 'SignUp.Failed',
          details: response.errors,
        });
      } else {
        this.signal.dispatch({
          topic: 'SignUp.Succeeded',
          details: response.errors,
        });
      }
    });
  }
}
