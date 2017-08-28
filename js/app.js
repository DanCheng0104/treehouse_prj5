
(function($) {
	let ems_all = [];
	
	function titleCase(str) {
	   let splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	       // You do not need to check if i is larger than splitStr length, as your for does that for you
	       // Assign it back to the array
	       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   // Directly return the joined string
	   return splitStr.join(' '); 
	}
	$.ajax({
	    url: "https://randomuser.me/api",
	    method: "GET",
	    data: {results: 12}
	 })
	 .done((data) => processResults(data.results))
	 .fail((xhr) => console.log('error', xhr));

	 function processResults(results){		
		results.forEach(ems=>{
	    	let ppl = new Map();
	    	ppl.set('name',titleCase(`${ems.name.first} ${ems.name.last}`));
	    	ppl.set('email',ems.email);
	    	ppl.set('city',ems.location.city);
	    	ppl.set('picture',ems.picture.large);
	    	ppl.set('cell',ems.cell);
	    	ppl.set('location',`${ems.location.street},${ems.location.city},${ems.location.state},${ems.location.postcode}`);
	    	ppl.set('dob',ems.dob.split(' ')[0]);
	    	ems_all.push(ppl);		   	
		 });
		 populateBox(ems_all);	
	 }

	 function displayEmployee(ems,index){
		$('.modal-content').attr('index',index);
		$("#myModal").modal('show');  
		$('.modal-header img').attr("src",ems.get('picture'));
		$('.pname').html(ems.get('name'));
		$('.email').html(ems.get('email'));
		$('.city').html(titleCase(ems.get('city')));
		$('.cell').html(ems.get('cell'));
		$('.location').html(ems.get('location'));
		$('.dob').html(`Birthday: ${ems.get('dob')}`);
	 }

	 function populateBox(inputs){
	 	for (let input of inputs){
	 		let html = `<div class="box">
		 					<img src=${input.get('picture')} >
		 					<div class="sideText">
		 						<h3>${input.get('name')}</h3>
		 						<p>${input.get('email')}</p>
		 						<p>${input.get('city')}</p>
		 					</div>
		 				</div>`
		    $('.grid').append(html);
	 	}

		$("#myModal").modal({show:false});  

		$('.box').on('click',function(event){
		 	let targetName = this.lastElementChild.firstElementChild.textContent;		 		
	 		ems_all.forEach((ems,index)=>{
	 			if (ems.get('name') === targetName){
	 				displayEmployee(ems,index)
	 			}			
	 		})
		})


		$('.nav.right').on('click',function(){
			let index =parseInt($(this.parentElement).attr('index'));
			index =(index ===11?-1:index);
			displayEmployee(ems_all[index+1],index+1);
		}) 	
		$('.nav.left').on('click',function(){
			let index =parseInt($(this.parentElement).attr('index'));
			index=(index ===0?12:index);
			displayEmployee(ems_all[index-1],index-1);
		}) 
	 }



})(jQuery);

