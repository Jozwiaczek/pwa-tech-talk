import { checkIsSynthesisSpeechSupported } from '@/client/utils/checkPwaFeatures';
import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { getISO3166CountryCode } from '@/client/utils/getISO3166CountryCode';
import { toast } from 'react-toastify';

interface SpeechSynthesisVoiceSelectProps {
  selectedVoice?: SpeechSynthesisVoice;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  isDisabled?: boolean;
}

const PRIORITY_LANGUAGES = ['pl-PL', 'uk-UA', 'en-US', 'en-GB', 'de-DE', 'es-ES', 'it-IT', 'fr-FR'];

const sortVoices = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] =>
  voices.sort((a, b) => {
    const aIndex = PRIORITY_LANGUAGES.indexOf(a.lang);
    const bIndex = PRIORITY_LANGUAGES.indexOf(b.lang);
    if (aIndex === -1 && bIndex === -1) {
      return a.lang.localeCompare(b.lang);
    }
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }
    return aIndex - bIndex;
  });

const SpeechSynthesisVoiceSelect = ({
  selectedVoice,
  setSelectedVoice,
  isDisabled,
}: SpeechSynthesisVoiceSelectProps) => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const loadAvailableVoices = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    const sortedVoices = sortVoices(voices);
    const firstEnglishVoice = sortedVoices.find((v) => v.lang.startsWith('en'));
    setSelectedVoice(firstEnglishVoice || sortedVoices[0]);
    setAvailableVoices(sortedVoices);
  }, [setSelectedVoice]);

  useEffect(() => {
    if (!checkIsSynthesisSpeechSupported()) {
      toast.warn('Your browser does not support this feature');
      return;
    }
    loadAvailableVoices();

    window.speechSynthesis.addEventListener('voiceschanged', loadAvailableVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadAvailableVoices);
    };
  }, [loadAvailableVoices]);

  const handleSelectionChange = (voiceURI: React.Key) => {
    const selectedVoice = availableVoices.find((v) => v.voiceURI === voiceURI);
    if (!selectedVoice) {
      return null;
    }
    setSelectedVoice(selectedVoice);
  };

  return (
    <Autocomplete
      isDisabled={isDisabled}
      allowsCustomValue
      className="w-full"
      defaultItems={availableVoices}
      label="Voice"
      placeholder="Select a voice"
      selectedKey={selectedVoice?.voiceURI}
      onSelectionChange={handleSelectionChange}
      startContent={
        selectedVoice ? (
          <Avatar
            alt={selectedVoice.name}
            className="size-5 mr-2 flex-shrink-0"
            src={
              selectedVoice.lang
                ? `https://flagcdn.com/${getISO3166CountryCode(selectedVoice.lang)}.svg`
                : undefined
            }
          />
        ) : (
          <ChatBubbleBottomCenterIcon className="size-5 mr-2 flex-shrink-0" />
        )
      }
    >
      {availableVoices.map((voice) => (
        <AutocompleteItem
          key={voice.voiceURI}
          startContent={
            <Avatar
              alt={voice.name}
              className="size-6"
              src={
                voice.lang
                  ? `https://flagcdn.com/${getISO3166CountryCode(voice.lang)}.svg`
                  : undefined
              }
            />
          }
        >
          {voice.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default SpeechSynthesisVoiceSelect;
