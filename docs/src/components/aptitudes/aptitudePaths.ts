import { slugify } from "underscore.string"
import { ICapabilityData, IAptitudeData } from "./aptitudeData"

export function buildSensorId(aptitudeData: IAptitudeData): string {
  return slugify(aptitudeData.name)
}

export function buildSensorPath(aptitudeData: IAptitudeData): string {
  return `/app/aptitudes/${buildSensorId(aptitudeData)}`
}

export function buildCapabilityId(capability: ICapabilityData): string {
  return slugify(capability.name)
}

export function buildCapabilityPath(
  capability: ICapabilityData,
  aptitudeData: IAptitudeData
): string {
  return `${buildSensorPath(aptitudeData)}#${buildCapabilityId(capability)}`
}
