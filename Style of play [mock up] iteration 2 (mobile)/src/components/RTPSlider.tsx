import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import Frame1597883049 from '../imports/Frame1597883049';
import HandleHover from '../imports/HandleHover';

type ScaleLabelProps = {
  value: number;
  label: string;
  valueToPercent: (value: number) => number;
};

function ScaleLabel({ value, label, valueToPercent }: ScaleLabelProps) {
  const percent = valueToPercent(value);
  return (
    <div
      className="absolute top-0 -translate-x-1/2"
      style={{ left: `${percent}%` }}
    >
      <div className="bg-white h-[4px] relative rounded-[1px] w-px">
        <div
          className="absolute flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] text-[10px] text-center text-nowrap text-white top-[calc(50%+9px)] left-1/2 -translate-x-1/2 translate-y-[-50%]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          <p className="leading-[normal] whitespace-pre">{label}</p>
        </div>
      </div>
    </div>
  );
}

type ScaleTickProps = {
  value: number;
  valueToPercent: (value: number) => number;
};

function ScaleTick({ value, valueToPercent }: ScaleTickProps) {
  const percent = valueToPercent(value);
  return (
    <div
      className="absolute top-0 -translate-x-1/2"
      style={{ left: `${percent}%` }}
    >
      <div className="bg-white h-[4px] relative rounded-[1px] w-px" />
    </div>
  );
}

type RTPSliderProps = {
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  activePreset?: 'quick-wins' | 'casual-fun' | 'long-run' | 'big-thrills' | 'high-stakes' | null;
};

export default function RTPSlider({ minValue, maxValue, onChange, activePreset = null }: RTPSliderProps) {
  const [draggedHandle, setDraggedHandle] = useState<'min' | 'max' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Store the latest onChange in a ref to avoid re-creating event listeners
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const MIN = 90;
  const MAX = 97;
  const HANDLE_WIDTH = 30;
  const PADDING_PX = 3;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const valueToPercent = (value: number) => {
    return ((value - MIN) / (MAX - MIN)) * 100;
  };

  const percentToValue = (percent: number) => {
    return MIN + (percent / 100) * (MAX - MIN);
  };

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedHandle(handle);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedHandle || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const rawValue = percentToValue(percent);
      
      // Snap to 0.5 increments
      const snappedValue = Math.round(rawValue * 2) / 2;

      // Set minimum value gap to 0.5
      const minValueGap = 0.5;

      if (draggedHandle === 'min') {
        const constrainedValue = Math.max(MIN, Math.min(snappedValue, maxValue - minValueGap));
        onChangeRef.current(constrainedValue, maxValue);
      } else {
        const constrainedValue = Math.min(MAX, Math.max(snappedValue, minValue + minValueGap));
        onChangeRef.current(minValue, constrainedValue);
      }
    };

    const handleMouseUp = () => {
      setDraggedHandle(null);
    };

    if (draggedHandle) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedHandle, minValue, maxValue]);

  const minPercent = valueToPercent(minValue);
  const maxPercent = valueToPercent(maxValue);
  
  let handleRadiusPercent = 0;
  let paddingPercent = 0;
  let barLeft = minPercent;
  let barWidth = maxPercent - minPercent;
  
  if (containerWidth > 0) {
    handleRadiusPercent = (HANDLE_WIDTH / 2 / containerWidth) * 100;
    paddingPercent = (PADDING_PX / containerWidth) * 100;
    barLeft = minPercent - handleRadiusPercent - paddingPercent;
    barWidth = (maxPercent - minPercent) + (2 * handleRadiusPercent) + (2 * paddingPercent);
  }

  // Get border color based on active preset
  const getBorderColor = () => {
    switch (activePreset) {
      case 'quick-wins':
        return '#4caf50';
      case 'casual-fun':
        return '#2196f3';
      case 'long-run':
        return '#9c27b0';
      case 'big-thrills':
        return '#ff9800';
      case 'high-stakes':
        return '#b12e5f';
      default:
        return 'rgba(255,255,255,0.1)';
    }
  };

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
      <div className="h-[36px] relative w-full px-[17px]">
        <div ref={containerRef} className="absolute inset-0 left-[17px] right-[17px]">
          {/* Slider background with preset-themed border */}
          <motion.div 
            className="absolute inset-y-0 bg-transparent rounded-[50px]"
            style={{
              left: `${-handleRadiusPercent - paddingPercent}%`,
              width: `${100 + (2 * handleRadiusPercent) + (2 * paddingPercent)}%`,
              border: `1px solid ${getBorderColor()}`,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          
          {/* Selected range bar */}
          <motion.div
            className="absolute top-0 h-full bg-white/30 rounded-[50px] z-10"
            animate={{
              left: `${barLeft}%`,
              width: `${barWidth}%`,
            }}
            transition={{ 
              duration: draggedHandle ? 0 : 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            initial={false}
          >
            {/* Left handle */}
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 z-20"
              style={{ paddingLeft: `${PADDING_PX}px` }} 
              onMouseDown={handleMouseDown('min')}
              onTouchStart={(e) => {
                e.preventDefault();
                setDraggedHandle('min');
              }}
            >
              <div className="w-[30px] h-[30px]">
                {draggedHandle === 'min' ? (
                  <HandleHover />
                ) : (
                  <Frame1597883049 />
                )}
              </div>
            </div>

            {/* Right handle */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 z-20"
              style={{ paddingRight: `${PADDING_PX}px` }}
              onMouseDown={handleMouseDown('max')}
              onTouchStart={(e) => {
                e.preventDefault();
                setDraggedHandle('max');
              }}
            >
              <div className="w-[30px] h-[30px]">
                {draggedHandle === 'max' ? (
                  <HandleHover />
                ) : (
                  <Frame1597883049 />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-[15px] opacity-50 relative shrink-0 w-full">
        <div className="box-border size-full px-[17px] relative">
          <div className="absolute inset-0 left-[17px] right-[17px]">
            <ScaleLabel value={90} label="< 90%" valueToPercent={valueToPercent} />
            <ScaleTick value={90.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={91} label="91%" valueToPercent={valueToPercent} />
            <ScaleTick value={91.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={92} label="92%" valueToPercent={valueToPercent} />
            <ScaleTick value={92.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={93} label="93%" valueToPercent={valueToPercent} />
            <ScaleTick value={93.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={94} label="94%" valueToPercent={valueToPercent} />
            <ScaleTick value={94.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={95} label="95%" valueToPercent={valueToPercent} />
            <ScaleTick value={95.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={96} label="96%" valueToPercent={valueToPercent} />
            <ScaleTick value={96.5} valueToPercent={valueToPercent} />
            <ScaleLabel value={97} label="> 97%" valueToPercent={valueToPercent} />
          </div>
        </div>
      </div>
    </div>
  );
}