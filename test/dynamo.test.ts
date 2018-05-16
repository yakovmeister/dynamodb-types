import { expect } from 'chai'
import DynamoTypes from '../src/dynamo'

describe('DynamoDB-Types', () => {
  it('should convert json to attributevalueupdate format', () => {
    expect(JSON.stringify(DynamoTypes.parseUpdate
      .add({ name: 'John Doe' })
      .put({ age: 12 })
      .delete('postal_id')
      .getValue()
    )).to.equal(JSON.stringify({"name":{"Action":"ADD","Value":{"S":"John Doe"}},"age":{"Action":"PUT","Value":{"N":12}},"postal_id":{"Action":"DELETE"}}))
  })

  it('should convert dynamodb encoded json to normal json', () => {
    let value = {
      name: 'John Doe',
      age: 12,
      address: 'Asgard',
      phone_numbers: {
        home: '211-232-1233',
        work: '911'
      },
      aliases: [
        'No name',
        'unknown',
        'Joker'
      ]
    }

    expect(JSON.stringify(DynamoTypes.decode(DynamoTypes.parse(value)))).to.equal(JSON.stringify(value))
  })

  it('should identify data as SS', () => {
    let value = {
      data: [
        "string1",
        "string2",
        "string3"
      ]
    }

    expect(Object.keys(DynamoTypes.parse(value).data)[0]).to.equal('SS')
  })

  it('should identify data as NS', () => {
    let value = {
      data: [
        5,
        54353.12,
        3.14
      ]
    }

    expect(Object.keys(DynamoTypes.parse(value).data)[0]).to.equal('NS')
  })

  it('should identify data as L', () => {
    let value = {
      data: [
        5,
        54353.12,
        "3.14"
      ]
    }

    expect(Object.keys(DynamoTypes.parse(value).data)[0]).to.equal('L')
  })
})
