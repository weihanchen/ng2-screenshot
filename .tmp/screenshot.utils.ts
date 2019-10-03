'use strict';
import { Rect } from './screenshot.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class DOMProcess {
    private domURL = window.URL;
    private imageType = 'image/png';
    constructor() {}
    async appendToBody(element: HTMLCanvasElement): Promise<HTMLCanvasElement> {
        document.body.appendChild(element);
        return element;
    }

    async canvasToImage(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
        const url: string = canvas.toDataURL(this.imageType);
        return await this.dataUrlToImage(url);
    }

    clearCanvasRect(canvas: HTMLCanvasElement) {
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    async dataUrlToImage(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = reject;
            image.src = url;
        });
    }

    async clipImageToCanvas(
        image: HTMLImageElement,
        clipStartX: number,
        clipStartY: number,
        clipWidth: number,
        clipHeight: number
    ) {
        const canvas: HTMLCanvasElement = await this.createCanvas(Math.abs(clipWidth), Math.abs(clipHeight));
        const context: CanvasRenderingContext2D = canvas.getContext('2d');
        context.drawImage(image, clipStartX, clipStartY, clipWidth, clipHeight, 0, 0, canvas.width, canvas.height);
        this.remove(image);
        return canvas;
    }

    async createCanvas(width: number, height: number): Promise<HTMLCanvasElement> {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    downloadByUrl(url: string, filename: string) {
        const downloadLink: HTMLAnchorElement = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.target = '_blank';
        downloadLink.click();
        downloadLink.remove();
        this.domURL.revokeObjectURL(url);
    }

    async downloadCanvas(canvas: HTMLCanvasElement, filename: string): Promise<HTMLCanvasElement> {
        const downloadUrl = canvas.toDataURL(this.imageType);
        this.downloadByUrl(downloadUrl, filename);
        return canvas;
    }

    getStyle(element: HTMLElement, property: string) {
        const styles: any = window.getComputedStyle(element);
        return styles[property];
    }

    remove(element: HTMLElement) {
        if (element) {
            element.remove();
        }
        element = null;
    }

    isTransparent(element: HTMLElement): boolean {
        const backgroundColor: string = window.getComputedStyle(element).backgroundColor;
        return backgroundColor === 'transparent' || backgroundColor === '' || backgroundColor === 'rgba(0, 0, 0, 0)';
    }

    async listenInteractiveCanvas(
        canvas: HTMLCanvasElement,
        rectBackground: string | CanvasGradient | CanvasPattern,
        mouseupListener: any,
        mousedownListener: any,
        contextmenuListener: any
    ): Promise<HTMLCanvasElement> {
        const context: CanvasRenderingContext2D = canvas.getContext('2d'),
            rect: Rect = {
                startX: 0,
                startY: 0,
                w: 0,
                h: 0
            };
        let dragging = false;

        const draw = () => {
            context.beginPath();
            context.fillStyle = rectBackground;
            context.fillRect(rect.startX, rect.startY, rect.w, rect.h);
            context.closePath();
        };

        const mousedown = (e: MouseEvent) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            rect.startX = e.pageX - canvas.offsetLeft;
            rect.startY = e.pageY - canvas.offsetTop;
            mousedownListener(rect);
            rect.w = 0;
            rect.h = 0;
            dragging = true;
        };

        const mousemove = (e: MouseEvent) => {
            if (dragging) {
                rect.w = e.pageX - canvas.offsetLeft - rect.startX;
                rect.h = e.pageY - canvas.offsetTop - rect.startY;
                context.clearRect(0, 0, canvas.width, canvas.height);
                draw();
            }
        };

        const mouseup = () => {
            dragging = false;
            mouseupListener(canvas, rect);
        };

        const contextmenu = (e: MouseEvent) => {
            contextmenuListener();
            e.preventDefault();
            return false;
        };

        const touchStart = (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.pageX,
                clientY: touch.pageY
            });
            canvas.dispatchEvent(mouseEvent);
        };

        const touched = () => {
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        };

        const touchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.pageX,
                clientY: touch.pageY
            });
            canvas.dispatchEvent(mouseEvent);
        };

        canvas.addEventListener('mousedown', mousedown, false);
        canvas.addEventListener('mouseup', mouseup, false);
        canvas.addEventListener('mousemove', mousemove, false);
        canvas.addEventListener('touchstart', touchStart, false);
        canvas.addEventListener('touchend', touched, false);
        canvas.addEventListener('touchmove', touchMove, false);
        canvas.addEventListener('contextmenu', contextmenu, false);
        document.body.addEventListener('touchmove', event => event.preventDefault(), false);
        return canvas;
    }

    async setCanvasStyle(canvas: HTMLCanvasElement, left: number, top: number, background: string, zIndex: string): Promise<HTMLCanvasElement> {
        canvas.style.cursor = 'crosshair';
        canvas.style.position = 'absolute';
        canvas.style.left = left + 'px';
        canvas.style.top = top + 'px';
        canvas.style.background = background;
        canvas.style.zIndex = zIndex;
        canvas.style.opacity = '0.5';
        return canvas;
    }

    async setToolboxPositionStyle(toolboxElement: HTMLElement, left: number, top: number): Promise<HTMLElement> {
        toolboxElement.style.left = left + 'px';
        toolboxElement.style.top = top + 'px';
        return toolboxElement;
    }

    async setToolboxStackStyle(toolboxElement: HTMLElement, zIndex: string): Promise<HTMLElement> {
        toolboxElement.style.position = 'absolute';
        toolboxElement.style.zIndex = zIndex;
        return toolboxElement;
    }
}
