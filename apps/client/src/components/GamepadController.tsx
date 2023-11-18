import { DualSenseIllustration } from '@/client/assets/illustrations';
import { useEffect, useMemo, useRef } from 'react';

type AnalogHorizontalDirection = 'left' | 'right' | undefined;
type AnalogVerticalDirection = 'up' | 'down' | undefined;

interface GamepadControllerProps {
  directionUp: boolean | undefined;
  directionDown: boolean | undefined;
  directionLeft: boolean | undefined;
  directionRight: boolean | undefined;
  buttonDown: boolean | undefined;
  buttonRight: boolean | undefined;
  buttonLeft: boolean | undefined;
  buttonUp: boolean | undefined;
  select: boolean | undefined;
  start: boolean | undefined;
  analogLeftClick: boolean | undefined;
  analogRightClick: boolean | undefined;
  r1: boolean | undefined;
  l1: boolean | undefined;
  r2: boolean | undefined;
  l2: boolean | undefined;
  analogLeft: boolean | undefined;
  analogRight: boolean | undefined;
  analogLeftDirection: [AnalogHorizontalDirection, AnalogVerticalDirection];
  analogRightDirection: [AnalogHorizontalDirection, AnalogVerticalDirection];
}

const handleButtonPress = (
  controllerRef: SVGSVGElement,
  buttonId: string,
  pressed: boolean | undefined,
) => {
  if (pressed) {
    controllerRef.getElementById(buttonId).classList.add('activeGamepadButton');
  }
  if (!pressed) {
    controllerRef.getElementById(buttonId).classList.remove('activeGamepadButton');
  }
};

const createTransform = (direction: AnalogHorizontalDirection | AnalogVerticalDirection) => {
  switch (direction) {
    case 'up':
      return 'translateY(-10px)';
    case 'down':
      return 'translateY(10px)';
    case 'left':
      return 'translateX(-10px)';
    case 'right':
      return 'translateX(10px)';
    default:
      return '';
  }
};

const handleAnalogDirection = (
  controllerRef: SVGSVGElement,
  analogId: string,
  directions: [AnalogHorizontalDirection, AnalogVerticalDirection],
) => {
  if (directions.filter(Boolean).length) {
    const [horizontalDirection, verticalDirection] = directions;
    const analogEl = controllerRef.getElementById(analogId);
    if (analogEl) {
      // @ts-ignore - TS doesn't like the transform property
      analogEl.style.transform = `${createTransform(horizontalDirection)} ${createTransform(
        verticalDirection,
      )}`;
    }
  } else {
    const analogEl = controllerRef.getElementById(analogId);
    // @ts-ignore - TS doesn't like the transform property
    analogEl.style.transform = '';
  }
};

export const GamepadController = ({
  directionUp,
  directionDown,
  directionLeft,
  directionRight,
  buttonDown,
  buttonRight,
  buttonLeft,
  buttonUp,
  select,
  start,
  analogLeftClick,
  analogRightClick,
  r1,
  l1,
  r2,
  l2,
  analogLeft,
  analogRight,
  analogLeftDirection,
  analogRightDirection,
}: GamepadControllerProps) => {
  const controllerRef = useRef<SVGSVGElement>(null);

  const buttons = useMemo(
    () =>
      [
        { id: 'directionUp', pressed: directionUp },
        { id: 'directionDown', pressed: directionDown },
        { id: 'directionLeft', pressed: directionLeft },
        { id: 'directionRight', pressed: directionRight },
        { id: 'buttonDown', pressed: buttonDown },
        { id: 'buttonRight', pressed: buttonRight },
        { id: 'buttonLeft', pressed: buttonLeft },
        { id: 'buttonUp', pressed: buttonUp },
        { id: 'select', pressed: select },
        { id: 'start', pressed: start },
        { id: 'r1', pressed: r1 },
        { id: 'l1', pressed: l1 },
        { id: 'r2', pressed: r2 },
        { id: 'l2', pressed: l2 },
        { id: 'analogLeft', pressed: analogLeftClick || analogLeft },
        { id: 'analogRight', pressed: analogRightClick || analogRight },
      ] as const,
    [
      analogLeft,
      analogLeftClick,
      analogRight,
      analogRightClick,
      buttonDown,
      buttonLeft,
      buttonRight,
      buttonUp,
      directionDown,
      directionLeft,
      directionRight,
      directionUp,
      l1,
      l2,
      r1,
      r2,
      select,
      start,
    ],
  );

  useEffect(() => {
    if (!controllerRef.current) {
      return;
    }

    buttons.forEach(({ id, pressed }) => {
      if (!controllerRef.current) {
        return;
      }
      handleButtonPress(controllerRef.current, id, pressed);
    });

    handleAnalogDirection(controllerRef.current, 'analogLeft', analogLeftDirection);
    handleAnalogDirection(controllerRef.current, 'analogRight', analogRightDirection);
  }, [analogLeftDirection, analogRightDirection, buttons]);

  return <DualSenseIllustration ref={controllerRef} />;
};
