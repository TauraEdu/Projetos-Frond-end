import React, { useEffect, useState } from 'react'; // { useEffect, useState }
import { useHistory } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

function Profile() {
  // // const [email, setEmail] = useState('');
  const history = useHistory();
  // const email = JSON.parse(localStorage.getItem('user').email);
  // console.log(JSON.parse(localStorage.getItem('user').email));
  // console.log(email);
  const [email, setEmail] = useState('');
  // const history = useHistory();

  useEffect(() => {
    const getEmail = () => {
      const user = JSON.parse(localStorage.getItem('user'))
        ? JSON.parse(localStorage.getItem('user')) : { email: 'usuario' };
        // console.log(JSON.parse(localStorage.getItem('user');
      setEmail(user.email);
    };
    getEmail();
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <div>
        <h4 data-testid="profile-email">{email}</h4>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
