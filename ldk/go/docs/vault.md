# Vault
The `Sidekick` struct provided to the loop in `LoopStart` provides the loop with methods (via the `Vault()` method) it can use for storing sensitive information.

## Applications
* Storing credentials provided by the user.
* Keeping track of limited amounts of sensitive data across restarts.

## Methods
A method for removing the value of a key.
```
Delete(key string) error
```

A method for checking if a value has been set for a key.
```
Exists(key string) (bool, error)
```

A method for getting the value of a key.
```
Read(key string) (string, error)
```

A method for setting the value of a key.
```
Write(key, value string) error
```
