type Callback = (value: [string, any], index?: number, array?: [string, any][]) => any

/**
 * Iterate through each object member and apply actions specified from callback
 * @param obj JSON Object to be iterated
 * @param callback callback containing the action to be done on each member
 * @returns JSON Object
 */
export const map_object = <T>(obj: T, callback: Callback) => {
  return Object.entries(obj)
    .map(callback)
    .reduce((previous: any, current: any) => {
      return { ...previous, ...current }
    })
}
