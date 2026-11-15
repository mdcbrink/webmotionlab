"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D-hero: één deeltjeswolk die steeds van vorm wisselt.
 *   idee (bol)  →  beweging (knoop)  →  website (browservenster)  →  …
 * De muis duwt deeltjes weg; bij scrollen waaiert de wolk subtiel uit.
 * Rendert alleen als de hero in beeld is (scheelt batterij en CPU).
 */
export function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const host: HTMLDivElement = el;

    // WebGL beschikbaar? Zo niet: de CSS-gloed in de hero blijft gewoon staan.
    const test = document.createElement("canvas");
    if (!(test.getContext("webgl2") || test.getContext("webgl"))) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = isMobile ? 9000 : 20000;
    const DPR = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(DPR);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    // ---------- Vormen ----------
    const rand = Math.random;
    const dir = () => {
      const u = rand() * 2 - 1, t = rand() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      return [s * Math.cos(t), u, s * Math.sin(t)];
    };
    const A = new Float32Array(N * 3); // bol
    const B = new Float32Array(N * 3); // knoop
    const C = new Float32Array(N * 3); // browservenster
    const R = new Float32Array(N * 4);

    // Browservenster: punten op lijnen en vlakken (kader, balk, blokken, tekstregels)
    const W = 3.6, H = 2.4;
    type Seg = [number, number, number, number, number]; // x1,y1,x2,y2,gewicht
    const segs: Seg[] = [
      [-W / 2, H / 2, W / 2, H / 2, 3], [-W / 2, -H / 2, W / 2, -H / 2, 3],
      [-W / 2, -H / 2, -W / 2, H / 2, 2], [W / 2, -H / 2, W / 2, H / 2, 2],
      [-W / 2, H / 2 - 0.32, W / 2, H / 2 - 0.32, 2.5],
      [-1.0, H / 2 - 0.16, 1.2, H / 2 - 0.16, 1.2], // adresbalk
      [-1.45, 0.62, 0.2, 0.62, 1.8], [-1.45, 0.38, -0.1, 0.38, 1.8], // kop
      [-1.45, 0.1, 0.5, 0.1, 0.9], [-1.45, -0.05, 0.3, -0.05, 0.9],
      [-1.45, -0.36, -0.55, -0.36, 1.2], [-1.45, -0.56, -0.55, -0.56, 1.2], // knop
      [-1.45, -0.56, -1.45, -0.36, 0.5], [-0.55, -0.56, -0.55, -0.36, 0.5],
    ];
    const wsum = segs.reduce((s, x) => s + x[4], 0);
    const pickSeg = () => {
      let r = rand() * wsum;
      for (const s of segs) { if ((r -= s[4]) <= 0) return s; }
      return segs[0];
    };

    for (let i = 0; i < N; i++) {
      // Bol met lichte ruis
      const [dx, dy, dz] = dir();
      const rr = 1.55 * (rand() < 0.85 ? 1 : 0.75 + rand() * 0.25) * (1 + 0.04 * Math.sin(dx * 7 + dy * 5));
      A.set([dx * rr, dy * rr, dz * rr], i * 3);

      // Torusknoop (p=2, q=3) met buis eromheen
      const t = rand() * Math.PI * 2, p = 2, q = 3;
      const cr = Math.cos(q * t) + 2.2;
      const cx = cr * Math.cos(p * t), cy = cr * Math.sin(p * t), cz = -Math.sin(q * t);
      const [ox, oy, oz] = dir();
      const tube = 0.32 * Math.cbrt(rand() * 0.6 + 0.4);
      B.set([(cx + ox * tube) * 0.5, (cy + oy * tube) * 0.5, (cz + oz * tube) * 0.5], i * 3);

      // Browservenster
      let x: number, y: number;
      const roll = rand();
      if (roll < 0.14) { // rechter afbeeldingsblok (gevuld)
        x = 0.55 + rand() * 1.15; y = -0.75 + rand() * 1.55;
      } else if (roll < 0.17) { // drie stipjes in de balk
        const k = Math.floor(rand() * 3), a = rand() * Math.PI * 2, r = Math.sqrt(rand()) * 0.06;
        x = -W / 2 + 0.2 + k * 0.17 + Math.cos(a) * r; y = H / 2 - 0.16 + Math.sin(a) * r;
      } else {
        const s = pickSeg(), f = rand();
        x = s[0] + (s[2] - s[0]) * f; y = s[1] + (s[3] - s[1]) * f;
        x += (rand() - 0.5) * 0.03; y += (rand() - 0.5) * 0.03;
      }
      C.set([x, y, (rand() - 0.5) * 0.12], i * 3);

      R.set([rand(), rand(), rand(), rand()], i * 4);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(A, 3));
    geo.setAttribute("aB", new THREE.BufferAttribute(B, 3));
    geo.setAttribute("aC", new THREE.BufferAttribute(C, 3));
    geo.setAttribute("aR", new THREE.BufferAttribute(R, 4));

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uScroll: { value: 0 },
      uPixel: { value: DPR },
      uSize: { value: isMobile ? 26 : 22 },
      uIn: { value: reduced ? 1 : 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime, uMorph, uScroll, uPixel, uSize, uIn;
        uniform vec3 uMouse;
        attribute vec3 aB, aC;
        attribute vec4 aR;
        varying vec3 vColor;
        varying float vA;
        void main(){
          // Huidige en volgende vorm (cyclus van 3)
          float cyc = mod(uMorph, 3.0);
          float seg = floor(cyc);
          float f = clamp((fract(cyc) - 0.6) / 0.4, 0.0, 1.0);          // 60% stilstaan, 40% overgang
          float tr = smoothstep(0.0, 1.0, clamp(f * 1.7 - aR.x * 0.7, 0.0, 1.0)); // gespreid per deeltje
          vec3 from = seg < 0.5 ? position : (seg < 1.5 ? aB : aC);
          vec3 to   = seg < 0.5 ? aB : (seg < 1.5 ? aC : position);
          vec3 p = mix(from, to, tr);

          // werveling tijdens de overgang
          float w = tr * (1.0 - tr) * 4.0;
          p += vec3(sin(aR.w * 40.0 + uTime), cos(aR.y * 40.0 + uTime * 1.3), sin(aR.z * 30.0)) * w * 0.55;

          // ademen
          p += normalize(p + 1e-4) * sin(uTime * 1.3 + aR.y * 6.283) * 0.012;

          // intro: van ver naar binnen vliegen
          float inT = smoothstep(0.0, 1.0, clamp(uIn * 1.5 - aR.w * 0.5, 0.0, 1.0));
          p = mix((aR.xyz - 0.5) * vec3(18.0, 12.0, 10.0) + vec3(0.0, 0.0, 3.0), p, inT);

          // uitwaaieren bij scrollen
          p += (aR.xyz - 0.5) * uScroll * 3.5;

          // muis duwt weg
          vec3 d = p - uMouse;
          float m = exp(-dot(d.xy, d.xy) * 2.2);
          p += normalize(vec3(d.xy, 0.4) + 1e-4) * m * 0.45;

          // kleur: turquoise → lichtturquoise → wit
          vec3 turq = vec3(0.125, 0.878, 0.816);
          vec3 light = vec3(0.459, 0.961, 0.910);
          vColor = mix(turq, light, aR.z);
          vColor = mix(vColor, vec3(1.0), step(0.93, aR.y) * 0.8 + m * 0.6);
          vA = (0.35 + aR.w * 0.45) * (1.0 - uScroll * 0.7);

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float tw = 0.7 + 0.3 * sin(uTime * 2.5 + aR.x * 30.0);
          gl_PointSize = uSize * uPixel * (0.35 + aR.w * 0.75) * tw * (1.0 + m) / -mv.z;
        }`,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vColor, a * a * vA);
        }`,
    });

    const points = new THREE.Points(geo, material);
    points.frustumCulled = false;
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // ---------- Interactie ----------
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const hit = new THREE.Vector3(99, 99, 0);
    const ptr = new THREE.Vector2(0, 0);
    const local = new THREE.Vector3();
    let hasPointer = false;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      hasPointer = true;
    };
    const onLeave = () => { hasPointer = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // ---------- Lus (alleen als zichtbaar) ----------
    let visible = true, raf = 0, last = performance.now(), t = 0, morph = 0, scrollS = 0;
    const start = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    });
    io.observe(host);

    function loop(now: number) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      uniforms.uTime.value = t;
      if (!reduced) uniforms.uIn.value = Math.min(1, (now - start) / 2400);
      morph += dt / (reduced ? 9 : 4.2); // ~4,2 s per vorm
      uniforms.uMorph.value = morph;

      const target = Math.min(1, window.scrollY / Math.max(1, host.clientHeight));
      scrollS += (target - scrollS) * (1 - Math.exp(-dt * 6));
      uniforms.uScroll.value = scrollS;

      // muis in lokale ruimte van de groep
      if (hasPointer) {
        ray.setFromCamera(ptr, camera);
        if (ray.ray.intersectPlane(plane, hit)) {
          local.copy(hit);
          group.worldToLocal(local);
        }
      } else local.set(99, 99, 0);
      uniforms.uMouse.value.lerp(local, 0.12);

      const motion = reduced ? 0 : 1;
      group.rotation.y = Math.sin(t * 0.3) * 0.35 * motion + ptr.x * 0.25 * motion;
      group.rotation.x = Math.sin(t * 0.23) * 0.12 * motion - ptr.y * 0.15 * motion;
      group.position.y = -scrollS * 0.8;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    const onVis = () => { if (!document.hidden && visible && !raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={wrap} className="absolute inset-0" />;
}
