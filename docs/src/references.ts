export type SupportedLanguage = 'go' | 'node' | 'dotnet';

interface LDKLanguage {
  language: string;
  repoURL: string;
  docURL?: string;
  docURLNotice?: string;
  id: SupportedLanguage;
}

export const downloadWindowsUrl = 'https://olive.page.link/olive-helps-windows';
export const downloadMacUrl = 'https://olive.page.link/olive-helps-mac';
export const languages: LDKLanguage[] = [
  {
    id: 'node',
    language: 'Node',
    repoURL: 'https://github.com/open-olive/loop-development-kit/tree/main/ldk/node',
    docURL: 'https://open-olive.github.io/loop-development-kit/ldk/node/',
  },
];
