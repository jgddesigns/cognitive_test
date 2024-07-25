COGNITIVE TEST APP FOR CROWDDOING

The purpose of this app is for users to take a set of 10-15 different cognitive tests. Initially the baseline is determined by taking a test under regular circumstances. 

Afterward, various variables pertaining to the CrowdDoing platform are introduced such as use of herbal supplements or walks in nature. Previously attempted tests are to be taken again following the indtroduction of a specific variable. 

A comparison is made with subsequent analysis, based on typically expected results and how the variables affect or have no influence on a particular test.


Includes:
Welcoming Page\n
Test Info
Signup/Login
User Profile (Settings, Individual results and analysis)
Macroscopic Results and Analysis


Built with:
 React (Next framework)
 Typescript
 Tailwind
 AWS Dynamo DB
 AWS Cognito

========================================

GETTING STARTED


1. in cognitive_test directory, run 'npm install' in command line

2. next run 'npm run build'

3. to launch server 'npm run dev' (default url is localhost:3000)


If there are any issues, it could be due to an incompatible React or node version. If you have node already installed and it's different than the dependency for this app, nvm can be used to switch between node versions.

Node Version Manager (nvm) Setup Instructions:

https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

(or lookup on ChatGpt, Google, etc...)



================================================

CODING DOCUMENTATION FORMAT

Use the following convention for documenting each function in the code comments:

    //Description of function's purpose
    //@param param1: Param #1 for the function and it's use (if needed, otherwise 'None')
    //@param param2: Param #2 for the function and it's use (if needed)
    //@return: Description of what is returned in the function (if no return, 'Void')

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



================================================

MAIN PAGE LOCATION:
cognitive_test/src/app/page.tsx

TEST COMPONENETS LOCATION:
cognitive_test/src/tests



================================================

DATABASE CONNECTION USING AWS DYNAMO DB IN THE CLOUD

Related files located in 'src/database'

