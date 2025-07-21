const Header = () => {
	return (
		<>
			<figure className="w-full flex flex-col items-center my-5">
				<img
					src="../../coatOfArms.png"
					alt="Coat of Arms"
					className="w-28 h-28"
				/>
				<figcaption className="text-center mt-2 text-sm text-red-500 font-bold">
					काठमाडौं महानगरपालिका
				</figcaption>
			</figure>
			<section className="w-full flex justify-center">
				<h1 className="bg-red-700 text-white p-2">
					अपाङ्गता परिचयपत्र
				</h1>
			</section>
		</>
	);
};

export default Header;
