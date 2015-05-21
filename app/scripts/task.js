var Task = function(container, data){
  this.url = 'http://private-7091-todo3.apiary-mock.com/tasks/'
  this.container = container;

  if(container) {
    this.id = container.data('task');
  }

  if(data) {
    this.init(data);
    this.appendToContainer();
  } else {
    this.getData();
  }

}

Task.prototype.init = function(data) {
  this.id = data.id;
  this.title = data.title;
  this.date = data.date;
  this.status = data.status;
};

Task.prototype.draw = function() {
  widget = $("<div/>",{id:'task_'+this.id,class:"col m5"}).append(
    $("<div/>",{class:"card"}).append(
      $("<div/>",{class:"card-image waves-effect waves-block waves-light"}).append(
        $("<img/>",{class:"activator", src:"http://acw.uk.com/blog/image.axd?picture=%2F2014%2F11%2Fbabyinasuit.jpg"})
      ),
      $("<div/>",{class:"card-content"}).append(
        $("<span/>",{class:"card-title activator grey-text text-darken-4"}).html(this.title),
        $("<i/>",{class:"mdi-navigation-more-vert right"}),
        $("<p/>").append(
          $("<input/>",{type:"checkbox", id:'checkbox_'+this.id}),
          $("<label/>",{for:'checkbox_'+this.id}).html('Listo!')
        )
      ),
      $("<div/>",{class:"card-reveal"}).append(
        $("<span/>",{class:"card-title grey-text text-darken-4"}).html(this.title),
        $("<i/>",{class:"mdi-navigation-close right"}),
        $("<p/>").html('Descripcion de la tarea')
      )
    )

  );
  return widget;
};

//En el resto del archivo hay metodos que todos los widgets comparten (esto deberia ser heredado pero es poco didactico)

Task.prototype.getData = function(){
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

Task.prototype.clearContainer = function() {
  console.log("Cleaning the container");
  this.container.html("");
}

Task.prototype.appendToContainer = function() {
  console.log("Trying to append to container");
  if(this.container) {
    this.container.append(this.draw());
  } else {
    console.log("Couldn't append to container: Container not set");
  }

};
