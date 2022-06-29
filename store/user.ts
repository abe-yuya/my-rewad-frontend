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
    this.authState = res;
  }

  // ログイン
  @Action({ rawError: true })
  public async login(userData: userData) {
    await $axios.get('sanctum/csrf-cookie').then(async () => {
      const { data } = await $axios.post('/login', userData);
      this.setResponse(data);
    })
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
    const { data } = await $axios.post('/register', userData);
    this.setResponse(data);
  }
}


