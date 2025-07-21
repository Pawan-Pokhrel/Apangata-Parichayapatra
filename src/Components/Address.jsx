import { useEffect, useState } from "react";
import { provinces } from "../api/address/provinces.json";
import "./CSS/Address.css";

const Address = ({ address, setFormData }) => {
	const [districts, setDistricts] = useState([]);
	const [municipals, setMunicipals] = useState([]);

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			applicantData: {
				...prevState.applicantData,
				address: {
					...prevState.applicantData.address,
					[name]: value,
				},
			},
		}));
	};

	useEffect(() => {
		const loadDistricts = async () => {
			if (address.province) {
				const districtData = await import(
					`../api/address/districtsByProvince/${address.province}.json`
				);
				setDistricts(districtData.default.districts || []);
			} else {
				setDistricts([]);
			}
		};

		loadDistricts();
	}, [address.province]);

	useEffect(() => {
		const loadMunicipals = async () => {
			if (address.district) {
				const municipalData = await import(
					`../api/address/municipalsByDistrict/${address.district}.json`
				);
				setMunicipals(municipalData.default.municipals || []);
			} else {
				setMunicipals([]);
			}
		};

		loadMunicipals();
	}, [address.district]);

	return (
		<>
			<div id="address">
				<select
					name="province"
					value={address.province || ""}
					onChange={handleAddressChange}
					className="capitalize"
					required
				>
					<option value=""> -- प्रदेश -- </option>
					{provinces.map((currProvince) => (
						<option
							key={currProvince}
							value={currProvince}
							className="capitalize"
						>
							{currProvince}
						</option>
					))}
				</select>

				<select
					name="district"
					value={address.district || ""}
					onChange={handleAddressChange}
					className="capitalize"
					required
				>
					<option value=""> -- जिल्ला -- </option>
					{districts.length > 0 ? (
						districts.map((currDistrict) => (
							<option
								key={currDistrict}
								value={currDistrict}
								className="capitalize"
							>
								{currDistrict}
							</option>
						))
					) : (
						<option value="">No districts available</option>
					)}
				</select>

				<select
					name="municipality"
					value={address.municipality || ""}
					onChange={handleAddressChange}
					className="capitalize"
					required
				>
					<option value=""> -- नगरपालिका/गाउँपालिका -- </option>
					{municipals.length > 0 ? (
						municipals.map((currMunicipal) => (
							<option
								key={currMunicipal}
								value={currMunicipal}
								className="capitalize"
							>
								{currMunicipal}
							</option>
						))
					) : (
						<option value="">No municipals available</option>
					)}
				</select>

				<input
					type="number"
					name="wardNo"
					id=""
					onChange={handleAddressChange}
					placeholder="Ward No."
					required
				/>
			</div>
		</>
	);
	j;
};

export default Address;
