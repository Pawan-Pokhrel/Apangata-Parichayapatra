import { useEffect, useState } from "react";
import "./CSS/Form.css";
import RegisterID from "./RegisterID";

const Form = () => {
	const [formData, setFormData] = useState({
		applicantData: {
			hasOldID: false,
			oldID: "",
			nameNepali: "",
			nameEnglish: "",
			applicantPhoto: {
				name: "",
				url: "",
			},
			address: {
				province: "",
				district: "",
				municipality: "",
				wardNo: "",
			},
			dobBS: "",
			dobAD: "",
			birthRegID: "",
			citizenshipID: "",
			NID: "",
			gender: "",
			bloodGroup: "",
			typeOfDisability: "",
			levelOfDisability: "",
			protector: "",
			protectorNameNepali: "",
			protectorNameEnglish: "",
			applicantSignature: "",
		},
		issuerData: {
			issuerNameNepali: "",
			issuerNameEnglish: "",
			issuerPostNepali: "",
			issuerPostEnglish: "",
			issueDateBS: "",
			issueDateAD: "",
			issuerSignature: "",
		},
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		if (name.startsWith("issue")) {
			setFormData((prev) => ({
				...prev,
				issuerData: {
					...prev.issuerData,
					[name]: value,
				},
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				applicantData: {
					...prev.applicantData,
					[name]: value,
				},
			}));
		}
	};

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<>
			<section className="form-container">
				<form onSubmit={handleFormSubmit}>
					<div>
						<label htmlFor="hasOldID">पुरानो परिचयपत्र छ ?</label>
						<div className="radio-options-container">
							<div className="radio-options">
								<input
									type="radio"
									name="hasOldID"
									id=""
									value={2 === 2}
									onChange={handleInputChange}
								/>
								<span>छ</span>
							</div>
							<div className="radio-options">
								<input
									type="radio"
									name="hasOldID"
									id=""
									value={2 === 3}
									onChange={handleInputChange}
								/>
								<span>छैन</span>
							</div>
						</div>
					</div>

					<div>
						<label htmlFor="oldID">परिचयपत्र नम्बर</label>
						<input
							type="text"
							name="oldID"
							id="oldID"
							value={formData.applicantData.oldID}
							onChange={handleInputChange}
						/>
					</div>

					{(formData.applicantData.hasOldID === "false" ||
						formData.applicantData.hasOldID === false) && (
						<RegisterID
							formData={formData}
							setFormData={setFormData}
							handleInputChange={handleInputChange}
						/>
					)}

					<div>
						<button type="submit">उत्पन्न गर्नुहोस्</button>
					</div>
				</form>
			</section>
		</>
	);
};
export default Form;
