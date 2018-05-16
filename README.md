# DynamoDB Types
> Converts JSON Object to DynamoDB Required JSON Object format. 
  
[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
  
An easy way to convert your JSON data to DynamoDB required format, basically it just converts the value to { [data-type-key]: value } format,
and it supports nested JSON data.

## Installation  
  
```sh
npm install --save dynamodb-types
```  
  
## Usage example

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
  
## Development setup

You can clone the Github repository and run the following npm command.
  
```sh
npm install
```
  
## Release History

* 1.0.0
    * Initial Release

## Contributor

Jacob Baring – [@yakovmeister](https://twitter.com/yakovmeister) – so@tfwno.gf

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/yourname/github-link](https://github.com/dbader/)

## Contributing

1. Fork it (<https://github.com/yakovmeister/dynamodb-types/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/dynamodb-types.svg?style=flat-square
[npm-url]: https://npmjs.org/package/dynamodb-types
[npm-downloads]: https://img.shields.io/npm/dm/dynamodb-types.svg?style=flat-square
[travis-image]: https://travis-ci.org/yakovmeister/dynamodb-types.svg?branch=1.0
[travis-url]: https://travis-ci.org/yakovmeister/dynamodb-types
