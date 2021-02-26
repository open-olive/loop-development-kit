import { slugify } from "underscore.string"
import { ICapabilityData, IAptitudeData } from "./aptitudeData"

export function buildAptitudeId(aptitudeData: IAptitudeData): string {
  return slugify(aptitudeData.name)
}

export function buildAptitudePath(aptitudeData: IAptitudeData): string {
  return `/app/aptitudes/${buildAptitudeId(aptitudeData)}`
}

export function buildCapabilityId(capability: ICapabilityData): string {
  return slugify(capability.name)
}

export function buildCapabilityPath(
  capability: ICapabilityData,
  aptitudeData: IAptitudeData
): string {
  return `${buildAptitudePath(aptitudeData)}#${buildCapabilityId(capability)}`
}
