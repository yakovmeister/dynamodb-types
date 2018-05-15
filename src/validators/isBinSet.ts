import { isBin } from './isBin'

export const isBinSet = (value: Array<any>) : boolean => {
  return value.every(currentValue => isBin(currentValue))
}
