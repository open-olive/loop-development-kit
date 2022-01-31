import { user, clipboard, whisper } from '@oliveai/ldk';

export const testJwt = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt().then((token) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - Default Claims',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'You can paste the token into jwt.io to check the claims.',
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to copy the JWT to your clipboard.',
              onClick: async () => {
                await clipboard.write(token);
              },
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to open jwt.io',
              href: 'https://jwt.io',
            },
          ],
        });
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });

export const testJwtExcludeEmail = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt({ includeEmail: false }).then((token) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - Exclude Email Claim',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'You can paste the token into jwt.io to check the claims. This token **should not** have an email claim.',
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to copy the JWT to your clipboard.',
              onClick: async () => {
                await clipboard.write(token);
              },
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to open jwt.io',
              href: 'https://jwt.io',
            },
          ],
        });
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });

export const testJwtIncludeEmail = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt({ includeEmail: true }).then((token) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - Include Email Claim',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'You can paste the token into jwt.io to check the claims. This token **should** have an email claim.',
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to copy the JWT to your clipboard.',
              onClick: async () => {
                await clipboard.write(token);
              },
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to open jwt.io',
              href: 'https://jwt.io',
            },
          ],
        });
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });

export const testJwtIncludeFullName = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user
      .jwtWithUserDetails({
        includeEmail: false,
        includeFullName: true,
        includeOrganizationId: false,
        includeOrganizationName: false,
      })
      .then((token: any) => {
        if (token) {
          console.log(JSON.stringify(token));
          whisper.create({
            label: 'User Aptitude JWT - Include Full Name Claim',
            components: [
              {
                type: whisper.WhisperComponentType.Markdown,
                body: 'You can paste the token into jwt.io to check the claims. This token **should** have an fullName claim.',
              },
              {
                type: whisper.WhisperComponentType.Link,
                text: 'Click here to copy the JWT to your clipboard.',
                onClick: async () => {
                  await clipboard.write(token);
                },
              },
              {
                type: whisper.WhisperComponentType.Link,
                text: 'Click here to open jwt.io',
                href: 'https://jwt.io',
              },
            ],
          });
          resolve(true);
        } else {
          reject(new Error('JWT should not have been empty'));
        }
      });
  });

export const testJwtIncludeOrganizationId = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwtWithUserDetails({ includeOrganizationId: true }).then((token: string) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - Include Full Name Claim',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'You can paste the token into jwt.io to check the claims. This token **should** have an organizationId claim.',
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to copy the JWT to your clipboard.',
              onClick: async () => {
                await clipboard.write(token);
              },
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to open jwt.io',
              href: 'https://jwt.io',
            },
          ],
        });
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });

export const testJwtIncludeOrganizationName = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwtWithUserDetails({ includeOrganizationName: true }).then((token: string) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - Include Full Name Claim',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'You can paste the token into jwt.io to check the claims. This token **should** have an organizationName claim.',
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to copy the JWT to your clipboard.',
              onClick: async () => {
                await clipboard.write(token);
              },
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to open jwt.io',
              href: 'https://jwt.io',
            },
          ],
        });
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });
