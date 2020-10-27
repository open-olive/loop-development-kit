package ldk

import (
	"encoding/json"
	"errors"
	"sync"
)

// ErrUndocumentedStorageKey is the error returned if a plugin tries to access an undocumented storage key
var ErrUndocumentedStorageKey = errors.New("storage key is not present in documentation")

// StorageDocumentation is a struct containing storage documentation
type StorageDocumentation struct {
	mutex   sync.RWMutex
	entries map[string]StorageDocumentationEntry
}

// StorageDocumentationEntry contains the information about a single element in the storage documentation
type StorageDocumentationEntry struct {
	Description string `json:"description" yaml:"description"`
	Name        string `json:"name" yaml:"name"`
	Secure      bool   `json:"secure" yaml:"secure"`
}

// UnmarshalJSON populates the entries of the documentation from bytes of json
func (s *StorageDocumentation) UnmarshalJSON(data []byte) error {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	return json.Unmarshal(data, &s.entries)
}

// Keys returns a slice of all the keys in the documentation
func (s *StorageDocumentation) Keys() []string {
	var keys []string
	if len(s.entries) == 0 {
		return keys
	}

	s.mutex.RLock()
	defer s.mutex.RUnlock()
	for key := range s.entries {
		keys = append(keys, key)
	}
	return keys
}

// HasKey returns true if the provided key is present in the documentation
func (s *StorageDocumentation) HasKey(key string) bool {
	if len(s.entries) == 0 {
		return false
	}

	s.mutex.RLock()
	defer s.mutex.RUnlock()
	for k := range s.entries {
		if k == key {
			return true
		}
	}
	return false
}

// Entries returns a map of StorageDocumentationEntrys
func (s *StorageDocumentation) Entries() map[string]StorageDocumentationEntry {
	if len(s.entries) == 0 {
		return make(map[string]StorageDocumentationEntry)
	}

	s.mutex.RLock()
	defer s.mutex.RUnlock()
	return s.entries
}
