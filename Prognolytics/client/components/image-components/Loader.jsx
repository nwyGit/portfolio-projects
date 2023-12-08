import { PuffLoader } from "react-spinners";

const Loader = () => {
	return (
		<>
			<div className="relative h-[100vh] flex flex-col justify-center items-center">
				<PuffLoader size={150} color="orange" className="z-20" />
				<span className="z-20 text-lg">
					Server is restarting from cold start
				</span>
				<span className="z-20 text-md">Please wait for a moment...</span>
			</div>
			<div className="absolute top-0 w-full h-full z-10 backdrop-blur-md" />
		</>
	);
};

export default Loader;
