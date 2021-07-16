import { user, clipboard, whisper } from '@oliveai/ldk';

export const testJwt = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    user.jwt().then((token) => {
      if (token) {
        whisper.create({
          label: 'User Aptitude JWT - No Email',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body:
                'You can paste the token into jwt.io to check the claims. This token **should not** have an email claim.',
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
          label: 'User Aptitude JWT - Include Email',
          components: [
            {
              type: whisper.WhisperComponentType.Markdown,
              body:
                'You can paste the token into jwt.io to check the claims. This token **should** have an email claim.',
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
