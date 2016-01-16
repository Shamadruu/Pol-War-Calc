//Politics & War Calculator - Version 0.52 - Shamadruu
//(function() {
var main = {
    display: {},
    nation: {},
    local: {
        create: function(name, obj) {
            localStorage.setItem(name, JSON.stringify(obj));
        },
        reset: function(name) {
            localStorage.setItem(name, "");
        },
        load: function(name) {
        	if(JSON.parse(localStorage.getItem(name)) !== null && JSON.parse(localStorage.getItem(name)) !== undefined){
	            var obj = JSON.parse(localStorage.getItem(name));
	            if (name == "cities") {
	                for (var i = 0; i < obj.length; i++) {
	                    var x = obj[i];
	                    Object.defineProperties(x, {
	                        "update": {
	                            value: main.nation.data.City.prototype.update
	                        }
	                    });
	                }
	            }
	            return obj;
	        }
	        else{
	        	switch(name){
	        		case "cities":
	        			if(main.nation.data.cities === undefined || main.nation.data.cities === null){
	        				main.nation.init();
	        			}
	        			return main.nation.data.cities;
	        			break;
        			case "inputData":
        				if(main.nation.inputData === undefined || main.nation.inputData == null){
        					main.nation.init();
        				}
        				return main.nation.inputData;
        				break;
    				case "military":
						if(main.nation.data.military === undefined || main.nation.data.military === null){
        					main.nation.init();
        				}
        				return main.nation.data.military;
        				break;
	        	}
	        }
        }
    }
}
main.nation.init = function() {
    main.nation = {
        inputData: {
            taxRate: 0.20,
            colorBonus: 2.5,
            war: false,
            starve: false,
            projects: {
                armsStockpile: {
                    value: false,
                    name: "Arms Stockpile"
                },
                bauxiteworks: {
                    value: false,
                    name: "Bauxiteworks"
                },
                cForCivEng: {
                    value: false,
                    name: "Center for Civil Engineering"
                },
                cia: {
                    value: false,
                    name: "Center Intelligence Agency"
                },
                emGasRes: {
                    value: false,
                    name: "Emergency Gasoline Reserve"
                },
                tradeCenter: {
                    value: false,
                    name: "International Trade Center"
                },
                ironDome: {
                    value: false,
                    name: "Iron Dome"
                },
                ironworks: {
                    value: false,
                    name: "Ironworks"
                },
                massIrr: {
                    value: false,
                    name: "Mass Irrigation"
                },
                launchPad: {
                    value: false,
                    name: "Missile Launch Pad"
                },
                nukeFacility: {
                    value: false,
                    name: "Nuclear Research Facility"
                },
                vitalSystem: {
                    value: false,
                    name: "Vital Defense System"
                }
            }
        },
        data: {
            cities: [],
            cityBackup: [],
            findBuildingCat: function(b) {
                for (var x in main.nation.data.buildings) {
                    for (var y in main.nation.data.buildings[x]) {
                        if (y == b) {
                            return x;
                        }
                    }
                }
            },
            military : {
                soldiers: {
                    name: "Soldiers",
                    cap: 0,
                    amount: 0,
                    cost: {
                        money: 2
                    },
                    peaceInc: 750,
                    warInc: 500,
                    peaceUpkeep: 1.25,
                    warUpkeep: 1.88
                },
                tanks: {
                    name: "Tanks",
                    cap: 0,
                    amount: 0,
                    cost: {
                        money: 60,
                        steel: 1
                    },
                    peaceUpkeep: 50,
                    warUpkeep: 75
                },
                aircraft: {
                    name: "Aircraft",
                    cap: 0,
                    amount: 0,
                    cost: {
                        money: 4000,
                        aluminum: 3
                    },
                    peaceUpkeep: 500,
                    warUpkeep: 750
                },
                ships: {
                    name: "Ships",
                    cap: 0,
                    amount: 0,
                    cost: {
                        money: 50000,
                        steel: 25
                    },
                    peaceUpkeep: 3750,
                    warUpkeep: 5625
                },
                spies: {
                    name: "Spies",
                    cap: 50,
                    amount: 0,
                    cost: {
                        money: 50000,
                        steel: 1
                    },
                    peaceUpkeep: 2400,
                    warUpkeep: 2400
                },
                missiles: {
                    name: "Missiles",
                    cap: 0,
                    amount: 0,
                    cost: {
                        money: 150000,
                        aluminum: 100,
                        gasoline: 75,
                        munitions: 75
                    },
                    peaceUpkeep: 21000,
                    warUpkeep: 31500
                },
                nukes: {
                    name: "Nuclear Weapons",
                    cap: 0,
                    amount: 0,
                    cost: {
                        money: 1750000,
                        aluminum: 750,
                        gasoline: 500,
                        uranium: 250
                    },
                    peaceUpkeep: 35000,
                    warUpkeep: 52500
                }
            }
        },
    };
    main.nation.data.buildings = {
        power: {
            coalPlant: {
                name: "Coal Plant",
                cost: {
                    money: 500
                },
                powerSupply: 500,
                powerInc: 100,
                cons: {
                    money: 1200,
                    coal: 1.2
                },
                pollution: 8
            },
            oilPlant: {
                name: "Oil Plant",
                cost: {
                    money: 7000
                },
                powerSupply: 500,
                powerInc: 100,
                cons: {
                    money: 1800,
                    oil: 1.2
                },
                pollution: 6
            },
            nuclearPlant: {
                name: "Nuclear Plant",
                cost: {
                    money: 500000,
                    steel: 100
                },
                powerSupply: 2000,
                powerInc: 1000,
                cons: {
                    money: 10500,
                    uranium: 1.2
                },
                pollution: 0
            },
            windPlant: {
                name: "Wind Plant",
                cost: {
                    money: 30000,
                    aluminum: 25
                },
                powerSupply: 250,
                powerInc: 250,
                cons: {
                    money: 500,
                },
                pollution: 0
            }
        },
        res: {
            coalMine: {
                name: "Coal Mine",
                cap: 6,
                cost: {
                    money: 1000,
                },
                prod: {
                    coal: 6
                },
                cons: {
                    money: 400,
                },
                pollution: 6
            },
            ironMine: {
                name: "Iron Mine",
                cap: 3,
                cost: {
                    money: 9500,
                },
                prod: {
                    iron: 6
                },
                cons: {
                    money: 1600,
                },
                pollution: 6
            },
            leadMine: {
                name: "Lead Mine",
                cap: 5,
                cost: {
                    money: 7500,
                },
                prod: {
                    lead: 9
                },
                cons: {
                    money: 1500,
                },
                pollution: 6
            },
            uraniumMine: {
                name: "Uranium Mine",
                cap: 2,
                cost: {
                    money: 25000,
                },
                prod: {
                    uranium: 3,
                },
                cons: {
                    money: 5000,
                },
                pollution: 10
            },
            bauxiteMine: {
                name: "Bauxite Mine",
                cap: 3,
                cost: {
                    money: 9500,
                },
                prod: {
                    bauxite: 6
                },
                cons: {
                    money: 1600,
                },
                pollution: 6
            },
            oilWell: {
                name: "Oil Well",
                cap: 6,
                cost: {
                    money: 1500,
                },
                prod: {
                    oil: 9
                },
                cons: {
                    money: 600,
                },
                pollution: 6
            },
            farm: {
                name: "Farm",
                cap: 8,
                cost: {
                    money: 1000,
                },
                prod: {
                    food: "special!"
                },
                cons: {
                    money: 300,
                },
                pollution: 1
            },
        },
        manu: {
            oilRefinery: {
                name: "Oil Refinery",
                cap: 3,
                cost: {
                    money: 45000
                },
                prod: {
                    gasoline: 6
                },
                cons: {
                    money: 4000,
                    oil: 3
                },
                pollution: 16
            },
            steelMill: {
                name: "Steel Mill",
                cap: 3,
                cost: {
                    money: 45000
                },
                prod: {
                    steel: 9
                },
                cons: {
                    money: 4000,
                    coal: 3,
                    iron: 3
                },
                pollution: 20
            },
            munitionsFactory: {
                name: "Munitions Factory",
                cap: 3,
                cost: {
                    money: 35000
                },
                prod: {
                    munitions: 18
                },
                cons: {
                    money: 3500,
                    lead: 6
                },
                pollution: 16
            },
            aluRefinery: {
                name: "Aluminum Refinery",
                cap: 3,
                cost: {
                    money: 30000
                },
                prod: {
                    aluminum: 9
                },
                cons: {
                    money: 2500,
                    bauxite: 3
                },
                pollution: 20
            }
        },
        civil: {
            polStation: {
                name: "Police Station",
                cap: 5,
                cost: {
                    money: 75000,
                    steel: 20
                },
                cons: {
                    money: 4000,
                },
                pollution: 1,
                crime: -2.5
            },
            hospital: {
                name: "Hospital",
                cap: 5,
                cost: {
                    money: 100000,
                    aluminum: 25
                },
                cons: {
                    money: 1000,
                },
                pollution: 4,
                disease: -2.5
            },
            recCenter: {
                name: "Recycling Center",
                cap: 3,
                cost: {
                    money: 125000
                },
                cons: {
                    money: 2500,
                },
                pollution: -70,
            },
            subway: {
                name: "Subway",
                cap: 1,
                cost: {
                    money: 250000,
                    steel: 50,
                    aluminum: 25
                },
                cons: {
                    money: 3250,
                },
                pollution: -45,
                commerce: 7
            }
        },
        comm: {
            market: {
                name: "Supermarket",
                cap: 5,
                cost: {
                    money: 5000
                },
                cons: {
                    money: 600
                },
                commerce: 4
            },
            bank: {
                name: "Bank",
                cap: 4,
                cost: {
                    money: 15000,
                    steel: 5,
                    aluminum: 10
                },
                cons: {
                    money: 1800
                },
                commerce: 7
            },
            mall: {
                name: "Shopping Mall",
                cap: 3,
                cost: {
                    money: 45000,
                    steel: 20,
                    aluminum: 25
                },
                cons: {
                    money: 5400
                },
                pollution: 2,
                commerce: 12,
            },
            stadium: {
                name: "Stadium",
                cap: 2,
                cost: {
                    money: 100000,
                    steel: 40,
                    aluminum: 50
                },
                cons: {
                    money: 12150
                },
                pollution: 5,
                commerce: 18
            }
        },
        mili: {
            barracks: {
                name: "Barracks",
                cap: 5,
                cost: {
                    money: 3000
                },
                military: {
                    soldiers: 3000
                }
            },
            factory: {
                name: "Factory",
                cap: 5,
                cost: {
                    money: 15000,
                    aluminum: 5
                },
                military: {
                    tanks: 250
                }
            },
            airBase: {
                name: "Air Force Base",
                cap: 5,
                cost: {
                    money: 100000,
                    steel: 10
                },
                military: {
                    aircraft: 18
                }
            },
            drydock: {
                name: "Drydock",
                cap: 3,
                cost: {
                    money: 250000,
                    aluminum: 25
                },
                military: {
                    ships: 5
                }
            }
        }
    };
    Object.freeze(main.nation.data.buildings);
    
    main.nation.data.update = function() {
        this.revenue = {
            coal: {
                prod: 0,
                cons: 0,
                net: 0
            },
            oil: {
                prod: 0,
                cons: 0,
                net: 0
            },
            uranium: {
                prod: 0,
                cons: 0,
                net: 0
            },
            lead: {
                prod: 0,
                cons: 0,
                net: 0
            },
            iron: {
                prod: 0,
                cons: 0,
                net: 0
            },
            bauxite: {
                prod: 0,
                cons: 0,
                net: 0
            },
            gasoline: {
                prod: 0,
                cons: 0,
                net: 0
            },
            munitions: {
                prod: 0,
                cons: 0,
                net: 0
            },
            steel: {
                prod: 0,
                cons: 0,
                net: 0
            },
            aluminum: {
                prod: 0,
                cons: 0,
                net: 0
            },
            food: {
                prod: 0,
                cons: 0,
                net: 0
            },
            money: {
                prod: 0,
                cons: 0,
                net: 0
            }
        };
        this.netRevenue = {};
        this.production = {};
        this.consumption = {};
        this.catCost = {
            power: 0,
            res: 0,
            mili: 0,
            improve: 0
        };
        //Reset military caps
        for(var m in this.military){
            this.military[m].cap = 0;
            if(m == "spies"){
                this.military[m].cap = 50;
            }
        }
        this.infra = 0;
        this.avgInfra = 0;
        this.land = 0;
        this.avgLand = 0;
        this.pop = 0;
        this.avgPop = 0;
        this.avgPopDensity = 0;
        this.cityCount = 0;
        this.poweredRatio = 0;
        this.wAvgIncome = 0;
        this.avgDisease = 0;
        this.avgCrime = 0;
        this.avgPollution = 0;
        this.avgPop = 0;
        this.totalSlots = 0;
        this.slotsUsed = 0;
        this.cityCount = this.cities.length;
        for (var c in this.cities) {
            if(this.cities[c].update === undefined){
                Object.defineProperties(this.cities[c], {
                    "update": {
                        value:this.City.prototype.update
                    }
                });
            }
            this.cities[c].update();
            for (var r in this.cities[c].revenue) {
                for (var t in this.cities[c].revenue[r]) {
                    this.revenue[r][t] += this.cities[c].revenue[r][t];
                }
            }
            for (var t in this.cities[c].catCost) {
                this.catCost[t] += this.cities[c].catCost[t];
            }
            this.pop += this.cities[c].pop;
            this.avgPop += this.cities[c].pop / this.cityCount
            this.avgPopDensity += this.cities[c].popDensity / this.cityCount;
            this.avgInfra += this.cities[c].infra / this.cityCount;
            this.infra += this.cities[c].infra;
            this.land += this.cities[c].land;
            this.avgLand += this.cities[c].land / this.cityCount;
            this.poweredRatio += (this.powered) ? (1 / this.cityCount) : (0);
            this.wAvgIncome += this.cities[c].avgIncome * this.cities[c].pop;
            this.avgDisease += this.cities[c].disease / this.cityCount;
            this.avgCrime += this.cities[c].crime / this.cityCount;
            this.avgPollution += this.cities[c].pollution / this.cityCount;
            this.totalSlots += this.cities[c].slots;
            this.slotsUsed += this.cities[c].slotsUsed;
            
            for(var m in this.cities[c].military){
                this.military[m].cap += this.cities[c].military[m].cap;
            }
        }
        this.wAvgIncome /= this.pop;
        
        
        //Military
        if(main.nation.inputData.projects.cia.value === true){
            this.military.spies.cap = 60;
        }
        if(main.nation.inputData.projects.launchPad.value === true){
            this.military.missiles.cap = -1;
        }
        if(main.nation.inputData.projects.nukeFacility.value === true){
            this.military.nukes.cap = -1;
        }
        for(var m in this.military){
            if(this.military[m].amount < 0){
                this.military[m].amount = 0;
            }
            if(this.military[m].amount > this.military[m].cap && this.military[m].cap !== -1){
                this.military[m].amount = this.military[m].cap;
            }
            if(main.nation.inputData.war === true){
                this.revenue.money.cons += this.military[m].amount * this.military[m].warUpkeep;
            }
            else{
                this.revenue.money.cons += this.military[m].amount * this.military[m].peaceUpkeep;
            }
            if(m == "soldiers"){
                if(main.nation.inputData.war === true){
                    this.revenue.food.cons += this.military[m].amount/500;
                }
                else{
                   this.revenue.food.cons += this.military[m].amount/750;
               }
            }
        }
        for(var r in this.revenue){
		this.revenue[r].net = this.revenue[r].prod - this.revenue[r].cons;
		if(this.revenue[r].net > 0){
			this.revenue[r].net *= (1-main.nation.inputData.taxRate);
		}
	}
    };
    main.nation.data.City = function() {
        this.id = (main.nation.data.cities.length + 1);
        this.displayName = "City " + (main.nation.data.cities.length + 1);
        this.infra = 100;
        this.land = 100;
        this.age = 0;
        this.buildings = {
            power: {
                coalPlant: 0,
                oilPlant: 0,
                nuclearPlant: 0,
                windPlant: 0
            },
            res: {
                coalMine: 0,
                ironMine: 0,
                leadMine: 0,
                uraniumMine: 0,
                bauxiteMine: 0,
                oilWell: 0,
                farm: 0
            },
            manu: {
                oilRefinery: 0,
                steelMill: 0,
                munitionsFactory: 0,
                aluRefinery: 0
            },
            civil: {
                polStation: 0,
                hospital: 0,
                recCenter: 0,
                subway: 0,
            },
            comm: {
                market: 0,
                bank: 0,
                mall: 0,
                stadium: 0
            },
            mili: {
                barracks: 0,
                factory: 0,
                airBase: 0,
                drydock: 0
            }
        };

    };
    main.nation.data.City.prototype.update = function() {
        this.slots = Math.floor(this.infra / 50);
        this.slotsUsed = 0;
        this.pop = this.infra * 100;
        this.popDensity = this.pop / this.land;
        this.disease = 0;
        this.crime = 0;
        this.pollution = 0;
        this.powered = false;
        this.powerSupply = 0;
        this.commerce = 0;
        this.avgIncome = 0;
        this.cityCost = {
        	steel: 0,
        	aluminum: 0,
        	money: 0,
	};
        this.catCost = {
            power: 0,
            res: 0,
            mili: 0,
            improve: 0
        };
        this.revenue = {
            coal: {
                prod: 0,
                cons: 0,
                net: 0
            },
            oil: {
                prod: 0,
                cons: 0,
                net: 0
            },
            uranium: {
                prod: 0,
                cons: 0,
                net: 0
            },
            lead: {
                prod: 0,
                cons: 0,
                net: 0
            },
            iron: {
                prod: 0,
                cons: 0,
                net: 0
            },
            bauxite: {
                prod: 0,
                cons: 0,
                net: 0
            },
            gasoline: {
                prod: 0,
                cons: 0,
                net: 0
            },
            munitions: {
                prod: 0,
                cons: 0,
                net: 0
            },
            steel: {
                prod: 0,
                cons: 0,
                net: 0
            },
            aluminum: {
                prod: 0,
                cons: 0,
                net: 0
            },
            food: {
                prod: 0,
                cons: 0,
                net: 0
            },
            money: {
                prod: 0,
                cons: 0,
                net: 0
            },
        };
        this.production = {};
        this.consumption = {};
        this.netRevenue = {};
        
        this.military = {
            soldiers: {
                cap: 0
            },
            tanks: {
                cap: 0
            },
            aircraft: {
                cap: 0
            },
            ships: {
                cap: 0
            }
        };
        
        for (var x in this.buildings) {
       	    
            if (x == "power") {
                for (var y in this.buildings.power) {
                    this.slotsUsed += this.buildings.power[y];
                    if (this.buildings.power[y] > 0) {
                        this.powerSupply += main.nation.data.buildings.power[y].powerSupply * this.buildings.power[y];
                        this.pollution += main.nation.data.buildings.power[y].pollution * this.buildings.power[y]
                    }
                }
                for (var y in this.buildings.power) {
                    if (this.buildings.power[y] > 0) {
                        for (var r in main.nation.data.buildings.power[y].cons) {
                            if (r !== "money") {
                                this.revenue[r].cons += Math.ceil(Math.min(this.infra, this.buildings.power[y] * main.nation.data.buildings.power[y].powerSupply) / main.nation.data.buildings.power[y].powerInc) * main.nation.data.buildings.power[y].cons[r];
                            } else {
                                this.revenue.money.cons += this.buildings.power[y] * main.nation.data.buildings.power[y].cons[r];
                                this.catCost.power += this.buildings.power[y] * main.nation.data.buildings.power[y].cons[r];
                            }
                        }
                        for(var r in main.nation.data.buildings[x][y].cost){
       	    			this.cityCost[r] += main.nation.data.buildings[x][y].cost[r] * this.buildings[x][y];
       			}
                    }
                }
                if (this.powerSupply >= this.infra) {
                    this.powered = true;
                }
            } else {
                for (var y in this.buildings[x]) {
                    this.slotsUsed += this.buildings[x][y];
                    for(var r in main.nation.data.buildings[x][y].cost){
       	    			this.cityCost[r] += main.nation.data.buildings[x][y].cost[r] * this.buildings[x][y];
       		    }
                    for (var r in main.nation.data.buildings[x][y].prod) {
                        if (r !== "food") {
                            this.revenue[r].prod += main.nation.data.buildings[x][y].prod[r] * this.buildings[x][y];
                        } else {
                            this.revenue.food.prod += this.land / 25 * this.buildings.res.farm;
                        }
                    }
                    for (var r in main.nation.data.buildings[x][y].cons) {
                        this.revenue[r].cons += main.nation.data.buildings[x][y].cons[r] * this.buildings[x][y];
                        if (r == "money") {
                            if (x == "res") {
                                this.catCost.res += main.nation.data.buildings[x][y].cons[r] * this.buildings[x][y];
                            } else {
                                this.catCost.improve += main.nation.data.buildings[x][y].cons[r] * this.buildings[x][y];
                            }
                        }
                    }
                    if (main.nation.data.buildings[x][y].commerce !== undefined) {
                        this.commerce += main.nation.data.buildings[x][y].commerce * this.buildings[x][y];
                    }
                    if (main.nation.data.buildings[x][y].pollution !== undefined) {
                        this.pollution += main.nation.data.buildings[x][y].pollution * this.buildings[x][y];
                    }
                    if (main.nation.data.buildings[x][y].crime !== undefined) {
                        this.crime += main.nation.data.buildings[x][y].crime * this.buildings[x][y];
                    }
                    if (main.nation.data.buildings[x][y].disease !== undefined) {
                        this.disease += main.nation.data.buildings[x][y].disease * this.buildings[x][y];
                    }
                    if (main.nation.data.buildings[x][y].military !== undefined) {
                        for (var m in main.nation.data.buildings[x][y].military) {
                            this.military[m].cap += main.nation.data.buildings[x][y].military[m] * this.buildings[x][y];
                        }
                    }
                }
            }
        }
        if (main.nation.inputData.projects.armsStockpile.value === true) {
            this.revenue.lead.cons *= 1.34;
            this.revenue.munitions.prod *= 1.34;
        }
        if (main.nation.inputData.projects.bauxiteworks.value === true) {
            this.revenue.bauxite.cons *= 1.36;
            this.revenue.aluminum.prod *= 1.36;
        }
        if (main.nation.inputData.projects.emGasRes.value === true) {
            this.revenue.oil.cons += this.buildings.manu.oilRefinery * main.nation.data.buildings.manu.oilRefinery.cons.oil;
            this.revenue.gasoline.prod *= 2;
        }
        if (main.nation.inputData.projects.ironworks.value === true) {
            this.revenue.coal.cons += this.buildings.manu.steelMill * main.nation.data.buildings.manu.steelMill.cons.coal * 0.36;
            this.revenue.iron.cons *= 1.36;
            this.revenue.steel.prod *= 1.36;
        }
        if (main.nation.inputData.projects.massIrr.value === true) {
            this.revenue.food.prod *= 1.2;
        }
        if (this.commerce > 100 && main.nation.inputData.projects.tradeCenter.value === false) {
            this.commerce = 100;
        } else if (this.commerce > 115 && main.nation.inputData.projects.tradeCenter.value === true) {
            this.commerce = 115;
        }
        this.avgIncome = 0.725 * ((this.commerce / 50)+1);
        this.pop = this.infra * 100;
        this.popDensity = this.pop / this.land
        this.crime += (Math.pow((103 - this.commerce), 2) + this.pop) / 111111;
        this.crime = ((this.crime > 100 || this.crime < 0) ? (Math.round(this.crime / 100) * 100) : (this.crime));
        this.pollToll = (this.pollution * 0.05);
        if(this.pollToll < 0){
        	this.pollToll = 0;
        }
        this.disease += (((Math.pow(this.popDensity, 2) * 0.01) - 25) / 100) + (this.pop / 100000) + this.pollToll;
        this.disease = ((this.disease > 100 || this.disease < 0) ? (Math.round(this.disease / 100) * 100) : (this.disease));
        if (this.disease > 100) {
            this.disease = 100;
        }
        this.pop = Math.round((this.pop - (this.disease * this.infra) - (10 * this.crime * this.infra) + 25)*(1 + (this.age/3000)));
        if (this.pop < 0) {
            this.pop = 0;
        }
        this.popDensity = this.pop / this.land;
        this.revenue.food.cons += this.pop / 1000;
        this.revenue.money.prod += this.avgIncome * this.pop * (1 + (main.nation.inputData.colorBonus/100));
        
         for(var r in this.revenue){
		this.revenue[r].net = this.revenue[r].prod - this.revenue[r].cons;
         }
    };
    main.nation.data.cities.push(new main.nation.data.City());
    main.nation.data.update();
    delete main.nation.init;
}
main.display = {
    events: function() {
        $("body").on("click", "span.toggle", function() {
            $(this).parents().eq(2).children().eq(1).toggle();
            $(this).parents().eq(2).children().eq(2).toggle();
            if ($(this).attr("class") == "glyphicon glyphicon-minus pointer toggle") {
                $(this).attr("class", "glyphicon glyphicon-plus pointer toggle");
            } else {
                $(this).attr("class", "glyphicon glyphicon-minus pointer toggle");
            }
        });
        $("#nationConfig").on("change", "input", function() {
            if ($(this).attr("id") == "allianceTaxRate") {
                if (Number($(this).val()) <= 100 && Number($(this).val()) >= 0) {
                    main.nation.inputData.taxRate = Number($(this).val()) / 100;
                } else if (Number($(this).val()) > 100) {
                    main.nation.inputData.taxRate = 1;
                    $(this).val(100);
                } else {
                    main.nation.inputData.taxRate = 0;
                    $(this).val(0);
                }
            } else if ($(this).attr("id") == "nationBonus") {
                if (Number($(this).val()) >= 0) {
                    main.nation.inputData.colorBonus = Number($(this).val());
                } else {
                    $(this).val(0);
                    main.nation.inputData.colorBonus = 0;
                }
            } else if ($(this).attr("id") == "war") {
                if ($(this).prop("checked") == true) {
                    main.nation.inputData.war == true;
                } else {
                    main.nation.inputData.war == false;
                }
            } else if ($(this).attr("id") == "starve") {
                if ($(this).prop("checked") == true) {
                    main.nation.inputData.starve == true;
                } else {
                    main.nation.inputData.starve == false;
                }
            }
        });
        $("#projectsConfig").on("change", "input", function() {
            if ($(this).prop("checked") == true) {
                main.nation.inputData.projects[$(this).attr("name")].value = true;
            } else {
                main.nation.inputData.projects[$(this).attr("name")].value = false;
            }
        });
        $("#create").on("click", function() {
            main.nation.data.cities.push(new main.nation.data.City());
            
        });
        $("#delete").on("click", function() {
            main.nation.data.cityBackup.push(main.nation.data.cities.pop());
        });
        $("#cities").on("click", ".city span.copy", function() {
            var c = jQuery.extend(true, {}, main.nation.data.cities[Number($(this).parents().eq(2).attr("id")) - 1]);
            c.id = main.nation.data.cities.length + 1;
            main.nation.data.cities.push(c);
            console.log(main.nation.data.cities);
        });
        $("#cities").on("change", ".city .cityname", function() {
            var c = main.nation.data.cities[Number($(this).parents().eq(2).attr("id")) - 1];
            c.displayName = $(this).val();
        });
        $("#cities").on("change", ".city .improve input", function() {
            if (Number($(this).val()) <= 100 && Number($(this).val()) >= 0) {
                var c = main.nation.data.cities[$(this).parents().eq(2).attr("class").match(/\d/)[0] - 1];
                var b = main.nation.data.findBuildingCat($(this).attr("name")) + "." + $(this).attr("name");
                if (c.slotsUsed + (Number($(this).val()) - c.buildings[b.split(".")[0]][b.split(".")[1]]) <= c.slots) {
                    if (main.nation.data.buildings[b.split(".")[0]][b.split(".")[1]].cap !== undefined) {
                        if (Number($(this).val()) <= main.nation.data.buildings[b.split(".")[0]][b.split(".")[1]].cap) {
                            c.buildings[b.split(".")[0]][b.split(".")[1]] = Number($(this).val());
                        }
                    } else {
                        c.buildings[b.split(".")[0]][b.split(".")[1]] = Number($(this).val());
                    }
                } else {
                    $(this).val(c.buildings[b.split(".")[0]][b.split(".")[1]]);
                }
            } else {
                if ($(this).val() > 100) {} else {
                    $(this).val(0);
                }
            }
        });
        //Military
        $("#miliMaster").on("change", "input", function(){
            if(Number($(this).val()) >= 0 && (Number($(this).val()) <= main.nation.data.military[$(this).attr("name")].cap || main.nation.data.military[$(this).attr("name")].cap == -1)){
                main.nation.data.military[$(this).attr("name")].amount = Math.ceil(Number($(this).val()));
            }
            else if(Number($(this).val()) > main.nation.data.military[$(this).attr("name")].cap){
                $(this).val(main.nation.data.military[$(this).attr("name")].cap);
                main.nation.data.military[$(this).attr("name")].amount = $(this).val();
            }
            else{
                $(this).val(0);
                main.nation.data.military[$(this).attr("name")].amount = 0;
            }
        });
        //Modal
        $("#expandedCity").on("show.bs.modal", function(){
        	$("#expandedTable").html(main.display.nation.updateExpandedCityInfo());	
        });
    },
    nation: {
        genNationConfig: function() {
            var HTML = '<div class="row"><div class="col-sm-3 header">Alliance Tax Rate</div><div class="col-sm-3"><input id="allianceTaxRate" name="tax" type="number" min="1" max="100" value="' + (main.nation.inputData.taxRate * 100).toFixed(2) + '">%</div><div class="col-sm-3 header">Total Income Bonus</div><div class="col-sm-3"><input id="nationBonus" name="bonus" type="number" min="0" max="100" value="' + main.nation.inputData.colorBonus + '">%</div></div><div class="row"><div class="col-sm-3 header">War? </div><div class="col-sm-3"><input type="checkbox" name="war" id="war"></div><div class="col-sm-3 header">Starving?</div><div class="col-sm-3"><input type="checkbox" name="starve" id="starve"></input></div></div>';
            return HTML;
        },
        genProjects: function() {
            var HTML = '<div class="row">',
                inc = 1;
            for (var p in main.nation.inputData.projects) {
                if ((inc - 1) % 2 == 0 && inc != 1) {
                    HTML += '</div><div class="row">';
                }
                HTML += '<div class="col-sm-3 header">' + main.nation.inputData.projects[p].name + '</div><div class="col-sm-3"><input type="checkbox" name="' + p + '" ';
		if(main.nation.inputData.projects[p].value === true){
		   HTML += 'checked';
		}
		HTML +='></div>';
        	inc++;
            }
            return HTML;
        },
        genNationOverview: function() {
            var HTML = '<div class="row"><div class="col-sm-3 header">Cities</div><div class="col-sm-3">' + main.nation.data.cityCount + '</div><div class="col-sm-3 header">Improvements Built</div><div class="col-sm-3">' + main.nation.data.slotsUsed + '/' + main.nation.data.totalSlots + '</div></div><div class="row"><div class="col-sm-3 header">Infrastructure</div><div class="col-sm-3">' + main.nation.data.infra + '</div><div class="col-sm-3 header">Land</div><div class="col-sm-3">' + main.nation.data.land + '</div></div><div class="row"><div class="col-sm-3 header">Average Infrastructure</div><div class="col-sm-3">' + main.nation.data.avgInfra.toFixed(2) + '</div><div class="col-sm-3 header">Average Land</div><div class="col-sm-3">' + main.nation.data.avgLand.toFixed(2) + '</div></div><div class="row"><div class="col-sm-3 header">Population</div><div class="col-sm-3">' + main.nation.data.pop.toFixed(2) + '</div><div class="col-sm-3 header">Population Density</div><div class="col-sm-3">' + (main.nation.data.pop / main.nation.data.land).toFixed(2) + '</div></div><div class="row"><div class="col-sm-3 header">Average Population</div><div class="col-sm-3">' + main.nation.data.avgPop.toFixed(2) + '</div><div class="col-sm-3 header">Average Pop Density</div><div class="col-sm-3">' + main.nation.data.avgPopDensity.toFixed(2) + '</div></div><div class="row"><div class="col-sm-3 header">Weighted Average Income</div><div class="col-sm-3">$' + main.nation.data.wAvgIncome.toFixed(2) + '</div><div class="col-sm-3 header">Tax Rate</div><div class="col-sm-3">' + main.nation.inputData.taxRate * 100 + '%</div></div><div class="row"><div class="col-sm-3 header">Average Disease</div><div class="col-sm-3">' + main.nation.data.avgDisease.toFixed(2) + '%</div><div class="col-sm-3 header">Average Crime</div><div class="col-sm-3">' + main.nation.data.avgCrime.toFixed(2) + '%</div></div><div class="row"><div class="col-sm-3 header">Average Pollution</div><div class="col-sm-3">' + main.nation.data.avgPollution.toFixed(2) + '</div><div class="col-sm-3 header">Cities Powered Ratio</div><div class="col-sm-3">' + (main.nation.data.poweredRatio * 100).toFixed(2) + '%</div></div><div class="row"><div class="col-sm-3 header">Gross Revenue</div><div class="col-sm-3">$' + main.nation.data.revenue.money.prod.toFixed(2) + '</div><div class="col-sm-3 header">Net Income</div><div class="col-sm-3">$' + main.nation.data.revenue.money.net.toFixed(2) + '</div></div><div class="row"><div class="col-sm-3 header">Production</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.coal.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.oil.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.uranium.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.lead.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.iron.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.bauxite.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.gasoline.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.munitions.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.steel.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.aluminum.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + main.nation.data.revenue.food.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div><div class="col-sm-3 header">Consumption</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.coal.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.oil.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.uranium.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.lead.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.iron.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.bauxite.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.gasoline.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.munitions.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.steel.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.aluminum.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + main.nation.data.revenue.food.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div></div></div><div class="row"><div class="col-sm-3 header">Net Revenue</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.coal.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.oil.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.uranium.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.lead.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.iron.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.bauxite.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.gasoline.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.munitions.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + main.nation.data.revenue.steel.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + main.nation.data.revenue.aluminum.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + main.nation.data.revenue.food.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div><div class="col-sm-6"></div></div>';
            return HTML;
        },
        genCityOverview: function() {
            var HTML = '<div class="row"><div class="col-sm-2 header">City</div><div class="col-sm-1 header">Infra</div><div class="col-sm-1 header">Land</div><div class="col-sm-1 header">Slots</div><div class="col-sm-2 header">Population</div><div class="col-sm-2 header">Income</div><div class="col-sm-3 header">Revenue</div></div>';
            for (var i = 0; i < main.nation.data.cities.length; i++) {
                var c = main.nation.data.cities[i];
                HTML += '<div class="row" style="text-align: right;"><div class="col-sm-2 header" style="text-align: left;">' + c.displayName + '</div><div class="col-sm-1">' + c.infra + '</div><div class="col-sm-1">' + c.land + '</div><div class="col-sm-1">' + c.slotsUsed + '/' + c.slots + '</div><div class="col-sm-2">' + c.pop + '</div><div class="col-sm-2">$' + c.revenue.money.net.toFixed(2) + '</div><div class="col-sm-3"><div class="col-sm-3 np" style="width: 100%; text-align: right"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div></div></div>';
            }
            return HTML;
        },
        updateExpandedCityInfo: function(){
        	var HTML = '<!-- The resemblance to the Politics & War "City Manager" screen is purposeful. -->';
        	//HTML += '<colgroup><col span="1" style="text-align: left; font-weight: 800; background-color: #000099; color: white;"><col style="text-align: right; color: black; background-color: #d9d9d9"> </colgroup>';
        	HTML += '<thead><tr><th>&nbsp</th></tr></thead><tbody>';
        	
        	
        	/*HTML += '<tr><th scope="name">Name</th>';
        	for(var i=0;i< main.nation.data.cities.length;i++){
        		HTML += '<td class="cell-bold"';
        	}
        	HTML += '</tr>';*/
        	
        	HTML += '</tbody><tfoot><tr><th>&nbsp</th></tr></tfoot>';
        	return HTML;
        }
    },
    city: {
        buildCityHTML: function(c) {
            var HTML = '<div class="container-fluid col-sm-10 col-sm-offset-1 city" id="' + c.id + '"><div class=row><div class="col-sm-12 header city-name"><input class="cityname" value="' + c.displayName + '"><span class="glyphicon glyphicon-copy pointer copy" style="float: left;"></span><span class="glyphicon glyphicon-minus pointer toggle" style=color:#000;zoom:1.25;float:right title="Maximize or minimize this city."></span><div class="age input" style="width: 25%;position: absolute; display: inline-block;">Age: <input style="width: 25%;" name=age type=number min=0 value="' + c.age + '" step=1> days</div> <!-- <span class="glyphicon glyphicon-arrow-up pointer cityup" style=color:#000;float:left></span> <span class="glyphicon glyphicon-arrow-down pointer citydown" style=color:#000;float:left></span> --></div></div><div class="container-fluid stats"><div class="row infra"><div class="col-sm-3 header">Infrastructure</div><div class="col-sm-3 infra input"><input name=infra type=number min=100 value="' + c.infra + '" step=50></div><div class="col-sm-3 header">Land Area</div><div class="col-sm-3 land input"><input name=land type=number min=100 value="' + c.land + '" step=50></div></div><div class="row slots"><div class="col-sm-3 header">Improvement Slots</div><div class="col-sm-3 slots">' + c.slots + '</div><div class="col-sm-3 header">Slots Used</div><div class="col-sm-3 slotsUsed">' + c.slotsUsed + '/' + c.slots + '</div></div><div class="row pop"><div class="col-sm-3 header">Population</div><div class=col-sm-3 pop>' + c.pop + '</div><div class="col-sm-3 header">Population Density</div><div class="col-sm-3 popDensity">' + c.popDensity.toFixed(2) + '</div></div><div class="row ill"><div class="col-sm-3 header">Disease</div><div class="col-sm-3 disease">' + c.disease.toFixed(2) + '%</div><div class="col-sm-3 header">Crime</div><div class="col-sm-3 crime">' + c.crime.toFixed(2) + '%</div></div><div class="row poll"><div class="col-sm-3 header">Pollution</div><div class="col-sm-3 pollution">' + c.pollution + '</div><div class="col-sm-3 header">Pollution Contribution</div><div class="col-sm-3 pollToll">' + c.pollToll + '%</div></div><div class="row power"><div class="col-sm-3 header">Powered?</div><div class="col-sm-3 powered">' + c.powered + '</div><div class="col-sm-3 header">Power Capacity</div><div class="col-sm-3 powerSupply">' + c.powerSupply + '</div></div><div class="row inc"><div class="col-sm-3 header">Commerce</div><div class="col-sm-3 commerce">' + c.commerce + '</div><div class="col-sm-3 header">Average Income</div><div class="col-sm-3 avgIncome">$' + c.avgIncome.toFixed(2) + '</div></div><div class="row rev"><div class="col-sm-3 header">Gross Revenue (City)</div><div class="col-sm-3 grossRevenue">' + c.revenue.money.prod.toFixed(2) + '</div><div class="col-sm-3 header">% National Revenue</div><div class="col-sm-3 perGrossRevenue">' + (c.revenue.money.prod / main.nation.data.revenue.money.prod * 100).toFixed(2) + '%</div></div><div class="row prod"><div class="col-sm-3 header">Production</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.prod + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.prod + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.prod + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.prod + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.prod + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.prod + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.prod + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.prod + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.prod + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.prod + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.prod + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div><div class="col-sm-3 header">Consumption</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.cons + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.cons + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.cons + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.cons + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.prod + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.cons + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.cons + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.prod + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.cons + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.cons + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.cons + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div></div><div class="row net"><div class="col-sm-3 header">Net Revenue</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div><div class="col-sm-6"></div></div></div><div class="container-fluid improve"><div class=row><div class="col-sm-12 improve-header header">Improvements</div></div><div class=row><ul class="nav nav-tabs nav-justified"><li class=active><a data-toggle=tab href=#power-city' + c.id + '>Power</a></li><li><a data-toggle=tab href=#res-city' + c.id + '>Resources</a></li><li><a data-toggle=tab href=#manu-city' + c.id + '>Manufacturing</a></li><li><a data-toggle=tab href=#civil-city' + c.id + '>Civil</a></li><li><a data-toggle=tab href=#comm-city' + c.id + '>Commerce</a></li><li><a data-toggle=tab href=#mili-city' + c.id + '>Military</a></li></ul></div><div class=tab-content><div class="tab-pane fade in active power ' + c.id + '" id="power-city' + c.id + '"><div class=row coalPlant><div class="col-sm-2 name">Coal Plant</div><div class="col-sm-8 desc">Coal power is an inexpensive but dirty way to power your city. Coal plants cost $5,000 to build. Coal power plants can provide power for up to 500 infrastructure levels. They use 1.2 tons of <img src=https://politicsandwar.com/img/resources/coal.png> a day (0.1/turn) per 100 infrastructure. Operational costs are $1200 a day ($100/turn). Coal plants add 8 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=coalPlant min=0 step=1 value=';
            HTML += c.buildings.power.coalPlant + '></div></div><div class=row oilPlant><div class="col-sm-2 name">Oil Plant</div><div class="col-sm-8 desc">Oil power is cleaner than coal power but more expensive. Oil plants cost $7,000 to build. Oil power plants can provide power for up to 500 infrastructure levels. They use 1.2 tons of <img src=https://politicsandwar.com/img/resources/oil.png> a day (0.1/turn) per 100 infrastructure. Operational costs are $1800 a day. ($150/turn) Oil plants add 6 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=oilPlant min=0 step=1 value=';
            HTML += c.buildings.power.oilPlant + '></div></div><div class=row><div class="col-sm-2 name">Nuclear Plant</div><div class="col-sm-8 desc">Nuclear power is very expensive but provides a lot of power and is clean. Nuclear plants cost $500,000 and 100 <img src=https://politicsandwar.com/img/resources/steel.png> to build. They use 1.2 tons a day (0.1/turn) of <img src=https://politicsandwar.com/img/resources/uranium.png> per 1,000 infrastructure and can power up to 2,000 infrastructure. Operational costs are $10,500 a day ($875/turn). Nuclear power plants do not affect your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=nuclearPlant min=0 step=1 value=' + c.buildings.power.nuclearPlant + '></div></div><div class=row><div class="col-sm-2 name">Wind Plant</div><div class="col-sm-8 desc">Wind power is expensive and does not provide much power but is very clean. Wind plants cost $30,000 and 25 <img src=https://politicsandwar.com/img/resources/aluminum.png> to build. Wind power plants can provide power for up to 250 infrastructure levels. They do not require resources to operate. Operational costs are $500 a day ($42/turn). Wind power plants do not affect your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=windPlant min=0 step=1 value=' + c.buildings.power.windPlant + '></div></div></div><div class="tab-pane fade res ' + c.id + '" id=res-city' + c.id + ' ><div class=row><div class="col-sm-2 name">Coal Mine</div><div class="col-sm-8 desc">Coal mines allow you to harvest coal for energy use and trade. Coal mines cost $1,000 to build. Coal mines provide 0.5 tons of <img src=https://politicsandwar.com/img/resources/coal.png> per turn or 6 tons of coal per day. Operational costs are $400 per day ($34/turn). You can have up to 6 coal mines per city. Each coal mine adds 6 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=coalMine min=0 max=6 step=1 value=' + c.buildings.res.coalMine + '></div></div><div class=row><div class="col-sm-2 name">Iron Mine</div><div class="col-sm-8 desc">Iron mines allow you to harvest iron which is refined into Steel. Steel can be used for a variety of things, namely naval ships and structures. Iron mines cost $9,500 to build. Iron mines provide 0.5 tons of iron per turn or 6 tons of iron per day. Operational costs are $1,600 per day ($134/turn). You can have up to 3 iron mines per city. Each iron mine adds 6 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=ironMine min=0 max=3 step=1 value=' + c.buildings.res.ironMine + '></div></div><div class=row><div class="col-sm-2 name">Lead Mine</div><div class="col-sm-8 desc">Lead mines allow you to harvest lead which can be manufactured into Munitions. Munitions are a key war material. Lead mines cost $7,500 to build. Lead mines provide 0.75 tons of lead per turn or 9 tons of lead per day. Operational costs are $1,500 per day ($125/turn). You can have up to 5 lead mines per city. Each lead mine adds 6 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=leadMine min=0 max=5 step=1 value=' + c.buildings.res.leadMine + '></div></div><div class=row><div class="col-sm-2 name">Uranium Mine</div><div class="col-sm-8 desc">Uranium mines allow you to harvest uranium for energy use, trade, and nuclear weapons. Uranium mines cost $25,000 to build. Uranium mines provide 0.25 tons of uranium per turn or 3 tons of uranium per day. Operational costs are $5,000 per day ($417/turn). You can have up to 2 uranium mines per city. Each uranium mine adds 10 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=uraniumMine min=0 max=2"" step=1 value=' + c.buildings.res.uraniumMine + '></div></div><div class=row><div class="col-sm-2 name">Bauxite Mine</div><div class="col-sm-8 desc">Bauxite mines allow you to harvest bauxite which is refined into Aluminum. Aluminum can be used for a variety of things, namely lightweight military aircraft. Bauxite mines cost $9,500 to build. Bauxite mines provide 0.5 tons of bauxite per turn or 6 tons of bauxite per day. Operational costs are $1,600 per day ($134/turn). You can have up to 3 bauxite mines per city. Each bauxite mine adds 6 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=bauxiteMine min=0 max="3" step=1 value=' + c.buildings.res.bauxiteMine + '></div></div><div class=row><div class="col-sm-2 name">Oil Well</div><div class="col-sm-8 desc">Oil wells allow you to harvest oil for energy use and trade. Oil wells cost $1,500 to build. Oil wells provide 0.75 tons of oil per turn or 9 tons of oil per day. Operational costs are $600 per day ($50/turn). You can have up to 6 oil wells per city. Each oil well adds 6 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=oilWell min=0 max="6" step=1 value=' + c.buildings.res.oilWell + '></div></div><div class=row><div class="col-sm-2 name">Farm</div><div class="col-sm-8 desc">Farms allow you to produce food for your ever growing population. Farms cost $1,000 to build. Farms provide food equivalent to your (Land Area / 300) tons of food per turn or (Land Area / 25) tons of food per day. Operational costs are $300 per day ($25/turn). You can have up to 8 farms per city. Each farm adds 1 point to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=farm min=0 max=8 step=1 value=' + c.buildings.res.farm + '></div></div></div><div class="tab-pane fade manu ' + c.id + '" id=manu-city' + c.id + '><div class=row><div class="col-sm-2 name">Oil Refinery</div><div class="col-sm-8 desc">Oil Refineries turn oil into gasoline. They can turn 3 tons of oil into 6 tons of gasoline daily (0.5/turn). Oil Refineries cost $45,000 to build. Operational costs are $4,000 per day ($334/turn). You can have up to 3 oil refineries per city. Each oil refinery adds 16 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=oilRefinery min=0 max=3 step=1 value=' + c.buildings.manu.oilRefinery + '></div></div><div class=row><div class="col-sm-2 name">Steel Mill</div><div class="col-sm-8 desc">Steel Mills turn iron into steel. They can turn 3 tons of iron and coal into 9 tons of steel daily (0.75/turn). Steel Mills cost $45,000 to build. Operational costs are $4,000 per day ($334/turn). You can have up to 3 steel mills per city. Each steel mill adds 20 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=steelMill min=0 max=3 step=1 value=' + c.buildings.manu.steelMill + '></div></div><div class=row><div class="col-sm-2 name">Munitions Factory</div><div class="col-sm-8 desc">Munitions Factories turn lead into munitions. They can turn 6 tons of lead into 18 tons of munitions daily (1.5/turn). Munitions factories cost $35,000 to build. Operational costs are $3,500 per day ($292/turn). You can have up to 3 munitions factories per city. Each munitions factory adds 16 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=munitionsFactory min=0 max=3 step=1 value=' + c.buildings.manu.munitionsFactory + '></div></div><div class=row><div class="col-sm-2 name">Aluminum Refinery</div><div class="col-sm-8 desc">Aluminum Refineries turn bauxite into aluminum. They can turn 3 tons of bauxite into 9 tons of aluminum daily (0.75/turn). Aluminum Refineries cost $30,000 to build. Operational costs are $2,500 per day ($209/turn). You can have up to 3 aluminum refineries per city. Each aluminum refinery adds 20 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=aluRefinery min=0 max=3 step=1 value=' + c.buildings.manu.aluRefinery + '></div></div></div><div class="tab-pane fade ' + c.id + '" id=civil-city' + c.id + '><div class=row><div class="col-sm-2 name">Police Station</div><div class="col-sm-8 desc">Police Stations reduce crime by 2.5%. Police Stations cost $75,000 and 20 <img src=https://politicsandwar.com/img/resources/steel.png> to build. Operational costs are $750 per day ($63/turn). You can have up to 5 police stations per city. Police stations add 1 point to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=polStation min=0 max=5 step=1 value=' + c.buildings.civil.polStation + '></div></div><div class=row><div class="col-sm-2 name">Hospital</div><div class="col-sm-8 desc">Hospitals reduce disease by 2.5%. Hospitals cost $100,000 and 25 <img src=https://politicsandwar.com/img/resources/aluminum.png> to build. Operational costs are $1,000 per day ($84/turn). You can have up to 5 hospitals per city. Each hospital adds 4 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=hospital min=0 max=5 step=1 value=' + c.buildings.civil.hospital + '></div></div><div class=row><div class="col-sm-2 name">Recycling Center</div><div class="col-sm-8 desc">Recycling centers reduce the pollution index by 70 in this city. Recycling centers cost $125,000 to build. Operational costs are $2,500 per day ($209/turn). You can have up to 3 recycling centers per city. Each recycling center removes 70 points from your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=recCenter min=0 max=3 step=1 value=' + c.buildings.civil.recCenter + '></div></div><div class=row><div class="col-sm-2 name">Subway</div><div class="col-sm-8 desc">Subways increase the commerce rate by 7% and reduce the pollution index by 45 in this city. Subways cost $250,000, 50 <img src=https://politicsandwar.com/img/resources/steel.png> and 25 <img src=https://politicsandwar.com/img/resources/aluminum.png> to build. Operational costs are $3,250 per day ($271/turn). You can have up to 1 subway per city. Each subway removes 45 points from your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=subway min=0 max=1 step=1 value=' + c.buildings.civil.subway + '></div></div></div><div class="tab-pane fade comm ' + c.id + '" id=comm-city' + c.id + '><div class=row><div class="col-sm-2 name">Supermarket</div><div class="col-sm-8 desc">Supermarkets increase commerce by 4%. Supermarkets cost $5,000 to build. Operational costs are $600 per day ($50/turn). You can have up to 5 supermarkets per city. Supermarkets do not affect your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=market min=0 max=5 step=1 value=' + c.buildings.comm.market + '></div></div><div class=row><div class="col-sm-2 name">Bank</div><div class="col-sm-8 desc">Banks increase commerce by 7%. Banks cost $15,000, 5 and 10 to build. Operational costs are $1,800 per day ($150/turn). You can have up to 4 banks per city. Banks do not affect your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=bank min=0 max=4 step=1 value=' + c.buildings.comm.bank + '></div></div><div class=row><div class="col-sm-2 name">Mall</div><div class="col-sm-8 desc">Shopping malls increase commerce by 12%. Shopping malls cost $45,000, 20 and 25 to build. Operational costs are $5,400 per day ($450/turn). You can have up to 3 shopping malls per city. Each shopping mall adds 2 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=mall min=0 max=3 step=1 value='
            HTML += c.buildings.comm.mall + '></div></div><div class=row><div class="col-sm-2 name">Stadium</div><div class="col-sm-8 desc">Stadiums increase the commerce by 18%. Stadiums cost $100,000, 40 and 50 to build. Operational costs are $12,150 per day ($1013/turn). You can have up to 2 stadiums per city. Each stadium adds 5 points to your pollution index.</div><div class="col-sm-2 amnt"><input type=number name=stadium min=0 max=2 step=1 value=' + c.buildings.comm.stadium + '></div></div></div><div class="tab-pane fade mili ' + c.id + '" id=mili-city' + c.id + '><div class=row><div class="col-sm-2 name">Barracks</div><div class="col-sm-8 desc">Barracks allow you to train infantry. Barracks cost $3,000 to build. Barracks house soldiers and increase the maximum amount you can have enlisted. Each barracks houses 3,000 soldiers. Each soldier costs $1.25 per day in peacetime, or $1.88 per day in wartime. You can have 5 barracks per city.</div><div class="col-sm-2 amnt"><input type=number name="barracks" min=0 max="5" step=1 value=' + c.buildings.mili.barracks + '></div></div><div class=row><div class="col-sm-2 name">Factory</div><div class="col-sm-8 desc">Factories allow you to manufacture tanks. Factories cost $15,000 and 5 to build. Factories allow you to manufacture up to 50 new tanks a day at a maximum of 250 tanks per factory. Each tank costs $50 per day in peacetime and $75 per day in wartime. In battles tanks use 1 per 100 tanks and 1 per 100 tanks. You can have 5 factories per city.</div><div class="col-sm-2 amnt"><input type=number name=factory min=0 max="5" step=1 value=' + c.buildings.mili.factory + '></div></div><div class=row><div class="col-sm-2 name">Air Force Base</div><div class="col-sm-8 desc">Air Force Bases allow you to manufacture aircraft. Air Force Bases cost $100,000 and 10 to build. Air Force Bases allow you to manufacture up to 3 new aircraft a day at a maximum of 18 aircraft per air force base. Each aircraft costs $500 per day in peacetime and $750 per day in wartime. In battles aircraft use 1 per 4 aircraft and 1 per 4 aircraft. You can have 5 air force bases per city.</div><div class="col-sm-2 amnt"><input type=number name=airBase min=0 max="5" step=1 value=' + c.buildings.mili.airBase + '></div></div><div class=row><div class="col-sm-2 name">Drydock</div><div class="col-sm-8 desc">Drydocks allow you to manufacture navy ships. Drydocks cost $250,000 and 20 to build. Drydocks allow you to manufacture up to 1 new naval ship per day at a maximum of 5 ships per drydock. Each ship costs $3,750 per day in peacetime and $5,625 per day in wartime. In battles ships use 2 per ship and 3 per ship. You can have 3 drydocks per city.</div><div class="col-sm-2 amnt"><input type=number name=drydock min=0 max="3" step=1 value=' + c.buildings.mili.drydock + '></div></div></div></div></div></div>';
            return HTML;
        },
        displayNewCities: function() {
            for (var i = $("#cities .city").length; i < main.nation.data.cities.length; i++) {
                $("#cities").append(main.display.city.buildCityHTML(main.nation.data.cities[i]));
            }
        },
        removeOldCities: function() {
            for (var i = $("#cities .city").length; i > main.nation.data.cities.length; i--) {
                $("#cities .city:last-of-type").remove();
            }
        },
        updateCityInfo: function() {
            $("#cities").find(".city").each(function() {
                var c = main.nation.data.cities[Number($(this).attr("id")) - 1];
                c.infra = Number(($(this).find(".infra.input").find("input").val()));
                c.land = Number(($(this).find(".land.input").find("input").val()));
                c.age = Number(($(this).find(".age.input").find("input").val()));
                $(this).find("div.row.slots").html('<div class="col-sm-3 header">Improvement Slots</div><div class="col-sm-3 slots">' + c.slots + '</div><div class="col-sm-3 header">Slots Used</div><div class="col-sm-3 slotsUsed">' + c.slotsUsed + '/' + c.slots + '</div></div>');
                $(this).find("div.row.pop").html('<div class="col-sm-3 header">Population</div><div class=col-sm-3 pop>' + c.pop + '</div><div class="col-sm-3 header">Population Density</div><div class="col-sm-3 popDensity">' + c.popDensity.toFixed(2) + '</div></div>');
                $(this).find("div.row.ill").html('<div class="col-sm-3 header">Disease</div><div class="col-sm-3 disease">' + c.disease.toFixed(2) + '%</div><div class="col-sm-3 header">Crime</div><div class="col-sm-3 crime">' + c.crime.toFixed(2) + '%</div></div>');
                $(this).find('div.row.poll').html('<div class="col-sm-3 header">Pollution</div><div class="col-sm-3 pollution">' + c.pollution + '</div><div class="col-sm-3 header">Pollution Contribution</div><div class="col-sm-3 pollToll">' + c.pollToll.toFixed(2) + '%</div></div>');
                $(this).find("div.row.power").html('<div class="col-sm-3 header">Powered?</div><div class="col-sm-3 powered">' + c.powered + '</div><div class="col-sm-3 header">Power Capacity</div><div class="col-sm-3 powerSupply">' + c.powerSupply + '</div></div>');
                $(this).find("div.row.inc").html('<div class="col-sm-3 header">Commerce</div><div class="col-sm-3 commerce">' + c.commerce + '</div><div class="col-sm-3 header">Average Income</div><div class="col-sm-3 avgIncome">$' + c.avgIncome.toFixed(2) + '</div></div>');
                $(this).find("div.row.rev").html('<div class="col-sm-3 header">Gross Revenue (City)</div><div class="col-sm-3 grossRevenue">$' + c.revenue.money.prod.toFixed(2) + '</div><div class="col-sm-3 header">% National Revenue</div><div class="col-sm-3 perGrossRevenue">' + (c.revenue.money.prod / main.nation.data.revenue.money.prod * 100).toFixed(2) + '%</div></div>');
                $(this).find("div.row.prod").html('<div class="col-sm-3 header">Production</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.prod.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div><div class="col-sm-3 header">Consumption</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.cons.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div>');
                $(this).find("div.row.net").html('<div class="col-sm-3 header">Net Revenue</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row><div class="col-sm-3 nb np">' + c.revenue.coal.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/coal.png title=Coal style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.oil.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/oil.png title=oil style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.uranium.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/uranium.png title=Uranium style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.lead.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/lead.png title=Lead style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.iron.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/iron.png title=Iron style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.bauxite.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/bauxite.png title=Bauxite style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.gasoline.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/gasoline.png title=Gasoline style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.munitions.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/munitions.png title=Munitions style=width:12px;height:12px></div></div><div class=row><div class="col-sm-3 nb np">' + c.revenue.steel.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-3 nb np">' + c.revenue.aluminum.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div><div class="col-sm-6 nb np">' + c.revenue.food.net.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px></div></div></div></div><div class="col-sm-3">City Build Cost</div><div class="col-sm-1">' + c.cityCost.money.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/money.png title=Money style=width:12px;height:12px></div><div class="col-sm-1">' + c.cityCost.steel.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/steel.png title=Steel style=width:12px;height:12px></div><div class="col-sm-1">' + c.cityCost.aluminum.toFixed(2) + '<img src=https://politicsandwar.com/img/resources/aluminum.png title=Aluminum style=width:12px;height:12px></div>');

            });
        },
        
    },
    military: {
        genDisplay : function(){
            var HTML = '<div><div class="row"><div class="col-sm-2 header">Name</div><div class="col-sm-3 header">Cost</div><div class="col-sm-3 header" style="text-align: center;">Upkeep (Peace/War)</div><div class="col-sm-2 header" style="text-align: right;">Amount</div><div class="col-sm-2 header" style="text-align: right;">Cap</div></div></div>';
            for(var m in main.nation.data.military){
                HTML += '<div id="' + m + '"><div class="row"><div class="col-sm-12 buffer"></div></div>';
                HTML += '<div class="row ' + m + '"><div class="col-sm-2 header">' + main.nation.data.military[m].name + '</div><div class="col-sm-3 np"><div class="container-fluid nb" style=font-size:12px><div class=row>';
                for(var r in main.nation.data.military[m].cost){
                    HTML += '<div class="col-sm-3">'  + main.nation.data.military[m].cost[r] + '<img src="https://politicsandwar.com/img/resources/' + r + '.png" title="' + r + '"></div>';
                }
                HTML += '</div></div></div><div class="col-sm-3" style="text-align: center;">$' + main.nation.data.military[m].peaceUpkeep + ' ';
                if(m == "soldiers"){
                    HTML += ' & 1/750 <img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px>';
                }
                HTML += '|| $' + main.nation.data.military[m].warUpkeep + '     ';
                if(m == "soldiers"){
                    HTML += ' & 1/500 <img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px>';
                }
                HTML += '</div><div class="col-sm-2" style="text-align: right;"><input type="number" name="' + m + '" max="' + main.nation.data.military[m].cap + '" value="' + main.nation.data.military[m].amount + '"></div><div class="col-sm-2" style="text-align: right;">' + main.nation.data.military[m].cap + '</div></div>';
                HTML += '<div class="row totalCostHeaders"><div class="col-sm-6 header" style="text-align: center;  height: 2em;">Total Cost to Produce</div><div class="col-sm-3 header" style=" height: 2em;text-align: center">Upkeep (Peace)</div><div class="col-sm-3 header" style="text-align: center;  height: 2em;">Upkeep (War)</div></div>';
                HTML += '<div class="row totalCost ' + m +  '"><div class="col-sm-6 np"><div class="container-fluid nb" style=font-size:12px><div class="row" style="text-align: right;">';
                for(var r in main.nation.data.military[m].cost){
                    HTML += '<div class="col-sm-3">'  + (main.nation.data.military[m].cost[r] * main.nation.data.military[m].amount) + '<img src="https://politicsandwar.com/img/resources/' + r + '.png" title="' + r + '"></div>';
                }
                HTML += '</div></div></div><div class="col-sm-3" style="text-align: center;">$' + (main.nation.data.military[m].peaceUpkeep*main.nation.data.military[m].amount).toFixed(2);
                if(m == "soldiers"){
                    HTML += ' ' + (1/750 * main.nation.data.military[m].amount).toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px>';
                }
                HTML += '</div><div class="col-sm-3" style="text-align: center;">$' + (main.nation.data.military[m].warUpkeep*main.nation.data.military[m].amount).toFixed(2);
                if(m == "soldiers"){
                    HTML += ' ' + (1/500 * main.nation.data.military[m].amount).toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px>';
                }
                HTML += '</div></div></div>';
            }
            return HTML;
        },
        updateMili: function(){
            for(var m in main.nation.data.military){
            	$("#miliMaster").find("." + m).find("div.col-sm-2:last-of-type").text(main.nation.data.military[m].cap)
            	
                var HTML = '<div class="col-sm-6 np" style="height: 2em;"><div class="container-fluid nb" style=font-size:12px><div class="row" style="text-align: right;">';
                for(var r in main.nation.data.military[m].cost){
                    HTML += '<div class="col-sm-3">'  + (main.nation.data.military[m].cost[r] * main.nation.data.military[m].amount) + '<img src="https://politicsandwar.com/img/resources/' + r + '.png" title="' + r + '"></div>';
                }
                HTML += '</div></div></div><div class="col-sm-3" style="text-align: center; height: 2em;">$' + (main.nation.data.military[m].peaceUpkeep*main.nation.data.military[m].amount).toFixed(2);
                if(m == "soldiers"){
                    HTML += '  &  ' + (1/750 * main.nation.data.military[m].amount).toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px>';
                }
                HTML += '</div><div class="col-sm-3" style="text-align: center; height: 2em;">$' + (main.nation.data.military[m].warUpkeep*main.nation.data.military[m].amount).toFixed(2);
                if(m == "soldiers"){
                    HTML += '  &  ' + (1/500 * main.nation.data.military[m].amount).toFixed(2) + '<img src=https://politicsandwar.com/img/resources/food.png title=Food style=width:12px;height:12px>';
                }
                HTML += '</div>';
                $("#miliMaster").find(".totalCost." + m).html(HTML);
            }
        }
    },
    updateDisplay: function() {
        main.display.city.displayNewCities();
        main.display.city.removeOldCities();
        main.display.city.updateCityInfo();
        main.display.military.updateMili();
        $("#nationOver div.container-fluid").empty();
        $("#nationOver div.container-fluid").append(main.display.nation.genNationOverview());
        $("#cityOver div.container-fluid").empty();
        $("#cityOver div.container-fluid").append(main.display.nation.genCityOverview());
    }
};
main.display.init = function() {
    main.display.events();
    $("#nationConfig div.container-fluid").append(main.display.nation.genNationConfig());
    $("#projectsConfig div.container-fluid").append(main.display.nation.genProjects());
    $("#nationOver div.container-fluid").append(main.display.nation.genNationOverview());
    $("#cityOver div.container-fluid").append(main.display.nation.genCityOverview());
    $("#miliMaster div.container-fluid").append(main.display.military.genDisplay());
}
main.update = setInterval(function() {main.nation.data.update(); main.display.updateDisplay();}, 500);
    main.save = function() {
        main.local.create("cities", main.nation.data.cities);
        main.local.create("inputData", main.nation.inputData);
        main.local.create("military", main.nation.data.military);
    },
    main.load = function() {
        main.nation.data.cities = main.local.load("cities");
        main.nation.inputData = main.local.load("inputData");
        if(main.local.load("military").soldiers.name !== undefined){
            main.nation.data.military = main.local.load("military");
        }
    },
    main.saveLoop = function() {
        setInterval(main.save, 30000);
    }
main.nation.init();
main.load();
main.nation.data.update();
main.display.init();
main.saveLoop();
//}());
//The Obfuscation!
