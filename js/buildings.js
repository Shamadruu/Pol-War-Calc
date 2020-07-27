//Read-Only buildings data
	var buildings = {
		coalPlant: {
			name: "Coal Plant",	
			key: "coalPlant",
			amount: 0,
			cost: {
				money: 5000
			},
			powerSupply: 500,
			powerInterval: 100,
			consumption: {
				money: 1200,
				coal: 1.2
			},
			pollution: 8
		},
		oilPlant: {
			name: "Oil Plant",
			key: "oilPlant",
			amount: 0,
			cost: {
				money: 7000
			},
			powerSupply: 500,
			powerInterval: 100,
			consumption: {
				money: 1800,
				oil: 1.2
			},
			pollution: 6
		},
		nuclearPlant: {
			name: "Nuclear Plant",
			key: "nuclearPlant",
			amount: 0,
			cost: {
				money: 500000,
				steel: 100
			},
			powerSupply: 2000,
			powerInterval: 1000,
			consumption: {
				money: 10500,
				uranium: 1.2
			},
			pollution: 0
		},
		windPlant: {
			name: "Wind Plant",
			key: "windPlant",
			amount: 0,
			cost: {
				money: 30000,
				aluminum: 25
			},
			powerSupply: 250,
			powerInterval: 250,
			consumption: {
				money: 500,
			},
			pollution: 0
		},
		coalMine: {
			name: "Coal Mine",
			key: "coalMine",
			amount: 0,
			cap: 10,
			cost: {
				money: 1000,
			},
			production: {
				coal: 3
			},
			consumption: {
				money: 400,
			},
			pollution: 12
		},
		ironMine: {
			name: "Iron Mine",
			key: "ironMine",
			amount: 0, 
			cap: 10,
			cost: {
				money: 9500,
			},
			production: {
				iron: 3
			},
			consumption: {
				money: 1600,
			},
			pollution: 12
		},
		leadMine: {
			name: "Lead Mine",
			key: "leadMine",
			amount: 0, 
			cap: 10,
			cost: {
				money: 7500,
			},
			production: {
				lead: 3
			},
			consumption: {
				money: 1500,
			},
			pollution: 12
		},
		uraniumMine: {
			name: "Uranium Mine",
			key: "uraniumMine",
			amount: 0, 
			cap: 10,
			cost: {
				money: 25000,
			},
			production: {
				uranium: 3,
			},
			consumption: {
				money: 5000,
			},
			pollution: 12
		},
		bauxiteMine: {
			name: "Bauxite Mine",
			key: "bauxiteMine",
			amount: 0, 
			cap: 10,
			cost: {
				money: 9500,
			},
			production: {
				bauxite: 3
			},
			consumption: {
				money: 1600,
			},
			pollution: 12
		},
		oilWell: {
			name: "Oil Well",
			key: "oilWell",
			amount: 0, 
			cap: 10,
			cost: {
				money: 1500,
			},
			production: {
				oil: 3
			},
			consumption: {
				money: 600,
			},
			pollution: 12
		},
		farm: {
			name: "Farm",
			key: "farm",
			amount: 0, 
			cap: 20,
			cost: {
				money: 1000,
			},
			production: {
				food: 0
			},
			consumption: {
				money: 300,
			},
			pollution: 2
		},
		oilRefinery: {
			name: "Oil Refinery",
			key: "oilRefinery",
			amount: 0, 
			cap: 5,
			cost: {
				money: 45000
			},
			production: {
				gasoline: 6
			},
			consumption: {
				money: 4000,
				oil: 3
			},
			pollution: 32
		},
		steelMill: {
			name: "Steel Mill",
			key: "steelMill",
			amount: 0, 
			cap: 5,
			cost: {
				money: 45000
			},
			production: {
				steel: 9
			},
			consumption: {
				money: 4000,
				coal: 3,
				iron: 3
			},
			pollution: 40
		},
		munitionsFactory: {
			name: "Munitions Factory",
			key: "munitionsFactory",
			amount: 0, 
			cap: 5,
			cost: {
				money: 35000
			},
			production: {
				munitions: 18
			},
			consumption: {
				money: 3500,
				lead: 6
			},
			pollution: 32
		},
		aluminumRefinery: {
			name: "Aluminum Refinery",
			key: "aluminumRefinery",
			amount: 0, 
			cap: 5,
			cost: {
				money: 30000
			},
			production: {
				aluminum: 9
			},
			consumption: {
				money: 2500,
				bauxite: 3
			},
			pollution: 40
		},
		police: {
			name: "Police Station",
			key: "police",
			amount: 0, 
			cap: 5,
			cost: {
				money: 75000,
				steel: 20
			},
			consumption: {
				money: 750,
			},
			pollution: 1,
			crime: -2.5
		},
		hospital: {
			name: "Hospital",
			key: "hospital",
			amount: 0, 
			cap: 5,
			cost: {
				money: 100000,
				aluminum: 25
			},
			consumption: {
				money: 1000,
			},
			pollution: 4,
			disease: -2.5
		},
		recycling: {
			name: "Recycling Center",
			key: "recycling",
			amount: 0, 
			cap: 3,
			cost: {
				money: 125000
			},
			consumption: {
				money: 2500,
			},
			pollution: -70,
		},
		subway: {
			name: "Subway",
			key: "subway",
			amount: 0, 
			cap: 1,
			cost: {
				money: 250000,
				steel: 50,
				aluminum: 25
			},
			consumption: {
				money: 3250,
			},
			pollution: -45,
			commerce: 8
		},
		market: {
			name: "Supermarket",
			key: "market",
			amount: 0, 
			cap: 6,
			cost: {
				money: 5000
			},
			consumption: {
				money: 600
			},
			commerce: 3
		},
		bank: {
			name: "Bank",
			key: "bank",
			amount: 0, 
			cap: 5,
			cost: {
				money: 15000,
				steel: 5,
				aluminum: 10
			},
			consumption: {
				money: 1800
			},
			commerce: 5
		},
		mall: {
			name: "Shopping Mall",
			key: "mall",
			amount: 0, 
			cap: 4,
			cost: {
				money: 45000,
				steel: 20,
				aluminum: 25
			},
			consumption: {
				money: 5400
			},
			pollution: 2,
			commerce: 9,
		},
		stadium: {
			name: "Stadium",
			key: "stadium",
			amount: 0, 
			cap: 3,
			cost: {
				money: 100000,
				steel: 40,
				aluminum: 50
			},
			consumption: {
				money: 12150
			},
			pollution: 5,
			commerce: 12
		},
		barracks: {
			name: "Barracks",
			key: "barracks",
			amount: 0, 
			cap: 5,
			cost: {
				money: 3000
			},
			recruitment: 1000,
			military: {
				soldiers: 3000
			}
		},
		factory: {
			name: "Factory",
			key: "factory",
			amount: 0, 
			cap: 5,
			cost: {
				money: 15000,
				aluminum: 5
			},
			recruitment: 50,
			military: {
				tanks: 250
			}
		},
		airBase: {
			name: "Air Force Base",
			key: "airBase",
			amount: 0, 
			cap: 5,
			cost: {
				money: 100000,
				steel: 10
			},
			recruitment: 3,
			military: {
				aircraft: 15
			}
		},
		drydock: {
			name: "Drydock",
			key: "drydock",
			amount: 0, 
			cap: 3,
			cost: {
				money: 250000,
				steel: 25
			},
			recruitment: 1,
			military: {
				ships: 5
			}
		}
	};
