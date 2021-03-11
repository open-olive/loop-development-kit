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
      <p className={styles.capabilityDescription}>{props.capability.description}</p>
    </section>
  );
};

export const Aptitude: React.FunctionComponent<IAptitudeData> = (props) => {
  return (
    <article className={styles.aptitude}>
      <h1 className={styles.aptitudeName}>{props.name} Aptitude</h1>
      <Links links={props.links} aptitude={props} />
      <p className={styles.aptitudeDescription}>{props.description}</p>
      <div className={styles.capabilities}>
        {props.capabilities?.map((capability) => (
          <Capability capability={capability} key={slugify(capability.name)} aptitude={props} />
        ))}
      </div>
    </article>
  );
};
