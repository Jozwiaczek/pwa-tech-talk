import React, { forwardRef } from 'react';
import { CoverIllustration } from '@/client/assets/illustrations';
import { SlideContainer } from '@/client/components/SlideContainer';

export function Agenda(props: unknown, ref: React.ForwardedRef<HTMLDivElement>) {
  return (
    <SlideContainer ref={ref}>
      <CoverIllustration />
      <p>TODO: Handle QR code</p>
      <h1 className="text-5xl font-bold">Tech Talk Highlights</h1>
      <ul className="flex flex-col items-center gap-4">
        <li>🌟 Groundbreaking Features: Uncover what makes PWAs stand out in the web landscape.</li>
        <li>
          🌍 Real-World Use Cases: Dive into practical examples showcasing the power and versatility
          of PWAs.
        </li>
        <li>
          🛠️ Useful Tricks & Tools: Equip yourself with smart techniques and tools to supercharge
          your PWA development.
        </li>
        <li>
          🎥 Live Demonstrations: Experience firsthand the magic of PWAs through interactive
          examples.
        </li>
        <li>🤝 Networking: Engage with fellow JavaScript developers and share insights.</li>
        <li>📈 Stay Ahead: Be at the cutting edge of web development trends and practices.</li>
      </ul>
    </SlideContainer>
  );
}

export default forwardRef(Agenda);
