import css from './Contacts.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'redux/contacts/selectors';

export const Contacts = ({ children }) => {
  const isLoading = useSelector(selectIsLoading);
  if (isLoading) {
    return <div> Loading... </div>;
  }
  return <ul className={css.list}>{children}</ul>;
};
