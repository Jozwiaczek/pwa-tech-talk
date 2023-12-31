import React, { forwardRef, useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Checkbox,
  Divider,
  Textarea,
} from '@nextui-org/react';
import { Button } from '@/client/components/Button';
import { ArrowPathIcon, LanguageIcon, PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import SpeechRecognition, {
  ListeningOptions,
  useSpeechRecognition,
} from 'react-speech-recognition';
import {
  SPEECH_RECOGNITION_LANGUAGES,
  SupportedLanguage,
} from '@/client/data/speech-recognition-languages';
import { getISO3166CountryCode } from '@/client/utils/getISO3166CountryCode';
import { useLocalStorage } from 'react-use';
import { LOCAL_STORAGE_KEYS } from '@/client/constants/local-storage-keys';
import { SlideTitle } from '@/client/components/SlideTitle';

interface SupportedListeningOptions extends Omit<ListeningOptions, 'language'> {
  language?: SupportedLanguage | null;
}

const isSupportedLanguage = (language: string): language is SupportedLanguage => {
  return SPEECH_RECOGNITION_LANGUAGES.some((lang) => lang.tag === language);
};

export function SpeechRecognitionPage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    isMicrophoneAvailable,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [listeningOptions, setListeningOptions] = useState<SupportedListeningOptions>({
    continuous: false,
    language: 'en-US',
  });
  const [isAutoLanguage, setIsAutoLanguage] = useState(false);
  const [, setStoredFinalTranscript] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.SPEECH_RECOGNITION_FINAL_TRANSCRIPT,
  );

  useEffect(() => {
    if (finalTranscript) {
      setStoredFinalTranscript(finalTranscript);
    }
  }, [finalTranscript, setStoredFinalTranscript]);

  const reset = async () => {
    resetTranscript();
    toast.info('Transcript reset');
  };

  const toggleListening = async () => {
    if (!browserSupportsSpeechRecognition) {
      toast.warn('Your browser does not support speech recognition');
      return;
    }

    if (!isMicrophoneAvailable) {
      toast.warn('Your microphone is not available');
      return;
    }

    if (listening) {
      await SpeechRecognition.stopListening();
      toast.success('Recording stopped');
      return;
    }
    if (!listeningOptions.language && !isAutoLanguage) {
      toast.warn('You must select a language');
      return;
    }

    toast.info('Recording started');
    await SpeechRecognition.startListening({
      ...listeningOptions,
      language: isAutoLanguage ? undefined : listeningOptions.language || undefined,
    });
  };

  const handleLanguageAutocompleteChange = (value: React.Key) => {
    if (typeof value !== 'string') {
      setListeningOptions((prev) => ({ ...prev, language: undefined }));
      return;
    }

    if (!isSupportedLanguage(value)) {
      setListeningOptions((prev) => ({ ...prev, language: undefined }));
      toast.warn('This language is not supported');
      return;
    }

    setListeningOptions((prev) => ({ ...prev, language: value }));
  };

  const toggleAutoLanguage = (newValue: boolean) => {
    setIsAutoLanguage(newValue);
  };

  return (
    <SlideContainer ref={ref}>
      <div className="flex max-w-2xl flex-col items-center justify-center gap-5 sm:gap-10">
        <SlideTitle>Speech Recognition API</SlideTitle>
        <p className="max-w-2xl">
          Natively integrate the SpeechRecognition API into your PWA to recognize and transcribe
          spoken language into text, allowing for voice-based input and interactions.
        </p>
        <Divider />
        <div className="flex w-full flex-col gap-5">
          <h2 className="text-2xl">Listening options</h2>
          <Checkbox
            isSelected={listeningOptions.continuous}
            onValueChange={(value) =>
              setListeningOptions((prev) => ({ ...prev, continuous: value }))
            }
          >
            Continuous listening?
          </Checkbox>
          <Checkbox isSelected={isAutoLanguage} onValueChange={toggleAutoLanguage}>
            Auto/Multi language?
          </Checkbox>
          <Autocomplete
            className="w-full"
            isRequired={!isAutoLanguage}
            isDisabled={isAutoLanguage}
            defaultItems={SPEECH_RECOGNITION_LANGUAGES}
            label="Listening language"
            placeholder="Select language"
            selectedKey={listeningOptions.language}
            onSelectionChange={handleLanguageAutocompleteChange}
            startContent={
              listeningOptions.language ? (
                <Avatar
                  alt={listeningOptions.language}
                  className="size-5 mr-1 flex-shrink-0"
                  src={`https://flagcdn.com/${getISO3166CountryCode(
                    listeningOptions.language,
                  )}.svg`}
                />
              ) : (
                <LanguageIcon className="size-5 mr-1 flex-shrink-0" />
              )
            }
          >
            {(languageItem) => (
              <AutocompleteItem
                key={languageItem.tag}
                startContent={
                  <Avatar
                    alt={languageItem.name}
                    className="size-6"
                    src={`https://flagcdn.com/${getISO3166CountryCode(languageItem.tag)}.svg`}
                  />
                }
              >
                {languageItem.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <Divider />
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl">Listening controls</h2>
          <div className="flex gap-5">
            <Button
              size="lg"
              color="primary"
              endContent={
                listening ? <StopIcon className="size-5" /> : <PlayIcon className="size-5" />
              }
              onPress={toggleListening}
            >
              {listening ? 'Stop recording' : 'Start recording'}
            </Button>
            <Button
              size="lg"
              color="secondary"
              onPress={reset}
              className="group"
              isDisabled={!transcript}
              endContent={<ArrowPathIcon className="size-5 group-hover:animate-spin " />}
            >
              Reset
            </Button>
          </div>
        </div>
        <Divider />
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <h2 className="text-2xl">Listening output</h2>
          <Textarea
            isDisabled
            label="Output text"
            placeholder="Here will appear your transcribed text"
            value={transcript}
          />
          <Textarea
            isDisabled
            label="Interim text"
            placeholder="Here will appear your interim text"
            value={interimTranscript}
          />
          <Textarea
            isDisabled
            label="Final text"
            placeholder="Here will appear your final text"
            value={finalTranscript}
          />
        </div>
      </div>
    </SlideContainer>
  );
}

export default forwardRef(SpeechRecognitionPage);
