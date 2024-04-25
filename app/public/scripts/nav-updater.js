window.addEventListener('scroll', ()=>{
    updateNav();
});
window.addEventListener('DOMContentLoaded', ()=>{
    updateNav();
});

function updateNav() {
    const nav = document.querySelector("#lg-nav-v2-1");
    const call = document.querySelector(".call-num");
    //console.log(window.pageYOffset);
    
    if (window.pageYOffset < 50) {
        call.classList.remove("is-scrolled");
        nav.classList.remove("is-scrolled");
    }

    if (window.pageYOffset >= 250) {
        call.classList.add("is-scrolled");
        nav.classList.add("is-scrolled");
    }
}