       // Get the HTML elements by their IDs
       const placeholder = document.getElementById('placeholder');
       const buttons = document.getElementById('buttons');
       const button1 = document.getElementById('button1');
       const button2 = document.getElementById('button2');
       const button3 = document.getElementById('button3');
       const button4 = document.getElementById('button4');
       const addButton = document.getElementById('add');
       const subtractButton = document.getElementById('subtract');
       const multiplyButton = document.getElementById('multiply');
       const divideButton = document.getElementById('divide');
       const reset = document.getElementById('reset');
       const getNewNumbers = document.getElementById('GetNewNumbers');
       const timerBox = document.getElementById('timerPlaceholder');

       // INITIALISING A LIST OF VARIABLES TO BE USED IN LOGIC BELOW
       let timer = 0; 
       var isFilled = 0
       var isCompleted = 0;
       var solutionsList = [];
       var isCalculable = false; 
       var randomNumberResults = [];
       const operators = ['+', '-', '*', '/']; // List of operators
       let counter1 = 1;
       let counter2 = 1;
       let counter3 = 1;
       let counter4 = 1;
       let boxCounter = 0;
       let arithmeticCounter = 0;
       const buttonsList = [button1, button2, button3, button4]; // List of buttons
       const arithmeticButtonList = [addButton, subtractButton, multiplyButton, divideButton]; // List of arithmetic buttons
       const numberArray = [];
       const operatorArray = [];

       /**
        * Increment the timer by 1 and update the timer display
        * Then recursively call the startTimer function after 1 second
        */
       function startTimer() {
            // Increment the timer by 1
            // console.log('isCompleted: ',isCompleted)
            timer++;
            // Update the timer display with the current value of timer
            timerBox.children[0].innerText = timer;
            if (isCompleted == 0){
                // Call the startTimer function after 1 second, creating a delay
                timerTick = setTimeout(startTimer, 1000);
            }
       }

       // Check if an expression evaluates to 10
       function checkExpression(nums,op1,op2,op3) {
           try {
               const expression = `${nums[0]} ${op1} ${nums[1]} ${op2} ${nums[2]} ${op3} ${nums[3]}`;
               if (eval(expression) === 10) {
                   isCalculable = true;
                   solutionsList.push(expression);
                //    console.log(expression)
                   return nums;
               }
           } catch (error) {
               return null;
           }
       }
       // Function to add an element to the box
        function addElement(buttonText, box) {
            box.innerText = buttonText;
        }
        // Function to remove an element from the placeholder
        function removeElement(box) {
            box.innerText = '';
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function displayEquation(calculationOutput, isFilled) {
            // Convert calculationOutput to a string and set it as the innerText of the 8th child of placeholder
            // This line is equivalent to:
            // placeholder.children[7].innerText = calculationOutput.toString();
            const roundedResult = Math.abs(calculationOutput) % 1 !== 0 ? calculationOutput.toFixed(2) : calculationOutput;
            placeholder.children[7].innerText = roundedResult.toString(); 
            // console.log('isCompleted: ',isCompleted)
            await sleep(100);
            if (isFilled == 1 && calculationOutput== 10) {
                console.log('SUCCESS!')
                isCompleted = 1
                placeholder.children[7].style.backgroundColor = `rgb(${106},${170},${100})`; // SET TO SUCCESSFUL GREEN
                console.log('isCompleted: ', isCompleted)
                await sleep(100);
                window.alert("Congratulations, you've successfully made 10")
                console.log('Solutions List: ',solutionsList)
            }
            
        }

        /**
         * This function calculates the equation by evaluating the innerText of the placeholder.children.
         * It checks if all the children have innerText, then it evaluates the equation and displays the result.
         * If the equation is not complete, it checks if the first three children have innerText, then it evaluates the equation and displays the result.
         * If the equation is still not complete, it checks if the first three children have innerText, then it evaluates the equation and displays the result.
         */

        function calculateEquation(){
            try{
                const children = Array.from(placeholder.children);
                const expression = children.slice(0, 7).map(child => child.innerText).join('');
                // console.log(expression)
                if (placeholder.children[6].innerText != ''){
                    isFilled = 1
                } else if(placeholder.children[6].innerText == ''){
                    isFilled = 0
                }
                const calculationOutput = eval(expression);
                displayEquation(calculationOutput, isFilled);
            } catch (error) {
                // console.error('Does not computer: ', error);
                return null;
            }

        }

        function checkArithmeticCounter(arithmeticCounter) {
            if (arithmeticCounter == 3) {
                arithmeticButtonList.forEach(button => button.disabled = true);
            }
        }
        // while loop to generate random numbers until the numbers can calculate 10

       while (isCalculable == false) {
        //    console.log('Looped Started')
           // Generate an array of 4 random numbers between 0 and 9
           var randomNumbers = [];
           for (let i = 0; i < 4; i++) {
               randomNumbers[i] = Math.floor(Math.random() * 9);
           }
           // randomNumbers = [5,5,0,0]
        //    randomNumbers = [6,1,1,1]
           operators.forEach(op1 => {
               operators.forEach(op2 => {
                   operators.forEach(op3 => {
                       const equationCheck = checkExpression(randomNumbers, op1,op2,op3);
                       if (equationCheck && randomNumberResults.length < 1) {
                           equationCheck.forEach(value => {
                               randomNumberResults.push(value);
                           });
                           isCalculable = true;
                       }
                   });
               });
           });
       }

        // console.log('randomNumberResults Prior shuffle: ', randomNumberResults)
        // shuffle order of items in randomNumberResults array
        randomNumberResults = randomNumberResults.sort(() => Math.random() - 0.5);
        // console.log('randomNumberResults after shuffle: ', randomNumberResults)

        // randomNumberResults = randomNumberResults.sort(() => Math.random());
        // Replace the text of button 1,2,3,4 with each value of the numbers array
        button1.innerText = randomNumberResults[0];
        button2.innerText = randomNumberResults[1];
        button3.innerText = randomNumberResults[2];
        button4.innerText = randomNumberResults[3];


       // Start the timer by calling the startTimer function
       startTimer();

       // Event listener for button1
       button1.addEventListener('click', function() {
           counter1++;
           this.disabled = true;
           addElement(button1.innerText, placeholder.children[boxCounter*2]);
           boxCounter++;
           calculateEquation()
       });

       // Event listener for button2
       button2.addEventListener('click', function() {
           counter2++;
           this.disabled = true;
           addElement(button2.innerText, placeholder.children[boxCounter*2]);
           boxCounter++;
           calculateEquation()
       });

       // Event listener for button3
       button3.addEventListener('click', function() {
           counter3++;
           this.disabled = true;
           addElement(button3.innerText, placeholder.children[boxCounter*2]);
           boxCounter++;
           calculateEquation()
       });

       // Event listener for button4
       button4.addEventListener('click', function() {
           counter4++;
           this.disabled = true;
           addElement(button4.innerText, placeholder.children[boxCounter*2]);
           boxCounter++;
           calculateEquation()
       });

       // Event listener for addButton
       addButton.addEventListener('click', function() {
           addElement('+', placeholder.children[arithmeticCounter*2+1]);
           arithmeticCounter++;
           calculateEquation()
           if (arithmeticCounter == 3){
               arithmeticButtonList.forEach(button => button.disabled = true);
           }
       });
       // Event listener for subtractButton
       subtractButton.addEventListener('click', function() {
           addElement('-', placeholder.children[arithmeticCounter*2+1]);
           arithmeticCounter++;
           calculateEquation()
           checkArithmeticCounter(arithmeticCounter)
       });
       // Event listener for multiplyButton
       multiplyButton.addEventListener('click', function() {
           addElement('*', placeholder.children[arithmeticCounter*2+1]);
           arithmeticCounter++;
           calculateEquation()
           checkArithmeticCounter(arithmeticCounter)
       });
       // Event listener for divideButton
       divideButton.addEventListener('click', function() {
           addElement('/', placeholder.children[arithmeticCounter*2+1]);
           arithmeticCounter++;
           calculateEquation()
           checkArithmeticCounter(arithmeticCounter)
       });


       // Event listener for reset button
       reset.addEventListener('click', function() {
           const boxes = placeholder.children;
           buttonsList.forEach(button => button.disabled = false);
           arithmeticButtonList.forEach(button => button.disabled = false);
           for (let i = 0; i < boxes.length; i++) {
               removeElement(boxes[i]);
           }
           boxCounter = 0;
           arithmeticCounter = 0;
           counter1 = 1;
           counter2 = 1;
           counter3 = 1;
           counter4 = 1;
           isFilled = 0
            placeholder.children[7].style.backgroundColor = `rgb(${201},${180},${88})`;
       });

       getNewNumbers.addEventListener('click', function() {
           window.location.reload();
    });