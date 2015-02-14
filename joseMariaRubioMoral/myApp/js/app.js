/* global Backbone, $, _ */

$(function(){
    "use strict";
    
    var receipsBook = receipsBook || {};
    
    receipsBook.classes = {};
    
    //---------- Models ----------//
    receipsBook.classes.Recipe = Backbone.Model.extend({
        defaults:{
            receipName: "Nombre de la receta por defecto",
            source: "origen de la receta",
            idCategory: -1,
            vegetarian: false,
            cookingTime: "",
            totalDiners: 0,
            ingredients: [],
            steps: "",
            notes:""
        }
    });
    receipsBook.classes.Ingredient = Backbone.Model.extend({
        name: "Nombre del ingrediente"
    });
    receipsBook.classes.Category = Backbone.Model.extend({
        name: "Nombre de la categoría"
    });
    
    //---------- Collections ----------//
    receipsBook.classes.RecipesCollection = Backbone.Collection.extend({
        model: receipsBook.classes.Recipe
    });
    receipsBook.classes.IngredientsCollection = Backbone.Firebase.Collection.extend({
        url: 'https://app-backbone.firebaseio.com/ingredients',
        model: receipsBook.classes.Ingredient
    });
    receipsBook.classes.CategoryCollection = Backbone.Firebase.Collection.extend({
        url: 'https://app-backbone.firebaseio.com/categories',
        model: receipsBook.classes.Category
    });
    
    //---------- Views ----------//
    receipsBook.classes.RecipeDetail = Backbone.View.extend({});
    receipsBook.classes.IngredientDetail = Backbone.View.extend({});
    receipsBook.classes.CategoryDetail = Backbone.View.extend({});
    receipsBook.classes.RecipesSearch = Backbone.View.extend({});
    
    //---------- App ----------//
    receipsBook.classes.App = Backbone.View.extend({
            el: $("#receipsApp"),
            events:{
                'click .menuItem': '_doActionMenu',
                 'submit #formNewIngredient': '_newIngredientSubmit'
            },
            initialize : function(){
                console.log(receipsBook);
            },
            _doActionMenu:function(e){
                var link = e.currentTarget.href.split("#")[1];
                console.log(link);
                switch (link) {
                    case "receipsList":
                        $('#view', this.$el).html(this._listViewReceips());
                        break;
                    case "ingredientsList":
                        $('#view', this.$el).html(this._listViewIngredients());
                        break;
                    case "newIngredient":
                        $('#view', this.$el).html(this._newIngredient());
                        break;
                    default:
                        console.log("Incorrect href in the menu");
                }
                
            },
            _newIngredientSubmit: function (event) {
                console.log('submit');
                receipsBook.models.Ingredients.add({
                    name:  $('[name=IngredientName]').val(),
                })
                event.preventDefault();
            },
            // templates de mi app
            _listViewReceips: _.template($('#listReceips').html()),
            _listViewIngredients: _.template($('#listIngredients').html()),
            _newIngredient: _.template($('#newIngredient').html())
            
    })
    
    //---------- Instances ----------//
    receipsBook.models = {};
    receipsBook.models.Ingredients = new receipsBook.classes.IngredientsCollection();
    receipsBook.views = {};
    receipsBook.views.myApp = new receipsBook.classes.App;
});
