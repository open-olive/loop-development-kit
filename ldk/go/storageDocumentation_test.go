package ldk

import (
	"encoding/json"
	"sort"
	"testing"

	"github.com/kylelemons/godebug/pretty"
)

func TestStorageDocumentationUnmarshal(t *testing.T) {
	scenarios := map[string]struct {
		json                         string
		expectedStorageDocumentation *StorageDocumentation
		expErr                       bool
	}{
		"empty string": {
			json: "",
			expectedStorageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{},
			},
			expErr: true,
		},
		"empty object": {
			json: "{}",
			expectedStorageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{},
			},
		},
		"single entry": {
			json: `{"rate":{"name":"Rate","description":"The rate of the process."}}`,
			expectedStorageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
				},
			},
		},
		"multiple entries": {
			json: `{"rate":{"name":"Rate","description":"The rate of the process."},"count":{"name":"Count","description":"The count of the process."}}`,
			expectedStorageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
					"count": {
						Name:        "Count",
						Description: "The count of the process.",
					},
				},
			},
		},
	}

	for name, scenario := range scenarios {
		scenario := scenario // grab new lexical scope
		t.Run(name, func(t *testing.T) {
			var actualStorageDocumentation StorageDocumentation
			err := json.Unmarshal([]byte(scenario.json), &actualStorageDocumentation)
			if err != nil && !scenario.expErr {
				t.Errorf("failed to unmarshal: %v", err)
			}

			if diff := pretty.Compare(actualStorageDocumentation.entries, scenario.expectedStorageDocumentation.entries); diff != "" {
				t.Errorf("diff: (-actual +expected)\n%s", diff)
				t.FailNow()
			}
		})
	}
}

func TestStorageDocumentationKeys(t *testing.T) {
	scenarios := map[string]struct {
		storageDocumentation *StorageDocumentation
		expectedKeys         []string
	}{
		"unitialized map": {
			storageDocumentation: &StorageDocumentation{},
			expectedKeys:         []string{},
		},
		"empty": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{},
			},
			expectedKeys: []string{},
		},
		"one key": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
				},
			},
			expectedKeys: []string{
				"rate",
			},
		},
		"multiple keys": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
					"count": {
						Name:        "Count",
						Description: "The count of the process.",
					},
				},
			},
			expectedKeys: []string{
				"rate",
				"count",
			},
		},
	}

	for name, scenario := range scenarios {
		scenario := scenario // grab new lexical scope
		t.Run(name, func(t *testing.T) {
			actualKeys := scenario.storageDocumentation.Keys()

			// sort the keys so that the comparison doesn't have to worry about order
			sort.Strings(actualKeys)
			sort.Strings(scenario.expectedKeys)

			if diff := pretty.Compare(actualKeys, scenario.expectedKeys); diff != "" {
				t.Errorf("diff: (-actual +expected)\n%s", diff)
				t.FailNow()
			}
		})
	}
}

func TestStorageDocumentationHasKey(t *testing.T) {
	scenarios := map[string]struct {
		storageDocumentation *StorageDocumentation
		key                  string
		expected             bool
	}{
		"unitialized map": {
			storageDocumentation: &StorageDocumentation{},
			key:                  "bob",
			expected:             false,
		},
		"empty": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{},
			},
			key:      "bob",
			expected: false,
		},
		"one key false": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
				},
			},
			key:      "bob",
			expected: false,
		},
		"one key true": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
				},
			},
			key:      "rate",
			expected: true,
		},
		"multiple keys false": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
					"count": {
						Name:        "Count",
						Description: "The count of the process.",
					},
				},
			},
			key:      "bob",
			expected: false,
		},
		"multiple keys true": {
			storageDocumentation: &StorageDocumentation{
				entries: map[string]StorageDocumentationEntry{
					"rate": {
						Name:        "Rate",
						Description: "The rate of the process.",
					},
					"count": {
						Name:        "Count",
						Description: "The count of the process.",
					},
				},
			},
			key:      "rate",
			expected: true,
		},
	}

	for name, scenario := range scenarios {
		scenario := scenario // grab new lexical scope
		t.Run(name, func(t *testing.T) {
			actual := scenario.storageDocumentation.HasKey(scenario.key)
			if diff := pretty.Compare(actual, scenario.expected); diff != "" {
				t.Errorf("diff: (-actual +expected)\n%s", diff)
				t.FailNow()
			}
		})
	}
}
