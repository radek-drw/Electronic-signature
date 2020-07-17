const selectColor = document.querySelector('.tools__select-color');
const selectLineWidth = document.querySelector('.tools__select-line-width');
const lineInSelectWidth = document.querySelector('.tools__line-in-select-width');
const colorBox = document.querySelector('.tools__color-box');
const lineWidthBox = document.querySelector('.tools__line-width-box');
const colorsArr = [...document.querySelectorAll('.tools__color-box>div')];
const lineWidthArr = [...document.querySelectorAll('.tools__line-width-box>div')];

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 300;

let active = false;

let color;
let width;

const startDrawing = (e) => {
   // Close open boxes (color or line-width) when user clicks on canvas
   colorBox.classList.add('tools--active');
   lineWidthBox.classList.add('tools--active');

   active = !active;
   draw(e);
}

// Drawing with variables set by the user
const draw = (e) => {
   if (active) {
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
      // Get always mouse position
      let bound = canvas.getBoundingClientRect();
      let x = e.clientX - bound.left - canvas.clientLeft;
      let y = e.clientY - bound.top - canvas.clientTop;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y)
   }
}

// Function for touch drawing
const touchDraw = (e) => {
   let touch = e.touches[0];
   let mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
   });
   canvas.dispatchEvent(mouseEvent);
}

const stopDrawing = () => {
   active = !active;
   ctx.beginPath();
}

// SHOW COLOR BOX
const showColorBox = () => {
   colorBox.classList.toggle('tools--active');
}

// Click on colorsArr (array element) to get dataset (color)
const getColor = function () {
   for (let i = 0; i < colorsArr.length; i++) {
      colorsArr[i].addEventListener('click', function () {
         color = this.dataset.color;
         selectColor.style.backgroundColor = color;
      });
   }
}
getColor();

// SHOW LINE WIDTH BOX
const showLineWidthBox = () => {
   lineWidthBox.classList.toggle('tools--active');
}

// Click on lineWidthArr (array element) to get dataset (line width)
const getWidth = function () {
   for (let i = 0; i < lineWidthArr.length; i++) {
      lineWidthArr[i].addEventListener('click', function () {
         width = this.dataset.width;
         lineInSelectWidth.style.height = `${width}px`;
      });
   }
}
getWidth();

// MEDIA QUERY EVENT HANDLER
const mediaQuery = () => {
   if (matchMedia) {
      const mq = window.matchMedia("(max-width: 700px)");
      mq.addListener(WidthChange);
      WidthChange(mq);
   }
   // media query change
   function WidthChange(mq) {
      if (mq.matches) {
         // window width is up to 700px
         canvas.width = 300;
         canvas.height = 200;
      } else {
         // window width is greater than 700px
         canvas.width = 700;
         canvas.height = 300;
      }
   }
}
mediaQuery();

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', touchDraw);
canvas.addEventListener('touchend', stopDrawing);

selectColor.addEventListener('click', showColorBox);
selectLineWidth.addEventListener('click', showLineWidthBox);
