import { Box, Markdown } from "../components";

describe('component transforms', () => {
  it('renders successfully', () => {
    const jsx = <Box>
      <Markdown>bob bob bob</Markdown>
    </Box>;
    expect(jsx).toBeFalsy();
  })
});