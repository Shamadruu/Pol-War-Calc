//Read-Only buildings data
	var buildings = {
		imp_coalpower: {
			name: "Coal Plant",	
			key: "imp_coalpower",
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
		imp_oilpower: {
			name: "Oil Plant",
			key: "imp_oilpower",
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
		imp_nuclearpower: {
			name: "Nuclear Plant",
			key: "imp_nuclearpower",
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
		imp_windpower: {
			name: "Wind Plant",
			key: "imp_windpower",
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
		imp_coalmine: {
			name: "Coal Mine",
			key: "imp_coalmine",
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
		imp_ironmine: {
			name: "Iron Mine",
			key: "imp_ironmine",
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
		imp_leadmine: {
			name: "Lead Mine",
			key: "imp_leadmine",
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
		imp_uramine: {
			name: "Uranium Mine",
			key: "imp_uramine",
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
		imp_bauxitemine: {
			name: "Bauxite Mine",
			key: "imp_bauxitemine",
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
		imp_oilwell: {
			name: "Oil Well",
			key: "imp_oilwell",
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
		imp_farm: {
			name: "Farm",
			key: "imp_farm",
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
		imp_gasrefinery: {
			name: "Oil Refinery",
			key: "imp_gasrefinery",
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
		imp_steelmill: {
			name: "Steel Mill",
			key: "imp_steelmill",
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
		imp_munitionsfactory: {
			name: "Munitions Factory",
			key: "imp_munitionsfactory",
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
		imp_aluminumrefinery: {
			name: "Aluminum Refinery",
			key: "imp_aluminumrefinery",
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
		imp_policestation: {
			name: "Police Station",
			key: "imp_policestation",
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
		imp_hospital: {
			name: "Hospital",
			key: "imp_hospital",
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
		imp_recyclingcenter: {
			name: "Recycling Center",
			key: "imp_recyclingcenter",
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
		imp_subway: {
			name: "Subway",
			key: "imp_subway",
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
		imp_supermarket: {
			name: "Supermarket",
			key: "imp_supermarket",
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
		imp_bank: {
			name: "Bank",
			key: "imp_bank",
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
		imp_mall: {
			name: "Shopping Mall",
			key: "imp_mall",
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
		imp_stadium: {
			name: "Stadium",
			key: "imp_stadium",
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
		imp_barracks: {
			name: "Barracks",
			key: "imp_barracks",
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
		imp_factory: {
			name: "Factory",
			key: "imp_factory",
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
		imp_hangar: {
			name: "Air Force Base",
			key: "imp_hangar",
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
		imp_drydock: {
			name: "Drydock",
			key: "imp_drydock",
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
