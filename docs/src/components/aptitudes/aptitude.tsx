import React from 'react';
import { slugify } from 'underscore.string';
import styles from './aptitude.module.scss';
import { buildCapabilityId, buildCapabilityPath } from './aptitudePaths';
import { IAptitudeData, ICapabilityData } from './aptitudeData';
import { Links } from './links';
import { Link } from 'gatsby';

export const Capability: React.FunctionComponent<{
  capability: ICapabilityData;
  aptitude: IAptitudeData;
}> = (props) => {
  const id = buildCapabilityId(props.capability);
  return (
    <section className={styles.capability}>
      <h2 className={styles.capabilityName}>
        <Link to={buildCapabilityPath(props.capability, props.aptitude)} id={id}>
          {props.capability.name}
        </Link>
      </h2>
      <Links
        links={props.capability.links}
        capability={props.capability}
        aptitude={props.aptitude}
      />
      <div
        className={styles.capabilityDescription}
        dangerouslySetInnerHTML={{ __html: props.capability.description }}
      />
    </section>
  );
};

export const Aptitude: React.FunctionComponent<IAptitudeData> = (props) => {
  return (
    <article className={styles.aptitude}>
      <h1 className={styles.aptitudeName}>{props.name} Aptitude</h1>
      <Links links={props.links} aptitude={props} />
      <div
        className={styles.aptitudeDescription}
        dangerouslySetInnerHTML={{ __html: props.description }}
      />
      <div className={styles.capabilities}>
        {props.capabilities?.map((capability) => (
          <Capability capability={capability} key={slugify(capability.name)} aptitude={props} />
        ))}
      </div>
    </article>
  );
};
