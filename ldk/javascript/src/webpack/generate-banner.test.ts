import { generateBanner } from "./generate-banner";
import { LdkPermissions, LdkSettings, Ldk } from "./ldk-settings";

function getLoopMetadataContent(encodedData: string): string {
    const metadataContents = 
        encodedData.replace('---BEGIN-LOOP-JSON-BASE64---', '')
            .replace('---END-LOOP-JSON-BASE64---', '')
            .replace('/*', '')
            .replace('*/', '')
            .trim();
    return Buffer.from(metadataContents, 'base64').toString('utf-8');
}

describe('Generate Banner', () => {
    it('generates banner given valid LdkSettings', () => {
        const ldkSettings: LdkSettings = {
            ldk: {
                permissions: {
                    clipboard: {},
                    cursor: {},
                    filesystem: { pathGlobs: [ { value: "/my/path" } ] },
                    keyboard: {},
                    network: { urlDomains: [ { value: "*.google.com" } ] },
                    process: {},
                    ui: {},
                    vault: {},
                    whisper: {},
                    window: {},
                }
            }
        }
        const result = getLoopMetadataContent(generateBanner(ldkSettings));

        //* aptitudes *//
        expect(result).toContain("\"clipboard\":{}");
        expect(result).toContain("\"cursor\":{}");
        expect(result).toContain("\"keyboard\":{}");
        expect(result).toContain("\"process\":{}");
        expect(result).toContain("\"ui\":{}");
        expect(result).toContain("\"vault\":{}");
        expect(result).toContain("\"whisper\":{}");
        expect(result).toContain("\"window\":{}");

        //* filesystem *//
        expect(result).toContain("\"filesystem\":{\"pathGlobs\":[{\"value\":\"/my/path\"}]");

        //* network *//
        expect(result).toContain("\"network\":{\"urlDomains\":[{\"value\":\"*.google.com\"}]");
    });

    it('throws exception when LdkSettings are not provided', () => {
        const invalidLdkSettings: LdkSettings = { ldk: {} as Ldk }

        expect(() => generateBanner(invalidLdkSettings))
            .toThrowError("Please provide LDK settings and permissions in your Loop package.json. See README for more information.");
    });
});