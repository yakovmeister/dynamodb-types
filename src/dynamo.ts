import { iterateAndConvertObject } from './utils/helpers'
import { typeParseUpdate } from './update'

const typeParse = (obj: any) => {
  if (!Object.keys(obj)) {
    return
  }

  return iterateAndConvertObject(obj, typeParse)
}

export { typeParse, typeParseUpdate }
