# Reach17

## Progetto Node.js (Express) per la gestione di corsi, tipologie e atenei.

## Badges
- Node: >= 22.20.0 (consigliata)

## Prerequisiti
- Node.js: versione di sviluppo usata 24.13.0 (compatibile con Node >= 22.20.0 consigliata)
- PostgreSQL come DBMS
- Brew (macOS) per installare PostgreSQL opzionalmente

## Installazione
1. Clona il repository:
   git clone <repo-url>
2. Entra nella cartella del progetto:
   cd Reach17
3. Installa le dipendenze:
   npm install

## Configurazione ambiente
- Il progetto usa una connessione a PostgreSQL configurata in `config/db.js`.
- È consigliato impostare le variabili d'ambiente (esempi):
  - DB_HOST (default: localhost)
  - DB_PORT (default: 5432)
  - DB_NAME
  - DB_USER
  - DB_PASSWORD
- Puoi configurare le variabili per la connessione al database seguendo lo schema presente nel file `.env.example` nella root del progetto.

## Creazione del database (macOS con Homebrew)
Di seguito ogni passo ha una breve indicazione e, immediatamente sotto, il comando da eseguire nel terminale (o dentro `psql` quando indicato).

1. Installazione di PostgreSQL (se non già presente)

```bash
brew install postgresql
```

2. Avviare il servizio PostgreSQL

```bash
brew services start postgresql
```

3. Connettersi al server come admin (utente `postgres`)

```bash
psql postgres
```

4. Verificare la connessione (comando da eseguire dentro `psql`)

```
\conninfo
```

5. Creare un ruolo utente con password (sostituire `<role>` e `password`) — esegui dentro `psql` oppure costruisci il comando SQL e lancialo con `psql`:

Dentro `psql`:
```
CREATE ROLE <role> WITH LOGIN PASSWORD 'password';
```

Oppure da terminale (fuori `psql`):
```bash
psql -d postgres -c "CREATE ROLE <role> WITH LOGIN PASSWORD 'password';"
```

6. Consentire al ruolo di creare database (opzionale ma utile in sviluppo) — dentro `psql`:

```
ALTER ROLE <role> CREATEDB;
```

Oppure da terminale:
```bash
psql -d postgres -c "ALTER ROLE <role> CREATEDB;"
```

7. Verificare i ruoli e i permessi (dentro `psql`):

```
\du
```

8. Disconnettersi dall'utente admin (uscire da `psql`):

```
\q
```

9. Connettersi con la nuova utenza (fuori `psql`):

```bash
psql -d postgres -U <role>
```

10. Creare il database (sostituire `<database>`) — dentro `psql` o usando il comando SQL da terminale:

Dentro `psql`:
```
CREATE DATABASE <database>;
```

Da terminale:
```bash
psql -d postgres -U <role> -c "CREATE DATABASE <database>;"
```

11. Connettersi al nuovo database (dentro `psql`):

```
\c <database>
```

12. Creare le tabelle tramite file di migrazioni (esegui questo comando dal terminale, nella root del progetto):

```bash
psql -U <role> -d <database> -f db/migrations.sql
```

13. (Opzionale) Popolare le tabelle con dati di esempio (sempre dal terminale):

```bash
psql -U <role> -d <database> -f db/seed.sql
```

## Avvio locale del progetto
1. Assicurati di aver impostato le variabili d'ambiente per la connessione al DB o modifica `config/db.js` con i parametri corretti.
2. Avvia l'app:
   npm start

## Test
- I test unitari si trovano nella cartella `test/` e sono scritti con Mocha + Chai; per gli stub/spie viene usato Sinon.
- Le dipendenze di sviluppo necessarie sono già presenti in `package.json` (mocha, chai, sinon).

Eseguire i test
1. Installa le dipendenze (se non l'hai già fatto):

```bash
npm install
```

2. Esegui tutti i test:

```bash
npm test
# oppure
npx mocha --exit
```

3. Eseguire un singolo file di test (esempio):

```bash
npx mocha test/ateneiController.test.js --exit
```

Opzioni utili
- Eseguire i test in watch mode (debug/ sviluppo):

```bash
npx mocha --watch
```

- Generare coverage (opzionale):

```bash
npm install --save-dev nyc
npx nyc mocha --exit
```

Note
- I test usano `sinon` per stubbare i metodi dei model, quindi non è necessario avere un database PostgreSQL attivo per eseguire la maggior parte dei test controller.
- I file di test attualmente inclusi sono:
  - `test/ateneiController.test.js`
  - `test/corsiController.test.js`
  - `test/tipologieController.test.js`
  - `test/homepageController.test.js`

Suggerimenti rapidi
- Per eseguire un singolo test in modo più veloce durante lo sviluppo:

```bash
npx mocha --exit test/ateneiController.test.js
```

## Struttura del progetto
- `app.js` - entrypoint dell'app Express
- `config/db.js` - configurazione connessione PostgreSQL
- `controllers/` - logica delle route
- `models/` - funzioni d'accesso ai dati
- `routes/` - definizione delle rotte
- `views/` - template EJS
- `public/` - risorse statiche
- `test/` - test unitari (Mocha / Chai / Sinon)
- `db/` - file `migrations.sql` e `seed.sql`

## Note e consigli
- Versione Node: il progetto è stato sviluppato con Node 24.13.0; in produzione consigliata almeno la 22.20.0.
- Se usi un file `.env`, tieni fuori le credenziali dal controllo versione (vedi `.gitignore`).

## Problemi comuni
- Errore di connessione: verifica che PostgreSQL sia in esecuzione e che host/porta/credenziali siano corrette.
- Migration/Seed: assicurati di eseguire `migrations.sql` prima di `seed.sql`.

## Licenza
- Questo progetto è distribuito sotto la licenza MIT. Vedi il file `LICENSE` per il testo completo.
