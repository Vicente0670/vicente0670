"use client";

import button from "./local.module.css";
import { useEffect, useState, useRef, useCallback } from "react";

export default function WindowsButton({ href }: { href: string }) {

  const [isEnabled, enabled] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const rectangle = useRef<HTMLDivElement>(null); 
  const circle = useRef<HTMLDivElement>(null);

  const circleDimensions = useRef({
    x: 0,
    y: 0,
  });

  const rectangleDimensions = useRef({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const dimensionAssign = useCallback(() => {
    rectangleDimensions.current.x = rectangle.current!.getBoundingClientRect().x + window.scrollX;
    rectangleDimensions.current.y = rectangle.current!.getBoundingClientRect().y + window.scrollY;
    rectangleDimensions.current.height = rectangle.current!.getBoundingClientRect().height;
    rectangleDimensions.current.width = rectangle.current!.getBoundingClientRect().width;

    circleDimensions.current.x = rectangleDimensions.current.x;
    circleDimensions.current.y = rectangleDimensions.current.y + rectangleDimensions.current.height;
    
    circle.current!.style.transform = "translate(-50%, -50%)";
  }, []);

  const logDigits = useCallback((e: MouseEvent) => {
    const y = e.pageY - circleDimensions.current.y;
    const x = e.pageX - circleDimensions.current.x;
    circle.current!.style.top = `${y}px`;
    circle.current!.style.left = `${x}px`;
  }, []);
  
  const warpPerspective = useCallback((e: MouseEvent) => {
    // Get cursor X value on page
    // Subtract this by the current bounding box's X value on the DOM to reset the position of the mouse
    // (Without subtracting, this value is higher than it needs to be since its also considering its value away from the top left of the document)
    // Divide by the width of the document to get a value from 0–1 (En dash Alt Code = 0151)
    // Remove 0.5 to make the center of the element 0
    // Multiply by 2 to allow for a full threshold (e.g., threshold can be .5, so it is now 1 to accomodate "rotate3d" in CSS)
    // Same concept among both X & Y thresholds

    const xThreshold = ((((e.pageX - rectangleDimensions.current.x) + 1) / rectangleDimensions.current.width) - .5) * 2;
    const yThreshold = -((((e.pageY - rectangleDimensions.current.y) + 1) / rectangleDimensions.current.height) - .5) * 2;

    root.current!.style.transform = `rotate3d(${yThreshold}, ${xThreshold}, 0, 15deg)`;
  }, []);

  const resetPerspective = useCallback(() => { root.current!.style.transform = "rotate3d(0, 0, 0, 0deg)"; }, []);

  useEffect(() => {
    
    if (isEnabled === false) {
      dimensionAssign();
      window.addEventListener("mousemove", logDigits);
      window.addEventListener("resize", dimensionAssign);
      container.current!.addEventListener("mousemove", warpPerspective);
      container.current!.addEventListener("mouseleave", resetPerspective);
      enabled(true);
    }

  }, [isEnabled, enabled, logDigits, dimensionAssign, warpPerspective, resetPerspective]);

  return (
    <div className={button.buttonContainer} ref={container}>
      <div className={button.root} ref={root}>
        <a className={button.link} href={href}>
          <div className={button.rectangle} ref={rectangle}>
            <p>Goodbye Chat</p>
          </div>
          <div className={button.circle} id="circle" ref={circle} />
        </a>
      </div>
    </div>
  )
}