1 Lancer le code sql dans workbench, fournis dans brief7definitf présent dans le dossierdsiBack2 
2 npm i node-modules     et     npm i (nom des dépendances avec un espace entre chaque nom)
3 Lancer Node -->>  node app
4 Relancer encore une fois dans workbench, le méme code sql fournis dans brief7defi... 
5 rafraichir le schema sur workbench -> les 3 tables sont présentes
6 lancer une requéte select * from Users; dans workbench
7 Remplir une ligne à la main sur la table users dans worbench 
    email : ilot2@gmail.com
    passwordHash : $2a$10$yVtOKATWbeg1/5MVjkOrtu6mbdqxo5QC99CIh8NnxbMan4LdaxCT6    
                                    (hash pour ilot2)
    title: erioferof
    firstName: ierfhoireh
    lastName: rfgrfrf
    role: Admin
    createdAt: 2023/11/11 11:11:11
    updatedAt: 2023/11/10 11:11:10
8 cliquer sur Apply (si ca ne marche pas, reclicker sur apply une 2eme fois normalement ca marche)
9 Dans Thunder selectionner post et mettre http://localhost:3004/login
  et dans la fenétre/requéte de Thunder JSON
  {
  "email" : "ilot2@gmail.com",
  "password" : "ilot2"
  }
10 cliquer sur  Send 
11 On récupére/copie le code token sans les doubles cotes 
  On clique sur l'onglet Headers dans Thunder 
  on rentre Authorization sur le champ header et dans le champ value on colle le token
  Il faut cocher la checkbox juste à gauche de Authorization pour que la ligne soit activée 
  L'authetification est faite !
12 On passe en get et http://localhost:3004/users
  Send




# Getting Started with NodeJs


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3004](http://localhost:3004) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
# DSI-Back
# DSI-Back

# Read the Doc >>>
# Read the Doc two times >>>