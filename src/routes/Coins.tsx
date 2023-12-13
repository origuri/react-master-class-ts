import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px; // a의 패딩을 크게 함으로써 block의 크기를 Coin만큼 늘려서 전부 클릭되게 함
    transition: color 0.5s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
`;

const CoinImage = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

interface Icoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  // data의 타입을 정해줘야 함.
  // useQuery는 데이터를 캐시에 저장해주고 있기 때문에 뒤로가기 할 때 새로 fetch하지 않음
  const { isLoading, data } = useQuery<Icoins[]>("allCoins", fetchCoins);

  /* const [coins, setCoins] = useState<Icoins[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const jsonData = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      console.log(jsonData.slice(0, 101));
      setCoins(jsonData.slice(0, 101));
      setIsLoading(false);
    })();
  }, []); */
  return (
    <Container>
      <Helmet>
        <title>코코코인</title>
      </Helmet>
      <Header>
        <Title>코코코인</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              {/* outlet을 사용할 경우에 자식 컴포넌트일 경우 앞에 부모 url 생략 가능 
                state를 사용해서 Link 태그로 정보를 보낼 수 있음. 
              */}
              <Link to={`${coin.id}`} state={{ name: coin.name }}>
                <CoinImage
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
