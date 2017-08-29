//i am using css grid to populate employee info
(function($) {
	let ems_all = [];
	//ajax call to get random 12 users and use promise to process the results
	$.ajax({
	    url: "https://randomuser.me/api",
	    method: "GET",
	    data: {results: 12}
	 })
	 .done((data) => processResults(data.results))
	 .fail((xhr) => console.log('error', xhr));
      
      //create map for each result and push it to the ems_all array.
	 function processResults(results){		
		results.forEach(ems=>{
	    	let ppl = new Map();
	    	ppl.set('name',titleCase(`${ems.name.first} ${ems.name.last}`));
	    	ppl.set('email',ems.email);
	    	//capitalize the first character
	    	ppl.set('city',ems.location.city.replace(/\b[a-z]/g,function(f){return f.toUpperCase();}));
	    	ppl.set('picture',ems.picture.large);
	    	ppl.set('cell',ems.cell);
	    	let street = ems.location.street.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
	    	let city = ems.location.city.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
	    	let state = ems.location.state.replace(/\b[a-z]/g,function(f){return f.toUpperCase();});
	    	ppl.set('location',`${street}, ${city}, ${state}, ${ems.location.postcode}`);
	    	ppl.set('dob',ems.dob.split(' ')[0]);
	    	ems_all.push(ppl);		   	
		 });
		 populateBox(ems_all);	
	 }
	 //display full employee information when you click the employee box
	 function displayEmployee(ems,index){
		$('.modal-content').attr('index',index);
		$("#myModal").modal('show');  
		$('.modal-header img').attr("src",ems.get('picture'));
		$('.pname').html(ems.get('name'));
		$('.email').html(ems.get('email'));
		$('.city').html(ems.get('city'));
		$('.cell').html(ems.get('cell'));
		$('.location').html(ems.get('location'));
		$('.dob').html(`Birthday: ${ems.get('dob')}`);
	 }

	 //populate employee info
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
	 	//hide the modal by default
		$("#myModal").modal({show:false});  
		//show detailed employee info when clicking the box
		$('.box').on('click',function(event){
		 	let targetName = this.lastElementChild.firstElementChild.textContent;		 		
	 		ems_all.forEach((ems,index)=>{
	 			if (ems.get('name') === targetName){
	 				displayEmployee(ems,index)
	 			}			
	 		})
		})

		//nav right button click
		$('.nav.right').on('click',function(){
			let index =parseInt($(this.parentElement).attr('index'));
			index =(index ===11?-1:index);
			displayEmployee(ems_all[index+1],index+1);
		}) 	
		//nav left button click
		$('.nav.left').on('click',function(){
			let index =parseInt($(this.parentElement).attr('index'));
			index=(index ===0?12:index);
			displayEmployee(ems_all[index-1],index-1);
		}) 
	 }

})(jQuery);

