# First container, first deploy

**Hall:** Containers & Kubernetes · **Blanks:** 3 · **Par:** 2m00s

Your agent scaffolded the app — a server.js that already answers on /health — and it runs fine on your laptop. In the cluster the pod keeps restarting: the image must listen on the right port, start correctly, and tell Kubernetes it is alive.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "____"]
---
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: my-app
    image: my-app:latest
    livenessProbe:
      httpGet:
        path: /____
        port: 8080
    env:
    - name: PORT
      value: "____"
```

## The pool

`3000` · `443` · `8080` · `app.js` · `health` · `metrics` · `ready` · `server.js` · `start.js`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The CMD instruction is the command the container runs on start. If it names the wrong file, the process exits immediately and the pod restarts in a loop.
2. The livenessProbe asks Kubernetes to hit an HTTP path on the app. Kubernetes uses the response to decide whether the container is alive — pick the path your app actually serves for this purpose.
3. The app reads its port from the PORT environment variable. The value you set here must match the port the container actually listens on, or traffic never reaches it.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `server.js` |
| 2 | `health` |
| 3 | `8080` |

**Why it matters**

1. **`server.js`** — CMD ["node", "server.js"] launches the entry file your agent actually scaffolded. Point it at a file that is not in the image — app.js, start.js — and node exits with 'module not found', so the pod crash-loops before it ever accepts traffic.
2. **`health`** — A liveness probe at /health lets Kubernetes GET that path every few seconds; a 200 response means 'still alive', anything else triggers a restart. Using / works only if your root route always responds quickly — a dedicated /health route is the safe, standard choice.
3. **`8080`** — Setting PORT to 8080 matches the EXPOSE 8080 and the livenessProbe port in the same file — all three must agree. If they disagree, the probe fails, Kubernetes thinks the app is dead, and the restarts begin.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
