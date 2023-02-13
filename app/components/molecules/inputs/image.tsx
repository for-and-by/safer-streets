import React, { useEffect } from "react";

import parseFileAsBase64 from "~/lib/parse-file-as-base64";

import useAsync from "~/hooks/use-async";

import Wrapper from "~/components/molecules/inputs/wrapper";

import { Warning } from "~/components/composites/warning";
import Toast from "~/components/regions/toast";
import type { FieldError } from "react-hook-form";

interface Props {
  onUpload?: (image: string, file: File) => void;
  onRemove?: () => void;

  error?: FieldError;
  value?: string;
  placeholder?: string;
}

export default function ImageInput({
  onUpload,
  onRemove,
  value,
  error,
  placeholder,
}: Props) {
  const [image, setImage] = React.useState<string | undefined>(value);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { isLoading, trigger } = useAsync(async () => {
    if (!file) return;
    const image = await parseFileAsBase64(file);
    setImage(image);
    if (onUpload) onUpload(image, file);
  });

  React.useEffect(() => {
    setImage(value);
  }, [value]);

  useEffect(() => {
    if (file) trigger();
  }, [file]);

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
    if (onRemove) onRemove();
  };

  return (
    <Warning>
      <Wrapper error={error}>
        <Toast content="Processing Image..." show={isLoading} />
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
                <Warning.Trigger className="btn btn-light">
                  <i className="btn-icon icon icon-remove before:text-red-600" />
                </Warning.Trigger>
              </div>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleChange}
        />
      </Wrapper>
      <Warning.Panel
        heading="Remove Image"
        body="Are you sure you want to remove this image?"
        onConfirm={handleRemove}
      />
    </Warning>
  );
}
