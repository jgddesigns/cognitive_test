FLOURISH SCIENCE COGNITIVE TEST APP 
###
<br>
<br>
<br>
INTRODUCTION:
<br>
<br>
The purpose of this app is for users to take a set of 10-15 different cognitive tests. Initially the baseline is determined by taking a test under regular circumstances. 
<br>
<br>
Afterward, various variables pertaining to the CrowdDoing platform are introduced such as use of herbal supplements or walks in nature. Previously attempted tests are to be taken again following the introduction of a specific variable. 
<br>
<br>
A comparison is made with subsequent analysis, based on typically expected results and how the variables affect or have no influence on a particular test.
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
    //@param 'name': The string of the column name that was clicked.
    //@return (type): Void.
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


