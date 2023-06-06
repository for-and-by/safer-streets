import React, { useEffect, useRef, useState } from "react";

import { useAsyncAction } from "~/hooks/use-async-action";

import Wrapper from "~/components/inputs/wrapper";

import { Warning } from "~/components/composites/warning";
import Toast from "~/components/regions/toast";
import type { FieldError } from "react-hook-form";
import { parseFileAsBase64 } from "~/lib/image";

interface Props {
  onUpload?: (image: string) => void;
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
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState(value);
  useEffect(() => {
    setImage(value);
  }, [value]);

  const { isLoading, handleAsyncAction: handleProcessFile } = useAsyncAction({
    action: parseFileAsBase64,
    onSuccess: (data) => {
      if (onUpload) onUpload(data);
      setImage(data);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleUpload = () => {
    inputRef?.current?.click();
  };

  const handleRemove = () => {
    setImage(undefined);
    if (inputRef.current) inputRef.current.value = "";
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
            <i className="icon icon-image before:text-5xl before:text-gray-400" />
            <p className="text-gray-400">{placeholder}</p>
          </div>
        ) : (
          <div className="relative h-40 w-full">
            <div className="absolute -inset-3 overflow-hidden rounded-sm">
              <img
                src={image}
                alt="User's Upload"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -inset-1">
              <div className="absolute right-0 top-0 flex space-x-2">
                <button className="btn btn-white" onClick={handleUpload}>
                  <i className="btn-icon icon icon-save-over" />
                </button>
                <Warning.Trigger className="btn btn-white">
                  <i className="btn-icon icon icon-trash before:text-red-600" />
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
