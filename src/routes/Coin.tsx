import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const Coin = () => {
  // 타입을 명시하고 싶으면 이렇게 해도 되는데 v6부터는 알아서 잡아줌
  //const { coinId } = useParams() as { coinId: string };
  const { coinId } = useParams();
  console.log(coinId);
  const [isLoading, setIsLoading] = useState(true);
  // router v6부터는 제네릭을 지원하지 않아서 as로 사용해야 함
  const { state } = useLocation() as ILocation;
  console.log(state.name);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {isLoading ? "Loading..." : null}
    </Container>
  );
};

export default Coin;
