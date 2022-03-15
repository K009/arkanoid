export default class Brick {
    constructor(ctx, x, y, status) {
        this.ctx = ctx;
        this.width = 50;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.status = status;
        this.color = this.randColor();
    }
    //two helpful methods
    //1.rand colors
    //2.rand coordinates in the upside area
    //considerating currently drawn bricks
    drawBrick() {
        //console.log(this.x)
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    getCoordinates(allXCoordinates, allYCoordinates) {
        const minX = 10;
        const maxX = 420;
        const minY = 10;
        const maxY = 150;
        //x from 10 to 420
        //y from 10 to 150
        const x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
        const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
        //if doesn't overlap with other bricks
        if (allXCoordinates.length > 0) {
            for (let i = 0; i < allXCoordinates.length; i++) {
                const diffX = Math.abs(allXCoordinates[i] - x);
                console.log("ALLX: " + allXCoordinates[i]);
                console.log("SingleX: " + x);
                console.log(diffX);
                // console.log(this.width)
                if (diffX > this.width) {
                    //git
                    const diffY = allYCoordinates[i] - y;
                    if (diffY < this.width) {
                        //git
                        allXCoordinates.push(x);
                        allYCoordinates.push(y);
                        return {
                            x: x,
                            y: y
                        };
                    }
                }
            }
        }
        // return {
        //     x: 0,
        //     y: 0
        // }
        if (true) {
            //console.log(allXCoordinates)
            allXCoordinates.push(x);
            allYCoordinates.push(y);
        }
        return {
            x: x,
            y: y
        };
    }
    randColor() {
        const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
            '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
            '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
            '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
            '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
            '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
            '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
            '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
            '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
            '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
        return colorArray[Math.floor(Math.random() * colorArray.length)];
    }
}
//Work on function with rand positions
//add else ifs
