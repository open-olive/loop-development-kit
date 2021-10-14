import * as React from 'react';
import styles from './section.module.scss';

interface SectionProps {
  sectionClassName?: string;
  sparkles?: boolean;
  title: string;
  caption?: string;
}

export class Section extends React.Component<SectionProps> {
  public render(): JSX.Element {
    const sectionStyle = styles.section + ' ' + (this.props.sectionClassName ?? '');

    return (
      <section className={sectionStyle}>
        {/* This idea is from the main site */}
        {this.props.sparkles && (
          <div className={styles.sectionSparkles} aria-hidden>
            <div className={styles.sectionSparklePluses}>
              {[...Array(6)].map((e, index) => (
                <div className={styles.sectionSparklePlus} key={index} />
              ))}
            </div>
            <div className={styles.sectionSparkleCircles}>
              {[...Array(6)].map((e, index) => (
                <div className={styles.sectionSparkleCircle} key={index} />
              ))}
            </div>
            {/* These sparkles are a little too spicy! */}
            {/* <div className={styles.sectionSparkleScrapes}>
              {[...Array(6)].map((e, index) => (
                <div className={styles.sectionSparkleScrape} key={index} />
              ))}
            </div> */}
          </div>
        )}
        <div className={styles.sectionInner}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{this.props.title}</h2>
            <p className={styles.sectionCaption}>{this.props.caption}</p>
          </header>
          <div className={styles.sectionContent}>{this.props.children}</div>
        </div>
      </section>
    );
  }
}
