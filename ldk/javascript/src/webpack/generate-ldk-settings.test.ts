import { mergeLdkSettings } from './generate-ldk-settings';

describe('Merge LDK Settings', () => {
  // Have to force any type here to allow mergeLdkSettings to accept this shape
  // eslint-disable-next-line
  const baseLdkSettings: any = {
    ldk: {
      permissions: {
        filesystem: {
          pathGlobs: [{ value: '/base/path' }],
        },
        network: {
          urlDomains: [{ value: 'baseUrl.com' }],
        },
        clipboard: {},
        whisper: {},
      },
    },
  };

  it('replaces base urlDomains with override urlDomains', () => {
    const overrideUrlDomains = [{ value: 'overrideUrl.com' }];
    // Have to force any type here to allow mergeLdkSettings to accept this shape
    // eslint-disable-next-line
    const overrideSettings: any = {
      ldk: {
        permissions: {
          network: {
            urlDomains: overrideUrlDomains,
          },
        },
      },
    };

    const mergedSettings = mergeLdkSettings(baseLdkSettings, overrideSettings);

    const expectedSettings = baseLdkSettings;
    expectedSettings.ldk.permissions.network.urlDomains = overrideUrlDomains;

    expect(mergedSettings).toEqual(expectedSettings);
  });

  it('replaces base pathGlobs with override pathGlobs', () => {
    const overridePathGlobs = [{ value: '/override/path' }];
    // Have to force any type here to allow mergeLdkSettings to accept this shape
    // eslint-disable-next-line
    const overrideSettings: any = {
      ldk: {
        permissions: {
          filesystem: {
            pathGlobs: overridePathGlobs,
          },
        },
      },
    };

    const mergedSettings = mergeLdkSettings(baseLdkSettings, overrideSettings);

    const expectedSettings = baseLdkSettings;
    expectedSettings.ldk.permissions.filesystem.pathGlobs = overridePathGlobs;

    expect(mergedSettings).toEqual(expectedSettings);
  });

  it('keys present in the base config exist in merged output', () => {
    // Have to force any type here to allow mergeLdkSettings to accept this shape
    // eslint-disable-next-line
    const overrideSettings: any = {
      ldk: {
        permissions: {},
      },
    };

    const mergedSettings = mergeLdkSettings(baseLdkSettings, overrideSettings);
    expect(mergedSettings).toEqual(baseLdkSettings);
  });
});
