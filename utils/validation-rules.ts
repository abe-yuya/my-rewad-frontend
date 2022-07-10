import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'この入力項目は必須です',
});

extend('email', {
  ...email,
  message: '無効なメールアドレスです',
});

extend('maxLength', {
  validate(value,max) {
    if (value.length <= max) {
      return true;
    }
    return `${max}文字以下で入力してください`;
  }
});
