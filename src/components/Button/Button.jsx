import { ButtonMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <>
      <ButtonMore type="button" onClick={onClick}>
        Load more
      </ButtonMore>
    </>
  );
};
