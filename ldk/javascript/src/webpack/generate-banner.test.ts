import { generateBanner } from './generate-banner';
import { LdkSettings, Ldk } from './ldk-settings';

function getLoopMetadataContent(encodedData: string) {
  const metadataContents = encodedData
    .replace('---BEGIN-LOOP-JSON-BASE64---', '')
    .replace('---END-LOOP-JSON-BASE64---', '')
    .replace('/*', '')
    .replace('*/', '')
    .trim();
  return JSON.parse(Buffer.from(metadataContents, 'base64').toString('utf-8'));
}

const expectedErrorMessage = `Please add a "ldk" object to your package.json file with a permission property:
    "ldk": {
        "permissions": {}
    }
See README for more information.`;

describe('Generate Banner', () => {
  const ldkSettings: LdkSettings = {
    ldk: {
      permissions: {
        clipboard: {},
        cursor: {},
        filesystem: { pathGlobs: [{ value: '/my/path' }] },
        keyboard: {},
        network: { urlDomains: [{ value: '*.google.com' }] },
        process: {},
        system: {},
        ui: {},
        user: {},
        vault: {},
        whisper: {},
        window: {},
      },
    },
  };

  it('generates banner given valid LdkSettings', () => {
    const actual = getLoopMetadataContent(generateBanner(ldkSettings));
    const expected = {
      oliveHelpsContractVersion: '0.1.2',
      permissions: {
        clipboard: {},
        cursor: {},
        filesystem: { pathGlobs: [{ value: '/my/path' }] },
        keyboard: {},
        network: { urlDomains: [{ value: '*.google.com' }] },
        process: {},
        system: {},
        ui: {},
        user: {},
        vault: {},
        whisper: {},
        window: {},
      },
    };

    expect(actual).toEqual(expected);
  });

  it('omits aptitude permissions that are not declared', () => {
    /* eslint-disable-next-line */ // Have to force any type here to allow generateBanner to accept this shape
    const ldkSettings: any = {
      ldk: {
        permissions: {
          filesystem: { pathGlobs: [{ value: '/my/path' }] },
          network: { urlDomains: [{ value: '*.google.com' }] },
          vault: {},
        },
      },
    };

    const actual = getLoopMetadataContent(generateBanner(ldkSettings));

    const expected = {
      oliveHelpsContractVersion: '0.1.2',
      permissions: {
        filesystem: { pathGlobs: [{ value: '/my/path' }] },
        network: { urlDomains: [{ value: '*.google.com' }] },
        vault: {},
      },
    };

    expect(actual).toEqual(expected);
  });

  it('adds oliveHelpsContractVersion', () => {
    const result = getLoopMetadataContent(generateBanner(ldkSettings));

    expect(result.oliveHelpsContractVersion).toEqual('0.1.2');
  });

  it('throws exception when LDK permissions are not provided', () => {
    const invalidLdkSettings: LdkSettings = { ldk: {} as Ldk };

    expect(() => generateBanner(invalidLdkSettings)).toThrowError(expectedErrorMessage);
  });

  it('throws exception when LDK key is not specified', () => {
    expect(() => generateBanner(<LdkSettings>{})).toThrowError(expectedErrorMessage);
  });
});
