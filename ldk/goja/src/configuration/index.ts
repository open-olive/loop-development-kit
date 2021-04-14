/**
 * The GlobalConfiguration provides a way to configure a behavior for all aptitudes
 */
export interface Configuration {

  /**
   * Enables/disables process of OliveHelps events
   *
   * @param enabled - If enabled all events will be triggering aptitudes while olive helps window is in focus, by default it is disabled.
   */
  includeOliveHelpsEvents(enabled: boolean): void;
}

function includeOliveHelpsEvents(enabled: boolean): void {
  return oliveHelps.config.includeOliveHelpsEvents(enabled);
}

export const configuration: Configuration = {
  includeOliveHelpsEvents,
}
