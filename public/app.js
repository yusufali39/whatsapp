document
.getElementById("scrollTrigger")
.addEventListener("click", function () {
  document
    .getElementById("form")
    .scrollIntoView({ behavior: "smooth" });
});

function makeBold() {
var textInput = document.getElementById("textInput");
textInput.style.fontWeight = "bold";
}

function makeItalic() {
var textInput = document.getElementById("textInput");
textInput.style.fontStyle = "italic";
}

function makeUnderline() {
var textInput = document.getElementById("textInput");
textInput.style.textDecoration = "underline";
}