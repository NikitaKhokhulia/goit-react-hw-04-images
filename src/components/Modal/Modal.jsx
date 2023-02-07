/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Overlay, Modal } from './Modal.styled';

export function ModalItem({ toggle, imgUrl }) {
  const handleClick = e => {
    if (e.target === e.currentTarget) {
      toggle();
    }
  };

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      toggle();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  return (
    <Overlay onClick={handleClick}>
      <Modal>
        <img src={imgUrl} alt="" />
      </Modal>
    </Overlay>
  );
}

// export class ModalItem extends Component {
//   handleClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.toggle();
//     }
//   };

//   handleKeydown = e => {
//     if (e.code === 'Escape') {
//       this.props.toggle();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeydown);
//   }

//   render() {
//     return (
//       <Overlay onClick={this.handleClick}>
//         <Modal>
//           <img src={this.props.imgUrl} alt="" />
//         </Modal>
//       </Overlay>
//     );
//   }
// }
