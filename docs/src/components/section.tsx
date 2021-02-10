import * as React from "react"
import styles from "./section.module.scss"

interface SectionProps {
  sectionClassName?: string
}

export class Section extends React.Component<SectionProps> {
  public render(): JSX.Element {
    const sectionStyle =
      styles.section + " " + (this.props.sectionClassName ?? "")
    return (
      <section className={sectionStyle}>
        <div className={styles.content}>{this.props.children}</div>
      </section>
    )
  }
}
