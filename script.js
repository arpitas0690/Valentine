function showThought(num, event) {
    let thought = document.getElementById(`thought_${num}`);
    if (!thought) {
        console.warn(`❌ No thought bubble found for flower ${num}`);
        return;
    }
    console.log(`✅ Showing thought bubble for Flower ${num}`);

    let flower = document.getElementById(`flower_${num}`);
    if (!flower) {
        console.warn(`❌ Flower ${num} not found!`);
        return;
    }

    let flowerRect = flower.getBoundingClientRect();
    let x = flowerRect.left + window.scrollX + flowerRect.width / 2;
    let y = flowerRect.top + window.scrollY - 30; /* Adjust height to prevent overlap */

    thought.style.display = "block";
    thought.style.left = `${x}px`;
    thought.style.top = `${y}px`;
    thought.classList.add("visible");
}

// Allow multiple thought bubbles to be visible at the same time
document.addEventListener("click", function(event) {
    if (!event.target.closest(".flower")) {
        document.querySelectorAll(".thought-bubble").forEach(bubble => {
            if (!bubble.classList.contains("visible")) {
                bubble.style.display = "none";
            }
        });
    }
});




// Hide thought bubbles when clicking anywhere outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".flower")) {
        document.querySelectorAll(".thought-bubble").forEach(bubble => {
            bubble.style.display = "none";
        });
    }
});

document.addEventListener("click", function(event) {
    console.log("🖱 Click detected on:", event.target);
});

document.addEventListener("DOMContentLoaded", function () {
    function updateClickArea() {
        document.querySelectorAll(".flower").forEach(flower => { //Extract number
            let num = flower.id.replace("flower_", ""); // Get flower number
            let clickArea = document.getElementById(`flower-${num}-area`);
            let thoughtBubble = document.getElementById(`thought_${num}`);

            if (flower && clickArea && thoughtBubble) {
                let flowerRect = flower.getBoundingClientRect();

                clickArea.style.width = `${flowerRect.width}px`;
                clickArea.style.height = `${flowerRect.height * 0.5}px`;
                clickArea.style.left = `${flowerRect.left + window.scrollX + flowerRect.width * 0.25}px`;
                clickArea.style.top = `${flowerRect.top + window.scrollY + flowerRect.height * 0.28}px`;
            
            //Update Thought Bubble Position
            thoughtBubble.style.left = `${flowerRect.left + window.scrollX + flowerRect.width /2}px`;
            thoughtBubble.style.top = `${flowerRect.top + window.scrollY - 50}px`;
            thoughtBubble.style.zIndex = "50";
            
            console.log(`Bubble ${num} position at:`, {
                left: thoughtBubble.style.left,
                top: thoughtBubble.style.top
            });
            
                // Add click event listener
            clickArea.addEventListener("click", function() {
                console.log( 'Clicked on fliwer ${num}');
                if (thoughtBubble.style.display ==="block") {
                    thoughtBubble.style.display = "none";
                } else {
                    thoughtBubble.style.display = "block";
                }
            })
            
            }

        });
    }

    window.addEventListener("resize", updateClickArea);
    updateClickArea();
});
