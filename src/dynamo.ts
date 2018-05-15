import {
  isBin,
  isNull,
  isBinSet,
  isString,
  isBoolean,
  isNumeric,
  isStringSet,
  isNumericSet
} from './validators'
import { AttributeType } from './types/AttributeType'
import { map_object } from './utils/map_object'

const typeParse = (obj: any) => {
  if (!Object.keys(obj)) {
    return
  }

  return iterateAndConvertObject(obj)
}

const jsonParse = (obj: any) => {}

const typeParseUpdate = () => {
  let value = {}
  return {
    put: (obj: any) => {
      value = {
        ...value,
        ...map_object(obj, ([key, value]) => ({
          [key]: {
            "Action": "PUT",
            "Value": {
              [identifyAttributeType(value)]: value
            }
          }
        }))
      }
    },
    add: (obj: any) => {
      value = {
        ...value,
        ...map_object(obj, ([key, value]) => ({
          [key]: {
            "Action": "ADD",
            "Value": {
              [identifyAttributeType(value)]: value
            }
          }
        }))
      }
    },
    delete: (key: string) => {
      value = {
        ...value,
        [key]: {
          "Action": "DELETE"
        }
      }
    },
    getValue: () => {
      return value
    }
  }
}

const identifyAttributeType = (value: any) : AttributeType => {
  let type: AttributeType = 'NULL'

  if (Array.isArray(value)) {
    if (isBinSet(value)) {
      type = 'BS'
    } else if (isNumericSet(value)) {
      type = 'NS'
    } else if (isStringSet(value)) {
      type = 'SS'
    }
    type = 'L'
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

const convertToDynamoSyntax = (value: any, key?: string) => {
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

const iterateAndConvertObject = (obj: any) => {
  map_object(obj, ([key, value]) => {
    if (Object.keys(value)) {
      return {
        [key]: typeParse(value)
      }
    }

    return convertToDynamoSyntax(value, key)
  })
}

export { typeParse, typeParseUpdate }