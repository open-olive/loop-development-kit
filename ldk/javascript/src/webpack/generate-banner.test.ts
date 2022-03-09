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
      configSchema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          testString: {
            type: 'string',
            default: 'testing',
          },
          testObject: {
            type: 'object',
            properties: {
              foo: {
                type: 'string',
              },
              bar: {
                type: 'object',
                properties: {
                  baz: {
                    type: 'string',
                  },
                },
                required: [],
              },
            },
            required: [],
          },
        },
        required: ['testString'],
      },
      permissions: {
        browser: { urlDomains: [{ value: '*.google.com' }] },
        clipboard: {},
        config: {},
        cursor: {},
        document: {},
        filesystem: { pathGlobs: [{ value: '/my/path' }] },
        keyboard: {},
        network: { urlDomains: [{ value: '*.google.com' }] },
        process: {},
        search: {},
        screen: {},
        system: {},
        ui: {},
        user: { optionalClaims: [{ value: 'email' }] },
        vault: {},
        whisper: {},
        window: {},
      },
    },
  };

  it('generates banner given valid LdkSettings', () => {
    const actual = getLoopMetadataContent(generateBanner(ldkSettings));
    const expected = {
      oliveHelpsContractVersion: '0.3.0',
      configSchema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          testString: {
            type: 'string',
            default: 'testing',
          },
          testObject: {
            type: 'object',
            properties: {
              foo: {
                type: 'string',
              },
              bar: {
                type: 'object',
                properties: {
                  baz: {
                    type: 'string',
                  },
                },
                required: [],
              },
            },
            required: [],
          },
        },
        required: ['testString'],
      },
      permissions: {
        browser: { urlDomains: [{ value: '*.google.com' }] },
        clipboard: {},
        config: {},
        cursor: {},
        document: {},
        filesystem: { pathGlobs: [{ value: '/my/path' }] },
        keyboard: {},
        network: { urlDomains: [{ value: '*.google.com' }] },
        process: {},
        screen: {},
        search: {},
        system: {},
        ui: {},
        user: { optionalClaims: [{ value: 'email' }] },
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
      oliveHelpsContractVersion: '0.3.0',
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

    expect(result.oliveHelpsContractVersion).toEqual('0.3.0');
  });

  it('throws exception when LDK permissions are not provided', () => {
    const invalidLdkSettings: LdkSettings = { ldk: {} as Ldk };

    expect(() => generateBanner(invalidLdkSettings)).toThrowError(expectedErrorMessage);
  });

  it('throws exception when LDK key is not specified', () => {
    expect(() => generateBanner(<LdkSettings>{})).toThrowError(expectedErrorMessage);
  });
});
