/* global Backbone, $, _ */

$(function(){
    "use strict";
    
    var receipesBook = receipesBook || {};
    
    receipesBook.classes = {};
    
    //---------- Models ----------//
    receipesBook.classes.Recipe = Backbone.Model.extend({
        defaults:{
            receipName: "Nombre de la receta por defecto",
            source: "origen de la receta",
            idCategory: -1,
            vegetarian: false,
            cookingTime: "",
            totalDiners: 0,
            ingredients: [],
            ingredientsAmount:"Amount of ingredients",
            ingredientsMeasureType:"Type of amounts of the ingredients",
            steps: "",
            notes:""
        }
    });
    receipesBook.classes.Ingredient = Backbone.Model.extend({
        name: "Nombre del ingrediente"
    });
    receipesBook.classes.Category = Backbone.Model.extend({
        name: "Nombre de la categoría"
    });
    
    //---------- Collections ----------//
    receipesBook.classes.RecipesCollection = Backbone.Firebase.Collection.extend({
        url: 'https://app-backbone.firebaseio.com/receips',
        autoSync: false,
        model: receipesBook.classes.Recipe
    });
    receipesBook.classes.IngredientsCollection = Backbone.Firebase.Collection.extend({
        url: 'https://app-backbone.firebaseio.com/ingredients',
        autoSync: false,
        model: receipesBook.classes.Ingredient
    });
    receipesBook.classes.CategoriesCollection = Backbone.Firebase.Collection.extend({
        url: 'https://app-backbone.firebaseio.com/categories',
        autoSync: false,
        model: receipesBook.classes.Category
    });
    
    //---------- Views ----------//
    receipesBook.classes.RecipeDetail = Backbone.View.extend({});
    
    receipesBook.classes.IngredientDetail = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#ingredient-item").html()),
        initialize: function(){},
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        
    });
    receipesBook.classes.CategoryDetail = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#category-item").html()),
        initialize: function(){},
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    
    //---------- App ----------//
    receipesBook.classes.App = Backbone.View.extend({
            el: $("#receips-app"),
            events:{
                'click .menuItem': '_doActionMenu',
                 'submit #form-new-ingredient': '_newIngredientSubmit',
                 'submit #form-new-category': '_newCategorySubmit'
            },
            initialize : function(){
                console.log(receipesBook);
                this.listenTo(receipesBook.models.ingredients, 'add', this._AddIngredient); 
                this.listenTo(receipesBook.models.categories, 'add', this._AddCategory); 
                
            },
            _renderInView: function(template){
                $('#view', this.$el).html(template);
            },
            _doActionMenu:function(e){
                var link = e.currentTarget.href.split("#")[1];
                console.log(link);
                switch (link) {
                    case "receips":
                        $('#view', this.$el).html(this._listViewReceips());
                        break;
                    case "ingredients":
                        $('#view', this.$el).html(this._listViewIngredients());
                        break;
                    case "categories":
                        $('#view', this.$el).html(this._listViewCategories());
                        break;                        
                    case "newIngredient":
                        $('#view', this.$el).html(this._newIngredient());
                        break;
                    case "newCategory":
                        $('#view', this.$el).html(this._newCategory());
                        break;
                    default:
                        console.log("Incorrect href in the menu");
                }
                
            },
            _AddIngredient: function (model) {
                console.log(model);
                var newView = new receipesBook.classes.IngredientDetail({model: model});
                receipesBook.views.ingredientsList.push(newView);
            },            
            _newIngredientSubmit: function (event) {
                receipesBook.models.ingredients.add({
                    name:  $('[name=IngredientName]').val(),
                })
                event.preventDefault();
            },
            _AddCategory: function (model) {
                var newView = new receipesBook.classes.CategoryDetail({model: model});
                receipesBook.views.categoriesList.push(newView);
                $('#categories-list').append(newView.render().el);
            },            
            _newCategorySubmit: function (event) {
                event.preventDefault();
                receipesBook.models.categories.add({
                    name:  $('[name=CategorytName]').val()
                })
            },            
            _listViewIngredients: function(){
                receipesBook.models.ingredients.fetch();
                this._renderInView(_.template($('#ingredients').html()));
                var l = receipesBook.views.ingredientsList.length
                for (var i=0;i<l;i++ ) {
                    $('#ingredients-list').append(receipesBook.views.ingredientsList[i].render().el);
                }
            }, 
            _listViewCategories: function(){
                receipesBook.models.categories.fetch();
                this._renderInView(_.template($('#categories').html()));
                var l = receipesBook.views.categoriesList.length
                for (var i=0;i<l;i++ ) {
                    $('#categories-list').append(receipesBook.views.categoriesList[i].render().el);
                }                
            },
            // templates de mi app
            _listViewReceips: _.template($('#receipes').html()),
            _newIngredient: _.template($('#new-ingredient').html()),
            _newCategory: _.template($('#new-category').html())            
    })
    
    //---------- Instances ----------//
    receipesBook.models = {};
    receipesBook.models.categories = new receipesBook.classes.CategoriesCollection();
    receipesBook.models.ingredients = new receipesBook.classes.IngredientsCollection();
    
    receipesBook.views = {};
    receipesBook.views.ingredientsList = [];
    receipesBook.views.categoriesList = [];    
    receipesBook.views.myApp = new receipesBook.classes.App;
});
