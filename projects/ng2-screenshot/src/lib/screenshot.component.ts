import { Component, Input, Inject, forwardRef, OnInit, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ToolboxOptions, Ng2ScreenshotAPI, Rect, ToolboxPosition } from './screenshot.interface';
import { Colors, HightLevelZindex, ToolboxDefaultOptions } from './screenshot.class';
import { DOMProcess } from './screenshot.utils';
import domtoimage from 'dom-to-image';
import * as jq from 'jquery';
const $ = jq;
/**
 * Capture dom setion with indicate element
 */
@Component({
    selector: 'ng2-screenshot',
    template: '<div #container><ng-content></ng-content></div>'
})
export class ScreenshotComponent implements OnInit, OnChanges {
    @ViewChild('container', { static: false }) container: ElementRef;
    @Input('target') target: string;
    @Input('isOpen') isOpen: boolean;
    @Input('toolboxOptions') toolboxOptions: ToolboxOptions;
    @Output('isOpenChange') isOpenChange = new EventEmitter();
    @Output('apiInitialized') api = new EventEmitter<Ng2ScreenshotAPI>();
    public showToolbox = false;
    private cancelText = 'Cancel';
    private downloadText = 'Download';
    private filename = 'screenshot.png';
    private toolboxMargin = 5;
    private interactiveCanvas: HTMLCanvasElement;
    private rect: Rect;
    constructor(
        @Inject(forwardRef(() => Colors)) private colors: Colors,
        @Inject(forwardRef(() => HightLevelZindex)) private hightLevelZindex: HightLevelZindex,
        @Inject(forwardRef(() => ToolboxDefaultOptions)) private defaultOptions: ToolboxDefaultOptions,
        @Inject(forwardRef(() => DOMProcess)) private domprocess: DOMProcess,
    ) { }
    ngOnInit() {
        if (!this.toolboxOptions) {
            this.toolboxOptions = {
                filename: this.defaultOptions.filename,
                cancelText: this.defaultOptions.cancelText,
                downloadText: this.defaultOptions.downloadText
            };
        }
        this.api.emit({
            cancel: this.cancel,
            download: this.download,
            downloadFull: this.downloadFull,
            toPng: this.toPng
        });
        window.onresize = () => {
            this.resizeCanvas();
        };
    }

    ngOnChanges(item: any) {
        const { isOpen, toolboxOptions } = item;
        switch (isOpen.currentValue) {
            case true:
                this.openScreenshot();
                break;
            case false:
                this.closeScreenshot();
                break;
            default:
                this.closeScreenshot();
                break;
        }
        if (toolboxOptions) {
            this.cancelText = toolboxOptions.cancelText ? toolboxOptions.cancelText : this.cancelText;
            this.downloadText = toolboxOptions.downloadText ? toolboxOptions.downloadText : this.downloadText;
            this.filename = toolboxOptions.filename ? toolboxOptions.filename : this.filename;
        }
    }

    private calculateToolboxPosition = (
        offsetLeft: number,
        offsetTop: number,
        rect: Rect,
        toolboxWidth: number,
        toolboxHeight: number
    ): ToolboxPosition => {
        let left = offsetLeft + rect.startX + rect.w;
        let top = offsetTop + rect.startY + rect.h;
        if (rect.w >= 0) {
            left -= toolboxWidth;
        }
        if (rect.h >= 0) {
            top += this.toolboxMargin;
        } else {
            top = top - toolboxHeight - this.toolboxMargin;
        }
        return {
            left,
            top
        };
    }

    public cancel = () => {
        this.showToolbox = false;
        this.domprocess.clearCanvasRect(this.interactiveCanvas);
    }

    public download = () => {
        this.isOpenChange.emit(false);
        window.setTimeout(() => {
            const elementSelector = this.getElementSelector();
            const element = elementSelector[0];
            const options = this.getOptions(element);
            domtoimage
                .toPng(element, options)
                .then(this.domprocess.dataUrlToImage)
                .then((image: HTMLImageElement) => {
                    this.domprocess.remove(image);
                    return this.domprocess.clipImageToCanvas(
                        image,
                        this.rect.startX,
                        this.rect.startY,
                        this.rect.w,
                        this.rect.h
                    );
                })
                .then((canvas: HTMLCanvasElement) => this.domprocess.downloadCanvas(canvas, this.toolboxOptions.filename))
                .then(this.domprocess.remove)
                .catch((error: Error) => console.error(error));
        });
    }

    private downloadFull = () => {
        this.isOpenChange.emit(false);
        window.setTimeout(() => {
            const elementSelector = this.getElementSelector();
            const element = elementSelector[0];
            const options = this.getOptions(element);
            domtoimage
                .toPng(element, options)
                .then((imageUrl: string) => this.domprocess.downloadByUrl(imageUrl, this.toolboxOptions.filename))
                .catch((error: Error) => console.error(error));
        });
    }

    private findMaxZindex = (): number => {
        let zMax = 0;
        $('body *').each(function() {
            const zIndexStr: string = $(this).css('zIndex');
            const zIndex: number = parseInt(zIndexStr, 10);
            if (zIndex && zIndex > zMax) {
                zMax = zIndex;
            }
        });
        return zMax;
    }

    private getElementSelector = (): JQuery<HTMLElement> => {
        return this.target
            ? $(this.target)
            : $(this.container.nativeElement).filter((index: number, element: HTMLElement) => {
                const elementName = element.tagName.toLowerCase();
                return elementName !== 'screenshot-toolbox';
            });
    }

    private getOptions = (element: HTMLElement) => {
        const boudingClientRect = element.getBoundingClientRect();
        let options = {
            width: boudingClientRect.width,
            height: boudingClientRect.height
        };
        if (this.domprocess.isTransparent(element)) {
            const parentBackgroundColor = this.domprocess.getStyle(element, 'backgroundColor');
            options = Object.assign({}, options, { bgcolor: parentBackgroundColor });
        }
        return options;
    }

    private setHightLevelZindex = () => {
        const maxZindex = this.findMaxZindex();
        this.hightLevelZindex.second = maxZindex + 1;
        this.hightLevelZindex.top = this.hightLevelZindex.second + 1;
    }

    private toPng = (callback: (url: string) => void): Promise<string> =>
        new Promise((resolve, reject) => {
            this.isOpenChange.emit(false);
            window.setTimeout(() => {
                const elementSelector = this.getElementSelector();
                const element = elementSelector[0];
                const options = this.getOptions(element);
                return domtoimage
                    .toPng(element, options)
                    .then(this.domprocess.dataUrlToImage)
                    .then((image: HTMLImageElement) => {
                        this.domprocess.remove(image);
                        return this.domprocess.clipImageToCanvas(
                            image,
                            this.rect.startX,
                            this.rect.startY,
                            this.rect.w,
                            this.rect.h
                        );
                    })
                    .then((canvas: HTMLCanvasElement) => {
                        const url = canvas.toDataURL('image/png');
                        if (callback) {
                            callback(url);
                        }
                        resolve(url);
                    })
                    .catch((error: Error) => {
                        console.error(error);
                        reject(error);
                    });
            });
        })

    public canvasMousedownListener = () => {
        this.showToolbox = false;
    }

    public canvasMouseupListener = (canvas: HTMLCanvasElement, rect: Rect) => {
        if (rect.w !== 0 && rect.h !== 0) {
            // this.showToolbox = false;
            this.rect = rect;
            const toolbox = $(this.container.nativeElement).find('ng2-screenshot-toolbox');
            console.log(toolbox.outerWidth());
            // console.log(toolbox.width())
            // // const toolbox = $('ng2-screenshot-toolbox');
            const toolboxElement = toolbox.get(0);
            
            console.log(toolboxElement.clientWidth) 
            console.log(this.hightLevelZindex)
            /**
             * toolbox position setting
             * because read elememt's width sould indicated postion method, so we set position method first then move location with dom.
             */
            this.domprocess
                .setToolboxStackStyle(toolboxElement, this.hightLevelZindex.top.toString())
                // .then(this.domprocess.appendToBody)
                .then(element => {
                    const position = this.calculateToolboxPosition(
                        canvas.offsetLeft,
                        canvas.offsetTop,
                        rect,
                        element.offsetWidth,
                        element.offsetHeight
                    );
                    return this.domprocess.setToolboxPositionStyle(element, position.left, position.top);
                })
                .then(element => {
                    this.showToolbox = true;
                });
        }
    }

    public canvasContextmenuListener = () => {
        this.isOpenChange.emit(false);
    }

    private closeScreenshot = () => {
        this.domprocess.remove(this.interactiveCanvas);
        this.showToolbox = false;
    }

    private openScreenshot() {
        const elementSelector = this.getElementSelector();
        const boudingClientRect = elementSelector[0].getBoundingClientRect();
        const width = boudingClientRect.width;
        const height = boudingClientRect.height;
        const offset = elementSelector.offset();
        const left = offset.left;
        const top = offset.top;
        this.setHightLevelZindex();

        this.domprocess
            .createCanvas(width, height)
            .then(canvas =>
                this.domprocess.setCanvasStyle(
                    canvas,
                    left,
                    top,
                    this.colors.gray,
                    this.hightLevelZindex.second.toString()
                )
            )
            .then(this.domprocess.appendToBody)
            .then(canvas =>
                this.domprocess.listenInteractiveCanvas(
                    canvas,
                    this.colors.lightGray,
                    this.canvasMouseupListener,
                    this.canvasMousedownListener,
                    this.canvasContextmenuListener
                )
            )
            .then(canvas => (this.interactiveCanvas = canvas));
    }

    private resizeCanvas = () => {
        if (!this.interactiveCanvas) {
            return;
        }
        const elementSelector = this.getElementSelector();
        const boudingClientRect = elementSelector[0].getBoundingClientRect();
        const width = boudingClientRect.width;
        const height = boudingClientRect.height;
        const offset = elementSelector.offset();
        const left = offset.left;
        const top = offset.top;
        this.interactiveCanvas.width = width;
        this.interactiveCanvas.height = height;
        this.domprocess
            .setCanvasStyle(
                this.interactiveCanvas,
                left,
                top,
                this.colors.gray,
                this.hightLevelZindex.second.toString()
            )
            .then(() => this.showToolbox = false);
    }
}
