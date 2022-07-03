import { computed } from '@nuxtjs/composition-api'

export const doneOrError = computed(() => {
  return (failed: boolean, isBackEndError: boolean) => {
    return {
      '-error': failed || isBackEndError
    };
  };
});

export const isBackendError = computed(() => {
  return (key: string, keys: string[]): object => {
    return { failed: keys.includes(key), key };
  };
});

export const filterBackendErrors = (key: string, keys: string[]): string[] => {
  if (keys.length === 0) return keys;

  if (keys.includes(key)) {
    return keys.filter((elm: string) => elm !== key);
  }
  return keys;
}
