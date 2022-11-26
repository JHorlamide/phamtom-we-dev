import Image from 'next/image';
import styles from '../../../styles/dashboard/UploadImage.module.scss';

type UploadProps = {
  imageUrl: string;
  handleUploadFile: () => void;
  inputEl: any;
  height?: string;
  objectFit?: any;
};

const UploadImage = ({
  imageUrl,
  handleUploadFile,
  inputEl,
  height,
  objectFit
}: UploadProps) => {
  return (
    <>
      <div className={styles.upload_cover} style={{ height: height && height }}>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={'100%'}
            height={'132px'}
            layout='fill'
            objectFit={objectFit || 'cover'}
          />
        )}

        <div className={styles.change_cover} onClick={handleUploadFile}>
          <Image
            src={'/assets/dashboard/pharmacy/camera.svg'}
            width={'24px'}
            height={'24px'}
            layout='fixed'
          />
          {imageUrl ? <p>Change cover photo</p> : <p>Upload cover photo</p>}
        </div>
      </div>
      <div style={{ display: 'none' }}>{inputEl}</div>
    </>
  );
};

export default UploadImage;
