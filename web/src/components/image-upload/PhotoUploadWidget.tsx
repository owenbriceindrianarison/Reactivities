import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { PhotoWidgetDropzone } from './PhotoWidgetDropzone';
import { PhotoWidgetCropper } from './PhotoWidgetCropper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { uploadPhotoAsync } from '../../store/profile/profileActions.thunk';
import { selectUploadLoading } from '../../store/profile/profileSelectors';

interface Props {
  setAddPhotoMode: Dispatch<SetStateAction<boolean>>;
}

export function PhotoUploadWidget({ setAddPhotoMode }: Props) {
  const [files, setFiles] = useState<any>();
  const [cropper, setCropper] = useState<Cropper>();
  const dispatch = useAppDispatch();
  const uploadPhotoLoading = useAppSelector(selectUploadLoading);

  function handlePhotoUpload(file: Blob) {
    dispatch(uploadPhotoAsync(file)).then(() => setAddPhotoMode(false));
  }

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => handlePhotoUpload(blob!));
    }
  }

  useEffect(() => {
    return () => {
      if (files && files.length > 0)
        files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 2 - Resize Image' />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 3 - Preview & Upload' />
        {files && files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, overflow: 'hidden' }}
            />
            <Button.Group widths={2}>
              <Button
                loading={uploadPhotoLoading}
                onClick={onCrop}
                positive
                icon='check'
              />
              <Button
                disabled={uploadPhotoLoading}
                onClick={() => setFiles([])}
                icon='close'
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
