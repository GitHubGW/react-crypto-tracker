import { useEffect, useState } from "react";
import styled from "styled-components";
import Coin from "../components/Coin";
import Loading from "../components/Loading";

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

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Home = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetAllCoins = async () => {
    const coinsData = await (await fetch(`https://api.coinpaprika.com/v1/coins`)).json();
    const slicedCoinsData = coinsData.slice(0, 100);
    setCoins(slicedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    handleGetAllCoins();
  }, []);

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
            <span>Cap / Volume</span>
            <span>Price / Change</span>
          </CoinNav>
          {coins.map((coin) => (
            <Coin
              key={coin.id}
              id={coin.id}
              rank={coin.rank}
              symbol={coin.symbol}
              name={coin.name}
              image={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            />
          ))}
        </CoinUl>
      )}
    </Container>
  );
};

export default Home;
