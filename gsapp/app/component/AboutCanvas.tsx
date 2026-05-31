'use client';

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/page.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCanvas() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;

    // ============================
    // Three.js 基本セットアップ
    // ============================
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

// ★ ここに入れる（renderer 側）
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;


    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 2;

// ============================
// Plane（画像を貼る）
// ============================

const aspect = 954.8 / 581.706; // ≒ 1.64

const planeWidth = 1;          // 基準値（なんでもOK）
const planeHeight = planeWidth * aspect;

const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 50, 50);



    const loader = new THREE.TextureLoader();
const texture = loader.load(
  "/images/index/about_picture.jpg",
  () => {
    img.style.opacity = 0;
  }
);

// ★ 色空間を揃える（参考サイトと同じ）
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
  toneMapped: false,
});

// ★ renderer 側も揃える
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;



    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ============================
    // 初期状態：紙を丸める
    // ============================
    const pos = geometry.attributes.position;
    const count = pos.count;

    const initialZ = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = Math.sin(x * 3) * 0.25;
      pos.setZ(i, z);
      initialZ[i] = z;
    }
    pos.needsUpdate = true;

    // ============================
    // ScrollTrigger で紙が開く
    // ============================
    gsap.to(initialZ, {
      duration: 1.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: `.${styles.about}`,
        start: "top 80%",
        once: true,
      },
      onUpdate: function () {
        const p = this.progress();

        for (let i = 0; i < count; i++) {
          pos.setZ(i, initialZ[i] * (1 - p));
        }
        pos.needsUpdate = true;
      },
    });

    // ============================
    // レンダリングループ
    // ============================
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div className={styles.aboutCanvasWrapper}>
      {/* 読み込み中の仮画像（Three.js 読み込み後に透明化） */}
      <img
        ref={imgRef}
        src="https://eightthethalasso-homme.jp/images/index/about_picture.jpg"
        alt=""
        className={styles.aboutImage}
      />

      {/* Three.js の紙アニメ */}
      <canvas ref={canvasRef} className={styles.aboutCanvas}></canvas>
    </div>
  );
}
