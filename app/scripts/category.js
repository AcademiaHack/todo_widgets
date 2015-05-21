var Category = function(container, data){
  this.url = 'http://private-7091-todo3.apiary-mock.com/categories/'
  this.container = container;

  if(container) {
    this.id = container.data('category');
  }

  if(data) {
    this.init(data);
    this.appendToContainer();
  } else {
    this.getData();
  }

}

Category.prototype.init = function(data) {
  this.id = data.id;
  this.name = data.name;
  this.tasks = data.tasks;
};

Category.prototype.draw = function() {
  var widget;
  var tasks;

  tasks = new Tasks(null, this.tasks);
  widget = $("<div/>",{class:"row"}).append(
    $("<div/>",{class:"col m12"}).html(
      this.name
    ),
    $("<div/>").addClass("row").append(
      tasks.draw()
    )
  );
  return widget;
};

//En el resto del archivo hay metodos que todos los widgets comparten (esto deberia ser heredado pero es poco didactico)

Category.prototype.getData = function(){
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

Category.prototype.clearContainer = function() {
  console.log("Cleaning the container");
  this.container.html("");
}

Category.prototype.appendToContainer = function() {
  console.log("Trying to append to container");
  if(this.container) {
    this.container.append(this.draw());
  } else {
    console.log("Couldn't append to container: Container not set");
  }

};
