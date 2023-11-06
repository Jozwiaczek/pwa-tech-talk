import React, { forwardRef } from 'react';
import PageTransition from '../components/PageTransition';
import { CoverIllustration } from '@/client/assets/illustrations';

type AgendaPageProps = unknown;
type AgendaPageRef = React.ForwardedRef<HTMLDivElement>;

export function Agenda(props: AgendaPageProps, ref: AgendaPageRef) {
  return (
    <PageTransition ref={ref}>
      <div className="flex h-full min-h-screen w-full flex-col items-center gap-10 p-10 sm:justify-center">
        <CoverIllustration />
        <h1 className="text-5xl font-bold">Tech Talk Highlights</h1>
        <ul className="flex flex-col items-center gap-4">
          <li>
            🌟 Groundbreaking Features: Uncover what makes PWAs stand out in the web landscape.
          </li>
          <li>
            🌍 Real-World Use Cases: Dive into practical examples showcasing the power and
            versatility of PWAs.
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
      </div>
    </PageTransition>
  );
}

export default forwardRef(Agenda);
