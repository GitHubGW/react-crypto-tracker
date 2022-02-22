import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { useRecoilValue } from "recoil";
import { handleFetchOHLC } from "../api";
import { darkModeState } from "../atoms";
import { OHLCData } from "../interfaces/shared.interfaces";
import HelmetTitle from "./HelmetTitle";
import Loading from "./Loading";

interface PriceContext {
  id: string;
}

const Price = () => {
  const { id } = useOutletContext<PriceContext>();
  const { isLoading: ohlcLoading, data: ohlcData } = useQuery<OHLCData[]>(["ohlc", "price", id], () => handleFetchOHLC(id), { refetchInterval: 5000 });
  const mappedOhlcData = ohlcData?.map((data: OHLCData) => ({ x: data.time_open, y: [data.open.toFixed(2), data.high.toFixed(2), data.low.toFixed(2), data.close.toFixed(2)] }));
  const darkMode: boolean = useRecoilValue(darkModeState);

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
              background: darkMode ? "black" : "white",
            },
            theme: { mode: darkMode ? "dark" : "light" },
            title: {
              text: "CandleStick Chart",
              align: "center",
              style: { color: darkMode ? "white" : "black" },
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
