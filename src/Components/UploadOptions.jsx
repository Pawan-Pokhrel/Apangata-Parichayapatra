import { useEffect, useRef, useState } from "react";
import { FcGallery, FcMultipleCameras } from "react-icons/fc";
import { SlCloudUpload } from "react-icons/sl";
import Webcam from "react-webcam";

export const UploadOptions = ({ imgRef, setShowOptions, onCapture }) => {
	const optionsRef = useRef(null);
	const [isCapturing, setIsCapturing] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (optionsRef.current && !optionsRef.current.contains(e.target)) {
				setShowOptions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowOptions]);

	return (
		<div
			ref={optionsRef}
			className="uploadOptions absolute ml-11 z-20 drop-shadow-2xl bg-white flex flex-col place-content-around p-4 w-[40rem]"
		>
			<DragAndDrop />
			<div className="flex place-content-around">
				<div className="capturePic flex flex-col items-center justify-center">
					<button onClick={() => setIsCapturing(true)}>
						<FcMultipleCameras className="size-36" />
						<span className="text-2xl">Capture</span>
					</button>
				</div>
				{isCapturing && (
					<Capture
						onCapture={(imgSrc) => {
							setIsCapturing(false);
							onCapture(imgSrc);
						}}
					/>
				)}
				<Upload
					imgRef={imgRef}
					setShowOptions={setShowOptions}
				/>
			</div>
		</div>
	);
};

export const DragAndDrop = () => {
	return (
		<div className="dragArea h-[17rem] border border-black border-dashed rounded-md justify-items-center p-4">
			<SlCloudUpload className="size-36 text-blue-900" />
			<br />
			<span className="text-4xl">Drag and Drop</span>
		</div>
	);
};

export const Capture = ({ onCapture }) => {
	const [capturedImg, setCapturedImg] = useState(null);
	const webcamRef = useRef(null);

	const capture = () => {
		const imgSrc = webcamRef.current.getScreenshot();
		setCapturedImg(imgSrc);
		if (onCapture) {
			onCapture(imgSrc);
		}
	};
	return (
		<div className="absolute top-10 left-10 flex flex-col items-center space-y-6 p-6 bg-gray-100">
			<div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
				<Webcam
					audio={false}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					className="w-full rounded-md border border-gray-300"
					videoConstraints={{
						width: 1280,
						height: 720,
						facingMode: "user",
					}}
				/>
				<button
					onClick={capture}
					className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
				>
					Capture Photo
				</button>
			</div>

			{capturedImg && (
				<div className="w-full max-w-lg bg-white z-30 rounded-lg shadow-md p-4 flex flex-col items-center">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						Captured Image
					</h3>
					<img
						src={capturedImg}
						alt="Captured"
						className="rounded-md shadow-lg border border-gray-300"
					/>
				</div>
			)}
		</div>
	);
};

export const Upload = ({ imgRef, setShowOptions }) => {
	return (
		<div className="uploadImg flex flex-col items-center justify-center">
			<button
				onClick={() => {
					imgRef.current.click();
					setShowOptions(false);
				}}
				value={imgRef.current.value}
				className="flex flex-col items-center justify-center"
			>
				<FcGallery className="size-36" />
				<span className="text-2xl">Choose from Gallery</span>
			</button>
		</div>
	);
};
