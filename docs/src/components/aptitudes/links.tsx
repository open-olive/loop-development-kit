import React from "react"
import * as underscoreString from "underscore.string"
import {
  IAptitudeData,
  ICapabilityData,
  LDKLinkActive,
  LDKLinks,
} from "./aptitudeData"
import styles from "./links.module.scss"
import { SupportedLanguage } from "../../references"

interface ILogoProps {
  fillColor?: string
}

export const GoLink: React.FunctionComponent<ILogoProps> = props => (
  <svg viewBox="0 0 128 128" className={styles.linkLogo}>
    <g>
      <path
        fill={props.fillColor || "black"}
        d="M108.2 64.8c-.1-.1-.2-.2-.4-.2l-.1-.1c-.1-.1-.2-.1-.2-.2l-.1-.1c-.1 0-.2-.1-.2-.1l-.2-.1c-.1 0-.2-.1-.2-.1l-.2-.1c-.1 0-.2-.1-.2-.1-.1 0-.1 0-.2-.1l-.3-.1c-.1 0-.1 0-.2-.1l-.3-.1h-.1l-.4-.1h-.2c-.1 0-.2 0-.3-.1h-2.3c-.6-13.3.6-26.8-2.8-39.6 12.9-4.6 2.8-22.3-8.4-14.4-7.4-6.4-17.6-7.8-28.3-7.8-10.5.7-20.4 2.9-27.4 8.4-2.8-1.4-5.5-1.8-7.9-1.1v.1c-.1 0-.3.1-.4.2-.1 0-.3.1-.4.2h-.1c-.1 0-.2.1-.4.2h-.1l-.3.2h-.1l-.3.2h-.1l-.3.2s-.1 0-.1.1l-.3.2s-.1 0-.1.1l-.3.2s-.1 0-.1.1l-.3.2-.1.1c-.1.1-.2.1-.2.2l-.1.1-.2.2-.1.1c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1c-.1.1-.1.2-.2.2l-.1.1-.1.3s0 .1-.1.1l-.1.3s0 .1-.1.1l-.1.3s0 .1-.1.1l-.1.3s0 .1-.1.1c.4.3.4.4.4.4v.1l-.1.3v.1c0 .1 0 .2-.1.3v3.1c0 .1 0 .2.1.3v.1l.1.3v.1l.1.3s0 .1.1.1l.1.3s0 .1.1.1l.1.3s0 .1.1.1l.2.3s0 .1.1.1l.2.3s0 .1.1.1l.2.3.1.1.3.3.3.3h.1c1 .9 2 1.6 4 2.2v-.2c-4.2 12.6-.7 25.3-.5 38.3-.6 0-.7.4-1.7.5h-.5c-.1 0-.3 0-.5.1-.1 0-.3 0-.4.1l-.4.1h-.1l-.4.1h-.1l-.3.1h-.1l-.3.1s-.1 0-.1.1l-.3.1-.2.1c-.1 0-.2.1-.2.1l-.2.1-.2.1c-.1 0-.2.1-.2.1l-.2.1-.4.3c-.1.1-.2.2-.3.2l-.4.4-.1.1c-.1.2-.3.4-.4.5l-.2.3-.3.6-.1.3v.3c0 .5.2.9.9 1.2.2 3.7 3.9 2 5.6.8l.1-.1c.2-.2.5-.3.6-.3h.1l.2-.1c.1 0 .1 0 .2-.1.2-.1.4-.1.5-.2.1 0 .1-.1.1-.2l.1-.1c.1-.2.2-.6.2-1.2l.1-1.3v1.8c-.5 13.1-4 30.7 3.3 42.5 1.3 2.1 2.9 3.9 4.7 5.4h-.5c-.2.2-.5.4-.8.6l-.9.6-.3.2-.6.4-.9.7-1.1 1c-.2.2-.3.4-.4.5l-.4.6-.2.3c-.1.2-.2.4-.2.6l-.1.3c-.2.8 0 1.7.6 2.7l.4.4h.2c.1 0 .2 0 .4.1.2.4 1.2 2.5 3.9.9 2.8-1.5 4.7-4.6 8.1-5.1l-.5-.6c5.9 2.8 12.8 4 19 4.2 8.7.3 18.6-.9 26.5-5.2 2.2.7 3.9 3.9 5.8 5.4l.1.1.1.1.1.1.1.1s.1 0 .1.1c0 0 .1 0 .1.1 0 0 .1 0 .1.1h2.1000000000000005s.1 0 .1-.1h.1s.1 0 .1-.1h.1s.1 0 .1-.1c0 0 .1 0 .1-.1l.1-.1s.1 0 .1-.1l.1-.1h.1l.2-.2.2-.1h.1l.1-.1h.1l.1-.1.1-.1.1-.1.1-.1.1-.1.1-.1.1-.1v-.1s0-.1.1-.1v-.1s0-.1.1-.1v-.1s0-.1.1-.1v-1.4000000000000001s-.3 0-.3-.1l-.3-.1v-.1l.3-.1s.2 0 .2-.1l.1-.1v-2.1000000000000005s0-.1-.1-.1v-.1s0-.1-.1-.1v-.1s0-.1-.1-.1c0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1 0 0 0-.1-.1-.1l-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1v-.1l-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1-.1c2-1.9 3.8-4.2 5.1-6.9 5.9-11.8 4.9-26.2 4.1-39.2h.1c.1 0 .2.1.2.1h.30000000000000004s.1 0 .1.1h.1s.1 0 .1.1l.2.1c1.7 1.2 5.4 2.9 5.6-.8 1.6.6-.3-1.8-1.3-2.5zm-72.2-41.8c-3.2-16 22.4-19 23.3-3.4.8 13-20 16.3-23.3 3.4zm36.1 15c-1.3 1.4-2.7 1.2-4.1.7 0 1.9.4 3.9.1 5.9-.5.9-1.5 1-2.3 1.4-1.2-.2-2.1-.9-2.6-2l-.2-.1c-3.9 5.2-6.3-1.1-5.2-5-1.2.1-2.2-.2-3-1.5-1.4-2.6.7-5.8 3.4-6.3.7 3 8.7 2.6 10.1-.2 3.1 1.5 6.5 4.3 3.8 7.1zm-7-17.5c-.9-13.8 20.3-17.5 23.4-4 3.5 15-20.8 18.9-23.4 4zM41.7 17c-1.9 0-3.5 1.7-3.5 3.8 0 2.1 1.6 3.8 3.5 3.8s3.5-1.7 3.5-3.8c0-2.1-1.5-3.8-3.5-3.8zm1.6 5.7c-.5 0-.8-.4-.8-1 0-.5.4-1 .8-1 .5 0 .8.4.8 1 0 .5-.3 1-.8 1zM71.1 16.1c-1.9 0-3.4 1.7-3.4 3.8 0 2.1 1.5 3.8 3.4 3.8s3.4-1.7 3.4-3.8c0-2.1-1.5-3.8-3.4-3.8zm1.6 5.6c-.4 0-.8-.4-.8-1 0-.5.4-1 .8-1s.8.4.8 1-.4 1-.8 1z"
      />
    </g>
  </svg>
)

export const DotNetLogo: React.FunctionComponent<ILogoProps> = props => (
  <svg viewBox="0 0 128 128" className={styles.linkLogo}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      fill={props.fillColor || "#1384C8"}
      d="M82.108 78.432c.479-1.232 1.022-2.445 1.427-3.701 2.288-7.097 4.554-14.2 6.805-21.309.865-2.731 1.813-5.42 3.515-7.767 2.692-3.709 6.442-5.652 10.88-6.331 1.741-.266 3.518-.389 5.28-.406 5.267-.05 10.536-.015 15.804-.01.28 0 .56.029.957.052-.129.304-.199.525-.311.724-1.955 3.494-3.872 7.009-5.885 10.468-3.505 6.022-7.016 12.042-10.631 17.998-2.319 3.819-4.834 7.52-7.687 10.974-2.105 2.548-4.321 4.984-7.146 6.77-1.925 1.217-3.981 1.929-6.315 1.917-8.278-.045-16.556-.012-24.834-.024-2.461-.004-4.568-.941-6.356-2.603-2.563-2.381-4.093-5.412-5.345-8.608-2.284-5.835-3.563-11.951-5.031-18.014-.688-2.838-1.47-5.654-2.215-8.478-.048-.183-.142-.354-.25-.617l-.577.542c-3.228 3.207-6.071 6.741-8.615 10.498-.693 1.024-.926 2.374-1.313 3.591-1.424 4.47-2.722 8.983-4.264 13.411-1.477 4.242-4.125 7.616-8.264 9.61-2.42 1.165-5.004 1.795-7.689 1.855-3.98.088-7.962.098-11.943.134-.952.009-.996-.069-.748-.99 1.707-6.338 3.87-12.514 6.58-18.492 2.794-6.167 6.085-12.048 10.231-17.419 2.823-3.657 5.941-7.031 9.843-9.582 1.979-1.293 4.083-2.315 6.477-2.584.394-.045.793-.073 1.189-.073 8.478-.004 16.956.082 25.433-.039 4.547-.065 7.839 1.855 10.304 5.515 1.533 2.276 2.63 4.761 3.553 7.328 1.861 5.178 3.018 10.547 4.325 15.878.748 3.051 1.581 6.081 2.379 9.12.06.228.157.446.238.668l.199-.006z"
    />
  </svg>
)

export const NodeLogo: React.FunctionComponent<ILogoProps> = props => (
  <svg viewBox="0 0 128 128" className={styles.linkLogo}>
    <path
      fill={props.fillColor || "#83CD29"}
      d="M112.771 30.334l-44.097-25.605c-2.781-1.584-6.402-1.584-9.205 0l-44.568 25.605c-2.87 1.651-4.901 4.754-4.901 8.073v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623c-.712 0-2.306 1.061-2.306 1.773v50.49c0 3.896-3.524 7.773-10.11 4.48l-12.167-7.013c-.424-.23-.723-.693-.723-1.181v-51.142c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754c1.417.82 3.027 1.246 4.647 1.246 1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083v-51.142c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
    />
  </svg>
)

export const languages: SupportedLanguage[] = ["go", "node", "dotnet"]

function languageLogo(language: SupportedLanguage): React.ReactNode {
  const color = "#000000"
  switch (language) {
    case "go":
      return <GoLink fillColor={color} />
    case "node":
      return <NodeLogo fillColor={color} />
    case "dotnet":
      return <DotNetLogo fillColor={color} />
  }
}

function buildGoLink(interfaceName: string, methodName?: string): string {
  const renderedMethodName = methodName ? `.${methodName}` : ""
  return `https://pkg.go.dev/github.com/open-olive/loop-development-kit/ldk/go#${interfaceName}${renderedMethodName}`
}

function buildNodeLink(interfaceName: string, methodName?: string): string {
  const renderedInterfaceName = interfaceName.toLowerCase()
  const renderedMethodName = methodName ? `#${methodName.toLowerCase()}` : ""
  return `https://open-olive.github.io/loop-development-kit/ldk/node/interfaces/${renderedInterfaceName}.html${renderedMethodName}`
}

function linkBuilder(
  language: SupportedLanguage,
  aptitude: IAptitudeData,
  capability?: ICapabilityData,
  link?: string
): string | undefined {
  if (link && link.startsWith("https")) {
    return link
  }
  const aptitudeLink = aptitude.links?.[language]
  if (aptitudeLink == null) {
    return undefined
  }
  const capabilityLink = capability?.links?.[language]
  switch (language) {
    case "go":
      return buildGoLink(aptitudeLink, capabilityLink)
    case "node":
      return buildNodeLink(aptitudeLink, capabilityLink)
    case "dotnet":
      return undefined
  }
}

export interface ILinkProps {
  links: LDKLinkActive | undefined
  aptitude: IAptitudeData
  capability?: ICapabilityData
}

export const Links: React.FunctionComponent<ILinkProps> = props => {
  if (props.links == undefined) {
    return null
  }
  return (
    <ul className={styles.ldkLinks}>
      {languages.map(language => {
        const link = props.links![language]
        const href = linkBuilder(
          language,
          props.aptitude,
          props.capability,
          link
        )
        if (href == null) {
          return
        }
        return (
          <li className={styles.ldkLink}>
            <a href={href} target="_blank" className={styles.ldkLinkInternal}>
              {languageLogo(language)}
              <span className={styles.ldkLinkName}>{language}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
