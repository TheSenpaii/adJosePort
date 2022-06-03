// INFINITE SCROLL //

let menu = document.querySelector('.menu');
let items = document.querySelectorAll('.menu-item');
let clones = [];
let disableScroll = false;
let scrollheight = 0;
let scrollpos = 0;
let clonesHeight = 0;

function getScrollPos(){
    return menu. scrollTop; // Amount window scrolled
}

function setScrollPos(pos){
    menu.scrollTop = pos;
}

function getClonesHeight(){
    clonesHeight = 0;

    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight; // offsetHeight Returns heigh of elements
    })

    return clonesHeight;
}

// Recalculates dimensions when screen is resized
function reCalc(){
    scrollpos = getScrollPos();
    scrollheight = menu.scrollHeight; // Height of an elements content, including content not visible on the screen
    clonesHeight = getClonesHeight();
    
    if(scrollpos <= 0){
        setScrollPos(1); // Initial set at 1px to enable upwards scrolling
    }
}

function scrollUpdate(){
    if(!disableScroll){
        scrollpos = getScrollPos();
        if (clonesHeight + scrollpos >= scrollheight){
        // scroll back to the top when we reach bottom
        setScrollPos(1);
        disableScroll = true;
    }else if (scrollpos <=0){
        // Scroll to bottom when we reach the top
        setScrollPos(scrollheight - clonesHeight);
        disableScroll = true;
        }
    }
    if(disableScroll){
       // Disable scroll-jumping for a short period of time to avoid a flickering
    
    window.setTimeout(()=>{
        disableScroll = false;
        },40);
    }
}

function onLoad(){
    items.forEach(item => {
        const clone = item.cloneNode(true);
        menu.appendChild(clone);
         clone.classList.add('js-clone');
    });

    clones = menu.querySelectorAll('.js-clone');

    reCalc();

    menu.addEventListener('scroll', () =>{
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(reCalc);
    }, false)
}

window.onload = onLoad();




// COLLAPSE WORK //

var coll = document.getElementsByClassName("menu-item");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}