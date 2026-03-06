"use client";

import local from "./local.module.css";
import { useRef, useState, useCallback, useEffect } from "react";

export function DimensionalWave() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wave = useRef<CanvasRenderingContext2D>(null);

  const [isEnabled, enabled] = useState(false);

  const resizeCanvas = useCallback(() => {

    const context = canvas.current!;

    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;

    context.height = height;
    context.width = width;

  }, []);

  const initializeShaders = useCallback((
    gl: WebGLRenderingContext,
    type: 
      WebGLRenderingContextBase["VERTEX_SHADER"] |
      WebGLRenderingContextBase["FRAGMENT_SHADER"],
    source: string
  ): WebGLShader => {
  
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    
    if (success) return shader;
    
    else {
      console.info(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error("Shader failed to compile!");
    }

  }, []);

  const initializeProgram = useCallback((
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram => {

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) return program;

    else {
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      throw new Error("Program creation failed!");
    }

  }, []);

  const main = useCallback(() => {

    const context = canvas.current!;
    const gl = context.getContext("webgl");

    if (gl === null) {
      console.error("WEBGL NOT SUPPORTED!\n\nYou have an ancient browser or something.\nI can respect that.");
      return;
    }
    
    const vertexShaderSource = `
      attribute vec2 a_position;
      uniform vec2 u_resolution;

      void main() {



        gl_Position = a_position;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1);
      }
    `;

    const vertexShader: WebGLShader = initializeShaders(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader: WebGLShader = initializeShaders(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program: WebGLProgram = initializeProgram(gl, vertexShader, fragmentShader);

    // Here is where things get a bit tricky. I'm learning WebGL while I type this.
    // setting up state to supply data to program: input is a_position, so we look up its location
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();

    // global bind points: allow for global access through the variable with a bind point
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // we can now put data onto the buffer by referencing it through the bind point
    // our 2d points:
    const positions = [
      0, 0,
      0, 0.5,
      0.7, 0,
    ];
    // we NEED strongly typed data, so we use Float32Array
    // gl.bufferData copies data into positionBuffer on GPU, and its using the previously set positionBuffer bound to ARRAY_BUFFER
    // gl.STATIC_DRAW just hints at usage of data: static draw is when data wont mutate much
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


    /*************************************************************************************
     * 
     * 
     * Up until this point, this code was INITIALIZATION CODE. 
     * The following code is RENDERING CODE that will be executed each draw or render.
     * 
     * 
     *************************************************************************************
    */

    // Resizing the canvas to fit the viewport (missing webgl utils i hope that doesnt affect me later)
    // the -1 and 1 ends of the canvas now fix to the actual width and height of the canvas in the DOM
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // RGBA format - literally clearing the canvas
    gl.clearColor(0, 0, 0, .5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // use our program we made
    gl.useProgram(program);

    // tell webgl how to take data from our buffer we made and supply that data to the attribute in our shader
    // First: turn ON the attribute using the location of the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Second: specify how we pull the data out of the location
    // bind the buffer... again?
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // variables for pointer, because it now binds the current ARRAY_BUFFER to attribute; attribute is now bound to
    // positionBuffer, and now we're free to bind another thing to ARRAY_BUFFER, and attr will continue to use positionBuffer
    const size = 2;           // 2 components per iteration
    const type = gl.FLOAT;    // data is 32 bit float
    const normalize = false;  // do not normalize the data (no clue what that means)
    const stride = 0;         // 0 = move forward size * sizeof(type) each iteration to get to the next position
    const offset = 0;         // start at beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // vec4 are 4 float values
    // js equiv: a_position = {x: 0, y: 0, z: 0, w: 0}
    // since we set size 2 and our attributes default to 0, 0, 0, 1, then
    // this attribute will get the first 2 values (being x and y) from the buffer
    // z and w will be the default 0 and 1

    // Now we can execute the GLSL program

    const primitiveType = gl.TRIANGLES;
    // const offset = 0; already declared
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);


  }, [initializeProgram, initializeShaders]);

  useEffect(() => {
    if (!isEnabled) {
      enabled(true);

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      main();
    }
  }, [
    isEnabled,
    enabled,
    resizeCanvas,
    main
  ]);

  return (
    <>
      <div className={local.root}>
        <canvas className={local.canvas} role="presentation" ref={canvas} height={1000} width={1000}>
          {/* Something about compatibility is meant to go here? */}
        </canvas>
      </div>
    </>
  )
}