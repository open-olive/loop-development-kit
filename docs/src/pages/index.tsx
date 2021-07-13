import React from 'react';
import { Layout } from '../components/layout';
import styles from './index.module.scss';
import './index.scss';
import { PageHeader } from '../components/page-header';
import { languages, downloadMacUrl, downloadWindowsUrl } from '../references';
import { Section } from '../components/section';
import { IAptitudeData } from '../components/aptitudes/aptitudeData';
import { graphql, Link, PageProps } from 'gatsby';
import { buildAptitudePath } from '../components/aptitudes/aptitudePaths';
import { mapGuidePages } from '../components/menu/shared-menu';
import { getAptitudeDataFromQuery, IAllAptitudeQuery, IAllFileQuery } from '../queries';
import { V2Menu } from '../components/menu/v2menu';
import { Image } from '../components/image';

declare global {
  interface Window {
    gtag: any;
  }
}

interface LanguageBlockProps {
  language: string;
  repoURL: string;
  docURL?: string;
  docURLNotice?: string;
}

const AptitudeItem: React.FunctionComponent<{
  aptitude: IAptitudeData;
}> = (props) => {
  return (
    <Link to={buildAptitudePath(props.aptitude)} className={styles.aptitudeItem}>
      <h3 className={styles.aptitudeTitle}>
        <Image
          src={`aptitude-${props.aptitude.internalName}.svg`}
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
    <Link to={props.slug} className={styles.guideItem}>
      <h3 className={styles.guideTitle}>{props.title}</h3>
      <p className={styles.aptitudeDescription}>{props.description}</p>
      <p className={styles.guideCTA}>Read more</p>
    </Link>
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
  const guideItems = mapGuidePages(props.data)
    .filter((x) => !x.slug.includes('getting-started'))
    .map((guide) => <GuideItem {...guide} />);
  const title = <>Welcome To the Olive Helps Developer Hub</>;
  return (
    <Layout>
      <V2Menu />
      <PageHeader title={title}>
        <p className={styles.headerSubtext}>
          Ready to put your solution in front of a new group of healthcare users? Get started using
          the Loop Developer Kit (LDK).
        </p>
        <div className={styles.headerActions}>
          <Link className={styles.button} to="guides/getting-started">
            Get started
          </Link>
          <span
            onClick={() => {
              window.gtag('event', 'Link out', {
                event_category: 'Navigation',
                event_label: 'NPM',
                value: 0,
              });
            }}
          >
            <a
              className={[styles.buttonInverse, styles.buttonArrow].join(' ')}
              href="https://www.npmjs.com/package/@oliveai/ldk"
            >
              Access the LDK
            </a>
          </span>
        </div>
      </PageHeader>
      <Section sectionClassName={styles.sectionHeroBackground}>
        <h2 className={styles.sectionTitle}>Download Olive Helps</h2>
        <p className={styles.sectionDescription}>
          First things first: Download Olive Helps and create your Olive account. Then, visit the
          Loop Library to become a Loop Author and get building.
        </p>
        <div className={styles.downloadCollection}>
          <article
            className={styles.downloadItem}
            onClick={() => {
              window.gtag('event', 'Download Olive Helps', {
                event_category: 'Downloads',
                event_label: 'Windows',
                value: 0,
              });
            }}
          >
            <a href={downloadWindowsUrl}>Windows</a>
          </article>
          <article
            className={styles.downloadItem}
            onClick={() => {
              window.gtag('event', 'Download Olive Helps', {
                event_category: 'Downloads',
                event_label: 'Mac',
                value: 0,
              });
            }}
          >
            <a href={downloadMacUrl}>Mac</a>
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
      <Section sectionClassName={styles.sectionDarkBackground}>
        <h2 className={styles.sectionTitle}>Design system</h2>
        <p className={styles.sectionDescription}>
          Create beautiful Loops that seamlessly integrated with Olive Helps.
        </p>
        <p
          className={styles.sectionDescription}
          onClick={() => {
            window.gtag('event', 'Link out', {
              event_category: 'Navigation',
              event_label: 'Design System',
              value: 0,
            });
          }}
        >
          <a
            href="https://coda.io/@olive-helps-design/design-system"
            target="_blank"
            className={styles.buttonInversePadding}
          >
            View the design system
          </a>
        </p>
      </Section>
      <Section sectionClassName={styles.sectionBackground}>
        <h2 className={styles.sectionTitle}>Additional Resources</h2>
        <div className={styles.guideList}>{guideItems}</div>
        <div className={styles.needHelpBanner}>
          <h3 className={styles.needHelpTitle}>Need help getting started?</h3>
          <p className={styles.needHelpSubtext}>
            Submit a request or email your Olive Helps developer contact for further assistance.
          </p>
          <div
            onClick={() => {
              window.gtag('event', 'Link out', {
                event_category: 'Navigation',
                event_label: 'Support',
                value: 0,
              });
            }}
          >
            <a
              href="https://github.com/open-olive/loop-development-kit/issues"
              className={styles.button}
              target="_blank"
            >
              Submit a request
            </a>
          </div>
        </div>
      </Section>
      <Section sectionClassName={styles.footerBackground}>
        <div className={styles.footerContents}>
          <a
            className={styles.footerLink}
            href="https://oliveai.com/our-story/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Olive
          </a>
          <a
            className={styles.footerLink}
            href="https://olive.page.link/olive-helps-terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>
          <a
            className={styles.footerLink}
            href="https://github.com/open-olive/loop-development-kit/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
          >
            LDK Open Source License
          </a>
          <div className={styles.footerSocialMedia}>
            <a
              href="https://www.instagram.com/oliveai__/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={'socialmedia-instagram.svg'} className={styles.footerSocialMediaImage} />
            </a>
            <a
              href="https://www.linkedin.com/company/oliveai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={'socialmedia-linkedin.svg'} className={styles.footerSocialMediaImage} />
            </a>
          </div>
        </div>
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
