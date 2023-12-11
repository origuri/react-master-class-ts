import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const onAboutClick = () => {
    navigate("/about");
  };

  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>about</button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
