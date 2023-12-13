import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Tabs from "../components/Tabs";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

interface ILocation {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}
interface Quotes {
  USD: Usd;
}

interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

type TParams = { coinId: string };
interface IChartDarkProps {
  isDark: boolean;
}
const Coin = () => {
  // 타입을 명시하고 싶으면 이렇게 해도 되는데 v6부터는 알아서 잡아줌
  // useQuery를 사용할 거면 타입을 직접 명시 하던가 인터페이스가 아닌 타입로 명시하던가
  const { coinId } = useParams() as TParams;
  //const { coinId } = useParams() as { coinId: string };
  //const { coinId } = useParams();

  // router v6부터는 제네릭을 지원하지 않아서 as로 사용해야 함
  const { state } = useLocation() as ILocation;
  const { isDark } = useOutletContext<IChartDarkProps>();
  console.log("coins 이거->", isDark);
  /* useQuery는 고유의 아이디를 가지고 있어야 함
     고유 아이디는 배열로 가지고 있기 때문에 두 개의 키로 pk를 만들면 해결 가능
  */
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ITickersData>(
      ["ticker", coinId],
      () => fetchCoinTickers(coinId) /* , {
      refetchInterval: 3000, // 3초마다 리페치 됨.
    } */
    );
  // 두 개의 로딩이 true면
  const isLoading = infoLoading && tickersLoading;
  /*
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      console.log(priceInfo);

      setIsLoading(false);
    })();
  }, [coinId]);
 */
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>price</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
      <Tabs />
      {/* Outlet태그가 chart와 price 컴포넌트로 변경된다. 
        객체로 보내야 coinId를 string으로 받을 수 있음
      */}
      <Outlet context={{ coinId: coinId, isDark }} />
    </Container>
  );
};

export default Coin;
