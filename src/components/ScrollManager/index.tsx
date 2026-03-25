import { useEffect } from 'react';

type Props = {
  section: number;
  maxSection: number;
  onSectionChange: (section: number) => void;
  isAnimating: React.RefObject<boolean>;
};

const ScrollManager = ({ section, maxSection, onSectionChange, isAnimating }: Props) => {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      if (e.deltaY > 0 && section < maxSection) {
        onSectionChange(section + 1);
      } else if (e.deltaY < 0 && section > 0) {
        onSectionChange(section - 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [section, maxSection, onSectionChange, isAnimating]);

  return null;
};

export default ScrollManager;
