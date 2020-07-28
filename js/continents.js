//Read-only continent data
	var continents = {
		northAmerica: {
			key: "northAmerica",
			name: "North America",
			resources: ["coal", "iron", "uranium"],
			buildingsAllowed: [buildings.imp_coalmine, buildings.imp_ironmine, buildings.imp_uramine, buildings.imp_farm]
		},
		southAmerica: {
			key: "southAmerica",
			name: "South America",
			resources: ["oil", "bauxite", "lead"],
			buildingsAllowed: [buildings.imp_oilwell, buildings.imp_bauxitemine, buildings.imp_leadmine, buildings.imp_farm]
		},
		europe: {
			key: "europe",
			name: "Europe",
			resources: ["coal", "iron", "lead"],
			buildingsAllowed: [buildings.imp_coalmine, buildings.imp_ironmine, buildings.imp_leadmine, buildings.imp_farm]
		},
		africa: {
			key: "africa",
			name: "Africa",
			resources: ["oil", "bauxite", "uranium"],
			buildingsAllowed: [buildings.imp_oilwell, buildings.imp_bauxitemine, buildings.imp_uramine, buildings.imp_farm]
		},
		asia: {
			key: "asia",
			name: "Asia",
			resources: ["oil", "iron", "uranium"],
			buildingsAllowed: [buildings.imp_oilwell, buildings.imp_ironmine, buildings.imp_uramine, buildings.imp_farm]
		},
		australia: {
			key: "australia",
			name: "Australia",
			resources: ["coal", "bauxite", "lead"],
			buildingsAllowed: [buildings.imp_coalmine, buildings.imp_bauxitemine, buildings.imp_leadmine, buildings.imp_farm]
		},
		antarctica: {
			key: "antarctica",
			name: "Antarctica",
			resources: ["coal", "oil", "uranium"],
			buildingsAllowed: [buildings.imp_coalmine, buildings.imp_oilwell, buildings.imp_uramine, buildings.imp_farm]
		}
	};
