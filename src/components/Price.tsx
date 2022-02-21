import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { handleFetchOHLC } from "../api";
import { OHLCData } from "../interfaces/shared.interfaces";
import HelmetTitle from "./HelmetTitle";
import Loading from "./Loading";

interface PriceProps {
  id: string;
}

const Price = () => {
  const { id } = useOutletContext<PriceProps>();
  const { isLoading: ohlcLoading, data: ohlcData } = useQuery<OHLCData[]>(["ohlc", "price", id], () => handleFetchOHLC(id), { refetchInterval: 5000 });
  const mappedOhlcData = ohlcData?.map((data: OHLCData) => ({ x: data.time_open, y: [data.open.toFixed(2), data.high.toFixed(2), data.low.toFixed(2), data.close.toFixed(2)] }));

  return (
    <div>
      <HelmetTitle text="Price" />
      {ohlcLoading === true ? (
        <Loading />
      ) : (
        <ReactApexChart
          type="candlestick"
          series={[{ data: mappedOhlcData }]}
          height={400}
          options={{
            chart: {
              type: "candlestick",
              toolbar: { show: true, tools: { download: true, pan: false, reset: false, zoom: false, zoomin: false, zoomout: false } },
              background: "rgb(6,6,6)",
            },
            theme: { mode: "dark" },
            title: {
              text: "CandleStick Chart",
              align: "center",
              style: { color: "white" },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              labels: {
                formatter: (value: number) => `$${value.toFixed(2)}`,
              },
              axisBorder: { show: false },
              axisTicks: { show: false },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Price;
