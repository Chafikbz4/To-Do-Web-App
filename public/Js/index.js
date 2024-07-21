let AddList=document.querySelector(".AddList");
let module=document.querySelector(".module");
let Cancel=document.querySelector(".cancel");
let input=document.getElementById('title');
AddList.addEventListener('click', function(){
    module.classList.remove('hide');
    let head=document.querySelector('.nav');
    head.classList.add("disabled")
    let links = document.querySelectorAll('a');
    links.forEach(link => {
        link.classList.add('disabled')
        });
});
Cancel.addEventListener('click',function(){
    module.classList.add('hide');
    input.value="";
    let links = document.querySelectorAll('a');
    links.forEach(link => {
        link.classList.remove('disabled')
        });
        let head=document.querySelector('.nav');
        head.classList.remove("disabled")
});
