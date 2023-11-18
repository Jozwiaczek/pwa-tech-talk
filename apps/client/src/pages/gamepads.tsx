import React, { forwardRef, useEffect, useState } from 'react';
import { SlideContainer } from '@/client/components/layout/SlideContainer';
import { GamepadController } from '@/client/components/GamepadController';
import { checkIsGamepadSupported } from '@/client/utils/checkPwaFeatures';
import { useGamepads } from 'react-gamepads';

const calcDirectionVertical = (axe: number) => {
  if (axe < -0.2) {
    return 'up';
  }
  if (axe > 0.2) {
    return 'down';
  }
};

const calcDirectionHorizontal = (axe: number) => {
  if (axe < -0.2) {
    return 'left';
  }
  if (axe > 0.2) {
    return 'right';
  }
};

const ANALOG_VELOCITY = 0.3;

export function Gamepads(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  const [isMounted, setIsMounted] = useState(false);
  const [gamepad, setGamepad] = useState<Gamepad | null>(null);
  const isGamepadSupported = checkIsGamepadSupported();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isGamepadSupported && useGamepads((gamepads) => setGamepad(gamepads[0]));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!isGamepadSupported) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-4xl font-bold">Gamepads</h1>
        <p className="text-2xl">Gamepads are not supported on this device.</p>
      </SlideContainer>
    );
  }

  if (!gamepad) {
    return (
      <SlideContainer ref={ref}>
        <h1 className="text-4xl font-bold">Gamepads</h1>
        <p className="text-2xl">Connect a gamepad to your device (using bluetooth or USB)</p>
      </SlideContainer>
    );
  }

  return (
    <SlideContainer ref={ref}>
      <h1 className="text-4xl font-bold">Gamepads</h1>
      <GamepadController
        buttonDown={gamepad.buttons[0].pressed}
        buttonRight={gamepad.buttons[1].pressed}
        buttonLeft={gamepad.buttons[2].pressed}
        buttonUp={gamepad.buttons[3].pressed}
        l1={gamepad.buttons[4].pressed}
        r1={gamepad.buttons[5].pressed}
        l2={gamepad.buttons[6].pressed}
        r2={gamepad.buttons[7].pressed}
        select={gamepad.buttons[8].pressed}
        start={gamepad.buttons[9].pressed}
        analogLeftClick={gamepad.buttons[10].pressed}
        analogRightClick={gamepad.buttons[11].pressed}
        directionUp={gamepad.buttons[12].pressed}
        directionDown={gamepad.buttons[13].pressed}
        directionLeft={gamepad.buttons[14].pressed}
        directionRight={gamepad.buttons[15].pressed}
        analogLeft={
          gamepad.axes[0] > ANALOG_VELOCITY ||
          gamepad.axes[0] < -ANALOG_VELOCITY ||
          gamepad.axes[1] > ANALOG_VELOCITY ||
          gamepad.axes[1] < -ANALOG_VELOCITY
        }
        analogRight={
          gamepad.axes[2] > ANALOG_VELOCITY ||
          gamepad.axes[2] < -ANALOG_VELOCITY ||
          gamepad.axes[3] > ANALOG_VELOCITY ||
          gamepad.axes[3] < -ANALOG_VELOCITY
        }
        analogLeftDirection={[
          calcDirectionHorizontal(gamepad.axes[0]),
          calcDirectionVertical(gamepad.axes[1]),
        ]}
        analogRightDirection={[
          calcDirectionHorizontal(gamepad.axes[2]),
          calcDirectionVertical(gamepad.axes[3]),
        ]}
      />
    </SlideContainer>
  );
}

export default forwardRef(Gamepads);
