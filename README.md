# Buggy Library-Client

The client implementation for Buggy library access.

# Usage

The Buggy Library uses a REST Interface. You can either connect to an external server or create a local server via a JSON document.

The API exposes the following methods:

 - `fromFile(file)`: Specify a local JSON file. The client will start a local REST server and connect to it.
 - `fromJSON(json)`: Specify a JSON document as a Javascript Object. The client will start a local REST server and connect to it.
 - `connect(URL)`: Connect to a server via an URL like 'http://localhost:8818'.

All three methods return the same promise-based API to access and manipulate the library.

| Method            | Description                         |
|-------------------|-------------------------------------|
|`info()`           | Get basic server information like library version and server type.    |
|`components()`     | Get all components in the library.  |
|`componentCount()` | Get the number of all components defined in the library               |
|`component(meta, [version])` | Get a specific component with a given meta key. The version is optional and it will get the newest version if no version is specified. |
|`addComponent(component)`    | Insert a new component via a JSON object. The component must be valid and it must be the only component with that meta key in that version. |
|`meta(component, [key], [version])`| Get meta information for a component. The key and version are optional, if you don't define them you get all keys of the latest versionen. You can omit the version or the key by not specifying them or setting them to `null`. |
|`addMeta(component, key, value, [version])`| Add meta information for a component and a specific key. If you don't specify a version the key will be set in the latest version. |
|`config(key)` | Get the configuration value for a specific key. |
|`setConfig(key, value)` | Set the configuration Value for a specific key. |
|`export()` | Get a copy of the whole database. |

# Example

```js
import {fromFile} from '@buggyorg/library-client'

var client = fromFile('myLibrary.json')
client.info()
  .then((info) => console.log(info))
```
