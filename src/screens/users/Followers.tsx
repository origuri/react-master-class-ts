import { useOutletContext } from "react-router-dom";

interface outletProps {
  nameOfMyUser: string;
}

function Followers() {
  // outlet의 모든 자식 컴포넌트가 사용할 수 있는 것.
  const { nameOfMyUser } = useOutletContext<outletProps>();
  console.log(nameOfMyUser);

  return <h1>{nameOfMyUser}의 팔로워</h1>;
}

export default Followers;
