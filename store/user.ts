import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { $axios } from '~/utils/api'
import { userData, signUpValues } from '~/types/props-types'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})

export default class User extends VuexModule {
  // State
  private authState: boolean = false;

  // getter
  public get isLoggedIn(): boolean {
    return !! this.authState;
  }
  public get getUser() {
    return this.authState
  }

  @Mutation
  private setResponse(res: any): void {
    if (res === null) {
      this.authState = null;
    } else {
      this.authState = res.data;
    }
  }

  @Action({ rawError: true })
  public async csrfCookie() {
    await $axios.get('sanctum/csrf-cookie');
  }

  @Action({ rawError: true })
  public async login(userData: userData) {
    const { data } = await $axios.post('login', userData);
    this.setResponse(data.data);
    return data;
  }

  // ログアウト
  @Action ({ rawError: true })
  public async logout(): Promise<void> {
    await $axios.post('/logout');
    this.setResponse(null);
  }

  // 新規登録
  @Action({ rawError: true })
  public async createUser(userData: signUpValues) {
    console.log(userData);
    const {data} = await $axios.post('api/register', userData);
    this.setResponse(data.data);
    return data;
  }
}


