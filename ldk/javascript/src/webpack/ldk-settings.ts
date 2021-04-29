export interface LdkSettings {
    ldk: Ldk
}

export interface Ldk {
    permissions: LdkPermissions
}

export interface LdkPermissions {
    url: string[]

    filesystem: string[]

    aptitude: string[]
}
