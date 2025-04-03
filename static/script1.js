var loader=document.getElementById("load");
loader.style.display="none"

const value = document.querySelector("#length");
const input = document.querySelector("#input-range");
var count;

count= input.value;
value.textContent =" Length: "+count;
input.addEventListener("input", (event) => {
  count = event.target.value;
  value.textContent=" Length: "+count;
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("summarizeButton").addEventListener("click", function () {
        
        let inputText = document.getElementById("inputText").value;
        loader.style.display="block";
        
        document.getElementById("outputText").innerText = ""; 
        let formData = new FormData();
        let inputcount=inputText.split(' ');

        document.getElementById("input-count").textContent=inputcount.length;
       
        formData.append("inputText", inputText);  // Ensure the key matches Flask's request.form.get('inputText')
        formData.append("length",count);

        fetch('/process', {
            method: "POST",
            body: formData
        })
        .then(response => response.text())  // Ensure Flask returns plain text
        .then(summary => {
            loader.style.display='none'
            document.getElementById("outputText").innerText = summary; 
            let outcount=summary.split(' ')
            document.getElementById("output-count").textContent=outcount.length;
        })
        .catch(error => console.error("Error:", error));
    });
});



