import { BsFillPauseCircleFill } from "react-icons/bs";

const AnimationButton = () => {
  return (
    <div className="absolute top-10 left-3 z-5 translate-x-2/4 pointer-cursor">
      <button id="animate-button">
        {" "}
        <BsFillPauseCircleFill size={30} />
      </button>
    </div>
  );
};

export default AnimationButton;
