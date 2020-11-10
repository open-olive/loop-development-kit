# Storage
The `Sidekick` struct provided to the loop in `LoopStart` provides the loop with methods (via the `Storage()` method) it can use for storing information.

## Applications
* Storing credentials provided by the user.
* Keeping track of data across restarts.

## Documentation
In order for a loop to use storage, the loop must first provide Olive Helps with documentation. This is accomplished by including a new file `storage.json` with your loop. The following is example documentation for a single entry.
```
{
 "period": {
        "name": "Period",
        "description": "The time the sensor waits between sending example events"
    }
}
```

*NOTE*: If the loop attempts to access a key that is not documented, the request will fail and an error will be returned. 

## Methods
A method for removing the value of a key.
```
StorageDelete(key string) error
```

A method for removing the values of all documented keys.
```
StorageDeleteAll() error
```

A method for checking if a value has been set for a key.
```
StorageHasKey(key string) (bool, error)
```

A method for listing all documented keys.
```
StorageKeys() ([]string, error)
```

A method for getting the value of a key.
```
StorageRead(key string) (string, error)
```

A method for getting the values of all documented keys.
```
StorageReadAll() (map[string]string, error)
```

A method for setting the value of a key.
```
StorageWrite(key, value string) error
```
