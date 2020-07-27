//Read-Only military data
	var military = {
		soldiers: {
			name: "Soldiers",
			daily: 0,
			cap: 0,
			amount: 0,
			cost: {
				money: 5
			},
			combatCost: {
				munitions: 1/5000,
			},
			peaceUpkeep: {
				money: 1.25,
				food: 1/750
			},
			warUpkeep:{
				money: 1.88,
				food: 1/500
			}
		},
		tanks: {
			name: "Tanks",
			daily: 0,
			cap: 0,
			amount: 0,
			cost: {
				money: 60,
				steel: 1
			},
			combatCost: {
				munitions: 1/100,
				gasoline: 1/100
			},
			peaceUpkeep: {
				money: 50
			},
			warUpkeep: {
				money: 75
			}
		},
		aircraft: {
			name: "Aircraft",
			daily: 0,
			cap: 0,
			amount: 0,
			cost: {
				money: 4000,
				aluminum: 5
			},
			combatCost: {
				munitions: 1/4,
				gasoline: 1/4
			},
			peaceUpkeep: {
				money: 500
			},
			warUpkeep: {
				money: 750
			}
		},
		ships: {
			name: "Ships",
			daily: 0,
			cap: 0,
			amount: 0,
			cost: {
				money: 50000,
				steel: 30
			},
			combatCost: {
				munitions: 3,
				gasoline: 2
			},
			peaceUpkeep: {
				money: 3750
			},
			warUpkeep: {
				money: 5625
			}
		},
		spies: {
			name: "Spies",
			daily: 2,
			cap: 50,
			amount: 0,
			cost: {
				money: 50000,
			},
			peaceUpkeep: {
				money: 2400
			},
			warUpkeep: {
				money: 2400
			}
		},
		missiles: {
			name: "Missiles",
			daily: 1,
			cap: 1000,
			amount: 0,
			cost: {
				money: 150000,
				aluminum: 100,
				gasoline: 75,
				munitions: 75
			},
			peaceUpkeep: {
				money: 21000
			},
			warUpkeep: {
				money: 31500
			}
		},
		nukes: {
			name: "Nuclear Weapons",
			daily: 1,
			cap: 1000,
			amount: 0,
			cost: {
				money: 1750000,
				aluminum: 750,
				gasoline: 500,
				uranium: 250
			},
			peaceUpkeep: {
				money: 35000
			},
			warUpkeep: {
				money: 52500
			}
		}
	};
