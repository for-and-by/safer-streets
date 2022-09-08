import React from "react";

import parseFileAsBase64 from "~/lib/parse-file-as-base64";

import useAsync from "~/hooks/use-async";

import InputWrapper from "~/components/elements/input-wrapper";
import WarningModal from "~/components/modals/warning";
import Toast from "~/components/composites/toast";

interface Props {
  onUpload?: (image: string) => void;
  onRemove?: () => void;

  error?: string | boolean;
  value?: string;
  placeholder?: string;
}

export default function ImageSelect({
  onUpload = () => {},
  onRemove = () => {},
  value,
  error,
  placeholder,
}: Props) {
  const [image, setImage] = React.useState<string | undefined>(value);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { loading } = useAsync(async () => {
    if (!file) return;
    const image = await parseFileAsBase64(file);
    setImage(image);
    onUpload(image);
  }, [file]);

  React.useEffect(() => {
    setImage(value);
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
          className="flex h-40 flex-grow flex-col items-center justify-center space-y-4 hover:cursor-pointer"
          onClick={handleUpload}
        >
          <i className="icon icon-image-location before:text-5xl before:text-gray-400" />
          <p className="text-gray-400">{placeholder}</p>
        </div>
      ) : (
        <div className="relative h-40 w-full">
          <div className="absolute -inset-3 overflow-hidden rounded-sm">
            <img
              className="h-full w-full object-cover"
              alt={file?.name ?? ""}
              src={image ?? ""}
            />
          </div>
          <div className="absolute -inset-1">
            <div className="absolute right-0 top-0 flex space-x-2">
              <button className="btn btn-light" onClick={handleUpload}>
                <i className="btn-icon icon icon-upload" />
              </button>
              <WarningModal
                heading="Remove Image"
                body="Are you sure you want to remove this image?"
                onConfirm={handleRemove}
              >
                <button className="btn btn-light">
                  <i className="btn-icon icon icon-remove before:text-red-600" />
                </button>
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
