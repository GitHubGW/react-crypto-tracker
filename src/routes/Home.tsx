import { useQuery } from "react-query";
import styled from "styled-components";
import Coin from "../components/Coin";
import Loading from "../components/Loading";
import { handleFetchAllCoins, handleFetchAllTickers } from "../api";

const Container = styled.div`
  border-radius: 10px;
  max-width: 480px;
  width: 480px;
  padding: 40px 10px;
  box-sizing: border-box;
  box-shadow: black 5px 5px 20px 0px;
  margin: 100px 0;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
`;

const CoinUl = styled.ul`
  padding: 20px;
`;

const CoinNav = styled.div`
  display: flex;

  span {
    color: ${(props) => props.theme.grayColor};
    text-transform: uppercase;
    font-size: 14px;
  }
  span:nth-child(1) {
    flex: 1;
  }
  span:nth-child(2) {
    flex: 2.5;
  }
  span:nth-child(3) {
    flex: 1.5;
    text-align: right;
  }
`;

interface AllCoinsInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface AllTickersInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Home = () => {
  const { isLoading: allCoinsLoading, data: allCoinsData } = useQuery<AllCoinsInterface[]>("allCoins", handleFetchAllCoins);
  const { isLoading: allTickersLoading, data: allTickersData } = useQuery<AllTickersInterface[]>("allTickers", handleFetchAllTickers);
  const loading = allCoinsLoading || allTickersLoading;

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker</Title>
      </Header>
      {loading === true ? (
        <Loading />
      ) : (
        <CoinUl>
          <CoinNav>
            <span>Rank</span>
            <span>Volume / Change</span>
            <span>Price / Change</span>
          </CoinNav>
          {allTickersData?.map((coin: AllTickersInterface) => (
            <Coin
              key={coin.id}
              id={coin.id}
              rank={coin.rank}
              symbol={coin.symbol}
              name={coin.name}
              price={coin.quotes.USD.price}
              priceChange={coin.quotes.USD.percent_change_24h}
              volume={coin.quotes.USD.volume_24h}
              volumeChange={coin.quotes.USD.volume_24h_change_24h}
              image={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            />
          ))}
        </CoinUl>
      )}
    </Container>
  );
};

export default Home;
