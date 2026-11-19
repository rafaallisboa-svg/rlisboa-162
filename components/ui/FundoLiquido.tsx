"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo vivo do hero: manchas de luz (amarelo e laranja da IDV) que se deformam devagar sobre o preto,
 * com grão fino, e uma mancha que segue o mouse. WebGL puro, sem biblioteca, desenhado em meia resolução
 * (é tudo desfocado mesmo). Pausa fora da tela e com a aba escondida. Com "reduzir movimento" desenha um
 * único quadro parado. Sem WebGL, sobra um degradê de CSS.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uT;
uniform vec2 uMouse;

float blob(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (r * r));
}
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float A = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * A, uv.y);

  // deformação líquida: duas ondas cruzadas
  vec2 q = p;
  q += 0.10 * vec2(sin(p.y * 2.6 + uT * 0.42), cos(p.x * 2.2 + uT * 0.36));
  q += 0.05 * vec2(sin(p.y * 6.0 - uT * 0.55), cos(p.x * 5.0 + uT * 0.48));

  vec3 preto   = vec3(0.055, 0.055, 0.051);
  vec3 carbono = vec3(0.110, 0.110, 0.106);
  vec3 amarelo = vec3(1.000, 0.765, 0.000);
  vec3 laranja = vec3(1.000, 0.353, 0.122);

  float a = blob(q, vec2(A * 0.80 + 0.07 * sin(uT * 0.21), 0.56 + 0.09 * cos(uT * 0.17)), 0.46);
  float b = blob(q, vec2(A * 0.34 + 0.11 * cos(uT * 0.15), 0.08 + 0.06 * sin(uT * 0.25)), 0.42);
  float c = blob(q, vec2(A * 0.52, 0.95), 0.70);
  vec2 m = vec2(uMouse.x * A, uMouse.y);
  float k = blob(q, m, 0.30);

  vec3 col = preto;
  col = mix(col, carbono, c * 0.9);
  // amarelo puxado para o quente: sem isso, somado ao preto, vira um verde-oliva barrento
  col += mix(amarelo, laranja, 0.30) * a * 0.46;
  col += laranja * b * 0.34;
  col += mix(laranja, amarelo, 0.35) * k * 0.34;

  // vinheta leve e grão fino
  float v = smoothstep(1.25, 0.35, length(uv - 0.5) * 1.4);
  col *= mix(0.82, 1.0, v);
  col += (hash(gl_FragCoord.xy + floor(uT * 12.0)) - 0.5) * 0.045;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function compilar(gl: WebGLRenderingContext, tipo: number, fonte: string) {
  const s = gl.createShader(tipo);
  if (!s) return null;
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function FundoLiquido({ className = "" }: { className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    const wrap = caixa.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compilar(gl, gl.VERTEX_SHADER, VERT);
    const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uT = gl.getUniformLocation(prog, "uT");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Meia resolução: o fundo é todo suave, o grão continua fino o bastante.
    const escala = Math.min(window.devicePixelRatio || 1, 2) * 0.5;

    const ajustar = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(r.width * escala));
      canvas.height = Math.max(2, Math.round(r.height * escala));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    ajustar();
    const ro = new ResizeObserver(ajustar);
    ro.observe(wrap);

    // Mouse: alvo normalizado (0..1) dentro da caixa, com atraso suave. Sem ponteiro, a mancha vagueia sozinha.
    const alvo = { x: 0.62, y: 0.5 };
    const atual = { x: 0.62, y: 0.5 };
    let ponteiro = false;
    const mover = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      alvo.x = (e.clientX - r.left) / r.width;
      alvo.y = 1 - (e.clientY - r.top) / r.height;
      ponteiro = true;
    };
    if (!reduz) window.addEventListener("pointermove", mover, { passive: true });

    let visivel = true;
    const io = new IntersectionObserver(([en]) => (visivel = en.isIntersecting), { threshold: 0 });
    io.observe(wrap);

    let raf = 0;
    const t0 = performance.now();
    const quadro = (agora: number) => {
      const t = reduz ? 6 : (agora - t0) / 1000;
      if (!reduz && visivel && !document.hidden) {
        if (!ponteiro) {
          alvo.x = 0.62 + 0.18 * Math.sin(t * 0.3);
          alvo.y = 0.5 + 0.18 * Math.cos(t * 0.23);
        }
        atual.x += (alvo.x - atual.x) * 0.06;
        atual.y += (alvo.y - atual.y) * 0.06;
      }
      if (reduz || (visivel && !document.hidden)) {
        gl.uniform1f(uT, t);
        gl.uniform2f(uMouse, atual.x, atual.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reduz) raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", mover);
      ro.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={caixa}
      aria-hidden="true"
      className={className}
      // Se o WebGL não existir, este degradê aparece no lugar.
      style={{
        background:
          "radial-gradient(60% 70% at 80% 55%, rgba(255,195,0,.22), transparent 70%), radial-gradient(50% 50% at 30% 95%, rgba(255,90,31,.16), transparent 70%), var(--color-idv-preto)",
      }}
    >
      <canvas ref={tela} className="block h-full w-full" />
    </div>
  );
}
