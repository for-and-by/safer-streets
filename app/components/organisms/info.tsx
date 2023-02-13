import React from "react";
import { nanoid } from "nanoid";

import Logo from "~/components/atoms/logo";

import { Modal } from "~/components/composites/modal";
import Tabs from "~/components/composites/tabs";

import content from "~/content";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function InfoModal({ children, className = "" }: Props) {
  return (
    <Modal>
      <Modal.Trigger className={className}>{children}</Modal.Trigger>
      <Modal.Body>
        <Modal.Tint />
        <Modal.Panel className="h-[50vh] overflow-y-scroll">
          <div className="sticky top-0 flex items-center justify-between bg-white p-2">
            <div className="ml-3 flex-grow">
              <Logo />
            </div>
            <Modal.Close className="btn btn-light">
              <i className="icon icon-close" />
            </Modal.Close>
          </div>
          <Tabs>
            <div className="sticky top-0 border-y border-gray-200 bg-white">
              <Tabs.Items className="flex h-16 flex-row space-x-4 px-4">
                {Object.keys(content).map((key) => {
                  return (
                    <Tabs.Item
                      key={key}
                      className="flex items-center border-b border-white capitalize hover:border-gray-200 d-active:border-brand-600"
                    >
                      {key}
                    </Tabs.Item>
                  );
                })}
              </Tabs.Items>
            </div>
            <div className="p-4">
              <Tabs.Panels>
                {Object.keys(content).map((key) => {
                  return content[key] ? (
                    <Tabs.Panel key={nanoid()}>
                      <div
                        className="prose flex max-w-none flex-col space-y-4 child:m-0"
                        dangerouslySetInnerHTML={{ __html: content[key] }}
                      />
                    </Tabs.Panel>
                  ) : null;
                })}
              </Tabs.Panels>
            </div>
          </Tabs>
        </Modal.Panel>
      </Modal.Body>
    </Modal>
  );
}
