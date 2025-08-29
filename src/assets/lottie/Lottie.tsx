import { Player } from "@lottiefiles/react-lottie-player";

const Lottie = (src: any) => {
  return (
    <Player
      src={src}
      style={{ height: "100%", width: "100%" }}
      keepLastFrame={true}
    />
  );
};
export default Lottie;
