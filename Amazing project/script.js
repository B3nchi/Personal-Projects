document.addEventListener("DOMContentLoaded", function() {
    // Loading the information for the Gif
    let gif = document.createElement("img");
    gif.src = "Images/benGIF.gif";

    // Styling the Gif
    gif.style.display = "none";
    gif.style.width = "85%";
    gif.style.height = "50%";
    gif.style.objectFit = "contain";
    gif.style.transition = "all 1s ease-in-out";
    gif.classList.add("gif-element");
    document.body.appendChild(gif);

    // Function of loading the gif and listening for
    // the button
    let gifLoading = false;
    let gifVisible = false;
    let cooldown = 2; 
    let timerId;
    let buttonEnabled = true;
    let clickSound = new Audio("sounds/click.mp3");
    let song = new Audio("sounds/song.mp3");
    let btn = document.querySelector(".btn");
    gif.addEventListener("load", function(){
        gifLoading = false;
    });

    const icons = document.querySelectorAll('.footer-color a');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            clickSound.play();
        });
    });

    btn.addEventListener("click", function() {
        if (buttonEnabled) {
            buttonEnabled = false;
            clickSound.play(); 
            if (gifVisible) {
                document.body.style.backgroundColor = "";
                document.querySelector(".footer-color").classList.remove("black");
                gif.style.display = "none";
                gifLoading = false;
                gifVisible = false;
                song.pause();
            } else {
                song.play();
                document.body.style.backgroundColor = "black";
                document.querySelector(".footer-color").classList.add("black");
                if (!gifLoading) {
                    gifLoading = true;
                    setTimeout(function(){
                        gif.style.display = "block";
                    }, 2000);
                    gifVisible = true;
                }
            }

            // Start cooldown
            btn.innerText = `Cooling down... ${cooldown}`;
            btn.classList.add('cooldown'); //
            timerId = setInterval(() => {
                cooldown--;
                btn.innerText = `Cooling down... ${cooldown}`;
                if (cooldown === 0) {
                    clearInterval(timerId);
                    btn.innerText = "Click me";
                    cooldown = 2;
                    buttonEnabled = true;
                    btn.classList.remove('cooldown'); 
                }
            }, 1000);
        }
    });
});