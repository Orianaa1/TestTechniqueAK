import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateGendersToFrench'
})
export class TranslateGendersToFrenchPipe implements PipeTransform {
    transform(gender: string): string {
			switch(gender){
				case "Male":
					return "Homme";
				case "Female":
					return "Femme";
			}
		}
  }

