# Glossaire — chaque mot de la run, en langage clair

Une page, deux listes. La première est le vocabulaire propre du kit ; la
seconde est le vocabulaire du builder que les gates utiliseront. Si un
mot du guide ou d'un message du coach n'est pas clair, il est défini ici
— et s'il ne l'est pas, c'est un bug qui mérite d'être signalé.

## Les mots du kit

- **La run** — une livraison complète, du « Hello World » au shipped.
  Dix gates, un procès-verbal, une échelle.
- **Hello World** — les mots que vous dites à votre agent pour démarrer
  (ou reprendre) la run. La plus vieille phrase de la programmation,
  recyclée en pièce dans la borne d'arcade.
- **Le coach** — le rôle que votre agent adopte : il planifie, questionne,
  refuse de sauter des étapes, et n'avance jamais sans votre GO. Vous
  restez le patron de chaque décision.
- **Gate** — une étape verrouillée de la run (architecture, sécurité,
  tests, etc.). Une gate est OPEN (en cours), PASSED (prouvée, et vous
  avez dit GO), ou WAIVED (vous avez choisi de la passer, sur
  procès-verbal). Il n'y a pas de « failed ».
- **GO** — le mot que vous tapez pour approuver une mission ou fermer une
  gate. Le coach ne le suppose jamais, ne le déduit jamais d'un « ça a
  l'air bien ».
- **Preuve (evidence)** — la justification derrière chaque case cochée :
  un chemin de fichier, une commande avec sa sortie, ou une URL.
  « C'est fait » et « je crois » ne comptent pas. La preuve note où
  vivent les choses, jamais les valeurs secrètes.
- **Waiver / SKIP** — votre droit de contredire le coach :
  `SKIP <gate ou case> because <raison>`. Enregistré mot pour mot, sans
  culpabilisation, jamais replaidé.
- **state/** — les trois fichiers qui SONT la mémoire de la run :
  `mission.md` (ce que vous construisez), `journal.md` (chaque décision
  et rapport, en ajout seul), `scoreboard.md` (l'état des gates et votre
  rang).
- **READY** — l'état entre l'installation du kit et le démarrage de la
  run : le coach est armé et attend, et n'a rien créé. Installer n'est pas
  consentir ; la run commence quand vous dites les mots.
- **INSERT COIN** — la dernière ligne de l'écran READY, qui vous demande
  le mot magique. Le coach ne le dit jamais à votre place.
- **Boot Sequence** — le court bloc de statut par lequel le coach répond
  au réveil : contrat chargé, carte des gates, votre rang de départ.
- **YOU ARE HERE** — le court bloc qui dit où vous en êtes, ce qui suit
  et ce qu'il reste. Le coach l'affiche à l'ouverture d'une gate, à sa
  fermeture, et à chaque reprise de session.
- **WHERE AM I** — tapez-le à tout moment et le coach répond par YOU ARE
  HERE, quoi qu'il fasse. Une run longue n'est tenable que si l'on peut
  toujours demander.
- **RESUME** — ce que le coach répond à la place de la Boot Sequence
  quand les fichiers state existent déjà : où en est la run, pour que
  rien ne se perde entre les sessions.
- **RE-SCOPE** — le rituel pour changer la mission en cours de run : un
  court delta de questions d'intake, puis un nouveau GO. Pas de dérive
  silencieuse.
- **Profil** — la forme que l'intake donne à votre run : les gates qui ne
  concernent pas votre projet (pas de conteneurs, pas de comptes) sont
  levées d'entrée, sur procès-verbal.
- **L'échelle** — la piste de rangs de la run, de WHITE à BLACK. Gagnée
  en affrontant les gates (passées ou levées), monotone : jamais perdue.
  Dans les fichiers du kit c'est l'échelle des ceintures de run — et une
  ceinture de run n'est jamais celle du dojo : une ceinture de dojo se
  gagne par des semaines de pratique quotidienne dans un sujet, une
  ceinture de run en affrontant les gates d'une livraison. Elles
  partagent les noms de couleurs et rien d'autre.
- **Le boss final / SHIP** — la gate 90 : la revue des preuves, le
  runbook de lancement, et la passation au Ship Check.
- **RUN BELT EARNED** — le court bloc que le coach affiche quand un GO vous
  promeut : ce qu'il a fallu, ce que ça signifie, ce qui suit.
- **RUN CLEARED** — la célébration à la gate 90 : la carte franchie, les
  vrais chiffres de votre run, et les deux lignes qui ne bougent jamais.
  Elle célèbre la run, jamais l'app.
- **SMALL RUN** — la forme projet de week-end : cinq gates en entier, les
  autres réduites à une case chacune. Plus petit, jamais plus laxiste.
- **Hook** — un petit script que git lance automatiquement au commit ou au
  push. Le kit en livre trois garde-fous et un hook d'écran, pour que ses
  règles les plus critiques ne dépendent pas de la mémoire.
- **Jalon (milestone)** — une chose que le produit doit FAIRE, dans vos
  mots, convenue à la gate 00. Les jalons disent où en est le produit ;
  les gates disent s'il est sûr. Un jalon ne bloque jamais une gate, et
  une gate ne refuse jamais un jalon.
- **L'écran de run** — `state/run-screen.md`, un onglet d'éditeur à côté
  de votre code (ou `state/run-screen.html` dans un navigateur) : les
  deux axes sur une seule image, réécrite par un hook après chaque
  commit. Local, hors ligne, sans service. Sa ligne la plus tranchante
  apparaît quand le produit prend de l'avance sur sa sûreté.
- **Vilain (villain)** — la défaillance nommée qu'un système tient à
  distance : THE LEAK, THE COMMITTED KEY, THE OPEN MIC, THE OPEN DOOR,
  THE ROTTEN PLANK, THE LOST WEEKEND, THE BILL SHOCK, THE SILENT CRASH,
  THE 3AM PAGE, THE FLOOD. Dix noms, un par système du Ship Check ;
  chaque gate nomme ceux qu'elle affronte, et la gate 90 les affronte
  tous ensemble.
- **Gate Report** — l'entrée du journal qui passe une gate en revue :
  chaque case avec sa preuve ou son statut OPEN, les waivers, les risques
  acceptés, le coût, le verdict. Une seule forme, dans SCREENS.md.
- **WHAT THIS CAUGHT** — la ligne que le coach ajoute quand une gate se
  ferme, nommant ce qu'elle a réellement empêché, citée des preuves — ou
  le zéro honnête. Aussi une ligne de la table Caught du scoreboard.
- **THE RETURN** — ce que le coach dit quand une session reprend après
  une pause : « <n> days quiet. The record kept your place. » Jamais une
  faute ; ce kit n'a pas de série.
- **SHIPPING AHEAD OF SAFETY** — l'unique alarme de l'écran de run : deux
  jalons ou plus terminés alors que 20-SECURITY est encore ouverte.
- **PARKED** — une demande hors de la gate ouverte, enregistrée avec la
  gate où elle revient. Répondue en une ligne, jamais refusée deux fois.
- **ASSUMPTION** — une réponse d'intake prise par sa valeur recommandée,
  notée dans mission.md, réversible par RE-SCOPE. Au plus trois réponses
  restent ouvertes ; le reste, ce sont des hypothèses.
- **La bannière** — la ligne que le coach PROPOSE pour votre README à la
  gate 90 : gates affrontées, waivers, ceinture de run, un lien. Prise
  seulement sur GO ; elle parle du builder, jamais de l'app.
- **FinOps — mesuré / déclaré** — le coût de la run, en deux natures
  jamais mélangées : mesuré par le hook depuis git (jours, commits),
  déclaré par le coach d'après ce que son outil rapporte — et étiqueté
  comme déclaré.
- **COACH READY / ONLINE / RESUMED** — les trois en-têtes par lesquels le
  coach répond : armé et en attente, la run qui démarre, la run qui
  reprend.
- **Niveau d'activation** — ce que le profil fait d'une gate : active (en
  entier), active-lite (certaines cases notées n/a-with-reason),
  waived-by-profile (levée à l'intake, avec une condition de retour).
- **n/a-with-reason** — comment une case qui ne s'applique pas est
  notée : la raison écrite à côté. « n/a » seul est refusé.
- **La pièce, la borne** — l'image d'arcade dans laquelle vit la run : le
  kit est la borne, « Hello World » est la pièce, et la borne se tait
  quand la run est franchie.

## Les mots du builder

- **Dépôt (repository, repo)** — le dossier de projet que git surveille ;
  la « racine du dépôt » est son premier niveau. Créé avec `git init` ou
  par clonage.
- **Commit** — un instantané sauvegardé du projet dans l'historique git.
  On peut toujours revenir à n'importe quel commit ; c'est tout
  l'intérêt.
- **Push** — envoyer vos commits vers une copie du dépôt hébergée
  ailleurs (GitHub, GitLab...), pour qu'ils survivent à votre portable.
- **Remote (origin)** — la copie en ligne de votre dépôt, chez un
  hébergeur comme GitHub ou GitLab. Le premier backup qu'un projet ait
  jamais : vos commits survivent à votre portable. Créée privée par
  défaut dans cette run, et pousser un historique existant vers un
  remote revient à le publier.
- **Branche** — une ligne de commits parallèle, pour préparer des
  changements sans toucher la ligne principale avant qu'ils soient
  prêts.
- **CI (intégration continue)** — un robot qui lance vos vérifications
  (lint, tests, build) à chaque push, pour qu'une erreur soit attrapée
  en minutes, pas en production.
- **Pipeline** — la liste ordonnée des étapes que ce robot exécute :
  lint, test, build, scan, artefact.
- **Lint** — une vérification automatique du style du code et des
  erreurs évidentes, avant tout test.
- **Rouge / vert** — une suite de tests qui échoue / qui passe. Dans ce
  kit, une suite rouge bloque toutes les gates.
- **Dépendance** — du code que votre projet utilise sans l'avoir écrit
  (packages, bibliothèques). Le **lockfile** épingle leurs versions
  exactes pour que chaque machine installe la même chose.
- **Secret** — toute valeur qui donne un accès : mots de passe, clés
  API, tokens. Les secrets vivent dans l'environnement, jamais dans le
  code ni dans l'historique git.
- **.env / variable d'environnement** — des valeurs nommées que l'app
  lit au démarrage (adresse de la base, clés API). `.env.example` liste
  leurs NOMS sans aucune vraie valeur, pour qu'une nouvelle machine
  sache quoi fournir.
- **Migration** — un changement scripté et versionné de la forme de la
  base de données (une table, une colonne), appliqué dans l'ordre comme
  des commits.
- **Staging** — un environnement d'entraînement à l'image de la
  production, où un déploiement se répète avant le vrai.
- **Déploiement (deploy)** — publier une version de l'app dans un
  environnement. Ennuyeux et scripté, exprès.
- **Rollback** — la commande unique qui remet la version précédente
  quand un déploiement tourne mal. Écrite et testée AVANT le premier
  déploiement.
- **Artefact** — le paquet construit et prêt à tourner de votre app.
  Construit une fois, puis promu d'environnement en environnement —
  jamais reconstruit par environnement.
- **Backup / restauration** — la copie sauvegardée de vos données, et
  l'acte de la recharger. Un backup jamais restauré est un espoir, pas
  un backup.
- **Health endpoint** — une URL que l'app expose pour dire « je suis
  debout, et ma base répond ». Les déploiements et les moniteurs la
  vérifient.
- **Logs structurés** — la boîte noire de l'app : un événement lisible
  par machine par ligne, sans secret ni donnée personnelle dedans.
- **Alerte** — un message qu'une machine envoie à un humain quand un
  symptôme franchit une ligne. Chaque alerte doit être actionnable,
  sinon elle est supprimée.
- **Walking skeleton** — la tranche de bout en bout la plus fine
  possible de l'app (une requête à travers toutes les couches),
  construite EN PREMIER pour prouver que la forme entière fonctionne
  avant d'empiler les features.
