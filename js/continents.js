//Read-only continent data
	var continents = {
		northAmerica: {
			key: "northAmerica",
			name: "North America",
			resources: ["coal", "iron", "uranium"],
			buildingsAllowed: [buildings.coalMine, buildings.ironMine, buildings.uraniumMine, buildings.farm]
		},
		southAmerica: {
			key: "southAmerica",
			name: "South America",
			resources: ["oil", "bauxite", "lead"],
			buildingsAllowed: [buildings.oilWell, buildings.bauxiteMine, buildings.leadMine, buildings.farm]
		},
		europe: {
			key: "europe",
			name: "Europe",
			resources: ["coal", "iron", "lead"],
			buildingsAllowed: [buildings.coalMine, buildings.ironMine, buildings.leadMine, buildings.farm]
		},
		africa: {
			key: "africa",
			name: "Africa",
			resources: ["oil", "bauxite", "uranium"],
			buildingsAllowed: [buildings.oilWell, buildings.bauxiteMine, buildings.uraniumMine, buildings.farm]
		},
		asia: {
			key: "asia",
			name: "Asia",
			resources: ["oil", "iron", "uranium"],
			buildingsAllowed: [buildings.oilWell, buildings.ironMine, buildings.uraniumMine, buildings.farm]
		},
		australia: {
			key: "australia",
			name: "Australia",
			resources: ["coal", "bauxite", "lead"],
			buildingsAllowed: [buildings.coalMine, buildings.bauxiteMine, buildings.leadMine, buildings.farm]
		},
		antarctica: {
			key: "antarctica",
			name: "Antarctica",
			resources: ["coal", "oil", "uranium"],
			buildingsAllowed: [buildings.coalMine, buildings.oilWell, buildings.uraniumMine, buildings.farm]
		}
	};
