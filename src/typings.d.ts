declare module "*.json" {
  const value: any;
  export default value;
}

export interface Coordinates2d {
  x: number
  y: number
}

export interface Dimensions2d {
  width: number
  height: number
}

export interface Coordinates3d {
  x: number
  y: number
  z: number
}

export interface Dimensions3d {
  width: number
  height: number
  depth: number
}