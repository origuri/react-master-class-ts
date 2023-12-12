import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { users } from "../../db";

const User = () => {
  // 다이나믹 url로 받은 파라미터를 받을 수 있음
  const { userId } = useParams();
  // localhost:3000/?user=ori&geo="seoul" 같은 search url일 경우
  const [readSearchParams, setSearchParams] = useSearchParams();
  console.log(readSearchParams.has("users")); //true
  console.log(readSearchParams.get("geo")); //seoul

  // 2초 뒤에 localhost:3000/?user=ori&geo="seoul" => localhost:3000/?day=today&geo="Tokyo"로 변경
  setTimeout(() => {
    setSearchParams({
      day: "today",
      geo: "Tokyo",
    });
  }, 2000);

  return (
    <div>
      <h1>
        유저 아이디 : {userId}, 이름 : {users[Number(userId) - 1].name}
      </h1>
      <hr />
      {/* <Link to={`/users/${userId}/followers`}>팔로우</Link> */}
      <Link to={`followers`}>팔로우</Link>
      {/* Outlet 컴포넌트가 Followers 컴포넌트로 교체된다. 
        context 키 값으로 object를 보냈음 
      */}
      <Outlet
        context={{
          nameOfMyUser: users[Number(userId) - 1].name,
        }}
      />
    </div>
  );
};

export default User;
