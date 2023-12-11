import styled, { keyframes } from "styled-components";

const Wapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  /* light일 땐 흰색 dark일 땐 검정색이 들어감 */
  background-color: ${(props) => props.theme.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
// rotate 0에서 360도 도는 애니메이션
const examAnimation = keyframes`
0%{
  transform: rotate(0deg);
}
50%{
  transform: rotate(360deg);
  border-radius: 50px;
}
100%{
  transform: rotate(0deg);
}
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 50px;
`;

const Box = styled.div`
  // 1s는 1초동안 한바퀴 linear는 같은 속도로 움직이는 것, infinite는 무한히 돌아가는 것.
  animation: ${examAnimation} 1s ease-in-out infinite;
  // span 태그만 타겟팅 해서 css 설정
  ${Title} {
    &:hover {
      font-size: 100px;
    }
  }
`;

function App() {
  return (
    <Wapper>
      <Title>hello</Title>
    </Wapper>
  );
}

export default App;
