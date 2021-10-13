import { filesystem, network } from '@oliveai/ldk';

import { FilesystemWhisper } from '../../whispers';

const run = async () => {
  const writeMode = 0o755;
  const dirPath = 'test-dir';
  if (!(await filesystem.exists(dirPath))) {
    await filesystem.makeDir(dirPath, writeMode);
  }

  const filePath = await filesystem.join([dirPath, 'test.txt']);
  const encodedValue = await network.encode('some text');
  await filesystem.writeFile({
    path: filePath,
    data: encodedValue,
    writeOperation: filesystem.WriteOperation.overwrite,
    writeMode,
  });

  const encodedFileContents = await filesystem.readFile(filePath);
  const fileContents = await network.decode(encodedFileContents);

  const whisper = new FilesystemWhisper(fileContents);
  whisper.show();

  await filesystem.remove(dirPath);
};

export default { run };
