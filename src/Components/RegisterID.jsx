import { useRef, useState } from "react";
import Address from "./Address";
import NepaliDate from "@zener/nepali-date";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import Uploadyy from "./Uploadyy";

const RegisterID = ({ formData, setFormData, handleInputChange }) => {
	const [name, setName] = useState({
		fName: "",
		midName: "",
		lName: "",
	});

	const handleNameChange = (e, elemName) => {
		const { name, value } = e.target;

		setName((prev) => {
			const updatedName = { ...prev, [name]: value };
			const concatenatedName = `${updatedName.fName} ${
				updatedName.midName || ""
			} ${updatedName.lName}`.trim();
			setFormData((prevFormData) => ({
				...prevFormData,
				applicantData: {
					...prevFormData.applicantData,
					[elemName]: concatenatedName,
				},
			}));

			return updatedName;
		});
	};

	const handleDateConversion = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => {
			const updatedData = { ...prev };
			const dateToConvert = value;

			if (value) {
				if (name.includes("AD")) {
					const dateBS = new NepaliDate(new Date(dateToConvert));
					if (name.includes("issue")) {
						updatedData.issuerData[name.replace("AD", "BS")] =
							dateBS.toString();
					} else {
						updatedData.applicantData[name.replace("AD", "BS")] =
							dateBS.toString();
					}
				} else {
					const dateAD = new NepaliDate(dateToConvert).toAD();
					if (name.includes("issue")) {
						updatedData.issuerData[name.replace("BS", "AD")] =
							dateAD.toString();
					} else {
						updatedData.applicantData[name.replace("BS", "AD")] =
							dateAD.toString();
					}
				}
			}

			return updatedData;
		});
	};
	return (
		<>
			<div>
				<label htmlFor="nameNepali">नाम (नेपाली)</label>
				<div id="nameNepali">
					<input
						type="text"
						name="fName"
						required
						placeholder="पहिलो नाम"
						onChange={(e) => handleNameChange(e, "nameNepali")}
					/>
					<input
						type="text"
						name="midName"
						placeholder="बीचको नाम"
						onChange={(e) => handleNameChange(e, "nameNepali")}
					/>
					<input
						type="text"
						name="lName"
						required
						placeholder="थर"
						onChange={(e) => handleNameChange(e, "nameNepali")}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="nameEnglish">नाम (अंग्रेजी)</label>
				<div id="nameEnglish">
					<input
						type="text"
						name="fName"
						required
						placeholder="First Name"
						onChange={(e) => handleNameChange(e, "nameEnglish")}
					/>
					<input
						type="text"
						name="midName"
						placeholder="Middle Name"
						onChange={(e) => handleNameChange(e, "nameEnglish")}
					/>
					<input
						type="text"
						name="lName"
						required
						placeholder="Last Name"
						onChange={(e) => handleNameChange(e, "nameEnglish")}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="applicantPhoto">फोटो</label>
				<Uploadyy
					name={"applicantPhoto"}
					setFormData={setFormData}
				/>
			</div>

			<div>
				<label htmlFor="address">ठेगाना</label>
				<Address
					address={formData.applicantData.address}
					setFormData={setFormData}
				/>
			</div>

			<div className="flex gap-[1rem]">
				<div>
					<label htmlFor="dobAD">जन्ममिति (BS)</label>
					<NepaliDatePicker
						inputClassName="form-control"
						value={formData.applicantData.dobBS}
						onChange={(e) => {
							setFormData((prev) => ({
								...prev,
								applicantData: {
									...prev.applicantData,
									dobBS: e,
								},
							}));
						}}
						onSelect={(e) => {
							setFormData((prev) => {
								return {
									...prev,
									applicantData: {
										...prev.applicantData,
										dobAD: new NepaliDate(e).toAD().toString(),
									},
								};
							});
						}}
						name="dobBS"
						required
					/>
				</div>
				<div>
					<label htmlFor="dobAD">जन्ममिति (AD)</label>
					<input
						type="date"
						name="dobAD"
						required
						value={formData.applicantData.dobAD}
						id=""
						onInput={handleDateConversion}
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div className="flex gap-[1rem]">
				<div>
					<label htmlFor="birthRegID">जन्मदर्ता प्रमाणपत्र नम्बर</label>
					<input
						type="text"
						name="birthRegID"
						id=""
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="citizenshipID">नागरिकता प्रमाणपत्र नम्बर</label>
					<input
						type="text"
						name="citizenshipID"
						id=""
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="NID">राष्ट्रिय परिचयपत्र नम्बर</label>
					<input
						type="text"
						name="NID"
						id=""
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="gender">लिङ्ग</label>
				<div className="radio-options-container">
					<div className="radio-options">
						<input
							type="radio"
							name="gender"
							id=""
							required
							value={"male"}
							onChange={handleInputChange}
						/>
						<span>पुरुष</span>
					</div>
					<div className="radio-options">
						<input
							type="radio"
							name="gender"
							id=""
							value={"female"}
							onChange={handleInputChange}
						/>
						<span>महिला</span>
					</div>
					<div className="radio-options">
						<input
							type="radio"
							name="gender"
							id=""
							value={"other"}
							onChange={handleInputChange}
						/>
						<span>अन्य</span>
					</div>
				</div>
			</div>

			<div>
				<label htmlFor="bloodGroup">रक्त समूह</label>
				<select
					id="bloodGroup"
					name="bloodGroup"
					onChange={handleInputChange}
				>
					<option value=""> -- रक्त समूह -- </option>
					<option value="A+">A+</option>
					<option value="A-">A-</option>
					<option value="B+">B+</option>
					<option value="B-">B-</option>
					<option value="O+">O+</option>
					<option value="O-">O-</option>
					<option value="AB+">AB+</option>
					<option value="AB-">AB-</option>
				</select>
			</div>

			<div>
				<label htmlFor="typeOfDisability">
					अपाङ्गता को किसिम (प्रकृतिको आधारमा)
				</label>
				<select
					name="typeOfDisability"
					id=""
					onChange={handleInputChange}
				>
					<option value="">-- छनौट गर्नुहोस् --</option>
					<option value="physical">शारीरिक अपाङ्गता</option>
					<option value="sight">दृष्टिसम्बन्धी अपाङ्गता</option>
					<option value="hearing">श्रवणसम्बन्धी अपाङ्गता</option>
					<option value="sight-hearing">श्रवण-दृष्टिविहीन अपाङ्गता</option>
					<option value="speaking">स्वर-बोलाइसम्बन्धी अपाङ्गता</option>
				</select>
			</div>

			<div>
				<label htmlFor="levelOfDisability">
					अपाङ्गता को किसिम (गम्भीरताको आधारमा)
				</label>
				<select
					name="levelOfDisability"
					id=""
					required
					onChange={handleInputChange}
				>
					<option value="">-- छनौट गर्नुहोस् --</option>
					<option value="complete">पूर्ण अशक्तता</option>
					<option value="extreme">अति अशक्तता</option>
					<option value="mid">मध्य अशक्तता</option>
					<option value="normal">सामान्य अशक्तता</option>
				</select>
			</div>

			<div>
				<label htmlFor="protector">बाबु/आमा/संरक्षक</label>
				<div className="radio-options-container">
					<div className="radio-options">
						<input
							type="radio"
							name="protector"
							id=""
							value="father"
							onChange={handleInputChange}
						/>
						<span>बाबु</span>
					</div>
					<div className="radio-options">
						<input
							type="radio"
							name="protector"
							id=""
							value="mother"
							onChange={handleInputChange}
						/>
						<span>आमा</span>
					</div>
					<div className="radio-options">
						<input
							type="radio"
							name="protector"
							id=""
							value="protector"
							onChange={handleInputChange}
						/>
						<span>संरक्षक</span>
					</div>
				</div>
			</div>

			<div>
				<label htmlFor="protectorNameNepali">नाम (नेपाली)</label>
				<div id="protectorNameNepali">
					<input
						type="text"
						name="fName"
						id=""
						required
						placeholder="पहिलो नाम"
						onChange={(e) => handleNameChange(e, "protectorNameNepali")}
					/>
					<input
						type="text"
						name="midName"
						id=""
						placeholder="बीचको नाम"
						onChange={(e) => handleNameChange(e, "protectorNameNepali")}
					/>
					<input
						type="text"
						name="lName"
						id=""
						required
						placeholder="थर"
						onChange={(e) => handleNameChange(e, "protectorNameNepali")}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="protectorNameNepali">नाम (अंग्रेजी)</label>
				<div id="protectorNameEnglish">
					<input
						type="text"
						name="fName"
						id=""
						required
						placeholder="First Name"
						onChange={(e) => handleNameChange(e, "protectorNameEnglish")}
					/>
					<input
						type="text"
						name="midName"
						id=""
						placeholder="Middle Name"
						onChange={(e) => handleNameChange(e, "protectorNameEnglish")}
					/>
					<input
						type="text"
						name="lName"
						id=""
						required
						placeholder="Last Name"
						onChange={(e) => handleNameChange(e, "protectorNameEnglish")}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="applicantSignature">हस्ताक्षर</label>
				<Uploadyy
					name="applicantSignature"
					setFormData={setFormData}
				/>
			</div>

			<h3>स्वीकृत गर्ने</h3>

			<div>
				<label htmlFor="issuerName">नाम</label>
				<div
					id="issuerName"
					className="flex gap-[1rem]"
				>
					<input
						type="text"
						name="issuerNameEnglish"
						id=""
						required
						placeholder="English"
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="issuerNameNepali"
						id=""
						required
						placeholder="नेपाली"
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="issuerPost">पद</label>
				<div
					id="issuerPost"
					className="flex gap-[1rem]"
				>
					<input
						type="text"
						name="issuerPostEnglish"
						id=""
						required
						placeholder="English"
						onChange={handleInputChange}
					/>
					<input
						type="text"
						name="issuerPostNepali"
						id=""
						required
						placeholder="नेपाली"
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="issueDate">जारी मिति</label>
				<div
					id="issueDate"
					className="flex gap-[1rem]"
				>
					<NepaliDatePicker
						inputClassName="form-control"
						value={formData.issuerData.issueDateBS}
						onChange={(e) => {
							setFormData((prev) => ({
								...prev,
								issuerData: {
									...prev.issuerData,
									issueDateBS: e,
								},
							}));
						}}
						onSelect={(e) => {
							setFormData((prev) => {
								return {
									...prev,
									issuerData: {
										...prev.issuerData,
										issueDateAD: new NepaliDate(e).toAD().toString(),
									},
								};
							});
						}}
						name="dobAD"
						required
					/>
					<input
						type="date"
						name="issueDateAD"
						id=""
						required
						value={formData.issuerData.issueDateAD}
						onInput={handleDateConversion}
						placeholder="dd-mm-yyyy"
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div>
				<label htmlFor="issuerSignature">हस्ताक्षर</label>
				<Uploadyy
					name="issuerSignature"
					setFormData={setFormData}
				/>
			</div>
		</>
	);
};

export default RegisterID;
