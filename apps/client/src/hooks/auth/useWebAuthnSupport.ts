import {
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
  platformAuthenticatorIsAvailable,
} from '@simplewebauthn/browser';
import { useEffect, useState } from 'react';

interface WebauthnSupport {
  // Is browser able to make WebAuthn API calls
  webauthn: boolean;
  // Checks whether browser is capable of presenting a list of the user's discoverable credentials in the browser's native autofill prompt
  autofill: boolean;
  // Checks whether browser is capable of using platform authenticators (e.g. Touch ID, Face ID, Windows Hello, etc.)
  platformAuthenticator: boolean;
}

const DEFAULT_VALUE: WebauthnSupport = {
  webauthn: false,
  autofill: false,
  platformAuthenticator: false,
};

export const useWebAuthnSupport = () => {
  const [webauthnSupport, setWebauthnSupport] = useState<WebauthnSupport>(DEFAULT_VALUE);

  useEffect(() => {
    const checkWebauthnSupport = async () => {
      const isBrowserSupportsWebauthn = browserSupportsWebAuthn();
      if (!isBrowserSupportsWebauthn) {
        setWebauthnSupport({
          webauthn: false,
          autofill: false,
          platformAuthenticator: false,
        });
        return;
      }

      const isBrowserSupportsWebAuthnAutofill = await browserSupportsWebAuthnAutofill();
      const isPlatformAuthenticatorAvailable = await platformAuthenticatorIsAvailable();
      setWebauthnSupport({
        webauthn: isBrowserSupportsWebauthn,
        autofill: isBrowserSupportsWebAuthnAutofill,
        platformAuthenticator: isPlatformAuthenticatorAvailable,
      });
    };
    void checkWebauthnSupport();
  }, []);

  return webauthnSupport;
};
