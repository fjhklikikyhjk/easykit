// Header.js
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/:username' exact>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to='/info'>info</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
