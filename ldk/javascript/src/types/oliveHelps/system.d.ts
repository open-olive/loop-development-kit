declare namespace System {
  interface Aptitude {
    operatingSystem: Common.Readable<string>;
    getEnvironment: Common.Readable<SystemEnvironment>;
  }
}
