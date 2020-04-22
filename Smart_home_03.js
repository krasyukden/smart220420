"use strict";

class Home{
	constructor(address){
		this._address = address;
		this._devices = [];
	}
	get adress(){
		return this._address;
	}
	set adress(value){
		if(typeof value == "string" && value.length <= 20){
				this._address = value;
		}	
	}	
	addDevice(dev){// работает
		this._devices.push(dev); // (new AirConditioning("airKitchen"));
		//}
	}
	getDeviceByName(name) { // *
       /*for(let i = 0; i < this._devices.length; i++){// раб
		  if(name == this._devices[i].name){
			  return this._devices[i];// 
		  }
	    }  
		return null; */
      
      let device = null;// работ
		this._devices.forEach((value) => {
         if (name == value.name) {
            device = value;
         }
      });
	   return device;
      
      /*return this._devices.find((value) => {// проверить работ ?
         if(name == value.name) {
				return value;
         }
      });*/
	}
	get devices(){
		return this._devices;
	}
	deleteDeviceByName(name) { // *
		
		/*
		for(let i = 0; i < this._devices.length; i++){// работ
			if(name == this._devices[i].name){
				this._devices.splice(i, 1);
				
				//this._devices.splice(this._devices.indexOf(this._devices[i].name), 1);// не раб
				//console.log(this._devices.indexOf(this._devices[i].name));// -1: 2 раза
			}	
			
		} */
      
        this._devices = this._devices.filter((value, i) => 
				name != this._devices[i].name);// возвращает новый мас !!
      
		/*this._devices.forEach((value) =>
			{if(name == value.name){
				this._devices.splice(this._devices.indexOf(value.name), 1);
			}
			})	*/
		//this._devices.filter((value, i) => name != this._devices[i].name)// не работ !!!
		//this._devices.filter((value) => name == this._devices.indexOf(name).name)// не работ !!!
		
		/*this._devices.filter((value, i) => {if(name != this._devices[i].name){
				return this._devices}})//Unexpected token '!='*/
		
	}
	onAllDevices(){// стиралка не вкл без контроля воды !!!
		this._devices.forEach((dev) => dev.on());//  раб
		 /*for(let i = 0; i < this._devices.length; i++){// раб - 2-й вар
			this._devices[i].on();
			
	    }*/  
	}
	offAllDevices(){// 
		this._devices.forEach((dev) => dev.off());//  раб
		 /*for(let i = 0; i < this._devices.length; i++){// раб - 2-й вар
			this._devices[i].on();
			
	    }*/  
	}
	/*delayOn(name, delay){//  Cannot read property 'then' of undefined
		for(let i = 0; i < this._devices.length; i++){// 
			
					if(name == this._devices[i].name){
						var dev = this._devices[i];//
						console.log(this._devices[i]);
					}
					
				}  
		new Promise (function(resolve, reject){
			
			setTimeout(function(){
				
				
				/*let device = null;
				this._devices.forEach((value) => {
					 if (name == value.name) {
						device = value;
					 }
					});*/
				/*resolve(dev.on());
			}, delay);		
		});			
	}*/	
		
		
	delayOn(name, delay, callback){//работ
		let device = null; 
		this._devices.forEach((value) => {
         if (name == value.name) {
            device = value;
         }
      });
	   device.on();
	    setTimeout(callback, delay);
	}
	
	
}	
	
	
	
class Device { 
	constructor(name, modes){
		this._name = name;
		this._status = false;
		this._modes = modes;
		this._currentMode = 0;
	}
	get name(){ 
		return this._name;
	}
	get status(){ 
		return this._status
	}
	on(){ 
		this._status = true;
	} 
	off(){ 
		this._status = false;
	}
	getMode() {
		return this._modes[this._currentMode]; 
	}
	getModes(){
		return this._modes;
	}	
	setMode(value) { 
      this._currentMode = this._modes.indexOf(value);
	}
	addMode(value) {
		if(typeof value == "string" && value.length <= 12){
			this._modes.push(value);
		}
	}
	nextMode() {
		if(this._currentMode < this._modes.length - 1){
			this._currentMode++;
		}
	}
	previousMode() {
		if(this._currentMode > 0){
			this._currentMode--;
		}
	}
}	

class AirConditioning extends Device {
	constructor(name, modes){
		super(name, modes);
		this._temperature = 20;
	}
	increaseTemperature(){
		if(this._temperature < 35){
			this._temperature++;
		}
	}
	decreaseTemperature(){
		if(this._temperature > 15){
			this._temperature--;
		}
	}
	set temperature(value) {
		if(typeof value == "number" && value <= 35 && value >= 15){
         this._temperature = value;
		}
   }
   get temperature(){
		return this._temperature;
	}
}

class WashingMachine extends Device {
	constructor(name, modes){
		super(name, modes);
		this._waterLevel = 0; // 0 - 10
	}
    get waterLevel() {
	    return this._waterLevel;
	}
    set waterLevel(value) {
		if(typeof value == "number" && !isNaN(value) && value >= 0 && value <= 10){
			this._waterLevel = value;
		}	
	}
    on() {  // полиморфизм, для включения нужно проверить что уровня воды достаточно для режима
		switch(this._modes[this._currentMode]) {// если добавить режим - как контролировать объем воды - объект
			case "wash":
				if(this._waterLevel >= 5 && this._waterLevel <= 8){
					this._status = true;;
				};
				break;
			case "intensive_wash":
				if(this._waterLevel >= 6 && this._waterLevel <= 10){
					this._status = true;
				};
				break;
			case "rinse":
				if(this._waterLevel >= 8 && this._waterLevel <= 10){
					this._status = true;
				};
				break;
		}
	}
}	
//let myHome = new Home("Bedroom", [new AirConditioning("airBedroom"), new WashingMachine("washingMachine")]);
let myHome = new Home("Bedroom");
let myDevice = new Device;
let airBedroom = new AirConditioning("airBedroom", ["tropics", "pole", "dry", "fan"]);
let washingMachine = new WashingMachine("washingMachine", ["wash", "intensive_wash", "rinse"]);
//console.log(myHome._devices);//раб с _
myHome._address = "Kitchen";
console.log(myHome._address);
myHome.addDevice(new AirConditioning("airBedroom", ["tropics", "pole", "dry", "fan"]));
myHome.addDevice(new AirConditioning("Kitchen1", ["tropics", "pole", "dry", "fan"]));
myHome.addDevice(new AirConditioning("airBedroom2", ["tropics", "pole", "dry", "fan"]));
myHome.addDevice(new WashingMachine("washingMachine", ["wash", "intensive_wash", "rinse"]));
console.log(myHome.getDeviceByName("airBedroom"));
myHome.getDeviceByName("washingMachine").waterLevel = 8;// без уров воды не вкл. == washingMachine.waterLevel = 8;
console.log(myHome.devices);
//myHome.deleteDeviceByName("airBedroom");
//myHome.deleteDeviceByName("airBedroom2");
console.log(myHome.devices);
//washingMachine.waterLevel = 8;
//console.log(washingMachine.waterLevel);
//myHome.onAllDevices();// раб
//myHome.getDeviceByName("airBedroom").on();//status - true
//console.log(myHome.devices);
//myHome.offAllDevices();// раб
//console.log(myHome.getDeviceByName("airBedroom").status);	

/*myHome.delayOn("airBedroom", 5000)// 
	.then(function(result){
		//console.log(result);
		//return result;
		//console.log(myHome.getDeviceByName(name).status);
		//dev.on();
		return myHome.delayOn("Kitchen1", 3000)
		
	})
	.then(function(result){
		return myHome.delayOn("airBedroom2", 4000)
	})
	.then(function(result){
		return myHome.delayOn("washingMachine", 5000)
	})*/	
	
	
	
	
	
	
	
	/*.then(	() => {	
		myHome.delayOn("Kitchen1", 3000)
		},
		(error) => {
			console.log(error);
		}
	)	*/
	

myHome.delayOn("airBedroom", 4000, function() {// раб
   console.log(myHome.getDeviceByName("airBedroom").status);
   myHome.delayOn("Kitchen1", 5000, function(){
      console.log(myHome.getDeviceByName("Kitchen1").status);
      myHome.delayOn("airBedroom2", 3000, function(){
      console.log(myHome.getDeviceByName("airBedroom2").status);
         myHome.delayOn("washingMachine", 4000, function(){
         console.log(myHome.getDeviceByName("washingMachine").status);
         });
      });
   });
});

console.log(myHome.devices);










/*delayOn(name, delay, callback){// раб
			setTimeout(function () {
				myHome.getDeviceByName(name).on();
				callback();
			}, delay);
		
	}*/

/*delayOn(name, delay, callback){// не раб
		function step1(name, delay, callback){	
			setTimeout(function () {
				myHome.getDeviceByName(name).on();
				callback();
			}, delay);
		}
		function step2(name, delay, callback){	
			setTimeout(function () {
				myHome.getDeviceByName(name).on();
				callback();
			}, delay);
		}
	}*/
//myHome.delayOn("airBedroom", 4000, myHome.getDeviceByName("airBedroom").on());// не работ
//myHome.delayOn("airBedroom", 4000, function (name){myHome.getDeviceByName(name).on()});// не работ
//myHome.delayOn("airBedroom", 4000, function(){callback()});// не работ	

/*myHome.delayOn("airBedroom", 3000, function(){} // работ вкл чз 3 сек - 1 устройство
	);*/
/*myHome.delayOn("airBedroom", 3000,function(){ //не раб
		step1("airBedroom", 3000, function(){ 
			step2("Kitchen1", 2000, function(){});			}
		});
		
});*/