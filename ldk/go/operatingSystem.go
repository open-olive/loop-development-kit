package ldk

// OperatingSystem is a grouping of entity type
type OperatingSystem string

const (
	// OperatingSystemUnknown is the OS value used when the OS is not known
	OperatingSystemUnknown OperatingSystem = "unknown"

	// OperatingSystemWindows is the OS value used for Windows
	OperatingSystemWindows OperatingSystem = "win32"

	// OperatingSystemMacOS is the OS value used for MacOS
	OperatingSystemMacOS OperatingSystem = "darwin"

	// OperatingSystemLinux is the OS value used for Linux
	OperatingSystemLinux OperatingSystem = "linux"

	// OperatingSystemAny is the OS value used a plugin is available on any OS
	OperatingSystemAny OperatingSystem = "any"
)
