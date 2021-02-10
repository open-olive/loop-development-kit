import React from "react"
import { Layout } from "../components/layout"
import styles from "./index.module.scss"
import "./index.scss"
import { PageHeader } from "../components/page-header"
import OliveHelpsLogo from "../components/olive-helps-logo"
import { languages, downloadMacUrl, downloadWindowsUrl } from "../references"
import { Section } from "../components/section"

interface LanguageBlockProps {
  language: string
  repoURL: string
  docURL?: string
  docURLNotice?: string
}

const LanguageBlock: React.FunctionComponent<LanguageBlockProps> = props => (
  <article className={styles.downloadItem}>
    <h3 className={styles.languageTitle}>{props.language}</h3>
    <a href={props.repoURL} className={styles.ldkLink}>
      GitHub
    </a>
    <br />
    {props.docURL && (
      <a href={props.docURL} className={styles.ldkLink}>
        Documentation
      </a>
    )}
    {props.docURLNotice && (
      <span className={styles.ldkLink}>{props.docURLNotice}</span>
    )}
  </article>
)

export default function Home() {
  const title = (
    <>
      <OliveHelpsLogo className={styles.headerImage} /> <br />
      Developer Hub
    </>
  )
  return (
    <Layout>
      <PageHeader title={title} />
      <Section>
        <h2 className={styles.sectionTitle}>Download</h2>
        <p>Download the Olive Helps app.</p>
        <div className={styles.downloadCollection}>
          <article className={styles.downloadItem}>
            <a href={downloadWindowsUrl} className={styles.downloadLink}>
              Windows
            </a>
          </article>
          <article className={styles.downloadItem}>
            <a className={styles.downloadLink} href={downloadMacUrl}>
              MacOS
            </a>
          </article>
        </div>
      </Section>
      <Section sectionClassName={styles.alternatingSectionBackground}>
        <h2 className={styles.sectionTitle}>Get the LDK</h2>
        <p>Get the LDK and start building!</p>
        <div className={styles.downloadCollection}>
          {languages.map(language => (
            <LanguageBlock {...language} key={language.language} />
          ))}
        </div>
      </Section>
      <Section>
        <h2 className={styles.sectionTitle}>Getting Help</h2>
        <p>
          Email your Olive Helps developer contact if you need any help! We're
          here to help you succeed!
        </p>
      </Section>
    </Layout>
  )
}

/**
 * LDK Links
 * LDK Documentation Links
 * Download Links
 */
