import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";

export default function ReportInfo() {
  const loader = useLoaderData();
  const data = loader?.report;

  const [fullImage, setFullImage] = useState(false);
  const [content, setContent] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  useEffect(() => {
    if (data) {
      setContent({
        Severity: data.content.severity.title,
        Details: data.content.details,
        ...data.content.data,
        "Created On": data.created_at
          ? new Date(data.created_at).toLocaleDateString()
          : undefined,
        "Last Updated": data.updated_at
          ? new Date(data.updated_at).toLocaleDateString()
          : undefined,
      });
    }
  }, [data]);

  if (!data) return null;

  return (
    <>
      {data.content.image_url ? (
        <div
          className={clsx(
            "relative overflow-hidden transition-all",
            !fullImage ? "h-36" : "h-96"
          )}
        >
          <button
            className="btn btn-white absolute bottom-2 right-2 z-20"
            onClick={() => setFullImage((state) => !state)}
          >
            <i
              className={clsx(
                "btn-icon icon",
                !fullImage ? "icon-plus" : "icon-minus"
              )}
            />
          </button>
          <img
            src={data.content.image_url?.replace("/users/users", "/users")}
            alt={`Report ${data.id} Thumbnail`}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col space-y-2 p-2">
        {Object.keys(content).map((key) => (
          <div key={key} className="flex bg-gray-100 p-3">
            <p className="min-w-[112px] capitalize text-gray-400">{key}</p>
            <p>{content[key]}</p>
          </div>
        ))}
      </div>
    </>
  );
}
