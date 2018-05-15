import { isString } from './isString'

export const isStringSet = (value: Array<any>) : boolean => {
  return value.every(currentValue => isString(currentValue))
}
