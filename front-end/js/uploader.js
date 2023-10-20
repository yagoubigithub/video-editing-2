

let browse = document.getElementsByClassName('chooseFiles')[0]; 
let selectDialog = document.createElement("INPUT"); 
selectDialog.setAttribute("type", "file"); 
selectDialog.setAttribute("multiple", "true"); 
selectDialog.style.display = "none"; 
let progressUpload = document.getElementsByClassName("progressUpload")[0]; 
let progress  =  document.getElementById("progress"); 
//addProgressBar(); 
browse.addEventListener("click", function(){	 
	selectDialog.click(); 
	
}); 

selectDialog.addEventListener("change", function(){ 
	
	sendFiles(selectDialog.files); 

}); 

function sendFiles(files){ 
	
	resetProgressBar(); 
	var req = new XMLHttpRequest();	 
	req.upload.addEventListener("progress", updateProgress); 
	req.open("POST", baseUrl +"/api/videos/upload"); 
	var form = new FormData(); 
	for(var file = 0; file < files.length; file++){		 
		
		form.append("file" + file, files[file], files[file].name); 
		
	} 

	req.onreadystatechange = function() {
		if (req.readyState == XMLHttpRequest.DONE) {
			const file  = JSON.parse(req.responseText).vid;
			localStorage.setItem("file" , JSON.stringify(file))
			showFrame()
		}
	}
	req.send(form); 
} 
function updateProgress(e){ 
	
	progress.style.width = (((e.loaded/e.total)*100))+ "%"; 

} 
function resetProgressBar(){ 
	progress.style.width = "0%"; 
} 
