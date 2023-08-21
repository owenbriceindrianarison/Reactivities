import { Modal } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectModal } from '../store/modal/modalSelectors';
import { close } from '../store/modal/modalSlice';

export function ModalContainer() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  return (
    <Modal open={modal.open} onClose={() => dispatch(close)} size='mini'>
      <Modal.Content>{modal.body}</Modal.Content>
    </Modal>
  );
}
