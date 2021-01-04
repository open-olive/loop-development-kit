export interface Recall {
  Address1: string;
  Address2: string;
  Codes: string;
  Country: string;
  City: string;
  Classification: string;
  Date: string;
  Description: string;
  Distribution: string;
  Firm: string;
  ID: string;
  Quantity: string;
  Reason: string;
  RecallType: string;
  State: string;
  Type: string;
  Zip: string;
}

export interface RecallJSON {
  address_1: string;
  address_2: string;
  code_info: string;
  country: string;
  city: string;
  classification: string;
  recall_initiation_date: string;
  product_description: string;
  distribution_pattern: string;
  recalling_firm: string;
  recall_number: string;
  product_quantity: string;
  reason_for_recall: string;
  voluntary_mandated: string;
  state: string;
  product_type: string;
  postal_code: string;
}

/**
 * @param json - JSON object returned by the network sensor
 */
export function decodeRecall(json: RecallJSON): Recall {
  return {
    Address1: json.address_1,
    Address2: json.address_2,
    Codes: json.code_info,
    Country: json.country,
    City: json.city,
    Classification: json.classification,
    Date: json.recall_initiation_date,
    Description: json.product_description,
    Distribution: json.distribution_pattern,
    Firm: json.recalling_firm,
    ID: json.recall_number,
    Quantity: json.product_quantity,
    Reason: json.reason_for_recall,
    RecallType: json.voluntary_mandated,
    State: json.state,
    Type: json.product_type,
    Zip: json.postal_code,
  };
}
