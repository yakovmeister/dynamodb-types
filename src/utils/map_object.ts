type Callback = (value: [string, any], index?: number, array?: [string, any][]) => any

export const map_object = <T>(obj: T, callback: Callback) => {
  return Object.entries(obj)
    .map(callback)
    .reduce((previous: any, current: any) => {
      return { ...previous, ...current }
    })
}
