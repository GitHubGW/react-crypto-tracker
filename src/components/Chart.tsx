import ReactApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { handleFetchOHLC } from "../api";
import Loading from "./Loading";
import HelmetTitle from "./HelmetTitle";
import { OHLCData } from "../interfaces/shared.interfaces";

interface ChartProps {
  id: string;
}

const Chart = () => {
  const { id } = useOutletContext<ChartProps>();
  const { isLoading: ohlcLoading, data: ohlcData } = useQuery<OHLCData[]>(["ohlc", "chart", id], () => handleFetchOHLC(id), { refetchInterval: 5000 });
  const openingPrice: number[] | undefined = ohlcData?.map((price) => +price.open.toFixed(3));
  const closingPrice: number[] | undefined = ohlcData?.map((price) => +price.close.toFixed(3));
  const timeClose: string[] | undefined = ohlcData?.map((time) => time.time_close.substring(5, 10));

  return (
    <div>
      <HelmetTitle text="Chart" />
      {ohlcLoading === true ? (
        <Loading />
      ) : (
        <ReactApexCharts
          type="line"
          series={[
            { name: "Opening Price", data: openingPrice },
            { name: "Closing Price", data: closingPrice },
          ]}
          height={400}
          options={{
            chart: {
              toolbar: { show: true, tools: { download: true, pan: false, reset: false, zoom: false, zoomin: false, zoomout: false } },
              background: "rgb(6,6,6)",
            },
            theme: { mode: "dark" },
            title: {
              text: "Line Chart",
              align: "center",
              style: { color: "white" },
            },
            stroke: { show: true, curve: "smooth", width: [5, 5], dashArray: [0, 0] },
            tooltip: {
              enabled: true,
              x: { show: true },
              y: { formatter: (closingPrice: number) => `$${closingPrice}` },
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 8,
              },
            },
            grid: { show: false },
            xaxis: {
              tickAmount: 14,
              labels: { show: true, rotate: 0 },
              type: "datetime",
              categories: timeClose,
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: { labels: { show: true, align: "center", formatter: (value: number) => `$${value.toFixed(2)}` }, axisBorder: { show: false }, axisTicks: { show: false } },
            fill: { type: "gradient", gradient: { type: "horizontal", stops: [0, 5] } },
            colors: ["lightgreen", "dodgerblue"],
          }}
        />
      )}
    </div>
  );
};

export default Chart;
