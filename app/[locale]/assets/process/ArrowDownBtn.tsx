"use client"
import style from "./process.module.css"
import { FaArrowDown } from "react-icons/fa"
export default function ArrowDownFn({ show, contain }: any) {
    const scrollDownFn = () => {
      const section = document.getElementById(show);
    const container = document.getElementById(contain);

    console.log("current", show)
    if (container && section) {
      const scrollPosition =
        container.offsetTop + section.offsetTop;
        const scrollPositionBack =
        container.offsetTop - section.offsetTop;
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
      setTimeout(() => {
         container.scrollTo({
        top: scrollPositionBack,
        behavior: 'smooth',
      });
      }, 7000);
    }
};
    return (
        <>
            <div className="">
                <button type="button" onClick={scrollDownFn}><FaArrowDown className={style.ArrowDown} /></button>
                <label htmlFor="" id="ShowSection"></label>
            </div>
        </>
    )
}