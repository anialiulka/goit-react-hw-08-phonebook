// import { Input } from '../Input';
// import { Title } from '../Title';
// import { Contacts } from '../Contacts';
// import { Filter } from '../FIlter';
// import { ContactElement } from 'components/ContactElement/ContactElement';
import { useDispatch } from 'react-redux';
// import { fetchContacts } from 'redux/contacts/operations';
import { useEffect } from 'react';

// import css from './App.module.css';

import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { useAuth } from 'hooks/useAuth';
import { refreshUser } from 'redux/auth/operations';
import { RestrictedRoute } from 'components/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute';

const HomePage = lazy(() => import('pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

// export const App = () => {
//   const dispatch = useDispatch();
//   const { isLoading, error } = useSelector(fetchContacts);
//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   return (
//     <div className={css.container}>
//       <Title>Phonebook</Title>
//       <Input />
//       <Title>Contacts</Title>
//       {isLoading && <p>Loading contacts...</p>}
//       {error && <p>{error}</p>}
//       <Filter />
//       <Contacts>
//         <ContactElement />
//       </Contacts>
//     </div>
//   );
// };

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};
