import { map_object } from './utils/map_object'
import { identifyAttributeType } from './utils/helpers'

const identifyValue = (value: any) => {
  return {
    [identifyAttributeType(value)]: value
  }
}

const put = (obj: any) => {
  return map_object(obj, ([key, value]) => ({
    [key]: {
      "Action": "PUT",
      "Value": identifyValue(value)
    }
  }))
}

const add = (obj: any) => {
  return map_object(obj, ([key, value]) => ({
    [key]: {
      "Action": "ADD",
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

export const typeParseUpdate = (() => {
  return new class {
    value = {}

    put(obj: any) {
      this.value = {
        ...this.value,
        ...put(obj)
      }

      return this
    }

    add(obj: any) {
      this.value = {
        ...this.value,
        ...add(obj)
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
