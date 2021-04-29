export interface LdkSettings {
    ldk: Ldk
}

export interface Ldk {
    permissions: LdkPermissions
}

export interface LdkAptitude {
    reason: string
}

export interface LdkValueReason {
    value: string

    reason: string
}

export interface LdkFilesystem {
    pathGlobs:  LdkValueReason[]
}

export interface LdkNetwork {
    urlDomains: LdkValueReason[]   
}

export interface LdkPermissions {
    clipboard: LdkAptitude

    cursor: LdkAptitude

    filesystem: LdkFilesystem

    keyboard: LdkAptitude

    network: LdkNetwork

    process: LdkAptitude

    ui: LdkAptitude

    vault: LdkAptitude

    whisper: LdkAptitude

    window: LdkAptitude
}