(function(){
  let pinned = false;
  let nav = document.querySelector(".nav");
  let stickyScrollPoint = document.querySelector(".hero-image").offsetHeight;

  function pinToTop(){
    if(pinned) return;
    nav.classList.add("pinned");
    pinned = true;
  }

  function unPinFromTop(){
    if(!pinned) return;
    nav.classList.remove("pinned");
    pinned = false;
  }

  window.addEventListener("scroll", function(ev){
    if(this.window.scrollY < stickyScrollPoint) return unPinFromTop();
    let coords = nav.getBoundingClientRect();
    if(coords.top <= 0) return pinToTop();

    unPinFromTop();
  });
})();