import { expect } from 'chai'
import { typeParse, typeParseUpdate } from '../src/dynamo'
import { map_object } from '../src/utils/map_object'

describe('DynamoDB-Types', () => {
  it('should convert json to attributevalueupdate format', () => {
    expect(JSON.stringify(typeParseUpdate
      .add({ name: 'John Doe' })
      .put({ age: 12 })
      .delete('postal_id')
      .getValue()
    )).to.equal(JSON.stringify({"name":{"Action":"ADD","Value":{"S":"John Doe"}},"age":{"Action":"PUT","Value":{"N":12}},"postal_id":{"Action":"DELETE"}}))
  })
})
