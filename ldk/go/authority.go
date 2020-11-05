package ldk

type Authority interface {
	CancelSession(string) error
	NewSession(string) (*Session, error)
	ValidateSession(*Session) error
}
