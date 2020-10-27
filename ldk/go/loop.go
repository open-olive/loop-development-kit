package ldk

// Loop is an interface that defines the methods required of all loop plugins
type Loop interface {
	LoopStart(Sidekick) error
	LoopStop() error
}
