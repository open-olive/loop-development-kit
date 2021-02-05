# Storage

The sensors object provided to the Loop through `Start` provides the Loop with methods it can use for storing information.

## Applications

* Storing credentials provided by the user.
* Keeping track of data across restarts.

## Methods

A method for removing the value of a key.

```javascript
storageDelete(key) => Promise
```

A method for removing the values of all storage keys.

```javascript
storageDeleteAll() => Promise
```

A method for checking if a value has been set for a key.

```javascript
storageHasKey(key) => Promise
```

A method for listing all storage keys.

```javascript
storageKeys() => Promise
```

A method for getting the value of a key.

```javascript
storageRead(key) => Promise
```

A method for getting the values of all storage keys.

```javascript
storageReadAll() => Promise
```

A method for setting the value of a key.

```javascript
storageWrite(key, value) => Promise
```
