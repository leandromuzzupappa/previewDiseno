const handleEvent = (obj, evt, handler) => {
  if (obj.addEventListener) {
    // W3C method
    obj.addEventListener(evt, handler, false);
  } else if (obj.attachEvent) {
    // IE method.
    obj.attachEvent('on' + evt, handler);
  } else {
    obj['on' + evt] = handler;
  }
}

if (window.FileReader) {
  var drop;

  handleEvent(window, 'load', () => {

    const status = document.querySelector('#status');
    drop = document.querySelector('#drop');
    const list = document.querySelector('#list');

    const cancel = (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    }

    // add event drop to target
    handleEvent(drop, 'dragover', cancel);
    handleEvent(drop, 'dragenter', cancel);

    handleEvent(drop, 'drop', (e) => {
      e = e || window.event; // get window.event if IE
      if (e.preventDefault) {
        e.preventDefault();
      } // stop browser redirect to img path

      var dt = e.dataTransfer;
      var files = dt.files;
      for (let i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.readAsDataURL(file);
        
        handleEvent(reader, 'loadend', function (e, file) {
          var bin = this.result;
          var newFile = document.createElement('div');

          list.appendChild(newFile);
          var fileNumber = list.getElementsByTagName('div').length;
          
          status.innerHTML = fileNumber < files.length ?
            '100%' + fileNumber + ' de ' + files.length + '...' :
            'Subiste ' + fileNumber + ' archivo : ' + file.name + ' size ' + file.size + ' B';

          var img = document.createElement("img");
          img.file = file;
          img.src = bin;
          list.appendChild(img);

          console.log( list.appendChild(img) )


        }.bindHandleEvent(file));
      }
      return false;
    });
    Function.prototype.bindHandleEvent = function bindHandleEvent() {
      var handler = this;
      var boundParameters = Array.prototype.slice.call(arguments);
      //create closure
      return function (e) {
        e = e || window.event; 
        boundParameters.unshift(e);
        handler.apply(this, boundParameters);
      }
    };
  });

} else {
  document.querySelector('#status').innerHTML = 'El navegador no acepta FileReader';
}


// Bind keyboard T to toggle status
toggleSubir = () => {
  let ua = document.querySelector('#uploadArea');
  ua.classList.toggle('ocultar');
}
handleEvent(document, 'keydown', (e) => {
  e = e || window.event;
  let key = e.which || e.keyCode;
  key === 84 ? toggleSubir() : '' ;
})