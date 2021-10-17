import PropTypes from 'prop-types';
import s from './Button.module.css';
// import { FcCancel } from "react-icons/fc";

export default function Button({ onClick }) {
  return (
    <>
      <button type="button" onClick={onClick} className={s.Button}>
        Load More...
      </button>
    </>
  );
}

Button.ropTypes = {
  onClick: PropTypes.func.isRequired,
};
