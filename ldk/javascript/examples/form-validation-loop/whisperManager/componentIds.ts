import { newGuid } from '../utils';

export default class ComponentIds {
  patientNameId: string;

  patientVisitDateId: string;

  patientSsnId: string;

  patientPhoneId: string;

  patientAgeId: string;

  patientEmailId: string;

  patientEntryId: string;

  patientConcentId: string;

  patientPainLevelId: string;

  constructor() {
    this.patientNameId = newGuid();
    this.patientVisitDateId = newGuid();
    this.patientSsnId = newGuid();
    this.patientPhoneId = newGuid();
    this.patientAgeId = newGuid();
    this.patientEmailId = newGuid();
    this.patientEntryId = newGuid();
    this.patientConcentId = newGuid();
    this.patientPainLevelId = newGuid();
  }
}
