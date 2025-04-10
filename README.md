COGNITIVE TEST APP 
###
<br>
<br>
<br>
INTRODUCTION:
<br>
<br>
What can help or hurt a person's cognitive ability?
<br>
<br>
This application features a series of brain games that are intended to demonstrate a person's mental aptitude. Potential areas of analysis include awareness, consistency, reaction time, memory and decisiveness. A baseline can be established by conducting the tests under normal circumstances. Tests can then be taken after a variable is introduced and compared to the user's baseline performance for each test.
<br>
<br>
Examples of pre-test variables include the ingestion of certain herbal supplements, food or medication, drinking alcohol, or going for a jog. These tests are for entertainment purposes only, and in no way are intended to diagnose or categorize anyone. The analysis extracted from the test results might only reveal small details of a person's ability. The data gathered is arbitrary based on who takes each test and various other factors.
<br>
<br>
For instance, if a user isn't good with computers they might have trouble responding to the test prompts. Maybe a person doesn't take the test seriously at the time and doesn't put forth their maximum effort. They could be ill or simply having a bad day. Repeated test attempts over a significant length of time can provide better data for analytics, but this process can still include certain caveats and does not guarantee a definitive depiction of a person's functionality.
<br>
<br>
<br>
========================================
<br>
<br>
<br>
INCLUDES:
<br>
<br>
Welcoming Page
<br>
Test Info
<br>
Signup/Login
<br>
User Profile (Settings, Individual results and analysis)
<br>
Results and Analysis
<br>
<br>
<br>
BUILT WITH:
<br>
<br>
React (Next framework)
<br>
Typescript
<br>
Tailwind
<br>
AWS Dynamo DB -- <i>Needs AWS Keys. Contact @Jay Dunn on CrowdDoing Slack for further instructions.</i>
<br>
AWS Cognito -- <i>Needs AWS Keys. Contact @Jay Dunn on CrowdDoing Slack for further instructions.</i>
<br>
Node.js & npm
<br>
Node Version Manager (nvm)
<br>
<br>
<br>
========================================
<br>
<br>
<br>
GETTING STARTED (for Windows -- Mac and Linux instructions to be determined):
<br>
<br>
Install git ( https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
<br>
Install Node (https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
<br>
<br>1. Use terminal within IDE to navigate to desired folder for project. Use git to clone the project (git clone https://github.com/jgddesigns/cognitive_test)
<br>2. In cognitive_test directory, run 'npm install' in terminal command line (if scripts are disabled, open Windows Powershell as administrator and enter 'Set-ExecutionPolicy Unrestricted' in the command line)
<br>3. Next run 'npm run build' in terminal command line
<br>4. Launch server 'npm run dev' in terminal command line (default local url in broswer is localhost:3000)
<br>
<br>
<br>
If there are any issues, it could be due to an incompatible React or Node version. If you have Node already installed and it's different than the dependency for this app, nvm can be used to switch between Node versions.
<br>
<br>
Node Version Manager (nvm) Setup Instructions:
<br>
<br>
https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/
<br>
<br>
(or lookup on ChatGpt, Google, etc...)
<br>
<br>
<br>
========================================
<br>
<br>
<br>
CODING DOCUMENTATION FORMAT
<br>
<br>
<br>
Naming Conventions: 
<br>
<br>
    - snake_case for functions and variables
    <br>
    - PascalCase for Components
    <br>
    - PascalCase, camelCase for React state variables
    <br>
    - UPPER_SNAKECASE for credentials
<br>
<br>
Example:
    
    function create_list(){
        console.log("here is a function")
    }

    const variable_name = "name"

    export default function ComponentName (props: any) { 
        //component content
        return (
            <div>
            </div>
        )
    }

    const [StateVariable, setStateVariable] = React.useState(false)

    const CREDENTIAL_NAME = "asdf123"
    
<br>
Use the following convention for documenting each function in the code comments:

    //Description of function's purpose
    //@param param1: Param #1 for the function and it's use (if needed, otherwise 'None')
    //@param param2: Param #2 for the function and it's use (if needed)
    //@return: Description of what is returned in the function (if no return, 'Void')
<br>
Example:

    //Based on the column header clicked, sort the results by that column.
    //@param type: The string of the column name that was clicked.
    //@return: Void.
    const SortHandler = (type) => {
        
        if(type == "Name"){
            setToggleName(!ToggleName)
        }
        
        if(type == "EFIS"){
            setToggleEFIS(!ToggleEFIS)
        }
        
        if(type == "Role"){
            setToggleRole(!ToggleRole)
        }
        
        if(type == "District"){
            setToggleDistrict(!ToggleDistrict)
        }

        setSortBy(type)
        renderResults(resultsMap)
    }
<br>
<br>
<br>
================================================
<br>
<br>
<br>
MAIN PAGE LOCATION: cognitive_test/src/app/page.tsx
<br>
<br>
TEST COMPONENETS LOCATION: cognitive_test/src/tests
<br>
<br>
DATABASE COMPONENT LOCATION: cognitive_test/src/database
<br>
<br>


