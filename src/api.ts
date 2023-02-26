export const handleFetchAllCoins = async () => {
  const response = await (await fetch(`https://api.coinpaprika.com/v1/coins`)).json();
  return response?.slice(0, 100);
};

export const handleFetchAllTickers = async (page: number) => {
  const response = await (await fetch(`https://api.coinpaprika.com/v1/tickers?page=${page}`)).json();
  return response?.slice(0, 100);
};

export const handleFetchCoin = async (id: string | undefined) => {
  return await (await fetch(`https://api.coinpaprika.com/v1/coins/${id}`)).json();
};

export const handleFetchTicker = async (id: string | undefined) => {
  return await (await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)).json();
};

export const handleFetchOHLC = async (id: string | undefined) => {
  const now = Math.floor(Date.now() / 1000);
  const weekAgo = now - 60 * 60 * 24 * 7 * 2;
  return await (await fetch(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${weekAgo}&end=${now}`)).json();
};
