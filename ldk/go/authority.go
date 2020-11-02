package ldk

type Authority interface {
	CancelSession(*Session) error
	NewSession() (*Session, error)
	ValidateSession(*Session) error
}
