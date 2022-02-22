import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { Outlet, PathMatch, useLocation, useMatch, useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { handleFetchCoin, handleFetchOHLC, handleFetchTicker } from "../api";
import HelmetTitle from "../components/HelmetTitle";
import Loading from "../components/Loading";
import { OHLCData } from "../interfaces/shared.interfaces";

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

const ContentContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.lightBlackColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  padding: 15px 0;
  margin: 10px 0;
`;

const Content = styled.div`
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

const Overview = styled(ContentContainer)``;

const OverviewContent = styled(Content)``;

const Summary = styled(ContentContainer)``;

const SummaryContent = styled(Content)``;

const LinkContainer = styled.div`
  margin-bottom: 30px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;

const LinkNav = styled.div<{ isActive: boolean }>`
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

const HomeButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 25px;
`;

interface RouteState {
  state: {
    name: string;
    rank: number;
  };
}

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

export interface TickerData {
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

const CoinDetail = () => {
  const { id } = useParams<string>();
  const { state } = useLocation() as RouteState;
  const chartMatch: PathMatch<"id"> | null = useMatch("/:id/chart");
  const priceMatch: PathMatch<"id"> | null = useMatch("/:id/price");
  const { isLoading: coinLoading, data: coinData } = useQuery<CoinData>(["coin", id], () => handleFetchCoin(id), { refetchInterval: 10000 });
  const { isLoading: tickerLoading, data: tickerData } = useQuery<TickerData>(["ticker", id], () => handleFetchTicker(id), { refetchInterval: 10000 });
  const { isLoading: ohlcLoading, data: ohlcData } = useQuery<OHLCData[]>(["ohlc", "detail", id], () => handleFetchOHLC(id as string), { refetchInterval: 10000 });

  let series: any = [];
  if (ohlcData) {
    series = [Math.floor(ohlcData.slice(14)[0].high), Math.floor(ohlcData.slice(14)[0].low), Math.floor(ohlcData.slice(14)[0].open), Math.floor(ohlcData.slice(14)[0].close)];
  }

  return (
    <Container>
      <HelmetTitle text={coinData?.name} />
      <HomeButton to="/">🏠</HomeButton>

      {(coinLoading || tickerLoading || ohlcLoading) === false && (
        <Image src={`https://cryptoicon-api.vercel.app/api/icon/${coinData?.symbol.toLowerCase()}`} alt={coinData?.name} />
      )}
      <Header>
        <Title>{state?.name ? state.name : coinLoading === true && tickerLoading === true && ohlcLoading === true ? <Loading /> : coinData?.name}</Title>
      </Header>
      <PriceTitle isIncrease={tickerData && tickerData?.quotes.USD.market_cap_change_24h > 0 ? true : false}>
        {tickerData && `$${Number(tickerData?.quotes.USD.price.toFixed(3)).toLocaleString("ko-KR")}`}
      </PriceTitle>
      <Overview>
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
      </Overview>
      <Summary>
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
            {tickerData && tickerData?.quotes.USD.percent_change_24h > 0 ? `+${tickerData?.quotes.USD.percent_change_24h}%` : `${tickerData?.quotes.USD.percent_change_24h}%`}
          </span>
        </SummaryContent>
      </Summary>
      <LinkContainer>
        <LinkNav isActive={Boolean(chartMatch)}>
          <Link to={`/${id}/chart`}>Chart</Link>
        </LinkNav>
        <LinkNav isActive={Boolean(priceMatch)}>
          <Link to={`/${id}/price`}>Price</Link>
        </LinkNav>
      </LinkContainer>
      <Outlet context={{ id }} />
      {chartMatch === null && priceMatch === null && (
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
