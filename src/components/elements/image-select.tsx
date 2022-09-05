import React from "react";
import { useCreateForm } from "~/components/layout/create/provider";
import InputWrapper from "~/components/elements/input-wrapper";
import getBase64File from "~/lib/get-base-64-file";
import useAsync from "~/hooks/use-async";
import WarningModal from "~/components/modals/warning";

export default function ImageSelect() {
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [value, setValue] = React.useState<string | undefined>(undefined);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const form = useCreateForm();

  const { loading, data } = useAsync(async () => {
    if (!file) return;
    const image = await getBase64File(file);
    setValue(image);
    form.update({ image });
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
    form.update({ image: undefined });
  };

  return (
    <InputWrapper>
      {!form.values.image ? (
        <div
          className="flex flex-grow flex-col items-center justify-center space-y-4 rounded-sm border border-dashed border-gray-300 p-4 hover:cursor-pointer"
          onClick={handleUpload}
        >
          {!loading ? (
            <>
              <i className="icon icon-image-location before:text-5xl before:text-gray-400" />
              <p className="text-gray-400">Upload a photo</p>
            </>
          ) : (
            <>
              <i className="icon icon-is-spinning icon-circle-anim before:text-5xl before:text-gray-800" />
              <p className="text-gray-400">Uploading photo...</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-grow flex-row space-x-2">
          <img
            height={120}
            width={120}
            className="h-28 w-28 object-cover"
            src={form?.values?.image ?? ""}
          />
          <div className="flex flex-grow flex-col justify-center space-y-1 bg-white p-4">
            <p className="text-gray-400">{file?.name}</p>
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
