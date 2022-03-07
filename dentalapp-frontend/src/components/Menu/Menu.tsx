import StyledMenu from './Menu.style';

const Menu = (): JSX.Element => {
  console.log('menu');
  return (
    <StyledMenu>
      <ul className="menu__content">
        <router-link to="/home">
          <li>
            <a>Home</a>
          </li>
        </router-link>
        <router-link to="/doctors">
          <li>
            <a>Doctors</a>
          </li>
        </router-link>
        <router-link to="/patients">
          <li>
            <a>Patients</a>
          </li>
        </router-link>
        <router-link to="/orders">
          <li>
            <a>Orders</a>
          </li>
        </router-link>
        <router-link to="/admin" v-if="showAdminButton">
          <li>
            <a>Admin</a>
          </li>
        </router-link>
        <router-link to="/logout" v-if="showLogoutButton">
          <li>
            <a>Logout</a>
          </li>
        </router-link>
        <router-link to="/login" v-if="showLoginButton">
          <li>
            <a>Login</a>
          </li>
        </router-link>
        <router-link to="/profile" v-if="showProfileButton">
          <li>
            <a>Profile</a>
          </li>
        </router-link>
      </ul>
    </StyledMenu>
  );
};

export default Menu;
