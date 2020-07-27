//(function(){
/***************
****GLOBAL*****
***************/
var counter = 0;
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
//Read-Only revenue template
var revenue = {
	coal: {
		production: 0,
		consumption: 0,
		net: 0
	},
	oil: {
		production: 0,
		consumption: 0,
		net: 0
	},
	uranium: {
		production: 0,
		consumption: 0,
		net: 0
	},
	lead: {
		production: 0,
		consumption: 0,
		net: 0
	},
	iron: {
		production: 0,
		consumption: 0,
		net: 0
	},
	bauxite: {
		production: 0,
		consumption: 0,
		net: 0
	},
	gasoline: {
		production: 0,
		consumption: 0,
		net: 0
	},
	munitions: {
		production: 0,
		consumption: 0,
		net: 0
	},
	steel: {
		production: 0,
		consumption: 0,
		net: 0
	},
	aluminum: {
		production: 0,
		consumption: 0,
		net: 0
	},
	food: {
		production: 0,
		consumption: 0,
		net: 0
	},
	money: {
		production: 0,
		consumption: 0,
		net: 0
	}
};
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
/***************
****OBJECTS*****
***************/

/***NATION***/
var Nation = function(){
	this.buildings = (JSON.parse(JSON.stringify(buildings)));

	this.revenue = (JSON.parse(JSON.stringify(revenue)));

	this.military = (JSON.parse(JSON.stringify(military)));
	if(arguments.length === 0){
		this.cities = [];
		this.continent = this.continents["northAmerica"];
		this.domesticPolicy = "manifestDestiny";
		this.warPolicy = "attrition";
		this.warStatus = false;
		this.starvationStatus = false;
		this.monetaryTaxRate = 0.05;
		this.resourceTaxRate = 0.05;
		this.incomeBonus = 0.05;
		
	}
	else if(arguments[0] !== undefined){
		//this.military = (JSON.parse(JSON.stringify(military)));
		this.continent = Nation.prototype.continents[arguments[0].continent];
		this.domesticPolicy = arguments[0].domesticPolicy;
		this.warPolicy = arguments[0].warPolicy;
		this.warStatus = arguments[0].warStatus;
		this.starvationStatus = arguments[0].starvationStatus;
		this.monetaryTaxRate = arguments[0].monetaryTaxRate | 0.05;
		this.resourceTaxRate = arguments[0].resourceTaxRate | 0.05
		this.incomeBonus = arguments[0].incomeBonus;
		this.cities = [];
		
		for(var p in arguments[0].builtProjects){
			this.projects[arguments[0].builtProjects[p]].built = true;
		}
		
		for(var m in arguments[0].military){
			this.military[m].amount = arguments[0].military[m].amount;
		}
		
		for(var i=0;i<arguments[0].cities.length;i++){
			this.cities.push(new City(arguments[0].cities[i], this));
		}
		
	}

}



Nation.prototype.continents = {
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
Nation.prototype.projects = {
	advancedCivilEngineering : {
		built: false,
		cost: {
			uranium: 10000,
			aluminum: 40000,
			steel: 20000,
			munitions: 20000,
			food: 2500000
		}
	},
	armsStockpile : {
		built: false, 
		cost: {
			aluminum: 125,
			steel: 125,
			money: 4000000
		}
	},
	bauxiteworks: {
		built: false, 
		cost: {
			steel: 750,
			gasoline: 1500,
			money: 5000000
		}
	},
	civilEngineering: {
		built: false, 
		cost: {
			oil: 1000,
			iron: 1000,
			bauxite: 1000,
			money: 3000000
		}
	},
	cityPlanning : {
		built: false,
		cost: {
			coal: 10000,
			oil: 10000,
			aluminum: 20000,
			munitions: 10000,
			gasoline: 10000,
			food: 1000000
		}
	},
	cia: {
		built: false, 
		cost: {
			steel: 500,
			gasoline: 500,
			money: 5000000
		}
	},
	greenTechnologies : {
		built: false,
		cost: {
			iron: 10000,
			steel: 10000,
			aluminum: 10000,
			food: 250000,
			money: 100000000
		}
	},
	gasolineReserve: {
		built: false, 
		cost: {
			aluminum: 125,
			steel: 125,
			money: 4000000
		}
	},
	tradeCenter: {
		built: false, 
		cost: {
			aluminum: 2500,
			steel: 2500,
			gasoline: 5000,
			money: 4500000
		}
	},
	ironDome: {
		built: false,
		cost: {
			aluminum: 500,
			steel: 1250,
			gasoline: 500,
			money: 6000000
		}
	},
	ironworks: {
		built: false, 
		cost: {
			aluminum: 750,
			steel: 1500,
			money: 5000000
		}
	},
	irrigation: {
		built: false, 
		cost: {
			steel: 500,
			aluminum: 500,
			money: 3000000
		}
	},
	launchPad: {
		built: false, 
		cost: {
			steel: 1000,
			gasoline: 350,
			money: 8000000
		}
	},
	moonLanding : {
		built: false,
		cost: {
			oil: 5000,
			munitions: 5000,
			gasoline: 5000,
			steel: 5000,
			aluminum: 5000,
			uranium: 10000,
			money: 5000000
		}
	},
	nuclearResearch : {
		built: false,
		cost: {
			steel: 1000,
			gasoline: 7500,
			money: 50000000
		}
	},
	pirateEconomy: {
		built: false,
		cost: {
			aluminum: 10000,
			munitions: 10000,
			gasoline: 10000,
			steel: 10000,
			money: 25000000
		}
	},
	propaganda: {
		built: false, 
		cost: {
			aluminum: 1500,
			money: 15000000
		}
	},
	recycling: {
		built: false,
		cost: {
			food: 100000,
			money: 1000000
		}
	},
	spaceProgram : {
		built: false,
		cost: {
			uranium: 20000,
			oil: 20000,
			iron: 10000,
			gasoline: 5000,
			steel: 1000,
			aluminum: 1000,
			money: 40000000
		}
	},
	spySattelite : {
		built: false,
		cost: {
			oil: 10000,
			iron: 10000,
			lead: 10000,
			bauxite: 10000,
			uranium: 10000,
			money: 20000000,
		}
	},
	teleSattelite: {
		built: false,
		cost: {
			uranium: 10000,
			iron: 10000,
			oil: 10000,
			aluminum: 10000,
			money: 300000000
		}
	},
	uraniumEnrichment: {
		built: false, 
		cost: {
			aluminum: 1000,
			gasoline: 1000,
			uranium: 500,
			money: 21000000
		}
	},
	vitalDefense: {
		built: false, 
		cost: {
			steel: 3000,
			gasoline: 5000,
			aluminum: 3000,
			money: 40000000
		}
	}
};

Nation.prototype.update = function(){
	this.cityCount = this.cities.length;
	this.infra = 0;
	this.land = 0;
	this.slots = 0;
	this.slotsUsed = 0;
	this.population = 0;
	this.avgPopulation = 0;
	this.disease = 0;
	this.crime = 0;
	this.pollution = 0;
	this.avgPollution = 0;
	this.powered = true;
	this.commerce = 0;
	this.avgIncome = 0;
	this.infraCost = 0;
	this.nationCost = {
		coal : 0,
		oil: 0,
		uranium: 0,
		lead: 0,
		iron: 0,
		bauxite: 0,
		gasoline: 0,
		munitions: 0,
		steel: 0,
		aluminum: 0,
		food: 0,
		money: 0
	};
	
	this.buildings = (JSON.parse(JSON.stringify(buildings)));
	this.revenue = (JSON.parse(JSON.stringify(revenue)));
	
	this.tempMilitary = {};
	
	for(var m in this.military){
		this.tempMilitary[m] = this.military[m].amount;
	}
	
	this.military = (JSON.parse(JSON.stringify(military)));
	
	for(var i=0;i<this.cities.length;i++){
		var city = this.cities[i];
		
		this.infra += city.infra;
		this.land += city.land;
		this.infraCost += city.infraCost;
		this.population += city.population;
		this.avgPopulation += city.population/this.cityCount;
		this.disease += city.disease/this.cityCount;
		this.crime += city.crime/this.cityCount;
		this.pollution += city.pollution;
		this.avgPollution += city.pollution/this.cityCount;
		this.commerce += city.commerce/this.cityCount;
		this.avgIncome += city.population * city.avgIncome;
		this.slots += city.slots;
		this.slotsUsed += city.slotsUsed;
		
		for(var t in city.revenue){
			for(var r in city.revenue[t]){
				this.revenue[t][r] += city.revenue[t][r];
			}
		}
		
		for(var r in city.cityCost){
			this.nationCost[r] += city.cityCost[r];
		}
		
		for(var m in city.military){
			if(m !== "spies" && m !== "nukes" && m !== "missiles"){
				this.military[m].cap += city.military[m].cap;
				this.military[m].daily += city.military[m].daily;
			}
		}
		
		if(!city.powered){
			this.powered = false;
		}
		
	}
	
	this.avgIncome /= this.population;
	this.projectSlots = Math.ceil(this.infra/5000)
	this.projectsBuilt = 0;
	
	for(var m in this.military){
		this.military[m].amount = this.tempMilitary[m];
		if(this.military[m].amount > 0){
			for(var r in this.military[m].cost){
				var cost = this.military[m].cost[r]*this.military[m].amount;
				this.nationCost[r] += cost;
			}
			if(!this.warStatus){
				for(var r in this.military[m].peaceUpkeep){
					var cost = this.military[m].peaceUpkeep[r]*this.military[m].amount;
					if(this.domesticPolicy === "imperialism") cost *= 0.95;
					this.revenue[r].consumption += cost;
				}
			}
			else if(this.warStatus){
				for(var r in this.military[m].warUpkeep){
					var cost = this.military[m].warUpkeep[r]*this.military[m].amount;
					if(this.domesticPolicy === "imperialism") cost *= 0.95;
					this.revenue[r].consumption += cost;
				}
			}
		}
	}
	for(var p in this.projects){
		if(this.projects[p].built === true){
			this.projectsBuilt++;
			for(var r in this.projects[p].cost){
				var cost = this.projects[p].cost[r];
				if(this.domesticPolicy === "openmarket") cost *= 0.95;
				this.nationCost[r] += cost;
			}
		}
	}
	if(this.projects.cia.built) this.military.spies.cap = 60;
	if(this.projects.propaganda.built){
		this.military.soldiers.daily *= 1.1;
		this.military.tanks.daily *= 1.1;
		this.military.aircraft.daily *= 1.1;
		this.military.ships.daily *= 1.1;
	}
	
	for(var r in this.revenue){
		this.revenue[r].net = this.revenue[r].production - this.revenue[r].consumption;
		if(r != "money"){
			this.revenue[r].net *= (1-this.resourceTaxRate);
		}
		else{
			this.revenue.money.net *= (1-this.monetaryTaxRate);
		}
	}
	
	
	this.score = (this.infra / 40) + ((this.ci - 1) * 50) + (this.military.soldiers.amount * 0.0005) + (this.military.tanks.amount * 0.05) + (this.military.aircraft.amount * 0.5) + (this.military.ships.amount * 2) + (this.military.missiles.amount * 5) + (this.military.nukes.amount * 15) + (this.projectsBuilt * 20);
	
}
Nation.prototype.updateHTML = function(){
	var nation = $("#nationStatus");
	$(nation).find(".infra").html(format(this.infra));
	$(nation).find(".land").html(format(this.land));
	$(nation).find(".cities").html(format(this.cityCount));
	$(nation).find(".infraCost").html(format(this.infraCost) + "<img src='images/money.png'>");
	$(nation).find(".improve").html(this.slotsUsed + "/" + this.slots + " slots");
	$(nation).find(".score").html(format(this.score));
	$(nation).find(".population").html(format(this.population)+ " people");
	$(nation).find(".avgPopulation").html(format(this.avgPopulation) + " people");
	$(nation).find(".disease").html(format(this.disease) +"%");
	$(nation).find(".crime").html(format(this.crime) +"%");
	$(nation).find(".pollution").html(this.pollution);
	$(nation).find(".avgPollution").html(format(this.avgPollution) + "%");
	$(nation).find(".avgCommerce").html(format(this.commerce) + "%");
	$(nation).find(".avgIncome").html(format(this.avgIncome) + "<img src='images/money.png'>");
	
	$(nation).find(".grossRevenue").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.revenue.coal.production) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.revenue.oil.production) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.revenue.uranium.production) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.revenue.lead.production) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.revenue.iron.production) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.revenue.bauxite.production) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.revenue.gasoline.production) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.revenue.munitions.production) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.revenue.steel.production) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.revenue.aluminum.production) +'&nbsp</div><div class="col-sm-3 food">' + format(this.revenue.food.production) +'&nbsp</div><div class="col-sm-3 money">' + format(this.revenue.money.production) +'&nbsp</div></div></div>');

	$(nation).find(".netRevenue").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.revenue.coal.net) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.revenue.oil.net) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.revenue.uranium.net) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.revenue.lead.net) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.revenue.iron.net) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.revenue.bauxite.net) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.revenue.gasoline.net) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.revenue.munitions.net) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.revenue.steel.net) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.revenue.aluminum.net) +'&nbsp</div><div class="col-sm-3 food">' + format(this.revenue.food.net) +'&nbsp</div><div class="col-sm-3 money">' + format(this.revenue.money.net) +'&nbsp</div></div></div>');
	
	$(nation).find(".expenditures").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.revenue.coal.consumption) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.revenue.oil.consumption) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.revenue.uranium.consumption) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.revenue.lead.consumption) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.revenue.iron.consumption) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.revenue.bauxite.consumption) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.revenue.gasoline.consumption) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.revenue.munitions.consumption) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.revenue.steel.consumption) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.revenue.aluminum.consumption) +'&nbsp</div><div class="col-sm-3 food">' + format(this.revenue.food.consumption) +'&nbsp</div><div class="col-sm-3 money">' + format(this.revenue.money.consumption) +'&nbsp</div></div></div>');
	
	$(nation).find(".nationCost").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.nationCost.coal) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.nationCost.oil) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.nationCost.uranium) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.nationCost.lead) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.nationCost.iron) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.nationCost.bauxite) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.nationCost.gasoline) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.nationCost.munitions) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.nationCost.steel) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.nationCost.aluminum) +'&nbsp</div><div class="col-sm-3 food">' + format(this.nationCost.food) +'&nbsp</div><div class="col-sm-3 money">' + format(this.nationCost.money) +'&nbsp</div></div></div>');
	
	$(nation).find(".nationCost .money").css("font-size", (1 - ($(nation).find(".nationCost .money").text().trim().length-5)/100) + "em");
	
	$("#projects").find(".section-heading h4").text("Constructed Projects "  + "("  + this.projectsBuilt + "/" + this.projectSlots + ")");
	
	for(var p in this.projects){
		var proj = this.projects[p];
		var check = $("#projects").find('input[name="' +  p + '"]');
		if(proj.built && $(check).attr("checked") === undefined){
			$(check).attr("checked", "")
		}
		else if(!proj.built && $(check).attr("checked") !== undefined){
			$(check).removeAttr("checked");
		}
	}
	
	for(var m in this.military){
		var unit = this.military[m]
		$("#" + m).find(".row").eq(1).find("div.col-sm-3").eq(0).text( format(unit.daily) + " " + m);
		$("#" + m).find(".row").eq(1).find("div.col-sm-3").eq(1).text( format(unit.cap/unit.daily) + " days");
		$("#" + m).find(".row").eq(1).find("div.col-sm-3").eq(2).find("input").attr("max", unit.cap);
		$("#" + m).find(".row").eq(1).find("div.col-sm-3").eq(3).text( format(unit.cap) + " " + m);
		
		$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(0).text("");
		for(var r in unit.cost){
			$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(0).append( format(unit.cost[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(1).text("");
		for(var r in unit.peaceUpkeep){
			$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(1).append( format(unit.peaceUpkeep[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(2).text("");
		for(var r in unit.warUpkeep){
			$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(2).append(format(unit.warUpkeep[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(3).text("");
		for(var r in unit.combatCost){
			$("#" + m).find(".row").eq(3).find("div.col-sm-3").eq(3).append(format(unit.combatCost[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		
		
		
		$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(0).text("");
		for(var r in unit.cost){
			$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(0).append( format(unit.amount * unit.cost[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(1).text("");
		for(var r in unit.peaceUpkeep){
			$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(1).append( format(unit.amount * unit.peaceUpkeep[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(2).text("");
		for(var r in unit.warUpkeep){
			$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(2).append(format(unit.amount * unit.warUpkeep[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
		
		$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(3).text("");
		for(var r in unit.combatCost){
			$("#" + m).find(".row").eq(5).find("div.col-sm-3").eq(3).append(format(unit.amount * unit.combatCost[r]) + '&nbsp; <img src="images/' + r + '.png"> ' );
		}
	}
	$(".unit div.col-sm-3 img:nth-child(2)").after("<br>")
}
Nation.prototype.createCity = function(){
	this.cities.push(new City(this));
}
/***City***/
var City = function(){
	this.buildings = (JSON.parse(JSON.stringify(buildings)));

	this.revenue = (JSON.parse(JSON.stringify(revenue)));

	this.military = (JSON.parse(JSON.stringify(military)));
	//Normal case
	if(arguments[0] instanceof Nation){
		this.id = nation.cities.length;
		this.name = "City " + (nation.cities.length + 1);
		this.infra = 100;
		this.land = 100;
		this.age = 0;
		this.nation = nation;
	}
	//Loading case
	else if(arguments[0] !== undefined){
		this.id = arguments[0].id;
		this.name = arguments[0].name;
		this.infra = arguments[0].infra;
		this.land = arguments[0].land;
		this.age = arguments[0].age;
		
		for(var b in arguments[0].buildings){
			this.buildings[b].amount = arguments[0].buildings[b];
		}
		
		this.nation = arguments[1];
	}
	
};

City.prototype.constructHTML = function(){
	var element = $('<div></div>').attr({"id": this.id, "class" : "section city"}); 
	
	$(element).append($("<div></div>").attr("class", "section-heading"))
	.append($("<div></div>").attr("class", "section-body"))
	.append($("<div></div>").attr("class", "section-footer"));
	
	$(element).find(".section-heading").append('<h4><input name="cityName" type="text" value="' + this.name + '"></h4><span class="minimize"><span class="glyphicon glyphicon-minus"></span></span>'); 
	
	$(element).find(".section-footer").append('<button class="clone">CLONE</button><button class="delete">DELETE</button>');
	
	$(element).find(".section-body").append('<div class="general"><div class="container-fluid"></div></div><div class="improvements"><div><h2>Improvements</h1></div></div>');

	$(element).find(".general .container-fluid").append('<div class="row"><div class="col-sm-3 header">Infrastructure</div><div class="col-sm-3 input infra"><input name="infra" type="number" min=100 step=50 value="' + this.infra + '"> </div><div class="col-sm-3 header">Land</div><div class="col-sm-3 input land"><input name="land" type="number" min=100 step=50 value="' + this.land + '"> </div></div><div class="row"><div class="col-sm-3 header">Age</div><div class="col-sm-3 input age"><input name="age" type="number" min=0 step=1 value="' + this.age + '"> days </div><div class="col-sm-3 header">Infrastructure & Land Cost</div><div class="col-sm-3 infraCost">  </div></div><div class="row"><div class="col-sm-3 header">Improvements</div><div class="col-sm-3 improve">Plhdr </div><div class="col-sm-3 header">Power Sufficiency</div><div class="col-sm-3 power">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Population</div><div class="col-sm-3 population">Plhdr </div><div class="col-sm-3 header">Population Density</div><div class="col-sm-3 populationDensity">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Disease</div><div class="col-sm-3 disease">Plhdr </div><div class="col-sm-3 header">Crime</div><div class="col-sm-3 crime">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Pollution</div><div class="col-sm-3 pollution">Plhdr </div><div class="col-sm-3 header">Disease From Pollution</div><div class="col-sm-3 pollutionEffect">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Commerce</div><div class="col-sm-3 commerce">Plhdr </div><div class="col-sm-3 header">Average Income</div><div class="col-sm-3 avgIncome">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Gross Revenue</div><div class="col-sm-3 ns grossRevenue"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div><div class="col-sm-3 header">Net Revenue</div><div class="col-sm-3 ns netRevenue"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div></div><div class="row"><div class="col-sm-3 header">Expenditures</div><div class="col-sm-3 ns expenditures"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div><div class="col-sm-3 header">City Cost</div><div class="col-sm-3 ns cityCost"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div></div>');
	
	$(element).find(".improvements").append('<table><thead><tr><th>Power</th><th>Resources</th><th>Manufacturing</th><th>Civil</th><th>Commerce</th><th>Military</th></tr></thead><tbody><tr><td class="coalPlant">Coal Plant<input type="number" name="coalPlant" min=0 step=1 value=' + this.buildings.coalPlant.amount + '></td><td class="'+ this.nation.continent.buildingsAllowed[0].key + '">' +this.nation.continent.buildingsAllowed[0].name + '<input type="number" name="' + this.nation.continent.buildingsAllowed[0].key + '" max='+ this.nation.continent.buildingsAllowed[0].cap + ' min=0 step=1 value="' + this.buildings[this.nation.continent.buildingsAllowed[0].key].amount + '"></td><td class="oilRefinery">Oil Refinery<input type="number" name="oilRefinery" max='+ this.buildings.oilRefinery.cap + ' min=0 step=1 value="' + this.buildings.oilRefinery.amount + '"></td><td class="police">Police Station<input type="number" name="police" max='+ this.buildings.police.cap + ' min=0 step=1 value="' + this.buildings.police.amount + '"></td><td class="market">Market<input type="number" name="market" max='+ this.buildings.market.cap + ' min=0 step=1 value="' + this.buildings.market.amount + '"><td class="barracks">Barracks<input type="number" name="barracks" max=5 min=0 step=1 value="' + this.buildings.barracks.amount + '"></td></tr><tr><td class="oilPlant">Oil Plant<input type="number" name="oilPlant" min=0 step=1 value="' + this.buildings.oilPlant.amount + '"></td><td class="'+ this.nation.continent.buildingsAllowed[1].key + '">' + this.nation.continent.buildingsAllowed[1].name + '<input type="number" name="' + this.nation.continent.buildingsAllowed[1].key + '" max='+ this.nation.continent.buildingsAllowed[1].cap + ' min=0 step=1 value="' + this.buildings[this.nation.continent.buildingsAllowed[1].key].amount + '"></td><td class="steelMill">Steel Mill<input type="number" name="steelMill" max=' + this.buildings.steelMill.cap + ' min=0 step=1 value="' + this.buildings.steelMill.amount + '"></td><td class="hospital">Hospital<input type="number" name="hospital" max=' + this.buildings.hospital.cap + ' min=0 step=1 value="' + this.buildings.hospital.amount + '"></td><td class="bank">Bank<input type="number" name="bank" max=' + this.buildings.bank.cap + ' min=0 step=1 value="' + this.buildings.bank.amount + '"></td><td class="factory">Factory<input type="number" name="factory" max=' + this.buildings.factory.cap + ' min=0 step=1 value="' + this.buildings.factory.amount + '"></td></tr><tr><td class="nuclearPlant">Nuclear Plant<input type="number" name="nuclearPlant" min=0 step=1 value="' + this.buildings.nuclearPlant.amount + '"></td><td class="'+ this.nation.continent.buildingsAllowed[2].key + '">' + this.nation.continent.buildingsAllowed[2].name + '<input type="number" name="' + this.nation.continent.buildingsAllowed[2].key + '" max='+ this.nation.continent.buildingsAllowed[2].cap + ' min=0 step=1 value="' + this.buildings[this.nation.continent.buildingsAllowed[2].key].amount + '"></td><td class="aluminumRefinery">Aluminum Refinery<input type="number" name="aluminumRefinery" max='+ this.buildings.aluminumRefinery.cap + ' min=0 step=1 value="' + this.buildings.aluminumRefinery.amount + '"></td><td class="recycling">Recycling Center<input type="number" name="recycling" max='+ this.buildings.recycling.cap + ' min=0 step=1 value="' + this.buildings.recycling.amount + '"></td><td class="mall">Mall<input type="number" name="mall" max='+ this.buildings.mall.cap + ' min=0 step=1 value="' + this.buildings.mall.amount + '"></td><td class="airBase">Air Force Base<input type="number" name="airBase" max='+ this.buildings.airBase.cap + ' min=0 step=1 value="' + this.buildings.airBase.amount + '"></td></tr><tr><td class="windPlant">Wind Plant<input type="number" name="windPlant" min=' + this.buildings.windPlant.amount + ' step=1 value="0"></td><td class="farm">Farm<input type="number" name="farm" max='+ this.buildings.farm.cap + ' min=0 step=1 value="' + this.buildings.farm.amount + '"></td><td class="munitionsFactory">Munitions Factory<input type="number" name="munitionsFactory" max='+ this.buildings.munitionsFactory.cap + ' min=0 step=1 value="' + this.buildings.munitionsFactory.amount + '"></td><td class="subway">Subway<input type="number" name="subway" max='+ this.buildings.subway.cap + ' min=0 step=1 value="' + this.buildings.subway.amount + '"></td><td class="stadium">Stadium<input type="number" name="stadium" max='+ this.buildings.stadium.cap + ' min=0 step=1 value="' + this.buildings.stadium.amount + '"></td><td class="drydock">Drydock<input type="number" name="drydock" max='+ this.buildings.drydock.cap + ' min=0 step=1 value="' + this.buildings.drydock.amount + '"></td></tr></tbody></table>')
	
	return element;
};
City.prototype.updateHTML = function(){
	var city = $("#manage-cities").find("#" + this.id);
	$(city).find(".infraCost").html(format(this.infraCost) + "<img src='images/money.png'>");
	$(city).find(".improve").html(this.slotsUsed + "/" + this.slots + " slots");
	$(city).find(".power").html(this.powered + " (" + format(this.powerSupply) + " infrastructure)");
	$(city).find(".population").html(format(this.population)+ " people");
	$(city).find(".populationDensity").html(format(this.populationDensity) + " people/sq. mi");
	$(city).find(".disease").html(format(this.disease) +"%");
	$(city).find(".crime").html(format(this.crime) +"%");
	$(city).find(".pollution").html(this.pollution);
	$(city).find(".pollutionEffect").html(format(this.pollutionEffect) + "%");
	$(city).find(".commerce").html(format(this.commerce) + "%");
	$(city).find(".avgIncome").html(format(this.avgIncome) + "<img src='images/money.png'>");
	
	$(city).find(".grossRevenue").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.revenue.coal.production) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.revenue.oil.production) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.revenue.uranium.production) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.revenue.lead.production) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.revenue.iron.production) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.revenue.bauxite.production) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.revenue.gasoline.production) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.revenue.munitions.production) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.revenue.steel.production) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.revenue.aluminum.production) +'&nbsp</div><div class="col-sm-3 food">' + format(this.revenue.food.production) +'&nbsp</div><div class="col-sm-3 money">' + format(this.revenue.money.production) +'&nbsp</div></div></div>');

	$(city).find(".netRevenue").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.revenue.coal.net) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.revenue.oil.net) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.revenue.uranium.net) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.revenue.lead.net) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.revenue.iron.net) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.revenue.bauxite.net) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.revenue.gasoline.net) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.revenue.munitions.net) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.revenue.steel.net) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.revenue.aluminum.net) +'&nbsp</div><div class="col-sm-3 food">' + format(this.revenue.food.net) +'&nbsp</div><div class="col-sm-3 money">' + format(this.revenue.money.net) +'&nbsp</div></div></div>');
	
	$(city).find(".expenditures").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.revenue.coal.consumption) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.revenue.oil.consumption) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.revenue.uranium.consumption) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.revenue.lead.consumption) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.revenue.iron.consumption) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.revenue.bauxite.consumption) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.revenue.gasoline.consumption) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.revenue.munitions.consumption) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.revenue.steel.consumption) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.revenue.aluminum.consumption) +'&nbsp</div><div class="col-sm-3 food">' + format(this.revenue.food.consumption) +'&nbsp</div><div class="col-sm-3 money">' + format(this.revenue.money.consumption) +'&nbsp</div></div></div>');
	
	$(city).find(".cityCost").html('<div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">' + format(this.cityCost.coal) +'&nbsp</div><div class="col-sm-3 oil">' + format(this.cityCost.oil) +'&nbsp</div><div class="col-sm-3 uranium">' + format(this.cityCost.uranium) +'&nbsp</div><div class="col-sm-3 lead">' + format(this.cityCost.lead) +'&nbsp</div></div><div class="row"><div class="col-sm-3 iron">' + format(this.cityCost.iron) +'&nbsp</div><div class="col-sm-3 bauxite">' + format(this.cityCost.bauxite) +'&nbsp</div><div class="col-sm-3 gasoline">' + format(this.cityCost.gasoline) +'&nbsp</div><div class="col-sm-3 munitions">' + format(this.cityCost.munitions) +'&nbsp</div></div><div class="row"><div class="col-sm-3 steel">' + format(this.cityCost.steel) +'&nbsp</div><div class="col-sm-3 aluminum">' + format(this.cityCost.aluminum) +'&nbsp</div><div class="col-sm-3 food">' + format(this.cityCost.food) +'&nbsp</div><div class="col-sm-3 money">' + format(this.cityCost.money) +'&nbsp</div></div></div>');
	
	$(city).find(".cityCost .money").css("font-size", (1 - ($(city).find(".cityCost .money").text().trim().length-5)/100) + "em");
}
City.prototype.update = function(){
	//Reset
	this.slots = Math.floor(this.infra / 50);
	this.slotsUsed = 0;
	this.population = this.infra * 100;
	this.populationDensity = this.population / this.land;
	this.disease = 0;
	this.crime = 0;
	this.pollution = 0;
	this.pollutionEffect = 0;
	this.powered = false;
	this.powerSupply = 0;
	this.commerce = 0;
	this.avgIncome = 0;
	this.infraCost = 0;
	this.cityCost = {
		coal : 0,
		oil: 0,
		uranium: 0,
		lead: 0,
		iron: 0,
		bauxite: 0,
		gasoline: 0,
		munitions: 0,
		steel: 0,
		aluminum: 0,
		food: 0,
		money: 0
	};
	this.revenue = (JSON.parse(JSON.stringify(revenue)));
	this.military = (JSON.parse(JSON.stringify(military)));
	
	//Update Buildings
	for(var building in this.buildings){
		var b = this.buildings[building];
		
		if(b.powerSupply) {
			this.powerSupply += b.powerSupply*b.amount;
		}
		
		if(b.powerInterval && b.amount > 0) {
			for(var r in b.consumption){
				if(r !== "money") this.revenue[r].consumption += b.consumption[r] * ((1+this.infra/(b.powerInterval+1)) >> 0);
			}
			this.revenue.money.consumption += b.consumption.money * b.amount;
		}
		else{
			for(var r in b.consumption){
				this.revenue[r].consumption += b.consumption[r] * b.amount; 
			}
			for(var r in b.production){
				this.revenue[r].production += b.production[r] * b.amount; 
				//new bonuses
				if(b.key == "oilWell" || b.key == "coalMine" || b.key=="bauxiteMine" || b.key=="uraniumMine" || b.key == "leadMine" && b.amount > 0){
					this.revenue[r].production *= 1 + (.05555 * (b.amount-1));
				}
				else if(b.key == "farm" && b.amount > 0){
					this.revenue[r].production *= 1 + (.0263 * (b.amount-1));
				}
				else if(b.key == "oilRefiner" || b.key == "steelMill" || b.key=="munitionsFactory" || b.key == "aluminumRefinery"){
					this.revenue[r].production *= 1 + (.125 * (b.amount-1));
				}
			}
			if(this.continent == "antartica" && r == "food"){
				this.revenue[r].production /= 2;
			}
		}
		
		for(var r in b.cost){
			this.cityCost[r] += b.cost[r]*b.amount;
		}
		
		if(b.commerce) this.commerce += b.commerce * b.amount;
		if(b.pollution) this.pollution += b.pollution * b.amount;
		if(b.disease) this.disease += b.disease * b.amount;
		if(b.crime) this.crime += b.crime * b.amount;
		if(b.military) {
			for(var m in b.military){
				this.military[m].cap += b.military[m]*b.amount;
				this.military[m].daily += b.recruitment*b.amount;
			}
		}
		this.slotsUsed += b.amount;
	}
	
	//Account for projects
	if(this.nation.projects.armsStockpile.built) {
		this.revenue.munitions.production *= 1.34; 
		this.revenue.lead.consumption *= 1.34
	}
	
	if(this.nation.projects.bauxiteworks.built) {
		this.revenue.aluminum.production *= 1.36;
		this.revenue.bauxite.consumption *= 1.36;
	}
	
	if(this.nation.projects.gasolineReserve.built) {
		this.revenue.gasoline.production *= 2;
		this.revenue.oil.consumption *= 2;
	}
	
	if(this.nation.projects.uraniumEnrichment.built){
		this.revenue.uranium.production *= 2;
	}
	
	if(this.nation.projects.ironworks.built){
		this.revenue.steel.production *= 1.36;
		this.revenue.iron.consumption *= 1.36;
		this.revenue.coal.consumption *= 1.36;
	}
	
	if(this.nation.projects.tradeCenter.built){
		if(this.commerce > 115) this.commerce = 115;
	}
	else{
		if(this.commerce > 100) this.commerce = 100;
	}
	
	if(this.nation.projects.irrigation.built) {
		this.revenue.food.production = this.buildings.farm.amount * 12 * this.land/250;
	}
	else{
		this.revenue.food.production = this.buildings.farm.amount * this.land/25;
	}
	
	if(this.powerSupply >= this.infra){
		this.powered = true;
	}
	
	this.avgIncome = 0.725 * ((this.commerce / 50)+1);
	this.population = this.infra * 100;
	this.populationDensity = this.population / this.land
	this.crime += (Math.pow((103 - this.commerce), 2) + this.population) / 111111;
	this.crime = ((this.crime > 100 || this.crime < 0) ? (Math.round(this.crime / 100) * 100) : (this.crime));
	this.pollutionEffect = (this.pollution * 0.05);
	if(this.pollutionEffect < 0){
		this.pollutionEffect = 0;
	}
	if(this.pollution < 0){
		this.pollution = 0;
	}
	this.disease += (((Math.pow(this.populationDensity, 2) * 0.01) - 25) / 100) + (this.population / 100000) + this.pollutionEffect;
	this.disease = ((this.disease > 100 || this.disease < 0) ? (Math.round(this.disease / 100) * 100) : (this.disease));
	if (this.disease > 100) {
		this.disease = 100;
	}
	this.population = Math.round((this.population - (this.disease * this.infra) - (10 * this.crime * this.infra) - 25)*(1 + Math.log(this.age)/15));
	if (this.population < 0) {
		this.population = 0;
	}
	this.populationDensity = this.population / this.land;
	this.revenue.food.consumption += this.population / 1000;
	this.revenue.money.production += this.avgIncome * this.population;// * (1 + (main.nation.inputData.colorBonus/100));
	
	for(var i=~~(this.infra/100); i > 0; i--){ 
		this.infraCost += 100 * ((Math.pow(((100*i) - 10 ), 1.95)/100) + 300); 
	}
	
	this.infraCost += (this.infra%100) * ((Math.pow((Math.floor(this.infra/100)*100) - 10 , 1.95)/100) + 300);
	
	for(var i=~~(this.land/500); i > 0; i--){ 
		this.infraCost += 500 * ((Math.pow(((500*i) - 20 ), 1.95)/500) + 50); 
	}
	this.infraCost += (this.land%500) *((Math.pow((Math.floor(this.land/500)*500)- 20, 2)/500) + 50);
	
	if(this.id !== 0){
		var cost = (50000 * Math.pow((this.id-2), 3)) + (150000 * (this.id-1)) + 75000;
		if(this.nation.projects.civilEngineering.built && this.nation.domesticPolicy === "manifestDestiny"){
			cost *= 0.90;
		}
		else if(this.nation.projects.civilEngineering.built){
			cost *= 0.95;
		}
		else if(this.nation.domesticPolicy === "manifestDestiny"){
			cost *= 0.95;
		}
		this.cityCost.money += cost;
	}
	if(this.nation.domesticPolicy === "urbanization") this.infraCost *= 0.95;
	this.cityCost.money += this.infraCost
	
	//Policies & More Projects & More
	if(this.nation.domesticPolicy === "openMarkets") this.revenue.money.production *= 1.01;
	
	this.revenue.money.production *= (1+this.nation.incomeBonus);
	
	
	
	for(var r in this.revenue){
		if(this.nation.starvationStatus) this.revenue[r].production *= 2/3;
		this.revenue[r].net = this.revenue[r].production - this.revenue[r].consumption;

		if(r != "money"){
			this.revenue[r].net *= (1-this.nation.resourceTaxRate);
		}
		else{
			this.revenue.money.net *= (1-this.nation.monetaryTaxRate);
		}	
	}
	
};
City.prototype.handleBuildingChange =function(b, diff){
	console.log(b);
	b.amount += diff;
	this.slotsUsed += diff;
}

var Data = function(obj){
	this.nation = obj;
	this.data = {
		age : {
			name: "Age",
			all: 0,
			list: [],
		},
		infra : {
			name: "Infrastructure",
			all: 0,
			list: [],
		},
		population: {
			name: "Population",
			all: 0,
			list: [],
		},
		disease: {
			name: "Disease",
			all: 0,
			list: [],
		},
		crime : {
			name: "Crime",
			all: 0,
			list: [],
		},
		commerce: {
			name: "Commerce",
			all: 0,
			list: [],
		},
		powered : {
			name: "Powered",
			all: 0,
			list: [],
		},
		coalPlant : {
			name: "Coal Plant",
			all: 0,
			list: [],
		},
		oilPlant : {
			name: "Oil Plant",
			all: 0,
			list: [],
		},
	}
	for(var i=0;i<obj.cities.length;i++){
		
	}
};
/***************
***FUNCTIONS****
***************/
var save = function(obj){
	//console.log("TEST");
	if(!(obj instanceof Nation)){
		return;
	}
	
	var data = {
		cities: [],
		domesticPolicy : obj.domesticPolicy,
		warPolicy : obj.warPolicy,
		monetaryTaxRate : obj.monetaryTaxRate,
		resourceTaxRate: obj.resourceTaxRate,
		warStatus: obj.warStatus,
		starvationStatus: obj.starvationStatus,
		incomeBonus: obj.incomeBonus,
		continent: obj.continent.key,
		builtProjects: [],
		military: {}
	};
	
	for(var i=0;i<obj.cities.length;i++){
		var city = {};
		var ref = obj.cities[i];
		city.id = ref.id;
		city.name = ref.name;
		city.infra = ref.infra;
		city.land = ref.land;
		city.age = ref.age;
		city.buildings = {};
		
		for(var b in ref.buildings){
			city.buildings[b] = ref.buildings[b].amount;
		}
		
		data.cities.push(city);
	}
	
	for(var p in obj.projects){
		if(obj.projects[p].built){
			data.builtProjects.push(p);
		}
	}
	
	for(var m in military){
		data.military[m] = obj.military[m].amount;
	}
	
	localStorage.setItem("data", btoa(JSON.stringify(data)));
};
var load = function(){
	var data = localStorage.getItem("data");
	if(data === null){
		return undefined;
	}
	else{
		try {
			JSON.parse(atob(data));
		}
		catch (err) {
			data = undefined;
		}
		finally {
			if(data !== undefined) return  JSON.parse(atob(data));
		}
	}
}
var init = function(){
	nation = new Nation(load());
	if(nation === undefined || Object.keys(nation).length === 0) {
		nation = new Nation();
		nation.createCity();
		save(nation);
	}
	
	for(var i=0;i<nation.cities.length;i++){
		$("#manage-cities").append(nation.cities[i].constructHTML());
	}
	
	$("#config").find('[name="allianceTax"]').val((nation.monetaryTaxRate * 100));
	$("#config").find('[name="incomeBonus"]').val((nation.incomeBonus * 100));
	$("#config").find('[name="continent"]').val(nation.continent.name);
	$("#config").find('[name="domesticPolicy"]').val(nation.domesticPolicy);
	$("#config").find('[name="warPolicy"]').val(nation.warPolicy);
}
var format = function(n){
	if(isNaN(n)){
		return 0;
	}
	return (Math.round(n*100)/100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
var update = function(){
	for(var i=nation.cities.length-1;i>=0;i--){
		nation.cities[i].update();
		nation.cities[i].updateHTML();
	}
	
	nation.update();
	nation.updateHTML();
	
	counter++;
	if(counter%10 === 0){
		save(nation);
	}
}
var throttleEvent = function(func, interval){
	var last = 0;
	return function(){
		var time = Date.now();
		if(last + interval < time){
			last = time;
			return func.apply(this, arguments)
		}
	};
}
/***************
*****EVENTS*****
***************/

$("body").on("click", "span.minimize", function(){
	$(this).parents().eq(1).find(".section-body").toggle();
	if($(this).html() == '<span class="glyphicon glyphicon-plus"></span>'){
		$(this).html('<span class="glyphicon glyphicon-minus"></span>');
	}
	else{
		$(this).html('<span class="glyphicon glyphicon-plus"></span>');
	}
});
$("button.delete").on("click", function(){
	var id = $(this).parents().eq(1).attr("id");
	console.log(id);
});
$("#manage-cities").on("change", ".city .general input", function(){
	var city = nation.cities[$(this).parents().eq(5).attr("id"
	)];
	var type = $(this).attr("name");
	var val;
	if(type !== "age"){
		val = 50 * ~~(Number($(this).val())/50);
	}
	else{
		val = ~~(Number($(this).val()));
	}
	
	if(val < Number($(this).attr("min"))){
		val = Number($(this).attr("min"));
	}
	city[type] = val;
	$(this).val(val);
});
$("#manage-cities").on("change", ".city .section-heading h4 input", function(){
	var city = nation.cities[$(".city .section-heading input").parents().eq(2).attr("id")];
	city.name = $(this).val();
});
$("#manage-cities").on("change", ".city .improvements input", function(e){
	e.stopImmediatePropagation();
	var city = nation.cities[$(this).parents().eq(6).attr("id"
	)];
	console.log(city);
	var building = city.buildings[$(this).attr("name")];
	var val = ~~Number($(this).val());
	if(val < 0){
		val = 0;
	}
	if(val > building.cap){
		val = building.cap;
	}
	if(city.slotsUsed + val - building.amount > city.slots ){
		city.handleBuildingChange(building, city.slots - city.slotsUsed);
		$(this).val(building.amount);
	}
	else{
		city.handleBuildingChange(building, val - building.amount);
		$(this).val(val);
	}
});
$("#manage-cities").on("click", ".delete", function(){
	if(nation.cities.length === 1){
		return;
	}
	var city = nation.cities[$(".city .section-heading input").parents().eq(2).attr("id")];
	nation.cities.splice(city.id, 1);
	$("#" + city.id).remove();
	for(var i=city.id; i<nation.cities.length;i++){
		nation.cities[i].id--;
	}
});

$("#manage-cities").on("click", ".clone", function(){
	var city = nation.cities[$(".city .section-heading input").parents().eq(2).attr("id")];
	var newID = nation.cities.length;
	nation.cities[newID] = jQuery.extend(true, {}, city);
	nation.cities[newID].name = "City " + (newID+1);
	nation.cities[newID].id = newID;
	$("#manage-cities").append(nation.cities[newID].constructHTML());
});

$("#manage-military").on("change", "input", function(){
	var unit = nation.military[$(this).attr("name")];
	var val = ~~($(this).val());
	
	if(val >= unit.cap && unit.cap !== -1) val = unit.cap;
	if(val < 0) val = 0;
	
	unit.amount = val;
	$(this).val(val);
});

$("#config").on("change", "select", function(){
	var name = $(this).attr("name");
	var val = $(this).val();
	val = val.split(" ");
	val[0] = val[0].toLowerCase();
	val = val.join("");
	switch(name){
		case "continent":
			for(var c in nation.cities){
				for(var b in nation.continent.buildingsAllowed){
					var building = nation.continent.buildingsAllowed[b].key;
					
					nation.cities[c].buildings[building].amount = 0;
				}
			}
			nation.continent = nation.continents[val];
			for(var i=0;i<nation.cities.length;i++){
				$("#" + nation.cities[i].id).find(".improvements tbody tr").each(function(index){
					var cell = $(this).find("td").eq(1);
					var input = $(cell).find("input");
					$(cell).attr("class", nation.continent.buildingsAllowed[index].key)
					$(cell).text(nation.continent.buildingsAllowed[index].name);
					$(cell).append(input);
					$(input).attr("name", nation.continent.buildingsAllowed[index].key);
					$(input).attr("max", nation.continent.buildingsAllowed[index].cap);
					$(input).val(0);
				});
			}
			break;
		case "domesticPolicy" :
			nation.domesticPolicy = val;
			break;
		case "warPolicy" : 
			nation.warPolicy = val;
			break;
		default:
			break;
	}
});

$("#projects").on("change", "input", function(){
	var val = $(this).attr("checked");
	var name = $(this).attr("name");
	if(val){
		nation.projects[name].built = false;
	}
	else{
		nation.projects[name].built = true;
	}
});
$("#config").on("change", "input[name='allianceMonetaryTax']", function(){
	var val = Number($(this).val())/100;
	nation.monetaryTaxRate = val;
});
$("#config").on("change", "input[name='allianceResourceTax']", function(){
	var val = Number($(this).val())/100;
	nation.resourceTaxRate = val;
});
$("#config").on("change", "input[name='incomeBonus']", function(){
	var val = Number($(this).val())/100;
	nation.incomeBonus = val;
});
/***************
*****START*****
***************/

var nation;
init();
update();
var updateInterval = setInterval(update,500);
//var saveInterval = setInterval(save(nation), 5000);
