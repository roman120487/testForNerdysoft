import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {

  transform(value: any[], userActive: string): any {
    return value.filter(elem => {
      return elem.coAuthor == userActive || elem.author == userActive
    })
  }

}
