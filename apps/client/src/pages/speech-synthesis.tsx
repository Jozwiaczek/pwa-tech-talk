import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { Slider, SliderValue, Textarea } from '@nextui-org/react';
import { checkIsSynthesisSpeechSupported } from '@/client/utils/checkPwaFeatures';
import { useIsMounted } from '@/client/hooks/useIsMounted';
import {
  BackspaceIcon,
  ExclamationTriangleIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/client/components/Button';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'react-use';
import { LOCAL_STORAGE_KEYS } from '@/client/constants/local-storage-keys';

const SpeechSynthesisVoiceSelect = dynamic(
  () => import('@/client/components/SpeechSynthesisVoiceSelect'),
  {
    ssr: false,
  },
);

const DEFAULT_TEXT_TO_SPEAK = 'Welcome to the PWA presentation! This is a sample text to speak.';
const DEFAULT_RATE = 1;
const DEFAULT_PITCH = 1;
const DEFAULT_VOLUME = 1;

export function SpeechSynthesisPage(_: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const isSupported = checkIsSynthesisSpeechSupported();
  const isMounted = useIsMounted();
  const [storedFinalTranscript] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.SPEECH_RECOGNITION_FINAL_TRANSCRIPT,
  );
  const [text, setText] = useState(storedFinalTranscript || DEFAULT_TEXT_TO_SPEAK);
  const [rate, setRate] = useState<SliderValue>(DEFAULT_RATE);
  const [pitch, setPitch] = useState<SliderValue>(DEFAULT_PITCH);
  const [volume, setVolume] = useState<SliderValue>(DEFAULT_VOLUME);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | undefined>();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPendingSpeak, setIsPendingSpeak] = useState(false);

  const checkSpeechSynthesisState = useCallback(() => {
    if (!isSupported) {
      return;
    }

    const speechSynthesisInstance = window.speechSynthesis;
    if (speechSynthesisInstance.speaking) {
      setIsSpeaking(true);
      setIsPendingSpeak(true);
      return;
    }
    if (speechSynthesisInstance.paused) {
      setIsSpeaking(false);
      setIsPendingSpeak(true);
      return;
    }
    if (speechSynthesisInstance.pending) {
      setIsPendingSpeak(true);
      return;
    }
  }, [isSupported]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    checkSpeechSynthesisState();
  }, [checkSpeechSynthesisState, isMounted]);

  if (!isMounted) {
    return null;
  }

  if (!isSupported) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-4xl font-bold">Speech Synthesis API</h1>
        <p className="max-w-2xl">
          The SpeechSynthesis API can be integrated into a PWA to convert text into spoken language
          and generate natural-sounding speech output.
        </p>
        <p className="font-bold text-red-500">Your browser does not support this feature</p>
      </SlideContainer>
    );
  }

  const resetParameters = () => {
    setRate(DEFAULT_RATE);
    setPitch(DEFAULT_PITCH);
    setVolume(DEFAULT_VOLUME);
  };

  const pauseSpeaking = () => {
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  };

  const cancelSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPendingSpeak(false);
  };

  const resumeSpeaking = () => {
    window.speechSynthesis.resume();
    setIsSpeaking(true);
  };

  const startSpeaking = () => {
    const speechSynthesisInstance = window.speechSynthesis;
    if (!speechSynthesis) {
      return;
    }

    if (speechSynthesisInstance.speaking || speechSynthesisInstance.pending) {
      toast.error('Speech synthesis is already in progress');
      return;
    }

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = selectedVoice || null;
    utterance.rate = Array.isArray(rate) ? rate[0] : rate;
    utterance.pitch = Array.isArray(pitch) ? pitch[0] : pitch;
    utterance.volume = Array.isArray(volume) ? volume[0] : volume;
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPendingSpeak(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPendingSpeak(false);
    };

    speechSynthesisInstance.speak(utterance);
    setIsSpeaking(true);
    setIsPendingSpeak(true);
  };

  return (
    <SlideContainer ref={ref} disableSwipeNav>
      <div className="flex max-w-2xl flex-col items-center justify-center gap-5 sm:gap-10">
        <h1 className="text-4xl font-bold">Speech Synthesis API</h1>
        <p className="text-warning flex flex-col items-center justify-center gap-1 font-semibold">
          <ExclamationTriangleIcon className="size-5" />
          Slide swipe navigation is disabled for this slide. Use bottom navigation instead.{' '}
        </p>
        <p className="max-w-2xl">
          The SpeechSynthesis API can be integrated into a PWA to convert text into spoken language
          and generate natural-sounding speech output.
        </p>
        <Textarea
          label="Text"
          placeholder="Enter text to speak"
          value={text}
          onValueChange={setText}
          isDisabled={isSpeaking || isPendingSpeak}
        />
        <SpeechSynthesisVoiceSelect
          selectedVoice={selectedVoice}
          setSelectedVoice={setSelectedVoice}
          isDisabled={isSpeaking || isPendingSpeak}
        />
        <Slider
          label="Rate"
          minValue={0.1}
          maxValue={10}
          step={0.1}
          showTooltip
          value={rate}
          onChange={setRate}
          isDisabled={isSpeaking || isPendingSpeak}
        />
        <Slider
          label="Pitch"
          minValue={0}
          maxValue={2}
          step={0.1}
          showTooltip
          value={pitch}
          onChange={setPitch}
          isDisabled={isSpeaking || isPendingSpeak}
        />
        <Slider
          label="Volume"
          minValue={0}
          maxValue={1}
          step={0.01}
          formatOptions={{ style: 'percent' }}
          showTooltip
          value={volume}
          onChange={setVolume}
          isDisabled={isSpeaking || isPendingSpeak}
        />
        <Button
          onPress={resetParameters}
          color="warning"
          size="sm"
          endContent={<BackspaceIcon className="size-5" />}
          isDisabled={
            (rate === DEFAULT_RATE && pitch === DEFAULT_PITCH && volume === DEFAULT_VOLUME) ||
            isSpeaking ||
            isPendingSpeak
          }
        >
          Reset parameters
        </Button>
        <div className="flex w-full flex-wrap justify-center gap-5">
          {isPendingSpeak && (
            <Button
              onPress={cancelSpeaking}
              size="lg"
              color="danger"
              endContent={<XMarkIcon className="size-5" />}
            >
              Cancel
            </Button>
          )}
          {isSpeaking && (
            <Button
              onPress={pauseSpeaking}
              size="lg"
              color="primary"
              endContent={<PauseIcon className="size-5" />}
            >
              Pause
            </Button>
          )}
          {!isSpeaking && !isPendingSpeak && (
            <Button
              onPress={startSpeaking}
              size="lg"
              color="primary"
              endContent={<PlayIcon className="size-5" />}
            >
              Speak
            </Button>
          )}
          {!isSpeaking && isPendingSpeak && (
            <Button
              onPress={resumeSpeaking}
              size="lg"
              color="primary"
              endContent={<PlayIcon className="size-5" />}
            >
              Resume
            </Button>
          )}
        </div>
      </div>
    </SlideContainer>
  );
}

export default forwardRef(SpeechSynthesisPage);
