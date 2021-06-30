import { user } from '@oliveai/ldk';

export const testJwt = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt().then((token) => {
      if (token) {
        console.debug('jwt', token);
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });
