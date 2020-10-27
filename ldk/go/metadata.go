package ldk

import (
	"time"
)

// Metadata is data about an entity.
type Metadata struct {
	// Author is the creator of the entity.
	Author string `json:"author" yaml:"author"`

	// Created is the time when the entity was created.
	Created time.Time `json:"created" yaml:"created"`

	// Description is a short explanation of the entity.
	Description string `json:"description" yaml:"description"`

	// Entrypoint is the path to the binary or the command (relative to the working directory)
	// to run on plugin start (defaults to "plugin"/"plugin.exe").
	Entrypoint []string `json:"entrypoint" yaml:"entrypoint"`

	// Icon is a URL for an icon representing this entity.
	Icon string `json:"icon" yaml:"icon"`

	// ID is a unique identifier for this entity that is consistent across all versions
	// and modifications of this entity.
	ID string `json:"id" yaml:"id"`

	// Name is a human readable identifier for this entity.
	Name string `json:"name" yaml:"name"`

	// Organization is the name of the organization to which the Author belongs.
	Organization string `json:"organization" yaml:"organization"`

	// Specification is a string indication which version
	// of the specification is being used to describe this entity.
	Specification string `json:"specification" yaml:"specification"`

	// Updated is the time when the entity was last updated.
	Updated time.Time `json:"updated" yaml:"updated"`

	// UploadID is the unique upload identifier for this entity that is specific to this
	// exact version of this entity. Unlike the ID, the UploadID will change with every
	// version and between operating systems.
	UploadID string `json:"uploadId" yaml:"uploadId"`

	// Version is a semver version of this entity.
	Version string `json:"version" yaml:"version"`
}
