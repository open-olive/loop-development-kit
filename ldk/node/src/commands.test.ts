import * as childProcess from 'child_process';
import program from './commands';

jest.mock('child_process');

describe('commands', () => {
  beforeEach(() => {
    // Stop Jest from exiting if it fails.
    program.exitOverride();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('build', () => {
    it('should child_process.exec the correct command', () => {
      program.parse(['command', 'build', 'build']);
      expect(childProcess.exec).toHaveBeenCalledWith(
        './node_modules/.bin/pkg index.js -t node12-darwin-x64 --output build/plugin && cp plugin.json build/plugin.json',
        expect.anything(),
      );
    });
    it('should child_process.exec the correct command when target is provided', () => {
      program.parse(['command', 'build', 'build', '-t', 'buildTarget']);
      expect(childProcess.exec).toHaveBeenCalledWith(
        './node_modules/.bin/pkg index.js -t node12-darwin-x64 --output buildTarget/plugin && cp plugin.json buildTarget/plugin.json',
        expect.anything(),
      );
    });
  });
  describe('deploy', () => {
    it('should child_process.exec the correct command', () => {
      program.parse(['command', 'deploy', 'deploy']);
      expect(childProcess.exec).toHaveBeenCalledWith(
        'mkdir -p "$HOME/Library/Application Support/Olive Helps/loops/2" && cp build/* "$HOME/Library/Application Support/Olive Helps/loops/2"',
        expect.anything(),
      );
    });
  });
});
