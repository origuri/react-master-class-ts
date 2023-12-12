import React from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const TabWapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

// tab에 props를 준 것.
// styled-components에서 props로 사용하려면 "$"표시를 꼭 앞에 넣을 것
const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    //styled-components에서 props로 사용하려면 "$"표시를 꼭 앞에 넣을 것
    props.$isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

const Tabs = () => {
  // useMatch는 url 전부를 써줘야 함.
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  console.log("chartMatch-> ", chartMatch);

  return (
    <TabWapper>
      {/* chartMatch의 값이 null 아니면 해당 페이지에 있는 것.
        styled-components에서 props로 사용하려면 "$"표시를 꼭 앞에 넣을 것
      
      */}

      <Tab $isActive={chartMatch !== null}>
        <Link to={"chart"}>Chart</Link>
      </Tab>
      <Tab $isActive={priceMatch !== null}>
        <Link to={"price"}>Price</Link>
      </Tab>
    </TabWapper>
  );
};

export default React.memo(Tabs);
