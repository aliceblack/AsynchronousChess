import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chesspiece'
})
export class ChesspiecePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value===null){
      return ".";
    }
    if(value.color==="b"){
      if(value.type==="k"){
        return "♚";
      }else if(value.type==="q"){
        return "♛";
      }else if(value.type==="r"){
        return "♜";
      }else if(value.type==="b"){
        return "♝";
      }else if(value.type==="n"){
        return "♞";
      }else if(value.type==="p"){
        return "♟︎";
      }
    }else if(value.color==="w"){
      if(value.type==="k"){
        return "♔";
      }else if(value.type==="q"){
        return "♕";
      }else if(value.type==="r"){
        return "♖";
      }else if(value.type==="b"){
        return "♗";
      }else if(value.type==="n"){
        return "♘";
      }else if(value.type==="p"){
        return "♙";
      }
    }
  }

}
