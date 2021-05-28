import React from 'react';
import { Layout } from '../components/layout';
import styles from './index.module.scss';
import './index.scss';
import { PageHeader } from '../components/page-header';
import OliveHelpsLogo from '../components/olive-helps-logo';
import { languages, downloadMacUrl, downloadWindowsUrl } from '../references';
import { Section } from '../components/section';
import { IAptitudeData } from '../components/aptitudes/aptitudeData';
import { graphql, Link, PageProps } from 'gatsby';
import { buildAptitudePath } from '../components/aptitudes/aptitudePaths';
import { mapGuidePages } from '../components/menu/shared-menu';
import { getAptitudeDataFromQuery, IAllAptitudeQuery, IAllFileQuery } from '../queries';
import { V2Menu } from '../components/menu/v2menu';
import { Image } from '../components/image';

interface LanguageBlockProps {
  language: string;
  repoURL: string;
  docURL?: string;
  docURLNotice?: string;
}

const LanguageBlock: React.FunctionComponent<LanguageBlockProps> = (props) => (
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
    {props.docURLNotice && <span className={styles.ldkLink}>{props.docURLNotice}</span>}
  </article>
);

const AptitudeItem: React.FunctionComponent<{
  aptitude: IAptitudeData;
}> = (props) => {
  return (
    <Link to={buildAptitudePath(props.aptitude)} className={styles.aptitudeItem}>
      <h3 className={styles.aptitudeTitle}>
        <Image
          src={`aptitude-${props.aptitude.internalName}.svg`}
          width={32}
          className={styles.aptitudeIcon}
        />
        {props.aptitude.name}
      </h3>
      <p
        className={styles.aptitudeDescription}
        dangerouslySetInnerHTML={{ __html: props.aptitude.shortDescription }}
      />
    </Link>
  );
};

const GuideItem: React.FunctionComponent<IFrontmatterProps> = (props) => {
  return (
    <div className={styles.aptitudeItem}>
      <h3 className={styles.aptitudeTitle}>
        <Link to={props.slug}>{props.title}</Link>
      </h3>
      <p className={styles.aptitudeDescription}>{props.description}</p>
    </div>
  );
};

export default function Home(
  props: PageProps<IAllFileQuery<IFrontmatterProps> & IAllAptitudeQuery>,
) {
  const combinedData = props.data.allAptitude.edges.map((aptitude: any) =>
    getAptitudeDataFromQuery(aptitude.node),
  );
  const aptitudeItems = combinedData.map((aptitude) => {
    return <AptitudeItem aptitude={aptitude} key={aptitude.name} />;
  });
  const guideItems = mapGuidePages(props.data).map((guide) => <GuideItem {...guide} />);
  const title = <>Welcome To the Olive Helps Developer Hub</>;
  return (
    <Layout>
      <V2Menu />
      <PageHeader title={title}>
        <p className={styles.headerSubtext}>
          Ready to put your solution in front of a new group of healthcare users? Get started using
          the Loop Developer Kit (LDK).
        </p>
        <div>
          {/* TODO: What does this button do? */}
          <a className={styles.button}>Get started</a>
          <a
            className={[styles.buttonInverse, styles.buttonArrow].join(' ')}
            href="https://github.com/open-olive/loop-development-kit/tree/main/ldk/javascript"
          >
            Access the LDK
          </a>
        </div>
      </PageHeader>
      <Section sectionClassName={styles.sectionHeroBackground}>
        <h2 className={styles.sectionTitle}>Download Olive Helps</h2>
        <p className={styles.sectionDescription}>
          First things first: Download Olive Helps and create your Olive account. Then, visit the
          Loop Library to become a Loop Author and get building.
        </p>
        <div className={styles.downloadCollection}>
          <article className={styles.downloadItem}>
            <a href={downloadWindowsUrl} className={styles.downloadLink}>
              Windows
            </a>
          </article>
          <article className={styles.downloadItem}>
            <a className={styles.downloadLink} href={downloadMacUrl}>
              Mac
            </a>
          </article>
        </div>
      </Section>
      <Section
        sectionClassName={[styles.sectionBackground, styles.sectionBackgroundExtraSpace].join(' ')}
      >
        <h2 className={styles.sectionTitle}>Aptitude is everything</h2>
        <p className={styles.sectionDescription}>
          As you build Loops, leverage Olive’s collection of Aptitudes — tools and capabilities that
          capture important user information. Aptitudes enable Sensors, which let Olive understand
          how users are working and when to offer help.
        </p>
        <div className={styles.aptitudeList}>{aptitudeItems}</div>
      </Section>
      <Section sectionClassName={styles.sectionBackground}>
        <h2 className={styles.sectionTitle}>Design system</h2>
        <p>Create beautiful Loops that seamlessly integrated with Olive Helps.</p>
        <a href="">View the design system</a>
      </Section>
      <Section sectionClassName={styles.sectionBackground}>
        <h2 className={styles.sectionTitle}>Additional Resources</h2>
        <p>We have guides available to help you at various steps.</p>
        <div className={styles.aptitudeList}>{guideItems}</div>
        <div>
          <h3>Need help getting started?</h3>
          <p>
            Submit a request or email your Olive Helps developer contact for further assistance.
          </p>
          <a href="">Submit a request</a>
        </div>
      </Section>
      <Section sectionClassName={styles.sectionBackground}>
        <p>
          <a
            className={styles.termsLink}
            href="https://olive.page.link/olive-helps-terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Olive
          </a>

          <a
            className={styles.termsLink}
            href="https://olive.page.link/olive-helps-terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>
          <a
            className={styles.licenseLink}
            href="https://github.com/open-olive/loop-development-kit/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
          >
            LDK Open Source License
          </a>
          <a href="https://www.instagram.com/oliveai__/" target="_blank" rel="noopener noreferrer">
            INSTAGRAM ICON HERE
          </a>
          <a
            href="https://www.linkedin.com/company/oliveai"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN ICON HERE
          </a>
        </p>
      </Section>
    </Layout>
  );
}

export interface IFrontmatterProps {
  slug: string;
  title: string;
  description: string;
}

export const pageQuery = graphql`
  query {
    allAptitude {
      edges {
        node {
          internalName
          capabilities {
            markdown {
              html
              frontmatter {
                name
                links_js
              }
            }
          }
          markdown {
            html
            frontmatter {
              name
              description
            }
          }
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "guides" } }) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              slug
              title
              description
            }
          }
          relativeDirectory
        }
      }
    }
  }
`;
