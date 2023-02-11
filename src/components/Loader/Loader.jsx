import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = loading => {
  return (
    <>
      <Dna
        visible={loading}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{
          display: 'flex',
          margin: '0 auto',
        }}
        wrapperClass="dna-wrapper"
      />
    </>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};
