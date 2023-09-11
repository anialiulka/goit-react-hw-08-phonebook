import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filteredContacts } from 'redux/filter/slice';
import { selectFilter } from 'redux/filter/selectors';

export const Filter = () => {
  const { filter } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = e => dispatch(filteredContacts(e.target.value));

  return (
    <label htmlFor="filter" className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        required
        onChange={handleChange}
        value={filter}
      />
    </label>
  );
};
