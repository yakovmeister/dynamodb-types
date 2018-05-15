import { isNumeric } from './isNumeric'

export const isNumericSet = (value: Array<any>) : boolean => {
  return value.every(currentValue => isNumeric(currentValue))
}
