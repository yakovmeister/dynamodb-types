import {
  isBin,
  isNull,
  isBinSet,
  isString,
  isBoolean,
  isNumeric,
  isStringSet,
  isNumericSet
} from '../validators'
import { AttributeType } from '../types/AttributeType'
import { map_object } from './map_object'

export const identifyAttributeType = (value: any) : AttributeType => {
  let type: AttributeType = 'NULL'

  if (Array.isArray(value)) {
    if (isBinSet(value)) {
      type = 'BS'
    } else if (isNumericSet(value)) {
      type = 'NS'
    } else if (isStringSet(value)) {
      type = 'SS'
    } else {
      type = 'L'
    }
  } else if (isBin(value)) {
    type = 'B'
  } else if (isBoolean(value)) {
    type = 'BOOL'
  } else if (isNumeric(value)) {
    type = 'N'
  } else if (isString(value)) {
    type = 'S'
  } else if (isNull(value)) {
    // nothing to do.
  } else {
    throw new Error('Invalid type.')
  }

  return type
}

export const convertToDynamoSyntax = (value: any, key?: string) => {
  if (!key) {
    return {
      [ identifyAttributeType(value) ] : value
    }
  }

  return {
    [key]: {
      [ identifyAttributeType(value) ] : value 
    }
  }
}

export const decodeDynamoSyntax = (value: any, key?: string) => {
  if (!key) {
    return value
  }

  return {
    [key]: value
  }
}

export const iterateAndConvertObject = (obj: any, callback: any) => {
  return map_object(obj, ([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return {
        [key]: callback(value)
      }
    }

    return convertToDynamoSyntax(value, key)
  })
}

export const iterateAndDecodeObject = (obj: any, callback: any) => {
  return map_object(obj, ([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      return {
        [key]: callback(value)
      }
    }

    return decodeDynamoSyntax(value)
  })
}
