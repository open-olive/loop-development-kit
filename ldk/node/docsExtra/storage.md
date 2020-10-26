# Storage

The host object provided to the plugin through `Start` provides the plugin with methods it can use for storing information.

## Applications

* Storing credentials provided by the user.
* Keeping track of data across restarts.

## Documentation

In order for a plugin to use storage, the plugin must first provide Sidekick with documentation. This is accomplished by including a new file `storage.json` with your plugin. The following is example documentation for a single entry.

```json
{
 "period": {
   "name": "Period",
   "description": "The time the sensor waits between sending example events"
  }
}
```

*NOTE* If the plugin attempts to access a key that is not documented, the request will be rejected.

## Methods

A method for removing the value of a key.

```javascript
storageDelete(key) => Promise
```

A method for removing the values of all documented keys.

```javascript
storageDeleteAll() => Promise
```

A method for checking if a value has been set for a key.

```javascript
storageHasKey(key) => Promise
```

A method for listing all documented keys.

```javascript
storageKeys() => Promise
```

A method for getting the value of a key.

```javascript
storageRead(key) => Promise
```

A method for getting the values of all documented keys.

```javascript
storageReadAll() => Promise
```

A method for setting the value of a key.

```javascript
storageWrite(key, value) => Promise
```
