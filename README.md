# DynamoDB Types  (Coming Soon)
  
Converts JSON Object to DynamoDB JSON Object format.  
  
## Usage  
  
```javascript   

let { DynamoTypes } = require('dynamodb-types')

DynamoTypes.parse({
  id: 1,
  name: 'John Doe',
  age: 16
})
//  The code above would convert the JSON Object to:
//  {
//    id: {
//      N: 1
//    },
//    name: {
//      S: 'John Doe'
//    },
//    age: {
//      N: 16
//    }
//  }

// You can also use the DynamoTypes.parseUpdate to generate an AttributeValueUpdate Format
// Example:
DynamoTypes.parseUpdate
  .add({ name: 'John Doe' })
  .put({ age: 12 })
  .delete('postal_id')
  .getValue()

//  The code above would convert the JSON Object to:
// {  
//    "name":{  
//       "Action":"ADD",
//       "Value":{  
//          "S":"John Doe"
//       }
//    },
//    "age":{  
//       "Action":"PUT",
//       "Value":{  
//          "N":12
//       }
//    },
//    "postal_id":{  
//       "Action":"DELETE"
//    }
// }
```


