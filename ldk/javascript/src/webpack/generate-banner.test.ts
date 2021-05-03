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

    const ldkSettings: LdkSettings = {
        ldk: {
            permissions: {
                clipboard: { reason: "access clipboard" },
                cursor: { reason: "access cursor" },
                filesystem: { pathGlobs: [ { value: "/my/path", reason: "monitor /my/path"} ] },
                keyboard: { reason: "access keyboard" },
                network: { urlDomains: [ { value: "*.google.com", reason: "request data from Google"} ] },
                process: { reason: "access processes" },
                ui: { reason: "access ui" },
                vault: { reason: "access vault" },
                whisper: { reason: "access whisper" },
                window: { reason: "access window" },
            }
        }
    };

    it('generates banner given valid LdkSettings', () => {
        const result = getLoopMetadataContent(generateBanner(ldkSettings));

        //* aptitudes *//
        expect(result).toContain("\"clipboard\":{\"reason\":\"access clipboard\"}");
        expect(result).toContain("\"cursor\":{\"reason\":\"access cursor\"}");
        expect(result).toContain("\"keyboard\":{\"reason\":\"access keyboard\"}");
        expect(result).toContain("\"process\":{\"reason\":\"access processes\"}");
        expect(result).toContain("\"ui\":{\"reason\":\"access ui\"}");
        expect(result).toContain("\"vault\":{\"reason\":\"access vault\"}");
        expect(result).toContain("\"whisper\":{\"reason\":\"access whisper\"}");
        expect(result).toContain("\"window\":{\"reason\":\"access window\"}");

        //* filesystem *//
        expect(result).toContain("\"filesystem\":{\"pathGlobs\":[{\"value\":\"/my/path\",\"reason\":\"monitor /my/path\"}]}");

        //* network *//
        expect(result).toContain("\"network\":{\"urlDomains\":[{\"value\":\"*.google.com\",\"reason\":\"request data from Google\"}]}");
    });

    it('adds oliveHelpsContractVersion', () => {
        const result = getLoopMetadataContent(generateBanner(ldkSettings));

        expect(result).toContain("\"oliveHelpsContractVersion\":");
    });

    it('throws exception when LdkSettings are not provided', () => {
        const invalidLdkSettings: LdkSettings = { ldk: {} as Ldk }

        expect(() => generateBanner(invalidLdkSettings))
            .toThrowError("Please provide LDK settings and permissions in your Loop package.json. See README for more information.");
    });

    it('throws an exception when permissions are not provided', () => {
        const settingsWithNoPermissions: LdkSettings = { ldk: { permissions: {} as LdkPermissions }}
        
        expect(() => generateBanner(settingsWithNoPermissions))
            .toThrowError("Please provide LDK settings and permissions in your Loop package.json. See README for more information.");
    });
});