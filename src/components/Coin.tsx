import { Link } from "react-router-dom";
import styled from "styled-components";

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

const CoinCapContainer = styled.div``;

const CoinCap = styled.span``;

const CoinVolume = styled.span`
  font-size: 15px;
  margin-left: 8px;
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

const CoinChange = styled.span`
  color: ${(props) => props.theme.redColor};
`;

interface CoinProps {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  image: string;
}

const Coin = ({ id, rank, symbol, name, image }: CoinProps) => {
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
                <CoinCap>$135.69B</CoinCap>
                <CoinVolume>$72.30B</CoinVolume>
              </CoinCapContainer>
            </CoinContent>
          </CoinContentContainer>
          <CoinPriceContainer>
            <CoinPrice>$7664.19</CoinPrice>
            <CoinChange>-2.67%</CoinChange>
          </CoinPriceContainer>
        </CoinContainer>
      </Link>
    </CoinLi>
  );
};

export default Coin;
