import React, { useState, useMemo, useRef, useEffect } from "react";

export default function PriceRangeSlider({
  min,
  max,
  step,
  range,
  setRange
}) {

  const syncTimeout = useRef(null);

  const percent = (value) => ((value - min) / (max - min)) * 100;

  // sync helper (prevents lag)
  const syncToParent = (updated) => {
    clearTimeout(syncTimeout.current);

    syncTimeout.current = setTimeout(() => {
      setRange?.(updated);
    }, 50);
  };

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), range[1] - step);
    const updated = [newMin, range[1]];

    syncToParent(updated);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), range[0] + step);
    const updated = [range[0], newMax];

    syncToParent(updated);
  };

  const trackStyle = useMemo(() => {
    return {
      left: `${percent(range[0])}%`,
      width: `${percent(range[1]) - percent(range[0])}%`
    };
  }, [range, min, max]);

  useEffect(() => {
    return () => clearTimeout(syncTimeout.current);
  }, []);

  return (
    <div className="prs-wrapper">
      <div className="prs-values">
        <span>₹{range[0].toLocaleString()}</span>
        <span>₹{range[1].toLocaleString()}</span>
      </div>

      <div className="prs-slider">
        <div className="prs-track" />
        <div className="prs-track-active" style={trackStyle} />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[0]}
          onChange={handleMinChange}
          className="prs-thumb prs-thumb-min"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[1]}
          onChange={handleMaxChange}
          className="prs-thumb prs-thumb-max"
        />
      </div>
    </div>
  );
}