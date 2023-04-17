class IndexForSiblings{
    static get(el){
        let children = el.parentNode.children;

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if(child == el) return i;
        }
    }
}

class Slider{
    constructor(selector, transition=true){
        this.move = this.move.bind(this);
        this.moveByButton = this.moveByButton.bind(this);
        this.slider = document.querySelector(selector);
        this.interval = null;
        this.transition = transition;
        this.itemsCount = this.slider.querySelectorAll(".container > *").length;
        this.acc = 0;

        this.start();
        this.buildControls();
        this.bindEvents();
    }

    start(){
        if(!this.transition) return;
        this.interval = window.setInterval(this.move, 5000);
    }

    restart(){
        if(this.interval) window.clearInterval(this.interval);
        this.start();
    }

    bindEvents(){
        this.slider.querySelectorAll(".controls li").forEach(e => {
            e.addEventListener("click",this.moveByButton);
        });
    }


    moveByButton(ev){
        let index = IndexForSiblings.get(ev.currentTarget);
        this.moveTo(index);
        this.restart()
    }

    buildControls(){
        for(var i = 0; i<this.itemsCount; i++){
            let control = document.createElement("li");
            if(i == 0) control.classList.add("active");
            this.slider.querySelector(".controls ul").appendChild(control);
        }
    }

    move(){
        this.acc++;
        if(this.acc > this.itemsCount - 1) this.acc = 0;
        this.moveTo(this.acc);
    }

    resetIndicator(){
        this.slider.querySelectorAll(".controls li.active").forEach(e => e.classList.remove("active"));
    }

    moveTo(index){
        let left = index * 100;
        this.resetIndicator();
        this.slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active");
        this.slider.querySelector(".container").style.left = "-"+left+"%";
    }
}

(function(){
    new Slider(".slider",true);
})();