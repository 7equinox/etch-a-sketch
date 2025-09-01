const divCntnr = document.querySelector('.container');
const styleSheet = document.styleSheets[0];
let intCssRuleCount = styleSheet.cssRules.length;

// Function to create n^2 grid of square divs
function createGrid(intGridSize = 16)
{
    const intTotalSquares = intGridSize ** 2;

    // Loop to create child divs
    for (let i = 0; i < intTotalSquares; i++)
    {
        const divChild = document.createElement('div');
        divChild.classList.add('black-box');

        const numBoxSize = 704 / intGridSize;

        styleSheet.insertRule(`
            .black-box
            {
                width: ${numBoxSize}px;
                height: ${numBoxSize}px;
                border: 1px solid rgba(0, 0, 0, 0.3);
                box-sizing: border-box;
            }
        `, intCssRuleCount);

        divCntnr.appendChild(divChild);
    }

    const divListBlackBox = document.querySelectorAll('.black-box');

    // Set up a 'hover' effect for grid divs
    divListBlackBox.forEach((divBlackBox, intIdx) => {

        styleSheet.insertRule(`
            .darken-bg-rand-rgb-${intIdx}
            {
                background-color: transparent;
            }
        `, intCssRuleCount);

        intCssRuleCount++;
        
        let intOpacityPrcnt = 10;

        divBlackBox.addEventListener('mouseover', () => {
            // Collect current classlist
            const arrCssRule = [...styleSheet.cssRules];
            // console.log(arrCssRule);
            // console.log(arrCssRule[3].selectorText === ".darken-bg-rand-rgb-0");
            // Check if customized bg rule exists
            const divBlckBxStyle = arrCssRule[intIdx + 2];

            // ???
            // console.log(divBlckBxStyle.cssText);
            // divBlckBxStyle.style.setProperty("background-color", "green");
            // console.log(divBlckBxStyle);

            // divBlckBxStyle.style.setProperty("background-color", "blue");
            // console.log(divBlckBxStyle.cssText);
            if (divBlckBxStyle && intOpacityPrcnt <= 100)
            {
                // Randomize the squares' RGB values with each interaction
                const intRandRed = Math.ceil(Math.random() * 255);
                const intRandGreen = Math.ceil(Math.random() * 255);
                const intRandBlue = Math.ceil(Math.random() * 255);

                divBlckBxStyle.style.setProperty(
                    "background-color",
                    `rgb(
                        ${intRandRed},
                        ${intRandGreen},
                        ${intRandBlue}
                    )`
                );

                divBlckBxStyle.style.setProperty(
                    "opacity",
                    `${intOpacityPrcnt}%`
                );

                console.log(divBlckBxStyle.cssText);

                intOpacityPrcnt += 10;
            }
            
            if (intOpacityPrcnt > 100)
            {
                divBlckBxStyle.style.setProperty(
                    "background-color",
                    "black"
                );

                divBlckBxStyle.style.removeProperty("opacity");
            }

            divBlackBox.classList.add(`darken-bg-rand-rgb-${intIdx}`);
            // else
            // {
            //     // Randomize the squares' RGB values with each interaction
            //     const intRandRed = Math.ceil(Math.random() * 255);
            //     const intRandGreen = Math.ceil(Math.random() * 255);
            //     const intRandBlue = Math.ceil(Math.random() * 255);
            //     styleSheet.insertRule(`
            //         .darken-bg-rand-rgb-${intIdx}
            //         {
            //             background-color: rgb(
            //                 ${intRandRed},
            //                 ${intRandGreen},
            //                 ${intRandBlue}
            //             );
            //             opacity: ${intOpacityPrcnt}%;
            //         }
            //     `, intCssRuleCount);

            //     divBlackBox.classList.add(`darken-bg-rand-rgb-${intIdx}`);

            //     intOpacityPrcnt += 10;
            // }
        });
    });
    console.log(intCssRuleCount);
    console.log(styleSheet.cssRules.length);
}

// Initially call createGrid() with a default grid of square divs
createGrid();

const btnEditGrid = document.querySelector('button');

// Button to send a popup to customize grid
btnEditGrid.addEventListener('click', () => {
    const strInput = prompt("[PROMPT] Enter the new number of squares per side (1-100)");
    const intNewSquareCnt = parseInt(strInput);
    
    if (strInput === null)
    {
        return;
    }
    else if (!Number.isInteger(intNewSquareCnt))
    {
        alert("[ERROR] Please input a number!");
    }
    else if (intNewSquareCnt < 1 || intNewSquareCnt > 100)
    {
        alert("[ERROR] Please input an integer from 1 to 100!");
    }
    else
    {
        // Remove existing grid
        while (divCntnr.hasChildNodes())
        {
            divCntnr.removeChild(divCntnr.firstChild);
        }

        while(intCssRuleCount > 2)
        {
            styleSheet.deleteRule(2);
            intCssRuleCount = styleSheet.cssRules.length;
        }
        // Generate new grid given number of squares per side
        createGrid(intNewSquareCnt);
    }
});

// TODO: Refactor the code