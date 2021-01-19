function searchCombination() {
	clearResults();
	
	var amount1, amount2, amount3, amount4
	amount1 = document.querySelector('#amount1').value;
	amount2 = document.querySelector('#amount2').value;
	amount3 = document.querySelector('#amount3').value;
	amount4 = document.querySelector('#amount4').value;
	
	var unit1, unit2, unit3, unit4
	unit1 = document.querySelector('#unit1').value;
	unit2 = document.querySelector('#unit2').value;
	unit3 = document.querySelector('#unit3').value;
	unit4 = document.querySelector('#unit4').value;
	
	var min1, min2, min3, min4
	min1 = document.querySelector('#min1').value;
	min2 = document.querySelector('#min2').value;
	min3 = document.querySelector('#min3').value;
	min4 = document.querySelector('#min4').value;
	
	var max1, max2, max3, max4
	max1 = document.querySelector('#max1').value;
	max2 = document.querySelector('#max2').value;
	max3 = document.querySelector('#max3').value;
	max4 = document.querySelector('#max4').value;
	
	var remove100 = document.querySelector('#only100').checked;
	
	
	
	var result = [];
	
	var a1, a2, a3, a4;
	
	for(a1 = 0; a1 <= amount1; a1++)
	for(a2 = 0; a2 <= amount2; a2++)
	for(a3 = 0; a3 <= amount3; a3++)
	for(a4 = 0; a4 <= amount4; a4++) {
		var u1, u2, u3, u4;
		u1 = a1 * unit1;
		u2 = a2 * unit2;
		u3 = a3 * unit3;
		u4 = a4 * unit4;

		var totalunit = u1 + u2 + u3 + u4;
		
		if (totalunit == 0) continue;
		
		var p1, p2, p3, p4;
		p1 = u1/totalunit*100;
		p2 = u2/totalunit*100;
		p3 = u3/totalunit*100;
		p4 = u4/totalunit*100;
		
		if (min1 > p1 || max1 < p1 || min2 > p2 || max2 < p2 || min3 > p3 || max3 < p3 || min4 > p4 || max4 < p4)
			continue;
		if (totalunit%100 != 0 && remove100)
			continue;
		
		result.push({"totalunit":totalunit, "amount":[a1,a2,a3,a4], "unit":[u1,u2,u3,u4], percentage:[p1.toFixed(2),p2.toFixed(2),p3.toFixed(2),p4.toFixed(2)]});
	}
	
	result = result.sort((elm1, elm2) => {
		if(elm1["totalunit"] < elm2["totalunit"])
			return -1;
		if(elm1["totalunit"] > elm2["totalunit"])
			return 1;
		return 0
	});
	
	var elmResult = document.querySelector('#result');
	changeName();
	
	result.forEach((elm)=>{
		elmResult.insertAdjacentHTML("beforeEnd","<tr class=\"result\"><td>"+elm["totalunit"]+"</td><td>"+elm["amount"][0]+"</td><td>"+elm["amount"][1]+"</td><td>"+elm["amount"][2]+"</td><td>"+elm["amount"][3]+"</td><td>"+elm["percentage"][0]+"</td><td>"+elm["percentage"][1]+"</td><td>"+elm["percentage"][2]+"</td><td>"+elm["percentage"][3]+"</td><td>"+elm["unit"][0]+"</td><td>"+elm["unit"][1]+"</td><td>"+elm["unit"][2]+"</td><td>"+elm["unit"][3]+"</td></tr>")
	})
	
	document.querySelectorAll('tr.result > td:first-child').forEach((elm) => {
		if(elm.textContent%100 == 0) elm.style.backgroundColor = "chartreuse";
	});
	
	document.querySelectorAll('tr.result > td:nth-child(n+2):nth-child(-n+5)').forEach((elm) => {
		if(elm.textContent > 32) elm.style.backgroundColor = "crimson";
		else if(elm.textContent > 16) elm.style.backgroundColor = "coral";
	});
	
	return result;
}

function clearResults() {
	document.querySelectorAll('tr.result').forEach((elm) => {elm.remove()});
}

function changeName() {
	document.querySelectorAll('.name1').forEach((elm) => {elm.textContent = document.querySelector('#name1').value});
	document.querySelectorAll('.name2').forEach((elm) => {elm.textContent = document.querySelector('#name2').value});
	document.querySelectorAll('.name3').forEach((elm) => {elm.textContent = document.querySelector('#name3').value});
	document.querySelectorAll('.name4').forEach((elm) => {elm.textContent = document.querySelector('#name4').value});
}

var alloys = {"bismuthbronze":[["Zinc", "Copper", "Bismuth", ""],[20,50,10,0],[30,65,20,0]],
"blackbronze":[["Copper", "Silver", "Gold", ""],[50,10,10,0],[70,25,25,0]],
"bronze":[["Copper", "Tin", "", ""],[88,8,0,0],[92,12,0,0]],
"brass":[["Copper", "Zinc", "", ""],[88,8,0,0],[92,12,0,0]],
"rosegold":[["Copper", "Gold", "", ""],[15,70,0,0],[30,85,0,0]],
"sterlingsilver":[["Copper", "Silver", "", ""],[20,60,0,0],[40,80,0,0]],
"weaksteel":[["Steel", "Nickel", "Black Bronze", ""],[50,15,15,0],[70,25,25,0]],
"weakbluesteel":[["Steel", "Black Steel", "Bismuth Bronze", "Sterling Silver"],[20,50,10,10],[25,55,15,15]],
"weakredsteel":[["Steel", "Black Steel", "Brass", "Rose Gold"],[20,50,10,10],[25,55,15,15]]};

function changeAlloy() {
	document.querySelector('#name1').value = alloys[document.querySelector('#alloy').value][0][0];
	document.querySelector('#name2').value = alloys[document.querySelector('#alloy').value][0][1];
	document.querySelector('#name3').value = alloys[document.querySelector('#alloy').value][0][2];
	document.querySelector('#name4').value = alloys[document.querySelector('#alloy').value][0][3];
	
	document.querySelector('#min1').value = alloys[document.querySelector('#alloy').value][1][0];
	document.querySelector('#min2').value = alloys[document.querySelector('#alloy').value][1][1];
	document.querySelector('#min3').value = alloys[document.querySelector('#alloy').value][1][2];
	document.querySelector('#min4').value = alloys[document.querySelector('#alloy').value][1][3];
	
	document.querySelector('#max1').value = alloys[document.querySelector('#alloy').value][2][0];
	document.querySelector('#max2').value = alloys[document.querySelector('#alloy').value][2][1];
	document.querySelector('#max3').value = alloys[document.querySelector('#alloy').value][2][2];
	document.querySelector('#max4').value = alloys[document.querySelector('#alloy').value][2][3];
}

function initSearch() {
	changeAlloy();
}