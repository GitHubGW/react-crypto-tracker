import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { Outlet, PathMatch, useLocation, useMatch, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handleFetchCoin, handleFetchOHLC, handleFetchTicker } from "../api";
import PageTitle from "../components/PageTitle";
import Loading from "../components/Loading";
import { CoinDetailInterface, OhlcInterface, TickerDetailInterface } from "../types/common";

interface RouteState {
  state: { name: string; rank: number };
}

const CoinDetail = () => {
  let series: any = [];
  const { id } = useParams();
  const { state } = useLocation() as RouteState;
  const chartMatch: PathMatch<"id"> | null = useMatch("/:id/chart");
  const priceMatch: PathMatch<"id"> | null = useMatch("/:id/price");
  const { isLoading: coinLoading, data: coinData } = useQuery<CoinDetailInterface>(["coin", id], () => handleFetchCoin(id), { refetchInterval: 10000 });
  const { isLoading: tickerLoading, data: tickerData } = useQuery<TickerDetailInterface>(["ticker", id], () => handleFetchTicker(id), { refetchInterval: 10000 });
  const { isLoading: ohlcLoading, data: ohlcData } = useQuery<OhlcInterface[]>(["ohlc", "detail", id], () => handleFetchOHLC(id), { refetchInterval: 10000 });

  if (ohlcData) {
    series = [Math.floor(ohlcData.slice(14)[0].high), Math.floor(ohlcData.slice(14)[0].low), Math.floor(ohlcData.slice(14)[0].open), Math.floor(ohlcData.slice(14)[0].close)];
  }

  return (
    <Container>
      <PageTitle text={coinData?.name} />
      <HomeLink to="/">🏠</HomeLink>
      {!coinLoading && !tickerLoading && !ohlcLoading && <Image src={`https://cryptocurrencyliveprices.com/img/${coinData?.id}.png`} alt={coinData?.name} />}
      <Header>
        <Title>{state?.name || coinLoading || tickerLoading || ohlcLoading ? <Loading /> : coinData?.name}</Title>
      </Header>
      <PriceTitle isIncrease={!!(tickerData && tickerData.quotes.USD.market_cap_change_24h > 0)}>
        {tickerData && `$${Number(tickerData.quotes.USD.price.toFixed(3)).toLocaleString("ko-KR")}`}
      </PriceTitle>
      <OverviewContainer>
        <OverviewContent>
          <span>Rank</span>
          <span>{coinData?.rank}</span>
        </OverviewContent>
        <OverviewContent>
          <span>Symbol</span>
          <span>{coinData?.symbol}</span>
        </OverviewContent>
        <OverviewContent>
          <span>Date</span>
          <span>{coinData?.first_data_at.substring(0, 10)}</span>
        </OverviewContent>
      </OverviewContainer>
      <SummaryContainer>
        <SummaryContent>
          <span>Market Cap</span>
          <span>${Number(tickerData?.quotes.USD.market_cap).toLocaleString("ko-KR")}</span>
        </SummaryContent>
        <SummaryContent>
          <span>ATH</span>
          <span>${Number(tickerData?.quotes.USD.ath_price.toFixed(3)).toLocaleString("ko-KR")}</span>
        </SummaryContent>
        <SummaryContent>
          <span>24h Change</span>
          <span>
            {tickerData && tickerData.quotes.USD.percent_change_24h > 0 ? `+${tickerData.quotes.USD.percent_change_24h}%` : `${tickerData?.quotes.USD.percent_change_24h}%`}
          </span>
        </SummaryContent>
      </SummaryContainer>
      <LinkContainer>
        <LinkItem isActive={!!chartMatch}>
          <Link to={`/${id}/chart`}>Chart</Link>
        </LinkItem>
        <LinkItem isActive={!!priceMatch}>
          <Link to={`/${id}/price`}>Price</Link>
        </LinkItem>
      </LinkContainer>
      <Outlet context={{ id }} />
      {!chartMatch && !priceMatch && (
        <ReactApexChart
          type="radialBar"
          series={series}
          height={400}
          options={{
            chart: { type: "radialBar" },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: { fontSize: "22px" },
                  value: { fontSize: "16px", formatter: (value: number) => `$${value}` },
                  total: { show: true, label: "Price", formatter: (value: number) => `💰` },
                },
              },
            },
            labels: ["Highest Price", "Lowest Price", "Opening Price", "Closing Price"],
          }}
        />
      )}
    </Container>
  );
};

export default CoinDetail;

const Container = styled.div`
  border-radius: 10px;
  max-width: 480px;
  width: 480px;
  padding: 40px 10px;
  box-sizing: border-box;
  box-shadow: black 5px 5px 20px 0px;
  margin: 100px 0;
  text-align: center;
  position: relative;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
`;

const Image = styled.img`
  margin-bottom: 30px;
  width: 120px;
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: 30px;
`;

const PriceTitle = styled.h1<{ isIncrease: boolean }>`
  font-size: 35px;
  margin: 25px 0;
  font-weight: bold;
  color: ${(props) => (props.isIncrease === true ? props.theme.greenColor : props.theme.redColor)};
`;

const CommonContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.lightBlackColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  padding: 15px 0;
  margin: 10px 0;
`;

const CommonContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  span {
    margin: 8px 10px;
    text-transform: uppercase;
    &:first-child {
      font-weight: bold;
      color: ${(props) => props.theme.yellowColor};
    }
    &:nth-child(2) {
      font-weight: bold;
      font-size: 15px;
    }
  }
`;

const OverviewContainer = styled(CommonContainer)``;

const OverviewContent = styled(CommonContent)``;

const SummaryContainer = styled(CommonContainer)``;

const SummaryContent = styled(CommonContent)``;

const LinkContainer = styled.div`
  margin-bottom: 30px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

const LinkItem = styled.div<{ isActive: boolean }>`
  width: 100%;

  a {
    display: block;
    padding: 12px 10px;
    text-transform: uppercase;
    background-color: ${(props) => (props.isActive === true ? props.theme.grayColor : props.theme.lightBlackColor)};
    border-radius: 100px;
    &:hover {
      background-color: ${(props) => props.theme.grayColor};
    }
  }
`;
