# Appsync VTL Tester

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![version](https://badgen.net/npm/v/appsync-template-tester)](https://www.npmjs.com/package/appsync-template-tester)
[![downloads](https://badgen.net/npm/dt/appsync-template-tester)](https://www.npmjs.com/package/appsync-template-tester)

Write unit tests for AWS AppSync VTL resolvers, with popular frameworks such as Jest.

## Use

### Example

```shell
yarn add appsync-template-tester --dev
```

```typescript
import Parser from 'appsync-template-tester';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load from a file (if not in a string already)
const templateFilePath = join(__dirname, './pathToFile.vtl');
const template = readFileSync(templateFilePath, {
  encoding: 'utf8',
});

// Create the resolver
const parser = new Parser(template);

test('Test the resolver', () => {
  // The Appsync Context (ctx) object
  const context = {
    // For example with a dynamoDB response resolver:
    result: {
      id: 'testId',
      // ...
    },
  };

  // parser.resolve() automatically typecasts
  const response = parser.resolve(context);

  // For convenience, the response is returned as a JS object rather than JSON
  expect(response.id).toBe('testId');
});
```

### Util helpers supported

This module supports all the provided core, map & time \$util methods, and most of the dynamodb methods. The underlying methods can be seen in the [Resolver Mapping Template Utility Reference
docs](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html).

Note: The errors list is also not returned (but \$util.error will throw an error).

### Extensions

AWS AppSync provides extension methods via `$extensions`, for example `$extensions.evictFromApiCache`. It can be useful to assert that your VTL template is invoking these methods, therefore, you can provide custom extensions with your own implementations. Note that default extension methods are not provided. To read more about AWS AppSync extensions see the [Extensions
docs](https://docs.aws.amazon.com/appsync/latest/devguide/extensions.html).

```javascript
  // Given.
  const mockEvictFromApiCache = jest.fn();
  const parser = new Parser(`$extensions.evictFromApiCache("Query", "users", {
    "context.arguments.id": $context.arguments.id
  })`);

  // When.
  parser.resolve({ arguments: { id: 10 } }, undefined, {
    evictFromApiCache: mockEvictFromApiCache,
  });

  // Then.
  expect(mockEvictFromApiCache).toHaveBeenCalledTimes(1)
  expect(mockEvictFromApiCache).toHaveBeenCalledWith("Query", "users", { "context.arguments.id": 10 })
```