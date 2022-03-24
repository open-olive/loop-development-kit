/* eslint-disable no-async-promise-executor */
import { whisper, React, ReactWhisper } from '@oliveai/ldk';
import { Direction, JustifyContent, WhisperHandlerWithParam } from '@oliveai/ldk/dist/whisper';
import { onActionWrapper } from '../utils';

export const testPagination = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['PaginationTest', false],
      ['DisabledPaginationTest', false],
      ['TablePaginationTest', false],
    ]);

    try {
      const Check = () => (
        <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
          <oh-icon name="done" />
        </oh-box>
      );
      const PaginationTest = () => {
        const [buttonClicked, setButtonClicked] = React.useState(false);
        const [currentPage, setCurrentPage] = React.useState(1);

        return (
          <>
            <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
              {currentPage === 1 && <oh-markdown body={'# Page 1 content'} />}
              {currentPage === 2 && <oh-markdown body={'# Page 2 content'} />}
              {currentPage === 3 && <oh-markdown body={'# Page 3 content'} />}
            </oh-box>
            <oh-pagination
              component={whisper.PaginationComponentType.Pagination}
              count={3}
              onChange={(error, newPage) => {
                if (error) return console.error(error);
                return setCurrentPage(Number(newPage));
              }}
              page={currentPage}
            />
            {buttonClicked ? (
              <Check />
            ) : (
              <>
                <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
                  <oh-markdown body="Do the pages and content successfully change?" />
                </oh-box>
                <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
                  <oh-button
                    label="Yes"
                    onClick={(error, currentWhisper) => {
                      setButtonClicked(true);
                      if (error) return reject(error);
                      return onActionWrapper(
                        error,
                        'PaginationTest',
                        resolverMap,
                        currentWhisper,
                        resolve,
                        reject,
                      );
                    }}
                  />
                  <oh-button
                    label="No"
                    onClick={() => {
                      setButtonClicked(true);
                      return reject(new Error('Pagination Test failed'));
                    }}
                  />
                </oh-box>
              </>
            )}
            <oh-divider />
          </>
        );
      };

      const DisabledPaginationTest = () => {
        const [buttonClicked, setButtonClicked] = React.useState(false);

        return (
          <>
            <oh-pagination
              component={whisper.PaginationComponentType.Pagination}
              count={3}
              disabled
              onChange={(error) => {
                if (error) return console.error(error);
                return reject(new Error("Disabled pages shouldn't be changeable"));
              }}
              page={1}
            />
            {buttonClicked ? (
              <Check />
            ) : (
              <>
                <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
                  <oh-markdown body="Are the pages disabled and unable to be changed?" />
                </oh-box>
                <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
                  <oh-button
                    label="Yes"
                    onClick={(error, currentWhisper) => {
                      setButtonClicked(true);
                      if (error) return reject(error);
                      return onActionWrapper(
                        error,
                        'DisabledPaginationTest',
                        resolverMap,
                        currentWhisper,
                        resolve,
                        reject,
                      );
                    }}
                  />
                  <oh-button
                    label="No"
                    onClick={() => {
                      setButtonClicked(true);
                      return reject(new Error('Disabled Pagination Test failed'));
                    }}
                  />
                </oh-box>
              </>
            )}
            <oh-divider />
          </>
        );
      };

      const TablePaginationTest = () => {
        const [buttonClicked, setButtonClicked] = React.useState(false);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);
        const [page, setPage] = React.useState(0);
        const [body, setBody] = React.useState('');

        const data: string[][] = [];
        for (let i = 1; i <= 100; i += 1) data.push([`Row ${i} Col 1`, `Row ${i} Col 2`]);

        React.useEffect(() => {
          let newBody = '| Table Header 1 | Table header 2 |\n| - | - |\n';
          const beginSlice = rowsPerPage * page;
          const rows = data.slice(beginSlice, beginSlice + rowsPerPage);

          rows.forEach((row) => {
            newBody += `| ${row.join(' | ')} |\n`;
          });

          setBody(newBody);
        }, [rowsPerPage, page]);

        const handleRowsPerPageChange: WhisperHandlerWithParam<string> = (
          error,
          newRowsPerPage,
        ) => {
          if (error) return console.error(error);
          return setRowsPerPage(parseInt(newRowsPerPage, 10));
        };

        const handleChange: WhisperHandlerWithParam<string> = (error, newPage) => {
          if (error) return console.error(error);
          return setPage(parseInt(newPage, 10));
        };

        return (
          <>
            <oh-markdown body={body} />
            <oh-pagination
              component={whisper.PaginationComponentType.TablePagination}
              count={data.length}
              labelRowsPerPage="Custom label"
              onChange={handleChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
            {buttonClicked ? (
              <Check />
            ) : (
              <>
                <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
                  <oh-markdown body="Do the pages and rows per page options work as expected? Is there a custom label next to the rows per page dropdown?" />
                </oh-box>
                <oh-box direction={Direction.Horizontal} justifyContent={JustifyContent.Center}>
                  <oh-button
                    label="Yes"
                    onClick={(error, currentWhisper) => {
                      setButtonClicked(true);
                      if (error) return reject(error);
                      return onActionWrapper(
                        error,
                        'TablePaginationTest',
                        resolverMap,
                        currentWhisper,
                        resolve,
                        reject,
                      );
                    }}
                  />
                  <oh-button
                    label="No"
                    onClick={() => {
                      setButtonClicked(true);
                      return reject(new Error('Table Pagination Test failed'));
                    }}
                  />
                </oh-box>
              </>
            )}
          </>
        );
      };

      const PaginationWhisper = () => (
        <oh-whisper label="Pagination Test" onClose={() => console.log('closed')}>
          <PaginationTest />
          <DisabledPaginationTest />
          <TablePaginationTest />
        </oh-whisper>
      );

      ReactWhisper.renderNewWhisper(<PaginationWhisper />);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
