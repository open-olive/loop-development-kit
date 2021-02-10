import * as React from "react"
import styles from "./page-header.module.scss"

export interface IPageHeaderProps {
  title: React.ReactNode
}

export interface IPageHeaderState {}

export class PageHeader extends React.Component<
  IPageHeaderProps,
  IPageHeaderState
> {
  public render(): JSX.Element {
    return (
      <section className={styles.section}>
        <header className={styles.content}>
          <h1 className={styles.title}>{this.props.title}</h1>
          {this.props.children}
        </header>
        <div className={styles.sectionOverlay}/>
      </section>
    )
  }
}
