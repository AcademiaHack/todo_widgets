var Tasks = function(container, data){
  this.url = 'http://private-7091-todo3.apiary-mock.com/tasks/'
  this.container = container;

  if(data) {
    this.init(data);
    this.appendToContainer();
  } else {
    this.getData();
  }
}

Tasks.prototype.init = function(data) {
  var task;
  this.tasks = [];

  for(var i = 0; i < data.length; i ++) {
    task = new Task(null, data[i]);
    this.tasks.push(task);
  }
};

Tasks.prototype.draw = function() {
  var widget = $("<div/>",{class:'row'});

  for(var i = 0; i < this.tasks.length; i++) {
    widget.append(this.tasks[i].draw());
  }
  return widget;
};

//En el resto del archivo hay metodos que todos los widgets comparten (esto deberia ser heredado pero es poco didactico)

Tasks.prototype.getData = function(){
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

Tasks.prototype.clearContainer = function() {
  console.log("Cleaning the container");
  this.container.html("");
}

Tasks.prototype.appendToContainer = function() {
  console.log("Trying to append to container");
  if(this.container) {
    this.container.append(this.draw());
  } else {
    console.log("Couldn't append to container: Container not set");
  }

};
