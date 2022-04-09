import { Link } from "react-router-dom";
import styled from "styled-components";

interface CoinProps {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  image: string;
  price: number;
  priceChange: number;
  volume: number;
  volumeChange: number;
}

const CoinLi = styled.li`
  transition: 0.3s;

  &:hover {
    transform: scale(1.025);
  }
`;

const CoinContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.grayColor};
  padding: 20px 0px;
`;

const CoinRankContainer = styled.div`
  flex: 1;
  max-width: 65px;
`;

const CoinRank = styled.span`
  margin-left: 10px;
  color: ${(props) => props.theme.grayColor};
`;

const CoinContentContainer = styled.div`
  flex: 2.5;
  display: flex;
  align-items: center;
`;

const CoinImage = styled.img`
  width: 50px;
  height: 50px;
`;

const CoinContent = styled.div`
  margin-left: 20px;
`;

const CoinSymbolContainer = styled.div`
  margin-bottom: 8px;
`;

const CoinCapContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CoinCap = styled.span`
  font-size: 12px;
  margin-left: 7px;
`;

const CoinVolume = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.grayColor};
`;

const CoinSymbol = styled.span`
  font-weight: bold;
`;

const CoinName = styled.span`
  font-size: 15px;
  margin-left: 8px;
  color: ${(props) => props.theme.grayColor};
`;

const CoinPriceContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const CoinPrice = styled.span`
  font-weight: bold;
  margin-bottom: 8px;
`;

const CoinChange = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive === true ? props.theme.greenColor : props.theme.redColor)};
`;

const Coin = ({ id, rank, symbol, name, image, price, priceChange, volume, volumeChange }: CoinProps) => {
  return (
    <CoinLi>
      <Link to={`/${id}`} state={{ name, rank }}>
        <CoinContainer>
          <CoinRankContainer>
            <CoinRank>{rank}</CoinRank>
          </CoinRankContainer>
          <CoinContentContainer>
            <CoinImage src={image} alt={name} />
            <CoinContent>
              <CoinSymbolContainer>
                <CoinSymbol>{symbol}</CoinSymbol>
                <CoinName>{name}</CoinName>
              </CoinSymbolContainer>
              <CoinCapContainer>
                <CoinVolume>${Number(volume.toFixed(2)).toLocaleString("ko-KR")}</CoinVolume>
                <CoinCap>{volumeChange}%</CoinCap>
              </CoinCapContainer>
            </CoinContent>
          </CoinContentContainer>
          <CoinPriceContainer>
            <CoinPrice>${Number(price.toFixed(2)).toLocaleString("ko-KR")}</CoinPrice>
            <CoinChange isActive={priceChange > 0}>{priceChange > 0 ? `+${priceChange}` : `${priceChange}`}%</CoinChange>
          </CoinPriceContainer>
        </CoinContainer>
      </Link>
    </CoinLi>
  );
};

export default Coin;
