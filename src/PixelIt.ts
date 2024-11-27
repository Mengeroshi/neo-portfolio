/**
 * pixelit - convert an image to Pixel Art, with/out grayscale and based on a color palette.
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 **/

interface PixelitConfig {
  to?: string;
  from?: string;
  scale?: number;
  palette?: number[][];
  maxHeight?: number;
  maxWidth?: number;
}

export class Pixelit {
  private drawto: HTMLCanvasElement;
  private drawfrom: HTMLImageElement;
  private scale: number;
  private palette: number[][];
  private maxHeight?: number;
  private maxWidth?: number;
  private ctx: CanvasRenderingContext2D;
  private endColorStats: Record<string, number>;

  constructor(config: PixelitConfig = {}) {
    this.drawto = config.to
      ? (document.getElementById(config.to) as HTMLCanvasElement)
      : (document.getElementById("pixelitcanvas") as HTMLCanvasElement);
    this.drawfrom = config.from
      ? (document.getElementById(config.from) as HTMLImageElement)
      : (document.getElementById("pixelitimg") as HTMLImageElement);
    this.hideFromImg();
    this.drawfrom.crossOrigin = "Anonymous";
    this.scale =
      config.scale && config.scale > 0 && config.scale <= 50
        ? config.scale * 0.01
        : 8 * 0.01;
    this.palette = config.palette ?? [
      [140, 143, 174],
      [88, 69, 99],
      [62, 33, 55],
      [154, 99, 72],
      [215, 155, 125],
      [245, 237, 186],
      [192, 199, 65],
      [100, 125, 52],
      [228, 148, 58],
      [157, 48, 59],
      [210, 100, 113],
      [112, 55, 127],
      [126, 196, 193],
      [52, 133, 157],
      [23, 67, 75],
      [31, 14, 28],
    ];
    this.maxHeight = config.maxHeight;
    this.maxWidth = config.maxWidth;
    this.ctx = this.drawto.getContext("2d", { willReadFrequently: true })!;
    this.endColorStats = {};
  }

  private hideFromImg(): this {
    this.drawfrom.style.visibility = "hidden";
    this.drawfrom.style.position = "fixed";
    this.drawfrom.style.top = "0";
    this.drawfrom.style.left = "0";
    return this;
  }

  public setFromImgSource(src: string): this {
    this.drawfrom.src = src;
    return this;
  }

  public setDrawFrom(elem: HTMLImageElement): this {
    this.drawfrom = elem;
    return this;
  }

  public setDrawTo(elem: HTMLCanvasElement): this {
    this.drawto = elem;
    return this;
  }

  public setPalette(arr: number[][]): this {
    this.palette = arr;
    return this;
  }

  public setMaxWidth(width: number): this {
    this.maxWidth = width;
    return this;
  }

  public setMaxHeight(height: number): this {
    this.maxHeight = height;
    return this;
  }

  public setScale(scale: number): this {
    this.scale = scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01;
    return this;
  }

  public getPalette(): number[][] {
    return this.palette;
  }

  private colorSim(rgbColor: number[], compareColor: number[]): number {
    let d = 0;
    for (let i = 0; i < rgbColor.length; i++) {
      const rgbVal = rgbColor[i] ?? 0;
      const compareVal = compareColor[i] ?? 0;
      d += (rgbVal - compareVal) * (rgbVal - compareVal);
    }
    return Math.sqrt(d);
  }

  private similarColor(actualColor: number[]): number[] {
    let selectedColor: number[] = [];
    let currentSim = this.colorSim(actualColor, this.palette[0] ?? [0, 0, 0]);

    this.palette.forEach((color) => {
      const nextColor = this.colorSim(actualColor, color);
      if (nextColor < currentSim) {
        // Use strict comparison for closer match
        selectedColor = color;
        currentSim = nextColor;
      }
    });
    return selectedColor;
  }

  public pixelate(): this {
    this.drawto.width = this.drawfrom.naturalWidth;
    this.drawto.height = this.drawfrom.naturalHeight;
    let scaledW = this.drawto.width * this.scale;
    let scaledH = this.drawto.height * this.scale;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.drawto.width;
    tempCanvas.height = this.drawto.height;
    tempCanvas.style.visibility = "hidden";
    tempCanvas.style.position = "fixed";
    tempCanvas.style.top = "0";
    tempCanvas.style.left = "0";

    if (this.drawto.width > 900 || this.drawto.height > 900) {
      this.scale *= 0.5;
      scaledW = this.drawto.width * this.scale;
      scaledH = this.drawto.height * this.scale;
      tempCanvas.width = Math.max(scaledW, scaledH) + 50;
      tempCanvas.height = Math.max(scaledW, scaledH) + 50;
    }

    const tempContext = tempCanvas.getContext("2d")!;
    tempContext.drawImage(this.drawfrom, 0, 0, scaledW, scaledH);
    document.body.appendChild(tempCanvas);

    this.ctx.imageSmoothingEnabled = false;

    let finalWidth = this.drawfrom.naturalWidth;
    if (this.drawfrom.naturalWidth > 300) {
      finalWidth +=
        this.drawfrom.naturalWidth > this.drawfrom.naturalHeight
          ? parseInt(
              (
                this.drawfrom.naturalWidth /
                (this.drawfrom.naturalWidth * this.scale)
              ).toString(),
            ) / 1.5
          : parseInt(
              (
                this.drawfrom.naturalWidth /
                (this.drawfrom.naturalWidth * this.scale)
              ).toString(),
            );
    }

    let finalHeight = this.drawfrom.naturalHeight;
    if (this.drawfrom.naturalHeight > 300) {
      finalHeight +=
        this.drawfrom.naturalHeight > this.drawfrom.naturalWidth
          ? parseInt(
              (
                this.drawfrom.naturalHeight /
                (this.drawfrom.naturalHeight * this.scale)
              ).toString(),
            ) / 1.5
          : parseInt(
              (
                this.drawfrom.naturalHeight /
                (this.drawfrom.naturalHeight * this.scale)
              ).toString(),
            );
    }

    this.ctx.drawImage(
      tempCanvas,
      0,
      0,
      scaledW,
      scaledH,
      0,
      0,
      finalWidth,
      finalHeight,
    );

    tempCanvas.remove();
    return this;
  }

  public convertGrayscale(): this {
    const imgPixels = this.ctx.getImageData(
      0,
      0,
      this.drawto.width,
      this.drawto.height,
    );
    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        const i = y * 4 * imgPixels.width + x * 4;
        const avg =
          ((imgPixels.data[i] ?? 0) +
            (imgPixels.data[i + 1] ?? 0) +
            (imgPixels.data[i + 2] ?? 0)) /
          3;
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
      }
    }
    this.ctx.putImageData(
      imgPixels,
      0,
      0,
      0,
      0,
      imgPixels.width,
      imgPixels.height,
    );
    return this;
  }

  public convertPalette(mainColor: string): this {
    const imgPixels = this.ctx.getImageData(
      0,
      0,
      this.drawto.width,
      this.drawto.height,
    );

    // Convert the main color from HEX to RGB
    const hexToRgb = (hex: string): number[] => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      return [
        (bigint >> 16) & 255, // Red
        (bigint >> 8) & 255, // Green
        bigint & 255, // Blue
      ];
    };

    const neonColor = hexToRgb(mainColor); // Neon highlight color (e.g., #3ECFDE)
    const shadowColor = [10, 20, 30]; // Tron-like shadow color

    for (let y = 0; y < imgPixels.height; y++) {
      for (let x = 0; x < imgPixels.width; x++) {
        const i = y * 4 * imgPixels.width + x * 4;

        // Extract original RGB values
        const r = imgPixels.data[i] ?? 0;
        const g = imgPixels.data[i + 1] ?? 0;
        const b = imgPixels.data[i + 2] ?? 0;

        // Step 1: Convert the color to grayscale to measure brightness
        const grayscale = 0.3 * r + 0.59 * g + 0.11 * b;

        // Step 2: Apply Tron-like color transformation based on brightness
        if (grayscale > 128) {
          // Bright areas -> Neon color
          imgPixels.data[i] = neonColor[0] ?? 0; // Red channel
          imgPixels.data[i + 1] = neonColor[1] ?? 0; // Green channel
          imgPixels.data[i + 2] = neonColor[2] ?? 0; // Blue channel
        } else {
          // Dark areas -> Shadow color
          imgPixels.data[i] = shadowColor[0] ?? 0; // Red channel
          imgPixels.data[i + 1] = shadowColor[1] ?? 0; // Green channel
          imgPixels.data[i + 2] = shadowColor[2] ?? 0; // Blue channel
        }
      }
    }

    // Apply the updated pixel data to the canvas
    this.ctx.putImageData(
      imgPixels,
      0,
      0,
      0,
      0,
      imgPixels.width,
      imgPixels.height,
    );

    return this;
  }

  public resizeImage(): this | number {
    if (!this.maxWidth && !this.maxHeight) {
      return 0;
    }

    const canvasCopy = document.createElement("canvas");
    const copyContext = canvasCopy.getContext("2d")!;
    let ratio = 1.0;

    if (this.maxWidth && this.drawto.width > this.maxWidth) {
      ratio = this.maxWidth / this.drawto.width;
    }
    if (this.maxHeight && this.drawto.height > this.maxHeight) {
      ratio = this.maxHeight / this.drawto.height;
    }

    canvasCopy.width = this.drawto.width;
    canvasCopy.height = this.drawto.height;
    copyContext.drawImage(this.drawto, 0, 0);

    this.drawto.width = this.drawto.width * ratio;
    this.drawto.height = this.drawto.height * ratio;
    this.ctx.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      this.drawto.width,
      this.drawto.height,
    );

    return this;
  }

  public draw(): this {
    this.drawto.width = this.drawfrom.width;
    this.drawto.height = this.drawfrom.height;
    this.ctx.drawImage(this.drawfrom, 0, 0);
    this.resizeImage();
    return this;
  }

  public saveImage(): void {
    const link = document.createElement("a");
    link.download = "pxArt.png";
    link.href = this.drawto
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    document.querySelector("body")!.appendChild(link);
    link.click();
    document.querySelector("body")!.removeChild(link);
  }
}
