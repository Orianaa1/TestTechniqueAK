import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";


@Injectable({
	providedIn: "root"
})
export class PersonService {

	constructor(private http: HttpClient) {
	}
	
	//Génère la liste de personne par rapport aux filtres sélectionnés
	getPersons(config: GenerationConfig): Observable<Person[]> {
		//On récupère les valeurs des checkboxes
		const gender = config.male ? 'Male' : 'Female';	
		
		//On instancie une fois le json dans la map mapPersons
		const mapPersons = this.http.get<Person[]>("/assets/data/persons.json");
		
		//Gestion d'exception
		if((!config.male && !config.female) || config.count > 1000 || config.count <= 0){
			throw new Error('Sélectionner un genre');
		}

		//Si un seul genre sélectionné
		if (!config.male || !config.female){
			return mapPersons
				.pipe( //.pipe pour utiliser les fonctions "map" & "filter" & "slice" en meme temps
					map((persons: Person[])=>persons.filter((person: Person)=>person.gender === gender).slice( 1, config.count)) // Map va créer un tableau de personne à partir du json | Filter va permettre de filter les personne par leur genre |
				)																											// .slice limitera le nombre de personnes affichées par rapport au filtre																												 
		}
		//Si les deux genres sélectionnés
		else {
			return mapPersons
				.pipe(
					map((persons: Person[])=>persons.slice( 1, config.count))
				)
		}
		
	}
}

