import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import React, { useEffect } from 'react';
import {
  IOSAddToHomeScreenIllustration,
  IOSShareBtnIllustration,
} from '@/client/assets/illustrations';
import { AppLogo } from '@/client/assets/logos';
import {
  checkIsInStandaloneMode,
  checkIsIosDevice,
  checkIsSafari,
} from '@/client/utils/checkPwaFeatures';
import {
  ArrowsUpDownIcon,
  BookmarkSlashIcon,
  CursorArrowRaysIcon,
  ExclamationTriangleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { useLocalStorage } from 'react-use';
import { LOCAL_STORAGE_KEYS } from '@/client/constants/local-storage-keys';
import { Button } from '@/client/components/Button';

const InstallStep = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-2 whitespace-nowrap">{children}</li>
);

export const InstallAppModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isIosInstallationHidden, setIsIosInstallationHidden] = useLocalStorage<boolean>(
    LOCAL_STORAGE_KEYS.IS_IOS_INSTALLATION_HIDDEN,
    false,
    {
      raw: false,
      deserializer: (value) => value === 'true',
      serializer: (value) => value.toString(),
    },
  );

  const isSafari = checkIsSafari();

  const handleModalClose = () => {
    onClose();
  };

  const handleUltimateClose = () => {
    setIsIosInstallationHidden(true);
    onClose();
  };

  useEffect(() => {
    if (checkIsIosDevice() && !checkIsInStandaloneMode() && !isIosInstallationHidden) {
      onOpen();
    }
  }, [isIosInstallationHidden, onClose, onOpen]);

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      backdrop="blur"
      placement="center"
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={handleModalClose}
    >
      <ModalContent className="py-10">
        <ModalHeader className="flex flex-col items-center justify-center gap-4 text-center">
          <AppLogo className="size-16 border-1 border-content3 rounded-2xl" />
          <h1 id="modal-title" className="text-5xl font-bold">
            Install the app
          </h1>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center justify-center text-center">
          <p id="modal-description">
            Install this application on your home screen for quick and easy access. This will also
            enable support for push notifications demo.
          </p>
          {!isSafari && (
            <div className="flex flex-col items-center justify-center gap-2">
              <ExclamationTriangleIcon className="size-10 text-warning" />
              <p className="text-warning font-semibold">
                Open this application using
                <br />
                Safari browser to install the app.
              </p>
            </div>
          )}
          {isSafari && (
            <ol className="bg-default-100 mt-5 flex flex-col gap-3 rounded-xl p-3 text-center">
              <InstallStep>
                <CursorArrowRaysIcon className="size-5 text-primary-300" />
                Tap on <IOSShareBtnIllustration /> in the tap bar
              </InstallStep>
              <InstallStep>
                <ArrowsUpDownIcon className="size-5 text-primary-500" />
                Scroll and select <IOSAddToHomeScreenIllustration />
              </InstallStep>
              <InstallStep>
                <EyeIcon className="size-5 text-primary-700" />
                Look for the <AppLogo /> icon on your home screen
              </InstallStep>
            </ol>
          )}
          <Button
            className="mt-5"
            variant="ghost"
            endContent={<BookmarkSlashIcon className="size-5" />}
            onPress={handleUltimateClose}
          >
            Don&apos;t show again
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
