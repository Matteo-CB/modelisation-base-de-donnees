import { Course } from '../types'

export const programmationFonctionnelle: Course = {
  id: 'programmation-fonctionnelle',
  title: 'Programmation Fonctionnelle avec Lisp',
  description: 'Cours complet sur la programmation fonctionnelle et le langage Lisp (Common Lisp)',
  createdAt: '2024-01-01',
  chapters: [
    {
      id: 'ch1-structures-donnees',
      title: 'Introduction aux Structures de Données',
      description: 'Comprendre les structures de données du point de vue de la machine et du problème',
      icon: '🏗️',
      color: 'bg-blue-600/20',
      sections: [
        {
          id: 'sec1-1-introduction',
          title: 'Introduction aux structures de données',
          content: `Une **structure de données** est un ensemble de liaisons entre données qui se rapportent à différents aspects d'un même problème, pour les regrouper en une donnée complexe.

**Deux manières de concevoir les structures :**

1. **Point de vue de la machine** : partir du plus élémentaire (bits) pour aller vers le plus complexe
2. **Point de vue du problème** : partir de l'expression naturelle et réduire jusqu'à une structure compréhensible par la machine

**Données élémentaires :**
- Les caractères (bytes) sont les unités de base
- La mémoire est une séquence de bits (0 et 1)
- Les bits sont regroupés pour former des unités plus grandes

**Objectif :**
Traiter des problèmes complexes comme la simulation d'environnements réalistes en organisant les données de manière efficace.`,
          keyPoints: [
            'Structure de données = liaisons entre données',
            'Deux points de vue : machine et problème',
            'Données élémentaires : caractères et bits',
            'Organisation pour traiter la complexité'
          ],
          exercises: [
            {
              id: 'ex1-1-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'une structure de données ?',
              options: [
                'Un algorithme de calcul',
                'Un ensemble de liaisons entre données',
                'Un type de variable',
                'Un langage de programmation'
              ],
              correctAnswer: 1,
              explanation: 'Une structure de données est un ensemble de liaisons entre données qui se rapportent à différents aspects d\'un même problème.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-1-2',
              type: 'matching',
              question: 'Associe chaque approche à sa description :',
              pairs: [
                { left: 'Point de vue machine', right: 'Du plus élémentaire au plus complexe' },
                { left: 'Point de vue problème', right: 'De l\'expression naturelle à la structure machine' }
              ],
              correctAnswer: ['0-0', '1-1'],
              explanation: 'Le point de vue machine part des bits vers les structures complexes, tandis que le point de vue problème part de l\'expression naturelle.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec1-2-representation-interne',
          title: 'Représentation interne : le point de vue de la machine',
          content: `La mémoire est linéairement calibrée en **bits** (0 et 1). Pour accéder à une donnée, il faut connaître son adresse.

**Unités mémorielles :**
- **Bit** : unité élémentaire (2 états : 0 ou 1)
- **Byte/Octet** : 8 bits (256 valeurs possibles)
- Toutes les unités sont des puissances de 2

**Structures de données rigides :**

Une structure rigide contient deux parties :
1. **En-tête** (header) : indique comment lire les données (type, taille)
2. **Données** : le contenu proprement dit

**Trois types de structures rigides :**

1. **Scalaire** : une seule donnée
   - En-tête : type + taille
   - Exemple : un nombre entier

2. **Vecteur (tableau)** : suite de composantes de même type
   - En-tête : type + nombre de composantes + taille de chaque composante
   - Accès direct par indice
   - Formule : position = ((indice - 1) * taille) + 1

3. **Agrégat** : composantes de types différents
   - Structure hétérogène
   - Permet de regrouper des données liées`,
          keyPoints: [
            'Mémoire = séquence linéaire de bits',
            'Structure = en-tête + données',
            'Scalaire : une donnée',
            'Vecteur : accès par indice',
            'Agrégat : types hétérogènes'
          ],
          tip: 'La déclaration réserve l\'espace en mémoire, l\'affectation y écrit les données.',
          exercises: [
            {
              id: 'ex1-2-1',
              type: 'qcm',
              question: 'Combien de valeurs différentes peut stocker un byte (8 bits) ?',
              options: [
                '8',
                '16',
                '128',
                '256'
              ],
              correctAnswer: 3,
              explanation: 'Un byte de 8 bits peut stocker 2^8 = 256 valeurs différentes (de 0 à 255).',
              difficulty: 'easy'
            },
            {
              id: 'ex1-2-2',
              type: 'true-false',
              question: 'Dans un vecteur, on peut accéder directement à n\'importe quel élément par son indice.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! C\'est le principe de l\'accès direct : on calcule la position à partir de l\'indice.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-2-3',
              type: 'fill-blank',
              question: 'Une structure de données rigide contient deux parties : _____ et _____',
              blanks: [
                { text: 'Première partie : _____', answer: 'en-tête' },
                { text: 'Deuxième partie : _____', answer: 'données' }
              ],
              correctAnswer: ['en-tête', 'données'],
              explanation: 'L\'en-tête contient les métadonnées (type, taille), et les données contiennent le contenu proprement dit.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec1-3-pointeurs',
          title: 'Les pointeurs',
          content: `Les **pointeurs** sont des adresses mémoire qui permettent de créer des structures de données souples.

**Concept fondamental :**
- Un pointeur contient l'adresse d'une autre donnée en mémoire
- Permet de créer des liaisons dynamiques entre données
- Base des structures complexes comme les listes et les arbres

**Structures de données souples :**

Contrairement aux structures rigides, les structures souples :
- Peuvent grandir ou rétrécir dynamiquement
- Ne nécessitent pas de connaître la taille à l'avance
- Utilisent des pointeurs pour lier les éléments

**Doublet (cons cell) :**
- Structure fondamentale en Lisp
- Contient deux pointeurs : CAR et CDR
- CAR pointe vers la valeur
- CDR pointe vers le reste de la structure

**Représentation en mémoire :**
${'```'}
┌─────┬─────┐
│ CAR │ CDR │
└──┬──┴──┬──┘
   │     │
   ↓     ↓
 valeur  suite
${'```'}

**Liste chaînée :**
Une liste est une séquence de doublets où chaque CDR pointe vers le doublet suivant.`,
          keyPoints: [
            'Pointeur = adresse mémoire',
            'Structures souples vs rigides',
            'Doublet : CAR + CDR',
            'Base des listes en Lisp',
            'Croissance dynamique'
          ],
          example: {
            title: 'Liste (1 2 3)',
            content: '┌───┬───┐   ┌───┬───┐   ┌───┬───┐\n│ 1 │ ●─┼──→│ 2 │ ●─┼──→│ 3 │nil│\n└───┴───┘   └───┴───┘   └───┴───┘'
          },
          exercises: [
            {
              id: 'ex1-3-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'un pointeur ?',
              options: [
                'Une valeur numérique',
                'Une adresse mémoire',
                'Une fonction',
                'Un type de données'
              ],
              correctAnswer: 1,
              explanation: 'Un pointeur est une adresse mémoire qui permet de localiser une donnée en mémoire.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-3-2',
              type: 'matching',
              question: 'Associe chaque élément du doublet à sa fonction :',
              pairs: [
                { left: 'CAR', right: 'Pointe vers la valeur' },
                { left: 'CDR', right: 'Pointe vers le reste' }
              ],
              correctAnswer: ['0-0', '1-1'],
              explanation: 'CAR contient la valeur de l\'élément, CDR pointe vers le reste de la liste.',
              difficulty: 'medium'
            },
            {
              id: 'ex1-3-3',
              type: 'true-false',
              question: 'Les structures de données souples nécessitent de connaître la taille à l\'avance.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! C\'est justement l\'avantage des structures souples : elles peuvent grandir ou rétrécir dynamiquement.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec1-4-representation-externe',
          title: 'Représentation externe : le point de vue du problème',
          content: `Du point de vue du problème, on part de structures naturelles pour les ramener à des structures implémentables.

**Quatre types de structures :**

**1. Séquences (files, queues)**
- Ordre d'arrivée des éléments
- FIFO (First In, First Out) pour les files
- LIFO (Last In, First Out) pour les piles

**2. Ensembles**
- Pas d'ordre particulier
- Pas de doublons
- Opérations : union, intersection, différence

**3. Arborescences**
- Structure hiérarchique
- Un point d'entrée (racine)
- Pas de circuits (pas de retour à un nœud déjà visité)
- Exemples : arbre généalogique, système de fichiers

**4. Réseaux (graphes)**
- Structure la plus générale
- Plusieurs points d'entrée possibles
- Peut contenir des circuits
- Exemples : réseau social, réseau routier

**Ramener à des structures simples :**

Un réseau complexe peut être décomposé en :
- **Objets** : les nœuds du réseau
- **Relations statiques** : liens entre objets (attributs)
- **Relations dynamiques** : comportements (méthodes)

Chaque objet devient une **liste d'associations** (map/dictionnaire).`,
          keyPoints: [
            'Quatre structures : séquences, ensembles, arborescences, réseaux',
            'FIFO vs LIFO',
            'Arborescence : pas de circuits',
            'Réseau : le plus général',
            'Décomposer en objets simples'
          ],
          example: {
            title: 'Objet personne',
            content: '(Dupont\n  (taille 180)\n  (aime Duchmol)\n  (est-un informaticien))'
          },
          exercises: [
            {
              id: 'ex1-4-1',
              type: 'qcm',
              question: 'Quelle est la différence principale entre une arborescence et un réseau ?',
              options: [
                'La taille',
                'Les arborescences n\'ont pas de circuits',
                'Les réseaux n\'ont qu\'un point d\'entrée',
                'Il n\'y a pas de différence'
              ],
              correctAnswer: 1,
              explanation: 'Une arborescence n\'a pas de circuits (on ne peut pas revenir à un nœud déjà visité), contrairement à un réseau.',
              difficulty: 'medium'
            },
            {
              id: 'ex1-4-2',
              type: 'matching',
              question: 'Associe chaque structure à son type d\'accès :',
              pairs: [
                { left: 'File (FIFO)', right: 'Premier arrivé, premier servi' },
                { left: 'Pile (LIFO)', right: 'Dernier arrivé, premier servi' }
              ],
              correctAnswer: ['0-0', '1-1'],
              explanation: 'FIFO = First In First Out, LIFO = Last In First Out.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-4-3',
              type: 'ordering',
              question: 'Ordonne ces structures de la plus simple à la plus complexe :',
              items: [
                'Séquence',
                'Arborescence',
                'Réseau'
              ],
              correctAnswer: [0, 1, 2],
              explanation: 'Séquence (linéaire) < Arborescence (hiérarchique, pas de circuits) < Réseau (circuits possibles).',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec1-5-listes-associations',
          title: 'Arborescences et listes d\'associations',
          content: `Les **arborescences** sont des structures hiérarchiques fondamentales.

**Représentation parenthésée :**

En Lisp, on représente une arborescence avec des parenthèses :
${'```'}lisp
(A (B (E) (F)) (C (G)) (D (H) (I)))
${'```'}

Cette notation représente :
- A est la racine
- B, C, D sont les enfants de A
- E, F sont les enfants de B
- etc.

**Listes d'associations (alist) :**

Une liste d'associations est une arborescence à trois niveaux :
1. **Racine** : nom de l'objet
2. **Branches** : clés (attributs ou sélecteurs)
3. **Feuilles** : valeurs ou méthodes

**Exemple d'objet :**
${'```'}lisp
(Dupont
  (taille 180)
  (aime Duchmol)
  (deteste Truc)
  (est-un informaticien)
  (reaction-aux-blagues rigole))
${'```'}

**Avantages :**
- **Accès par nom** (clé) plutôt que par position
- Structure flexible
- Facile à modifier
- Base de la programmation orientée objet

**Conversion réseau → objet → arborescence → liste**

Cette chaîne permet de convertir n'importe quel problème complexe en structures implémentables.`,
          keyPoints: [
            'Arborescence : représentation parenthésée',
            'Liste d\'associations : 3 niveaux',
            'Accès par clé (nom)',
            'Conversion des structures complexes',
            'Base des objets'
          ],
          example: {
            title: 'Liste de propriétés',
            content: '(voiture\n  (marque "Renault")\n  (couleur "rouge")\n  (annee 2020))'
          },
          exercises: [
            {
              id: 'ex1-5-1',
              type: 'qcm',
              question: 'Combien de niveaux a une liste d\'associations typique ?',
              options: [
                '2 niveaux',
                '3 niveaux',
                '4 niveaux',
                'Illimité'
              ],
              correctAnswer: 1,
              explanation: 'Une liste d\'associations a 3 niveaux : racine (nom), branches (clés), feuilles (valeurs).',
              difficulty: 'easy'
            },
            {
              id: 'ex1-5-2',
              type: 'true-false',
              question: 'Dans une liste d\'associations, on accède aux valeurs par leur position.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! On accède aux valeurs par leur clé (nom), pas par position.',
              difficulty: 'medium'
            },
            {
              id: 'ex1-5-3',
              type: 'fill-blank',
              question: 'Une arborescence peut être convertie en _____',
              blanks: [
                { text: 'Une arborescence devient : _____', answer: 'liste d\'associations' }
              ],
              correctAnswer: ['liste d\'associations'],
              explanation: 'Les arborescences peuvent être représentées comme des listes d\'associations pour faciliter l\'implémentation.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch2-dialogue-processus',
      title: 'Dialogue, Processus et Structures de Contrôle',
      description: 'Comprendre le fonctionnement dynamique de la machine',
      icon: '⚙️',
      color: 'bg-green-600/20',
      sections: [
        {
          id: 'sec2-1-processus',
          title: 'Processus, procédures et fonctions',
          content: `La machine fonctionne comme une **cellule vivante** avec des entrées et des sorties.

**Composants dynamiques :**

**1. Périphériques d'entrée**
- Clavier, souris, écran tactile
- Reçoivent les signaux de l'extérieur

**2. Périphériques de sortie**
- Écran, enceintes
- Émettent les signaux vers l'extérieur

**3. Mémoire tampon (buffer)**
- Zone frontière entre l'intérieur et l'extérieur
- C'est là que s'exécutent les processus

**Processus :**

Un **processus** est une activité qui se déroule dans la machine :
- Modifie l'état de la mémoire
- Peut déclencher d'autres processus
- Peut être simple ou complexe (décomposable)

**Procédure vs Fonction :**

**Procédure** :
- Séquence d'instructions
- Peut avoir des effets de bord
- Ne retourne pas forcément de valeur

**Fonction** :
- Calcul qui produit une valeur
- Idéalement sans effets de bord (pure)
- Retourne toujours une valeur

**Processus élémentaires :**
- Lecture (read) : recevoir des données
- Écriture (write) : envoyer des données
- Calcul : transformer des données`,
          keyPoints: [
            'Machine = cellule vivante',
            'Processus : activité en mémoire',
            'Procédure : séquence d\'instructions',
            'Fonction : calcul → valeur',
            'Mémoire tampon : zone d\'exécution'
          ],
          exercises: [
            {
              id: 'ex2-1-1',
              type: 'qcm',
              question: 'Quelle est la différence principale entre une fonction et une procédure ?',
              options: [
                'La taille du code',
                'Une fonction retourne toujours une valeur',
                'Une procédure est plus rapide',
                'Il n\'y a pas de différence'
              ],
              correctAnswer: 1,
              explanation: 'Une fonction retourne toujours une valeur, tandis qu\'une procédure exécute des actions sans forcément retourner de valeur.',
              difficulty: 'medium'
            },
            {
              id: 'ex2-1-2',
              type: 'matching',
              question: 'Associe chaque composant à sa fonction :',
              pairs: [
                { left: 'Périphérique d\'entrée', right: 'Reçoit les signaux' },
                { left: 'Périphérique de sortie', right: 'Émet les signaux' },
                { left: 'Mémoire tampon', right: 'Exécute les processus' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque composant a un rôle spécifique dans le fonctionnement de la machine.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec2-2-structures-controle',
          title: 'Structures de contrôle fondamentales',
          content: `Les **structures de contrôle** organisent les relations temporelles entre processus.

**Trois structures fondamentales :**

**1. Séquence**
- Exécution l'une après l'autre
- Ordre important
${'```'}lisp
(progn
  (instruction1)
  (instruction2)
  (instruction3))
${'```'}

**2. Alternative (conditionnelle)**
- Choix entre plusieurs branches
- Basé sur une condition
${'```'}lisp
(if condition
    alors
    sinon)
${'```'}

**3. Itération (boucle)**
- Répétition d'un processus
- Tant qu'une condition est vraie
${'```'}lisp
(loop while condition
  do (corps))
${'```'}

**Combinaison des structures :**

Ces trois structures peuvent se combiner pour créer n'importe quel algorithme. C'est le **théorème de structure** de Böhm-Jacopini.

**Récursivité :**

En programmation fonctionnelle, on privilégie la **récursivité** aux boucles :
- Une fonction s'appelle elle-même
- Condition d'arrêt (cas de base)
- Cas récursif qui rapproche de la solution`,
          keyPoints: [
            'Trois structures : séquence, alternative, itération',
            'Séquence : une après l\'autre',
            'Alternative : si...alors...sinon',
            'Itération : répétition',
            'Récursivité > boucles en fonctionnel'
          ],
          example: {
            title: 'If en Lisp',
            content: '(if (> x 10)\n    "grand"\n    "petit")'
          },
          exercises: [
            {
              id: 'ex2-2-1',
              type: 'qcm',
              question: 'Combien y a-t-il de structures de contrôle fondamentales ?',
              options: [
                '2',
                '3',
                '4',
                '5'
              ],
              correctAnswer: 1,
              explanation: 'Il y a 3 structures fondamentales : séquence, alternative et itération.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-2-2',
              type: 'matching',
              question: 'Associe chaque structure à sa description :',
              pairs: [
                { left: 'Séquence', right: 'Exécution l\'une après l\'autre' },
                { left: 'Alternative', right: 'Choix selon condition' },
                { left: 'Itération', right: 'Répétition' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque structure a un rôle spécifique dans le contrôle du flux d\'exécution.',
              difficulty: 'medium'
            },
            {
              id: 'ex2-2-3',
              type: 'true-false',
              question: 'En programmation fonctionnelle, on préfère la récursivité aux boucles.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! La récursivité est plus naturelle en programmation fonctionnelle que les boucles impératives.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec2-3-piles-queues',
          title: 'Piles et queues',
          content: `Les **piles** et **queues** sont des structures de données dynamiques essentielles.

**Pile (Stack) - LIFO**

**Last In, First Out** : le dernier entré est le premier sorti

**Opérations :**
- **push** : empiler (ajouter au sommet)
- **pop** : dépiler (retirer du sommet)
- **peek** : voir le sommet sans retirer

**Analogie** : pile d'assiettes

**Utilisation** :
- Pile d'appels de fonctions
- Annuler/Refaire (Undo/Redo)
- Parcours en profondeur

**Queue (File) - FIFO**

**First In, First Out** : le premier entré est le premier sorti

**Opérations :**
- **enqueue** : enfiler (ajouter à la fin)
- **dequeue** : défiler (retirer du début)

**Analogie** : file d'attente

**Utilisation** :
- Gestion des tâches
- Buffer de communication
- Parcours en largeur

**Implémentation en Lisp :**

**Pile :**
${'```'}lisp
; Empiler
(push element pile)

; Dépiler
(pop pile)
${'```'}

**Queue :**
On utilise deux pointeurs : tête et queue`,
          keyPoints: [
            'Pile : LIFO (dernier entré, premier sorti)',
            'Queue : FIFO (premier entré, premier sorti)',
            'Push/Pop pour les piles',
            'Enqueue/Dequeue pour les queues',
            'Utilisations différentes'
          ],
          example: {
            title: 'Pile vs Queue',
            content: 'Pile (1 2 3) → Pop → 3\nQueue (1 2 3) → Dequeue → 1'
          },
          exercises: [
            {
              id: 'ex2-3-1',
              type: 'qcm',
              question: 'Dans une pile, quel élément est retiré en premier ?',
              options: [
                'Le premier ajouté',
                'Le dernier ajouté',
                'Celui du milieu',
                'Au hasard'
              ],
              correctAnswer: 1,
              explanation: 'Dans une pile (LIFO), le dernier élément ajouté est le premier retiré.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-3-2',
              type: 'matching',
              question: 'Associe chaque structure à son principe :',
              pairs: [
                { left: 'Pile', right: 'LIFO' },
                { left: 'Queue', right: 'FIFO' }
              ],
              correctAnswer: ['0-0', '1-1'],
              explanation: 'Pile = LIFO (Last In First Out), Queue = FIFO (First In First Out).',
              difficulty: 'easy'
            },
            {
              id: 'ex2-3-3',
              type: 'ordering',
              question: 'On empile 1, puis 2, puis 3. Dans quel ordre les retire-t-on ?',
              items: ['3', '2', '1'],
              correctAnswer: [0, 1, 2],
              explanation: 'Dans une pile, on retire dans l\'ordre inverse : 3 (dernier), puis 2, puis 1 (premier).',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec2-4-pile-appels',
          title: 'Pile des appels',
          content: `La **pile des appels** (call stack) est fondamentale pour comprendre l'exécution des fonctions.

**Fonctionnement :**

Quand une fonction est appelée :
1. **Empiler** un contexte d'exécution (stack frame)
   - Paramètres de la fonction
   - Variables locales
   - Adresse de retour

2. **Exécuter** le corps de la fonction

3. **Dépiler** quand la fonction retourne
   - Reprendre l'exécution à l'adresse de retour

**Exemple d'appels imbriqués :**

${'```'}lisp
(defun f (x)
  (+ x 1))

(defun g (x)
  (f (* x 2)))

(g 5)
${'```'}

**État de la pile :**
${'```'}
┌─────────────┐
│ f(10)       │ ← Sommet
├─────────────┤
│ g(5)        │
├─────────────┤
│ toplevel    │
└─────────────┘
${'```'}

**Récursivité et pile :**

Chaque appel récursif ajoute un frame à la pile :
- Si trop d'appels : **débordement de pile** (stack overflow)
- Solution : **récursivité terminale** (tail recursion)

**Récursivité terminale :**

L'appel récursif est la dernière opération :
- Peut être optimisé en boucle
- Pas de débordement de pile
- Utilisé avec un accumulateur`,
          keyPoints: [
            'Pile d\'appels : gestion des fonctions',
            'Frame = paramètres + variables + retour',
            'Empiler à l\'appel, dépiler au retour',
            'Récursivité → empilement',
            'Récursivité terminale : optimisation'
          ],
          tip: 'En Lisp, la fonction TRACE permet de visualiser les appels et la pile.',
          exercises: [
            {
              id: 'ex2-4-1',
              type: 'qcm',
              question: 'Que contient un frame de la pile d\'appels ?',
              options: [
                'Seulement le nom de la fonction',
                'Paramètres, variables locales et adresse de retour',
                'Seulement le résultat',
                'Rien du tout'
              ],
              correctAnswer: 1,
              explanation: 'Un frame contient les paramètres, les variables locales et l\'adresse de retour.',
              difficulty: 'medium'
            },
            {
              id: 'ex2-4-2',
              type: 'true-false',
              question: 'La récursivité terminale permet d\'éviter le débordement de pile.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! La récursivité terminale peut être optimisée en boucle, évitant l\'empilement.',
              difficulty: 'medium'
            },
            {
              id: 'ex2-4-3',
              type: 'fill-blank',
              question: 'Quand une fonction retourne, on _____ le contexte de la pile',
              blanks: [
                { text: 'Action sur la pile : _____', answer: 'dépile' }
              ],
              correctAnswer: ['dépile'],
              explanation: 'On dépile le contexte pour revenir à l\'appelant.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch3-intro-lisp',
      title: 'Introduction à Lisp',
      description: 'Découvrir le langage Lisp et ses concepts fondamentaux',
      icon: '🎨',
      color: 'bg-purple-600/20',
      sections: [
        {
          id: 'sec3-1-read-eval-print',
          title: 'Read, Eval, Print : la boucle REPL',
          content: `Lisp fonctionne avec une boucle **REPL** : Read-Eval-Print Loop

**Les trois fonctions fondamentales :**

**1. READ**
- Lit une expression Lisp depuis l'entrée
- Convertit le texte en structure de données
- Retourne un pointeur vers l'objet créé

**2. EVAL**
- Évalue l'expression lue
- Si atome : retourne sa valeur liée
- Si liste : applique la fonction (car) aux arguments (cdr)
- Retourne le résultat

**3. PRINT**
- Affiche le résultat de eval
- Écrit dans le tampon de sortie

**La boucle REPL :**
${'```'}
┌──────┐
│ READ │
└──┬───┘
   ↓
┌──────┐
│ EVAL │
└──┬───┘
   ↓
┌───────┐
│ PRINT │
└───┬───┘
    ↓
  (loop)
${'```'}

**Exemples :**
${'```'}lisp
> (+ 1 2)
3

> (* 5 6)
30

> (quote a)
A
${'```'}

**Quote (') :**
Empêche l'évaluation
${'```'}lisp
> 'a
A

> '(1 2 3)
(1 2 3)
${'```'}`,
          keyPoints: [
            'REPL : Read-Eval-Print Loop',
            'READ : texte → structure',
            'EVAL : calcule le résultat',
            'PRINT : affiche',
            'Quote empêche l\'évaluation'
          ],
          example: {
            title: 'Session REPL',
            content: '> (+ 1 2)\n3\n> (* 3 4)\n12'
          },
          exercises: [
            {
              id: 'ex3-1-1',
              type: 'qcm',
              question: 'Que signifie REPL ?',
              options: [
                'Read-Execute-Print-Loop',
                'Read-Eval-Print-Loop',
                'Repeat-Eval-Print-Loop',
                'Read-Eval-Process-Loop'
              ],
              correctAnswer: 1,
              explanation: 'REPL signifie Read-Eval-Print Loop : lire, évaluer, afficher, recommencer.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-1-2',
              type: 'matching',
              question: 'Associe chaque fonction à son rôle :',
              pairs: [
                { left: 'READ', right: 'Convertit texte en structure' },
                { left: 'EVAL', right: 'Calcule le résultat' },
                { left: 'PRINT', right: 'Affiche' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque fonction a un rôle précis dans la boucle REPL.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-1-3',
              type: 'true-false',
              question: 'Le symbole quote (\') empêche l\'évaluation d\'une expression.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Quote retourne l\'expression telle quelle sans l\'évaluer.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-2-s-expressions',
          title: 'S-expressions et notation préfixée',
          content: `Les **S-expressions** (Symbolic Expressions) sont la syntaxe fondamentale de Lisp.

**Forme générale :**
${'```'}lisp
(fonction arg1 arg2 ... argN)
${'```'}

**Notation préfixée :**

L'opérateur vient AVANT les opérandes :
${'```'}lisp
; Au lieu de : 1 + 2
(+ 1 2)

; Au lieu de : 5 * 3
(* 5 3)

; Au lieu de : (1 + 2) * 3
(* (+ 1 2) 3)
${'```'}

**Avantages :**
- Pas d'ambiguïté (pas besoin de priorité d'opérateurs)
- Nombre d'arguments variable
- Uniformité : tout est une liste

**Types d'expressions :**

**1. Atome**
- Nombre : 42, 3.14
- Symbole : x, foo, +
- Chaîne : "hello"
- Booléen : t (vrai), nil (faux)

**2. Liste**
- Suite d'éléments entre parenthèses
- ${'```'}(1 2 3)${'```'}
- ${'```'}(a b (c d))${'```'} (listes imbriquées)

**Exemples :**
${'```'}lisp
(+ 1 2 3 4 5)           ; 15
(* 2 (+ 3 4))           ; 14
(list 'a 'b 'c)         ; (A B C)
${'```'}`,
          keyPoints: [
            'S-expression : syntaxe de base',
            'Notation préfixée : (op arg1 arg2)',
            'Atome : nombre, symbole, chaîne',
            'Liste : (elem1 elem2 ...)',
            'Tout est une liste'
          ],
          tip: 'En Lisp, le code est une donnée et la donnée est du code !',
          exercises: [
            {
              id: 'ex3-2-1',
              type: 'qcm',
              question: 'Quelle est la notation correcte pour calculer 3 + 4 en Lisp ?',
              options: [
                '3 + 4',
                '(+ 3 4)',
                '+ 3 4',
                '(3 + 4)'
              ],
              correctAnswer: 1,
              explanation: 'En Lisp, on utilise la notation préfixée : (+ 3 4).',
              difficulty: 'easy'
            },
            {
              id: 'ex3-2-2',
              type: 'fill-blank',
              question: 'En Lisp, (- 10 3) vaut _____',
              blanks: [
                { text: 'Résultat : _____', answer: '7' }
              ],
              correctAnswer: ['7'],
              explanation: '(- 10 3) soustrait 3 de 10, ce qui donne 7.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-2-3',
              type: 'true-false',
              question: 'En notation préfixée, il n\'y a pas de priorité d\'opérateurs à retenir.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Les parenthèses indiquent explicitement l\'ordre d\'évaluation.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec3-3-evaluation',
          title: 'Mécanisme d\'évaluation',
          content: `Comprendre comment Lisp **évalue** les expressions est essentiel.

**Règles d'évaluation :**

**1. Atomes**
- **Nombres** : s'évaluent en eux-mêmes
  ${'```'}lisp
  42 → 42
  3.14 → 3.14
  ${'```'}

- **Symboles** : cherchent leur valeur liée
  ${'```'}lisp
  (setq x 10)
  x → 10
  ${'```'}

- **T et NIL** : constantes booléennes
  ${'```'}lisp
  t → T (vrai)
  nil → NIL (faux et liste vide)
  ${'```'}

**2. Listes**
- Le **CAR** (premier élément) est la fonction
- Le **CDR** (reste) contient les arguments
- Tous les arguments sont évalués (sauf formes spéciales)
- La fonction est appliquée aux résultats

**Exemple :**
${'```'}lisp
(+ (* 2 3) (- 10 5))

1. Évaluer (* 2 3) → 6
2. Évaluer (- 10 5) → 5
3. Évaluer (+ 6 5) → 11
${'```'}

**Formes spéciales :**

Certaines formes ne suivent pas les règles normales :
- **QUOTE** : ne pas évaluer
- **IF** : n'évalue qu'une branche
- **SETQ** : le premier argument n'est pas évalué

**Auto-évaluation et eval :**
${'```'}lisp
(eval (eval '(+ 1 2)))  ; 3
${'```'}`,
          keyPoints: [
            'Nombres : auto-évaluation',
            'Symboles : cherchent leur valeur',
            'Listes : appel de fonction',
            'CAR = fonction, CDR = arguments',
            'Formes spéciales : exceptions'
          ],
          example: {
            title: 'Évaluation imbriquée',
            content: '(* (+ 1 2) (- 5 2))\n→ (* 3 3)\n→ 9'
          },
          exercises: [
            {
              id: 'ex3-3-1',
              type: 'qcm',
              question: 'Que fait (eval \'(+ 1 2)) ?',
              options: [
                'Retourne la liste (+ 1 2)',
                'Calcule 1 + 2 et retourne 3',
                'Provoque une erreur',
                'Retourne le symbole +'
              ],
              correctAnswer: 1,
              explanation: 'eval évalue l\'expression quotée (+ 1 2), ce qui calcule 3.',
              difficulty: 'medium'
            },
            {
              id: 'ex3-3-2',
              type: 'matching',
              question: 'Associe chaque type à son évaluation :',
              pairs: [
                { left: 'Nombre', right: 'Auto-évaluation' },
                { left: 'Symbole', right: 'Cherche sa valeur' },
                { left: 'Liste', right: 'Appel de fonction' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque type d\'expression a son propre mécanisme d\'évaluation.',
              difficulty: 'medium'
            },
            {
              id: 'ex3-3-3',
              type: 'true-false',
              question: 'Dans une liste, tous les arguments sont toujours évalués avant l\'appel.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Les formes spéciales (if, quote, setq...) ont des règles d\'évaluation différentes.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec3-4-liaison-variables',
          title: 'Liaison de variables : SET et SETQ',
          content: `En Lisp, on **lie** (bind) un nom à une valeur.

**SET : liaison avec évaluation**

Avec SET, les deux arguments sont évalués :
${'```'}lisp
(set 'x 10)      ; Lie X à 10
x                ; → 10

(set 'y 'x)      ; Lie Y au symbole X
y                ; → X
(eval y)         ; → 10
${'```'}

**Attention** : il faut quoter le nom !

**SETQ : quote automatique**

SETQ (SET with Quote) ne quote que le premier argument :
${'```'}lisp
(setq x 10)      ; Équivalent à (set 'x 10)
x                ; → 10

(setq y (+ 5 3)) ; Le deuxième argument est évalué
y                ; → 8
${'```'}

**SETQ est plus pratique dans 99% des cas.**

**Liaisons multiples :**
${'```'}lisp
(setq a 1
      b 2
      c 3)
${'```'}

**Exemples avancés :**
${'```'}lisp
(setq x 'foo)
(setq foo 'bar)
(eval x)         ; → BAR

(setq liste '(1 2 3))
(car liste)      ; → 1
${'```'}

**Portée des variables :**
- **Globales** : définies avec setq au toplevel
- **Locales** : définies avec let dans une fonction`,
          keyPoints: [
            'SET : évalue les deux arguments',
            'SETQ : quote le premier automatiquement',
            'Préférer SETQ en pratique',
            'Liaison = nom → valeur',
            'Portée : globale vs locale'
          ],
          tip: 'SETQ = SET + Quote automatique sur le nom',
          exercises: [
            {
              id: 'ex3-4-1',
              type: 'qcm',
              question: 'Quelle est la différence entre SET et SETQ ?',
              options: [
                'Il n\'y en a pas',
                'SETQ quote automatiquement le premier argument',
                'SET est plus rapide',
                'SETQ ne peut lier qu\'un seul nom'
              ],
              correctAnswer: 1,
              explanation: 'SETQ quote automatiquement le premier argument (le nom de la variable).',
              difficulty: 'medium'
            },
            {
              id: 'ex3-4-2',
              type: 'fill-blank',
              question: 'Après (setq x 5), la valeur de x est _____',
              blanks: [
                { text: 'Valeur : _____', answer: '5' }
              ],
              correctAnswer: ['5'],
              explanation: 'SETQ lie le symbole X à la valeur 5.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-4-3',
              type: 'true-false',
              question: 'Avec SETQ, il faut quoter le nom de la variable.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! SETQ quote automatiquement le premier argument.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-5-listes-lisp',
          title: 'Manipulation de listes',
          content: `Les **listes** sont la structure de données fondamentale de Lisp.

**Construction de listes :**

**CONS** : ajoute un élément en tête
${'```'}lisp
(cons 1 '(2 3))     ; → (1 2 3)
(cons 'a 'b)        ; → (A . B)  (paire pointée)
${'```'}

**LIST** : crée une liste
${'```'}lisp
(list 1 2 3)        ; → (1 2 3)
(list 'a (+ 1 2))   ; → (A 3)
${'```'}

**Accès aux éléments :**

**CAR** : premier élément
${'```'}lisp
(car '(a b c))      ; → A
${'```'}

**CDR** : reste de la liste
${'```'}lisp
(cdr '(a b c))      ; → (B C)
${'```'}

**Combinaisons :**
${'```'}lisp
(cadr '(a b c))     ; = (car (cdr ...)) → B
(caddr '(a b c))    ; = (car (cdr (cdr ...))) → C
${'```'}

**NIL : liste vide**
${'```'}lisp
'()                 ; → NIL
nil                 ; → NIL
(car nil)           ; → NIL
(cdr nil)           ; → NIL
${'```'}

**Tests sur les listes :**
${'```'}lisp
(null '())          ; → T
(listp '(a b))      ; → T
(atom 'a)           ; → T
${'```'}`,
          keyPoints: [
            'CONS : ajoute en tête',
            'LIST : crée une liste',
            'CAR : premier élément',
            'CDR : reste',
            'NIL : liste vide et faux'
          ],
          example: {
            title: 'Construction progressive',
            content: '(cons 1 (cons 2 (cons 3 nil)))\n→ (1 2 3)'
          },
          exercises: [
            {
              id: 'ex3-5-1',
              type: 'qcm',
              question: 'Que retourne (car \'(1 2 3)) ?',
              options: [
                '1',
                '(1)',
                '(2 3)',
                '3'
              ],
              correctAnswer: 0,
              explanation: 'CAR retourne le premier élément de la liste, soit 1.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-5-2',
              type: 'fill-blank',
              question: 'Que retourne (cdr \'(a b c)) ?',
              blanks: [
                { text: 'Résultat : _____', answer: '(b c)' }
              ],
              correctAnswer: ['(b c)'],
              explanation: 'CDR retourne le reste de la liste sans le premier élément.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-5-3',
              type: 'matching',
              question: 'Associe chaque fonction à son résultat pour \'(1 2 3) :',
              pairs: [
                { left: 'car', right: '1' },
                { left: 'cdr', right: '(2 3)' },
                { left: 'cadr', right: '2' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'CAR donne 1, CDR donne (2 3), CADR = (car (cdr ...)) donne 2.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch4-creer-fonctions',
      title: 'Créer des Fonctions',
      description: 'Définir et utiliser des fonctions en Lisp',
      icon: '🔧',
      color: 'bg-orange-600/20',
      sections: [
        {
          id: 'sec4-1-defun',
          title: 'Définir des fonctions avec DEFUN',
          content: `**DEFUN** permet de définir des fonctions en Lisp.

**Syntaxe :**
${'```'}lisp
(defun nom-fonction (paramètres)
  corps)
${'```'}

**Exemple simple :**
${'```'}lisp
(defun carre (x)
  (* x x))

(carre 5)  ; → 25
${'```'}

**Fonction avec plusieurs paramètres :**
${'```'}lisp
(defun somme (a b)
  (+ a b))

(somme 3 4)  ; → 7
${'```'}

**Fonction sans paramètre :**
${'```'}lisp
(defun dire-bonjour ()
  "Bonjour !")

(dire-bonjour)  ; → "Bonjour !"
${'```'}

**Valeur de retour :**

La dernière expression évaluée est retournée :
${'```'}lisp
(defun moyenne (a b)
  (/ (+ a b) 2))

(moyenne 10 20)  ; → 15
${'```'}

**Fonctions locales avec LABELS :**
${'```'}lisp
(labels ((helper (x) (* x 2)))
  (helper 5))  ; → 10
${'```'}

**Documentation :**
${'```'}lisp
(defun aire-carre (cote)
  "Calcule l'aire d'un carré"
  (* cote cote))
${'```'}`,
          keyPoints: [
            'DEFUN : définir une fonction',
            'Paramètres entre parenthèses',
            'Dernière expression = retour',
            'Documentation possible',
            'LABELS : fonctions locales'
          ],
          example: {
            title: 'Fonction double',
            content: '(defun double (x)\n  (* x 2))\n\n(double 7)  ; → 14'
          },
          exercises: [
            {
              id: 'ex4-1-1',
              type: 'qcm',
              question: 'Comment définit-on une fonction en Lisp ?',
              options: [
                'function nom()',
                '(defun nom ())',
                'def nom():',
                'function nom {}'
              ],
              correctAnswer: 1,
              explanation: 'On utilise DEFUN avec la syntaxe (defun nom (params) corps).',
              difficulty: 'easy'
            },
            {
              id: 'ex4-1-2',
              type: 'fill-blank',
              question: 'Complète la fonction qui triple un nombre : (defun triple (x) (_____  x  3))',
              blanks: [
                { text: 'Opérateur : _____', answer: '*' }
              ],
              correctAnswer: ['*'],
              explanation: 'Pour tripler, on multiplie par 3 : (* x 3).',
              difficulty: 'easy'
            },
            {
              id: 'ex4-1-3',
              type: 'true-false',
              question: 'En Lisp, la dernière expression évaluée dans une fonction est automatiquement retournée.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Pas besoin de mot-clé return, la dernière valeur est retournée.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec4-2-recursivite',
          title: 'Récursivité',
          content: `La **récursivité** est au cœur de la programmation fonctionnelle.

**Principe :**

Une fonction récursive s'appelle elle-même jusqu'à atteindre un **cas de base**.

**Anatomie d'une fonction récursive :**

1. **Cas de base** : condition d'arrêt
2. **Cas récursif** : appel à soi-même avec un argument plus simple

**Exemple : factorielle**
${'```'}lisp
(defun factorielle (n)
  (if (<= n 1)
      1                        ; Cas de base
      (* n (factorielle (- n 1)))))  ; Cas récursif

(factorielle 5)  ; → 120
${'```'}

**Trace de l'exécution :**
${'```'}
(factorielle 5)
→ (* 5 (factorielle 4))
→ (* 5 (* 4 (factorielle 3)))
→ (* 5 (* 4 (* 3 (factorielle 2))))
→ (* 5 (* 4 (* 3 (* 2 (factorielle 1)))))
→ (* 5 (* 4 (* 3 (* 2 1))))
→ 120
${'```'}

**Exemple : longueur de liste**
${'```'}lisp
(defun longueur (liste)
  (if (null liste)
      0                           ; Cas de base
      (+ 1 (longueur (cdr liste)))))  ; Cas récursif

(longueur '(a b c))  ; → 3
${'```'}

**Récursivité vs itération :**

Lisp privilégie la récursivité car :
- Plus déclarative
- Plus naturelle pour les listes
- Plus facile à raisonner`,
          keyPoints: [
            'Fonction qui s\'appelle elle-même',
            'Cas de base : condition d\'arrêt',
            'Cas récursif : simplification',
            'Trace pour comprendre',
            'Récursivité > boucles'
          ],
          tip: 'Utilisez la fonction TRACE pour visualiser les appels récursifs.',
          exercises: [
            {
              id: 'ex4-2-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'un cas de base dans une fonction récursive ?',
              options: [
                'Le premier appel',
                'La condition d\'arrêt',
                'L\'appel récursif',
                'Le résultat final'
              ],
              correctAnswer: 1,
              explanation: 'Le cas de base est la condition d\'arrêt qui empêche la récursion infinie.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-2-2',
              type: 'true-false',
              question: 'Une fonction récursive doit toujours avoir un cas de base.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Sans cas de base, la récursion serait infinie.',
              difficulty: 'easy'
            },
            {
              id: 'ex4-2-3',
              type: 'fill-blank',
              question: 'La factorielle de 0 est _____',
              blanks: [
                { text: 'Résultat : _____', answer: '1' }
              ],
              correctAnswer: ['1'],
              explanation: 'Par définition, 0! = 1 (cas de base de la factorielle).',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec4-3-recursivite-terminale',
          title: 'Récursivité terminale et accumulateurs',
          content: `La **récursivité terminale** est une optimisation importante.

**Problème de la récursivité simple :**
- Chaque appel empile un contexte
- Risque de débordement de pile (stack overflow)

**Solution : récursivité terminale**

L'appel récursif est la **dernière opération** :
- Pas besoin d'empiler
- Peut être optimisé en boucle
- Pas de limite de profondeur

**Technique de l'accumulateur :**

On passe le résultat partiel en paramètre.

**Exemple : factorielle terminale**
${'```'}lisp
(defun fact-term (n acc)
  (if (<= n 1)
      acc
      (fact-term (- n 1) (* n acc))))

(defun factorielle (n)
  (fact-term n 1))

(factorielle 5)  ; → 120
${'```'}

**Comparaison :**

**Non terminale :**
${'```'}lisp
(* 5 (fact 4))  ; Il faut garder le *
(* 5 (* 4 (fact 3)))
→ empile des opérations
${'```'}

**Terminale :**
${'```'}lisp
(fact-term 5 1)
(fact-term 4 5)
(fact-term 3 20)
(fact-term 2 60)
(fact-term 1 120)
→ 120
→ pas d'empilement
${'```'}

**Somme de liste terminale :**
${'```'}lisp
(defun somme-aux (liste acc)
  (if (null liste)
      acc
      (somme-aux (cdr liste)
                 (+ (car liste) acc))))

(defun somme (liste)
  (somme-aux liste 0))
${'```'}`,
          keyPoints: [
            'Appel récursif = dernière opération',
            'Accumulateur : résultat partiel',
            'Optimisable en boucle',
            'Pas de débordement de pile',
            'Fonction auxiliaire avec acc'
          ],
          tip: 'L\'accumulateur accumule le résultat au fur et à mesure.',
          exercises: [
            {
              id: 'ex4-3-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'un accumulateur ?',
              options: [
                'Une variable globale',
                'Un paramètre qui accumule le résultat partiel',
                'Une fonction spéciale',
                'Un type de données'
              ],
              correctAnswer: 1,
              explanation: 'L\'accumulateur est un paramètre qui accumule le résultat au fur et à mesure des appels.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-3-2',
              type: 'true-false',
              question: 'La récursivité terminale peut être optimisée en boucle.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Le compilateur peut transformer la récursion terminale en boucle.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-3-3',
              type: 'matching',
              question: 'Associe chaque type à sa caractéristique :',
              pairs: [
                { left: 'Récursivité simple', right: 'Empile des opérations' },
                { left: 'Récursivité terminale', right: 'Dernière opération' }
              ],
              correctAnswer: ['0-0', '1-1'],
              explanation: 'La récursivité simple empile, la terminale peut être optimisée.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec4-4-fonctions-listes',
          title: 'Fonctions classiques sur les listes',
          content: `Lisp propose des fonctions puissantes pour manipuler les listes.

**APPEND : concaténer des listes**
${'```'}lisp
(append '(1 2) '(3 4))     ; → (1 2 3 4)
(append '(a) '(b) '(c))    ; → (A B C)
${'```'}

**REVERSE : inverser une liste**
${'```'}lisp
(reverse '(1 2 3))         ; → (3 2 1)
${'```'}

**LENGTH : longueur**
${'```'}lisp
(length '(a b c d))        ; → 4
${'```'}

**NTH : nième élément (base 0)**
${'```'}lisp
(nth 0 '(a b c))           ; → A
(nth 2 '(a b c))           ; → C
${'```'}

**MEMBER : chercher un élément**
${'```'}lisp
(member 'b '(a b c))       ; → (B C)
(member 'x '(a b c))       ; → NIL
${'```'}

**REMOVE : enlever un élément**
${'```'}lisp
(remove 'b '(a b c b))     ; → (A C)
${'```'}

**SUBST : substituer**
${'```'}lisp
(subst 'x 'b '(a b c b))   ; → (A X C X)
${'```'}

**Implémenter APPEND récursivement :**
${'```'}lisp
(defun mon-append (l1 l2)
  (if (null l1)
      l2
      (cons (car l1)
            (mon-append (cdr l1) l2))))
${'```'}`,
          keyPoints: [
            'APPEND : concaténer',
            'REVERSE : inverser',
            'NTH : accès par indice',
            'MEMBER : recherche',
            'REMOVE : suppression'
          ],
          example: {
            title: 'Combinaisons',
            content: '(reverse (append \'(1 2) \'(3 4)))\n→ (4 3 2 1)'
          },
          exercises: [
            {
              id: 'ex4-4-1',
              type: 'qcm',
              question: 'Que retourne (append \'(a b) \'(c d)) ?',
              options: [
                '(a b c d)',
                '((a b) (c d))',
                '(a (b c) d)',
                '(a c b d)'
              ],
              correctAnswer: 0,
              explanation: 'APPEND concatène les listes : (a b c d).',
              difficulty: 'easy'
            },
            {
              id: 'ex4-4-2',
              type: 'fill-blank',
              question: 'Que retourne (reverse \'(1 2 3)) ?',
              blanks: [
                { text: 'Résultat : _____', answer: '(3 2 1)' }
              ],
              correctAnswer: ['(3 2 1)'],
              explanation: 'REVERSE inverse l\'ordre des éléments.',
              difficulty: 'easy'
            },
            {
              id: 'ex4-4-3',
              type: 'true-false',
              question: 'NTH utilise l\'indexation base 0 (le premier élément est à l\'indice 0).',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! (nth 0 liste) retourne le premier élément.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch5-maitriser-environnement',
      title: 'Maîtriser son Environnement',
      description: 'Techniques avancées de manipulation et programmation',
      icon: '⚡',
      color: 'bg-red-600/20',
      sections: [
        {
          id: 'sec5-1-chirurgie-pointeurs',
          title: 'Chirurgie : au plus près des pointeurs',
          content: `La **chirurgie** consiste à modifier directement les structures de données en mémoire.

**Fonctions destructives :**

Contrairement aux fonctions pures qui créent de nouvelles structures, les fonctions destructives modifient les structures existantes.

**RPLACA** : remplace le CAR
${'```'}lisp
(setq liste '(a b c))
(rplaca liste 'x)  ; Modifie le CAR
liste              ; → (X B C)
${'```'}

**RPLACD** : remplace le CDR
${'```'}lisp
(setq liste '(a b c))
(rplacd liste '(y z))
liste              ; → (A Y Z)
${'```'}

**Avantages :**
- Plus efficace (pas de copie)
- Économise la mémoire
- Opérations en place

**Dangers :**
- Effets de bord
- Structure partagée peut causer des bugs
- Difficile à déboguer

**Exemple de partage :**
${'```'}lisp
(setq l1 '(a b c))
(setq l2 l1)        ; Partage la même structure
(rplaca l1 'x)
l2                  ; → (X B C) aussi modifié !
${'```'}

**Quand utiliser :**
- Performance critique
- Structures non partagées
- Algorithmes en place (tri, etc.)`,
          keyPoints: [
            'Chirurgie : modification destructive',
            'RPLACA : remplace CAR',
            'RPLACD : remplace CDR',
            'Attention au partage de structure',
            'Efficace mais dangereux'
          ],
          tip: 'Préférez les fonctions non-destructives sauf si la performance est critique.',
          exercises: [
            {
              id: 'ex5-1-1',
              type: 'qcm',
              question: 'Que fait RPLACA ?',
              options: [
                'Remplace le CDR',
                'Remplace le CAR',
                'Ajoute un élément',
                'Copie la liste'
              ],
              correctAnswer: 1,
              explanation: 'RPLACA remplace le CAR (premier élément) d\'une liste de manière destructive.',
              difficulty: 'medium'
            },
            {
              id: 'ex5-1-2',
              type: 'true-false',
              question: 'Les fonctions destructives créent de nouvelles structures en mémoire.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Elles modifient les structures existantes, ce qui est plus efficace mais plus dangereux.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec5-2-fonctions-ordre-superieur',
          title: 'Fonctions d\'ordre supérieur',
          content: `Les **fonctions d'ordre supérieur** sont des fonctions qui manipulent d'autres fonctions.

**MAPCAR** : applique une fonction à chaque élément
${'```'}lisp
(mapcar #'(lambda (x) (* x 2)) '(1 2 3))
; → (2 4 6)

(defun carre (x) (* x x))
(mapcar #'carre '(1 2 3 4))
; → (1 4 9 16)
${'```'}

**APPLY** : applique une fonction à une liste d'arguments
${'```'}lisp
(apply #'+ '(1 2 3 4))    ; → 10
(apply #'max '(5 2 9 1))  ; → 9
${'```'}

**FUNCALL** : appelle une fonction
${'```'}lisp
(funcall #'+ 1 2 3)       ; → 6
(funcall #'car '(a b c))  ; → A
${'```'}

**REDUCE** : réduit une liste avec une fonction
${'```'}lisp
(reduce #'+ '(1 2 3 4))   ; → 10
(reduce #'* '(2 3 4))     ; → 24
${'```'}

**FILTER (REMOVE-IF-NOT)** : filtre une liste
${'```'}lisp
(remove-if-not #'evenp '(1 2 3 4 5 6))
; → (2 4 6)

(remove-if-not #'(lambda (x) (> x 5)) '(3 8 2 9 4))
; → (8 9)
${'```'}

**Composition de fonctions :**
${'```'}lisp
(defun compose (f g)
  #'(lambda (x) (funcall f (funcall g x))))

(funcall (compose #'1+ #'(lambda (x) (* x 2))) 5)
; → 11  (d'abord *2 → 10, puis +1 → 11)
${'```'}`,
          keyPoints: [
            'Fonctions qui manipulent des fonctions',
            'MAPCAR : applique à chaque élément',
            'APPLY : applique à une liste',
            'REDUCE : réduit une liste',
            'Composition de fonctions'
          ],
          example: {
            title: 'Double de tous',
            content: '(mapcar #\'(lambda (x) (* x 2)) \'(1 2 3))\n→ (2 4 6)'
          },
          exercises: [
            {
              id: 'ex5-2-1',
              type: 'qcm',
              question: 'Que fait (mapcar #\'1+ \'(1 2 3)) ?',
              options: [
                '(1 2 3)',
                '(2 3 4)',
                '(3 6 9)',
                '6'
              ],
              correctAnswer: 1,
              explanation: 'MAPCAR applique 1+ (ajoute 1) à chaque élément : (2 3 4).',
              difficulty: 'medium'
            },
            {
              id: 'ex5-2-2',
              type: 'fill-blank',
              question: 'Que retourne (apply #\'+ \'(1 2 3)) ?',
              blanks: [
                { text: 'Résultat : _____', answer: '6' }
              ],
              correctAnswer: ['6'],
              explanation: 'APPLY applique + à la liste, ce qui fait 1 + 2 + 3 = 6.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec5-3-macro-fonctions',
          title: 'Macro-fonctions',
          content: `Les **macros** permettent d'étendre la syntaxe de Lisp.

**Différence macro vs fonction :**

**Fonction** :
- Arguments évalués AVANT l'appel
- Retourne une valeur

**Macro** :
- Arguments NON évalués (code brut)
- Retourne du CODE qui sera évalué

**DEFMACRO** : définir une macro
${'```'}lisp
(defmacro when (condition &rest body)
  \`(if ,condition
       (progn ,@body)))

(when (> x 5)
  (print "grand")
  (print "très grand"))
${'```'}

**Backquote (\`) et virgule (,) :**

- **\`** (backquote) : quote partiel
- **,** (virgule) : évalue dans un backquote
- **,@** (virgule-arobase) : épissage de liste

**Exemple :**
${'```'}lisp
(setq x 5)
\`(a b ,x c)      ; → (A B 5 C)
\`(a b ,@'(1 2))  ; → (A B 1 2)
${'```'}

**Macro UNLESS :**
${'```'}lisp
(defmacro unless (condition &rest body)
  \`(if (not ,condition)
       (progn ,@body)))

(unless (< x 0)
  (print "positif"))
${'```'}

**Pourquoi les macros ?**
- Créer de nouvelles structures de contrôle
- Éviter l'évaluation prématurée
- Générer du code optimisé
- Abstraction syntaxique`,
          keyPoints: [
            'Macro : transformation de code',
            'Arguments non évalués',
            'Retourne du code à évaluer',
            'Backquote et virgule',
            'Étendre le langage'
          ],
          tip: 'Utilisez MACROEXPAND pour voir ce que génère une macro.',
          exercises: [
            {
              id: 'ex5-3-1',
              type: 'qcm',
              question: 'Quelle est la principale différence entre une macro et une fonction ?',
              options: [
                'Les macros sont plus rapides',
                'Les macros ne peuvent pas avoir de paramètres',
                'Les arguments des macros ne sont pas évalués avant l\'expansion',
                'Il n\'y a pas de différence'
              ],
              correctAnswer: 2,
              explanation: 'Les macros reçoivent leurs arguments non évalués et génèrent du code.',
              difficulty: 'hard'
            },
            {
              id: 'ex5-3-2',
              type: 'true-false',
              question: 'Les macros permettent d\'étendre la syntaxe de Lisp.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Les macros permettent de créer de nouvelles structures de contrôle et d\'étendre le langage.',
              difficulty: 'medium'
            }
          ]
        }
      ]
    },
    {
      id: 'ch6-se-perfectionner',
      title: 'Se Perfectionner',
      description: 'Concepts avancés et techniques professionnelles',
      icon: '🎓',
      color: 'bg-indigo-600/20',
      sections: [
        {
          id: 'sec6-1-lambda',
          title: 'Lambda : fonctions anonymes',
          content: `Les **fonctions lambda** sont des fonctions sans nom.

**Syntaxe :**
${'```'}lisp
(lambda (paramètres) corps)
${'```'}

**Utilisation directe :**
${'```'}lisp
((lambda (x) (* x 2)) 5)  ; → 10
${'```'}

**Avec des fonctions d'ordre supérieur :**
${'```'}lisp
(mapcar #'(lambda (x) (* x x)) '(1 2 3 4))
; → (1 4 9 16)

(remove-if-not #'(lambda (x) (> x 5)) '(3 8 2 9))
; → (8 9)
${'```'}

**Stocker dans une variable :**
${'```'}lisp
(setq double #'(lambda (x) (* x 2)))
(funcall double 7)  ; → 14
${'```'}

**Fermetures (closures) :**

Une lambda peut capturer les variables de son environnement :
${'```'}lisp
(defun make-adder (n)
  #'(lambda (x) (+ x n)))

(setq add5 (make-adder 5))
(funcall add5 10)  ; → 15
(funcall add5 3)   ; → 8
${'```'}

**Quand utiliser :**
- Fonctions one-shot (usage unique)
- Callbacks
- Fonctions d'ordre supérieur
- Fermetures`,
          keyPoints: [
            'Lambda : fonction anonyme',
            '#\'(lambda ...) : syntaxe',
            'Usage avec MAPCAR, etc.',
            'Fermetures : capture de variables',
            'Utile pour fonctions one-shot'
          ],
          example: {
            title: 'Triple avec lambda',
            content: '(mapcar #\'(lambda (x) (* x 3)) \'(1 2 3))\n→ (3 6 9)'
          },
          exercises: [
            {
              id: 'ex6-1-1',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'une fonction lambda ?',
              options: [
                'Une fonction qui utilise des listes',
                'Une fonction sans nom',
                'Une fonction récursive',
                'Une macro'
              ],
              correctAnswer: 1,
              explanation: 'Une fonction lambda est une fonction anonyme (sans nom).',
              difficulty: 'easy'
            },
            {
              id: 'ex6-1-2',
              type: 'fill-blank',
              question: 'Que retourne ((lambda (x) (+ x 3)) 7) ?',
              blanks: [
                { text: 'Résultat : _____', answer: '10' }
              ],
              correctAnswer: ['10'],
              explanation: 'La lambda ajoute 3 à son argument : 7 + 3 = 10.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec6-2-listes-associations-avancees',
          title: 'Listes d\'associations avancées',
          content: `Les **listes d'associations** (alists) sont un moyen puissant d'organiser des données.

**Structure :**
${'```'}lisp
((clé1 . valeur1)
 (clé2 . valeur2)
 (clé3 . valeur3))
${'```'}

**ASSOC** : chercher par clé
${'```'}lisp
(setq contacts
  '((nom . "Dupont")
    (age . 30)
    (ville . "Paris")))

(assoc 'nom contacts)    ; → (NOM . "Dupont")
(cdr (assoc 'age contacts))  ; → 30
${'```'}

**ACONS** : ajouter une association
${'```'}lisp
(acons 'email "dupont@mail.fr" contacts)
; → ((EMAIL . "dupont@mail.fr")
;     (NOM . "Dupont")
;     (AGE . 30)
;     (VILLE . "Paris"))
${'```'}

**Modification :**
${'```'}lisp
(setq contacts
  (acons 'age 31
    (remove (assoc 'age contacts) contacts)))
${'```'}

**Tables de hachage alternatives :**

Alists simples mais moins performantes pour grandes données.
Pour performances : utiliser hash-tables.

**Exemple complet :**
${'```'}lisp
(defun get-property (obj key)
  (cdr (assoc key obj)))

(defun set-property (obj key value)
  (acons key value
    (remove (assoc key obj) obj)))

(setq person '((name . "Alice") (age . 25)))
(get-property person 'name)  ; → "Alice"
${'```'}`,
          keyPoints: [
            'Alist : liste de paires (clé . valeur)',
            'ASSOC : recherche par clé',
            'ACONS : ajouter une association',
            'Simples mais moins performantes',
            'Alternative : hash-tables'
          ],
          example: {
            title: 'Alist personne',
            content: '((nom . "Martin")\n (age . 28)\n (ville . "Lyon"))'
          },
          exercises: [
            {
              id: 'ex6-2-1',
              type: 'qcm',
              question: 'Que fait (assoc \'x alist) ?',
              options: [
                'Ajoute x à alist',
                'Supprime x de alist',
                'Cherche la paire avec la clé x',
                'Trie alist'
              ],
              correctAnswer: 2,
              explanation: 'ASSOC cherche et retourne la paire (clé . valeur) correspondant à la clé.',
              difficulty: 'medium'
            },
            {
              id: 'ex6-2-2',
              type: 'true-false',
              question: 'Une alist est une liste de paires (clé . valeur).',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Chaque élément est une paire pointée (clé . valeur).',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec6-3-listes-proprietes',
          title: 'Listes de propriétés',
          content: `Les **listes de propriétés** (plists) sont une alternative aux alists.

**Structure :**
${'```'}lisp
(clé1 valeur1 clé2 valeur2 clé3 valeur3)
${'```'}

**GETF** : obtenir une valeur
${'```'}lisp
(setq person '(:nom "Martin" :age 28 :ville "Lyon"))

(getf person :nom)   ; → "Martin"
(getf person :age)   ; → 28
${'```'}

**SETF avec GETF** : modifier
${'```'}lisp
(setf (getf person :age) 29)
person  ; → (:NOM "Martin" :AGE 29 :VILLE "Lyon")
${'```'}

**REMF** : supprimer une propriété
${'```'}lisp
(remf person :ville)
person  ; → (:NOM "Martin" :AGE 29)
${'```'}

**Symboles et propriétés :**

En Common Lisp, chaque symbole a une plist :
${'```'}lisp
(setf (get 'alice 'age) 25)
(setf (get 'alice 'job) "Engineer")
(get 'alice 'age)  ; → 25
${'```'}

**Plist vs Alist :**

**Plist** :
- Plus compacte (pas de cons cells)
- Syntaxe plus simple
- Utilise souvent des keywords (:key)

**Alist** :
- Plus flexible
- Supporte toute clé
- Tradition Lisp classique`,
          keyPoints: [
            'Plist : clé valeur clé valeur...',
            'GETF : obtenir valeur',
            'SETF + GETF : modifier',
            'REMF : supprimer',
            'Alternative à alist'
          ],
          example: {
            title: 'Plist voiture',
            content: '(:marque "Peugeot"\n :annee 2020\n :couleur "bleu")'
          },
          exercises: [
            {
              id: 'ex6-3-1',
              type: 'qcm',
              question: 'Quelle est la différence principale entre plist et alist ?',
              options: [
                'Aucune différence',
                'Plist : clé val clé val, Alist : ((clé . val) ...)',
                'Plist est plus lente',
                'Alist ne peut pas être modifiée'
              ],
              correctAnswer: 1,
              explanation: 'Plist alterne clés et valeurs, alist utilise des paires pointées.',
              difficulty: 'medium'
            },
            {
              id: 'ex6-3-2',
              type: 'fill-blank',
              question: 'Que retourne (getf \'(:a 1 :b 2) :b) ?',
              blanks: [
                { text: 'Résultat : _____', answer: '2' }
              ],
              correctAnswer: ['2'],
              explanation: 'GETF retourne la valeur associée à la clé :b, soit 2.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec6-4-pratiques-professionnelles',
          title: 'Bonnes pratiques et style',
          content: `Quelques règles pour écrire du **bon code Lisp**.

**1. Nommage :**
- Variables : \`ma-variable\`
- Prédicats (renvoient T/NIL) : \`evenp\`, \`null\`, suffixe \`-p\`
- Fonctions destructives : préfixe \`n\` comme \`nreverse\`, \`nconc\`

**2. Indentation :**
${'```'}lisp
(defun factorial (n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))
${'```'}

**3. Commentaires :**
${'```'}lisp
;;; Section
;; Fonction/paragraphe
; Ligne de code

(defun add (a b)
  "Additionne deux nombres"  ; Docstring
  (+ a b))  ; Addition
${'```'}

**4. Préférer les fonctions pures :**
- Sans effets de bord
- Résultat dépend uniquement des paramètres
- Plus facile à tester et déboguer

**5. Utiliser LET pour variables locales :**
${'```'}lisp
(let ((x 10)
      (y 20))
  (+ x y))
${'```'}

**6. Éviter le code global :**
- Encapsuler dans des fonctions
- Limiter les variables globales

**7. Tests :**
${'```'}lisp
(defun test-factorial ()
  (assert (= (factorial 0) 1))
  (assert (= (factorial 5) 120))
  "All tests passed")
${'```'}`,
          keyPoints: [
            'Nommage cohérent',
            'Indentation correcte',
            'Commentaires et docstrings',
            'Fonctions pures préférées',
            'LET pour variables locales'
          ],
          tip: 'Utilisez les outils de formatting automatique (emacs, SLIME).',
          exercises: [
            {
              id: 'ex6-4-1',
              type: 'qcm',
              question: 'Quelle convention indique qu\'une fonction modifie destructivement ?',
              options: [
                'Suffixe -p',
                'Préfixe n',
                'Majuscules',
                'Aucune convention'
              ],
              correctAnswer: 1,
              explanation: 'Le préfixe "n" indique une fonction destructive (ex: nreverse, nconc).',
              difficulty: 'medium'
            },
            {
              id: 'ex6-4-2',
              type: 'true-false',
              question: 'Les fonctions pures sont plus faciles à tester.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Sans effets de bord, le résultat dépend uniquement des entrées.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    }
  ]
}
