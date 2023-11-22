import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

interface WhatArePasskeysModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WhatArePasskeysModal = ({ isOpen, onOpenChange }: WhatArePasskeysModalProps) => (
  <Modal
    size="xl"
    closeButton
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    isOpen={isOpen}
    scrollBehavior="inside"
    onOpenChange={onOpenChange}
    classNames={{
      base: 'max-h-[95%] m-3',
    }}
  >
    <ModalContent>
      <ModalHeader className="mt-5 flex justify-center text-center">
        <h2 id="modal-title" className="text-3xl">
          What are passkeys?
        </h2>
      </ModalHeader>
      <ModalBody className="px-5 pb-5 sm:px-10 sm:pb-10">
        <div className="mb-2 flex items-center justify-center">
          <ShieldCheckIcon height={64} className="text-primary" />
        </div>
        <p id="modal-description">
          A <strong>convenient</strong>, <strong>secure</strong> and <strong>passwordless</strong>{' '}
          way to <strong>access app</strong> using a personalized method (FaceID, TouchID, etc.).
          <br />
          <br />A passkey is a digital credential, tied to a user account and an application.
          Passkeys allow users to authenticate without having to enter a username or password or
          provide any additional authentication factor. This technology aims to replace legacy
          authentication mechanisms such as passwords.
        </p>
        <h4 className="mb-2 mt-4 text-2xl font-medium">Next-generation account security</h4>
        <p>
          Based on FIDO Alliance and W3C standards, passkeys replace passwords with cryptographic
          key pairs. These key pairs profoundly improve security.
        </p>
        <ul className="list-disc pl-6">
          <li className="my-6">
            <strong>Strong credentials</strong>. Every passkey is strong. They’re never guessable,
            reused, or weak.
          </li>
          <li className="my-6">
            <strong>Safe from server leaks.</strong> Because servers only keep public keys, servers
            are less valuable targets for hackers.
          </li>
          <li className="my-6">
            <strong>Safe from phishing.</strong> Passkeys are intrinsically linked with the app or
            website they were created for, so people can never be tricked into using their passkey
            to sign in to a fraudulent app or website.
          </li>
        </ul>
        <p>
          Even in Apple iCloud Keychain, passkeys are end-to-end encrypted, so even Apple can’t read
          them. A passkey ensures a strong, private relationship between a person and your app or
          website.
        </p>
      </ModalBody>
    </ModalContent>
  </Modal>
);
