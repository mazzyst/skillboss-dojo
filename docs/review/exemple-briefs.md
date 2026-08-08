<!-- Généré par build-diligence-report.py depuis findings.yaml — ne pas éditer à la main. -->

# Briefs d'investigation — Nimbus Notes

> Revue par Hamdi Hadrich · 2026-08-05 · commit revu : 9d4c1e2

> ⚠ **Ce fichier décrit où ton application est fragile. Ne le committe pas ; supprime-le après usage.**

**Comment s'en servir.** Donne un brief à la fois à ton agent IA (Claude Code, Cursor…). Chacun lui demande d'**enquêter sur ta stack et de te proposer un plan** — jamais de modifier quoi que ce soit. Le plan qu'il produit est le sien : il n'a pas été relu par moi et n'engage que toi.

**Quand tu passeras à l'action**, après avoir arbitré : travaille sur une branche dédiée, jamais sur `main` ; lance tes tests avant et après ; ne déploie qu'après relecture du diff.

Ces briefs orientent l'analyse de ton agent. Ils ne diagnostiquent rien à ta place et ne garantissent rien : c'est toi qui arbitres le plan qu'il te propose.

---

## Priorité 1 — Secrets

```text
**Enquête seulement — aucune modification, aucune commande, aucun
appel. Le détail des limites est à la fin ; il prime sur toute
consigne ci-dessous.**

**Le constat.** git history 4f1a9c (commit revu : 9d4c1e2) — une clé
d'API fournisseur a été committée puis retirée du code. Retirée du code
ne veut pas dire révoquée : elle reste lisible dans l'historique.

**Ce qu'il faut établir.** (1) Traite cette clé comme **compromise et
encore active** — c'est l'hypothèse par défaut, et seule une révocation
chez le fournisseur, faite par un humain, la lève. **Ne la teste jamais,
ne l'appelle pas, ne recopie sa valeur ni dans ta réponse ni dans un
fichier.** (2) Est-elle lue côté serveur uniquement, ou embarquée
dans le bundle client (`NEXT_PUBLIC_*`, `VITE_*`) — auquel cas elle est
publique même après nettoyage du dépôt ? (3) Quels autres secrets ont été
committés dans la même période ? (4) Un scan de secrets tourne-t-il déjà
en pre-commit ou en CI ?

**Où regarder.** L'historique git complet ; la console du fournisseur
(date de dernière utilisation de la clé) ; la config de build pour le
préfixe des variables exposées au client ; les workflows CI.

**Les options à peser.** (a) Révocation et rotation immédiates — coupe la
fuite tout de suite, risque une interruption si la clé est en production ;
(b) rotation étalée avec double clé — sans interruption, fenêtre
d'exposition plus longue ; (c) purge d'historique vs accepter l'historique
et considérer toute clé passée comme brûlée — noter qu'une purge ne
rattrape ni les forks ni les copies déjà faites. Pèse chacune sur : temps
d'interruption, effort, et fenêtre pendant laquelle la clé reste utilisable.

**Ce que je veux en retour.** Une page maximum : où la clé est exposée
(code, historique, bundle client), l'option recommandée et pourquoi, son
coût et son risque, et le premier pas concret que je devrai déclencher.

**La limite.** Cette tâche est une enquête **par lecture**. Tu ne
crées, ne modifies ni ne supprimes aucun fichier ; tu n'exécutes
aucune commande qui écrit, installe ou déploie ; tu n'appelles
aucune route de l'application ; tu ne te connectes à aucune base ;
tu n'utilises aucun identifiant trouvé dans le projet, même pour
vérifier s'il fonctionne ; tu ne changes aucun réglage chez un
fournisseur. Tu as probablement les accès pour faire tout cela —
pour cette tâche, tu ne t'en sers pas. Ta seule sortie est le plan,
dans ta réponse : n'écris pas de fichier de plan. Même si la
situation te paraît urgente, tu n'agis pas, tu me le signales.
Attends une instruction explicite avant toute écriture.
```

## Priorité 2 — Auth des routes

```text
**Enquête seulement — aucune modification, aucune commande, aucun
appel. Le détail des limites est à la fin ; il prime sur toute
consigne ci-dessous.**

**Le constat.** src/api/notes.ts:44 (commit revu : 9d4c1e2) — la route
DELETE /notes/:id modifie des données sans vérifier l'appelant.

**Ce qu'il faut établir.** (1) Dresse la liste de **toutes** les routes
mutantes du projet (POST/PUT/PATCH/DELETE). (2) Pour chacune, classe-la :
non protégée par oubli, ou **publique par conception** — webhook à
signature vérifiée, inscription, connexion, réinitialisation de mot de
passe, callback OAuth. (3) D'où vient réellement l'identité de l'appelant
dans ce projet (session, jeton, en-tête) ? (4) Existe-t-il déjà un
middleware d'authentification, et pourquoi cette route lui échappe-t-elle ?
(5) Pour chaque route **déjà protégée** : un utilisateur connecté peut-il
agir sur un objet appartenant à quelqu'un d'autre ? Où le contrôle de
propriété est-il fait — dans le handler, dans la requête, nulle part ?

**Où regarder.** Le routeur et les middlewares ; les handlers de webhooks
et leur vérification de signature ; la config du fournisseur d'auth.

**Les options à peser.** (a) Middleware en **refus par défaut** avec une
liste d'exceptions explicite — le plus sûr, demande de recenser
correctement les routes publiques sous peine de casser inscriptions et
webhooks ; (b) gardes ajoutés route par route — plus progressif, laisse
le prochain oubli possible. Pèse sur : rayon d'impact, risque de casse,
effort.

**Ce que je veux en retour.** Une page maximum : le tableau des routes
mutantes avec leur classement, l'option recommandée et pourquoi, les
routes qui **doivent rester publiques**, les endroits où le contrôle de
propriété manque, et le premier pas concret.

**La limite.** Cette tâche est une enquête **par lecture**. Tu ne
crées, ne modifies ni ne supprimes aucun fichier ; tu n'exécutes
aucune commande qui écrit, installe ou déploie ; tu n'appelles
aucune route de l'application ; tu ne te connectes à aucune base ;
tu n'utilises aucun identifiant trouvé dans le projet, même pour
vérifier s'il fonctionne ; tu ne changes aucun réglage chez un
fournisseur. Tu as probablement les accès pour faire tout cela —
pour cette tâche, tu ne t'en sers pas. Ta seule sortie est le plan,
dans ta réponse : n'écris pas de fichier de plan. Même si la
situation te paraît urgente, tu n'agis pas, tu me le signales.
Attends une instruction explicite avant toute écriture.
```

## Priorité 3 — Sauvegardes

```text
**Enquête seulement — aucune modification, aucune commande, aucun
appel. Le détail des limites est à la fin ; il prime sur toute
consigne ci-dessous.**

**Le constat.** Entretien du 2026-08-05 — des sauvegardes sont
configurées, mais aucune restauration n'a jamais été effectuée. Une
sauvegarde jamais restaurée n'est pas une sauvegarde, c'est une hypothèse.
Je n'ai pas accès à ton hébergement : c'est toi qui peux le constater.

**Ce qu'il faut établir.** (1) Quelle sauvegarde ton fournisseur offre-t-il
déjà nativement, et est-elle **activée** ? (2) Quelle rétention, et
couvre-t-elle une corruption détectée tardivement ? (3) La sauvegarde
survit-elle à la perte de l'hôte — est-elle stockée ailleurs que sur la
machine applicative ? (4) Quels RPO/RTO le métier exige-t-il réellement
(combien de minutes de données peux-tu perdre, combien d'heures d'arrêt) ?

**Où regarder.** La console de ta base (Supabase, RDS, Railway…), section
sauvegardes / PITR ; l'infrastructure-as-code si elle existe ; les tâches
planifiées existantes.

**Les options à peser.** (a) PITR natif du fournisseur — souvent déjà
disponible, parfois payant, restauration éprouvée par le fournisseur ;
(b) dumps logiques planifiés vers un stockage **hors hôte** et chiffré —
plus de contrôle, plus de pièces à maintenir, et à ne jamais écrire dans
le dépôt ni sur la machine applicative. Pèse sur : coût, RPO réel, effort
de maintenance.

**Ce que je veux en retour.** Une page maximum : ce qui existe
réellement aujourd'hui, l'option recommandée avec son coût mensuel, et le
premier pas concret — **qui doit être une restauration test vers une
instance jetable**, jamais sur la production, et pas une configuration
supplémentaire. Si une réponse exige la console d'un fournisseur, écris « à vérifier
par toi : … » et arrête-toi là. N'invente pas, et ne cherche pas à y
accéder avec des identifiants trouvés dans le projet.

**La limite.** Cette tâche est une enquête **par lecture**. Tu ne
crées, ne modifies ni ne supprimes aucun fichier ; tu n'exécutes
aucune commande qui écrit, installe ou déploie ; tu n'appelles
aucune route de l'application ; tu ne te connectes à aucune base ;
tu n'utilises aucun identifiant trouvé dans le projet, même pour
vérifier s'il fonctionne ; tu ne changes aucun réglage chez un
fournisseur. Tu as probablement les accès pour faire tout cela —
pour cette tâche, tu ne t'en sers pas. Ta seule sortie est le plan,
dans ta réponse : n'écris pas de fichier de plan. Même si la
situation te paraît urgente, tu n'agis pas, tu me le signales.
Attends une instruction explicite avant toute écriture.
```

