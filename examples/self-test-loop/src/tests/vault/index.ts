import { vault } from '@oliveai/ldk';

export const testWriteReadRemove = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const value = 'Do I exist?';
    vault.write('testKey', value).then(() => {
      vault
        .exists('testKey')
        .then((exists) => {
          console.debug(`Value exists in vault: ${exists}`);
          if (!exists) {
            reject(new Error('Key does not exist in storage'));
            return null;
          }

          return vault.read('testKey');
        })
        .then((vaultValue) => {
          console.debug(`Value in vault: ${vaultValue}`);
          if (vaultValue !== value) {
            reject(new Error('Stored value does not match initial value'));
            return null;
          }

          return vault.remove('testKey');
        })
        .then(() => {
          console.debug(`Value deleted from vault`);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
