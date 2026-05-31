'use client';
import styles from '../styles/page.module.scss';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutCanvas from './component/AboutCanvas';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mvref = useRef(null);
  const txtref = useRef(null);

  useLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      const tl = gsap.timeline()
      tl.from(mvref.current, {
        autoAlpha: 1,
        y: "0",
        duration: 1,
      })
      tl.from(txtref.current, {
        autoAlpha: 0,
        y: "0",
        scale: 1.5,
      })
      tl.to(txtref.current,{
        autoAlpha:1,
        scale: 1,
      })
      tl.to(mvref.current,{
        autoAlpha: 1,
        y: "-100%",
        duration: 0.6,
        ease: "power2.out",
      })
      tl.from(`.${styles.figure01}`,{
        autoAlpha: 0,
        y: 20,
        duration: 1.2,
        ease: "power2.out",
      });
      tl.from(`.${styles.figure02}`,{
        autoAlpha: 0,
        y: 20,
        duration: 1.2,
        ease: "power2.out",
      },"-=0.8");
      tl.from(`.${styles.figure03}`,{
        autoAlpha: 0,
        rotation: 5,
        y: 20,
        duration: 1.2,
        ease: "power2.out",
      },"-=1");
      tl.from(`.${styles.figure04}`,{
        autoAlpha: 0,
        duration: 1.2,
        ease: "power2.out",
      },"-=2");

      tl.from(`.${styles.figure06}`,{
        autoAlpha: 0,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },"-=1");
      tl.from(`.${styles.figure07}`,{
        autoAlpha: 0,
        rotation: 5,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
      },"-=1");
      tl.from(`.${styles.figure05}`,{
        autoAlpha: 0,
        y: 40,
        duration: 1.2,
        ease: "power2.out",
      },"-=1");
      tl.from(`.${styles.figure08}`,{
        autoAlpha: 0,
        y: 0,
        scale: 0.5,
        duration: 1.2,
        ease: "power2.out",
      },"-=1");
      tl.to(`.${styles.figure08}`,{
        autoAlpha: 1,
        scale: 1,
      },"-=1");
      tl.to(`.${styles.mainTtl}`,{
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        clipPath: "inset(0 0% 0 0)",
      },"-=1");
    });

    const layers = [
      { el: styles.figure01, y: 10 },
      { el: styles.figure02, y: 10 },
      { el: styles.figure03, y: 10 },
      { el: styles.figure04, y: 10 },
      { el: styles.figure05, y: 10 },
      { el: styles.figure06, y: 0 },
      { el: styles.figure07, y: 10 },
      { el: styles.figure08, y: 10 },
    ];

    layers.forEach(layer => {
      gsap.to(`.${layer.el}`, {
        y: layer.y,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.mvBg}`,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    return ()=> ctx.revert();
  },[]); 

  useLayoutEffect(()=> {
    const ctxa = gsap.context(()=>{
      const tla = gsap.timeline({
        scrollTrigger: {
          start: "top 80%",
          trigger: `.${styles.about}`,
        }
      });
      tla.from(`.${styles.h2txt}`,{
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
        clipPath: "inset(0 100% 0 0)",

      });
      tla.from(`.${styles.textsA}`,{
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        clipPath: "inset(0 100% 0 0)",

      })
    });
    return ()=> ctxa.revert();
  },[]);

  useLayoutEffect(()=> {
    const anm = gsap.context(()=> {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none"}
      });

      tl.to(`.${styles.loop}`,{
        xPercent: -100,
        duration: 10,
        modifires: {
          xPercent: gsap.utils.wrap(-100, 0)
        }
      });
    });
    return ()=> anm.revert();
  },[]);


  return (
    <>
      <div className={styles.mvMask} ref={mvref}>
        <p className={styles.txtMask} ref={txtref}>これはオープニングだ</p>
      </div>
      <section className={styles.mvWrap} >
        <div className={styles.mvBg}>
          <figure>
            <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_background.jpg" alt="" />
          </figure>
          <div className={styles.mv}>
            <div className={`${styles.figure} ${styles.figure01}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_base_water_3.webp" alt="" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure02}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_product_1.webp" alt="" width="1044" height="704" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure03}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_product_2.webp" alt="" width="1088" height="1266" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure04}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_water_5@sp.webp" alt="" width="748" height="742" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure05}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_water_2.webp" alt="" width="2528" height="1346" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure06}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_water_4.webp" alt="" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure07}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_product_4.webp" alt="" />
              </figure>
            </div>
            <div className={`${styles.figure} ${styles.figure08}`}>
              <figure>
                <img src="https://eightthethalasso-homme.jp/images/index/keyvisual_base_water_2.webp" alt="" />
              </figure>
            </div>
          </div>
        </div>
        <h1 className={styles.mainTtl}>8 THE THALASSO HOMME</h1>
        
      </section>
      <section className={styles.aboutWrap}>
        <div className={styles.about}>
          <div className={styles.sectionpadding}>
            <div className={styles.container}>
              <div className={styles.blocks}>
                <div className={styles.texts}>
                  <h2 className={styles.h2txt}>スキンケア発想のエイトザタラソから</h2>
                  <p className={styles.textsA}>メンズライン登場！</p>
                  <p className={styles.textsB}>
                    シャンプーを変えれば仕上がりが変わる！<br />
                    寝ぐせ・うねり・ゴワつきを押さえ、<br />
                    スタイリングしやすい髪と逃避環境へ整える<br />
                    スキンケア発想のメンズのためのヘアケア
                  </p>
                </div>
                <div className={styles.figurewrapper}>
                  <AboutCanvas />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.loopWrap}>
          <p className={styles.loop}>8 THE THALASSO HOMME BASE DESIGNING</p>
          <p className={styles.loop}>8 THE THALASSO HOMME BASE DESIGNING</p>
        </div>
        
      </section>
    </>
  );
}
