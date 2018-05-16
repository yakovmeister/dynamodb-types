import { map_object } from './utils/map_object'
import { identifyAttributeType } from './utils/helpers'

const identifyValue = (value: any) => {
  return {
    [identifyAttributeType(value)]: value
  }
}

const write = (obj: any, action = 'ADD') => {
  return map_object(obj, ([key, value]) => ({
    [key]: {
      "Action": action,
      "Value": identifyValue(value)
    }
  }))
}

const del = (key: string) => {
  return {
    [key]: {
      "Action": "DELETE"
    }
  }
}

/**
 * Provide methods that allows you to generate an AttributeValueUpdate
 * JSON Format
 * @constant
 * @returns instantiated class with AttributeValueUpdate Generator methods.
 */
export const typeParseUpdate = (() => {
  return new class {
    value = {}

    put(obj: any) {
      this.value = {
        ...this.value,
        ...write(obj, 'PUT')
      }

      return this
    }

    add(obj: any) {
      this.value = {
        ...this.value,
        ...write(obj)
      }

      return this
    }

    delete(key: string) {
      this.value = {
        ...this.value,
        ...del(key)
      }

      return this
    }

    getValue() {
      return this.value
    }
  }
})()
