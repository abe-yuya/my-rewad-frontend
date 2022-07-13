/**
 * 新規ユーザー登録フォーム
 */
export interface signUpValues {
  username: string,
  email: string,
  password: string,
  confirm_password: string,
  work_place: string,
  occupation: string,
}

/**
 * ログインフォーム
 */
export interface LoginValues {
  email: string,
  password: string,
}

// ログインに必要なユーザー入力
export interface userData {
  email: string,
  password: string,
}

export interface backendErrorObject {
  failed: boolean;
  key: string,
}
