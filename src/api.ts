import { OHLCData } from "./interfaces/shared.interfaces";
import { CoinData, TickerData } from "./routes/CoinDetail";

export const handleFetchAllCoins = async (): Promise<never[]> => {
  const allCoins: [] = await (await fetch(`https://api.coinpaprika.com/v1/coins`)).json();
  const slicedAllCoins: never[] = allCoins?.slice(0, 100);
  return slicedAllCoins;
};

export const handleFetchAllTickers = async (): Promise<never[]> => {
  const allTickers: [] = await (await fetch(`https://api.coinpaprika.com/v1/tickers`)).json();
  const slicedAllTickers: never[] = allTickers?.slice(0, 100);
  return slicedAllTickers;
};

export const handleFetchCoin = async (id: string | undefined): Promise<CoinData> => {
  const coinData: CoinData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${id}`)).json();
  return coinData;
};

export const handleFetchTicker = async (id: string | undefined): Promise<TickerData> => {
  const tickerData: TickerData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)).json();
  return tickerData;
};

export const handleFetchOHLC = async (id: string): Promise<OHLCData[]> => {
  const now: number = Math.floor(Date.now() / 1000);
  const weekAgo: number = now - 60 * 60 * 24 * 7 * 2;
  const ohlcData: OHLCData[] = await (await fetch(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${weekAgo}&end=${now}`)).json();
  return ohlcData;
};
