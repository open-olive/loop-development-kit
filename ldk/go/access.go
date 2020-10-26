package ldk

// Access is a grouping of entity type
type Access string

const (
	// AccessUnknown is the access value used when the value is not known
	AccessUnknown Access = "unknown"

	// AccessUser is the value that allows only the user who submitted the plugin to access it
	AccessUser Access = "user"

	// AccessOrganization is the value that allows only users in the submitting user's organization to access the plugin
	AccessOrganization Access = "organization"

	// AccessPublic is the value that allows any user of Sidekick to access the plugin
	AccessPublic Access = "public"
)
