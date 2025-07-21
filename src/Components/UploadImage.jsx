import { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { UploadOptions } from "./UploadOptions";

const UploadImage = ({ name, setFormData }) => {
	const imgRef = useRef(null);
	const [fileName, setFileName] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [imgUrl, setImgUrl] = useState();
	const maxSize = name === "applicantPhoto" ? 1048576 : 51200;
	const imgRatio = name === "applicantPhoto" ? "300 X 350" : "140 X 60 px";

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const url = URL.createObjectURL(file);
		if (file.size <= maxSize) {
			if (url) {
				setImgUrl(url);
			}
			if (file) {
				setFileName(file.name);
			}

			setFormData((prev) => {
				return {
					...prev,
					applicantData: {
						...prev.applicantData,
						[name]: imgRef.current?.value,
					},
				};
			});
		} else {
			alert("File size too big !!");
			return;
		}
	};

	useEffect(() => {
		console.log(imgUrl);
	}, [imgUrl]);

	const onCapture = (capturedImg) => {
		setShowOptions(false);

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

		const url = URL.createObjectURL(file);
		if (url) {
			setImgUrl(url);
		}
		if (file) {
			setFileName(file.name);
		}

		setFormData((prev) => {
			return {
				...prev,
				applicantData: {
					...prev.applicantData,
					[name]: name + "-captured-image.jpeg",
				},
			};
		});
	};

	const handleButtonClick = () => {
		if (name === "applicantPhoto") {
			setShowOptions((prev) => !prev);
		} else {
			if (imgRef.current) {
				imgRef.current.click();
			}
		}
	};

	const removeFile = () => {
		setFileName("");
		setImgUrl("");
	};

	return (
		<section>
			<div className="w-[30rem]">
				<div className="uploadHeader border h-[2rem]">
					<input
						type="button"
						value="+ छान्नुहोस्"
						onClick={handleButtonClick}
						required
						className="bg-sky-500 text-white p-1"
					/>
					<input
						type="file"
						name={name}
						id=""
						ref={imgRef}
						required
						accept="image/jpeg, image/jpg, image/png"
						onChange={handleFileChange}
						style={{ display: "none" }}
					/>
				</div>
				<div className="uploadPreview border h-[5rem] flex">
					<a
						href={imgUrl}
						target="_blank"
					>
						<img
							src={imgUrl}
							alt=""
							className="max-h-[5rem]"
						/>
					</a>
					{imgUrl && (
						<span className="m-2 p-1 rounded-sm h-fit flex items-center place-content-between gap-2 bg-gray-100 shadow-inner border-b-2 border-rose-700">
							<a
								href={imgUrl}
								target="_blank"
							>
								{fileName}
							</a>
							<div
								onClick={removeFile}
								className="cursor-pointer h-max w-full max-w-[2rem] min-w-[1.2rem]"
							>
								<RxCrossCircled className="h-full w-full text-red-800" />
							</div>
						</span>
					)}
				</div>
				<div className="warning">
					<span className="text-red-500">
						नोट: आकार {imgRatio}, jpeg, png, jpg formats. Max:{" "}
						{name === "applicantPhoto" ? "1MB" : "50KB"}
					</span>
				</div>
			</div>

			{showOptions && (
				<UploadOptions
					imgRef={imgRef}
					setShowOptions={setShowOptions}
					onCapture={onCapture}
				/>
			)}
		</section>
	);
};

export default UploadImage;
