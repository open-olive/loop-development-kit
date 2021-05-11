export type SupportedLanguage = 'js';

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
    id: 'js',
    language: 'Javascript',
    repoURL: 'https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript',
    docURL: 'https://open-olive.github.io/loop-development-kit/ldk/javascript/',
  },
];
