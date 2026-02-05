import { Course } from '../types'

export const modelisationBDD: Course = {
  id: 'modelisation-bdd',
  title: 'Modélisation des Systèmes d\'Information',
  description: 'Cours complet sur les bases de données, le modèle E/A et le modèle relationnel',
  createdAt: '2024-01-01',
  chapters: [
    {
      id: 'ch1-introduction',
      title: 'Introduction aux Bases de Données',
      description: 'Découvrez ce qu\'est une base de données et ses fondements',
      icon: '🗄️',
      color: 'from-blue-500 to-cyan-500',
      sections: [
        {
          id: 'sec1-1-definition',
          title: 'Qu\'est-ce qu\'une base de données ?',
          content: `Une **base de données** permet d'enregistrer des faits et des événements qui arrivent dans une entreprise ou dans un système d'information.

C'est un **ensemble structuré de données** enregistrées sur des supports accessibles afin de satisfaire simultanément plusieurs utilisateurs de façon sélective et en un temps opportun.

Les informations d'une base de données ne sont pas complètement indépendantes : elles doivent avoir des **liens logiques** entre elles.`,
          keyPoints: [
            'Enregistre des faits et événements',
            'Ensemble structuré de données',
            'Accessible à plusieurs utilisateurs',
            'Données liées entre elles logiquement'
          ],
          tip: 'Pense à une base de données comme un classeur très organisé où chaque tiroir contient des informations liées entre elles.',
          exercises: [
            {
              id: 'ex1-1-1',
              type: 'qcm',
              question: 'Qu\'est-ce qui caractérise une base de données ?',
              options: [
                'Un simple fichier texte avec des données',
                'Un ensemble structuré de données avec des liens logiques',
                'Une liste de noms sans organisation',
                'Un programme informatique'
              ],
              correctAnswer: 1,
              explanation: 'Une base de données est un ensemble STRUCTURÉ de données avec des LIENS LOGIQUES entre elles, pas juste des données en vrac.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-1-2',
              type: 'true-false',
              question: 'Les informations dans une base de données sont complètement indépendantes les unes des autres.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Les données d\'une BDD doivent avoir des liens logiques entre elles. C\'est ce qui différencie une BDD d\'un simple fichier.',
              difficulty: 'easy'
            },
            {
              id: 'ex1-1-3',
              type: 'matching',
              question: 'Associe chaque fonctionnalité à son rôle :',
              pairs: [
                { left: 'Restitution', right: 'Retrouver les faits à la demande' },
                { left: 'Multi-utilisateurs', right: 'Plusieurs personnes en même temps' },
                { left: 'Analyse', right: 'Tirer des conclusions des données' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Une BDD doit pouvoir restituer les données, servir plusieurs utilisateurs et permettre l\'analyse.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec1-2-fondements',
          title: 'Fondements d\'une base de données',
          content: `Lors de la conception d'une base de données, il est **impératif** de tenir compte des critères suivants :

**1. Représentation fidèle du monde réel**
La BDD doit refléter exactement le système qu'elle représente.

**2. Fiabilité du contenu**
Les données doivent toujours être à jour et correctes.

**3. Non redondance de l'information**
Chaque information doit être stockée dans un seul emplacement physique.

**4. Indépendance données/programmes**
La conception ne doit pas être dédiée à un programme particulier.

**5. Temps de traitement optimal**
Les opérations doivent s'exécuter rapidement.`,
          keyPoints: [
            'Fidélité au monde réel',
            'Données toujours à jour',
            'Pas de duplication d\'information',
            'Indépendance des programmes',
            'Performance optimale'
          ],
          example: {
            title: 'Exemple de redondance à éviter',
            content: 'Si l\'adresse d\'un client est stockée dans 3 tables différentes et qu\'il déménage, il faut mettre à jour 3 endroits. Avec une bonne conception, l\'adresse est stockée une seule fois !'
          },
          exercises: [
            {
              id: 'ex1-2-1',
              type: 'ordering',
              question: 'Classe ces critères du plus important au moins important pour une BDD bien conçue :',
              items: [
                'Représentation fidèle du monde réel',
                'Non redondance des données',
                'Fiabilité du contenu',
                'Temps de traitement optimal'
              ],
              correctAnswer: [0, 2, 1, 3],
              explanation: 'La fidélité est primordiale (sinon la BDD est inutile), puis la fiabilité (données correctes), puis la non-redondance (éviter les incohérences), et enfin la performance.',
              difficulty: 'hard'
            },
            {
              id: 'ex1-2-2',
              type: 'qcm',
              question: 'Pourquoi faut-il éviter la redondance des données ?',
              options: [
                'Pour économiser de l\'espace disque uniquement',
                'Pour éviter les incohérences lors des mises à jour',
                'Parce que c\'est plus joli',
                'Pour que le programme fonctionne plus vite'
              ],
              correctAnswer: 1,
              explanation: 'Si une même info est à plusieurs endroits et qu\'on en modifie un seul, les données deviennent INCOHÉRENTES !',
              difficulty: 'medium'
            },
            {
              id: 'ex1-2-3',
              type: 'fill-blank',
              question: 'Complète la phrase :',
              blanks: [
                { text: 'La conception de la base de données ne doit pas être dédiée à un programme _____', answer: 'particulier' }
              ],
              correctAnswer: ['particulier'],
              explanation: 'L\'indépendance données/programmes est fondamentale : la BDD doit pouvoir servir à n\'importe quelle application.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec1-3-sgbd',
          title: 'Système de Gestion de Bases de Données (SGBD)',
          content: `Le **SGBD** (Système de Gestion de Bases de Données) représente le lien entre la base de données et les utilisateurs.

Il assure l'**administration**, la **gestion** et la **mise à jour** de la base.

### Les 3 composantes principales d'un SGBD :

**1. Module d'optimisation des requêtes**
Élabore un plan d'exécution pour obtenir le résultat en un temps optimal.

**2. Module d'intégrité et de confidentialité**
- Vérifie les contraintes d'intégrité définies sur les données
- Garantit la confidentialité (chaque utilisateur voit uniquement ce qu'il a le droit de voir)
- Gère les privilèges d'accès

**3. Langage de manipulation (LMID)**
C'est le relais entre les utilisateurs et le SGBD. Les utilisateurs interrogent la BDD via ce langage (ex: SQL).`,
          keyPoints: [
            'SGBD = intermédiaire entre BDD et utilisateurs',
            'Optimise les requêtes automatiquement',
            'Garantit l\'intégrité et la confidentialité',
            'Propose un langage de manipulation (SQL par exemple)'
          ],
          tip: 'Pense au SGBD comme un gardien intelligent : il contrôle qui accède à quoi et s\'assure que tout reste cohérent.',
          exercises: [
            {
              id: 'ex1-3-1',
              type: 'qcm',
              question: 'Que signifie SGBD ?',
              options: [
                'Système Général de Base de Données',
                'Système de Gestion de Bases de Données',
                'Service de Gestion de Bases Décentralisées',
                'Système de Garantie de Bases de Données'
              ],
              correctAnswer: 1,
              explanation: 'SGBD = Système de Gestion de Bases de Données. C\'est le logiciel qui gère tout !',
              difficulty: 'easy'
            },
            {
              id: 'ex1-3-2',
              type: 'matching',
              question: 'Associe chaque module du SGBD à sa fonction :',
              pairs: [
                { left: 'Module d\'optimisation', right: 'Exécution rapide des requêtes' },
                { left: 'Module d\'intégrité', right: 'Vérification des contraintes' },
                { left: 'LMID', right: 'Interface avec les utilisateurs' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Chaque module a un rôle précis dans le SGBD.',
              difficulty: 'medium'
            },
            {
              id: 'ex1-3-3',
              type: 'true-false',
              question: 'Tous les utilisateurs d\'une base de données ont accès à toutes les données.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Le SGBD gère les droits d\'accès. Seul l\'administrateur peut tout voir. Les autres utilisateurs ont des accès limités.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch2-modele-ea',
      title: 'Le Modèle Entité/Association',
      description: 'Maîtrise la modélisation conceptuelle avec le modèle E/A',
      icon: '🔗',
      color: 'from-purple-500 to-pink-500',
      sections: [
        {
          id: 'sec2-1-entites',
          title: 'Les Entités',
          content: `Le modèle **Entité/Association (E/A)** est constitué d'**entités** et d'**associations** entre entités.

### Qu'est-ce qu'une entité ?

Une **entité** est tout objet ayant un sens pour l'analyse d'un système d'information.

Tout objet ne pouvant être réduit à une **seule caractéristique atomique** doit être représenté par sa propre entité.

### Exemple : L'entité Étudiant

Un étudiant ne peut pas être représenté seulement par son prénom. Il est défini par :
- Numéro d'étudiant
- Nom
- Prénom
- Date de naissance
- Sexe
- Spécialité
- ...

Ces caractéristiques sont appelées **attributs** ou **propriétés**.

### Représentation graphique

\`\`\`
┌─────────────────┐
│    Étudiant     │
├─────────────────┤
│ N°-Étudiant     │
│ Nom             │
│ Prénom          │
│ Date de naissance│
│ Sexe            │
│ ...             │
└─────────────────┘
\`\`\``,
          keyPoints: [
            'Entité = objet significatif du système',
            'Attributs = caractéristiques de l\'entité',
            'Une entité a plusieurs attributs',
            'Représentation par un tableau'
          ],
          example: {
            title: 'Exemples d\'occurrences',
            content: `Une entité peut contenir plusieurs "cas particuliers" appelés occurrences :
- (12345, Georges, Town, 10-12-1990, M)
- (23456, Sabrina, Martin, 07-03-1991, F)
- (34567, Isaac, Dupont, 01-01-1995, M)`
          },
          exercises: [
            {
              id: 'ex2-1-1',
              type: 'qcm',
              question: 'Dans le modèle E/A, qu\'est-ce qu\'une entité ?',
              options: [
                'Un lien entre deux objets',
                'Un objet significatif du système d\'information',
                'Une caractéristique d\'un objet',
                'Un type de base de données'
              ],
              correctAnswer: 1,
              explanation: 'Une entité représente un OBJET significatif (client, produit, étudiant...), pas un lien ou une caractéristique.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-1-2',
              type: 'qcm',
              question: 'Qu\'est-ce qu\'un attribut dans le modèle E/A ?',
              options: [
                'Un lien entre entités',
                'Une caractéristique d\'une entité',
                'Un type d\'entité',
                'Une base de données'
              ],
              correctAnswer: 1,
              explanation: 'Un attribut (ou propriété) est une CARACTÉRISTIQUE de l\'entité. Ex: Nom, Prénom, Date de naissance pour un Étudiant.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-1-3',
              type: 'drag-drop',
              question: 'Classe ces éléments : lesquels sont des ENTITÉS et lesquels sont des ATTRIBUTS ?',
              items: ['Étudiant', 'Nom', 'Voiture', 'Couleur', 'Professeur', 'Adresse'],
              correctAnswer: ['entité', 'attribut', 'entité', 'attribut', 'entité', 'attribut'],
              explanation: 'Étudiant, Voiture, Professeur sont des objets complets (entités). Nom, Couleur, Adresse sont des caractéristiques (attributs).',
              difficulty: 'medium'
            },
            {
              id: 'ex2-1-4',
              type: 'fill-blank',
              question: 'Complète : Les caractéristiques d\'une entité sont appelées _____ ou propriétés.',
              blanks: [
                { text: 'Les caractéristiques d\'une entité sont appelées _____ ou propriétés.', answer: 'attributs' }
              ],
              correctAnswer: ['attributs'],
              explanation: 'Attribut et propriété sont deux termes synonymes pour désigner les caractéristiques d\'une entité.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec2-2-associations',
          title: 'Les Associations',
          content: `Une **association** représente le **lien entre entités**.

### Les 3 types d'associations :

## 1. Association Unaire
Définie sur la **même entité**.

Exemple : "Habite dans le même quartier" entre étudiants.

\`\`\`
┌─────────────┐
│  Étudiant   │──────┐
├─────────────┤      │
│ N°-Étudiant │   (Habite dans le
│ Nom         │    même quartier)
│ ...         │      │
└─────────────┘──────┘
\`\`\`

## 2. Association Binaire
Lien entre **deux entités distinctes**.

Exemple : Un président est "Originaire" d'une ville.

\`\`\`
┌───────────┐           ┌─────────┐
│ Président │──(Originaire)──│  Ville  │
└───────────┘           └─────────┘
\`\`\`

## 3. Association N-aire (n > 2)
Lien entre **plus de deux entités**.

Exemple : "Donner un cours" lie Professeur, Cours et Salle.`,
          keyPoints: [
            'Association = lien entre entités',
            'Unaire : sur une seule entité',
            'Binaire : entre 2 entités',
            'N-aire : entre 3+ entités'
          ],
          tip: 'Pour identifier le type d\'association, compte simplement le nombre d\'entités différentes qu\'elle relie !',
          exercises: [
            {
              id: 'ex2-2-1',
              type: 'qcm',
              question: 'Une association "Est marié à" entre deux personnes est de quel type ?',
              options: [
                'Association binaire',
                'Association unaire',
                'Association ternaire',
                'Association n-aire'
              ],
              correctAnswer: 1,
              explanation: 'C\'est une association UNAIRE car elle relie l\'entité Personne à elle-même (une personne est mariée à une autre personne).',
              difficulty: 'medium'
            },
            {
              id: 'ex2-2-2',
              type: 'qcm',
              question: 'L\'association "Un client achète un produit" est de quel type ?',
              options: [
                'Unaire',
                'Binaire',
                'Ternaire',
                'Quaternaire'
              ],
              correctAnswer: 1,
              explanation: 'C\'est une association BINAIRE car elle relie 2 entités différentes : Client et Produit.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-2-3',
              type: 'matching',
              question: 'Associe chaque exemple au bon type d\'association :',
              pairs: [
                { left: 'Un étudiant parraine un autre étudiant', right: 'Unaire' },
                { left: 'Un client commande un produit', right: 'Binaire' },
                { left: 'Un prof enseigne un cours dans une salle', right: 'Ternaire' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Parrainage = même entité (unaire). Commande = 2 entités (binaire). Enseignement = 3 entités (ternaire).',
              difficulty: 'medium'
            },
            {
              id: 'ex2-2-4',
              type: 'true-false',
              question: 'Une association peut avoir ses propres attributs.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Par exemple, l\'association "Acheter" peut avoir les attributs "Prix" et "Date d\'achat".',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec2-3-cardinalites',
          title: 'Les Cardinalités',
          content: `Les **cardinalités** sont deux nombres (m,n) placés entre une association et une entité.

Elles représentent :
- **m** : nombre minimum de fois qu'une occurrence participe à l'association
- **n** : nombre maximum de fois qu'une occurrence participe à l'association

### Exemple : Personne - Voiture

\`\`\`
┌─────────┐  (1,1)         (0,n)  ┌──────────┐
│ Voiture │────(Propriétaire)────│ Personne │
└─────────┘                      └──────────┘
\`\`\`

**Lecture :**
- Une voiture appartient à **1 et 1 seule** personne (min=1, max=1)
- Une personne peut posséder **0 à plusieurs** voitures (min=0, max=n)

### Les cardinalités courantes :

| Notation | Signification |
|----------|---------------|
| (0,1) | 0 ou 1 fois |
| (1,1) | Exactement 1 fois |
| (0,n) | 0 à plusieurs fois |
| (1,n) | 1 à plusieurs fois |`,
          keyPoints: [
            'Cardinalité = (minimum, maximum)',
            '(0,1) : optionnel, au plus 1',
            '(1,1) : obligatoire et unique',
            '(0,n) : optionnel, plusieurs possibles',
            '(1,n) : obligatoire, plusieurs possibles'
          ],
          example: {
            title: 'Comment lire les cardinalités',
            content: 'Toujours se poser la question : "Pour UNE occurrence de cette entité, combien de fois MINIMUM et MAXIMUM participe-t-elle à l\'association ?"'
          },
          exercises: [
            {
              id: 'ex2-3-1',
              type: 'qcm',
              question: 'Que signifie la cardinalité (0,n) ?',
              options: [
                'Exactement n fois',
                'Entre 0 et n fois (facultatif, plusieurs possibles)',
                'Obligatoirement au moins 1 fois',
                'Jamais'
              ],
              correctAnswer: 1,
              explanation: '(0,n) signifie : peut ne pas participer (0) ou participer plusieurs fois (n). C\'est optionnel et multiple.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-3-2',
              type: 'qcm',
              question: 'Un employé travaille dans exactement 1 département. Quelle cardinalité côté Employé ?',
              options: [
                '(0,1)',
                '(1,1)',
                '(0,n)',
                '(1,n)'
              ],
              correctAnswer: 1,
              explanation: '(1,1) car un employé DOIT travailler dans UN département, pas 0, pas plusieurs : exactement 1.',
              difficulty: 'medium'
            },
            {
              id: 'ex2-3-3',
              type: 'qcm',
              question: 'Un département peut avoir plusieurs employés ou aucun. Quelle cardinalité côté Département ?',
              options: [
                '(0,1)',
                '(1,1)',
                '(0,n)',
                '(1,n)'
              ],
              correctAnswer: 2,
              explanation: '(0,n) car un département peut n\'avoir AUCUN employé (0) ou EN avoir PLUSIEURS (n).',
              difficulty: 'medium'
            },
            {
              id: 'ex2-3-4',
              type: 'matching',
              question: 'Associe chaque situation à sa cardinalité :',
              pairs: [
                { left: 'Un livre a exactement 1 auteur principal', right: '(1,1)' },
                { left: 'Un auteur peut avoir écrit 0 ou plusieurs livres', right: '(0,n)' },
                { left: 'Une commande contient au moins 1 produit', right: '(1,n)' },
                { left: 'Un produit peut être en rupture (0 commande) ou pas', right: '(0,n)' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2', '3-3'],
              explanation: 'Analyse bien les mots clés : "exactement 1" = (1,1), "peut...ou plusieurs" = (0,n), "au moins 1...plusieurs" = (1,n).',
              difficulty: 'hard'
            }
          ]
        },
        {
          id: 'sec2-4-regles-ea',
          title: 'Règles de conception d\'un modèle E/A',
          content: `Un bon modèle E/A doit respecter ces règles :

### 1. Extensible
Toute nouvelle information doit pouvoir être ajoutée **sans remettre en question l'architecture globale**.

### 2. Fidèle
Toute information du système doit figurer dans le modèle E/A (comme entité, association ou attribut).

### 3. Documenté
Le modèle doit être **accompagné de commentaires** expliquant les choix faits.

### Attributs d'association

Une association peut avoir ses propres attributs pour lever des ambiguïtés.

**Exemple : Véhicule - Client - Achat**

\`\`\`
┌──────────┐           ┌─────────┐
│ Véhicule │──(Acheter)──│  Client │
└──────────┘     │       └─────────┘
                 │
           ┌─────┴─────┐
           │   Prix    │
           │Date achat │
           └───────────┘
\`\`\`

Le Prix et la Date d'achat sont des attributs de l'**association** Acheter, pas des entités !`,
          keyPoints: [
            'Modèle extensible sans tout casser',
            'Fidèle au monde réel',
            'Bien documenté',
            'Les associations peuvent avoir des attributs'
          ],
          exercises: [
            {
              id: 'ex2-4-1',
              type: 'qcm',
              question: 'Où doit-on placer l\'attribut "Date d\'inscription" pour un étudiant qui s\'inscrit à un cours ?',
              options: [
                'Dans l\'entité Étudiant',
                'Dans l\'entité Cours',
                'Dans l\'association "S\'inscrire"',
                'Dans une nouvelle entité'
              ],
              correctAnswer: 2,
              explanation: 'La date d\'inscription concerne le LIEN entre un étudiant et un cours précis, donc c\'est un attribut de l\'ASSOCIATION.',
              difficulty: 'medium'
            },
            {
              id: 'ex2-4-2',
              type: 'true-false',
              question: 'Un bon modèle E/A doit être refait entièrement à chaque nouvelle fonctionnalité.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 1,
              explanation: 'FAUX ! Un bon modèle doit être EXTENSIBLE : on ajoute des éléments sans remettre en cause l\'existant.',
              difficulty: 'easy'
            },
            {
              id: 'ex2-4-3',
              type: 'drag-drop',
              question: 'Pour la vente d\'un produit à un client, classe ces attributs : ceux de l\'entité Produit, du Client, ou de l\'association Vente.',
              items: ['Nom du client', 'Prix de vente', 'Référence produit', 'Date de vente', 'Adresse client', 'Quantité vendue'],
              correctAnswer: ['Client', 'Vente', 'Produit', 'Vente', 'Client', 'Vente'],
              explanation: 'Nom/Adresse = Client. Référence = Produit. Prix de vente, Date, Quantité = dépendent de la transaction donc de l\'association Vente.',
              difficulty: 'hard'
            }
          ]
        }
      ]
    },
    {
      id: 'ch3-modele-relationnel',
      title: 'Le Modèle Relationnel',
      description: 'Comprends les relations, clés et contraintes d\'intégrité',
      icon: '📊',
      color: 'from-green-500 to-teal-500',
      sections: [
        {
          id: 'sec3-1-concepts',
          title: 'Concepts fondamentaux',
          content: `Le modèle relationnel a été introduit par **Codd en 1970** et repose sur la notion mathématique de **relation**.

### Produit Cartésien

Soient deux ensembles :
- E = {Ingénieur, Technicien, Secrétaire}
- F = {Marc, Adel, Marie}

Le **produit cartésien** E × F est l'ensemble de tous les couples possibles :

E × F = {(Ingénieur,Marc), (Ingénieur,Adel), (Ingénieur,Marie), (Technicien,Marc), (Technicien,Adel), (Technicien,Marie), (Secrétaire,Marc), (Secrétaire,Adel), (Secrétaire,Marie)}

### Relation

Une **relation** représente une **partie** (un sous-ensemble) d'un produit cartésien.

Chaque élément s'appelle un **n-uplet** (ou **tuple**).

### Exemple de relation "Employé"

| NoSS | NomEmp | Adresse | Salaire | NoDept |
|------|--------|---------|---------|--------|
| 1234 | Bernard | Paris | 2000 | 10 |
| 4356 | Arnaud | Bezons | 3000 | 20 |
| 3566 | Catherine | Argenteuil | 2500 | 30 |

- **Cardinal** = nombre de tuples (ici 3)
- **Arité** (ou degré) = nombre d'attributs (ici 5)`,
          keyPoints: [
            'Créé par Codd en 1970',
            'Basé sur les mathématiques (produit cartésien)',
            'Relation = sous-ensemble de tuples',
            'Cardinal = nombre de lignes',
            'Arité = nombre de colonnes'
          ],
          tip: 'Une relation, c\'est simplement une TABLE avec des lignes (tuples) et des colonnes (attributs) !',
          exercises: [
            {
              id: 'ex3-1-1',
              type: 'qcm',
              question: 'Qui a introduit le modèle relationnel ?',
              options: [
                'Alan Turing',
                'Edgar F. Codd',
                'Tim Berners-Lee',
                'Bill Gates'
              ],
              correctAnswer: 1,
              explanation: 'Edgar F. Codd a introduit le modèle relationnel en 1970. C\'est LA base de toutes les BDD relationnelles modernes.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-1-2',
              type: 'qcm',
              question: 'Comment appelle-t-on une ligne dans une table relationnelle ?',
              options: [
                'Un attribut',
                'Une colonne',
                'Un tuple (ou n-uplet)',
                'Une relation'
              ],
              correctAnswer: 2,
              explanation: 'Une ligne = un tuple (ou n-uplet ou enregistrement). Une colonne = un attribut.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-1-3',
              type: 'fill-blank',
              question: 'Le nombre de lignes d\'une relation s\'appelle le _____, le nombre de colonnes s\'appelle l\'_____.',
              blanks: [
                { text: 'Le nombre de lignes s\'appelle le _____', answer: 'cardinal' },
                { text: 'Le nombre de colonnes s\'appelle l\'_____', answer: 'arité' }
              ],
              correctAnswer: ['cardinal', 'arité'],
              explanation: 'Cardinal = nombre de tuples (lignes). Arité (ou degré) = nombre d\'attributs (colonnes).',
              difficulty: 'medium'
            },
            {
              id: 'ex3-1-4',
              type: 'qcm',
              question: 'Une table avec 5 colonnes et 10 lignes a :',
              options: [
                'Cardinal 5, Arité 10',
                'Cardinal 10, Arité 5',
                'Cardinal 15, Arité 15',
                'Cardinal 50, Arité 2'
              ],
              correctAnswer: 1,
              explanation: 'Cardinal = nombre de LIGNES = 10. Arité = nombre de COLONNES = 5.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-2-cles',
          title: 'Les Clés',
          content: `### Clé Primaire

La **clé primaire** est l'ensemble **minimal** d'attributs permettant d'identifier de façon **unique** un tuple.

**Propriétés :**
- Unique : deux tuples ne peuvent pas avoir la même valeur de clé
- Non nulle : jamais vide (NULL)
- Minimale : on ne peut pas enlever d'attribut

**Exemple :** Dans la table Employé, NoSS est la clé car :
- Chaque employé a un NoSS unique
- On ne peut pas identifier un employé avec juste son nom (plusieurs "Dupont" possibles)

### Types de clés

| Type | Description |
|------|-------------|
| Clé atomique | Un seul attribut |
| Clé composée (multiple) | Plusieurs attributs |

### Clé Étrangère

Un attribut qui est **clé primaire dans une autre table**.

**Exemple :**
- Table Employé : NoSS (clé primaire), NomEmp, **NoDept**
- Table Département : **NoDept** (clé primaire), NomDept

NoDept dans Employé est une **clé étrangère** qui référence Département.`,
          keyPoints: [
            'Clé primaire : identifie UNIQUEMENT chaque tuple',
            'Doit être non nulle',
            'Peut être atomique (1 attribut) ou composée',
            'Clé étrangère : référence une clé primaire d\'une autre table'
          ],
          example: {
            title: 'Choix de clé primaire',
            content: 'Pour la table Pays(NomPrésident, NomCapitale, Superficie), on peut choisir NomPrésident OU NomCapitale comme clé. L\'autre devient un attribut normal.'
          },
          exercises: [
            {
              id: 'ex3-2-1',
              type: 'qcm',
              question: 'Pourquoi le Nom ne peut-il pas être clé primaire d\'une table Employé ?',
              options: [
                'Parce que c\'est trop long',
                'Parce que plusieurs employés peuvent avoir le même nom',
                'Parce que le nom peut être NULL',
                'Parce que le nom change souvent'
              ],
              correctAnswer: 1,
              explanation: 'La clé doit être UNIQUE. Plusieurs personnes peuvent s\'appeler "Martin", donc le nom ne peut pas identifier de façon unique.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-2-2',
              type: 'qcm',
              question: 'Une clé primaire peut-elle contenir une valeur NULL ?',
              options: [
                'Oui, toujours',
                'Non, jamais',
                'Seulement si c\'est une clé composée',
                'Seulement pour le premier tuple'
              ],
              correctAnswer: 1,
              explanation: 'JAMAIS ! Une clé primaire doit TOUJOURS avoir une valeur. C\'est la contrainte d\'entité.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-2-3',
              type: 'true-false',
              question: 'Une clé étrangère peut contenir des valeurs NULL.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Contrairement à la clé primaire, une clé étrangère PEUT être NULL (sauf si elle fait partie de la clé primaire).',
              difficulty: 'medium'
            },
            {
              id: 'ex3-2-4',
              type: 'matching',
              question: 'Pour ces tables, identifie les clés primaires et étrangères :',
              pairs: [
                { left: 'Employé.NoSS', right: 'Clé primaire' },
                { left: 'Employé.NoDept', right: 'Clé étrangère' },
                { left: 'Département.NoDept', right: 'Clé primaire' },
                { left: 'Département.NomDept', right: 'Attribut simple' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2', '3-3'],
              explanation: 'NoSS identifie l\'employé (CP). NoDept dans Employé référence Département (CE). NoDept dans Département est sa CP.',
              difficulty: 'medium'
            }
          ]
        },
        {
          id: 'sec3-3-contraintes',
          title: 'Contraintes d\'intégrité',
          content: `Les contraintes d'intégrité sont des **règles** que la base de données doit respecter.

### 1. Unicité des clés
\`\`\`
∀ tuples t1 et t2, t1(K) ≠ t2(K)
\`\`\`
Deux tuples ne peuvent pas avoir la même valeur de clé.

### 2. Contraintes référentielles
Une clé étrangère doit référencer une valeur **existante** dans la table référencée (ou être NULL).

**Exemple :** Si un employé a NoDept = 10, il DOIT exister un département avec NoDept = 10.

### 3. Contraintes d'entités
- Toute relation doit avoir une clé primaire
- Aucun attribut de la clé primaire ne peut être NULL

### 4. Contraintes de domaines
Les valeurs doivent appartenir à un domaine défini.

**Exemple :**
\`\`\`sql
1500 ≤ salaire ≤ 100000
\`\`\``,
          keyPoints: [
            'Unicité : pas de doublon de clé',
            'Référentielle : clé étrangère → valeur existante',
            'Entité : clé primaire obligatoire et non nulle',
            'Domaine : valeurs dans une plage définie'
          ],
          exercises: [
            {
              id: 'ex3-3-1',
              type: 'qcm',
              question: 'Que se passe-t-il si on essaie d\'insérer un employé avec un NoDept qui n\'existe pas ?',
              options: [
                'L\'insertion réussit normalement',
                'Le département est créé automatiquement',
                'Une erreur de contrainte référentielle se produit',
                'Le NoDept devient NULL automatiquement'
              ],
              correctAnswer: 2,
              explanation: 'Violation de la contrainte référentielle ! Une clé étrangère doit référencer une valeur EXISTANTE.',
              difficulty: 'medium'
            },
            {
              id: 'ex3-3-2',
              type: 'ordering',
              question: 'Classe ces types de contraintes par importance pour la cohérence des données :',
              items: [
                'Contrainte d\'entité (clé primaire)',
                'Contrainte référentielle',
                'Contrainte de domaine',
                'Unicité des clés'
              ],
              correctAnswer: [3, 0, 1, 2],
              explanation: 'L\'unicité et les clés primaires sont fondamentales, puis les références entre tables, enfin les domaines de valeurs.',
              difficulty: 'hard'
            },
            {
              id: 'ex3-3-3',
              type: 'true-false',
              question: 'Une contrainte de domaine permet de définir que le salaire doit être entre 1500 et 100000.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! C\'est exactement le rôle d\'une contrainte de domaine : limiter les valeurs possibles.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec3-4-schemas',
          title: 'Schémas relationnels',
          content: `Le **schéma d'une relation** R est défini par :

\`\`\`
R(A₁:D₁, A₂:D₂, ..., Aₙ:Dₙ)
\`\`\`

Où :
- Aᵢ = nom de l'attribut
- Dᵢ = domaine (type) de l'attribut

### Exemple : Championnat d'athlétisme

\`\`\`
Épreuve(Nom: varchar, discipline: varchar, classement: integer)
Athlète(Nom: varchar, age: integer)
\`\`\`

### Types courants

| Type | Description |
|------|-------------|
| varchar | Chaîne de caractères |
| integer | Nombre entier |
| date | Date |
| boolean | Vrai/Faux |

### Convention de notation

Dans un schéma relationnel :
- Les attributs **soulignés** sont la clé primaire
- Les attributs en *italique* sont des clés étrangères

\`\`\`
Employé(NoSS, NomEmp, Adresse, Salaire, NoDept)
        ━━━━                         ─────
        (clé primaire)            (clé étrangère)
\`\`\``,
          keyPoints: [
            'Schéma = Nom + attributs + types',
            'Types : varchar, integer, date, boolean...',
            'Souligné = clé primaire',
            'Italique = clé étrangère'
          ],
          exercises: [
            {
              id: 'ex3-4-1',
              type: 'qcm',
              question: 'Quel type utiliser pour stocker un nom de personne ?',
              options: [
                'integer',
                'varchar',
                'boolean',
                'date'
              ],
              correctAnswer: 1,
              explanation: 'varchar = variable character = chaîne de caractères. C\'est le type pour stocker du texte.',
              difficulty: 'easy'
            },
            {
              id: 'ex3-4-2',
              type: 'fill-blank',
              question: 'Dans la notation des schémas, les attributs soulignés représentent la _____ et ceux en italique les clés _____.',
              blanks: [
                { text: 'les attributs soulignés représentent la clé _____', answer: 'primaire' },
                { text: 'ceux en italique les clés _____', answer: 'étrangères' }
              ],
              correctAnswer: ['primaire', 'étrangères'],
              explanation: 'Convention standard : souligné = clé primaire, italique = clé étrangère.',
              difficulty: 'easy'
            }
          ]
        }
      ]
    },
    {
      id: 'ch4-passage-ea-relationnel',
      title: 'Du Modèle E/A au Modèle Relationnel',
      description: 'Apprends les règles de transformation',
      icon: '🔄',
      color: 'from-orange-500 to-red-500',
      sections: [
        {
          id: 'sec4-1-entites',
          title: 'Règles de passage des entités',
          content: `La première étape est simple :

## Règle fondamentale

**Chaque entité devient une table (relation)** avec :
- Tous ses attributs conservés
- Possibilité d'ajouter des attributs oubliés

### Exemple

\`\`\`
Entité E/A :
┌────────────────┐
│    Voiture     │
├────────────────┤
│ N°-Châssis     │
│ Marque         │
│ Type           │
│ Couleur        │
└────────────────┘

↓ Devient ↓

Relation :
Voiture(N°-Châssis, Marque, Type, Couleur)
        ━━━━━━━━━
\`\`\`

L'identifiant de l'entité devient généralement la clé primaire.

### Autre exemple

\`\`\`
Entité Personne → Personne(Nom, Prénom, Adresse)
\`\`\``,
          keyPoints: [
            '1 entité = 1 table',
            'Tous les attributs sont conservés',
            'L\'identifiant devient clé primaire',
            'On peut ajouter des attributs oubliés'
          ],
          exercises: [
            {
              id: 'ex4-1-1',
              type: 'qcm',
              question: 'Lors du passage au relationnel, une entité devient :',
              options: [
                'Un attribut',
                'Une table (relation)',
                'Une clé étrangère',
                'Une association'
              ],
              correctAnswer: 1,
              explanation: 'Règle de base : chaque entité du modèle E/A devient une TABLE dans le modèle relationnel.',
              difficulty: 'easy'
            },
            {
              id: 'ex4-1-2',
              type: 'true-false',
              question: 'Lors du passage au relationnel, on peut ajouter des attributs qui avaient été oubliés dans le modèle E/A.',
              options: ['Vrai', 'Faux'],
              correctAnswer: 0,
              explanation: 'VRAI ! Le passage au relationnel permet d\'affiner et de compléter le modèle.',
              difficulty: 'easy'
            }
          ]
        },
        {
          id: 'sec4-2-associations',
          title: 'Règles de passage des associations',
          content: `Les règles dépendent des **cardinalités** !

## Cas 1 : (X,1) — (X,n) avec X = 0 ou 1

\`\`\`
┌───┐  (X,1)      (X,n)  ┌───┐
│ E │────(A)────────────│ F │
└───┘                   └───┘
\`\`\`

**Règle :** La clé de F devient un attribut (clé étrangère) de E.

\`\`\`
RF(KF, Af1, Af2, ...)
RE(KE, Ae1, Ae2, ..., KF)
                      ───
                   (clé étrangère)
\`\`\`

## Cas 2 : (X,n) — (X,n)

\`\`\`
┌───┐  (X,n)      (X,n)  ┌───┐
│ E │────(A)────────────│ F │
└───┘                   └───┘
\`\`\`

**Règle :** L'association devient une nouvelle table avec comme clé la concaténation des deux clés.

\`\`\`
RE(KE, ...)
RF(KF, ...)
RA(KE, KF, attributs_de_A)
   ━━━━━━━
\`\`\`

## Cas 3 : Association n-aire (n > 2)

**Règle :** L'association devient une table avec comme clé l'union des clés des entités.

## Cas 4 : (X,1) — (X,1)

**Règle :** On ajoute la clé de l'une dans l'autre (et réciproquement si besoin).`,
          keyPoints: [
            '(X,1)-(X,n) : clé de n va dans 1',
            '(X,n)-(X,n) : nouvelle table pour l\'association',
            'n-aire : nouvelle table avec toutes les clés',
            '(X,1)-(X,1) : clé échangée entre les tables'
          ],
          example: {
            title: 'Exemple complet',
            content: `Voiture (1,1) — Propriétaire — (0,n) Personne

Résultat :
- Personne(Nom, Prénom, Adresse)
- Voiture(N°-Châssis, Marque, Type, Couleur, Nom_Propriétaire)
                                           ━━━━━━━━━━━━━━━━━
                                           (clé étrangère)`
          },
          exercises: [
            {
              id: 'ex4-2-1',
              type: 'qcm',
              question: 'Pour une association (1,1) - (0,n), où place-t-on la clé étrangère ?',
              options: [
                'Dans la table côté (0,n)',
                'Dans la table côté (1,1)',
                'Dans une nouvelle table',
                'Nulle part'
              ],
              correctAnswer: 1,
              explanation: 'La clé va du côté "n" vers le côté "1". La table côté (1,1) reçoit la clé étrangère.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-2-2',
              type: 'qcm',
              question: 'Pour une association (0,n) - (0,n), que fait-on ?',
              options: [
                'On ajoute une clé étrangère dans l\'une des tables',
                'On crée une nouvelle table pour l\'association',
                'On fusionne les deux tables',
                'On ne fait rien'
              ],
              correctAnswer: 1,
              explanation: 'Quand les deux côtés sont "n", on DOIT créer une table intermédiaire pour l\'association.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-2-3',
              type: 'matching',
              question: 'Associe chaque type de cardinalités à la règle de transformation :',
              pairs: [
                { left: '(1,1) - (0,n)', right: 'Clé de n va dans la table 1' },
                { left: '(0,n) - (1,n)', right: 'Nouvelle table pour l\'association' },
                { left: 'Ternaire', right: 'Table avec union des 3 clés' }
              ],
              correctAnswer: ['0-0', '1-1', '2-2'],
              explanation: 'Les règles dépendent des cardinalités maximales de chaque côté.',
              difficulty: 'hard'
            }
          ]
        },
        {
          id: 'sec4-3-exemple-complet',
          title: 'Exemple complet de transformation',
          content: `Appliquons toutes les règles sur un exemple réel.

### Modèle E/A de départ

\`\`\`
┌──────────┐                    ┌────────────────┐
│ Maladie  │                    │    Patient     │   (1,1)  ┌───────────────┐
├──────────┤    (0,n)          ├────────────────┤←─Possession→│CompteBancaire│
│IdMaladie │         ↘         │ NoINSEE        │          └───────────────┘
│NomMaladie│          ↘        │ Nom            │
└──────────┘     (1,n) ↘       │ Prénom         │
                        ↘      │ Adresse        │
    (0,n)         Hospitalisation│ Age            │
      ↓           /    ↘       └────────────────┘
┌──────────┐    /       ↘
│ Médecin  │←──         DateDébut
├──────────┤ (1,n)       DateFin
│IdMédecin │
│NomMédecin│
└──────────┘
\`\`\`

### Résultat : Schéma relationnel

\`\`\`
Patient(NoINSEE, Nom, Prénom, Adresse, Age)
        ━━━━━━━

Médecin(IdMédecin, NomMédecin)
        ━━━━━━━━━

Maladie(IdMaladie, NomMaladie)
        ━━━━━━━━━

CompteBancaire(NoCompte, Solde, TypeCompte, NoINSEE)
               ━━━━━━━━                     ───────
                                         (clé étrangère)

Hospitalisation(NoINSEE, IdMaladie, IdMédecin, DateDébut, DateFin)
                ━━━━━━━  ━━━━━━━━━  ━━━━━━━━━
                     (clé primaire composée)
\`\`\``,
          keyPoints: [
            'Chaque entité → 1 table',
            'Association (1,1)-(0,n) → clé étrangère',
            'Association ternaire → nouvelle table',
            'Clé composée = concaténation des clés'
          ],
          exercises: [
            {
              id: 'ex4-3-1',
              type: 'qcm',
              question: 'Dans l\'exemple, pourquoi NoINSEE est-il clé étrangère dans CompteBancaire ?',
              options: [
                'Parce que c\'est un nombre',
                'Parce que l\'association Patient-CompteBancaire est (1,1)-(1,1)',
                'Parce que c\'est plus simple',
                'Parce que le compte appartient à 1 seul patient'
              ],
              correctAnswer: 3,
              explanation: 'Un compte appartient à un seul patient (1,1), donc on met la clé du patient dans la table compte.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-3-2',
              type: 'qcm',
              question: 'Pourquoi la table Hospitalisation a-t-elle une clé composée de 3 attributs ?',
              options: [
                'Parce que c\'est plus sécurisé',
                'Parce que c\'est une association ternaire (3 entités)',
                'Par hasard',
                'Parce que les dates sont importantes'
              ],
              correctAnswer: 1,
              explanation: 'Une association n-aire génère une table dont la clé est l\'union des clés des n entités liées.',
              difficulty: 'medium'
            },
            {
              id: 'ex4-3-3',
              type: 'drag-drop',
              question: 'Pour le schéma Patient-Hospitalisation-Médecin, identifie les clés primaires (CP) et étrangères (CE) de la table Hospitalisation :',
              items: ['NoINSEE', 'IdMaladie', 'IdMédecin', 'DateDébut', 'DateFin'],
              correctAnswer: ['CP+CE', 'CP+CE', 'CP+CE', 'Attribut', 'Attribut'],
              explanation: 'NoINSEE, IdMaladie et IdMédecin forment la clé primaire ET sont des clés étrangères vers leurs tables respectives.',
              difficulty: 'hard'
            }
          ]
        }
      ]
    }
  ]
}
