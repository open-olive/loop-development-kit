import * as React from 'react';
import styles from './section.module.scss';

interface SectionProps {
  sectionClassName?: string;
  sparkles?: boolean;
  ohs?: boolean;
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
        {this.props.ohs && (
          <div className={styles.sectionOhs}>
            {[...Array(126)].map((e, index) => (
              <span className={styles.sectionOh}>
                <svg
                  className={styles.sectionOhIcon}
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M50.7469 0.00779021C50.7469 7.42019 45.5625 13.516 38.045 13.516C35.0379 13.516 33.4176 11.7087 28.498 11.7087C19.5237 11.7087 12.2204 19.012 12.2204 27.9903C12.2204 36.9685 19.5237 44.2718 28.498 44.2718C37.4724 44.2718 44.7757 36.9685 44.7757 27.9903C44.7757 21.6412 41.2935 17.7228 39.7082 16.2114C43.9967 15.7986 47.7944 13.7225 50.4743 10.6375C52.005 12.5773 56.5 18.6732 56.5 27.9903C56.5 43.4344 43.9383 56 28.498 56C13.0578 56.0039 0.496094 43.4383 0.496094 27.9942C0.496094 12.6474 12.902 0.1597 28.2059 0L50.7469 0.00779021Z" fill="currentColor"/>
                </svg>
              </span>
            ))}
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
