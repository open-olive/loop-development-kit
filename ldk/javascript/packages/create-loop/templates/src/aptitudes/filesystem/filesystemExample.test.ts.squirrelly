import { filesystem, network } from '@oliveai/ldk';
import { FilesystemWhisper } from '../../whispers';
import filesystemExample from './filesystemExample';

jest.mock('@oliveai/ldk');

const mockFilesystemShow = jest.fn();
jest.mock('../../whispers', () => {
  return {
    FilesystemWhisper: jest.fn().mockImplementation(() => {
      return { show: mockFilesystemShow };
    }),
  };
});

const TEST_DIR = 'test-dir';
const TEST_FILENAME = 'test.txt';
const WRITE_MODE = 0o755;

describe('Filesystem Example', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should write and read a file then display a whisper with the contents', async () => {
    const fileContentsStub = 'some text';
    filesystem.join = jest.fn().mockImplementationOnce((segments) => segments.join('/'));
    network.encode = jest.fn().mockResolvedValueOnce(new Uint8Array());
    network.decode = jest.fn().mockResolvedValueOnce(fileContentsStub);

    await filesystemExample.run();

    expect(filesystem.writeFile).toBeCalledWith({
      path: `${TEST_DIR}/${TEST_FILENAME}`,
      data: expect.any(Uint8Array),
      writeOperation: filesystem.WriteOperation.overwrite,
      writeMode: WRITE_MODE,
    });

    expect(FilesystemWhisper).toBeCalledWith(fileContentsStub);
    expect(mockFilesystemShow).toBeCalled();

    expect(filesystem.remove).toBeCalledWith(TEST_DIR);
  });

  it('should create a new work directory if one does not exist', async () => {
    filesystem.exists = jest.fn().mockResolvedValueOnce(false);

    await filesystemExample.run();

    expect(filesystem.makeDir).toBeCalledWith(TEST_DIR, WRITE_MODE);
  });

  it('should not create a new work directory if one already exists', async () => {
    filesystem.exists = jest.fn().mockResolvedValueOnce(true);

    await filesystemExample.run();

    expect(filesystem.makeDir).not.toBeCalled();
  });
});
