
import animationData from "../assets/98788-loading.json"
import Lottie from "react-lottie";
const LoadingAnimation = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return(
        <>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
            />
        </>

    )
}


export default LoadingAnimation