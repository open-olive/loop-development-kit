/* eslint-disable no-async-promise-executor */
import { whisper, React, ReactWhisper } from '@oliveai/ldk';
import { AxisScale, SeriesColor, SeriesType } from '@oliveai/ldk/dist/whisper/types';
import { onActionWrapper } from '../utils';

type SeriesInput = {
  barWidth?: number;
  color?: SeriesColor;
  numberOfPoints?: number;
  title: string;
  type: SeriesType;
};

const generateSeries = (inputs: SeriesInput[]) =>
  inputs.map((input) => {
    const data = [];

    for (let i = 0; i < (input.numberOfPoints || 20); i += 1) {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      data.push({ x, y });
    }

    return { ...input, data };
  });

type RegenerateButtonParams = {
  setter: React.Dispatch<React.SetStateAction<SeriesInput[]>>;
  seriesData: SeriesInput[];
};

const RegenerateButton = ({ setter, seriesData }: RegenerateButtonParams) => {
  const handleClick = () => {
    setter(generateSeries(seriesData));
  };

  return (
    <oh-box justifyContent={whisper.JustifyContent.Center} direction={whisper.Direction.Horizontal}>
      <oh-button label="Regenerate Chart Data" onClick={handleClick} />
    </oh-box>
  );
};

export const testChart = (): Promise<boolean> =>
  new Promise(async (resolve, reject) => {
    const resolverMap = new Map([
      ['AreaGraph', false],
      ['BarGraph', false],
      ['LineGraph', false],
      ['MarkGraph', false],
      ['TimeSeries', false],
      ['TwoSeries', false],
      ['FourSeries', false],
      ['Colors', false],
      ['Ratio', false],
      ['Margins', false],
      ['Padding', false],
      ['NoGrid', false], // horizontal and vertical
      ['DisableCrosshair', false],
      ['NoAxis', false],
      ['AxisAngle', false],
    ]);

    const ConfirmationButtons = ({
      question,
      testName,
    }: {
      question: string;
      testName: string;
    }) => {
      const [isTested, setIsTested] = React.useState(false);

      const handleClick: whisper.WhisperHandler = (error, thisWhisper) => {
        onActionWrapper(error, testName, resolverMap, thisWhisper, resolve, reject);
        setIsTested(true);
      };

      return (
        <>
          <oh-box
            justifyContent={whisper.JustifyContent.Center}
            direction={whisper.Direction.Horizontal}
          >
            <oh-markdown body={question} />
          </oh-box>
          <oh-box
            justifyContent={whisper.JustifyContent.Center}
            direction={whisper.Direction.Horizontal}
          >
            {isTested ? (
              <oh-icon name="done" />
            ) : (
              <>
                <oh-button label="Yes" onClick={handleClick} />
                <oh-button label="No" onClick={() => reject(new Error(`${testName} failed`))} />
              </>
            )}
          </oh-box>
        </>
      );
    };

    try {
      const AreaGraph = () => {
        const series = [
          {
            data: [
              { x: 1, y: 0 },
              { x: 1, y: 10 },
              { x: 2, y: 5 },
              { x: 3, y: 15 },
            ],
            title: 'Test Area 1',
            type: SeriesType.Area,
          },
          {
            data: [
              { x: 1, y: 0 },
              { x: 1, y: 3 },
              { x: 2, y: 1 },
              { x: 3, y: 6 },
            ],
            title: 'Test Area 2',
            type: SeriesType.Area,
          },
        ];

        return (
          <>
            <oh-chart
              chartTitle="Area Graph Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display an area graph, custom axis labels, and a tooltip when you hover your mouse?"
              testName="AreaGraph"
            />
            <oh-divider />
          </>
        );
      };

      const BarGraph = () => {
        const seriesData = [
          {
            barWidth: 2,
            numberOfPoints: 5,
            title: 'Test Bars 1',
            type: SeriesType.VerticalBar,
          },
          {
            barWidth: 1,
            numberOfPoints: 5,
            title: 'Test Bars 2',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Bar Graph Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display a bar graph, custom axis labels, and a tooltip when you hover your mouse? Are the bars for Test Bars 1 wider than Test Bars 2?"
              testName="BarGraph"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const LineGraph = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'Test Lines 1',
            type: SeriesType.Line,
          },
          {
            numberOfPoints: 5,
            title: 'Test Lines 2',
            type: SeriesType.Line,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));
        const [sortedSeries, setSortedSeries] = React.useState(series);

        React.useEffect(() => {
          setSortedSeries(
            series.map((unsortedSeries) => {
              const data = unsortedSeries.data.sort((a, b) => a.x - b.x);
              return {
                ...unsortedSeries,
                data,
              };
            }),
          );
        }, [series]);

        return (
          <>
            <oh-chart
              chartTitle="Line Graph Test"
              series={sortedSeries}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display a line graph, custom axis labels, and a tooltip when you hover your mouse?"
              testName="LineGraph"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const MarkGraph = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'Test Mark 1',
            type: SeriesType.Mark,
          },
          {
            numberOfPoints: 5,
            title: 'Test Mark 2',
            type: SeriesType.Mark,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Mark Graph Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display a mark graph, custom axis labels, and a tooltip when you hover your mouse?"
              testName="MarkGraph"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const TimeSeries = () => {
        const series = [
          {
            data: [
              {
                // 2 days ago
                x: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
                y: 1,
              },
              {
                // 1 day ago
                x: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
                y: 2,
              },
              {
                // Today
                x: new Date(),
                y: 2.5,
              },
              {
                // Tomorrow
                x: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
                y: 4,
              },
            ],
            title: 'Time Series Test',
            type: SeriesType.Line,
          },
        ];

        return (
          <>
            <oh-chart
              chartTitle="Time Series Test"
              series={series}
              xAxisScale={AxisScale.Time}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the X axis display dates instead of numbers?"
              testName="TimeSeries"
            />
            <oh-divider />
          </>
        );
      };

      const TwoSeries = () => {
        const seriesData: SeriesInput[] = [
          {
            numberOfPoints: 5,
            title: 'Bar Graph',
            type: SeriesType.VerticalBar,
          },
          {
            numberOfPoints: 5,
            title: 'Line Graph',
            type: SeriesType.Line,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Two Series Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display both bar and line graphs?"
              testName="TwoSeries"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const FourSeries = () => {
        const seriesData: SeriesInput[] = [
          {
            numberOfPoints: 5,
            title: 'Area Graph',
            type: SeriesType.Area,
          },
          {
            numberOfPoints: 5,
            title: 'Bar Graph',
            type: SeriesType.VerticalBar,
          },
          {
            numberOfPoints: 5,
            title: 'Line Graph',
            type: SeriesType.Line,
          },
          {
            numberOfPoints: 5,
            title: 'Mark Graph',
            type: SeriesType.Mark,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Four Series Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display area, bar, line, and mark graphs?"
              testName="FourSeries"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const Colors = () => {
        const series = Object.keys(SeriesColor).map((color, index) => ({
          barWidth: 0.5,
          data: [{ x: index, y: 5 }],
          color: (SeriesColor as any)[color],
          title: color,
          type: SeriesType.VerticalBar,
        }));

        return (
          <>
            <oh-chart
              chartTitle="Colors Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              xAxisPadding={5}
              yAxisLabel="Custom Y Axis Label"
              yAxisPadding={5}
            />
            <ConfirmationButtons
              question="Does the chart display all 10 different colors?"
              testName="Colors"
            />
            <oh-divider />
          </>
        );
      };

      const Ratio = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'Ratio Test 1',
            type: SeriesType.VerticalBar,
          },
          {
            numberOfPoints: 5,
            title: 'Ratio Test 2',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Short Wide Test"
              heightToWidthRatio={0.5}
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <oh-chart
              chartTitle="Tall Thin Test"
              heightToWidthRatio={1.5}
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Are there two charts: one short & wide, the other tall & thin?"
              testName="Ratio"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const Margins = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'Margin Test 1',
            type: SeriesType.VerticalBar,
          },
          {
            numberOfPoints: 5,
            title: 'Margin Test 2',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Top/Bottom Margin Test"
              margin={{
                top: 100,
                bottom: 100,
              }}
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <oh-chart
              chartTitle="Left/Right Margin Test"
              margin={{
                left: 60,
                right: 60,
              }}
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Are there two charts, one with a large top/bottom margin, the other with large left/right margin?"
              testName="Margins"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const Padding = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'Padding Test 1',
            type: SeriesType.VerticalBar,
          },
          {
            numberOfPoints: 5,
            title: 'Padding Test 2',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Top/Bottom Padding Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
              yAxisPadding={20}
            />
            <oh-chart
              chartTitle="Left/Right Padding Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              xAxisPadding={50}
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Are there two charts, one with padding in the top/bottom, the other with padding in the left/right?"
              testName="Padding"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const NoGrid = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'No Grid Test 1',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="No Grid Test"
              horizontalGridLines={false}
              series={series}
              verticalGridLines={false}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="Does the chart display a graph without a grid in the background?"
              testName="NoGrid"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const NoCrosshair = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'No Crosshair Test 1',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="No Crosshair Test"
              series={series}
              showCrosshair={false}
              xAxisLabel="Custom X Axis Label"
              yAxisLabel="Custom Y Axis Label"
            />
            <ConfirmationButtons
              question="When you hover over the chart, is there no tooltip?"
              testName="DisableCrosshair"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const NoAxis = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'No Axis Test 1',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="No X Axis Test"
              series={series}
              xAxis={false}
              yAxisLabel="Custom Y Axis Label"
            />
            <oh-chart
              chartTitle="No Y Axis Test"
              series={series}
              xAxisLabel="Custom X Axis Label"
              yAxis={false}
            />
            <ConfirmationButtons
              question="Does the top chart have no X axis, and the bottom chart have no Y axis?"
              testName="NoAxis"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const AxisAngle = () => {
        const seriesData = [
          {
            numberOfPoints: 5,
            title: 'Axis Angle Test 1',
            type: SeriesType.VerticalBar,
          },
        ];

        const [series, setSeries] = React.useState(generateSeries(seriesData));

        return (
          <>
            <oh-chart
              chartTitle="Axis Angle Test"
              series={series}
              // xAxisLabel="Custom X Axis Label"
              xAxisTickLabelAngle={90}
              // yAxisLabel="Custom Y Axis Label"
              yAxisTickLabelAngle={90}
            />
            <ConfirmationButtons
              question="Are the X and Y axes ticks rotated 90 degrees?"
              testName="AxisAngle"
            />
            <RegenerateButton setter={setSeries} seriesData={seriesData} />
            <oh-divider />
          </>
        );
      };

      const ChartTest = () => (
        <oh-whisper label="Chart Test" onClose={() => console.debug('closed')}>
          <AreaGraph />
          <BarGraph />
          <LineGraph />
          <MarkGraph />
          <TimeSeries />
          <TwoSeries />
          <FourSeries />
          <Colors />
          <Ratio />
          <Margins />
          <Padding />
          <NoGrid />
          <NoCrosshair />
          <NoAxis />
          <AxisAngle />
        </oh-whisper>
      );
      ReactWhisper.renderNewWhisper(<ChartTest />);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
