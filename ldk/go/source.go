package ldk

// Source is information about the origin of the data.
type Source struct {
	// Author is the creator of the entity.
	Author string `json:"author" yaml:"author"`

	// Icon is a URL for an icon representing this entity.
	Icon string `json:"icon" yaml:"icon"`

	// ID is a unique identifier for this entity that is consistent across all versions
	// and modifications of this entity.
	ID string `json:"id" yaml:"id"`

	// Name is a human readable identifier for this entity.
	Name string `json:"name" yaml:"name"`

	// Organization is the name of the organization to which the Author belongs.
	Organization string `json:"organization" yaml:"organization"`

	// UploadID is the unique upload identifier for this entity that is specific to this
	// exact version of this entity. Unlike the ID, the UploadID will change with every
	// version and between operating systems.
	UploadID string `json:"uploadId" yaml:"uploadId"`

	// Version is a semver version of this entity.
	Version string `json:"version" yaml:"version"`
}
