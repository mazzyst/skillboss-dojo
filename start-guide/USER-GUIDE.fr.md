# SkillBoss Start Guide — Guide d'utilisation

Ce guide est pour vous, l'humain. Votre agent a son propre point d'entrée
(HELLO-WORLD.md) ; vous n'avez jamais besoin de lire les fichiers de
gates, sauf par curiosité. Dix minutes ici couvrent toute la courbe
d'apprentissage.

> The Start Guide is a coach, not a certification: its guardrails are
> heuristic defaults applied by your own agent. It hardens the builder;
> it never certifies the app.
>
> (En français : le Start Guide est un coach, pas une certification —
> ses garde-fous sont des valeurs par défaut heuristiques appliquées par
> votre propre agent. Il endurcit le builder ; il ne certifie jamais
> l'application.)

## Ce que vous obtenez

Un coach de livraison qui vit dans votre dépôt. Votre agent adopte un
contrat qui lui interdit de sauter des étapes : dix gates du kickoff au
ship, chacune verrouillée tant que le travail n'est pas prouvé et que
vous n'avez pas dit GO. Vous restez l'arbitre — le coach peut être
contredit, mais uniquement sur procès-verbal.

## Avant de commencer

Deux minutes de règles du jeu :

- Le coach refusera d'écrire du code de feature avant la fin de
  l'intake. C'est le produit qui fonctionne, pas le produit qui casse.
- Tout ce qui compte atterrit dans trois fichiers sous `state/` —
  mission, journal, scoreboard. Committez-les : ils sont le
  procès-verbal de la run.
- « GO » est un mot que vous tapez. Le coach n'avance jamais une gate
  sans lui.

## Étape 0 — Ce qu'il vous faut (niveau junior)

Trois choses, rien d'autre :

- **Un agent IA de code** — Claude Code, Cursor, ou Copilot dans votre
  éditeur, ou même un simple agent de chat. Si vous pouvez lui demander
  d'écrire du code, il peut être votre coach.
- **Git installé — ou pas, ce n'est pas grave.** Git est l'outil qui
  garde l'historique de votre projet — chaque « commit » est un
  instantané sauvegardé vers lequel vous pouvez toujours revenir. S'il
  manque, le coach nomme la commande qui l'installe sur votre machine et
  ne la lance que sur votre GO ; vous n'avez jamais à vous débrouiller
  seul.
- **Un dépôt git** — le dossier de projet que git surveille. Vous en
  avez peut-être déjà un (tout dossier cloné depuis GitHub ou dans
  lequel vous avez lancé `git init`). **Pas encore de dépôt ? Aucun
  problème — ne créez rien à la main.** Le créer est officiellement le
  premier travail du coach à la gate 00 : il lancera `git init` pour
  vous et expliquera chaque commande en une ligne au passage. Il met
  aussi en place la copie en ligne de votre dépôt (GitHub, GitLab, ou
  l'hébergeur de votre choix — privée par défaut), et il ne touche
  JAMAIS à vos mots de passe : vous vous connectez dans votre propre
  navigateur, le coach ne câble que l'adresse.

Vous n'avez PAS besoin : d'expérience DevOps, d'un serveur, d'un compte
payant, ni d'avoir lu un autre fichier du kit que ce guide. Tout mot pas
clair — ici, dans une gate, ou dans un message du coach — est défini en
langage simple dans GLOSSARY.fr.md.

## Étape 1 — Installer le kit

La voie moderne tient en un collage : sur https://skillboss.dev/start,
copiez l'INSTALL PROMPT et donnez-le à votre agent. Il télécharge le
kit, vérifie son empreinte (la page affiche le checksum attendu) et le
dézippe au bon endroit.

Puis il s'arrête. Il vous montre un écran READY et attend — rien n'est
créé, rien n'est demandé, rien n'est construit. Démarrer, c'est votre
geste, et c'est l'étape suivante.

La voie manuelle marche toujours : dézippez (ou copiez) le kit dans
votre dossier de projet pour qu'il soit à `start-guide/` au premier
niveau (à côté de votre code — ce premier niveau s'appelle la « racine
du dépôt »). Si vous avez un dépôt, committez-le ; sinon, le coach le
committera avec le premier commit à la gate 00.

## Étape 2 — Câbler votre agent

Ouvrez ADAPTERS.md et suivez la section de votre outil — Claude Code,
Cursor, Copilot, ou agent de chat simple. Un collage chacun. En cas de
doute, la ligne universelle fonctionne toujours :

    Read start-guide/HELLO-WORLD.md and follow it exactly. Hello World

## Étape 3 — Dire les mots

Votre agent se tient prêt et sa dernière ligne dit : **INSERT COIN — say
the two words every program says first.**

Dites « Hello World ». Il répond par la Boot Sequence — le contrat
chargé, la carte des gates, votre ceinture WHITE — et passe à l'intake.
C'est tout le rituel : la plus vieille phrase de la programmation,
utilisée une fois de plus, cette fois pour démarrer une livraison.

Le coach ne la dira jamais à votre place. S'il se met à écrire du code,
pointez-le vers `start-guide/CONTRACT-CARD.md` et redites
« Hello World ».

## Étape 4 — L'intake

Le coach pose une dizaine de questions en un seul lot : ce que vous
construisez, pour qui, ce que « shipped » veut dire, votre stack, où ça
tournera, s'il y a des comptes, des paiements, des données personnelles,
des conteneurs. Vos réponses deviennent `state/mission.md` et donnent sa
forme à toute la run — un projet sans conteneurs, par exemple, voit la
gate Docker levée d'entrée, sur procès-verbal.

**Vous l'avez déjà écrit ?** Si vous avez une spec, un brief ou un
README, tendez-le et dites-le. Le coach rédige un brouillon des réponses
que ce document couvre, vous dit quelle ligne vient d'où, et vous laisse
corriger chacune — comme il propose les jalons ci-dessous. Ce que vous
confirmez est votre réponse. Ce qu'il ne fera pas : répondre à partir de
quelque chose que vous ne lui avez pas tendu — lire votre code et en
déduire votre mission, c'est répondre à votre place, et c'est refusé.

Le coach propose aussi trois à cinq **jalons** : ce que votre produit
doit FAIRE, dans vos mots, en commençant par la version la plus fine qui
fonctionne de bout en bout. Corrigez cette liste librement — elle est à
vous. Les jalons disent où en est le produit ; les gates disent s'il est
sûr. Ils ne se bloquent jamais l'un l'autre. L'intake se termine quand
vous donnez le GO sur la mission écrite.

## Étape 5 — Laisser les garde-fous s'installer

À la gate 05, le coach lance une commande qui installe quatre hooks git
dans votre projet. Trois sont des gardes : à partir de là, trois erreurs
sont attrapées par la machine et non par la mémoire de quelqu'un — un
fichier d'environnement sur le point d'être committé, une chaîne en forme
de secret dans vos modifications, et un push avec une suite de tests qui
échoue. Le quatrième ne garde rien : il dessine votre écran de run
(section plus bas).

Ils démarrent en mode « warn » — ils préviennent, ils ne vous bloquent
pas — et le coach vous en montrera un se déclencher sur un test inoffensif
pour que vous l'ayez vu marcher. Quand vous leur faites confiance, une
ligne passe un garde en « block ». C'est la partie du kit qui continue de
fonctionner un mauvais jour, quand plus personne ne lit rien.

## Étape 6 — Dérouler les gates

Ensuite le rythme est toujours le même : le coach énonce les enjeux de
la gate, pose ses questions, propose un plan, vous approuvez, le travail
se fait, et le coach vous montre un Gate Report — chaque case prouvée ou
honnêtement OPEN. Vous tapez GO ; le scoreboard se met à jour ; la gate
suivante s'ouvre. Attendez-vous aux premières gates (00, 05, 10) dès les
premières sessions ; la run suit ensuite le vrai rythme de votre projet
— jours ou mois, le procès-verbal suit.

**Jamais vu de Gate Report ?** `EXAMPLE-RUN.md` en montre un rempli, sur
un projet inventé : une gate qui tient avec une case ouverte, le waiver
qui la débloque, la même gate qui se referme deux jours plus tard, et un
tableau des preuves qui comptent face à celles qui ne comptent pas.
Lisez-le une fois avant votre premier rapport ; vous n'aurez jamais à en
écrire un depuis une page blanche.

**Projet de week-end ?** Dites-le à l'intake et le coach déroule la forme
SMALL RUN — le chemin à cinq gates : cinq gates en entier, les autres
réduites à une case chacune, annoncé en un bloc pour que vous voyiez ce
qui est différé.
C'est plus petit, pas plus laxiste — mêmes preuves, même GO — et vous
pouvez dire « full run » à tout moment pour tout rouvrir.

## Votre écran de run

Après le premier commit, ouvrez `state/run-screen.md` comme un onglet à
côté de votre code — un fichier ordinaire que votre éditeur recharge à
chaque commit, rendu par son aperçu markdown, sans rien à configurer. Il
montre votre run sur une seule image : la ligne NEXT du coach en tête, la
carte avec sa légende, les gates affrontées et les jalons terminés, les
dix vilains marqués au fil des gates, ce que chaque gate a attrapé, vos
waivers avec leurs raisons, et les demandes mises de côté. Un tableau de bord qu'il faut changer de fenêtre pour voir est un
tableau de bord qu'on cesse de regarder : celui-ci vit là où vous êtes
déjà. `state/run-screen.html` porte les mêmes données pour un navigateur,
si vous préférez. Sans serveur, sans compte, sans la moindre requête
réseau. Ça marche dans un avion.

Une seule ligne n'apparaît que lorsqu'elle doit : **SHIPPING AHEAD OF
SAFETY**, quand deux jalons ou plus sont terminés alors que la gate
sécurité est encore ouverte. C'est précisément l'écart que toute cette run existe
pour refermer, et le voir vaut mieux qu'on vous le dise.

Les deux écrans sont une image de `state/scoreboard.md`, jamais une
seconde vérité : s'ils divergent, le scoreboard gagne et le coach les
reconstruit. Ne les éditez pas, ne les committez pas — l'installateur les
a déjà mis tous les deux dans votre `.gitignore`.

## Jamais perdu — YOU ARE HERE

Une run dure des jours ou des semaines, avec des sessions qui s'arrêtent
au milieu d'une pensée. Le coach vous resitue donc au lieu de supposer que
vous vous souvenez : il affiche un court bloc YOU ARE HERE à l'ouverture
d'une gate, à sa fermeture, et à chaque reprise de session.

```
YOU ARE HERE — kitchen-timer · day 12 · YELLOW
run     ███░░░░░░░  3/10 gates · 2/3 milestones
map     00[x] 05[x] 10[x] 20[>] 40[ ] 50[ ] 60[ ] 70[ ] 80[ ] 90[ ]
now     20-SECURITY — 2 of 7 boxes still open
next    authz on the mutating routes, then the dependency floor
after   40-TESTS opens when you GO this gate
left    7 gates. You can stop any time; the record holds your place.
```

La ligne qui compte le plus est **next** : une action concrète, jamais une
liste. Et vous pouvez demander à tout moment — tapez **WHERE AM I** et
vous obtenez le même bloc, quoi que le coach fût en train de faire.

## Waivers — vous avez toujours le dernier mot

Toute gate, toute case, à tout moment :

    SKIP <gate ou case> because <raison>

Le coach énonce le risque une fois, enregistre vos mots verbatim, marque
la ligne WAIVED, et passe. Sans culpabilisation, sans replaidoirie. Une
gate levée compte quand même pour sa ceinture de run : la ceinture de
run mesure que la question a été affrontée.

## Reprendre une run

Nouvelle session, nouvelle machine, même un nouvel agent : redites
« Hello World ». Parce que les fichiers state existent, le coach répond
par COACH RESUMED — les jours de silence, la dernière entrée du journal
— puis YOU ARE HERE, et continue. Le procès-verbal, pas la mémoire de l'agent, est
la run.

## Les ceintures de run

WHITE au départ de la run, puis YELLOW, ORANGE, GREEN, BLUE, BROWN au
fil des groupes de gates, et BLACK quand la gate 90 — le boss final —
est franchie. Les ceintures de run sont monotones : une fois gagnées,
jamais perdues. Une ceinture de run nomme sa piste : c'est le rang de la
run, gagné en affrontant les gates d'une livraison — jamais la ceinture
du dojo, gagnée par des semaines de pratique quotidienne dans un sujet.
Mêmes noms de couleurs, rien d'autre en commun.

## Tenir sur la durée

Une run de dix gates, c'est long — et ce qui est long est abandonné plus
souvent qu'échoué. Le coach vous fait avancer avec des faits sur votre
propre travail, jamais avec des compliments, qui disent à un
professionnel que personne ne lit vraiment.

- **Une ceinture de run gagnée est annoncée.** L'échelle était calculée en
  silence ; désormais, quand un GO vous promeut, le coach dit ce qu'il a
  fallu et ce que ça signifie.
- **Chaque gate fermée nomme ce qu'elle a attrapé.** Une ligne, citée des
  preuves : la clé trouvée avant d'être poussée, la suite rouge arrêtée à
  la porte. Quand une gate n'a rien attrapé, elle le dit aussi — un zéro
  honnête vous renseigne sur votre propre niveau.
- **Revenir n'est jamais une faute.** Faites une pause d'un jour ou d'un
  mois ; l'écran de run vous accueille par « onze jours de silence, le
  procès-verbal a gardé votre place », et rien d'autre. **Il n'y a aucune
  série (streak) dans ce kit, volontairement** : un compteur qui punit la
  vraie vie rendrait la run évitable.

## Quand la run se termine

La gate 90 vous remet au Ship Check sur https://skillboss.dev/launch —
dix systèmes à vérifier la semaine où vous shippez — puis se ferme sur
la revue des preuves, votre runbook de lancement et une veille de
première semaine.

Vient ensuite la célébration, le seul moment de la run autorisé à être
bruyant : RUN CLEARED, la carte franchie de bout en bout, les vrais
chiffres de votre run — jours, commits, gates affrontées, waivers pris
sur procès-verbal. Chaque chiffre est un chiffre que vous pouvez
montrer, et c'est ce qui le rend digne d'être lu. Les deux dernières
lignes ne bougent jamais : vous pouvez dire « checked and evidenced, per
the Start Guide's heuristics » et le penser ; vous ne pouvez pas dire que
votre app est sûre, parce que ce kit ne l'a jamais dit non plus.

Puis la borne se tait, et les mots de clôture vous envoient vers la
suivante — les deux mots mêmes qui ont ouvert cette run.

## Dépannage

| Symptôme | Cause | Correctif |
|---|---|---|
| L'agent écrit du code au « Hello World » | Contrat non chargé | Pointez-le vers CONTRACT-CARD.md, redites les mots |
| Le coach refuse une demande | Une règle du contrat s'applique | Il doit citer la règle en une ligne ; contredisez par un SKIP si vous n'êtes pas d'accord |
| Une gate semble hors sujet | Profil décalé | Vérifiez PROFILES.md ; relancez un delta d'intake (RE-SCOPE) si la mission a changé |
| Scoreboard et journal divergent | Scoreboard édité à la main | Le journal gagne ; demandez au coach de régénérer le scoreboard |
| Nouvelle session, tout oublié | Fichiers state non committés | Committez `state/` ; dites « Hello World » pour le RESUME |

## Les lignes d'honnêteté

Gratuit pour toujours, heuristique et le dit, sur le builder jamais sur
l'app, aucun vendor à l'intérieur. La forme longue est dans README.md ;
la forme courte est la citation en tête de ce guide.
