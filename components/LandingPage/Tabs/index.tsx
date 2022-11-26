import { useState, useEffect } from "react";
import useScreenSize from "../../useScreenSize";
const Tab = ({ tabs, activeTab, setActivetab }: any) => {
  const screenSize = useScreenSize();
  const [left, setLeft] = useState("0px");

  const slideAnimation =
    typeof window !== "undefined" &&
    (document?.querySelector(".indicator") as HTMLElement);

  const indicator = (e: any) => {
    if (slideAnimation) {
      setLeft(e.offsetLeft + "px");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const offset = document?.querySelector(".activeTab") as HTMLElement;

      setLeft(offset.offsetLeft + "px");
    }
  }, [left, screenSize]);

  return (
    <>
      <ul className='tabs_container'>
        {tabs.map((tab: any, index: any) => (
          <li key={index} className={activeTab === tab ? "activeTab" : "tab"}>
            <p
              onClick={(e) => {
                setActivetab(tab);
                indicator(e.target);
              }}
            >
              {tab}
            </p>
          </li>
        ))}
      </ul>
      <div
        style={{ width: "40px !important", left }}
        className='indicator'
      ></div>
    </>
  );
};

export default Tab;
