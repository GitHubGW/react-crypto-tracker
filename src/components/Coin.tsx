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

const Coin = ({ id, rank, symbol, name, image, price, priceChange, volume, volumeChange }: CoinProps) => {
  return (
    <Container>
      <Link to={`/${id}`} state={{ name, rank }}>
        <Wrapper>
          <RankContainer>
            <Rank>{rank}</Rank>
          </RankContainer>
          <InformationContainer>
            <Image src={image} alt={name} />
            <Content>
              <SymbolContainer>
                <Symbol>{symbol}</Symbol>
                <Name>{name}</Name>
              </SymbolContainer>
              <CapContainer>
                <Volume>${Number(volume.toFixed(2)).toLocaleString("ko-KR")}</Volume>
                <Cap>{volumeChange}%</Cap>
              </CapContainer>
            </Content>
          </InformationContainer>
          <PriceContainer>
            <Price>${Number(price.toFixed(2)).toLocaleString("ko-KR")}</Price>
            <Change isActive={priceChange > 0}>{priceChange > 0 ? `+${priceChange}` : `${priceChange}`}%</Change>
          </PriceContainer>
        </Wrapper>
      </Link>
    </Container>
  );
};

export default Coin;

const Container = styled.div`
  transition: 0.3s;

  &:hover {
    transform: scale(1.025);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.grayColor};
  padding: 20px 0px;
`;

const RankContainer = styled.div`
  flex: 1;
  max-width: 65px;
`;

const Rank = styled.span`
  margin-left: 10px;
  color: ${(props) => props.theme.grayColor};
`;

const InformationContainer = styled.div`
  flex: 2.5;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const Content = styled.div`
  margin-left: 20px;
`;

const SymbolContainer = styled.div`
  margin-bottom: 8px;
`;

const Symbol = styled.span`
  font-weight: bold;
`;

const Name = styled.span`
  font-size: 15px;
  margin-left: 8px;
  color: ${(props) => props.theme.grayColor};
`;

const CapContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Volume = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.grayColor};
`;

const Cap = styled.span`
  font-size: 12px;
  margin-left: 7px;
`;

const PriceContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Price = styled.span`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Change = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive === true ? props.theme.greenColor : props.theme.redColor)};
`;
