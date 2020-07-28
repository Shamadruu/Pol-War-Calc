	//(function(){
	/***************
	****GLOBAL*****
	***************/
	var counter = 0;
	var api_key = "";
	var nation_import_id = "";
	
	/***************
	****OBJECTS*****
	***************/

	/***NATION***/
	var Nation = function(){
		//set some defaults
		this.timestamp = Date.now();
		this.buildings = (JSON.parse(JSON.stringify(buildings)));

		this.revenue = (JSON.parse(JSON.stringify(revenue)));
		this.projects = (JSON.parse(JSON.stringify(projects)));
		
		
		this.military = (JSON.parse(JSON.stringify(military)));
		this.continents = (JSON.parse(JSON.stringify(continents)));
		
		this.nationID = "";
		this.color = "gray";
		this.colorBonus = 0;
		this.data = {};
		
		if(arguments.length === 0 || arguments[0] == undefined){
			this.cities = [];
			this.continent = this.continents["northAmerica"];
			this.domesticPolicy = "manifestDestiny";
			this.warPolicy = "attrition";
			this.warStatus = false;
			this.starvationStatus = false;
			this.monetaryTaxRate = 0.0;
			this.resourceTaxRate = 0.0;
			this.incomeBonus = 0.0;
			
		}
		else if(arguments[0] !== undefined){
			//this.military = (JSON.parse(JSON.stringify(military)));
			this.continent = continents[arguments[0].continent];
			this.domesticPolicy = arguments[0].domesticPolicy;
			this.warPolicy = arguments[0].warPolicy;
			this.warStatus = arguments[0].warStatus;
			this.starvationStatus = arguments[0].starvationStatus;
			this.monetaryTaxRate = arguments[0].monetaryTaxRate | 0;
			this.resourceTaxRate = arguments[0].resourceTaxRate | 0
			this.incomeBonus = arguments[0].incomeBonus;
			this.cities = [];
			this.projects = arguments[0].projects||projects;
			this.military = arguments[0].military||military;
			this.score = arguments[0].score||0;
			
			for(var i=0;i<arguments[0].cities.length;i++){
				this.cities.push(new City(arguments[0].cities[i], this));
			}
			
		}

	}

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
		if(this.projects.intagncy.built) this.military.spies.cap = 60;
		if(this.projects.propbureau.built){
			this.military.soldiers.daily *= 1.1;
			this.military.tanks.daily *= 1.1;
			this.military.aircraft.daily *= 1.1;
			this.military.ships.daily *= 1.1;
		}
		this.revenue.money.production += ~~this.colorBonus
		for(var r in this.revenue){
			this.revenue[r].net = this.revenue[r].production - this.revenue[r].consumption;
			if(r != "money"){
				this.revenue[r].net *= (1-this.resourceTaxRate);
			}
			else{
				this.revenue.money.net *= (1-this.monetaryTaxRate);
			}
		}
		;
		
		
		//this.score = (this.infra / 40) + ((this.ci - 1) * 50) + (this.military.soldiers.amount * 0.0005) + (this.military.tanks.amount * 0.05) + (this.military.aircraft.amount * 0.5) + (this.military.ships.amount * 2) + (this.military.missiles.amount * 5) + (this.military.nukes.amount * 15) + (this.projectsBuilt * 20);
		
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
		this.cityID = "";
		this.timestamp = Date.now();
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
			
			this.buildings = arguments[0].buildings;
			
			this.nation = arguments[1];
		}
		
	};

	City.prototype.constructHTML = function(){
		var element = $('<div></div>').attr({"id": this.id, "class" : "section city"}); 
		
		$(element).append($("<div></div>").attr("class", "section-heading"))
		.append($("<div></div>").attr("class", "section-body"))
		.append($("<div></div>").attr("class", "section-footer"));
		
		$(element).find(".section-heading").append('<h4><input name="cityName" type="text" value="' + this.name + '"></h4><span class="minimize"><span class="glyphicon glyphicon-minus"></span></span>'); 
		
		$(element).find(".section-footer").append('<button class="import">IMPORT</button><button class="export">EXPORT</button><button class="clone">CLONE</button><button class="delete">DELETE</button>');
		
		$(element).find(".section-body").append('<div class="general"><div class="container-fluid"></div></div><div class="improvements"><div><h2>Improvements</h1></div></div>');

		$(element).find(".general .container-fluid").append('<div class="row"><div class="col-sm-3 header">Infrastructure</div><div class="col-sm-3 input infra"><input name="infra" type="number" min=100 step=50 value="' + this.infra + '"> </div><div class="col-sm-3 header">Land</div><div class="col-sm-3 input land"><input name="land" type="number" min=100 step=50 value="' + this.land + '"> </div></div><div class="row"><div class="col-sm-3 header">Age</div><div class="col-sm-3 input age"><input name="age" type="number" min=0 step=1 value="' + this.age + '"> days </div><div class="col-sm-3 header">Infrastructure & Land Cost</div><div class="col-sm-3 infraCost">  </div></div><div class="row"><div class="col-sm-3 header">Improvements</div><div class="col-sm-3 improve">Plhdr </div><div class="col-sm-3 header">Power Sufficiency</div><div class="col-sm-3 power">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Population</div><div class="col-sm-3 population">Plhdr </div><div class="col-sm-3 header">Population Density</div><div class="col-sm-3 populationDensity">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Disease</div><div class="col-sm-3 disease">Plhdr </div><div class="col-sm-3 header">Crime</div><div class="col-sm-3 crime">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Pop Lost to Disease</div><div class="col-sm-3 popdisease">Plhdr </div><div class="col-sm-3 header">Pop Lost to Crime</div><div class="col-sm-3 popCrime">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Pollution</div><div class="col-sm-3 pollution">Plhdr </div><div class="col-sm-3 header">Disease From Pollution</div><div class="col-sm-3 pollutionEffect">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Commerce</div><div class="col-sm-3 commerce">Plhdr </div><div class="col-sm-3 header">Average Income</div><div class="col-sm-3 avgIncome">Plhdr </div></div><div class="row"><div class="col-sm-3 header">Gross Revenue</div><div class="col-sm-3 ns grossRevenue"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div><div class="col-sm-3 header">Net Revenue</div><div class="col-sm-3 ns netRevenue"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div></div><div class="row"><div class="col-sm-3 header">Expenditures</div><div class="col-sm-3 ns expenditures"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div><div class="col-sm-3 header">City Cost</div><div class="col-sm-3 ns cityCost"><div class="container-fluid resources"><div class="row"><div class="col-sm-3 coal">1,000,000</div><div class="col-sm-3 oil">1,000,000</div><div class="col-sm-3 uranium">1,000,000</div><div class="col-sm-3 lead">1,000,000</div></div><div class="row"><div class="col-sm-3 iron">1,000,000</div><div class="col-sm-3 bauxite">1,000,000</div><div class="col-sm-3 gasoline">1,000,000</div><div class="col-sm-3 munitions">1,000,000</div></div><div class="row"><div class="col-sm-3 steel">1,000,000</div><div class="col-sm-3 aluminum">1,000,000</div><div class="col-sm-3 food">1,000,000</div><div class="col-sm-3 money">1,000,000</div></div></div></div></div>');
		
		$(element).find(".improvements").append('<table><thead><tr><th>Power</th><th>Resources</th><th>Manufacturing</th><th>Civil</th><th>Commerce</th><th>Military</th></tr></thead><tbody><tr><td class="imp_coalpower">Coal Plant<input type="number" name="imp_coalpower" min=0 step=1 value=' + this.buildings.imp_coalpower.amount + '></td><td class="'+ this.nation.continent.buildingsAllowed[0].key + '">' +this.nation.continent.buildingsAllowed[0].name + '<input type="number" name="' + this.nation.continent.buildingsAllowed[0].key + '" max='+ this.nation.continent.buildingsAllowed[0].cap + ' min=0 step=1 value="' + this.buildings[this.nation.continent.buildingsAllowed[0].key].amount + '"></td><td class="imp_gasrefinery">Oil Refinery<input type="number" name="imp_gasrefinery" max='+ this.buildings.imp_gasrefinery.cap + ' min=0 step=1 value="' + this.buildings.imp_gasrefinery.amount + '"></td><td class="imp_policestation">Police Station<input type="number" name="imp_policestation" max='+ this.buildings.imp_policestation.cap + ' min=0 step=1 value="' + this.buildings.imp_policestation.amount + '"></td><td class="imp_supermarket">Market<input type="number" name="imp_supermarket" max='+ this.buildings.imp_supermarket.cap + ' min=0 step=1 value="' + this.buildings.imp_supermarket.amount + '"><td class="imp_barracks">Barracks<input type="number" name="imp_barracks" max=5 min=0 step=1 value="' + this.buildings.imp_barracks.amount + '"></td></tr><tr><td class="imp_oilpower">Oil Plant<input type="number" name="imp_oilpower" min=0 step=1 value="' + this.buildings.imp_oilpower.amount + '"></td><td class="'+ this.nation.continent.buildingsAllowed[1].key + '">' + this.nation.continent.buildingsAllowed[1].name + '<input type="number" name="' + this.nation.continent.buildingsAllowed[1].key + '" max='+ this.nation.continent.buildingsAllowed[1].cap + ' min=0 step=1 value="' + this.buildings[this.nation.continent.buildingsAllowed[1].key].amount + '"></td><td class="imp_steelmill">Steel Mill<input type="number" name="imp_steelmill" max=' + this.buildings.imp_steelmill.cap + ' min=0 step=1 value="' + this.buildings.imp_steelmill.amount + '"></td><td class="imp_hospital">Hospital<input type="number" name="imp_hospital" max=' + this.buildings.imp_hospital.cap + ' min=0 step=1 value="' + this.buildings.imp_hospital.amount + '"></td><td class="imp_bank">Bank<input type="number" name="imp_bank" max=' + this.buildings.imp_bank.cap + ' min=0 step=1 value="' + this.buildings.imp_bank.amount + '"></td><td class="imp_factory">Factory<input type="number" name="imp_factory" max=' + this.buildings.imp_factory.cap + ' min=0 step=1 value="' + this.buildings.imp_factory.amount + '"></td></tr><tr><td class="imp_nuclearpower">Nuclear Plant<input type="number" name="imp_nuclearpower" min=0 step=1 value="' + this.buildings.imp_nuclearpower.amount + '"></td><td class="'+ this.nation.continent.buildingsAllowed[2].key + '">' + this.nation.continent.buildingsAllowed[2].name + '<input type="number" name="' + this.nation.continent.buildingsAllowed[2].key + '" max='+ this.nation.continent.buildingsAllowed[2].cap + ' min=0 step=1 value="' + this.buildings[this.nation.continent.buildingsAllowed[2].key].amount + '"></td><td class="imp_aluminumrefinery">Aluminum Refinery<input type="number" name="imp_aluminumrefinery" max='+ this.buildings.imp_aluminumrefinery.cap + ' min=0 step=1 value="' + this.buildings.imp_aluminumrefinery.amount + '"></td><td class="imp_recyclingcenter">Recycling Center<input type="number" name="imp_recyclingcenter" max='+ this.buildings.imp_recyclingcenter.cap + ' min=0 step=1 value="' + this.buildings.imp_recyclingcenter.amount + '"></td><td class="imp_mall">Mall<input type="number" name="imp_mall" max='+ this.buildings.imp_mall.cap + ' min=0 step=1 value="' + this.buildings.imp_mall.amount + '"></td><td class="imp_hangar">Air Force Base<input type="number" name="imp_hangar" max='+ this.buildings.imp_hangar.cap + ' min=0 step=1 value="' + this.buildings.imp_hangar.amount + '"></td></tr><tr><td class="imp_windpower">Wind Plant<input type="number" name="imp_windpower" min=' + this.buildings.imp_windpower.amount + ' step=1 value="0"></td><td class="imp_farm">Farm<input type="number" name="imp_farm" max='+ this.buildings.imp_farm.cap + ' min=0 step=1 value="' + this.buildings.imp_farm.amount + '"></td><td class="imp_munitionsfactory">Munitions Factory<input type="number" name="imp_munitionsfactory" max='+ this.buildings.imp_munitionsfactory.cap + ' min=0 step=1 value="' + this.buildings.imp_munitionsfactory.amount + '"></td><td class="imp_subway">Subway<input type="number" name="imp_subway" max='+ this.buildings.imp_subway.cap + ' min=0 step=1 value="' + this.buildings.imp_subway.amount + '"></td><td class="imp_stadium">Stadium<input type="number" name="imp_stadium" max='+ this.buildings.imp_stadium.cap + ' min=0 step=1 value="' + this.buildings.imp_stadium.amount + '"></td><td class="imp_drydock">Drydock<input type="number" name="imp_drydock" max='+ this.buildings.imp_drydock.cap + ' min=0 step=1 value="' + this.buildings.imp_drydock.amount + '"></td></tr></tbody></table>')
		
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
		$(city).find(".popDisease").html(format(this.popLostDisease));
		$(city).find(".popCrime").html(format(this.popLostCrime));
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
					if(b.key == "imp_oilwell" || b.key == "imp_coalmine" || b.key=="imp_bauxitemine" || b.key=="imp_uramine" || b.key == "imp_leadmine" && b.amount > 0){
						this.revenue[r].production *= 1 + (.05555 * (b.amount-1));
					}
					else if(b.key == "imp_farm" && b.amount > 0){
						this.revenue[r].production *= 1 + (.0263 * (b.amount-1));
					}
					else if(b.key == "oilRefiner" || b.key == "imp_steelmill" || b.key=="imp_munitionsfactory" || b.key == "imp_aluminumrefinery"){
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
		if(this.nation.projects.armsstockpile.built) {
			this.revenue.munitions.production *= 1.34; 
			this.revenue.lead.consumption *= 1.34
		}
		
		if(this.nation.projects.bauxiteworks.built) {
			this.revenue.aluminum.production *= 1.36;
			this.revenue.bauxite.consumption *= 1.36;
		}
		
		if(this.nation.projects.emgasreserve.built) {
			this.revenue.gasoline.production *= 2;
			this.revenue.oil.consumption *= 2;
		}
		
		if(this.nation.projects.uraniumenrich.built){
			this.revenue.uranium.production *= 2;
		}
		
		if(this.nation.projects.ironworks.built){
			this.revenue.steel.production *= 1.36;
			this.revenue.iron.consumption *= 1.36;
			this.revenue.coal.consumption *= 1.36;
		}
		
		if(this.nation.projects.inttradecenter.built){
			if(this.commerce > 115) this.commerce = 115;
		}
		else{
			if(this.commerce > 100) this.commerce = 100;
		}
		
		if(this.nation.projects.massirrigation.built) {
			this.revenue.food.production = this.buildings.imp_farm.amount * 12 * this.land/250;
		}
		else{
			this.revenue.food.production = this.buildings.imp_farm.amount * this.land/25;
		}
		
		if(this.powerSupply >= this.infra){
			this.powered = true;
		}
		
		this.avgIncome = 0.725 * ((this.commerce / 50)+1);
		this.basePop = this.infra * 100;
		this.populationDensity = this.basePop / this.land
		this.crime += (Math.pow((103 - this.commerce), 2) + this.basePop) / 111111;
		this.crime = ((this.crime > 100 || this.crime < 0) ? (Math.round(this.crime / 100) * 100) : (this.crime));
		this.pollutionEffect = (this.pollution * 0.05);
		if(this.pollutionEffect < 0){
			this.pollutionEffect = 0;
		}
		if(this.pollution < 0){
			this.pollution = 0;
		}
		this.disease += (((Math.pow(this.populationDensity, 2) * 0.01) - 25) / 100) + (this.basePop / 100000) + this.pollutionEffect;
		this.disease = ((this.disease > 100 || this.disease < 0) ? (Math.round(this.disease / 100) * 100) : (this.disease));
		if (this.disease > 100) {
			this.disease = 100;
		}
		this.popLostCrime = (10 * this.crime * this.infra) - 25;
		this.popLostDisease = (this.disease * this.infra);
		this.ageFactor = (1 + Math.log(this.age)/15);
		if(!isFinite(this.ageFactor)){
			this.ageFactor = 1;
		}
		this.population = Math.round((this.basePop - (Math.max(this.popLostDisease,0) + Math.max(this.popLostCrime,0)))*this.ageFactor);
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
		if(this.nation.projects.cenciveng.built && this.nation.domesticPolicy === "urbanization"){
			this.infraCost *= 0.90;
		}
		else if(this.nation.projects.cenciveng.built){
			this.infraCost *= 0.95;
		}
		else if(this.nation.domesticPolicy === "urbanization"){
			this.infraCost *= 0.95;
		}
		
		
		if(this.id !== 0){
			var cost = cityCosts[this.id+1]
			
			if(this.nation.domesticPolicy === "manifestDestiny") cost *= .95;
			if(this.nation.projects.city_planning.built && this.id > 10) cost -= 50000000;
			if(this.nation.projects.adv_city_planning.built && this.id > 15) cost -= 100000000;
			
			this.cityCost.money += cost;
		}
		
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
		b.amount += diff;
		this.slotsUsed += diff;
	}

	
	/***************
	***FUNCTIONS****
	***************/
	var save = function(obj){
		console.log("SAVING!");
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
			timestamp: obj.timestamp,
			projects: obj.projects,
			military: obj.military,
			score: obj.score
		};
		
		for(var i=0;i<obj.cities.length;i++){
			var ref = obj.cities[i];
			if(ref != undefined){
				var city = {};
				city.id = ref.id;
				city.name = ref.name;
				city.infra = ref.infra;
				city.land = ref.land;
				city.age = ref.age;
				city.buildings = ref.buildings;
				city.timestamp = ref.timestamp;
				city.data = ref.data;
				//console.log(ref.buildings);
				data.cities.push(city);
			}
		}
		
		data.cleared = true;
		
		localStorage.setItem("data", btoa(JSON.stringify(data)));
	};
	var saveAPI_key = function(str){
		localStorage.setItem("api_key", str);
	}
	var loadAPI_key = function(){
		api_key = localStorage.getItem("api_key");
	}
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
				
				if(data !== undefined){
					var obj = JSON.parse(atob(data))
					if(!obj.cleared){
						data = undefined;
					}
					else{
						return  obj;
					}
				}
			}
		}
	}
	var clearHTML = function(){
		$("#manage-cities").html("");
	}
	var init = function(){
		nation = new Nation(load());
		if(nation === undefined || Object.keys(nation).length === 0) {
			nation = new Nation();
			nation.createCity();
			save(nation);
		}
		if(nation.cities == undefined || nation.cities.length == 0){
			nation.createCity();
			save(nation);
		}
		
		for(var i=0;i<nation.cities.length;i++){
			$("#manage-cities").append(nation.cities[i].constructHTML());
		}
		
		nation_import_id = $("#nation_id").val();
		$("#config").find('[name="allianceTax"]').val((nation.monetaryTaxRate * 100));
		$("#config").find('[name="incomeBonus"]').val((nation.incomeBonus * 100));
		$("#config").find('[name="continent"]').val(nation.continent.name);
		$("#config").find('[name="domesticPolicy"]').val(nation.domesticPolicy);
		$("#config").find('[name="warPolicy"]').val(nation.warPolicy);
		loadAPI_key();
	}
	var format = function(n){
		if(isNaN(n)){
			return 0;
		}
		return (Math.round(n*100)/100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	var update = function(n){
		for(var i=nation.cities.length-1;i>=0;i--){
			nation.cities[i].update();
			nation.cities[i].updateHTML();
		}
		
		nation.update();
		nation.updateHTML();
		save(nation);	
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
	var loadCityFromAJAX = function([args], n, i, l){
		var data = arguments[0][0];
		//console.log(data);
		var city = new City(n);
		city.cityID = data.cityid;
		city.id = i;
		city.name = data.name;
		city.infra = Number(data.infrastructure);
		city.land = Number(data.land);
		city.age = Number(data.age);
		//handle buildings
		for(var b in city.buildings){
			city.buildings[b].amount = ~~data[b]
		}
		
		n.cities[i] = city;
		city.update();
		if(n.cities.length == l){
			save(n);
			clearHTML()
			init();
			update();
		}
	}
	var loadNationFromAJAX = function(data){
		nation = new Nation();
		
		if(data.cityids == undefined){
			console.log(data);
			return;
		}
		
		nation.id = data.nationid;
		nation.color = data.color;
		nation.score = data.score;
		switch (data.continent){
			case "Africa":
				nation.continent = continents.africa;
				break;
			case "Antarctica":
				nation.continent = continents.antarctica;
				break;
			case "Australia":
				nation.continent = continents.australia;
				break;
			case "Asia":
				nation.continent = continents.asia;
				break;
			case "North America":
				nation.continent = continents.northAmerica;
				break;
			case "South America":
				nation.continent = continents.southAmerica;
				break;
			case "Europe":
				nation.continent = continents.europe;
				break;
			default:
				nation.continent = continents.northAmerica;
		}
		switch (data.domestic_policy){
			case "Urbanization":
				nation.domesticPolicy = "urbanization";
				break;
			case "Manifest Destiny":
				nation.domesticPolicy = "manifestDestiny";
				break;
			case "Open Market":
				nation.domesticPolicy = "openMarket";
				break;
			case "Technological Advancement":
				nation.domesticPolicy = "Technological Advancement";
				break;
			case "Imperialism":
				nation.domesticPolicy = "imperialism";
				break;
			default:
				nation.domesticPolicy = "urbanization";
		}
		switch (data.war_policy){
			case "Attrition":
				nation.warPolicy = "attrition";
				break;
			case "Turtle":
				nation.warPolicy = "turtle";
				break;
			case "Blitzkrieg":
				nation.warPolicy = "blitz";
				break;
			case "Fortress":
				nation.warPolicy = "fortress";
				break;
			case "Moneybags":
				nation.warPolicy = "moneybags";
				break;
			case "Pirate":
				nation.warPolicy = "pirate";
				break;
			case "Tactician":
				nation.warPolicy = "tactician";
				break;
			case "Guardian":
				nation.warPolicy = "guardian";
				break;
			case "Covert":
				nation.warPolicy = "covert";
				break;
			case "Arcane":
				nation.warPolicy = "arcane";
				break;
			default:
				nation.warPolicy = "turtle";
		}
		var index = 0;
		for(index=0;index<data.cityids.length;index++){
			importCity(data.cityids[index], nation, index, data.cityids.length);
		}
		for(var p in nation.projects){
			if(data[p] == "0"){
				nation.projects[p].built = false;
			}
			else if(data[p] == "1"){
				nation.projects[p].built = true;
			}
		}
		
	}
	/***************
	*****AJAX*****
	***************/
	$.ajaxPrefilter( function (options) {
	  if (options.crossDomain && jQuery.support.cors) {
		var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
		options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
	  }
	});
	var importNation = function(id){
		//console.log("https://politicsandwar.com/api/nation/id=" + id + "&key=" + api_key);
		$.ajax({
			url: "https://politicsandwar.com/api/nation/id=" + id + "&key=" + api_key,
			success: loadNationFromAJAX,
			error: logResponse,
			dataType: "json",
			cache: false
			});
	}
	var importCity = function(id, n, i, l){
		//console.log("https://politicsandwar.com/api/city/id=" + id + "&key=" + api_key);
		$.ajax({
			url: "https://politicsandwar.com/api/city/id=" + id + "&key=" + api_key,
			success: function(){
				loadCityFromAJAX(arguments, n, i, l);
			},
			error: logResponse,
			dataType: "json",
			cache: false
			});
	}
	function logResponse(response){
		console.log("AJAX ERROR");
		console.log(response);
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
	});
	$("#api_key").on("change", function(){
		api_key = $(this).val();
		saveAPI_key(api_key);
		
	});
	$("#nation_id").on("change", function(){
		nation_import_id = $(this).val();
	});
	$("#colorBonus").on("change", function(){
		nation.colorBonus = $(this).val();
		update();
	});
	$("#import_nation").on("click",function(){
		importNation(nation_import_id);
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
		update();
	});
	$("#manage-cities").on("change", ".city .section-heading h4 input", function(){
		var city = nation.cities[$(".city .section-heading input").parents().eq(2).attr("id")];
		city.name = $(this).val();
	});
	$("#manage-cities").on("change", ".city .improvements input", function(e){
		e.stopImmediatePropagation();
		var city = nation.cities[$(this).parents().eq(6).attr("id"
		)];
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
		update();
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
		update();
	});

	$("#manage-cities").on("click", ".clone", function(){
		var city = nation.cities[$(".city .section-heading input").parents().eq(2).attr("id")];
		var newID = nation.cities.length;
		nation.cities[newID] = jQuery.extend(true, {}, city);
		nation.cities[newID].name = "City " + (newID+1);
		nation.cities[newID].id = newID;
		$("#manage-cities").append(nation.cities[newID].constructHTML());
		update();
	});

	$("#manage-military").on("change", "input", function(){
		var unit = nation.military[$(this).attr("name")];
		var val = ~~($(this).val());
		
		if(val >= unit.cap && unit.cap !== -1) val = unit.cap;
		if(val < 0) val = 0;
		
		unit.amount = val;
		$(this).val(val);
		update();
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
		update();
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
		update();
	});
	$("#config").on("change", "input[name='allianceMonetaryTax']", function(){
		var val = Number($(this).val())/100;
		nation.monetaryTaxRate = val;
		update();
	});
	$("#config").on("change", "input[name='allianceResourceTax']", function(){
		var val = Number($(this).val())/100;
		nation.resourceTaxRate = val;
		update();
	});
	$("#config").on("change", "input[name='incomeBonus']", function(){
		var val = Number($(this).val())/100;
		nation.incomeBonus = val;
		update();
	});
	/***************
	*****START*****
	***************/

	var nation;
	init();
	update();
	//var updateInterval = setInterval(update,500);
	//var saveInterval = setInterval(save(nation), 5000);
