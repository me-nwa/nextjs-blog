// types/react-slick.d.ts
declare module 'react-slick' {
    import { Component, ComponentClass } from 'react';
  
    export interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      responsive?: Array<{
        breakpoint: number;
        settings: Settings;
      }>;
      [key: string]: any;
    }
  
    export default class Slider extends Component<Settings> {}
  }
  