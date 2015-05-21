var Categories = function(container, data){
  this.url = 'http://private-7091-todo3.apiary-mock.com/categories'
  this.container = container;

  if(data) {
    this.init(data);
    this.appendToContainer();
  } else {
    this.getData();
  }
}

Categories.prototype.init = function(data) {
  var category;
  this.categories = [];

  for(var i = 0; i < data.length; i ++) {
    category = new Category(null, data[i]);
    this.categories.push(category);
  }
};

Categories.prototype.draw = function() {
  var widget = $("<div/>",{class:'row'});

  for(var i = 0; i < this.categories.length; i++) {
    widget.append(this.categories[i].draw());
  }
  return widget;
};

//En el resto del archivo hay metodos que todos los widgets comparten (esto deberia ser heredado pero es poco didactico)

Categories.prototype.getData = function(){
  var self = this;

  console.log("Retreive data from server");
  $.ajax({
    type:'get',
    url: this.url,
    success: function(data){
      console.log("Data retreive success!");
      self.init(data);
      self.appendToContainer();
    },
    error: function(xhr){
      console.log("Data retreive failed!");
    }
  });
};

Categories.prototype.clearContainer = function() {
  console.log("Cleaning the container");
  this.container.html("");
}

Categories.prototype.appendToContainer = function() {
  console.log("Trying to append to container");
  if(this.container) {
    this.container.append(this.draw());
  } else {
    console.log("Couldn't append to container: Container not set");
  }

};
