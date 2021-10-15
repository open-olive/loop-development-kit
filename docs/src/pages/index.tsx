import React from 'react';
import { Layout } from '../components/layout';
import styles from './index.module.scss';
import sectionStyles from '../components/section.module.scss';
import './index.scss';
import { languages, downloadMacUrl, downloadWindowsUrl } from '../references';
import { Section } from '../components/section';
import { Button } from '../components/button';
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
          className={styles.aptitudeTitleIcon}
        />
        <span className={styles.aptitudeTitleLabel}>{props.aptitude.name}</span>
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
      <div className={styles.guideHeader}>
        <h3 className={styles.guideTitle}>{props.title}</h3>
        <p className={styles.guideDescription}>{props.description}</p>
      </div>
      <p className={styles.guideHint}>
        <span className={styles.guideHintLabel}>Read more</span>
        <span className={styles.guideHintIcon}>
          <svg width="24" height="24">
            <g id="icon-arrow_right_alt" viewBox="0 0 24 24">
              <path d="M16.031 11.016v-3l3.984 3.984-3.984 3.984v-3h-12.047v-1.969h12.047z" fill="currentColor"></path>
            </g>
          </svg>
        </span>
      </p>
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

  return (
    <Layout>
      <V2Menu />
      <Section
        sectionClassName={sectionStyles.sectionMist}
        ohs
        title="Welcome To the Olive Helps Developer Hub"
        caption="Ready to put your solution in front of a new group of healthcare users? Get started using
        the Loop Developer Kit (LDK)."
      >
        <div className={sectionStyles.sectionActions}>
          <Button
            href="guides/getting-started"
            label="Get started"
            theme="FilledPurple"
          />
          <span
            onClick={() => {
              window.gtag('event', 'Link out', {
                event_category: 'Navigation',
                event_label: 'NPM',
                value: 0,
              });
            }}
          >
            <Button
              href="https://www.npmjs.com/package/@oliveai/ldk"
              iconAfter={
                <svg width="24" height="24">
                  <g id="icon-arrow_right_alt" viewBox="0 0 24 24">
                    <path d="M16.031 11.016v-3l3.984 3.984-3.984 3.984v-3h-12.047v-1.969h12.047z" fill="currentColor"></path>
                  </g>
                </svg>
              }
              label="Access the LDK"
              target
              theme="Plain"
            />
          </span>
        </div>
      </Section>
      <Section
        sectionClassName={sectionStyles.sectionSun}
        title="Download Olive Helps"
        caption="First things first: Download Olive Helps and create your Olive account. Then, visit the
        Loop Library to become a Loop Author and get building."
      >
        <div className={sectionStyles.sectionActions}>
          <article
            onClick={() => {
              window.gtag('event', 'Download Olive Helps', {
                event_category: 'Downloads',
                event_label: 'Windows',
                value: 0,
              });
            }}
          >
            <Button
              href={downloadWindowsUrl}
              iconBefore={
                <svg width="28" height="28">
                  <g id="icon-windows" viewBox="0 0 28 28">
                    <path d="M10.656 15.719v10.172l-10.656-1.469v-8.703h10.656zM10.656 4.109v10.297h-10.656v-8.828zM26 15.719v12.281l-14.172-1.953v-10.328h14.172zM26 2v12.406h-14.172v-10.453z" fill="currentColor"></path>
                  </g>
                </svg>
              }
              label="Windows"
              theme="FilledWhite"
            />
          </article>
          <article
            onClick={() => {
              window.gtag('event', 'Download Olive Helps', {
                event_category: 'Downloads',
                event_label: 'Mac',
                value: 0,
              });
            }}
          >
            <Button
              href={downloadMacUrl}
              iconBefore={
                <svg width="22" height="28">
                  <g id="icon-apple" viewBox="0 0 22 28">
                    <path d="M21.766 18.984c-0.391 1.234-1.016 2.547-1.922 3.906-1.344 2.047-2.688 3.063-4.016 3.063-0.531 0-1.25-0.172-2.188-0.5-0.922-0.344-1.719-0.5-2.359-0.5-0.625 0-1.375 0.172-2.219 0.516-0.859 0.359-1.547 0.531-2.063 0.531-1.609 0-3.156-1.359-4.703-4.047-1.516-2.688-2.297-5.297-2.297-7.859 0-2.391 0.594-4.328 1.766-5.844 1.172-1.5 2.641-2.25 4.438-2.25 0.766 0 1.672 0.156 2.766 0.469 1.078 0.313 1.797 0.469 2.156 0.469 0.453 0 1.203-0.172 2.234-0.531 1.031-0.344 1.937-0.531 2.703-0.531 1.25 0 2.359 0.344 3.328 1.016 0.547 0.375 1.094 0.906 1.625 1.563-0.812 0.688-1.406 1.297-1.781 1.844-0.672 0.969-1.016 2.047-1.016 3.234 0 1.281 0.359 2.453 1.078 3.484s1.547 1.687 2.469 1.969zM15.891 0.656c0 0.641-0.156 1.359-0.453 2.125-0.313 0.781-0.797 1.5-1.453 2.156-0.562 0.562-1.125 0.938-1.687 1.125-0.359 0.109-0.891 0.203-1.625 0.266 0.031-1.547 0.438-2.891 1.219-4.016s2.094-1.891 3.906-2.312c0.031 0.141 0.063 0.25 0.078 0.344 0 0.109 0.016 0.203 0.016 0.313z" fill="currentColor"></path>
                  </g>
                </svg>
              }
              label="Mac"
              theme="FilledWhite"
            />
          </article>
        </div>
      </Section>
      <Section
        sectionClassName={sectionStyles.sectionMist}
        title="Aptitude is everything"
        caption="As you build Loops, leverage Olive’s collection of Aptitudes — tools and capabilities that
        capture important user information. Aptitudes enable Sensors, which let Olive understand
        how users are working and when to offer help."
      >
        <div className={styles.aptitudeList}>{aptitudeItems}</div>
      </Section>
      <Section
        sectionClassName={sectionStyles.sectionDark}
        title="Design system"
        caption="Create beautiful Loops that seamlessly integrated with Olive Helps."
      >
        <div className={sectionStyles.sectionActions}>
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
            <Button
              href="https://coda.io/@olive-helps-design/design-system"
              label="View the design system"
              target
              theme="FilledWhite"
            />
          </p>
        </div>
      </Section>
      <Section
        sectionClassName={sectionStyles.sectionMist}
        title="Additional Resources"
      >
        <div className={styles.guideList}>{guideItems}</div>
        <div className={styles.needHelpBanner}>
          <div className={styles.needHelpHeader}>
            <h3 className={styles.needHelpTitle}>Need help getting started?</h3>
            <p className={styles.needHelpSubtext}>
              Submit a request or email your Olive Helps developer contact for further assistance.
            </p>
          </div>
          <div className={sectionStyles.sectionActions}>
            <div
              onClick={() => {
                window.gtag('event', 'Link out', {
                  event_category: 'Navigation',
                  event_label: 'Support',
                  value: 0,
                });
              }}
            >
              <Button
                href="https://github.com/open-olive/loop-development-kit/issues"
                label="Submit a request"
                target
                theme="FilledPurple"
              />
            </div>
          </div>
        </div>
      </Section>
      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLinks}>
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
          </div>
          <div className={styles.footerSocials}>
            <a
              className={styles.footerSocial}
              href="https://www.instagram.com/oliveai__/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className={styles.footerSocialImage} src={'socialmedia-instagram.svg'} />
            </a>
            <a
              className={styles.footerSocial}
              href="https://www.linkedin.com/company/oliveai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image className={styles.footerSocialImage} src={'socialmedia-linkedin.svg'} />
            </a>
          </div>
        </div>
      </div>
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
