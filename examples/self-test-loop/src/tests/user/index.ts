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

export const testJwtUserDetailsIncludeEmail = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwtWithUserDetails({ includeEmail: true }).then((token: user.JWTWithUserDetails) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - JwtUserDetails Include Email Claim',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body: 'The email claim is still in the encoded text. You can paste the token into jwt.io to check the claims. This token **should** have an email claim.',
            },
            {
              type: whisper.WhisperComponentType.Markdown,
              body: `The email is ${token.email}`,
            },
            {
              type: whisper.WhisperComponentType.Link,
              text: 'Click here to copy the JWT to your clipboard.',
              onClick: async () => {
                await clipboard.write(token.jwt);
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
    user.jwtWithUserDetails({ includeFullName: true }).then((token: user.JWTWithUserDetails) => {
      if (token && token.fullName) {
        console.log(`Full name: ${token.fullName}`);
        // Don't need to open a whisper, just confirm the correct piece of data is there.
        resolve(true);
      } else {
        reject(new Error('JWT should not have been empty'));
      }
    });
  });

export const testJwtIncludeOrganizationId = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user
      .jwtWithUserDetails({ includeOrganizationId: true })
      .then((token: user.JWTWithUserDetails) => {
        if (token && token.organizationId) {
          console.log(`Organization ID: ${token.organizationId}`);
          // Don't need to open a whisper, just confirm the correct piece of data is there.
          resolve(true);
        } else {
          reject(new Error('JWT should not have been empty'));
        }
      });
  });

export const testJwtIncludeOrganizationName = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user
      .jwtWithUserDetails({ includeOrganizationName: true })
      .then((token: user.JWTWithUserDetails) => {
        if (token && token.organizationName) {
          console.log(`Organization Name: ${token.organizationName}`);
          // Don't need to open a whisper, just confirm the correct piece of data is there.
          resolve(true);
        } else {
          reject(new Error('JWT should not have been empty'));
        }
      });
  });
