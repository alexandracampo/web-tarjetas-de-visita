"use strict";const designLegend=document.querySelector(".js-dropdown__design"),fillLegend=document.querySelector(".js-dropdown__fill"),shareLegend=document.querySelector(".js-dropdown__share"),designContent=document.querySelector(".js-content__design"),fillContent=document.querySelector(".js-content__fill"),shareContent=document.querySelector(".js-content__share"),designArrow=document.querySelector(".js-arrow__design"),fillArrow=document.querySelector(".js-arrow__fill"),shareArrow=document.querySelector(".js-arrow__share"),inputName=document.querySelector(".js-name"),previewName=document.querySelector(".js__preview_name"),inputJob=document.querySelector(".js-job"),previewJob=document.querySelector(".js__preview_job"),inputEmail=document.querySelector(".js-email"),previewEmail=document.querySelector(".js__preview_email"),inputTel=document.querySelector(".js-tel"),previewTel=document.querySelector(".js__preview_tel"),inputLinkedin=document.querySelector(".js-linkedin"),previewLinkedin=document.querySelector(".js__preview_linkedin"),inputGithub=document.querySelector(".js-github"),previewGithub=document.querySelector(".js__preview_github"),emailError=document.querySelector(".js-email + span.error"),nameError=document.querySelector(".js-error-name"),jobError=document.querySelector(".js-error-job"),telError=document.querySelector(".js-error-tel"),linkedinError=document.querySelector(".js-error-linkedin"),githubError=document.querySelector(".js-error-github"),btnPalette1=document.querySelector(".js-btn-pallete1"),btnPalette2=document.querySelector(".js-btn-pallete2"),btnPalette3=document.querySelector(".js-btn-pallete3"),btnPalettes=document.querySelector(".js-btn-palletes"),previewPalette=document.querySelector(".js-preview"),btnReset=document.querySelector(".js-btn__reset"),exp={name:/^[a-zA-ZÀ-ÿ\s]{1,40}$/,email:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,tel:/^\d{7,14}$/};function closeAllSection(){designContent.classList.add("collapsed"),fillContent.classList.add("collapsed"),shareContent.classList.add("collapsed"),designArrow.classList.remove("arrow-collapsed"),fillArrow.classList.remove("arrow-collapsed"),shareArrow.classList.remove("arrow-collapsed")}function openDesignSection(){designContent.classList.remove("collapsed"),designArrow.classList.add("arrow-collapsed")}function openFillSection(){fillContent.classList.remove("collapsed"),fillArrow.classList.add("arrow-collapsed")}function openShareSection(){shareContent.classList.remove("collapsed"),shareArrow.classList.add("arrow-collapsed")}function handleClickDesign(){closeAllSection(),openDesignSection()}function handleClickFill(){closeAllSection(),openFillSection()}function handleClickShare(){closeAllSection(),openShareSection()}designLegend.addEventListener("click",handleClickDesign),fillLegend.addEventListener("click",handleClickFill),shareLegend.addEventListener("click",handleClickShare);let data={palette:1,name:"",job:"",phone:"",email:"",linkedin:"",github:"",photo:""},allInputList=document.querySelectorAll(".js-input");function handleInputForm(e){data[e.target.id]=e.target.value,localStorage.setItem("formData",JSON.stringify(data)),updatePreview()}function updatePreview(){""===data.name?previewName.innerHTML="Nombre Apellidos":previewName.innerHTML=data.name,previewEmail.href="mailto:"+data.email,""===data.job?previewJob.innerHTML="Front-end developer":previewJob.innerHTML=data.job,previewTel.href="tel:+34"+data.phone,data.linkedin.includes("https://www.")?previewLinkedin.href=""+data.linkedin:previewLinkedin.href="https://www."+data.linkedin,data.github.includes("https://github.com/")?previewGithub.href=""+data.github:previewGithub.href="https://github.com/"+data.github}function handlePalettes(e){const t=parseInt(e.target.id);data.palette=t,previewPalette.classList.remove("palette1"),previewPalette.classList.remove("palette2"),previewPalette.classList.remove("palette3"),previewPalette.classList.add("palette"+t)}const telef=/^\+?(\d.*){3,}$/;function showErrorTel(){console.log("hola"),""===inputTel.value?telError.textContent="Debe introducir un número de teléfono válido.":telef.test(inputTel.value)?telError.innerHTML="":telError.textContent="El valor introducido debe ser un número de teléfono válido."}function showError(){email.validity.valueMissing?emailError.textContent="Debe introducir una dirección de correo electrónico.":email.validity.typeMismatch?emailError.textContent="El valor introducido debe ser una dirección de correo electrónico.":emailError.innerHTML=""}function checkSizeName(){inputName.value.length>20&&(previewName.classList.remove("preview__card__name"),previewName.classList.add("preview__card__name__small"))}inputEmail.addEventListener("change",(function(){inputEmail.validity.valid?(emailError.innerHTML="",emailError.className="error"):showError()})),inputTel.addEventListener("change",(function(){showErrorTel()})),inputName.addEventListener("keyup",(function(){checkSizeName(),""===inputName.value?(nameError.innerHTML="Rellena tus datos",nameError.className="error"):nameError.innerHTML=""})),inputJob.addEventListener("change",(function(){""===inputJob.value?(jobError.innerHTML="Rellena tus datos",jobError.className="error"):jobError.innerHTML=""})),inputLinkedin.addEventListener("change",(function(){""===inputLinkedin.value?(linkedinError.innerHTML="Rellena tus datos",linkedinError.className="error"):linkedinError.innerHTML=""})),inputGithub.addEventListener("change",(function(){""===inputGithub.value?(githubError.innerHTML="Rellena tus datos",githubError.className="error"):githubError.innerHTML=""}));for(let e=0;e<allInputList.length;e++)allInputList[e].addEventListener("input",handleInputForm);btnPalette1.addEventListener("click",handlePalettes),btnPalette2.addEventListener("click",handlePalettes),btnPalette3.addEventListener("click",handlePalettes);const sendBTN=document.querySelector(".js-shareBtn"),msgShare=document.querySelector(".js-msgShare");function handleClickSend(e){e.preventDefault(),fetch("https://dev.adalab.es/api/card/",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)}).then(e=>e.json()).then(e=>{e.success?(msgShare.innerHTML=`<div class= 'share_card'> \n         <h2 class='share_card_text'> La tarjeta ha sido creada: </h2> \n            <a href='${e.cardURL}' target='_blank' class= 'share_card_cardURL'> Tu tarjeta </a> \n        \t<a class="share_card_twitter-share-button" href="https://twitter.com/intent/tweet?text=Mi%20tarjeta%20de%20presentaci%C3%B3n&url=${e.cardURL}"target='_blank' ><i class="fa-brands fa-twitter"></i> Compartir en Twitter</a>\n            </div>`,sendBTN.classList.add("checked")):e.error.startsWith("Mandatory fields")?msgShare.innerHTML="<p class='error'> Faltan datos, revisa el formulario.</p>":e.error.startsWith("Database error")?msgShare.innerHTML="<p class='error'> Imagen demasiado grande.</p>":msgShare.innerHTML="<p class='error'> Error. Intentalo de nuevo.</p>"})}sendBTN.addEventListener("click",handleClickSend);let allInputErrorList=document.querySelectorAll(".js-msgerror");const handleReset=()=>{data.palette=1,data.name="",data.job="",data.phone="",data.email="",data.linkedin="",data.github="",data.photo="",updatePreview(),previewPalette.classList.remove("palette2"),previewPalette.classList.remove("palette3"),previewPalette.classList.add("palette1"),btnPalette1.checked=!0,msgShare.innerHTML="";for(let e=0;e<allInputList.length;e++)allInputList[e].value="";for(let e=0;e<allInputErrorList.length;e++)allInputErrorList[e].innerHTML="";localStorage.removeItem("formData"),resetImage(),sendBTN.classList.remove("checked")};btnReset.addEventListener("click",handleReset);const fr=new FileReader,fileField=document.querySelector(".js__profile-upload-btn"),profileImage=document.querySelector(".js__profile-image"),profilePreview=document.querySelector(".js__profile-preview");function getImage(e){const t=e.currentTarget.files[0];fr.addEventListener("load",writeImage),fr.readAsDataURL(t)}function writeImage(){profileImage.style.backgroundImage=`url(${fr.result})`,profilePreview.style.backgroundImage=`url(${fr.result})`,data.photo=fr.result,localStorage.setItem("formData",JSON.stringify(data))}function resetImage(){profileImage.style.backgroundImage="url(./assets/images/salas.jpg)",profilePreview.style.backgroundImage="url()"}fileField.addEventListener("change",getImage);const localStorageData=JSON.parse(localStorage.getItem("formData"));localStorageData&&(data=localStorageData,inputName.value=data.name,inputJob.value=data.job,inputEmail.value=data.email,inputTel.value=data.phone,profileImage.style.backgroundImage=`url(${data.photo})`,profilePreview.style.backgroundImage=`url(${data.photo})`,inputLinkedin.value=data.linkedin,inputGithub.value=data.github,updatePreview(),checkSizeName());