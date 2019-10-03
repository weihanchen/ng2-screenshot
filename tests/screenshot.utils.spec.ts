'use strict';
import { DOMProcess } from '../src/screenshot.utils';

const getCanvas = (width: number, height: number): HTMLCanvasElement => {
   const canvas: HTMLCanvasElement = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   return canvas;
};

describe('utils', () => {
   const width = 500,
      height = 500;
   let canvas: HTMLCanvasElement;

   describe('dom process', () => {
      beforeEach(() => {
         canvas = getCanvas(width, height);
         document.body.appendChild(canvas);
      });
      afterEach(() => {
         document.body.removeChild(canvas);
      });
      it('should clip image with rect section', async () => {
         //Arrange
         const startX = 0,
            startY = 0,
            rectWidth = width / 2,
            rectHeight = height / 2;
        const domprocess = new DOMProcess();
         //Act/Assert
         const image = await domprocess.canvasToImage(canvas);
         const clipedCanvas: HTMLCanvasElement = await domprocess.clipImageToCanvas(image, startX, startY, rectWidth, rectHeight);
         expect(clipedCanvas.width).toEqual(rectWidth);
         expect(clipedCanvas.height).toEqual(rectHeight);
      });
   });
});