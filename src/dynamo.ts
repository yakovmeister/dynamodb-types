import '@babel/polyfill'
import { iterateAndProcessObject, convertToDynamoSyntax } from './utils/helpers'
import { typeParseUpdate } from './update'

export default class DynamoTypes {
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
    if (typeof obj !== 'object') {
      return
    }

    return iterateAndProcessObject(
      obj, 
      DynamoTypes.parse, 
      convertToDynamoSyntax
    )
  }

  /**
   * Decode DynamoDB recognized JSON object to JSON object.
   * @static
   * @param obj DynamoDB recognized JSON object
   * @returns normal JSON object
   */
  static decode(obj: any) {
    if (typeof obj !== 'object') {
      return
    }

    return iterateAndProcessObject(obj, DynamoTypes.decode)
  }
}
