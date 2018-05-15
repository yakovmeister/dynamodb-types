import { iterateAndConvertObject } from './utils/helpers'
import { typeParseUpdate } from './update'

export class DynamoTypes {
  /**
   * @static
   * @see typeParseUpdate
   */
  static parseUpdate = typeParseUpdate

  /**
   * Parse JSON object to DynamoDB recognized JSON object.
   * @static
   * @param obj normal JSON object
   * @returns DynamoDB recognized JSON object
   */
  static parse(obj: any) {
    if (!Object.keys(obj)) {
      return
    }

    return iterateAndConvertObject(obj, DynamoTypes.parse)
  }
}
