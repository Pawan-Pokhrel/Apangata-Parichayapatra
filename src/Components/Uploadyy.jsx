import UploadButton from "@rpldy/upload-button";
import UploadDropZone from "@rpldy/upload-drop-zone";
import Uploady, { useBatchAddListener } from "@rpldy/uploady";
import { useEffect, useRef, useState } from "react";
import { FcGallery, FcMultipleCameras } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
import Webcam from "react-webcam";

const Uploadyy = ({ name, setFormData }) => {
	const [uploadImage, setUploadImage] = useState(null);
	const maxSize = name === "applicantPhoto" ? 1048576 : 102400;
	const imgRatio = name === "applicantPhoto" ? "300 X 350" : "140 X 60 px";
	const uploadRef = useRef();
	const [showOptions, setShowOptions] = useState(false);
	const [isCapturing, setIsCapturing] = useState(false);
	const optionsRef = useRef();
	const [validSize, setValidSize] = useState(true);

	const handleBatchAdd = (batch) => {
		console.log(batch);
		const file = batch.items[0].file;

		// Validate file size
		const isValid = file.size < maxSize;
		setValidSize(isValid);

		if (isValid) {
			// Set upload image if valid
			const imagePreview = {
				name: file.name,
				url: URL.createObjectURL(file),
			};
			setUploadImage(imagePreview);

			// Update form data
			setFormData((prev) => ({
				...prev,
				applicantData: {
					...prev.applicantData,
					[name]: imagePreview,
				},
			}));

			setShowOptions(false);
		} else {
			// Clear upload image for invalid files
			setUploadImage(null);
			console.warn("File size exceeds the maximum allowed size");
		}
	};

	const handleButtonClick = () => {
		if (name === "applicantPhoto") {
			setShowOptions((prev) => !prev);
		} else {
			if (uploadRef.current) {
				uploadRef.current.click();
			}
		}
	};

	const onCapture = (capturedImg) => {
		setShowOptions(false);

		// Convert Base64 to Blob
		const base64ToBlob = (base64) => {
			const byteString = atob(base64.split(",")[1]); // Decode Base64
			const mimeType = base64.match(/:(.*?);/)[1]; // Extract MIME type
			const arrayBuffer = new Uint8Array(byteString.length);

			for (let i = 0; i < byteString.length; i++) {
				arrayBuffer[i] = byteString.charCodeAt(i);
			}

			return new Blob([arrayBuffer], { type: mimeType });
		};

		const blobToFile = (blob, filename = name + "-captured-image.jpeg") => {
			return new File([blob], filename, { type: blob.type });
		};

		const blob = base64ToBlob(capturedImg);
		const file = blobToFile(blob);

		console.log("File:", file);

		// Create a synthetic batch-like object
		const syntheticBatch = {
			items: [
				{
					file, // Pass the File object here
				},
			],
		};

		// Use handleBatchAdd with the synthetic batch
		handleBatchAdd(syntheticBatch);

		// Update form data

		setFormData((prev) => {
			return {
				...prev,
				applicantData: {
					...prev.applicantData,
					[name]: {
						name: file.name,
						url: URL.createObjectURL(file),
					},
				},
			};
		});
	};

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

	useEffect(() => {
		console.log(uploadImage);
	}, [uploadImage]);

	return (
		<Uploady
			destination={{ url: "" }}
			accept="image/*"
		>
			<BatchAddListener onBatchAdd={handleBatchAdd} />

			<div className="border w-[30rem]">
				<button
					className="bg-sky-500 text-white p-1 pr-2 w-fit"
					onClick={handleButtonClick}
				>
					+ छान्नुहोस्
				</button>
				{showOptions && name === "applicantPhoto" ? (
					<div
						className="flex place-content-around w-[25rem] absolute bg-white rounded-md"
						ref={optionsRef}
					>
						<div className="flex-1 flex flex-col items-center">
							<FcMultipleCameras
								onClick={() => setIsCapturing(true)}
								className="size-24"
							/>
							<span className="text-lg">Capture</span>
							{isCapturing && (
								<Capture
									onCapture={(imgSrc) => {
										setIsCapturing(false);
										onCapture(imgSrc);
									}}
								/>
							)}
						</div>
						<UploadButton
							type="button"
							children={
								<div className="flex-1 flex flex-col items-center">
									<FcGallery className="size-24" />
									<span className="text-lg">
										Choose from Gallery
									</span>
								</div>
							}
							onClick={(e) => {
								e.preventDefault(); // Prevent form submission
							}}
							ref={uploadRef}
							style={{ display: "none" }}
						/>
					</div>
				) : (
					<UploadButton
						type="button"
						children={<span></span>}
						ref={uploadRef}
						onClick={(e) => {
							e.preventDefault(); // Prevent form submission
						}}
						className="hidden"
					/>
				)}
			</div>
			<div>
				<UploadDropZone
					className="w-[30rem] bg-gray-100"
					onDragOverClassName="drag-over"
					grouped
					maxGroupSize={3}
				>
					<div className="upload-preview border w-[30rem] h-[6rem] flex">
						{validSize ? (
							<>
								{/* Display the uploaded image */}
								{uploadImage && (
									<a
										href={uploadImage?.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-shrink-0"
									>
										<img
											src={uploadImage?.url}
											alt={
												uploadImage?.name ||
												"Uploaded file"
											}
											className="max-h-[6rem] p-1"
										/>
									</a>
								)}

								{/* Display file name and remove button */}
								{uploadImage && (
									<>
										<div className="flex-1 h-[2rem] flex m-auto ml-4 items-center">
											<a
												href={uploadImage.url}
												target="_blank"
												rel="noopener noreferrer"
												className="p-1 text-sm text-gray-500 break-words overflow-hidden text-ellipsis whitespace-normal border-b-2 border-red-400 rounded-sm"
											>
												{uploadImage.name}
											</a>
										</div>
										<button
											onClick={() => setUploadImage(null)}
											className="cursor-pointer w-[2rem] h-[2rem] flex items-center justify-center text-red-800 m-auto"
										>
											<RxCrossCircled className="h-full w-full" />
										</button>
									</>
								)}
							</>
						) : (
							<div className="flex items-center justify-center w-full h-full text-red-600 bg-red-100">
								Maximum file size,{" ("}
								{maxSize === 1048576 ? "1MB" : "100KB"}
								{") "}
								exceeded. Drag and drop or upload.
							</div>
						)}
					</div>
				</UploadDropZone>
			</div>
			<div className="warning">
				<span className="text-red-500">
					नोट: आकार {imgRatio}, jpeg, png, jpg formats. Max:{" "}
					{name === "applicantPhoto" ? "1MB" : "100KB"}
				</span>
			</div>
		</Uploady>
	);
};

const BatchAddListener = ({ onBatchAdd }) => {
	useBatchAddListener(onBatchAdd);
	return null;
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
		<div className="absolute top-0 left-0 flex flex-col items-center space-y-6 p-6 rounded-sm bg-gray-100">
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

export default Uploadyy;
