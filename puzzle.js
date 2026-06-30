let order = [0,1,2,3,4,5,6,7,8];
     order.sort(() => Math.random() - 0.5);

    let newbtn = document.querySelector(".new");
    let first = null;

    let str = null;
    newbtn.addEventListener("click",function(){
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(data => {
            str = data.message;
            order.sort(() => Math.random() - 0.5);

            show();
            newbtn.style.display = "none";
            document.querySelector(".result").innerHTML = "";
        });
    })

    function show() {

        document.querySelector(".puzzle").innerHTML = "";

        for (let i=0; i<9; i++) {

            let value = order[i];

            let tile = document.createElement("div");

            tile = document.createElement("div");
            tile.classList.add("tile");
                    
            tile.style.backgroundImage = `url(${str})`;
            tile.style.backgroundSize = "300px 300px";

            let row = Math.floor(value/3);
            let col = value%3;

            tile.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;

            tile.addEventListener("click", function () {

                if (first === null) {
                    first = i;
                } else {
                    let second = i;
                    [order[first], order[second]] = [order[second], order[first]];
                    first = null;
                    show();

                    if(checkWin()){
                        document.querySelector(".result").innerHTML = "Bravo!  You Solve the damm puzzle :)";
                        newbtn.innerHTML = "Next level";
                        newbtn.style.display = "flex";
                    }
                }

            });
            document.querySelector(".puzzle").appendChild(tile);
        }
    }

    function checkWin(){
        for(let i=0;i<order.length;i++){
            if(order[i] !== i){
                return false;
            }
        }
        return true;
    }