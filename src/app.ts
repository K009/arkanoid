let playerContainerElement: HTMLElement = document.querySelector(".player");
let moveUnit: number = 100;

window.addEventListener('load', () => {
    playerContainerElement.style.position = 'absolute';
    playerContainerElement.style.marginLeft = 'auto';
    playerContainerElement.style.marginRight = 'auto';
    playerContainerElement.style.left = '0';
    playerContainerElement.style.right = '0';
    playerContainerElement.style.top = '0';
});


// FFR - for future refactor
window.addEventListener('keydown', (e) => {
    let width: number = window.innerWidth;
    let leftOfPlayer: number = parseInt(playerContainerElement.style.left);
    let playerWidth: number = 150; // value taken from css file 
    let playerCenter: number = playerWidth / 2 + leftOfPlayer;

    if (playerCenter > width / 2) {
        playerContainerElement.style.left = parseInt(playerContainerElement.style.left) - moveUnit + "px";
    } else if (playerCenter < -(width / 2)) {
        playerContainerElement.style.left = parseInt(playerContainerElement.style.left) + moveUnit + "px";
    } else {
        switch (e.key) {
            case 'ArrowLeft':
                playerContainerElement.style.left = parseInt(playerContainerElement.style.left) - moveUnit + "px";
                break;
            case "ArrowRight":
                playerContainerElement.style.left = parseInt(playerContainerElement.style.left) + moveUnit + "px";
                break;            
        }
    }
});