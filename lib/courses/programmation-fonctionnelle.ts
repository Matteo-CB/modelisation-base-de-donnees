import { Course } from '../types'

export const programmationFonctionnelle: Course = {
  id: 'programmation-fonctionnelle',
  title: 'Programmation Fonctionnelle avec OCaml',
  description: 'Cours complet sur la programmation fonctionnelle, le lambda-calcul et OCaml',
  createdAt: '2024-01-01',
  chapters: [
    {
      id: 'ch1-introduction',
      title: 'Introduction à la Programmation Fonctionnelle',
      description: 'Découvrez les paradigmes de programmation et les concepts fondamentaux',
      icon: '🎯',
      color: 'bg-purple-600/20',
      sections: [
        {
          id: 'sec1-1-paradigmes',
          title: 'Les paradigmes de programmation',
          content: `Un **paradigme de programmation** est une façon d'aborder la programmation et d'organiser le code.

**Les principaux paradigmes :**

**1. Programmation Impérative**
- Décrit **comment** faire les choses (étape par étape)
- Utilise des variables et des instructions qui modifient l'état
- Exemple : C, Pascal, Java

**2. Programmation Fonctionnelle**
- Décrit **quoi** calculer plutôt que comment
- Utilise des fonctions pures sans effet de bord
- Les fonctions sont des valeurs comme les autres
- Exemple : OCaml, Haskell, Lisp

**3. Programmation Orientée Objet**
- Organise le code autour d'objets
- Encapsulation, héritage, polymorphisme
- Exemple : Java, C++, Python`,
          keyPoints: [
            'Impératif : comment faire (étapes)',
            'Fonctionnel : quoi calculer (fonctions)',
            'Objet : organisation en objets',
            'Chaque paradigme a ses avantages'
          ],
          tip: 'La programmation fonctionnelle privilégie l\'immuabilité : on ne modifie pas les données, on en crée de nouvelles.',
          exercises: [
            {
              id: 'ex1-1-1',
              type: 'qcm',
              question: 'Quelle est la caractéristique principale de la programmation fonctionnelle ?',
              options: [
                'Utiliser des classes et des objets',
                'Modifier des variables en boucle',
                'Utiliser des fonctions pures sans effet de bord',
                'Écrire du code étape par étape'
              ],
              correctAnswer: 2,
              explanation: 'La programmation fonctionnelle privilégie les fonctions pures qui ne modifient pas l\'état et n\'ont pas d\'effets de bord.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-1-2',
              type: 'matching',
              question: 'Associe chaque paradigme à sa caractéristique :',
              pairs: [
                { left: 'Impératif', right: 'Décrit comment faire' },
                { left: 'Fonctionnel', right: 'Utilise des fonctions pures' },
                { left: 'Orienté Objet', right: 'Organise en objets' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque paradigme a sa propre approche : impératif (comment), fonctionnel (fonctions), objet (objets).',
              difficulty: 'medium'
            },
            {
              id: 'ex1-1-3',
              type: 'true-false',
              question: 'En programmation fonctionnelle, on modifie rarement les variables existantes.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! La programmation fonctionnelle favorise l\'immuabilité : on crée de nouvelles valeurs au lieu de modifier les existantes.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec1-2-fonctions-valeurs',
          title: 'Les fonctions comme valeurs',
          content: `En programmation fonctionnelle, les **fonctions sont des valeurs de première classe** (first-class citizens).

**Cela signifie qu'on peut :**

1. **Stocker une fonction dans une variable**
\`\`\`ocaml
let double = fun x -> x * 2
\`\`\`

2. **Passer une fonction en argument**
\`\`\`ocaml
let appliquer f x = f x
\`\`\`

3. **Retourner une fonction comme résultat**
\`\`\`ocaml
let creer_multiplicateur n = fun x -> x * n
\`\`\`

4. **Stocker des fonctions dans des structures de données**
\`\`\`ocaml
let operations = [fun x -> x + 1; fun x -> x * 2]
\`\`\``,
          keyPoints: [
            'Les fonctions sont des valeurs',
            'On peut les stocker dans des variables',
            'On peut les passer en paramètre',
            'On peut les retourner comme résultat'
          ],
          example: {
            title: 'Exemple concret',
            content: 'let fois_deux = fun x -> x * 2 in\nlet resultat = fois_deux 5\n(* resultat vaut 10 *)'
          },
          exercises: [
            {
              id: 'ex1-2-1',
              type: 'qcm',
              question: 'Que signifie "les fonctions sont des valeurs de première classe" ?',
              options: [
                'Les fonctions sont plus importantes que les variables',
                'Les fonctions peuvent être utilisées comme n\'importe quelle autre valeur',
                'Les fonctions doivent toujours être définies en premier',
                'Les fonctions ne peuvent pas être modifiées'
              ],
              correctAnswer: 1,
              explanation: 'Cela signifie qu\'on peut manipuler les fonctions comme n\'importe quelle valeur : les stocker, les passer en paramètre, etc.',
              difficulty: 'medium'
            },
            {
              id: 'ex1-2-2',
              type: 'fill-blank',
              question: 'Complète le code :',
              blanks: [
                { text: 'let triple = fun x -> x * _____', answer: '3' }
              ],
              correctAnswer: ['3'],
              explanation: 'Pour créer une fonction qui triple, on multiplie x par 3.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch2-lambda-calcul',
      title: 'Lambda-Calcul (λ-calcul)',
      description: 'Le fondement mathématique de la programmation fonctionnelle',
      icon: 'λ',
      color: 'bg-blue-600/20',
      sections: [
        {
          id: 'sec2-1-introduction-lambda',
          title: 'Introduction au λ-calcul',
          content: `Le **λ-calcul** (lambda-calcul) est un système formel inventé par Alonzo Church dans les années 1930.

**C'est le fondement théorique de la programmation fonctionnelle.**

### Les trois éléments du λ-calcul :

**1. Variables**
- x, y, z, ...
- Représentent des valeurs inconnues

**2. Abstraction (création de fonction)**
- λx. E
- "λx" signifie "fonction qui prend x en paramètre"
- E est le corps de la fonction

**3. Application (appel de fonction)**
- (M N)
- Applique la fonction M à l'argument N`,
          keyPoints: [
            'Système formel créé par Alonzo Church',
            '3 éléments : variables, abstraction, application',
            'λx. E définit une fonction',
            '(M N) applique M à N'
          ],
          tip: 'Le symbole λ (lambda) vient de la lettre grecque. On prononce "lambda x point E".',
          exercises: [
            {
              id: 'ex2-1-1',
              type: 'qcm',
              question: 'Que représente λx. x + 1 ?',
              options: [
                'Une variable x',
                'Une fonction qui ajoute 1 à son paramètre',
                'L\'application d\'une fonction',
                'Un nombre'
              ],
              correctAnswer: 1,
              explanation: 'λx. x + 1 est une abstraction qui définit une fonction prenant x et retournant x + 1.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-1-2',
              type: 'matching',
              question: 'Associe chaque notation λ-calcul à sa signification :',
              pairs: [
                { left: 'x', right: 'Variable' },
                { left: 'λx. E', right: 'Abstraction (fonction)' },
                { left: '(M N)', right: 'Application' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Les trois éléments de base : variables, abstraction pour créer des fonctions, application pour les appeler.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec2-2-beta-reduction',
          title: 'β-réduction (calcul)',
          content: `La **β-réduction** est la règle de calcul fondamentale du λ-calcul.

**Règle :** (λx. E) N → E[x := N]

Cela signifie : remplacer toutes les occurrences de x dans E par N.

### Exemples :

**Exemple 1 :** Fonction identité
\`\`\`
(λx. x) 5
→ 5
\`\`\`

**Exemple 2 :** Fonction qui double
\`\`\`
(λx. x + x) 3
→ 3 + 3
→ 6
\`\`\`

**Exemple 3 :** Composition
\`\`\`
(λx. x * 2) ((λy. y + 1) 4)
→ (λx. x * 2) (4 + 1)
→ (λx. x * 2) 5
→ 5 * 2
→ 10
\`\`\``,
          keyPoints: [
            'β-réduction : règle de calcul',
            '(λx. E) N remplace x par N dans E',
            'On peut réduire étape par étape',
            'Permet d\'évaluer les expressions'
          ],
          example: {
            title: 'Étapes détaillées',
            content: '(λx. x + 1) 7\n→ remplacer x par 7 dans "x + 1"\n→ 7 + 1\n→ 8'
          },
          exercises: [
            {
              id: 'ex2-2-1',
              type: 'qcm',
              question: 'Que donne (λx. x * 3) 4 après β-réduction ?',
              options: [
                '4',
                '3',
                '12',
                '7'
              ],
              correctAnswer: 2,
              explanation: 'On remplace x par 4 : 4 * 3 = 12',
              difficulty: 'easy'
            },
            {
              id: 'ex2-2-2',
              type: 'ordering',
              question: 'Ordonne les étapes de réduction de (λx. x + x) 5 :',
              items: [
                '(λx. x + x) 5',
                'Remplacer x par 5',
                '5 + 5',
                '10'
              ],
              correctAnswer: [0, 1, 2, 3],
              explanation: 'On part de l\'expression, on remplace x par 5, on obtient 5 + 5, puis on calcule 10.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch3-bases-ocaml',
      title: 'Bases d\'OCaml',
      description: 'Types, expressions et syntaxe fondamentale',
      icon: '🐫',
      color: 'bg-orange-600/20',
      sections: [
        {
          id: 'sec3-1-typage',
          title: 'Système de typage',
          content: `OCaml utilise un **système de typage statique fort** avec **inférence de types**.

**Typage statique :**
- Les types sont vérifiés à la compilation
- Les erreurs de type sont détectées avant l'exécution
- Plus sûr que le typage dynamique

**Typage fort :**
- Pas de conversion implicite entre types
- 1 + 1.5 → ERREUR (int et float incompatibles)
- Il faut être explicite : 1.0 +. 1.5

**Inférence de types :**
- Pas besoin d'annoter partout
- OCaml devine les types automatiquement
- \`let x = 5\` → OCaml sait que x : int`,
          keyPoints: [
            'Typage statique : vérification à la compilation',
            'Typage fort : pas de conversion implicite',
            'Inférence : OCaml devine les types',
            'Sécurité et fiabilité accrues'
          ],
          tip: 'En OCaml, + est pour les entiers et +. pour les flottants. Ne les confonds pas !',
          exercises: [
            {
              id: 'ex3-1-1',
              type: 'qcm',
              question: 'Qu\'est-ce que l\'inférence de types ?',
              options: [
                'Obligation d\'écrire tous les types manuellement',
                'OCaml devine automatiquement les types',
                'Les types changent pendant l\'exécution',
                'On peut mélanger int et float'
              ],
              correctAnswer: 1,
              explanation: 'L\'inférence de types permet à OCaml de déduire automatiquement les types sans qu\'on ait besoin de les écrire explicitement.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-1-2',
              type: 'true-false',
              question: 'En OCaml, 1 + 1.5 est une expression valide.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! OCaml a un typage fort : on ne peut pas mélanger int et float. Il faut utiliser 1.0 +. 1.5',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec3-2-types-base',
          title: 'Types de base',
          content: `OCaml propose plusieurs **types de base** :

**1. int (entiers)**
- Nombres entiers : -3, 0, 42, 1000
- Opérations : +, -, *, /, mod

**2. float (flottants)**
- Nombres décimaux : 3.14, -0.5, 1.0
- Opérations : +., -., *., /.
- Notation obligatoire avec point : 1.0 (pas 1)

**3. bool (booléens)**
- true ou false
- Opérations : &&, ||, not

**4. char (caractères)**
- Un seul caractère entre apostrophes : 'a', 'Z', '5'

**5. string (chaînes)**
- Texte entre guillemets : "bonjour", "OCaml"
- Concaténation : ^

**6. unit (type vide)**
- Une seule valeur : ()
- Utilisé pour les effets de bord`,
          keyPoints: [
            'int : entiers avec +, -, *, /',
            'float : décimaux avec +., -., *., /.',
            'bool : true/false',
            'char : \'a\', string : "texte"',
            'unit : () pour effets de bord'
          ],
          example: {
            title: 'Exemples de valeurs',
            content: 'let age = 20        (* int *)\nlet pi = 3.14       (* float *)\nlet actif = true    (* bool *)\nlet lettre = \'a\'    (* char *)\nlet nom = "Alice"   (* string *)\nlet rien = ()       (* unit *)'
          },
          exercises: [
            {
              id: 'ex3-2-1',
              type: 'matching',
              question: 'Associe chaque valeur à son type :',
              pairs: [
                { left: '42', right: 'int' },
                { left: '3.14', right: 'float' },
                { left: 'true', right: 'bool' },
                { left: '"texte"', right: 'string' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2', '3-3'],
              explanation: 'Chaque valeur a un type précis : 42 est un int, 3.14 un float, true un bool, "texte" une string.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-2-2',
              type: 'qcm',
              question: 'Quelle est la bonne syntaxe pour additionner deux flottants ?',
              options: [
                '3.14 + 2.0',
                '3.14 +. 2.0',
                '3.14 plus 2.0',
                'add(3.14, 2.0)'
              ],
              correctAnswer: 1,
              explanation: 'En OCaml, +. est l\'opérateur d\'addition pour les flottants.',
              difficulty: 'medium'
            },
            {
              id: 'ex3-2-3',
              type: 'fill-blank',
              question: 'Complète avec le bon opérateur :',
              blanks: [
                { text: '"Hello " _____ "World"  (* concaténation *)', answer: '^' }
              ],
              correctAnswer: ['^'],
              explanation: 'L\'opérateur ^ permet de concaténer deux chaînes de caractères.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-3-let',
          title: 'Déclarations let',
          content: `Le mot-clé **let** permet de donner un nom à une valeur ou une expression.

**Syntaxe de base :**
\`\`\`ocaml
let nom = expression
\`\`\`

**Let local (in) :**
\`\`\`ocaml
let x = 5 in
let y = x + 3 in
x * y    (* résultat: 40 *)
\`\`\`

**Portée (scope) :**
- La variable existe seulement dans son contexte
- Après le \`in\`, la variable est accessible

**Immuabilité :**
- En OCaml, les liaisons sont **immuables**
- On ne peut pas modifier x après \`let x = 5\`
- On peut créer une nouvelle liaison avec le même nom (shadowing)`,
          keyPoints: [
            'let nom = expression',
            'let...in pour portée locale',
            'Variables immuables',
            'Shadowing possible'
          ],
          example: {
            title: 'Shadowing',
            content: 'let x = 5 in\nlet x = x + 1 in  (* nouveau x qui vaut 6 *)\nx * 2             (* 12 *)'
          },
          exercises: [
            {
              id: 'ex3-3-1',
              type: 'qcm',
              question: 'Que calcule : let x = 3 in let y = x * 2 in x + y ?',
              options: [
                '5',
                '9',
                '12',
                '6'
              ],
              correctAnswer: 1,
              explanation: 'x = 3, y = 3 * 2 = 6, donc x + y = 3 + 6 = 9',
              difficulty: 'medium'
            },
            {
              id: 'ex3-3-2',
              type: 'true-false',
              question: 'En OCaml, on peut modifier la valeur d\'une variable après sa déclaration.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Les liaisons sont immuables. On peut créer une nouvelle liaison avec le même nom (shadowing), mais pas modifier l\'ancienne.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-4-fonctions',
          title: 'Fonctions et curryfication',
          content: `En OCaml, les fonctions se définissent avec **let** et **fun**.

**Syntaxe 1 : avec fun**
\`\`\`ocaml
let double = fun x -> x * 2
\`\`\`

**Syntaxe 2 : forme abrégée (équivalente)**
\`\`\`ocaml
let double x = x * 2
\`\`\`

**Fonction à plusieurs paramètres :**
\`\`\`ocaml
let add x y = x + y
(* équivalent à : let add = fun x -> fun y -> x + y *)
\`\`\`

**Curryfication :**
- Une fonction à n paramètres est une fonction qui prend 1 paramètre et retourne une fonction
- \`add 3 5\` est en fait \`(add 3) 5\`
- On peut faire de **l'application partielle** :

\`\`\`ocaml
let add3 = add 3  (* fonction qui ajoute 3 *)
let result = add3 5  (* 8 *)
\`\`\``,
          keyPoints: [
            'let f x = ... (syntaxe courte)',
            'fun x -> ... (fonction anonyme)',
            'Curryfication automatique',
            'Application partielle possible'
          ],
          example: {
            title: 'Application partielle',
            content: 'let multiplier x y = x * y\nlet doubler = multiplier 2\nlet resultat = doubler 7  (* 14 *)'
          },
          exercises: [
            {
              id: 'ex3-4-1',
              type: 'qcm',
              question: 'Qu\'est-ce que la curryfication ?',
              options: [
                'Transformer une fonction en curry',
                'Une fonction multi-paramètres devient des fonctions à 1 paramètre',
                'Appeler plusieurs fois la même fonction',
                'Créer des fonctions anonymes'
              ],
              correctAnswer: 1,
              explanation: 'La curryfication transforme une fonction f(x,y) en une fonction f(x) qui retourne une fonction g(y).',
              difficulty: 'medium'
            },
            {
              id: 'ex3-4-2',
              type: 'fill-blank',
              question: 'Complète la définition :',
              blanks: [
                { text: 'let triple x = x _____ 3', answer: '*' }
              ],
              correctAnswer: ['*'],
              explanation: 'Pour tripler un nombre, on le multiplie par 3.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-5-pattern-matching',
          title: 'Pattern Matching (filtrage par motif)',
          content: `Le **pattern matching** permet d'analyser la structure d'une valeur et d'exécuter du code selon sa forme.

**Syntaxe avec match :**
\`\`\`ocaml
match expression with
| motif1 -> resultat1
| motif2 -> resultat2
| _ -> resultat_par_defaut
\`\`\`

**Exemple : fonction avec entiers**
\`\`\`ocaml
let signe x =
  match x with
  | 0 -> "zéro"
  | n when n > 0 -> "positif"
  | _ -> "négatif"
\`\`\`

**Exhaustivité :**
- Le compilateur vérifie que tous les cas sont couverts
- \`_\` (underscore) attrape tous les cas restants

**Gardes (when) :**
- Ajoutent des conditions supplémentaires
- \`| n when n > 0 -> ...\``,
          keyPoints: [
            'match...with pour analyser',
            '| motif -> résultat',
            '_ attrape tout',
            'Exhaustivité vérifiée par OCaml'
          ],
          example: {
            title: 'Pattern matching sur bool',
            content: 'let opposé b =\n  match b with\n  | true -> false\n  | false -> true'
          },
          exercises: [
            {
              id: 'ex3-5-1',
              type: 'qcm',
              question: 'À quoi sert _ dans un pattern matching ?',
              options: [
                'À ignorer une valeur',
                'À attraper tous les cas non traités',
                'À créer une variable',
                'À commenter le code'
              ],
              correctAnswer: 1,
              explanation: '_ (underscore) est le motif universel qui attrape tous les cas qui n\'ont pas été traités avant.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-5-2',
              type: 'true-false',
              question: 'OCaml vérifie que tous les cas possibles sont couverts dans un match.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! C\'est l\'exhaustivité. OCaml émet un warning si des cas ne sont pas couverts.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec3-6-tuples',
          title: 'Tuples (types produits)',
          content: `Un **tuple** regroupe plusieurs valeurs de types potentiellement différents.

**Syntaxe :**
\`\`\`ocaml
let paire = (3, "hello")        (* int * string *)
let triplet = (1, true, 'a')    (* int * bool * char *)
\`\`\`

**Accès aux éléments avec pattern matching :**
\`\`\`ocaml
let (x, y) = paire  (* x = 3, y = "hello" *)

let premier (x, _, _) = x
let deuxieme (_, y, _) = y
\`\`\`

**Fonctions fst et snd (paires) :**
\`\`\`ocaml
fst (3, 5)  (* 3 *)
snd (3, 5)  (* 5 *)
\`\`\`

**Type produit :**
- Le type est le produit cartésien : int * string
- Nombre de combinaisons = taille1 × taille2`,
          keyPoints: [
            '(v1, v2, ...) crée un tuple',
            'Type : t1 * t2 * ...',
            'Accès par pattern matching',
            'fst/snd pour les paires'
          ],
          exercises: [
            {
              id: 'ex3-6-1',
              type: 'qcm',
              question: 'Quel est le type de (5, true, "a") ?',
              options: [
                'int * bool * char',
                'int * bool * string',
                '(int, bool, string)',
                'tuple'
              ],
              correctAnswer: 1,
              explanation: 'Le tuple contient un int, un bool et une string, donc son type est int * bool * string.',
              difficulty: 'medium'
            },
            {
              id: 'ex3-6-2',
              type: 'fill-blank',
              question: 'Complète pour extraire le deuxième élément :',
              blanks: [
                { text: 'let (_, x, _____) = (1, 2, 3)', answer: '_' }
              ],
              correctAnswer: ['_'],
              explanation: 'On utilise _ pour ignorer les éléments qu\'on ne veut pas extraire.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-7-records',
          title: 'Enregistrements (records)',
          content: `Les **enregistrements** sont des structures avec des champs nommés.

**Déclaration du type :**
\`\`\`ocaml
type point = {
  x: float;
  y: float
}
\`\`\`

**Création :**
\`\`\`ocaml
let p = { x = 3.0; y = 4.5 }
\`\`\`

**Accès aux champs :**
\`\`\`ocaml
p.x  (* 3.0 *)
p.y  (* 4.5 *)
\`\`\`

**Pattern matching :**
\`\`\`ocaml
let distance_origine {x; y} =
  sqrt (x *. x +. y *. y)
\`\`\`

**Copie avec modification :**
\`\`\`ocaml
let p2 = { p with y = 10.0 }
(* p2 = {x = 3.0; y = 10.0} *)
\`\`\``,
          keyPoints: [
            'type nom = {champ: type; ...}',
            '{champ = valeur; ...} pour créer',
            'record.champ pour accéder',
            '{r with champ = nouvelle} pour copier'
          ],
          example: {
            title: 'Personne',
            content: 'type personne = {\n  nom: string;\n  age: int\n}\n\nlet alice = {nom = "Alice"; age = 25}'
          },
          exercises: [
            {
              id: 'ex3-7-1',
              type: 'qcm',
              question: 'Comment accède-t-on au champ nom d\'un record p ?',
              options: [
                'p[nom]',
                'p->nom',
                'p.nom',
                'nom(p)'
              ],
              correctAnswer: 2,
              explanation: 'On utilise la notation pointée : record.champ',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-8-variants',
          title: 'Types sommes (variants)',
          content: `Les **types sommes** (ou variants) représentent un choix parmi plusieurs possibilités.

**Déclaration :**
\`\`\`ocaml
type couleur = Rouge | Vert | Bleu

type forme =
  | Cercle of float
  | Rectangle of float * float
\`\`\`

**Constructeurs :**
- Rouge, Vert, Bleu sont des constructeurs constants
- Cercle, Rectangle sont des constructeurs avec données

**Pattern matching obligatoire :**
\`\`\`ocaml
let aire forme =
  match forme with
  | Cercle r -> 3.14 *. r *. r
  | Rectangle (l, h) -> l *. h
\`\`\`

**Type somme :**
- Appelé "somme" car le nombre de valeurs est la somme des possibilités`,
          keyPoints: [
            'type t = C1 | C2 | ...',
            'Constructeurs avec/sans données',
            'Pattern matching pour analyser',
            'Exhaustivité vérifiée'
          ],
          example: {
            title: 'Option',
            content: 'type \'a option =\n  | None\n  | Some of \'a\n\nlet trouve x = Some 42\nlet pas_trouve = None'
          },
          exercises: [
            {
              id: 'ex3-8-1',
              type: 'qcm',
              question: 'Que représente un type somme ?',
              options: [
                'L\'addition de nombres',
                'Un choix parmi plusieurs possibilités',
                'La somme de tous les champs',
                'Un calcul mathématique'
              ],
              correctAnswer: 1,
              explanation: 'Un type somme représente un choix (OU) : une valeur peut être Rouge OU Vert OU Bleu.',
              difficulty: 'medium'
            },
            {
              id: 'ex3-8-2',
              type: 'matching',
              question: 'Associe chaque concept :',
              pairs: [
                { left: 'Type produit', right: 'Tuple/Record (ET)' },
                { left: 'Type somme', right: 'Variant (OU)' },
                { left: 'Pattern matching', right: 'Analyse de structure' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Produit = ET (toutes les valeurs), Somme = OU (un choix), Pattern matching = analyser.',
              difficulty: 'hard'
            }
          ]
        }
      ]
    },
    {
      id: 'ch4-recursivite',
      title: 'Récursivité',
      description: 'Maîtrisez les fonctions récursives et leur optimisation',
      icon: '🔄',
      color: 'bg-green-600/20',
      sections: [
        {
          id: 'sec4-1-recursivite-simple',
          title: 'Récursivité simple',
          content: `Une fonction **récursive** est une fonction qui s'appelle elle-même.

**Mot-clé rec :**
En OCaml, il faut utiliser \`let rec\` pour définir une fonction récursive.

**Structure d'une fonction récursive :**
1. **Cas de base** : condition d'arrêt
2. **Cas récursif** : appel à soi-même avec un problème plus petit

**Exemple : factorielle**
\`\`\`ocaml
let rec fact n =
  if n = 0 then 1              (* cas de base *)
  else n * fact (n - 1)        (* cas récursif *)

(* fact 5 = 5 * fact 4 = 5 * 4 * 3 * 2 * 1 = 120 *)
\`\`\`

**Exemple : somme des n premiers entiers**
\`\`\`ocaml
let rec somme n =
  if n = 0 then 0
  else n + somme (n - 1)
\`\`\``,
          keyPoints: [
            'let rec pour fonction récursive',
            'Cas de base (arrêt)',
            'Cas récursif (problème plus petit)',
            'Toujours vérifier la terminaison'
          ],
          tip: 'Sans cas de base, la fonction tourne à l\'infini ! Toujours penser à la condition d\'arrêt.',
          exercises: [
            {
              id: 'ex4-1-1',
              type: 'qcm',
              question: 'Pourquoi faut-il un cas de base dans une fonction récursive ?',
              options: [
                'Pour rendre le code plus lisible',
                'Pour arrêter la récursion et éviter l\'infini',
                'Pour optimiser la vitesse',
                'Ce n\'est pas obligatoire'
              ],
              correctAnswer: 1,
              explanation: 'Le cas de base est la condition d\'arrêt. Sans lui, la fonction s\'appellerait infiniment !',
              difficulty: 'easy'
            },
            {
              id: 'ex4-1-2',
              type: 'ordering',
              question: 'Ordonne les appels de fact 3 :',
              items: [
                'fact 3',
                '3 * fact 2',
                '3 * 2 * fact 1',
                '3 * 2 * 1 * fact 0',
                '3 * 2 * 1 * 1 = 6'
              ],
              correctAnswer: [0, 1, 2, 3, 4],
              explanation: 'La récursion descend jusqu\'au cas de base (0), puis remonte en calculant.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec4-2-recursivite-terminale',
          title: 'Récursivité terminale',
          content: `Une fonction est **récursive terminale** si l'appel récursif est la dernière opération.

**Avantage :**
- Optimisée par le compilateur
- Pas de dépassement de pile (stack overflow)
- Transformée en boucle par OCaml

**Factorielle NON terminale :**
\`\`\`ocaml
let rec fact n =
  if n = 0 then 1
  else n * fact (n - 1)  (* multiplication après l'appel *)
\`\`\`

**Factorielle terminale (avec accumulateur) :**
\`\`\`ocaml
let fact_term n =
  let rec aux n acc =
    if n = 0 then acc
    else aux (n - 1) (n * acc)  (* appel récursif en dernière position *)
  in aux n 1
\`\`\`

**L'accumulateur :**
- Stocke le résultat partiel
- Permet d'éviter les calculs après l'appel récursif`,
          keyPoints: [
            'Appel récursif = dernière opération',
            'Optimisée par le compilateur',
            'Utilise un accumulateur',
            'Pas de stack overflow'
          ],
          example: {
            title: 'Somme terminale',
            content: 'let somme_term n =\n  let rec aux n acc =\n    if n = 0 then acc\n    else aux (n-1) (acc+n)\n  in aux n 0'
          },
          exercises: [
            {
              id: 'ex4-2-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'un accumulateur ?',
              options: [
                'Une variable qui compte les appels',
                'Un paramètre qui stocke le résultat partiel',
                'Une fonction auxiliaire',
                'Un type de donnée'
              ],
              correctAnswer: 1,
              explanation: 'L\'accumulateur est un paramètre supplémentaire qui accumule le résultat au fur et à mesure.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-2-2',
              type: 'true-false',
              question: 'Une fonction récursive terminale peut traiter de très grandes valeurs sans stack overflow.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Le compilateur transforme la récursion terminale en boucle, évitant ainsi le stack overflow.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec4-3-recursivite-mutuelle',
          title: 'Récursivité mutuelle',
          content: `Deux fonctions sont **mutuellement récursives** si elles s'appellent l'une l'autre.

**Syntaxe avec and :**
\`\`\`ocaml
let rec pair n =
  if n = 0 then true
  else impair (n - 1)

and impair n =
  if n = 0 then false
  else pair (n - 1)
\`\`\`

**Utilisation typique :**
- Automates à états
- Parseurs
- Problèmes avec états alternants

**Exemple : évaluation d'expressions**
\`\`\`ocaml
let rec eval_expr e = ...
  and eval_term t = ...
  and eval_factor f = ...
\`\`\``,
          keyPoints: [
            'let rec ... and ... for mutual recursion',
            'Fonctions s\'appellent mutuellement',
            'Utile pour états alternants',
            'Déclarations liées par and'
          ],
          exercises: [
            {
              id: 'ex4-3-1',
              type: 'qcm',
              question: 'Comment déclare-t-on deux fonctions mutuellement récursives ?',
              options: [
                'Deux let rec séparés',
                'let rec f ... and g ...',
                'let mutual f g ...',
                'let f rec g ...'
              ],
              correctAnswer: 1,
              explanation: 'On utilise let rec ... and ... pour lier les déclarations mutuellement récursives.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch5-listes',
      title: 'Listes',
      description: 'Structure de données fondamentale en programmation fonctionnelle',
      icon: '📋',
      color: 'bg-cyan-600/20',
      sections: [
        {
          id: 'sec5-1-construction-listes',
          title: 'Construction et syntaxe des listes',
          content: `Une **liste** est une séquence ordonnée d'éléments du même type.

**Syntaxe :**
\`\`\`ocaml
[]                    (* liste vide *)
[1; 2; 3]            (* liste d'entiers *)
["a"; "b"; "c"]      (* liste de strings *)
\`\`\`

**Constructeur :: (cons) :**
- Ajoute un élément en tête de liste
- x :: liste

\`\`\`ocaml
1 :: [2; 3]          (* [1; 2; 3] *)
"a" :: []            (* ["a"] *)
\`\`\`

**Opérateur @ (concaténation) :**
\`\`\`ocaml
[1; 2] @ [3; 4]      (* [1; 2; 3; 4] *)
\`\`\`

**Type :**
- 'a list : liste d'éléments de type 'a
- int list, string list, bool list, etc.`,
          keyPoints: [
            '[] = liste vide',
            ':: ajoute en tête (cons)',
            '@ concatène deux listes',
            'Tous les éléments du même type'
          ],
          tip: 'Attention : :: ajoute UN élément, @ concatène DEUX listes !',
          exercises: [
            {
              id: 'ex5-1-1',
              type: 'qcm',
              question: 'Que donne 5 :: [10; 15] ?',
              options: [
                '[5; 10; 15]',
                '[10; 15; 5]',
                '[[5]; 10; 15]',
                'Erreur'
              ],
              correctAnswer: 0,
              explanation: ':: ajoute l\'élément 5 en tête de la liste [10; 15], donnant [5; 10; 15].',
              difficulty: 'easy'
            },
            {
              id: 'ex5-1-2',
              type: 'qcm',
              question: 'Quelle est la différence entre :: et @ ?',
              options: [
                'Aucune différence',
                ':: ajoute un élément, @ concatène deux listes',
                '@ ajoute un élément, :: concatène deux listes',
                ':: est plus rapide'
              ],
              correctAnswer: 1,
              explanation: ':: ajoute UN élément en tête, @ concatène DEUX listes.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec5-2-pattern-matching-listes',
          title: 'Pattern matching sur les listes',
          content: `Le pattern matching est essentiel pour travailler avec les listes.

**Motifs de base :**
\`\`\`ocaml
match liste with
| [] -> ...                  (* liste vide *)
| [x] -> ...                 (* un seul élément *)
| x :: xs -> ...             (* tête x et reste xs *)
| x :: y :: reste -> ...     (* au moins 2 éléments *)
\`\`\`

**Exemple : longueur d'une liste**
\`\`\`ocaml
let rec longueur liste =
  match liste with
  | [] -> 0
  | _ :: reste -> 1 + longueur reste
\`\`\`

**Exemple : somme des éléments**
\`\`\`ocaml
let rec somme liste =
  match liste with
  | [] -> 0
  | x :: xs -> x + somme xs
\`\`\`

**Convention :**
- x, y, z : éléments
- xs, ys, zs : listes (pluriel)`,
          keyPoints: [
            '[] pour liste vide',
            'x :: xs pour tête et reste',
            'Récursion naturelle sur listes',
            'Cas de base = liste vide'
          ],
          example: {
            title: 'Premier élément',
            content: 'let premier liste =\n  match liste with\n  | [] -> failwith "vide"\n  | x :: _ -> x'
          },
          exercises: [
            {
              id: 'ex5-2-1',
              type: 'qcm',
              question: 'Dans x :: xs, que représente xs ?',
              options: [
                'Le dernier élément',
                'La liste sans le premier élément',
                'La liste complète',
                'Le deuxième élément'
              ],
              correctAnswer: 1,
              explanation: 'xs représente le reste de la liste (tous les éléments sauf le premier x).',
              difficulty: 'easy'
            },
            {
              id: 'ex5-2-2',
              type: 'fill-blank',
              question: 'Complète pour compter les éléments :',
              blanks: [
                { text: 'let rec compte = function | [] -> _____ | _ :: reste -> 1 + compte reste', answer: '0' }
              ],
              correctAnswer: ['0'],
              explanation: 'Une liste vide a 0 éléments.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec5-3-fonctions-listes',
          title: 'Fonctions classiques sur les listes',
          content: `OCaml fournit de nombreuses fonctions pour manipuler les listes.

**List.length :**
\`\`\`ocaml
List.length [1; 2; 3]  (* 3 *)
\`\`\`

**List.hd et List.tl :**
\`\`\`ocaml
List.hd [1; 2; 3]      (* 1 : tête *)
List.tl [1; 2; 3]      (* [2; 3] : queue *)
\`\`\`

**List.nth :**
\`\`\`ocaml
List.nth [10; 20; 30] 0   (* 10 *)
List.nth [10; 20; 30] 2   (* 30 *)
\`\`\`

**List.rev :**
\`\`\`ocaml
List.rev [1; 2; 3]     (* [3; 2; 1] *)
\`\`\`

**List.mem :**
\`\`\`ocaml
List.mem 2 [1; 2; 3]   (* true *)
List.mem 5 [1; 2; 3]   (* false *)
\`\`\``,
          keyPoints: [
            'List.length : taille',
            'List.hd/List.tl : tête/queue',
            'List.nth : élément à l\'index',
            'List.rev : inverser'
          ],
          exercises: [
            {
              id: 'ex5-3-1',
              type: 'qcm',
              question: 'Que retourne List.hd [5; 10; 15] ?',
              options: [
                '5',
                '10',
                '[5]',
                '[10; 15]'
              ],
              correctAnswer: 0,
              explanation: 'List.hd retourne la tête (premier élément) de la liste, donc 5.',
              difficulty: 'easy'
            },
            {
              id: 'ex5-3-2',
              type: 'matching',
              question: 'Associe chaque fonction à son résultat sur [1;2;3] :',
              pairs: [
                { left: 'List.length', right: '3' },
                { left: 'List.hd', right: '1' },
                { left: 'List.tl', right: '[2;3]' },
                { left: 'List.rev', right: '[3;2;1]' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2', '3-3'],
              explanation: 'Length compte (3), hd donne la tête (1), tl donne la queue ([2;3]), rev inverse ([3;2;1]).',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch6-fonctions-ordre-superieur',
      title: 'Fonctions d\'Ordre Supérieur',
      description: 'Map, filter, fold et composition de fonctions',
      icon: '🎭',
      color: 'bg-indigo-600/20',
      sections: [
        {
          id: 'sec6-1-map',
          title: 'Map : transformer chaque élément',
          content: `**List.map** applique une fonction à chaque élément d'une liste.

**Signature :**
\`\`\`ocaml
List.map : ('a -> 'b) -> 'a list -> 'b list
\`\`\`

**Utilisation :**
\`\`\`ocaml
List.map (fun x -> x * 2) [1; 2; 3]
(* [2; 4; 6] *)

List.map String.uppercase_ascii ["a"; "b"]
(* ["A"; "B"] *)
\`\`\`

**Implémentation :**
\`\`\`ocaml
let rec map f liste =
  match liste with
  | [] -> []
  | x :: xs -> f x :: map f xs
\`\`\`

**Quand utiliser map ?**
- Transformer tous les éléments de la même façon
- Conversion de type (int -> string)
- Application d'une fonction partout`,
          keyPoints: [
            'Applique une fonction à chaque élément',
            'Préserve la structure',
            'Même longueur en sortie',
            'f : \'a -> \'b'
          ],
          exercises: [
            {
              id: 'ex6-1-1',
              type: 'qcm',
              question: 'Que donne List.map (fun x -> x + 1) [5; 10; 15] ?',
              options: [
                '[6; 11; 16]',
                '[5; 10; 15]',
                '[15; 10; 5]',
                '31'
              ],
              correctAnswer: 0,
              explanation: 'Map ajoute 1 à chaque élément : 5+1=6, 10+1=11, 15+1=16.',
              difficulty: 'easy'
            },
            {
              id: 'ex6-1-2',
              type: 'fill-blank',
              question: 'Complète pour doubler chaque élément :',
              blanks: [
                { text: 'List.map (fun x -> x _____ 2) [1; 2; 3]', answer: '*' }
              ],
              correctAnswer: ['*'],
              explanation: 'Pour doubler, on multiplie par 2.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec6-2-filter',
          title: 'Filter : sélectionner des éléments',
          content: `**List.filter** garde uniquement les éléments qui satisfont un prédicat.

**Signature :**
\`\`\`ocaml
List.filter : ('a -> bool) -> 'a list -> 'a list
\`\`\`

**Utilisation :**
\`\`\`ocaml
List.filter (fun x -> x > 5) [1; 8; 3; 10; 2]
(* [8; 10] *)

List.filter (fun x -> x mod 2 = 0) [1; 2; 3; 4; 5]
(* [2; 4] *)
\`\`\`

**Implémentation :**
\`\`\`ocaml
let rec filter p liste =
  match liste with
  | [] -> []
  | x :: xs ->
      if p x then x :: filter p xs
      else filter p xs
\`\`\`

**Quand utiliser filter ?**
- Sélectionner selon un critère
- Retirer certains éléments
- Chercher les éléments valides`,
          keyPoints: [
            'Garde les éléments qui satisfont le prédicat',
            'Prédicat : \'a -> bool',
            'Liste potentiellement plus courte',
            'Ordre préservé'
          ],
          exercises: [
            {
              id: 'ex6-2-1',
              type: 'qcm',
              question: 'Que fait List.filter (fun x -> x < 10) [5; 15; 8; 20; 3] ?',
              options: [
                'Garde les éléments < 10',
                'Garde les éléments > 10',
                'Multiplie par 10',
                'Compte les éléments'
              ],
              correctAnswer: 0,
              explanation: 'Filter garde les éléments pour lesquels le prédicat est vrai, donc ceux < 10 : [5; 8; 3].',
              difficulty: 'easy'
            },
            {
              id: 'ex6-2-2',
              type: 'true-false',
              question: 'List.filter peut rallonger une liste.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Filter ne peut que garder ou retirer des éléments, jamais en ajouter.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec6-3-fold',
          title: 'Fold : réduire une liste',
          content: `**Fold** accumule les éléments d'une liste en un seul résultat.

**List.fold_left :**
- Parcourt de gauche à droite
- Accumule le résultat

\`\`\`ocaml
List.fold_left : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a

List.fold_left (+) 0 [1; 2; 3; 4]
(* ((((0 + 1) + 2) + 3) + 4) = 10 *)
\`\`\`

**List.fold_right :**
- Parcourt de droite à gauche

\`\`\`ocaml
List.fold_right (+) [1; 2; 3; 4] 0
(* (1 + (2 + (3 + (4 + 0)))) = 10 *)
\`\`\`

**Exemples d'utilisation :**
\`\`\`ocaml
(* Somme *)
List.fold_left (+) 0 [1; 2; 3]  (* 6 *)

(* Produit *)
List.fold_left ( * ) 1 [2; 3; 4]  (* 24 *)

(* Concaténation *)
List.fold_left (^) "" ["a"; "b"; "c"]  (* "abc" *)
\`\`\``,
          keyPoints: [
            'Réduit une liste en une valeur',
            'fold_left : gauche à droite',
            'fold_right : droite à gauche',
            'Accumulateur initial nécessaire'
          ],
          example: {
            title: 'Maximum d\'une liste',
            content: 'let max_liste liste =\n  match liste with\n  | [] -> failwith "vide"\n  | x :: xs -> List.fold_left max x xs'
          },
          exercises: [
            {
              id: 'ex6-3-1',
              type: 'qcm',
              question: 'Que fait List.fold_left (+) 0 liste ?',
              options: [
                'Compte les éléments',
                'Calcule la somme',
                'Double chaque élément',
                'Inverse la liste'
              ],
              correctAnswer: 1,
              explanation: 'Fold_left avec + et 0 comme accumulateur calcule la somme de tous les éléments.',
              difficulty: 'easy'
            },
            {
              id: 'ex6-3-2',
              type: 'ordering',
              question: 'Ordonne les étapes de fold_left (+) 0 [1;2;3] :',
              items: [
                'acc = 0',
                'acc = 0 + 1 = 1',
                'acc = 1 + 2 = 3',
                'acc = 3 + 3 = 6',
                'résultat = 6'
              ],
              correctAnswer: [0, 1, 2, 3, 4],
              explanation: 'Fold_left accumule de gauche à droite : 0 → 1 → 3 → 6',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec6-4-composition',
          title: 'Composition de fonctions',
          content: `La **composition** combine plusieurs fonctions en une seule.

**Définition mathématique :**
(f ∘ g)(x) = f(g(x))

**En OCaml :**
\`\`\`ocaml
let compose f g = fun x -> f (g x)
(* ou : let compose f g x = f (g x) *)

let ( >> ) f g x = g (f x)  (* composition gauche-droite *)
let ( << ) f g x = f (g x)  (* composition droite-gauche *)
\`\`\`

**Exemple :**
\`\`\`ocaml
let double x = x * 2
let increment x = x + 1

let double_puis_increment = compose increment double
(* ou : let double_puis_increment = double >> increment *)

double_puis_increment 5  (* (5 * 2) + 1 = 11 *)
\`\`\`

**Pipeline avec |> :**
\`\`\`ocaml
[1; 2; 3]
|> List.map (fun x -> x * 2)
|> List.filter (fun x -> x > 3)
|> List.fold_left (+) 0
(* [2; 4; 6] -> [4; 6] -> 10 *)
\`\`\``,
          keyPoints: [
            'Combine plusieurs fonctions',
            '|> pour pipeline (lecture naturelle)',
            'compose f g = fun x -> f (g x)',
            'Réutilisabilité du code'
          ],
          exercises: [
            {
              id: 'ex6-4-1',
              type: 'qcm',
              question: 'Que fait x |> f |> g ?',
              options: [
                'Applique f puis g à x',
                'Applique g puis f à x',
                'Multiplie x par f et g',
                'Compare x, f et g'
              ],
              correctAnswer: 0,
              explanation: '|> est le pipeline : x |> f |> g = g(f(x)), on applique f puis g.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch7-arbres',
      title: 'Arbres',
      description: 'Structures arborescentes et arbres binaires de recherche',
      icon: '🌳',
      color: 'bg-emerald-600/20',
      sections: [
        {
          id: 'sec7-1-arbres-binaires',
          title: 'Arbres binaires',
          content: `Un **arbre binaire** est une structure récursive où chaque nœud a au plus 2 fils.

**Définition du type :**
\`\`\`ocaml
type 'a arbre =
  | Vide
  | Noeud of 'a * 'a arbre * 'a arbre
\`\`\`

**Terminologie :**
- **Racine** : nœud au sommet
- **Feuille** : nœud sans enfants
- **Fils gauche / Fils droit**
- **Hauteur** : longueur max racine → feuille

**Exemple de création :**
\`\`\`ocaml
let arbre_exemple =
  Noeud(5,
    Noeud(3, Vide, Vide),
    Noeud(8, Vide, Vide)
  )
(*
      5
     / \\
    3   8
*)
\`\`\``,
          keyPoints: [
            'Structure récursive',
            'Vide ou Noeud(valeur, gauche, droit)',
            'Chaque nœud ≤ 2 fils',
            'Idéal pour recherche hiérarchique'
          ],
          exercises: [
            {
              id: 'ex7-1-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'une feuille dans un arbre binaire ?',
              options: [
                'La racine',
                'Un nœud sans enfants',
                'Le premier nœud',
                'Un nœud avec 2 enfants'
              ],
              correctAnswer: 1,
              explanation: 'Une feuille est un nœud qui n\'a aucun enfant (fils gauche et droit = Vide).',
              difficulty: 'easy'
            },
            {
              id: 'ex7-1-2',
              type: 'true-false',
              question: 'Un arbre binaire peut avoir des nœuds avec 3 enfants.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Un arbre BINAIRE a au maximum 2 enfants par nœud.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec7-2-fonctions-arbres',
          title: 'Fonctions sur les arbres',
          content: `**Taille (nombre de nœuds) :**
\`\`\`ocaml
let rec taille arbre =
  match arbre with
  | Vide -> 0
  | Noeud(_, g, d) -> 1 + taille g + taille d
\`\`\`

**Hauteur :**
\`\`\`ocaml
let rec hauteur arbre =
  match arbre with
  | Vide -> 0
  | Noeud(_, g, d) -> 1 + max (hauteur g) (hauteur d)
\`\`\`

**Appartenance :**
\`\`\`ocaml
let rec appartient x arbre =
  match arbre with
  | Vide -> false
  | Noeud(v, g, d) ->
      v = x || appartient x g || appartient x d
\`\`\`

**Somme des valeurs :**
\`\`\`ocaml
let rec somme arbre =
  match arbre with
  | Vide -> 0
  | Noeud(v, g, d) -> v + somme g + somme d
\`\`\``,
          keyPoints: [
            'Récursion sur gauche et droite',
            'Cas de base : Vide',
            'Pattern matching naturel',
            'Traitement de la valeur + récursion'
          ],
          exercises: [
            {
              id: 'ex7-2-1',
              type: 'fill-blank',
              question: 'Complète pour compter les nœuds :',
              blanks: [
                { text: 'let rec taille = function | Vide -> 0 | Noeud(_, g, d) -> _____ + taille g + taille d', answer: '1' }
              ],
              correctAnswer: ['1'],
              explanation: 'Chaque nœud compte pour 1, plus la taille de ses sous-arbres.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec7-3-abr',
          title: 'Arbres Binaires de Recherche (ABR)',
          content: `Un **ABR** est un arbre binaire où pour chaque nœud :
- Valeurs à gauche < valeur du nœud
- Valeurs à droite > valeur du nœud

**Avantage : recherche en O(log n)** (si équilibré)

**Recherche dans un ABR :**
\`\`\`ocaml
let rec recherche x arbre =
  match arbre with
  | Vide -> false
  | Noeud(v, g, d) ->
      if x = v then true
      else if x < v then recherche x g
      else recherche x d
\`\`\`

**Insertion dans un ABR :**
\`\`\`ocaml
let rec inserer x arbre =
  match arbre with
  | Vide -> Noeud(x, Vide, Vide)
  | Noeud(v, g, d) ->
      if x < v then Noeud(v, inserer x g, d)
      else if x > v then Noeud(v, g, inserer x d)
      else arbre  (* déjà présent *)
\`\`\``,
          keyPoints: [
            'Gauche < Noeud < Droite',
            'Recherche efficace O(log n)',
            'Insertion préserve la propriété',
            'Parcours infixe donne ordre croissant'
          ],
          exercises: [
            {
              id: 'ex7-3-1',
              type: 'qcm',
              question: 'Dans un ABR, où va une valeur plus petite que la racine ?',
              options: [
                'À droite',
                'À gauche',
                'N\'importe où',
                'À la racine'
              ],
              correctAnswer: 1,
              explanation: 'Dans un ABR, les valeurs plus petites vont à GAUCHE.',
              difficulty: 'easy'
            },
            {
              id: 'ex7-3-2',
              type: 'ordering',
              question: 'Ordonne l\'insertion de [5, 3, 7] dans un ABR vide :',
              items: [
                'Arbre vide',
                'Insérer 5 (racine)',
                'Insérer 3 (à gauche de 5)',
                'Insérer 7 (à droite de 5)',
                'ABR final : 5 avec 3 à gauche, 7 à droite'
              ],
              correctAnswer: [0, 1, 2, 3, 4],
              explanation: 'On insère 5 comme racine, puis 3 < 5 va à gauche, 7 > 5 va à droite.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec7-4-parcours',
          title: 'Parcours d\'arbres',
          content: `Il existe 3 parcours principaux pour visiter tous les nœuds :

**1. Parcours Préfixe (Racine-Gauche-Droite) :**
\`\`\`ocaml
let rec prefixe arbre =
  match arbre with
  | Vide -> []
  | Noeud(v, g, d) ->
      [v] @ prefixe g @ prefixe d
\`\`\`

**2. Parcours Infixe (Gauche-Racine-Droite) :**
\`\`\`ocaml
let rec infixe arbre =
  match arbre with
  | Vide -> []
  | Noeud(v, g, d) ->
      infixe g @ [v] @ infixe d
\`\`\`
*Pour un ABR, donne les éléments triés !*

**3. Parcours Suffixe (Gauche-Droite-Racine) :**
\`\`\`ocaml
let rec suffixe arbre =
  match arbre with
  | Vide -> []
  | Noeud(v, g, d) ->
      suffixe g @ suffixe d @ [v]
\`\`\``,
          keyPoints: [
            'Préfixe : Racine-Gauche-Droite',
            'Infixe : Gauche-Racine-Droite (ABR → trié)',
            'Suffixe : Gauche-Droite-Racine',
            'Tous visitent chaque nœud une fois'
          ],
          exercises: [
            {
              id: 'ex7-4-1',
              type: 'matching',
              question: 'Associe le parcours à son ordre :',
              pairs: [
                { left: 'Préfixe', right: 'Racine-Gauche-Droite' },
                { left: 'Infixe', right: 'Gauche-Racine-Droite' },
                { left: 'Suffixe', right: 'Gauche-Droite-Racine' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque parcours visite les nœuds dans un ordre différent.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch8-types-polymorphes',
      title: 'Types Polymorphes',
      description: 'Généricité et paramétrage des types',
      icon: '🔮',
      color: 'bg-violet-600/20',
      sections: [
        {
          id: 'sec8-1-polymorphisme',
          title: 'Polymorphisme paramétrique',
          content: `Le **polymorphisme** permet d'écrire du code générique qui fonctionne pour plusieurs types.

**Variables de type :**
- 'a, 'b, 'c (prononcé "alpha", "beta", "gamma")
- Représentent n'importe quel type

**Exemple : fonction identité**
\`\`\`ocaml
let identite x = x
(* Type : 'a -> 'a *)
\`\`\`

**Exemple : paire**
\`\`\`ocaml
let creer_paire x y = (x, y)
(* Type : 'a -> 'b -> 'a * 'b *)
\`\`\`

**Option (type polymorphe standard) :**
\`\`\`ocaml
type 'a option =
  | None
  | Some of 'a

(* int option, string option, ... *)
\`\`\`

**Liste polymorphe :**
\`\`\`ocaml
let rec longueur liste =
  match liste with
  | [] -> 0
  | _ :: reste -> 1 + longueur reste
(* Type : 'a list -> int *)
\`\`\``,
          keyPoints: [
            '\'a représente un type quelconque',
            'Même code pour différents types',
            'Inférence automatique',
            'Types option, list sont polymorphes'
          ],
          exercises: [
            {
              id: 'ex8-1-1',
              type: 'qcm',
              question: 'Que signifie le type \'a -> \'a ?',
              options: [
                'Fonction qui prend un int et retourne un int',
                'Fonction qui prend et retourne le même type',
                'Fonction qui prend deux paramètres',
                'Fonction polymorphe quelconque'
              ],
              correctAnswer: 1,
              explanation: '\'a -> \'a signifie : prend une valeur de type \'a et retourne une valeur du MÊME type \'a.',
              difficulty: 'medium'
            },
            {
              id: 'ex8-1-2',
              type: 'true-false',
              question: 'Une fonction de type \'a -> int fonctionne pour n\'importe quel type en entrée.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! \'a peut être n\'importe quoi, donc la fonction accepte tout type en entrée et retourne un int.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch9-exceptions',
      title: 'Exceptions',
      description: 'Gestion des erreurs exceptionnelles',
      icon: '⚠️',
      color: 'bg-red-600/20',
      sections: [
        {
          id: 'sec9-1-exceptions-base',
          title: 'Lever et capturer des exceptions',
          content: `Les **exceptions** permettent de gérer les erreurs exceptionnelles.

**Lever une exception :**
\`\`\`ocaml
raise (Failure "message d'erreur")
failwith "message"  (* raccourci *)
\`\`\`

**Exceptions standard :**
- Division_by_zero
- Not_found
- Invalid_argument "msg"
- Failure "msg"

**Capturer avec try...with :**
\`\`\`ocaml
try
  1 / 0
with
  | Division_by_zero -> print_endline "Division par zéro !"

try
  List.hd []
with
  | Failure msg -> print_endline msg
  | _ -> print_endline "Autre erreur"
\`\`\`

**Définir ses propres exceptions :**
\`\`\`ocaml
exception Ma_erreur of string

raise (Ma_erreur "problème !")
\`\`\``,
          keyPoints: [
            'raise pour lever une exception',
            'try...with pour capturer',
            'failwith = raccourci',
            'Peut définir ses propres exceptions'
          ],
          exercises: [
            {
              id: 'ex9-1-1',
              type: 'qcm',
              question: 'Que fait failwith "erreur" ?',
              options: [
                'Affiche un message',
                'Lève une exception Failure',
                'Arrête le programme',
                'Retourne false'
              ],
              correctAnswer: 1,
              explanation: 'failwith lève une exception de type Failure avec le message donné.',
              difficulty: 'easy'
            },
            {
              id: 'ex9-1-2',
              type: 'fill-blank',
              question: 'Complète pour capturer :',
              blanks: [
                { text: '_____ expr with | exn -> valeur_par_defaut', answer: 'try' }
              ],
              correctAnswer: ['try'],
              explanation: 'On utilise try...with pour capturer les exceptions.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch10-references',
      title: 'Références et Effets de Bord',
      description: 'Mutabilité contrôlée en OCaml',
      icon: '📌',
      color: 'bg-amber-600/20',
      sections: [
        {
          id: 'sec10-1-references',
          title: 'Références mutables',
          content: `Les **références** permettent de créer des valeurs modifiables.

**Création :**
\`\`\`ocaml
let compteur = ref 0
(* Type : int ref *)
\`\`\`

**Lecture avec ! :**
\`\`\`ocaml
!compteur  (* 0 *)
\`\`\`

**Modification avec := :**
\`\`\`ocaml
compteur := !compteur + 1
compteur := 5
\`\`\`

**Exemple : compteur**
\`\`\`ocaml
let compteur = ref 0

let incrementer () =
  compteur := !compteur + 1

let valeur () = !compteur
\`\`\`

**⚠️ À utiliser avec parcimonie !**
- Brise l'immuabilité
- Rend le code moins prévisible
- Utiliser seulement quand nécessaire`,
          keyPoints: [
            'ref crée une référence',
            '! pour lire',
            ':= pour modifier',
            'À éviter sauf si vraiment nécessaire'
          ],
          tip: 'Les références sont utiles pour les compteurs, caches, ou quand l\'algorithme l\'exige vraiment.',
          exercises: [
            {
              id: 'ex10-1-1',
              type: 'matching',
              question: 'Associe chaque opération :',
              pairs: [
                { left: 'ref 5', right: 'Créer une référence' },
                { left: '!r', right: 'Lire la valeur' },
                { left: 'r := 10', right: 'Modifier la valeur' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'ref crée, ! lit, := modifie.',
              difficulty: 'easy'
            },
            {
              id: 'ex10-1-2',
              type: 'true-false',
              question: 'Les références violent le principe d\'immuabilité d\'OCaml.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! C\'est pourquoi il faut les utiliser avec parcimonie.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch11-modules',
      title: 'Modules et Signatures',
      description: 'Organisation et encapsulation du code',
      icon: '📦',
      color: 'bg-teal-600/20',
      sections: [
        {
          id: 'sec11-1-modules',
          title: 'Modules',
          content: `Les **modules** permettent d'organiser le code en unités logiques.

**Définition d'un module :**
\`\`\`ocaml
module MaListe = struct
  let vide = []

  let ajouter x liste = x :: liste

  let longueur = List.length
end
\`\`\`

**Utilisation :**
\`\`\`ocaml
MaListe.vide
MaListe.ajouter 5 []
MaListe.longueur [1; 2; 3]
\`\`\`

**Open (import) :**
\`\`\`ocaml
open MaListe
vide  (* pas besoin de MaListe. *)
\`\`\`

**Modules standards :**
- List (fonctions sur listes)
- String (manipulation de chaînes)
- Array (tableaux)
- Map, Set (structures de données)`,
          keyPoints: [
            'module Nom = struct...end',
            'Namespace : Module.fonction',
            'open pour importer',
            'Organisation du code'
          ],
          exercises: [
            {
              id: 'ex11-1-1',
              type: 'qcm',
              question: 'Comment appelle-t-on une fonction d\'un module ?',
              options: [
                'module.fonction',
                'Module.fonction',
                'module->fonction',
                'fonction@module'
              ],
              correctAnswer: 1,
              explanation: 'On utilise Module.fonction (avec majuscule au module).',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec11-2-signatures',
          title: 'Signatures (interfaces)',
          content: `Les **signatures** définissent l'interface publique d'un module.

**Définition d'une signature :**
\`\`\`ocaml
module type PILE = sig
  type 'a t
  val vide : 'a t
  val push : 'a -> 'a t -> 'a t
  val pop : 'a t -> 'a * 'a t
end
\`\`\`

**Implémentation :**
\`\`\`ocaml
module PileListe : PILE = struct
  type 'a t = 'a list

  let vide = []

  let push x pile = x :: pile

  let pop = function
    | [] -> failwith "pile vide"
    | x :: reste -> (x, reste)
end
\`\`\`

**Avantages :**
- **Encapsulation** : cache l'implémentation
- **Abstraction** : type abstrait
- **Contrat** : interface claire`,
          keyPoints: [
            'sig...end définit l\'interface',
            'type abstrait caché',
            'module : SIGNATURE = struct...',
            'Séparation interface/implémentation'
          ],
          exercises: [
            {
              id: 'ex11-2-1',
              type: 'true-false',
              question: 'Une signature permet de cacher l\'implémentation interne.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! C\'est le principe d\'encapsulation.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    }
  ]
}
