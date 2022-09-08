import React from "react";

import getBase64File from "~/lib/get-base-64-file";

import useAsync from "~/hooks/use-async";

import InputWrapper from "~/components/elements/input-wrapper";
import WarningModal from "~/components/modals/warning";
import Toast from "~/components/composites/toast";

interface Props {
  onUpload?: (data: { file: File; image: string }) => void;
  onRemove?: () => void;

  error?: string | boolean;
  value?: File;
  thumb?: string;
  placeholder?: string;
}

export default function ImageSelect({
  onUpload = () => {},
  onRemove = () => {},
  value,
  error,
  thumb,
  placeholder,
}: Props) {
  const [file, setFile] = React.useState<File | undefined>(value);
  const [image, setImage] = React.useState<string | undefined>(thumb);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { loading } = useAsync(async () => {
    if (!file) return;
    const image = await getBase64File(file);
    setImage(image);
    onUpload({ image, file });
  }, [file]);

  React.useEffect(() => {
    setImage(thumb);
  }, [thumb]);

  React.useEffect(() => {
    setFile(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.[0]) return false;
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };

  const handleRemove = () => {
    setImage(undefined);
    onRemove();
  };

  return (
    <InputWrapper error={error}>
      <Toast content="Processing Image..." show={loading} />
      {!image ? (
        <div
          className="flex flex-grow flex-col items-center justify-center space-y-4 p-4 hover:cursor-pointer"
          onClick={handleUpload}
        >
          <i className="icon icon-image-location before:text-5xl before:text-gray-400" />
          <p className="text-gray-400">{placeholder}</p>
        </div>
      ) : (
        <div className="flex flex-grow flex-row space-x-4">
          <img
            height={120}
            width={120}
            className="h-28 w-28 object-cover"
            alt={file?.name ?? ""}
            src={image ?? ""}
          />
          <div className="flex flex-grow flex-col justify-center space-y-1 bg-white p-4">
            <p className="w-44 overflow-hidden overflow-ellipsis text-gray-400">
              {file?.name}
            </p>
            <div className="flex justify-between">
              <p
                className="underline underline-offset-8 hover:cursor-pointer"
                onClick={handleUpload}
              >
                Reupload
              </p>
              <WarningModal
                heading="Remove Image"
                body="Are you sure you want to remove this image?"
                onConfirm={handleRemove}
              >
                <p className="text-red-600 underline underline-offset-8 hover:cursor-pointer">
                  Remove
                </p>
              </WarningModal>
            </div>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </InputWrapper>
  );
}
