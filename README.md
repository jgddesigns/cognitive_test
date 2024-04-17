COGNITIVE TEST APP FOR CROWDDOING

Built with:
 React (Next framework)
 Typescript
 Tailwind
 AWS Dynamo DB


GETTING STARTED


1. in cognitive_test directory, run 'npm install' in command line

2. next run 'npm run build'

3. to launch server 'npm run dev' (default url is localhost:3000)




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



================================================
DATABASE CONNECTION USING AWS DYNAMO DB IN THE CLOUD

Related files located in 'src/database'

Keys are hardcoded in app currently, to be seperated and access with backed after production launch
================================================
