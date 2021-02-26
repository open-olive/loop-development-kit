import { slugify } from "underscore.string"
import {ISensorCapabilityData, ISensorData} from "./sensorData";

export function buildSensorId(sensor: ISensorData): string {
  return slugify(sensor.name)
}

export function buildSensorPath(sensor: ISensorData): string {
  return `/app/sensors/${buildSensorId(sensor)}`
}

export function buildCapabilityId(capability: ISensorCapabilityData): string {
  return slugify(capability.name);
}

export function buildCapabilityPath(capability: ISensorCapabilityData, sensor: ISensorData): string {
  return `${buildSensorPath(sensor)}#${buildCapabilityId(capability)}`
}