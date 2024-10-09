import Script from "next/script";
import "./globe.css";
import "three";

export default function Globe() {
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"/>
    </>
  )
}