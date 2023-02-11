import { ButtonMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <ButtonMore type="button" onClick={onClick}>
        Load more
      </ButtonMore>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
