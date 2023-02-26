import { useQuery } from "react-query";
import styled from "styled-components";
import Coin from "../components/Coin";
import Loading from "../components/Loading";
import { handleFetchAllCoins, handleFetchAllTickers } from "../api";
import PageTitle from "../components/PageTitle";
import { useCallback, useEffect, useState } from "react";
import { CoinInterface, TickerInterface } from "../types/common";

const Home = () => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<TickerInterface[]>([]);
  const { isLoading: allCoinsLoading } = useQuery<CoinInterface[]>("allCoins", handleFetchAllCoins);
  const { isLoading: allTickersLoading, data: allTickersData, refetch: refetchAllTickers } = useQuery<TickerInterface[]>("allTickers", () => handleFetchAllTickers(page));

  const handleInfiniteScroll = useCallback(async () => {
    const { offsetHeight, scrollTop } = document.documentElement;
    const innerHeight = window.innerHeight;
    if (offsetHeight === innerHeight + scrollTop) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  useEffect(() => {
    if (allTickersData) {
      setAllData((prev) => {
        const result = [...prev, ...allTickersData];
        return result;
      });
    }
  }, [allTickersData]);

  useEffect(() => {
    refetchAllTickers();
  }, [page, refetchAllTickers]);

  if (allCoinsLoading || allTickersLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <PageTitle text="💰 Crypto Tracker 💰" />
      <Title>Crypto Tracker</Title>
      <Content>
        <MenuList>
          <Menu>Rank</Menu>
          <Menu>Volume / Change</Menu>
          <Menu>Price / Change</Menu>
        </MenuList>
        {allData?.map((coin, index) => (
          <Coin
            key={`${coin.id}${index}`}
            id={coin.id}
            rank={coin.rank}
            symbol={coin.symbol}
            name={coin.name}
            price={coin.quotes.USD.price}
            priceChange={coin.quotes.USD.percent_change_24h}
            volume={coin.quotes.USD.volume_24h}
            volumeChange={coin.quotes.USD.volume_24h_change_24h}
            image={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Home;

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

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
`;

const Content = styled.div`
  padding: 20px;
`;

const MenuList = styled.div`
  display: flex;
`;

const Menu = styled.span`
  color: ${(props) => props.theme.grayColor};
  text-transform: uppercase;
  font-size: 14px;

  &:nth-child(1) {
    flex: 1;
  }
  &:nth-child(2) {
    flex: 2.5;
  }
  &:nth-child(3) {
    flex: 1.5;
    text-align: right;
  }
`;
