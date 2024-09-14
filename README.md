```
bun install
bun run --cwd api dev
bun run --cwd ui dev
```

デプロイ(どっちもdeployするときはapiの方から順番に)

```
bun run --cwd api deploy
bun run --cwd ui deploy
```

Drizzleスキーマに基づいてマイグレーションを生成する

```
bun drizzle-kit generate
```

ローカルのデータベースを更新

```
bun wrangler d1 migrations apply hascii --local
```

本番環境のデータベースを更新

```
bun wrangler d1 migrations apply hascii --remote
```
