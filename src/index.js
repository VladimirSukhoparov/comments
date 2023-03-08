import "normalize.css";
import "./styles/main.scss";

function showCover() {
  let coverDiv = document.createElement("div");
  coverDiv.id = "cover-div";
  document.body.style.overflowY = "hidden";
  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById("cover-div").remove();
  document.body.style.overflowY = "";
}

function showForm() {
  showCover();
  let divForm = document.getElementById("form__add");
  let form = document.getElementById("form");
  let container = document.getElementById("container");

  form.name.value = "";
  form.text.value = "";
  form.formDate.value = "";

  function complete() {
    hideCover();

    divForm.style.display = 'none';
    document.onkeydown = null;

  }

  form.onsubmit = function () {

    let formName = form.name.value;
    let formText = form.text.value;
    let formDate = form.formDate.value;

    let comment = document.createElement("div");
    comment.id = "comment";
    let strName = document.createElement("p");
    strName.id = "comment__str";
    let strText = document.createElement("p");
    strText.id = "comment__str";
    let strDate = document.createElement("p");
    strDate.id = "comment__str";

    let iconTrash = document.createElement("img");
    iconTrash.id = "icon__trash";
    let trash = require('./images/trash.svg');
    iconTrash.setAttribute('src', trash);

    let iconLike = document.createElement("img");
    iconLike.id = "icon__like";
    let like = require('./images/heart.svg');
    iconLike.setAttribute('src', like);

    container.append(comment);
    comment.append(strName, strText, strDate, iconLike, iconTrash);

    strName.innerHTML = formName + ' :';
    strText.innerHTML = formText;

    !formDate ? formDate = new Date() : formDate = new Date(formDate);
    let diff = new Date() - formDate;
    let date = Math.floor(diff / 3600000);
    if (date >= 0 && date < 24) { // менее 1 суток
      strDate.innerHTML = 'Cегодня, ' + formDate.toLocaleTimeString();
    } else if (date >= 24 && date < 48) {
      strDate.innerHTML = 'Вчера, ' + formDate.toLocaleTimeString();
    } else {
      strDate.innerHTML = formDate.toLocaleDateString() + ', ' + formDate.toLocaleTimeString();
    }

    iconLike.addEventListener('click', () => {
      iconLike.className == 'like' ? iconLike.className = '' : iconLike.className = 'like';
    })

    iconTrash.addEventListener('click', () => {
      comment.remove()
    })

    complete();
    return false;
  };


  form.cancel.onclick = function () {
    complete();
  };

  document.onkeydown = function (e) {
    if (e.key == "Escape") {
      complete();
    }
  };

  divForm.style.display = "block";

}

document.getElementById("add__comment").onclick = function () {
  showForm();
};