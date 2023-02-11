import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDown);
  }

  handlerKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handlerBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image, alt } = this.props;
    return (
      <>
        <Overlay onClick={this.handlerBackdropClick}>
          <ModalWindow>
            <img src={image} alt={alt} />
          </ModalWindow>
        </Overlay>
      </>
    );
  }
}
