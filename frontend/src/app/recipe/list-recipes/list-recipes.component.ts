import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppContextService } from 'src/app/app.service';
import { DialogBoxComponent } from 'src/app/global/dialog-box/dialog-box.component';
import { IngredientServiceService } from 'src/app/ingredient/ingredient-service.service';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { DetailedRecipeComponent } from '../detailed-recipe/detailed-recipe.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeServiceService } from '../recipe-service.service';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {

  @ViewChild('recipeForm')
  private recipeForm!: TemplateRef<RecipeFormComponent>;

  @ViewChild('detailedRecipe')
  private detailedRecipe!: TemplateRef<DetailedRecipeComponent>;

  recipe!: Recipe;
  recipes : Array<Recipe> = [];
  allIngredients: { [id: number] : string; } = {};
  
  alertVisibility = false;
  currentDelete : string ="";
  faAddressCard = faPlusCircle;
  
  constructor(private recipeService: RecipeServiceService,
     private ngbModal: NgbModal,
     private appCtx: AppContextService,
     private ingredientService: IngredientServiceService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(data => { 
      this.recipes = data;
      this.appCtx.setRecipesObservable(this.recipes);
    });

    this.ingredientService.onGetAllIngredients().subscribe(data => {
      data.forEach( (element: Ingredient)  => {
        this.allIngredients[element.id] = element.name; 
      });
    });
   console.log(this.allIngredients);
  }

  deleteById(id: number, name: string) {
      this.recipeService.deleteById(id).subscribe(() => {
        this.recipes= this.recipes.filter(i => i.id !== id);
        this.currentDelete = name;
        this.alertVisibility = true;
        this.appCtx.setRecipesObservable(this.recipes);
      });
    }
  
  openModalRecipe(){
    const modal=this.ngbModal.open(DialogBoxComponent);
    modal.componentInstance.name= "Ajouter une nouvelle recette"
    modal.componentInstance.bodyTemplate = this.recipeForm; 
  }

  openModalDetailedRecipe(recipe: Recipe) {
    this.recipe = recipe;
    const modal=this.ngbModal.open(DialogBoxComponent);
    modal.componentInstance.name= `Détails de la recette ${recipe.name}`;
    modal.componentInstance.bodyTemplate = this.detailedRecipe; 
  }
}
