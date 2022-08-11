import React from "react";
import { nanoid } from "nanoid";

import Logo from "~/components/elements/logo";

import Modal from "~/components/modals/modal";
import Drawer from "~/components/elements/drawer";
import Tabs from "~/components/elements/tabs";

// import about from "~/content/about.md";
// import contact from "~/content/contact.md";
// import help from "~/content/help.md";

// Component

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const content: { [key: string]: string } = {
  about: "", //marked(about),
  help: "", //marked(help),
  contact: "", //marked(contact),
};

export default function InfoModal({ children, className = "" }: Props) {
  return (
    <Modal>
      <Modal.Trigger className={className}>{children}</Modal.Trigger>
      <Modal.Body>
        <Modal.Tint />
        <Modal.Panel>
          <Drawer.Row sticky className="p-2 pb-0">
            <div className="ml-3 flex-grow">
              <Logo />
            </div>
            <Modal.Close className="btn btn-light">
              <i className="ri-close-fill btn-icon" />
            </Modal.Close>
          </Drawer.Row>
          <Tabs>
            <Drawer.Row className="border-b border-base-200" sticky>
              <Tabs.Items className="flex h-16 flex-row space-x-4 px-4">
                <Tabs.Item className="flex items-center border-b border-white hover:border-gray-200 d-active:border-brand-600">
                  About
                </Tabs.Item>
                <Tabs.Item className="flex items-center border-b border-white hover:border-gray-200 d-active:border-brand-600">
                  Help
                </Tabs.Item>
                <Tabs.Item className="flex items-center border-b border-white hover:border-gray-200 d-active:border-brand-600">
                  Contact
                </Tabs.Item>
              </Tabs.Items>
            </Drawer.Row>
            <Drawer.Row className="p-4">
              <Tabs.Panels>
                {Object.keys(content).map((key) => (
                  <Tabs.Panel key={nanoid()}>
                    <div
                      className="prose flex flex-col space-y-4 child:m-0"
                      dangerouslySetInnerHTML={{ __html: content[key] }}
                    />
                  </Tabs.Panel>
                ))}
              </Tabs.Panels>
            </Drawer.Row>
          </Tabs>
        </Modal.Panel>
      </Modal.Body>
    </Modal>
  );
}
