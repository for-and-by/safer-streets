import React from "react";

import getBase64File from "~/lib/get-base-64-file";

import useAsync from "~/hooks/use-async";

import InputWrapper from "~/components/elements/input-wrapper";
import WarningModal from "~/components/modals/warning";
import Toast from "~/components/composites/toast";
import truncateString from "~/lib/truncate-string";

interface Props {
  onUpload?: (image: string) => void;
  onRemove?: () => void;
  value?: string;
}

export default function ImageSelect({
  onUpload = () => {},
  onRemove = () => {},
  value,
}: Props) {
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [image, setImage] = React.useState<string | undefined>(value);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { loading } = useAsync(async () => {
    if (!file) return;
    const image = await getBase64File(file);
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
    <InputWrapper>
      <Toast content="Processing Image..." show={loading} />
      {!image ? (
        <div
          className="flex flex-grow flex-col items-center justify-center space-y-4 rounded-sm border border-dashed border-gray-300 p-4 hover:cursor-pointer"
          onClick={handleUpload}
        >
          <i className="icon icon-image-location before:text-5xl before:text-gray-400" />
          <p className="text-gray-400">Upload a photo</p>
        </div>
      ) : (
        <div className="flex flex-grow flex-row space-x-2">
          <img
            height={120}
            width={120}
            className="h-28 w-28 object-cover"
            alt={file?.name ?? ""}
            src={image ?? ""}
          />
          <div className="flex flex-grow flex-col justify-center space-y-1 bg-white p-4">
            <p className="text-gray-400">{truncateString(file?.name)}</p>
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
