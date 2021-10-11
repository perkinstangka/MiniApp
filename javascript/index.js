// Collapse
const showHide = document.querySelector("#showHideCollapse");
const form = document.querySelector("form");

showHide.addEventListener("click", function(){
	if(form.style.display === "none"){
		form.style.display = "block";
		showHide.textContent = "Hide Form Add New Student";
	}else{
		form.style.display = "none";
		showHide.textContent = "Show Form Add New Student";
	}
});



// Deklarasi
const faculties = [
	{
		name:"Pascasarjana",
		sub: ['Magister Manajemen','Magister Teologi']
	},{
		name:"Fakultas Filsafat",
		sub: ['Ilmu Filsafat']
	},{
		name:"Fakultas Keguruan dan Ilmu Pendidikan",
		sub: ['Pendidikan Agama',
			'Pendidikan Bahasa Inggris',
			'Pendidikan Ekonomi',
			'Pendidikan Luar Sekolah']
	},{
		name:"Fakultas Ekonomi dan Bisnis",
		sub: ['Akuntansi', 'Manejemen']
	},{
		name:"Fakultas Pertanian",
		sub: ['Agroteknologi']
	},{
		name:"Fakultas Ilmu Komputer",
		sub: ['Informatika', 'Sistem Informasi']
	},{
		name:"Fakultas Keperawatan",
		sub: ['Profesi Ners', 'Keperawatan']
	},{
		name:"Akademi Sekretari Manajemen Indonesia Klabat",
		sub: ['Sekretari(D3)']
	},]

let students = [
	{
		nim: '105011810001',
		name: 'John Doe',
		gender: 'Male',
		faculty: 'Fakultas Ilmu Komputer',
		programStudy: 'Sistem Informasi',
	},{
		nim: '103021810001',
		name: '	Jack Reacher',
		gender: 'Male',
		faculty: 'Fakultas Ekonomi dan Bisnis',
		programStudy: 'Manajemen',
	},{
		nim: '105021810002',
		name: '	Mery Heather',
		gender: 'Female',
		faculty: 'Fakultas Ilmu Komputer',
		programStudy: 'Informatika',
	},]




//Faculty
const faculty_option = document.querySelector("#faculty-form");

for(faculty of faculties){
	let tag = document.createElement('option');
	let text = document.createTextNode(faculty.name);
	tag.appendChild(text);
	faculty_option.appendChild(tag);
}



//ProgramStudy
let program_study = document.querySelector("#program-study-form");

faculty_option.addEventListener('change',function(e){

	let options = e.target.value;

	//option
	if(faculties.map((faculty) => faculty.name).indexOf(options) != -1){
		faculties.filter((i) => {
			if(i.name == options){

				program_study.innerHTML = '';

				let tag = document.createElement('option');
				let text = document.createTextNode("~~ SELECT PROGRAM OF STUDY ~~");
				tag.appendChild(text);
				program_study.appendChild(tag);

				for(j of i.sub){
					let tag = document.createElement('option');
					let text = document.createTextNode(j);
					tag.appendChild(text);
					program_study.appendChild(tag)

				}
			}
		});
	}
	else{
		program_study.innerHTML = '';

		let tag = document.createElement('option');
		let text = document.createTextNode("~~ SELECT PROGRAM OF STUDY ~~");
		tag.appendChild(text);
		program_study.appendChild(tag);
	}
});



//Query
const submit_button = document.querySelector("#submit-button");

submit_button.addEventListener('click',() => {
	let student_nim = document.querySelector("#NIM").value;
	let student_name = document.querySelector("#full-name").value;
	let student_gender = document.querySelector('input[name="gender"]:checked').value;
	let student_faculty = document.querySelector("#faculty-form").options[document.querySelector("#faculty-form").selectedIndex].value;
	let student_program_study = document.querySelector("#program-study-form").options[document.querySelector("#program-study-form").selectedIndex].value;;


	//validasi form
	if(/^\d+$/.test(student_nim) != true){
		alert("mohon Masukkan Student Id");
		return;
	}

	if(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(student_name) != true){
		alert("Mohon Masukkan Nama");
		return;
	}
	if(student_faculty == '~~ SELECT FACULTY ~~'){
		alert("Harap memilih");
		return;
	}

	if(student_program_study == '~~ SELECT PROGRAM OF STUDY ~~'){
		alert("Harap memilih");
		return;
	}



	//push
	students.push({
		nim: student_nim,
		name: student_name,
		gender: student_gender,
		faculty: student_faculty,
		program_study: student_program_study,
	});

	//alert
	alert(`${student_name} added.`);
	update_student_list();
	document.querySelector("form").reset();


});



//list student
const student_list = document.querySelector("#student-list");

function update_student_list(){

	student_list.innerHTML = "";

	for(student of students){

		let tr = document.createElement("tr");

		for(key in student){

			let td = document.createElement("td");
			td.appendChild(document.createTextNode(student[key]));

			tr.appendChild(td);
		}

		//action, #delete, 
		let action = document.createElement("td");
		let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
		action.innerHTML = trash_icon;
		tr.appendChild(action);

		student_list.appendChild(tr);
	}
}
update_student_list();



//actiondelete
function delete_row(btn) {

	var row = btn.parentNode.parentNode;

	student_name = row.getElementsByTagName("td")[1].textContent;
	student_nim = (row.querySelector("tr td").textContent);

	const confirm_delete = confirm(`Are You Sure To Delete ${student_name}?`);
 
	if(confirm_delete == true){		
		students = students.filter((s) =>{
			return s.nim != student_nim;
		});

		update_student_list();

		//don't forget to reset input text
		document.querySelector("#search-student-form").reset();
	}


}



//search students by name...
let search_student = document.querySelector("#search-student");

search_student.addEventListener("input",() => {
	if(search_student.length == 0){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		//filter the student
		let filtered_students = students.filter((s) => {
			return s.name.toLowerCase().includes(search_student.value.toLowerCase());
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}


			let action = document.createElement("td");
			let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}

	}
});

//No Enter
search_student.addEventListener('keydown',(e) =>{
	if(e.keyCode == 13){
		e.preventDefault();
	}

	return false;
});



//Faculty Filter
const filter_by_faculty = document.querySelector("#filter-by-faculty");

for(i of faculties){
	const parent = document.createElement("option");
	const child = document.createTextNode(i.name);
	parent.append(child);
	filter_by_faculty.appendChild(parent);
}

const filter_faculty_button = document.querySelector("#filter-faculty-button");

filter_faculty_button.addEventListener("click",() => {
	const selected_faculty = filter_by_faculty.options[filter_by_faculty.selectedIndex].value


	if(selected_faculty == "-- SELECT FACULTY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";


		const filtered_students = students.filter((s) => {
			return s.faculty == selected_faculty;
			console.log(s.faculty)
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}


			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});


//filter Program Study
const filter_by_program_study = document.querySelector("#filter-by-program-study");

for(i of faculties){

	for(j of i.sub){
		const parent = document.createElement("option");
		const child = document.createTextNode(j);
		parent.append(child);
		filter_by_program_study.appendChild(parent);
	}
}

const filter_program_study_button = document.querySelector("#filter-program-study-button");

filter_program_study_button.addEventListener("click",() => {
	const selected_program_study = filter_by_program_study.options[filter_by_program_study.selectedIndex].value

	if(selected_program_study == "-- SELECT PROGRAM STUDY --"){
		update_student_list();
	}
	else{
		student_list.innerHTML = "";

		const filtered_students = students.filter((s) => {
			return s.program_study == selected_program_study;
			console.log(s.faculty)
		});

		for(student of filtered_students){

			let tr = document.createElement("tr");

			for(key in student){

				let td = document.createElement("td");
				td.appendChild(document.createTextNode(student[key]));

				tr.appendChild(td);
			}

			let action = document.createElement("td");
			let trash_icon = `<button type="button" class="btn btn-danger" disabled title="Students Filter Are Only For View Data"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/> </svg></button>`
			action.innerHTML = trash_icon;
			tr.appendChild(action);

			student_list.appendChild(tr);
		}
	}
});

