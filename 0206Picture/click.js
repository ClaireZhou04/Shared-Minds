const sentences = ["Hello!", "How are you today?", "Nice to meet you!"];

// Function to display a sentence from the array
function displaySentence() {
    // Get a random index from the array
    const randomIndex = Math.floor(Math.random() * sentences.length);
    
    // Create a new paragraph element
    const paragraph = document.createElement("p");
    
    // Set the font weight to bold
    paragraph.style.fontWeight = "bold";
    
    paragraph.textContent = sentences[randomIndex];
    
    document.body.appendChild(paragraph);
}

// Attach event listener to mouse click event
document.addEventListener("click", displaySentence);
// Create a textbox element
const textbox = document.createElement("input");

// Set the position of the textbox to the middle of the canvas
textbox.style.position = "absolute";
textbox.style.left = "50%";
textbox.style.top = "50%";
textbox.style.transform = "translate(-50%, -50%)";

// Append the textbox to the document body
document.body.appendChild(textbox);\

